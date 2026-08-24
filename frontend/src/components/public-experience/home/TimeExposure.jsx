import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress, registerActor } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const TimeExposure = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.timeExposure;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const baseMedia = containerRef.current.querySelector('.pa-px-time__base-media');
      const baseImg = containerRef.current.querySelector('.pa-px-time__base-media img');
      const laterMedia = containerRef.current.querySelector('.pa-px-time__later-media');
      const laterImg = containerRef.current.querySelector('.pa-px-time__later-media img');
      const textBlock = containerRef.current.querySelector('.pa-px-time__editorial-text');

      if (laterMedia) {
        registerActor('temporal-baseline', {
          element: laterMedia,
          assetKey: 'workworldAutonomy',
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Immediate 1:1 scrub
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-time-exposure', self.progress, true);
          },
        },
      });

      // 0.10: Baseline visible
      // 0.20: Later crop appears
      // 0.30 - 0.70: Dual time states overlap (clip-path travel + independent inner parallax)
      // 0.70: Later context dominates
      // 0.85: Handoff into Provenance
      tl.fromTo(
        laterMedia,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', scale: 1.08 },
        { clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 38% 100%)', scale: 1, ease: 'none' },
        0
      )
      .to(baseImg, { yPercent: -10, ease: 'none' }, 0)
      .fromTo(laterImg, { yPercent: 12 }, { yPercent: -8, ease: 'none' }, 0)
      .fromTo(textBlock,
        { yPercent: 30, opacity: 0.6 },
        { yPercent: -10, opacity: 1, ease: 'none' },
        0.15
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-time-section" aria-label="Time Exposure" data-scene-id="home-time-exposure">
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
