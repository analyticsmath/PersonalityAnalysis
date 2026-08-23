import React, { useState } from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import ProvenanceTrace from '../../components/personality-v7/living-record/ProvenanceTrace';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { useCursor } from '../../components/personality-v7/motion/CursorCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import './EditorialTrustPage.css';

const STAGE_DETAILS = {
  supplied: {
    title: 'Supplied response',
    desc: 'You provide answers to situational work prompts. Your raw words remain attached as the original source context.',
    metaKey: 'INPUT TYPE',
    metaVal: 'Raw human situational response',
  },
  inferred: {
    title: 'Inferred evidence atoms',
    desc: 'Discrete atomic records are parsed across Big Five, RIASEC, and Work Values without discarding the original prompt.',
    metaKey: 'EXTRACTION METHOD',
    metaVal: 'Structured evidence schema',
  },
  calculated: {
    title: 'Calculated deterministic scores',
    desc: 'Scores are computed using deterministic scoring algorithms, checking validity coverage and calculating confidence.',
    metaKey: 'SCORING ENGINE',
    metaVal: 'Deterministic rule calculation',
  },
  compared: {
    title: 'Compared career benchmarks',
    desc: 'Your evidence record is matched against curated occupational profiles using explicit 6-layer fit weights.',
    metaKey: 'CALIBRATION',
    metaVal: 'Deterministic 6-tier fit scale',
  },
  assisted: {
    title: 'Assisted reflection',
    desc: 'Where enabled, generative AI provides narrative summaries and coaching reflections subordinate to deterministic scores.',
    metaKey: 'AI ROLE',
    metaVal: 'Subordinate narrative synthesis only',
  },
  controlled: {
    title: 'Controlled export & erasure',
    desc: 'You can export your complete assessment history and dimensional scores as structured JSON, or delete your record from our primary database.',
    metaKey: 'USER CONTROL',
    metaVal: 'Self-service JSON export & account deletion',
  },
};

const GROUNDED_PROVENANCE_QUOTE =
  '“When ownership is unclear, I clarify stakeholders, investigate the issue, organize the work, choose an independent plan, and learn from the result.”';

export const EditorialTrustPage = () => {
  const [activeStage, setActiveStage] = useState('supplied');
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel } = useCursor();

  const currentDetail = STAGE_DETAILS[activeStage] || STAGE_DETAILS.supplied;

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    clearCursorLabel();
    navigateWithTransition(to);
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <div className="pa-trust-page" data-tone="dark">
          {/* Section 1: Hero & Interactive Traceback Stage (Shared Spatial Field) */}
          <section className="pa-trust-hero" aria-label="Trust and Provenance Architecture">
            <div className="pa-trust-hero__stage-field">
              {/* Shared Photographic Spatial Backdrop */}
              <div className="pa-trust-hero__media-backdrop">
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

              {/* Foreground Content in Same Spatial Field */}
              <div className="pa-trust-hero__foreground">
                <div className="pa-trust-hero__header">
                  <h1 className="pa-trust-hero__h1">
                    Every reading traces back to what created it.
                  </h1>
                  <p className="pa-trust-hero__lead">
                    Personality Assessor does not use opaque prediction or irreversible categorization.
                    Trace any conclusion back through its entire calculation path.
                  </p>
                </div>

                {/* Provenance Interactive Sequence */}
                <div
                  className="pa-trust-hero__trace-wrap"
                  onMouseEnter={() => setCursorLabel('TRACE')}
                  onMouseLeave={clearCursorLabel}
                >
                  <ProvenanceTrace
                    activeStage={activeStage}
                    onSelectStage={(k) => setActiveStage(k)}
                  />
                </div>

                {/* Open Stage Readout (Unboxed, no chip clouds) */}
                <div className="pa-trust-hero__stage-readout" aria-live="polite">
                  <span className="pa-trust-hero__stage-tag">{currentDetail.metaKey}</span>
                  <h3 className="pa-trust-hero__stage-title">{currentDetail.title}</h3>
                  <p className="pa-trust-hero__stage-desc">{currentDetail.desc}</p>
                  <span className="pa-trust-hero__stage-spec">{currentDetail.metaVal}</span>
                </div>

                {/* Anchored Specimen Strip */}
                <div className="pa-trust-hero__strip-wrap">
                  <EvidenceStrip
                    quote={GROUNDED_PROVENANCE_QUOTE}
                    eyebrow="VERIFIABLE EVIDENCE RECORD"
                    sourceLabel="PROVENANCE: COMPLETE TRACE"
                    theme="mineral"
                    variant="inspect"
                    isInspecting={true}
                    provenanceData={{
                      source: 'answer',
                      sourceId: 'initiative-pattern-intermediate',
                      dimension: 'bigFive',
                      key: 'extraversion',
                      direction: 'positive',
                      scoringSource: 'deterministic',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Open Editorial Data Rights (Asymmetric Reading Field) */}
          <section className="pa-trust-rights" aria-label="User Data Rights">
            <div className="pa-trust-rights__inner">
              <div className="pa-trust-rights__header">
                <h2 className="pa-trust-rights__h2">Your data, your record, your control.</h2>
                <p className="pa-trust-rights__lead">
                  We believe psychometric data should belong entirely to the individual.
                  Our infrastructure enforces transparent ownership and straightforward rights.
                </p>
              </div>

              <div className="pa-trust-rights__asymmetric-field">
                <div className="pa-trust-rights__col pa-trust-rights__col--dominant">
                  <span className="pa-trust-rights__col-tag">DATA OWNERSHIP</span>
                  <h3 className="pa-trust-rights__col-title">No commercial data sales</h3>
                  <p className="pa-trust-rights__col-desc">
                    Your responses, personality scores, and career comparisons are never sold to employers,
                    recruiters, advertisers, or third-party data brokers.
                  </p>
                </div>

                <div className="pa-trust-rights__col pa-trust-rights__col--export">
                  <span className="pa-trust-rights__col-tag">EXPORT & ACCESSIBILITY</span>
                  <h3 className="pa-trust-rights__col-title">Structured JSON export</h3>
                  <p className="pa-trust-rights__col-desc">
                    You can download a complete export of your raw responses, dimensional scores,
                    and career calibrations in standard JSON format at any time.
                  </p>
                </div>

                <div className="pa-trust-rights__col pa-trust-rights__col--erasure">
                  <span className="pa-trust-rights__col-tag">RIGHT TO ERASURE</span>
                  <h3 className="pa-trust-rights__col-title">Complete account deletion</h3>
                  <p className="pa-trust-rights__col-desc">
                    When you delete your account, your user record, assessment sessions, raw responses,
                    and generated reports are permanently removed from our primary database.
                  </p>
                </div>
              </div>

              <div className="pa-trust-rights__actions">
                <a
                  href="/signup"
                  className="pa-btn pa-btn--primary"
                  onClick={(e) => handleCtaClick(e, '/signup')}
                >
                  Create an inspectable record &rarr;
                </a>
              </div>
            </div>
          </section>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialTrustPage;
