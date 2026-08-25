import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const MethodologyPublication = () => {
  const data = PUBLIC_CONTENT.methodology;
  const { bigFive, riasec, workValues, behavioralSignals, careerWeights, validityStates, aiNarrative, limits } = data.sections;

  return (
    <div className="pa-px-methodology-page pa-px-monograph-layout" data-route="methodology">
      <header className="pa-px-methodology-hero">
        <h1 className="pa-px-methodology-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-methodology-hero__support">{data.hero.support}</p>
      </header>

      <div className="pa-px-monograph-body">
        {/* Section 01: Big Five Dimensions */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-bigfive">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">01 / TRAITS</span>
            <div className="pa-px-data pa-px-monograph-tag">{bigFive.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-bigfive" className="pa-px-heading-section">{bigFive.title}</h2>
            <p className="pa-px-body-lg">{bigFive.description}</p>

            <div className="pa-px-continuous-spectrums-figure" aria-label="Big Five Continuous Spectrums">
              <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', marginBottom: '12px' }}>
                CONTINUOUS DIMENSIONAL SPECTRUMS &middot; ILLUSTRATIVE SAMPLE
              </div>
              {bigFive.dimensions.map((dim, idx) => {
                const sampleValues = [82, 76, 54, 68, 72];
                const val = sampleValues[idx] || 70;
                return (
                  <div key={dim} className="pa-px-spectrum-axis-row">
                    <span className="pa-px-spectrum-axis-label">{dim}</span>
                    <div className="pa-px-spectrum-axis-track" aria-hidden="true">
                      <div className="pa-px-spectrum-axis-fill" style={{ width: `${val}%` }} />
                      <div className="pa-px-spectrum-axis-cursor" style={{ left: `${val}%` }} />
                    </div>
                    <span className="pa-px-data pa-px-spectrum-axis-val">{val}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        {/* Section 02: RIASEC Vocational Orbit */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-riasec">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">02 / VOCATIONAL</span>
            <div className="pa-px-data pa-px-monograph-tag">{riasec.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-riasec" className="pa-px-heading-section">{riasec.title}</h2>
            <p className="pa-px-body-lg">{riasec.description}</p>

            {/* Spatial RIASEC Hexagonal/Orbit SVG Geometry */}
            <div className="pa-px-riasec-orbit-stage" aria-label="RIASEC Hexagonal Spatial Geometry">
              <svg className="pa-px-riasec-orbit-svg" viewBox="0 0 400 240" fill="none" aria-hidden="true">
                <polygon
                  points="200,20 330,70 330,170 200,220 70,170 70,70"
                  stroke="var(--pa-mineral)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <polygon
                  points="200,45 295,85 295,155 200,195 105,155 105,85"
                  stroke="rgba(113, 54, 65, 0.3)"
                  strokeWidth="1.5"
                  fill="rgba(113, 54, 65, 0.04)"
                />
                {/* Node Markers */}
                <circle cx="200" cy="20" r="4.5" fill="var(--pa-evidence)" />
                <circle cx="330" cy="70" r="4.5" fill="var(--pa-evidence)" />
                <circle cx="330" cy="170" r="4.5" fill="var(--pa-evidence)" />
                <circle cx="200" cy="220" r="4.5" fill="var(--pa-evidence)" />
                <circle cx="70" cy="170" r="4.5" fill="var(--pa-evidence)" />
                <circle cx="70" cy="70" r="4.5" fill="var(--pa-evidence)" />
              </svg>
              <div className="pa-px-riasec-domain-tags">
                {riasec.orbit.map((domain) => (
                  <span key={domain} className="pa-px-riasec-node-pill">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Section 03: Work Values */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-values">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">03 / VALUES</span>
            <div className="pa-px-data pa-px-monograph-tag">{workValues.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-values" className="pa-px-heading-section">{workValues.title}</h2>
            <p className="pa-px-body-lg">{workValues.description}</p>
            <div className="pa-px-values-monograph-list">
              {workValues.priorities.map((p, idx) => (
                <div key={p} className="pa-px-values-monograph-item">
                  <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>0{idx + 1}.</span>
                  <strong style={{ color: 'var(--pa-ink)' }}>{p}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Section 04: Career Signals */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-signals">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">04 / SIGNALS</span>
            <div className="pa-px-data pa-px-monograph-tag">{behavioralSignals.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-signals" className="pa-px-heading-section">{behavioralSignals.title}</h2>
            <p className="pa-px-body-lg">{behavioralSignals.description}</p>
            <div className="pa-px-signals-chips-grid">
              {behavioralSignals.patterns.map((pat) => (
                <span key={pat} className="pa-px-signal-chip">
                  {pat}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Section 05: Proportional Career-Fit Weights */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-weights">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">05 / WEIGHTS</span>
            <div className="pa-px-data pa-px-monograph-tag">{careerWeights.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-weights" className="pa-px-heading-section">{careerWeights.title}</h2>
            <p className="pa-px-body-lg">{careerWeights.description}</p>

            <div className="pa-px-monograph-weights-strip" role="region" aria-label="Deterministic weights breakdown">
              <div style={{ flex: '25', background: 'var(--pa-ink)', color: '#FFF', padding: '12px 8px', textAlign: 'center' }}>
                <strong>25%</strong><div className="pa-px-data" style={{ color: '#DDD' }}>RIASEC</div>
              </div>
              <div style={{ flex: '25', background: 'var(--pa-graphite)', color: '#FFF', padding: '12px 8px', textAlign: 'center' }}>
                <strong>25%</strong><div className="pa-px-data" style={{ color: '#DDD' }}>Skills</div>
              </div>
              <div style={{ flex: '20', background: 'var(--pa-context)', color: '#FFF', padding: '12px 8px', textAlign: 'center' }}>
                <strong>20%</strong><div className="pa-px-data" style={{ color: '#DDD' }}>Values</div>
              </div>
              <div style={{ flex: '15', background: 'var(--pa-mineral)', color: 'var(--pa-ink)', padding: '12px 8px', textAlign: 'center' }}>
                <strong>15%</strong><div className="pa-px-data">Traits</div>
              </div>
              <div style={{ flex: '10', background: 'var(--pa-paper)', color: 'var(--pa-ink)', padding: '12px 8px', textAlign: 'center', border: '1px solid var(--pa-mineral)' }}>
                <strong>10%</strong><div className="pa-px-data">Ed</div>
              </div>
              <div style={{ flex: '5', background: 'var(--pa-evidence)', color: '#FFF', padding: '12px 4px', textAlign: 'center' }}>
                <strong>5%</strong><div className="pa-px-data" style={{ color: '#FFF' }}>Goal</div>
              </div>
            </div>
          </div>
        </article>

        {/* Section 06: Scoring Validity States Table */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-validity">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">06 / VALIDITY</span>
            <div className="pa-px-data pa-px-monograph-tag">{validityStates.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-validity" className="pa-px-heading-section">{validityStates.title}</h2>
            <p className="pa-px-body-lg">{validityStates.description}</p>

            <table className="pa-px-validity-table" aria-label="Validity and confidence state specification">
              <thead>
                <tr>
                  <th scope="col">Validity State</th>
                  <th scope="col">Threshold Condition</th>
                  <th scope="col">System Operational Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code className="pa-px-validity-code">valid</code></td>
                  <td>Full response coverage meeting all dimension thresholds with verified consistency.</td>
                  <td>Enables full multi-model alignment scoring and career benchmarking.</td>
                </tr>
                <tr>
                  <td><code className="pa-px-validity-code">partial</code></td>
                  <td>Sufficient evidence across primary vectors with noted secondary gaps.</td>
                  <td>Outputs primary scores with explicit flagged confidence bounds.</td>
                </tr>
                <tr>
                  <td><code className="pa-px-validity-code">insufficient_data</code></td>
                  <td>Initial baseline with missing critical vectors.</td>
                  <td>Reported explicitly rather than substituting fabricated placeholder zeros.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* Section 07: AI Role & Boundaries */}
        <article className="pa-px-monograph-entry" aria-labelledby="mono-sec-ai">
          <div className="pa-px-monograph-sidebar">
            <span className="pa-px-data pa-px-monograph-num">07 / AI & LIMITS</span>
            <div className="pa-px-data pa-px-monograph-tag">{aiNarrative.role}</div>
          </div>
          <div className="pa-px-monograph-main">
            <h2 id="mono-sec-ai" className="pa-px-heading-section">{aiNarrative.title}</h2>
            <p className="pa-px-body-lg">{aiNarrative.description}</p>

            <div className="pa-px-monograph-limits-callout">
              <h3 className="pa-px-heading-md" style={{ marginBottom: '8px' }}>{limits.title}</h3>
              <p className="pa-px-body">{limits.description}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export const MethodologyEditorial = MethodologyPublication;
export default MethodologyPublication;
