import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['shapes-2d-sides'];

export const shapes2dSides = {
  id: 'shapes-2d-sides',
  title: 'Sides and corners',
  description: 'Count sides on signs at the taxi rank.',
  gradeBand: '2-3',
  capsTag: 'space',
  locale: 'en',
  setting: 'taxi',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Count the sides to tell shapes apart.',
    sceneEmoji: '🚕',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap the sign shape with four sides.',
    pictorial: 'Which taxi rank sign has three corners?',
    visualise: 'Close your eyes. Trace the sides on the rank signs.',
    abstract: 'How many sides on a triangle sign?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Trace each side on the taxi rank signs.',
    prompt: 'Close your eyes. Trace a triangle sign: 3 sides, 3 corners. Open when ready.',
    sceneEmoji: '🚕',
    sceneVisual: '3 sides',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickShapeBucket',
    title: 'Four sides',
    subtitle: 'Tap the rank sign with 4 equal sides.',
    targetKind: 'square',
    targetLabel: 'squares',
    shapes: [
      { id: 't1', kind: 'triangle', emoji: '△' },
      { id: 's1', kind: 'square', emoji: '□' },
      { id: 'c1', kind: 'circle', emoji: '○' },
      { id: 't2', kind: 'triangle', emoji: '△' },
    ],
    successLabel: 'A square sign!',
  },
  pictorial: {
    type: 'pickShapeGroup',
    title: 'Three corners?',
    subtitle: 'Pick the triangle sign at the rank.',
    options: [
      { id: 'a', shapes: ['□'], correct: false },
      { id: 'b', shapes: ['△'], correct: true },
      { id: 'c', shapes: ['○'], correct: false },
    ],
    feedbackCorrect: 'Yes! A triangle has 3 corners.',
    feedbackWrong: 'Count the corners.',
  },
  abstract: {
    type: 'pickNumber',
    title: 'Sides on a triangle',
    subtitle: 'How many sides does △ have?',
    visual: '△',
    options: [2, 3, 4, 5],
    answer: 3,
    feedbackCorrect: 'Correct! 3 sides.',
    feedbackWrong: 'Trace the triangle sign.',
  },
  villageReward: { buildingId: 'taxi', label: 'Taxi rank', icon: '🚕' },
};
