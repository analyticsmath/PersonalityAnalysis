import React from 'react';
import { Link } from 'react-router-dom';
import { Arrow } from '../PublicChrome';

const trustPillars = [
  {
    tag: '01. Input',
    title: 'Professional Context',
    desc: 'CV uploads or manual career history provide authentic starting anchors without forced zero-baselines.',
  },
  {
    tag: '02. Compute',
    title: 'Deterministic Scoring',
    desc: 'Big Five, RIASEC, Work Values and Career Signals use versioned deterministic algorithms, never black-box guesses.',
  },
  {
    tag: '03. Separation',
    title: 'Narrative Assistance Role',
    desc: 'AI drafts qualitative summaries and context reflections; it never modifies, fabricates or overrides numeric scores.',
  },
  {
    tag: '04. Governance',
    title: 'Direct User Controls',
    desc: 'You can export data, selectively delete assessments, or permanently erase your account at any time.',
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

        {/* Provenance Pipeline Cards / Nodes */}
        <div className="trust-pipeline-flow">
          {trustPillars.map((pillar) => (
            <div key={pillar.tag} className="trust-pipeline-node">
              <span className="trust-pipeline-tag">{pillar.tag}</span>
              <h3 className="trust-pipeline-title">{pillar.title}</h3>
              <p className="trust-pipeline-desc">{pillar.desc}</p>
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
