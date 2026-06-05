import { LESSON_CAPS_MAP } from '../caps/foundation-phase-gr2-3.js';

const caps = LESSON_CAPS_MAP['shapes-2d-sort'];

export const shapes2dSort = {
  id: 'shapes-2d-sort',
  title: 'Sort flat shapes',
  description: 'Find triangle banners in the Community Hall.',
  gradeBand: '2-3',
  capsTag: 'space',
  locale: 'en',
  setting: 'hall',
  playable: true,
  ...caps,
  intro: {
    bigIdea: 'Flat shapes have names. Sort shapes that look the same.',
    sceneEmoji: '🔺',
    confirmLabel: "Let's try →",
  },
  narration: {
    concrete: 'Tap every triangle banner.',
    pictorial: 'Which group is all triangles?',
    visualise: 'Close your eyes. See triangle banners in the hall.',
    abstract: 'How many triangle banners?',
  },
  visualise: {
    title: 'Picture it',
    subtitle: 'Picture triangle banners hanging in the hall.',
    prompt: 'Close your eyes. See triangles: three corners, three sides. Open when ready.',
    sceneEmoji: '🏛️',
    sceneVisual: '△ △ △',
    confirmLabel: 'I pictured it →',
  },
  concrete: {
    type: 'pickShapeBucket',
    title: 'Sort triangles',
    subtitle: 'Tap all the triangle banners in the Community Hall.',
    targetKind: 'triangle',
    targetLabel: 'triangles',
    shapes: [
      { id: 't1', kind: 'triangle', emoji: '△' },
      { id: 's1', kind: 'square', emoji: '□' },
      { id: 't2', kind: 'triangle', emoji: '△' },
      { id: 'c1', kind: 'circle', emoji: '○' },
      { id: 't3', kind: 'triangle', emoji: '△' },
      { id: 's2', kind: 'square', emoji: '□' },
    ],
    successLabel: 'All triangles!',
  },
  pictorial: {
    type: 'pickShapeGroup',
    title: 'All triangles?',
    subtitle: 'Pick the group with only triangle banners.',
    options: [
      { id: 'a', shapes: ['□', '○', '△'], correct: false },
      { id: 'b', shapes: ['△', '△', '△'], correct: true },
      { id: 'c', shapes: ['△', '□', '○'], correct: false },
    ],
    feedbackCorrect: 'Yes! Three triangles.',
    feedbackWrong: 'Every shape must be a triangle.',
  },
  abstract: {
    type: 'pickNumber',
    title: 'How many?',
    subtitle: 'Count the triangle banners: △ △ △',
    visual: '△ △ △',
    options: [2, 3, 4, 5],
    answer: 3,
    feedbackCorrect: 'Correct! 3 triangles.',
    feedbackWrong: 'Count each triangle.',
  },
  villageReward: { buildingId: 'hall', label: 'Community Hall', icon: '🏛️' },
};
