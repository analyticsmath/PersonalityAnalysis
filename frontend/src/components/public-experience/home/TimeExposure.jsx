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
      const laterLayer = containerRef.current.querySelector('.pa-px-home-time__layer--later');
      const card = containerRef.current.querySelector('.pa-px-home-time__overlay-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(
        laterLayer,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        { clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 45% 100%)', duration: 1, ease: 'power2.inOut' }
      ).fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-home-time" aria-label="Time Exposure">
      <div className="pa-px-home-time__stage">
        {/* Baseline Layer */}
        <div className="pa-px-home-time__layer pa-px-home-time__layer--baseline">
          <PublicPicture assetKey="homeWorldEntry" alt="Baseline historical work context" />
        </div>

        {/* Later Context Layer */}
        <div className="pa-px-home-time__layer pa-px-home-time__layer--later">
          <PublicPicture assetKey="workworldAutonomy" alt="Later shifted work context" />
        </div>

        <div className="pa-px-home-time__overlay-card">
          <span className="pa-px-context-data" style={{ color: 'var(--px-soft)' }}>
            Longitudinal Stability & Adaptation
          </span>
          <h2>{data.headline}</h2>
          <p style={{ fontSize: 'var(--px-body)', lineHeight: 1.5, opacity: 0.85 }}>{data.support}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(247, 248, 248, 0.15)', paddingTop: '16px' }}>
            <span style={{ fontSize: 'var(--px-body-sm)', fontWeight: 'var(--px-weight-medium)' }}>
              {data.stabilityFinding}
            </span>
            <span style={{ fontSize: 'var(--px-body-sm)', opacity: 0.8 }}>
              {data.adaptationFinding}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeExposure;
