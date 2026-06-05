import neutral from '../../../avatar/neutral.png';
import happy from '../../../avatar/happy.png';
import serious from '../../../avatar/serious.png';
import educational from '../../../avatar/educational.png';

/** Axel calm — always shown on the map / home hub */
export const AXEL_HOME_AVATAR_KEY = 'neutral';

export const AVATAR_OPTIONS = [
  { key: 'neutral', label: 'Calm', src: neutral },
  { key: 'happy', label: 'Happy', src: happy },
  { key: 'serious', label: 'Focused', src: serious },
  { key: 'educational', label: 'Ready', src: educational },
];

export function getAvatarSrc(key) {
  const found = AVATAR_OPTIONS.find((a) => a.key === key);
  return found?.src ?? neutral;
}
