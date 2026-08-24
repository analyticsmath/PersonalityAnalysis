import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

gsap.registerPlugin(ScrollTrigger);

export const WorldEntry = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.worldEntry;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const primaryMedia = containerRef.current.querySelector('.pa-px-entry__primary-media');
      const secondaryMedia = containerRef.current.querySelector('.pa-px-entry__secondary-crop');
      const titleLine1 = containerRef.current.querySelector('.pa-px-entry__title-line-1');
      const titleLine2 = containerRef.current.querySelector('.pa-px-entry__title-line-2');
      const support = containerRef.current.querySelector('.pa-px-entry__support-block');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.75,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // 4 distinct velocity layers with spatial depth & variable font width
      tl.to(primaryMedia, { y: '8%', scale: 1.06, ease: 'none' }, 0)
        .fromTo(secondaryMedia, { y: '40%', opacity: 0.4, scale: 0.9 }, { y: '-10%', opacity: 1, scale: 1, ease: 'none' }, 0)
        .to(titleLine1, { x: '-8%', fontVariationSettings: "'wdth' 95, 'opsz' 96", ease: 'none' }, 0)
        .to(titleLine2, { x: '12%', fontVariationSettings: "'wdth' 78, 'opsz' 96", ease: 'none' }, 0)
        .to(support, { y: '-30%', opacity: 0.15, ease: 'none' }, 0.1);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Split headline data.headline into lines for multi-velocity spatial motion
  const words = data.headline.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <section ref={containerRef} className="pa-px-entry-section" aria-label="World Entry">
      <div className="pa-px-entry-stage">
        {/* Dominant Environmental Plane */}
        <div className="pa-px-entry__primary-media">
          <PublicPicture assetKey="homeWorldEntry" alt="Architectural design studio space" priority={true} />
        </div>

        {/* Secondary Detail Crop */}
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
        </div>
      </div>
    </section>
  );
};

export default WorldEntry;
