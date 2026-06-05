import { logEvent } from './db.js';

let sessionId = null;

export function startSession() {
  sessionId = `s-${Date.now()}`;
  return logEvent('session_start', { sessionId });
}

export function trackLessonStart(lessonId) {
  return logEvent('lesson_start', { lessonId, sessionId });
}

export function trackLessonComplete(lessonId, meta = {}) {
  return logEvent('lesson_complete', { lessonId, sessionId, ...meta });
}

export function trackStageComplete(lessonId, stage) {
  return logEvent('stage_complete', { lessonId, stage, sessionId });
}

export function trackAnswer(lessonId, stage, correct) {
  return logEvent('answer', { lessonId, stage, correct, sessionId });
}

export function trackLessonReplay(lessonId) {
  return logEvent('lesson_replay', { lessonId, sessionId });
}

export function trackFeedback(text, meta = {}) {
  return logEvent('prototype_feedback', {
    sessionId,
    text,
    ...meta,
  });
}
