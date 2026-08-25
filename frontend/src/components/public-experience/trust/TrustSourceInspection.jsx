import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const APERTURE_GEOMETRIES = [
  { clip: 'circle(40% at 28% 32%)', focusTag: 'RAW INPUT CLUSTER & TIMESTAMPS' },
  { clip: 'circle(44% at 68% 28%)', focusTag: 'INFERRED VECTOR SPECTRUM' },
  { clip: 'circle(42% at 50% 68%)', focusTag: 'DETERMINISTIC WEIGHTING ASSEMBLY' },
  { clip: 'circle(46% at 76% 62%)', focusTag: 'OCCUPATIONAL BENCHMARK ALIGNMENT' },
  { clip: 'circle(48% at 38% 50%)', focusTag: 'SOVEREIGN DATA AUDIT LOG' },
];

export const TrustSourceInspection = () => {
  const data = PUBLIC_CONTENT.trust;
  const steps = data.recordStateSteps;
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const tabRefs = useRef([]);
  const currentStep = steps[activeStepIdx] || steps[0];
  const activeGeo = APERTURE_GEOMETRIES[activeStepIdx] || APERTURE_GEOMETRIES[0];
  const { prefersReducedMotion } = usePublicCapabilities();

  const handleKeyDown = (e, idx) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (idx + 1) % steps.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (idx - 1 + steps.length) % steps.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIdx = steps.length - 1;
    }

    if (nextIdx !== idx) {
      setActiveStepIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="pa-px-trust-page" data-route="trust">
      <header className="pa-px-trust-hero">
        <h1 className="pa-px-trust-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-trust-hero__support">{data.hero.support}</p>
      </header>

      {/* Tactile Provenance Aperture Stage with Real Clip-Path Reveal */}
      <section className="pa-px-trust-chain pa-px-aperture-chain-stage" aria-label="Evidence Chain of Custody">
        <div className="pa-px-aperture-selector" role="tablist" aria-label="Provenance layers">
          {steps.map((s, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <button
                key={s.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                type="button"
                role="tab"
                id={`trust-tab-${s.id}`}
                aria-controls={`trust-tabpanel-${s.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`pa-px-aperture-step-btn ${isSelected ? 'pa-px-aperture-step-btn--active' : ''}`}
                onClick={() => setActiveStepIdx(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span className="pa-px-data" style={{ marginRight: '6px' }}>0{idx + 1}.</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Composite Evidence Record with Aperture Mask Reveal */}
        <div
          id={`trust-tabpanel-${currentStep.id}`}
          role="tabpanel"
          aria-labelledby={`trust-tab-${currentStep.id}`}
          className="pa-px-aperture-inspector-card"
          data-transition-actor="trust-evidence-record"
          aria-live="polite"
        >
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
            {/* Base Image Layer */}
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Calibrated diagnostic signal analysis"
              priority={true}
            />

            {/* Dynamic Aperture Reveal Overlay Layer */}
            <div
              className="pa-px-aperture-reveal-layer"
              style={{
                clipPath: prefersReducedMotion ? 'none' : activeGeo.clip,
                WebkitClipPath: prefersReducedMotion ? 'none' : activeGeo.clip,
                transition: 'clip-path 360ms cubic-bezier(0.2, 0, 0, 1), -webkit-clip-path 360ms cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              <div className="pa-px-aperture-reticle">
                <span className="pa-px-data pa-px-aperture-reticle__tag">
                  APERTURE FOCUS: {activeGeo.focusTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Sovereign Rights Ledger */}
      <section className="pa-px-trust-rights pa-px-sovereign-ledger" aria-label="Sovereign Data Rights and Ledger">
        <header className="pa-px-sovereign-ledger__header">
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

