import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

export const ProgressLongitudinalExperience = () => {
  const data = PUBLIC_CONTENT.progress;
  const [temporalState, setTemporalState] = useState('baseline');

  return (
    <div className="pa-px-progress-page" data-route="progress">
      <header className="pa-px-progress-hero">
        <h1 className="pa-px-progress-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-progress-hero__support">{data.hero.support}</p>
      </header>

      <section className="pa-px-progress-stage" aria-label="Temporal Comparison Stage">
        <div className="pa-px-progress-controls">
          <span className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase' }}>
            Temporal Scrub:
          </span>
          <button
            type="button"
            className={`pa-px-btn-${temporalState === 'baseline' ? 'primary' : 'secondary'}`}
            style={{ height: '42px', padding: '0 20px', fontSize: '0.9rem' }}
            onClick={() => setTemporalState('baseline')}
          >
            Baseline Assessment Record
          </button>
          <button
            type="button"
            className={`pa-px-btn-${temporalState === 'later' ? 'primary' : 'secondary'}`}
            style={{ height: '42px', padding: '0 20px', fontSize: '0.9rem' }}
            onClick={() => setTemporalState('later')}
          >
            Later Responsibilities Context
          </button>
        </div>

        <div className="pa-px-progress-grid">
          <div className="pa-px-progress-pane">
            <div className="pa-px-progress-pane__tag">
              {temporalState === 'baseline' ? 'RECORD 01 (BASELINE)' : 'RECORD 02 (SHIFTED)'}
            </div>
            <h3 className="pa-px-progress-pane__title">
              {temporalState === 'baseline' ? 'Initial Diagnostic Inquiries' : 'Senior Systems Oversight Context'}
            </h3>
            <div className="pa-px-progress-pane__media">
              <PublicPicture
                assetKey={temporalState === 'baseline' ? 'homeSituationDetail' : 'workworldAutonomy'}
                alt="Longitudinal assessment context"
                priority={true}
              />
            </div>
            <p className="pa-px-body">
              {temporalState === 'baseline' ? data.stabilityFinding : data.adaptationFinding}
            </p>
            <div className="pa-px-data" style={{ marginTop: '12px' }}>
              {data.disclaimer}
            </div>
          </div>

          <div className="pa-px-progress-pane" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="pa-px-heading-md" style={{ marginBottom: '16px' }}>
              Persistent Evidence Integrity
            </h3>
            <p className="pa-px-body" style={{ marginBottom: '16px' }}>
              New assessments never overwrite or erase earlier psychometric baselines. They construct a longitudinal trajectory that traces how your strategic instincts scale into new responsibilities.
            </p>
            <div style={{ background: 'var(--pa-white)', padding: '16px', borderRadius: '2px', borderLeft: '3px solid var(--pa-evidence)' }}>
              <div className="pa-px-data" style={{ color: 'var(--pa-ink)', marginBottom: '4px' }}>
                OBSERVABLE TRAJECTORY
              </div>
              <p className="pa-px-body-sm">
                Held Signals: Conscientiousness, Risk Containment, Deep Technical Inquiry.<br />
                Adapted Signals: Cross-functional Coordination, Strategic Velocity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pa-px-progress-empty" aria-label="Start Baseline Record">
        <h2>{data.emptyState.headline}</h2>
        <p>{data.emptyState.support}</p>
        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
          {data.emptyState.cta}
        </Link>
      </section>
    </div>
  );
};

export const ProgressTemporalStage = ProgressLongitudinalExperience;
export default ProgressLongitudinalExperience;
