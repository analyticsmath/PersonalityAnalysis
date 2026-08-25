/**
 * Personality Assessor - Home Provenance & Time Stage
 * Temporal Double Exposure ("WHAT HOLDS WHEN THE WORK CHANGES?")
 * and Inspectable Provenance Record ("SHOW ME WHERE THAT CAME FROM.")
 * with interactive inspection aperture and keyboard accessibility.
 */

import React, { useState, useRef } from 'react';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';

export const HomeProvenance = () => {
  const [aperturePos, setAperturePos] = useState({ x: 50, y: 50 });
  const [isInspecting, setIsInspecting] = useState(false);
  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setAperturePos({ x, y });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsInspecting((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsInspecting(false);
    }
  };

  return (
    <div className="pa-px-provenance-time-root" aria-hidden="false">
      {/* ── S6: Time Exposure Temporal Double Exposure ── */}
      <div className="pa-px-time-stage" aria-label="Temporal Stability Exposure">
        <div className="pa-px-time-header">
          <h2 className="pa-px-time-title">WHAT HOLDS WHEN THE WORK CHANGES?</h2>
          <p className="pa-px-time-support">
            Revisit your profile as your responsibilities shift to inspect what stayed stable, what moved, and what context changed around it.
          </p>
        </div>

        <div className="pa-px-time-visual-stage">
          {/* Baseline Temporal Plane */}
          <div className="pa-px-time-baseline-wrapper">
            <PersistentMediaSlot
              actorId="home-time-baseline"
              slotId="time-baseline-slot"
              assetKey="homeWorldEntry"
              alt="Baseline contextual environment record"
            />
            <span className="pa-px-time-tag pa-px-tag--baseline">BASELINE RECORD</span>
          </div>

          {/* Later Work Context Plane (Masked Double Exposure) */}
          <div className="pa-px-time-later-wrapper">
            <PersistentMediaSlot
              actorId="home-time-later"
              slotId="time-later-slot"
              assetKey="careerSynthesis"
              alt="Later technical responsibility context"
            />
            <span className="pa-px-time-tag pa-px-tag--later">LATER WORK CONTEXT</span>
          </div>
        </div>
      </div>

      {/* ── S7: Provenance Inspection Aperture Stage ── */}
      <div
        ref={containerRef}
        className={`pa-px-provenance-stage ${isInspecting ? 'is-active' : ''}`}
        aria-label="Inspectable Provenance Record"
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsInspecting(true)}
        onPointerLeave={() => setIsInspecting(false)}
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        <div className="pa-px-provenance-header">
          <h2 className="pa-px-provenance-title">SHOW ME WHERE THAT CAME FROM.</h2>
          <p className="pa-px-provenance-support">
            Distinguish what you supplied, what the system calculated, where comparison happens, and what remains under your direct control.
          </p>
          <span className="pa-px-provenance-hint">
            Hover, drag, or press Enter to inspect underlying evidence layers.
          </span>
        </div>

        <div className="pa-px-provenance-interactive-canvas">
          {/* Surface: Derived Evidence Record */}
          <div className="pa-px-provenance-layer pa-px-layer--derived">
            <PersistentMediaSlot
              actorId="home-provenance-derived"
              slotId="provenance-derived-slot"
              assetKey="trustDiagnostic"
              alt="Calibrated diagnostic signal analysis"
            />
          </div>

          {/* Inspection Aperture reveal mask */}
          <div
            className="pa-px-provenance-aperture"
            style={{
              clipPath: `circle(120px at ${aperturePos.x}% ${aperturePos.y}%)`,
            }}
          >
            <div className="pa-px-provenance-layer pa-px-layer--source">
              <PersistentMediaSlot
                actorId="home-provenance-source"
                slotId="provenance-source-slot"
                assetKey="homeSituationDetail"
                alt="Source observation and material drawings"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProvenance;
