let pyodidePromise;

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js');
      const pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
      });
      await pyodide.loadPackage(['numpy', 'pandas']);
      disableExternalAccess();
      return pyodide;
    })();
  }
  return pyodidePromise;
}

function disableExternalAccess() {
  const unavailable = () => {
    throw new Error('Network access is disabled in the student-code sandbox.');
  };
  self.fetch = unavailable;
  self.importScripts = unavailable;
  self.WebSocket = undefined;
  self.EventSource = undefined;
  self.Worker = undefined;
  self.SharedWorker = undefined;
  self.XMLHttpRequest = undefined;
}

async function executePython(pyodide, code, standardInput) {
  const wrapper = `
import io
import json
import sys
import textwrap
import traceback

_student_stdout = io.StringIO()
_student_stderr = io.StringIO()
_student_stdin = io.StringIO(${JSON.stringify(standardInput)})
_previous_streams = (sys.stdout, sys.stderr, sys.stdin)
_student_error = None
_student_error_type = None
_student_error_message = None

sys.stdout, sys.stderr, sys.stdin = _student_stdout, _student_stderr, _student_stdin
try:
    exec(textwrap.dedent(${JSON.stringify(code)}), {})
except BaseException as error:
    _student_error = traceback.format_exc()
    _student_error_type = type(error).__name__
    _student_error_message = str(error)
finally:
    sys.stdout, sys.stderr, sys.stdin = _previous_streams

json.dumps({
    "success": _student_error is None,
    "stdout": _student_stdout.getvalue(),
    "stderr": _student_stderr.getvalue(),
    "error": _student_error,
    "errorType": _student_error_type,
    "errorMessage": _student_error_message
})
`;

  const resultJson = await pyodide.runPythonAsync(wrapper);
  const result = JSON.parse(resultJson);
  let output = `${result.stdout || ''}${result.stderr || ''}`;
  if (!result.success) {
    const prefix = result.errorType === 'SyntaxError'
      ? 'Syntax Error'
      : result.errorType === 'EOFError'
        ? 'Input Error'
        : 'Runtime Error';
    output += `${output ? '\n' : ''}${prefix}: ${result.errorMessage || 'Python execution failed.'}\n${result.error || ''}`;
  }
  return {
    success: result.success,
    output: output.trimEnd() || '(Program executed successfully with no output returned.)'
  };
}

self.onmessage = async event => {
  const { type, id, code, standardInput } = event.data || {};
  if (type !== 'run') return;

  try {
    const pyodide = await getPyodide();
    const result = await executePython(pyodide, code, standardInput || '');
    self.postMessage({ type: 'result', id, result });
  } catch (error) {
    self.postMessage({
      type: 'result',
      id,
      result: {
        success: false,
        output: `Runtime Error: ${error.message || error}`
      }
    });
  }
};

getPyodide()
  .then(() => self.postMessage({ type: 'ready' }))
  .catch(error => self.postMessage({
    type: 'startup-error',
    message: error.message || String(error)
  }));
