import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['counting-groups'];

export const countingGroups = {
  id: 'counting-groups',
  title: 'Counting in groups',
  description: 'Count snacks in equal groups at Axel\'s Spaza shop.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'spaza',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Count in 2s means counting equal groups of two.',
    explanation:
      'Put two chappie packs together in one group. Count the groups: 2, then 4, then 6, then 8 — that is counting in 2s!',
    example: {
      type: 'groups',
      emoji: '🍬',
      groupSize: 2,
      groupsShown: 4,
      groupLabels: ['2', '4', '6', '8'],
    },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap each chappie pack in the group to count in 2s.',
    pictorial: 'Which picture shows eight snacks in groups of two?',
    visualise: 'Close your eyes. Picture groups of two snacks on the shelf.',
    abstract: 'How many snacks are there altogether?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture groups of two chappie packs at the shop.',
    prompt: 'Close your eyes. See four groups of 2 packs: 2, 4, 6, 8. Open when ready.',
    sceneEmoji: '🍬',
    sceneVisual: '[2] [4] [6] [8]',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'tapCount',
    title: 'Count the groups',
    subtitle: 'Axel sorts chappie packs into groups of 2. Tap each pack to count in 2s up to 8.',
    items: ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'],
    groupSize: 2,
    target: 8,
    successLabel: 'Eight packs!',
  },
  pictorial: {
    type: 'pickGroup',
    title: 'Which shows 8?',
    subtitle: 'Pick the shelf with eight dots in groups of two.',
    icon: '🏪',
    options: [
      { id: 'a', count: 6, correct: false },
      { id: 'b', count: 8, correct: true },
      { id: 'c', count: 10, correct: false },
    ],
    feedbackCorrect: 'Sharp! Eight dots in groups of two.',
    feedbackWrong: 'Count the dots in twos — which group has 8?',
  },
  abstract: {
    type: 'pickNumber',
    title: 'How many altogether?',
    subtitle: '4 groups of 2 snacks. Pick the total.',
    visual: '🍬🍬 · 🍬🍬 · 🍬🍬 · 🍬🍬',
    options: [6, 8, 10, 12],
    answer: 8,
    feedbackCorrect: 'Correct! 4 groups of 2 makes 8.',
    feedbackWrong: 'Count in groups of two again.',
  },
  villageReward: { buildingId: 'spaza', label: "Axel's Spaza shop", icon: '🏪' },
};
