/**
 * MY CAMPUS — Student Portal Dashboard Page
 * Integrates with existing routing, Storage, and CSS variable system.
 * All demo/simulated data is clearly labelled and never presented as
 * official MBU attendance, grades, or academic records.
 */

import { Storage } from '../data/storage.js';
import {
  DEMO_TIMETABLE, DEMO_CALENDAR_EVENTS, DEMO_QUIZ_SCORES,
  DEMO_CODING_PRACTICE, DEMO_NOTICES, CampusStorage,
} from '../data/campusData.js';
import { Toast } from '../components/toast.js';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(dateStr); d.setHours(0, 0, 0, 0);
  return Math.round((d - today) / 86400000);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusClass(s) {
  return s === 'completed' ? 'status-completed' : s === 'in_progress' ? 'status-in-progress' : 'status-not-started';
}
function statusLabel(s) {
  return s === 'completed' ? '● Completed' : s === 'in_progress' ? '◐ In Progress' : '○ Not Started';
}

const TODAY_DAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];

// ─── Section: Dashboard Hero (Student ID mini-card + quick stats) ─────────────
function renderDashboardHero(student, stats) {
  const practicals = CampusStorage.getTracker();
  const pracDone = practicals.filter(p => p.status === 'completed').length;
  const pracTotal = practicals.length;

  const upcomingPracticals = practicals
    .filter(p => p.status !== 'completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 1)[0];

  const dueSoonLabel = upcomingPracticals
    ? `${esc(upcomingPracticals.title)} — ${formatDate(upcomingPracticals.deadline)}`
    : 'No upcoming deadlines';

  return `
<div class="campus-hero">
  <div class="campus-hero-id">
    <img src="${esc(student.avatar)}" alt="${esc(student.name)}"
         class="campus-hero-avatar"
         onerror="this.src='assets/images/avatar-placeholder.svg'">
    <div class="campus-hero-info">
      <div class="campus-hero-name">${esc(student.name)}</div>
      <div class="campus-hero-roll">${esc(student.rollNo)}</div>
      <div class="campus-hero-meta">
        <span>Dept. of ${esc(student.department)}</span>
        <span>·</span>
        <span>Section ${esc(student.section)}</span>
        <span>·</span>
        <span>${esc(student.faculty)}</span>
      </div>
    </div>
    <div class="campus-hero-badge" title="Academic Year">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      AY 2024–2028
    </div>
  </div>

  <div class="campus-quick-stats">
    <div class="cqs-card">
      <div class="cqs-icon" style="background:var(--primary-light); color:var(--primary);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
      </div>
      <div class="cqs-body">
        <div class="cqs-val">${stats.modulesCompleted}/${stats.totalModules}</div>
        <div class="cqs-label">Modules Done</div>
      </div>
    </div>
    <div class="cqs-card">
      <div class="cqs-icon" style="background:var(--accent-emerald-light); color:var(--accent-emerald);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6M10 3v6.5l-5.5 9A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5l-5.5-9V3"></path></svg>
      </div>
      <div class="cqs-body">
        <div class="cqs-val">${stats.experimentsCompleted}/${stats.totalExperiments}</div>
        <div class="cqs-label">Lab Experiments</div>
      </div>
    </div>
    <div class="cqs-card">
      <div class="cqs-icon" style="background:var(--accent-amber-light); color:var(--accent-amber);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
      </div>
      <div class="cqs-body">
        <div class="cqs-val">${pracDone}/${pracTotal}</div>
        <div class="cqs-label">Practicals Done</div>
      </div>
    </div>
    <div class="cqs-card">
      <div class="cqs-icon" style="background:var(--primary-light); color:var(--primary);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
      </div>
      <div class="cqs-body">
        <div class="cqs-val">${stats.overallPercentage}%</div>
        <div class="cqs-label">Overall Progress</div>
      </div>
    </div>
  </div>

  <div class="campus-upcoming-bar">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    <span><strong>Next Deadline:</strong> ${esc(dueSoonLabel)}</span>
  </div>
</div>`;
}

// ─── Section: Practical Submission Tracker ────────────────────────────────────
function renderTracker(filter = 'all', search = '') {
  const practicals = CampusStorage.getTracker();
  const filtered = practicals.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.module.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const done = practicals.filter(p => p.status === 'completed').length;
  const inProg = practicals.filter(p => p.status === 'in_progress').length;
  const notStarted = practicals.filter(p => p.status === 'not_started').length;
  const pct = Math.round((done / practicals.length) * 100);

  const rows = filtered.map(p => {
    const delta = daysUntil(p.deadline);
    const urgentClass = delta < 0 ? 'overdue' : delta <= 3 ? 'urgent' : '';
    const urgentBadge = delta < 0
      ? `<span class="tracker-urgency overdue">Overdue</span>`
      : delta <= 3
        ? `<span class="tracker-urgency urgent">${delta}d left</span>`
        : `<span class="tracker-urgency ok">${delta}d left</span>`;
    return `
<tr class="tracker-row ${urgentClass}" data-prac-id="${esc(p.id)}">
  <td class="tracker-title-cell">
    <span class="tracker-title">${esc(p.title)}</span>
    <span class="tracker-module-tag">${esc(p.module)}</span>
  </td>
  <td>${formatDate(p.deadline)} ${urgentBadge}</td>
  <td>
    <select class="tracker-status-select ${statusClass(p.status)}" data-prac-id="${esc(p.id)}" aria-label="Status for ${esc(p.title)}">
      <option value="not_started" ${p.status === 'not_started' ? 'selected' : ''}>○ Not Started</option>
      <option value="in_progress" ${p.status === 'in_progress' ? 'selected' : ''}>◐ In Progress</option>
      <option value="completed"  ${p.status === 'completed' ? 'selected' : ''}>● Completed</option>
    </select>
  </td>
</tr>`;
  }).join('');

  const emptyRow = filtered.length === 0
    ? `<tr><td colspan="3"><div class="campus-empty-inline">No practicals match your filter.</div></td></tr>`
    : '';

  return `
<section class="campus-section" id="section-tracker" aria-labelledby="tracker-heading">
  <div class="campus-section-header">
    <h2 class="campus-section-title" id="tracker-heading">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
      Practical Submission Tracker
    </h2>
    <span class="campus-demo-chip">Status persisted locally</span>
  </div>

  <!-- Progress bar -->
  <div class="tracker-progress-row">
    <div class="tracker-progress-labels">
      <span><span class="dot dot-green"></span> Completed: <strong>${done}</strong></span>
      <span><span class="dot dot-amber"></span> In Progress: <strong>${inProg}</strong></span>
      <span><span class="dot dot-muted"></span> Not Started: <strong>${notStarted}</strong></span>
      <span style="margin-left:auto; font-weight:700; color:var(--primary);">${pct}%</span>
    </div>
    <div class="campus-progress-bar-container">
      <div class="campus-progress-bar-fill" style="width:${pct}%;"></div>
    </div>
  </div>

  <!-- Controls -->
  <div class="campus-controls">
    <div class="search-box-wrapper" style="max-width:320px;">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" id="tracker-search" class="search-input" placeholder="Search practicals…" value="${esc(search)}">
    </div>
    <div class="filter-group">
      <button class="filter-chip ${filter === 'all' ? 'active' : ''}" data-tracker-filter="all">All (${practicals.length})</button>
      <button class="filter-chip ${filter === 'not_started' ? 'active' : ''}" data-tracker-filter="not_started">Not Started</button>
      <button class="filter-chip ${filter === 'in_progress' ? 'active' : ''}" data-tracker-filter="in_progress">In Progress</button>
      <button class="filter-chip ${filter === 'completed' ? 'active' : ''}" data-tracker-filter="completed">Completed</button>
    </div>
  </div>

  <div class="tracker-table-wrap">
    <table class="tracker-table" aria-label="Practical submission tracker">
      <thead><tr><th>Practical / Title</th><th>Deadline</th><th>Status</th></tr></thead>
      <tbody>${rows}${emptyRow}</tbody>
    </table>
  </div>
</section>`;
}

// ─── Section: Notice Board ────────────────────────────────────────────────────
function renderNoticeBoard(catFilter = 'all', searchTerm = '') {
  const readIds = CampusStorage.getReadNotices();
  const cats = ['all', ...new Set(DEMO_NOTICES.map(n => n.category))];
  const filtered = DEMO_NOTICES.filter(n => {
    const matchCat = catFilter === 'all' || n.category === catFilter;
    const matchSearch = !searchTerm || n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.body.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });
  const unreadCount = DEMO_NOTICES.filter(n => !readIds.has(n.id)).length;

  const catChips = cats.map(c => `<button class="filter-chip ${catFilter === c ? 'active' : ''}" data-notice-filter="${esc(c)}">${c === 'all' ? `All (${DEMO_NOTICES.length})` : esc(c)}</button>`).join('');

  const noticeCards = filtered.map(n => {
    const isRead = readIds.has(n.id);
    const isImportant = n.important;
    return `
<div class="notice-card ${isRead ? 'is-read' : 'is-unread'} ${n.isDemo ? 'is-demo' : ''} ${isImportant ? 'is-important' : ''}"
     data-notice-id="${esc(n.id)}" role="article" aria-label="${esc(n.title)}">
  <div class="notice-card-header">
    <div class="notice-meta-row">
      ${!isRead ? '<span class="notice-unread-dot" aria-label="Unread"></span>' : ''}
      ${isImportant ? '<span class="notice-priority-badge">Important</span>' : ''}
      ${n.isDemo ? '<span class="notice-demo-badge">Demo</span>' : ''}
      <span class="notice-category-tag">${esc(n.category)}</span>
    </div>
    <time class="notice-date">${formatDate(n.date)}</time>
  </div>
  <h3 class="notice-title">${esc(n.title)}</h3>
  <p class="notice-body">${esc(n.body)}</p>
  <div class="notice-footer">
    <span class="notice-author">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
      ${esc(n.author)}
    </span>
    ${!isRead ? `<button class="notice-mark-read-btn" data-notice-id="${esc(n.id)}">Mark as read</button>` : '<span class="notice-read-label">✓ Read</span>'}
  </div>
</div>`;
  }).join('');

  const emptyState = filtered.length === 0
    ? `<div class="campus-empty-inline">No notices match your filter.</div>`
    : '';

  return `
<section class="campus-section" id="section-noticeboard" aria-labelledby="notices-heading">
  <div class="campus-section-header">
    <h2 class="campus-section-title" id="notices-heading">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      Notice Board
      ${unreadCount > 0 ? `<span class="campus-unread-badge">${unreadCount} unread</span>` : ''}
    </h2>
    <span class="campus-demo-chip">Faculty notices + demo announcements</span>
  </div>

  <div class="notice-disclaimer">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    Notices marked <strong>Demo</strong> are sample content only. Notices from <em>Faculty: S. Bosubabu</em> are real course notices added by your faculty mentor.
  </div>

  <div class="campus-controls">
    <div class="search-box-wrapper" style="max-width:320px;">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" id="notice-search" class="search-input" placeholder="Search notices…" value="${esc(searchTerm)}">
    </div>
    <div class="filter-group">${catChips}</div>
  </div>

  <div class="notice-grid" id="notice-grid">
    ${noticeCards}${emptyState}
  </div>
</section>`;
}

// ─── Section: Learning Report (SVG charts, no external library) ───────────────
function renderLearningReport(stats) {
  const practicals = CampusStorage.getTracker();
  const pracPct = Math.round((practicals.filter(p => p.status === 'completed').length / practicals.length) * 100);

  // Mini bar chart helper (pure SVG, no library)
  function barChart(items, valueKey, labelKey, maxVal, accentVar) {
    const W = 36, GAP = 8, H = 80;
    const bars = items.map((item, i) => {
      const barH = Math.max(4, Math.round((item[valueKey] / maxVal) * H));
      const x = i * (W + GAP);
      const y = H - barH;
      return `
        <g>
          <rect x="${x}" y="${y}" width="${W}" height="${barH}" rx="4" fill="var(${accentVar})" opacity="0.85"/>
          <text x="${x + W / 2}" y="${H + 14}" text-anchor="middle" font-size="9" fill="var(--text-muted)">${esc(item[labelKey])}</text>
          <text x="${x + W / 2}" y="${y - 3}" text-anchor="middle" font-size="9" font-weight="700" fill="var(--text-main)">${item[valueKey]}</text>
        </g>`;
    }).join('');
    const totalW = items.length * (W + GAP) - GAP;
    return `<svg viewBox="0 0 ${totalW} ${H + 20}" class="campus-chart-svg" role="img" aria-label="Bar chart">${bars}</svg>`;
  }

  // Radial progress ring
  function ring(pct, color) {
    const r = 36, c = 2 * Math.PI * r;
    const dash = (pct / 100) * c;
    return `<svg width="90" height="90" viewBox="0 0 90 90" class="campus-ring-svg" role="img" aria-label="${pct}% complete">
      <circle cx="45" cy="45" r="${r}" fill="none" stroke="var(--bg-subtle)" stroke-width="7"/>
      <circle cx="45" cy="45" r="${r}" fill="none" stroke="${color}" stroke-width="7"
        stroke-dasharray="${dash.toFixed(1)} ${c.toFixed(1)}"
        stroke-linecap="round"
        transform="rotate(-90 45 45)"/>
      <text x="45" y="50" text-anchor="middle" font-size="14" font-weight="800" fill="var(--text-main)">${pct}%</text>
    </svg>`;
  }

  const quizAvg = Math.round(DEMO_QUIZ_SCORES.reduce((a, q) => a + q.score, 0) / DEMO_QUIZ_SCORES.length);
  const maxProblems = Math.max(...DEMO_CODING_PRACTICE.map(w => w.problems));

  const quizBars = DEMO_QUIZ_SCORES.map((q, i) => {
    const w = `${q.score}%`;
    return `
<div class="report-quiz-row">
  <span class="report-quiz-label">${esc(q.label.split('—')[0])}</span>
  <div class="report-quiz-bar-track">
    <div class="report-quiz-bar-fill" style="width:${w};"></div>
  </div>
  <span class="report-quiz-score">${q.score}/100</span>
</div>`;
  }).join('');

  return `
<section class="campus-section" id="section-report" aria-labelledby="report-heading">
  <div class="campus-section-header">
    <h2 class="campus-section-title" id="report-heading">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
      Learning Report
    </h2>
    <span class="campus-demo-chip">⚠ Demo data — not official MBU grades or attendance</span>
  </div>

  <div class="report-disclaimer">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    <strong>Important:</strong> Quiz scores and coding practice data shown here are <strong>demonstration values only</strong>. They are not linked to any official MBU examination system, grade portal, or attendance records.
  </div>

  <!-- Progress Rings -->
  <div class="report-rings-row">
    <div class="report-ring-card">
      ${ring(stats.overallPercentage, 'var(--primary)')}
      <span>Overall Progress</span>
    </div>
    <div class="report-ring-card">
      ${ring(Math.round((stats.modulesCompleted / stats.totalModules) * 100), 'var(--accent-cyan)')}
      <span>Modules</span>
    </div>
    <div class="report-ring-card">
      ${ring(Math.round((stats.experimentsCompleted / stats.totalExperiments) * 100), 'var(--accent-emerald)')}
      <span>Experiments</span>
    </div>
    <div class="report-ring-card">
      ${ring(pracPct, 'var(--accent-amber)')}
      <span>Practicals</span>
    </div>
  </div>

  <div class="report-charts-row">
    <!-- Quiz Scores -->
    <div class="report-chart-card">
      <div class="report-chart-header">
        <span class="report-chart-title">Quiz Scores (Demo)</span>
        <span class="report-chart-avg">Avg: ${quizAvg}/100</span>
      </div>
      ${quizBars}
    </div>

    <!-- Coding Practice -->
    <div class="report-chart-card">
      <div class="report-chart-header">
        <span class="report-chart-title">Coding Practice (Demo)</span>
        <span class="report-chart-avg">${DEMO_CODING_PRACTICE.reduce((a,w) => a + w.problems, 0)} problems total</span>
      </div>
      ${barChart(DEMO_CODING_PRACTICE, 'problems', 'week', maxProblems + 2, '--accent-cyan')}
    </div>
  </div>
</section>`;
}

// ─── Section: Timetable ───────────────────────────────────────────────────────
function renderTimetable() {
  const slotTypeColor = { lab: 'var(--accent-emerald)', lecture: 'var(--primary)', default: 'var(--accent-cyan)' };

  const dayColumns = DEMO_TIMETABLE.map(dayData => {
    const isToday = dayData.day === TODAY_DAY;
    const slots = dayData.slots.map(s => {
      const col = slotTypeColor[s.type] || slotTypeColor.default;
      return `
<div class="tt-slot" style="border-left:3px solid ${col};">
  <div class="tt-time">${esc(s.time)}</div>
  <div class="tt-subject">${esc(s.subject)}</div>
  <div class="tt-room">${esc(s.room)}</div>
  <span class="tt-type-chip" style="background:${col}22; color:${col};">${esc(s.type)}</span>
</div>`;
    }).join('');

    return `
<div class="tt-day-col ${isToday ? 'is-today' : ''}">
  <div class="tt-day-header">${esc(dayData.day)}${isToday ? ' <span class="tt-today-chip">Today</span>' : ''}</div>
  ${slots || '<div class="tt-slot tt-free">Free</div>'}
</div>`;
  }).join('');

  return `
<section class="campus-section" id="section-timetable" aria-labelledby="tt-heading">
  <div class="campus-section-header">
    <h2 class="campus-section-title" id="tt-heading">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      Weekly Timetable
    </h2>
    <span class="campus-demo-chip">Demo schedule — not official MBU timetable</span>
  </div>
  <div class="tt-grid">${dayColumns}</div>
</section>`;
}

// ─── Section: Calendar + Reminders ───────────────────────────────────────────
function renderCalendar() {
  const reminders = CampusStorage.getReminders();
  const readIds = new Set();
  const now = new Date();
  const monthEvents = DEMO_CALENDAR_EVENTS.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  });

  const calEventTypeColor = {
    exam: 'var(--accent-rose)',
    deadline: 'var(--accent-amber)',
    event: 'var(--accent-cyan)',
    holiday: 'var(--accent-emerald)',
  };

  const sortedEvents = [...DEMO_CALENDAR_EVENTS]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  const eventList = sortedEvents.map(e => {
    const delta = daysUntil(e.date);
    const col = calEventTypeColor[e.type] || 'var(--primary)';
    const deltaLabel = delta < 0 ? `${Math.abs(delta)}d ago` : delta === 0 ? 'Today' : `in ${delta}d`;
    return `
<div class="cal-event-row">
  <div class="cal-event-dot" style="background:${col};"></div>
  <div class="cal-event-info">
    <span class="cal-event-label">${esc(e.label)}</span>
    <span class="cal-event-date">${formatDate(e.date)} · ${deltaLabel}</span>
  </div>
  <span class="cal-event-type-chip" style="background:${col}22; color:${col};">${esc(e.type)}</span>
</div>`;
  }).join('');

  const reminderRows = reminders.length === 0
    ? '<div class="campus-empty-inline">No reminders yet. Add one below.</div>'
    : reminders.map(r => `
<div class="reminder-row ${r.done ? 'is-done' : ''}" data-rem-id="${esc(r.id)}">
  <button class="reminder-check-btn" data-rem-toggle="${esc(r.id)}" aria-label="Toggle reminder" title="Toggle done">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
  </button>
  <div class="reminder-content">
    <span class="reminder-text">${esc(r.text)}</span>
    ${r.date ? `<span class="reminder-date">${formatDate(r.date)}</span>` : ''}
  </div>
  <button class="reminder-del-btn" data-rem-del="${esc(r.id)}" aria-label="Delete reminder" title="Delete">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
</div>`).join('');

  return `
<section class="campus-section" id="section-calendar" aria-labelledby="cal-heading">
  <div class="campus-section-header">
    <h2 class="campus-section-title" id="cal-heading">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      Academic Calendar & Reminders
    </h2>
    <span class="campus-demo-chip">Demo academic events + personal reminders</span>
  </div>

  <div class="cal-layout">
    <!-- Upcoming Events -->
    <div class="cal-events-panel">
      <div class="cal-panel-title">Upcoming Events</div>
      ${eventList}
    </div>

    <!-- Personal Reminders -->
    <div class="cal-reminders-panel">
      <div class="cal-panel-title">
        My Reminders
        <span class="reminder-count-badge">${reminders.length}</span>
      </div>
      <div id="reminder-list">${reminderRows}</div>
      <form id="reminder-add-form" class="reminder-add-form" autocomplete="off">
        <input type="text" id="reminder-text-input" class="form-control" placeholder="Add a reminder…" maxlength="120" required>
        <input type="date" id="reminder-date-input" class="form-control" style="max-width:160px;">
        <button type="submit" class="btn btn-primary btn-sm">Add</button>
      </form>
    </div>
  </div>
</section>`;
}

