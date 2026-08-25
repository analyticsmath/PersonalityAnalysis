import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const HowCausalEssay = () => {
  const data = PUBLIC_CONTENT.how;
  const containerRef = useRef(null);
  const visualFigureRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || isMobile || !containerRef.current || !visualFigureRef.current) return;

    const container = containerRef.current;
    const figure = visualFigureRef.current;

    const ctx = gsap.context(() => {
      // 5 states over scroll: 0 = Source Capture, 1 = Clause Separation, 2 = Model Branch, 3 = Weighting, 4 = Inspectable Record
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=280%',
          scrub: 0.6,
          pin: figure,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * 4;
            const step = Math.min(4, Math.round(raw));
            setActiveStep(step);
          },
        },
      });

      const sentenceEl = figure.querySelector('.pa-px-how-figure__sentence');
      const clauseA = figure.querySelector('.pa-px-how-figure__clause-a');
      const clauseB = figure.querySelector('.pa-px-how-figure__clause-b');
      const modelsGrid = figure.querySelector('.pa-px-how-figure__models-grid');
      const weightsGrid = figure.querySelector('.pa-px-how-figure__weights-grid');
      const recordPlate = figure.querySelector('.pa-px-how-figure__record-plate');

      // State 0 -> 1: Clause Separation
      tl.to([clauseA, clauseB], {
        opacity: 1,
        duration: 0.25,
      }, 0.2);
      tl.to(clauseA, {
        x: -24,
        color: 'var(--pa-evidence)',
        duration: 0.35,
        ease: 'power2.out',
      }, 0.25);
      tl.to(clauseB, {
        x: 24,
        color: 'var(--pa-graphite)',
        duration: 0.35,
        ease: 'power2.out',
      }, 0.25);

      // State 1 -> 2: Multi-Model Branching
      tl.to(modelsGrid, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.8);

      // State 2 -> 3: Deterministic Weighting Assembly
      tl.to(modelsGrid, {
        opacity: 0.25,
        y: -15,
        duration: 0.3,
      }, 1.6);
      tl.to(weightsGrid, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      }, 1.7);

      // State 3 -> 4: Unified Inspectable Record Recomposition
      tl.to([weightsGrid, modelsGrid], {
        opacity: 0,
        y: -25,
        duration: 0.3,
      }, 2.5);
      tl.to(recordPlate, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      }, 2.6);
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion, isMobile]);

  return (
    <div className="pa-px-how-page" data-route="how-it-works">
      <header className="pa-px-how-hero">
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
          CONTINUOUS CAUSAL TRANSFORMATION
        </div>
        <h1 className="pa-px-how-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-how-hero__support">{data.hero.support}</p>
      </header>

      {/* Unified Causal Stage (Sticky Visual Figure + Progressive Text Column) */}
      <div ref={containerRef} className="pa-px-how-causal-stage">
        {/* Left Side: Progressive Narrative Narrative Column */}
        <div className="pa-px-how-narrative-col">
          {data.movements.map((m, idx) => (
            <section
              key={m.id}
              className={`pa-px-how-narrative-entry ${activeStep === idx ? 'pa-px-how-narrative-entry--active' : ''}`}
              aria-label={`Transformation Step ${idx + 1}: ${m.name}`}
            >
              <div className="pa-px-data pa-px-how-step-meta">
                STAGE 0{idx + 1} &middot; {m.name.toUpperCase()}
              </div>
              <h2 className="pa-px-heading-subsection">{m.title}</h2>
              <p className="pa-px-body">{m.description}</p>
            </section>
          ))}
        </div>

        {/* Right Side: Sticky Continuous Visual Transformation Figure */}
        <div ref={visualFigureRef} className="pa-px-how-figure-col">
          <div className="pa-px-how-figure-card" aria-live="polite">
            <header className="pa-px-how-figure__header">
              <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
                PROTAGONIST EVIDENCE ACTOR
              </span>
              <span className="pa-px-data">
                Active State: 0{activeStep + 1} / 05
              </span>
            </header>

            {/* Stage 0 & 1: Source & Clause Separation */}
            <div className="pa-px-how-figure__sentence-stage">
              <span className="pa-px-how-figure__clause-a">
                &ldquo;I clarify the constraints first,
              </span>{' '}
              <span className="pa-px-how-figure__clause-b">
                then choose the smallest reversible step.&rdquo;
              </span>
            </div>

            {/* Stage 2: Multi-Model Calibration Branching */}
            <div
              className="pa-px-how-figure__models-grid"
              style={{
                opacity: isMobile ? 1 : activeStep >= 2 ? 1 : 0,
                transform: isMobile ? 'none' : activeStep >= 2 ? 'none' : 'translateY(16px)',
                transition: 'opacity 300ms ease, transform 300ms ease',
              }}
            >
              <div className="pa-px-how-model-node">
                <span className="pa-px-data">Big Five</span>
                <span className="pa-px-body-sm">Conscientiousness 78</span>
              </div>
              <div className="pa-px-how-model-node">
                <span className="pa-px-data">RIASEC</span>
                <span className="pa-px-body-sm">Investigative 72</span>
              </div>
              <div className="pa-px-how-model-node">
                <span className="pa-px-data">Work Values</span>
                <span className="pa-px-body-sm">Independence 84</span>
              </div>
              <div className="pa-px-how-model-node">
                <span className="pa-px-data">Signals</span>
                <span className="pa-px-body-sm">Iterative Scoping</span>
              </div>
            </div>

            {/* Stage 3: Deterministic Career-Fit Weighting */}
            <div
              className="pa-px-how-figure__weights-grid"
              style={{
                opacity: isMobile ? 1 : activeStep === 3 ? 1 : 0,
                transform: isMobile ? 'none' : activeStep === 3 ? 'none' : 'translateY(16px)',
                transition: 'opacity 300ms ease, transform 300ms ease',
              }}
            >
              <div className="pa-px-how-weight-strip">
                <div style={{ flex: '25', background: 'var(--pa-ink)', color: '#FFF', padding: '6px', textAlign: 'center', fontSize: '0.75rem' }}>RIASEC 25%</div>
                <div style={{ flex: '25', background: 'var(--pa-graphite)', color: '#FFF', padding: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Skills 25%</div>
                <div style={{ flex: '20', background: 'var(--pa-context)', color: '#FFF', padding: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Values 20%</div>
                <div style={{ flex: '15', background: 'var(--pa-mineral)', color: 'var(--pa-ink)', padding: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Traits 15%</div>
                <div style={{ flex: '10', background: 'var(--pa-paper)', color: 'var(--pa-ink)', padding: '6px', textAlign: 'center', fontSize: '0.75rem' }}>Ed 10%</div>
                <div style={{ flex: '5', background: 'var(--pa-evidence)', color: '#FFF', padding: '6px', textAlign: 'center', fontSize: '0.75rem' }}>5%</div>
              </div>
            </div>

            {/* Stage 4: Unified Inspectable Record Recomposition */}
            <div
              className="pa-px-how-figure__record-plate"
              style={{
                opacity: isMobile ? 1 : activeStep >= 4 ? 1 : 0,
                transform: isMobile ? 'none' : activeStep >= 4 ? 'none' : 'translateY(16px)',
                transition: 'opacity 300ms ease, transform 300ms ease',
              }}
            >
              <div className="pa-px-how-figure__media-inset">
                <PublicPicture
                  assetKey="howTransformation"
                  alt="Hands refining physical technical prototype"
                />
              </div>
              <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', marginTop: '8px' }}>
                RECORD RECOMPOSED &middot; PROVENANCE CHAIN COMPLETE
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
