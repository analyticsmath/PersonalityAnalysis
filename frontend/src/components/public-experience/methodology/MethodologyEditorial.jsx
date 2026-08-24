import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const MethodologyEditorial = () => {
  const data = PUBLIC_CONTENT.methodology;
  const { bigFive, riasec, workValues, behavioralSignals, careerWeights, aiNarrative, limits } = data.sections;

  return (
    <div className="pa-px-methodology-root">
      {/* Editorial Hero Header */}
      <header className="pa-px-methodology-header">
        <h1>{data.hero.headline}</h1>
        <p className="pa-px-methodology-lead">{data.hero.support}</p>
      </header>

      {/* Distinct Spatial Measurement Fields (No Repeated Row Shells) */}
      <div className="pa-px-methodology-field-container">
        {/* 1. Big Five: Continuous Dimensional Spectrum */}
        <section className="pa-px-method-field pa-px-method-field--bigfive" aria-label="Big Five Spectrum">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{bigFive.role}</span>
            <h2 className="pa-px-method-field__title">{bigFive.title}</h2>
            <p className="pa-px-method-field__desc">{bigFive.description}</p>
          </div>
          <div className="pa-px-method-field__spectrum-display">
            {bigFive.dimensions.map((dim) => (
              <div key={dim} className="pa-px-spectrum-item">
                <span className="pa-px-spectrum-item__name">{dim}</span>
                <div className="pa-px-spectrum-item__track" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {/* 2. RIASEC: Typographic Occupational Orbit */}
        <section className="pa-px-method-field pa-px-method-field--riasec" aria-label="RIASEC Vocational Orbit">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{riasec.role}</span>
            <h2 className="pa-px-method-field__title">{riasec.title}</h2>
            <p className="pa-px-method-field__desc">{riasec.description}</p>
          </div>
          <div className="pa-px-method-field__orbit-display">
            {riasec.orbit.map((domain) => (
              <div key={domain} className="pa-px-orbit-node">
                {domain}
              </div>
            ))}
          </div>
        </section>

        {/* 3. Work Values: Vertical Priority Structure */}
        <section className="pa-px-method-field pa-px-method-field--values" aria-label="O*NET Work Values">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{workValues.role}</span>
            <h2 className="pa-px-method-field__title">{workValues.title}</h2>
            <p className="pa-px-method-field__desc">{workValues.description}</p>
          </div>
          <div className="pa-px-method-field__priority-display">
            {workValues.priorities.map((val, idx) => (
              <div key={val} className="pa-px-priority-item">
                <span className="pa-px-priority-item__rank">{idx + 1}</span>
                <span className="pa-px-priority-item__label">{val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Behavioral Signals & Situational Scenarios */}
        <section className="pa-px-method-field pa-px-method-field--signals" aria-label="Behavioral Action Patterns">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{behavioralSignals.role}</span>
            <h2 className="pa-px-method-field__title">{behavioralSignals.title}</h2>
            <p className="pa-px-method-field__desc">{behavioralSignals.description}</p>
          </div>
          <div className="pa-px-method-field__patterns-display">
            {behavioralSignals.patterns.map((pat) => (
              <div key={pat} className="pa-px-pattern-tag">
                {pat}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Deterministic Career Calibration Proportions */}
        <section className="pa-px-method-field pa-px-method-field--calibration" aria-label="Career Alignment Proportions">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{careerWeights.role}</span>
            <h2 className="pa-px-method-field__title">{careerWeights.title}</h2>
            <p className="pa-px-method-field__desc">{careerWeights.description}</p>
          </div>
          <div className="pa-px-method-field__weights-display">
            <div><strong>25%</strong> RIASEC Interests</div>
            <div><strong>25%</strong> Technical Skills</div>
            <div><strong>20%</strong> Work Values</div>
            <div><strong>15%</strong> Personality Traits</div>
            <div><strong>10%</strong> Education</div>
            <div><strong>5%</strong> Career Goals</div>
          </div>
        </section>

        {/* 6. Role of AI Narrative Commentary */}
        <section className="pa-px-method-field pa-px-method-field--ai" aria-label="Role of AI Synthesis">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{aiNarrative.role}</span>
            <h2 className="pa-px-method-field__title">{aiNarrative.title}</h2>
            <p className="pa-px-method-field__desc">{aiNarrative.description}</p>
          </div>
        </section>

        {/* 7. Non-Clinical Scientific Boundaries */}
        <section className="pa-px-method-field pa-px-method-field--limits" aria-label="Scientific Boundaries">
          <div className="pa-px-method-field__meta">
            <span className="pa-px-method-field__role">{limits.role}</span>
            <h2 className="pa-px-method-field__title">{limits.title}</h2>
            <p className="pa-px-method-field__desc">{limits.description}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MethodologyEditorial;
