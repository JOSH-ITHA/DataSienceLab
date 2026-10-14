import { execFile, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { StringDecoder } from 'node:string_decoder';
import { createServer } from 'node:http';

const execFileAsync = promisify(execFile);
const HOST = process.env.EXECUTION_HOST || '127.0.0.1';
const PORT = Number(process.env.EXECUTION_PORT || 3001);
const MAX_BODY_BYTES = 120 * 1024;
const MAX_OUTPUT_BYTES = 32 * 1024;
const MAX_INPUT_BYTES = 8 * 1024;
const EXECUTION_TIMEOUT_MS = 8000;
const MAX_CONCURRENT_RUNS = 2;
const ALLOWED_ORIGINS = new Set(
  (process.env.EXECUTION_ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
);

const LANGUAGE_CONFIG = {
  C: {
    filename: 'main.c',
    image: 'ds-library-c-runner:1',
    command: 'mkdir -p /tmp/build && if ! gcc -std=c17 -O2 -pipe /workspace/main.c -o /tmp/build/program; then exit 20; fi; exec /tmp/build/program'
  },
  'C++': {
    filename: 'main.cpp',
    image: 'ds-library-c-runner:1',
    command: 'mkdir -p /tmp/build && if ! g++ -std=c++17 -O2 -pipe /workspace/main.cpp -o /tmp/build/program; then exit 20; fi; exec /tmp/build/program'
  },
  Java: {
    filename: 'Main.java',
    image: 'ds-library-java-runner:1',
    command: 'mkdir -p /tmp/build && if ! javac -d /tmp/build /workspace/Main.java; then exit 20; fi; exec java -Xmx64m -Xss256k -XX:ActiveProcessorCount=1 -cp /tmp/build Main'
  }
};

let activeRuns = 0;

function sendJson(response, status, value, origin) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...(origin ? {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    } : {})
  });
  response.end(JSON.stringify(value));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let tooLarge = false;
    request.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
      } else if (!tooLarge) {
        chunks.push(chunk);
      }
    });
    request.on('end', () => {
      if (tooLarge) {
        reject(Object.assign(new Error('Request body exceeds the 120 KB limit.'), { statusCode: 413 }));
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }));
      }
    });
    request.on('error', reject);
  });
}

function validateRequest(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return 'Request must be a JSON object.';
  }
  if (!Object.hasOwn(LANGUAGE_CONFIG, value.language)) {
    return 'language must be C, C++, or Java.';
  }
  if (typeof value.code !== 'string' || value.code.length === 0 || Buffer.byteLength(value.code, 'utf8') > 100000) {
    return 'code must be a non-empty string no larger than 100 KB.';
  }
  if (value.code.includes('\0')) return 'code must not contain NUL characters.';
  if (typeof value.standardInput !== 'string' || Buffer.byteLength(value.standardInput, 'utf8') > MAX_INPUT_BYTES) {
    return 'standardInput must be a string no larger than 8 KB.';
  }
  return null;
}

async function checkDocker(image) {
  try {
    await execFileAsync('docker', ['info', '--format', '{{.ServerVersion}}'], { timeout: 2500, windowsHide: true });
  } catch {
    return 'Execution Environment Unavailable: Docker is installed but its daemon is not running or reachable.';
  }
  try {
    await execFileAsync('docker', ['image', 'inspect', image], { timeout: 3000, windowsHide: true });
  } catch {
    return `Execution Environment Unavailable: required runner image ${image} is not built. Follow the execution-service setup instructions in README.md.`;
  }
  return null;
}

function stopContainer(name) {
  const stopper = spawn('docker', ['kill', name], { stdio: 'ignore', windowsHide: true });
  stopper.on('error', () => {});
}

