/**
 * STUDENT PROFILE & ID CARD COMPONENT
 * Renders Academic ID Card on Home page, Profile Modal, and About Me / Resume Modal.
 */

import { Storage } from '../data/storage.js';
import { Toast } from './toast.js';

export function renderProfileCard() {
  const student = Storage.getStudent();

  return `
    <div class="student-id-card">
      <div class="id-card-header-bar">
        <div class="id-card-college-row">
          <span class="id-card-badge-tag">OFFICIAL ID</span>
          <span class="id-card-dept-tag">DEPT. OF ${student.department.toUpperCase()}</span>
        </div>
        <div style="font-size: 0.8rem; opacity: 0.9; font-weight: 600;">ACADEMIC DIGITAL IDENTITY</div>
      </div>

      <div class="id-card-body">
        <div class="id-card-avatar-wrapper" id="id-card-avatar-btn" title="Click to view & customize student profile photo">
          <img src="${student.avatar}" alt="${student.name}" class="id-card-avatar" onerror="this.src='assets/images/avatar-placeholder.svg'">
          <span class="avatar-badge-status" title="Active Student"></span>
        </div>

        <h3 class="student-name">${student.name}</h3>
        <div class="student-roll" title="University Roll Number">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="13" y2="12"></line></svg>
          ${student.rollNo}
        </div>

        <!-- Academic Key Details Table -->
        <div class="id-details-list">
          <div class="id-detail-row">
            <span class="id-detail-label">Department</span>
            <span class="id-detail-val">${student.department}</span>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">Section</span>
            <span class="id-detail-val">${student.section}</span>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">Subject</span>
            <span class="id-detail-val">${student.subject}</span>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">Faculty Mentor</span>
            <span class="id-detail-val">${student.faculty}</span>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">Designation</span>
            <span class="id-detail-val">${student.designation}</span>
          </div>
        </div>



        <button class="btn btn-primary id-card-view-more-btn" id="btn-view-more-profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          VIEW MORE
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders the Interactive Student Profile Modal (complete credentials & photo upload)
 */
export function setupProfileModal() {
  let modalOverlay = document.getElementById('profile-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'profile-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const student = Storage.getStudent();

  modalOverlay.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <h3 class="modal-title">Student Profile & Credentials</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-profile-modal" aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="modal-body">
        <div style="display:flex; gap:1.5rem; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap;">
          <img src="${student.avatar}" alt="${student.name}" id="modal-preview-avatar" style="width:84px; height:84px; border-radius:50%; object-fit:cover; border:3px solid var(--primary); box-shadow:var(--shadow-md);">
          <div>
            <h4 style="font-size:1.25rem; font-weight:800; color:var(--text-main);">${student.name}</h4>
            <div style="font-size:0.85rem; color:var(--primary); font-family:var(--font-mono); font-weight:700;">Roll No: ${student.rollNo}</div>
            <div style="font-size:0.825rem; color:var(--text-muted); margin-top:0.25rem;">Department of ${student.department} • Section ${student.section}</div>
          </div>
        </div>

        <div class="id-details-list" style="margin-bottom:1.25rem;">
          <div class="id-detail-row">
            <span class="id-detail-label">Subject</span>
            <span class="id-detail-val">${student.subject}</span>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">Faculty Mentor</span>
            <span class="id-detail-val">${student.faculty} (${student.designation})</span>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">LinkedIn</span>
            <a href="${student.linkedin}" target="_blank" class="id-detail-val" style="color:var(--primary); text-decoration:underline;">View LinkedIn Profile ↗</a>
          </div>
          <div class="id-detail-row">
            <span class="id-detail-label">GitHub</span>
            <a href="${student.github}" target="_blank" class="id-detail-val" style="color:var(--primary); text-decoration:underline;">View GitHub Repositories ↗</a>
          </div>
        </div>

        <!-- Custom Photo Replacement Helper -->
        <div style="background:var(--bg-page); padding:1rem; border-radius:var(--radius-md); border:1px dashed var(--border-medium);">
          <label class="form-label" style="font-size:0.825rem; margin-bottom:0.3rem;">Replace Profile Photo (Upload or Image URL):</label>
          <div style="display:flex; gap:0.5rem;">
            <input type="text" id="input-avatar-url" class="form-control" placeholder="Image URL or assets/images/your-photo.jpg" value="${student.avatar}">
            <button class="btn btn-secondary btn-sm" id="btn-save-avatar">Update</button>
          </div>
          <div class="form-hint">You can also put your photo in <code>assets/images/</code> and set the path here.</div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-secondary" id="btn-close-profile-modal-2">Close</button>
        <button class="btn btn-primary" id="btn-open-resume-from-profile">View Resume & Skills</button>
      </div>
    </div>
  `;

  // Attach Close Actions
  const close = () => modalOverlay.classList.remove('active');
  const open = () => modalOverlay.classList.add('active');

  document.getElementById('btn-close-profile-modal').onclick = close;
  document.getElementById('btn-close-profile-modal-2').onclick = close;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };

  // Photo Update Action
  document.getElementById('btn-save-avatar').onclick = () => {
    const val = document.getElementById('input-avatar-url').value.trim();
    if (val) {
      const st = Storage.getStudent();
      st.avatar = val;
      Storage.saveStudent(st);
      document.getElementById('modal-preview-avatar').src = val;
      Toast.success("Profile photo updated successfully!");
      // Dispatch refresh event
      window.dispatchEvent(new CustomEvent('student-updated'));
    }
  };

  // Switch to Resume modal
  document.getElementById('btn-open-resume-from-profile').onclick = () => {
    close();
    window.dispatchEvent(new CustomEvent('open-resume-modal'));
  };

  return { open, close };
}

