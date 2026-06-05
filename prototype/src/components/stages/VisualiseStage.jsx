import { ListenButton } from '../ListenButton.jsx';
import { ProgressBar } from '../ProgressBar.jsx';

export function VisualiseStage({ lesson, progressPercent, onNext }) {
  const v = lesson.visualise;

  return (
    <div className="lesson-stage visualise-stage">
      <ProgressBar percent={progressPercent} />
      <h1>{v.title ?? 'Picture it'}</h1>
      {v.sceneEmoji && (
        <div className="visualise-scene card" aria-hidden>
          <span className="visualise-scene-emoji">{v.sceneEmoji}</span>
          {v.sceneVisual && <p className="visualise-scene-visual">{v.sceneVisual}</p>}
        </div>
      )}
      {!v.sceneEmoji && v.sceneVisual && (
        <p className="visualise-scene-visual card visualise-scene">{v.sceneVisual}</p>
      )}
      <p className="visualise-prompt">{v.prompt}</p>
      <ListenButton text={v.prompt} />
      <button type="button" className="btn btn-primary visualise-ready-btn" onClick={onNext}>
        {v.confirmLabel ?? 'I pictured it →'}
      </button>
    </div>
  );
}
