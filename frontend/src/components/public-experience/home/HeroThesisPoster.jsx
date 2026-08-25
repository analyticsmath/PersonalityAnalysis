import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const HeroThesisPoster = () => {
  const data = PUBLIC_CONTENT.home.worldEntry;
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const mediaRef = useRef(null);
  const sourceRef = useRef(null);
  const pathRef = useRef(null);
  const ctaRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headlineLines = headlineRef.current?.querySelectorAll('.pa-px-hero-line') || [];
      const imageInner = mediaRef.current?.querySelector('img') || mediaRef.current;

      // ── 1. Authored Load Choreography (900–1200ms) ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image crop clip reveal
      if (mediaRef.current) {
        tl.fromTo(
          mediaRef.current,
          { clipPath: 'inset(10% 0% 6% 0%)', opacity: 0, scale: 0.97 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, duration: 1.0, ease: 'power3.inOut' },
          0
        );
      }

      // Headline lines enter through masks
      if (headlineLines.length) {
        tl.fromTo(
          headlineLines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power4.out' },
          0.15
        );
      }

      // Source response arrives as a retained actor
      if (sourceRef.current) {
        tl.fromTo(
          sourceRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          0.45
        );
      }

      // Evidence path draws
      if (pathRef.current) {
        const pathEl = pathRef.current.querySelector('path');
        if (pathEl) {
          const pathLen = pathEl.getTotalLength ? pathEl.getTotalLength() : 60;
          gsap.set(pathEl, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
          tl.to(
            pathEl,
            { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' },
            0.6
          );
        }
      }

      // CTAs resolve smoothly
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0.75
        );
      }

      // ── 2. Scroll Parallax Choreography ──
      if (mediaRef.current && sectionRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        // Inner image crop moves independently with subtle scale evolution
        if (imageInner) {
          scrollTl.to(
            imageInner,
            { yPercent: 12, scale: 1.06, ease: 'none' },
            0
          );
        }

        // Headline lines slightly counter-move
        if (headlineLines.length) {
          scrollTl.to(
            headlineLines,
            { y: (i) => -(i + 1) * 16, opacity: 0.85, ease: 'none' },
            0
          );
        }

        // Source actor migrates down toward Chapter 2
        if (sourceRef.current) {
          scrollTl.to(
            sourceRef.current,
            { y: 40, ease: 'none' },
            0
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="pa-px-ch-poster pa-px-hero-field"
      aria-label="Editorial Evidence Atlas Opening Thesis"
    >
      <div className="pa-px-hero-field__composition">
        {/* Environmental Photographic Ground (Occupies ~60-70% visible territory) */}
        <div ref={mediaRef} className="pa-px-hero-field__media-plane">
          <div className="pa-px-hero-field__media-frame">
            <PublicPicture
              assetKey="homeHeroContext"
              alt="Professional working in technology workshop"
              priority={true}
            />
          </div>
        </div>

        {/* Unified Overlapping Editorial Foreground */}
        <div className="pa-px-hero-field__editorial-layer">
          <div className="pa-px-hero-field__content">
            <div className="pa-px-data pa-px-hero-field__kicker">
              EDITORIAL EVIDENCE ATLAS &middot; ONE ANSWER IS NOT ONE RESULT
            </div>

            <h1 ref={headlineRef} className="pa-px-hero-field__headline">
              <span className="pa-px-hero-mask">
                <span className="pa-px-hero-line">ONE ANSWER </span>
              </span>
              <span className="pa-px-hero-mask">
                <span className="pa-px-hero-line">IS NOT ONE </span>
              </span>
              <span className="pa-px-hero-mask">
                <span className="pa-px-hero-line">RESULT.</span>
              </span>
            </h1>

            <p className="pa-px-hero-field__support">
              {data.support}
            </p>

            <div ref={ctaRef} className="pa-px-hero-field__actions">
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                {data.ctaPrimary}
              </Link>
              <Link to="/how-it-works" className="pa-px-btn-secondary">
                {data.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Source Protagonist Actor with Drawing Evidence Path */}
          <div ref={sourceRef} className="pa-px-hero-field__source-actor pa-px-home-primary-actor">
            <div className="pa-px-hero-field__source-plate">
              <div className="pa-px-data pa-px-hero-field__source-tag">
                EVIDENCE PROTAGONIST
              </div>
              <blockquote className="pa-px-hero-field__source-text pa-px-source-sentence">
                &ldquo;{data.response}&rdquo;
              </blockquote>
              <div ref={pathRef} className="pa-px-hero-field__path-wrap">
                <svg className="pa-px-evidence-path" width="48" height="14" viewBox="0 0 48 14" fill="none" aria-hidden="true">
                  <path d="M 0,7 L 40,7 M 34,2 L 40,7 L 34,12" stroke="var(--pa-evidence)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
                  Continuous provenance chain active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroThesisPoster;