// ─── Section: Quick Links ─────────────────────────────────────────────────────
function renderQuickLinks() {
  const links = [
    { hash: '#modules',     icon: '📚', label: 'Modules',     desc: 'Curriculum & theory' },
    { hash: '#experiments', icon: '🔬', label: 'Lab',         desc: 'Run experiments' },
    { hash: '#tools',       icon: '🛠️', label: 'Tools',       desc: 'DS ecosystem' },
    { hash: '#resources',   icon: '📖', label: 'Resources',   desc: 'Books & links' },
    { hash: '#themes',      icon: '🎨', label: 'Themes',      desc: 'Customise look' },
    { hash: '#projects',    icon: '🚀', label: 'Projects',    desc: 'Your showcase' },
  ];

  return `
<section class="campus-section" id="section-quicklinks" aria-labelledby="ql-heading">
  <h2 class="campus-section-title" id="ql-heading" style="margin-bottom:1rem;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
    Quick Links
  </h2>
  <div class="ql-grid">
    ${links.map(l => `
    <a href="${esc(l.hash)}" class="ql-card" aria-label="${esc(l.label)}">
      <span class="ql-icon">${l.icon}</span>
      <span class="ql-label">${esc(l.label)}</span>
      <span class="ql-desc">${esc(l.desc)}</span>
    </a>`).join('')}
  </div>
</section>`;
}

