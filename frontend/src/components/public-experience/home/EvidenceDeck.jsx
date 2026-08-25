import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const RECORD_CONFIGS = {
  'big-five': {
    provenanceId: 'rec-dim-01',
    rotation: '-1deg',
    extractedClause: '“I clarify the constraints first”',
    readingAxis: 'Pacing & Risk Containment',
    scoreSnippet: 'C: 78 | ES: 64 | O: 72',
  },
  'riasec': {
    provenanceId: 'rec-voc-02',
    rotation: '1.2deg',
    extractedClause: '“smallest reversible step”',
    readingAxis: 'Structured Problem Navigation',
    scoreSnippet: 'Investigative 72 | Conventional 68',
  },
  'work-values': {
    provenanceId: 'rec-val-03',
    rotation: '-0.8deg',
    extractedClause: '“clarify constraints first”',
    readingAxis: 'Autonomous Workplace Conditions',
    scoreSnippet: 'Independence 84 | Achievement 80',
  },
  'signals': {
    provenanceId: 'rec-sig-04',
    rotation: '1deg',
    extractedClause: '“smallest reversible step”',
    readingAxis: 'Iterative Delivery Posture',
    scoreSnippet: 'Scoping Velocity: High',
  },
};

export const EvidenceDeck = () => {
  const data = PUBLIC_CONTENT.home.readings;
  const [activeRecordId, setActiveRecordId] = useState('big-five');
  const { isMobile } = usePublicCapabilities();

  return (
    <section className="pa-px-ch-deck pa-px-evidence-objects-stage" aria-label="Evidence Objects Deck">
      <div className="pa-px-deck__header">
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
          MULTI-DIMENSIONAL DECONSTRUCTION
        </div>
        <h2 className="pa-px-heading-xl">{data.headline}</h2>
        <p className="pa-px-lead">
          The same source response provides distinct physical evidence across four independent analytical frameworks.
        </p>
      </div>

      {/* Physical Overlapping Evidence Objects Stage */}
      <div className="pa-px-evidence-objects-field" role="region" aria-label="Overlapping Evidence Records">
        {data.destinations.map((dest, idx) => {
          const config = RECORD_CONFIGS[dest.id] || {};
          const isSelected = activeRecordId === dest.id;

          return (
            <article
              key={dest.id}
              className={`pa-px-evidence-object pa-px-evidence-object--${dest.id} ${isSelected ? 'pa-px-evidence-object--selected' : ''}`}
              style={{
                '--record-rotation': config.rotation || '0deg',
                '--record-z-index': isSelected ? 10 : 4 - idx,
              }}
              onClick={() => setActiveRecordId(dest.id)}
              onMouseEnter={() => setActiveRecordId(dest.id)}
              tabIndex={0}
              onFocus={() => setActiveRecordId(dest.id)}
              aria-expanded={isSelected}
            >
              <div className="pa-px-evidence-object__surface">
                <header className="pa-px-evidence-object__meta">
                  <span className="pa-px-data pa-px-evidence-object__prov">
                    {config.provenanceId}
                  </span>
                  <span className="pa-px-evidence-object__framework">
                    {dest.name}
                  </span>
                </header>

                <div className="pa-px-evidence-object__body">
                  <h3 className="pa-px-evidence-object__summary">
                    {dest.summary}
                  </h3>
                  <p className="pa-px-evidence-object__detail">
                    {dest.detail}
                  </p>
                </div>

                {/* Substantive Source Fragment Protrusion */}
                <div className="pa-px-evidence-object__source-fragment">
                  <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', fontSize: '0.72rem' }}>
                    SOURCE CLUSTER: {config.extractedClause}
                  </div>
                  <div className="pa-px-evidence-object__metric-pill">
                    {config.scoreSnippet}
                  </div>
                </div>

                <footer className="pa-px-evidence-object__footer">
                  <div className="pa-px-data pa-px-evidence-object__axis">
                    AXIS: {dest.axis}
                  </div>
                  <div className="pa-px-evidence-object__status-indicator" aria-hidden="true" />
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EvidenceDeck;
