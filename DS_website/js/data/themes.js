/**
 * THEME SYSTEM
 * Centralized theme definitions, CSS variable mappings, and localStorage persistence.
 * Each theme maps to CSS custom properties that drive the entire website's appearance.
 */

export const THEMES = {
  'cyber-lab': {
    id: 'cyber-lab',
    name: 'Cyber Lab',
    description: 'Neon-lit virtual lab with black canvas, electric cyan data streams and vivid violet highlights.',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #0d0016 0%, #1a0030 50%, #001a2c 100%)',
    previewAccent: '#00f5ff',
    previewSecondary: '#bf00ff',
    previewBg: '#080010',
    tags: ['Dark', 'Neon', 'Terminal'],
    isDefault: true,
    vars: {
      '--primary':            '#bf00ff',
      '--primary-hover':      '#9900cc',
      '--primary-light':      'rgba(191,0,255,0.12)',
      '--primary-dark':       '#5a0080',
      '--primary-glow':       'rgba(191,0,255,0.28)',
      '--accent-cyan':        '#00f5ff',
      '--accent-emerald':     '#00ff9d',
      '--accent-emerald-light':'rgba(0,255,157,0.12)',
      '--accent-amber':       '#ffcc00',
      '--accent-amber-light': 'rgba(255,204,0,0.12)',
      '--accent-rose':        '#ff2d78',
      '--accent-rose-light':  'rgba(255,45,120,0.12)',
      '--accent-purple':      '#e040fb',
      '--bg-page':            '#080010',
      '--bg-surface':         'rgba(14,0,28,0.88)',
      '--bg-surface-raised':  '#120020',
      '--bg-subtle':          '#1c002e',
      '--bg-dark':            '#040008',
      '--bg-dark-card':       '#0e001c',
      '--bg-dark-subtle':     '#260040',
      '--border-subtle':      'rgba(191,0,255,0.22)',
      '--border-medium':      'rgba(0,245,255,0.22)',
      '--border-focus':       '#00f5ff',
      '--text-main':          '#f0f8ff',
      '--text-muted':         '#a8c0d8',
      '--text-light':         '#7090b0',
      '--text-inverse':       '#080010',
      '--text-link':          '#e040fb',
      '--shadow-card':        '0 2px 8px rgba(191,0,255,0.12)',
      '--shadow-card-hover':  '0 12px 28px rgba(191,0,255,0.28)',
      /* Editor vars */
      '--editor-bg':          '#060010',
      '--editor-toolbar':     '#10001e',
      '--editor-border':      '#2a0050',
      '--editor-gutter':      '#040008',
      '--editor-text':        '#e0f0ff',
      '--editor-muted':       '#6080a0',
      '--editor-select-bg':   '#bf00ff',
      '--editor-output-bg':   '#050010',
      '--editor-output-text': '#00f5ff',
      '--editor-stdin-bg':    '#0a001a',
      '--editor-terminal-hd': '#0e001e',
      '--editor-run-btn':     '#00d4aa',
      '--editor-run-hover':   '#00b090',
    },
    bodyGradient: `
      radial-gradient(circle at 12% 10%, rgba(191,0,255,0.22), transparent 30rem),
      radial-gradient(circle at 88% 25%, rgba(0,245,255,0.14), transparent 32rem),
      #080010`,
    orb1: 'rgba(191,0,255,0.45)',
    orb2: 'rgba(0,245,255,0.22)',
  },

  'glass-academia': {
    id: 'glass-academia',
    name: 'Glass Academia',
    description: 'Elegant navy depths with glassmorphism cards, blue-violet gradients and frosted surfaces.',
    emoji: '🔷',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2a5e 50%, #0d1a40 100%)',
    previewAccent: '#7c8ffc',
    previewSecondary: '#a78bfa',
    previewBg: '#070e1e',
    tags: ['Dark', 'Glass', 'Navy'],
    vars: {
      '--primary':            '#6272e8',
      '--primary-hover':      '#4f5fcf',
      '--primary-light':      'rgba(98,114,232,0.14)',
      '--primary-dark':       '#2a3580',
      '--primary-glow':       'rgba(98,114,232,0.28)',
      '--accent-cyan':        '#7ec8e3',
      '--accent-emerald':     '#4ade80',
      '--accent-emerald-light':'rgba(74,222,128,0.12)',
      '--accent-amber':       '#fbbf24',
      '--accent-amber-light': 'rgba(251,191,36,0.12)',
      '--accent-rose':        '#f472b6',
      '--accent-rose-light':  'rgba(244,114,182,0.12)',
      '--accent-purple':      '#c4b5fd',
      '--bg-page':            '#070e1e',
      '--bg-surface':         'rgba(12,22,50,0.78)',
      '--bg-surface-raised':  '#0f1b3a',
      '--bg-subtle':          '#162048',
      '--bg-dark':            '#040a14',
      '--bg-dark-card':       '#0c1830',
      '--bg-dark-subtle':     '#1e2d5a',
      '--border-subtle':      'rgba(124,143,252,0.2)',
      '--border-medium':      'rgba(164,175,252,0.28)',
      '--border-focus':       '#7c8ffc',
      '--text-main':          '#eef2ff',
      '--text-muted':         '#a5b4cf',
      '--text-light':         '#6a7fa8',
      '--text-inverse':       '#070e1e',
      '--text-link':          '#c4b5fd',
      '--shadow-card':        '0 2px 10px rgba(98,114,232,0.1)',
      '--shadow-card-hover':  '0 16px 32px rgba(98,114,232,0.24)',
      '--editor-bg':          '#080d20',
      '--editor-toolbar':     '#0e1530',
      '--editor-border':      '#1e2d5a',
      '--editor-gutter':      '#050b18',
      '--editor-text':        '#e8edff',
      '--editor-muted':       '#5a6a98',
      '--editor-select-bg':   '#4f5fcf',
      '--editor-output-bg':   '#060c1c',
      '--editor-output-text': '#7ec8e3',
      '--editor-stdin-bg':    '#080e20',
      '--editor-terminal-hd': '#0c1228',
      '--editor-run-btn':     '#10b981',
      '--editor-run-hover':   '#059669',
    },
    bodyGradient: `
      radial-gradient(circle at 12% 10%, rgba(98,114,232,0.20), transparent 28rem),
      radial-gradient(circle at 88% 25%, rgba(124,143,252,0.12), transparent 30rem),
      #070e1e`,
    orb1: 'rgba(98,114,232,0.42)',
    orb2: 'rgba(124,143,252,0.18)',
  },

  'scholar-light': {
    id: 'scholar-light',
    name: 'Scholar Light',
    description: 'Crisp ivory and white with soft blue and sage accents — perfect for reading PDFs for hours.',
    emoji: '📖',
    gradient: 'linear-gradient(135deg, #f8f9ff 0%, #eef2ff 50%, #f0fdf8 100%)',
    previewAccent: '#3b82f6',
    previewSecondary: '#10b981',
    previewBg: '#f5f7ff',
    tags: ['Light', 'Clean', 'Reading'],
    vars: {
      '--primary':            '#3b82f6',
      '--primary-hover':      '#2563eb',
      '--primary-light':      'rgba(59,130,246,0.10)',
      '--primary-dark':       '#1d4ed8',
      '--primary-glow':       'rgba(59,130,246,0.20)',
      '--accent-cyan':        '#0ea5e9',
      '--accent-emerald':     '#10b981',
      '--accent-emerald-light':'rgba(16,185,129,0.10)',
      '--accent-amber':       '#f59e0b',
      '--accent-amber-light': 'rgba(245,158,11,0.10)',
      '--accent-rose':        '#f43f5e',
      '--accent-rose-light':  'rgba(244,63,94,0.10)',
      '--accent-purple':      '#8b5cf6',
      '--bg-page':            '#f5f7ff',
      '--bg-surface':         'rgba(255,255,255,0.92)',
      '--bg-surface-raised':  '#ffffff',
      '--bg-subtle':          '#e8edf8',
      '--bg-dark':            '#eef1fa',
      '--bg-dark-card':       '#f0f4ff',
      '--bg-dark-subtle':     '#dde5f6',
      '--border-subtle':      'rgba(59,130,246,0.15)',
      '--border-medium':      'rgba(100,116,139,0.22)',
      '--border-focus':       '#3b82f6',
      '--text-main':          '#1e293b',
      '--text-muted':         '#475569',
      '--text-light':         '#94a3b8',
      '--text-inverse':       '#ffffff',
      '--text-link':          '#2563eb',
      '--shadow-card':        '0 2px 8px rgba(59,130,246,0.08)',
      '--shadow-card-hover':  '0 12px 28px rgba(59,130,246,0.16)',
      '--editor-bg':          '#1e293b',
      '--editor-toolbar':     '#2d3f58',
      '--editor-border':      '#3d5070',
      '--editor-gutter':      '#141e30',
      '--editor-text':        '#f0f4ff',
      '--editor-muted':       '#7090b0',
      '--editor-select-bg':   '#2563eb',
      '--editor-output-bg':   '#0f172a',
      '--editor-output-text': '#38bdf8',
      '--editor-stdin-bg':    '#1a2540',
      '--editor-terminal-hd': '#182038',
      '--editor-run-btn':     '#10b981',
      '--editor-run-hover':   '#059669',
    },
    bodyGradient: `
      radial-gradient(circle at 15% 12%, rgba(59,130,246,0.10), transparent 28rem),
      radial-gradient(circle at 85% 20%, rgba(16,185,129,0.07), transparent 30rem),
      #f5f7ff`,
    orb1: 'rgba(59,130,246,0.14)',
    orb2: 'rgba(16,185,129,0.10)',
  },

  'ai-neural': {
    id: 'ai-neural',
    name: 'AI Neural',
    description: 'Midnight blue intelligence with violet synapses and cyan data-stream accents.',
    emoji: '🧠',
    gradient: 'linear-gradient(135deg, #020818 0%, #0c0d2e 50%, #060420 100%)',
    previewAccent: '#38bdf8',
    previewSecondary: '#818cf8',
    previewBg: '#020818',
    tags: ['Dark', 'Deep Blue', 'Neural'],
    vars: {
      '--primary':            '#818cf8',
      '--primary-hover':      '#6366f1',
      '--primary-light':      'rgba(129,140,248,0.12)',
      '--primary-dark':       '#3730a3',
      '--primary-glow':       'rgba(129,140,248,0.25)',
      '--accent-cyan':        '#38bdf8',
      '--accent-emerald':     '#34d399',
      '--accent-emerald-light':'rgba(52,211,153,0.12)',
      '--accent-amber':       '#fbbf24',
      '--accent-amber-light': 'rgba(251,191,36,0.12)',
      '--accent-rose':        '#fb7185',
      '--accent-rose-light':  'rgba(251,113,133,0.12)',
      '--accent-purple':      '#a5b4fc',
      '--bg-page':            '#020818',
      '--bg-surface':         'rgba(6,8,28,0.88)',
      '--bg-surface-raised':  '#0a0c22',
      '--bg-subtle':          '#111330',
      '--bg-dark':            '#010610',
      '--bg-dark-card':       '#08091e',
      '--bg-dark-subtle':     '#1a1e40',
      '--border-subtle':      'rgba(129,140,248,0.18)',
      '--border-medium':      'rgba(56,189,248,0.22)',
      '--border-focus':       '#38bdf8',
      '--text-main':          '#e8eeff',
      '--text-muted':         '#94a3c8',
      '--text-light':         '#6070a0',
      '--text-inverse':       '#020818',
      '--text-link':          '#a5b4fc',
      '--shadow-card':        '0 2px 8px rgba(129,140,248,0.10)',
      '--shadow-card-hover':  '0 14px 30px rgba(129,140,248,0.22)',
      '--editor-bg':          '#030916',
      '--editor-toolbar':     '#0a0d24',
      '--editor-border':      '#1a1e40',
      '--editor-gutter':      '#020710',
      '--editor-text':        '#e0e8ff',
      '--editor-muted':       '#506080',
      '--editor-select-bg':   '#6366f1',
      '--editor-output-bg':   '#020710',
      '--editor-output-text': '#38bdf8',
      '--editor-stdin-bg':    '#07091e',
      '--editor-terminal-hd': '#09111e',
      '--editor-run-btn':     '#10b981',
      '--editor-run-hover':   '#059669',
    },
    bodyGradient: `
      radial-gradient(circle at 12% 10%, rgba(129,140,248,0.18), transparent 28rem),
      radial-gradient(circle at 88% 25%, rgba(56,189,248,0.12), transparent 30rem),
      #020818`,
    orb1: 'rgba(129,140,248,0.42)',
    orb2: 'rgba(56,189,248,0.18)',
  },

  'terminal-green': {
    id: 'terminal-green',
    name: 'Terminal Green',
    description: 'Charcoal workspace with emerald green terminal panels and classic command-line aesthetics.',
    emoji: '💚',
    gradient: 'linear-gradient(135deg, #020c04 0%, #061409 50%, #020c04 100%)',
    previewAccent: '#22c55e',
    previewSecondary: '#4ade80',
    previewBg: '#020c04',
    tags: ['Dark', 'Green', 'Terminal'],
    vars: {
      '--primary':            '#22c55e',
      '--primary-hover':      '#16a34a',
      '--primary-light':      'rgba(34,197,94,0.12)',
      '--primary-dark':       '#14532d',
      '--primary-glow':       'rgba(34,197,94,0.25)',
      '--accent-cyan':        '#4ade80',
      '--accent-emerald':     '#86efac',
      '--accent-emerald-light':'rgba(134,239,172,0.12)',
      '--accent-amber':       '#fbbf24',
      '--accent-amber-light': 'rgba(251,191,36,0.12)',
      '--accent-rose':        '#f87171',
      '--accent-rose-light':  'rgba(248,113,113,0.12)',
      '--accent-purple':      '#86efac',
      '--bg-page':            '#020c04',
      '--bg-surface':         'rgba(4,16,7,0.88)',
      '--bg-surface-raised':  '#071408',
      '--bg-subtle':          '#0e200f',
      '--bg-dark':            '#010802',
      '--bg-dark-card':       '#061009',
      '--bg-dark-subtle':     '#152817',
      '--border-subtle':      'rgba(34,197,94,0.20)',
      '--border-medium':      'rgba(74,222,128,0.24)',
      '--border-focus':       '#4ade80',
      '--text-main':          '#f0fff4',
      '--text-muted':         '#86efac',
      '--text-light':         '#4ade80',
      '--text-inverse':       '#020c04',
      '--text-link':          '#86efac',
      '--shadow-card':        '0 2px 8px rgba(34,197,94,0.10)',
      '--shadow-card-hover':  '0 12px 26px rgba(34,197,94,0.24)',
      '--editor-bg':          '#010a02',
      '--editor-toolbar':     '#06100a',
      '--editor-border':      '#0e2010',
      '--editor-gutter':      '#000801',
      '--editor-text':        '#d0ffd4',
      '--editor-muted':       '#2a6030',
      '--editor-select-bg':   '#16a34a',
      '--editor-output-bg':   '#000a01',
      '--editor-output-text': '#4ade80',
      '--editor-stdin-bg':    '#050e06',
      '--editor-terminal-hd': '#081408',
      '--editor-run-btn':     '#22c55e',
      '--editor-run-hover':   '#16a34a',
    },
    bodyGradient: `
      radial-gradient(circle at 12% 10%, rgba(34,197,94,0.18), transparent 28rem),
      radial-gradient(circle at 88% 25%, rgba(74,222,128,0.10), transparent 30rem),
      #020c04`,
    orb1: 'rgba(34,197,94,0.40)',
    orb2: 'rgba(74,222,128,0.18)',
  },

  'aurora-pastel': {
    id: 'aurora-pastel',
    name: 'Aurora Pastel',
    description: 'Dreamy lavender skies with pastel pink, mint and warm cream for a soft, creative workspace.',
    emoji: '🌸',
    gradient: 'linear-gradient(135deg, #f8f0ff 0%, #fce4f3 50%, #e8f8f0 100%)',
    previewAccent: '#d946ef',
    previewSecondary: '#a855f7',
    previewBg: '#fdf4ff',
    tags: ['Light', 'Pastel', 'Creative'],
    vars: {
      '--primary':            '#c026d3',
      '--primary-hover':      '#a21caf',
      '--primary-light':      'rgba(192,38,211,0.10)',
      '--primary-dark':       '#701a75',
      '--primary-glow':       'rgba(192,38,211,0.20)',
      '--accent-cyan':        '#06b6d4',
      '--accent-emerald':     '#10b981',
      '--accent-emerald-light':'rgba(16,185,129,0.10)',
      '--accent-amber':       '#f59e0b',
      '--accent-amber-light': 'rgba(245,158,11,0.10)',
      '--accent-rose':        '#e11d48',
      '--accent-rose-light':  'rgba(225,29,72,0.10)',
      '--accent-purple':      '#a855f7',
      '--bg-page':            '#fdf4ff',
      '--bg-surface':         'rgba(255,248,255,0.92)',
      '--bg-surface-raised':  '#fff0fe',
      '--bg-subtle':          '#f3e8ff',
      '--bg-dark':            '#fce4f3',
      '--bg-dark-card':       '#f8f0ff',
      '--bg-dark-subtle':     '#ede4f8',
      '--border-subtle':      'rgba(192,38,211,0.16)',
      '--border-medium':      'rgba(168,85,247,0.22)',
      '--border-focus':       '#c026d3',
      '--text-main':          '#2d1b3d',
      '--text-muted':         '#6b4a7e',
      '--text-light':         '#9d7ab2',
      '--text-inverse':       '#ffffff',
      '--text-link':          '#9333ea',
      '--shadow-card':        '0 2px 8px rgba(192,38,211,0.08)',
      '--shadow-card-hover':  '0 12px 26px rgba(192,38,211,0.16)',
      '--editor-bg':          '#1a0428',
      '--editor-toolbar':     '#2a0840',
      '--editor-border':      '#3d1055',
      '--editor-gutter':      '#12021e',
      '--editor-text':        '#f5e8ff',
      '--editor-muted':       '#7040a0',
      '--editor-select-bg':   '#a21caf',
      '--editor-output-bg':   '#100018',
      '--editor-output-text': '#d8a4f8',
      '--editor-stdin-bg':    '#160428',
      '--editor-terminal-hd': '#200530',
      '--editor-run-btn':     '#10b981',
      '--editor-run-hover':   '#059669',
    },
    bodyGradient: `
      radial-gradient(circle at 12% 10%, rgba(192,38,211,0.12), transparent 28rem),
      radial-gradient(circle at 88% 25%, rgba(16,185,129,0.08), transparent 30rem),
      #fdf4ff`,
    orb1: 'rgba(192,38,211,0.20)',
    orb2: 'rgba(168,85,247,0.14)',
  },
};

