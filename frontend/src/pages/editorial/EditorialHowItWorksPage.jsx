import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import CalibrationBaseline from '../../components/personality-v7/living-record/CalibrationBaseline';
import MobileEvidenceSpine from '../../components/personality-v7/living-record/MobileEvidenceSpine';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import './EditorialHowItWorksPage.css';

gsap.registerPlugin(ScrollTrigger);

const SPECIMEN_QUOTE =
  '“When ownership is unclear, I clarify stakeholders, investigate the issue, organize the work, choose an independent plan, and learn from the result.”';

/**
 * EditorialHowItWorksPage
 * Operating Mode: The Continuous Evidence Engine
 * 260–300svh pinned operational pipeline tracking a single situational response through:
 * 0–18%: Prompt & Retained Source
 * 18–38%: Extraction & Behavioral Calibration
 * 38–58%: Multi-Dimensional Branching (Asymmetric Coordinates & Traces)
 * 58–74%: Deterministic Score Validity Gate (VALID | PARTIAL | INSUFFICIENT_DATA)
 * 74–90%: Calibration Baseline
 * 90–100%: Stored Living Record / Reversible Provenance
 */
export const EditorialHowItWorksPage = () => {
  const { navigateWithTransition } = useRouteTransition();
  const engineStageRef = useRef(null);
  const [engineProgress, setEngineProgress] = useState(0);
  const [mobileBranchIdx, setMobileBranchIdx] = useState(0);

  useEffect(() => {
    const stage = engineStageRef.current;
    if (!stage) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (prefersReduced || isTest) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top top+=20%',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const p = self.progress;
            setMobileBranchIdx(Math.min(3, Math.floor(p * 4)));
          },
        });
        return;
      }

      ScrollTrigger.create({
        trigger: stage,
        start: 'top top',
        end: '+=280%',
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          setEngineProgress(self.progress);
        },
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  // Resolve active stage segment (0–18%, 18–38%, 38–58%, 58–74%, 74–90%, 90–100%)
  const activeSegment =
    engineProgress < 0.18
      ? 0
      : engineProgress < 0.38
      ? 1
      : engineProgress < 0.58
      ? 2
      : engineProgress < 0.74
      ? 3
      : engineProgress < 0.90
      ? 4
      : 5;

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <div className="pa-engine-page" data-tone="dark">
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

          {/* Continuous 280svh Pinned Engine Stage */}
          <section
            ref={engineStageRef}
            className="pa-engine-continuous-stage"
            aria-label="Continuous operational pipeline"
          >
            {/* Desktop Pinned Stage Display */}
            <div className="pa-engine-continuous-stage__desktop">
              {/* Left Column: Segment Status & Headings */}
              <div className="pa-engine-continuous-stage__sidebar">
                <div className="pa-engine-continuous-stage__step-nav">
                  {[
                    { num: '01', title: 'Source Capture' },
                    { num: '02', title: 'Signal Extraction' },
                    { num: '03', title: 'Asymmetric Branching' },
                    { num: '04', title: 'Deterministic Validity' },
                    { num: '05', title: 'Calibration Weighting' },
                    { num: '06', title: 'Living Record' },
                  ].map((step, idx) => (
                    <div
                      key={step.num}
                      className={`pa-engine-continuous-stage__step-item ${
                        idx === activeSegment ? 'is-active' : idx < activeSegment ? 'is-complete' : ''
                      }`}
                    >
                      <span className="pa-engine-continuous-stage__step-num">{step.num}</span>
                      <span className="pa-engine-continuous-stage__step-title">{step.title}</span>
                    </div>
                  ))}
                </div>

                <div className="pa-engine-continuous-stage__active-info">
                  {activeSegment === 0 && (
                    <>
                      <h2 className="pa-engine-continuous-stage__h2">Situational decision prompt</h2>
                      <p className="pa-engine-continuous-stage__desc">
                        Real psychometric items present grounded working trade-offs rather than generic self-rating scales.
                      </p>
                    </>
                  )}
                  {activeSegment === 1 && (
                    <>
                      <h2 className="pa-engine-continuous-stage__h2">Signal extraction & calibration</h2>
                      <p className="pa-engine-continuous-stage__desc">
                        The response is parsed for behavioral markers without destroying context.
                      </p>
                    </>
                  )}
                  {activeSegment === 2 && (
                    <>
                      <h2 className="pa-engine-continuous-stage__h2">Multi-dimensional branching</h2>
                      <p className="pa-engine-continuous-stage__desc">
                        One human response branches across unequal field trajectories into distinct framework endpoints.
                      </p>
                    </>
                  )}
                  {activeSegment === 3 && (
                    <>
                      <h2 className="pa-engine-continuous-stage__h2">Deterministic score validity</h2>
                      <p className="pa-engine-continuous-stage__desc">
                        Evidence is verified against consistency thresholds before scores are finalized.
                      </p>
                    </>
                  )}
                  {activeSegment === 4 && (
                    <>
                      <h2 className="pa-engine-continuous-stage__h2">Career calibration baseline</h2>
                      <p className="pa-engine-continuous-stage__desc">
                        The evidence feeds directly into the 6-layer deterministic fit scale without opaque weighting changes.
                      </p>
                    </>
                  )}
                  {activeSegment === 5 && (
                    <>
                      <h2 className="pa-engine-continuous-stage__h2">The stored living record</h2>
                      <p className="pa-engine-continuous-stage__desc">
                        The source answer remains attached to all derived signals, ready for longitudinal comparison.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Right Main Arena: Morphing Stage Content */}
              <div className="pa-engine-continuous-stage__arena">
                {/* Segment 0 & 1: Prompt & Source Strip */}
                {activeSegment <= 1 && (
                  <div className="pa-engine-continuous-stage__view pa-engine-continuous-stage__view--prompt">
                    <div className="pa-engine-pipeline__prompt-specimen">
                      <span className="pa-engine-pipeline__prompt-id">QUESTION ID: initiative-pattern-intermediate</span>
                      <blockquote className="pa-engine-pipeline__prompt-quote">
                        “When team ownership is ambiguous and a project is stalled, what is your initial operating move?”
                      </blockquote>
                    </div>

                    <div className="pa-engine-pipeline__strip-wrap">
                      <EvidenceStrip
                        quote={SPECIMEN_QUOTE}
                        eyebrow="ILLUSTRATIVE RESPONSE"
                        sourceLabel="SOURCE RETAINED / RAW HUMAN SPECIMEN"
                        theme="carbon"
                        variant="source"
                      />
                    </div>
                  </div>
                )}

                {/* Segment 2: Asymmetric Branch Coordinates & Traces */}
                {activeSegment === 2 && (
                  <div className="pa-engine-continuous-stage__view pa-engine-continuous-stage__view--asymmetric">
                    <div className="pa-engine-asymmetric-field">
                      <div className="pa-engine-asymmetric-node pa-engine-asymmetric-node--1">
                        <span className="pa-engine-pipeline__dim-label">BIG FIVE</span>
                        <strong className="pa-engine-pipeline__key-label">Extraversion</strong>
                        <p className="pa-engine-pipeline__signal-text">
                          Clarifying stakeholders and taking cross-functional initiative.
                        </p>
                      </div>

                      <div className="pa-engine-asymmetric-node pa-engine-asymmetric-node--2">
                        <span className="pa-engine-pipeline__dim-label">RIASEC</span>
                        <strong className="pa-engine-pipeline__key-label">Investigative / Conventional</strong>
                        <p className="pa-engine-pipeline__signal-text">
                          Analytical issue investigation & procedural organization.
                        </p>
                      </div>

                      <div className="pa-engine-asymmetric-node pa-engine-asymmetric-node--3">
                        <span className="pa-engine-pipeline__dim-label">WORK VALUES</span>
                        <strong className="pa-engine-pipeline__key-label">Independence & Learning</strong>
                        <p className="pa-engine-pipeline__signal-text">
                          Autonomous execution paired with continuous learning orientation.
                        </p>
                      </div>

                      <div className="pa-engine-asymmetric-node pa-engine-asymmetric-node--4">
                        <span className="pa-engine-pipeline__dim-label">CAREER SIGNALS</span>
                        <strong className="pa-engine-pipeline__key-label">Communication & Planning</strong>
                        <p className="pa-engine-pipeline__signal-text">
                          Structured problem framing and deliberate execution.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Segment 3: Validity Gate (Verified Vocabulary) */}
                {activeSegment === 3 && (
                  <div className="pa-engine-continuous-stage__view pa-engine-continuous-stage__view--validity">
                    <div className="pa-engine-pipeline__validity-readout">
                      <div className="pa-engine-pipeline__validity-item">
                        <span className="pa-engine-pipeline__validity-key">INTEGRITY STATUS</span>
                        <span className="pa-engine-pipeline__validity-val">VALID</span>
                      </div>
                      <div className="pa-engine-pipeline__validity-item">
                        <span className="pa-engine-pipeline__validity-key">EVIDENCE COVERAGE</span>
                        <span className="pa-engine-pipeline__validity-val">VALID</span>
                      </div>
                      <div className="pa-engine-pipeline__validity-item">
                        <span className="pa-engine-pipeline__validity-key">CONFIDENCE STATE</span>
                        <span className="pa-engine-pipeline__validity-val">PARTIAL</span>
                      </div>
                      <div className="pa-engine-pipeline__validity-item">
                        <span className="pa-engine-pipeline__validity-key">SPARSE CHECK</span>
                        <span className="pa-engine-pipeline__validity-val">INSUFFICIENT_DATA: NONE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Segment 4: Calibration */}
                {activeSegment === 4 && (
                  <div className="pa-engine-continuous-stage__view pa-engine-continuous-stage__view--calibration">
                    <CalibrationBaseline theme="carbon" />
                  </div>
                )}

                {/* Segment 5: Stored Record & Action */}
                {activeSegment === 5 && (
                  <div className="pa-engine-continuous-stage__view pa-engine-continuous-stage__view--stored">
                    <EvidenceStrip
                      quote={SPECIMEN_QUOTE}
                      eyebrow="STORED ASSESSMENT RECORD"
                      sourceLabel="STORED RECORD / PROVENANCE SECURED"
                      theme="mineral"
                      variant="inspect"
                      accumulatedMarks={true}
                      provenanceData={{
                        source: 'answer',
                        sourceId: 'initiative-pattern-intermediate',
                        dimension: 'bigFive',
                        key: 'extraversion',
                        direction: 'positive',
                        scoringSource: 'deterministic',
                      }}
                    />

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
                )}
              </div>
            </div>

            {/* Mobile Continuous Spine Mode */}
            <div className="pa-engine-continuous-stage__mobile">
              <div className="pa-engine-pipeline__prompt-specimen">
                <span className="pa-engine-pipeline__prompt-id">QUESTION ID: initiative-pattern-intermediate</span>
                <blockquote className="pa-engine-pipeline__prompt-quote">
                  “When team ownership is ambiguous and a project is stalled, what is your initial operating move?”
                </blockquote>
              </div>

              <div className="pa-engine-pipeline__strip-wrap">
                <EvidenceStrip
                  quote={SPECIMEN_QUOTE}
                  eyebrow="RETAINED SOURCE SPECIMEN"
                  sourceLabel="SOURCE / INITIATIVE-PATTERN-INTERMEDIATE"
                  theme="carbon"
                  variant="source"
                />
              </div>

              <MobileEvidenceSpine activeBranchIndex={mobileBranchIdx} />

              <div className="pa-engine-pipeline__validity-readout">
                <div className="pa-engine-pipeline__validity-item">
                  <span className="pa-engine-pipeline__validity-key">STATUS</span>
                  <span className="pa-engine-pipeline__validity-val">VALID</span>
                </div>
                <div className="pa-engine-pipeline__validity-item">
                  <span className="pa-engine-pipeline__validity-key">CONFIDENCE</span>
                  <span className="pa-engine-pipeline__validity-val">PARTIAL</span>
                </div>
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
          </section>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
