import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

gsap.registerPlugin(ScrollTrigger);

export const HomeOpeningChapter = ({ evidenceText = '“I prefer clear ownership before committing work.”' }) => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);
  const imagePlaneRef = useRef(null);
  const evidenceCardRef = useRef(null);
  const maskLayerRef = useRef(null);

  const asset = MEDIA_ASSETS_V7.homeContext;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;

    if (prefersReduced || isTest) return;

    // Pointer Parallax across multiple depth planes (desktop only)
    let pointerCleanup = () => {};
    if (!isMobile) {
      const handlePointerMove = (e) => {
        const normX = (e.clientX / window.innerWidth - 0.5) * 2;
        const normY = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(headlineRef.current, {
          x: normX * 5,
          y: normY * 5,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        gsap.to(imagePlaneRef.current, {
          x: normX * 9,
          y: normY * 9,
          duration: 1.0,
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

    // Scroll Choreography & Hero -> Context Transition (110vh)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=110%',
          scrub: 0.85,
          pin: !isMobile,
          anticipatePin: 1,
        },
      });

      // 0–20%: Headline surrenders visual ownership
      tl.to(
        headlineRef.current,
        {
          y: '-6vh',
          opacity: 0.25,
          ease: 'none',
        },
        0
      );

      tl.to(
        leadRef.current,
        {
          opacity: 0,
          y: '-4vh',
          ease: 'none',
        },
        0
      );

      // Main image parallax & scale (0 → -9vh, scale 1 → 1.07)
      tl.to(
        imagePlaneRef.current,
        {
          y: '-9vh',
          scale: 1.07,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
        },
        0
      );

      // 35–70%: Evidence statement becomes dominant and moves downward
      tl.to(
        evidenceCardRef.current,
        {
          y: '+12vh',
          scale: 1.04,
          boxShadow: '0 20px 40px rgba(13,15,14,0.12)',
          ease: 'power1.inOut',
        },
        0.35
      );

      // 70–90%: Hero image fades and leaves
      tl.to(
        imagePlaneRef.current,
        {
          opacity: 0,
          scale: 1.12,
          ease: 'power2.in',
        },
        0.7
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

  return (
    <section
      ref={sectionRef}
      className="pa-home-opening"
      aria-label="Orientation & Context"
      data-tone="light"
    >
      <div className="pa-home-opening__viewport">
        {/* Asymmetric Curved Media Plane (Desktop 1440+) */}
        <div ref={imagePlaneRef} className="pa-home-opening__media-plane">
          <picture>
            <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 68vw, 100vw" />
            <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 68vw, 100vw" />
            <img
              src={asset.source}
              alt={asset.alt}
              width={asset.intrinsicDimensions.width}
              height={asset.intrinsicDimensions.height}
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

          {/* First Visible Evidence Object with Mask Cursor Context Aperture */}
          <div ref={evidenceCardRef} className="pa-home-opening__evidence-wrap">
            <div className="pa-home-opening__evidence-card">
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
