import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

export const OrientationChapter = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const copyRef = useRef(null);
  const mediaStageRef = useRef(null);
  const apertureRef = useRef(null);

  useCinematicScene(({ isDesktop }) => {
    if (!isDesktop || !containerRef.current || !stickyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: stickyRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      },
    });

    // 1. Copy gently settles upward by 20px while staying clear
    tl.to(copyRef.current, {
      y: -20,
      opacity: 0.88,
      duration: 0.4,
      ease: 'power1.out',
    }, 0);

    // 2. Portrait crop slowly broadens toward columns 2–12
    tl.to(mediaStageRef.current, {
      gridColumn: '2 / 12',
      scale: 1.03,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0.1);

    // 3. Reveal A02 via vertical aperture opening from right edge in final 35%
    tl.fromTo(apertureRef.current, {
      clipPath: 'inset(0 0 0 100%)',
    }, {
      clipPath: 'inset(0 0 0 0%)',
      duration: 0.4,
      ease: 'power2.inOut',
    }, 0.6);
  }, []);

  return (
    <section ref={containerRef} className="pa-v7-chapter-orientation" aria-label="Chapter 01 — Orientation Field">
      <div ref={stickyRef} className="pa-v7-chapter-orientation__sticky">
        {/* Columns 1–5: Text Rail */}
        <div ref={copyRef} className="pa-v7-orientation__copy-rail">
          <span className="pa-v7-eyebrow pa-v7-orientation__eyebrow">
            {PUBLIC_CONTENT.home.hero.category}
          </span>
          <h1 className="pa-v7-orientation__h1">
            {PUBLIC_CONTENT.home.hero.headline}
          </h1>
          <p className="pa-v7-orientation__lead">
            {PUBLIC_CONTENT.home.hero.lead}
          </p>
          <div className="pa-v7-orientation__actions">
            <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--primary">
              {PUBLIC_CONTENT.home.hero.ctaPrimary}
            </Link>
            <Link to="/how-it-works" className="pa-v7-btn pa-v7-btn--secondary">
              {PUBLIC_CONTENT.home.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Columns 7–12: Primary Base Image Stage (A01 Visible On First Paint) */}
        <div ref={mediaStageRef} className="pa-v7-orientation__media-stage">
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a01}
            priority={true}
            objectPosition="50% 42%"
            alt="Obscured profile through textured glass establishing professional orientation"
          />

          {/* Incoming Aperture Layer (A02) */}
          <div ref={apertureRef} className="pa-v7-orientation__aperture-overlay">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a02}
              priority={false}
              objectPosition="50% 42%"
              alt="Contextual evidence response glass"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrientationChapter;
