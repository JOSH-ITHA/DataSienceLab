/**
 * Multi-language experiment editor with per-language drafts and honest runtime reporting.
 */

import { PyodideEngine } from '../pyodideRunner.js';
import { Storage } from '../data/storage.js';
import { Toast } from './toast.js';
import {
  getCompiledExecutionUrl,
  runCompiledInSandbox,
  runJavaScriptInSandbox,
  runSqlInBrowser,
  renderCodePreview
} from './codeExecution.js';

const LANGUAGE_TEMPLATES = {
  Python: 'print("Hello, World!")',
  C: '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
  'C++': '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}',
  Java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  JavaScript: 'console.log("Hello, World!");',
  SQL: "SELECT 'Hello, World!' AS message;",
  HTML: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>',
  CSS: 'body {\n    font-family: Arial, sans-serif;\n}'
};

const HIGHLIGHT_LANGUAGES = {
  Python: 'python',
  C: 'c',
  'C++': 'cpp',
  Java: 'java',
  JavaScript: 'javascript',
  SQL: 'sql',
  HTML: 'xml',
  CSS: 'css'
};

const COMPILED_LANGUAGES = new Set(['C', 'C++', 'Java']);
let highlightPromise;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function loadHighlighter() {
  if (window.hljs) return Promise.resolve(window.hljs);
  if (highlightPromise) return highlightPromise;

  highlightPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js';
    script.onload = () => window.hljs
      ? resolve(window.hljs)
      : reject(new Error('Syntax highlighting library did not initialize.'));
    script.onerror = () => reject(new Error('Syntax highlighting library could not be loaded.'));
    document.head.appendChild(script);
  });
  return highlightPromise;
}

function initialCode(experiment, language) {
  if (language === experiment.language && experiment.code) return experiment.code;
  return LANGUAGE_TEMPLATES[language];
}

function editorLanguage(experiment) {
  return LANGUAGE_TEMPLATES[experiment.language] ? experiment.language : 'Python';
}

