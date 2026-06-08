import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['compare-order-to-99'];

export const compareOrderTo99 = {
  id: 'compare-order-to-99',
  title: 'Compare and order',
  description: 'Order drink prices on the spaza porch.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'spaza',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Compare prices with < or > to see which is bigger.',
    explanation:
      'The small open side points to the smaller number. The wide open side points to the bigger number. So 45 < 67 means R45 costs less than R67.',
    example: {
      type: 'compare',
      left: 45,
      right: 67,
      leftLabel: 'R45',
      rightLabel: 'R67',
      symbol: '<',
      caption: 'R45 is less than R67',
    },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap the porch drink prices from cheapest to priciest.',
    pictorial: 'Which price sign is correct?',
    visualise: 'Close your eyes. See cold drink prices on the porch. Open when ready.',
    abstract: 'Pick the true sentence.',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture drink prices on the spaza porch.',
    prompt: 'Close your eyes. See R23, R45, and R67 on the porch. Which is cheapest? Open when ready.',
    sceneEmoji: '🧃',
    sceneVisual: 'R23 · R45 · R67',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickOrder',
    title: 'Order the prices',
    subtitle: 'Tap R23, R45, and R67 from cheapest to priciest on the porch.',
    values: [45, 23, 67],
    order: 'asc',
    successLabel: 'Prices ordered!',
  },
  pictorial: {
    type: 'pickCompare',
    title: 'Compare',
    subtitle: 'Which is true for R45 and R67?',
    options: [
      { id: 'a', left: 45, symbol: '>', right: 67, correct: false },
      { id: 'b', left: 45, symbol: '<', right: 67, correct: true },
      { id: 'c', left: 45, symbol: '=', right: 67, correct: false },
    ],
    feedbackCorrect: 'Yes! R45 is less than R67.',
    feedbackWrong: 'Which price is bigger?',
  },
  abstract: {
    type: 'pickChoice',
    title: 'True or not?',
    subtitle: 'Pick the true sentence.',
    options: [
      { id: 'a', label: 'R23 > R67', correct: false },
      { id: 'b', label: 'R67 > R23', correct: true },
      { id: 'c', label: 'R23 = R67', correct: false },
    ],
    feedbackCorrect: 'Correct! R67 costs more.',
    feedbackWrong: 'Compare the tens.',
  },
  villageReward: { buildingId: 'spaza-porch', label: 'Spaza porch', icon: '🧃' },
};
