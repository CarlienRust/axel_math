import { useState } from 'react';
import { hasExternalFeedbackForm, openExternalFeedbackForm } from '../data/feedback.js';
import { trackFeedback } from '../lib/analytics.js';

export function FeedbackDialog({ open, onClose, profile }) {
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) {
      setError('Please write a short note before sending.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await trackFeedback(text, {
        nickname: profile?.nickname,
        grade: profile?.grade,
      });
      setSaved(true);
      setMessage('');
    } catch {
      setError('Could not save feedback. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setSaved(false);
    setError(null);
    setMessage('');
    onClose();
  };

  const handleOpenForm = () => {
    openExternalFeedbackForm();
  };

  return (
    <div className="feedback-overlay" role="presentation" onClick={handleClose}>
      <div
        className="feedback-dialog card"
        role="dialog"
        aria-labelledby="feedback-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {saved ? (
          <>
            <h2 id="feedback-title" className="feedback-title">
              Thank you!
            </h2>
            <p className="feedback-body">
              Your note is saved on this device. The AXEL team can review it from field-test
              sessions to improve the real product.
            </p>
            {hasExternalFeedbackForm() && (
              <p className="feedback-hint">
                Want to say more?{' '}
                <button type="button" className="feedback-link-btn" onClick={handleOpenForm}>
                  Open the full survey →
                </button>
              </p>
            )}
            <button type="button" className="btn btn-primary feedback-close-btn" onClick={handleClose}>
              Done
            </button>
          </>
        ) : (
          <>
            <h2 id="feedback-title" className="feedback-title">
              Help us improve AXEL
            </h2>
            <p className="feedback-body">
              You are using an early prototype. Tell us what worked, what confused you, or what
              you would change — it helps us build the real app.
            </p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="feedback-message" className="input-label">
                Your feedback
              </label>
              <textarea
                id="feedback-message"
                className="feedback-textarea text-input"
                rows={4}
                maxLength={2000}
                placeholder="e.g. Level 4 was confusing… / Axel’s tips helped…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={saving}
              />
              {error && (
                <p className="feedback-error" role="alert">
                  {error}
                </p>
              )}
              <div className="feedback-actions">
                <button type="button" className="btn btn-ghost" onClick={handleClose} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Sending…' : 'Send feedback'}
                </button>
              </div>
            </form>
            {hasExternalFeedbackForm() && (
              <p className="feedback-hint">
                Or{' '}
                <button type="button" className="feedback-link-btn" onClick={handleOpenForm}>
                  open our feedback survey →
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
