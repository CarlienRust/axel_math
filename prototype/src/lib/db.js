const DB_NAME = 'axel-pilot';
const DB_VERSION = 1;
const STORE_PROFILE = 'profile';
const STORE_PROGRESS = 'progress';
const STORE_EVENTS = 'events';
const LS_KEY = 'axel-pilot-fallback';
const MAX_EVENTS = 500;
const TRIM_EVENTS_TO = 200;

function isQuotaError(err) {
  return (
    err?.name === 'QuotaExceededError' ||
    err?.code === 22 ||
    err?.code === 1014
  );
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('indexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_PROFILE)) {
        db.createObjectStore(STORE_PROFILE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
        db.createObjectStore(STORE_PROGRESS, { keyPath: 'lessonId' });
      }
      if (!db.objectStoreNames.contains(STORE_EVENTS)) {
        const events = db.createObjectStore(STORE_EVENTS, { keyPath: 'id', autoIncrement: true });
        events.createIndex('ts', 'ts', { unique: false });
      }
    };
  });
}

function readFallback() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { profile: null, progress: {}, events: [] };
  } catch {
    return { profile: null, progress: {}, events: [] };
  }
}

function writeFallback(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

let useFallback = false;

async function trimEventsStore(db) {
  const all = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_EVENTS, 'readonly');
    const req = tx.objectStore(STORE_EVENTS).getAll();
    req.onsuccess = () => resolve(req.result ?? []);
    req.onerror = () => reject(req.error);
  });

  if (all.length <= TRIM_EVENTS_TO) return all.length;

  const sorted = [...all].sort((a, b) => (a.ts ?? 0) - (b.ts ?? 0));
  const toRemove = sorted.slice(0, sorted.length - TRIM_EVENTS_TO);

  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_EVENTS, 'readwrite');
    const store = tx.objectStore(STORE_EVENTS);
    toRemove.forEach((ev) => store.delete(ev.id));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  return toRemove.length;
}

async function trimEventsFallback() {
  const data = readFallback();
  if (data.events.length <= TRIM_EVENTS_TO) return;
  data.events = data.events
    .sort((a, b) => (a.ts ?? 0) - (b.ts ?? 0))
    .slice(-TRIM_EVENTS_TO);
  writeFallback(data);
}

async function runWithQuotaRecovery(operation) {
  try {
    return await operation();
  } catch (err) {
    if (!isQuotaError(err)) throw err;
    if (useFallback) {
      trimEventsFallback();
      return await operation();
    }
    const db = await openDb();
    await trimEventsStore(db);
    return await operation();
  }
}

function progressRecordsToMap(records) {
  const map = {};
  (records ?? []).forEach((p) => {
    map[p.lessonId] = p;
  });
  return map;
}

async function readAllProgressStrict() {
  if (useFallback) return readFallback().progress ?? {};
  const db = await openDb();
  const records = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PROGRESS, 'readonly');
    const req = tx.objectStore(STORE_PROGRESS).getAll();
    req.onsuccess = () => resolve(req.result ?? []);
    req.onerror = () => reject(req.error);
  });
  return progressRecordsToMap(records);
}

/** Load profile + progress; sets progressLoadFailed if progress read fails after profile ok */
export async function loadAppData() {
  let profile = null;
  let progress = {};
  let progressLoadFailed = false;

  try {
    profile = await getProfile();
  } catch {
    profile = null;
  }

  try {
    progress = await readAllProgressStrict();
  } catch {
    progressLoadFailed = Boolean(profile);
    progress = {};
  }

  return { profile, progress, progressLoadFailed };
}

export async function getProfile() {
  if (useFallback) return readFallback().profile;
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROFILE, 'readonly');
      const req = tx.objectStore(STORE_PROFILE).get('main');
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    useFallback = true;
    return readFallback().profile;
  }
}