// ─── Section: Enhanced Digital ID (QR + print) ───────────────────────────────
function renderDigitalID(student) {
  // Build a QR code URL using Google Charts API (external, no library needed)
  const portfolio = student.linkedin || 'https://linkedin.com';
  const qrUrl = `https://chart.googleapis.com/chart?chs=120x120&cht=qr&chl=${encodeURIComponent(portfolio)}&choe=UTF-8`;

  return `
<section class="campus-section" id="section-digitalid" aria-labelledby="id-heading">
  <div class="campus-section-header">
    <h2 class="campus-section-title" id="id-heading">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
      Digital Academic ID
    </h2>
    <button class="btn btn-outline btn-sm" id="btn-print-id" aria-label="Print academic ID card">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      Print ID
    </button>
  </div>

  <div id="printable-id-card" class="digital-id-card">
    <div class="digital-id-header">
      <img src="assets/images/mbu-logo.png" alt="Mohan Babu University" class="digital-id-logo" onerror="this.style.display='none'">
      <div>
        <div class="digital-id-univ">Mohan Babu University</div>
        <div class="digital-id-subtitle">College of Engineering &amp; Technology</div>
      </div>
      <div class="digital-id-badge-tag">STUDENT ID</div>
    </div>

    <div class="digital-id-body">
      <div class="digital-id-photo-col">
        <img src="${esc(student.avatar)}" alt="${esc(student.name)}"
             class="digital-id-photo"
             onerror="this.src='assets/images/avatar-placeholder.svg'">
        <div class="digital-id-roll">${esc(student.rollNo)}</div>
      </div>

      <div class="digital-id-details">
        <div class="digital-id-name">${esc(student.name)}</div>
        <div class="digital-id-detail-row"><span>Department</span><strong>${esc(student.department)}</strong></div>
        <div class="digital-id-detail-row"><span>Section</span><strong>${esc(student.section)}</strong></div>
        <div class="digital-id-detail-row"><span>Subject</span><strong>${esc(student.subject)}</strong></div>
        <div class="digital-id-detail-row"><span>Faculty Mentor</span><strong>${esc(student.faculty)}</strong></div>
        <div class="digital-id-detail-row"><span>Designation</span><strong>${esc(student.designation)}</strong></div>
        <div class="digital-id-detail-row"><span>Academic Year</span><strong>2024 – 2028</strong></div>
      </div>

      <div class="digital-id-qr-col">
        <img src="${qrUrl}" alt="QR code linking to LinkedIn profile" class="digital-id-qr"
             title="Scan to view LinkedIn portfolio"
             onerror="this.style.display='none'">
        <div class="digital-id-qr-label">LinkedIn Profile</div>
      </div>
    </div>

    <div class="digital-id-footer">
      <span>This is a digital academic record card generated by the Data Science Subject Digital Library.</span>
    </div>
  </div>
</section>`;
}

