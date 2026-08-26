import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const ProgressLongitudinalExperience = () => {
  const data = PUBLIC_CONTENT.progress;
  const [temporalProgress, setTemporalProgress] = useState(0); // 0.0 to 1.0
  const { prefersReducedMotion } = usePublicCapabilities();

  const isLater = temporalProgress > 0.5;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setTemporalProgress((p) => Math.min(1, +(p + 0.05).toFixed(2)));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setTemporalProgress((p) => Math.max(0, +(p - 0.05).toFixed(2)));
    }
  };

  const p = temporalProgress;

  return (
    <div className="pa-px-progress-page" data-route="progress">
      <header className="pa-px-progress-hero">
        <h1 className="pa-px-progress-hero__headline">WHAT CHANGED. WHAT HELD.</h1>
        <p className="pa-px-progress-hero__support">
          Later assessments add evidence to your timeline without erasing your baseline.
        </p>
      </header>

      {/* Flagship Photographic Comparison Stage */}
      <section className="pa-px-progress-stage pa-px-temporal-scrub-stage" aria-label="Photographic Temporal Comparison">
        <div className="pa-px-temporal-morph-arena">
          {/* Dominant Overlapping Photographic Frame */}
          <div
            className="pa-px-temporal-morph-card"
            data-transition-actor="progress-baseline-record"
            aria-live="polite"
          >
            <div className="pa-px-temporal-morph-media">
              {/* Baseline Layer */}
              <div
                className="pa-px-temporal-morph-media__layer"
                style={{
                  opacity: 1 - p,
                  transform: prefersReducedMotion ? 'none' : `scale(${1 - p * 0.03})`,
                  transition: 'opacity 160ms ease',
                }}
              >
                <PublicPicture
                  assetKey="homeSituationDetail"
                  alt="Baseline inquiry context"
                  priority={true}
                />
              </div>

              {/* Later Shifted Layer */}
              <div
                className="pa-px-temporal-morph-media__layer"
                style={{
                  opacity: p,
                  transform: prefersReducedMotion ? 'none' : `scale(${0.97 + p * 0.03})`,
                  transition: 'opacity 160ms ease',
                }}
              >
                <PublicPicture
                  assetKey="workworldAutonomy"
                  alt="Shifted responsibilities context"
                />
              </div>

              {/* Stable Evidence Held Tag */}
              <div className="pa-px-temporal-stable-badge">
                <span className="pa-px-temporal-stable-dot" />
                <span>Held: &ldquo;clarify constraints first, choose smallest step&rdquo;</span>
              </div>
            </div>

            <div className="pa-px-temporal-morph-content">
              <div className="pa-px-temporal-morph-header">
                <span className="pa-px-temporal-morph__badge">
                  {isLater ? 'LATER RESPONSIBILITIES CONTEXT' : 'BASELINE PROVENANCE RECORD'}
                </span>
                <span className="pa-px-temporal-morph__readout">
                  {Math.round(p * 100)}%
                </span>
              </div>

              <p className="pa-px-temporal-morph-finding">
                {isLater ? data.adaptationFinding : data.stabilityFinding}
              </p>

              {/* Minimal Range Scrub Control */}
              <div className="pa-px-temporal-inline-scrub">
                <div className="pa-px-temporal-scrub-endpoints">
                  <button
                    type="button"
                    className={`pa-px-temporal-tick ${p <= 0.2 ? 'pa-px-temporal-tick--active' : ''}`}
                    onClick={() => setTemporalProgress(0)}
                  >
                    01. Baseline
                  </button>
                  <button
                    type="button"
                    className={`pa-px-temporal-tick ${p >= 0.8 ? 'pa-px-temporal-tick--active' : ''}`}
                    onClick={() => setTemporalProgress(1)}
                  >
                    02. Later Scope
                  </button>
                </div>

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
              </div>
            </div>
          </div>

          {/* Secondary Continuity Panel */}
          <div className="pa-px-temporal-continuity-pane">
            <span className="pa-px-continuity-tag">LONGITUDINAL INTEGRITY</span>
            <h2 className="pa-px-continuity-title">Persistent Evidence Baseline</h2>
            <p className="pa-px-continuity-text">
              When responsibilities expand, new assessments measure strategic adaptation while preserving your original problem-solving anchor.
            </p>

            <div className="pa-px-continuity-box">
              <div className="pa-px-continuity-box__label">
                OBSERVABLE BEHAVIORAL ANCHOR
              </div>
              <p className="pa-px-continuity-box__desc">
                Methodical boundary verification & small reversible experimentation.
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                {data.emptyState.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ProgressTemporalStage = ProgressLongitudinalExperience;
export default ProgressLongitudinalExperience;
