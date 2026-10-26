/**
 * CAMPUS PORTAL — DEMO & PERSISTENT DATA
 * All demo data is clearly labelled. Personal reminders and tracker
 * statuses are persisted in localStorage under versioned keys.
 * Never presents simulated data as official MBU records.
 */

const CAMPUS_KEYS = {
  REMINDERS: 'ds_campus_reminders_v1',
  TRACKER:   'ds_campus_tracker_v1',
  NOTICES_READ: 'ds_campus_notices_read_v1',
};

// ─── DEMO TIMETABLE ────────────────────────────────────────────────────────────
export const DEMO_TIMETABLE = [
  { day: 'Monday',    slots: [
    { time: '9:00',  subject: 'Data Science Lab',      room: 'CS Lab 2',   type: 'lab' },
    { time: '10:00', subject: 'Statistical Thinking',  room: 'Room 301',   type: 'lecture' },
    { time: '11:00', subject: 'Data Visualisation',    room: 'Room 301',   type: 'lecture' },
    { time: '14:00', subject: 'Python Programming',    room: 'CS Lab 1',   type: 'lab' },
  ]},
  { day: 'Tuesday',  slots: [
    { time: '9:00',  subject: 'Data Extraction',       room: 'Room 302',   type: 'lecture' },
    { time: '10:00', subject: 'Machine Learning',      room: 'Room 302',   type: 'lecture' },
    { time: '14:00', subject: 'Time Series Analysis',  room: 'Room 305',   type: 'lecture' },
  ]},
  { day: 'Wednesday', slots: [
    { time: '9:00',  subject: 'Data Science Lab',      room: 'CS Lab 2',   type: 'lab' },
    { time: '11:00', subject: 'Statistical Thinking',  room: 'Room 301',   type: 'lecture' },
  ]},
  { day: 'Thursday', slots: [
    { time: '9:00',  subject: 'Data Extraction',       room: 'Room 302',   type: 'lecture' },
    { time: '10:00', subject: 'Data Visualisation',    room: 'Room 301',   type: 'lecture' },
    { time: '14:00', subject: 'Python Programming',    room: 'CS Lab 1',   type: 'lab' },
  ]},
  { day: 'Friday',   slots: [
    { time: '9:00',  subject: 'Machine Learning',      room: 'Room 302',   type: 'lecture' },
    { time: '10:00', subject: 'Time Series Analysis',  room: 'Room 305',   type: 'lecture' },
    { time: '14:00', subject: 'Data Science Lab',      room: 'CS Lab 2',   type: 'lab' },
  ]},
];

// ─── DEMO ACADEMIC CALENDAR ────────────────────────────────────────────────────
export const DEMO_CALENDAR_EVENTS = [
  { id: 'ev-1',  date: '2026-11-05', label: 'Mid-Semester Exam',          type: 'exam',     demo: true },
  { id: 'ev-2',  date: '2026-11-08', label: 'Lab Record Submission',      type: 'deadline', demo: true },
  { id: 'ev-3',  date: '2026-11-12', label: 'Module 3 Assignment Due',    type: 'deadline', demo: true },
  { id: 'ev-4',  date: '2026-11-15', label: 'Data Science Symposium',     type: 'event',    demo: true },
  { id: 'ev-5',  date: '2026-11-20', label: 'End-of-Unit Viva',           type: 'exam',     demo: true },
  { id: 'ev-6',  date: '2026-12-01', label: 'Project Proposal Deadline',  type: 'deadline', demo: true },
  { id: 'ev-7',  date: '2026-12-10', label: 'End-Semester Exam Begins',   type: 'exam',     demo: true },
  { id: 'ev-8',  date: '2026-12-20', label: 'Winter Break Starts',        type: 'holiday',  demo: true },
  { id: 'ev-9',  date: '2027-01-05', label: 'Classes Resume',             type: 'event',    demo: true },
  { id: 'ev-10', date: '2026-10-28', label: 'Practical Submission Week',  type: 'deadline', demo: true },
];

