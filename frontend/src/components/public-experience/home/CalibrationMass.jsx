import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const CalibrationMass = () => {
  const data = PUBLIC_CONTENT.home.calibration;

  // Proportional height mapping based on exact percentage
  const getHeight = (pct) => `${Math.max(160, pct * 9)}px`;

  return (
    <section className="pa-px-ch-calibration" aria-label="Deterministic Career Calibration">
      <div className="pa-px-ch-calibration__inner">
        <div className="pa-px-ch-calibration__header">
          <h2>{data.headline}</h2>
          <p className="pa-px-lead">{data.lead}</p>
        </div>

        <div className="pa-px-ch-calibration__mass-grid">
          {data.weights.map((w) => (
            <div
              key={w.id}
              className="pa-px-mass-block"
              style={{ minHeight: getHeight(w.percentage) }}
            >
              <div className="pa-px-mass-block__pct">{w.percentage}%</div>
              <div className="pa-px-mass-block__label">{w.label}</div>
              <div className="pa-px-mass-block__role">{w.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Calibration = CalibrationMass;
export default CalibrationMass;
