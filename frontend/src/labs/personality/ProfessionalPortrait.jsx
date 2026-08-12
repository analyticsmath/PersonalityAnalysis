import React from 'react';

const layers = [
  ['01', 'BIG FIVE', 'How you tend to respond'],
  ['02', 'VOCATIONAL INTERESTS', 'What draws your attention'],
  ['03', 'WORK VALUES', 'What makes work sustainable'],
  ['04', 'CAREER SIGNALS', 'Where evidence begins to align'],
];

export default function ProfessionalPortrait({ condensed = false }) {
  return (
    <section className={`pa-portrait ${condensed ? 'pa-portrait--condensed' : ''}`} aria-label="Professional Portrait structure">
      <div className="pa-portrait__head">
        <span>PROFESSIONAL PORTRAIT</span>
        <span>ILLUSTRATIVE STRUCTURE / NO SCORES</span>
      </div>
      <div className="pa-portrait__field" aria-hidden="true">
        <i className="pa-portrait__axis pa-portrait__axis--vertical" />
        <i className="pa-portrait__axis pa-portrait__axis--horizontal" />
        <i className="pa-portrait__mark pa-portrait__mark--one" />
        <i className="pa-portrait__mark pa-portrait__mark--two" />
        <i className="pa-portrait__mark pa-portrait__mark--three" />
        <i className="pa-portrait__mark pa-portrait__mark--four" />
        <span className="pa-portrait__center">EVIDENCE<br />IN CONTEXT</span>
      </div>
      <ol className="pa-portrait__layers">
        {layers.map(([index, name, description]) => (
          <li key={name}>
            <span>{index}</span>
            <strong>{name}</strong>
            <em>{description}</em>
          </li>
        ))}
      </ol>
    </section>
  );
}
