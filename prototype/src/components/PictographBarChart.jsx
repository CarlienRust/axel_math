/**
 * Single bar chart: all categories share one baseline and scale.
 */
export function PictographBarChart({
  chartTitle = 'Snack poll',
  options,
  chosen,
  onChoose,
  answerId,
  readOnly = false,
  hint = 'Tap the tallest bar',
}) {
  const maxCount = Math.max(...options.map((o) => o.count), 1);

  return (
    <div className="bar-chart card lesson-activity-card">
      <p className="bar-chart-heading">{chartTitle}</p>
      <div className="bar-chart-plot" role="group" aria-label={chartTitle}>
        <div className="bar-chart-bars">
          {options.map((opt) => {
            const heightPct = Math.round((opt.count / maxCount) * 100);
            const isChosen = chosen === opt.id;
            const isCorrect =
              opt.correct !== undefined ? opt.correct : opt.id === answerId;
            let stateClass = '';
            if (isChosen) {
              stateClass = isCorrect ? 'correct' : 'wrong';
            }

            const label = opt.name ?? opt.label;
            const emoji = opt.emoji ?? '';

            const columnContent = (
              <>
                <span className="bar-chart-value">{opt.count}</span>
                <div className="bar-chart-track">
                  <div
                    className="bar-chart-fill"
                    style={{ height: `${heightPct}%` }}
                    aria-hidden
                  />
                </div>
                {emoji && <span className="bar-chart-emoji">{emoji}</span>}
                <span className="bar-chart-label">{label}</span>
              </>
            );

            if (readOnly) {
              return (
                <div
                  key={opt.id}
                  className={`bar-chart-column bar-chart-column--static ${stateClass}`}
                  aria-label={`${label}, ${opt.count} votes`}
                >
                  {columnContent}
                </div>
              );
            }

            return (
              <button
                key={opt.id}
                type="button"
                className={`bar-chart-column ${stateClass}`}
                onClick={() => onChoose(opt.id)}
                aria-label={`${label}, ${opt.count} votes`}
                aria-pressed={isChosen}
              >
                {columnContent}
              </button>
            );
          })}
        </div>
        <div className="bar-chart-baseline" aria-hidden />
      </div>
      {hint && !readOnly && <p className="bar-chart-hint">{hint}</p>}
    </div>
  );
}
