import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['pattern-copy-ab'];

export const patternCopyAb = {
  id: 'pattern-copy-ab',
  title: 'Copy a pattern',
  description: 'Red and blue tiles at the Big Market.',
  gradeBand: '2-3',
  capsTag: 'patterns',
  locale: 'en',
  setting: 'market',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'A pattern repeats. Copy what comes over and over.',
    explanation: 'Red, blue, red, blue — the colours keep repeating in the same order.',
    example: { type: 'pattern', items: ['🔴', '🔵', '🔴', '🔵'] },
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Copy the red-blue tile pattern on the market stall.',
    pictorial: 'What colour tile comes next?',
    visualise: 'Close your eyes. Say red-blue-red-blue in your head.',
    abstract: 'What comes next?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture the market stall floor tiles.',
    prompt: 'Close your eyes. Hear red, blue, red, blue on the stall. Open when ready.',
    sceneEmoji: '🏪',
    sceneVisual: '🔴 🔵 🔴 🔵',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickPatternTiles',
    title: 'Copy AB',
    subtitle: 'Tap tiles to copy red-blue-red-blue on the stall.',
    pattern: ['🔴', '🔵', '🔴', '🔵'],
    tileChoices: ['🔴', '🔵'],
    successLabel: 'Stall pattern copied!',
  },
  pictorial: {
    type: 'pickPatternNext',
    title: 'What is next?',
    subtitle: 'Red, blue, red, blue — then?',
    stem: ['🔴', '🔵', '🔴', '🔵'],
    options: [
      { id: 'a', next: '🔴', correct: true },
      { id: 'b', next: '🔵', correct: false },
      { id: 'c', next: '🟡', correct: false },
    ],
    feedbackCorrect: 'Yes! Red comes next.',
    feedbackWrong: 'The pattern repeats red, then blue.',
  },
  abstract: {
    type: 'pickChoice',
    title: 'Next tile',
    subtitle: '🔴 🔵 🔴 🔵 ?',
    options: [
      { id: 'a', label: '🔴', correct: true },
      { id: 'b', label: '🔵', correct: false },
      { id: 'c', label: '🟡', correct: false },
    ],
    feedbackCorrect: 'Correct! Red is next.',
    feedbackWrong: 'The pattern repeats red, then blue.',
  },
  villageReward: { buildingId: 'market-big', label: 'Big Market', icon: '🏪' },
};
