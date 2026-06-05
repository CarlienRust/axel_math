import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['subtraction-within-20'];

const SOCCER_BALLS = Array.from({ length: 18 }, () => '⚽');

export const subtractionWithin20 = {
  id: 'subtraction-within-20',
  title: 'Subtract to 20',
  description: 'Take soccer balls off the pitch at half-time.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'sports',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Subtract means take some away and count what is left.',
    sceneEmoji: '⚽',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap five soccer balls to take off the pitch.',
    pictorial: 'Which picture shows thirteen balls left?',
    visualise: 'Close your eyes. See eighteen balls, then five go off. Open when ready.',
    abstract: 'What is eighteen minus five?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture the soccer match at half-time.',
    prompt: 'Close your eyes. See 18 soccer balls on the pitch. 5 roll away. Open when ready.',
    sceneEmoji: '⚽',
    sceneVisual: '18 − 5',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'tapSubtract',
    title: 'Take away balls',
    subtitle: '18 soccer balls on the pitch. Tap 5 that roll away at half-time.',
    items: SOCCER_BALLS,
    startCount: 18,
    removeCount: 5,
    successLabel: '13 left on the pitch!',
  },
  pictorial: {
    type: 'pickGroup',
    title: 'How many left?',
    subtitle: 'Pick the picture with 13 soccer balls on the pitch.',
    icon: '⚽',
    options: [
      { id: 'a', count: 11, correct: false },
      { id: 'b', count: 13, correct: true },
      { id: 'c', count: 15, correct: false },
    ],
    feedbackCorrect: 'Yes! 18 − 5 = 13.',
    feedbackWrong: 'Count the balls still on the pitch.',
  },
  abstract: {
    type: 'pickEquation',
    title: 'Solve it',
    subtitle: 'What is 18 − 5?',
    equation: '18 − 5 = ?',
    options: [11, 12, 13, 14],
    answer: 13,
    feedbackCorrect: 'Correct! 13 balls left.',
    feedbackWrong: 'Count back 5 from 18.',
  },
  villageReward: { buildingId: 'park-soccer-match', label: 'Soccer match', icon: '⚽' },
};
