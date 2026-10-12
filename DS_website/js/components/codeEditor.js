/**
 * INTERACTIVE CODE EDITOR & TERMINAL RUNNER COMPONENT
 * Features: Line numbers, Tab indenting, WebAssembly Pyodide Execution, Copy, Reset, Clear, Stdout & Stderr terminal.
 */

import { PyodideEngine } from '../pyodideRunner.js';
import { Storage } from '../data/storage.js';
import { Toast } from './toast.js';

export function renderCodeEditor(experiment) {
  const currentCode = Storage.getSavedCode(experiment.id, experiment.code);
  const lineCount = currentCode.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 8) }, (_, i) => i + 1).join('\n');

  return `
    <div class="code-editor-container" id="editor-wrapper-${experiment.id}">
      <!-- Editor Toolbar -->
      <div class="editor-toolbar">
        <div class="editor-title-group">
          <div class="window-dots">
            <span class="window-dot dot-red"></span>
            <span class="window-dot dot-yellow"></span>
            <span class="window-dot dot-green"></span>
          </div>
          <span class="editor-lang-tag">Python 3.11</span>
          <span class="pyodide-status-badge" id="runtime-status-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span id="runtime-status-text">WebAssembly Engine Ready</span>
          </span>
        </div>

        <div class="editor-actions">
          <button class="editor-btn editor-btn-run" id="btn-run-code" title="Execute Python Code (Ctrl+Enter)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            RUN ▶
          </button>
          <button class="editor-btn editor-btn-secondary" id="btn-clear-output" title="Clear Terminal Output">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path></svg>
            CLEAR
          </button>
          <button class="editor-btn editor-btn-secondary" id="btn-copy-code" title="Copy Code to Clipboard">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            COPY
          </button>
          <button class="editor-btn editor-btn-secondary" id="btn-reset-code" title="Reset to Original Experiment Code">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            RESET
          </button>
        </div>
      </div>

      <!-- Main Textarea Editor Area with Line Numbers -->
      <div class="editor-main-area">
        <pre class="line-numbers-gutter" id="editor-line-numbers">${lineNumbers}</pre>
        <textarea 
          class="editor-textarea" 
          id="editor-code-input" 
          spellcheck="false" 
          autocomplete="off" 
          autocorrect="off" 
          autocapitalize="off"
          placeholder="Type or edit Python code here...">${currentCode}</textarea>
      </div>

      <!-- Terminal Output Panel -->
      <div class="terminal-output-container">
        <div class="terminal-header">
          <div class="terminal-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
            OUTPUT CONSOLE
          </div>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:#64748b;" id="execution-time-label">
            Status: Idle
          </div>
        </div>
        <div class="terminal-body" id="editor-output-body">
<span class="terminal-prompt-line">&gt;</span> Click [ RUN ▶ ] to execute this Python experiment...
        </div>
      </div>
    </div>
  `;
}

/**
 * Attaches real interactive behaviors to the code editor
 */
export function attachCodeEditorListeners(experiment) {
  const codeTextarea = document.getElementById('editor-code-input');
  const lineNumbers = document.getElementById('editor-line-numbers');
  const runBtn = document.getElementById('btn-run-code');
  const clearBtn = document.getElementById('btn-clear-output');
  const copyBtn = document.getElementById('btn-copy-code');
  const resetBtn = document.getElementById('btn-reset-code');
  const outputBody = document.getElementById('editor-output-body');
  const timeLabel = document.getElementById('execution-time-label');
  const statusText = document.getElementById('runtime-status-text');

  if (!codeTextarea) return;

  // Sync Line Numbers
  const updateLineNumbers = () => {
    const lines = codeTextarea.value.split('\n').length;
    lineNumbers.textContent = Array.from({ length: Math.max(lines, 8) }, (_, i) => i + 1).join('\n');
  };

  // Auto-save draft on input
  codeTextarea.addEventListener('input', () => {
    updateLineNumbers();
    Storage.saveCode(experiment.id, codeTextarea.value);
  });

  // Support Tab key & Indentation
  codeTextarea.addEventListener('keydown', (e) => {
    // Run on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runBtn.click();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeTextarea.selectionStart;
      const end = codeTextarea.selectionEnd;
      codeTextarea.value = codeTextarea.value.substring(0, start) + "    " + codeTextarea.value.substring(end);
      codeTextarea.selectionStart = codeTextarea.selectionEnd = start + 4;
      updateLineNumbers();
      Storage.saveCode(experiment.id, codeTextarea.value);
    }
  });

  // Sync scroll
  codeTextarea.addEventListener('scroll', () => {
    lineNumbers.scrollTop = codeTextarea.scrollTop;
  });

  // RUN CODE ACTION
  runBtn.onclick = async () => {
    const code = codeTextarea.value;
    runBtn.disabled = true;
    runBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> RUNNING...`;
    outputBody.className = 'terminal-body';
    outputBody.innerHTML = `<span style="color:#fbbf24;">Executing Python environment in browser...</span>`;
    timeLabel.textContent = 'Running...';

    try {
      const result = await PyodideEngine.runCode(code, experiment.expectedOutput);

      if (result.success) {
        outputBody.className = 'terminal-body';
        outputBody.textContent = result.output;
        timeLabel.textContent = `Completed in ${result.durationMs}ms (${result.engine})`;
        Toast.success("Code executed successfully!");
      } else {
        outputBody.className = 'terminal-body has-error';
        outputBody.textContent = result.output;
        timeLabel.textContent = `Error in ${result.durationMs}ms`;
        Toast.error("Execution encountered an error. Check terminal output.");
      }
    } catch (err) {
      outputBody.className = 'terminal-body has-error';
      outputBody.textContent = `Execution Error: ${err.message || err}`;
      timeLabel.textContent = 'Failed';
      Toast.error("Execution failed.");
    } finally {
      runBtn.disabled = false;
      runBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> RUN ▶`;
    }
  };

  // CLEAR OUTPUT
  clearBtn.onclick = () => {
    outputBody.className = 'terminal-body';
    outputBody.innerHTML = `<span class="terminal-prompt-line">&gt;</span> Output cleared.`;
    timeLabel.textContent = 'Output cleared';
    Toast.info("Terminal output cleared.");
  };

  // COPY CODE
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(codeTextarea.value);
      Toast.success("Source code copied to clipboard!");
    } catch (e) {
      codeTextarea.select();
      document.execCommand('copy');
      Toast.success("Source code copied to clipboard!");
    }
  };

  // RESET CODE
  resetBtn.onclick = () => {
    if (confirm("Reset editor back to the original experiment code? Any custom changes in this session will be restored.")) {
      codeTextarea.value = experiment.code;
      updateLineNumbers();
      Storage.resetCodeDraft(experiment.id);
      outputBody.className = 'terminal-body';
      outputBody.innerHTML = `<span class="terminal-prompt-line">&gt;</span> Code reset to initial state. Click [ RUN ▶ ] to execute.`;
      timeLabel.textContent = 'Reset to default';
      Toast.info("Code restored to original experiment default.");
    }
  };
}
