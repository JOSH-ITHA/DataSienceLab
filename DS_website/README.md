# DATA SCIENCE SUBJECT DIGITAL LIBRARY
### Interactive Academic Virtual Lab & Subject Repository
**College Mini Project**

Developed by: **Joshitha Upati**
Roll No: **24102A030127**  
Department: **Data Science (Section 2)**  
Subject: **Data Science**  
Faculty Supervisor: **Bosu Babu (Assistant Professor)**  

---

## 🌟 Project Overview

The **Data Science Subject Digital Library** is an educational web platform and interactive virtual laboratory designed according to faculty specifications. It transitions traditional coursework into a dynamic, browser-based digital platform with multi-language code editing and execution/preview, curriculum modules, experiment documentation, dynamic learning analytics, and tool references.

---

## 🚀 Key Features

1. **Academic Navigation & Clean Architecture**:
   - Header with title: `DATA SCIENCE SUBJECT DIGITAL LIBRARY`
   - Icon navigation items: `HOME`, `MODULES`, `EXPERIMENTS`, `TOOLS`, `RESOURCES`, `PROJECTS`
   - Active page highlight and responsive layout.
   - Global search across modules, experiments, tools, and resources, with `Ctrl+K` / `⌘K` shortcut.

2. **Home Page & Academic ID Card**:
   - **Left Column**: Student ID card with verified student details, mentor attribution, LinkedIn, GitHub, and "VIEW MORE" triggers.
   - **Right Column**: Hero welcome section, 4 dynamic statistical indicators, and real-time subject completion progress bar.

3. **Curriculum Modules & Progress**:
   - 5 comprehensive initial Data Science modules.
   - Live search by title, topic, and keyword.
   - Filter chips: *All*, *Not Started*, *In Progress*, *Completed*.
   - **`+ ADD MODULE`**: Interactive modal form to add new modules with objectives, topics, PDFs, and video links.
   - Large, responsive PDF reader with minimize, maximize/restore, open-in-new-tab, and module progress controls.

4. **Virtual Lab Experiments (10 Runnable Labs + Code Editor)**:
   - 10 pre-loaded Python experiments covering NumPy, Pandas, Matplotlib, Data Cleaning, Outlier IQR detection, EDA, Feature Scaling, Linear Regression, and KNN Classification.
   - **`+ ADD EXPERIMENT`**: Add custom experiments with aim, procedure, source code, and expected outputs.
   - Experiment cards automatically flip between their summary and procedure; hover or keyboard focus pauses them, and the experiment link is available on both sides.
   - **Interactive Code Editor**:
     - Python, C, C++, Java, JavaScript, SQL, HTML, and CSS syntax highlighting, line numbers, Tab indentation, and separately saved per-language drafts.
     - Python runs with Pyodide in a time-limited Web Worker; JavaScript and SQLite SQL execute in time-limited isolated Web Workers; HTML and CSS render in a sandboxed preview.
     - A standard-input panel feeds Python `input()` and JavaScript `prompt()`.
     - C, C++, and Java execute through a local Docker runner with no network, read-only source mounts, non-root containers, CPU/memory/process limits, timeouts, and bounded output.
     - `RUN`, `CLEAR CODE`, `CLEAR OUTPUT`, `COPY`, and `RESET CODE` controls.
     - Dark-themed output console with categorized errors, execution status, and preview support. Unsupported or unavailable runtimes are reported instead of returning simulated success.
     - `MARK AS COMPLETED` toggle with dynamic progress synchronization.

5. **Data Science Tools Directory**:
   - Curated cards for Python, Jupyter Notebook, Google Colab, NumPy, Pandas, Matplotlib, Scikit-learn, and Seaborn.
   - Quick search and direct links to official documentation and platform launch sites.

6. **Learning Resources**:
   - Curated links to Python learning materials, machine-learning courses, and open datasets.

7. **Projects Showcase**:
   - A dedicated page ready for the student's projects to be added.

