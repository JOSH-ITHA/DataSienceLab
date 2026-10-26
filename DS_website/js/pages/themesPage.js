/**
 * THEMES PAGE
 * Interactive Theme Gallery — preview and apply any of the six website themes.
 */

import { THEMES, THEME_IDS, getSavedTheme, applyTheme } from '../data/themes.js';
import { Toast } from '../components/toast.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// ─── Preview Modal ────────────────────────────────────────────────────────────

function buildPreviewModal(themeId) {
  const theme = THEMES[themeId];
  const bg = theme.vars['--bg-page'];
  const surface = theme.vars['--bg-surface-raised'] || theme.vars['--bg-surface'];
  const primary = theme.vars['--primary'];
  const textMain = theme.vars['--text-main'];
  const textMuted = theme.vars['--text-muted'];
  const border = theme.vars['--border-subtle'];
  const accent = theme.vars['--accent-cyan'];
  const editorBg = theme.vars['--editor-bg'];
  const editorToolbar = theme.vars['--editor-toolbar'];
  const editorBorder = theme.vars['--editor-border'];
  const editorText = theme.vars['--editor-text'];
  const editorMuted = theme.vars['--editor-muted'];
  const editorOutputBg = theme.vars['--editor-output-bg'];
  const editorOutputText = theme.vars['--editor-output-text'];
  const runBtn = theme.vars['--editor-run-btn'];
  const subtle = theme.vars['--bg-subtle'];

  return `
<div class="theme-preview-modal-overlay" id="theme-preview-overlay" role="dialog" aria-modal="true" aria-label="Preview ${escHtml(theme.name)}">
  <div class="theme-preview-modal" role="document">
    <div class="tpm-header" style="background:${primary};color:#fff;">
      <span class="tpm-emoji" aria-hidden="true">${escHtml(theme.emoji)}</span>
      <div class="tpm-header-text">
        <strong>${escHtml(theme.name)}</strong>
        <span>${escHtml(theme.description)}</span>
      </div>
      <button class="tpm-close" id="tpm-close-btn" aria-label="Close preview">&times;</button>
    </div>

    <div class="tpm-body" style="background:${bg}; color:${textMain};">

      <!-- Nav bar preview -->
      <div class="tpm-section-label" style="color:${textMuted};">Navigation Bar</div>
      <div class="tpm-navbar-preview" style="background:${surface}; border:1px solid ${border}; border-radius:8px; padding:0.6rem 1rem; display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <div style="width:28px;height:28px;border-radius:7px;background:${primary};flex-shrink:0;"></div>
        <span style="font-weight:800;font-size:0.75rem;letter-spacing:0.04em;color:${textMain};">DATA SCIENCE LIBRARY</span>
        <div style="margin-left:auto;display:flex;gap:0.4rem;">
          ${['HOME','MODULES','LAB','THEMES'].map((l, i) => `<div style="padding:0.25rem 0.5rem;border-radius:5px;font-size:0.65rem;font-weight:700;${i===3?`background:${primary};color:#fff;`:`color:${textMuted};`}">${l}</div>`).join('')}
        </div>
      </div>

      <!-- Student ID card preview -->
      <div class="tpm-section-label" style="color:${textMuted};">Student ID Card</div>
      <div style="background:${surface};border:1px solid ${border};border-radius:12px;padding:1rem;margin-bottom:1rem;display:flex;gap:1rem;align-items:center;">
        <div style="width:54px;height:54px;border-radius:50%;background:${primary};display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.25rem;font-weight:800;flex-shrink:0;">J</div>
        <div>
          <div style="font-weight:800;font-size:0.95rem;color:${textMain};">Joshitha Upati</div>
          <div style="font-size:0.75rem;color:${textMuted};">22K61A6641 · Data Science</div>
          <div style="margin-top:0.4rem;display:inline-block;background:${primary};color:#fff;font-size:0.65rem;padding:0.15rem 0.5rem;border-radius:999px;font-weight:700;">Active Student</div>
        </div>
        <div style="margin-left:auto;text-align:right;">
          <div style="font-size:0.7rem;color:${textMuted};">Overall Progress</div>
          <div style="font-weight:800;color:${primary};font-size:1.1rem;">72%</div>
        </div>
      </div>

      <!-- Module card preview -->
      <div class="tpm-section-label" style="color:${textMuted};">Module Card</div>
      <div style="background:${surface};border:1px solid ${border};border-radius:12px;padding:1rem;margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem;">
          <div style="font-size:0.7rem;font-weight:700;background:${subtle};color:${textMuted};padding:0.15rem 0.5rem;border-radius:4px;">MODULE 01</div>
          <div style="font-size:0.7rem;background:${subtle};color:${accent};padding:0.15rem 0.5rem;border-radius:999px;font-weight:600;">In Progress</div>
        </div>
        <div style="font-weight:700;font-size:0.9rem;color:${textMain};margin-bottom:0.35rem;">Introduction to Data Science</div>
        <div style="font-size:0.75rem;color:${textMuted};line-height:1.4;">Foundations of data science methodology, tools and workflows.</div>
        <div style="margin-top:0.6rem;height:5px;background:${subtle};border-radius:999px;overflow:hidden;">
          <div style="width:65%;height:100%;background:${primary};border-radius:999px;"></div>
        </div>
      </div>

      <!-- Code editor preview -->
      <div class="tpm-section-label" style="color:${textMuted};">Code Editor</div>
      <div style="background:${editorBg};border:1px solid ${editorBorder};border-radius:10px;overflow:hidden;font-family:monospace;font-size:0.75rem;">
        <div style="background:${editorToolbar};border-bottom:1px solid ${editorBorder};padding:0.5rem 0.75rem;display:flex;align-items:center;gap:0.5rem;">
          <div style="display:flex;gap:4px;"><span style="width:9px;height:9px;border-radius:50%;background:#ef4444;display:inline-block;"></span><span style="width:9px;height:9px;border-radius:50%;background:#f59e0b;display:inline-block;"></span><span style="width:9px;height:9px;border-radius:50%;background:#10b981;display:inline-block;"></span></div>
          <span style="color:${editorMuted};font-size:0.65rem;font-weight:700;letter-spacing:0.05em;">PYTHON</span>
          <div style="margin-left:auto;background:${runBtn};color:#fff;font-size:0.65rem;font-weight:700;padding:0.2rem 0.55rem;border-radius:4px;">▶ RUN</div>
        </div>
        <div style="padding:0.6rem 0.75rem;color:${editorText};line-height:1.6;">
          <span style="color:${primary};">import</span> pandas <span style="color:${primary};">as</span> pd<br>
          df = pd.DataFrame({<span style="color:${accent};">'score'</span>: [95, 88, 72]})<br>
          <span style="color:${runBtn};">print</span>(df.describe())
        </div>
        <div style="background:${editorOutputBg};border-top:1px solid ${editorBorder};padding:0.5rem 0.75rem;color:${editorOutputText};">
          &gt; mean: 85.0 &nbsp; std: 11.79
        </div>
      </div>

    </div>

    <div class="tpm-footer" style="background:${surface};border-top:1px solid ${border};">
      <div class="tpm-tags">
        ${theme.tags.map(t => `<span class="tpm-tag" style="background:${subtle};color:${textMuted};border:1px solid ${border};">${escHtml(t)}</span>`).join('')}
      </div>
      <div class="tpm-footer-actions">
        <button class="tpm-btn-cancel" id="tpm-cancel-btn">Cancel</button>
        <button class="tpm-btn-apply" id="tpm-apply-btn" data-theme-id="${escHtml(themeId)}" style="background:${primary};">
          Apply Theme
        </button>
      </div>
    </div>
  </div>
</div>
`;
}

