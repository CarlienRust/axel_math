export function ResumeLessonDialog({ lessonTitle, stageLabel, onContinue, onStartOver }) {
  return (
    <div className="replay-dialog-backdrop" role="presentation" onClick={onStartOver}>
      <div
        className="replay-dialog card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="resume-dialog-title">Continue this lesson?</h2>
        <p className="replay-dialog-text">
          You stopped part-way through <strong>{lessonTitle}</strong>
          {stageLabel ? ` at the ${stageLabel} stage` : ''}. Continue where you left off, or start
          over with a fresh try?
        </p>
        <div className="replay-dialog-actions">
          <button type="button" className="btn btn-ghost" onClick={onStartOver}>
            Start over
          </button>
          <button type="button" className="btn btn-primary" onClick={onContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
