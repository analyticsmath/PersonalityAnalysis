import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { registerSceneProgress } from '../motion/scrollState';

gsap.registerPlugin(ScrollTrigger);

export const MultipleReadings = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.readings;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const sourceAnchor = containerRef.current.querySelector('.pa-px-readings__source-anchor');
      const b1 = containerRef.current.querySelector('.pa-px-reading-node--bigfive');
      const b2 = containerRef.current.querySelector('.pa-px-reading-node--riasec');
      const b3 = containerRef.current.querySelector('.pa-px-reading-node--values');
      const b4 = containerRef.current.querySelector('.pa-px-reading-node--signals');
      const paths = containerRef.current.querySelectorAll('.pa-px-reading-path');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Immediate 1:1 scrub mapping
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            registerSceneProgress('home-multiple-readings', self.progress, true);
          },
        },
      });

      // SVG path drawing & asymmetric node arrivals with variable font width modulation
      tl.to(sourceAnchor, {
        xPercent: -8,
        fontVariationSettings: "'wdth' 78, 'opsz' 56",
        ease: 'none',
      }, 0)
      .fromTo(paths,
        { strokeDashoffset: 1200, strokeDasharray: 1200 },
        { strokeDashoffset: 0, ease: 'none' },
        0
      )
      .fromTo(b1,
        { xPercent: 18, yPercent: -15, opacity: 0.4 },
        { xPercent: 0, yPercent: 0, opacity: 1, ease: 'none' },
        0.05
      )
      .fromTo(b2,
        { xPercent: 24, yPercent: 10, opacity: 0.4 },
        { xPercent: 0, yPercent: 0, opacity: 1, ease: 'none' },
        0.18
      )
      .fromTo(b3,
        { xPercent: 30, yPercent: -10, opacity: 0.3 },
        { xPercent: 0, yPercent: 0, opacity: 1, ease: 'none' },
        0.32
      )
      .fromTo(b4,
        { xPercent: 22, yPercent: 20, opacity: 0.3 },
        { xPercent: 0, yPercent: 0, opacity: 1, ease: 'none' },
        0.45
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const [d1, d2, d3, d4] = data.destinations;

  return (
    <section ref={containerRef} className="pa-px-readings-section" aria-label="Multiple Readings" data-scene-id="home-multiple-readings">
      <div className="pa-px-readings-stage">
        {/* Background Geometric Trajectory Canvas */}
        <svg className="pa-px-readings__trajectories" viewBox="0 0 1400 700" preserveAspectRatio="none" aria-hidden="true">
          <path className="pa-px-reading-path" d="M 280 350 C 480 350, 600 140, 950 140" fill="none" stroke="rgba(247, 248, 248, 0.28)" strokeWidth="1.5" />
          <path className="pa-px-reading-path" d="M 280 350 C 520 350, 700 280, 1020 280" fill="none" stroke="rgba(247, 248, 248, 0.22)" strokeWidth="1.5" />
          <path className="pa-px-reading-path" d="M 280 350 C 500 350, 650 460, 980 460" fill="none" stroke="rgba(247, 248, 248, 0.22)" strokeWidth="1.5" />
          <path className="pa-px-reading-path" d="M 280 350 C 460 350, 620 590, 920 590" fill="none" stroke="rgba(247, 248, 248, 0.28)" strokeWidth="1.5" />
        </svg>

        {/* Persistent Source Expression */}
        <div className="pa-px-readings__source-anchor">
          <div className="pa-px-readings__source-title">{data.headline}</div>
          <p className="pa-px-readings__source-phrase">
            "I clarify the constraints first, then choose the smallest reversible step."
          </p>
        </div>

        {/* Asymmetric Interpreted Typographic Nodes (No Box Containers) */}
        <div className="pa-px-readings__field">
          {/* Big Five Node (Upper wide) */}
          <div className="pa-px-reading-node pa-px-reading-node--bigfive">
            <span className="pa-px-reading-node__axis">{d1.axis}</span>
            <h3 className="pa-px-reading-node__name">{d1.name}</h3>
            <p className="pa-px-reading-node__summary">{d1.summary}</p>
            <p className="pa-px-reading-node__detail">{d1.detail}</p>
          </div>

          {/* RIASEC Node (Mid upper) */}
          <div className="pa-px-reading-node pa-px-reading-node--riasec">
            <span className="pa-px-reading-node__axis">{d2.axis}</span>
            <h3 className="pa-px-reading-node__name">{d2.name}</h3>
            <p className="pa-px-reading-node__summary">{d2.summary}</p>
            <p className="pa-px-reading-node__detail">{d2.detail}</p>
          </div>

          {/* Work Values Node (Mid lower) */}
          <div className="pa-px-reading-node pa-px-reading-node--values">
            <span className="pa-px-reading-node__axis">{d3.axis}</span>
            <h3 className="pa-px-reading-node__name">{d3.name}</h3>
            <p className="pa-px-reading-node__summary">{d3.summary}</p>
            <p className="pa-px-reading-node__detail">{d3.detail}</p>
          </div>

          {/* Behavioral Signals Node (Lower wide) */}
          <div className="pa-px-reading-node pa-px-reading-node--signals">
            <span className="pa-px-reading-node__axis">{d4.axis}</span>
            <h3 className="pa-px-reading-node__name">{d4.name}</h3>
            <p className="pa-px-reading-node__summary">{d4.summary}</p>
            <p className="pa-px-reading-node__detail">{d4.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultipleReadings;