// ─── Section: Recent Activity feed ────────────────────────────────────────────
function renderActivity(stats) {
  const experiments = Storage.getExperiments();
  const modules = Storage.getModules();

  const completedExps = experiments.filter(e => e.completed).slice(-3).reverse();
  const completedMods = modules.filter(m => m.completed || m.progress === 'completed').slice(-2).reverse();

  const items = [
    ...completedExps.map(e => ({
      icon: '🔬', label: `Completed Experiment ${e.experimentNumber}: ${e.title}`, type: 'experiment', link: `#experiment/${e.id}`
    })),
    ...completedMods.map(m => ({
      icon: '📚', label: `Completed Module ${m.moduleNumber}: ${m.title}`, type: 'module', link: '#modules'
    })),
  ];

  const itemsHtml = items.length
    ? items.map(a => `
<div class="activity-row">
  <span class="activity-icon">${a.icon}</span>
  <a href="${esc(a.link)}" class="activity-label">${esc(a.label)}</a>
</div>`).join('')
    : '<div class="campus-empty-inline">No completed items yet. Start an experiment or module!</div>';

  return `
<section class="campus-section" id="section-activity" aria-labelledby="act-heading">
  <h2 class="campus-section-title" id="act-heading" style="margin-bottom:1rem;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
    Recent Activity
  </h2>
  <div class="activity-feed">
    ${itemsHtml}
  </div>
</section>`;
}

