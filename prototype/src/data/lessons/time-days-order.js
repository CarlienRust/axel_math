import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['time-days-order'];

export const timeDaysOrder = {
  id: 'time-days-order',
  title: 'Days of the week',
  description: 'Order the school week days.',
  gradeBand: '2-3',
  capsTag: 'measurement',
  locale: 'en',
  setting: 'school',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Days come in order: Monday, Tuesday, Wednesday…',
    sceneEmoji: '🏫',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap Monday, Tuesday, Wednesday in order.',
    pictorial: 'Which day comes after Tuesday?',
    visualise: 'Close your eyes. Say the school days in order.',
    abstract: 'What comes after Tuesday?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Hear the school days in your head.',
    prompt: 'Close your eyes. Say Mon, Tue, Wed at school. Open when ready.',
    sceneEmoji: '🏫',
    sceneVisual: 'Mon → Wed',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickDayOrder',
    title: 'Order days',
    subtitle: 'Tap Mon, Tue, Wed in order on the school calendar.',
    correctOrder: ['Mon', 'Tue', 'Wed'],
    display: ['Wed', 'Mon', 'Tue'],
    successLabel: 'School days ordered!',
  },
  pictorial: {
    type: 'pickPatternNext',
    title: 'After Tuesday?',
    subtitle: 'Mon, Tue, ?',
    stem: ['Mon', 'Tue'],
    options: [
      { id: 'a', next: 'Sun', correct: false },
      { id: 'b', next: 'Wed', correct: true },
      { id: 'c', next: 'Fri', correct: false },
    ],
    feedbackCorrect: 'Yes! Wednesday.',
    feedbackWrong: 'What school day follows Tuesday?',
  },
  abstract: {
    type: 'pickChoice',
    title: 'Next day',
    subtitle: 'Tuesday is done. Next school day is…',
    options: [
      { id: 'a', label: 'Monday', correct: false },
      { id: 'b', label: 'Wednesday', correct: true },
      { id: 'c', label: 'Sunday', correct: false },
    ],
    feedbackCorrect: 'Correct! Wednesday.',
    feedbackWrong: 'School days go in order.',
  },
  villageReward: { buildingId: 'school', label: 'School', icon: '🏫' },
};