// ─── DEMO PRACTICAL SUBMISSION TRACKER ────────────────────────────────────────
export const DEFAULT_PRACTICALS = [
  { id: 'prac-1',  title: 'Basic Python Data Manipulation',        module: 'Module 1', deadline: '2026-11-05', status: 'completed' },
  { id: 'prac-2',  title: 'NumPy Matrix Operations',               module: 'Module 1', deadline: '2026-11-05', status: 'completed' },
  { id: 'prac-3',  title: 'Pandas DataFrame Manipulation',         module: 'Module 1', deadline: '2026-11-08', status: 'in_progress' },
  { id: 'prac-4',  title: 'Pandas Aggregation & GroupBy',          module: 'Module 1', deadline: '2026-11-08', status: 'not_started' },
  { id: 'prac-5',  title: 'Matplotlib Plotting Pipeline',          module: 'Module 3', deadline: '2026-11-12', status: 'not_started' },
  { id: 'prac-6',  title: 'Handling Missing Values & Outliers',    module: 'Module 1', deadline: '2026-11-12', status: 'not_started' },
  { id: 'prac-7',  title: 'Exploratory Data Analysis (EDA)',       module: 'Module 1', deadline: '2026-11-15', status: 'not_started' },
  { id: 'prac-8',  title: 'Feature Scaling & Normalization',       module: 'Module 2', deadline: '2026-11-15', status: 'not_started' },
  { id: 'prac-9',  title: 'Linear Regression from Scratch',        module: 'Module 5', deadline: '2026-11-20', status: 'not_started' },
  { id: 'prac-10', title: 'KNN Classification',                    module: 'Module 2', deadline: '2026-11-20', status: 'not_started' },
  { id: 'prac-11', title: 'Working with CSV & JSON Formats',       module: 'Module 1', deadline: '2026-11-25', status: 'not_started' },
  { id: 'prac-12', title: 'SQLite CRUD with Pandas',               module: 'Module 1', deadline: '2026-11-28', status: 'not_started' },
];

// ─── DEMO NOTICE BOARD ─────────────────────────────────────────────────────────
export const DEMO_NOTICES = [
  {
    id: 'n-1',
    title: 'Mid-Semester Practical Examination Schedule',
    body: 'The mid-semester practical examination for Data Science Lab is scheduled on 5th November 2026. All students must bring their record notebooks and lab files.',
    category: 'Examination',
    date: '2026-10-20',
    author: 'Faculty: S. Bosubabu (Asst. Prof.)',
    isDemo: false,
    important: true,
  },
  {
    id: 'n-2',
    title: 'Lab Record Submission Guidelines',
    body: 'Lab records for Experiments 1–5 must be submitted by 8th November 2026. Handwritten records are mandatory. Digital printouts will not be accepted.',
    category: 'Submission',
    date: '2026-10-18',
    author: 'Faculty: S. Bosubabu (Asst. Prof.)',
    isDemo: false,
    important: true,
  },
  {
    id: 'n-3',
    title: '[DEMO] Data Science Symposium Registration',
    body: 'DEMO NOTICE — This is sample content added to showcase the notice board feature. Register for the department-level data science symposium before 10th November.',
    category: 'Event',
    date: '2026-10-15',
    author: 'Demo Content — Not an official announcement',
    isDemo: true,
    important: false,
  },
  {
    id: 'n-4',
    title: '[DEMO] Project Proposal Submission',
    body: 'DEMO NOTICE — Project proposals for the final-semester project must be submitted in the prescribed format through the faculty mentor before 1st December.',
    category: 'Submission',
    date: '2026-10-12',
    author: 'Demo Content — Not an official announcement',
    isDemo: true,
    important: false,
  },
  {
    id: 'n-5',
    title: '[DEMO] Guest Lecture on Machine Learning',
    body: 'DEMO NOTICE — A guest lecture on real-world ML applications by an industry professional is scheduled for 20th November. Attendance is encouraged.',
    category: 'Event',
    date: '2026-10-10',
    author: 'Demo Content — Not an official announcement',
    isDemo: true,
    important: false,
  },
  {
    id: 'n-6',
    title: 'Internal Assessment Test Dates',
    body: 'Internal Assessment Test 2 is scheduled from 18–22 November 2026. Syllabus: Modules 3, 4, and 5. Students should contact their faculty mentor for any clarification.',
    category: 'Examination',
    date: '2026-10-08',
    author: 'Faculty: S. Bosubabu (Asst. Prof.)',
    isDemo: false,
    important: true,
  },
];

