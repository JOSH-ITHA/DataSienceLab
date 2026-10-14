/**
 * Runs Python in a dedicated Pyodide Web Worker so user code cannot block the page.
 * The worker is terminated on timeout; code is never sent to a remote execution API.
 */

const EXECUTION_TIMEOUT_MS = 8000;
const STARTUP_TIMEOUT_MS = 120000;
let worker;
let readyPromise;
let requestId = 0;
const pendingRuns = new Map();

function terminateWorker(reason) {
  if (worker) worker.terminate();
  worker = null;
  readyPromise = null;
  for (const [id, pending] of pendingRuns) {
    clearTimeout(pending.timeout);
    pending.resolve({
      success: false,
      output: reason,
      durationMs: Math.round(performance.now() - pending.startedAt),
      engine: 'Pyodide Web Worker'
    });
    pendingRuns.delete(id);
  }
}

function createWorker() {
  worker = new Worker(new URL('./pyodideWorker.js', import.meta.url));
  worker.onmessage = event => {
    const message = event.data || {};
    if (message.type === 'ready') {
      readyPromise?.resolve();
      return;
    }
    if (message.type === 'startup-error') {
      const startupError = new Error(message.message);
      const currentReady = readyPromise;
      terminateWorker(`Python runtime unavailable: ${message.message}`);
      currentReady?.reject(startupError);
      return;
    }
    if (message.type !== 'result') return;

    const pending = pendingRuns.get(message.id);
    if (!pending) return;
    clearTimeout(pending.timeout);
    pendingRuns.delete(message.id);
    pending.resolve({
      ...message.result,
      durationMs: Math.round(performance.now() - pending.startedAt),
      engine: 'Pyodide WebAssembly in Worker'
    });
  };
  worker.onerror = event => {
    const detail = event.message || 'Python worker failed to start.';
    const currentReady = readyPromise;
    terminateWorker(`Python execution environment failed: ${detail}`);
    currentReady?.reject(new Error(detail));
    event.preventDefault();
  };
}

async function ensureWorkerReady() {
  if (worker && !readyPromise) return;
  if (!worker) createWorker();
  if (readyPromise) return readyPromise.promise;

  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  readyPromise = { promise, resolve, reject };

  const timeout = setTimeout(() => {
    if (readyPromise?.promise !== promise) return;
    terminateWorker('Python WebAssembly runtime took too long to initialize.');
    reject(new Error('Python WebAssembly runtime initialization timed out.'));
  }, STARTUP_TIMEOUT_MS);

  try {
    await promise;
  } finally {
    clearTimeout(timeout);
  }
}

export const PyodideEngine = {
  status: 'unloaded',
  statusMessage: 'Python WebAssembly runtime will load when Run is clicked',

  async loadPyodideEngine(onProgress = () => {}) {
    this.status = 'loading';
    this.statusMessage = 'Loading isolated Python WebAssembly runtime...';
    onProgress(this.statusMessage);
    try {
      await ensureWorkerReady();
      this.status = 'ready';
      this.statusMessage = 'Python WebAssembly runtime active in worker';
      onProgress(this.statusMessage);
      return true;
    } catch (error) {
      this.status = 'error';
      this.statusMessage = 'Python runtime unavailable';
      throw error;
    }
  },

  async runCode(pythonCode, standardInput = '') {
    const startedAt = performance.now();
    if (pythonCode.length > 100000 || standardInput.length > 100000) {
      return {
        success: false,
        output: 'Execution Limit: Python source code and standard input are each limited to 100 KB.',
        durationMs: 0,
        engine: 'Pyodide Web Worker'
      };
    }
    try {
      await this.loadPyodideEngine();
    } catch (error) {
      return {
        success: false,
        output: `Execution Environment Unavailable: Python's WebAssembly runtime could not start. ${error.message || error}`,
        durationMs: Math.round(performance.now() - startedAt),
        engine: 'Pyodide unavailable'
      };
    }

    const id = ++requestId;
    return new Promise(resolve => {
      const timeout = setTimeout(() => {
        terminateWorker(`Execution Timed Out: Python code did not finish within ${EXECUTION_TIMEOUT_MS / 1000} seconds. The worker was stopped.`);
      }, EXECUTION_TIMEOUT_MS);
      pendingRuns.set(id, { resolve, timeout, startedAt });
      worker.postMessage({ type: 'run', id, code: pythonCode, standardInput });
    });
  }
};
