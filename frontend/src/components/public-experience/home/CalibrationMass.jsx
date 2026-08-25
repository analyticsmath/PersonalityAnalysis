import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const CalibrationMass = () => {
  const data = PUBLIC_CONTENT.home.calibration;
  const [activeWeightId, setActiveWeightId] = useState(data.weights[0].id);

  return (
    <section className="pa-px-ch-calibration pa-px-calibration-field" aria-label="Deterministic Career Calibration">
      <div className="pa-px-calibration-field__inner">
        <header className="pa-px-calibration-field__header">
          <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
            DETERMINISTIC MULTI-FACTOR ENGINE
          </div>
          <h2 className="pa-px-heading-xl">{data.headline}</h2>
          <p className="pa-px-lead">{data.lead}</p>
        </header>

        {/* Continuous Proportional Mass Landscape Strip */}
        <div className="pa-px-mass-landscape" role="region" aria-label="Proportional Weight Mass Distribution">
          <div className="pa-px-mass-landscape__bar">
            {data.weights.map((w) => {
              const isSelected = activeWeightId === w.id;

              return (
                <button
                  key={w.id}
                  type="button"
                  className={`pa-px-mass-segment ${isSelected ? 'pa-px-mass-segment--active' : ''}`}
                  style={{
                    flexGrow: w.percentage,
                    flexBasis: `${w.percentage}%`,
                  }}
                  onClick={() => setActiveWeightId(w.id)}
                  onMouseEnter={() => setActiveWeightId(w.id)}
                  onFocus={() => setActiveWeightId(w.id)}
                  aria-label={`${w.label}: ${w.percentage}% weight`}
                >
                  <span className="pa-px-mass-segment__pct">{w.percentage}%</span>
                  <span className="pa-px-mass-segment__label">{w.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Factor Provenance Annotation Window */}
          {(() => {
            const activeWeight = data.weights.find((w) => w.id === activeWeightId) || data.weights[0];
            return (
              <div className="pa-px-mass-landscape__detail" aria-live="polite">
                <div className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
                  FACTOR SPECIFICATION &middot; {activeWeight.percentage}% CALIBRATION MASS
                </div>
                <h3 className="pa-px-heading-subsection">Factor Specification: {activeWeight.label}</h3>
                <p className="pa-px-body">{activeWeight.role}</p>
                <div className="pa-px-data pa-px-mass-landscape__meta">
                  <span>Weighting Type: Fixed Deterministic Formula</span>
                  <span>Zero Black-Box Adjustments</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export const Calibration = CalibrationMass;
export default CalibrationMass;
