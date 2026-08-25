import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const ProgressLongitudinalExperience = () => {
  const data = PUBLIC_CONTENT.progress;
  const [temporalProgress, setTemporalProgress] = useState(0); // 0.0 (baseline) to 1.0 (later)
  const { prefersReducedMotion } = usePublicCapabilities();

  const isBaseline = temporalProgress < 0.30;
  const isOverlap = temporalProgress >= 0.30 && temporalProgress <= 0.70;
  const isLater = temporalProgress > 0.70;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setTemporalProgress((p) => Math.min(1, +(p + 0.05).toFixed(2)));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setTemporalProgress((p) => Math.max(0, +(p - 0.05).toFixed(2)));
    }
  };

  // Interpolated titles and findings across 3 semantic bands
  let phaseTitle = 'Direct Analytical Problem Navigation';
  let phaseBadge = 'RECORD 01 · BASELINE INQUIRY';
  let phaseFinding = data.stabilityFinding;

  if (isOverlap) {
    phaseTitle = 'Cross-Functional Scope Evolution';
    phaseBadge = 'LONGITUDINAL COMPARISON · OVERLAP STATE';
    phaseFinding = 'Pacing and constraint analysis remain steady while leadership delegation and architectural coordination expand.';
  } else if (isLater) {
    phaseTitle = 'Senior Systems & Strategic Execution';
    phaseBadge = 'RECORD 02 · SHIFTED RESPONSIBILITIES';
    phaseFinding = data.adaptationFinding;
  }

  // Multi-layer temporal crop and scale interpolation
  const p = temporalProgress;
  const baselineCropX = -4 * p;
  const baselineScale = 1 - 0.015 * p;
  const laterCropX = 5 * (1 - p);
  const laterScale = 1.03 - 0.03 * p;

  return (
    <div className="pa-px-progress-page" data-route="progress">
      <header className="pa-px-progress-hero">
        <h1 className="pa-px-progress-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-progress-hero__support">{data.hero.support}</p>
      </header>

      <section className="pa-px-progress-stage pa-px-temporal-scrub-stage" aria-label="Temporal Comparison Stage">
        {/* Continuous Temporal Scrub Track */}
        <div className="pa-px-temporal-control-dock">
          <div className="pa-px-temporal-control-dock__header">
            <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
              TEMPORAL SCRUB DOCK (DRAG &middot; TOUCH &middot; ARROW KEYS)
            </span>
            <span className="pa-px-data">
              Timeline: {Math.round(temporalProgress * 100)}% ({isLater ? 'Shifted Scope' : isOverlap ? 'Comparative Overlap' : 'Baseline State'})
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
              aria-valuetext={isLater ? 'Later Work Context' : isOverlap ? 'Comparative Overlap' : 'Baseline Assessment Record'}
            />
            <div className="pa-px-temporal-slider-ticks">
              <span
                className={`pa-px-temporal-tick ${temporalProgress <= 0.2 ? 'pa-px-temporal-tick--active' : ''}`}
                onClick={() => setTemporalProgress(0)}
              >
                01. Baseline Record (0%)
              </span>
              <span
                className={`pa-px-temporal-tick ${isOverlap ? 'pa-px-temporal-tick--active' : ''}`}
                onClick={() => setTemporalProgress(0.5)}
              >
                Overlap Band (50%)
              </span>
              <span
                className={`pa-px-temporal-tick ${temporalProgress >= 0.8 ? 'pa-px-temporal-tick--active' : ''}`}
                onClick={() => setTemporalProgress(1)}
              >
                02. Later Scope (100%)
              </span>
            </div>
          </div>
        </div>

        {/* Morphing Shared Evidence Actor Arena */}
        <div className="pa-px-temporal-morph-arena">
          <div
            className="pa-px-temporal-morph-card"
            data-transition-actor="progress-baseline-record"
            aria-live="polite"
          >
            <div className="pa-px-temporal-morph-media">
              <div
                className="pa-px-temporal-morph-media__layer"
                style={{
                  opacity: 1 - p,
                  transform: prefersReducedMotion
                    ? 'none'
                    : `scale(${baselineScale}) translate3d(${baselineCropX}%, 0, 0)`,
                  transition: 'opacity 180ms ease',
                }}
              >
                <PublicPicture
                  assetKey="homeSituationDetail"
                  alt="Initial baseline assessment context"
                  priority={true}
                />
              </div>
              <div
                className="pa-px-temporal-morph-media__layer"
                style={{
                  opacity: p,
                  transform: prefersReducedMotion
                    ? 'none'
                    : `scale(${laterScale}) translate3d(${laterCropX}%, 0, 0)`,
                  transition: 'opacity 180ms ease',
                }}
              >
                <PublicPicture
                  assetKey="workworldAutonomy"
                  alt="Shifted later responsibilities context"
                />
              </div>
            </div>

            <div className="pa-px-temporal-morph-content">
              <div className="pa-px-data pa-px-temporal-morph__badge">
                {phaseBadge}
              </div>
              <h2 className="pa-px-heading-subsection" style={{ marginTop: '6px', marginBottom: '8px' }}>
                {phaseTitle}
              </h2>
              <p className="pa-px-body">
                {phaseFinding}
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

