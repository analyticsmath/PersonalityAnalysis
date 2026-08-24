import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const MethodologyEditorial = () => {
  const data = PUBLIC_CONTENT.methodology;

  return (
    <div className="pa-px-methodology-root">
      <div className="pa-px-methodology-hero">
        <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
          Psychometric Standards & Calibration
        </span>
        <h1>{data.hero.headline}</h1>
        <p>{data.hero.support}</p>
      </div>

      <div className="pa-px-methodology-frameworks" aria-label="Methodological Frameworks">
        {data.frameworks.map((fw) => (
          <div key={fw.id} className="pa-px-methodology-item">
            <div>
              <span>{fw.role}</span>
              <h3>{fw.name}</h3>
            </div>
            <div>
              <p>{fw.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MethodologyEditorial;
