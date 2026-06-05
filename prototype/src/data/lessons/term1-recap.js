import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';
import { SNACK_POLL_CHART } from './data-favourite-snack.js';

const caps = LESSON_CAPS_MAP['term1-recap'];

export const term1Recap = {
  id: 'term1-recap',
  title: 'Term 1 recap',
  description: 'Quick check of what you learned this term.',
  gradeBand: '2-3',
  capsTag: 'numbers',
  locale: 'en',
  setting: 'school',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Let us recap what you learned in Term 1.',
    sceneEmoji: '📝',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Count friends on both benches — a bond of ten.',
    pictorial: 'Which price is bigger on the porch?',
    visualise: 'Close your eyes. Think of what you learned this term.',
    abstract: 'Read the yard chart — which snack is most popular?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Take a breath before your Term 1 test.',
    prompt: 'Close your eyes. Remember counting, adding, and graphs from Term 1. Open when ready.',
    sceneEmoji: '📝',
    sceneVisual: 'Term 1 recap',
    confirmLabel: 'Ready →',
  },
  concrete: {
    type: 'tapCombine',
    title: 'Bonds recap',
    subtitle: '7 friends on one bench and 3 on another. Tap every friend to count them all.',
    groupA: { label: '7 friends', items: ['🧒', '🧒', '🧒', '🧒', '🧒', '🧒', '🧒'] },
    groupB: { label: '3 friends', items: ['🧒', '🧒', '🧒'] },
    target: 10,
    successLabel: 'Ten friends!',
  },
  pictorial: {
    type: 'pickCompare',
    title: 'Compare prices',
    subtitle: 'Which is true for R45 and R67 on the spaza porch?',
    options: [
      { id: 'a', left: 45, symbol: '>', right: 67, correct: false },
      { id: 'b', left: 45, symbol: '<', right: 67, correct: true },
      { id: 'c', left: 45, symbol: '=', right: 67, correct: false },
    ],
    feedbackCorrect: 'Yes! R45 is less than R67.',
    feedbackWrong: 'Which porch price is bigger?',
  },
  abstract: {
    type: 'pickPictograph',
    title: 'Read the graph',
    subtitle: 'Use the school yard chart. Which snack has the most votes?',
    chartTitle: SNACK_POLL_CHART.title,
    options: SNACK_POLL_CHART.options,
    answer: 'bread',
    feedbackCorrect: 'Sharp! Term 1 recap done. Bread wins.',
    feedbackWrong: 'Find the tallest bar on the chart.',
  },
  villageReward: { buildingId: 'term-recap', label: 'Test/recap', icon: '📝' },
};
