import React from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../PublicChrome';

const trustStages = [
  {
    label: 'Context',
    line: 'Authentic starting anchors from verified background records.',
  },
  {
    label: 'Structured scoring',
    line: 'Deterministic psychometric algorithms across four separate readings.',
  },
  {
    label: 'Narrative assistance',
    line: 'AI drafts qualitative summaries; it never overrides numeric scores.',
  },
  {
    label: 'Your controls',
    line: 'Direct data export, granular deletion, and account erasure.',
  },
];

export default function TrustResolution() {
  return (
    <section
      id="scene-trust-resolution"
      className="trust-resolution-v4"
      data-header-scene="dark"
      aria-labelledby="trust-resolution-title"
    >
      <div className="trust-resolution-v4-inner">
        <header className="trust-resolution-v4-header">
          <h2 id="trust-resolution-title" className="trust-resolution-v4-title">
            See what shaped the result.
          </h2>
          <p className="trust-resolution-v4-support">
            Clear boundaries between deterministic psychometrics, AI qualitative assistance, and your direct data controls.
          </p>
        </header>

        {/* Single Connected Provenance Line (No Individual Cards / No 01-04 Tags) */}
        <div className="trust-provenance-flow" aria-label="Data and governance provenance">
          {trustStages.map((stage, idx) => (
            <div key={stage.label} className="trust-provenance-stage">
              <div className="trust-provenance-head">
                <span className="trust-provenance-node-marker" aria-hidden="true" />
                <strong className="trust-provenance-label">{stage.label}</strong>
              </div>
              <p className="trust-provenance-line">{stage.line}</p>
              {idx < trustStages.length - 1 && (
                <div className="trust-provenance-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Action Reassurance */}
        <div className="trust-resolution-cta-row">
          <Link className="public-cta-button public-cta-button--primary" to="/methodology">
            Inspect Full Methodology <Arrow />
          </Link>
          <Link className="public-text-action public-text-action--light" to="/privacy">
            Review Data Governance
          </Link>
        </div>
      </div>
    </section>
  );
}
