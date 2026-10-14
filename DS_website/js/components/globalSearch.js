import { Storage } from '../data/storage.js';
import { initialTools } from '../data/initialData.js';
import { initialResources } from '../data/resources.js';

let onSelectResult = null;
let listenersInitialized = false;

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[character]);

export function setupGlobalSearch(onSelect) {
  onSelectResult = onSelect;
  const trigger = document.getElementById('global-search-trigger');
  if (!trigger) return;

  let overlay = document.getElementById('global-search-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'global-search-overlay';
    overlay.className = 'modal-overlay global-search-overlay';
    overlay.innerHTML = `
      <section class="global-search-dialog" role="dialog" aria-modal="true" aria-labelledby="global-search-title">
        <div class="global-search-heading">
          <div>
            <span class="page-badge">Search the digital library</span>
            <h2 id="global-search-title">What are you looking for?</h2>
          </div>
          <button type="button" class="btn-icon-only global-search-close" aria-label="Close search">×</button>
        </div>
        <label class="global-search-field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input id="global-search-input" type="search" autocomplete="off" placeholder="Search modules, experiments, tools, and resources…" aria-label="Search the digital library">
        </label>
        <div id="global-search-results" class="global-search-results" aria-live="polite">
          <p class="global-search-hint">Start typing to find content across the library.</p>
        </div>
      </section>
    `;
    document.body.appendChild(overlay);
  }

  const input = overlay.querySelector('#global-search-input');
  const resultsContainer = overlay.querySelector('#global-search-results');

  const close = () => {
    overlay.classList.remove('active');
    document.getElementById('global-search-trigger')?.focus();
  };

  const getResults = query => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    const matches = (items, type, getText) => items
      .filter(item => getText(item).toLowerCase().includes(normalizedQuery))
      .map(item => {
        const title = String(item.title || item.name || '').toLowerCase();
        const score = title === normalizedQuery ? 0
          : title.startsWith(normalizedQuery) ? 1
          : title.includes(normalizedQuery) ? 2
          : 3;
        return { ...item, type, score };
      });

    return [
      ...matches(Storage.getModules(), 'Module', item => [
        item.title, item.description, ...(item.topics || []),
        ...(item.objectives || []),
        ...(item.topicDetails || []).flatMap(detail => [detail.topic, detail.explanation])
      ].join(' ')),
      ...matches(Storage.getExperiments(), 'Experiment', item => [
        item.title, item.aim, item.procedure, item.requirements
      ].join(' ')),
      ...matches(initialTools, 'Tool', item => [
        item.name, item.category, item.description, ...(item.features || [])
      ].join(' ')),
      ...matches(initialResources, 'Resource', item => [
        item.name, item.category, item.description
      ].join(' '))
    ].sort((first, second) => first.score - second.score)
      .slice(0, 12);
  };

  const renderResults = () => {
    const results = getResults(input.value);
    if (!input.value.trim()) {
      resultsContainer.innerHTML = '<p class="global-search-hint">Start typing to find content across the library.</p>';
      return;
    }
    if (!results.length) {
      resultsContainer.innerHTML = `<p class="global-search-hint">No results found for “${escapeHtml(input.value.trim())}”.</p>`;
      return;
    }

    resultsContainer.innerHTML = results.map((result, index) => `
      <button type="button" class="global-search-result" data-result-index="${index}">
        <span class="global-search-result-copy">
          <strong>${escapeHtml(result.title || result.name)}</strong>
          <span>${escapeHtml(result.description || result.aim || result.category || '')}</span>
        </span>
        <span class="global-search-result-type">${escapeHtml(result.type)}</span>
      </button>
    `).join('');

    resultsContainer.querySelectorAll('.global-search-result').forEach((button, index) => {
      button.addEventListener('click', () => {
        close();
        onSelectResult?.(results[index]);
      });
    });
  };

  trigger.onclick = () => {
    overlay.classList.add('active');
    input.value = '';
    renderResults();
    window.requestAnimationFrame(() => input.focus());
  };

  if (!listenersInitialized) {
    input.addEventListener('input', renderResults);
    overlay.querySelector('.global-search-close').onclick = close;
    overlay.addEventListener('click', event => {
      if (event.target === overlay) close();
    });

    document.addEventListener('keydown', event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.getElementById('global-search-trigger')?.click();
      } else if (event.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
    });
    listenersInitialized = true;
  }
}
