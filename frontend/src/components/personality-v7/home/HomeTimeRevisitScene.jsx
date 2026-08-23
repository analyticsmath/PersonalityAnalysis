import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EnvironmentPlane from '../living-record/EnvironmentPlane';
import EvidenceStrip from '../living-record/EvidenceStrip';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import './HomeTimeRevisitScene.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeTimeRevisitScene (Scene 6)
 * Longitudinal Film state:
 * Shows the same source photo under two different crops and two physically overlapping
 * dated EvidenceStrips to demonstrate that previous records are retained, not overwritten.
 */
export const HomeTimeRevisitScene = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sceneRef = useRef(null);
  const cropARef = useRef(null);
  const cropBRef = useRef(null);
  const strip1Ref = useRef(null);
  const strip2Ref = useRef(null);
  const intersectionRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (prefersReduced || isTest) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: '+=140%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 0–40%: Crop B enters from right, second strip arrives
      tl.fromTo(
        cropBRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.45, ease: 'power2.out' },
        0.1
      );

      tl.fromTo(
        strip2Ref.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
        0.25
      );

      // 40–80%: Intersection reading forms at boundary
      tl.fromTo(
        intersectionRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        0.45
      );
    }, scene);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/progress');
  };

  return (
    <section
      ref={sceneRef}
      id="home-scene-time"
      className="pa-home-time-scene"
      data-tone="dark"
      aria-label="Time revisit: Longitudinal record retention"
    >
      <div className="pa-home-time-scene__stage">
        {/* Crop A (Earlier Time State) */}
        <div ref={cropARef} className="pa-home-time-scene__crop-a">
          <EnvironmentPlane
            asset={MEDIA_ASSETS_V7.progressStudio}
            role="primary"
            focalPoint="30% 40%"
            caption="STUDIO ARCHIVE / EARLIER OBSERVATION"
          />
        </div>

        {/* Crop B (Later Time State - Same Source Image, Alternate Crop) */}
        <div ref={cropBRef} className="pa-home-time-scene__crop-b">
          <EnvironmentPlane
            asset={MEDIA_ASSETS_V7.progressStudio}
            role="primary"
            focalPoint="75% 60%"
            caption="STUDIO ARCHIVE / REVISITED OBSERVATION"
          />
        </div>

        {/* Content & Overlapping Strips */}
        <div className="pa-home-time-scene__overlay">
          <div className="pa-home-time-scene__header">
            <h2 className="pa-home-time-scene__h2">
              A later assessment adds a record.
              <br />
              It does not erase the first.
            </h2>
          </div>

          <div className="pa-home-time-scene__strips-stack">
            {/* Earlier Record */}
            <div ref={strip1Ref} className="pa-home-time-scene__strip pa-home-time-scene__strip--earlier">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="RETAINED RECORD"
                dateLabel="ASSESSMENT 01"
                sourceLabel="BASELINE SPECIMEN"
                theme="mineral"
                variant="dated"
              />
            </div>

            {/* Later Record */}
            <div ref={strip2Ref} className="pa-home-time-scene__strip pa-home-time-scene__strip--later">
              <EvidenceStrip
                quote="“I coordinate across functions when goals require shared ownership.”"
                eyebrow="SUBSEQUENT RECORD"
                dateLabel="ASSESSMENT 02"
                sourceLabel="LONGITUDINAL COMPARISON"
                theme="carbon"
                variant="dated"
              />
            </div>

            {/* Intersection Reading */}
            <div ref={intersectionRef} className="pa-home-time-scene__intersection-reading">
              <div className="pa-home-time-scene__intersection-badge">
                <span className="pa-home-time-scene__intersection-dot" />
                <span>TREND: CONSCIENTIOUSNESS + EXTRAVERSION SYNCHRONIZATION</span>
              </div>
            </div>
          </div>

          <div className="pa-home-time-scene__footer">
            <a
              href="/progress"
              className="pa-btn pa-btn--primary"
              onClick={handleCtaClick}
            >
              See how progress works →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTimeRevisitScene;
