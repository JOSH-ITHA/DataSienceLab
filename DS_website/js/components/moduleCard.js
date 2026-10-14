/**
 * MODULE CARD & MODULE DETAIL MODAL COMPONENT
 */

import { Storage } from '../data/storage.js';
import { Toast } from './toast.js';

const localModulePdfs = {
  'mod-1': 'assets/pdfs/module-1-introduction-to-data-science.pdf',
  'mod-2': 'assets/pdfs/module-2-data-extraction.pdf',
  'mod-3': 'assets/pdfs/module-3-study-guide.pdf',
  'mod-4': 'assets/pdfs/module-4-study-guide.pdf',
  'mod-5': 'assets/pdfs/module-5-study-guide.pdf'
};

export function renderModuleCard(module) {
  let progressBadge = '';
  if (module.progress === 'completed' || module.completed) {
    progressBadge = `<span class="status-indicator status-completed">● Completed</span>`;
  } else if (module.progress === 'in_progress') {
    progressBadge = `<span class="status-indicator status-in-progress">◐ In Progress</span>`;
  } else {
    progressBadge = `<span class="status-indicator status-not-started">○ Not Started</span>`;
  }

  const topicsArray = Array.isArray(module.topics) 
    ? module.topics 
    : String(module.topics || '').split('\n').filter(Boolean);

  const topicsHtml = topicsArray.slice(0, 3).map(t => `<span class="topic-tag">${t.trim()}</span>`).join('');
  const extraTopics = topicsArray.length > 3 ? `<span class="topic-tag">+${topicsArray.length - 3} more</span>` : '';

  // Back face: numbered topic list
  const backTopicsHtml = topicsArray.map((t, i) => `
    <div class="back-topic-row">
      <span class="back-topic-num">${i + 1}</span>
      <span>${t.trim()}</span>
    </div>
  `).join('');

  return `
    <div class="module-flip-scene fade-in" id="scene-${module.id}">
      <div class="module-card" id="card-${module.id}">

        <!-- FRONT FACE -->
        <div class="module-card-front">
          <div class="module-card-header">
            <span class="module-num-badge">MODULE ${module.moduleNumber}</span>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              ${progressBadge}
              <button class="flip-btn btn-flip-module" data-id="${module.id}" title="See all topics">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                TOPICS
              </button>
            </div>
          </div>
          <div class="module-card-body">
            <h3 class="module-title">${module.title}</h3>
            <p class="module-desc">${module.description}</p>
            <div class="module-topics-preview">
              ${topicsHtml}
              ${extraTopics}
            </div>
            <div class="module-card-footer">
              <button class="btn btn-primary btn-sm btn-view-module" data-id="${module.id}">
                VIEW MORE
              </button>
            </div>
          </div>
        </div>

        <!-- BACK FACE -->
        <div class="module-card-back">
          <div class="module-back-header">
            <span class="module-back-title">${module.title}</span>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="flip-back-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                ${topicsArray.length} Topics
              </span>
              <button class="flip-back-close btn-flip-module" data-id="${module.id}" title="Back to card">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path></svg>
                ← Back
              </button>
            </div>
          </div>
          <div class="module-back-topics">
            ${backTopicsHtml}
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Open Detailed Module Viewer Modal
 */
export function openModuleDetailModal(moduleId) {
  const module = Storage.getModuleById(moduleId);
  if (!module) return;

  let modalOverlay = document.getElementById('module-detail-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'module-detail-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const objectives = Array.isArray(module.objectives)
    ? module.objectives
    : String(module.objectives || '').split('\n').filter(Boolean);

  const topics = Array.isArray(module.topics)
    ? module.topics
    : String(module.topics || '').split('\n').filter(Boolean);

  const topicDetails = Array.isArray(module.topicDetails) ? module.topicDetails : [];
  const modulePdf = module.pdfFile || localModulePdfs[module.id];

  modalOverlay.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span class="module-num-badge">MODULE ${module.moduleNumber}</span>
          <h3 class="modal-title">${module.title}</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-mod-detail" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Status & Progress Selector -->
        <div style="background:var(--bg-page); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle); margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Current Module Status</span>
            <div style="margin-top:0.25rem;">
              <select id="select-module-progress" class="form-control" style="font-weight:600; padding:0.4rem 0.75rem; width:auto;">
                <option value="not_started" ${module.progress === 'not_started' ? 'selected' : ''}>○ Not Started</option>
                <option value="in_progress" ${module.progress === 'in_progress' ? 'selected' : ''}>◐ In Progress</option>
                <option value="completed" ${module.progress === 'completed' || module.completed ? 'selected' : ''}>● Completed</option>
              </select>
            </div>
          </div>

          <button class="btn btn-success btn-sm" id="btn-toggle-module-completed">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${module.completed || module.progress === 'completed' ? 'Marked as Completed ✓' : 'MARK AS COMPLETED'}
          </button>
        </div>

        <!-- Overview Description -->
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">Description</h4>
          <p style="font-size:0.925rem; color:var(--text-muted); line-height:1.6;">${module.description}</p>
        </div>

        ${modulePdf ? `
          <section class="module-pdf-section" aria-labelledby="module-pdf-title">
            <div class="module-pdf-header">
              <div>
                <h4 id="module-pdf-title">Module ${module.moduleNumber} Full Notes</h4>
                <p>Open the course PDF in the full-size reader.</p>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-open-module-pdf" type="button">
                OPEN PDF ↗
              </button>
            </div>
          </section>
        ` : ''}

        <!-- Learning Objectives -->
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.6rem;">Learning Objectives</h4>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            ${objectives.map(obj => `
              <div style="display:flex; align-items:flex-start; gap:0.6rem; font-size:0.875rem; color:var(--text-main);">
                <span style="color:var(--primary); font-weight:bold;">✓</span>
                <span>${obj}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Topics Covered — Detailed Cards -->
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Topics Covered
            <span style="font-size:0.75rem; font-weight:600; background:var(--primary); color:#fff; border-radius:9999px; padding:0.1rem 0.6rem;">${topicDetails.length || topics.length}</span>
          </h4>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${topicDetails.length > 0
              ? topicDetails.map((td, i) => `
                <div style="border:1px solid var(--border-subtle); border-radius:var(--radius-md); overflow:hidden; background:var(--bg-card);">
                  <div style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem 1rem; background:var(--bg-page); border-bottom:1px solid var(--border-subtle);">
                    <span style="flex-shrink:0; width:26px; height:26px; border-radius:50%; background:var(--primary); color:#fff; font-size:0.72rem; font-weight:800; display:flex; align-items:center; justify-content:center;">${i + 1}</span>
                    <span style="font-size:0.9rem; font-weight:700; color:var(--text-main); line-height:1.4;">${td.topic}</span>
                  </div>
                  <div style="padding:0.85rem 1rem 0.85rem 1rem; font-size:0.855rem; color:var(--text-muted); line-height:1.75; border-left:3px solid var(--primary);">
                    ${td.explanation}
                  </div>
                </div>
              `).join('')
              : topics.map((top, i) => `
                <div style="border:1px solid var(--border-subtle); border-radius:var(--radius-md); overflow:hidden; background:var(--bg-card);">
                  <div style="display:flex; align-items:center; gap:0.75rem; padding:0.75rem 1rem; background:var(--bg-page);">
                    <span style="flex-shrink:0; width:26px; height:26px; border-radius:50%; background:var(--primary); color:#fff; font-size:0.72rem; font-weight:800; display:flex; align-items:center; justify-content:center;">${i + 1}</span>
                    <span style="font-size:0.875rem; font-weight:600; color:var(--text-main);">${top}</span>
                  </div>
                </div>
              `).join('')
            }
          </div>
        </div>

        <!-- Learning Material / Notes -->
        ${module.notes ? `
          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">Learning Material & Lecture Notes</h4>
            <div style="background:#eff6ff; border-left:4px solid var(--primary); padding:1rem 1.25rem; border-radius:0 var(--radius-md) var(--radius-md) 0; font-size:0.875rem; color:#1e3a8a; line-height:1.6;">
              ${module.notes}
            </div>
          </div>
        ` : ''}

        <!-- Resources & Video Links -->
        <div>
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.6rem;">Academic Resources & Reference Links</h4>
          <div style="display:flex; flex-direction:column; gap:0.6rem; font-size:0.875rem;">
            ${module.pdfLink && !modulePdf ? `
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <span style="font-weight:600; color:var(--text-main);">Lecture Notes / PDF:</span>
                <a href="${module.pdfLink}" target="_blank" rel="noopener noreferrer" style="color:var(--primary); text-decoration:underline;">View Notes / Reference Manual ↗</a>
              </div>
            ` : ''}
            ${module.pdfLink && modulePdf ? `
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <span style="font-weight:600; color:var(--text-main);">Additional Reference:</span>
                <a href="${module.pdfLink}" target="_blank" rel="noopener noreferrer" style="color:var(--primary); text-decoration:underline;">Open online reference ↗</a>
              </div>
            ` : ''}
            ${module.videoLink ? `
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <span style="font-weight:600; color:var(--text-main);">Video Lecture:</span>
                <a href="${module.videoLink}" target="_blank" rel="noopener noreferrer" style="color:var(--primary); text-decoration:underline;">Watch Video Demonstration ↗</a>
              </div>
            ` : ''}
            ${module.referenceLink ? `
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <span style="font-weight:600; color:var(--text-main);">Reference Link:</span>
                <a href="${module.referenceLink}" target="_blank" rel="noopener noreferrer" style="color:var(--primary); text-decoration:underline;">Official Documentation & References ↗</a>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="btn-close-mod-detail-2">Close</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  document.getElementById('btn-close-mod-detail').onclick = close;
  document.getElementById('btn-close-mod-detail-2').onclick = close;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };
  const openPdfButton = document.getElementById('btn-open-module-pdf');
  if (openPdfButton && modulePdf) {
    openPdfButton.onclick = () => openModulePdfViewer(
      modulePdf,
      `Module ${module.moduleNumber}: ${module.title}`
    );
  }

  // Handle Progress Change
  const progressSelect = document.getElementById('select-module-progress');
  if (progressSelect) {
    progressSelect.onchange = (e) => {
      const val = e.target.value;
      Storage.setModuleProgress(module.id, val);
      Toast.success(`Module ${module.moduleNumber} progress updated!`);
      window.dispatchEvent(new CustomEvent('module-updated'));
    };
  }

  // Handle Mark Completed Button
  const completeBtn = document.getElementById('btn-toggle-module-completed');
  if (completeBtn) {
    completeBtn.onclick = () => {
      const isCurrentlyCompleted = module.completed || module.progress === 'completed';
      const nextState = isCurrentlyCompleted ? 'in_progress' : 'completed';
      Storage.setModuleProgress(module.id, nextState);
      Toast.success(nextState === 'completed' ? `Module ${module.moduleNumber} marked as Completed!` : `Module ${module.moduleNumber} marked as In Progress`);
      close();
      window.dispatchEvent(new CustomEvent('module-updated'));
    };
  }
}

function openModulePdfViewer(pdfUrl, title) {
  let resolvedUrl;
  try {
    resolvedUrl = new URL(pdfUrl, document.baseURI);
    if (!['http:', 'https:', 'file:'].includes(resolvedUrl.protocol)) {
      throw new Error('Unsupported PDF URL protocol.');
    }
  } catch {
    showPdfViewerError(`The PDF URL for "${title}" is invalid.`);
    return;
  }

  let overlay = document.getElementById('module-pdf-viewer-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'module-pdf-viewer-overlay';
    overlay.className = 'pdf-viewer-overlay';
    document.body.appendChild(overlay);
  }

  overlay.classList.remove('is-minimized', 'is-maximized');
  overlay.innerHTML = `
    <section class="pdf-viewer-dialog" role="dialog" aria-modal="true" aria-labelledby="pdf-viewer-title">
      <header class="pdf-viewer-toolbar">
        <h2 class="pdf-viewer-title" id="pdf-viewer-title"></h2>
        <div class="pdf-viewer-actions">
          <a class="btn btn-secondary btn-sm pdf-viewer-open-tab" target="_blank" rel="noopener noreferrer">OPEN IN NEW TAB ↗</a>
          <button class="pdf-viewer-window-btn" type="button" data-pdf-action="minimize" aria-label="Minimize PDF viewer" title="Minimize">—</button>
          <button class="pdf-viewer-window-btn" type="button" data-pdf-action="maximize" aria-label="Maximize PDF viewer" title="Maximize">□</button>
          <button class="pdf-viewer-window-btn pdf-viewer-close" type="button" data-pdf-action="close" aria-label="Close PDF viewer" title="Close">×</button>
        </div>
      </header>
      <div class="pdf-viewer-content">
        <p class="pdf-viewer-error" role="alert" hidden></p>
        <iframe class="pdf-viewer-frame" title=""></iframe>
      </div>
    </section>
    <button class="pdf-viewer-minimized" type="button" data-pdf-action="restore" aria-label="Restore PDF viewer">
      <span aria-hidden="true">▤</span>
      <span class="pdf-viewer-minimized-title"></span>
      <span class="pdf-viewer-restore-icon" aria-hidden="true">□</span>
    </button>
  `;

  const frame = overlay.querySelector('.pdf-viewer-frame');
  const errorMessage = overlay.querySelector('.pdf-viewer-error');
  overlay.querySelector('#pdf-viewer-title').textContent = title;
  overlay.querySelector('.pdf-viewer-minimized-title').textContent = title;
  overlay.querySelector('.pdf-viewer-open-tab').href = resolvedUrl.href;
  frame.title = title;
  frame.src = `${resolvedUrl.href}#toolbar=1`;

  const closeViewer = () => overlay.remove();
  overlay.querySelectorAll('[data-pdf-action]').forEach(button => {
    button.addEventListener('click', () => {
      switch (button.dataset.pdfAction) {
        case 'minimize':
          overlay.classList.add('is-minimized');
          break;
        case 'maximize':
          button.textContent = overlay.classList.toggle('is-maximized') ? '❐' : '□';
          button.title = overlay.classList.contains('is-maximized') ? 'Restore' : 'Maximize';
          button.setAttribute(
            'aria-label',
            overlay.classList.contains('is-maximized') ? 'Restore PDF viewer' : 'Maximize PDF viewer'
          );
          break;
        case 'restore':
          overlay.classList.remove('is-minimized');
          break;
        case 'close':
          closeViewer();
          break;
      }
    });
  });
  overlay.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeViewer();
  });
  frame.addEventListener('error', () => {
    errorMessage.hidden = false;
    errorMessage.textContent = 'The PDF could not be loaded. Check that the file exists or open it in a new tab.';
  });

  if (window.location.protocol !== 'file:' && resolvedUrl.origin === window.location.origin) {
    fetch(resolvedUrl.href, { method: 'HEAD' })
      .then(response => {
        if (!frame.isConnected) return;
        if (!response.ok && response.status !== 405) {
          errorMessage.hidden = false;
          errorMessage.textContent = 'This module PDF is missing or unavailable. Please check the associated PDF file.';
          frame.hidden = true;
        }
      })
      .catch(() => {
        if (!frame.isConnected) return;
        errorMessage.hidden = false;
        errorMessage.textContent = 'This module PDF could not be reached. Please check that the associated file is available.';
        frame.hidden = true;
      });
  }

  overlay.classList.add('active');
  overlay.querySelector('[data-pdf-action="minimize"]').focus();
}

function showPdfViewerError(message) {
  document.getElementById('module-pdf-viewer-overlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'module-pdf-viewer-overlay';
  overlay.className = 'pdf-viewer-overlay active';

  const dialog = document.createElement('section');
  dialog.className = 'pdf-viewer-dialog pdf-viewer-error-dialog';
  dialog.setAttribute('role', 'alertdialog');
  dialog.setAttribute('aria-modal', 'true');
  const toolbar = document.createElement('header');
  toolbar.className = 'pdf-viewer-toolbar';
  const title = document.createElement('h2');
  title.className = 'pdf-viewer-title';
  title.textContent = 'PDF unavailable';
  const close = document.createElement('button');
  close.className = 'pdf-viewer-window-btn pdf-viewer-close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close PDF viewer');
  close.textContent = '×';
  close.onclick = () => overlay.remove();
  const error = document.createElement('p');
  error.className = 'pdf-viewer-error';
  error.textContent = message;
  toolbar.append(title, close);
  dialog.append(toolbar, error);
  overlay.append(dialog);
  document.body.append(overlay);
}
