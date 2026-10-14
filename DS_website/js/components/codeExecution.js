const EXECUTION_TIMEOUT_MS = 5000;
const COMPILED_EXECUTION_TIMEOUT_MS = 12000;
const MAX_CODE_LENGTH = 100000;
const SQL_JS_VERSION = '1.13.0';

export function getCompiledExecutionUrl() {
  const configuredUrl = window.DATA_SCIENCE_EXECUTION_URL;
  if (typeof configuredUrl === 'string' && configuredUrl.trim()) return configuredUrl.trim();

  if (window.location.protocol.startsWith('http')
    && ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname)) {
    return 'http://localhost:3001/api/execute';
  }
  return null;
}

function formatError(error) {
  const detail = String(error?.message || error);
  const category = /SyntaxError|syntax error/i.test(detail) ? 'Syntax Error' : 'Runtime Error';
  return `${category}: ${detail}`;
}

function runInWorker(language, code, standardInput = '') {
  if (code.length > 100000) {
    return Promise.resolve({
      success: false,
      output: `${language} code exceeds the 100 KB execution limit.`,
      engine: 'Browser worker'
    });
  }

  const worker = new Worker(new URL('./codeExecutionWorker.js', import.meta.url));
  const requestId = crypto.randomUUID();
  const startedAt = performance.now();

  return new Promise(resolve => {
    let settled = false;
    const finish = (result, engine = 'Isolated browser worker') => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      worker.terminate();
      resolve({
        ...result,
        durationMs: Math.round(performance.now() - startedAt),
        engine
      });
    };

    worker.onmessage = event => {
      if (event.data?.id !== requestId) return;
      const { success, output } = event.data;
      finish({ success, output: success ? output : formatError(output) });
    };
    worker.onerror = event => {
      event.preventDefault();
      finish({ success: false, output: `Execution Environment Unavailable: ${event.message || 'The isolated browser worker failed.'}` });
    };
    const timeout = setTimeout(() => {
      finish({
        success: false,
        output: `Execution Timed Out: ${language} code did not finish within ${EXECUTION_TIMEOUT_MS / 1000} seconds. The isolated worker was stopped.`
      }, 'Timed-out browser worker');
    }, EXECUTION_TIMEOUT_MS);

    worker.postMessage({ id: requestId, language, code, standardInput, sqlJsVersion: SQL_JS_VERSION });
  });
}

export function runJavaScriptInSandbox(code, standardInput = '') {
  return runInWorker('JavaScript', code, standardInput);
}

export function runSqlInBrowser(code) {
  return runInWorker('SQL', code);
}

export async function runCompiledInSandbox(language, code, standardInput = '') {
  const endpoint = getCompiledExecutionUrl();
  if (!endpoint) {
    return {
      success: false,
      output: 'Execution Environment Unavailable: configure a trusted isolated compiler endpoint with window.DATA_SCIENCE_EXECUTION_URL.',
      engine: 'Execution unavailable'
    };
  }

  if (code.length > MAX_CODE_LENGTH) {
    return {
      success: false,
      output: `Execution Environment Unavailable: source code exceeds the ${MAX_CODE_LENGTH / 1000} KB limit.`,
      engine: 'Isolated Docker runner'
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), COMPILED_EXECUTION_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, code, standardInput }),
      signal: controller.signal
    });
    const result = await response.json().catch(() => null);
    if (!result || typeof result.success !== 'boolean' || typeof result.output !== 'string') {
      return {
        success: false,
        output: `Execution Environment Unavailable: the compiler service returned an invalid response (HTTP ${response.status}).`,
        engine: 'Isolated Docker runner'
      };
    }
    return {
      ...result,
      success: response.ok && result.success,
      engine: result.engine || 'Isolated Docker runner'
    };
  } catch (error) {
    const message = error.name === 'AbortError'
      ? `Execution Timed Out: the compiler service did not respond within ${COMPILED_EXECUTION_TIMEOUT_MS / 1000} seconds.`
      : 'Execution Environment Unavailable: could not connect to the local isolated compiler service. Start the execution service and Docker daemon.';
    return { success: false, output: message, engine: 'Isolated Docker runner' };
  } finally {
    clearTimeout(timeout);
  }
}

export function renderCodePreview(language, code) {
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'">`;
  if (language === 'CSS') {
    const safeCss = code.replace(/<\/style/gi, '<\\/style');
    return `<!doctype html><html><head><meta charset="utf-8">${policy}<style>${safeCss}</style></head><body><h1>CSS Preview</h1><p>Style this sample content using the selected CSS.</p><button>Example button</button><ul><li>First item</li><li>Second item</li></ul></body></html>`;
  }
  return `<!doctype html><html><head><meta charset="utf-8">${policy}</head><body>${code}</body></html>`;
}
