import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const HomeHeroSource = () => {
  const data = PUBLIC_CONTENT.home.worldEntry;
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const mediaRef = useRef(null);
  const sourceRef = useRef(null);
  const ctaRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headlineLines = headlineRef.current?.querySelectorAll('.pa-px-hero-line') || [];
      const imageInner = mediaRef.current?.querySelector('img') || mediaRef.current;

      // ── 1. Authored Load Choreography (800–1000ms) ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image crop clip reveal
      if (mediaRef.current) {
        tl.fromTo(
          mediaRef.current,
          { clipPath: 'inset(8% 0% 4% 0%)', opacity: 0, scale: 0.98 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1, duration: 0.95, ease: 'power3.inOut' },
          0
        );
      }

      // Headline lines enter through masks
      if (headlineLines.length) {
        tl.fromTo(
          headlineLines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power4.out' },
          0.12
        );
      }

      // Source response arrives as physical slip
      if (sourceRef.current) {
        tl.fromTo(
          sourceRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
          0.4
        );
      }

      // CTA resolves last
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          0.65
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

        // Inner image crop moves independently
        if (imageInner) {
          scrollTl.to(
            imageInner,
            { yPercent: 12, scale: 1.05, ease: 'none' },
            0
          );
        }

        // Headline lines slightly counter-move
        if (headlineLines.length) {
          scrollTl.to(
            headlineLines,
            { y: (i) => -(i + 1) * 14, opacity: 0.88, ease: 'none' },
            0
          );
        }

        // Source actor detaches and migrates down
        if (sourceRef.current) {
          scrollTl.to(
            sourceRef.current,
            { y: 36, ease: 'none' },
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
      aria-label="Editorial Evidence Opening Thesis"
    >
      <div className="pa-px-hero-field__composition">
        {/* Dominant Environmental Photographic Plane (Occupies 62–72% viewport territory) */}
        <div ref={mediaRef} className="pa-px-hero-field__media-plane">
          <div className="pa-px-hero-field__media-frame">
            <PublicPicture
              assetKey="homeHeroContext"
              alt="Professional working in technical workshop"
              priority={true}
            />
          </div>
        </div>

        {/* Editorial Foreground Layer Crossing Paper & Image Boundary */}
        <div className="pa-px-hero-field__editorial-layer">
          <div className="pa-px-hero-field__content">
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
              See how one response becomes evidence across work, career and time.
            </p>

            <div ref={ctaRef} className="pa-px-hero-field__actions">
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                Build my profile
              </Link>
              <Link to="/how-it-works" className="pa-px-link-action">
                Follow one answer &rarr;
              </Link>
            </div>
          </div>

          {/* Physical Source Slip crossing from paper toward image */}
          <div
            ref={sourceRef}
            className="pa-px-hero-field__source-actor pa-px-home-primary-actor"
            data-transition-actor="home-source-actor"
          >
            <div className="pa-px-hero-field__source-slip">
              <div className="pa-px-hero-field__source-tag" aria-hidden="true">
                01-A
              </div>
              <blockquote
                className="pa-px-hero-field__source-text pa-px-source-sentence"
                data-transition-actor="home-source-quote"
              >
                &ldquo;{data.response}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroThesisPoster = HomeHeroSource;
export default HomeHeroSource;
