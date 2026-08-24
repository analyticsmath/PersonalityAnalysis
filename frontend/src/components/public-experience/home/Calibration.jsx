import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const Calibration = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.calibration;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const w1 = containerRef.current.querySelector('.pa-px-weight--riasec');
      const w2 = containerRef.current.querySelector('.pa-px-weight--skills');
      const w3 = containerRef.current.querySelector('.pa-px-weight--values');
      const w4 = containerRef.current.querySelector('.pa-px-weight--personality');
      const w5 = containerRef.current.querySelector('.pa-px-weight--education');
      const w6 = containerRef.current.querySelector('.pa-px-weight--goals');

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

      // Spatial rebalancing & variable font width compression
      tl.fromTo(w1, { x: '-60px', opacity: 0.3 }, { x: '0px', opacity: 1, duration: 0.7 }, 0)
        .fromTo(w2, { x: '60px', opacity: 0.3 }, { x: '0px', opacity: 1, duration: 0.7 }, 0)
        .fromTo(w3, { y: '40px', opacity: 0.2 }, { y: '0px', opacity: 1, duration: 0.6 }, 0.2)
        .fromTo(w4, { y: '50px', opacity: 0.2 }, { y: '0px', opacity: 1, duration: 0.6 }, 0.3)
        .fromTo(w5, { scale: 0.85, opacity: 0.2 }, { scale: 1, opacity: 0.9, duration: 0.5 }, 0.4)
        .fromTo(w6, { scale: 0.85, opacity: 0.2 }, { scale: 1, opacity: 0.8, duration: 0.5 }, 0.45);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const [w1, w2, w3, w4, w5, w6] = data.weights;

  return (
    <section ref={containerRef} className="pa-px-calibration-section" aria-label="Calibration">
      <div className="pa-px-calibration-stage">
        <div className="pa-px-calibration__header">
          <h2>{data.headline}</h2>
          <p>{data.lead}</p>
        </div>

        {/* Proportional Typographic Field (No 6-Stat Box Strip) */}
        <div className="pa-px-calibration__proportions-field">
          {/* Dominant 25% Anchors */}
          <div className="pa-px-calibration-mass pa-px-weight--riasec">
            <span className="pa-px-calibration-mass__pct">{w1.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w1.label}</span>
            <span className="pa-px-calibration-mass__role">{w1.role}</span>
          </div>

          <div className="pa-px-calibration-mass pa-px-weight--skills">
            <span className="pa-px-calibration-mass__pct">{w2.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w2.label}</span>
            <span className="pa-px-calibration-mass__role">{w2.role}</span>
          </div>

          {/* 20% & 15% Mediating Masses */}
          <div className="pa-px-calibration-mass pa-px-weight--values">
            <span className="pa-px-calibration-mass__pct">{w3.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w3.label}</span>
            <span className="pa-px-calibration-mass__role">{w3.role}</span>
          </div>

          <div className="pa-px-calibration-mass pa-px-weight--personality">
            <span className="pa-px-calibration-mass__pct">{w4.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w4.label}</span>
            <span className="pa-px-calibration-mass__role">{w4.role}</span>
          </div>

          {/* 10% & 5% Satellite Masses */}
          <div className="pa-px-calibration-mass pa-px-weight--education">
            <span className="pa-px-calibration-mass__pct">{w5.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w5.label}</span>
            <span className="pa-px-calibration-mass__role">{w5.role}</span>
          </div>

          <div className="pa-px-calibration-mass pa-px-weight--goals">
            <span className="pa-px-calibration-mass__pct">{w6.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w6.label}</span>
            <span className="pa-px-calibration-mass__role">{w6.role}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calibration;
