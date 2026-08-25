import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

export const ProgressLongitudinalExperience = () => {
  const data = PUBLIC_CONTENT.progress;
  const [temporalProgress, setTemporalProgress] = useState(0); // 0.0 (baseline) to 1.0 (later)

  const isLater = temporalProgress > 0.5;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setTemporalProgress((p) => Math.min(1, +(p + 0.1).toFixed(2)));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setTemporalProgress((p) => Math.max(0, +(p - 0.1).toFixed(2)));
    }
  };

  return (
    <div className="pa-px-progress-page" data-route="progress">
      <header className="pa-px-progress-hero">
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
          LONGITUDINAL EVIDENCE TRAJECTORY &middot; CONTINUOUS TEMPORAL SCRUB
        </div>
        <h1 className="pa-px-progress-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-progress-hero__support">{data.hero.support}</p>
      </header>

      <section className="pa-px-progress-stage pa-px-temporal-scrub-stage" aria-label="Temporal Comparison Stage">
        {/* Continuous Temporal Scrub Track (Pointer Drag / Touch / Keyboard Accessible) */}
        <div className="pa-px-temporal-control-dock">
          <div className="pa-px-temporal-control-dock__header">
            <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
              TEMPORAL SCRUB CONTROL (DRAG &middot; TOUCH &middot; ARROW KEYS)
            </span>
            <span className="pa-px-data">
              Timeline: {Math.round(temporalProgress * 100)}% ({isLater ? 'Shifted Scope' : 'Baseline State'})
            </span>
          </div>

          <div className="pa-px-temporal-slider-track">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={temporalProgress}
              onChange={(e) => setTemporalProgress(parseFloat(e.target.value))}
              onKeyDown={handleKeyDown}
              className="pa-px-temporal-slider-input"
              aria-label="Continuous longitudinal timeline scrub"
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={temporalProgress}
              aria-valuetext={isLater ? 'Later Work Context' : 'Baseline Assessment Record'}
            />
            <div className="pa-px-temporal-slider-ticks">
              <span
                className={`pa-px-temporal-tick ${temporalProgress <= 0.2 ? 'pa-px-temporal-tick--active' : ''}`}
                onClick={() => setTemporalProgress(0)}
              >
                01. Baseline Record
              </span>
              <span
                className={`pa-px-temporal-tick ${temporalProgress >= 0.8 ? 'pa-px-temporal-tick--active' : ''}`}
                onClick={() => setTemporalProgress(1)}
              >
                02. Later Responsibilities
              </span>
            </div>
          </div>
        </div>

        {/* Morphing Shared Evidence Actor Arena */}
        <div className="pa-px-temporal-morph-arena">
          <div className="pa-px-temporal-morph-card" aria-live="polite">
            <div className="pa-px-temporal-morph-media">
              <div
                className="pa-px-temporal-morph-media__layer"
                style={{ opacity: 1 - temporalProgress }}
              >
                <PublicPicture
                  assetKey="homeSituationDetail"
                  alt="Initial baseline assessment context"
                  priority={true}
                />
              </div>
              <div
                className="pa-px-temporal-morph-media__layer"
                style={{ opacity: temporalProgress }}
              >
                <PublicPicture
                  assetKey="workworldAutonomy"
                  alt="Shifted later responsibilities context"
                />
              </div>
            </div>

            <div className="pa-px-temporal-morph-content">
              <div className="pa-px-data pa-px-temporal-morph__badge">
                {isLater ? 'RECORD 02 (SHIFTED RESPONSIBILITIES)' : 'RECORD 01 (BASELINE INQUIRY)'}
              </div>
              <h2 className="pa-px-heading-subsection" style={{ marginTop: '6px', marginBottom: '8px' }}>
                {isLater ? 'Senior Cross-Functional Scope' : 'Direct Analytical Problem Navigation'}
              </h2>
              <p className="pa-px-body">
                {isLater ? data.adaptationFinding : data.stabilityFinding}
              </p>
              <div className="pa-px-data" style={{ marginTop: '12px', color: 'var(--pa-evidence)' }}>
                {data.disclaimer} &middot; Held Signals: Conscientiousness, Risk Containment, Inquiry Depth
              </div>
            </div>
          </div>

          <div className="pa-px-temporal-continuity-pane">
            <h3 className="pa-px-heading-md" style={{ marginBottom: '12px' }}>
              Persistent Evidence Integrity
            </h3>
            <p className="pa-px-body" style={{ marginBottom: '16px' }}>
              Later assessments add evidence to your permanent timeline without erasing or mutating the earlier baseline. You can always trace what changed and what remained anchored.
            </p>
            <div className="pa-px-continuity-box">
              <div className="pa-px-data" style={{ color: 'var(--pa-ink)', marginBottom: '4px' }}>
                OBSERVABLE BEHAVIORAL TRAJECTORY
              </div>
              <p className="pa-px-body-sm">
                Stable Foundation: Clarifies boundaries first, chooses small reversible steps.<br />
                Scaled Adaptation: Translates methodical constraints to team-level operating rhythms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pa-px-progress-empty" aria-label="Start Baseline Record">
        <h2 className="pa-px-heading-section">{data.emptyState.headline}</h2>
        <p className="pa-px-lead" style={{ maxWidth: '54ch', margin: '0 auto 24px' }}>
          {data.emptyState.support}
        </p>
        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
          {data.emptyState.cta}
        </Link>
      </section>
    </div>
  );
};

export const ProgressTemporalStage = ProgressLongitudinalExperience;
export default ProgressLongitudinalExperience;
