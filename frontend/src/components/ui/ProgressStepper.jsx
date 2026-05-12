import React from 'react';

/**
 * Horizontal stepper (labels only; state machine stays external).
 * @param {{ steps: { id: string, label: string }[], activeIndex: number, 'aria-label'?: string }} props
 */
export default function ProgressStepper({ steps = [], activeIndex = 0, 'aria-label': ariaLabel = 'Progress' }) {
  return (
    <nav className="progress-stepper" aria-label={ariaLabel}>
      <ol className="progress-stepper__list">
        {steps.map((step, index) => {
          const state = index < activeIndex ? 'complete' : index === activeIndex ? 'active' : 'upcoming';
          return (
            <li
              key={step.id}
              className={`progress-stepper__item progress-stepper__item--${state}`.trim()}
              aria-current={state === 'active' ? 'step' : undefined}
            >
              <span className="progress-stepper__bullet" aria-hidden="true">
                {index < activeIndex ? '✓' : index + 1}
              </span>
              <span className="progress-stepper__label">{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
