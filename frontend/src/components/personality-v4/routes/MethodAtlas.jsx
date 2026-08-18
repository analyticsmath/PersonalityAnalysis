import React from 'react';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';

export const MethodAtlas = () => {
  const { methodology, home } = PUBLIC_CONTENT;
  const bigFive = home.independentReadings.models.find((m) => m.id === 'big-five');
  const riasec = home.independentReadings.models.find((m) => m.id === 'riasec');
  const workValues = home.independentReadings.models.find((m) => m.id === 'work-values');

  return (
    <>
      <section className="pa-route-hero">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{methodology.title}</h1>
            <p>{methodology.lead}</p>
          </div>
        </div>
      </section>

      <section className="pa-method-section" aria-label="Psychometric Frameworks Atlas">
        <div className="pa-container">
          <div className="pa-method-atlas-grid">
            {/* Big Five Spectrum */}
            <article className="pa-method-card">
              <h2>01 — Big Five Personality Dimensions</h2>
              <p className="pa-method-lead">{methodology.bigFiveIntro}</p>

              <div className="pa-traits-list">
                {bigFive?.traits.map((trait) => (
                  <div key={trait.id} className="pa-trait-row">
                    <div className="pa-trait-info">
                      <span>{trait.name}</span>
                      <span className="pa-tabular">{trait.sample}%</span>
                    </div>
                    <div className="pa-trait-spectrum">
                      <div
                        className="pa-trait-fill"
                        style={{
                          width: `${trait.sample}%`,
                          backgroundColor: trait.color,
                        }}
                      />
                    </div>
                    <div className="pa-trait-ends">
                      <span>{trait.low}</span>
                      <span>{trait.high}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Holland RIASEC Map */}
            <article className="pa-method-card">
              <h2>02 — Holland RIASEC Vocational Interests</h2>
              <p className="pa-method-lead">{methodology.riasecIntro}</p>

              <div className="pa-riasec-grid">
                {riasec?.territories.map((territory) => (
                  <div key={territory.id} className="pa-riasec-card">
                    <div className="pa-riasec-name">{territory.name}</div>
                    <div className="pa-riasec-desc">{territory.description}</div>
                  </div>
                ))}
              </div>
            </article>

            {/* O*NET Work Values */}
            <article className="pa-method-card">
              <h2>03 — O*NET Occupational Work Values</h2>
              <p className="pa-method-lead">{methodology.workValuesIntro}</p>

              <div className="pa-values-list">
                {workValues?.values.map((v) => (
                  <div key={v.rank} className="pa-values-item">
                    <span className="pa-values-rank">{v.rank}</span>
                    <span className="pa-values-name">{v.name}</span>
                    <span className="pa-values-desc">{v.description}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* Deterministic Scoring & Signals Ledger */}
            <article className="pa-method-card">
              <h2>04 — Deterministic Scoring & Behavioral Ledger</h2>
              <p className="pa-method-lead">{methodology.deterministicIntro}</p>

              <div className="pa-method-ledger">
                <div className="pa-method-ledger-row pa-method-ledger-row--header">
                  <span>Input Layer</span>
                  <span>Response Weight</span>
                  <span>Scoring Engine</span>
                  <span>Narrative Synthesis</span>
                </div>
                <div className="pa-method-ledger-row">
                  <span>Self-Reported Experience</span>
                  <span>Role Classification Matrix</span>
                  <span>Deterministic Baseline</span>
                  <span>Context Anchor</span>
                </div>
                <div className="pa-method-ledger-row">
                  <span>Adaptive Scenario Trade-offs</span>
                  <span>Calibrated Metric Weights</span>
                  <span>Bayesian Dimension Score</span>
                  <span>Stretch & Fit Analysis</span>
                </div>
                <div className="pa-method-ledger-row">
                  <span>Latency & Modification Patterns</span>
                  <span>Confidence Metric Factor</span>
                  <span>Stability Index</span>
                  <span>Reflective Insight</span>
                </div>
              </div>
            </article>
          </div>

          {/* Boundaries & Limitations */}
          <div className="pa-method-limitations">
            <h2>Framework Boundaries & Limitations</h2>
            <div className="pa-limitations-grid">
              {methodology.limitations.map((lim, idx) => (
                <div key={idx} className="pa-limitation-item">
                  <h3>{lim.heading}</h3>
                  <p>{lim.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MethodAtlas;
