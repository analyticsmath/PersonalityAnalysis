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
      const items = containerRef.current.querySelectorAll('.pa-px-home-calibration__weight-item');
      const pcts = containerRef.current.querySelectorAll('.pa-px-home-calibration__pct');

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
        items,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
      ).to(
        pcts,
        { fontVariationSettings: "'wdth' 96, 'opsz' 84", duration: 0.5, stagger: 0.05 },
        0.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-home-calibration" aria-label="Calibration">
      <div className="pa-px-home-calibration__stage">
        <div className="pa-px-home-calibration__header">
          <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
            Mathematical Proportions
          </span>
          <h2>{data.headline}</h2>
          <p>{data.lead}</p>
        </div>

        <div className="pa-px-home-calibration__weights">
          {data.weights.map((w) => (
            <div key={w.id} className="pa-px-home-calibration__weight-item">
              <div className="pa-px-home-calibration__pct">{w.percentage}%</div>
              <div className="pa-px-home-calibration__label">{w.label}</div>
              <div className="pa-px-home-calibration__role">{w.role}</div>
            </div>
          ))}
        </div>

        <div className="pa-px-context-data" style={{ opacity: 0.6 }}>
          100% deterministic calibration across 6 verified constraint vectors.
        </div>
      </div>
    </section>
  );
};

export default Calibration;
