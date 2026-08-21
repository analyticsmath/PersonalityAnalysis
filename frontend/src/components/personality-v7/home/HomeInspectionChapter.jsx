import React, { useState, useRef } from 'react';
import MagneticTarget from '../motion/MagneticTarget';
import { useCursor } from '../motion/CursorCoordinator';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

export const HomeInspectionChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel, setApertureActive } = useCursor();
  const [isApertureRevealed, setIsApertureRevealed] = useState(false);
  const surfaceRef = useRef(null);

  const handleMouseEnter = () => {
    setCursorLabel('INSPECT');
    setApertureActive(true);
  };

  const handleMouseLeave = () => {
    clearCursorLabel();
    setApertureActive(false);
  };

  const toggleAperture = () => {
    setIsApertureRevealed((prev) => !prev);
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/trust');
  };

  return (
    <section
      className="pa-home-inspection"
      aria-label="Inspection & Provenance Chapter"
      data-tone="light"
    >
      <div className="pa-v7-grid pa-home-inspection__grid">
        <div className="pa-home-inspection__header">
          <span className="pa-provenance-tag">Verifiable Provenance</span>
          <h2 className="pa-heading-major pa-home-inspection__h2">
            Inspect how a reading was built.
          </h2>
          <p className="pa-home-inspection__lead">
            Every score, radar dimension, and career alignment has clear provenance. The system distinguishes what you provided from what was calculated, compared, or generated.
          </p>
        </div>

        {/* Interactive Contextual Inspection Surface */}
        <div
          ref={surfaceRef}
          className={`pa-inspection-surface ${isApertureRevealed ? 'pa-inspection-surface--revealed' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          tabIndex="0"
          role="region"
          aria-label="Inspectable reading with provenance layers"
        >
          {/* Surface Reading Layer */}
          <div className="pa-inspection-surface__foreground">
            <span className="pa-provenance-tag">Visible Reading Layer</span>
            <p className="pa-evidence-quote pa-inspection-surface__quote">
              “Prefers clear ownership and system boundaries before committing work.”
            </p>
            <p className="pa-inspection-surface__subtext">
              Hover cursor with pointer or use the button below to inspect provenance metadata.
            </p>
          </div>

          {/* Under-the-Hood Provenance Layer */}
          <div className="pa-inspection-surface__revealed-grid">
            <div className="pa-provenance-tier">
              <span className="pa-provenance-tier__tag">01 • You Supplied</span>
              <p className="pa-provenance-tier__value">
                Direct contextual response to project deadline scenario.
              </p>
            </div>

            <div className="pa-provenance-tier">
              <span className="pa-provenance-tier__tag">02 • System Calculated</span>
              <p className="pa-provenance-tier__value">
                Conscientiousness index & conventional interest vectors.
              </p>
            </div>

            <div className="pa-provenance-tier">
              <span className="pa-provenance-tier__tag">03 • System Compared</span>
              <p className="pa-provenance-tier__value">
                Weighted against 17 backend role requirement matrices.
              </p>
            </div>

            <div className="pa-provenance-tier">
              <span className="pa-provenance-tier__tag">04 • AI Assisted</span>
              <p className="pa-provenance-tier__value">
                Contextual commentary and development suggestions only.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pa-home-inspection__actions">
          <button
            type="button"
            className="pa-btn-primary-light pa-inspection-toggle-btn"
            onClick={toggleAperture}
            aria-pressed={isApertureRevealed}
          >
            {isApertureRevealed ? 'Hide provenance layer' : 'Inspect reading'}
          </button>

          <MagneticTarget>
            <a href="/trust" className="pa-btn-primary" onClick={handleCtaClick}>
              Explore trust & provenance &rarr;
            </a>
          </MagneticTarget>
        </div>
      </div>
    </section>
  );
};

export default HomeInspectionChapter;
