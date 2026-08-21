import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';

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

  const asset = MEDIA_ASSETS_V7.evidenceVisible;

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;

    if (prefersReduced || isMobile || isTest) {
      // In reduced motion / mobile / test, render clean static accessible spatial layout
      return;
    }

    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    // SVG path total lengths for drawing
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          pin: stage,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const prog = self.progress;
            // Deterministic path drawing synchronization
            if (pathBigFiveRef.current) {
              const len = typeof pathBigFiveRef.current.getTotalLength === 'function' ? pathBigFiveRef.current.getTotalLength() : 400;
              const f = Math.min(Math.max((prog - 0.15) / 0.17, 0), 1);
              pathBigFiveRef.current.style.strokeDashoffset = `${len * (1 - f)}`;
            }
            if (pathRiasecRef.current) {
              const len = typeof pathRiasecRef.current.getTotalLength === 'function' ? pathRiasecRef.current.getTotalLength() : 400;
              const f = Math.min(Math.max((prog - 0.32) / 0.17, 0), 1);
              pathRiasecRef.current.style.strokeDashoffset = `${len * (1 - f)}`;
            }
            if (pathValuesRef.current) {
              const len = typeof pathValuesRef.current.getTotalLength === 'function' ? pathValuesRef.current.getTotalLength() : 400;
              const f = Math.min(Math.max((prog - 0.49) / 0.17, 0), 1);
              pathValuesRef.current.style.strokeDashoffset = `${len * (1 - f)}`;
            }
            if (pathCareerRef.current) {
              const len = typeof pathCareerRef.current.getTotalLength === 'function' ? pathCareerRef.current.getTotalLength() : 400;
              const f = Math.min(Math.max((prog - 0.66) / 0.17, 0), 1);
              pathCareerRef.current.style.strokeDashoffset = `${len * (1 - f)}`;
            }
            if (textPathRef.current) {
              const textOffset = Math.min(Math.max((prog - 0.83) / 0.17, 0), 1) * 100;
              textPathRef.current.setAttribute('startOffset', `${textOffset}%`);
            }
          },
        },
      });

      // 0–15%: Source evidence enters dominant
      tl.fromTo(
        sourceEvidenceRef.current,
        { scale: 0.95, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.15, ease: 'none' },
        0
      );

      // 15–32%: Big Five reading reveals
      tl.fromTo(
        readingBigFiveRef.current,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.17, ease: 'power2.out' },
        0.15
      );

      // 32–49%: RIASEC reading reveals, Big Five steps down visual dominance
      tl.to(readingBigFiveRef.current, { opacity: 0.55, scale: 0.98, duration: 0.1 }, 0.32);
      tl.fromTo(
        readingRiasecRef.current,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.17, ease: 'power2.out' },
        0.32
      );

      // 49–66%: Work Values reading reveals
      tl.to(readingRiasecRef.current, { opacity: 0.55, scale: 0.98, duration: 0.1 }, 0.49);
      tl.fromTo(
        readingValuesRef.current,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.17, ease: 'power2.out' },
        0.49
      );

      // 66–83%: Career Context reading reveals
      tl.to(readingValuesRef.current, { opacity: 0.55, scale: 0.98, duration: 0.1 }, 0.66);
      tl.fromTo(
        readingCareerRef.current,
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.17, ease: 'power2.out' },
        0.66
      );

      // 83–100%: Recompose — All 4 readings gather around the persistent source evidence
      tl.to(
        [
          readingBigFiveRef.current,
          readingRiasecRef.current,
          readingValuesRef.current,
          readingCareerRef.current,
        ],
        {
          opacity: 0.9,
          scale: 1,
          duration: 0.17,
          ease: 'power3.inOut',
        },
        0.83
      );

      tl.to(
        sourceEvidenceRef.current,
        {
          scale: 1.05,
          boxShadow: '0 24px 48px rgba(100,40,50,0.18)',
          duration: 0.17,
          ease: 'power3.inOut',
        },
        0.83
      );
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
          <defs>
            <linearGradient id="oxblood-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#642832" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#642832" stopOpacity="0.2" />
            </linearGradient>
          </defs>

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

        <div className="pa-home-transformation__content-field">
          {/* Central Dominant Source Evidence Object */}
          <div ref={sourceEvidenceRef} className="pa-home-transformation__source">
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

          {/* Reading Zone 1: Big Five (Top Left) */}
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

          {/* Reading Zone 2: RIASEC (Top Right) */}
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

          {/* Reading Zone 3: Work Values (Bottom Left) */}
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

          {/* Reading Zone 4: Career Context (Bottom Right) */}
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