// ─── DEMO LEARNING REPORT DATA ─────────────────────────────────────────────────
export const DEMO_QUIZ_SCORES = [
  { label: 'Quiz 1 — Intro to DS',         score: 82, max: 100, demo: true },
  { label: 'Quiz 2 — Data Extraction',      score: 76, max: 100, demo: true },
  { label: 'Quiz 3 — Visualisation',        score: 88, max: 100, demo: true },
  { label: 'Quiz 4 — Statistical Thinking', score: 71, max: 100, demo: true },
  { label: 'Quiz 5 — Time Series',          score: 79, max: 100, demo: true },
];

export const DEMO_CODING_PRACTICE = [
  { week: 'Week 1', problems: 6,  demo: true },
  { week: 'Week 2', problems: 9,  demo: true },
  { week: 'Week 3', problems: 4,  demo: true },
  { week: 'Week 4', problems: 11, demo: true },
  { week: 'Week 5', problems: 7,  demo: true },
  { week: 'Week 6', problems: 13, demo: true },
];

// ─── STORAGE HELPERS ───────────────────────────────────────────────────────────

export const CampusStorage = {
  // Reminders
  getReminders() {
    try {
      return JSON.parse(localStorage.getItem(CAMPUS_KEYS.REMINDERS) || '[]');
    } catch { return []; }
  },
  saveReminders(list) {
    try { localStorage.setItem(CAMPUS_KEYS.REMINDERS, JSON.stringify(list)); } catch {}
  },
  addReminder(text, date) {
    const list = this.getReminders();
    list.push({ id: `rem-${Date.now()}`, text, date, done: false });
    this.saveReminders(list);
  },
  toggleReminder(id) {
    const list = this.getReminders().map(r => r.id === id ? { ...r, done: !r.done } : r);
    this.saveReminders(list);
  },
  deleteReminder(id) {
    this.saveReminders(this.getReminders().filter(r => r.id !== id));
  },

  // Practical Tracker
  getTracker() {
    try {
      const saved = JSON.parse(localStorage.getItem(CAMPUS_KEYS.TRACKER) || 'null');
      if (!saved) {
        localStorage.setItem(CAMPUS_KEYS.TRACKER, JSON.stringify(DEFAULT_PRACTICALS));
        return [...DEFAULT_PRACTICALS];
      }
      // Merge: add any new practicals from defaults that aren't in saved
      const savedIds = new Set(saved.map(p => p.id));
      const merged = [...saved];
      DEFAULT_PRACTICALS.forEach(p => { if (!savedIds.has(p.id)) merged.push(p); });
      return merged;
    } catch { return [...DEFAULT_PRACTICALS]; }
  },
  updateTrackerStatus(id, status) {
    const list = this.getTracker().map(p => p.id === id ? { ...p, status } : p);
    try { localStorage.setItem(CAMPUS_KEYS.TRACKER, JSON.stringify(list)); } catch {}
  },

  // Notices read state
  getReadNotices() {
    try { return new Set(JSON.parse(localStorage.getItem(CAMPUS_KEYS.NOTICES_READ) || '[]')); }
    catch { return new Set(); }
  },
  markNoticeRead(id) {
    const s = this.getReadNotices();
    s.add(id);
    try { localStorage.setItem(CAMPUS_KEYS.NOTICES_READ, JSON.stringify([...s])); } catch {}
  },
};
