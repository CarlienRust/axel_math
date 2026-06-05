/** Learner grade options — pilot ships Grade 2 only */

export const DEFAULT_GRADE = 2;

export const GRADE_OPTIONS = Array.from({ length: 11 }, (_, i) => {
  const grade = i + 2;
  return {
    grade,
    label: `Grade ${grade}`,
    available: grade === DEFAULT_GRADE,
    soonLabel: grade === DEFAULT_GRADE ? null : 'coming soon',
  };
});

export function normalizeProfileGrade(profile) {
  const grade = profile?.grade ?? DEFAULT_GRADE;
  return isGradeAvailable(grade) ? grade : DEFAULT_GRADE;
}

export function isGradeAvailable(grade) {
  return grade === DEFAULT_GRADE;
}

export function getGradeLabel(grade) {
  return `Grade ${grade}`;
}
