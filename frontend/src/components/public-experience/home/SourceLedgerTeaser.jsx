import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

const LAYER_DETAILS = {
  supplied: {
    label: 'SUPPLIED LAYER',
    summary: 'Raw participant response verbatim',
    data: '“I clarify the constraints first, then choose the smallest reversible step.”',
    provenance: 'Source ID: src-input-9042 · Direct participant entry',
  },
  inferred: {
    label: 'INFERRED LAYER',
    summary: 'Multi-dimensional trait vectors',
    data: 'Conscientiousness: 78 · Emotional Stability: 64 · Investigative: 72',
    provenance: 'Model: Dimensional Spectrum & Holland Vocational vectors',
  },
  calculated: {
    label: 'CALCULATED LAYER',
    summary: 'Deterministic career-fit weighting',
    data: '25% RIASEC + 25% Skills + 20% Values + 15% Traits + 10% Ed + 5% Goals',
    provenance: 'Engine: Pure mathematical formula · Zero black-box weights',
  },
};

export const SourceLedgerTeaser = () => {
  const data = PUBLIC_CONTENT.home.trace;
  const [activeLayer, setActiveLayer] = useState('calculated');
  const activeConfig = LAYER_DETAILS[activeLayer] || LAYER_DETAILS.calculated;

  return (
    <section className="pa-px-ch-trust-teaser pa-px-ledger-teaser-stage" aria-label="Source Ledger and Trust Teaser">
      <div className="pa-px-ledger-teaser__inner">
        <div className="pa-px-ledger-teaser__content">
          <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
            PROVENANCE LEDGER &middot; TACTILE APERTURE
          </div>
          <h2 className="pa-px-heading-xl">{data.headline}</h2>
          <p className="pa-px-lead" style={{ marginBottom: '24px' }}>
            {data.support}
          </p>

          <div className="pa-px-ledger-layer-tabs" role="tablist" aria-label="Inspection layers">
            {['supplied', 'inferred', 'calculated'].map((layer) => (
              <button
                key={layer}
                type="button"
                role="tab"
                aria-selected={activeLayer === layer}
                className={`pa-px-ledger-tab-btn ${activeLayer === layer ? 'pa-px-ledger-tab-btn--active' : ''}`}
                onClick={() => setActiveLayer(layer)}
              >
                {layer} Layer
              </button>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <Link to="/trust" className="pa-px-btn-secondary">
              Inspect Full Provenance Chain &rarr;
            </Link>
          </div>
        </div>

        {/* Tactile Inspection Aperture Card */}
        <div className="pa-px-ledger-teaser__card" aria-live="polite">
          <div className="pa-px-ledger-teaser__media-frame">
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Diagnostic measurement instrument calibration"
            />
          </div>
          <div className="pa-px-ledger-teaser__body">
            <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', marginBottom: '4px' }}>
              {activeConfig.label}
            </div>
            <h3 className="pa-px-heading-subsection" style={{ marginBottom: '6px' }}>
              {activeConfig.summary}
            </h3>
            <p className="pa-px-body" style={{ color: 'var(--pa-ink)', fontWeight: 500 }}>
              {activeConfig.data}
            </p>
            <div className="pa-px-data" style={{ marginTop: '10px', color: 'var(--pa-context)' }}>
              {activeConfig.provenance}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SourceLedgerTeaser;
