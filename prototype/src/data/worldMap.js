import { getLessonSettingIcon } from './lessonSettings.js';
import {
  getLessonById,
  isLessonAccessible,
  isLessonPlayable,
  PILOT_LESSONS,
  getNextPlayableLesson,
} from './lessons/index.js';

/** Nodes visible in one map viewport */
export const NODES_PER_MAP_VIEW = 5;

/** Fixed portrait slice (one screen of map) */
export const MAP_VIEWBOX = { width: 360, height: 720 };

/** Positions for up to 5 nodes within a single viewport */
const IN_VIEW_POSITIONS = [
  { x: 50, y: 12 },
  { x: 72, y: 28 },
  { x: 38, y: 46 },
  { x: 68, y: 64 },
  { x: 50, y: 82 },
];

/** Build nodes from pilot lesson list — single source of truth for order & labels */
export const WORLD_MAP_NODES = PILOT_LESSONS.map((lesson, index) => ({
  level: index + 1,
  lessonId: lesson.id,
  setting: lesson.setting,
  name: lesson.villageReward?.label ?? lesson.title,
}));

export function getMapChunkCount() {
  return Math.ceil(WORLD_MAP_NODES.length / NODES_PER_MAP_VIEW);
}

/** Nodes for one map page with layout positions (max 5) */
export function getMapChunkNodes(chunkIndex) {
  const start = chunkIndex * NODES_PER_MAP_VIEW;
  return WORLD_MAP_NODES.slice(start, start + NODES_PER_MAP_VIEW).map((node, i) => ({
    ...node,
    mapPosition: IN_VIEW_POSITIONS[i],
    chunkIndex,
    chunkLocalIndex: i,
    globalIndex: start + i,
  }));
}

export function getChunkIndexForLevel(level) {
  return Math.floor((level - 1) / NODES_PER_MAP_VIEW);
}

export function getChunkIndexForProgress(progressMap) {
  const currentId = getCurrentLessonId(progressMap);
  if (!currentId) return 0;
  const node = WORLD_MAP_NODES.find((n) => n.lessonId === currentId);
  if (!node) return 0;
  return getChunkIndexForLevel(node.level);
}

export function getChunkLevelRange(chunkIndex) {
  const nodes = getMapChunkNodes(chunkIndex);
  if (!nodes.length) return { start: 1, end: 1 };
  return { start: nodes[0].level, end: nodes[nodes.length - 1].level };
}

export function mapPercentToPx(position) {
  return {
    left: `${position.x}%`,
    top: `${position.y}%`,
  };
}

/** Pixel centres for a set of positioned nodes (viewBox coords) */
export function getNodeCentersPx(nodes) {
  const { width, height } = MAP_VIEWBOX;
  return nodes.map((n) => ({
    x: (n.mapPosition.x / 100) * width,
    y: (n.mapPosition.y / 100) * height,
  }));
}

/** Winding path through nodes on one map page */
export function getWorldMapPathD(nodes) {
  const pts = getNodeCentersPx(nodes);
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const mx = (prev.x + curr.x) / 2;
    const my = (prev.y + curr.y) / 2;
    d += ` Q ${mx} ${my} ${curr.x} ${curr.y}`;
  }
  return d;
}

const CHUNK_BRIDGE_OFFSET = 48;

export function isLastMapChunk(chunkIndex) {
  return chunkIndex >= getMapChunkCount() - 1;
}

export function getPreviousChunkLastNode(chunkIndex) {
  if (chunkIndex <= 0) return null;
  const prevNodes = getMapChunkNodes(chunkIndex - 1);
  return prevNodes[prevNodes.length - 1] ?? null;
}

/** Path from above the viewport into the first node on this page */
export function getIncomingChunkPathD(nodes) {
  const pts = getNodeCentersPx(nodes);
  if (!pts.length) return '';
  const first = pts[0];
  const entryY = -CHUNK_BRIDGE_OFFSET;
  const mx = first.x;
  const my = (entryY + first.y) / 2;
  return `M ${first.x} ${entryY} Q ${mx} ${my} ${first.x} ${first.y}`;
}

/** Path from the last node on this page down off the viewport */
export function getOutgoingChunkPathD(nodes) {
  const pts = getNodeCentersPx(nodes);
  if (!pts.length) return '';
  const last = pts[pts.length - 1];
  const exitY = MAP_VIEWBOX.height + CHUNK_BRIDGE_OFFSET;
  const mx = last.x;
  const my = (last.y + exitY) / 2;
  return `M ${last.x} ${last.y} Q ${mx} ${my} ${last.x} ${exitY}`;
}

/** Position for the term-end sign on the final map page */
export function getTermEndMarkerPosition(nodes) {
  const pts = getNodeCentersPx(nodes);
  const { width, height } = MAP_VIEWBOX;
  if (!pts.length) {
    return { x: width * 0.5, y: height * 0.9 };
  }
  const last = pts[pts.length - 1];
  return {
    x: width * 0.5,
    y: Math.min(last.y + height * 0.14, height - 56),
  };
}

