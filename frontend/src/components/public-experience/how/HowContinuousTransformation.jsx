/**
 * Personality Assessor - How It Works Causal Experience
 * Single normalized progress controller driving semantic phrase travel along SVG trajectories
 * and guarded DotLottie frame scrubbing without discrete card jumps.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, registerActor } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const HowContinuousTransformation = () => {
  const containerRef = useRef(null);
  const dotLottieRef = useRef(null);
  const lastFrameRef = useRef(-1);
  const data = PUBLIC_CONTENT.how;
  const [activeProgress, setActiveProgress] = useState(0);
  const { prefersReducedMotion } = usePublicCapabilities();

  // DotLottie instance initialization callback with immediate pause
  const dotLottieCallback = useCallback((dotLottieInstance) => {
    dotLottieRef.current = dotLottieInstance;
    if (dotLottieInstance) {
      try {
        dotLottieInstance.pause();
        dotLottieInstance.setFrame(0);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const phraseWord1 = containerRef.current.querySelector('.pa-px-how-word--1');
      const phraseWord2 = containerRef.current.querySelector('.pa-px-how-word--2');
      const phraseWord3 = containerRef.current.querySelector('.pa-px-how-word--3');

      if (phraseWord1) {
        registerActor('how-causal-phrase', {
          element: phraseWord1,
          text: data.sampleResponse,
          transitionRole: 'shared',
        });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Immediate 1:1 scrub mapping
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          setActiveProgress(p);
          registerSceneProgress('how-continuous-stage', p, true);

          // Synchronize DotLottie frame strictly when integer frame changes
          if (dotLottieRef.current) {
            const totalFrames = 120;
            const targetFrame = Math.min(Math.floor(p * (totalFrames - 1)), totalFrames - 1);
            if (targetFrame !== lastFrameRef.current) {
              lastFrameRef.current = targetFrame;
              try {
                dotLottieRef.current.setFrame(targetFrame);
              } catch {
                // fallback
              }
            }
          }

          // Physical semantic text transformation along trajectories with meaningful travel (20-30vw)
          if (phraseWord1 && phraseWord2 && phraseWord3) {
            const word1X = p * -180;
            const word1Y = Math.sin(p * Math.PI) * -60;
            const word2X = Math.sin(p * Math.PI * 2) * 80;
            const word2Y = Math.sin(p * Math.PI) * 50;
            const word3X = p * 210;
            const word3Y = Math.sin(p * Math.PI) * -80;

            phraseWord1.style.transform = `translate3d(${word1X}px, ${word1Y}px, 0)`;
            phraseWord2.style.transform = `translate3d(${word2X}px, ${word2Y}px, 0)`;
            phraseWord3.style.transform = `translate3d(${word3X}px, ${word3Y}px, 0)`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, data.sampleResponse]);

  const stageIdx = Math.min(
    Math.floor(activeProgress * data.movements.length),
    data.movements.length - 1
  );
  const currentMovement = data.movements[stageIdx] || data.movements[0];

  return (
    <section ref={containerRef} className="pa-px-how-section" aria-label="How It Works" data-scene-id="how-continuous-stage">
      <div className="pa-px-how-stage-sticky">
        {/* Environmental Workshop Backdrop */}
        <div className="pa-px-how-stage__media-bg">
          <PersistentMediaSlot actorId="how-workshop-media" assetKey="howTransformation" alt="Hands transforming prototype in engineering workshop" />
        </div>

        {/* Editorial Heading */}
        <div className="pa-px-how-header-block">
          <h1 className="pa-px-how-header__headline">{data.hero.headline}</h1>
          <p className="pa-px-how-header__support">{data.hero.support}</p>
        </div>

        {/* The Continuous Transforming Causal Object */}
        <div className="pa-px-how-causal-field">
          {/* Transforming Source Expression */}
          <div className="pa-px-how-source-actor" aria-label={`Source response: ${data.sampleResponse}`}>
            <p className="pa-px-how-source-actor__phrase">
              <span className="pa-px-how-word pa-px-how-word--1">"I clarify the constraints first, </span>
              <span className="pa-px-how-word pa-px-how-word--2">then choose the </span>
              <span className="pa-px-how-word pa-px-how-word--3">smallest reversible step."</span>
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
          <div className="pa-px-how-stage-narrative" aria-live="polite">
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
