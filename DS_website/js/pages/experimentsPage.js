/**
 * EXPERIMENTS LIST PAGE VIEW
 * Lists Data Science lab experiments with instant search, filter tabs, and + ADD EXPERIMENT button.
 */

import { renderExperimentCard } from '../components/experimentCard.js';
import { Storage } from '../data/storage.js';
import { openExperimentFormModal } from '../components/forms.js';

let currentExpSearch = '';
let currentExpFilter = 'all'; // 'all' | 'python' | 'completed' | 'not_completed'

function setExperimentCardFace(card, showProcedure) {
  const front = card.querySelector('.experiment-card-front');
  const back = card.querySelector('.experiment-card-back');
  card.classList.toggle('is-flipped', showProcedure);
  front.toggleAttribute('inert', showProcedure);
  front.setAttribute('aria-hidden', String(showProcedure));
  back.toggleAttribute('inert', !showProcedure);
  back.setAttribute('aria-hidden', String(!showProcedure));
}

export function renderExperimentsPage() {
  const experiments = Storage.getExperiments();

  // Filter & Search Logic
  const filtered = experiments.filter(e => {
    const matchesFilter = (currentExpFilter === 'all')
      || (currentExpFilter === 'python' && (e.language || 'Python').toLowerCase() === 'python')
      || (currentExpFilter === 'completed' && e.completed)
      || (currentExpFilter === 'not_completed' && !e.completed);

    const searchLower = currentExpSearch.toLowerCase();
    const matchesSearch = !currentExpSearch || (
      e.title.toLowerCase().includes(searchLower) ||
      e.aim.toLowerCase().includes(searchLower) ||
      (e.requirements || '').toLowerCase().includes(searchLower) ||
      String(e.procedure || '').toLowerCase().includes(searchLower)
    );

    return matchesFilter && matchesSearch;
  });

  const cardsHtml = filtered.length > 0
    ? filtered.map(exp => renderExperimentCard(exp)).join('')
    : `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h4 class="empty-state-title">No experiments found</h4>
        <p class="empty-state-text">No laboratory experiments matched "${currentExpSearch}". Try changing your search query or filter criteria.</p>
        <button class="btn btn-secondary btn-sm" id="btn-reset-exp-filters">Reset Filters</button>
      </div>
    `;

  return `
    <div class="container fade-in">
      <div class="page-header">
        <div class="page-header-row">
          <div class="page-title-group">
            <span class="page-badge">Virtual Lab Environment</span>
            <h1 class="page-title">DATA SCIENCE LAB EXPERIMENTS</h1>
            <p class="page-subtitle">Hands-on interactive lab exercises with runnable Python code, terminal stdout inspection, and academic procedures.</p>
          </div>

          <button class="btn btn-primary" id="btn-add-experiment">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + ADD EXPERIMENT
          </button>
        </div>
      </div>

      <!-- Controls Bar: Search & Filter Tabs -->
      <div class="controls-bar">
        <div class="search-box-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="experiment-search-input" 
            class="search-input" 
            placeholder="Search experiments by title, aim, or algorithm (e.g., Regression)..." 
            value="${currentExpSearch}">
        </div>

        <div class="filter-group">
          <button class="filter-chip ${currentExpFilter === 'all' ? 'active' : ''}" data-exp-filter="all">All (${experiments.length})</button>
          <button class="filter-chip ${currentExpFilter === 'python' ? 'active' : ''}" data-exp-filter="python">Python</button>
          <button class="filter-chip ${currentExpFilter === 'completed' ? 'active' : ''}" data-exp-filter="completed">Completed</button>
          <button class="filter-chip ${currentExpFilter === 'not_completed' ? 'active' : ''}" data-exp-filter="not_completed">Not Completed</button>
        </div>
      </div>

      <!-- Experiments Cards Grid -->
      <div class="cards-grid" id="experiments-cards-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

export function attachExperimentsPageListeners(onRerender) {
  document.querySelectorAll('.experiment-flip-scene').forEach(scene => {
    const card = scene.querySelector('.experiment-card');
    if (!card) return;

    setExperimentCardFace(card, false);
    scene.addEventListener('click', event => {
      if (event.target.closest('a, button, input, select, textarea')) return;
      setExperimentCardFace(card, !card.classList.contains('is-flipped'));
    });

    scene.addEventListener('keydown', event => {
      if (event.target !== scene || !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      setExperimentCardFace(card, !card.classList.contains('is-flipped'));
    });
  });

  // Search Input
  const searchInput = document.getElementById('experiment-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentExpSearch = e.target.value.trim();
      onRerender();
    });
  }

  // Filter Chips
  document.querySelectorAll('[data-exp-filter]').forEach(btn => {
    btn.onclick = () => {
      currentExpFilter = btn.dataset.expFilter;
      onRerender();
    };
  });

  // Clear filters
  const resetBtn = document.getElementById('btn-reset-exp-filters');
  if (resetBtn) {
    resetBtn.onclick = () => {
      currentExpSearch = '';
      currentExpFilter = 'all';
      onRerender();
    };
  }

  // + ADD EXPERIMENT BUTTON
  const addBtn = document.getElementById('btn-add-experiment');
  if (addBtn) {
    addBtn.onclick = () => {
      openExperimentFormModal();
    };
  }

}