// ─── Theme Card ───────────────────────────────────────────────────────────────

function buildThemeCard(themeId, activeThemeId) {
  const theme = THEMES[themeId];
  const isActive = themeId === activeThemeId;

  // Mini preview swatches
  const swatchColors = [
    theme.vars['--bg-page'],
    theme.vars['--primary'],
    theme.vars['--accent-cyan'],
    theme.vars['--text-main'],
  ];

  const tagsHtml = theme.tags.map(t => `<span class="tgc-tag">${escHtml(t)}</span>`).join('');

  return `
<div class="theme-gallery-card ${isActive ? 'is-active' : ''}" data-theme-id="${escHtml(themeId)}" role="article" aria-label="${escHtml(theme.name)} theme${isActive ? ' (currently active)' : ''}">

  <!-- Visual preview swatch area -->
  <div class="tgc-preview" style="background:${escHtml(theme.gradient)};" aria-hidden="true">
    <div class="tgc-preview-inner">
      <!-- Mini navbar -->
      <div class="tgc-mini-nav" style="background:${escHtml(theme.vars['--bg-surface-raised'])}; border:1px solid ${escHtml(theme.vars['--border-subtle'])};">
        <div class="tgc-mini-dot" style="background:${escHtml(theme.previewAccent)};"></div>
        <div class="tgc-mini-bars">
          <div class="tgc-mini-bar" style="background:${escHtml(theme.vars['--text-muted'])};width:32px;opacity:0.6;"></div>
          <div class="tgc-mini-bar" style="background:${escHtml(theme.previewAccent)};width:20px;"></div>
          <div class="tgc-mini-bar" style="background:${escHtml(theme.vars['--text-muted'])};width:24px;opacity:0.6;"></div>
        </div>
      </div>
      <!-- Mini card -->
      <div class="tgc-mini-card" style="background:${escHtml(theme.vars['--bg-surface-raised'])}; border:1px solid ${escHtml(theme.vars['--border-subtle'])};">
        <div class="tgc-mini-card-bar" style="background:${escHtml(theme.previewAccent)};"></div>
        <div class="tgc-mini-card-lines">
          <div style="background:${escHtml(theme.vars['--text-main'])};width:70%;height:4px;border-radius:2px;opacity:0.8;"></div>
          <div style="background:${escHtml(theme.vars['--text-muted'])};width:90%;height:3px;border-radius:2px;opacity:0.5;"></div>
          <div style="background:${escHtml(theme.vars['--text-muted'])};width:55%;height:3px;border-radius:2px;opacity:0.4;"></div>
        </div>
      </div>
      <!-- Mini editor snippet -->
      <div class="tgc-mini-editor" style="background:${escHtml(theme.vars['--editor-bg'])}; border:1px solid ${escHtml(theme.vars['--editor-border'])};">
        <div class="tgc-editor-dots">
          <span style="background:#ef4444;"></span><span style="background:#f59e0b;"></span><span style="background:#10b981;"></span>
        </div>
        <div class="tgc-editor-lines">
          <div style="background:${escHtml(theme.previewAccent)};width:40%;height:3px;border-radius:2px;opacity:0.8;"></div>
          <div style="background:${escHtml(theme.vars['--editor-text']||theme.vars['--text-main'])};width:65%;height:3px;border-radius:2px;opacity:0.7;"></div>
          <div style="background:${escHtml(theme.previewSecondary)};width:50%;height:3px;border-radius:2px;opacity:0.8;"></div>
        </div>
      </div>
    </div>
    <!-- Active badge overlay -->
    ${isActive ? `<div class="tgc-active-badge" aria-label="Currently active theme"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Active</div>` : ''}
    <!-- Color palette swatches -->
    <div class="tgc-swatches" aria-hidden="true">
      ${swatchColors.map(c => `<div class="tgc-swatch" style="background:${escHtml(c)};"></div>`).join('')}
    </div>
  </div>

  <!-- Card content -->
  <div class="tgc-body">
    <div class="tgc-header-row">
      <span class="tgc-emoji" aria-hidden="true">${escHtml(theme.emoji)}</span>
      <h3 class="tgc-name">${escHtml(theme.name)}</h3>
    </div>
    <p class="tgc-desc">${escHtml(theme.description)}</p>
    <div class="tgc-tags" aria-label="Theme tags">${tagsHtml}</div>
  </div>

  <!-- Card actions -->
  <div class="tgc-footer">
    <button class="tgc-preview-btn" data-theme-id="${escHtml(themeId)}" aria-label="Preview ${escHtml(theme.name)} theme">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      Preview
    </button>
    <button class="tgc-apply-btn ${isActive ? 'is-active' : ''}" data-theme-id="${escHtml(themeId)}" aria-pressed="${isActive}" aria-label="${isActive ? 'Currently active' : 'Apply'} ${escHtml(theme.name)} theme">
      ${isActive
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Active`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5 3 19 12 5 21 5 3"></polyline></svg> Apply Theme`
      }
    </button>
  </div>
