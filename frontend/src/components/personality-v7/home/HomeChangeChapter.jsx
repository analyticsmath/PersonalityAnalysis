import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

gsap.registerPlugin(ScrollTrigger);

export const HomeChangeChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const earlierPlaneRef = useRef(null);
  const laterPlaneRef = useRef(null);
  const revisedPlaneRef = useRef(null);

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
        { x: -30, opacity: 0.4 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0
      );

      tl.fromTo(
        laterPlaneRef.current,
        { x: 30, opacity: 0.4 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.2
      );

      // Revised reading synthesizes from overlap at midpoint
      tl.fromTo(
        revisedPlaneRef.current,
        { y: 24, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
        0.5
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
      <div className="pa-v7-grid pa-home-change__grid">
        <div className="pa-home-change__header">
          <span className="pa-provenance-tag">Longitudinal Integrity</span>
          <h2 className="pa-heading-major pa-home-change__h2">
            A later assessment should add evidence, not erase the first.
          </h2>
          <p className="pa-home-change__lead">
            People evolve and context changes. When you re-assess in a new role or project, earlier responses remain part of the historical record rather than being erased.
          </p>
        </div>

        {/* Split Vignette Temporal Field */}
        <div className="pa-home-change__vignette-field">
          {/* Earlier Evidence (Left / Upper) */}
          <div ref={earlierPlaneRef} className="pa-vignette-card pa-vignette-card--earlier">
            <span className="pa-vignette-card__tag">Earlier Evidence Record</span>
            <p className="pa-evidence-quote pa-vignette-card__text">
              “I avoid ambiguous ownership because it makes delivery harder to control.”
            </p>
            <span className="pa-vignette-card__meta">Stage 1 Assessment • Baseline Context</span>
          </div>

          {/* Later Evidence (Right / Lower) */}
          <div ref={laterPlaneRef} className="pa-vignette-card pa-vignette-card--later">
            <span className="pa-vignette-card__tag">New Contextual Evidence</span>
            <p className="pa-evidence-quote pa-vignette-card__text">
              “Led cross-functional release where ownership changed continuously under pressure.”
            </p>
            <span className="pa-vignette-card__meta">Stage 2 Assessment • Later Observation</span>
          </div>

          {/* Synthesized Revised Interpretation */}
          <div ref={revisedPlaneRef} className="pa-vignette-card pa-vignette-card--revised">
            <span className="pa-provenance-tag" style={{ color: 'var(--pa-oxblood)' }}>
              Synthesized Reading
            </span>
            <p className="pa-vignette-card__revised-text">
              Structure remains a primary operating anchor. Newer evidence confirms demonstrated adaptability when navigating unowned cross-team initiatives.
            </p>
            <span className="pa-vignette-card__meta">Both earlier and later evidence remain inspectable.</span>
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