// ─── MAIN RENDER ──────────────────────────────────────────────────────────────
let _trackerFilter = 'all', _trackerSearch = '';
let _noticeFilter = 'all', _noticeSearch = '';

export function renderCampusPage() {
  const student = Storage.getStudent();
  const stats = Storage.calculateOverallProgress();

  return `
<div class="container fade-in campus-page" id="campus-page-root">
  <div class="page-header">
    <div class="page-header-row">
      <div class="page-title-group">
        <span class="page-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          Student Portal
        </span>
        <h1 class="page-title">MY CAMPUS</h1>
        <p class="page-subtitle">Your personalised academic dashboard — progress tracker, notice board, timetable and digital ID all in one place.</p>
      </div>
    </div>
  </div>

  ${renderDashboardHero(student, stats)}
  ${renderQuickLinks()}
  ${renderActivity(stats)}
  ${renderTimetable()}
  ${renderCalendar()}
  ${renderTracker(_trackerFilter, _trackerSearch)}
  ${renderNoticeBoard(_noticeFilter, _noticeSearch)}
  ${renderLearningReport(stats)}
  ${renderDigitalID(student)}
</div>`;
}

// ─── ATTACH LISTENERS ─────────────────────────────────────────────────────────
export function attachCampusPageListeners(onRerender) {
  // ── Practical Tracker ──────────────────────────────────────────────────────
  document.querySelectorAll('.tracker-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = sel.dataset.pracId;
      CampusStorage.updateTrackerStatus(id, sel.value);
      Toast.success('Practical status updated.');
      // Re-render just the tracker section in-place
      const section = document.getElementById('section-tracker');
      if (section) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = renderTracker(_trackerFilter, _trackerSearch);
        section.replaceWith(tempDiv.firstElementChild);
        attachTrackerListeners(onRerender);
      }
    });
  });

  document.querySelectorAll('[data-tracker-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _trackerFilter = btn.dataset.trackerFilter;
      refreshTracker(onRerender);
    });
  });

  document.getElementById('tracker-search')?.addEventListener('input', e => {
    _trackerSearch = e.target.value;
    refreshTracker(onRerender);
  });

  // ── Notice Board ───────────────────────────────────────────────────────────
  document.getElementById('notice-search')?.addEventListener('input', e => {
    _noticeSearch = e.target.value;
    refreshNotices();
  });

  document.querySelectorAll('[data-notice-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _noticeFilter = btn.dataset.noticeFilter;
      refreshNotices();
    });
  });

  attachMarkReadListeners();

  // ── Reminders ──────────────────────────────────────────────────────────────
  document.getElementById('reminder-add-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const text = document.getElementById('reminder-text-input').value.trim();
    const date = document.getElementById('reminder-date-input').value;
    if (!text) return;
    CampusStorage.addReminder(text, date);
    document.getElementById('reminder-text-input').value = '';
    document.getElementById('reminder-date-input').value = '';
    refreshReminders();
    Toast.success('Reminder added!');
  });

  attachReminderListeners();

  // ── Print ID ───────────────────────────────────────────────────────────────
  document.getElementById('btn-print-id')?.addEventListener('click', () => {
    window.print();
  });
}

