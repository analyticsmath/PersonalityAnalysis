import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

gsap.registerPlugin(ScrollTrigger);

/**
 * PROGRESS RECOMPOSITION STATE MAP (TEMPORAL EVIDENCE SYNTHESIS)
 * 0%   - Earlier evidence baseline is established on upper spatial plane.
 * 35%  - New context documentary crop (progressStudio) enters on middle plane with scroll parallax.
 * 65%  - Layers intersect; Synthesized Revised Reading emerges directly from the overlap boundary.
 * 100% - All three states remain independently inspectable, demonstrating that new evidence never erases past records.
 */
export const ProgressContent = () => {
  const { navigateWithTransition } = useRouteTransition();
  const recompositionStageRef = useRef(null);
  const earlierPlaneRef = useRef(null);
  const laterMediaCropRef = useRef(null);
  const revisedReadingRef = useRef(null);

  const asset = MEDIA_ASSETS_V7.progressStudio;

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: recompositionStageRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          scrub: 0.85,
        },
      });

      // 1. Earlier Evidence enters on upper spatial plane
      tl.fromTo(
        earlierPlaneRef.current,
        { y: -30, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        0
      );

      // 2. New Context media crop passes over with scroll parallax (zoom 1 -> 1.08)
      tl.fromTo(
        laterMediaCropRef.current,
        { y: 40, scale: 0.95, opacity: 0.6 },
        { y: -10, scale: 1.06, opacity: 1, duration: 0.45, ease: 'none' },
        0.15
      );

      // 3. At 45–60% scroll, layers intersect and Revised Reading materializes from overlap
      tl.fromTo(
        revisedReadingRef.current,
        { scale: 0.94, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        0.48
      );
    }, recompositionStageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pa-progress-page">
      {/* ── Section 1: Opening Hero ── */}
      <section className="pa-progress-hero" data-tone="light">
        <div className="pa-v7-grid pa-progress-hero__grid">
          <div className="pa-progress-hero__copy">
            <h1 className="pa-display-hero pa-progress-hero__h1">
              A later assessment should add evidence without erasing the earlier record.
            </h1>
            <p className="pa-progress-hero__lead">
              Personality Assessor preserves historical baselines so you can compare what stayed stable against what changed as your working environment and responsibilities evolved.
            </p>
          </div>

          <div className="pa-progress-hero__media-wrap">
            <picture>
              <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 42vw, 100vw" />
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 42vw, 100vw" />
              <img
                src={asset.source}
                alt={asset.alt}
                width={asset.intrinsicDimensions.width}
                height={asset.intrinsicDimensions.height}
                className="pa-progress-hero__img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ── Section 2: Temporal Recomposition & Overlapping Field ── */}
      <section ref={recompositionStageRef} className="pa-progress-recomposition" data-tone="dark">
        <div className="pa-progress-recomposition__stage">
          <div className="pa-progress-recomposition__header">
            <h2 className="pa-heading-major pa-progress-recomposition__h2">
              Three Inspectable States
            </h2>
            <p className="pa-progress-recomposition__lead">
              Rather than an opaque timeline rail, all three evidence states remain individually inspectable in the record.
            </p>
          </div>

          <div className="pa-progress-recomposition__field">
            {/* Plane 1: Earlier Evidence Baseline */}
            <div ref={earlierPlaneRef} className="pa-progress-plane pa-progress-plane--earlier">
              <span className="pa-progress-plane__index">01 • Earlier Baseline</span>
              <p className="pa-evidence-quote pa-progress-plane__quote">
                “I avoid ambiguous ownership because it makes delivery harder to control.”
              </p>
              <span className="pa-progress-plane__meta">Stage 1 Initial Record • Baseline Operating Mode</span>
            </div>

            {/* Plane 2: New Context Documentary Crop */}
            <div ref={laterMediaCropRef} className="pa-progress-plane pa-progress-plane--media">
              <div className="pa-progress-crop-frame">
                <picture>
                  <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 30vw, 100vw" />
                  <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 30vw, 100vw" />
                  <img
                    src={asset.source}
                    alt={asset.alt}
                    width={asset.intrinsicDimensions.width}
                    height={asset.intrinsicDimensions.height}
                    className="pa-progress-crop-img"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="pa-progress-plane__overlay-content">
                <span className="pa-progress-plane__index">02 • New Context</span>
                <p className="pa-evidence-quote pa-progress-plane__quote">
                  “Led cross-functional release where ownership shifted continuously.”
                </p>
              </div>
            </div>

            {/* Plane 3: Synthesized Revised Reading at Intersection */}
            <div ref={revisedReadingRef} className="pa-progress-plane pa-progress-plane--revised">
              <div className="pa-progress-plane__provenance-mark" aria-hidden="true" />
              <span className="pa-progress-plane__index pa-progress-plane__index--oxblood">
                03 • Synthesized Reading
              </span>
              <h3 className="pa-progress-plane__revised-title">
                Demonstrated Adaptability in Unowned Delivery
              </h3>
              <p className="pa-progress-plane__revised-body">
                The baseline preference for clarity remains valid. The later evidence adds demonstrated capacity to navigate ambiguity under project delivery constraints.
              </p>
              <span className="pa-progress-plane__subtext">Both earlier baseline and new context remain inspectable.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Longitudinal Principles Trace & CTA ── */}
      <section className="pa-progress-principles" data-tone="light">
        <div className="pa-progress-principles__stage">
          <div className="pa-progress-trace-track">
            <div className="pa-progress-milestone">
              <div className="pa-progress-milestone__node" aria-hidden="true" />
              <div className="pa-progress-milestone__content">
                <h3 className="pa-heading-sub">What stayed stable</h3>
                <p className="pa-progress-principle-body">
                  Core traits and stable work preferences reinforce confidence in recurring patterns across career milestones.
                </p>
              </div>
            </div>

            <div className="pa-progress-milestone">
              <div className="pa-progress-milestone__node" aria-hidden="true" />
              <div className="pa-progress-milestone__content">
                <h3 className="pa-heading-sub">What changed</h3>
                <p className="pa-progress-principle-body">
                  New project challenges demonstrate expanded capability without discarding previous observations.
                </p>
              </div>
            </div>

            <div className="pa-progress-milestone">
              <div className="pa-progress-milestone__node" aria-hidden="true" />
              <div className="pa-progress-milestone__content">
                <h3 className="pa-heading-sub">What appeared later</h3>
                <p className="pa-progress-principle-body">
                  Longitudinal comparison reveals emerging vocational interest vectors as you gain seniority.
                </p>
              </div>
            </div>
          </div>

          <div className="pa-progress-principles__cta-wrap">
            <MagneticTarget>
              <a
                href="/signup"
                className="pa-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/signup');
                }}
              >
                Build a record you can revisit
              </a>
            </MagneticTarget>
          </div>
        </div>
      </section>
    </div>
  );
};

export const EditorialProgressPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        <ProgressContent />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialProgressPage;
