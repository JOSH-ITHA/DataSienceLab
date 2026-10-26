/**
 * MAIN APP ROUTER & ORCHESTRATOR
 * Handles Single Page Application routing, event buses, and view transitions.
 */

import { renderNavbar } from './components/navbar.js';
import { setupProfileModal, setupResumeModal } from './components/profileCard.js';
import { setupGlobalSearch } from './components/globalSearch.js';
import { initTheme } from './data/themes.js';

class App {
  constructor() {
    this.appRoot = document.getElementById('app-root');
    this.currentRoute = 'home';
    this.currentParam = null;
    this.profileModal = null;
    this.resumeModal = null;
    this.pendingModuleSearchId = null;
    this.routeRenderId = 0;
  }

  init() {
    // Apply saved theme immediately (before any render)
    initTheme();

    // Setup Modals
    this.profileModal = setupProfileModal();
    this.resumeModal = setupResumeModal();

    // Setup Event Listeners
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('open-profile-modal', () => this.profileModal.open());
    window.addEventListener('open-resume-modal', () => this.resumeModal.open());

    // Data update triggers
    window.addEventListener('module-updated', () => this.handleRoute());
    window.addEventListener('experiment-updated', () => this.handleRoute());
    window.addEventListener('student-updated', () => {
      renderNavbar(this.currentRoute);
      this.profileModal = setupProfileModal();
      this.resumeModal = setupResumeModal();
      this.handleRoute();
    });

    // Initial Routing
    this.handleRoute();

  }

  parseHash() {
    const rawHash = window.location.hash.slice(1) || 'home';
    if (rawHash.startsWith('experiment/')) {
      const parts = rawHash.split('/');
      return { route: 'experiment-detail', param: parts[1] };
    }
    return { route: rawHash, param: null };
  }

  async handleRoute() {
    const renderId = ++this.routeRenderId;
    const { route, param } = this.parseHash();
    this.currentRoute = route;
    this.currentParam = param;

    // Determine navbar active identifier
    let navActive = route;
    if (route === 'experiment-detail') navActive = 'experiments';
    if (!['home', 'modules', 'experiments', 'tools', 'resources', 'projects', 'themes', 'campus'].includes(navActive)) {
      navActive = 'home';
    }

    // Render Navigation
    renderNavbar(navActive);
    setupGlobalSearch(result => {
      if (result.type === 'Module') {
        this.pendingModuleSearchId = result.id;
        if (this.currentRoute === 'modules') {
          import('./components/moduleCard.js').then(({ openModuleDetailModal }) => {
            if (this.currentRoute === 'modules') openModuleDetailModal(result.id);
          });
        } else {
          window.location.hash = '#modules';
        }
      } else if (result.type === 'Experiment') {
        window.location.hash = `#experiment/${encodeURIComponent(result.id)}`;
      } else {
        window.open(result.link, '_blank', 'noopener,noreferrer');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Render View
    try {
      switch (route) {
      case 'home': {
        const page = await import('./pages/homePage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderHomePage();
        page.attachHomePageListeners();
        break;
      }

      case 'modules': {
        const page = await import('./pages/modulesPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderModulesPage();
        page.attachModulesPageListeners(() => this.handleRoute());
        if (this.pendingModuleSearchId) {
          const { openModuleDetailModal } = await import('./components/moduleCard.js');
          if (renderId !== this.routeRenderId) return;
          openModuleDetailModal(this.pendingModuleSearchId);
          this.pendingModuleSearchId = null;
        }
        break;
      }

      case 'experiments': {
        const page = await import('./pages/experimentsPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderExperimentsPage();
        page.attachExperimentsPageListeners(() => this.handleRoute());
        break;
      }

      case 'experiment-detail': {
        const page = await import('./pages/experimentDetailPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderExperimentDetailPage(param);
        page.attachExperimentDetailPageListeners(param, (targetHash) => {
          window.location.hash = targetHash;
        });
        break;
      }

      case 'tools': {
        const page = await import('./pages/toolsPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderToolsPage();
        page.attachToolsPageListeners(() => this.handleRoute());
        break;
      }

      case 'resources': {
        const page = await import('./pages/resourcesPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderResourcesPage();
        break;
      }

      case 'projects': {
        const page = await import('./pages/projectsPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderProjectsPage();
        break;
      }

      case 'themes': {
        const page = await import('./pages/themesPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderThemesPage();
        page.attachThemesPageListeners();
        break;
      }

      case 'campus': {
        const page = await import('./pages/campusPage.js');
        if (renderId !== this.routeRenderId) return;
        this.appRoot.innerHTML = page.renderCampusPage();
        page.attachCampusPageListeners(() => this.handleRoute());
        break;
      }

        default:
          window.location.hash = '#home';
          break;
      }
    } catch (error) {
      if (renderId !== this.routeRenderId) return;
      console.error(`Unable to load the ${route} page:`, error);
      this.appRoot.innerHTML = `
        <div class="container fade-in">
          <div class="empty-state">
            <h2 class="empty-state-title">This page could not be loaded</h2>
            <p class="empty-state-text">Please check your connection and try navigating here again.</p>
          </div>
        </div>
      `;
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
