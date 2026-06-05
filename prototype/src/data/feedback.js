import { trackFeedback } from '../lib/analytics.js';

export const FEEDBACK_EMAIL = 'carlien@katharosops.com';

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(FEEDBACK_EMAIL)}`;

/** Optional Google Form link — set VITE_FEEDBACK_URL in .env */
export const FEEDBACK_FORM_URL = (import.meta.env.VITE_FEEDBACK_URL ?? '').trim();

export function hasExternalFeedbackForm() {
  return FEEDBACK_FORM_URL.length > 0;
}

export function openExternalFeedbackForm() {
  if (!hasExternalFeedbackForm()) return false;
  window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer');
  return true;
}

export function buildFeedbackMailto({ text, nickname, grade }) {
  const subject = encodeURIComponent('AXEL prototype feedback');
  const body = encodeURIComponent(
    `${text}\n\n---\nLearner: ${nickname ?? 'anonymous'}\nGrade: ${grade ?? '2'}\nPage: ${typeof window !== 'undefined' ? window.location.href : 'prototype'}`,
  );
  return `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Save locally, then email via FormSubmit. Falls back to mailto if offline or blocked.
 * @returns {'email' | 'mailto'}
 */
export async function sendFeedback({ text, nickname, grade }) {
  await trackFeedback(text, { nickname, grade });

  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        message: text,
        _subject: 'AXEL prototype feedback',
        nickname: nickname ?? 'anonymous',
        grade: grade ?? 2,
        _template: 'table',
        _captcha: 'false',
      }),
    });
    if (res.ok) return 'email';
  } catch {
    /* network blocked or offline — use mailto */
  }

  window.location.href = buildFeedbackMailto({ text, nickname, grade });
  return 'mailto';
}
