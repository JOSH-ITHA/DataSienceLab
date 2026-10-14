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
        <div style="display:flex; align-items:flex-start; justify-content:space-between; width:100%;">
          <div class="id-card-college-row">
            <span class="id-card-badge-tag">OFFICIAL ID</span>
            <span class="id-card-dept-tag">DEPT. OF ${student.department.toUpperCase()}</span>
          </div>
          <img
            src="assets/images/mbu-logo.png"
            alt="Mohan Babu University Logo"
            class="id-card-mbu-logo"
            onerror="this.style.display='none'"
            title="Mohan Babu University"
          >
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

  const resume = student.resume || {};
  const displayName = resume.fullName || student.name;
  const skillGroups = resume.skillGroups || [{ category: 'Technical Skills', skills: student.skills || [] }];
  const skillsHtml = skillGroups.map(group => `
    <section class="resume-skill-group">
      <h4>${group.category}</h4>
      <div class="resume-skill-tags">
        ${group.skills.map(skill => `<span>${skill}</span>`).join('')}
      </div>
    </section>
  `).join('');
  const educationHtml = (resume.education || []).map(education => `
    <article class="resume-entry">
      <div class="resume-entry-heading">
        <h4>${education.degree}</h4>
        <span>${education.period}</span>
      </div>
      <p class="resume-entry-subtitle">${education.institution}</p>
      <p>${education.details}</p>
    </article>
  `).join('');
  const projectsHtml = (resume.projects || []).map(project => `
    <article class="resume-entry">
      <h4>${project.title}</h4>
      <p>${project.description}</p>
    </article>
  `).join('');
  const certificationsHtml = (resume.certifications || []).map(certification => `
    <article class="resume-entry">
      <div class="resume-entry-heading">
        <h4>${certification.name}</h4>
        <span>${certification.issuer}</span>
      </div>
      <p>${certification.details}</p>
    </article>
  `).join('');
  const softSkillsHtml = (resume.softSkills || []).map(skill => `<span>${skill}</span>`).join('');

  modalOverlay.innerHTML = `
    <div class="modal-dialog modal-lg resume-modal-dialog">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <h3 class="modal-title">Professional Resume</h3>
        </div>
        <button class="modal-close-btn" id="btn-close-resume-modal" aria-label="Close resume modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="modal-body resume-modal-body">
        <article class="resume-document">
          <header class="resume-document-header">
            <div class="resume-eyebrow">Software Development · Data Science · Cloud</div>
            <h1>${displayName}</h1>
            <p class="resume-headline">${resume.headline || `B.Tech Student in ${student.department}`}</p>
            <div class="resume-contact-row">
              <span>${student.institution}</span>
              <span>B.Tech ${student.department} · ${student.academicYear} · ${student.rollNo}</span>
            </div>
            <div class="resume-link-row">
              <a href="${student.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="${student.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </header>

          <section class="resume-section">
            <h2>Professional Summary</h2>
            <p>${resume.summary || student.aboutMe}</p>
          </section>

          <section class="resume-section">
            <h2>Technical Skills</h2>
            <div class="resume-skill-groups">${skillsHtml}</div>
          </section>

          <section class="resume-section">
            <h2>Selected Projects</h2>
            <div class="resume-entries">${projectsHtml}</div>
          </section>

          <section class="resume-section">
            <h2>Education</h2>
            <div class="resume-entries">${educationHtml}</div>
          </section>

          <section class="resume-section">
            <h2>Certifications & Credentials</h2>
            <div class="resume-entries">${certificationsHtml}</div>
          </section>

          <section class="resume-section">
            <h2>Professional Strengths</h2>
            <div class="resume-soft-skills">${softSkillsHtml}</div>
          </section>
        </article>
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
    const cleanup = () => document.body.classList.remove('resume-printing');
    document.body.classList.add('resume-printing');
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
    window.setTimeout(cleanup, 60000);
  };

  // Download a self-contained resume document that can be printed or saved as PDF.
  document.getElementById('btn-download-resume').onclick = () => {
    const resumeDocument = modalOverlay.querySelector('.resume-document');
    if (!resumeDocument) {
      console.error('Could not find the rendered resume document to download.');
      Toast.error('The resume could not be downloaded. Please reopen it and try again.');
      return;
    }
    const resumeStyles = `
      @page{size:A4;margin:16mm}
      *{box-sizing:border-box}
      body{margin:0;background:#fff;color:#1e293b;font:10pt/1.55 Arial,Helvetica,sans-serif}
      .resume-document{max-width:850px;margin:0 auto;padding:32px;background:#fff;color:#1e293b}
      .resume-document-header{padding:0 0 18px;border-bottom:3px solid #4f46e5}
      .resume-eyebrow{color:#4f46e5;font-size:9pt;font-weight:bold;letter-spacing:.1em;text-transform:uppercase}
      .resume-document-header h1{margin:6px 0;font-size:27pt;line-height:1.1;color:#111827}
      .resume-headline{margin:0 0 10px;color:#4338ca;font-size:12pt;font-weight:bold}
      .resume-contact-row,.resume-link-row{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:9pt;color:#475569}
      .resume-link-row{margin-top:7px}.resume-link-row a{color:#4338ca;text-decoration:none}
      .resume-section{margin-top:18px;break-inside:avoid}
      .resume-section h2{margin:0 0 8px;padding-bottom:4px;border-bottom:1px solid #cbd5e1;color:#312e81;font-size:13pt}
      .resume-section p{margin:4px 0}
      .resume-skill-group{margin:8px 0}
      .resume-skill-group h4{margin:0 0 5px;color:#334155;font-size:9pt}
      .resume-skill-tags,.resume-soft-skills{display:flex;flex-wrap:wrap;gap:5px}
      .resume-skill-tags span,.resume-soft-skills span{padding:3px 8px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;font-size:8.5pt}
      .resume-entry{margin:0 0 10px;break-inside:avoid}
      .resume-entry h4{margin:0;color:#1e293b;font-size:10pt}
      .resume-entry p{color:#475569}
      .resume-entry-heading{display:flex;justify-content:space-between;gap:12px}
      .resume-entry-heading span,.resume-entry-subtitle{color:#4f46e5;font-size:9pt;font-weight:bold}
      @media print{.resume-document{padding:0}}
    `;
    const resumeHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${displayName} — Resume</title><style>${resumeStyles}</style></head><body>${resumeDocument.outerHTML}</body></html>`;
    const blob = new Blob([resumeHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resume_${displayName.replace(/\s+/g, '_')}_${student.rollNo}.html`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    Toast.success("Formatted resume downloaded. Open it and print or save as PDF.");
  };

  return { open, close };
}
