import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

export const TrustSourceInspection = () => {
  const data = PUBLIC_CONTENT.trust;
  const steps = data.recordStateSteps;
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const currentStep = steps[activeStepIdx] || steps[0];

  return (
    <div className="pa-px-trust-page" data-route="trust">
      <header className="pa-px-trust-hero">
        <h1 className="pa-px-trust-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-trust-hero__support">{data.hero.support}</p>
      </header>

      <section className="pa-px-trust-chain" aria-label="Evidence Chain of Custody">
        <div className="pa-px-trust-steps-nav" role="tablist" aria-label="Provenance steps">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeStepIdx === idx}
              className={`pa-px-trust-step-btn ${activeStepIdx === idx ? 'pa-px-trust-step-btn--active' : ''}`}
              onClick={() => setActiveStepIdx(idx)}
            >
              <span className="pa-px-data" style={{ marginRight: '4px' }}>0{idx + 1}.</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        <div className="pa-px-trust-inspector-card" aria-live="polite">
          <div>
            <span className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase' }}>
              STEP {activeStepIdx + 1} OF 5: {currentStep.name}
            </span>
            <h3 className="pa-px-trust-inspector__title">{currentStep.title}</h3>
            <p className="pa-px-trust-inspector__desc">{currentStep.description}</p>
            <div className="pa-px-trust-inspector__details">
              {currentStep.details}
            </div>
          </div>

          <div className="pa-px-trust-inspector__media-plate">
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Calibrated diagnostic signal analysis"
              priority={true}
            />
          </div>
        </div>
      </section>

      <section className="pa-px-trust-rights" aria-label="Sovereign Data Rights">
        <h2>Sovereign Data Rights & Governance</h2>
        <div className="pa-px-trust-rights-grid">
          {data.rightsActions.map((action) => (
            <div key={action.id} className="pa-px-rights-card">
              <div>
                <h3>{action.label}</h3>
                <p>{action.description}</p>
              </div>
              <Link to={action.link}>
                Access in Account Settings &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const TrustInspectionStage = TrustSourceInspection;
export default TrustSourceInspection;
