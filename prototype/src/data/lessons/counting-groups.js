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
    bigIdea: 'Count in groups to find the total faster.',
    sceneEmoji: '🍬',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap each snack in the group to count them all.',
    pictorial: 'Which picture shows eight snacks in groups of two?',
    visualise: 'Close your eyes. Picture groups of two snacks on the shelf.',
    abstract: 'How many snacks are there altogether?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture groups of two snacks at the shop.',
    prompt: 'Close your eyes. See four bags of 2 snacks on the shelf. Open when ready.',
    sceneEmoji: '🍬',
    sceneVisual: '🍬🍬 · 🍬🍬',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'tapCount',
    title: 'Count the groups',
    subtitle: 'At the shop, Axel sorts snacks into groups of two. Tap each one to count all eight.',
    items: ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'],
    target: 8,
    successLabel: 'Eight snacks!',
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
