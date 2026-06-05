import { ListenButton } from '../ListenButton.jsx';
import { PictographBarChart } from '../PictographBarChart.jsx';
import { ProgressBar } from '../ProgressBar.jsx';

export function AbstractStage({
  lesson,
  progressPercent,
  chosen,
  onChoose,
  feedback,
  onNext,
  finishLabel = 'Finish lesson →',
}) {
  const { abstract } = lesson;

  if (abstract.type === 'pickNumber') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-abstract">Abstract</span>
        <h1>{abstract.title}</h1>
        <p className="subtitle">{abstract.subtitle}</p>
        <div
          className="card lesson-activity-card"
          style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}
        >
          {abstract.visual}
          <div style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--muted)', marginTop: 8 }}>= ?</div>
        </div>
        <div className="number-grid">
          {abstract.options.map((n) => (
            <button
              key={n}
              type="button"
              className={`num-btn ${chosen === n ? (n === abstract.answer ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(n)}
            >
              {n}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.abstract} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          {finishLabel}
        </button>
      </div>
    );
  }

  if (abstract.type === 'pickEquation') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-abstract">Abstract</span>
        <h1>{abstract.title}</h1>
        <p className="subtitle">{abstract.subtitle}</p>
        <div className="card equation-card">{abstract.equation}</div>
        <div className="number-grid">
          {abstract.options.map((n) => (
            <button
              key={n}
              type="button"
              className={`num-btn ${chosen === n ? (n === abstract.answer ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(n)}
            >
              {n}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.abstract} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          {finishLabel}
        </button>
      </div>
    );
  }

  if (abstract.type === 'pickSymbol') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-abstract">Abstract</span>
        <h1>{abstract.title}</h1>
        <p className="subtitle">{abstract.subtitle}</p>
        <div className="card equation-card">{abstract.equation}</div>
        <div className="symbol-grid">
          {abstract.options.map((sym) => (
            <button
              key={sym}
              type="button"
              className={`num-btn symbol-btn ${chosen === sym ? (sym === abstract.answer ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(sym)}
            >
              {sym}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.abstract} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          {finishLabel}
        </button>
      </div>
    );
  }

  if (abstract.type === 'pickPictograph') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-abstract">Abstract</span>
        <h1>{abstract.title}</h1>
        <p className="subtitle">{abstract.subtitle}</p>
        <PictographBarChart
          chartTitle={abstract.chartTitle}
          options={abstract.options}
          chosen={chosen}
          onChoose={onChoose}
          answerId={abstract.answer}
        />
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.abstract} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          {finishLabel}
        </button>
      </div>
    );
  }

  if (abstract.type === 'pickPictographCompare') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-abstract">Abstract</span>
        <h1>{abstract.title}</h1>
        <p className="subtitle">{abstract.subtitle}</p>
        <PictographBarChart
          chartTitle={abstract.chartTitle}
          options={abstract.options}
          readOnly
          hint={null}
        />
        <div className="choice-list">
          {abstract.choices.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.abstract} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          {finishLabel}
        </button>
      </div>
    );
  }

  if (abstract.type === 'pickChoice') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-abstract">Abstract</span>
        <h1>{abstract.title}</h1>
        <p className="subtitle">{abstract.subtitle}</p>
        <div className="choice-list">
          {abstract.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.abstract} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          {finishLabel}
        </button>
      </div>
    );
  }

  return null;
}
