import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const HowContinuousTransformation = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.how;
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * data.movements.length),
            data.movements.length - 1
          );
          setActiveStepIdx(idx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, data.movements.length]);

  const currentMovement = data.movements[activeStepIdx];

  return (
    <div ref={containerRef} className="pa-px-how-stage">
      <div className="pa-px-how-stage__sticky">
        <div className="pa-px-how-stage__bg">
          <PublicPicture assetKey="howTransformation" alt="Hands transforming prototype" />
        </div>

        <div className="pa-px-how-header">
          <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
            Continuous Transformation Pipeline
          </span>
          <h1>{data.hero.headline}</h1>
          <p>{data.hero.support}</p>
        </div>

        <div className="pa-px-how-core">
          <div className="pa-px-how-transform-display">
            <div className="pa-px-how-response-bubble">
              "{data.sampleResponse}"
            </div>

            <div className="pa-px-how-active-step">
              <span className="pa-px-context-data" style={{ color: 'var(--px-soft)' }}>
                Phase {activeStepIdx + 1}: {currentMovement.name}
              </span>
              <div className="pa-px-how-active-step__title">{currentMovement.title}</div>
              <p className="pa-px-how-active-step__desc">{currentMovement.description}</p>
            </div>
          </div>

          <div className="pa-px-how-lottie-container">
            <DotLottieReact
              src="/motion/public-experience/source-state.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div className="pa-px-how-progress-rail">
          {data.movements.map((m, i) => (
            <div
              key={m.id}
              className={`pa-px-how-movement-indicator ${i === activeStepIdx ? 'pa-px-how-movement-indicator--active' : ''}`}
            >
              {m.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowContinuousTransformation;