function runContainer(config, sourceDirectory, standardInput) {
  const containerName = `ds-run-${randomUUID().replaceAll('-', '')}`;
  const dockerSource = sourceDirectory.replaceAll('\\', '/');
  const args = [
    'run', '--rm', '--interactive', '--name', containerName,
    '--network', 'none',
    '--memory', '128m', '--memory-swap', '128m', '--cpus', '0.5',
    '--pids-limit', '64', '--ulimit', 'nofile=64:64',
    '--read-only', '--tmpfs', '/tmp:rw,exec,nosuid,nodev,size=32m,mode=1777',
    '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges:true',
    '--user', '10001:10001', '--env', 'HOME=/tmp', '--env', 'TMPDIR=/tmp', '--workdir', '/tmp',
    '--mount', `type=bind,source=${dockerSource},target=/workspace,readonly`,
    config.image, '/bin/sh', '-c', config.command
  ];

  return new Promise(resolve => {
    const child = spawn('docker', args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
    let stdout = '';
    let stderr = '';
    let outputBytes = 0;
    let timedOut = false;
    let outputLimitReached = false;
    let settled = false;
    const stdoutDecoder = new StringDecoder('utf8');
    const stderrDecoder = new StringDecoder('utf8');

    const terminate = () => {
      child.kill();
      stopContainer(containerName);
    };
    const timeout = setTimeout(() => {
      timedOut = true;
      terminate();
    }, EXECUTION_TIMEOUT_MS);

    const collect = (target, chunk) => {
      outputBytes += chunk.length;
      if (outputBytes > MAX_OUTPUT_BYTES) {
        outputLimitReached = true;
        terminate();
        return;
      }
      if (target === 'stdout') stdout += stdoutDecoder.write(chunk);
      else stderr += stderrDecoder.write(chunk);
    };
    child.stdout.on('data', chunk => collect('stdout', chunk));
    child.stderr.on('data', chunk => collect('stderr', chunk));
    child.on('error', error => finish({
      success: false,
      errorType: 'environment',
      output: `Execution Environment Unavailable: the Docker CLI could not start (${error.message}).`
    }));
    child.on('close', (exitCode, signal) => {
      if (timedOut) {
        finish({ success: false, errorType: 'timeout', output: 'Execution Timed Out: the container was stopped after 8 seconds.' });
      } else if (outputLimitReached) {
        finish({ success: false, errorType: 'output_limit', output: 'Output Limit Exceeded: combined program output exceeded 32 KB; the container was stopped.' });
      } else if (exitCode === 20) {
        finish({
          success: false,
          errorType: 'compilation',
          output: `Compilation Error:\n${[stdout, stderr].filter(Boolean).join('\n') || 'The compiler rejected the source code.'}`
        });
      } else if (exitCode === 0) {
        finish({ success: true, errorType: null, output: [stdout, stderr].filter(Boolean).join('\n'), exitCode });
      } else if (exitCode === null && signal) {
        finish({ success: false, errorType: 'runtime', output: `Runtime Error: program stopped by ${signal}.\n${[stdout, stderr].filter(Boolean).join('\n')}` });
      } else if (exitCode === 125 || stderr.includes('Cannot connect to the Docker daemon') || stderr.includes('error during connect')) {
        finish({ success: false, errorType: 'environment', output: 'Execution Environment Unavailable: Docker daemon is not running or reachable.' });
      } else {
        finish({
          success: false,
          errorType: 'runtime',
          output: `Runtime Error: program exited with status ${exitCode ?? 'unknown'}.\n${[stdout, stderr].filter(Boolean).join('\n')}`
        });
      }
    });

    function finish(result) {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve({ ...result, stdout, stderr });
    }

    child.stdin.on('error', () => {});
    child.stdin.end(standardInput);
  });
}

async function execute(value) {
  const config = LANGUAGE_CONFIG[value.language];
  const dockerError = await checkDocker(config.image);
  if (dockerError) {
    return { status: 503, result: { success: false, errorType: 'environment', output: dockerError, engine: 'Isolated Docker runner' } };
  }

  const sourceDirectory = await mkdtemp(path.join(tmpdir(), 'ds-library-source-'));
  try {
    await writeFile(path.join(sourceDirectory, config.filename), value.code, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
    const startedAt = performance.now();
    const result = await runContainer(config, sourceDirectory, value.standardInput);
    return {
      status: result.success ? 200 : 422,
      result: { ...result, durationMs: Math.round(performance.now() - startedAt), engine: 'Isolated Docker runner' }
    };
  } finally {
    await rm(sourceDirectory, { recursive: true, force: true });
  }
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    sendJson(response, 403, { success: false, errorType: 'origin', output: 'Origin is not allowed by this local execution service.' });
    return;
  }

  if (request.method === 'OPTIONS' && request.url === '/api/execute') {
    response.writeHead(204, origin ? {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    } : {});
    response.end();
    return;
  }
  if (request.method === 'GET' && request.url === '/health') {
    sendJson(response, 200, { success: true, activeRuns, maxConcurrentRuns: MAX_CONCURRENT_RUNS }, origin);
    return;
  }
  if (request.method !== 'POST' || request.url !== '/api/execute') {
    sendJson(response, 404, { success: false, errorType: 'not_found', output: 'Endpoint not found.' }, origin);
    return;
  }
  if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    sendJson(response, 415, { success: false, errorType: 'content_type', output: 'Content-Type must be application/json.' }, origin);
    return;
  }
  if (activeRuns >= MAX_CONCURRENT_RUNS) {
    sendJson(response, 429, { success: false, errorType: 'busy', output: 'The isolated runner is busy. Try again shortly.', engine: 'Isolated Docker runner' }, origin);
    return;
  }

  try {
    const value = await readJson(request);
    const validationError = validateRequest(value);
    if (validationError) {
      sendJson(response, 400, { success: false, errorType: 'input', output: validationError }, origin);
      return;
    }
    if (activeRuns >= MAX_CONCURRENT_RUNS) {
      sendJson(response, 429, { success: false, errorType: 'busy', output: 'The isolated runner is busy. Try again shortly.', engine: 'Isolated Docker runner' }, origin);
      return;
    }
    activeRuns += 1;
    try {
      const { status, result } = await execute(value);
      sendJson(response, status, result, origin);
    } finally {
      activeRuns -= 1;
    }
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      success: false,
      errorType: 'service',
      output: error.statusCode ? error.message : 'The isolated execution service could not prepare the temporary source file.'
    }, origin);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Isolated code execution service listening at http://${HOST}:${PORT}`);
});
