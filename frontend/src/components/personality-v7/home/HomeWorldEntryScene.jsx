import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EnvironmentPlane from '../living-record/EnvironmentPlane';
import EvidenceStrip from '../living-record/EvidenceStrip';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import { useScrollContext } from '../motion/SmoothScrollProvider';
import './HomeWorldEntryScene.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeWorldEntryScene (Scene 1)
 * Frame 0 -> Frame 100:
 * Environment owns first impression; headline is spatially embedded in negative space.
 * EvidenceStrip crosses lower-middle media as the persistent visual protagonist.
 * As user scrolls, environment recedes into Carbon while the source strip stabilizes.
 */
export const HomeWorldEntryScene = () => {
  const { navigateWithTransition } = useRouteTransition();
  const { scrollTo } = useScrollContext();

  const sceneRef = useRef(null);
  const primaryMediaRef = useRef(null);
  const secondaryMediaRef = useRef(null);
  const headlineRef = useRef(null);
  const stripRef = useRef(null);
  const supportTextRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (prefersReduced || isTest) return;

    const ctx = gsap.context(() => {
      // Cinematic 0 -> 100 scroll orchestration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: '+=120%',
          scrub: 0.65,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0–25%: Primary environment drifts & crop tightens
      tl.to(
        primaryMediaRef.current,
        {
          x: '-4%',
          y: '-6%',
          scale: 1.05,
          duration: 0.25,
          ease: 'none',
        },
        0
      );

      // Secondary depth image moves counter-parallax
      tl.to(
        secondaryMediaRef.current,
        {
          y: '-18%',
          opacity: 0.85,
          duration: 0.25,
          ease: 'none',
        },
        0
      );

      // Headline softens ownership
      tl.to(
        headlineRef.current,
        {
          y: -40,
          opacity: 0.25,
          duration: 0.35,
          ease: 'none',
        },
        0.15
      );

      tl.to(
        supportTextRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: 'none',
        },
        0.1
      );

      // 45–75%: Environment recedes; EvidenceStrip moves to centre analytical position
      tl.to(
        primaryMediaRef.current,
        {
          x: '15%',
          opacity: 0.18,
          scale: 0.95,
          duration: 0.45,
          ease: 'none',
        },
        0.35
      );

      tl.to(
        stripRef.current,
        {
          y: -120,
          scale: 1.02,
          duration: 0.45,
          ease: 'none',
        },
        0.3
      );
    }, scene);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  const handleLearnClick = (e) => {
    e.preventDefault();
    scrollTo('#home-scene-branching', { offset: -60 });
  };

  return (
    <section
      ref={sceneRef}
      id="home-scene-entry"
      className="pa-home-entry-scene"
      aria-label="World entry: The Living Record"
    >
      <div className="pa-home-entry-scene__backdrop" aria-hidden="true" />

      {/* Primary Documentary Context Media */}
      <div ref={primaryMediaRef} className="pa-home-entry-scene__primary-media">
        <EnvironmentPlane
          asset={MEDIA_ASSETS_V7.homeContext}
          role="primary"
          priority={true}
          focalPoint={MEDIA_ASSETS_V7.homeContext?.focalPoint?.desktop || '45% 50%'}
          caption="STUDIO DECISION ENVIRONMENT / SOURCE RETAINED"
        />
      </div>

      {/* Secondary Depth / Analytical Media */}
      <div ref={secondaryMediaRef} className="pa-home-entry-scene__secondary-media">
        <EnvironmentPlane
          asset={MEDIA_ASSETS_V7.homeAnalysis}
          role="support"
          caption="ANALYSIS PLANE"
        />
      </div>

      {/* Embedded Spatial Headline */}
      <div className="pa-home-entry-scene__content">
        <div ref={headlineRef} className="pa-home-entry-scene__headline-wrap">
          <h1 className="pa-home-entry-scene__h1">
            Keep the{' '}
            <br />
            source attached.
          </h1>
        </div>

        <div ref={supportTextRef} className="pa-home-entry-scene__support-wrap">
          <p className="pa-home-entry-scene__lead">
            A professional response can contribute to personality, interests, values and career
            interpretation without losing the context it came from.
          </p>

          <div className="pa-home-entry-scene__actions">
            <a
              href="/signup"
              className="pa-btn pa-btn--primary"
              onClick={(e) => handleCtaClick(e, '/signup')}
            >
              Build profile
            </a>
            <a
              href="#home-scene-branching"
              className="pa-btn pa-btn--quiet"
              onClick={handleLearnClick}
            >
              See how the record moves →
            </a>
          </div>
        </div>
      </div>

      {/* Persistent Protagonist: EvidenceStrip */}
      <div ref={stripRef} className="pa-home-entry-scene__strip-anchor">
        <EvidenceStrip
          quote="“I clarify responsibilities before committing work.”"
          eyebrow="ILLUSTRATIVE RESPONSE"
          sourceLabel="SOURCE RETAINED"
          theme="mineral"
          variant="source"
          notchPosition="left"
        />
      </div>
    </section>
  );
};

export default HomeWorldEntryScene;
