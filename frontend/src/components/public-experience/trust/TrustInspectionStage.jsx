import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, registerActor } from '../motion/scrollState';
import { PixelTransitionCanvas } from '../motion/PixelTransitionCanvas';

gsap.registerPlugin(ScrollTrigger);

export const TrustInspectionStage = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.trust;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pixelProgress, setPixelProgress] = useState(0);
  const { prefersReducedMotion } = usePublicCapabilities();

  const steps = data.recordStateSteps;

  const triggerPixelTransition = () => {
    let start = performance.now();
    const duration = 350;
    const animate = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setPixelProgress(p);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setPixelProgress(0);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const recordActor = containerRef.current.querySelector('.pa-px-trust-record-actor');

      if (recordActor) {
        registerActor('trust-record-actor', {
          element: recordActor,
        });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Immediate 1:1 scrub
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          registerSceneProgress('trust-inspection-stage', self.progress, true);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const activeIdx = Math.min(Math.floor(scrollProgress * steps.length), steps.length - 1);
  const currentStep = steps[activeIdx] || steps[0];

  const handleSeek = (idx) => {
    triggerPixelTransition();
    const targetP = idx / (steps.length - 1);
    setScrollProgress(targetP);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (activeIdx + 1) % steps.length;
      handleSeek(nextIdx);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (activeIdx - 1 + steps.length) % steps.length;
      handleSeek(prevIdx);
    }
  };

  return (
    <section ref={containerRef} className="pa-px-trust-section" aria-label="Trust & Provenance Chain" data-scene-id="trust-inspection-stage">
      <div className="pa-px-trust-stage-sticky">
        <div className="pa-px-trust-header">
          <h1>{data.hero.headline}</h1>
          <p className="pa-px-trust-lead">{data.hero.support}</p>
        </div>

        {pixelProgress > 0 && <PixelTransitionCanvas progress={pixelProgress} />}

        {/* The Single Persistent Transforming Record Object */}
        <div
          className="pa-px-trust-record-actor"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Interactive Record Transformation (Scroll or use arrow keys)"
        >
          {/* Transforming SVG Record Geometry */}
          <div className="pa-px-trust-geometry-stage" aria-hidden="true">
            <svg viewBox="0 0 600 240" className="pa-px-trust-svg">
              {/* Supplied State: Origin Points */}
              <circle cx={100 + scrollProgress * 150} cy={120} r={6 + Math.sin(scrollProgress * Math.PI) * 4} fill="var(--px-white)" />
              <line
                x1={100}
                y1={120}
                x2={100 + scrollProgress * 400}
                y2={120 + Math.sin(scrollProgress * Math.PI * 2) * 30}
                stroke="var(--px-white)"
                strokeWidth={1.5}
                strokeDasharray={scrollProgress > 0.4 ? '4 4' : 'none'}
              />
              {/* Calculated State: Calibrated Bounds */}
              {scrollProgress > 0.35 && (
                <rect
                  x={240}
                  y={60}
                  width={180 * Math.min((scrollProgress - 0.35) * 3, 1)}
                  height={120}
                  fill="none"
                  stroke="rgba(247, 248, 248, 0.4)"
                  strokeWidth={1}
                />
              )}
              {/* Compared State: Dual Baseline Vector */}
              {scrollProgress > 0.60 && (
                <path
                  d="M 260 90 L 380 90 L 400 150"
                  fill="none"
                  stroke="rgba(247, 248, 248, 0.7)"
                  strokeWidth={2}
                />
              )}
            </svg>
          </div>

          {/* Continuous Narrative Display */}
          <div className="pa-px-trust-narrative" aria-live="polite">
            <div className="pa-px-trust-stage-tag">{currentStep.name}</div>
            <h2 className="pa-px-trust-record__title">{currentStep.title}</h2>
            <p className="pa-px-trust-record__desc">{currentStep.description}</p>

            <div className="pa-px-trust-record__details-layer">
              <span className="pa-px-trust-record__details-label">Inspected Evidence Trace:</span>
              <div className="pa-px-trust-record__details-body">{currentStep.details}</div>
            </div>

            {/* If at final 'controlled' state, render direct user rights demonstration */}
            {currentStep.id === 'controlled' && (
              <div className="pa-px-trust-rights-actions">
                <span className="pa-px-trust-rights__label">Sovereign Account Rights:</span>
                <div className="pa-px-trust-rights__list">
                  {data.rightsActions.map((action) => (
                    <div key={action.id} className="pa-px-trust-right-row">
                      <strong>{action.label}:</strong> {action.description}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustInspectionStage;