// ─── Partial refresh helpers (no full page re-render) ─────────────────────────
function refreshTracker(onRerender) {
  const section = document.getElementById('section-tracker');
  if (!section) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = renderTracker(_trackerFilter, _trackerSearch);
  section.replaceWith(tmp.firstElementChild);
  attachTrackerListeners(onRerender);
}

function attachTrackerListeners(onRerender) {
  document.querySelectorAll('.tracker-status-select').forEach(sel => {
    sel.addEventListener('change', () => {
      CampusStorage.updateTrackerStatus(sel.dataset.pracId, sel.value);
      Toast.success('Practical status updated.');
      refreshTracker(onRerender);
    });
  });
  document.querySelectorAll('[data-tracker-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _trackerFilter = btn.dataset.trackerFilter;
      refreshTracker(onRerender);
    });
  });
  document.getElementById('tracker-search')?.addEventListener('input', e => {
    _trackerSearch = e.target.value;
    refreshTracker(onRerender);
  });
}

function refreshNotices() {
  const grid = document.getElementById('notice-grid');
  const section = document.getElementById('section-noticeboard');
  if (!section) return;
  const tmp = document.createElement('div');
  tmp.innerHTML = renderNoticeBoard(_noticeFilter, _noticeSearch);
  section.replaceWith(tmp.firstElementChild);
  // Re-attach controls
  document.getElementById('notice-search')?.addEventListener('input', e => {
    _noticeSearch = e.target.value;
    refreshNotices();
  });
  document.querySelectorAll('[data-notice-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _noticeFilter = btn.dataset.noticeFilter;
      refreshNotices();
    });
  });
  attachMarkReadListeners();
}

