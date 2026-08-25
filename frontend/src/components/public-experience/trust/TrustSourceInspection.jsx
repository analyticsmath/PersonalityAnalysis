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
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
          CHAIN OF CUSTODY &middot; PROVENANCE INSPECTION
        </div>
        <h1 className="pa-px-trust-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-trust-hero__support">{data.hero.support}</p>
      </header>

      {/* Tactile Provenance Aperture Stage */}
      <section className="pa-px-trust-chain pa-px-aperture-chain-stage" aria-label="Evidence Chain of Custody">
        <div className="pa-px-aperture-selector" role="tablist" aria-label="Provenance layers">
          {steps.map((s, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`pa-px-aperture-step-btn ${isSelected ? 'pa-px-aperture-step-btn--active' : ''}`}
                onClick={() => setActiveStepIdx(idx)}
              >
                <span className="pa-px-data" style={{ marginRight: '6px' }}>0{idx + 1}.</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Composite Evidence Record with Aperture Mask Reveal */}
        <div className="pa-px-aperture-inspector-card" aria-live="polite">
          <div className="pa-px-aperture-inspector__content">
            <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '6px' }}>
              PROVENANCE APERTURE: {currentStep.name.toUpperCase()} LAYER (0{activeStepIdx + 1}/05)
            </div>
            <h2 className="pa-px-heading-subsection" style={{ marginBottom: '8px' }}>
              {currentStep.title}
            </h2>
            <p className="pa-px-body" style={{ color: 'var(--pa-graphite)', marginBottom: '16px' }}>
              {currentStep.description}
            </p>

            <div className="pa-px-aperture-evidence-box">
              <div className="pa-px-data" style={{ color: 'var(--pa-ink)', marginBottom: '4px' }}>
                RECORD TELEMETRY &middot; ILLUSTRATIVE EXAMPLE
              </div>
              <p className="pa-px-body-sm" style={{ fontFamily: 'var(--pa-font-mono)', color: 'var(--pa-ink)' }}>
                {currentStep.details}
              </p>
            </div>
          </div>

          <div className="pa-px-aperture-inspector__media-frame">
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Calibrated diagnostic signal analysis"
              priority={true}
            />
            <div className="pa-px-aperture-glass-overlay">
              <div className="pa-px-data" style={{ color: '#FFF' }}>
                CALIBRATED PROVENANCE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Sovereign Rights Ledger */}
      <section className="pa-px-trust-rights pa-px-sovereign-ledger" aria-label="Sovereign Data Rights and Ledger">
        <header className="pa-px-sovereign-ledger__header">
          <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '6px' }}>
            SOVEREIGNTY &middot; USER RIGHTS
          </div>
          <h2 className="pa-px-heading-section">Sovereign Data Rights & Governance Ledger</h2>
          <p className="pa-px-lead" style={{ maxWidth: '64ch' }}>
            You maintain permanent legal and technical ownership over your assessment record.
          </p>
        </header>

        <div className="pa-px-sovereign-ledger__list" role="list">
          {data.rightsActions.map((action, idx) => (
            <article key={action.id} className="pa-px-sovereign-ledger__row" role="listitem">
              <div className="pa-px-data pa-px-sovereign-ledger__num">
                0{idx + 1}
              </div>
              <div className="pa-px-sovereign-ledger__body">
                <h3 className="pa-px-sovereign-ledger__title">{action.label}</h3>
                <p className="pa-px-body-sm">{action.description}</p>
              </div>
              <div className="pa-px-sovereign-ledger__action">
                <Link to={action.link} className="pa-px-btn-secondary">
                  Access in Settings &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export const TrustInspectionStage = TrustSourceInspection;
export default TrustSourceInspection;
