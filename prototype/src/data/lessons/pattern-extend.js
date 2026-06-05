import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['pattern-extend'];

export const patternExtend = {
  id: 'pattern-extend',
  title: 'Extend the pattern',
  description: 'What comes next on the clinic wall?',
  gradeBand: '2-3',
  capsTag: 'patterns',
  locale: 'en',
  setting: 'clinic',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Watch the pattern repeat, then pick what comes next.',
    sceneEmoji: '🏥',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Copy the star-circle pattern in the waiting room.',
    pictorial: 'What shape comes next on the wall?',
    visualise: 'Close your eyes. See the clinic wall pattern repeat.',
    abstract: 'Pick the next shape.',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'See star, circle, star, circle on the clinic wall…',
    prompt: 'Close your eyes. See ⭐ ◯ ⭐ ◯ on the wall. What is next? Open when ready.',
    sceneEmoji: '🏥',
    sceneVisual: '⭐ ◯ ⭐ ◯',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickPatternTiles',
    title: 'Extend',
    subtitle: 'Copy ⭐ ◯ ⭐ ◯ on the clinic wall.',
    pattern: ['⭐', '◯', '⭐', '◯'],
    tileChoices: ['⭐', '◯'],
    successLabel: 'Nice pattern!',
  },
  pictorial: {
    type: 'pickPatternNext',
    title: 'Next shape?',
    subtitle: '⭐ ◯ ⭐ ◯ ?',
    stem: ['⭐', '◯', '⭐', '◯'],
    options: [
      { id: 'a', next: '◯', correct: false },
      { id: 'b', next: '⭐', correct: true },
      { id: 'c', next: '△', correct: false },
    ],
    feedbackCorrect: 'Yes! A star comes next.',
    feedbackWrong: 'The pattern alternates.',
  },
  abstract: {
    type: 'pickChoice',
    title: 'What is next?',
    subtitle: '⭐ ◯ ⭐ ◯ ?',
    options: [
      { id: 'a', label: '◯', correct: false },
      { id: 'b', label: '⭐', correct: true },
      { id: 'c', label: '■', correct: false },
    ],
    feedbackCorrect: 'Correct! Star is next.',
    feedbackWrong: 'Alternate star and circle.',
  },
  villageReward: { buildingId: 'clinic', label: 'Clinic', icon: '🏥' },
};
