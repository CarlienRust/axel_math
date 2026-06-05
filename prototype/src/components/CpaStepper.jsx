import { getCpaStepperSteps, getLessonStageIds } from '../lib/lessonStages.js';

export function CpaStepper({ lesson, activeIndex = 0 }) {
  const steps = getCpaStepperSteps(getLessonStageIds(lesson));

  return (
    <div className="cpa-stepper" role="list" aria-label="Lesson stages">
      {steps.map((step, i) => {
        const state =
          i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'upcoming';
        return (
          <div
            key={step.id}
            className={`cpa-step cpa-step--${state} cpa-step--${step.id}`}
            role="listitem"
          >
            <span className="cpa-step-num">{step.num}</span>
            <span className="cpa-step-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
