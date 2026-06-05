/**
 * Prototype feedback — set VITE_FEEDBACK_URL in .env to a Google Form (or similar).
 * Example: VITE_FEEDBACK_URL=https://docs.google.com/forms/d/e/…/viewform
 */
export const FEEDBACK_FORM_URL = (import.meta.env.VITE_FEEDBACK_URL ?? '').trim();

export function hasExternalFeedbackForm() {
  return FEEDBACK_FORM_URL.length > 0;
}

export function openExternalFeedbackForm() {
  if (!hasExternalFeedbackForm()) return false;
  window.open(FEEDBACK_FORM_URL, '_blank', 'noopener,noreferrer');
  return true;
}
