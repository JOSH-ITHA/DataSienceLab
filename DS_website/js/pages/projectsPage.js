export function renderProjectsPage() {
  return `
    <div class="container fade-in">
      <div class="page-header">
        <div class="page-header-row">
          <div class="page-title-group">
            <span class="page-badge">Student Work</span>
            <h1 class="page-title">MY PROJECTS</h1>
            <p class="page-subtitle">A showcase of the projects you have built and want to share.</p>
          </div>
        </div>
      </div>

      <section class="empty-state" aria-labelledby="projects-coming-soon">
        <div class="tool-icon-box" aria-hidden="true" style="margin: 0 auto 1rem;">🚀</div>
        <h2 class="empty-state-title" id="projects-coming-soon">Projects coming soon</h2>
        <p class="empty-state-text">Share the projects you have worked on when you are ready, and this page can become your project portfolio.</p>
      </section>
    </div>
  `;
}
