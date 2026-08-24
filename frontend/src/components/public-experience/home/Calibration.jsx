import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const Calibration = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.calibration;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const header = containerRef.current.querySelector('.pa-px-calibration__header');
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
          scrub: true, // Immediate 1:1 scrub
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-calibration', self.progress, true);
          },
        },
      });

      // Spatial depth differentiation: larger values travel slower/deeper; smaller satellite values accelerate
      tl.fromTo(header,
        { yPercent: 20, opacity: 0.8 },
        { yPercent: -10, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(w1,
        { xPercent: -20, yPercent: 10, scale: 0.94 },
        { xPercent: 0, yPercent: 0, scale: 1, ease: 'none' },
        0
      )
      .fromTo(w2,
        { xPercent: 20, yPercent: -5, scale: 0.94 },
        { xPercent: 0, yPercent: 0, scale: 1, ease: 'none' },
        0.05
      )
      .fromTo(w3,
        { yPercent: 30, scale: 0.88 },
        { yPercent: 0, scale: 0.92, ease: 'none' },
        0.12
      )
      .fromTo(w4,
        { xPercent: -15, yPercent: 35, scale: 0.82 },
        { xPercent: 0, yPercent: 0, scale: 0.86, ease: 'none' },
        0.20
      )
      .fromTo(w5,
        { yPercent: 50, scale: 0.72 },
        { yPercent: 0, scale: 0.78, ease: 'none' },
        0.28
      )
      .fromTo(w6,
        { xPercent: 25, yPercent: 60, scale: 0.65 },
        { xPercent: 0, yPercent: 0, scale: 0.70, ease: 'none' },
        0.35
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const [w1, w2, w3, w4, w5, w6] = data.weights;

  return (
    <section ref={containerRef} className="pa-px-calibration-section" aria-label="Calibration" data-scene-id="home-calibration">
      <div className="pa-px-calibration-stage">
        <div className="pa-px-calibration__header">
          <h2>{data.headline}</h2>
          <p>{data.lead}</p>
        </div>

        {/* Proportional Asymmetric Typographic Field (Visual Scaling Ratios: 1.00 / 1.00 / 0.84 / 0.68 / 0.52 / 0.38) */}
        <div className="pa-px-calibration__proportions-field">
          {/* Dominant 25% Anchors (Scale 1.00) */}
          <div className="pa-px-calibration-mass pa-px-weight--riasec" style={{ '--scale-ratio': '1.0' }}>
            <span className="pa-px-calibration-mass__pct">{w1.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w1.label}</span>
            <span className="pa-px-calibration-mass__role">{w1.role}</span>
          </div>

          <div className="pa-px-calibration-mass pa-px-weight--skills" style={{ '--scale-ratio': '1.0' }}>
            <span className="pa-px-calibration-mass__pct">{w2.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w2.label}</span>
            <span className="pa-px-calibration-mass__role">{w2.role}</span>
          </div>

          {/* 20% & 15% Mediating Masses (Scale 0.84 & 0.68) */}
          <div className="pa-px-calibration-mass pa-px-weight--values" style={{ '--scale-ratio': '0.84' }}>
            <span className="pa-px-calibration-mass__pct">{w3.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w3.label}</span>
            <span className="pa-px-calibration-mass__role">{w3.role}</span>
          </div>

          <div className="pa-px-calibration-mass pa-px-weight--personality" style={{ '--scale-ratio': '0.68' }}>
            <span className="pa-px-calibration-mass__pct">{w4.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w4.label}</span>
            <span className="pa-px-calibration-mass__role">{w4.role}</span>
          </div>

          {/* 10% & 5% Satellite Masses (Scale 0.52 & 0.38) */}
          <div className="pa-px-calibration-mass pa-px-weight--education" style={{ '--scale-ratio': '0.52' }}>
            <span className="pa-px-calibration-mass__pct">{w5.percentage}%</span>
            <span className="pa-px-calibration-mass__label">{w5.label}</span>
            <span className="pa-px-calibration-mass__role">{w5.role}</span>
          </div>

          <div className="pa-px-calibration-mass pa-px-weight--goals" style={{ '--scale-ratio': '0.38' }}>
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
