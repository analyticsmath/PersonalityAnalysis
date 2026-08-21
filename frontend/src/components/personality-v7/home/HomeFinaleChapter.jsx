import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import MagneticTarget from '../motion/MagneticTarget';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

gsap.registerPlugin(ScrollTrigger);

export const HomeFinaleChapter = () => {
  const { navigateWithTransition } = useRouteTransition();
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);

  const asset = MEDIA_ASSETS_V7.homeContext;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    if (prefersReduced || isMobile) return;

    const ctx = gsap.context(() => {
      // Sticky footer reveal upward translation as finale finishes
      gsap.to(sectionRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e, path) => {
    e.preventDefault();
    navigateWithTransition(path);
  };

  return (
    <section
      ref={sectionRef}
      className="pa-home-finale"
      aria-label="Finale & Narrative Closure"
      data-tone="dark"
    >
      <div className="pa-v7-grid pa-home-finale__grid">
        <div ref={contentRef} className="pa-home-finale__content">
          <span className="pa-provenance-tag" style={{ color: 'var(--pa-mineral)' }}>
            Narrative Closure
          </span>
          <h2 className="pa-heading-major pa-home-finale__h2">
            Your record can keep changing as the evidence changes.
          </h2>
          <p className="pa-home-finale__lead">
            Personality Assessor creates an inspectable professional history that evolves alongside your career, projects, and new challenges.
          </p>

          {/* Returning Hero Evidence Object */}
          <div className="pa-home-finale__evidence-revisit">
            <span className="pa-provenance-tag" style={{ color: 'var(--pa-oxblood)' }}>
              Original Evidence Preserved
            </span>
            <p className="pa-evidence-quote pa-home-finale__evidence-text">
              “I prefer clear ownership before committing work.”
            </p>
          </div>

          <div className="pa-home-finale__actions">
            <MagneticTarget>
              <a
                href="/signup"
                className="pa-btn-primary-dark"
                onClick={(e) => handleCtaClick(e, '/signup')}
              >
                Build your profile
              </a>
            </MagneticTarget>

            <a
              href="/login"
              className="pa-link-text pa-home-finale__signin-link"
              onClick={(e) => handleCtaClick(e, '/login')}
            >
              Return to an existing record &rarr;
            </a>
          </div>
        </div>

        {/* Hero photograph returns with distinct vertical portrait crop */}
        <div ref={mediaRef} className="pa-home-finale__media-wrap">
          <picture>
            <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 40vw, 100vw" />
            <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 40vw, 100vw" />
            <img
              src={asset.source}
              alt={asset.alt}
              width={asset.intrinsicDimensions.width}
              height={asset.intrinsicDimensions.height}
              className="pa-home-finale__img"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default HomeFinaleChapter;