export const THEME_IDS = Object.keys(THEMES);
export const DEFAULT_THEME = 'cyber-lab';
const STORAGE_KEY = 'ds_library_theme_v1';

// ─── Theme Application ────────────────────────────────────────────────────────

/**
 * Apply a theme by injecting its CSS variables on :root and updating body style.
 * Also updates the <html> data-theme attribute for any CSS selectors.
 */
export function applyTheme(themeId, save = true) {
  const theme = THEMES[themeId] || THEMES[DEFAULT_THEME];
  const root = document.documentElement;

  // Set data-theme attribute for CSS targeting
  root.setAttribute('data-theme', theme.id);

  // Apply all CSS variables to :root
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Apply body background gradient
  document.body.style.background = theme.bodyGradient;

  // Update the animated orb colors
  injectOrbStyles(theme);

  // Update the highlight.js theme dynamically
  updateHighlightTheme(theme.id);

  // Persist to localStorage
  if (save) {
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch { /* ignore */ }
  }

  // Dispatch event so components can react
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: { themeId: theme.id, theme } }));
}

/**
 * Inject dynamic orb styles that can't be done with CSS variables alone
 * (because ::before and ::after pseudo-elements can't use var() for background directly in all cases)
 */
function injectOrbStyles(theme) {
  const styleId = 'ds-theme-orbs';
  let el = document.getElementById(styleId);
  if (!el) {
    el = document.createElement('style');
    el.id = styleId;
    document.head.appendChild(el);
  }
  el.textContent = `
    body::before { background: ${theme.orb1} !important; }
    body::after  { background: ${theme.orb2} !important; }
  `;
}

