/**
 * CRUD MODALS & FORMS COMPONENT
 * Add/Edit Module, Add/Edit Experiment, and Delete Confirmation modals.
 */

import { Storage } from '../data/storage.js';
import { Toast } from './toast.js';

/**
 * MODULE FORM MODAL (ADD & EDIT)
 */
export function openModuleFormModal(moduleToEdit = null) {
  let modalOverlay = document.getElementById('module-form-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'module-form-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const isEdit = Boolean(moduleToEdit);
  const nextNum = isEdit ? moduleToEdit.moduleNumber : (Storage.getModules().length + 1);

  const objectivesText = isEdit 
    ? (Array.isArray(moduleToEdit.objectives) ? moduleToEdit.objectives.join('\n') : moduleToEdit.objectives || '') 
    : '';

  const topicsText = isEdit 
    ? (Array.isArray(moduleToEdit.topics) ? moduleToEdit.topics.join('\n') : moduleToEdit.topics || '') 
    : '';

  modalOverlay.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <h3 class="modal-title">${isEdit ? `Edit Module ${moduleToEdit.moduleNumber}` : '+ Add New Data Science Module'}</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-mod-form" aria-label="Close form">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <form id="module-form">
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Module Number <span class="required">*</span></label>
              <input type="number" id="mod-form-number" class="form-control" value="${nextNum}" min="1" required>
            </div>
            <div class="form-group">
              <label class="form-label">Module Title <span class="required">*</span></label>
              <input type="text" id="mod-form-title" class="form-control" placeholder="e.g. Data Wrangling & Manipulation" value="${isEdit ? moduleToEdit.title : ''}" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Description <span class="required">*</span></label>
            <textarea id="mod-form-desc" class="form-control" placeholder="Provide an academic summary of this module..." required>${isEdit ? moduleToEdit.description : ''}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Learning Objectives (One per line) <span class="required">*</span></label>
            <textarea id="mod-form-objectives" class="form-control" placeholder="Understand vectorization&#10;Master data transformations" required>${objectivesText}</textarea>
            <div class="form-hint">Enter each learning objective on a separate line.</div>
          </div>

          <div class="form-group">
            <label class="form-label">Topics (One per line) <span class="required">*</span></label>
            <textarea id="mod-form-topics" class="form-control" placeholder="NumPy Array Architecture&#10;Indexing and Slicing" required>${topicsText}</textarea>
            <div class="form-hint">Enter each topic on a separate line.</div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Notes / PDF Link</label>
              <input type="url" id="mod-form-pdf" class="form-control" placeholder="https://docs.python.org or /notes/mod.pdf" value="${isEdit ? (moduleToEdit.pdfLink || '') : ''}">
            </div>
            <div class="form-group">
              <label class="form-label">Video Lecture Link</label>
              <input type="url" id="mod-form-video" class="form-control" placeholder="https://www.youtube.com/..." value="${isEdit ? (moduleToEdit.videoLink || '') : ''}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Reference Link</label>
            <input type="url" id="mod-form-ref" class="form-control" placeholder="https://numpy.org/doc/stable/" value="${isEdit ? (moduleToEdit.referenceLink || '') : ''}">
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn-cancel-mod-form">CANCEL</button>
          <button type="submit" class="btn btn-primary" id="btn-submit-mod-form">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            SAVE MODULE
          </button>
        </div>
      </form>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  document.getElementById('btn-close-mod-form').onclick = close;
  document.getElementById('btn-cancel-mod-form').onclick = close;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };

  // Handle Form Submission
  document.getElementById('module-form').onsubmit = (e) => {
    e.preventDefault();
    const number = Number(document.getElementById('mod-form-number').value);
    const title = document.getElementById('mod-form-title').value.trim();
    const desc = document.getElementById('mod-form-desc').value.trim();
    const objectives = document.getElementById('mod-form-objectives').value.split('\n').map(s => s.trim()).filter(Boolean);
    const topics = document.getElementById('mod-form-topics').value.split('\n').map(s => s.trim()).filter(Boolean);
    const pdf = document.getElementById('mod-form-pdf').value.trim();
    const video = document.getElementById('mod-form-video').value.trim();
    const ref = document.getElementById('mod-form-ref').value.trim();

    if (!title || !desc) {
      Toast.warning("Please fill in the required module title and description.");
      return;
    }

    const payload = {
      moduleNumber: number,
      title,
      description: desc,
      objectives,
      topics,
      pdfLink: pdf,
      videoLink: video,
      referenceLink: ref
    };

    if (isEdit) {
      Storage.updateModule(moduleToEdit.id, payload);
      Toast.success(`Module ${number} updated successfully!`);
    } else {
      Storage.addModule(payload);
      Toast.success(`Module ${number} added successfully!`);
    }

    close();
    window.dispatchEvent(new CustomEvent('module-updated'));
  };
}

/**
 * EXPERIMENT FORM MODAL (ADD & EDIT)
 */
