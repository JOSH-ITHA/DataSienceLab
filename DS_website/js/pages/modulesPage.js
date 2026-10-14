/**
 * MODULES PAGE VIEW
 * Lists Data Science curriculum modules with real-time search, filters, and + ADD MODULE button.
 */

import { Storage } from '../data/storage.js';
import { renderModuleCard, openModuleDetailModal } from '../components/moduleCard.js';
import { openModuleFormModal } from '../components/forms.js';

let currentSearchTerm = '';
let currentFilter = 'all'; // 'all' | 'not_started' | 'in_progress' | 'completed'

export function renderModulesPage() {
  const modules = Storage.getModules();

  // Filter & Search Logic
  const filtered = modules.filter(m => {
    const matchesFilter = (currentFilter === 'all') 
      || (currentFilter === 'completed' && (m.completed || m.progress === 'completed'))
      || (currentFilter === 'in_progress' && m.progress === 'in_progress')
      || (currentFilter === 'not_started' && (!m.progress || m.progress === 'not_started'));

    const searchLower = currentSearchTerm.toLowerCase();
    const matchesSearch = !currentSearchTerm || (
      m.title.toLowerCase().includes(searchLower) ||
      m.description.toLowerCase().includes(searchLower) ||
      String(m.topics || '').toLowerCase().includes(searchLower) ||
      String(m.objectives || '').toLowerCase().includes(searchLower)
    );

    return matchesFilter && matchesSearch;
  });

  const cardsHtml = filtered.length > 0
    ? filtered.map(m => renderModuleCard(m)).join('')
    : `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h4 class="empty-state-title">No modules found</h4>
        <p class="empty-state-text">No curriculum modules matched your search "${currentSearchTerm}". Try clearing your search query or filter.</p>
        <button class="btn btn-secondary btn-sm" id="btn-reset-module-filters">Clear Filters</button>
      </div>
    `;

  return `
    <div class="container fade-in">
      <div class="page-header">
        <div class="page-header-row">
          <div class="page-title-group">
            <span class="page-badge">Academic Curriculum</span>
            <h1 class="page-title">DATA SCIENCE MODULES</h1>
            <p class="page-subtitle">Structured syllabus modules, learning objectives, lecture materials, and academic references.</p>
          </div>

          <button class="btn btn-primary" id="btn-add-module">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + ADD MODULE
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
            id="module-search-input" 
            class="search-input" 
            placeholder="Search modules by title, topic, or keyword (e.g., Pandas)..." 
            value="${currentSearchTerm}">
        </div>

        <div class="filter-group">
          <button class="filter-chip ${currentFilter === 'all' ? 'active' : ''}" data-mod-filter="all">All Modules (${modules.length})</button>
          <button class="filter-chip ${currentFilter === 'not_started' ? 'active' : ''}" data-mod-filter="not_started">Not Started</button>
          <button class="filter-chip ${currentFilter === 'in_progress' ? 'active' : ''}" data-mod-filter="in_progress">In Progress</button>
          <button class="filter-chip ${currentFilter === 'completed' ? 'active' : ''}" data-mod-filter="completed">Completed</button>
        </div>
      </div>

      <!-- Modules Cards Grid -->
      <div class="cards-grid" id="modules-cards-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

export function attachModulesPageListeners(onRerender) {
  // Search Input
  const searchInput = document.getElementById('module-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.trim();
      onRerender();
    });
  }

  // Filter Chips
  document.querySelectorAll('[data-mod-filter]').forEach(btn => {
    btn.onclick = () => {
      currentFilter = btn.dataset.modFilter;
      onRerender();
    };
  });

  // Clear filters button
  const resetBtn = document.getElementById('btn-reset-module-filters');
  if (resetBtn) {
    resetBtn.onclick = () => {
      currentSearchTerm = '';
      currentFilter = 'all';
      onRerender();
    };
  }

  // + ADD MODULE BUTTON
  const addBtn = document.getElementById('btn-add-module');
  if (addBtn) {
    addBtn.onclick = () => {
      openModuleFormModal();
    };
  }

  // Flip toggle buttons (TOPICS ⇄ and ← Back)
  document.querySelectorAll('.btn-flip-module').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const card = document.getElementById(`card-${id}`);
      if (card) card.classList.toggle('is-flipped');
    };
  });

  // Card Action Buttons
  document.querySelectorAll('.btn-view-module').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      openModuleDetailModal(id);
    };
  });

}
