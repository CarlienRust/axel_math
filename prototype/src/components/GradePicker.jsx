import { GRADE_OPTIONS } from '../data/grades.js';

export function GradePicker({ selectedGrade, onSelect, compact = false }) {
  return (
    <div
      className={`grade-picker ${compact ? 'grade-picker--compact' : ''}`}
      role="listbox"
      aria-label="Select grade"
    >
      {GRADE_OPTIONS.map(({ grade, label, available, soonLabel }) => {
        const selected = selectedGrade === grade;
        if (available) {
          return (
            <button
              key={grade}
              type="button"
              role="option"
              aria-selected={selected}
              className={`grade-picker-option ${selected ? 'grade-picker-option--selected' : ''}`}
              onClick={() => onSelect?.(grade)}
            >
              <span className="grade-picker-label">{label}</span>
              {selected && (
                <span className="grade-picker-check" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          );
        }
        return (
          <div
            key={grade}
            role="option"
            aria-selected={false}
            aria-disabled="true"
            className="grade-picker-option grade-picker-option--disabled"
          >
            <span className="grade-picker-label">{label}</span>
            <span className="grade-picker-soon">{soonLabel}</span>
          </div>
        );
      })}
    </div>
  );
}
