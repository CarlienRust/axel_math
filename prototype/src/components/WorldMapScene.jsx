import { getChunkTrailPathDs, MAP_VIEWBOX } from '../data/worldMap.js';
import { getDecorationsForNodes, MAP_ZONE_BANDS } from '../data/worldMapArt.js';

/** Background layers only (no path overlays — those live in WorldMapCanvas). */
export function WorldMapSceneLayers({ chunkNodes, chunkIndex = 0, idPrefix = 'map' }) {
  const { width: w, height: h } = MAP_VIEWBOX;
  const trailPaths = getChunkTrailPathDs(chunkNodes, chunkIndex);
  const decorations = getDecorationsForNodes(chunkNodes);

  return (
    <>
      <defs>
        <linearGradient id={`${idPrefix}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8d8f0" />
          <stop offset="100%" stopColor="#d8eef8" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ed4a4" />
          <stop offset="100%" stopColor="#7eb882" />
        </linearGradient>
        <filter id={`${idPrefix}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3d5c42" floodOpacity="0.18" />
        </filter>
      </defs>

      <rect x={0} y={0} width={w} height={h * 0.14} fill={`url(#${idPrefix}-sky)`} />
      <ellipse cx={300} cy={42} rx={28} ry={28} fill="#ffe9a8" opacity="0.95" />
      <g fill="#fff" opacity="0.9">
        <ellipse cx={64} cy={48} rx={30} ry={11} />
        <ellipse cx={88} cy={42} rx={22} ry={9} />
        <ellipse cx={170} cy={56} rx={26} ry={10} />
      </g>

      <rect x={0} y={h * 0.12} width={w} height={h * 0.88} fill={`url(#${idPrefix}-ground)`} />

      {MAP_ZONE_BANDS.map((zone) => (
        <rect
          key={zone.id}
          x={0}
          y={zone.y0 * h}
          width={w}
          height={(zone.y1 - zone.y0) * h}
          fill={zone.grass}
          opacity={0.55}
        />
      ))}

      {trailPaths.map((trailD, i) => (
        <g key={`trail-${i}`}>
          <path
            d={trailD}
            fill="none"
            stroke="#c9b08a"
            strokeWidth={36}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.5}
          />
          <path
            d={trailD}
            fill="none"
            stroke="#ddd0b8"
            strokeWidth={28}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.85}
          />
        </g>
      ))}

      <g filter={`url(#${idPrefix}-shadow)`}>
        {decorations.map((d, i) => (
          <MapDecoration key={i} {...d} />
        ))}
      </g>

      <rect x={0} y={h - 8} width={w} height={8} fill="#f5d76e" opacity="0.5" />
    </>
  );
}

function MapDecoration({ type, x, y, scale = 1 }) {
  const props = { x, y, scale };
  switch (type) {
    case 'home':
      return <IsoHome {...props} />;
    case 'garden':
      return <IsoGarden {...props} />;
    case 'tree':
      return <IsoTree {...props} />;
    default:
      return null;
  }
}

function IsoGroup({ x, y, scale = 1, children }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {children}
    </g>
  );
}

function IsoHome({ x, y, scale }) {
  return (
    <IsoGroup x={x} y={y} scale={scale}>
      <ellipse cx={0} cy={10} rx={22} ry={9} fill="#3d5c42" opacity={0.12} />
      <path d="M-16 4 L16 4 L20 18 L-12 18 Z" fill="#f0e0c8" />
      <path d="M-16 4 L0 -8 L32 -8 L16 4 Z" fill="#e8b4a0" />
      <rect x={-4} y={10} width={8} height={8} rx={1} fill="#b8d4e8" opacity={0.7} />
    </IsoGroup>
  );
}

function IsoGarden({ x, y, scale }) {
  return (
    <IsoGroup x={x} y={y} scale={scale}>
      <rect x={-16} y={4} width={32} height={16} rx={3} fill="#7eb882" opacity={0.6} />
      <circle cx={-8} cy={8} r={3} fill="#f472b6" />
      <circle cx={4} cy={10} r={3} fill="#fbbf24" />
      <circle cx={12} cy={6} r={3} fill="#60a5fa" />
    </IsoGroup>
  );
}

function IsoTree({ x, y, scale = 1 }) {
  return (
    <IsoGroup x={x} y={y} scale={scale}>
      <rect x={-3} y={6} width={6} height={10} rx={1} fill="#6b4f3a" />
      <ellipse cx={0} cy={0} rx={12} ry={10} fill="#4a9e56" />
      <ellipse cx={-5} cy={-2} rx={8} ry={7} fill="#52a85f" />
    </IsoGroup>
  );
}
