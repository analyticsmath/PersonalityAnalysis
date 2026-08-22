import React from 'react';
import './CalibrationBaseline.css';

/**
 * CalibrationBaseline
 * Renders the deterministic career-fit weighting system as a calibrated axis.
 * Weights: RIASEC 25%, Skills 25%, Work Values 20%, Personality 15%, Education 10%, Goals 5%.
 */
export const CalibrationBaseline = ({
  layers = [
    { key: 'riasec', label: 'RIASEC', weight: 25, span: 25 },
    { key: 'skills', label: 'SKILLS', weight: 25, span: 25 },
    { key: 'values', label: 'WORK VALUES', weight: 20, span: 20 },
    { key: 'personality', label: 'PERSONALITY', weight: 15, span: 15 },
    { key: 'education', label: 'EDUCATION', weight: 10, span: 10 },
    { key: 'goals', label: 'GOALS', weight: 5, span: 5 },
  ],
  theme = 'mineral', // 'mineral' | 'carbon'
  className = '',
}) => {
  return (
    <div className={`pa-calibration-baseline pa-calibration-baseline--${theme} ${className}`}>
      <div className="pa-calibration-baseline__layers" role="list" aria-label="Deterministic career fit layers">
        {layers.map((layer) => (
          <div
            key={layer.key}
            className="pa-calibration-baseline__segment"
            style={{ flex: `${layer.weight} 0 0` }}
            role="listitem"
          >
            <div className="pa-calibration-baseline__num">{layer.weight < 10 ? `0${layer.weight}` : layer.weight}</div>
            <div className="pa-calibration-baseline__bar" aria-hidden="true">
              <span className="pa-calibration-baseline__notch" />
            </div>
            <div className="pa-calibration-baseline__label">{layer.label}</div>
          </div>
        ))}
      </div>
      <div className="pa-calibration-baseline__caption">
        <span>DETERMINISTIC COMPARISON LAYERS</span>
      </div>
    </div>
  );
};

export default CalibrationBaseline;
