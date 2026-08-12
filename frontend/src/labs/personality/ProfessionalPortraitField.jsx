import React from 'react';
import { proofDemo } from './personalityResetProofData';

export default function ProfessionalPortraitField({ career, compact = false }) {
  const comparison = career ? proofDemo.careers[career] : null;
  let index = 0;

  return (
    <section className={`proof-portrait ${compact ? 'proof-portrait--compact' : ''}`} aria-labelledby="proof-portrait-title">
      <div className="proof-portrait__head">
        <div><p>Professional Portrait</p><h2 id="proof-portrait-title">One field. 23 dimensions.</h2></div>
        <small>{proofDemo.label}</small>
      </div>
      <div className="proof-portrait__field">
        {proofDemo.portrait.map((group) => (
          <section className="proof-band-group" key={group.id} aria-labelledby={`proof-group-${group.id}`}>
            <h3 id={`proof-group-${group.id}`}>{group.label} <span>{group.dimensions.length}</span></h3>
            <div className="proof-band-group__bands">
              {group.dimensions.map(([label, value]) => {
                const fit = comparison?.alignment[index] ?? null;
                const isEmphasis = comparison?.emphasis.includes(label);
                index += 1;
                return <div className={`proof-band ${isEmphasis ? 'is-emphasis' : ''}`} key={label}>
                  <span>{label}</span><i aria-hidden="true"><b style={{ width: `${value}%` }} />{fit !== null && <em style={{ width: `${fit}%` }} />}</i>
                  <strong className="sr-only">{`${label}: ${value} demonstration profile extent${fit !== null ? `; ${comparison.name} comparison extent ${fit}` : ''}`}</strong>
                </div>;
              })}
            </div>
          </section>
        ))}
      </div>
      <p className="proof-portrait__summary">This is demonstration data. The bands keep the profile dimensions distinct; they are not a combined score or prediction.</p>
    </section>
  );
}