/**
 * Swap the highlight.js CSS theme link to match the selected website theme.
 */
function updateHighlightTheme(themeId) {
  const styleId = 'ds-hljs-theme';
  let el = document.getElementById(styleId);
  if (!el) {
    el = document.createElement('link');
    el.id = styleId;
    el.rel = 'stylesheet';
    document.head.appendChild(el);
  }

  // Light themes get a light hljs theme; dark themes get dark
  const lightThemes = ['scholar-light', 'aurora-pastel'];
  if (lightThemes.includes(themeId)) {
    el.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/atom-one-light.min.css';
  } else if (themeId === 'terminal-green') {
    el.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/green-screen.min.css';
  } else if (themeId === 'cyber-lab') {
    el.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-dark.min.css';
  } else if (themeId === 'ai-neural') {
    el.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/material-palenight.min.css';
  } else {
    el.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css';
  }
}

/**
 * Inject editor-specific CSS variable overrides from current theme.
 * Called once on startup and on every theme change.
 */
export function injectEditorThemeVars(themeId) {
  const theme = THEMES[themeId] || THEMES[DEFAULT_THEME];
  const styleId = 'ds-editor-theme';
  let el = document.getElementById(styleId);
  if (!el) {
    el = document.createElement('style');
    el.id = styleId;
    document.head.appendChild(el);
  }
  const v = theme.vars;
  el.textContent = `
    .code-editor-container {
      background: ${v['--editor-bg']} !important;
      border-color: ${v['--editor-border']} !important;
    }
    .editor-toolbar {
      background: ${v['--editor-toolbar']} !important;
      border-color: ${v['--editor-border']} !important;
    }
    .editor-main-area { background: ${v['--editor-bg']} !important; }
    .editor-language-select {
      background: ${v['--editor-bg']} !important;
      border-color: ${v['--editor-border']} !important;
      color: ${v['--editor-text']} !important;
    }
    .editor-language-select option {
      background: ${v['--editor-bg']} !important;
      color: ${v['--editor-text']} !important;
    }
    .editor-lang-tag {
      background: ${v['--editor-bg']} !important;
      border-color: ${v['--editor-border']} !important;
      color: ${v['--editor-muted']} !important;
    }
    .line-numbers-gutter {
      background: ${v['--editor-gutter']} !important;
      border-color: ${v['--editor-toolbar']} !important;
      color: ${v['--editor-muted']} !important;
    }
    .editor-textarea { caret-color: ${v['--editor-text']} !important; }
    .editor-textarea::selection { background: ${v['--editor-select-bg']} !important; }
    .editor-stdin-panel {
      background: ${v['--editor-stdin-bg']} !important;
      border-color: ${v['--editor-border']} !important;
    }
    .editor-stdin-input {
      background: ${v['--editor-gutter']} !important;
      border-color: ${v['--editor-border']} !important;
      color: ${v['--editor-text']} !important;
    }
    .terminal-output-container { background: ${v['--editor-output-bg']} !important; }
    .terminal-header {
      background: ${v['--editor-terminal-hd']} !important;
      border-color: ${v['--editor-border']} !important;
    }
    .terminal-body { color: ${v['--editor-output-text']} !important; }
    .editor-btn-run {
      background: ${v['--editor-run-btn']} !important;
      box-shadow: 0 2px 6px ${v['--editor-run-btn']}55 !important;
    }
    .editor-btn-run:hover { background: ${v['--editor-run-hover']} !important; }
    .editor-btn-secondary {
      background: ${v['--editor-border']} !important;
      color: ${v['--editor-text']} !important;
    }
    .editor-btn-secondary:hover {
      background: ${v['--editor-toolbar']} !important;
    }
    .editor-preview-frame:not([hidden]) {
      border-color: ${v['--editor-border']} !important;
    }
  `;
}

// ─── Persistence ──────────────────────────────────────────────────────────────

export function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved && THEMES[saved]) ? saved : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function initTheme() {
  const themeId = getSavedTheme();
  applyTheme(themeId, false);   // apply without re-saving (it's already saved)
  injectEditorThemeVars(themeId);

  // Listen for future changes to also update editor vars
  window.addEventListener('theme-changed', (e) => {
    injectEditorThemeVars(e.detail.themeId);
  });
}