function attachMarkReadListeners() {
  document.querySelectorAll('.notice-mark-read-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.noticeId;
      CampusStorage.markNoticeRead(id);
      const card = btn.closest('.notice-card');
      if (card) {
        card.classList.remove('is-unread');
        card.classList.add('is-read');
        btn.replaceWith(Object.assign(document.createElement('span'), {
          className: 'notice-read-label',
          textContent: '✓ Read'
        }));
        // Update unread badge in title
        const readSet = CampusStorage.getReadNotices();
        const unread = DEMO_NOTICES.filter(n => !readSet.has(n.id)).length;
        const badge = document.querySelector('.campus-unread-badge');
        if (badge) { badge.textContent = unread > 0 ? `${unread} unread` : ''; }
      }
    });
  });
}

function refreshReminders() {
  const list = document.getElementById('reminder-list');
  if (!list) return;
  const reminders = CampusStorage.getReminders();
  if (reminders.length === 0) {
    list.innerHTML = '<div class="campus-empty-inline">No reminders yet. Add one below.</div>';
    return;
  }
  list.innerHTML = reminders.map(r => `
<div class="reminder-row ${r.done ? 'is-done' : ''}" data-rem-id="${esc(r.id)}">
  <button class="reminder-check-btn" data-rem-toggle="${esc(r.id)}" aria-label="Toggle reminder">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
  </button>
  <div class="reminder-content">
    <span class="reminder-text">${esc(r.text)}</span>
    ${r.date ? `<span class="reminder-date">${formatDate(r.date)}</span>` : ''}
  </div>
  <button class="reminder-del-btn" data-rem-del="${esc(r.id)}" aria-label="Delete reminder">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  </button>
</div>`).join('');

  const countBadge = document.querySelector('.reminder-count-badge');
  if (countBadge) countBadge.textContent = reminders.length;

  attachReminderListeners();
}

function attachReminderListeners() {
  document.querySelectorAll('[data-rem-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      CampusStorage.toggleReminder(btn.dataset.remToggle);
      refreshReminders();
    });
  });
  document.querySelectorAll('[data-rem-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      CampusStorage.deleteReminder(btn.dataset.remDel);
      refreshReminders();
      Toast.info('Reminder removed.');
    });
  });
}
