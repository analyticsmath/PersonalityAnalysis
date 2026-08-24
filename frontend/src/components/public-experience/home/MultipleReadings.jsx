import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const MultipleReadings = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.readings;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const branches = containerRef.current.querySelectorAll('.pa-px-home-readings__branch');
      const paths = containerRef.current.querySelectorAll('.pa-px-branch-path');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(paths, { strokeDashoffset: 1000, strokeDasharray: 1000 }, { strokeDashoffset: 0, duration: 1 })
        .fromTo(
          branches,
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8 },
          0.2
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="pa-px-home-readings" aria-label="Multiple Readings">
      <div className="pa-px-home-readings__stage">
        <div className="pa-px-home-readings__header">
          <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
            Interpretive Calibration
          </span>
          <h2>{data.headline}</h2>
        </div>

        <div className="pa-px-home-readings__branches">
          <svg className="pa-px-home-readings__svg-canvas" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path className="pa-px-branch-path" d="M 0 200 C 300 200, 300 80, 600 80" fill="none" stroke="rgba(247, 248, 248, 0.25)" strokeWidth="2" />
            <path className="pa-px-branch-path" d="M 0 200 C 300 200, 300 160, 600 160" fill="none" stroke="rgba(247, 248, 248, 0.25)" strokeWidth="2" />
            <path className="pa-px-branch-path" d="M 0 200 C 300 200, 300 240, 600 240" fill="none" stroke="rgba(247, 248, 248, 0.25)" strokeWidth="2" />
            <path className="pa-px-branch-path" d="M 0 200 C 300 200, 300 320, 600 320" fill="none" stroke="rgba(247, 248, 248, 0.25)" strokeWidth="2" />
          </svg>

          {data.destinations.map((dest) => (
            <div key={dest.id} className="pa-px-home-readings__branch">
              <span className="pa-px-context-data">{dest.name}</span>
              <h4>{dest.summary}</h4>
              <p>{dest.detail}</p>
            </div>
          ))}
        </div>

        <div className="pa-px-context-data" style={{ opacity: 0.6 }}>
          Independent psychometric models maintain provenance back to source response.
        </div>
      </div>
    </section>
  );
};

export default MultipleReadings;
