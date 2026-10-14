/**
 * EXPERIMENT DETAIL PAGE VIEW
 * Strict Academic Order:
 * 1. Experiment Title
 * 2. Aim
 * 3. Requirements
 * 4. Procedure
 * 5. Interactive Code Editor
 * 6. Output (Terminal)
 * 7. Expected Output
 * 8. Result
 * 9. References
 */

import { Storage } from '../data/storage.js';
import { renderCodeEditor, attachCodeEditorListeners } from '../components/codeEditor.js';
import { openExperimentFormModal } from '../components/forms.js';
import { Toast } from '../components/toast.js';

export function renderExperimentDetailPage(experimentId) {
  const exp = Storage.getExperimentById(experimentId);
  if (!exp) {
    return `
      <div class="container fade-in">
        <div class="empty-state">
          <h3 class="empty-state-title">Experiment Not Found</h3>
          <p class="empty-state-text">The requested lab experiment could not be located in your digital library.</p>
          <a href="#experiments" class="btn btn-primary">Return to Experiments</a>
        </div>
      </div>
    `;
  }

  const procedureSteps = Array.isArray(exp.procedure)
    ? exp.procedure
    : String(exp.procedure || '').split('\n').filter(Boolean);

  const reqList = (exp.requirements || 'Python 3.x, Standard Libraries').split(',').map(r => r.trim()).filter(Boolean);

  return `
    <div class="container fade-in">
      <div class="experiment-workspace">
        
        <!-- 1. EXPERIMENT HEADER & TITLE -->
        <div class="exp-header-card">
          <div class="exp-header-top">
            <div class="exp-breadcrumbs">
              <a href="#home">Home</a>
              <span>/</span>
              <a href="#experiments">Experiments</a>
              <span>/</span>
              <span>Exp ${exp.experimentNumber}</span>
            </div>

            <div class="exp-header-actions">
              <button class="btn btn-sm ${exp.completed ? 'btn-success' : 'btn-outline'}" id="btn-toggle-exp-complete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ${exp.completed ? 'Completed ✓' : 'MARK AS COMPLETED'}
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-edit-current-exp" title="Edit this experiment">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit
              </button>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="exp-num-badge">EXPERIMENT ${exp.experimentNumber}</span>
            <span class="exp-lang-badge">${exp.language || 'Python'}</span>
          </div>

          <h1 class="exp-main-title">${exp.title}</h1>
        </div>

        <!-- 2. AIM -->
        <div class="academic-section-card">
          <h2 class="section-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Aim of the Experiment
          </h2>
          <div class="aim-box">
            ${exp.aim}
          </div>
        </div>

        <!-- 3. REQUIREMENTS -->
        <div class="academic-section-card">
          <h2 class="section-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            System & Software Requirements
          </h2>
          <div class="requirements-grid">
            <div class="req-group">
              <div class="req-group-title">Software & Environment</div>
              <div class="req-chips-list">
                <span class="req-chip">Python 3.11+</span>
                <span class="req-chip">WebAssembly Engine</span>
                <span class="req-chip">Interactive Browser Terminal</span>
              </div>
            </div>
            <div class="req-group">
              <div class="req-group-title">Scientific Libraries</div>
              <div class="req-chips-list">
                ${reqList.map(r => `<span class="req-chip">${r}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- 4. PROCEDURE -->
        <div class="academic-section-card">
          <h2 class="section-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            Step-by-Step Lab Procedure
          </h2>
          <div class="procedure-steps">
            ${procedureSteps.map((step, idx) => `
              <div class="procedure-step-item">
                <span class="step-num">${idx + 1}</span>
                <span class="step-text">${step.replace(/^\d+\.\s*/, '')}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 5. INTERACTIVE CODE EDITOR & 6. OUTPUT CONSOLE -->
        <div class="academic-section-card" style="padding: 1.25rem;">
          <h2 class="section-card-title" style="margin-left:0.5rem; margin-right:0.5rem;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Interactive Code Editor & Live Virtual Lab
          </h2>
          ${renderCodeEditor(exp)}
        </div>

        <!-- 7. EXPECTED OUTPUT -->
        <div class="academic-section-card">
          <h2 class="section-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
            Expected Terminal Output
          </h2>
          <div class="expected-output-card">
            <pre class="expected-output-pre">${exp.expectedOutput}</pre>
          </div>
        </div>

        <!-- 8. RESULT -->
        <div class="academic-section-card">
          <h2 class="section-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            Result & Academic Conclusion
          </h2>
          <div class="result-card">
            <strong>Conclusion: </strong> ${exp.result || 'The experiment was executed successfully, validating algorithmic accuracy and theoretical parameters.'}
          </div>
        </div>

        <!-- 9. REFERENCES -->
        <div class="academic-section-card">
          <h2 class="section-card-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            References & Technical Documentation
          </h2>
          <ul class="references-list">
            <li class="reference-item">
              <span>•</span>
              <a href="${exp.reference || 'https://docs.python.org/3/'}" target="_blank" rel="noopener noreferrer">
                ${exp.reference ? `${exp.reference} ↗` : 'Official Python Documentation (docs.python.org) ↗'}
              </a>
            </li>
            <li class="reference-item">
              <span>•</span>
              <a href="https://numpy.org/doc/stable/" target="_blank" rel="noopener noreferrer">
                NumPy User Guide & Scientific Matrix Standards ↗
              </a>
            </li>
            <li class="reference-item">
              <span>•</span>
              <a href="https://pandas.pydata.org/docs/" target="_blank" rel="noopener noreferrer">
                Pandas API Reference & Data Manipulation Guide ↗
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  `;
}

export function attachExperimentDetailPageListeners(experimentId, onNavigate) {
  const exp = Storage.getExperimentById(experimentId);
  if (!exp) return;

  // Initialize Code Editor Engine & Listeners
  attachCodeEditorListeners(exp);

  // Toggle Complete Button
  const completeBtn = document.getElementById('btn-toggle-exp-complete');
  if (completeBtn) {
    completeBtn.onclick = () => {
      const isNowCompleted = Storage.toggleExperimentCompletion(exp.id);
      Toast.success(isNowCompleted ? `Experiment ${exp.experimentNumber} marked as completed!` : `Experiment ${exp.experimentNumber} marked as incomplete`);
      // Update UI button state
      completeBtn.className = `btn btn-sm ${isNowCompleted ? 'btn-success' : 'btn-outline'}`;
      completeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${isNowCompleted ? 'Completed ✓' : 'MARK AS COMPLETED'}`;
      window.dispatchEvent(new CustomEvent('experiment-updated'));
    };
  }

  // Edit Button
  const editBtn = document.getElementById('btn-edit-current-exp');
  if (editBtn) {
    editBtn.onclick = () => {
      openExperimentFormModal(exp);
    };
  }
}
