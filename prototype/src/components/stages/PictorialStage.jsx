import { ListenButton } from '../ListenButton.jsx';
import { PictographBarChart } from '../PictographBarChart.jsx';
import { ProgressBar } from '../ProgressBar.jsx';

function DotGroup({ count }) {
  return (
    <div className="choice-dots">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="dot" />
      ))}
    </div>
  );
}

export function PictorialStage({ lesson, progressPercent, chosen, onChoose, feedback, onNext }) {
  const { pictorial } = lesson;

  if (pictorial.type === 'pickGroup') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span style={{ fontSize: '1.2rem' }}>{pictorial.icon ?? '🏪'}</span>
              <DotGroup count={opt.count} />
              <span className="choice-num">{opt.count}</span>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickGroupPair') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span style={{ fontSize: '1.2rem' }}>{pictorial.icon ?? '🛒'}</span>
              <div className="pair-dots">
                <DotGroup count={opt.countA} />
                <span className="pair-plus">+</span>
                <DotGroup count={opt.countB} />
              </div>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickRows') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span style={{ fontSize: '1.2rem' }}>{pictorial.icon ?? '🚕'}</span>
              <div className="rows-preview">
                {Array.from({ length: opt.groups }, (_, g) => (
                  <DotGroup key={g} count={opt.perGroup} />
                ))}
              </div>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickNumberLine') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span className="numberline-preview">{opt.start} → {opt.end}</span>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickSkipSequence') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span className="skip-seq">{opt.sequence.join(', ')}</span>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickPlaceValue') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span className="pv-card-label">{opt.tens} tens</span>
              <span className="pv-card-label">{opt.ones} ones</span>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickCompare') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span className="compare-pair">
                {opt.left} {opt.symbol} {opt.right}
              </span>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickPatternNext') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="pattern-strip pattern-strip-center">
          {pictorial.stem.map((t, i) => (
            <span key={i} className="pattern-tile">
              {t}
            </span>
          ))}
          <span className="pattern-tile pattern-unknown">?</span>
        </div>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <span className="pattern-tile">{opt.next}</span>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickShapeGroup') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <div className="choice-list">
          {pictorial.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`choice ${chosen === opt.id ? (opt.correct ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(opt.id)}
            >
              <div className="shape-row-preview">
                {opt.shapes.map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickPictograph') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <PictographBarChart
          chartTitle={pictorial.chartTitle}
          options={pictorial.options}
          chosen={chosen}
          onChoose={onChoose}
        />
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  if (pictorial.type === 'pickPictographValue') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-pictorial">Pictorial</span>
        <h1>{pictorial.title}</h1>
        <p className="subtitle">{pictorial.subtitle}</p>
        <PictographBarChart
          chartTitle={pictorial.chartTitle}
          options={pictorial.options}
          readOnly
          hint={null}
        />
        <div className="number-grid">
          {pictorial.numberOptions.map((n) => (
            <button
              key={n}
              type="button"
              className={`num-btn ${chosen === n ? (n === pictorial.answer ? 'correct' : 'wrong') : ''}`}
              onClick={() => onChoose(n)}
            >
              {n}
            </button>
          ))}
        </div>
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok success-pulse' : 'hint'}`}>{feedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.pictorial} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!feedback?.ok} onClick={onNext}>
          Next →
        </button>
      </div>
    );
  }

  return null;
}