</div>
`;
}

// ─── Page Render ──────────────────────────────────────────────────────────────

export function renderThemesPage() {
  const activeThemeId = getSavedTheme();
  const activeTheme = THEMES[activeThemeId];

  const cardsHtml = THEME_IDS.map(id => buildThemeCard(id, activeThemeId)).join('');

  return `
<div class="container fade-in">

  <!-- Page Header -->
  <div class="page-header">
    <div class="page-header-row">
      <div class="page-title-group">
        <div class="page-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a10 10 0 0 0 0 20"></path><path d="M12 2a10 10 0 0 1 0 20"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>
          Theme Gallery
        </div>
        <h1 class="page-title">Choose Your Theme</h1>
        <p class="page-subtitle">Personalise the entire website with one click. Your selection is saved and stays consistent across all pages.</p>
      </div>
    </div>

    <!-- Currently active theme banner -->
    <div class="theme-active-banner" aria-live="polite" id="theme-active-banner">
      <span class="tab-active-emoji" aria-hidden="true">${escHtml(activeTheme.emoji)}</span>
      <span>Active theme: <strong id="theme-active-name">${escHtml(activeTheme.name)}</strong></span>
      <span class="tab-active-desc" id="theme-active-desc">${escHtml(activeTheme.description)}</span>
    </div>
  </div>

  <!-- Dark / Light quick toggle -->
  <div class="theme-dl-bar">
    <span class="theme-dl-label">Quick Filter:</span>
    <div class="theme-dl-chips" role="group" aria-label="Filter themes by mode">
      <button class="theme-dl-chip active" data-filter="all">All Themes</button>
      <button class="theme-dl-chip" data-filter="Dark">Dark</button>
      <button class="theme-dl-chip" data-filter="Light">Light</button>
    </div>
    <button class="theme-reset-btn" id="theme-reset-default" title="Reset to the original Cyber Lab design" aria-label="Reset to default Cyber Lab theme">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-5.09"></path></svg>
      Reset to Default
    </button>
  </div>

  <!-- Theme cards grid -->
  <div class="theme-gallery-grid" id="theme-gallery-grid" role="list">
    ${cardsHtml}
  </div>

  <!-- Tips section -->
  <div class="theme-tips-section">
    <h2 class="theme-tips-title">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      Theme Tips
    </h2>
    <div class="theme-tips-grid">
      <div class="theme-tip-card">
        <span class="theme-tip-emoji" aria-hidden="true">⚡</span>
        <div><strong>Cyber Lab (Default)</strong> — Best for coding sessions in the virtual lab. The neon palette makes the code editor feel like a real IDE.</div>
      </div>
      <div class="theme-tip-card">
        <span class="theme-tip-emoji" aria-hidden="true">📖</span>
        <div><strong>Scholar Light</strong> — Ideal for long PDF reading sessions. The high-contrast light background reduces eye strain significantly.</div>
      </div>
      <div class="theme-tip-card">
        <span class="theme-tip-emoji" aria-hidden="true">💡</span>
        <div>Use the <strong>theme switcher</strong> in the navbar to swap themes from any page without visiting the gallery.</div>
      </div>
    </div>
  </div>

