import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import './EditorialProgressPage.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * EditorialProgressPage
 * Operating Mode: Longitudinal Film
 * Demonstrates temporal accumulation: A later assessment adds a record without erasing the first.
 * Longitudinal trends require >= 2 eligible assessments before trend vectors can be calculated.
 */
export const EditorialProgressPage = () => {
  const { navigateWithTransition } = useRouteTransition();
  const filmRef = useRef(null);
  const cropARef = useRef(null);
  const cropBRef = useRef(null);
  const strip1Ref = useRef(null);
  const strip2Ref = useRef(null);
  const intersectionRef = useRef(null);

  useEffect(() => {
    const film = filmRef.current;
    if (!film) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (prefersReduced || isTest) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile temporal sequence along 140svh scroll
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: film,
            start: 'top top',
            end: '+=140%',
            pin: true,
            anticipatePin: 1,
            scrub: 0.5,
          },
        });

        mobileTl
          .fromTo(strip1Ref.current, { opacity: 0.8, y: 0 }, { opacity: 1, y: 0, duration: 0.3 }, 0)
          .fromTo(
            strip2Ref.current,
            { opacity: 0, x: 16, y: 16 },
            { opacity: 1, x: 0, y: 0, duration: 0.35 },
            0.3
          )
          .fromTo(
            intersectionRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.3 },
            0.65
          );

        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: film,
          start: 'top top',
          end: '+=200%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
        },
      });

      // 0–25%: Baseline crop & 2024 strip in focus
      tl.fromTo(
        strip1Ref.current,
        { opacity: 0.7, y: 10 },
        { opacity: 1, y: 0, duration: 0.25 },
        0
      );

      // 25–50%: 2026 revisit crop and strip emerge overlapping
      tl.fromTo(
        cropBRef.current,
        { opacity: 0.08, scale: 0.98 },
        { opacity: 0.35, scale: 1, duration: 0.25 },
        0.25
      );
      tl.fromTo(
        strip2Ref.current,
        { opacity: 0, x: 20, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 0.25 },
        0.25
      );

      // 50–72%: Direct intersection reading / trace convergence
      tl.fromTo(
        intersectionRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.22 },
        0.5
      );

      // 72–90%: Temporal stabilization (holding both states concurrently without jump)
      tl.to(
        strip1Ref.current,
        { opacity: 0.85, duration: 0.18 },
        0.72
      );
      tl.to(
        strip2Ref.current,
        { opacity: 1, duration: 0.18 },
        0.72
      );

      // 90–100%: Retained history / handoff stage (settled compound state)
      tl.to(
        [cropARef.current, cropBRef.current],
        { opacity: (i) => (i === 0 ? 0.3 : 0.28), duration: 0.1 },
        0.9
      );
    }, film);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <div className="pa-progress-page" data-tone="dark">
          {/* Longitudinal Film Hero Stage with Physical Photographic Crop Overlap */}
          <section
            ref={filmRef}
            className="pa-progress-film"
            aria-label="Longitudinal Film: Recomposition over time"
          >
            <div className="pa-progress-film__crops">
              {/* Crop A: Earlier time point (x -8vw, y 7vh, w 68vw, h 82vh) */}
              <div ref={cropARef} className="pa-progress-film__crop pa-progress-film__crop--a">
                <EnvironmentPlane
                  asset={MEDIA_ASSETS_V7.progressStudio}
                  role="primary"
                  focalPoint="25% 35%"
                  priority={true}
                  caption="ASSESSMENT 01 / HISTORICAL BASELINE"
                />
              </div>

              {/* Crop B: Later time point (x 45vw, y -4vh, w 64vw, h 78vh) */}
              <div ref={cropBRef} className="pa-progress-film__crop pa-progress-film__crop--b">
                <EnvironmentPlane
                  asset={MEDIA_ASSETS_V7.progressStudio}
                  role="primary"
                  focalPoint="75% 65%"
                  caption="ASSESSMENT 02 / SUBSEQUENT OBSERVATION"
                />
              </div>
            </div>

            <div className="pa-progress-film__overlay">
              <div className="pa-progress-film__header">
                <h1 className="pa-progress-film__h1">
                  A later assessment adds a record.
                  <br />
                  It does not erase the first.
                </h1>
                <p className="pa-progress-film__lead">
                  Personality Assessor preserves historical baselines so you can inspect stability alongside
                  growth as your role and environment evolve.
                </p>
              </div>

              {/* Overlapping Dated Strips (Illustrative Comparative Record) */}
              <div className="pa-progress-film__stack">
                <span className="pa-progress-film__demo-label">
                  ILLUSTRATIVE EXAMPLE — COMPARATIVE RECORD
                </span>

                <div
                  ref={strip1Ref}
                  className="pa-progress-film__strip pa-progress-film__strip--one"
                >
                  <EvidenceStrip
                    quote="“I clarify responsibilities before committing work.”"
                    eyebrow="RETAINED BASELINE"
                    dateLabel="ASSESSMENT 01 — 2024"
                    sourceLabel="BASELINE SPECIMEN"
                    theme="mineral"
                    variant="dated"
                  />
                </div>

                <div
                  ref={strip2Ref}
                  className="pa-progress-film__strip pa-progress-film__strip--two"
                >
                  <EvidenceStrip
                    quote="“I coordinate across functions when goals require shared ownership.”"
                    eyebrow="SUBSEQUENT OBSERVATION"
                    dateLabel="ASSESSMENT 02 — 2025"
                    sourceLabel="LONGITUDINAL REVISIT"
                    theme="carbon"
                    variant="dated"
                  />
                </div>

                {/* Qualitative Intersection Readout at the Physical Overlap Boundary */}
                <div ref={intersectionRef} className="pa-progress-film__intersection">
                  <span className="pa-progress-film__int-label">INTERSECTION READOUT</span>
                  <p className="pa-progress-film__int-text">
                    Foundational procedural conscientiousness remains stable, while cross-functional
                    communication and shared artifact ownership expand into active working habits.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quiet Insufficient-History State Composition (No two side-by-side cards) */}
          <section className="pa-progress-insufficient" aria-label="Eligibility threshold requirements">
            <div className="pa-progress-insufficient__inner">
              <div className="pa-progress-insufficient__content">
                <h2 className="pa-progress-insufficient__h2">Not enough history yet.</h2>
                <p className="pa-progress-insufficient__desc">
                  Complete another eligible assessment before longitudinal trends can be calculated.
                  A single completed session preserves atomic evidence but holds trend vectors in reserve.
                </p>
              </div>

              <div className="pa-progress-insufficient__field">
                {/* 1 Completed Evidence Strip */}
                <div className="pa-progress-insufficient__strip-active">
                  <EvidenceStrip
                    quote="“I clarify responsibilities before committing work.”"
                    eyebrow="FIRST ASSESSMENT COMPLETE"
                    dateLabel="ASSESSMENT 01"
                    sourceLabel="BASELINE PRESERVED"
                    theme="mineral"
                    variant="dated"
                  />
                </div>

                {/* 1 Empty Future Registration Position */}
                <div className="pa-progress-insufficient__strip-future">
                  <div className="pa-progress-insufficient__future-notch" aria-hidden="true" />
                  <div className="pa-progress-insufficient__future-body">
                    <span className="pa-progress-insufficient__future-tag">PENDING ASSESSMENT 02</span>
                    <p className="pa-progress-insufficient__future-prompt">
                      Future responses will register here to calculate temporal stability and career trajectory.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pa-progress-insufficient__actions">
                <a
                  href="/signup"
                  className="pa-btn pa-btn--primary"
                  onClick={(e) => handleCtaClick(e, '/signup')}
                >
                  Create your first baseline &rarr;
                </a>
              </div>
            </div>
          </section>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialProgressPage;
