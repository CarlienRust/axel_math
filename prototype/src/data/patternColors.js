/** Tile emoji → spoken colour name for pattern lessons */
export const PATTERN_COLOR_LABELS = {
  '🔴': 'Red',
  '🔵': 'Blue',
  '🟢': 'Green',
  '🟡': 'Yellow',
  '🟠': 'Orange',
  '🟣': 'Purple',
  '⬛': 'Black',
  '⭐': 'star',
  '⭕': 'circle',
  '◯': 'circle',
};

const DISTRACTOR_POOL = ['🔴', '🔵', '🟡', '🟠', '🟣', '⬛'];

export function patternColorLabel(emoji) {
  return PATTERN_COLOR_LABELS[emoji] ?? 'that colour';
}

export function patternColorPhrase(emojis) {
  return emojis.map((e) => patternColorLabel(e).toLowerCase()).join(', ');
}

/** Third tile colour — not used in the pattern and different from both pattern colours */
export function pickPatternDistractor(patternTiles) {
  const used = new Set(patternTiles);
  return DISTRACTOR_POOL.find((c) => !used.has(c)) ?? '🔴';
}

export function buildPatternNextOptions(correctTile, otherTile) {
  const distractor = pickPatternDistractor([correctTile, otherTile]);
  return [
    { id: 'a', next: correctTile, correct: true },
    { id: 'b', next: otherTile, correct: false },
    { id: 'c', next: distractor, correct: false },
  ];
}