export function renderCodeEditor(experiment) {
  const recommendedLanguage = editorLanguage(experiment);
  const savedLanguage = Storage.getSelectedCodeLanguage(experiment.id, recommendedLanguage);
  const selectedLanguage = LANGUAGE_TEMPLATES[savedLanguage] ? savedLanguage : recommendedLanguage;
  const currentCode = Storage.getLanguageCode(
    experiment.id,
    selectedLanguage,
    initialCode(experiment, selectedLanguage)
  );
  const lineCount = currentCode.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 8) }, (_, i) => i + 1).join('\n');

  return `
    <div class="code-editor-container" id="editor-wrapper-${escapeHtml(experiment.id)}">
      <div class="editor-toolbar">
        <div class="editor-title-group">
          <div class="window-dots" aria-hidden="true">
            <span class="window-dot dot-red"></span>
            <span class="window-dot dot-yellow"></span>
            <span class="window-dot dot-green"></span>
          </div>
          <label class="editor-language-control" for="editor-language-select">
            <span>LANGUAGE</span>
            <select id="editor-language-select" class="editor-language-select" aria-label="Programming language">
              ${Object.keys(LANGUAGE_TEMPLATES).map(language => `
                <option value="${language}" ${language === selectedLanguage ? 'selected' : ''}>${language}</option>
              `).join('')}
            </select>
          </label>
          <span class="editor-lang-tag" id="editor-language-label">${escapeHtml(selectedLanguage)}</span>
          <span class="pyodide-status-badge" id="runtime-status-badge">
            <span id="runtime-status-text">${selectedLanguage === 'Python' ? 'Python WebAssembly runtime' : 'Browser editor ready'}</span>
          </span>
        </div>

        <div class="editor-actions">
          <button class="editor-btn editor-btn-run" id="btn-run-code" title="Run code (Ctrl+Enter)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            RUN
          </button>
          <button class="editor-btn editor-btn-secondary" id="btn-clear-code" title="Clear editor code">CLEAR CODE</button>
          <button class="editor-btn editor-btn-secondary" id="btn-clear-output" title="Clear output">CLEAR OUTPUT</button>
          <button class="editor-btn editor-btn-secondary" id="btn-copy-code" title="Copy code to clipboard">COPY</button>
          <button class="editor-btn editor-btn-secondary" id="btn-reset-code" title="Reset to the language starter code">RESET CODE</button>
        </div>
      </div>

      <div class="editor-main-area">
        <pre class="line-numbers-gutter" id="editor-line-numbers" aria-hidden="true">${lineNumbers}</pre>
        <div class="editor-code-surface">
          <pre class="editor-highlight" aria-hidden="true"><code id="editor-highlight-code" class="hljs language-${HIGHLIGHT_LANGUAGES[selectedLanguage]}">${escapeHtml(currentCode)}
</code></pre>
          <textarea
            class="editor-textarea"
            id="editor-code-input"
            spellcheck="false"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            aria-label="${escapeHtml(selectedLanguage)} source code"
            placeholder="Write ${escapeHtml(selectedLanguage)} code here...">${escapeHtml(currentCode)}</textarea>
        </div>
      </div>

      <div class="editor-stdin-panel">
        <label class="editor-stdin-label" for="editor-stdin-input">
          STANDARD INPUT
          <span>One value per line · Python input(), JavaScript prompt(), C/C++/Java stdin</span>
        </label>
        <textarea id="editor-stdin-input" class="editor-stdin-input" rows="2" placeholder="Optional input values, one per line"></textarea>
      </div>

      <div class="terminal-output-container">
        <div class="terminal-header">
          <div class="terminal-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
            <span id="editor-output-title">OUTPUT CONSOLE</span>
          </div>
          <div class="editor-execution-status" id="execution-time-label">Status: Idle</div>
        </div>
        <pre class="terminal-body" id="editor-output-body"><span class="terminal-prompt-line">&gt;</span> Select a language and click RUN to execute or preview code.</pre>
        <iframe class="editor-preview-frame" id="editor-preview-frame" title="Sandboxed code preview" sandbox="" hidden></iframe>
      </div>
    </div>
  `;
}

