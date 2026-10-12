# DATA SCIENCE SUBJECT DIGITAL LIBRARY
### Interactive Academic Virtual Lab & Subject Repository
**College Mini Project**

Developed by: **Upati Joshitha**  
Roll No: **24102A030127**  
Department: **Data Science (Section 2)**  
Subject: **Data Science**  
Faculty Supervisor: **Bosu Babu (Assistant Professor)**  

---

## 🌟 Project Overview

The **Data Science Subject Digital Library** is an educational web platform and interactive virtual laboratory designed according to faculty specifications. It transitions traditional coursework into a dynamic, browser-based digital platform with live Python code execution, curriculum modules, experiment documentation, dynamic learning analytics, and tool references.

---

## 🚀 Key Features

1. **Academic Navigation & Clean Architecture**:
   - Header with title: `DATA SCIENCE SUBJECT DIGITAL LIBRARY`
   - Navigation items: `HOME`, `MODULES`, `EXPERIMENTS`, `TOOLS`
   - Active page highlight and responsive layout.

2. **Home Page & Academic ID Card**:
   - **Left Column**: Student ID card with verified student details, mentor attribution, LinkedIn, GitHub, and "VIEW MORE" triggers.
   - **Right Column**: Hero welcome section, 4 dynamic statistical indicators, and real-time subject completion progress bar.

3. **Curriculum Modules (Full CRUD & Progress)**:
   - 5 comprehensive initial Data Science modules.
   - Live search by title, topic, and keyword.
   - Filter chips: *All*, *Not Started*, *In Progress*, *Completed*.
   - **`+ ADD MODULE`**: Interactive modal form to add new modules with objectives, topics, PDFs, and video links.
   - Edit, Delete with confirmation, and status updates stored in `localStorage`.

4. **Virtual Lab Experiments (10 Runnable Labs + Code Editor)**:
   - 10 pre-loaded Python experiments covering NumPy, Pandas, Matplotlib, Data Cleaning, Outlier IQR detection, EDA, Feature Scaling, Linear Regression, and KNN Classification.
   - **`+ ADD EXPERIMENT`**: Add custom experiments with aim, procedure, source code, and expected outputs.
   - **Interactive Code Editor**:
     - Line numbers & Tab key indentation support.
     - `RUN ▶` with WebAssembly Pyodide engine for real in-browser Python 3 execution + safe sandboxed fallback.
     - `CLEAR`, `COPY`, and `RESET` buttons.
     - Dark-themed terminal output console with stdout/stderr capture and execution timing.
     - `MARK AS COMPLETED` toggle with dynamic progress synchronization.

5. **Data Science Tools Directory**:
   - Curated cards for Python, Jupyter Notebook, Google Colab, NumPy, Pandas, Matplotlib, Scikit-learn, and Seaborn.
   - Quick search and direct links to official documentation and platform launch sites.

6. **Student Profile & Resume Viewer**:
   - Interactive Profile Modal with replaceable photo path.
   - Comprehensive resume view with "VIEW RESUME" and "DOWNLOAD RESUME" functionality.

---

## 💻 Running the Project Locally

You can run this project using any local web server or directly open it:

### Option 1: Using Node / npx (Recommended)
```bash
# In the project directory:
npx serve . -l 3000
```
Then open `http://localhost:3000` in your browser.

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
├── assets/
│   ├── css/
│   │   ├── main.css             # Theme variables, reset, layout
│   │   ├── components.css       # ID card, navbar, modal, forms, badges
│   │   └── editor.css           # Code editor, terminal styling
│   └── images/
│       └── avatar-placeholder.svg # Student avatar asset
└── js/
    ├── app.js                   # Application router & orchestrator
    ├── pyodideRunner.js         # WebAssembly Python runtime engine
    ├── data/
    │   ├── initialData.js       # Seed data: modules, experiments, tools, profile
    │   └── storage.js           # LocalStorage CRUD & dynamic progress manager
    ├── components/
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
        └── toolsPage.js         # Tools catalog & search
```

---

## 🛠️ Replacing Profile Photo & Customizing Resume

- **Replace Photo**: Click on the profile photo in the ID card or header, enter your image path (e.g. `assets/images/my-photo.jpg`), and click **Update**.
- **Resume**: Click **VIEW MORE** on the student ID card to preview or download your academic resume.
