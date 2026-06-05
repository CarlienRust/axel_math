import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['money-coins-sa'];

export const moneyCoinsSa = {
  id: 'money-coins-sa',
  title: 'SA coins',
  description: 'Pay for a muffin at the cafe.',
  gradeBand: '2-3',
  capsTag: 'measurement',
  locale: 'en',
  setting: 'cafe',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Each coin is worth a different amount.',
    sceneEmoji: '☕',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap the two-rand coin to pay at the cafe.',
    pictorial: 'Which coin is worth more?',
    visualise: 'Close your eyes. See the coins on the cafe counter.',
    abstract: 'Which coin is R2?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture the coins on the cafe counter.',
    prompt: 'Close your eyes. See a muffin for R2 on the counter. Open when ready.',
    sceneEmoji: '☕',
    sceneVisual: 'R2',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickCoin',
    title: 'Find R2',
    subtitle: 'Axel buys a muffin for R2 at the cafe. Tap the right coin.',
    answer: 'r2',
    coins: [
      { id: '50c', emoji: '🪙', label: '50c' },
      { id: 'r1', emoji: '🪙', label: 'R1' },
      { id: 'r2', emoji: '🪙', label: 'R2' },
      { id: 'r5', emoji: '🪙', label: 'R5' },
    ],
    successLabel: 'R2 coin!',
  },
  pictorial: {
    type: 'pickCompare',
    title: 'Which is more?',
    subtitle: 'Compare R1 and R2 at the cafe till.',
    options: [
      { id: 'a', left: 'R1', symbol: '>', right: 'R2', correct: false },
      { id: 'b', left: 'R2', symbol: '>', right: 'R1', correct: true },
      { id: 'c', left: 'R1', symbol: '=', right: 'R2', correct: false },
    ],
    feedbackCorrect: 'Yes! R2 is more than R1.',
    feedbackWrong: 'Which coin is worth more?',
  },
  abstract: {
    type: 'pickChoice',
    title: 'Pay with…',
    subtitle: 'A muffin costs R2. Pick the coin.',
    options: [
      { id: 'a', label: '50c', correct: false },
      { id: 'b', label: 'R2', correct: true },
      { id: 'c', label: 'R5', correct: false },
    ],
    feedbackCorrect: 'Correct! Use R2.',
    feedbackWrong: 'Match the muffin price.',
  },
  villageReward: { buildingId: 'cafe', label: 'Cafe', icon: '☕' },
};
