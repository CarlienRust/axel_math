import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['multiplication-grouping'];

export const multiplicationGrouping = {
  id: 'multiplication-grouping',
  title: 'Equal groups',
  description: 'Count equal rows of chairs in the school hall.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'hall',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Equal groups mean the same amount in every row.',
    explanation: 'Each row has the same number of chairs. Count every row to find the total.',
    example: {
      type: 'groupRows',
      emoji: '🪑',
      groupSize: 4,
      groupsShown: 3,
      groupLabels: ['4', '8', '12'],
      rowLabel: 'Row',
    },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap every chair in all five rows to count them.',
    pictorial: 'Which picture shows five rows of four chairs?',
    visualise:
      'Close your eyes. See five equal rows of chairs in the school hall. Open when ready.',
    abstract: 'How many chairs in five rows of four?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture equal rows of chairs in the hall.',
    prompt:
      'Close your eyes. See 5 rows of 4 chairs in the school hall. Open when ready.',
    sceneEmoji: '🏛️',
    sceneVisual: '5 rows of 4',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'tapEqualGroups',
    title: 'Count the chairs',
    subtitle: 'Each row has 4 chairs. Tap every chair in 5 rows.',
    groups: 5,
    perGroup: 4,
    icon: '🪑',
    groupLabel: 'Row',
    successLabel: 'Twenty chairs!',
  },
  pictorial: {
    type: 'pickRows',
    title: 'Equal rows',
    subtitle: 'Pick 5 rows with 4 dots in each row.',
    icon: '🪑',
    options: [
      { id: 'a', groups: 4, perGroup: 5, correct: false },
      { id: 'b', groups: 5, perGroup: 4, correct: true },
      { id: 'c', groups: 5, perGroup: 3, correct: false },
    ],
    feedbackCorrect: 'Yes! 5 rows of 4.',
    feedbackWrong: 'Count the rows and chairs in each row.',
  },
  abstract: {
    type: 'pickChoice',
    title: 'Equal groups',
    subtitle: '5 rows of 4 chairs. How many altogether?',
    options: [
      { id: 'a', label: '4 + 4 + 4 + 4 + 4 = 20', correct: true },
      { id: 'b', label: '5 + 4 = 9', correct: false },
      { id: 'c', label: '5 + 5 + 5 = 15', correct: false },
    ],
    feedbackCorrect: 'Correct! 5 groups of 4 makes 20 chairs.',
    feedbackWrong: 'Add 4 five times, or count all the chairs.',
  },
  villageReward: { buildingId: 'school-hall', label: 'School hall', icon: '🏛️' },
};
