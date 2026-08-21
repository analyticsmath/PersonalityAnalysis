import React from 'react';
import { Link } from 'react-router-dom';
import InspectionAperture from '../motion/InspectionAperture';

export const HomeInspectionChapter = () => {
  const surfaceContent = (
    <div>
      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-muted-light)' }}>
        Surface Reading
      </span>
      <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.5rem', lineHeight: 1.35, margin: '0.5rem 0 0 0' }}>
        "Prefers clear structure before committing work."
      </p>
    </div>
  );

  const revealedContent = (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Source
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          Assessment response
        </p>
      </div>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Reading
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          Big Five contribution
        </p>
      </div>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Additional Context
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          Work-value evidence
        </p>
      </div>
      <div>
        <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pa-pewter)' }}>
          Career Use
        </span>
        <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-mineral)', margin: '0.25rem 0 0 0' }}>
          One input among comparison layers
        </p>
      </div>
    </div>
  );

  return (
    <section className="pa-home-inspection" aria-label="Inspection and Provenance">
      <div className="pa-v7-grid">
        <div style={{ gridColumn: '1 / -1' }} className="pa-home-inspection__inner">
          <div>
            <h2 className="pa-home-inspection__h2">
              You should be able to ask why.
            </h2>
            <p className="pa-home-inspection__body" style={{ marginTop: '1rem' }}>
              Inspect what you provided, what the system calculated and how a reading relates back to evidence.
            </p>
          </div>

          <InspectionAperture
            surfaceContent={surfaceContent}
            revealedContent={revealedContent}
            buttonLabel="Inspect reading"
          />

          <div>
            <Link to="/trust" className="pa-btn-primary">
              See trust and provenance
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeInspectionChapter;
