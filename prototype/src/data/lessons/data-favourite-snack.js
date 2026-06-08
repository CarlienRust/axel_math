import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['data-favourite-snack'];

export const SNACK_POLL_CHART = {
  title: 'School yard snack poll',
  options: [
    { id: 'apple', emoji: '🍎', name: 'Apple', count: 2, correct: false },
    { id: 'milk', emoji: '🥛', name: 'Milk', count: 3, correct: false },
    { id: 'bread', emoji: '🍞', name: 'Bread', count: 5, correct: true },
  ],
};

export const dataFavouriteSnack = {
  id: 'data-favourite-snack',
  title: 'Favourite snack graph',
  description: 'Read the snack poll in the school yard.',
  gradeBand: '2-3',
  capsTag: 'data',
  locale: 'en',
  setting: 'school',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'A taller bar means more votes.',
    explanation: 'More children chose bread than apple — the bread bar is taller on the chart.',
    example: { type: 'labels', items: ['🍎 2', '🥛 3', '🍞 5'] },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Look at the chart. Tap the snack with the tallest bar.',
    pictorial: 'How many learners chose bread? Read the chart.',
    visualise: 'Close your eyes. See the poll chart in the school yard.',
    abstract: 'Which snack has the fewest votes on the chart?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture the snack poll on the yard wall.',
    prompt: 'Close your eyes. See three snack bars — one is tallest. Open when ready.',
    sceneEmoji: '🌳',
    sceneVisual: '📊',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickPictograph',
    title: 'Read the chart',
    subtitle: 'How many learners chose each snack? Tap the one with the most votes.',
    chartTitle: SNACK_POLL_CHART.title,
    options: SNACK_POLL_CHART.options,
    answer: 'bread',
    feedbackCorrect: 'Yes! Bread has the tallest bar — 5 votes.',
    feedbackWrong: 'Compare the bar heights. Which is tallest?',
    successLabel: 'Bread wins!',
  },
  pictorial: {
    type: 'pickPictographValue',
    title: 'How many votes?',
    subtitle: 'Look at the chart. How many learners chose bread?',
    chartTitle: SNACK_POLL_CHART.title,
    options: SNACK_POLL_CHART.options,
    snackName: 'Bread',
    answer: 5,
    numberOptions: [3, 4, 5, 6],
    feedbackCorrect: 'Yes! The bread bar shows 5 votes.',
    feedbackWrong: 'Read the number above the bread bar.',
  },
  abstract: {
    type: 'pickPictographCompare',
    title: 'Fewest votes',
    subtitle: 'Which snack has the fewest votes on the chart?',
    chartTitle: SNACK_POLL_CHART.title,
    options: SNACK_POLL_CHART.options,
    choices: [
      { id: 'apple', label: 'Apple', correct: true },
      { id: 'milk', label: 'Milk', correct: false },
      { id: 'bread', label: 'Bread', correct: false },
    ],
    feedbackCorrect: 'Correct! Apple has the shortest bar — 2 votes.',
    feedbackWrong: 'Find the shortest bar on the chart.',
  },
  villageReward: { buildingId: 'school-yard', label: 'School yard', icon: '🌳' },
};
