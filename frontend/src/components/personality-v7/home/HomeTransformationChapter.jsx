import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SOURCE = 'Clarify responsibilities before committing work.';

export const HomeTransformationChapter = ({ selectedChoice }) => {
  const currentPhrase = selectedChoice?.text || DEFAULT_SOURCE;
  const containerRef = useRef(null);
  const stageRef = useRef(null);

  const sourceEvidenceRef = useRef(null);
  const readingBigFiveRef = useRef(null);
  const readingRiasecRef = useRef(null);
  const readingValuesRef = useRef(null);
  const readingCareerRef = useRef(null);

  const pathBigFiveRef = useRef(null);
  const pathRiasecRef = useRef(null);
  const pathValuesRef = useRef(null);
  const pathCareerRef = useRef(null);
  const textPathRef = useRef(null);

  const fragBigFiveRef = useRef(null);
  const fragRiasecRef = useRef(null);
  const fragValuesRef = useRef(null);
  const fragCareerRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if (prefersReduced || isMobile || isTest) {
      // Static accessible display for reduced motion / mobile
      return;
    }

    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const paths = [
      pathBigFiveRef.current,
      pathRiasecRef.current,
      pathValuesRef.current,
      pathCareerRef.current,
    ];

    paths.forEach((p) => {
      if (p) {
        const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 400;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      }
    });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.85,
        pin: stage,
        anticipatePin: 1,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const prog = self.progress;

          // Deterministic path drawing synchronization & Traveling Fragments
          // 1. Big Five (15–32%)
          if (pathBigFiveRef.current && fragBigFiveRef.current) {
            const len = typeof pathBigFiveRef.current.getTotalLength === 'function' ? pathBigFiveRef.current.getTotalLength() : 400;
            const f = Math.min(Math.max((prog - 0.15) / 0.17, 0), 1);
            pathBigFiveRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            // At 83%+, recomposition brings it back toward source
            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathBigFiveRef.current.getPointAtLength === 'function') {
              const pt = pathBigFiveRef.current.getPointAtLength(actualF * len);
              fragBigFiveRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
            }
            fragBigFiveRef.current.style.opacity = prog >= 0.12 && prog <= 0.98 ? (f > 0.05 ? '0.9' : '0') : '0';
          }

          // 2. RIASEC (32–49%)
          if (pathRiasecRef.current && fragRiasecRef.current) {
            const len = typeof pathRiasecRef.current.getTotalLength === 'function' ? pathRiasecRef.current.getTotalLength() : 400;
            const f = Math.min(Math.max((prog - 0.32) / 0.17, 0), 1);
            pathRiasecRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathRiasecRef.current.getPointAtLength === 'function') {
              const pt = pathRiasecRef.current.getPointAtLength(actualF * len);
              fragRiasecRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
            }
            fragRiasecRef.current.style.opacity = prog >= 0.28 && prog <= 0.98 ? (f > 0.05 ? '0.9' : '0') : '0';
          }

          // 3. Work Values (49–66%)
          if (pathValuesRef.current && fragValuesRef.current) {
            const len = typeof pathValuesRef.current.getTotalLength === 'function' ? pathValuesRef.current.getTotalLength() : 400;
            const f = Math.min(Math.max((prog - 0.49) / 0.17, 0), 1);
            pathValuesRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathValuesRef.current.getPointAtLength === 'function') {
              const pt = pathValuesRef.current.getPointAtLength(actualF * len);
              fragValuesRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
            }
            fragValuesRef.current.style.opacity = prog >= 0.45 && prog <= 0.98 ? (f > 0.05 ? '0.9' : '0') : '0';
          }

          // 4. Career Context (66–83%)
          if (pathCareerRef.current && fragCareerRef.current) {
            const len = typeof pathCareerRef.current.getTotalLength === 'function' ? pathCareerRef.current.getTotalLength() : 400;
            const f = Math.min(Math.max((prog - 0.66) / 0.17, 0), 1);
            pathCareerRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathCareerRef.current.getPointAtLength === 'function') {
              const pt = pathCareerRef.current.getPointAtLength(actualF * len);
              fragCareerRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;
            }
            fragCareerRef.current.style.opacity = prog >= 0.62 && prog <= 0.98 ? (f > 0.05 ? '0.9' : '0') : '0';
          }

          // Text on kinetic path
          if (textPathRef.current) {
            const textOffset = Math.min(Math.max((prog - 0.83) / 0.17, 0), 1) * 100;
            textPathRef.current.setAttribute('startOffset', `${textOffset}%`);
          }

          // Destination Interpretation Reveals
          if (readingBigFiveRef.current) {
            const f1 = Math.min(Math.max((prog - 0.22) / 0.1, 0), 1);
            readingBigFiveRef.current.style.opacity = prog >= 0.83 ? '0.85' : (prog >= 0.32 ? '0.45' : `${f1}`);
          }
          if (readingRiasecRef.current) {
            const f2 = Math.min(Math.max((prog - 0.39) / 0.1, 0), 1);
            readingRiasecRef.current.style.opacity = prog >= 0.83 ? '0.85' : (prog >= 0.49 ? '0.45' : `${f2}`);
          }
          if (readingValuesRef.current) {
            const f3 = Math.min(Math.max((prog - 0.56) / 0.1, 0), 1);
            readingValuesRef.current.style.opacity = prog >= 0.83 ? '0.85' : (prog >= 0.66 ? '0.45' : `${f3}`);
          }
          if (readingCareerRef.current) {
            const f4 = Math.min(Math.max((prog - 0.73) / 0.1, 0), 1);
            readingCareerRef.current.style.opacity = prog >= 0.83 ? '0.85' : `${f4}`;
          }

          // Central Source Recomposition state
          if (sourceEvidenceRef.current) {
            if (prog >= 0.83) {
              sourceEvidenceRef.current.style.transform = 'scale(1.04)';
            } else {
              sourceEvidenceRef.current.style.transform = 'scale(1)';
            }
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-home-transformation"
      aria-label="Evidence Transformation Signature Sequence"
      data-tone="dark"
    >
      <div ref={stageRef} className="pa-home-transformation__stage">
        {/* SVG Trajectory Canvas */}
        <svg
          className="pa-home-transformation__svg-canvas"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Trajectory 1: Center -> Big Five (Top Left) */}
          <path
            ref={pathBigFiveRef}
            d="M 600 400 C 450 350, 300 250, 240 200"
            className="pa-evidence-path"
          />

          {/* Trajectory 2: Center -> RIASEC (Top Right) */}
          <path
            ref={pathRiasecRef}
            d="M 600 400 C 750 350, 900 250, 960 200"
            className="pa-evidence-path"
          />

          {/* Trajectory 3: Center -> Work Values (Bottom Left) */}
          <path
            ref={pathValuesRef}
            d="M 600 400 C 450 480, 320 580, 240 620"
            className="pa-evidence-path"
          />

          {/* Trajectory 4: Center -> Career Context (Bottom Right) */}
          <path
            ref={pathCareerRef}
            d="M 600 400 C 750 480, 880 580, 960 620"
            className="pa-evidence-path"
          />

          {/* Recomposition Curve with Kinetic Text */}
          <path
            id="evidence-path-recompose"
            d="M 240 200 Q 600 280 960 200 Q 900 620 600 400 Q 300 620 240 200"
            fill="none"
            stroke="rgba(100,40,50,0.25)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <text className="pa-path-kinetic-text">
            <textPath
              ref={textPathRef}
              href="#evidence-path-recompose"
              startOffset="0%"
            >
              context → personality → interests → values → work
            </textPath>
          </text>
        </svg>

        {/* 4 Physically Traveling Evidence Fragments along SVG Trajectories */}
        <div
          ref={fragBigFiveRef}
          className="pa-traveling-fragment pa-traveling-fragment--bigfive"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span className="pa-traveling-fragment__mark" />
          <span className="pa-traveling-fragment__text">“{currentPhrase}”</span>
        </div>

        <div
          ref={fragRiasecRef}
          className="pa-traveling-fragment pa-traveling-fragment--riasec"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span className="pa-traveling-fragment__mark" />
          <span className="pa-traveling-fragment__text">“{currentPhrase}”</span>
        </div>

        <div
          ref={fragValuesRef}
          className="pa-traveling-fragment pa-traveling-fragment--values"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span className="pa-traveling-fragment__mark" />
          <span className="pa-traveling-fragment__text">“{currentPhrase}”</span>
        </div>

        <div
          ref={fragCareerRef}
          className="pa-traveling-fragment pa-traveling-fragment--career"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <span className="pa-traveling-fragment__mark" />
          <span className="pa-traveling-fragment__text">“{currentPhrase}”</span>
        </div>

        <div className="pa-home-transformation__content-field">
          {/* Central Dominant Source Evidence Object (Open Typography) */}
          <div ref={sourceEvidenceRef} className="pa-home-transformation__source">
            <div className="pa-home-transformation__provenance-anchor" aria-hidden="true" />
            <span className="pa-provenance-tag" style={{ color: 'var(--pa-mineral)' }}>
              Source Evidence Object
            </span>
            <p className="pa-evidence-quote pa-home-transformation__quote">
              "{currentPhrase}"
            </p>
            <span className="pa-home-transformation__subnote">
              One piece of evidence — four separate interpretative lenses.
            </span>
          </div>

          {/* Reading Zone 1: Big Five (Top Left) — Open Typography */}
          <div
            ref={readingBigFiveRef}
            className="pa-reading-zone pa-reading-zone--bigfive"
          >
            <span className="pa-reading-zone__tag">01 • Big Five</span>
            <h3 className="pa-reading-zone__title">Conscientiousness Signal</h3>
            <p className="pa-reading-zone__text">
              A preference for clear ownership informs structured delivery when evaluated alongside later evidence.
            </p>
          </div>

          {/* Reading Zone 2: RIASEC (Top Right) — Open Typography */}
          <div
            ref={readingRiasecRef}
            className="pa-reading-zone pa-reading-zone--riasec"
          >
            <span className="pa-reading-zone__tag">02 • RIASEC</span>
            <h3 className="pa-reading-zone__title">Vocational Interests</h3>
            <p className="pa-reading-zone__text">
              Approaching problems through defined systems contributes to Conventional & Investigative interest profiles.
            </p>
          </div>

          {/* Reading Zone 3: Work Values (Bottom Left) — Open Typography */}
          <div
            ref={readingValuesRef}
            className="pa-reading-zone pa-reading-zone--values"
          >
            <span className="pa-reading-zone__tag">03 • Work Values</span>
            <h3 className="pa-reading-zone__title">Environmental Values</h3>
            <p className="pa-reading-zone__text">
              Signals strong valuation of operational clarity, role autonomy and predictable dependency contracts.
            </p>
          </div>

          {/* Reading Zone 4: Career Context (Bottom Right) — Open Typography */}
          <div
            ref={readingCareerRef}
            className="pa-reading-zone pa-reading-zone--career"
          >
            <span className="pa-reading-zone__tag">04 • Career Context</span>
            <h3 className="pa-reading-zone__title">Contextual Fit Relationship</h3>
            <p className="pa-reading-zone__text">
              Relates to roles requiring system ownership and architecture rather than open-ended ambiguous exploration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTransformationChapter;
