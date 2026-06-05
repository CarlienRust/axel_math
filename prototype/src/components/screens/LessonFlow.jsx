import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trackAnswer, trackLessonComplete, trackLessonStart, trackStageComplete } from '../../lib/analytics.js';
import {
  applyCheckpointToIndex,
  buildCheckpointPayload,
  checkpointMatchesLesson,
  readCheckpointSet,
} from '../../lib/lessonCheckpoint.js';
import {
  getLessonStageIds,
  getStageProgressPercent,
} from '../../lib/lessonStages.js';
import { CpaStepper } from '../CpaStepper.jsx';
import { AxelTip } from '../AxelTip.jsx';
import { ListenButton } from '../ListenButton.jsx';
import { AbstractStage } from '../stages/AbstractStage.jsx';
import { ConcreteStage } from '../stages/ConcreteStage.jsx';
import { PictorialStage } from '../stages/PictorialStage.jsx';
import { VisualiseStage } from '../stages/VisualiseStage.jsx';
import { LessonIntroCard } from '../LessonIntroCard.jsx';

const CHECKPOINT_DEBOUNCE_MS = 400;

function resetLessonState(setters) {
  setters.setStageIndex(0);
  setters.setIntroDismissed(false);
  setters.setConcreteSelected(new Set());
  setters.setPictorialChosen(null);
  setters.setPictorialFeedback(null);
  setters.setAbstractChosen(null);
  setters.setAbstractFeedback(null);
  setters.setBondStepIndex(0);
  setters.setBondChoice(null);
  setters.setBondFeedback(null);
}

function applyCheckpoint(setters, checkpoint, lesson) {
  setters.setStageIndex(applyCheckpointToIndex(checkpoint, lesson));
  setters.setConcreteSelected(readCheckpointSet(checkpoint.concreteSelected));
  setters.setPictorialChosen(checkpoint.pictorialChosen ?? null);
  setters.setPictorialFeedback(checkpoint.pictorialFeedback ?? null);
  setters.setAbstractChosen(checkpoint.abstractChosen ?? null);
  setters.setAbstractFeedback(checkpoint.abstractFeedback ?? null);
  setters.setBondStepIndex(checkpoint.bondStepIndex ?? 0);
  setters.setBondChoice(checkpoint.bondChoice ?? null);
  setters.setBondFeedback(checkpoint.bondFeedback ?? null);
  setters.setIntroDismissed(
    checkpoint.introDismissed ?? (checkpoint.stageIndex > 0),
  );
}