/** Path from the final level down to the term-end sign */
export function getTermEndPathD(nodes) {
  const pts = getNodeCentersPx(nodes);
  if (!pts.length) return '';
  const last = pts[pts.length - 1];
  const end = getTermEndMarkerPosition(nodes);
  const mx = (last.x + end.x) / 2;
  const my = (last.y + end.y) / 2;
  return `M ${last.x} ${last.y} Q ${mx} ${my} ${end.x} ${end.y}`;
}

/** Background trail segments for one map page (includes cross-page bridges) */
export function getChunkTrailPathDs(chunkNodes, chunkIndex) {
  const paths = [];
  if (chunkIndex > 0) {
    const incoming = getIncomingChunkPathD(chunkNodes);
    if (incoming) paths.push(incoming);
  }
  const main = getWorldMapPathD(chunkNodes);
  if (main) paths.push(main);
  if (isLastMapChunk(chunkIndex)) {
    const termEnd = getTermEndPathD(chunkNodes);
    if (termEnd) paths.push(termEnd);
  } else {
    const outgoing = getOutgoingChunkPathD(chunkNodes);
    if (outgoing) paths.push(outgoing);
  }
  return paths;
}

export function isIncomingChunkPathCleared(chunkIndex, progressMap) {
  const prevNode = getPreviousChunkLastNode(chunkIndex);
  return prevNode ? Boolean(progressMap[prevNode.lessonId]?.completed) : false;
}

export function isOutgoingChunkPathCleared(chunkNodes, progressMap) {
  const lastNode = chunkNodes[chunkNodes.length - 1];
  return lastNode ? Boolean(progressMap[lastNode.lessonId]?.completed) : false;
}

export function isTermEndPathCleared(chunkNodes, progressMap) {
  return isOutgoingChunkPathCleared(chunkNodes, progressMap);
}

/** Segment path between node index-1 and index on a page (index >= 1) */
export function getSegmentPathD(nodes, segmentIndex) {
  const pts = getNodeCentersPx(nodes);
  if (segmentIndex < 1 || segmentIndex >= pts.length) return '';
  const prev = pts[segmentIndex - 1];
  const curr = pts[segmentIndex];
  const mx = (prev.x + curr.x) / 2;
  const my = (prev.y + curr.y) / 2;
  return `M ${prev.x} ${prev.y} Q ${mx} ${my} ${curr.x} ${curr.y}`;
}

/** Segment cleared when the prior level on the path is completed */
export function isMapSegmentCleared(nodes, segmentIndex, progressMap) {
  if (segmentIndex < 1) return false;
  const prevNode = nodes[segmentIndex - 1];
  return Boolean(progressMap[prevNode.lessonId]?.completed);
}

/** Lesson id that must be completed before this map level (linear path) */
export function getPriorLessonIdForLevel(level) {
  const index = WORLD_MAP_NODES.findIndex((n) => n.level === level);
  if (index <= 0) return null;
  return WORLD_MAP_NODES[index - 1].lessonId;
}

export function getCurrentLessonId(progressMap) {
  return getNextPlayableLesson(progressMap)?.id ?? null;
}

/**
 * @returns {'locked' | 'current' | 'done' | 'open'}
 */
export function getMapNodeState(node, progressMap) {
  const lesson = getLessonById(node.lessonId);
  if (!lesson) return 'locked';
  const done = Boolean(progressMap[node.lessonId]?.completed);
  if (done) return 'done';
  if (!isLessonAccessible(lesson, progressMap)) return 'locked';
  const currentId = getCurrentLessonId(progressMap);
  if (node.lessonId === currentId) return 'current';
  return 'open';
}

export function getMapNodeIcon(node) {
  return getLessonSettingIcon(node.setting);
}

/** Completed levels can be tapped to replay; locked nodes cannot. */
export function isMapNodeTappable(node, progressMap) {
  const lesson = getLessonById(node.lessonId);
  if (!lesson || !isLessonPlayable(lesson)) return false;
  const state = getMapNodeState(node, progressMap);
  if (state === 'locked') return false;
  return state === 'done' || isLessonAccessible(lesson, progressMap);
}

export function getMapNodeAriaLabel(node, state, lessonTitle) {
  const place = node.name;
  const level = `Level ${node.level}`;
  const title = lessonTitle ?? place;
  if (state === 'locked') {
    const priorId = getPriorLessonIdForLevel(node.level);
    const prior = priorId ? getLessonById(priorId) : null;
    const need = prior?.villageReward?.label ?? prior?.title;
    return need
      ? `${level}: ${place}, locked. Complete ${need} first.`
      : `${level}: ${place}, locked`;
  }
  if (state === 'done') return `${level}: ${place}, completed. Tap to practice again. ${title}`;
  if (state === 'current') return `${level}: ${place}, your next lesson. ${title}`;
  return `${level}: ${place}. ${title}`;
}
