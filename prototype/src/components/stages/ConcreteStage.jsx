import { useState } from 'react';
import { ListenButton } from '../ListenButton.jsx';
import { PictographBarChart } from '../PictographBarChart.jsx';
import { ProgressBar } from '../ProgressBar.jsx';

function PlaceValueCard({ label, tens, ones, icon }) {
  return (
    <div className="add-tens-ones-card card">
      {icon && <span className="add-tens-ones-icon">{icon}</span>}
      <span className="add-tens-ones-label">{label}</span>
      <span className="pv-card-label">{tens} tens</span>
      <span className="pv-card-label">{ones} ones</span>
    </div>
  );
}

function AddTensOnesPanel({ concrete, bondChoice, onBondPick, bondFeedback, onNext, narration }) {
  const [combined, setCombined] = useState(false);
  const ready = bondChoice === concrete.answer;

  return (
    <>
      <div className="add-tens-ones-row">
        <PlaceValueCard {...concrete.groupA} />
        <span className="add-tens-ones-plus">+</span>
        <PlaceValueCard {...concrete.groupB} />
      </div>
      {!combined ? (
        <button type="button" className="btn btn-ghost add-tens-ones-combine" onClick={() => setCombined(true)}>
          Put together →
        </button>
      ) : (
        <div className="card bond-card">
          <p className="add-tens-ones-prompt">{concrete.a} + {concrete.b} = ?</p>
          <div className="number-grid">
            {concrete.options.map((n) => (
              <button
                key={n}
                type="button"
                className={`num-btn ${bondChoice === n ? (n === concrete.answer ? 'correct' : 'wrong') : ''}`}
                onClick={() => onBondPick(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
      {bondFeedback && (
        <div className={`feedback ${bondFeedback.ok ? 'ok success-pulse' : 'hint'}`}>{bondFeedback.text}</div>
      )}
      <ListenButton text={narration} />
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
        {ready ? `${concrete.successLabel} Next →` : combined ? 'Pick the total…' : 'Put the groups together first…'}
      </button>
    </>
  );
}

function BuildPlaceValuePanel({ concrete, onNext, narration }) {
  const [value, setValue] = useState(0);
  const ready = value === concrete.target;
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <>
      <div className="card place-value-card">
        <p className="place-value-target">
          Build <strong>{concrete.target}</strong>
        </p>
        <div className="place-value-display">
          <span className="pv-tens">{tens} tens</span>
          <span className="pv-ones">{ones} ones</span>
          <span className="count-display pv-total">{value}</span>
        </div>
        <div className="pv-controls">
          <button type="button" className="btn btn-ghost pv-btn" onClick={() => setValue((v) => v + 10)}>
            +10
          </button>
          <button type="button" className="btn btn-ghost pv-btn" onClick={() => setValue((v) => Math.max(0, v - 10))}>
            −10
          </button>
          <button type="button" className="btn btn-ghost pv-btn" onClick={() => setValue((v) => v + 1)}>
            +1
          </button>
          <button type="button" className="btn btn-ghost pv-btn" onClick={() => setValue((v) => Math.max(0, v - 1))}>
            −1
          </button>
        </div>
      </div>
      <ListenButton text={narration} />
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
        {ready ? `${concrete.successLabel} Next →` : `Make ${concrete.target}…`}
      </button>
    </>
  );
}

function PickPatternTilesPanel({ concrete, onNext, narration }) {
  const [step, setStep] = useState(0);
  const pattern = concrete.pattern;
  const ready = step >= pattern.length;
  const pick = (tile) => {
    if (tile === pattern[step]) setStep((s) => s + 1);
  };

  return (
    <>
      <div className="card lesson-activity-card">
        <div className="pattern-strip">
          {pattern.map((t, i) => (
            <span key={i} className={`pattern-tile ${i < step ? 'done' : ''}`}>
              {t}
            </span>
          ))}
        </div>
        <div className="pattern-pick-row">
          {concrete.tileChoices.map((t) => (
            <button key={t} type="button" className="pattern-tile-btn" onClick={() => pick(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <ListenButton text={narration} />
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
        {ready ? `${concrete.successLabel} Next →` : 'Copy the pattern…'}
      </button>
    </>
  );
}

function PickDayOrderPanel({ concrete, onNext, narration }) {
  const [picked, setPicked] = useState([]);
  const order = concrete.correctOrder ?? concrete.days;
  const display = concrete.display ?? concrete.days;
  const ready = picked.length === order.length;
  const pick = (day) => {
    if (day === order[picked.length]) setPicked((p) => [...p, day]);
  };

  return (
    <>
      <div className="card lesson-activity-card">
        <div className="day-order-row">
          {display.map((d) => (
            <button
              key={d}
              type="button"
              className={`day-chip ${picked.includes(d) ? 'done' : ''}`}
              onClick={() => !picked.includes(d) && pick(d)}
              disabled={picked.includes(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <p className="order-picked">{picked.join(' → ') || 'Tap in order'}</p>
      </div>
      <ListenButton text={narration} />
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
        {ready ? `${concrete.successLabel} Next →` : 'Order the days…'}
      </button>
    </>
  );
}

function PickOrderPanel({ concrete, onNext, narration }) {
  const [picked, setPicked] = useState([]);
  const remaining = concrete.values.filter((v) => !picked.includes(v));
  const ready = picked.length === concrete.values.length;

  const pick = (n) => {
    const next = concrete.order === 'desc' ? [...picked, n] : [...picked, n];
    const sorted = [...concrete.values].sort((a, b) => (concrete.order === 'desc' ? b - a : a - b));
    const expected = sorted.slice(0, next.length);
    if (expected[next.length - 1] === n) setPicked(next);
  };

  return (
    <>
      <div className="card lesson-activity-card">
        <p className="order-hint">Tap from smallest to biggest</p>
        <div className="number-grid">
          {remaining.map((n) => (
            <button key={n} type="button" className="num-btn" onClick={() => pick(n)}>
              {n}
            </button>
          ))}
        </div>
        <p className="order-picked">Your order: {picked.join(' → ') || '—'}</p>
      </div>
      <ListenButton text={narration} />
      <div style={{ flex: 1 }} />
      <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
        {ready ? `${concrete.successLabel} Next →` : 'Tap in order…'}
      </button>
    </>
  );
}

export function ConcreteStage({
  lesson,
  progressPercent,
  selected,
  onToggle,
  onNext,
  bondStepIndex = 0,
  bondChoice = null,
  bondFeedback = null,
  onBondPick,
  onBondNext,
}) {
  const { concrete } = lesson;

  if (concrete.type === 'tapCount') {
    const count = selected.size;
    const ready = count === concrete.target;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card">
          <div className="tap-grid">
            {concrete.items.map((emoji, i) => (
              <button
                key={`${emoji}-${i}`}
                type="button"
                className={`tap-item ${selected.has(i) ? 'selected' : ''}`}
                onClick={() => onToggle(i)}
                aria-pressed={selected.has(i)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="count-display">{count}</div>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
            Tap each one · need {concrete.target}
          </p>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : `Count to ${concrete.target}…`}
        </button>
      </div>
    );
  }

  if (concrete.type === 'tapCombine') {
    const count = selected.size;
    const ready = count === concrete.target;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card">
          <p className="group-label">{concrete.groupA.label}</p>
          <div className="tap-grid">
            {concrete.groupA.items.map((emoji, i) => (
              <button
                key={`a-${i}`}
                type="button"
                className={`tap-item ${selected.has(`a-${i}`) ? 'selected' : ''}`}
                onClick={() => onToggle(`a-${i}`)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <p className="group-label">{concrete.groupB.label}</p>
          <div className="tap-grid">
            {concrete.groupB.items.map((emoji, i) => (
              <button
                key={`b-${i}`}
                type="button"
                className={`tap-item ${selected.has(`b-${i}`) ? 'selected' : ''}`}
                onClick={() => onToggle(`b-${i}`)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="count-display">{count}</div>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : `Count to ${concrete.target}…`}
        </button>
      </div>
    );
  }

  if (concrete.type === 'pickBondPartner') {
    const step = concrete.steps[bondStepIndex];
    const ready = bondFeedback?.ok;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card bond-card">
          <p className="bond-prompt">
            Make <strong>{concrete.targetSum}</strong>
          </p>
          <div className="bond-equation">
            <span className="bond-anchor">{step.anchor}</span>
            <span>+</span>
            <span className="bond-missing">?</span>
            <span>=</span>
            <span>{concrete.targetSum}</span>
          </div>
          <div className="number-grid">
            {step.options.map((n) => (
              <button
                key={n}
                type="button"
                className={`num-btn ${bondChoice === n ? (n === step.answer ? 'correct' : 'wrong') : ''}`}
                onClick={() => onBondPick(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="bond-step-label">
            Bond {bondStepIndex + 1} of {concrete.steps.length}
          </p>
        </div>
        {bondFeedback && (
          <div className={`feedback ${bondFeedback.ok ? 'ok success-pulse' : 'hint'}`}>
            {bondFeedback.text}
          </div>
        )}
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onBondNext}>
          {ready ? (bondStepIndex < concrete.steps.length - 1 ? 'Next bond →' : `${concrete.successLabel} Next →`) : 'Pick the partner…'}
        </button>
      </div>
    );
  }

  if (concrete.type === 'tapSubtract') {
    const removed = selected.size;
    const remaining = concrete.startCount - removed;
    const ready = removed === concrete.removeCount;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card">
          <div className="tap-grid">
            {concrete.items.map((emoji, i) => (
              <button
                key={`${emoji}-${i}`}
                type="button"
                className={`tap-item ${selected.has(i) ? 'removed' : ''}`}
                onClick={() => !selected.has(i) && onToggle(i)}
                disabled={selected.has(i)}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="count-display">{remaining}</div>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
            Tap {concrete.removeCount} to take away · {remaining} left
          </p>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : `Take away ${concrete.removeCount}…`}
        </button>
      </div>
    );
  }

  if (concrete.type === 'tapEqualGroups') {
    const total = concrete.groups * concrete.perGroup;
    const count = selected.size;
    const ready = count === total;
    const items = Array.from({ length: total }, (_, i) => ({
      emoji: concrete.icon,
      group: Math.floor(i / concrete.perGroup),
      index: i,
    }));
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card">
          {Array.from({ length: concrete.groups }, (_, g) => (
            <div key={g} className="equal-group-row">
              <span className="group-label">
                {concrete.groupLabel} {g + 1}
              </span>
              <div className="tap-grid compact">
                {items
                  .filter((it) => it.group === g)
                  .map((it) => (
                    <button
                      key={it.index}
                      type="button"
                      className={`tap-item small ${selected.has(it.index) ? 'selected' : ''}`}
                      onClick={() => onToggle(it.index)}
                    >
                      {it.emoji}
                    </button>
                  ))}
              </div>
            </div>
          ))}
          <div className="count-display">{count}</div>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
            Tap each wheel · {concrete.groups} groups of {concrete.perGroup}
          </p>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : `Count to ${total}…`}
        </button>
      </div>
    );
  }

  if (concrete.type === 'tapNumberLine') {
    const markers = Array.from({ length: concrete.steps + 1 }, (_, i) => concrete.start + i);
    const ready = markers.every((_, i) => selected.has(i));
    const current =
      selected.size === 0 ? concrete.start : concrete.start + selected.size - 1;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card number-line-card">
          <div className="number-line">
            {markers.map((n, i) => (
              <button
                key={n}
                type="button"
                className={`number-line-tick ${selected.has(i) ? 'selected' : ''}`}
                onClick={() => i === selected.size && onToggle(i)}
                disabled={i !== selected.size}
              >
                <span className="nlt-num">{n}</span>
              </button>
            ))}
          </div>
          <div className="count-display">{current}</div>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : 'Count on…'}
        </button>
      </div>
    );
  }

  if (concrete.type === 'tapSkipEvery') {
    const indices = concrete.items.map((_, i) => i).filter((i) => i % concrete.skip === 0);
    const ready = indices.every((i) => selected.has(i));
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card">
          <div className="tap-grid">
            {concrete.items.map((emoji, i) => (
              <button
                key={i}
                type="button"
                className={`tap-item ${selected.has(i) ? 'selected' : ''}`}
                onClick={() => onToggle(i)}
                disabled={i % concrete.skip !== 0}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="count-display">{selected.size}</div>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : `Count in ${concrete.skip}s…`}
        </button>
      </div>
    );
  }

  if (concrete.type === 'buildPlaceValue') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <BuildPlaceValuePanel concrete={concrete} onNext={onNext} narration={lesson.narration?.concrete} />
      </div>
    );
  }

  if (concrete.type === 'pickOrder') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <PickOrderPanel concrete={concrete} onNext={onNext} narration={lesson.narration?.concrete} />
      </div>
    );
  }

  if (concrete.type === 'pickPatternTiles') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <PickPatternTilesPanel
          concrete={concrete}
          onNext={onNext}
          narration={lesson.narration?.concrete}
        />
      </div>
    );
  }

  if (concrete.type === 'pickShapeBucket') {
    const targets = concrete.shapes.filter((s) => s.kind === concrete.targetKind);
    const ready = targets.every((s) => selected.has(s.id));
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card lesson-activity-card">
          <div className="shape-grid">
            {concrete.shapes.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`shape-btn ${selected.has(s.id) ? 'selected' : ''}`}
                onClick={() => s.kind === concrete.targetKind && onToggle(s.id)}
              >
                {s.emoji}
              </button>
            ))}
          </div>
        </div>
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : `Tap all ${concrete.targetLabel}…`}
        </button>
      </div>
    );
  }

  if (concrete.type === 'pickPictograph') {
    const ready = bondChoice === concrete.answer;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <PictographBarChart
          chartTitle={concrete.chartTitle}
          options={concrete.options}
          chosen={bondChoice}
          onChoose={onBondPick}
          answerId={concrete.answer}
        />
        {bondFeedback && (
          <div className={`feedback ${bondFeedback.ok ? 'ok success-pulse' : 'hint'}`}>{bondFeedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : 'Tap the tallest bar…'}
        </button>
      </div>
    );
  }

  if (concrete.type === 'pickCoin') {
    const ready = bondChoice === concrete.answer;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="coin-grid">
          {concrete.coins.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`coin-btn coin-btn--${c.id} ${bondChoice === c.id ? (c.id === concrete.answer ? 'correct' : 'wrong') : ''}`}
              onClick={() => onBondPick(c.id)}
            >
              <span className="coin-emoji">{c.emoji}</span>
              <span className="coin-label">{c.label}</span>
            </button>
          ))}
        </div>
        {bondFeedback && (
          <div className={`feedback ${bondFeedback.ok ? 'ok success-pulse' : 'hint'}`}>{bondFeedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : 'Pick the coin…'}
        </button>
      </div>
    );
  }

  if (concrete.type === 'pickDayOrder') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <PickDayOrderPanel
          concrete={concrete}
          onNext={onNext}
          narration={lesson.narration?.concrete}
        />
      </div>
    );
  }

  if (concrete.type === 'addTensOnes') {
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <AddTensOnesPanel
          concrete={concrete}
          bondChoice={bondChoice}
          onBondPick={onBondPick}
          bondFeedback={bondFeedback}
          onNext={onNext}
          narration={lesson.narration?.concrete}
        />
      </div>
    );
  }

  if (concrete.type === 'pickSum') {
    const ready = bondChoice === concrete.answer;
    return (
      <div className="lesson-stage">
        <ProgressBar percent={progressPercent} />
        <span className="stage-tag stage-concrete">Concrete</span>
        <h1>{concrete.title}</h1>
        <p className="subtitle">{concrete.subtitle}</p>
        <div className="card bond-card">
          <div className="bond-equation">
            <span className="bond-anchor">{concrete.a}</span>
            <span>+</span>
            <span className="bond-anchor">{concrete.b}</span>
            <span>=</span>
            <span className="bond-missing">?</span>
          </div>
          <div className="number-grid">
            {concrete.options.map((n) => (
              <button
                key={n}
                type="button"
                className={`num-btn ${bondChoice === n ? (n === concrete.answer ? 'correct' : 'wrong') : ''}`}
                onClick={() => onBondPick(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        {bondFeedback && (
          <div className={`feedback ${bondFeedback.ok ? 'ok success-pulse' : 'hint'}`}>{bondFeedback.text}</div>
        )}
        <ListenButton text={lesson.narration?.concrete} />
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn-primary" disabled={!ready} onClick={onNext}>
          {ready ? `${concrete.successLabel} Next →` : 'Pick the total…'}
        </button>
      </div>
    );
  }

  return null;
}
