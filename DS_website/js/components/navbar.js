/**
 * NAVBAR COMPONENT
 * Renders the primary navigation and student profile action.
 */

import { Storage } from '../data/storage.js';
import { THEMES, THEME_IDS, getSavedTheme, applyTheme } from '../data/themes.js';

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
    { id: 'projects', label: 'PROJECTS', hash: '#projects', icon: '<rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M7 8h10M7 12h6M7 16h4"></path>' },
    { id: 'themes', label: 'THEMES', hash: '#themes', icon: '<circle cx="12" cy="12" r="3"></circle><path d="M12 2a10 10 0 0 0 0 20"></path><path d="M12 2a10 10 0 0 1 0 20"></path><line x1="2" y1="12" x2="22" y2="12"></line>' },
    { id: 'campus', label: 'MY CAMPUS', hash: '#campus', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>' }
  ];

  const currentThemeId = getSavedTheme();
  const currentTheme = THEMES[currentThemeId];

  const linksHtml = links.map(link => `
    <li>
      <a href="${link.hash}" class="nav-link ${activeRoute === link.id ? 'active' : ''}" data-nav="${link.id}">
        <svg class="nav-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${link.icon}</svg>
        <span>${link.label}</span>
      </a>
    </li>
  `).join('');

  // Build the quick-switch theme dropdown items
  const themeDropdownItems = THEME_IDS.map(id => {
    const t = THEMES[id];
    const isActive = id === currentThemeId;
    return `
      <button class="theme-switch-item ${isActive ? 'is-active' : ''}" data-theme-switch="${id}" title="${t.name}" aria-pressed="${isActive}">
        <span class="theme-switch-emoji" aria-hidden="true">${t.emoji}</span>
        <span class="theme-switch-name">${t.name}</span>
        <svg class="theme-switch-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="display:${isActive ? '' : 'none'};" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </button>
    `;
  }).join('');

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

        <!-- Quick Theme Switcher -->
        <div class="header-theme-switcher" id="header-theme-switcher">
          <button class="header-theme-btn" id="header-theme-trigger" aria-label="Switch theme" title="Switch theme — ${currentTheme.name} active" aria-expanded="false" aria-haspopup="true">
            <span class="header-theme-emoji" aria-hidden="true">${currentTheme.emoji}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="theme-dropdown" id="theme-dropdown" role="menu" aria-label="Theme switcher">
            <div class="theme-dropdown-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a10 10 0 0 0 0 20"></path><path d="M12 2a10 10 0 0 1 0 20"></path><line x1="2" y1="12" x2="22" y2="12"></line></svg>
              <span>Quick Theme Switch</span>
            </div>
            ${themeDropdownItems}
            <div class="theme-dropdown-footer">
              <a href="#themes" class="theme-dropdown-gallery-link" role="menuitem">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Open Theme Gallery
              </a>
            </div>
          </div>
        </div>

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

  // ── Theme Dropdown ────────────────────────────────────────────────────────
  const themeTrigger = document.getElementById('header-theme-trigger');
  const themeDropdown = document.getElementById('theme-dropdown');

  if (themeTrigger && themeDropdown) {
    themeTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = themeDropdown.classList.contains('is-open');
      themeDropdown.classList.toggle('is-open', !isOpen);
      themeTrigger.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
      if (!document.getElementById('header-theme-switcher')?.contains(e.target)) {
        themeDropdown.classList.remove('is-open');
        themeTrigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeDropdown);
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function onEsc(e) {
      if (e.key === 'Escape' && themeDropdown.classList.contains('is-open')) {
        themeDropdown.classList.remove('is-open');
        themeTrigger.setAttribute('aria-expanded', 'false');
        themeTrigger.focus();
        document.removeEventListener('keydown', onEsc);
      }
    });

    // Handle theme switch clicks
    themeDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('[data-theme-switch]');
      if (item) {
        const newThemeId = item.dataset.themeSwitch;
        applyTheme(newThemeId);
        const theme = THEMES[newThemeId];

        // Update visual active state in dropdown immediately
        themeDropdown.querySelectorAll('[data-theme-switch]').forEach(btn => {
          const isActive = btn.dataset.themeSwitch === newThemeId;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-pressed', String(isActive));
          const check = btn.querySelector('.theme-switch-check');
          if (check) check.style.display = isActive ? '' : 'none';
        });

        // Update trigger emoji
        const emojiEl = themeTrigger.querySelector('.header-theme-emoji');
        if (emojiEl) emojiEl.textContent = theme.emoji;
        themeTrigger.title = `Switch theme — ${theme.name} active`;

        themeDropdown.classList.remove('is-open');
        themeTrigger.setAttribute('aria-expanded', 'false');

        // Import Toast dynamically to avoid circular deps
        import('./toast.js').then(({ Toast }) => {
          Toast.success(`${theme.emoji} ${theme.name} applied!`);
        });
      }
    });
  }
}
