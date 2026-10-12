/**
 * DATA STORAGE MANAGER
 * Manages localStorage persistence with automatic fallback to initial seeds,
 * providing clean CRUD APIs for Modules, Experiments, Student Profile, and Code snippets.
 */

import { studentData, initialModules, initialExperiments } from './initialData.js';

const STORAGE_KEYS = {
  STUDENT: 'ds_library_student_v3',      // bumped to v3 → forces re-seed with updated name
  MODULES: 'ds_library_modules_v2',      // bumped to v2 → forces re-seed with topicDetails
  EXPERIMENTS: 'ds_library_experiments_v1',
  CODE_DRAFTS: 'ds_library_code_drafts_v1'
};

export const Storage = {
  // Initialize storage if not already populated
  init() {
    if (typeof localStorage === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.STUDENT)) {
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(studentData));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MODULES)) {
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(initialModules));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXPERIMENTS)) {
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(initialExperiments));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CODE_DRAFTS)) {
      localStorage.setItem(STORAGE_KEYS.CODE_DRAFTS, JSON.stringify({}));
    }
  },

  // ---------------- STUDENT DATA ----------------
  getStudent() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT);
      return data ? JSON.parse(data) : studentData;
    } catch (e) {
      console.error("Error reading student data:", e);
      return studentData;
    }
  },

  saveStudent(updatedStudent) {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(updatedStudent));
  },

  // ---------------- MODULES CRUD ----------------
  getModules() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MODULES);
      const modules = data ? JSON.parse(data) : initialModules;
      return modules.sort((a, b) => Number(a.moduleNumber) - Number(b.moduleNumber));
    } catch (e) {
      console.error("Error reading modules:", e);
      return initialModules;
    }
  },

  getModuleById(id) {
    const modules = this.getModules();
    return modules.find(m => String(m.id) === String(id)) || null;
  },

  addModule(moduleData) {
    const modules = this.getModules();
    const newModule = {
      ...moduleData,
      id: moduleData.id || `mod-${Date.now()}`,
      moduleNumber: Number(moduleData.moduleNumber) || (modules.length + 1),
      progress: moduleData.progress || 'not_started',
      completed: Boolean(moduleData.completed || moduleData.progress === 'completed')
    };
    modules.push(newModule);
    localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules));
    return newModule;
  },

  updateModule(id, updatedFields) {
    const modules = this.getModules();
    const index = modules.findIndex(m => String(m.id) === String(id));
    if (index !== -1) {
      modules[index] = { ...modules[index], ...updatedFields };
      if (updatedFields.progress) {
        modules[index].completed = updatedFields.progress === 'completed';
      }
      localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules));
      return modules[index];
    }
    return null;
  },

  deleteModule(id) {
    let modules = this.getModules();
    modules = modules.filter(m => String(m.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules));
    return true;
  },

  setModuleProgress(id, progressState) {
    // progressState: 'not_started' | 'in_progress' | 'completed'
    return this.updateModule(id, {
      progress: progressState,
      completed: progressState === 'completed'
    });
  },

  // ---------------- EXPERIMENTS CRUD ----------------
  getExperiments() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPERIMENTS);
      const exps = data ? JSON.parse(data) : initialExperiments;
      return exps.sort((a, b) => Number(a.experimentNumber) - Number(b.experimentNumber));
    } catch (e) {
      console.error("Error reading experiments:", e);
      return initialExperiments;
    }
  },

  getExperimentById(id) {
    const exps = this.getExperiments();
    return exps.find(e => String(e.id) === String(id)) || null;
  },

  addExperiment(expData) {
    const exps = this.getExperiments();
    const newExp = {
      ...expData,
      id: expData.id || `exp-${Date.now()}`,
      experimentNumber: Number(expData.experimentNumber) || (exps.length + 1),
      language: expData.language || "Python",
      completed: Boolean(expData.completed)
    };
    exps.push(newExp);
    localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(exps));
    return newExp;
  },

  updateExperiment(id, updatedFields) {
    const exps = this.getExperiments();
    const index = exps.findIndex(e => String(e.id) === String(id));
    if (index !== -1) {
      exps[index] = { ...exps[index], ...updatedFields };
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(exps));
      return exps[index];
    }
    return null;
  },

  deleteExperiment(id) {
    let exps = this.getExperiments();
    exps = exps.filter(e => String(e.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(exps));
    return true;
  },

  toggleExperimentCompletion(id) {
    const exp = this.getExperimentById(id);
    if (exp) {
      const newStatus = !exp.completed;
      this.updateExperiment(id, { completed: newStatus });
      return newStatus;
    }
    return false;
  },

  // ---------------- CODE DRAFTS ----------------
  getSavedCode(expId, fallbackDefaultCode = "") {
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.CODE_DRAFTS) || "{}");
      return drafts[expId] !== undefined ? drafts[expId] : fallbackDefaultCode;
    } catch (e) {
      return fallbackDefaultCode;
    }
  },

  saveCode(expId, code) {
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.CODE_DRAFTS) || "{}");
      drafts[expId] = code;
      localStorage.setItem(STORAGE_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
    } catch (e) {
      console.error("Error saving code draft:", e);
    }
  },

  resetCodeDraft(expId) {
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.CODE_DRAFTS) || "{}");
      delete drafts[expId];
      localStorage.setItem(STORAGE_KEYS.CODE_DRAFTS, JSON.stringify(drafts));
    } catch (e) {
      console.error("Error resetting code:", e);
    }
  },

  // ---------------- DYNAMIC PROGRESS COMPUTATION ----------------
  calculateOverallProgress() {
    const modules = this.getModules();
    const experiments = this.getExperiments();

    const totalModules = modules.length || 1;
    const modulesCompleted = modules.filter(m => m.progress === 'completed' || m.completed).length;

    const totalExperiments = experiments.length || 1;
    const experimentsCompleted = experiments.filter(e => e.completed).length;

    // Weight: 40% Modules, 60% Lab Experiments
    const moduleRatio = modulesCompleted / totalModules;
    const expRatio = experimentsCompleted / totalExperiments;
    const overallPercentage = Math.round((moduleRatio * 40) + (expRatio * 60));

    return {
      totalModules,
      modulesCompleted,
      totalExperiments,
      experimentsCompleted,
      overallPercentage: Math.min(100, Math.max(0, overallPercentage))
    };
  },

  // ---------------- RESET TO DEFAULTS ----------------
  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.STUDENT);
    localStorage.removeItem(STORAGE_KEYS.MODULES);
    localStorage.removeItem(STORAGE_KEYS.EXPERIMENTS);
    localStorage.removeItem(STORAGE_KEYS.CODE_DRAFTS);
    this.init();
  }
};

// Auto initialize on module import
Storage.init();
