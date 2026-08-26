import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const HowCausalEssay = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || !containerRef.current || !stageRef.current) return;

    const container = containerRef.current;
    const stage = stageRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=320%',
          scrub: 0.6,
          pin: stage,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * 4;
            const step = Math.min(4, Math.round(raw));
            setActiveStep(step);
          },
        },
      });

      const clauseA = stage.querySelector('.pa-px-how-stage__clause-a');
      const clauseB = stage.querySelector('.pa-px-how-stage__clause-b');
      const pathsSvg = stage.querySelector('.pa-px-how-stage__paths-svg');
      const modelsGrid = stage.querySelector('.pa-px-how-stage__models-field');
      const weightsGrid = stage.querySelector('.pa-px-how-stage__weights-field');
      const recordPlate = stage.querySelector('.pa-px-how-stage__record-field');

      // State 0 -> 1: Words physically separate with SVG vector emergence
      tl.to([clauseA, clauseB], { opacity: 1, duration: 0.2 }, 0.2);
      tl.to(clauseA, { x: -36, color: 'var(--pa-evidence)', duration: 0.35, ease: 'power2.out' }, 0.25);
      tl.to(clauseB, { x: 36, color: 'var(--pa-ink)', duration: 0.35, ease: 'power2.out' }, 0.25);
      if (pathsSvg) {
        tl.to(pathsSvg, { opacity: 1, duration: 0.3 }, 0.3);
      }

      // State 1 -> 2: Multi-Model Spatial Branching
      tl.to(modelsGrid, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.8);

      // State 2 -> 3: Deterministic Weighting Assembly
      tl.to(modelsGrid, { opacity: 0.15, y: -16, duration: 0.3 }, 1.6);
      tl.to(weightsGrid, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 1.7);

      // State 3 -> 4: Unified Inspectable Record Recomposition
      tl.to([weightsGrid, modelsGrid], { opacity: 0, y: -24, duration: 0.3 }, 2.5);
      tl.to(recordPlate, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 2.6);
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <div className="pa-px-how-page" data-route="how-it-works">
      <header className="pa-px-how-hero">
        <h1 className="pa-px-how-hero__headline">FOLLOW ONE ANSWER.</h1>
        <p className="pa-px-how-hero__support">
          Watch one response become a traceable professional record.
        </p>
      </header>

      {/* Flagship Pinned Causal Transformation Sequence (Self-Explaining Visual Flow) */}
      <div ref={containerRef} className="pa-px-how-pinned-container">
        <div ref={stageRef} className="pa-px-how-cinematic-stage">
          <div className="pa-px-how-stage__header-bar">
            <span className="pa-px-how-stage__tag">CAUSAL TRANSFORMATION PIPELINE</span>
            <span className="pa-px-illustrative-pill">Illustrative example</span>
          </div>

          <div className="pa-px-how-stage__arena" aria-live="polite">
            {/* State 0 & 1: Massive Source Sentence & Clause Separation */}
            <div
              className="pa-px-how-stage__sentence-box"
              data-transition-actor="how-source-quote"
            >
              <span className="pa-px-how-stage__clause-a">
                &ldquo;I clarify the constraints first,
              </span>{' '}
              <span className="pa-px-how-stage__clause-b">
                then choose the smallest reversible step.&rdquo;
              </span>
            </div>

            {/* SVG Connecting Branch Vectors */}
            <svg
              className="pa-px-how-stage__paths-svg"
              viewBox="0 0 600 50"
              fill="none"
              aria-hidden="true"
              style={{ opacity: isMobile || activeStep >= 1 ? 1 : 0 }}
            >
              <path d="M 160,0 C 160,25 80,35 60,50" stroke="var(--pa-evidence)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 220,0 C 220,25 210,35 200,50" stroke="var(--pa-evidence)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 380,0 C 380,25 390,35 400,50" stroke="var(--pa-graphite)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M 440,0 C 440,25 520,35 540,50" stroke="var(--pa-graphite)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* State 2: Framework Nodes Field (Correct Semantics) */}
            <div
              className="pa-px-how-stage__models-field"
              style={{
                opacity: isMobile ? 1 : activeStep >= 2 ? 1 : 0,
                transform: isMobile ? 'none' : activeStep >= 2 ? 'none' : 'translateY(16px)',
              }}
            >
              <div className="pa-px-how-node">
                <span className="pa-px-how-node__lbl">BIG FIVE</span>
                <span className="pa-px-how-node__val">C 78 · ES 64</span>
                <span className="pa-px-how-node__sub">Deliberate execution</span>
              </div>
              <div className="pa-px-how-node">
                <span className="pa-px-how-node__lbl">RIASEC</span>
                <span className="pa-px-how-node__val">I 72 · C 68</span>
                <span className="pa-px-how-node__sub">Investigative problem space</span>
              </div>
              <div className="pa-px-how-node">
                <span className="pa-px-how-node__lbl">WORK VALUES</span>
                <span className="pa-px-how-node__val">Independence 84</span>
                <span className="pa-px-how-node__sub">High autonomy condition</span>
              </div>
              <div className="pa-px-how-node">
                <span className="pa-px-how-node__lbl">BEHAVIORAL SIGNALS</span>
                <span className="pa-px-how-node__val">Iterative Scoping</span>
                <span className="pa-px-how-node__sub">Small reversible experiments</span>
              </div>
            </div>

            {/* State 3: 25/25/20/15/10/5 Deterministic Weight Mass */}
            <div
              className="pa-px-how-stage__weights-field"
              style={{
                opacity: isMobile ? 1 : activeStep === 3 ? 1 : 0,
                transform: isMobile ? 'none' : activeStep === 3 ? 'none' : 'translateY(16px)',
              }}
            >
              <div className="pa-px-how-weights-strip">
                <div className="pa-px-how-wblock" style={{ flex: '25', background: 'var(--pa-ink)', color: '#FFF' }}>
                  <strong>25%</strong><span>RIASEC Interests</span>
                </div>
                <div className="pa-px-how-wblock" style={{ flex: '25', background: 'var(--pa-graphite)', color: '#FFF' }}>
                  <strong>25%</strong><span>Technical Skills</span>
                </div>
                <div className="pa-px-how-wblock" style={{ flex: '20', background: 'var(--pa-context)', color: '#FFF' }}>
                  <strong>20%</strong><span>Work Values</span>
                </div>
                <div className="pa-px-how-wblock" style={{ flex: '15', background: 'var(--pa-mineral)', color: 'var(--pa-ink)' }}>
                  <strong>15%</strong><span>Traits</span>
                </div>
                <div className="pa-px-how-wblock" style={{ flex: '10', background: 'var(--pa-paper)', color: 'var(--pa-ink)', border: '1px solid var(--pa-mineral)' }}>
                  <strong>10%</strong><span>Education</span>
                </div>
                <div className="pa-px-how-wblock" style={{ flex: '5', background: 'var(--pa-evidence)', color: '#FFF' }}>
                  <strong>5%</strong><span>Goals</span>
                </div>
              </div>
            </div>

            {/* State 4: Inspectable Record Recomposition with Supporting Context Photo */}
            <div
              className="pa-px-how-stage__record-field"
              style={{
                opacity: isMobile ? 1 : activeStep >= 4 ? 1 : 0,
                transform: isMobile ? 'none' : activeStep >= 4 ? 'none' : 'translateY(16px)',
              }}
            >
              <div className="pa-px-how-record-card">
                <div className="pa-px-how-record-media">
                  <PublicPicture
                    assetKey="howTransformation"
                    alt="Hands refining physical technical prototype"
                  />
                </div>
                <div className="pa-px-how-record-info">
                  <span className="pa-px-how-record-tag">PROVENANCE CHAIN COMPLETE</span>
                  <p className="pa-px-how-record-title">Unified Inspectable Professional Record</p>
                  <p className="pa-px-how-record-meta">100% deterministic calibration back to source input.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HowContinuousTransformation = HowCausalEssay;
export default HowCausalEssay;
