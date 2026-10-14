/**
 * TOOLS PAGE VIEW
 * Curated directory of essential Data Science tools, libraries, and interactive notebooks.
 */

import { initialTools } from '../data/initialData.js';

let currentToolsSearch = '';

export function renderToolsPage() {
  const filtered = initialTools.filter(t => {
    const search = currentToolsSearch.toLowerCase();
    return !search || (
      t.name.toLowerCase().includes(search) ||
      t.category.toLowerCase().includes(search) ||
      t.description.toLowerCase().includes(search) ||
      t.features.some(f => f.toLowerCase().includes(search))
    );
  });

  const cardsHtml = filtered.length > 0
    ? filtered.map(tool => `
      <div class="tool-card fade-in">
        <div class="tool-card-top">
          <div class="tool-icon-box" aria-hidden="true">${tool.icon}</div>
          <div class="tool-title-group">
            <h3 class="tool-name">${tool.name}</h3>
            <span class="tool-category">${tool.category}</span>
          </div>
        </div>

        <p class="tool-desc">${tool.description}</p>

        <div class="tool-features-list">
          ${tool.features.map(f => `
            <div class="tool-feature-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>

        <div style="display:flex; gap:0.6rem; margin-top:auto; padding-top:0.5rem;">
          <a href="${tool.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="flex:1;">
            OPEN TOOL ↗
          </a>
          <a href="${tool.docsLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" title="View Official Documentation">
            DOCS ↗
          </a>
        </div>
      </div>
    `).join('')
    : `
      <div class="empty-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h4 class="empty-state-title">No tools found</h4>
        <p class="empty-state-text">No tools matched "${currentToolsSearch}". Try searching for Python, Pandas, or Colab.</p>
        <button class="btn btn-secondary btn-sm" id="btn-reset-tools-search">Clear Search</button>
      </div>
    `;

  return `
    <div class="container fade-in">
      <div class="page-header">
        <div class="page-header-row">
          <div class="page-title-group">
            <span class="page-badge">Ecosystem & Platforms</span>
            <h1 class="page-title">DATA SCIENCE TOOLS</h1>
            <p class="page-subtitle">Industry-standard scientific computing platforms, numerical libraries, and machine learning toolkits.</p>
          </div>
        </div>
      </div>

      <!-- Controls Bar: Search -->
      <div class="controls-bar">
        <div class="search-box-wrapper" style="max-width:480px;">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="tools-search-input" 
            class="search-input" 
            placeholder="Search tools (e.g., NumPy, Jupyter, Scikit-learn)..." 
            value="${currentToolsSearch}">
        </div>

        <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">
          Showing ${filtered.length} of ${initialTools.length} Standard Tools
        </div>
      </div>

      <!-- Tools Cards Grid -->
      <div class="cards-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

export function attachToolsPageListeners(onRerender) {
  const searchInput = document.getElementById('tools-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentToolsSearch = e.target.value.trim();
      onRerender();
    });
  }

  const resetBtn = document.getElementById('btn-reset-tools-search');
  if (resetBtn) {
    resetBtn.onclick = () => {
      currentToolsSearch = '';
      onRerender();
    };
  }
}
