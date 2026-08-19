import React from 'react';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';

export const MethodologyReadingRoom = () => {
  const data = PUBLIC_CONTENT.methodology;

  return (
    <div className="pa-v7-methodology-stage">
      {/* Route Header on Paper */}
      <div className="pa-v7-methodology-header">
        <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
          The Reading Room
        </span>
        <h1 className="pa-v7-route-title" style={{ color: 'var(--pa-ink)' }}>
          {data.title}
        </h1>
        <p className="pa-v7-route-lead" style={{ color: 'var(--pa-ink)', opacity: 0.85 }}>
          {data.lead}
        </p>
      </div>

      {/* Cropped Opening Plate (A07) */}
      <div className="pa-v7-methodology__opening-plate">
        <MediaPlane
          asset={MEDIA_ASSETS_V7.a07}
          priority={true}
          objectPosition="50% 45%"
          alt="Methodology composite figure"
        />
      </div>

      {/* Chapter-Essay Layout */}
      <div className="pa-v7-methodology__content">
        {/* Section 01: Big Five */}
        <section className="pa-v7-methodology-section" aria-label="Big Five Framework">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>Framework 01</span>
          <h2 className="pa-v7-methodology-section__title">Big Five Dimensional Trait Spectrum</h2>
          <p className="pa-v7-methodology-section__text">
            {data.bigFiveIntro}
          </p>
          <div className="pa-v7-methodology-limits">
            <div className="pa-v7-methodology-limit-col">
              <h4>What This Model Does</h4>
              <p>Provides continuous, empirical percentile measurements across five stable behavioral dimensions, capturing nuance across work contexts.</p>
            </div>
            <div className="pa-v7-methodology-limit-col">
              <h4>What This Model Does Not Do</h4>
              <p>Does not pigeonhole people into static 4-letter boxes or claim an unchangeable lifelong destiny.</p>
            </div>
          </div>
        </section>

        {/* Section 02: RIASEC */}
        <section className="pa-v7-methodology-section" aria-label="RIASEC Vocational Themes">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>Framework 02</span>
          <h2 className="pa-v7-methodology-section__title">Holland RIASEC Occupational Themes</h2>
          <p className="pa-v7-methodology-section__text">
            {data.riasecIntro}
          </p>
          <div className="pa-v7-methodology-limits">
            <div className="pa-v7-methodology-limit-col">
              <h4>What This Model Does</h4>
              <p>Maps preferred problem spaces, operational tasks, and environments that naturally sustain intellectual and physical focus.</p>
            </div>
            <div className="pa-v7-methodology-limit-col">
              <h4>What This Model Does Not Do</h4>
              <p>Does not evaluate raw intelligence or restrict you to single narrowly defined job titles.</p>
            </div>
          </div>
        </section>

        {/* Section 03: O*NET */}
        <section className="pa-v7-methodology-section" aria-label="O*NET Work Values">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>Framework 03</span>
          <h2 className="pa-v7-methodology-section__title">O*NET Occupational Values Hierarchy</h2>
          <p className="pa-v7-methodology-section__text">
            {data.workValuesIntro}
          </p>
          <div className="pa-v7-methodology-limits">
            <div className="pa-v7-methodology-limit-col">
              <h4>What This Model Does</h4>
              <p>Identifies structural conditions (autonomy, recognition, support) that determine whether an environment feels rewarding long-term.</p>
            </div>
            <div className="pa-v7-methodology-limit-col">
              <h4>What This Model Does Not Do</h4>
              <p>Does not mandate moral values or enforce cultural conformity across organizations.</p>
            </div>
          </div>
        </section>

        {/* Section 04: Interpretation Boundaries */}
        <section className="pa-v7-methodology-section" aria-label="Interpretation Boundaries">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>Scientific Integrity</span>
          <h2 className="pa-v7-methodology-section__title">Interpretation Limits & Guardrails</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {data.limitations.map((lim, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--pa-rule-paper)', paddingLeft: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--pa-ink)', marginBottom: '0.25rem' }}>
                  {lim.heading}
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, color: 'var(--pa-ink)', opacity: 0.8, margin: 0 }}>
                  {lim.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MethodologyReadingRoom;
