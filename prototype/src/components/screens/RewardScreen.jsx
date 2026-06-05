export function RewardScreen({ lesson, onHome, onNextLesson, nextLessonTitle }) {
  const reward = lesson.villageReward;

  return (
    <div className="screen reward-screen">
      <div className="reward-hero">
        <div className="reward-emoji">🎉</div>
        <h1>Lesson complete!</h1>
        <p className="subtitle">{lesson.title} — well done!</p>
      </div>

      <div className="score-row">
        <div className="score-box">
          <div className="score-val">3/3</div>
          <div className="score-lbl">Stages done</div>
        </div>
        <div className="score-box score-box-stars">
          <div className="score-val reward-stars">⭐⭐⭐</div>
          <div className="score-lbl">Stars earned</div>
        </div>
      </div>

      <div className="unlock-card">
        <p className="unlock-card-label">Village unlocked</p>
        {reward?.icon && (
          <div className="reward-building-icon" aria-hidden>
            {reward.icon}
          </div>
        )}
        <p className="unlock-card-title">{reward?.label ?? 'New place'}</p>
      </div>

      {onNextLesson && nextLessonTitle && (
        <button type="button" className="btn btn-primary" onClick={onNextLesson}>
          Next: {nextLessonTitle} →
        </button>
      )}
      <button type="button" className="btn btn-primary" onClick={onHome}>
        Back to map →
      </button>
    </div>
  );
}
