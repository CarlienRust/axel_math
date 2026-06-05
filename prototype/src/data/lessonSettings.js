/** Setting key → emoji for map lesson nodes */
export const LESSON_SETTING_ICONS = {
  spaza: '🏪',
  park: '🌳',
  market: '🛒',
  school: '🏫',
  taxi: '🚕',
  clinic: '🏥',
  hall: '🏛️',
  sports: '⚽',
  animals: '🐾',
  cafe: '☕',
};

export function getLessonSettingIcon(setting) {
  return LESSON_SETTING_ICONS[setting] ?? '📘';
}