export async function saveProfile(profile) {
  const record = { id: 'main', ...profile, updatedAt: Date.now() };

  const write = async () => {
    if (useFallback) {
      const data = readFallback();
      data.profile = record;
      writeFallback(data);
      return record;
    }
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROFILE, 'readwrite');
      const req = tx.objectStore(STORE_PROFILE).put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  };

  try {
    return await runWithQuotaRecovery(write);
  } catch {
    useFallback = true;
    const data = readFallback();
    data.profile = record;
    writeFallback(data);
    return record;
  }
}

export async function clearProfile() {
  if (useFallback) {
    writeFallback({ profile: null, progress: {}, events: [] });
    return;
  }
  try {
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PROFILE, STORE_PROGRESS, STORE_EVENTS], 'readwrite');
      tx.objectStore(STORE_PROFILE).clear();
      tx.objectStore(STORE_PROGRESS).clear();
      tx.objectStore(STORE_EVENTS).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    useFallback = true;
    writeFallback({ profile: null, progress: {}, events: [] });
  }
}

export async function getProgress(lessonId) {
  const all = await getAllProgress();
  return all[lessonId] ?? null;
}

export async function getAllProgress() {
  if (useFallback) return readFallback().progress ?? {};
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROGRESS, 'readonly');
      const req = tx.objectStore(STORE_PROGRESS).getAll();
      req.onsuccess = () => resolve(progressRecordsToMap(req.result));
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    useFallback = true;
    return readFallback().progress ?? {};
  }
}

function mergeProgressRecord(existing, patch, lessonId) {
  const record = {
    ...existing,
    ...patch,
    lessonId,
    lastPlayedAt: Date.now(),
  };
  if (patch.checkpoint === null) {
    delete record.checkpoint;
  }
  if (patch.completed === true) {
    delete record.checkpoint;
  }
  return record;
}

export async function saveProgress(lessonId, patch) {
  const existing = (await getProgress(lessonId)) ?? { lessonId, completed: false, stars: 0 };
  const record = mergeProgressRecord(existing, patch, lessonId);

  const write = async () => {
    if (useFallback) {
      const data = readFallback();
      data.progress[lessonId] = record;
      writeFallback(data);
      return record;
    }
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_PROGRESS, 'readwrite');
      const req = tx.objectStore(STORE_PROGRESS).put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = () => reject(req.error);
    });
  };

  try {
    return await runWithQuotaRecovery(write);
  } catch {
    useFallback = true;
    const data = readFallback();
    data.progress[lessonId] = record;
    writeFallback(data);
    return record;
  }
}

export async function clearLessonCheckpoint(lessonId) {
  return saveProgress(lessonId, { checkpoint: null });
}

export async function logEvent(type, meta = {}) {
  const event = { type, ts: Date.now(), ...meta };

  const write = async () => {
    if (useFallback) {
      const data = readFallback();
      data.events.push(event);
      if (data.events.length > MAX_EVENTS) {
        data.events = data.events.slice(-TRIM_EVENTS_TO);
      }
      writeFallback(data);
      return event;
    }
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_EVENTS, 'readwrite');
      const req = tx.objectStore(STORE_EVENTS).add(event);
      req.onsuccess = () => resolve({ ...event, id: req.result });
      req.onerror = () => reject(req.error);
    });
  };

  try {
    return await runWithQuotaRecovery(write);
  } catch {
    useFallback = true;
    const data = readFallback();
    data.events.push(event);
    writeFallback(data);
    return event;
  }
}

export async function getAllEvents() {
  if (useFallback) return readFallback().events ?? [];
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_EVENTS, 'readonly');
      const req = tx.objectStore(STORE_EVENTS).getAll();
      req.onsuccess = () => resolve(req.result ?? []);
      req.onerror = () => reject(req.error);
    });
  } catch {
    useFallback = true;
    return readFallback().events ?? [];
  }
}

if (typeof window !== 'undefined') {
  window.__axelExportEvents = async () => {
    const [events, progress, profile] = await Promise.all([
      getAllEvents(),
      getAllProgress(),
      getProfile(),
    ]);
    return { profile, progress, events };
  };
}
