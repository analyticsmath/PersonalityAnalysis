import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

gsap.registerPlugin(ScrollTrigger);

/**
 * HOME CAREER ENVIRONMENT BRIDGE STATE MAP
 * 0%   - Evidence occupies foreground left plane. Work environment image begins as partial field.
 * 50%  - Image broadens and crosses into negative space as Career Context gains ownership.
 * 100% - Clearly communicates that the same evidence contributes differently when work conditions change.
 */
export const HomeEnvironmentChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const evidencePlaneRef = useRef(null);
  const mediaPlaneRef = useRef(null);

  const asset = MEDIA_ASSETS_V7.careerComplexMachine;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    if (prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      // Scroll parallax changing relative spatial distance between evidence and environment
      gsap.fromTo(
        evidencePlaneRef.current,
        { y: '8vh', scale: 0.96 },
        {
          y: '-6vh',
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        mediaPlaneRef.current,
        { y: '-6vh', scale: 1.06 },
        {
          y: '8vh',
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/career-intelligence');
  };

  return (
    <section
      ref={sectionRef}
      className="pa-home-environment"
      aria-label="Career Environment Chapter"
      data-tone="light"
    >
      <div className="pa-v7-grid pa-home-environment__grid">
        {/* Left Plane: Evidence in Relationship */}
        <div ref={evidencePlaneRef} className="pa-home-environment__evidence-plane">
          <span className="pa-provenance-tag">Environmental Relationship</span>
          <h2 className="pa-heading-major pa-home-environment__h2">
            Career fit changes with the conditions around the work.
          </h2>
          <p className="pa-home-environment__lead">
            The same preference for clear ownership creates high alignment in structured systems, yet creates tension in highly volatile or fragmented coordination environments.
          </p>

          <div className="pa-home-environment__actions">
            <MagneticTarget>
              <a
                href="/career-intelligence"
                className="pa-btn-primary"
                onClick={handleCtaClick}
              >
                Explore career conditions &rarr;
              </a>
            </MagneticTarget>
          </div>
        </div>

        {/* Right Plane: Atmospheric Environmental Photography */}
        <div ref={mediaPlaneRef} className="pa-home-environment__media-plane">
          <picture>
            <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 50vw, 100vw" />
            <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 50vw, 100vw" />
            <img
              src={asset.source}
              alt={asset.alt}
              width={asset.intrinsicDimensions.width}
              height={asset.intrinsicDimensions.height}
              className="pa-home-environment__img"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="pa-home-environment__caption">
            <span>Work Environment Lens: Complex problems, clear system ownership</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeEnvironmentChapter;
