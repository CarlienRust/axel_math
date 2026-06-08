import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['addition-within-20'];

export const additionWithin20 = {
  id: 'addition-within-20',
  title: 'Addition within 20',
  description: 'Count friends on two park benches.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'park',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'When we add, we put two groups together.',
    explanation: 'Seven friends on one bench and five on another — count them all to find the total.',
    example: { type: 'bond', a: 7, b: 5, sum: 12 },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap every friend on both benches to count them together.',
    pictorial: 'Which picture shows seven plus five?',
    visualise:
      'Close your eyes. See seven friends on one bench and five on another. Open when ready.',
    abstract: 'What is seven plus five?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture both park benches before you count.',
    prompt:
      'Close your eyes. See 7 friends on one bench and 5 on another. Open when ready.',
    sceneEmoji: '🪑',
    sceneVisual: '7 + 5',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'tapCombine',
    title: 'Count both benches',
    subtitle: '7 friends on one bench and 5 on another. Tap every friend to count them all.',
    groupA: { label: '7 friends', items: ['🧒', '🧒', '🧒', '🧒', '🧒', '🧒', '🧒'] },
    groupB: { label: '5 friends', items: ['🧒', '🧒', '🧒', '🧒', '🧒'] },
    target: 12,
    successLabel: 'Twelve friends!',
  },
  pictorial: {
    type: 'pickGroupPair',
    title: 'Which shows 7 + 5?',
    subtitle: 'Pick the picture with 7 dots and 5 dots.',
    icon: '🧒',
    options: [
      { id: 'a', countA: 6, countB: 5, correct: false },
      { id: 'b', countA: 7, countB: 5, correct: true },
      { id: 'c', countA: 7, countB: 4, correct: false },
    ],
    feedbackCorrect: 'Yes! 7 and 5 together.',
    feedbackWrong: 'Look for 7 on one side and 5 on the other.',
  },
  abstract: {
    type: 'pickEquation',
    title: 'Solve the sum',
    subtitle: 'What is 7 + 5?',
    equation: '7 + 5 = ?',
    options: [10, 11, 12, 13],
    answer: 12,
    feedbackCorrect: 'Correct! 7 + 5 = 12.',
    feedbackWrong: 'Count all twelve friends again.',
  },
  villageReward: { buildingId: 'park-bench', label: 'Park benches', icon: '🪑' },
};
