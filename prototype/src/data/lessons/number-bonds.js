import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['number-bonds'];

export const numberBonds = {
  id: 'number-bonds',
  title: 'Number bonds',
  description: 'Friends of ten at the park playground.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'park',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Number bonds are two numbers that make ten.',
    sceneEmoji: '🌳',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Pick the number that partners with the anchor to make ten.',
    pictorial: 'Which picture shows seven plus three making ten?',
    visualise:
      'Close your eyes. See seven stickers, then three more. Open when you are ready.',
    abstract: 'What is seven plus three?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture seven stickers and three more at the park.',
    prompt:
      'Close your eyes. See 7 stickers at the park, then 3 more. Open when you are ready.',
    sceneEmoji: '🌳',
    sceneVisual: '7 + 3',
    confirmLabel: 'Ready →',
  },
  concrete: {
    type: 'pickBondPartner',
    title: 'Bonds of 10',
    subtitle: 'Zola shares stickers at the park. Find the partner number.',
    targetSum: 10,
    steps: [
      {
        anchor: 7,
        options: [2, 3, 4, 5],
        answer: 3,
        successText: 'Yes! 7 + 3 = 10.',
      },
      {
        anchor: 6,
        options: [3, 4, 5, 2],
        answer: 4,
        successText: 'Yes! 6 + 4 = 10.',
      },
    ],
    successLabel: 'Two bonds of 10!',
  },
  pictorial: {
    type: 'pickGroupPair',
    title: 'Which shows 10 altogether?',
    subtitle: 'Pick the picture with 7 dots and 3 dots.',
    icon: '🌳',
    options: [
      { id: 'a', countA: 6, countB: 4, correct: false },
      { id: 'b', countA: 7, countB: 3, correct: true },
      { id: 'c', countA: 8, countB: 3, correct: false },
    ],
    feedbackCorrect: 'Yes! 7 and 3 make 10.',
    feedbackWrong: 'Look for 7 on one side and 3 on the other.',
  },
  abstract: {
    type: 'pickEquation',
    title: 'Solve the bond',
    subtitle: 'What is 7 + 3?',
    equation: '7 + 3 = ?',
    options: [8, 9, 10, 11],
    answer: 10,
    feedbackCorrect: 'Correct! 7 + 3 = 10.',
    feedbackWrong: 'Think: 7 needs a partner to make 10.',
  },
  villageReward: { buildingId: 'park', label: 'Park', icon: '🌳' },
};
