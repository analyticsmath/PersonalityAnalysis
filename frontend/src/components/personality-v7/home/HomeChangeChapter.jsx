import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

gsap.registerPlugin(ScrollTrigger);

export const HomeChangeChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const earlierPlaneRef = useRef(null);
  const laterPlaneRef = useRef(null);
  const revisedPlaneRef = useRef(null);

  const laterAsset = MEDIA_ASSETS_V7.homeSharedContext;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    if (prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 0.85,
        },
      });

      // Earlier evidence comes from top-left, Later from bottom-right
      tl.fromTo(
        earlierPlaneRef.current,
        { x: -30, opacity: 0.5 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0
      );

      tl.fromTo(
        laterPlaneRef.current,
        { x: 30, opacity: 0.5 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.2
      );

      // Revised reading synthesizes from overlap at midpoint
      tl.fromTo(
        revisedPlaneRef.current,
        { y: 24, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        0.45
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/progress');
  };

  return (
    <section
      ref={sectionRef}
      className="pa-home-change"
      aria-label="Change Over Time Chapter"
      data-tone="light"
    >
      <div className="pa-home-change__stage">
        <div className="pa-home-change__header">
          <h2 className="pa-heading-major pa-home-change__h2">
            A later assessment should add evidence, not erase the first.
          </h2>
          <p className="pa-home-change__lead">
            People evolve and context changes. When you re-assess in a new role or project, earlier responses remain part of the historical record rather than being erased.
          </p>
        </div>

        {/* Overlapping Continuous Temporal Field */}
        <div className="pa-home-change__temporal-field">
          {/* Earlier Record (Open Left-Upper) */}
          <div ref={earlierPlaneRef} className="pa-temporal-plane pa-temporal-plane--earlier">
            <span className="pa-temporal-plane__index">Stage 1 • Baseline Record</span>
            <p className="pa-evidence-quote pa-temporal-plane__quote">
              “I avoid ambiguous ownership because it makes delivery harder to control.”
            </p>
            <span className="pa-temporal-plane__context">Individual Contributor • Controlled System Context</span>
          </div>

          {/* Later Record with Environmental Fragment (Right-Lower) */}
          <div ref={laterPlaneRef} className="pa-temporal-plane pa-temporal-plane--later">
            <div className="pa-temporal-plane__media-crop" aria-hidden="true">
              <img src={laterAsset.source} alt="" className="pa-temporal-plane__img" loading="lazy" />
            </div>
            <div className="pa-temporal-plane__content">
              <span className="pa-temporal-plane__index">Stage 2 • Later Observation</span>
              <p className="pa-evidence-quote pa-temporal-plane__quote">
                “Led cross-functional release where ownership changed continuously under pressure.”
              </p>
              <span className="pa-temporal-plane__context">Staff Lead • Dynamic Coordination Environment</span>
            </div>
          </div>

          {/* Synthesized Revised Interpretation Emerging at Intersection */}
          <div ref={revisedPlaneRef} className="pa-temporal-plane pa-temporal-plane--revised">
            <div className="pa-temporal-plane__provenance-mark" aria-hidden="true" />
            <span className="pa-temporal-plane__index pa-temporal-plane__index--oxblood">
              Synthesized Reading
            </span>
            <p className="pa-temporal-plane__revised-text">
              Structure remains a primary operating anchor. Newer evidence confirms demonstrated adaptability when navigating unowned cross-team initiatives.
            </p>
            <span className="pa-temporal-plane__subtext">
              Both earlier and later evidence remain inspectable in full detail.
            </span>
          </div>
        </div>

        <div className="pa-home-change__actions">
          <MagneticTarget>
            <a href="/progress" className="pa-btn-primary" onClick={handleCtaClick}>
              See how progress works &rarr;
            </a>
          </MagneticTarget>
        </div>
      </div>
    </section>
  );
};

export default HomeChangeChapter;
