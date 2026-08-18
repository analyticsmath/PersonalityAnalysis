import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';
import useReducedMotion from '../../../hooks/personality-v4/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorksTheatre = () => {
  const envelopeRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { howItWorks } = PUBLIC_CONTENT;
  const currentStage = howItWorks.stages[activeStep] || howItWorks.stages[0];

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: envelopeRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.65,
        onUpdate: (self) => {
          const count = howItWorks.stages.length;
          const index = Math.min(Math.floor(self.progress * count), count - 1);
          setActiveStep(index);
        },
      });
    }, envelopeRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, howItWorks.stages.length]);

  return (
    <>
      <section className="pa-route-hero pa-route-hero--dark">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{howItWorks.title}</h1>
            <p>{howItWorks.lead}</p>
          </div>
        </div>
      </section>

      <section ref={envelopeRef} className="pa-hiw-stage-envelope" aria-label="Transformation Stages">
        <div className="pa-hiw-stage">
          <div className="pa-hiw-narrative">
            <div className="pa-hiw-step-tag">
              Stage {currentStage.step} — {currentStage.evidenceTag}
            </div>
            <h2 className="pa-hiw-stage-title">{currentStage.title}</h2>
            <div style={{ fontSize: '15px', color: 'var(--pa-cool-400)', marginBottom: '16px' }}>
              {currentStage.subtitle}
            </div>
            <p className="pa-hiw-stage-body">{currentStage.body}</p>
          </div>

          <div className="pa-hiw-visual-wrap">
            <ResponsivePicture
              asset={MEDIA_ASSETS.a02}
              alt={MEDIA_ASSETS.a02.alt}
              sizes="(max-width: 900px) 100vw, 45vw"
              objectPosition="50% 42%"
            />
          </div>
        </div>
      </section>

      <section className="pa-hiw-faq-section" aria-labelledby="faq-heading">
        <div className="pa-container">
          <div className="pa-hiw-faq-inner">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <div className="pa-faq-list">
              {howItWorks.faq.map((item, idx) => (
                <details key={idx} className="pa-faq-item">
                  <summary className="pa-faq-question">{item.q}</summary>
                  <p className="pa-faq-answer">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksTheatre;
