/** Serialize / restore in-lesson state for offline checkpoints */

import { getLessonStageIds, resolveCheckpointStageIndex } from './lessonStages.js';

export function buildCheckpointPayload(lessonId, lessonInstanceKey, state, lesson) {
  const stageIds = getLessonStageIds(lesson);
  const stageId = stageIds[state.stageIndex] ?? 'concrete';
  return {
    lessonId,
    lessonInstanceKey: lessonInstanceKey ?? lessonId,
    stageIds,
    stageId,
    stageIndex: state.stageIndex,
    concreteSelected: [...state.concreteSelected],
    pictorialChosen: state.pictorialChosen,
    pictorialFeedback: state.pictorialFeedback,
    abstractChosen: state.abstractChosen,
    abstractFeedback: state.abstractFeedback,
    bondStepIndex: state.bondStepIndex,
    bondChoice: state.bondChoice,
    bondFeedback: state.bondFeedback,
    introDismissed: Boolean(state.introDismissed),
    savedAt: Date.now(),
  };
}

export function checkpointMatchesLesson(checkpoint, lesson) {
  if (!checkpoint || checkpoint.lessonId !== lesson.id) return false;
  const key = lesson.instanceKey ?? lesson.id;
  return checkpoint.lessonInstanceKey === key;
}

export function readCheckpointSet(selected) {
  if (Array.isArray(selected)) return new Set(selected);
  return new Set();
}

export function applyCheckpointToIndex(checkpoint, lesson) {
  const stageIds = getLessonStageIds(lesson);
  return resolveCheckpointStageIndex(checkpoint, stageIds);
}
