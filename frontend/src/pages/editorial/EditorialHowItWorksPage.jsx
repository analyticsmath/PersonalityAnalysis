import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

gsap.registerPlugin(ScrollTrigger);

/**
 * HOW IT WORKS STATE MAP (EVIDENCE TRANSIT JOURNEY)
 * 0%   - Hero stage: Media (howProcess) establishes how contextual work begins.
 * 20%  - Stage 1 (Contextual Attachment): Traveling evidence departs initial node along Oxblood curve.
 * 40%  - Stage 2 (Adaptive Staged Inquiry): Follow-up questions adapt to previous decisions.
 * 60%  - Stage 3 (Multi-Lens Decomposition): Big Five, RIASEC, Work Values split into separate readings.
 * 80%  - Stage 4 (Deterministic Comparison): Multi-layer weighted role benchmarks compared.
 * 100% - Stage 5 (Longitudinal Revisit): Earlier baselines preserved for future comparative inspection.
 */
const STAGES = [
  {
    id: 'context',
    num: '01',
    title: 'Contextual Attachment',
    heading: 'Background & Situational Framing',
    body: 'A response is never evaluated in isolation. Project deadlines, organizational constraints, and past context stay attached to the response so interpretation reflects real working conditions.',
  },
  {
    id: 'adaptive',
    num: '02',
    title: 'Adaptive Staged Inquiry',
    heading: 'The next question builds on the last',
    body: 'The assessment does not force every person through a static, generic marketing quiz. Responses guide targeted follow-ups to explore nuances in how decisions are made.',
  },
  {
    id: 'readings',
    num: '03',
    title: 'Multi-Lens Decomposition',
    heading: 'Personality, interests, and work values stay separate',
    body: 'Big Five personality traits, RIASEC vocational interests, and environmental work values retain distinct provenance rather than being collapsed into an opaque score.',
  },
  {
    id: 'careers',
    num: '04',
    title: 'Deterministic Comparison',
    heading: 'Compared across multi-layer role profiles',
    body: 'Your evidence record is matched with curated professional profiles using deterministic weighted multi-layer comparison logic for career exploration, not arbitrary AI prediction.',
  },
  {
    id: 'revisit',
    num: '05',
    title: 'Longitudinal Revisit',
    heading: 'Later assessments become new evidence',
    body: 'When you take future assessments or gain new experience, the earlier baseline is preserved. The system lets you inspect what stayed stable alongside what changed over time.',
  },
];

export const HowItWorksContent = () => {
  const { navigateWithTransition } = useRouteTransition();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const travelingEvidenceRef = useRef(null);
  const pathRef = useRef(null);
  const stageCardsRef = useRef([]);

  const heroAsset = MEDIA_ASSETS_V7.howProcess;

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (isMobile || prefersReduced || isTest) return;

    const container = containerRef.current;
    const stage = stageRef.current;
    const evidenceEl = travelingEvidenceRef.current;
    const pathEl = pathRef.current;

    if (!container || !stage || !evidenceEl || !pathEl) return;

    const pathLength = typeof pathEl.getTotalLength === 'function' ? pathEl.getTotalLength() : 1200;
    pathEl.style.strokeDasharray = `${pathLength}`;
    pathEl.style.strokeDashoffset = `${pathLength}`;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage,
        scrub: 0.85,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;

          // 1. Draw SVG path synchronously with scroll
          pathEl.style.strokeDashoffset = `${pathLength * (1 - prog)}`;

          // 2. Move traveling evidence object along the SVG path
          const pt = typeof pathEl.getPointAtLength === 'function'
            ? pathEl.getPointAtLength(prog * pathLength)
            : { x: prog * 1000, y: 400 };
          evidenceEl.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`;

          // 3. Highlight the active destination card
          const activeIndex = Math.min(Math.floor(prog * 5), 4);
          stageCardsRef.current.forEach((card, idx) => {
            if (!card) return;
            if (idx === activeIndex) {
              card.classList.add('pa-hiw-destination--active');
            } else {
              card.classList.remove('pa-hiw-destination--active');
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="pa-hiw-page">
      {/* ── Section 1: Opening Atmospheric Hero ── */}
      <section className="pa-hiw-hero" data-tone="light">
        <div className="pa-v7-grid pa-hiw-hero__grid">
          <div className="pa-hiw-hero__copy">
            <span className="pa-provenance-tag">Assessment Process & Pipeline</span>
            <h1 className="pa-display-hero pa-hiw-hero__h1">
              A response becomes evidence when its context stays attached.
            </h1>
            <p className="pa-hiw-hero__lead">
              Personality Assessor traces how a single contextual answer travels through staged inquiry, decomposes into separate frameworks, and contributes to career relationship exploration.
            </p>
          </div>

          <div className="pa-hiw-hero__media-wrap">
            <picture>
              <source type="image/avif" srcSet={heroAsset.avifSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
              <source type="image/webp" srcSet={heroAsset.webpSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
              <img
                src={heroAsset.source}
                alt={heroAsset.alt}
                width={heroAsset.intrinsicDimensions.width}
                height={heroAsset.intrinsicDimensions.height}
                className="pa-hiw-hero__img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ── Section 2: Pinned Evidence Journey Stage (~320svh) ── */}
      <section ref={containerRef} className="pa-hiw-journey-container" data-tone="dark">
        <div ref={stageRef} className="pa-hiw-journey-stage">
          {/* Continuous Animated SVG Curve Canvas */}
          <svg
            className="pa-hiw-journey-svg"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M 120 400 C 260 180, 420 180, 560 400 S 840 620, 1080 400"
              fill="none"
              stroke="#642832"
              strokeWidth="3"
            />
          </svg>

          {/* Physically Moving Evidence Object along the path */}
          <div ref={travelingEvidenceRef} className="pa-hiw-traveling-evidence">
            <div className="pa-hiw-traveling-evidence__inner">
              <span className="pa-hiw-traveling-evidence__tag">Evidence In Transit</span>
              <p className="pa-evidence-quote pa-hiw-traveling-evidence__text">
                “I prefer clear ownership before committing work.”
              </p>
            </div>
          </div>

          {/* 5 Open Typography Spatial Destinations across the stage */}
          <div className="pa-hiw-destinations-grid">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(node) => (stageCardsRef.current[idx] = node)}
                className={`pa-hiw-destination pa-hiw-destination--${stage.id} ${idx === 0 ? 'pa-hiw-destination--active' : ''}`}
              >
                <div className="pa-hiw-destination__node-marker" aria-hidden="true" />
                <span className="pa-hiw-destination__num">{stage.num}</span>
                <span className="pa-hiw-destination__title">{stage.title}</span>
                <h3 className="pa-hiw-destination__heading">{stage.heading}</h3>
                <p className="pa-hiw-destination__body">{stage.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Next Steps & Acquisition CTA ── */}
      <section className="pa-hiw-cta-section" data-tone="light">
        <div className="pa-v7-grid pa-hiw-cta-section__grid">
          <div className="pa-hiw-cta-section__content">
            <h2 className="pa-heading-major">Build your inspectable record.</h2>
            <p className="pa-hiw-cta-section__lead">
              Start with your professional background, then step through the staged assessment.
            </p>
            <div className="pa-hiw-cta-section__actions">
              <MagneticTarget>
                <a
                  href="/signup"
                  className="pa-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithTransition('/signup');
                  }}
                >
                  Create your first record
                </a>
              </MagneticTarget>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const EditorialHowItWorksPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        <HowItWorksContent />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialHowItWorksPage;
