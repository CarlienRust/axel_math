import { AXEL_HOME_AVATAR_KEY, getAvatarSrc } from '../../data/avatars.js';
import { GradePicker } from '../GradePicker.jsx';

export function OnboardingNickname({ value, onChange, selectedGrade, onGradeChange, onNext }) {
  const mascotSrc = getAvatarSrc(AXEL_HOME_AVATAR_KEY);
  const trimmed = value.trim();
  const valid = trimmed.length >= 2 && trimmed.length <= 12;

  return (
    <div className="screen onboarding-screen">
      <div className="onboarding-hero">
        <img src={mascotSrc} alt="" className="onboarding-mascot" />
        <h1>Welcome to AXEL</h1>
        <p className="subtitle">
          Hi friend! Axel will help you practise maths — even when the internet is off.
        </p>
      </div>
      <div className="card">
        <label htmlFor="nickname" className="input-label">
          What should we call you?
        </label>
        <input
          id="nickname"
          type="text"
          className="text-input"
          placeholder="Your nickname"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={12}
          autoComplete="off"
        />
        <p className="input-hint">No email or password needed.</p>
      </div>
      <div className="card">
        <p className="input-label">Your grade</p>
        <GradePicker selectedGrade={selectedGrade} onSelect={onGradeChange} />
      </div>
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-primary" disabled={!valid} onClick={() => onNext(trimmed)}>
        Next →
      </button>
    </div>
  );
}
