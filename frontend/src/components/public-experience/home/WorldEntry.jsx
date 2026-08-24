import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { registerSceneProgress, registerActor } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const WorldEntry = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.worldEntry;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const primaryMediaWrap = containerRef.current.querySelector('.pa-px-entry__primary-media');
      const primaryImg = containerRef.current.querySelector('.pa-px-entry__primary-media img');
      const secondaryMedia = containerRef.current.querySelector('.pa-px-entry__secondary-crop');
      const secondaryImg = containerRef.current.querySelector('.pa-px-entry__secondary-crop img');
      const titleLine1 = containerRef.current.querySelector('.pa-px-entry__title-line-1');
      const titleLine2 = containerRef.current.querySelector('.pa-px-entry__title-line-2');
      const support = containerRef.current.querySelector('.pa-px-entry__support-block');
      const anticipateInquiry = containerRef.current.querySelector('.pa-px-entry__anticipate-inquiry');

      // Register actor for persistent route transition carry
      if (primaryImg) {
        registerActor('home-hero-media', {
          element: primaryImg,
          assetKey: 'homeWorldEntry',
        });
      }

      // Continuous scrub mapped directly to scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Immediate 1:1 scrub mapping for zero catch-up lag
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-world-entry', self.progress, true);
          },
        },
      });

      // 0.00 - 0.15 REST (established)
      // 0.15 - 0.30 ANTICIPATE (inquiry appears in Zone D, secondary crop shifts inward)
      // 0.30 - 0.65 TRANSFORM & ZOOM PARALLAX (primary container scales, inner image counter-moves, secondary crop expands and occludes title)
      // 0.45 - 0.58 CLIMAX (simultaneous coexistence, zero black void)
      // 0.65 - 0.82 TRANSFER OWNERSHIP (inquiry takes dominance, title recedes as residue)
      // 0.82 - 0.92 SETTLE (participant context stable)
      // 0.92 - 1.00 HANDOFF (prepared for situation clauses)

      tl.to(primaryMediaWrap, {
        scale: 1.10,
        yPercent: 6,
        ease: 'none',
      }, 0)
      .to(primaryImg, {
        yPercent: -12, // Inner-image counter parallax
        ease: 'none',
      }, 0)
      .fromTo(secondaryMedia, 
        { xPercent: 10, yPercent: 25, scale: 0.92, opacity: 0.7 },
        { xPercent: -15, yPercent: -8, scale: 1.08, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(secondaryImg,
        { yPercent: 10 },
        { yPercent: -10, ease: 'none' },
        0
      )
      .to(titleLine1, {
        xPercent: -10,
        yPercent: -20,
        opacity: 0.35,
        fontVariationSettings: "'wdth' 76, 'opsz' 96",
        ease: 'none',
      }, 0.1)
      .to(titleLine2, {
        xPercent: 14,
        yPercent: -25,
        opacity: 0.25,
        fontVariationSettings: "'wdth' 70, 'opsz' 96",
        ease: 'none',
      }, 0.1)
      .to(support, {
        yPercent: -35,
        opacity: 0.15,
        ease: 'none',
      }, 0.05)
      .fromTo(anticipateInquiry,
        { opacity: 0, yPercent: 40 },
        { opacity: 1, yPercent: 0, ease: 'none' },
        0.25
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Split headline data.headline into lines for multi-velocity spatial motion
  const words = data.headline.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <section ref={containerRef} className="pa-px-entry-section" aria-label="World Entry" data-scene-id="home-world-entry">
      <div className="pa-px-entry-stage">
        {/* Dominant Environmental Plane (Zoom Parallax Container + Inner Parallax) */}
        <div className="pa-px-entry__primary-media">
          <PublicPicture assetKey="homeWorldEntry" alt="Architectural design studio space" priority={true} />
        </div>

        {/* Secondary Detail Crop (Occlusion & Independent Scale Layer) */}
        <div className="pa-px-entry__secondary-crop">
          <PublicPicture assetKey="homeSituationDetail" alt="Analytical drawing inspection close crop" />
        </div>

        {/* Typographic Title Composition */}
        <div className="pa-px-entry__overlay-content">
          <h1 className="pa-px-entry__headline" aria-label={data.headline}>
            <span className="pa-px-entry__title-line-1">{firstWord} </span>
            <span className="pa-px-entry__title-line-2">{restWords}</span>
          </h1>

          <div className="pa-px-entry__support-block">
            <p className="pa-px-entry__support-text">{data.support}</p>
            <div className="pa-px-entry__actions">
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                {data.ctaPrimary}
              </Link>
              <Link to="/how-it-works" className="pa-px-btn-secondary">
                {data.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Anticipatory inquiry emerging during 0.25 - 0.65 visual climax */}
          <div className="pa-px-entry__anticipate-inquiry" aria-hidden="true">
            <span className="pa-px-entry__anticipate-tag">Contextual Inquiry</span>
            <p className="pa-px-entry__anticipate-prompt">
              "How do you make progress when the goal is clear but the implementation is not?"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldEntry;
