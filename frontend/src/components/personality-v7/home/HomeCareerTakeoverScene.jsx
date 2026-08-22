import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EnvironmentPlane from '../living-record/EnvironmentPlane';
import EvidenceStrip from '../living-record/EvidenceStrip';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import './HomeCareerTakeoverScene.css';

gsap.registerPlugin(ScrollTrigger);

const CAREER_ENVIRONMENTS = [
  {
    key: 'complexMachine',
    title: 'Complex problems',
    subtitle: 'Clear ownership / direct mechanical control',
    asset: MEDIA_ASSETS_V7.careerComplexMachine,
    condition: 'working conditions: structured',
  },
  {
    key: 'deepInquiry',
    title: 'Open questions',
    subtitle: 'Long focus / investigative inquiry',
    asset: MEDIA_ASSETS_V7.careerDeepInquiry,
    condition: 'working conditions: autonomous',
  },
  {
    key: 'coordination',
    title: 'Shared decisions',
    subtitle: 'Coordination / shared multidisciplinary artifacts',
    asset: MEDIA_ASSETS_V7.careerCoordination,
    condition: 'working conditions: collaborative',
  },
];

/**
 * HomeCareerTakeoverScene (Scene 4)
 * The environment itself changes around the stable EvidenceStrip.
 * Demonstrates how professional context alters what evidence means.
 */
export const HomeCareerTakeoverScene = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sceneRef = useRef(null);
  const planesRef = useRef([]);
  const [activeIdx, setActiveIdx] = useState(0);

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
          end: '+=180%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveIdx(0);
            } else if (p < 0.66) {
              setActiveIdx(1);
            } else {
              setActiveIdx(2);
            }
          },
        },
      });

      // Cross-fade / crop replacement across environments
      planesRef.current.forEach((plane, idx) => {
        if (!plane) return;
        if (idx === 0) {
          tl.to(plane, { opacity: 0.15, scale: 0.96, duration: 0.5 }, 0.25);
        } else if (idx === 1) {
          tl.fromTo(
            plane,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.4 },
            0.25
          );
          tl.to(plane, { opacity: 0.15, scale: 0.96, duration: 0.4 }, 0.65);
        } else if (idx === 2) {
          tl.fromTo(
            plane,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.4 },
            0.65
          );
        }
      });
    }, scene);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/career-intelligence');
  };

  const currentEnv = CAREER_ENVIRONMENTS[activeIdx] || CAREER_ENVIRONMENTS[0];

  return (
    <section
      ref={sceneRef}
      id="home-scene-career"
      className="pa-home-career-scene"
      aria-label="Career takeover: Same record across work environments"
    >
      <div className="pa-home-career-scene__environment-stage">
        {CAREER_ENVIRONMENTS.map((env, idx) => (
          <div
            key={env.key}
            ref={(el) => (planesRef.current[idx] = el)}
            className={`pa-home-career-scene__plane ${idx === activeIdx ? 'is-active' : ''}`}
            style={{ zIndex: idx + 1, opacity: idx === 0 ? 1 : 0 }}
          >
            <EnvironmentPlane
              asset={env.asset}
              role="primary"
              caption={`WORKWORLD: ${env.title.toUpperCase()}`}
            />
          </div>
        ))}
      </div>

      <div className="pa-home-career-scene__overlay">
        <div className="pa-home-career-scene__top-meta">
          <span className="pa-home-career-scene__env-name">{currentEnv.title}</span>
          <span className="pa-home-career-scene__env-sub">{currentEnv.subtitle}</span>
        </div>

        <div className="pa-home-career-scene__strip-anchor">
          <EvidenceStrip
            quote="“I clarify responsibilities before committing work.”"
            eyebrow="RETAINED SOURCE"
            conditionLabel={currentEnv.condition}
            sourceLabel="SAME SOURCE / DIFFERENT CONDITIONS"
            theme="mineral"
            variant="compared"
          />
        </div>

        <div className="pa-home-career-scene__footer-cta">
          <a
            href="/career-intelligence"
            className="pa-btn pa-btn--primary"
            onClick={handleCtaClick}
          >
            Explore career conditions →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeCareerTakeoverScene;