export function attachCodeEditorListeners(experiment) {
  const codeTextarea = document.getElementById('editor-code-input');
  const stdinTextarea = document.getElementById('editor-stdin-input');
  const lineNumbers = document.getElementById('editor-line-numbers');
  const highlightCode = document.getElementById('editor-highlight-code');
  const languageSelect = document.getElementById('editor-language-select');
  const languageLabel = document.getElementById('editor-language-label');
  const runBtn = document.getElementById('btn-run-code');
  const clearCodeBtn = document.getElementById('btn-clear-code');
  const clearOutputBtn = document.getElementById('btn-clear-output');
  const copyBtn = document.getElementById('btn-copy-code');
  const resetBtn = document.getElementById('btn-reset-code');
  const outputBody = document.getElementById('editor-output-body');
  const outputTitle = document.getElementById('editor-output-title');
  const previewFrame = document.getElementById('editor-preview-frame');
  const timeLabel = document.getElementById('execution-time-label');
  const statusText = document.getElementById('runtime-status-text');
  const statusBadge = document.getElementById('runtime-status-badge');
  const stdinPanel = document.querySelector('.editor-stdin-panel');

  if (!codeTextarea || !languageSelect || !highlightCode) return;

  let selectedLanguage = languageSelect.value;
  let highlighter = null;

  const updateHighlight = () => {
    const code = codeTextarea.value;
    highlightCode.className = `hljs language-${HIGHLIGHT_LANGUAGES[selectedLanguage]}`;
    if (!highlighter) {
      highlightCode.textContent = code;
      return;
    }
    const language = HIGHLIGHT_LANGUAGES[selectedLanguage];
    try {
      highlightCode.innerHTML = highlighter.highlight(code, { language }).value;
    } catch {
      highlightCode.textContent = code;
    }
    highlightCode.parentElement.scrollTop = codeTextarea.scrollTop;
    highlightCode.parentElement.scrollLeft = codeTextarea.scrollLeft;
  };

  const updateLineNumbers = () => {
    const lines = codeTextarea.value.split('\n').length;
    lineNumbers.textContent = Array.from({ length: Math.max(lines, 8) }, (_, i) => i + 1).join('\n');
  };

  const saveCurrentCode = () => {
    Storage.saveLanguageCode(experiment.id, selectedLanguage, codeTextarea.value);
  };

  const resetOutput = (message) => {
    outputBody.className = 'terminal-body';
    outputBody.textContent = message;
    outputTitle.textContent = selectedLanguage === 'HTML' || selectedLanguage === 'CSS' ? 'PREVIEW STATUS' : 'OUTPUT CONSOLE';
    previewFrame.hidden = true;
    previewFrame.removeAttribute('srcdoc');
    timeLabel.textContent = 'Status: Idle';
  };

  const setRuntimeLabel = () => {
    languageLabel.textContent = selectedLanguage;
    codeTextarea.setAttribute('aria-label', `${selectedLanguage} source code`);
    codeTextarea.placeholder = `Write ${selectedLanguage} code here...`;
    stdinPanel.hidden = !['Python', 'JavaScript', 'C', 'C++', 'Java'].includes(selectedLanguage);
    const compiledRunnerConfigured = Boolean(getCompiledExecutionUrl());
    statusBadge.classList.toggle(
      'is-runtime-unavailable',
      COMPILED_LANGUAGES.has(selectedLanguage) && !compiledRunnerConfigured
    );
    statusText.textContent = selectedLanguage === 'Python'
      ? 'Python WebAssembly runtime'
      : COMPILED_LANGUAGES.has(selectedLanguage)
        ? compiledRunnerConfigured
          ? 'Isolated Docker runner'
          : 'Compiler backend not configured'
        : selectedLanguage === 'SQL'
          ? 'Browser SQLite runtime'
          : selectedLanguage === 'HTML' || selectedLanguage === 'CSS'
            ? 'Sandboxed browser preview'
            : 'Sandboxed browser runtime';
  };

  codeTextarea.addEventListener('input', () => {
    updateLineNumbers();
    updateHighlight();
    saveCurrentCode();
  });

  stdinTextarea.addEventListener('input', () => {
    Storage.saveLanguageInput(experiment.id, selectedLanguage, stdinTextarea.value);
  });

  codeTextarea.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      runBtn.click();
      return;
    }
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = codeTextarea.selectionStart;
      const end = codeTextarea.selectionEnd;
      codeTextarea.setRangeText('    ', start, end, 'end');
      updateLineNumbers();
      updateHighlight();
      saveCurrentCode();
    }
  });

  codeTextarea.addEventListener('scroll', () => {
    lineNumbers.scrollTop = codeTextarea.scrollTop;
    highlightCode.parentElement.scrollTop = codeTextarea.scrollTop;
    highlightCode.parentElement.scrollLeft = codeTextarea.scrollLeft;
  });

  languageSelect.addEventListener('change', () => {
    saveCurrentCode();
    selectedLanguage = languageSelect.value;
    const nextCode = Storage.getLanguageCode(
      experiment.id,
      selectedLanguage,
      initialCode(experiment, selectedLanguage)
    );
    stdinTextarea.value = Storage.getLanguageInput(experiment.id, selectedLanguage);
    codeTextarea.value = nextCode;
    codeTextarea.placeholder = `Write ${selectedLanguage} code here...`;
    Storage.saveSelectedCodeLanguage(experiment.id, selectedLanguage);
    setRuntimeLabel();
    updateLineNumbers();
    updateHighlight();
    resetOutput(`Ready for ${selectedLanguage}. Your code is saved separately for each language.`);
  });

  loadHighlighter().then(library => {
    highlighter = library;
    updateHighlight();
  }).catch(() => {
    statusText.textContent = 'Syntax highlighting unavailable offline';
  });

  runBtn.onclick = async () => {
    const code = codeTextarea.value;
    const runStart = performance.now();
    runBtn.disabled = true;
    runBtn.textContent = 'RUNNING...';
    outputBody.className = 'terminal-body';
    outputBody.textContent = selectedLanguage === 'Python'
      ? 'Starting Python WebAssembly runtime...'
      : `Running ${selectedLanguage}...`;
    outputTitle.textContent = selectedLanguage === 'HTML' || selectedLanguage === 'CSS' ? 'PREVIEW STATUS' : 'OUTPUT CONSOLE';
    previewFrame.hidden = true;
    timeLabel.textContent = 'Running...';

    try {
      let result;
      if (selectedLanguage === 'Python') {
        result = await PyodideEngine.runCode(code, stdinTextarea.value);
      } else if (selectedLanguage === 'JavaScript') {
        result = await runJavaScriptInSandbox(code, stdinTextarea.value);
      } else if (selectedLanguage === 'SQL') {
        result = await runSqlInBrowser(code);
      } else if (selectedLanguage === 'HTML' || selectedLanguage === 'CSS') {
        const previewHtml = renderCodePreview(selectedLanguage, code);
        previewFrame.srcdoc = previewHtml;
        previewFrame.hidden = false;
        result = { success: true, output: `${selectedLanguage} rendered in an isolated preview. Scripts are disabled.`, engine: 'Sandboxed iframe preview' };
      } else if (COMPILED_LANGUAGES.has(selectedLanguage)) {
        result = await runCompiledInSandbox(selectedLanguage, code, stdinTextarea.value);
      } else {
        result = { success: false, output: `Execution Environment Unavailable: ${selectedLanguage} is not supported.`, engine: 'Execution unavailable' };
      }

      outputBody.className = result.success ? 'terminal-body' : 'terminal-body has-error';
      outputBody.textContent = result.output;
      const duration = result.durationMs ?? Math.round(performance.now() - runStart);
      timeLabel.textContent = result.success
        ? `Completed in ${duration}ms (${result.engine})`
        : `${String(result.output).split(':', 1)[0]} (${result.engine})`;
      if (result.success) Toast.success(selectedLanguage === 'HTML' || selectedLanguage === 'CSS' ? 'Preview updated.' : 'Code executed successfully.');
      else Toast.error(result.engine === 'Execution unavailable' ? `${selectedLanguage} compiler is unavailable.` : 'Execution failed. Check the output panel.');
    } catch (error) {
      outputBody.className = 'terminal-body has-error';
      outputBody.textContent = `Execution failed: ${error.message || error}`;
      timeLabel.textContent = 'Execution failed';
      Toast.error('Execution failed. Check the output panel.');
    } finally {
      runBtn.disabled = false;
      runBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> RUN';
    }
  };

  clearCodeBtn.onclick = () => {
    codeTextarea.value = '';
    updateLineNumbers();
    updateHighlight();
    saveCurrentCode();
    resetOutput(`${selectedLanguage} editor cleared.`);
    codeTextarea.focus();
  };

  clearOutputBtn.onclick = () => {
    resetOutput('Output cleared.');
  };

  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(codeTextarea.value);
      Toast.success('Source code copied to clipboard!');
    } catch {
      codeTextarea.select();
      document.execCommand('copy');
      Toast.success('Source code copied to clipboard!');
    }
  };

  resetBtn.onclick = () => {
    if (!confirm(`Reset ${selectedLanguage} code to its starter code? Your saved draft for this language will be replaced.`)) return;
    const code = initialCode(experiment, selectedLanguage);
    codeTextarea.value = code;
    Storage.resetLanguageCode(experiment.id, selectedLanguage);
    if (selectedLanguage === experiment.language) Storage.resetCodeDraft(experiment.id);
    Storage.saveLanguageCode(experiment.id, selectedLanguage, code);
    updateLineNumbers();
    updateHighlight();
    resetOutput(`${selectedLanguage} code reset to its starter code.`);
    Toast.info(`${selectedLanguage} code restored to its starter code.`);
  };

  setRuntimeLabel();
  stdinTextarea.value = Storage.getLanguageInput(experiment.id, selectedLanguage);
  updateHighlight();
}
