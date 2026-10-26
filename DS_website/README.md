# 📊 Data Science Subject Digital Library
### Interactive Academic Virtual Lab & Student Portal

> Developed by **Joshitha Upati** · Roll No `24102A030127`  
> Department of Data Science (Section 2) · Mohan Babu University  
> Subject: Data Science · Faculty Mentor: **S. Bosubabu** (Assistant Professor)

---

## 🌐 Live Demo

Deployed on Vercel → **[DataScienceLab](https://github.com/JOSH-ITHA/DataSienceLab)**

---

## 🌟 Project Overview

The **Data Science Subject Digital Library** is a fully browser-based academic platform and interactive virtual laboratory built as a college mini-project. It transforms traditional coursework into a dynamic single-page application (SPA) with zero backend requirements for core features.

The platform covers the complete Data Science syllabus across 5 structured modules and 20+ hands-on lab experiments. Students can read course notes, run Python/JavaScript/SQL/HTML/CSS code directly in the browser, track their learning progress, manage practical submissions, and personalise the entire interface with a 6-theme gallery — all from one place.

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🏠 Home | Student ID card, hero welcome, live stats, progress bar |
| 📚 Modules | 5 curriculum modules with PDF viewer, topic explorer, progress tracking |
| 🔬 Experiments | 20+ runnable labs with multi-language code editor |
| 🛠️ Tools | 8 curated Data Science tool cards with docs links |
| 📖 Resources | Curated books, courses, and datasets |
| 🚀 Projects | Student project showcase |
| 🎨 Themes | 6 full-site themes with live preview |
| 🏛️ My Campus | Student portal — tracker, notices, timetable, report, digital ID |

---

## 🔍 Detailed Feature Breakdown

### 1. Navigation & Architecture
- Fixed header with icon nav links: `HOME`, `MODULES`, `EXPERIMENTS`, `TOOLS`, `RESOURCES`, `PROJECTS`, `THEMES`, `MY CAMPUS`
- Hash-based SPA routing (`#home`, `#modules`, `#campus`, etc.) — no page reloads
- Global search across all modules, experiments, tools, and resources (`Ctrl+K`)
- Quick theme switcher dropdown in the navbar
- Fully responsive — works on mobile, tablet, and desktop
- All progress and preferences persisted in `localStorage`

---

### 2. Home Page
- **Student ID Card** — Name, roll number, department, section, subject, faculty mentor, LinkedIn & GitHub links, profile photo upload
- **Hero Banner** — Welcome section with CTA buttons
- **Live Statistics** — Module count, experiment count, tools count, interactive learning indicator
- **Overall Progress Bar** — Dynamically computed from module + experiment completion (40%/60% weighted)

---

### 3. Curriculum Modules (5 Modules)
| # | Module |
|---|---|
| 1 | Introduction to Data Science |
| 2 | Data Extraction |
| 3 | Data Visualization |
| 4 | Statistical Thinking |
| 5 | Time Series Analysis & Predictive Modeling |

**Each module includes:**
- Detailed topic list with in-depth explanations
- Learning objectives
- In-built PDF viewer (minimize / maximize / new tab) for local study guides
- Progress status: Not Started → In Progress → Completed
- Video lecture and reference links
- `+ ADD MODULE` form to add custom modules

---

### 4. Virtual Lab Experiments (20 Runnable Labs)

**Pre-loaded experiments cover:**
Python data structures, NumPy arrays, Pandas DataFrames, aggregation & GroupBy, Matplotlib visualization, missing value imputation, EDA, feature scaling, linear regression, KNN classification, CSV/TSV/JSON/Excel formats, SQLite CRUD, GitHub API, data cleaning, outlier detection, regex, hierarchical indexing, and more.

**Multi-language Code Editor:**
| Language | Runtime |
|---|---|
| Python | Pyodide WebAssembly (in-browser) |
| JavaScript | Isolated Web Worker sandbox |
| SQL | Browser SQLite (sql.js) |
| HTML / CSS | Sandboxed iframe preview |
| C / C++ / Java | Local Docker runner (optional) |

**Editor features:**
- Syntax highlighting (highlight.js) coordinated with selected theme
- Line numbers, Tab indentation, per-language code drafts saved automatically
- Standard input panel for `input()` / `prompt()` / stdin
- `RUN`, `CLEAR CODE`, `CLEAR OUTPUT`, `COPY`, `RESET CODE` buttons
- `Ctrl+Enter` keyboard shortcut to run
- Execution time display, error categorization, sandboxed preview
- `MARK AS COMPLETED` toggle synced to progress tracking
- `+ ADD EXPERIMENT` form for custom labs

---

### 5. Theme Gallery (6 Themes)

Apply any theme instantly — it updates every element site-wide including the code editor syntax highlighting.

| Theme | Style |
|---|---|
| ⚡ Cyber Lab *(default)* | Black, neon purple, electric cyan |
| 🔷 Glass Academia | Navy, glassmorphism, blue-violet |
| 📖 Scholar Light | Ivory, white, soft blue, sage green |
| 🧠 AI Neural | Midnight blue, violet, cyan |
| 💚 Terminal Green | Charcoal, emerald, terminal-style |
| 🌸 Aurora Pastel | Lavender, pastel pink, mint, cream |

**Theme features:**
- Live preview modal before applying
- Persisted in `localStorage` — survives refresh and navigation
- No flash on load (synchronous CSS variable injection before first paint)
- Navbar quick-switch dropdown on every page
- Filter by Dark / Light
- Reset to Default button
- Full `prefers-reduced-motion` support

---

### 6. My Campus — Student Portal Dashboard

A complete MBU-style student portal accessible at `#campus`.

#### Dashboard Hero
- Mini student ID with avatar, name, roll number, department/section/faculty
- 4 live stat cards: Modules Done, Lab Experiments, Practicals Done, Overall %
- Next deadline alert bar

#### Quick Links
One-click cards to every section of the site.

#### Recent Activity
Dynamically pulls from actual completed experiments and modules.

#### Weekly Timetable *(Demo)*
5-day timetable grid with time, subject, room, type (lecture/lab), today highlighted.
> Labelled as demo — not official MBU timetable.

#### Academic Calendar + Personal Reminders
- 10 demo academic events (exams, deadlines, holidays) with urgency countdowns
- Personal reminders: add text + optional date, toggle done, delete
- Reminders persist in `localStorage`

#### Practical Submission Tracker
- 12 practicals mapped to modules with deadlines
- Status dropdown: Not Started / In Progress / Completed — persisted locally
- Urgency colour coding (overdue → red, ≤3 days → amber, safe → green)
- Progress bar, search, and filter by status
- Deadline countdown for each practical

#### Notice Board
- 6 notices — 3 real faculty notices + 3 demo sample announcements
- Unread indicators, mark-as-read, category filter, full-text search
- Clear visual distinction between real faculty notices and demo content
- Categories: Examination, Submission, Event

#### Learning Report *(Demo data — not official grades)*
- SVG progress rings for overall, modules, experiments, and practicals
- Quiz score horizontal bar chart (5 quizzes)
- Weekly coding practice bar chart (6 weeks)
> **Important:** All scores shown are demonstration values only. They are not linked to any official MBU examination system or attendance records.

#### Enhanced Digital ID Card
- MBU logo, student photo, all academic details
- QR code linking to LinkedIn portfolio
- Print-friendly view (one click prints only the ID card)

---

## 💻 Running Locally

### Quick Start (any method)

**Option 1 — npx serve (recommended)**
```bash
npx serve . -l 3000
```
Open `http://localhost:3000`

**Option 2 — Python**
```bash
python -m http.server 3000
```

**Option 3 — VS Code Live Server**
Right-click `index.html` → Open with Live Server

---

### Running C, C++, and Java (optional)

Requires Docker Desktop running locally.

```powershell
# Build compiler images
docker build -f execution-service/containers/Dockerfile.c -t ds-library-c-runner:1 execution-service/containers
docker build -f execution-service/containers/Dockerfile.java -t ds-library-java-runner:1 execution-service/containers

# Start the execution service
npm run execution-service
```

The editor connects to `http://localhost:3001/api/execute`. If Docker is unavailable, the output panel reports it clearly — it never simulates a successful run.

---

## 📁 Project Structure

```
DS_website/
├── index.html                        # SPA entry point + theme flash prevention
├── package.json                      # Dev scripts
├── vercel.json                       # Vercel deployment config
├── README.md                         # This file
│
├── execution-service/
│   ├── server.js                     # Local Docker execution API
│   └── containers/
│       ├── Dockerfile.c              # GCC compiler image
│       └── Dockerfile.java           # JDK image
│
├── assets/
│   ├── css/
│   │   ├── main.css                  # CSS variables, reset, layout, animations
│   │   ├── components.css            # Navbar, cards, modals, buttons, badges
│   │   ├── editor.css                # Code editor & terminal panel
│   │   ├── themes.css                # Theme gallery, switcher, transitions
│   │   └── campus.css                # My Campus portal styles
│   ├── images/
│   │   ├── joshitha.png              # Student profile photo
│   │   ├── mbu-logo.png              # Mohan Babu University logo
│   │   └── avatar-placeholder.svg   # Fallback avatar
│   └── pdfs/
│       ├── module-1-introduction-to-data-science.pdf
│       ├── module-2-data-extraction.pdf
│       ├── module-3-study-guide.pdf
│       ├── module-4-study-guide.pdf
│       └── module-5-study-guide.pdf
│
└── js/
    ├── app.js                        # SPA router & event orchestrator
    ├── pyodideRunner.js              # Pyodide WebAssembly Python engine
    ├── pyodideWorker.js              # Web Worker for Python execution
    │
    ├── data/
    │   ├── initialData.js            # Seed: modules, experiments, tools, profile
    │   ├── storage.js                # localStorage CRUD & progress calculator
    │   ├── resources.js              # Curated learning resources
    │   ├── themes.js                 # Theme definitions & CSS variable applier
    │   └── campusData.js             # Campus portal demo data & storage helpers
    │
    ├── components/
    │   ├── navbar.js                 # Navigation + theme dropdown
    │   ├── profileCard.js            # Student ID card, profile & resume modals
    │   ├── moduleCard.js             # Module card + detail modal + PDF viewer
    │   ├── experimentCard.js         # Experiment flip card
    │   ├── codeEditor.js             # Multi-language editor + runner
    │   ├── codeExecution.js          # Sandbox execution helpers
    │   ├── codeExecutionWorker.js    # Web Worker execution wrapper
    │   ├── globalSearch.js           # Site-wide search overlay
    │   ├── forms.js                  # Add/Edit modals for modules & experiments
    │   └── toast.js                  # Toast notification system
    │
    └── pages/
        ├── homePage.js               # Home view
        ├── modulesPage.js            # Modules list, search, filters
        ├── experimentsPage.js        # Experiments list, search, filters
        ├── experimentDetailPage.js   # Full experiment view + code editor
        ├── toolsPage.js              # DS tools directory
        ├── resourcesPage.js          # Learning resources
        ├── projectsPage.js           # Project showcase
        ├── themesPage.js             # Theme gallery + preview modal
        └── campusPage.js             # My Campus student portal dashboard
```

---

## 🛠️ Customisation

### Replace Profile Photo
Click the avatar on the home page ID card → enter image path or URL → click **Update**.

### Add Your Own Modules or Experiments
Use the `+ ADD MODULE` / `+ ADD EXPERIMENT` buttons on those pages — forms save to `localStorage` instantly.

### Change Theme
Click the emoji button in the navbar (quick switch) or visit `#themes` for the full gallery with live previews.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vanilla JavaScript (ES Modules, no build step) |
| Routing | Hash-based SPA (`window.location.hash`) |
| Persistence | `localStorage` (versioned keys) |
| Python Runtime | Pyodide WebAssembly |
| SQL Runtime | sql.js (browser SQLite) |
| Syntax Highlighting | highlight.js |
| Code Execution (C/C++/Java) | Docker + Node.js local microservice |
| Deployment | Vercel (static, zero config) |
| Styling | Pure CSS with custom properties (no framework) |

---

## 📜 License

This project is an academic mini-project developed for educational purposes.  
© 2024–2028 Joshitha Upati · Department of Data Science · Mohan Babu University