export function LessonFlow({
  lesson,
  isReplay = false,
  initialCheckpoint = null,
  onCheckpointSave,
  onComplete,
  onExit,
}) {
  const stageIds = useMemo(() => getLessonStageIds(lesson), [lesson]);
  const [stageIndex, setStageIndex] = useState(0);
  const [concreteSelected, setConcreteSelected] = useState(() => new Set());
  const [pictorialChosen, setPictorialChosen] = useState(null);
  const [pictorialFeedback, setPictorialFeedback] = useState(null);
  const [abstractChosen, setAbstractChosen] = useState(null);
  const [abstractFeedback, setAbstractFeedback] = useState(null);
  const [bondStepIndex, setBondStepIndex] = useState(0);
  const [bondChoice, setBondChoice] = useState(null);
  const [bondFeedback, setBondFeedback] = useState(null);
  const [introDismissed, setIntroDismissed] = useState(false);

  const setters = {
    setStageIndex,
    setConcreteSelected,
    setPictorialChosen,
    setPictorialFeedback,
    setAbstractChosen,
    setAbstractFeedback,
    setBondStepIndex,
    setBondChoice,
    setBondFeedback,
    setIntroDismissed,
  };

  const stage = stageIds[stageIndex] ?? 'concrete';
  const progressPercent = getStageProgressPercent(stage, stageIds);
  const debounceRef = useRef(null);

  const collectState = useCallback(
    () => ({
      stageIndex,
      introDismissed,
      concreteSelected,
      pictorialChosen,
      pictorialFeedback,
      abstractChosen,
      abstractFeedback,
      bondStepIndex,
      bondChoice,
      bondFeedback,
    }),
    [
      stageIndex,
      introDismissed,
      concreteSelected,
      pictorialChosen,
      pictorialFeedback,
      abstractChosen,
      abstractFeedback,
      bondStepIndex,
      bondChoice,
      bondFeedback,
    ],
  );

  const flushCheckpoint = useCallback(
    (stateOverride = null) => {
      if (isReplay || !onCheckpointSave) return;
      const state = stateOverride ?? collectState();
      if (state.stageIndex <= 0 && !state.introDismissed) return;
      onCheckpointSave(
        buildCheckpointPayload(lesson.id, lesson.instanceKey ?? lesson.id, state, lesson),
      );
    },
    [collectState, isReplay, lesson, onCheckpointSave],
  );

  const scheduleCheckpoint = useCallback(
    (stateOverride = null) => {
      if (isReplay || !onCheckpointSave) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => flushCheckpoint(stateOverride), CHECKPOINT_DEBOUNCE_MS);
    },
    [flushCheckpoint, isReplay, onCheckpointSave],
  );

  useEffect(() => {
    trackLessonStart(lesson.id);
  }, [lesson.id]);

  useEffect(() => {
    if (initialCheckpoint && checkpointMatchesLesson(initialCheckpoint, lesson)) {
      applyCheckpoint(setters, initialCheckpoint, lesson);
      return;
    }
    resetLessonState(setters);
  }, [lesson.id, lesson.instanceKey, initialCheckpoint]);

  useEffect(() => {
    scheduleCheckpoint();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [scheduleCheckpoint]);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      flushCheckpoint();
    },
    [flushCheckpoint],
  );

  const toggleConcrete = (key) => {
    setConcreteSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const goNextStage = () => {
    trackStageComplete(lesson.id, stage);
    if (stageIndex < stageIds.length - 1) {
      const nextIndex = stageIndex + 1;
      const nextStage = stageIds[nextIndex];
      const nextPictorial =
        nextStage === 'abstract' ? { chosen: null, feedback: null } : { chosen: pictorialChosen, feedback: pictorialFeedback };
      setStageIndex(nextIndex);
      setAbstractChosen(null);
      setAbstractFeedback(null);
      if (nextStage === 'abstract') {
        setPictorialChosen(null);
        setPictorialFeedback(null);
      }
      flushCheckpoint({
        ...collectState(),
        stageIndex: nextIndex,
        pictorialChosen: nextPictorial.chosen,
        pictorialFeedback: nextPictorial.feedback,
        abstractChosen: null,
        abstractFeedback: null,
      });
    } else {
      trackLessonComplete(lesson.id, {
        stars: 3,
        capsTopics: lesson.capsTopics,
        caps: lesson.capsGrade,
      });
      onComplete();
    }
  };

  const choosePictorial = (value) => {
    const { pictorial } = lesson;
    setPictorialChosen(value);
    let ok = false;
    if (pictorial.type === 'pickPictographValue') {
      ok = value === pictorial.answer;
    } else {
      const opt = pictorial.options?.find((o) => o.id === value);
      ok = Boolean(opt?.correct);
    }
    trackAnswer(lesson.id, 'pictorial', ok);
    setPictorialFeedback({
      ok,
      text: ok ? pictorial.feedbackCorrect : pictorial.feedbackWrong,
    });
  };

  const chooseAbstract = (n) => {
    const { abstract } = lesson;
    setAbstractChosen(n);
    let ok = false;
    if (abstract.type === 'pickPictographCompare') {
      ok = Boolean(abstract.choices.find((o) => o.id === n)?.correct);
    } else if (abstract.type === 'pickChoice' || abstract.type === 'pickPictograph') {
      ok = Boolean(abstract.options?.find((o) => o.id === n)?.correct);
    } else if (abstract.type === 'pickSymbol') {
      ok = n === abstract.answer;
    } else {
      ok = n === abstract.answer;
    }
    trackAnswer(lesson.id, 'abstract', ok);
    setAbstractFeedback({
      ok,
      text: ok ? abstract.feedbackCorrect : abstract.feedbackWrong,
    });
  };

  const handleBondPick = (value) => {
    const { concrete } = lesson;
    setBondChoice(value);
    let ok = false;
    let text = '';

    if (concrete.type === 'pickBondPartner') {
      const step = concrete.steps[bondStepIndex];
      ok = value === step.answer;
      text = ok
        ? step.successText ?? `Yes! ${step.anchor} + ${step.answer} = ${concrete.targetSum}.`
        : `Which number partners with ${step.anchor} to make ${concrete.targetSum}?`;
    } else if (concrete.type === 'pickSum' || concrete.type === 'addTensOnes') {
      ok = value === concrete.answer;
      text = ok
        ? (concrete.successText ?? `Yes! ${concrete.a} + ${concrete.b} = ${concrete.answer}.`)
        : 'Pick the total.';
    } else if (concrete.type === 'pickCoin') {
      ok = value === concrete.answer;
      const coin = concrete.coins.find((c) => c.id === value);
      text = ok ? `Yes! ${coin?.label ?? 'Correct coin.'}` : 'Try another coin.';
    } else if (concrete.type === 'pickPictograph') {
      ok = value === concrete.answer;
      text = ok
        ? (concrete.feedbackCorrect ?? 'Yes! Tallest bar.')
        : (concrete.feedbackWrong ?? 'Look for the tallest bar.');
    }

    trackAnswer(lesson.id, 'concrete', ok);
    setBondFeedback({ ok, text });
  };

  const handleBondNext = () => {
    if (!bondFeedback?.ok) return;
    if (bondStepIndex < lesson.concrete.steps.length - 1) {
      setBondStepIndex((i) => i + 1);
      setBondChoice(null);
      setBondFeedback(null);
    } else {
      goNextStage();
    }
  };

  const narrationForStage = () => {
    if (stage === 'concrete') return lesson.narration?.concrete;
    if (stage === 'pictorial') return lesson.narration?.pictorial;
    if (stage === 'visualise') return lesson.narration?.visualise ?? lesson.visualise?.prompt;
    return lesson.narration?.abstract;
  };

  const stageTip =
    stage === 'concrete'
      ? lesson.concrete?.subtitle
      : stage === 'pictorial'
        ? lesson.pictorial?.subtitle
        : stage === 'visualise'
          ? lesson.visualise?.subtitle ?? lesson.visualise?.prompt
          : lesson.abstract?.subtitle;

  const axelMood =
    (stage === 'concrete' && bondFeedback?.ok) ||
    (stage === 'pictorial' && pictorialFeedback?.ok) ||
    (stage === 'visualise') ||
    (stage === 'abstract' && abstractFeedback?.ok)
      ? 'happy'
      : 'guide';

  return (
    <div className="screen lesson-flow">
      {isReplay && (
        <p className="lesson-replay-banner" role="status">
          Practice round — new numbers
        </p>
      )}
      <div className="lesson-flow-nav">
        <button type="button" className="back-link" onClick={onExit}>
          ← Back to map
        </button>
        <ListenButton text={narrationForStage()} className="listen-btn-compact" />
      </div>
      <div className="lesson-flow-body">
        <CpaStepper lesson={lesson} activeIndex={stageIndex} />

        {stageIndex === 0 && lesson.contextProblem?.prompt && (
          <div className="context-problem card story-sum-card">
            <p className="context-problem-label">Story sum</p>
            <p className="context-problem-text">{lesson.contextProblem.prompt}</p>
            <ListenButton text={lesson.contextProblem.prompt} />
          </div>
        )}
        <AxelTip text={stageTip} mood={axelMood} />
        {stage === 'concrete' && lesson.intro && !introDismissed && (
          <LessonIntroCard
            intro={lesson.intro}
            onContinue={() => {
              setIntroDismissed(true);
              scheduleCheckpoint({ ...collectState(), introDismissed: true });
            }}
          />
        )}
        {stage === 'concrete' && (!lesson.intro || introDismissed) && (
          <ConcreteStage
            lesson={lesson}
            progressPercent={progressPercent}
            selected={concreteSelected}
            onToggle={toggleConcrete}
            onNext={goNextStage}
            bondStepIndex={bondStepIndex}
            bondChoice={bondChoice}
            bondFeedback={bondFeedback}
            onBondPick={handleBondPick}
            onBondNext={handleBondNext}
          />
        )}
        {stage === 'pictorial' && (
          <PictorialStage
            lesson={lesson}
            progressPercent={progressPercent}
            chosen={pictorialChosen}
            onChoose={choosePictorial}
            feedback={pictorialFeedback}
            onNext={goNextStage}
          />
        )}
        {stage === 'visualise' && lesson.visualise && (
          <VisualiseStage
            lesson={lesson}
            progressPercent={progressPercent}
            onNext={goNextStage}
          />
        )}
        {stage === 'abstract' && (
          <AbstractStage
            lesson={lesson}
            progressPercent={progressPercent}
            chosen={abstractChosen}
            onChoose={chooseAbstract}
            feedback={abstractFeedback}
            onNext={goNextStage}
          />
        )}
      </div>
    </div>
  );
}
