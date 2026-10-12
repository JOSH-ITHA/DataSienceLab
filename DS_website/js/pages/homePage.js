/**
 * HOME PAGE VIEW
 * Left: Student ID Card
 * Right: Welcome Hero, Dynamic Stats, and Real-time Progress Tracking
 */

import { Storage } from '../data/storage.js';
import { renderProfileCard } from '../components/profileCard.js';

export function renderHomePage() {
  const stats = Storage.calculateOverallProgress();
  const toolsCount = 8;

  return `
    <div class="container fade-in">
      <div class="home-layout">
        <!-- LEFT COLUMN: Academic Student ID Card -->
        <aside class="home-left-col" aria-label="Student Academic Identity">
          ${renderProfileCard()}
        </aside>

        <!-- RIGHT COLUMN: Welcome Section & Dynamic Platform Features -->
        <main class="home-welcome-panel">
          <!-- Hero Banner -->
          <div class="welcome-hero-card">
            <div class="hero-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Academic Year 2024–2028 • Department of Data Science
            </div>

            <h1 class="hero-heading">
              Welcome to <span>Data Science</span> Subject Digital Library
            </h1>

            <p class="hero-desc">
              An interactive, comprehensive digital repository and virtual programming laboratory designed to explore structured curriculum modules, execute real Python scientific computations, and track mastery across data analytics workflows.
            </p>

            <div class="hero-cta-group">
              <a href="#modules" class="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                Explore Modules
              </a>
              <a href="#experiments" class="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Launch Virtual Lab
              </a>
              <a href="#tools" class="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Browse Tools
              </a>
            </div>
          </div>

          <!-- 4 Useful Statistics Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon-wrapper stat-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">${stats.totalModules}</span>
                <span class="stat-label">Academic Modules</span>
                <span class="stat-desc">Core theoretical foundations</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon-wrapper stat-icon-emerald">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">${stats.totalExperiments}+</span>
                <span class="stat-label">Lab Experiments</span>
                <span class="stat-desc">Hands-on Python runnable labs</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon-wrapper stat-icon-amber">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">${toolsCount}</span>
                <span class="stat-label">Data Science Tools</span>
                <span class="stat-desc">Ecosystem & framework docs</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon-wrapper stat-icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">100%</span>
                <span class="stat-label">Interactive Learning</span>
                <span class="stat-desc">Browser client-side execution</span>
              </div>
            </div>
          </div>

          <!-- Overall Dynamic Learning Progress Card -->
          <div class="overall-progress-card">
            <div class="progress-header-row">
              <div class="progress-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" style="display:inline; vertical-align:text-bottom; margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                Overall Subject Completion Progress
              </div>
              <span class="progress-percentage">${stats.overallPercentage}%</span>
            </div>

            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${stats.overallPercentage}%;"></div>
            </div>

            <div class="progress-stats-summary">
              <span>Modules: <strong>${stats.modulesCompleted} / ${stats.totalModules}</strong> completed</span>
              <span>Experiments: <strong>${stats.experimentsCompleted} / ${stats.totalExperiments}</strong> completed</span>
              <span>Status: <strong style="color:var(--accent-emerald);">${stats.overallPercentage === 100 ? 'Completed 🎉' : 'In Active Progress'}</strong></span>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;
}

export function attachHomePageListeners() {
  const avatarBtn = document.getElementById('id-card-avatar-btn');
  if (avatarBtn) {
    avatarBtn.onclick = () => window.dispatchEvent(new CustomEvent('open-profile-modal'));
  }

  const viewMoreBtn = document.getElementById('btn-view-more-profile');
  if (viewMoreBtn) {
    viewMoreBtn.onclick = () => window.dispatchEvent(new CustomEvent('open-resume-modal'));
  }
}
