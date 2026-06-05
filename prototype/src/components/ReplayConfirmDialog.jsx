export function ReplayConfirmDialog({ placeName, lessonTitle, onConfirm, onCancel }) {
  return (
    <div className="replay-dialog-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="replay-dialog card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="replay-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="replay-dialog-title">Play this level again?</h2>
        <p className="replay-dialog-text">
          You finished <strong>{placeName}</strong>
          {lessonTitle && lessonTitle !== placeName ? ` (${lessonTitle})` : ''}. Practice again with{' '}
          <strong>new numbers</strong>?
        </p>
        <div className="replay-dialog-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Not now
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Yes, replay →
          </button>
        </div>
      </div>
    </div>
  );
}
