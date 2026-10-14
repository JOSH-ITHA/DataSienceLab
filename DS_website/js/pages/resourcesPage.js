import { initialResources } from '../data/resources.js';

export { initialResources };

export function renderResourcesPage() {
  return `
    <div class="container fade-in">
      <div class="page-header">
        <div class="page-header-row">
          <div class="page-title-group">
            <span class="page-badge">Learn, Practice & Explore</span>
            <h1 class="page-title">DATA SCIENCE RESOURCES</h1>
            <p class="page-subtitle">A curated starting point for learning Python, practicing machine learning, and finding datasets.</p>
          </div>
        </div>
      </div>

      <div class="cards-grid">
        ${initialResources.map(resource => `
          <article class="tool-card fade-in">
            <div class="tool-card-top">
              <div class="tool-icon-box" aria-hidden="true">${resource.icon}</div>
              <div class="tool-title-group">
                <h2 class="tool-name">${resource.name}</h2>
                <span class="tool-category">${resource.category}</span>
              </div>
            </div>
            <p class="tool-desc">${resource.description}</p>
            <a href="${resource.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              ${resource.action} ↗
            </a>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}
