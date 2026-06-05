import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['place-value-tens-ones'];

export const placeValueTensOnes = {
  id: 'place-value-tens-ones',
  title: 'Tens and ones',
  description: 'Count tens and ones at the spaza till.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'spaza',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Tens are bundles of ten. Ones are single.',
    sceneEmoji: '💵',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Use tens and ones to build forty-seven rand at the till.',
    pictorial: 'Which card shows 4 tens and 7 ones?',
    visualise: 'Close your eyes. See tens and ones at the till. Open when ready.',
    abstract: 'What number is 4 tens 7 ones?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture tens and ones in the till drawer.',
    prompt: 'Close your eyes. See 4 tens and 7 ones make R47. Open when ready.',
    sceneEmoji: '💵',
    sceneVisual: '47',
    confirmLabel: 'Ready →',
  },
  concrete: {
    type: 'buildPlaceValue',
    title: 'Build the amount',
    subtitle: 'Axel counts R47 at the till: tens and ones.',
    target: 47,
    successLabel: 'R47 at the till!',
  },
  pictorial: {
    type: 'pickPlaceValue',
    title: 'Which card?',
    subtitle: 'Pick 4 tens and 7 ones.',
    options: [
      { id: 'a', tens: 4, ones: 6, correct: false },
      { id: 'b', tens: 4, ones: 7, correct: true },
      { id: 'c', tens: 3, ones: 7, correct: false },
    ],
    feedbackCorrect: 'Yes! 4 tens and 7 ones is 47.',
    feedbackWrong: 'Count tens first, then ones.',
  },
  abstract: {
    type: 'pickNumber',
    title: 'What number?',
    subtitle: '4 tens + 7 ones = ?',
    visual: '40 + 7 = ?',
    options: [37, 47, 74, 57],
    answer: 47,
    feedbackCorrect: 'Correct! 47.',
    feedbackWrong: '4 tens is 40. Add 7 ones.',
  },
  villageReward: { buildingId: 'spaza-till', label: 'Spaza till', icon: '💵' },
};