</div>
`;
}

// ─── Listeners ────────────────────────────────────────────────────────────────

export function attachThemesPageListeners() {
  const grid = document.getElementById('theme-gallery-grid');
  if (!grid) return;

  let previewOverlay = null;

  // ── Apply Theme ────────────────────────────────────────────────────────────
  function handleApply(themeId) {
    applyTheme(themeId);
    const theme = THEMES[themeId];
    Toast.success(`${theme.emoji} ${theme.name} applied!`);

    // Update active banner
    const banner = document.getElementById('theme-active-banner');
    const nameEl = document.getElementById('theme-active-name');
    const descEl = document.getElementById('theme-active-desc');
    const emojiEl = document.querySelector('.tab-active-emoji');
    if (nameEl) nameEl.textContent = theme.name;
    if (descEl) descEl.textContent = theme.description;
    if (emojiEl) emojiEl.textContent = theme.emoji;

    // Re-render cards to update active states
    const activeThemeId = themeId;
    THEME_IDS.forEach(id => {
      const card = grid.querySelector(`[data-theme-id="${id}"]`);
      if (!card) return;
      const isActive = id === activeThemeId;
      card.classList.toggle('is-active', isActive);

      const applyBtn = card.querySelector('.tgc-apply-btn');
      if (applyBtn) {
        applyBtn.classList.toggle('is-active', isActive);
        applyBtn.setAttribute('aria-pressed', String(isActive));
        applyBtn.innerHTML = isActive
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Active`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5 3 19 12 5 21 5 3"></polyline></svg> Apply Theme`;
      }

      // Update active badge on preview area
      const previewArea = card.querySelector('.tgc-preview');
      if (previewArea) {
        const existing = previewArea.querySelector('.tgc-active-badge');
        if (isActive && !existing) {
          const badge = document.createElement('div');
          badge.className = 'tgc-active-badge';
          badge.setAttribute('aria-label', 'Currently active theme');
          badge.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Active`;
          previewArea.appendChild(badge);
        } else if (!isActive && existing) {
          existing.remove();
        }
      }
    });

    // Update navbar dropdown if present
    updateNavbarDropdownActive(themeId);
  }

  // ── Open Preview Modal ─────────────────────────────────────────────────────
  function openPreview(themeId) {
    if (previewOverlay) previewOverlay.remove();
    const html = buildPreviewModal(themeId);
    const container = document.createElement('div');
    container.innerHTML = html;
    previewOverlay = container.firstElementChild;
    document.body.appendChild(previewOverlay);

    // Animate in
    requestAnimationFrame(() => previewOverlay.classList.add('is-open'));

    const closeBtn = document.getElementById('tpm-close-btn');
    const cancelBtn = document.getElementById('tpm-cancel-btn');
    const applyBtn = document.getElementById('tpm-apply-btn');

    function close() {
      previewOverlay.classList.remove('is-open');
      setTimeout(() => { if (previewOverlay) { previewOverlay.remove(); previewOverlay = null; } }, 300);
    }

    closeBtn?.addEventListener('click', close);
    cancelBtn?.addEventListener('click', close);
    previewOverlay.addEventListener('click', e => { if (e.target === previewOverlay) close(); });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    applyBtn?.addEventListener('click', () => {
      handleApply(themeId);
      close();
    });
  }

  // ── Event Delegation on Grid ───────────────────────────────────────────────
  grid.addEventListener('click', e => {
    const applyBtn = e.target.closest('.tgc-apply-btn');
    const previewBtn = e.target.closest('.tgc-preview-btn');
    if (applyBtn) {
      handleApply(applyBtn.dataset.themeId);
    } else if (previewBtn) {
      openPreview(previewBtn.dataset.themeId);
    }
  });

  // Keyboard accessibility for cards
  grid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const applyBtn = e.target.closest('.tgc-apply-btn');
      const previewBtn = e.target.closest('.tgc-preview-btn');
      if (applyBtn) { e.preventDefault(); handleApply(applyBtn.dataset.themeId); }
      if (previewBtn) { e.preventDefault(); openPreview(previewBtn.dataset.themeId); }
    }
  });

  // ── Filter chips ───────────────────────────────────────────────────────────
  document.querySelectorAll('.theme-dl-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.theme-dl-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      THEME_IDS.forEach(id => {
        const card = grid.querySelector(`[data-theme-id="${id}"]`);
        if (!card) return;
        const theme = THEMES[id];
        const show = filter === 'all' || theme.tags.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // ── Reset to Default ──────────────────────────────────────────────────────
  document.getElementById('theme-reset-default')?.addEventListener('click', () => {
    handleApply('cyber-lab');
  });
}

// Helper: update the navbar dropdown active state if it exists
function updateNavbarDropdownActive(themeId) {
  document.querySelectorAll('[data-theme-switch]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.themeSwitch === themeId);
    const check = btn.querySelector('.theme-switch-check');
    if (check) check.style.display = btn.dataset.themeSwitch === themeId ? '' : 'none';
  });
}
