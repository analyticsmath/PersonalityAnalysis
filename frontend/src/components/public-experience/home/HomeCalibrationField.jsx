/**
 * Personality Assessor - Home Calibration Field
 * Spatial typographic mass field: Weight becomes mass.
 * Freeform asymmetric hierarchy across RIASEC (25%), Skills (25%), Work Values (20%),
 * Personality Traits (15%), Education (10%), Goals (5%).
 * Zero cards, zero equal metric grids.
 */

import React from 'react';

export const HomeCalibrationField = () => {
  return (
    <div className="pa-px-calibration-stage" aria-label="Deterministic Career Calibration">
      <div className="pa-px-calibration-header">
        <h2 className="pa-px-calibration-title">CAREER CALIBRATION</h2>
        <p className="pa-px-calibration-lead">
          Career alignment calculations assemble six deterministic constraints without black box adjustments.
        </p>
      </div>

      <div className="pa-px-calibration-masses-field">
        {/* Dominant Mass 1: RIASEC Interests (25%) */}
        <div className="pa-px-mass-item pa-px-mass--riasec" data-weight="25">
          <span className="pa-px-mass-val">25%</span>
          <span className="pa-px-mass-name">RIASEC Interests</span>
          <span className="pa-px-mass-desc">Occupational domain alignment</span>
        </div>

        {/* Dominant Mass 2: Technical & Professional Skills (25%) */}
        <div className="pa-px-mass-item pa-px-mass--skills" data-weight="25">
          <span className="pa-px-mass-val">25%</span>
          <span className="pa-px-mass-name">Technical & Professional Skills</span>
          <span className="pa-px-mass-desc">Concrete capability match</span>
        </div>

        {/* Secondary Mass: Work Values (20%) */}
        <div className="pa-px-mass-item pa-px-mass--values" data-weight="20">
          <span className="pa-px-mass-val">20%</span>
          <span className="pa-px-mass-name">Work Values</span>
          <span className="pa-px-mass-desc">Organizational condition satisfaction</span>
        </div>

        {/* Mid Mass: Personality Traits (15%) */}
        <div className="pa-px-mass-item pa-px-mass--traits" data-weight="15">
          <span className="pa-px-mass-val">15%</span>
          <span className="pa-px-mass-name">Personality Traits</span>
          <span className="pa-px-mass-desc">Working style and dimensional fit</span>
        </div>

        {/* Smaller Mass: Education (10%) */}
        <div className="pa-px-mass-item pa-px-mass--education" data-weight="10">
          <span className="pa-px-mass-val">10%</span>
          <span className="pa-px-mass-name">Educational Background</span>
          <span className="pa-px-mass-desc">Foundational preparation</span>
        </div>

        {/* Smallest Mass: Career Goals (5%) */}
        <div className="pa-px-mass-item pa-px-mass--goals" data-weight="5">
          <span className="pa-px-mass-val">5%</span>
          <span className="pa-px-mass-name">Career Goals</span>
          <span className="pa-px-mass-desc">Individual trajectory alignment</span>
        </div>
      </div>
    </div>
  );
};

export default HomeCalibrationField;
