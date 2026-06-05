/** Dynamic CPA + Visualise stage list per lesson */

export const STAGE_LABELS = {
  concrete: 'Concrete',
  pictorial: 'Pictorial',
  visualise: 'Visualise',
  abstract: 'Abstract',
};

const STEPPER_LABELS = {
  concrete: 'Concrete',
  pictorial: 'Pictorial',
  visualise: 'Picture',
  abstract: 'Abstract',
};

const PROGRESS_BY_COUNT = {
  3: { concrete: 25, pictorial: 55, abstract: 80 },
  4: { concrete: 20, pictorial: 40, visualise: 60, abstract: 80 },
};

export function getLessonStageIds(lesson) {
  const ids = ['concrete', 'pictorial'];
  if (lesson?.visualise) ids.push('visualise');
  ids.push('abstract');
  return ids;
}

export function getCpaStepperSteps(stageIds) {
  return stageIds.map((id, i) => ({
    id,
    num: i + 1,
    label: STEPPER_LABELS[id] ?? id,
  }));
}

export function getStageProgressPercent(stageId, stageIds) {
  const map = PROGRESS_BY_COUNT[stageIds.length] ?? PROGRESS_BY_COUNT[3];
  return map[stageId] ?? 0;
}

export function getStageLabel(stageId) {
  return STAGE_LABELS[stageId] ?? stageId;
}

/** Map saved checkpoint to a safe index when stage list changed */
export function resolveCheckpointStageIndex(checkpoint, stageIds) {
  if (!checkpoint) return 0;
  if (checkpoint.stageId && stageIds.includes(checkpoint.stageId)) {
    return stageIds.indexOf(checkpoint.stageId);
  }
  let idx = checkpoint.stageIndex ?? 0;
  const saved = checkpoint.stageIds;
  if (saved?.join(',') !== stageIds.join(',')) {
    if (saved?.length === 3 && stageIds.length === 4 && idx >= 2) {
      idx = Math.min(idx + 1, stageIds.length - 1);
    }
    if (saved?.length === 4 && stageIds.length === 3 && idx >= 2) {
      idx = Math.max(2, idx - 1);
    }
  }
  return Math.min(Math.max(0, idx), stageIds.length - 1);
}
