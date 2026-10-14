export function renderExperimentCard(exp) {
  const statusBadge = exp.completed
    ? `<span class="badge badge-success"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Completed</span>`
    : `<span class="badge badge-neutral">Not Completed</span>`;

  const procedureArray = Array.isArray(exp.procedure) ? exp.procedure : [];

  // Back face: numbered procedure steps
  const backStepsHtml = procedureArray.map((step, i) => `
    <div class="exp-back-step">
      <span class="exp-step-num">${i + 1}</span>
      <span>${step}</span>
    </div>
  `).join('');

  return `
    <div class="experiment-flip-scene fade-in" id="exp-scene-${exp.id}" role="group" tabindex="0" aria-label="Experiment ${exp.experimentNumber} card. Press Enter or Space to toggle the procedure.">
      <div class="experiment-card" id="exp-card-${exp.id}">

        <!-- FRONT FACE -->
        <div class="experiment-card-front" aria-hidden="false">
          <div class="experiment-card-header">
            <span class="exp-num-badge">EXPERIMENT ${exp.experimentNumber}</span>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <span class="exp-lang-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                ${exp.language || 'Python'}
              </span>
              ${statusBadge}
            </div>
          </div>

          <div class="experiment-card-body">
            <h3 class="exp-title">${exp.title}</h3>
            <div class="exp-aim-snippet" title="${exp.aim}">
              <strong>Aim:</strong> ${exp.aim}
            </div>

            <div class="experiment-card-footer">
              <a href="#experiment/${exp.id}" class="btn btn-primary btn-sm btn-open-experiment" data-id="${exp.id}">
                VIEW EXPERIMENT
              </a>
            </div>
          </div>
          <!-- Flip hint -->
          <div class="exp-flip-hint" title="Click card to view procedure">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
          </div>
        </div>

        <!-- BACK FACE -->
        <div class="experiment-card-back" aria-hidden="true" inert>
          <div class="exp-back-header">
            <span class="exp-back-title">${exp.title}</span>
            <span class="exp-back-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
              Procedure
            </span>
          </div>
          <div class="exp-back-aim">${exp.aim}</div>
          <div class="exp-back-steps">
            ${backStepsHtml || '<div style="color:var(--text-light); font-size:0.8rem; padding:0.5rem;">No steps defined.</div>'}
          </div>
          <a href="#experiment/${exp.id}" class="btn btn-primary btn-sm btn-open-experiment exp-back-action" data-id="${exp.id}">
            VIEW EXPERIMENT
          </a>
        </div>

      </div>
    </div>
  `;
}
