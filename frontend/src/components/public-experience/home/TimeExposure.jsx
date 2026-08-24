import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const TimeExposure = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.timeExposure;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const laterMedia = containerRef.current.querySelector('.pa-px-time__later-media');
      const textBlock = containerRef.current.querySelector('.pa-px-time__editorial-text');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // Double-exposure clip-path travel & editorial text emergence
      tl.fromTo(
        laterMedia,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', scale: 1.1 },
        { clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 42% 100%)', scale: 1, duration: 1, ease: 'power2.inOut' }
      ).fromTo(textBlock, { y: '40px', opacity: 0 }, { y: '0px', opacity: 1, duration: 0.6 }, 0.25);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-time-section" aria-label="Time Exposure">
      <div className="pa-px-time-stage">
        {/* Baseline Layer */}
        <div className="pa-px-time__base-media">
          <PublicPicture assetKey="homeWorldEntry" alt="Baseline initial work context" />
        </div>

        {/* Later Shifted Context Layer (Double Exposure) */}
        <div className="pa-px-time__later-media">
          <PublicPicture assetKey="workworldAutonomy" alt="Later shifted project environment" />
        </div>

        {/* Direct Editorial Negative Space Typography (No Card Box) */}
        <div className="pa-px-time__editorial-text">
          <h2 className="pa-px-time__title">{data.headline}</h2>
          <p className="pa-px-time__support">{data.support}</p>

          <div className="pa-px-time__findings-list">
            <span className="pa-px-time__finding-item">{data.stabilityFinding}</span>
            <span className="pa-px-time__finding-item">{data.adaptationFinding}</span>
            <span className="pa-px-time__disclaimer">({data.disclaimer})</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeExposure;
