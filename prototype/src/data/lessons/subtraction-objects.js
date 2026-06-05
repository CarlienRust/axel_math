import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['subtraction-objects'];

const CRAYONS = Array.from({ length: 12 }, () => '✏️');

export const subtractionObjects = {
  id: 'subtraction-objects',
  title: 'Subtraction with objects',
  description: 'Take crayons from the class room tray.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'school',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Take away objects to see how many are left.',
    sceneEmoji: '✏️',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap five crayons to take from the tray.',
    pictorial: 'Which picture shows seven crayons left?',
    visualise:
      'Close your eyes. See twelve crayons, then five are used. Open when ready.',
    abstract: 'What is twelve minus five?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture the class room crayon tray.',
    prompt:
      'Close your eyes. See 12 crayons in the tray. Five are taken out. Open when ready.',
    sceneEmoji: '📚',
    sceneVisual: '12 − 5',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'tapSubtract',
    title: 'Take away crayons',
    subtitle: 'There are 12 crayons in the tray. Tap 5 that the class uses.',
    items: CRAYONS,
    startCount: 12,
    removeCount: 5,
    successLabel: '7 left in the tray!',
  },
  pictorial: {
    type: 'pickGroup',
    title: 'How many left?',
    subtitle: 'Pick the picture that shows 7 crayons.',
    icon: '✏️',
    options: [
      { id: 'a', count: 5, correct: false },
      { id: 'b', count: 7, correct: true },
      { id: 'c', count: 9, correct: false },
    ],
    feedbackCorrect: 'Yes! 12 take away 5 leaves 7.',
    feedbackWrong: 'Count what is left in the tray.',
  },
  abstract: {
    type: 'pickEquation',
    title: 'Solve the sum',
    subtitle: 'What is 12 − 5?',
    equation: '12 − 5 = ?',
    options: [5, 6, 7, 8],
    answer: 7,
    feedbackCorrect: 'Correct! 12 − 5 = 7.',
    feedbackWrong: 'Start at 12 and count back 5.',
  },
  villageReward: { buildingId: 'class-room', label: 'Class room', icon: '📚' },
};
