// State persistence — localStorage with backup, save log, and event bus.

export const STORAGE_KEY = 'hyp_protocol_v1_state';
export const BACKUP_KEY = 'hyp_protocol_v1_backup';
export const SAVE_LOG_KEY = 'hyp_protocol_v1_log';

// Diagnostic log — last 20 events. Helps debug "data disappeared" reports.
export const logSaveEvent = (kind, detail = '') => {
  try {
    const log = JSON.parse(localStorage.getItem(SAVE_LOG_KEY) || '[]');
    log.push({ t: Date.now(), kind, detail });
    while (log.length > 20) log.shift();
    localStorage.setItem(SAVE_LOG_KEY, JSON.stringify(log));
  } catch (e) {}
};

// Validate that a parsed state object is structurally usable.
// CRITICAL: stats CAN be null (during Day 1 calibration). Don't reject on that.
export const isValidState = (s) => {
  if (!s || typeof s !== 'object') return false;
  if (!s.startDate) return false;
  if (!s.profile || typeof s.profile !== 'object') return false;
  if (!s.profile.name) return false;
  if (typeof s.daysData !== 'object') return false;
  // stats may legitimately be null during Day 1 calibration phase
  return true;
};

export const getInitialState = () => {
  // Try main key first
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (isValidState(parsed)) {
        logSaveEvent('load_main_ok');
        return parsed;
      }
      logSaveEvent('load_main_invalid', JSON.stringify(parsed).slice(0, 100));
    }
  } catch (e) {
    logSaveEvent('load_main_err', String(e).slice(0, 100));
  }
  // Fallback to backup
  try {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      const parsed = JSON.parse(backup);
      if (isValidState(parsed)) {
        logSaveEvent('load_backup_ok');
        return parsed;
      }
    }
  } catch (e) {
    logSaveEvent('load_backup_err', String(e).slice(0, 100));
  }
  logSaveEvent('load_none');
  return null;
};

// Module-level subscribers for save events. UI can subscribe to show toasts.
const saveListeners = new Set();
export const subscribeSaveEvents = (fn) => {
  saveListeners.add(fn);
  return () => saveListeners.delete(fn);
};
export const emitSaveEvent = (event) => {
  // Deferred to a microtask so subscribers' setState calls do not run
  // synchronously inside another component's render or updater function.
  // game.js called saveState() inside `setState(s => { saveState(...); ... })`
  // and got away with it because the original was not in StrictMode; under
  // React 18 + StrictMode this surfaces as a "Cannot update a component
  // while rendering a different component" warning. The microtask defers
  // emit until React has finished the current commit.
  queueMicrotask(() => {
    saveListeners.forEach(fn => { try { fn(event); } catch (e) {} });
  });
};

export const saveState = (state) => {
  if (!state) return false;
  const stateWithMeta = { ...state, _savedAt: Date.now() };
  let serialized;
  try {
    serialized = JSON.stringify(stateWithMeta);
  } catch (e) {
    logSaveEvent('serialize_err', String(e).slice(0, 100));
    emitSaveEvent({ ok: false, reason: 'serialize', error: e });
    return false;
  }

  // Estimate size in MB
  const sizeMB = (serialized.length / 1024 / 1024).toFixed(2);

  // Backup write — keep a second copy as safety net
  try {
    const previous = localStorage.getItem(STORAGE_KEY);
    if (previous) localStorage.setItem(BACKUP_KEY, previous);
  } catch (e) {
    // backup is best-effort
  }

  // Main write
  try {
    localStorage.setItem(STORAGE_KEY, serialized);
    logSaveEvent('save_ok', `${sizeMB}MB`);
    emitSaveEvent({ ok: true, size: serialized.length, savedAt: stateWithMeta._savedAt });
    return true;
  } catch (e) {
    // Quota exceeded is the most common cause — try cleanup
    const isQuota = e.name === 'QuotaExceededError' ||
                    String(e).includes('quota') || String(e).includes('Quota');
    logSaveEvent('save_err', `${isQuota ? 'QUOTA' : 'OTHER'}: ${String(e).slice(0, 80)}`);
    emitSaveEvent({ ok: false, reason: isQuota ? 'quota' : 'unknown', error: e, size: serialized.length });
    return false;
  }
};

export const computeCurrentDay = (startDateISO) => {
  const start = new Date(startDateISO);
  const now = new Date();
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((nowDay - startDay) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(84, diffDays + 1));
};

// Format save timestamp for toast: "14:23"
export const formatSaveTime = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
