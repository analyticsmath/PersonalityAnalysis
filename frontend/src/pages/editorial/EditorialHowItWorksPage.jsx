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
 * Operating Mode: Evidence Engine
 * Demonstrates the full lifecycle of a single response through the deterministic engine:
 * Prompt -> Source Record -> Evidence Extraction -> Scoring Validity -> Calibration -> Stored Record.
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
        {/* ── Engine Hero Stage ── */}
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
              <span className="pa-engine-hero__eyebrow">THE EVIDENCE ENGINE</span>
              <h1 className="pa-engine-hero__h1">
                From a single response
                <br />
                to an ongoing record.
              </h1>
              <p className="pa-engine-hero__lead">
                Follow how one situational answer generates evidence across multiple psychological and career dimensions without losing its source.
              </p>
            </div>
          </div>
        </section>

        {/* ── Step 1: Real Question Prompt Bank ── */}
        <section className="pa-engine-step pa-engine-step--prompt" aria-label="Step 1: Input question prompt">
          <div className="pa-engine-step__inner">
            <div className="pa-engine-step__meta">
              <span className="pa-engine-step__num">STAGE 01</span>
              <h2 className="pa-engine-step__title">Question Prompt & Response</h2>
              <p className="pa-engine-step__desc">
                Assessments present realistic working scenarios rather than generic self-rating sliders.
              </p>
            </div>

            <div className="pa-engine-step__prompt-box">
              <div className="pa-engine-step__prompt-header">
                <span className="pa-engine-step__prompt-tag">QUESTION PROMPT</span>
                <span className="pa-engine-step__prompt-id">ID: initiative-pattern-intermediate</span>
              </div>
              <blockquote className="pa-engine-step__prompt-text">
                “Describe how you take initiative when a project has unclear ownership.”
              </blockquote>
            </div>

            <div className="pa-engine-step__strip-wrap">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="SUPPLIED ANSWER"
                sourceLabel="SOURCE / RAW HUMAN RESPONSE"
                theme="carbon"
                variant="source"
              />
            </div>
          </div>
        </section>

        {/* ── Step 2: Multi-Dimension Evidence Extraction ── */}
        <section className="pa-engine-step pa-engine-step--extraction" aria-label="Step 2: Evidence extraction">
          <div className="pa-engine-step__inner">
            <div className="pa-engine-step__meta">
              <span className="pa-engine-step__num">STAGE 02</span>
              <h2 className="pa-engine-step__title">Multi-Dimension Extraction</h2>
              <p className="pa-engine-step__desc">
                The evidence builder generates discrete atomic records across four foundational framework families.
              </p>
            </div>

            <div className="pa-engine-step__extraction-grid">
              <div className="pa-engine-step__record-item">
                <span className="pa-engine-step__record-dim">BIG FIVE</span>
                <strong className="pa-engine-step__record-trait">Conscientiousness</strong>
                <span className="pa-engine-step__record-val">Direction: Positive (+0.6)</span>
                <span className="pa-engine-step__record-note">Systematic clarity and execution rigor</span>
              </div>

              <div className="pa-engine-step__record-item">
                <span className="pa-engine-step__record-dim">RIASEC</span>
                <strong className="pa-engine-step__record-trait">Investigative / Conventional</strong>
                <span className="pa-engine-step__record-val">Direction: Positive (+0.5)</span>
                <span className="pa-engine-step__record-note">Analytical problem structuring & procedural care</span>
              </div>

              <div className="pa-engine-step__record-item">
                <span className="pa-engine-step__record-dim">WORK VALUES</span>
                <strong className="pa-engine-step__record-trait">Independence & Learning</strong>
                <span className="pa-engine-step__record-val">Direction: Positive (+0.7)</span>
                <span className="pa-engine-step__record-note">High preference for autonomous problem framing</span>
              </div>

              <div className="pa-engine-step__record-item">
                <span className="pa-engine-step__record-dim">CAREER SIGNALS</span>
                <strong className="pa-engine-step__record-trait">Ownership & Planning</strong>
                <span className="pa-engine-step__record-val">Direction: Positive (+0.8)</span>
                <span className="pa-engine-step__record-note">Defines accountability before execution</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Step 3: Deterministic Scoring & Validity Orchestration ── */}
        <section className="pa-engine-step pa-engine-step--validity" aria-label="Step 3: Scoring validity">
          <div className="pa-engine-step__inner">
            <div className="pa-engine-step__meta">
              <span className="pa-engine-step__num">STAGE 03</span>
              <h2 className="pa-engine-step__title">Scoring Validity & Confidence</h2>
              <p className="pa-engine-step__desc">
                Scores are calculated deterministically. If insufficient responses exist, validity reflects incomplete coverage rather than fabricating certainty.
              </p>
            </div>

            <div className="pa-engine-step__validity-card">
              <div className="pa-engine-step__validity-row">
                <span className="pa-engine-step__v-label">SCORING ENGINE</span>
                <span className="pa-engine-step__v-val">Deterministic (Non-generative)</span>
              </div>
              <div className="pa-engine-step__validity-row">
                <span className="pa-engine-step__v-label">VALIDITY STATE</span>
                <span className="pa-engine-step__v-val pa-engine-step__v-val--valid">valid</span>
              </div>
              <div className="pa-engine-step__validity-row">
                <span className="pa-engine-step__v-label">CONFIDENCE THRESHOLD</span>
                <span className="pa-engine-step__v-val">0.88 / 1.0</span>
              </div>
              <div className="pa-engine-step__validity-row">
                <span className="pa-engine-step__v-label">RETAINED ATOMS</span>
                <span className="pa-engine-step__v-val">4 discrete evidence records</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Step 4: Deterministic Career Comparison ── */}
        <section className="pa-engine-step pa-engine-step--calibration" aria-label="Step 4: Career fit weights">
          <div className="pa-engine-step__inner">
            <div className="pa-engine-step__meta">
              <span className="pa-engine-step__num">STAGE 04</span>
              <h2 className="pa-engine-step__title">Deterministic Career Fit Comparison</h2>
              <p className="pa-engine-step__desc">
                Career matching evaluates your evidence record against curated benchmarks using the exact weights below.
              </p>
            </div>

            <div className="pa-engine-step__baseline-wrap">
              <CalibrationBaseline theme="mineral" />
            </div>
          </div>
        </section>

        {/* ── Step 5: Stored Dated Record ── */}
        <section className="pa-engine-step pa-engine-step--stored" aria-label="Step 5: Stored record">
          <div className="pa-engine-step__inner">
            <div className="pa-engine-step__meta">
              <span className="pa-engine-step__num">STAGE 05</span>
              <h2 className="pa-engine-step__title">Retained in Your Living Record</h2>
              <p className="pa-engine-step__desc">
                The record remains available for future comparison, export, and longitudinal tracking.
              </p>
            </div>

            <div className="pa-engine-step__strip-wrap">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="STORED IN RECORD"
                dateLabel="ASSESSMENT 01"
                sourceLabel="RETAINED + TRACEABLE + COMPARED"
                theme="carbon"
                variant="dated"
                accumulatedMarks={true}
              />
            </div>

            <div className="pa-engine-step__footer-actions">
              <a
                href="/signup"
                className="pa-btn pa-btn--primary"
                onClick={(e) => handleCtaClick(e, '/signup')}
              >
                Create your first record →
              </a>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
