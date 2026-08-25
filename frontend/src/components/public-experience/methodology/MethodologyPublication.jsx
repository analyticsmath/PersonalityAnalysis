import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const MethodologyPublication = () => {
  const data = PUBLIC_CONTENT.methodology;
  const { bigFive, riasec, workValues, behavioralSignals, careerWeights, validityStates, aiNarrative, limits } = data.sections;

  return (
    <div className="pa-px-methodology-page" data-route="methodology">
      <header className="pa-px-methodology-hero">
        <h1 className="pa-px-methodology-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-methodology-hero__support">{data.hero.support}</p>
      </header>

      <div className="pa-px-publication-grid">
        {/* 1. Big Five Dimensions */}
        <section className="pa-px-pub-section" aria-label="Big Five Dimensions">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{bigFive.role}</div>
            <h2 className="pa-px-pub-section__title">{bigFive.title}</h2>
            <p className="pa-px-pub-section__desc">{bigFive.description}</p>
          </div>
          <div className="pa-px-spectrum-figure">
            {bigFive.dimensions.map((dim, idx) => {
              const illustrativePcts = [82, 76, 54, 68, 72];
              const pct = illustrativePcts[idx] || 70;
              return (
                <div key={dim} className="pa-px-spectrum-row">
                  <span className="pa-px-spectrum-name">{dim}</span>
                  <div className="pa-px-spectrum-bar-wrap" aria-hidden="true">
                    <div className="pa-px-spectrum-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="pa-px-data">{pct}%</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. RIASEC Vocational Interests */}
        <section className="pa-px-pub-section" aria-label="RIASEC Vocational Interests">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{riasec.role}</div>
            <h2 className="pa-px-pub-section__title">{riasec.title}</h2>
            <p className="pa-px-pub-section__desc">{riasec.description}</p>
          </div>
          <div className="pa-px-riasec-orbit-grid">
            {riasec.orbit.map((domain) => (
              <div key={domain} className="pa-px-orbit-card">
                <h4>{domain}</h4>
                <div className="pa-px-data">Domain vector active</div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Work Values Priority */}
        <section className="pa-px-pub-section" aria-label="Work Values Priority">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{workValues.role}</div>
            <h2 className="pa-px-pub-section__title">{workValues.title}</h2>
            <p className="pa-px-pub-section__desc">{workValues.description}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '16px' }}>
            {workValues.priorities.map((p, idx) => (
              <div key={p} style={{ background: 'var(--pa-paper)', padding: '12px', borderRadius: '2px', borderLeft: '2px solid var(--pa-evidence)' }}>
                <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>0{idx + 1}.</span> <strong>{p}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Career Signals */}
        <section className="pa-px-pub-section" aria-label="Career Signals">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{behavioralSignals.role}</div>
            <h2 className="pa-px-pub-section__title">{behavioralSignals.title}</h2>
            <p className="pa-px-pub-section__desc">{behavioralSignals.description}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {behavioralSignals.patterns.map((pat) => (
              <span key={pat} style={{ background: 'var(--pa-paper)', padding: '6px 12px', borderRadius: '2px', fontFamily: 'var(--pa-font-mono)', fontSize: '0.85rem' }}>
                {pat}
              </span>
            ))}
          </div>
        </section>

        {/* 5. Deterministic Career-Fit Weights */}
        <section className="pa-px-pub-section" aria-label="Deterministic Career-Fit Weights">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{careerWeights.role}</div>
            <h2 className="pa-px-pub-section__title">{careerWeights.title}</h2>
            <p className="pa-px-pub-section__desc">{careerWeights.description}</p>
          </div>
          <div className="pa-px-calibration-weights-grid">
            <div className="pa-px-weight-cell">
              <div className="pa-px-weight-cell__pct">25%</div>
              <div className="pa-px-weight-cell__label">RIASEC Interests</div>
              <div className="pa-px-weight-cell__role">Occupational domain alignment</div>
            </div>
            <div className="pa-px-weight-cell">
              <div className="pa-px-weight-cell__pct">25%</div>
              <div className="pa-px-weight-cell__label">Technical & Skills</div>
              <div className="pa-px-weight-cell__role">Concrete capability match</div>
            </div>
            <div className="pa-px-weight-cell">
              <div className="pa-px-weight-cell__pct">20%</div>
              <div className="pa-px-weight-cell__label">Work Values</div>
              <div className="pa-px-weight-cell__role">Environmental condition satisfaction</div>
            </div>
            <div className="pa-px-weight-cell">
              <div className="pa-px-weight-cell__pct">15%</div>
              <div className="pa-px-weight-cell__label">Personality Traits</div>
              <div className="pa-px-weight-cell__role">Working style and dimensional fit</div>
            </div>
            <div className="pa-px-weight-cell">
              <div className="pa-px-weight-cell__pct">10%</div>
              <div className="pa-px-weight-cell__label">Education</div>
              <div className="pa-px-weight-cell__role">Foundational domain preparation</div>
            </div>
            <div className="pa-px-weight-cell">
              <div className="pa-px-weight-cell__pct">5%</div>
              <div className="pa-px-weight-cell__label">Career Goals</div>
              <div className="pa-px-weight-cell__role">Individual trajectory alignment</div>
            </div>
          </div>
        </section>

        {/* 6. Scoring Validity & Confidence States */}
        <section className="pa-px-pub-section" aria-label="Scoring Validity States">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{validityStates.role}</div>
            <h2 className="pa-px-pub-section__title">{validityStates.title}</h2>
            <p className="pa-px-pub-section__desc">{validityStates.description}</p>
          </div>
          <div className="pa-px-validity-grid">
            <div className="pa-px-validity-card">
              <h4>valid</h4>
              <p>Full response coverage meeting all dimension thresholds with verified consistency.</p>
            </div>
            <div className="pa-px-validity-card">
              <h4>partial</h4>
              <p>Sufficient evidence across primary dimensions with noted gaps in secondary vectors.</p>
            </div>
            <div className="pa-px-validity-card">
              <h4>insufficient_data</h4>
              <p>Initial baseline with missing dimensions. Explicitly reported rather than substituted with fake zeros.</p>
            </div>
          </div>
        </section>

        {/* 7. Role of AI Commentary & Limits */}
        <section className="pa-px-pub-section" aria-label="AI Role and Limits">
          <div className="pa-px-pub-section__header">
            <div className="pa-px-pub-section__role">{aiNarrative.role}</div>
            <h2 className="pa-px-pub-section__title">{aiNarrative.title}</h2>
            <p className="pa-px-pub-section__desc">{aiNarrative.description}</p>
          </div>
          <div style={{ marginTop: '24px', borderTop: '1px solid var(--pa-mineral)', paddingTop: '16px' }}>
            <div className="pa-px-pub-section__role">{limits.role}</div>
            <h3 className="pa-px-heading-md" style={{ marginBottom: '8px' }}>{limits.title}</h3>
            <p className="pa-px-body">{limits.description}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export const MethodologyEditorial = MethodologyPublication;
export default MethodologyPublication;
