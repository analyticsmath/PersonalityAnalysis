import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

gsap.registerPlugin(ScrollTrigger);

export const HomeEnvironmentChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const evidencePlaneRef = useRef(null);
  const mediaPlaneRef = useRef(null);
  const secondaryPlaneRef = useRef(null);

  const primaryAsset = MEDIA_ASSETS_V7.careerComplexMachine;
  const secondaryAsset = MEDIA_ASSETS_V7.careerCoordination;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    if (prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      // Scroll parallax changing relative spatial distance between evidence and environments
      gsap.fromTo(
        evidencePlaneRef.current,
        { y: '6vh', scale: 0.97 },
        {
          y: '-4vh',
          scale: 1.01,
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
        { y: '-8vh', scale: 1.04 },
        {
          y: '6vh',
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

      gsap.fromTo(
        secondaryPlaneRef.current,
        { y: '4vh', x: '-2vw' },
        {
          y: '-6vh',
          x: '1vw',
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
      <div className="pa-home-environment__stage">
        {/* Secondary Coordinate Media in Depth */}
        <div ref={secondaryPlaneRef} className="pa-home-environment__secondary-media" aria-hidden="true">
          <picture>
            <source type="image/avif" srcSet={secondaryAsset.avifSrcSet} sizes="(min-width: 901px) 25vw, 40vw" />
            <source type="image/webp" srcSet={secondaryAsset.webpSrcSet} sizes="(min-width: 901px) 25vw, 40vw" />
            <img
              src={secondaryAsset.source}
              alt=""
              width={secondaryAsset.intrinsicDimensions.width}
              height={secondaryAsset.intrinsicDimensions.height}
              className="pa-home-environment__secondary-img"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Primary Crossing Media Plane */}
        <div ref={mediaPlaneRef} className="pa-home-environment__primary-media">
          <picture>
            <source type="image/avif" srcSet={primaryAsset.avifSrcSet} sizes="(min-width: 901px) 55vw, 100vw" />
            <source type="image/webp" srcSet={primaryAsset.webpSrcSet} sizes="(min-width: 901px) 55vw, 100vw" />
            <img
              src={primaryAsset.source}
              alt={primaryAsset.alt}
              width={primaryAsset.intrinsicDimensions.width}
              height={primaryAsset.intrinsicDimensions.height}
              className="pa-home-environment__img"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Evidence Typography Intersecting Negative Space */}
        <div ref={evidencePlaneRef} className="pa-home-environment__content">
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
      </div>
    </section>
  );
};

export default HomeEnvironmentChapter;
