import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

export const SourceLedgerTeaser = () => {
  const data = PUBLIC_CONTENT.home.trace;
  const [activeLayer, setActiveLayer] = useState('calculated');

  return (
    <section className="pa-px-ch-trust-teaser" aria-label="Source Ledger and Trust Teaser">
      <div className="pa-px-ch-trust-teaser__inner">
        <div>
          <span className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase' }}>
            Provenance and Verification
          </span>
          <h2 className="pa-px-heading-xl" style={{ marginTop: '8px', marginBottom: '16px' }}>
            {data.headline}
          </h2>
          <p className="pa-px-body-lg" style={{ marginBottom: '24px' }}>
            {data.support}
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['source', 'inferred', 'calculated'].map((layer) => (
              <button
                key={layer}
                type="button"
                className={`pa-px-btn-${activeLayer === layer ? 'primary' : 'secondary'}`}
                style={{ height: '38px', padding: '0 16px', fontSize: '0.85rem', textTransform: 'capitalize' }}
                onClick={() => setActiveLayer(layer)}
              >
                {layer} Layer
              </button>
            ))}
          </div>

          <Link to="/trust" className="pa-px-btn-text">
            Inspect the complete provenance record &rarr;
          </Link>
        </div>

        <div style={{ background: 'var(--pa-white)', padding: 'var(--px-space-content)', borderRadius: 'var(--px-radius-sm)', border: '1px solid var(--pa-mineral)' }}>
          <div style={{ width: '100%', aspectRatio: '16 / 10', borderRadius: 'var(--px-radius-xs)', overflow: 'hidden', marginBottom: '16px' }}>
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Diagnostic measurement instrument calibration"
            />
          </div>
          <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', marginBottom: '6px' }}>
            LAYER: {activeLayer.toUpperCase()}
          </div>
          <p className="pa-px-body" style={{ color: 'var(--pa-ink)', fontWeight: 500 }}>
            {activeLayer === 'source' && 'Verbatim participant input: "I clarify the constraints first, then choose the smallest reversible step."'}
            {activeLayer === 'inferred' && 'Extracted Trait Vectors: Conscientiousness 78, Emotional Stability 64, Investigative 72.'}
            {activeLayer === 'calculated' && 'Deterministic Career-Fit Weighting: 25% RIASEC + 25% Skills + 20% Values + 15% Traits + 10% Ed + 5% Goals.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SourceLedgerTeaser;
