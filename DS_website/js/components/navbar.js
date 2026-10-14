/**
 * NAVBAR COMPONENT
 * Renders the primary navigation and student profile action.
 */

import { Storage } from '../data/storage.js';

export function renderNavbar(activeRoute = 'home') {
  const student = Storage.getStudent();
  const navContainer = document.getElementById('app-header');
  if (!navContainer) return;

  const links = [
    { id: 'home', label: 'HOME', hash: '#home', icon: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7H10v7H4a1 1 0 0 1-1-1z"></path>' },
    { id: 'modules', label: 'MODULES', hash: '#modules', icon: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M8 6h8M8 10h8"></path>' },
    { id: 'experiments', label: 'EXPERIMENTS', hash: '#experiments', icon: '<path d="M9 3h6M10 3v6.5l-5.5 9A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5l-5.5-9V3"></path><path d="M8 15h8"></path>' },
    { id: 'tools', label: 'TOOLS', hash: '#tools', icon: '<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3 18a2.1 2.1 0 0 0 3 3l5.3-5.3a5 5 0 0 0 6.4-6.4L14 13l-3-3z"></path>' },
    { id: 'resources', label: 'RESOURCES', hash: '#resources', icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' },
    { id: 'projects', label: 'PROJECTS', hash: '#projects', icon: '<rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M7 8h10M7 12h6M7 16h4"></path>' }
  ];

  const linksHtml = links.map(link => `
    <li>
      <a href="${link.hash}" class="nav-link ${activeRoute === link.id ? 'active' : ''}" data-nav="${link.id}">
        <svg class="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${link.icon}</svg>
        <span>${link.label}</span>
      </a>
    </li>
  `).join('');

  navContainer.innerHTML = `
    <div class="container navbar-inner">
      <a href="#home" class="brand-wrapper" aria-label="Data Science Subject Digital Library Home" style="flex-shrink:0; min-width:0;">
        <div class="brand-icon-box" title="Data Science Digital Library">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            <circle cx="12" cy="8" r="2"></circle>
            <path d="M12 10v4"></path>
            <path d="M10 12h4"></path>
          </svg>
        </div>
        <div class="brand-text-group" style="min-width:0;">
          <span class="brand-title">DATA SCIENCE SUBJECT DIGITAL LIBRARY</span>
          <span class="brand-sub">Academic Virtual Lab &amp; Repository</span>
        </div>
      </a>

      <!-- Desktop and mobile primary navigation -->
      <ul class="nav-menu" id="primary-nav-menu">
        ${linksHtml}
      </ul>

      <div class="header-actions" style="flex-shrink:0;">
        <button class="header-search-btn btn-icon-only" id="global-search-trigger" type="button" aria-label="Search the website" title="Search the website (Ctrl+K)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
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
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // Attach profile click listener
  const profileBtn = document.getElementById('header-profile-trigger');
  if (profileBtn) {
    profileBtn.onclick = () => {
      window.dispatchEvent(new CustomEvent('open-profile-modal'));
    };
  }
}
