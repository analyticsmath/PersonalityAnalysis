/**
 * Personality Assessor - How It Works Causal Experience
 * Title: FOLLOW ONE ANSWER
 * Support: From source to score, without losing where it came from.
 * Ref-based normalized progress with zero per-frame React rerenders.
 * DotLottie synchronized imperative scrubbing + SVG/DOM trajectories.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PersistentMediaSlot } from '../canvas/PersistentMediaSlot';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress } from '../motion/scrollState';
import { phaseFromProgress } from './howSceneModel';

gsap.registerPlugin(ScrollTrigger);

export const HowContinuousTransformation = () => {
  const containerRef = useRef(null);
  const dotLottieRef = useRef(null);
  const lastFrameRef = useRef(-1);
  const howProgressRef = useRef(0);
  const lastPhaseRef = useRef(0);

  const data = PUBLIC_CONTENT.how;
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const { prefersReducedMotion } = usePublicCapabilities();

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
      const phraseWord4 = containerRef.current.querySelector('.pa-px-how-word--4');
      const phraseWord5 = containerRef.current.querySelector('.pa-px-how-word--5');

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          howProgressRef.current = p;
          registerSceneProgress('how-continuous-stage', p, true);

          // 1. Update React state ONLY when semantic phase changes
          const phase = phaseFromProgress(p);
          if (phase !== lastPhaseRef.current) {
            lastPhaseRef.current = phase;
            setActivePhaseIdx(phase);
          }

          // 2. Synchronize DotLottie frame imperatively
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

          // 3. Viewport-relative semantic word trajectories (18vw, 22vw, 12vw, 26vw, 14vh)
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          if (phraseWord1) {
            const w1X = -p * (vw * 0.18);
            const w1Y = Math.sin(p * Math.PI) * -(vh * 0.08);
            phraseWord1.style.transform = `translate3d(${w1X}px, ${w1Y}px, 0)`;
          }
          if (phraseWord2) {
            const w2X = p * (vw * 0.22);
            const w2Y = Math.sin(p * Math.PI * 1.5) * (vh * 0.06);
            phraseWord2.style.transform = `translate3d(${w2X}px, ${w2Y}px, 0)`;
            phraseWord2.style.fontVariationSettings = `'wdth' ${100 - p * 25}`;
          }
          if (phraseWord3) {
            const w3X = -p * (vw * 0.12);
            const w3Y = p * (vh * 0.10);
            phraseWord3.style.transform = `translate3d(${w3X}px, ${w3Y}px, 0)`;
            phraseWord3.style.fontVariationSettings = `'wdth' ${100 - p * 35}`;
          }
          if (phraseWord4) {
            const w4X = Math.sin(p * Math.PI) * (vw * 0.26);
            const w4Y = Math.cos(p * Math.PI) * (vh * 0.08);
            phraseWord4.style.transform = `translate3d(${w4X}px, ${w4Y}px, 0)`;
          }
          if (phraseWord5) {
            const w5Y = p * (vh * 0.14);
            phraseWord5.style.transform = `translate3d(0, ${w5Y}px, 0)`;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const currentMovement = data.movements[activePhaseIdx] || data.movements[0];

  return (
    <section
      ref={containerRef}
      className="pa-px-how-section"
      aria-label="How It Works"
      data-scene-id="how-continuous-stage"
      style={{
        position: 'relative',
        width: '100%',
        height: prefersReducedMotion ? 'auto' : '450svh',
        backgroundColor: 'var(--px-ink, #121416)',
        color: 'var(--px-white, #F7F8F8)',
      }}
    >
      <div
        className="pa-px-how-stage-sticky"
        style={{
          position: prefersReducedMotion ? 'relative' : 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: prefersReducedMotion ? 'auto' : '100svh',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Environmental Backdrop */}
        <div className="pa-px-how-stage__media-bg">
          <PersistentMediaSlot
            actorId="how-workshop-media"
            slotId="how-workshop-slot"
            assetKey="howTransformation"
            alt="Hands transforming prototype in engineering workshop"
          />
        </div>

        {/* Editorial Heading */}
        <div className="pa-px-how-header-block">
          <h1 className="pa-px-how-header__headline">FOLLOW ONE ANSWER</h1>
          <p className="pa-px-how-header__support">
            From source to score, without losing where it came from.
          </p>
        </div>

        {/* The Continuous Transforming Causal Object */}
        <div className="pa-px-how-causal-field">
          {/* Transforming Source Expression */}
          <div className="pa-px-how-source-actor" aria-label={`Source response: ${data.sampleResponse}`}>
            <p className="pa-px-how-source-actor__phrase">
              <span className="pa-px-how-word pa-px-how-word--1">I clarify</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--2">the constraints</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--3">first, then choose</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--4">the smallest</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--5">reversible step.</span>
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
