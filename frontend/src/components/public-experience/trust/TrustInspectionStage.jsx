import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const TrustInspectionStage = () => {
  const data = PUBLIC_CONTENT.trust;
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const steps = data.recordStateSteps;
  const currentStep = steps[activeStepIdx] || steps[0];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveStepIdx((prev) => (prev + 1) % steps.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveStepIdx((prev) => (prev - 1 + steps.length) % steps.length);
    }
  };

  return (
    <section className="pa-px-trust-section" aria-label="Trust & Provenance Chain">
      <div className="pa-px-trust-header">
        <h1>{data.hero.headline}</h1>
        <p className="pa-px-trust-lead">{data.hero.support}</p>
      </div>

      {/* The Single Persistent Record Object */}
      <div
        className="pa-px-trust-record-engine"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Interactive Record Transformation Engine (Use arrow keys to navigate stages)"
      >
        {/* Stage State Navigation Rail */}
        <nav className="pa-px-trust-stage-nav" aria-label="Record lifecycle stages">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              className={`pa-px-trust-stage-nav__btn ${idx === activeStepIdx ? 'pa-px-trust-stage-nav__btn--active' : ''}`}
              onClick={() => setActiveStepIdx(idx)}
              onFocus={() => setActiveStepIdx(idx)}
            >
              <span className="pa-px-trust-stage-nav__num">{idx + 1}</span>
              <span className="pa-px-trust-stage-nav__name">{step.name}</span>
            </button>
          ))}
        </nav>

        {/* The Live Transforming Record Representation */}
        <div className="pa-px-trust-record-display" aria-live="polite">
          <div className="pa-px-trust-record__status">
            State {activeStepIdx + 1} of 5: {currentStep.name}
          </div>

          <h2 className="pa-px-trust-record__title">{currentStep.title}</h2>
          <p className="pa-px-trust-record__desc">{currentStep.description}</p>

          <div className="pa-px-trust-record__details-layer">
            <span className="pa-px-trust-record__details-label">Inspected Evidence Trace:</span>
            <div className="pa-px-trust-record__details-body">{currentStep.details}</div>
          </div>

          {/* If at final 'controlled' state, render direct user rights demonstration */}
          {currentStep.id === 'controlled' && (
            <div className="pa-px-trust-rights-actions">
              <span className="pa-px-trust-rights__label">Sovereign Account Rights:</span>
              <div className="pa-px-trust-rights__list">
                {data.rightsActions.map((action) => (
                  <div key={action.id} className="pa-px-trust-right-row">
                    <strong>{action.label}:</strong> {action.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustInspectionStage;
