/**
 * NAVBAR COMPONENT
 * Renders top header navigation with ONLY: HOME, MODULES, EXPERIMENTS, TOOLS
 */

import { Storage } from '../data/storage.js';

export function renderNavbar(activeRoute = 'home') {
  const student = Storage.getStudent();
  const navContainer = document.getElementById('app-header');
  if (!navContainer) return;

  const links = [
    { id: 'home', label: 'HOME', hash: '#home' },
    { id: 'modules', label: 'MODULES', hash: '#modules' },
    { id: 'experiments', label: 'EXPERIMENTS', hash: '#experiments' },
    { id: 'tools', label: 'TOOLS', hash: '#tools' }
  ];

  const linksHtml = links.map(link => `
    <li>
      <a href="${link.hash}" class="nav-link ${activeRoute === link.id ? 'active' : ''}" data-nav="${link.id}">
        ${link.label}
      </a>
    </li>
  `).join('');

  navContainer.innerHTML = `
    <div class="container navbar-inner">
      <a href="#home" class="brand-wrapper" aria-label="Data Science Subject Digital Library Home">
        <div class="brand-icon-box" title="Data Science Digital Library">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <circle cx="12" cy="8" r="2"></circle>
            <path d="M12 10v4"></path>
            <path d="M10 12h4"></path>
          </svg>
        </div>
        <div class="brand-text-group">
          <span class="brand-title">DATA SCIENCE SUBJECT DIGITAL LIBRARY</span>
          <span class="brand-sub">Academic Virtual Lab & Repository</span>
        </div>
      </a>

      <!-- Desktop & Mobile Navigation (ONLY: HOME, MODULES, EXPERIMENTS, TOOLS) -->
      <ul class="nav-menu" id="primary-nav-menu">
        ${linksHtml}
      </ul>

      <div class="header-actions">
        <button class="header-profile-btn" id="header-profile-trigger" title="View Student Academic Profile">
          <img src="${student.avatar}" alt="${student.name}" class="header-avatar-img" onerror="this.src='assets/images/avatar-placeholder.svg'">
          <span class="header-profile-name">${student.name.split(' ')[0]}</span>
        </button>

        <button class="mobile-nav-toggle btn-icon-only" id="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Attach mobile toggle
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('primary-nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.onclick = () => {
      navMenu.classList.toggle('open');
    };
  }

  // Attach profile click listener
  const profileBtn = document.getElementById('header-profile-trigger');
  if (profileBtn) {
    profileBtn.onclick = () => {
      window.dispatchEvent(new CustomEvent('open-profile-modal'));
    };
  }
}
