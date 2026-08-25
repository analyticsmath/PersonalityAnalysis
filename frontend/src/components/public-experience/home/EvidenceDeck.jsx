import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const RECORD_PROFILES = [
  {
    id: 'big-five',
    name: 'Big Five Spectrum',
    summary: 'Dimensional trait vectors mapped along continuous spectra.',
    detail: 'Conscientiousness and emotional stability vectors govern pacing and risk-containment boundaries.',
    provenanceId: 'rec-dim-01',
    extractedClause: '“I clarify the constraints first”',
    readingAxis: 'Pacing & Risk Containment',
    scoreSnippet: 'C: 78 · ES: 64 · O: 72',
    baseWidthPct: 36,
    initialRotation: -1.2,
    verticalOffset: 0,
  },
  {
    id: 'riasec',
    name: 'RIASEC Vocational',
    summary: 'Holland occupational code alignment.',
    detail: 'Structured problem decomposition maps to Investigative and Conventional vocational profiles.',
    provenanceId: 'rec-voc-02',
    extractedClause: '“smallest reversible step”',
    readingAxis: 'Problem Decomposition',
    scoreSnippet: 'Investigative 72 · Conventional 68',
    baseWidthPct: 22,
    initialRotation: 1.8,
    verticalOffset: 24,
  },
  {
    id: 'work-values',
    name: 'Work Values',
    summary: 'Intrinsic motivation priorities in real workflows.',
    detail: 'Autonomy and self-directed execution prioritize high-independence workplace conditions.',
    provenanceId: 'rec-val-03',
    extractedClause: '“clarify constraints first”',
    readingAxis: 'Workplace Autonomy',
    scoreSnippet: 'Independence 84 · Achievement 80',
    baseWidthPct: 30,
    initialRotation: -1.5,
    verticalOffset: 12,
  },
  {
    id: 'signals',
    name: 'Behavioral Signals',
    summary: 'Iterative delivery cadence and scoping velocity.',
    detail: 'Small reversible increments indicate structured uncertainty mitigation and high execution velocity.',
    provenanceId: 'rec-sig-04',
    extractedClause: '“smallest reversible step”',
    readingAxis: 'Iterative Execution',
    scoreSnippet: 'Velocity: High · Risk: Low',
    baseWidthPct: 20,
    initialRotation: 2.2,
    verticalOffset: 32,
  },
];

export const EvidenceDeck = () => {
  const data = PUBLIC_CONTENT.home.readings;
  const [activeRecordId, setActiveRecordId] = useState('big-five');
  const { isMobile, prefersReducedMotion } = usePublicCapabilities();

  const activeIdx = RECORD_PROFILES.findIndex((r) => r.id === activeRecordId);

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (idx + 1) % RECORD_PROFILES.length;
      setActiveRecordId(RECORD_PROFILES[nextIdx].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (idx - 1 + RECORD_PROFILES.length) % RECORD_PROFILES.length;
      setActiveRecordId(RECORD_PROFILES[prevIdx].id);
    }
  };

  return (
    <section className="pa-px-ch-deck pa-px-evidence-objects-stage" aria-label="Evidence Objects Deck">
      <div className="pa-px-deck__header">
        <h2 className="pa-px-heading-xl">{data.headline}</h2>
        <p className="pa-px-lead">
          The same source response provides distinct physical evidence across four independent analytical frameworks.
        </p>
      </div>

      {/* Unequal Physical Overlapping Evidence Objects Stage */}
      <div
        className="pa-px-evidence-objects-field"
        role="region"
        aria-label="Overlapping Evidence Records"
      >
        {RECORD_PROFILES.map((record, idx) => {
          const isSelected = activeRecordId === record.id;
          const diff = idx - activeIdx;

          // Compute horizontal displacement for neighboring records
          let displacementX = 0;
          if (!prefersReducedMotion && !isMobile) {
            if (diff === -1) displacementX = -28;
            else if (diff < -1) displacementX = -14;
            else if (diff === 1) displacementX = 28;
            else if (diff > 1) displacementX = 14;
          }

          const translateY = isSelected ? -20 : record.verticalOffset;
          const scale = isSelected ? 1.035 : 1;
          const rotation = isSelected ? 0 : record.initialRotation;
          const zIndex = isSelected ? 20 : 10 - idx;

          return (
            <article
              key={record.id}
              className={`pa-px-evidence-object pa-px-evidence-object--${record.id} ${isSelected ? 'pa-px-evidence-object--selected' : ''}`}
              style={{
                flex: `0 0 ${record.baseWidthPct}%`,
                zIndex,
                transform: prefersReducedMotion
                  ? 'none'
                  : `translate3d(${displacementX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 280ms cubic-bezier(0.2, 0, 0, 1), box-shadow 280ms ease, border-color 280ms ease',
              }}
              onClick={() => setActiveRecordId(record.id)}
              onMouseEnter={() => setActiveRecordId(record.id)}
              tabIndex={0}
              onFocus={() => setActiveRecordId(record.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-expanded={isSelected}
              aria-label={`${record.name} Evidence Record`}
            >
              <div className="pa-px-evidence-object__surface">
                <header className="pa-px-evidence-object__meta">
                  <span className="pa-px-data pa-px-evidence-object__prov">
                    {record.provenanceId}
                  </span>
                  <span className="pa-px-evidence-object__framework">
                    {record.name}
                  </span>
                </header>

                <div className="pa-px-evidence-object__body">
                  <h3 className="pa-px-evidence-object__summary">
                    {record.summary}
                  </h3>
                  <p className="pa-px-evidence-object__detail">
                    {record.detail}
                  </p>
                </div>

                {/* Substantive Source Fragment Protrusion */}
                <div className="pa-px-evidence-object__source-fragment">
                  <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', fontSize: '0.72rem' }}>
                    SOURCE CLUSTER: {record.extractedClause}
                  </div>
                  <div className="pa-px-evidence-object__metric-pill">
                    <span className="pa-px-data" style={{ color: 'var(--pa-graphite)', display: 'block', fontSize: '0.68rem', marginBottom: '2px' }}>
                      Illustrative Example
                    </span>
                    {record.scoreSnippet}
                  </div>
                </div>

                <footer className="pa-px-evidence-object__footer">
                  <div className="pa-px-data pa-px-evidence-object__axis">
                    AXIS: {record.readingAxis}
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

