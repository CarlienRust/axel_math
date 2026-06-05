import { MAP_VIEWBOX, getNodeCentersPx } from './worldMap.js';

/** Decorative props offset from node centres */
export const MAP_SAFE_RADIUS = 52;

export const MAP_ZONE_BANDS = [
  { id: 'top', y0: 0, y1: 0.2, grass: '#9ed4a4' },
  { id: 'upper', y0: 0.2, y1: 0.45, grass: '#94ce9a' },
  { id: 'mid', y0: 0.45, y1: 0.7, grass: '#8ec892' },
  { id: 'lower', y0: 0.7, y1: 1, grass: '#9ed0a2' },
];

/** Light scenery beside each node on the current map page */
export function getDecorationsForNodes(nodes) {
  const centers = getNodeCentersPx(nodes);
  const { width: w } = MAP_VIEWBOX;
  const decor = [];

  centers.forEach((c, i) => {
    const side = i % 2 === 0 ? -1 : 1;
    decor.push({
      type: 'tree',
      x: c.x + side * 88,
      y: c.y + 12,
      scale: 0.72,
    });
    if (i === 0) {
      decor.push({ type: 'home', x: 42, y: c.y - 24, scale: 0.8 });
    }
    if (i === centers.length - 1) {
      decor.push({ type: 'garden', x: w - 48, y: c.y + 8, scale: 0.85 });
    }
  });

  return decor;
}
