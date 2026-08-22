import React, { useState } from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import ProvenanceTrace from '../../components/personality-v7/living-record/ProvenanceTrace';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import './EditorialTrustPage.css';

const STAGE_DETAILS = {
  supplied: {
    title: 'Supplied Response',
    desc: 'You provide answers to situational work prompts. Your raw words remain attached as the original source context.',
    meta: { type: 'Raw Answer', encryption: 'AES-256 at rest', scope: 'User owned' },
  },
  inferred: {
    title: 'Inferred Evidence Atoms',
    desc: 'Discrete atomic records are parsed across Big Five, RIASEC, and Work Values without discarding the original prompt.',
    meta: { type: 'Evidence Builder', format: 'Structured schema', deterministic: 'Yes' },
  },
  calculated: {
    title: 'Calculated Deterministic Scores',
    desc: 'Scores are computed using deterministic scoring algorithms, checking validity coverage and calculating confidence.',
    meta: { type: 'Orchestrator', validityState: 'valid | partial | insufficient_data', aiInvolvement: 'None' },
  },
  compared: {
    title: 'Compared Career Benchmarks',
    desc: 'Your evidence record is matched against curated occupational profiles using explicit 6-layer fit weights.',
    meta: { type: 'Fit Calculator', layers: '6 deterministic weights', ranking: 'Non-opaque' },
  },
  assisted: {
    title: 'Assisted Reflection (Optional)',
    desc: 'If enabled, AI provides narrative summaries and coaching reflections subordinate to deterministic scores.',
    meta: { type: 'LLM Coaching', role: 'Subordinate narrative', alterScores: 'No' },
  },
  controlled: {
    title: 'Controlled Export & Erasure',
    desc: 'You can inspect your full evidence graph, export your raw and calculated data as JSON, or permanently delete your record.',
    meta: { type: 'User Rights', exportFormat: 'JSON / PDF', rightToBeForgotten: 'Immediate purge' },
  },
};

export const EditorialTrustPage = () => {
  const [activeStage, setActiveStage] = useState('supplied');
  const { navigateWithTransition } = useRouteTransition();

  const currentDetail = STAGE_DETAILS[activeStage] || STAGE_DETAILS.supplied;

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* ── Section 1: Hero & Traceback Stage ── */}
        <section className="pa-trust-hero" aria-label="Trust and Provenance Architecture">
          <div className="pa-trust-hero__inner">
            <div className="pa-trust-hero__media-col">
              <div className="pa-trust-hero__primary-media">
                <EnvironmentPlane
                  asset={MEDIA_ASSETS_V7.trustInspection}
                  role="primary"
                  priority={true}
                  caption="DOCUMENTARY INSPECTION / VERIFIABLE PROVENANCE"
                />
              </div>
              <div className="pa-trust-hero__diag-media">
                <EnvironmentPlane
                  asset={MEDIA_ASSETS_V7.trustDiagnostic}
                  role="support"
                  caption="DIAGNOSTIC EVIDENCE DETAIL"
                />
              </div>
            </div>

            <div className="pa-trust-hero__content">
              <span className="pa-trust-hero__eyebrow">PROVENANCE & CONTROL</span>
              <h1 className="pa-trust-hero__h1">
                Every reading traces back to what created it.
              </h1>
              <p className="pa-trust-hero__lead">
                Personality Assessor does not use opaque prediction or irreversible categorization. Trace any conclusion back through its entire calculation path.
              </p>

              {/* Provenance Interactive Sequence */}
              <div className="pa-trust-hero__trace-wrap">
                <ProvenanceTrace
                  activeStage={activeStage}
                  onSelectStage={(k) => setActiveStage(k)}
                />
              </div>

              {/* Active Stage Detail Box */}
              <div className="pa-trust-hero__detail-box" aria-live="polite">
                <span className="pa-trust-hero__detail-tag">STAGE INSPECTION</span>
                <h3 className="pa-trust-hero__detail-title">{currentDetail.title}</h3>
                <p className="pa-trust-hero__detail-desc">{currentDetail.desc}</p>
                <div className="pa-trust-hero__detail-meta">
                  {Object.entries(currentDetail.meta).map(([k, v]) => (
                    <span key={k} className="pa-trust-hero__meta-chip">
                      <strong>{k}:</strong> {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: User Control & Rights ── */}
        <section className="pa-trust-rights" aria-label="User Data Rights">
          <div className="pa-trust-rights__inner">
            <div className="pa-trust-rights__header">
              <span className="pa-trust-rights__eyebrow">GUARANTEES & PRIVACY</span>
              <h2 className="pa-trust-rights__h2">Your Data, Your Record, Your Control</h2>
              <p className="pa-trust-rights__lead">
                We believe psychometric data should belong entirely to the individual.
              </p>
            </div>

            <div className="pa-trust-rights__grid">
              <div className="pa-trust-rights__card">
                <strong className="pa-trust-rights__card-title">Full Exportability</strong>
                <p className="pa-trust-rights__card-desc">
                  Download your complete Living Record including raw answers, atomic evidence records, trait scores, and career fit vectors as structured JSON.
                </p>
              </div>

              <div className="pa-trust-rights__card">
                <strong className="pa-trust-rights__card-title">Permanent Erasure</strong>
                <p className="pa-trust-rights__card-desc">
                  Delete your account and all associated evidence records at any time. When deleted, all records are permanently purged from active and backup storage.
                </p>
              </div>

              <div className="pa-trust-rights__card">
                <strong className="pa-trust-rights__card-title">Zero Third-Party Brokerage</strong>
                <p className="pa-trust-rights__card-desc">
                  Your assessment responses are never sold, rented, or distributed to recruiters, employers, advertisers, or third-party training pipelines.
                </p>
              </div>
            </div>

            <div className="pa-trust-rights__actions">
              <a
                href="/signup"
                className="pa-btn pa-btn--primary"
                onClick={(e) => handleCtaClick(e, '/signup')}
              >
                Create your verified profile →
              </a>
              <a
                href="/privacy"
                className="pa-btn pa-btn--quiet"
                onClick={(e) => handleCtaClick(e, '/privacy')}
              >
                Read full privacy policy
              </a>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialTrustPage;
