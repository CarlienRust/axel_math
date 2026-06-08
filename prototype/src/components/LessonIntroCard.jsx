import { IntroExample } from './IntroExample.jsx';
import { ListenButton } from './ListenButton.jsx';

export function LessonIntroCard({ intro, onContinue }) {
  if (!intro) return null;

  const listenText = [intro.bigIdea, intro.explanation, intro.example?.caption]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="lesson-intro card">
      <p className="lesson-intro-label">Axel explains</p>
      {intro.example ? (
        <IntroExample example={intro.example} />
      ) : (
        intro.sceneEmoji && (
          <span className="lesson-intro-emoji" aria-hidden>
            {intro.sceneEmoji}
          </span>
        )
      )}
      <p className="lesson-intro-idea">{intro.bigIdea}</p>
      {intro.explanation && <p className="lesson-intro-detail">{intro.explanation}</p>}
      <ListenButton text={listenText} />
      <button type="button" className="btn btn-primary lesson-intro-btn" onClick={onContinue}>
        {intro.confirmLabel ?? "Let's try →"}
      </button>
    </div>
  );
}
