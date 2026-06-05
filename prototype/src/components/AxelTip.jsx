import educational from '../../../avatar/educational.png';
import happy from '../../../avatar/happy.png';

const MOOD_SRC = {
  guide: educational,
  happy,
};

export function AxelTip({ text, mood = 'guide' }) {
  if (!text) return null;
  const src = MOOD_SRC[mood] ?? educational;

  return (
    <div className={`axel-tip ${mood === 'happy' ? 'axel-tip-happy' : ''}`} role="note">
      <img src={src} alt="" className="axel-tip-avatar" />
      <p className="axel-tip-text">{text}</p>
    </div>
  );
}