export function openExperimentFormModal(expToEdit = null) {
  let modalOverlay = document.getElementById('experiment-form-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'experiment-form-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const isEdit = Boolean(expToEdit);
  const nextNum = isEdit ? expToEdit.experimentNumber : (Storage.getExperiments().length + 1);

  const procedureText = isEdit
    ? (Array.isArray(expToEdit.procedure) ? expToEdit.procedure.join('\n') : expToEdit.procedure || '')
    : '';

  const defaultStarterCode = `# Experiment: Custom Python Lab
import numpy as np

data = [10, 20, 30, 40, 50]
print("Input Data:", data)
print("Mean:", np.mean(data))`;

  modalOverlay.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
          <h3 class="modal-title">${isEdit ? `Edit Experiment ${expToEdit.experimentNumber}` : '+ Add New Lab Experiment'}</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-exp-form" aria-label="Close experiment form">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <form id="experiment-form">
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Experiment Number <span class="required">*</span></label>
              <input type="number" id="exp-form-number" class="form-control" value="${nextNum}" min="1" required>
            </div>
            <div class="form-group">
              <label class="form-label">Experiment Title <span class="required">*</span></label>
              <input type="text" id="exp-form-title" class="form-control" placeholder="e.g. Linear Regression Modeling" value="${isEdit ? expToEdit.title : ''}" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Aim <span class="required">*</span></label>
            <textarea id="exp-form-aim" class="form-control" placeholder="State the academic objective and aim of this experiment..." required>${isEdit ? expToEdit.aim : ''}</textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Requirements <span class="required">*</span></label>
              <input type="text" id="exp-form-req" class="form-control" placeholder="Python 3.x, NumPy, Pandas, Matplotlib" value="${isEdit ? expToEdit.requirements : 'Python 3.x, NumPy, Pandas'}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Programming Language</label>
              <input type="text" id="exp-form-lang" class="form-control" value="${isEdit ? expToEdit.language : 'Python'}" readonly>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Procedure (Step by step, one per line) <span class="required">*</span></label>
            <textarea id="exp-form-procedure" class="form-control" placeholder="1. Initialize arrays&#10;2. Apply transformation&#10;3. Compute metrics" required>${procedureText}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Source Code (Python) <span class="required">*</span></label>
            <textarea id="exp-form-code" class="form-control code-font" placeholder="# Python Code" required>${isEdit ? expToEdit.code : defaultStarterCode}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Expected Output <span class="required">*</span></label>
            <textarea id="exp-form-expected" class="form-control code-font" placeholder="Expected console stdout output..." required>${isEdit ? expToEdit.expectedOutput : 'Input Data: [10, 20, 30, 40, 50]\nMean: 30.0'}</textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Result / Academic Conclusion <span class="required">*</span></label>
              <input type="text" id="exp-form-result" class="form-control" placeholder="Successfully implemented and verified experiment output." value="${isEdit ? expToEdit.result : 'Successfully executed and verified experimental algorithm in Python.'}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Reference Link</label>
              <input type="url" id="exp-form-ref" class="form-control" placeholder="https://docs.python.org" value="${isEdit ? (expToEdit.reference || '') : ''}">
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="btn-cancel-exp-form">CANCEL</button>
          <button type="submit" class="btn btn-primary" id="btn-submit-exp-form">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            SAVE EXPERIMENT
          </button>
        </div>
      </form>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  document.getElementById('btn-close-exp-form').onclick = close;
  document.getElementById('btn-cancel-exp-form').onclick = close;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };

  // Handle Submit
  document.getElementById('experiment-form').onsubmit = (e) => {
    e.preventDefault();
    const number = Number(document.getElementById('exp-form-number').value);
    const title = document.getElementById('exp-form-title').value.trim();
    const aim = document.getElementById('exp-form-aim').value.trim();
    const req = document.getElementById('exp-form-req').value.trim();
    const lang = document.getElementById('exp-form-lang').value.trim();
    const procedure = document.getElementById('exp-form-procedure').value.split('\n').map(s => s.trim()).filter(Boolean);
    const code = document.getElementById('exp-form-code').value;
    const expected = document.getElementById('exp-form-expected').value;
    const result = document.getElementById('exp-form-result').value.trim();
    const ref = document.getElementById('exp-form-ref').value.trim();

    if (!title || !aim || !code) {
      Toast.warning("Please fill in all mandatory experiment fields.");
      return;
    }

    const payload = {
      experimentNumber: number,
      title,
      aim,
      requirements: req,
      language: lang,
      procedure,
      code,
      expectedOutput: expected,
      result,
      reference: ref
    };

    if (isEdit) {
      Storage.updateExperiment(expToEdit.id, payload);
      Toast.success(`Experiment ${number} updated successfully!`);
    } else {
      Storage.addExperiment(payload);
      Toast.success(`Experiment ${number} added successfully!`);
    }

    close();
    window.dispatchEvent(new CustomEvent('experiment-updated'));
  };
}

/**
 * DELETE CONFIRMATION MODAL
 */
export function openDeleteConfirmModal(title, onConfirm) {
  let modalOverlay = document.getElementById('delete-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'delete-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal-dialog" style="max-width:440px;">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem; color:var(--accent-rose);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <h3 class="modal-title" style="color:var(--accent-rose);">Confirm Deletion</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-delete-modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="modal-body">
        <p style="font-size:0.925rem; color:var(--text-main); margin-bottom:0.75rem;">
          Are you sure you want to permanently delete <strong>"${title}"</strong>?
        </p>
        <p style="font-size:0.825rem; color:var(--text-muted);">
          This item and its saved data will be removed from your digital library storage.
        </p>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="btn-cancel-delete">Cancel</button>
        <button class="btn btn-danger" id="btn-confirm-delete">Delete Permanently</button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');

  const close = () => modalOverlay.classList.remove('active');
  document.getElementById('btn-close-delete-modal').onclick = close;
  document.getElementById('btn-cancel-delete').onclick = close;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };

  document.getElementById('btn-confirm-delete').onclick = () => {
    onConfirm();
    close();
  };
}
