import { ListenButton } from './ListenButton.jsx';

export function LessonIntroCard({ intro, onContinue }) {
  if (!intro) return null;

  return (
    <div className="lesson-intro card">
      <p className="lesson-intro-label">Axel explains</p>
      {intro.sceneEmoji && (
        <span className="lesson-intro-emoji" aria-hidden>
          {intro.sceneEmoji}
        </span>
      )}
      <p className="lesson-intro-idea">{intro.bigIdea}</p>
      <ListenButton text={intro.bigIdea} />
      <button type="button" className="btn btn-primary lesson-intro-btn" onClick={onContinue}>
        {intro.confirmLabel ?? "Let's try →"}
      </button>
    </div>
  );
}
