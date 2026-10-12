/**
 * MAIN APP ROUTER & ORCHESTRATOR
 * Handles Single Page Application routing, event buses, and view transitions.
 */

import { renderNavbar } from './components/navbar.js';
import { setupProfileModal, setupResumeModal } from './components/profileCard.js';
import { renderHomePage, attachHomePageListeners } from './pages/homePage.js';
import { renderModulesPage, attachModulesPageListeners } from './pages/modulesPage.js';
import { renderExperimentsPage, attachExperimentsPageListeners } from './pages/experimentsPage.js';
import { renderExperimentDetailPage, attachExperimentDetailPageListeners } from './pages/experimentDetailPage.js';
import { renderToolsPage, attachToolsPageListeners } from './pages/toolsPage.js';
import { PyodideEngine } from './pyodideRunner.js';

class App {
  constructor() {
    this.appRoot = document.getElementById('app-root');
    this.currentRoute = 'home';
    this.currentParam = null;
    this.profileModal = null;
    this.resumeModal = null;
  }

  init() {
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

    // Background warmup of Pyodide
    setTimeout(() => {
      PyodideEngine.loadPyodideEngine().catch(e => console.log("Pyodide warmup note:", e));
    }, 1500);
  }

  parseHash() {
    const rawHash = window.location.hash.slice(1) || 'home';
    if (rawHash.startsWith('experiment/')) {
      const parts = rawHash.split('/');
      return { route: 'experiment-detail', param: parts[1] };
    }
    return { route: rawHash, param: null };
  }

  handleRoute() {
    const { route, param } = this.parseHash();
    this.currentRoute = route;
    this.currentParam = param;

    // Determine navbar active identifier
    let navActive = route;
    if (route === 'experiment-detail') navActive = 'experiments';
    if (!['home', 'modules', 'experiments', 'tools'].includes(navActive)) {
      navActive = 'home';
    }

    // Render Navigation
    renderNavbar(navActive);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render View
    switch (route) {
      case 'home':
        this.appRoot.innerHTML = renderHomePage();
        attachHomePageListeners();
        break;

      case 'modules':
        this.appRoot.innerHTML = renderModulesPage();
        attachModulesPageListeners(() => this.handleRoute());
        break;

      case 'experiments':
        this.appRoot.innerHTML = renderExperimentsPage();
        attachExperimentsPageListeners(() => this.handleRoute());
        break;

      case 'experiment-detail':
        this.appRoot.innerHTML = renderExperimentDetailPage(param);
        attachExperimentDetailPageListeners(param, (targetHash) => {
          window.location.hash = targetHash;
        });
        break;

      case 'tools':
        this.appRoot.innerHTML = renderToolsPage();
        attachToolsPageListeners(() => this.handleRoute());
        break;

      default:
        window.location.hash = '#home';
        break;
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
