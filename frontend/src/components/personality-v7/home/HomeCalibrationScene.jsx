import React from 'react';
import CalibrationBaseline from '../living-record/CalibrationBaseline';
import './HomeCalibrationScene.css';

/**
 * HomeCalibrationScene (Scene 5)
 * Quiet factual calibration state:
 * Exposes real deterministic career-fit weighting layers (25/25/20/15/10/5).
 */
export const HomeCalibrationScene = () => {
  return (
    <section
      id="home-scene-calibration"
      className="pa-home-calibration-scene"
      aria-label="Calibration: Deterministic fit layers"
    >
      <div className="pa-home-calibration-scene__inner">
        <div className="pa-home-calibration-scene__header">
          <span className="pa-home-calibration-scene__eyebrow">DETERMINISTIC WEIGHTING</span>
          <h2 className="pa-home-calibration-scene__h2">
            The comparison is
            <br />
            weighted, not guessed.
          </h2>
          <p className="pa-home-calibration-scene__lead">
            Career matching uses six deterministic calibration layers rather than unverified generative summaries.
          </p>
        </div>

        <div className="pa-home-calibration-scene__baseline-wrap">
          <CalibrationBaseline theme="mineral" />
        </div>
      </div>
    </section>
  );
};

export default HomeCalibrationScene;
