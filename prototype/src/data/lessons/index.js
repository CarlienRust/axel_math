import { countingGroups } from './counting-groups.js';
import { countForwardsBack } from './count-forwards-back.js';
import { skipCount2510 } from './skip-count-2-5-10.js';
import { placeValueTensOnes } from './place-value-tens-ones.js';
import { compareOrderTo99 } from './compare-order-to-99.js';
import { numberBonds } from './number-bonds.js';
import { bondsTo20 } from './bonds-to-20.js';
import { additionWithin20 } from './addition-within-20.js';
import { additionWithin50 } from './addition-within-50.js';
import { subtractionWithin20 } from './subtraction-within-20.js';
import { patternCopyAb } from './pattern-copy-ab.js';
import { patternExtend } from './pattern-extend.js';
import { shapes2dSort } from './shapes-2d-sort.js';
import { shapes2dSides } from './shapes-2d-sides.js';
import { moneyCoinsSa } from './money-coins-sa.js';
import { timeDaysOrder } from './time-days-order.js';
import { dataFavouriteSnack } from './data-favourite-snack.js';
import { subtractionObjects } from './subtraction-objects.js';
import { multiplicationGrouping } from './multiplication-grouping.js';
import { term1Recap } from './term1-recap.js';

/** Grade 2 Term 1 path (map order = unlock order) */
export const PILOT_LESSONS = [
  countingGroups,
  countForwardsBack,
  skipCount2510,
  placeValueTensOnes,
  compareOrderTo99,
  numberBonds,
  bondsTo20,
  additionWithin20,
  additionWithin50,
  subtractionWithin20,
  patternCopyAb,
  patternExtend,
  shapes2dSort,
  shapes2dSides,
  moneyCoinsSa,
  timeDaysOrder,
  dataFavouriteSnack,
  subtractionObjects,
  multiplicationGrouping,
  term1Recap,
];

export function getLessonById(id) {
  return PILOT_LESSONS.find((l) => l.id === id) ?? null;
}

export function isLessonPlayable(lesson) {
  return Boolean(lesson?.playable && lesson.concrete);
}

/** Prior lesson on the linear map path (level N − 1) */
export function getPriorLessonInPath(lessonId) {
  const index = PILOT_LESSONS.findIndex((l) => l.id === lessonId);
  if (index <= 0) return null;
  return PILOT_LESSONS[index - 1].id;
}

export function arePrerequisitesMet(lesson, progressMap = {}) {
  const reqs = lesson?.prerequisiteLessonIds ?? [];
  return reqs.every((id) => progressMap[id]?.completed);
}

/** Map level N requires level N − 1 complete */
export function isLinearPathMet(lesson, progressMap = {}) {
  const priorId = getPriorLessonInPath(lesson?.id);
  if (!priorId) return true;
  return Boolean(progressMap[priorId]?.completed);
}

/** Playable, linear path, and CAPS prerequisites satisfied */
export function isLessonAccessible(lesson, progressMap = {}) {
  if (!isLessonPlayable(lesson)) return false;
  if (!isLinearPathMet(lesson, progressMap)) return false;
  return arePrerequisitesMet(lesson, progressMap);
}

export function getLessonLockMessage(lesson, progressMap = {}) {
  if (!lesson) return 'Locked';
  if (!lesson.playable || !lesson.concrete) {
    return lesson.lockReason ?? 'Coming in pilot';
  }
  if (!isLinearPathMet(lesson, progressMap)) {
    const priorId = getPriorLessonInPath(lesson.id);
    const prior = priorId ? getLessonById(priorId) : null;
    const need = prior?.villageReward?.label ?? prior?.title;
    if (need) return `Complete ${need} first`;
  }
  if (!arePrerequisitesMet(lesson, progressMap)) {
    const missing = (lesson.prerequisiteLessonIds ?? [])
      .filter((id) => !progressMap[id]?.completed)
      .map((id) => getLessonById(id)?.villageReward?.label ?? getLessonById(id)?.title ?? id);
    if (missing.length) return `Complete ${missing[0]} first`;
  }
  return null;
}

/** Next incomplete lesson in CAPS list order that the learner can start */
export function getNextPlayableLesson(progressMap, afterLessonId) {
  const startIdx = afterLessonId
    ? PILOT_LESSONS.findIndex((l) => l.id === afterLessonId) + 1
    : 0;
  for (let i = startIdx; i < PILOT_LESSONS.length; i++) {
    const lesson = PILOT_LESSONS[i];
    if (isLessonAccessible(lesson, progressMap) && !progressMap[lesson.id]?.completed) {
      return lesson;
    }
  }
  return null;
}