8. **Student Profile & Resume Viewer**:
   - Interactive Profile Modal with replaceable photo path.
   - Professional resume with technical skills, projects, education, AWS credential, and communication strengths.
   - Print-ready resume preview and downloadable self-contained HTML resume that can be saved as PDF.

---

## 💻 Running the Project Locally

You can run this project using any local web server or directly open it:

### Option 1: Using Node / npx (Recommended)
```bash
# In the project directory:
npx serve . -l 3000
```
Then open `http://localhost:3000` in your browser.

### Run C, C++, and Java experiments

These compiled languages require Docker Desktop with its daemon running. From the project directory, build the isolated compiler images:

```powershell
docker build -f execution-service/containers/Dockerfile.c -t ds-library-c-runner:1 execution-service/containers
docker build -f execution-service/containers/Dockerfile.java -t ds-library-java-runner:1 execution-service/containers
```

In a second terminal, start the local execution service:

```powershell
npm run execution-service
```

The website connects to `http://localhost:3001/api/execute` when opened from localhost. If Docker or the runner service is unavailable, the Output Console reports that explicitly and does not claim the code ran. The service binds to `127.0.0.1` by default and does not send source code to a third party. Do not expose this service to a public network; its Docker controls reduce risk but are not a substitute for a dedicated VM or stronger sandbox for hostile workloads.

### Option 2: Using Python HTTP Server
```bash
python -m http.server 3000
```
Then open `http://localhost:3000`.

### Option 3: Using VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 📁 Project Structure

```
DS_website/
├── index.html                   # Single Page Application entry
├── package.json                 # Dev scripts
├── README.md                    # Project documentation
├── execution-service/
│   ├── server.js                # Local API for isolated compiled-language runs
│   └── containers/              # Compiler/runtime image definitions
├── assets/
│   ├── css/
│   │   ├── main.css             # Theme variables, reset, layout
│   │   ├── components.css       # ID card, navbar, modal, forms, badges
│   │   └── editor.css           # Code editor, terminal styling
│   ├── images/
│   │   └── avatar-placeholder.svg # Student avatar asset
│   └── pdfs/
│       ├── module-1-introduction-to-data-science.pdf
│       ├── module-2-data-extraction.pdf
│       ├── module-3-study-guide.pdf
│       ├── module-4-study-guide.pdf
│       └── module-5-study-guide.pdf
└── js/
    ├── app.js                   # Application router & orchestrator
    ├── pyodideRunner.js         # WebAssembly Python runtime engine
    ├── data/
    │   ├── initialData.js       # Seed data: modules, experiments, tools, profile
    │   └── storage.js           # LocalStorage CRUD & dynamic progress manager
    ├── components/
    │   ├── globalSearch.js      # Site-wide content search
    │   ├── navbar.js            # Main navigation
    │   ├── profileCard.js       # Student ID card & resume modals
    │   ├── moduleCard.js        # Module card & detail viewer
    │   ├── experimentCard.js    # Experiment card
    │   ├── codeEditor.js        # Code editor & terminal runner
    │   ├── forms.js             # Add/Edit/Delete modals
    │   └── toast.js             # Toast notification alerts
    └── pages/
        ├── homePage.js          # Home view
        ├── modulesPage.js       # Modules list & filters
        ├── experimentsPage.js   # Experiments list & filters
        ├── experimentDetailPage.js # Full experiment view & editor
        ├── toolsPage.js         # Tools catalog & search
        ├── resourcesPage.js     # Curated learning and dataset links
        └── projectsPage.js      # Student projects showcase placeholder
```

---

## 🛠️ Replacing Profile Photo & Customizing Resume

- **Replace Photo**: Click on the profile photo in the ID card or header, enter your image path (e.g. `assets/images/my-photo.jpg`), and click **Update**.
- **Resume**: Click **VIEW MORE** on the student ID card to preview or download your academic resume.
