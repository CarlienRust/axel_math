import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['bonds-to-20'];

export const bondsTo20 = {
  id: 'bonds-to-20',
  title: 'Bonds to 20',
  description: 'Score points to make twenty at park games.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'park',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Bonds to 20 are two numbers that make twenty.',
    explanation: 'Thirteen and seven are friends of twenty — 13 + 7 = 20.',
    example: { type: 'bond', a: 13, b: 7, sum: 20 },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Pick the partner to make twenty.',
    pictorial: 'Which picture shows thirteen plus seven?',
    visualise: 'Close your eyes. See 13 and 7 making 20. Open when ready.',
    abstract: 'What is thirteen plus seven?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'See 13 points and 7 more to reach 20 at the game.',
    prompt: 'Close your eyes. See 13 points, then 7 more make 20. Open when ready.',
    sceneEmoji: '🎯',
    sceneVisual: '13 + 7',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickBondPartner',
    title: 'Bonds of 20',
    subtitle: 'At park games, find partners that make 20.',
    targetSum: 20,
    steps: [
      { anchor: 13, options: [5, 6, 7, 8], answer: 7, successText: 'Yes! 13 + 7 = 20.' },
      { anchor: 8, options: [10, 11, 12, 13], answer: 12, successText: 'Yes! 8 + 12 = 20.' },
    ],
    successLabel: 'Two bonds of 20!',
  },
  pictorial: {
    type: 'pickGroupPair',
    title: 'Which shows 20?',
    subtitle: 'Pick 13 dots and 7 dots.',
    icon: '🎯',
    options: [
      { id: 'a', countA: 12, countB: 7, correct: false },
      { id: 'b', countA: 13, countB: 7, correct: true },
      { id: 'c', countA: 13, countB: 8, correct: false },
    ],
    feedbackCorrect: 'Yes! 13 and 7 make 20.',
    feedbackWrong: 'Look for 13 and 7.',
  },
  abstract: {
    type: 'pickEquation',
    title: 'Solve it',
    subtitle: 'What is 13 + 7?',
    equation: '13 + 7 = ?',
    options: [18, 19, 20, 21],
    answer: 20,
    feedbackCorrect: 'Correct! 13 + 7 = 20.',
    feedbackWrong: 'Use your bond of 20.',
  },
  villageReward: { buildingId: 'park-bonds', label: 'Park games', icon: '🎯' },
};
