import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import CalibrationBaseline from '../../components/personality-v7/living-record/CalibrationBaseline';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import './EditorialHowItWorksPage.css';

/**
 * EditorialHowItWorksPage
 * Operating Mode: The Evidence Engine
 * One continuous pipeline tracking a single situational response through:
 * Question Prompt -> Retained Source -> Multi-Dimensional Extraction -> Scoring Validity -> Calibration Baseline -> Stored Record.
 */
export const EditorialHowItWorksPage = () => {
  const { navigateWithTransition } = useRouteTransition();

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        <div className="pa-engine-page" role="main" id="main-content">
          {/* Continuous Engine Hero */}
          <section className="pa-engine-hero" aria-label="Evidence Engine Overview">
            <div className="pa-engine-hero__media">
              <EnvironmentPlane
                asset={MEDIA_ASSETS_V7.howProcess}
                role="primary"
                priority={true}
                caption="ENGINE RUNTIME / REAL-TIME EVIDENCE PROCESSING"
              />
            </div>

            <div className="pa-engine-hero__overlay">
              <div className="pa-engine-hero__header">
                <span className="pa-engine-hero__meta-tag">OPERATIONAL PIPELINE</span>
                <h1 className="pa-engine-hero__h1">
                  From a single response to an ongoing record.
                </h1>
                <p className="pa-engine-hero__lead">
                  Follow how one situational answer generates evidence across multiple psychological
                  and career dimensions without losing its source.
                </p>
              </div>
            </div>
          </section>

          {/* Continuous Pipeline Stage Container */}
          <div className="pa-engine-pipeline">
            {/* Step A: Real Prompt & Illustrative Response */}
            <div className="pa-engine-pipeline__node pa-engine-pipeline__node--prompt">
              <div className="pa-engine-pipeline__header">
                <span className="pa-engine-pipeline__meta-tag">QUESTION SPECIMEN</span>
                <h2 className="pa-engine-pipeline__title">Situational decision prompt</h2>
                <p className="pa-engine-pipeline__sub">
                  Real psychometric items present grounded working trade-offs rather than generic self-rating scales.
                </p>
              </div>

              <div className="pa-engine-pipeline__prompt-specimen">
                <span className="pa-engine-pipeline__prompt-id">ID: technical-depth-intermediate</span>
                <blockquote className="pa-engine-pipeline__prompt-quote">
                  “How do you decide whether a problem needs a quick patch or a deeper redesign?”
                </blockquote>
              </div>

              <div className="pa-engine-pipeline__strip-wrap">
                <EvidenceStrip
                  quote="“I investigate the architecture, debug the root issue, clarify the tradeoff with stakeholders, and choose an independent plan that leaves room to learn.”"
                  eyebrow="ILLUSTRATIVE RESPONSE"
                  sourceLabel="SOURCE RETAINED / RAW HUMAN SPECIMEN"
                  theme="carbon"
                  variant="source"
                />
              </div>
            </div>

            {/* Step B: Multi-Dimension Qualitative Evidence Extraction */}
            <div className="pa-engine-pipeline__node pa-engine-pipeline__node--extraction">
              <div className="pa-engine-pipeline__header">
                <span className="pa-engine-pipeline__meta-tag">DIMENSIONAL MAPPING</span>
                <h2 className="pa-engine-pipeline__title">Multi-dimensional extraction</h2>
                <p className="pa-engine-pipeline__sub">
                  One statement produces discrete qualitative evidence atoms across foundational framework families.
                </p>
              </div>

              <div className="pa-engine-pipeline__open-records">
                <div className="pa-engine-pipeline__record-row">
                  <span className="pa-engine-pipeline__dim-label">BIG FIVE</span>
                  <span className="pa-engine-pipeline__key-label">Openness</span>
                  <p className="pa-engine-pipeline__signal-text">
                    Architectural root-cause inquiry, systems curiosity, and willingness to redesign fundamental mechanisms.
                  </p>
                </div>

                <div className="pa-engine-pipeline__record-row">
                  <span className="pa-engine-pipeline__dim-label">RIASEC</span>
                  <span className="pa-engine-pipeline__key-label">Investigative</span>
                  <p className="pa-engine-pipeline__signal-text">
                    Analytical problem framing and deep debugging preference before committing changes.
                  </p>
                </div>

                <div className="pa-engine-pipeline__record-row">
                  <span className="pa-engine-pipeline__dim-label">WORK VALUES</span>
                  <span className="pa-engine-pipeline__key-label">Independence & Learning</span>
                  <p className="pa-engine-pipeline__signal-text">
                    Autonomous decision authority and priority placed on continuous skill acquisition.
                  </p>
                </div>

                <div className="pa-engine-pipeline__record-row">
                  <span className="pa-engine-pipeline__dim-label">CAREER SIGNALS</span>
                  <span className="pa-engine-pipeline__key-label">Technical Depth & Stakeholder Synthesis</span>
                  <p className="pa-engine-pipeline__signal-text">
                    Rigorous problem framing paired with proactive cross-functional trade-off clarification.
                  </p>
                </div>
              </div>
            </div>

            {/* Step C: Scoring Validity Gate */}
            <div className="pa-engine-pipeline__node pa-engine-pipeline__node--validity">
              <div className="pa-engine-pipeline__header">
                <span className="pa-engine-pipeline__meta-tag">INTEGRITY CHECK</span>
                <h2 className="pa-engine-pipeline__title">Deterministic score validity</h2>
                <p className="pa-engine-pipeline__sub">
                  Evidence is validated against response consistency and minimum evidence thresholds before scores are finalized.
                </p>
              </div>

              <div className="pa-engine-pipeline__validity-readout">
                <div className="pa-engine-pipeline__validity-item">
                  <span className="pa-engine-pipeline__validity-key">STATUS</span>
                  <span className="pa-engine-pipeline__validity-val">VALID</span>
                </div>
                <div className="pa-engine-pipeline__validity-item">
                  <span className="pa-engine-pipeline__validity-key">INTEGRITY GUARD</span>
                  <span className="pa-engine-pipeline__validity-val">PASSED</span>
                </div>
                <div className="pa-engine-pipeline__validity-item">
                  <span className="pa-engine-pipeline__validity-key">CALCULATION ENGINE</span>
                  <span className="pa-engine-pipeline__validity-val">DETERMINISTIC</span>
                </div>
              </div>
            </div>

            {/* Step D: Calibration Baseline */}
            <div className="pa-engine-pipeline__node pa-engine-pipeline__node--calibration">
              <div className="pa-engine-pipeline__header">
                <span className="pa-engine-pipeline__meta-tag">PROFILE WEIGHTING</span>
                <h2 className="pa-engine-pipeline__title">Career calibration baseline</h2>
                <p className="pa-engine-pipeline__sub">
                  The evidence feeds directly into the 6-layer deterministic fit scale without opaque weighting changes.
                </p>
              </div>

              <div className="pa-engine-pipeline__calibration-wrap">
                <CalibrationBaseline theme="carbon" />
              </div>
            </div>

            {/* Step E: Stored Living Record Finale */}
            <div className="pa-engine-pipeline__node pa-engine-pipeline__node--stored">
              <div className="pa-engine-pipeline__header">
                <span className="pa-engine-pipeline__meta-tag">PERSISTENCE</span>
                <h2 className="pa-engine-pipeline__title">The stored living record</h2>
                <p className="pa-engine-pipeline__sub">
                  The source answer remains attached to all derived signals, ready for longitudinal comparison across assessments.
                </p>
              </div>

              <div className="pa-engine-pipeline__strip-wrap">
                <EvidenceStrip
                  quote="“I investigate the architecture, debug the root issue, clarify the tradeoff with stakeholders, and choose an independent plan that leaves room to learn.”"
                  eyebrow="STORED ASSESSMENT RECORD"
                  sourceLabel="STORED RECORD / PROVENANCE SECURED"
                  theme="mineral"
                  variant="inspect"
                  accumulatedMarks={true}
                  provenanceData={{
                    source: 'answer',
                    sourceId: 'technical-depth-intermediate',
                    dimension: 'bigFive',
                    key: 'openness',
                    direction: 'positive',
                    scoringSource: 'deterministic',
                  }}
                />
              </div>

              <div className="pa-engine-pipeline__actions">
                <a
                  href="/signup"
                  className="pa-btn pa-btn--primary"
                  onClick={(e) => handleCtaClick(e, '/signup')}
                >
                  Start your initial record &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
