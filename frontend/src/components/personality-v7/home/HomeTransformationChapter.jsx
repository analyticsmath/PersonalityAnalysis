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

  // SVG-native traveling fragment group refs
  const fragBigFiveRef = useRef(null);
  const fragRiasecRef = useRef(null);
  const fragValuesRef = useRef(null);
  const fragCareerRef = useRef(null);

  const valuesMediaRef = useRef(null);
  const careerMediaRef = useRef(null);

  const analysisAsset = MEDIA_ASSETS_V7.homeAnalysis;
  const visibleCraftAsset = MEDIA_ASSETS_V7.evidenceVisible;

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    if (prefersReduced || isMobile || isTest) {
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
        const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 500;
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

          // 1. Big Five (15–32%) - Upper arc, compact
          if (pathBigFiveRef.current && fragBigFiveRef.current) {
            const len = typeof pathBigFiveRef.current.getTotalLength === 'function' ? pathBigFiveRef.current.getTotalLength() : 500;
            const f = Math.min(Math.max((prog - 0.15) / 0.17, 0), 1);
            pathBigFiveRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathBigFiveRef.current.getPointAtLength === 'function') {
              const pt = pathBigFiveRef.current.getPointAtLength(actualF * len);
              fragBigFiveRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            }
            fragBigFiveRef.current.style.opacity = prog >= 0.12 && prog <= 0.98 ? (f > 0.05 ? '0.95' : '0') : '0';
          }

          // 2. RIASEC (32–49%) - Left/lower trajectory
          if (pathRiasecRef.current && fragRiasecRef.current) {
            const len = typeof pathRiasecRef.current.getTotalLength === 'function' ? pathRiasecRef.current.getTotalLength() : 500;
            const f = Math.min(Math.max((prog - 0.32) / 0.17, 0), 1);
            pathRiasecRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathRiasecRef.current.getPointAtLength === 'function') {
              const pt = pathRiasecRef.current.getPointAtLength(actualF * len);
              fragRiasecRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            }
            fragRiasecRef.current.style.opacity = prog >= 0.28 && prog <= 0.98 ? (f > 0.05 ? '0.95' : '0') : '0';
          }

          // 3. Work Values (49–66%) - Intersects media plane
          if (pathValuesRef.current && fragValuesRef.current) {
            const len = typeof pathValuesRef.current.getTotalLength === 'function' ? pathValuesRef.current.getTotalLength() : 500;
            const f = Math.min(Math.max((prog - 0.49) / 0.17, 0), 1);
            pathValuesRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathValuesRef.current.getPointAtLength === 'function') {
              const pt = pathValuesRef.current.getPointAtLength(actualF * len);
              fragValuesRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            }
            fragValuesRef.current.style.opacity = prog >= 0.45 && prog <= 0.98 ? (f > 0.05 ? '0.95' : '0') : '0';

            if (valuesMediaRef.current) {
              valuesMediaRef.current.style.opacity = f > 0.2 ? `${Math.min(f * 0.75, 0.75)}` : '0';
            }
          }

          // 4. Career Context (66–83%) - Largest reach
          if (pathCareerRef.current && fragCareerRef.current) {
            const len = typeof pathCareerRef.current.getTotalLength === 'function' ? pathCareerRef.current.getTotalLength() : 500;
            const f = Math.min(Math.max((prog - 0.66) / 0.17, 0), 1);
            pathCareerRef.current.style.strokeDashoffset = `${len * (1 - f)}`;

            const recomposeF = prog >= 0.83 ? (prog - 0.83) / 0.17 : 0;
            const actualF = Math.max(0, f - recomposeF);

            if (typeof pathCareerRef.current.getPointAtLength === 'function') {
              const pt = pathCareerRef.current.getPointAtLength(actualF * len);
              fragCareerRef.current.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            }
            fragCareerRef.current.style.opacity = prog >= 0.62 && prog <= 0.98 ? (f > 0.05 ? '0.95' : '0') : '0';

            if (careerMediaRef.current) {
              careerMediaRef.current.style.opacity = f > 0.2 ? `${Math.min(f * 0.85, 0.85)}` : '0';
            }
          }

          // Kinetic path text on recomposition
          if (textPathRef.current) {
            const textOffset = Math.min(Math.max((prog - 0.83) / 0.17, 0), 1) * 100;
            textPathRef.current.setAttribute('startOffset', `${textOffset}%`);
          }

          // Reading Reveals
          if (readingBigFiveRef.current) {
            const f1 = Math.min(Math.max((prog - 0.2) / 0.12, 0), 1);
            readingBigFiveRef.current.style.opacity = prog >= 0.83 ? '0.85' : (prog >= 0.32 ? '0.45' : `${f1}`);
          }
          if (readingRiasecRef.current) {
            const f2 = Math.min(Math.max((prog - 0.37) / 0.12, 0), 1);
            readingRiasecRef.current.style.opacity = prog >= 0.83 ? '0.85' : (prog >= 0.49 ? '0.45' : `${f2}`);
          }
          if (readingValuesRef.current) {
            const f3 = Math.min(Math.max((prog - 0.54) / 0.12, 0), 1);
            readingValuesRef.current.style.opacity = prog >= 0.83 ? '0.85' : (prog >= 0.66 ? '0.45' : `${f3}`);
          }
          if (readingCareerRef.current) {
            const f4 = Math.min(Math.max((prog - 0.71) / 0.12, 0), 1);
            readingCareerRef.current.style.opacity = prog >= 0.83 ? '0.85' : `${f4}`;
          }

          if (sourceEvidenceRef.current) {
            sourceEvidenceRef.current.style.transform = prog >= 0.83 ? 'scale(1.04)' : 'scale(1)';
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
        {/* SVG Trajectory Canvas with Native SVG Coordinates */}
        <svg
          className="pa-home-transformation__svg-canvas"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Trajectory 1: Center -> Big Five (Top Left, compact arc) */}
          <path
            ref={pathBigFiveRef}
            d="M 600 400 C 500 320, 360 220, 260 170"
            className="pa-evidence-path"
          />

          {/* Trajectory 2: Center -> RIASEC (Left Lower, wide reach) */}
          <path
            ref={pathRiasecRef}
            d="M 600 400 C 440 430, 280 470, 160 520"
            className="pa-evidence-path"
          />

          {/* Trajectory 3: Center -> Work Values (Bottom Right, intersects media) */}
          <path
            ref={pathValuesRef}
            d="M 600 400 C 680 460, 820 540, 940 600"
            className="pa-evidence-path"
          />

          {/* Trajectory 4: Center -> Career Context (Top Right, largest reach) */}
          <path
            ref={pathCareerRef}
            d="M 600 400 C 760 300, 920 180, 1060 130"
            className="pa-evidence-path"
          />

          {/* Recomposition Kinetic Path */}
          <path
            id="evidence-path-recompose"
            d="M 260 170 Q 600 240 1060 130 Q 940 600 600 400 Q 160 520 260 170"
            fill="none"
            stroke="rgba(100,40,50,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <text className="pa-path-kinetic-text">
            <textPath
              ref={textPathRef}
              href="#evidence-path-recompose"
              startOffset="0%"
            >
              same evidence — four distinct interpretative frameworks
            </textPath>
          </text>

          {/* Pure SVG Traveling Fragment 1: Big Five */}
          <g ref={fragBigFiveRef} style={{ opacity: 0 }}>
            <circle cx="0" cy="0" r="4" fill="var(--pa-oxblood)" />
            <rect x="8" y="-12" width="130" height="24" rx="2" fill="var(--pa-carbon)" stroke="rgba(100,40,50,0.5)" strokeWidth="1" />
            <text x="14" y="4" fill="var(--pa-mineral)" fontSize="10" fontFamily="var(--pa-font-functional)" fontWeight="500">
              ownership signal
            </text>
          </g>

          {/* Pure SVG Traveling Fragment 2: RIASEC */}
          <g ref={fragRiasecRef} style={{ opacity: 0 }}>
            <circle cx="0" cy="0" r="4" fill="var(--pa-oxblood)" />
            <rect x="8" y="-12" width="130" height="24" rx="2" fill="var(--pa-carbon)" stroke="rgba(100,40,50,0.5)" strokeWidth="1" />
            <text x="14" y="4" fill="var(--pa-mineral)" fontSize="10" fontFamily="var(--pa-font-functional)" fontWeight="500">
              system orientation
            </text>
          </g>

          {/* Pure SVG Traveling Fragment 3: Work Values */}
          <g ref={fragValuesRef} style={{ opacity: 0 }}>
            <circle cx="0" cy="0" r="4" fill="var(--pa-oxblood)" />
            <rect x="8" y="-12" width="130" height="24" rx="2" fill="var(--pa-carbon)" stroke="rgba(100,40,50,0.5)" strokeWidth="1" />
            <text x="14" y="4" fill="var(--pa-mineral)" fontSize="10" fontFamily="var(--pa-font-functional)" fontWeight="500">
              role autonomy
            </text>
          </g>

          {/* Pure SVG Traveling Fragment 4: Career Context */}
          <g ref={fragCareerRef} style={{ opacity: 0 }}>
            <circle cx="0" cy="0" r="4" fill="var(--pa-oxblood)" />
            <rect x="8" y="-12" width="130" height="24" rx="2" fill="var(--pa-carbon)" stroke="rgba(100,40,50,0.5)" strokeWidth="1" />
            <text x="14" y="4" fill="var(--pa-mineral)" fontSize="10" fontFamily="var(--pa-font-functional)" fontWeight="500">
              architecture focus
            </text>
          </g>
        </svg>

        {/* Supporting Media Memories */}
        <div ref={valuesMediaRef} className="pa-transformation-media pa-transformation-media--values" aria-hidden="true" style={{ opacity: 0 }}>
          <img src={analysisAsset.source} alt="" className="pa-transformation-media__img" loading="lazy" />
        </div>

        <div ref={careerMediaRef} className="pa-transformation-media pa-transformation-media--career" aria-hidden="true" style={{ opacity: 0 }}>
          <img src={visibleCraftAsset.source} alt="" className="pa-transformation-media__img" loading="lazy" />
        </div>

        <div className="pa-home-transformation__content-field">
          {/* Central Dominant Source Evidence Object (Open Typography) */}
          <div ref={sourceEvidenceRef} className="pa-home-transformation__source">
            <div className="pa-home-transformation__provenance-anchor" aria-hidden="true" />
            <span className="pa-home-transformation__label">
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

          {/* Reading Zone 2: RIASEC (Left Lower) — Open Typography */}
          <div
            ref={readingRiasecRef}
            className="pa-reading-zone pa-reading-zone--riasec"
          >
            <span className="pa-reading-zone__tag">02 • RIASEC</span>
            <h3 className="pa-reading-zone__title">Vocational Interests</h3>
            <p className="pa-reading-zone__text">
              Approaching problems through defined systems contributes to Conventional &amp; Investigative interest profiles.
            </p>
          </div>

          {/* Reading Zone 3: Work Values (Bottom Right) — Open Typography */}
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

          {/* Reading Zone 4: Career Context (Top Right) — Open Typography */}
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

        {/* Dedicated Mobile Vertical Journey */}
        <div className="pa-home-transformation__mobile-track">
          <div className="pa-home-transformation__mobile-node">
            <span className="pa-reading-zone__tag">01 • Big Five</span>
            <p className="pa-reading-zone__text">Conscientiousness Signal: Structured delivery preference.</p>
          </div>
          <div className="pa-home-transformation__mobile-node">
            <span className="pa-reading-zone__tag">02 • RIASEC</span>
            <p className="pa-reading-zone__text">Vocational Interests: Conventional &amp; Investigative.</p>
          </div>
          <div className="pa-home-transformation__mobile-node">
            <span className="pa-reading-zone__tag">03 • Work Values</span>
            <p className="pa-reading-zone__text">Environmental Values: Operational clarity and autonomy.</p>
          </div>
          <div className="pa-home-transformation__mobile-node">
            <span className="pa-reading-zone__tag">04 • Career Context</span>
            <p className="pa-reading-zone__text">Contextual Fit: System architecture and direct ownership.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTransformationChapter;
