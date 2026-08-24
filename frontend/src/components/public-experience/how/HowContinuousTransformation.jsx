import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const HowContinuousTransformation = () => {
  const containerRef = useRef(null);
  const dotLottieRef = useRef(null);
  const data = PUBLIC_CONTENT.how;
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const { prefersReducedMotion } = usePublicCapabilities();

  // DotLottie instance initialization callback
  const dotLottieCallback = useCallback((dotLottieInstance) => {
    dotLottieRef.current = dotLottieInstance;
    if (dotLottieInstance) {
      dotLottieInstance.pause();
      dotLottieInstance.setFrame(0);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const stageEl = containerRef.current.querySelector('.pa-px-how-stage-sticky');
      const stageTitle = containerRef.current.querySelector('.pa-px-how-stage__title');
      const stageDesc = containerRef.current.querySelector('.pa-px-how-stage__desc');
      const sourceActor = containerRef.current.querySelector('.pa-px-how-source-actor');

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const idx = Math.min(
            Math.floor(progress * data.movements.length),
            data.movements.length - 1
          );
          setActiveStageIdx(idx);

          // Synchronize DotLottie frame explicitly with scroll progress
          if (dotLottieRef.current) {
            const totalFrames = 120;
            const targetFrame = Math.min(Math.floor(progress * (totalFrames - 1)), totalFrames - 1);
            dotLottieRef.current.setFrame(targetFrame);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, data.movements.length]);

  const currentMovement = data.movements[activeStageIdx];

  return (
    <section ref={containerRef} className="pa-px-how-section" aria-label="How It Works">
      <div className="pa-px-how-stage-sticky">
        {/* Environmental Workshop Backdrop */}
        <div className="pa-px-how-stage__media-bg">
          <PublicPicture assetKey="howTransformation" alt="Hands transforming prototype in engineering workshop" />
        </div>

        {/* Editorial Heading */}
        <div className="pa-px-how-header-block">
          <h1 className="pa-px-how-header__headline">{data.hero.headline}</h1>
          <p className="pa-px-how-header__support">{data.hero.support}</p>
        </div>

        {/* The Continuous Transforming Causal Object */}
        <div className="pa-px-how-causal-field">
          {/* Transforming Source Expression */}
          <div className="pa-px-how-source-actor">
            <p className="pa-px-how-source-actor__phrase">
              "{data.sampleResponse}"
            </p>
          </div>

          {/* Synchronized Vector State Topology */}
          <div className="pa-px-how-vector-stage">
            <DotLottieReact
              src="/motion/public-experience/source-state.lottie"
              dotLottieRefCallback={dotLottieCallback}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Dynamic Transformation Stage Narrative */}
          <div className="pa-px-how-stage-narrative">
            <span className="pa-px-how-stage__name">{currentMovement.name}</span>
            <h2 className="pa-px-how-stage__title">{currentMovement.title}</h2>
            <p className="pa-px-how-stage__desc">{currentMovement.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowContinuousTransformation;
