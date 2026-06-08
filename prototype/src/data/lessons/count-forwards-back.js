import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['count-forwards-back'];

export const countForwardsBack = {
  id: 'count-forwards-back',
  title: 'Count on and back',
  description: 'Count along the shelf number line.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'spaza',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Count on means jump forward on the number line.',
    explanation: 'Start at one number and tap each next number until you reach the target.',
    example: {
      type: 'numberLine',
      start: 24,
      end: 30,
      steps: [25, 26, 27, 28, 29],
    },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap each number as you count on from twenty-four.',
    pictorial: 'Which jump lands on thirty?',
    visualise: 'Close your eyes. See the jumps on the line. Open when ready.',
    abstract: 'What number do you land on?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'See the number line jumps in your head.',
    prompt: 'Close your eyes. Count on from 24: 25, 26, 27, 28, 29, 30. Open when ready.',
    sceneEmoji: '🏪',
    sceneVisual: '24 → 30',
    confirmLabel: 'Ready →',
  },
  concrete: {
    type: 'tapNumberLine',
    title: 'Count on',
    subtitle: 'Axel restocks shelves. Count on from 24 to 30.',
    start: 24,
    steps: 6,
    target: 30,
    successLabel: 'Thirty!',
  },
  pictorial: {
    type: 'pickNumberLine',
    title: 'Which jump?',
    subtitle: 'Pick the line that counts on to 30.',
    options: [
      { id: 'a', start: 24, end: 26, correct: false },
      { id: 'b', start: 24, end: 30, correct: true },
      { id: 'c', start: 20, end: 30, correct: false },
    ],
    feedbackCorrect: 'Yes! 24 to 30.',
    feedbackWrong: 'Count six steps from 24.',
  },
  abstract: {
    type: 'pickNumber',
    title: 'Land on…',
    subtitle: 'Start at 24. Count on 6.',
    visual: '24 + 6 = ?',
    options: [28, 29, 30, 31],
    answer: 30,
    feedbackCorrect: 'Correct! You land on 30.',
    feedbackWrong: 'Count on six more from 24.',
  },
  villageReward: { buildingId: 'spaza-shelf', label: 'Spaza shelf', icon: '📦' },
};
