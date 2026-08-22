import React, { useState, useRef } from 'react';
import MagneticTarget from '../motion/MagneticTarget';
import { useCursor } from '../motion/CursorCoordinator';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

export const HomeInspectionChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel, setApertureActive } = useCursor();
  const [isApertureRevealed, setIsApertureRevealed] = useState(false);
  const [activeTier, setActiveTier] = useState(0);
  const surfaceRef = useRef(null);

  const provenanceTiers = [
    { num: '01', name: 'You Supplied', desc: 'Direct contextual response to project deadline scenario.' },
    { num: '02', name: 'System Calculated', desc: 'Conscientiousness index & vocational interest vectors.' },
    { num: '03', name: 'System Compared', desc: 'Weighted against 17 role requirement condition matrices.' },
    { num: '04', name: 'AI Assisted', desc: 'Contextual commentary and developmental suggestions only.' },
    { num: '05', name: 'User Controlled', desc: 'Selective disclosure, sharing boundaries and verification state.' },
  ];

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
      data-tone="dark"
    >
      <div className="pa-home-inspection__stage">
        <div className="pa-home-inspection__header">
          <h2 className="pa-heading-major pa-home-inspection__h2">
            Inspect how a reading was built.
          </h2>
          <p className="pa-home-inspection__lead">
            Every score, radar dimension, and career alignment has clear provenance. The system distinguishes what you provided from what was calculated, compared, or generated.
          </p>
        </div>

        {/* Interactive Carbon Inspection Ground */}
        <div
          ref={surfaceRef}
          className={`pa-inspection-ground ${isApertureRevealed ? 'pa-inspection-ground--revealed' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          tabIndex="0"
          role="region"
          aria-label="Inspectable reading with provenance layers"
        >
          {/* Inspected Reading Object (Open Typography) */}
          <div className="pa-inspection-ground__reading">
            <div className="pa-inspection-ground__provenance-mark" aria-hidden="true" />
            <p className="pa-evidence-quote pa-inspection-ground__quote">
              “Prefers clear ownership and system boundaries before committing work.”
            </p>
            <span className="pa-inspection-ground__status">
              Source Record • Complete Provenance Chain (5 Tiers)
            </span>
          </div>

          {/* 5-State Provenance Path */}
          <div className="pa-inspection-ground__trace-path">
            {provenanceTiers.map((tier, idx) => {
              const isActive = activeTier === idx || isApertureRevealed;
              return (
                <button
                  key={tier.num}
                  type="button"
                  className={`pa-provenance-node ${isActive ? 'pa-provenance-node--active' : ''}`}
                  onClick={() => setActiveTier(idx)}
                  onFocus={() => setActiveTier(idx)}
                >
                  <span className="pa-provenance-node__num">{tier.num}</span>
                  <span className="pa-provenance-node__name">{tier.name}</span>
                  <p className="pa-provenance-node__desc">{tier.desc}</p>
                </button>
              );
            })}
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
            {isApertureRevealed ? 'Collapse provenance chain' : 'Inspect full provenance chain'}
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
