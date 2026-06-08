import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['skip-count-2-5-10'];

export const skipCount2510 = {
  id: 'skip-count-2-5-10',
  title: 'Skip count in 2s',
  description: 'Count chappie packs in twos in the stock room.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'spaza',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Count in 2s means you count 2, 4, 6, 8… not 1, 2, 3, 4…',
    explanation:
      'Each pair of chappie packs is one step. Two packs make 2. The next pair makes 4, and so on.',
    example: {
      type: 'groups',
      emoji: '🍬',
      groupSize: 2,
      groupsShown: 3,
      groupLabels: ['2', '4', '6'],
    },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap every second chappie pack to count in twos.',
    pictorial: 'Which row shows counting in twos?',
    visualise: 'Close your eyes. See pairs of packs on each shelf. Open when ready.',
    abstract: 'How many packs on six shelves?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture pairs of chappie packs in the stock room.',
    prompt: 'Close your eyes. See 6 shelves, 2 packs each. Count in 2s. Open when ready.',
    sceneEmoji: '📦',
    sceneVisual: '2, 4, 6…',
    confirmLabel: 'Ready →',
  },
  concrete: {
    type: 'tapSkipEvery',
    title: 'Count in 2s',
    subtitle: 'Each group has 2 chappie packs. Tap the first pack in each group to count in 2s.',
    items: ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'],
    skip: 2,
    groupSize: 2,
    successLabel: 'Six pairs!',
  },
  pictorial: {
    type: 'pickSkipSequence',
    title: 'Which sequence?',
    subtitle: 'Pick counting in 2s up to 12.',
    options: [
      { id: 'a', sequence: [1, 2, 3, 4], correct: false },
      { id: 'b', sequence: [2, 4, 6, 8, 10, 12], correct: true },
      { id: 'c', sequence: [5, 10, 15], correct: false },
    ],
    feedbackCorrect: 'Yes! 2, 4, 6, 8, 10, 12.',
    feedbackWrong: 'Skip count by 2.',
  },
  abstract: {
    type: 'pickEquation',
    title: 'How many packs?',
    subtitle: '6 shelves × 2 packs',
    equation: '6 × 2 = ?',
    options: [10, 11, 12, 14],
    answer: 12,
    feedbackCorrect: 'Correct! 12 packs in the stock room.',
    feedbackWrong: 'Count in 2s six times.',
  },
  villageReward: { buildingId: 'spaza-stock', label: 'Stock room', icon: '📦' },
};
