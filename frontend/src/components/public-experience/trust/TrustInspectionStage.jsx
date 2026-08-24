import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const TrustInspectionStage = () => {
  const data = PUBLIC_CONTENT.trust;

  return (
    <div className="pa-px-trust-root">
      <div className="pa-px-trust-hero">
        <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
          Mathematical Provenance & Custody
        </span>
        <h1>{data.hero.headline}</h1>
        <p>{data.hero.support}</p>
      </div>

      <div className="pa-px-trust-layers" aria-label="Five Evidence Layers">
        {data.layers.map((layer) => (
          <div key={layer.id} className="pa-px-trust-layer-item">
            <div className="pa-px-trust-layer-item__meta">
              <span>Stage {layer.id}</span>
              <h3>{layer.title}</h3>
            </div>
            <div className="pa-px-trust-layer-item__desc">
              <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--px-white)' }}>
                {layer.subtitle}
              </strong>
              <p>{layer.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pa-px-trust-rights-section">
        <h2>SOVEREIGN DATA RIGHTS</h2>
        <div className="pa-px-trust-rights-grid">
          {data.rights.map((r) => (
            <div key={r.id} className="pa-px-trust-right-card">
              <span className="pa-px-context-data" style={{ color: 'var(--px-soft)' }}>Sovereign Control</span>
              <h4>{r.label}</h4>
              <p>{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustInspectionStage;
