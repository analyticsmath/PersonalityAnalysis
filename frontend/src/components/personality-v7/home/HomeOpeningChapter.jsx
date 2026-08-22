import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';
import { useCursor } from '../motion/CursorCoordinator';

gsap.registerPlugin(ScrollTrigger);

/**
 * HOME OPENING SCENE STATE MAP
 * 0%   - Environment dominates. Primary media (homeContext) owns 68% viewport area with asymmetric hard clip.
 *        Headline in negative space. Open typographic evidence quote visible. Secondary media (homeAnalysis) at rear depth.
 * 25%  - Headline reduces visual ownership via y/scale/opacity. Primary crop shifts. Evidence remains stable.
 * 50%  - Evidence moves closer to central visual axis. Secondary analytical image crosses behind in depth.
 * 75%  - Environment recedes. Oxblood provenance trace appears. Evidence becomes payload handed to Decision.
 * 100% - Opening chapter resolved. Evidence object persists seamlessly into Decision scene.
 */
export const HomeOpeningChapter = ({
  evidenceText = '“I prefer clear ownership before committing work.”',
}) => {
  const { navigateWithTransition } = useRouteTransition();
  const { setApertureActive, setCursorLabel, clearCursorLabel } = useCursor();

  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);
  const primaryImageRef = useRef(null);
  const secondaryImageRef = useRef(null);
  const evidenceCardRef = useRef(null);
  const maskLayerRef = useRef(null);

  const primaryAsset = MEDIA_ASSETS_V7.homeContext;
  const secondaryAsset = MEDIA_ASSETS_V7.homeAnalysis;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;

    if (prefersReduced || isTest) return;

    // Desktop Pointer Parallax across multiple depth planes
    let pointerCleanup = () => {};
    if (!isMobile) {
      const handlePointerMove = (e) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(headlineRef.current, {
          x: normX * 6,
          y: normY * 6,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        gsap.to(primaryImageRef.current, {
          x: normX * 10,
          y: normY * 10,
          duration: 1.0,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        gsap.to(secondaryImageRef.current, {
          x: normX * 4,
          y: normY * 4,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        gsap.to(evidenceCardRef.current, {
          x: normX * 14,
          y: normY * 14,
          duration: 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      pointerCleanup = () => window.removeEventListener('pointermove', handlePointerMove);
    }

    // Scroll Choreography & Hero -> Context Transition
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 0.85,
          pin: !isMobile,
          anticipatePin: 1,
        },
      });

      // 0–25%: Headline reduces visual ownership
      tl.to(
        headlineRef.current,
        {
          y: '-8vh',
          scale: 0.96,
          opacity: 0.2,
          ease: 'none',
        },
        0
      );

      tl.to(
        leadRef.current,
        {
          opacity: 0,
          y: '-5vh',
          ease: 'none',
        },
        0
      );

      // Primary image crop shift & parallax
      tl.to(
        primaryImageRef.current,
        {
          y: '-10vh',
          scale: 1.06,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
        },
        0
      );

      // Secondary analytical image moves in depth
      tl.to(
        secondaryImageRef.current,
        {
          y: '-4vh',
          x: '2vw',
          opacity: 0.7,
          ease: 'power1.out',
        },
        0.15
      );

      // 35–75%: Evidence statement moves toward central visual axis
      tl.to(
        evidenceCardRef.current,
        {
          y: '+12vh',
          scale: 1.04,
          ease: 'power1.inOut',
        },
        0.3
      );

      // 70–100%: Opening environment recedes into Decision
      tl.to(
        primaryImageRef.current,
        {
          opacity: 0,
          scale: 1.12,
          ease: 'power2.in',
        },
        0.7
      );

      tl.to(
        secondaryImageRef.current,
        {
          opacity: 0,
          ease: 'power2.in',
        },
        0.75
      );
    }, sectionRef);

    return () => {
      pointerCleanup();
      ctx.revert();
    };
  }, []);

  const handleHeroCta = (e, path) => {
    e.preventDefault();
    navigateWithTransition(path);
  };

  const handleScrollToContext = (e) => {
    e.preventDefault();
    const target = document.getElementById('context-decision-chapter');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePointerEnterMedia = () => {
    setCursorLabel('INSPECT');
    setApertureActive(true);
  };

  const handlePointerLeaveMedia = () => {
    clearCursorLabel();
    setApertureActive(false);
  };

  return (
    <section
      ref={sectionRef}
      className="pa-home-opening"
      aria-label="Orientation & Context"
      data-tone="light"
    >
      <div className="pa-home-opening__viewport">
        {/* Secondary Analytical Media Layer in Depth */}
        <div ref={secondaryImageRef} className="pa-home-opening__media-secondary" aria-hidden="true">
          <picture>
            <source type="image/avif" srcSet={secondaryAsset.avifSrcSet} sizes="(min-width: 901px) 30vw, 50vw" />
            <source type="image/webp" srcSet={secondaryAsset.webpSrcSet} sizes="(min-width: 901px) 30vw, 50vw" />
            <img
              src={secondaryAsset.source}
              alt=""
              width={secondaryAsset.intrinsicDimensions.width}
              height={secondaryAsset.intrinsicDimensions.height}
              className="pa-home-opening__media-secondary-img"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>

        {/* Asymmetric Hard-Clipped Primary Media Plane */}
        <div
          ref={primaryImageRef}
          className="pa-home-opening__media-plane"
          onMouseEnter={handlePointerEnterMedia}
          onMouseLeave={handlePointerLeaveMedia}
        >
          <picture>
            <source type="image/avif" srcSet={primaryAsset.avifSrcSet} sizes="(min-width: 901px) 68vw, 100vw" />
            <source type="image/webp" srcSet={primaryAsset.webpSrcSet} sizes="(min-width: 901px) 68vw, 100vw" />
            <img
              src={primaryAsset.source}
              alt={primaryAsset.alt}
              width={primaryAsset.intrinsicDimensions.width}
              height={primaryAsset.intrinsicDimensions.height}
              className="pa-home-opening__media-img"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </div>

        {/* Foreground Content Plane */}
        <div className="pa-v7-grid pa-home-opening__grid">
          <div className="pa-home-opening__content">
            <h1 ref={headlineRef} className="pa-display-hero pa-home-opening__h1">
              Keep the context behind every answer.
            </h1>
            <p ref={leadRef} className="pa-home-opening__lead">
              Personality Assessor builds an inspectable professional record from personality, vocational interests, work values and the situations around your responses.
            </p>

            <div className="pa-home-opening__actions">
              <MagneticTarget>
                <a
                  href="/signup"
                  className="pa-btn-primary"
                  onClick={(e) => handleHeroCta(e, '/signup')}
                >
                  Build your profile
                </a>
              </MagneticTarget>

              <button
                type="button"
                className="pa-link-text pa-home-opening__secondary-btn"
                onClick={handleScrollToContext}
              >
                See how evidence moves &darr;
              </button>
            </div>
          </div>

          {/* First Visible Evidence Object as Open Typographic Object */}
          <div ref={evidenceCardRef} className="pa-home-opening__evidence-wrap">
            <div className="pa-home-opening__evidence-open">
              <div className="pa-home-opening__provenance-mark" aria-hidden="true" />
              <span className="pa-provenance-tag">Supplied Evidence Statement</span>
              <p className="pa-evidence-quote pa-home-opening__evidence-quote">
                {evidenceText}
              </p>

              {/* Context fragments revealed underneath via Mask Aperture */}
              <div ref={maskLayerRef} className="pa-home-opening__context-fragments">
                <span className="pa-fragment-tag">fixed deadline</span>
                <span className="pa-fragment-tag">shared dependency</span>
                <span className="pa-fragment-tag">unclear ownership</span>
                <span className="pa-fragment-tag">decision pressure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeOpeningChapter;
