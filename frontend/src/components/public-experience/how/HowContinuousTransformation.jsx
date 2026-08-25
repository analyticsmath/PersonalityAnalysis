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
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, scrollBus } from '../motion/scrollState';
import { phaseFromProgress, calculateHowWeights } from './howSceneModel';

gsap.registerPlugin(ScrollTrigger);

export const HowContinuousTransformation = () => {
  const containerRef = useRef(null);
  const dotLottieRef = useRef(null);
  const lastFrameRef = useRef(-1);
  const lastPhaseRef = useRef(0);

  const data = PUBLIC_CONTENT.how;
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

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

    const phraseWord1 = containerRef.current.querySelector('.pa-px-how-word--1');
    const phraseWord2 = containerRef.current.querySelector('.pa-px-how-word--2');
    const phraseWord3 = containerRef.current.querySelector('.pa-px-how-word--3');
    const phraseWord4 = containerRef.current.querySelector('.pa-px-how-word--4');
    const phraseWord5 = containerRef.current.querySelector('.pa-px-how-word--5');
    const headerBlock = containerRef.current.querySelector('.pa-px-how-header-block');

    const updateFrame = (p) => {
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

      // 3. Viewport-relative semantic word trajectories
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

      if (headerBlock) {
        const hOpacity = Math.max(0, 1 - p * 3.5);
        headerBlock.style.opacity = hOpacity;
        headerBlock.style.transform = `translate3d(0, ${-p * 60}px, 0)`;
      }

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
    };

    const computeProgress = () => {
      if (!containerRef.current) return 0;
      const start = containerRef.current.offsetTop;
      const travel = containerRef.current.offsetHeight - window.innerHeight;
      if (travel <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - start) / travel));
    };

    updateFrame(computeProgress());

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateFrame(self.progress);
      },
    });

    const unsubscribeBus = scrollBus.subscribe(() => {
      updateFrame(computeProgress());
    });

    return () => {
      unsubscribeBus();
      st.kill();
    };
  }, [prefersReducedMotion]);

  const currentMovement = data.movements[activePhaseIdx] || data.movements[0];
  const trackHeight = prefersReducedMotion ? 'auto' : (isMobile ? '300svh' : '450svh');

  return (
    <section
      ref={containerRef}
      className="pa-px-how-section"
      aria-label="How It Works"
      data-scene-id="how-continuous-stage"
      style={{
        position: 'relative',
        width: '100%',
        height: trackHeight,
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
        {/* Continuous Environmental Backdrop (Guaranteed 55-65% opacity, never black) */}
        <div
          className="pa-px-how-stage__media-bg visual-actor"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.58,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <PublicPicture
            assetKey="howTransformation"
            alt="Hands transforming prototype in engineering workshop"
            priority={true}
          />
        </div>

        {/* Editorial Heading (Clean at cold load) */}
        <div
          className="pa-px-how-header-block"
          style={{
            position: 'relative',
            zIndex: 10,
            padding: 'clamp(40px, 8vh, 80px) var(--px-outer-gutter, 6vw) 0',
            maxWidth: '54rem',
            willChange: 'transform, opacity',
          }}
        >
          <h1 className="pa-px-how-header__headline">FOLLOW ONE ANSWER</h1>
          <p className="pa-px-how-header__support">
            From source to score, without losing where it came from.
          </p>
        </div>

        {/* The Continuous Transforming Causal Object */}
        <div
          className="pa-px-how-causal-field"
          style={{
            position: 'relative',
            zIndex: 8,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Transforming Source Expression */}
          <div
            className="pa-px-how-source-actor"
            aria-label={`Source response: ${data.sampleResponse}`}
            style={{
              position: 'absolute',
              top: '38%',
              left: 'var(--px-outer-gutter, 6vw)',
              maxWidth: 'clamp(340px, 50vw, 700px)',
              zIndex: 12,
            }}
          >
            <p className="pa-px-how-source-actor__phrase" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)', fontWeight: 500, lineHeight: 1.25 }}>
              <span className="pa-px-how-word pa-px-how-word--1" style={{ display: 'inline-block', willChange: 'transform' }}>I clarify</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--2" style={{ display: 'inline-block', willChange: 'transform, font-variation-settings' }}>the constraints</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--3" style={{ display: 'inline-block', willChange: 'transform, font-variation-settings' }}>first, then choose</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--4" style={{ display: 'inline-block', willChange: 'transform' }}>the smallest</span>{' '}
              <span className="pa-px-how-word pa-px-how-word--5" style={{ display: 'inline-block', willChange: 'transform' }}>reversible step.</span>
            </p>
          </div>

          {/* Synchronized Vector State Topology */}
          <div
            className="pa-px-how-vector-stage"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 6,
              opacity: 0.85,
              pointerEvents: 'none',
            }}
          >
            <DotLottieReact
              src="/motion/public-experience/source-state.lottie"
              dotLottieRefCallback={dotLottieCallback}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Dynamic Transformation Stage Narrative */}
          <div
            className="pa-px-how-stage-narrative"
            aria-live="polite"
            style={{
              position: 'absolute',
              bottom: 'clamp(40px, 8vh, 80px)',
              left: 'var(--px-outer-gutter, 6vw)',
              maxWidth: '42rem',
              zIndex: 14,
            }}
          >
            <h2 className="pa-px-how-stage__title" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', fontWeight: 500, marginBottom: '8px' }}>
              {currentMovement.title}
            </h2>
            <p className="pa-px-how-stage__desc" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.2rem)', color: 'var(--px-soft, #DDE1E3)', lineHeight: 1.45 }}>
              {currentMovement.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowContinuousTransformation;

