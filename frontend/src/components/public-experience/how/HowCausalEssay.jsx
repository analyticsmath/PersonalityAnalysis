import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

export const HowCausalEssay = () => {
  const data = PUBLIC_CONTENT.how;

  return (
    <div className="pa-px-how-page" data-route="how-it-works">
      <header className="pa-px-how-hero">
        <h1 className="pa-px-how-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-how-hero__support">{data.hero.support}</p>
      </header>

      <div className="pa-px-how-narrative-flow">
        {/* State A: Source Capture */}
        <section className="pa-px-how-step" aria-label="Step 1: Source Capture">
          <div>
            <div className="pa-px-how-step__meta">01 / Source Capture</div>
            <h2 className="pa-px-how-step__title">{data.movements[0].title}</h2>
            <p className="pa-px-how-step__desc">{data.movements[0].description}</p>
          </div>
          <div className="pa-px-how-step__figure">
            <div className="pa-px-how-quote-card">
              &ldquo;{data.sampleResponse}&rdquo;
            </div>
            <div className="pa-px-data" style={{ marginTop: '12px', color: 'var(--pa-evidence)' }}>
              Provenance: Verbatim captured text
            </div>
          </div>
        </section>

        {/* State B: Clause Isolation */}
        <section className="pa-px-how-step" aria-label="Step 2: Clause Separation">
          <div>
            <div className="pa-px-how-step__meta">02 / Clause Separation</div>
            <h2 className="pa-px-how-step__title">{data.movements[1].title}</h2>
            <p className="pa-px-how-step__desc">{data.movements[1].description}</p>
          </div>
          <div className="pa-px-how-step__figure">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: 'var(--pa-white)', padding: '10px 14px', borderRadius: '2px', borderLeft: '3px solid var(--pa-evidence)' }}>
                <span className="pa-px-data">Clause A:</span> &ldquo;I clarify the constraints first&rdquo;
              </div>
              <div style={{ background: 'var(--pa-white)', padding: '10px 14px', borderRadius: '2px', borderLeft: '3px solid var(--pa-context)' }}>
                <span className="pa-px-data">Clause B:</span> &ldquo;then choose the smallest reversible step.&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* State C: Multi-Model Branch */}
        <section className="pa-px-how-step" aria-label="Step 3: Multi-Model Calibration">
          <div>
            <div className="pa-px-how-step__meta">03 / Multi-Model Calibration</div>
            <h2 className="pa-px-how-step__title">{data.movements[2].title}</h2>
            <p className="pa-px-how-step__desc">{data.movements[2].description}</p>
          </div>
          <div className="pa-px-how-step__figure">
            <div className="pa-px-how-branch-grid">
              <div className="pa-px-how-branch-node">
                <h4>Big Five</h4>
                <p>Conscientiousness 78</p>
              </div>
              <div className="pa-px-how-branch-node">
                <h4>RIASEC</h4>
                <p>Investigative 72</p>
              </div>
              <div className="pa-px-how-branch-node">
                <h4>Work Values</h4>
                <p>Independence 84</p>
              </div>
              <div className="pa-px-how-branch-node">
                <h4>Career Signals</h4>
                <p>Pacing & Risk Containment</p>
              </div>
            </div>
          </div>
        </section>

        {/* State D: Deterministic Calculation */}
        <section className="pa-px-how-step" aria-label="Step 4: Career-Fit Weighting">
          <div>
            <div className="pa-px-how-step__meta">04 / Deterministic Weighting</div>
            <h2 className="pa-px-how-step__title">{data.movements[3].title}</h2>
            <p className="pa-px-how-step__desc">{data.movements[3].description}</p>
          </div>
          <div className="pa-px-how-step__figure">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div style={{ background: 'var(--pa-white)', padding: '8px', textAlign: 'center', borderRadius: '2px' }}>
                <strong className="pa-px-data" style={{ fontSize: '1.2rem', color: 'var(--pa-ink)' }}>25%</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-graphite)' }}>RIASEC</div>
              </div>
              <div style={{ background: 'var(--pa-white)', padding: '8px', textAlign: 'center', borderRadius: '2px' }}>
                <strong className="pa-px-data" style={{ fontSize: '1.2rem', color: 'var(--pa-ink)' }}>25%</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-graphite)' }}>Skills</div>
              </div>
              <div style={{ background: 'var(--pa-white)', padding: '8px', textAlign: 'center', borderRadius: '2px' }}>
                <strong className="pa-px-data" style={{ fontSize: '1.2rem', color: 'var(--pa-ink)' }}>20%</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-graphite)' }}>Values</div>
              </div>
              <div style={{ background: 'var(--pa-white)', padding: '8px', textAlign: 'center', borderRadius: '2px' }}>
                <strong className="pa-px-data" style={{ fontSize: '1.2rem', color: 'var(--pa-ink)' }}>15%</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-graphite)' }}>Traits</div>
              </div>
              <div style={{ background: 'var(--pa-white)', padding: '8px', textAlign: 'center', borderRadius: '2px' }}>
                <strong className="pa-px-data" style={{ fontSize: '1.2rem', color: 'var(--pa-ink)' }}>10%</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-graphite)' }}>Education</div>
              </div>
              <div style={{ background: 'var(--pa-white)', padding: '8px', textAlign: 'center', borderRadius: '2px' }}>
                <strong className="pa-px-data" style={{ fontSize: '1.2rem', color: 'var(--pa-ink)' }}>5%</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-graphite)' }}>Goals</div>
              </div>
            </div>
          </div>
        </section>

        {/* State E: Inspectable Record */}
        <section className="pa-px-how-step" aria-label="Step 5: Unified Inspectable Record">
          <div>
            <div className="pa-px-how-step__meta">05 / Inspectable Record</div>
            <h2 className="pa-px-how-step__title">{data.movements[4].title}</h2>
            <p className="pa-px-how-step__desc">{data.movements[4].description}</p>
          </div>
          <div className="pa-px-how-step__figure">
            <div className="pa-px-how-media-plate">
              <PublicPicture
                assetKey="howTransformation"
                alt="Hands refining physical technical prototype"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export const HowContinuousTransformation = HowCausalEssay;
export default HowCausalEssay;