/**
 * Renders the About Me & Resume Modal / Viewer
 */
export function setupResumeModal() {
  let modalOverlay = document.getElementById('resume-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'resume-modal-overlay';
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  const student = Storage.getStudent();

  const skillsHtml = student.skills.map(s => `
    <span class="badge badge-primary" style="font-size:0.8rem; padding:0.35rem 0.75rem;">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ${s}
    </span>
  `).join('');

  modalOverlay.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <h3 class="modal-title">About Me & Academic Resume</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-resume-modal" aria-label="Close resume modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Resume Header Card -->
        <div style="background:var(--bg-page); padding:1.25rem 1.5rem; border-radius:var(--radius-lg); border:1px solid var(--border-subtle); margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.45rem; font-weight:800; color:var(--text-main);">${student.name}</h2>
            <div style="font-size:0.875rem; color:var(--primary); font-weight:600;">Data Science Undergraduate • Roll No: ${student.rollNo}</div>
            <div style="font-size:0.825rem; color:var(--text-muted); margin-top:0.25rem;">Department of ${student.department} (Sec ${student.section}) • Mentor: ${student.faculty} (${student.designation})</div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <a href="${student.linkedin}" target="_blank" class="btn btn-secondary btn-sm">LinkedIn ↗</a>
            <a href="${student.github}" target="_blank" class="btn btn-secondary btn-sm">GitHub ↗</a>
          </div>
        </div>

        <!-- About Me Section -->
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            About Me
          </h4>
          <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.65; background:var(--bg-page); border:1px solid var(--border-subtle); padding:1rem 1.25rem; border-radius:var(--radius-md);">
            ${student.aboutMe}
          </p>
        </div>

        <!-- Technical Skills Section -->
        <div style="margin-bottom:1.5rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.65rem; display:flex; align-items:center; gap:0.4rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Technical & Domain Skills
          </h4>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            ${skillsHtml}
          </div>
        </div>

        <!-- Academic Projects -->
        <div style="margin-bottom:1rem;">
          <h4 style="font-size:1rem; font-weight:700; color:var(--text-main); margin-bottom:0.65rem; display:flex; align-items:center; gap:0.4rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            Academic Coursework & Projects
          </h4>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${student.resume.projects.map(p => `
              <div style="background:var(--bg-page); padding:0.9rem 1.15rem; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
                <div style="font-weight:700; font-size:0.925rem; color:var(--text-main);">${p.title}</div>
                <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">${p.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="modal-footer" style="justify-content:space-between;">
        <button class="btn btn-secondary" id="btn-close-resume-modal-2">Close</button>
        <div style="display:flex; gap:0.6rem;">
          <button class="btn btn-outline" id="btn-print-resume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            VIEW RESUME
          </button>
          <button class="btn btn-primary" id="btn-download-resume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            DOWNLOAD RESUME
          </button>
        </div>
      </div>
    </div>
  `;

  const close = () => modalOverlay.classList.remove('active');
  const open = () => modalOverlay.classList.add('active');

  document.getElementById('btn-close-resume-modal').onclick = close;
  document.getElementById('btn-close-resume-modal-2').onclick = close;
  modalOverlay.onclick = (e) => { if (e.target === modalOverlay) close(); };

  // Print/View Resume action
  document.getElementById('btn-print-resume').onclick = () => {
    window.print();
  };

  // Download Resume action (generates clean markdown/text resume or formatted PDF text file)
  document.getElementById('btn-download-resume').onclick = () => {
    const resumeText = `=====================================================
${student.name.toUpperCase()} - ACADEMIC RESUME
=====================================================
Roll Number : ${student.rollNo}
Department  : ${student.department} (Section ${student.section})
Subject     : ${student.subject}
Institution : ${student.institution}
Faculty     : ${student.faculty} (${student.designation})
LinkedIn    : ${student.linkedin}
GitHub      : ${student.github}

ABOUT ME:
${student.aboutMe}

TECHNICAL SKILLS:
${student.skills.map(s => `• ${s}`).join('\n')}

ACADEMIC PROJECTS:
${student.resume.projects.map(p => `• ${p.title}\n  ${p.description}`).join('\n\n')}
=====================================================`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resume_${student.name.replace(/\s+/g, '_')}_${student.rollNo}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    Toast.success("Resume downloaded successfully!");
  };

  return { open, close };
}
