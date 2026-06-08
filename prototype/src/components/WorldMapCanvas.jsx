import { getLessonById } from '../data/lessons/index.js';
import {
  MAP_VIEWBOX,
  getChunkTrailPathDs,
  getIncomingChunkPathD,
  getMapNodeAriaLabel,
  getMapNodeIcon,
  getMapNodeState,
  getNodeCentersPx,
  getOutgoingChunkPathD,
  getSegmentPathD,
  getTermEndMarkerPosition,
  getTermEndPathD,
  isIncomingChunkPathCleared,
  isLastMapChunk,
  isMapNodeTappable,
  isMapSegmentCleared,
  isOutgoingChunkPathCleared,
  isTermEndPathCleared,
} from '../data/worldMap.js';
import { WorldMapSceneLayers } from './WorldMapScene.jsx';

const FO_WIDTH = 120;
const FO_HEIGHT = 96;
const MARKER_CENTER_Y = 28;
/** First node on a page: label above marker so long names fit in the sky band */
const FIRST_NODE_FO_HEIGHT = 102;
const FIRST_NODE_MARKER_OFFSET_Y = 74;

/**
 * Single SVG: background, path, and lesson nodes share one viewBox so positions match.
 */
export function WorldMapCanvas({ chunkIndex, chunkNodes, progressMap, onNodeClick }) {
  const { width, height } = MAP_VIEWBOX;
  const trailPaths = getChunkTrailPathDs(chunkNodes, chunkIndex);
  const centers = getNodeCentersPx(chunkNodes);
  const idPrefix = `map-chunk-${chunkIndex}`;

  return (
    <svg
      className="world-map-svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="application"
      aria-label="Choose a lesson on the map"
    >
      <WorldMapSceneLayers
        chunkNodes={chunkNodes}
        chunkIndex={chunkIndex}
        idPrefix={idPrefix}
      />

      <g className="world-map-paths" aria-hidden>
        {trailPaths.map((d, i) => (
          <path key={`path-bg-${i}`} className="world-map-path-bg" d={d} />
        ))}
        {chunkIndex > 0 && (
          <path
            className={`world-map-path-seg world-map-path-seg--bridge ${
              isIncomingChunkPathCleared(chunkIndex, progressMap) ? 'cleared' : ''
            }`}
            d={getIncomingChunkPathD(chunkNodes)}
          />
        )}
        {chunkNodes.map((_, i) => {
          if (i < 1) return null;
          const segD = getSegmentPathD(chunkNodes, i);
          const cleared = isMapSegmentCleared(chunkNodes, i, progressMap);
          return (
            <path
              key={`seg-${i}`}
              className={`world-map-path-seg ${cleared ? 'cleared' : ''}`}
              d={segD}
            />
          );
        })}
        {!isLastMapChunk(chunkIndex) && (
          <path
            className={`world-map-path-seg world-map-path-seg--bridge ${
              isOutgoingChunkPathCleared(chunkNodes, progressMap) ? 'cleared' : ''
            }`}
            d={getOutgoingChunkPathD(chunkNodes)}
          />
        )}
        {isLastMapChunk(chunkIndex) && (
          <path
            className={`world-map-path-seg world-map-path-seg--bridge ${
              isTermEndPathCleared(chunkNodes, progressMap) ? 'cleared' : ''
            }`}
            d={getTermEndPathD(chunkNodes)}
          />
        )}
      </g>

      {isLastMapChunk(chunkIndex) && (() => {
        const { x, y } = getTermEndMarkerPosition(chunkNodes);
        return (
          <foreignObject
            x={x - 100}
            y={y - 20}
            width={200}
            height={44}
            overflow="visible"
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="map-term-end"
              role="img"
              aria-label="End of Term 1"
            >
              End of Term 1
            </div>
          </foreignObject>
        );
      })()}

      {chunkNodes.map((node, i) => {
        const { x, y } = centers[i];
        const lesson = getLessonById(node.lessonId);
        const state = getMapNodeState(node, progressMap);
        const tappable = isMapNodeTappable(node, progressMap);
        const icon = getMapNodeIcon(node);
        const ariaLabel = getMapNodeAriaLabel(node, state, lesson?.title ?? node.name);
        const labelOnTop = node.chunkLocalIndex === 0;
        const foHeight = labelOnTop ? FIRST_NODE_FO_HEIGHT : FO_HEIGHT;
        const foY = labelOnTop ? y - FIRST_NODE_MARKER_OFFSET_Y : y - MARKER_CENTER_Y;

        return (
          <foreignObject
            key={node.lessonId}
            x={x - FO_WIDTH / 2}
            y={foY}
            width={FO_WIDTH}
            height={foHeight}
            overflow="visible"
          >
            <button
              type="button"
              xmlns="http://www.w3.org/1999/xhtml"
              className={`map-node map-node--svg map-node--${state}${
                labelOnTop ? ' map-node--label-top' : ''
              }`}
              disabled={!tappable}
              onClick={() => onNodeClick(node)}
              aria-label={ariaLabel}
            >
              <span className="map-node-hit">
                <span className="map-node-badge">{node.level}</span>
                <span className="map-node-marker" aria-hidden>
                  {icon}
                </span>
                {state === 'locked' && (
                  <span className="map-node-lock" aria-hidden>
                    🔒
                  </span>
                )}
              </span>
              <span className="map-node-label">
                {node.name}
                {state === 'done' && <span className="map-node-star"> ⭐</span>}
              </span>
            </button>
          </foreignObject>
        );
      })}
    </svg>
  );
}
