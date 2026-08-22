import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider, { useScrollContext } from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useCursor } from '../../components/personality-v7/motion/CursorCoordinator';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

const CareerSpatialCanvas = lazy(() => import('../../components/personality-v7/career/CareerSpatialCanvas'));

gsap.registerPlugin(ScrollTrigger);

/**
 * CAREER INTELLIGENCE STATE MAP (SPATIAL DOCUMENTARY ATLAS)
 * 0%   - Active environment advances forward in z-depth (+120px) and scale (1.05).
 *        Secondary supporting plane maintains depth (-70px to -140px).
 * 25%  - On selection switch: 12x8 pixel transition activates for 320ms on active image bounds.
 * 50%  - Asymmetric triad (Alignment / Tension / Develop) updates in open mineral composition below.
 * 75%  - Subordinate role examples reflect environmental context with explicit editorial disclaimer.
 * 100% - Kinetic typographic catalogue scrolls all 17 curated professional backend roles.
 */
const CAREER_LENSES = [
  {
    id: 'complex-problems',
    num: '01',
    title: 'Complex problems, clear ownership',
    shortName: 'STRUCTURE & OWNERSHIP',
    asset: MEDIA_ASSETS_V7.careerComplexMachine,
    secondaryAsset: MEDIA_ASSETS_V7.careerControl,
    description: 'Work rewards structured problem solving when responsibility is clear enough to follow a decision through.',
    alignment: 'High engagement when technical boundaries and system ownership are clearly defined.',
    tension: 'Friction arises when accountability is fragmented across competing stakeholders.',
    develop: 'Scaling architectural judgment and robust error handling.',
    roles: ['Software Engineer', 'Backend Engineer', 'DevOps Engineer', 'Cybersecurity Analyst'],
    desktopPos: { left: '4vw', top: '18vh', scale: 0.72, zIndex: 3, depthFactor: 24 },
  },
  {
    id: 'open-questions',
    num: '02',
    title: 'Open questions, long focus',
    shortName: 'DEEP INQUIRY',
    asset: MEDIA_ASSETS_V7.careerDeepInquiry,
    secondaryAsset: MEDIA_ASSETS_V7.evidenceLabDetail,
    description: 'Work leaves room to investigate, model possibilities and stay with a difficult problem before committing an answer.',
    alignment: 'Strong fit for deep analytical inquiry and hypothesis validation without artificial haste.',
    tension: 'Discomfort when forced into rapid superficial delivery without time to understand underlying dynamics.',
    develop: 'Expanding probabilistic modeling and statistical evidence structuring.',
    roles: ['Data Analyst', 'Machine Learning Engineer', 'Control Systems Engineer'],
    desktopPos: { left: '26vw', top: '8vh', scale: 0.82, zIndex: 4, depthFactor: 32 },
  },
  {
    id: 'shared-decisions',
    num: '03',
    title: 'Shared decisions, frequent coordination',
    shortName: 'CROSS-TEAM CONSENSUS',
    asset: MEDIA_ASSETS_V7.careerCoordination,
    secondaryAsset: MEDIA_ASSETS_V7.careerBroadcast,
    description: 'Progress depends on communication, prioritisation and decisions that cross team boundaries.',
    alignment: 'Thrives when translating disparate perspectives into coherent strategic consensus.',
    tension: 'Energy drain in highly siloed environments where communication channels are blocked.',
    develop: 'Strengthening stakeholder synthesis and cross-functional momentum governance.',
    roles: ['Product Manager', 'Technical Program Manager', 'Customer Success Manager', 'Business Analyst'],
    desktopPos: { left: '56vw', top: '16vh', scale: 1.0, zIndex: 5, depthFactor: 36 },
  },
  {
    id: 'visible-output',
    num: '04',
    title: 'Visible output, material feedback',
    shortName: 'TANGIBLE CRAFT',
    asset: MEDIA_ASSETS_V7.evidenceVisible,
    secondaryAsset: MEDIA_ASSETS_V7.career3dPrinting,
    description: 'Work produces something observable that can be tested, refined or handled.',
    alignment: 'High engagement when craft quality and ergonomics can be directly evaluated.',
    tension: 'Frustration with purely theoretical initiatives that produce no tangible artifact.',
    develop: 'Deepening interaction ergonomics and sensory feedback precision.',
    roles: ['Frontend Engineer', 'UX Designer', 'Electrical Engineer', 'Automation Engineer', 'Embedded Engineer'],
    desktopPos: { left: '74vw', top: '50vh', scale: 0.74, zIndex: 2, depthFactor: 16 },
  },
  {
    id: 'autonomy-standards',
    num: '05',
    title: 'Autonomy, pace, personal standards',
    shortName: 'AUTONOMOUS TEMPO',
    asset: MEDIA_ASSETS_V7.careerAutonomy,
    secondaryAsset: MEDIA_ASSETS_V7.careerAnalysis,
    description: 'The environment gives substantial responsibility for how work is organised, judged and improved.',
    alignment: 'Excels under high trust, self-directed tempo, and uncompromised quality bars.',
    tension: 'Resistance to micromanagement or arbitrary bureaucratic constraints.',
    develop: 'Calibrating personal perfectionism against real-world iterative milestones.',
    roles: ['Software Engineer', 'Machine Learning Engineer', 'UX Designer', 'Power Systems Engineer'],
    desktopPos: { left: '22vw', top: '60vh', scale: 0.76, zIndex: 3, depthFactor: 20 },
  },
];

const ROLE_CATALOGUE_ROW_1 = [
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'Data Analyst',
  'Machine Learning Engineer',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
  'Technical Program Manager',
];

const ROLE_CATALOGUE_ROW_2 = [
  'Customer Success Manager',
  'Cybersecurity Analyst',
  'Electrical Engineer',
  'Power Systems Engineer',
  'Control Systems Engineer',
  'Automation Engineer',
  'Embedded Engineer',
  'Business Analyst',
];

const PIXEL_COLS = 12;
const PIXEL_ROWS = 8;

export const CareerIntelligenceContent = () => {
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel } = useCursor();
  const { subscribe } = useScrollContext();

  const [activeIdx, setActiveIdx] = useState(0);
  const [pixelTransitionActive, setPixelTransitionActive] = useState(false);
  const [canRenderWebGL, setCanRenderWebGL] = useState(false);
  const isFirstSelectionRef = useRef(true);

  const galleryRef = useRef(null);
  const imagePlanesRef = useRef([]);
  const catalogueRow1Ref = useRef(null);
  const catalogueRow2Ref = useRef(null);
  const pos1Ref = useRef(0);
  const pos2Ref = useRef(0);

  const activeLens = CAREER_LENSES[activeIdx];

  // Detect if WebGL progressive enhancement should be enabled (Desktop >1024 + fine pointer)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isDesktop && isFinePointer && !prefersReduced) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (gl) {
          setCanRenderWebGL(true);
        }
      } catch {
        setCanRenderWebGL(false);
      }
    }
  }, []);

  // Choreograph 3D Depth via GSAP (authoritative accessible transform owner)
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    // Initialize dormant depth bands
    imagePlanesRef.current.forEach((el, idx) => {
      if (!el) return;
      const isSelected = idx === activeIdx;
      const lens = CAREER_LENSES[idx];
      const dormantZ = idx === 2 ? 0 : (idx % 2 === 0 ? -70 : -140);
      const targetZ = isSelected ? 120 : dormantZ;
      const targetScale = isSelected ? 1.05 : lens.desktopPos.scale;

      gsap.to(el, {
        z: targetZ,
        scale: targetScale,
        duration: 0.52,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });

    const handlePointerMove = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      imagePlanesRef.current.forEach((el, idx) => {
        if (!el) return;
        const lens = CAREER_LENSES[idx];
        const factor = lens.depthFactor || 20;

        gsap.to(el, {
          x: normX * factor,
          y: normY * factor,
          rotateY: normX * 1.2,
          rotateX: -normY * 1.2,
          duration: 0.85,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [activeIdx]);

  // Kinetic Typographic Role Catalogue Scroll Subscriptions
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const unsub = subscribe((state) => {
      const vel = state.velocity || 0;
      pos1Ref.current -= vel * 0.4;
      pos2Ref.current += vel * 0.3;

      if (catalogueRow1Ref.current) {
        catalogueRow1Ref.current.style.transform = `translate3d(${pos1Ref.current}px, 0, 0)`;
      }
      if (catalogueRow2Ref.current) {
        catalogueRow2Ref.current.style.transform = `translate3d(${pos2Ref.current}px, 0, 0)`;
      }
    });

    return () => unsub();
  }, [subscribe]);

  const selectLens = (idx) => {
    if (idx === activeIdx) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isCoarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFirstSelectionRef.current && !isMobile && !isCoarse && !prefersReduced) {
      setPixelTransitionActive(true);
      setTimeout(() => setPixelTransitionActive(false), 320);
    }

    isFirstSelectionRef.current = false;
    setActiveIdx(idx);
    setCursorLabel(CAREER_LENSES[idx].shortName);
  };

  return (
    <div className="pa-career-page">
      {/* ── Section 1: Hero Context (Carbon) ── */}
      <section className="pa-career-hero" data-tone="dark">
        <div className="pa-v7-grid pa-career-hero__grid">
          <div className="pa-career-hero__headline-col">
            <h1 className="pa-display-hero pa-career-hero__h1">
              Career fit changes with the conditions around the work.
            </h1>
            <p className="pa-career-hero__lead">
              Explore example work conditions that can affect how professional evidence relates to a role. These lenses are editorial exploration tools, not backend role classifications.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: 3D Career Media Field & Spatial Selector (Carbon) ── */}
      <section className="pa-career-gallery-stage" data-tone="dark">
        {/* Progressive WebGL 3D Canvas Enhancement (Desktop fine-pointer) */}
        {canRenderWebGL && (
          <Suspense fallback={null}>
            <CareerSpatialCanvas activeIndex={activeIdx} items={CAREER_LENSES} isMobile={false} />
          </Suspense>
        )}

        {/* 3D Spatial Media Field (Interactive Image Planes as Primary Selector) */}
        <div ref={galleryRef} className="pa-career-spatial-field">
          {CAREER_LENSES.map((lens, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div
                key={lens.id}
                ref={(node) => (imagePlanesRef.current[idx] = node)}
                onClick={() => selectLens(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectLens(idx);
                  }
                }}
                onMouseEnter={() => setCursorLabel(lens.shortName)}
                onMouseLeave={() => clearCursorLabel()}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select ${lens.title} environment`}
                className={`pa-career-media-plane ${isSelected ? 'pa-career-media-plane--selected' : 'pa-career-media-plane--dormant'} ${canRenderWebGL ? 'pa-career-media-plane--webgl-active' : ''}`}
                style={{
                  '--desktop-left': lens.desktopPos.left,
                  '--desktop-top': lens.desktopPos.top,
                  '--z-order': isSelected ? 10 : lens.desktopPos.zIndex,
                }}
              >
                {/* Pixel Transition Grid (integrated within active image bounds) */}
                {isSelected && pixelTransitionActive && (
                  <div className="pa-pixel-grid-overlay" aria-hidden="true">
                    {Array.from({ length: PIXEL_COLS * PIXEL_ROWS }).map((_, i) => (
                      <div
                        key={i}
                        className="pa-pixel-tile"
                        style={{ animationDelay: `${(i % PIXEL_COLS) * 16}ms` }}
                      />
                    ))}
                  </div>
                )}

                <picture>
                  <source type="image/avif" srcSet={lens.asset.avifSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
                  <source type="image/webp" srcSet={lens.asset.webpSrcSet} sizes="(min-width: 901px) 45vw, 100vw" />
                  <img
                    src={lens.asset.source}
                    alt={lens.asset.alt}
                    width={lens.asset.intrinsicDimensions.width}
                    height={lens.asset.intrinsicDimensions.height}
                    className="pa-career-media-plane__img"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>

                <div className="pa-career-media-plane__tag">
                  <span>{lens.num} • {lens.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Section 3: Open Mineral Spatial Composition ── */}
      <section className="pa-career-spatial-info" data-tone="light">
        <div className="pa-v7-grid pa-career-spatial-info__grid">
          <div className="pa-career-spatial-info__intro">
            <h2 className="pa-heading-major pa-career-spatial-info__title">
              {activeLens.title}
            </h2>
            <p className="pa-career-spatial-info__desc">
              {activeLens.description}
            </p>
          </div>

          {/* Secondary Media Plane in Context */}
          <div className="pa-career-spatial-info__secondary-plane" aria-hidden="true">
            <picture>
              <source type="image/avif" srcSet={activeLens.secondaryAsset.avifSrcSet} sizes="(min-width: 901px) 30vw, 80vw" />
              <source type="image/webp" srcSet={activeLens.secondaryAsset.webpSrcSet} sizes="(min-width: 901px) 30vw, 80vw" />
              <img
                src={activeLens.secondaryAsset.source}
                alt=""
                width={activeLens.secondaryAsset.intrinsicDimensions.width}
                height={activeLens.secondaryAsset.intrinsicDimensions.height}
                className="pa-career-spatial-info__secondary-img"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>

          {/* Single Open Mineral Spatial Composition: ALIGNMENT, TENSION, DEVELOP */}
          <div className="pa-career-spatial-info__triad">
            {/* Alignment near the evidence */}
            <div className="pa-career-triad__item pa-career-triad__item--alignment">
              <div className="pa-career-triad__marker" aria-hidden="true" />
              <span className="pa-career-triad__tag" style={{ color: 'var(--pa-oxblood)' }}>
                Alignment
              </span>
              <h3 className="pa-career-triad__heading">Favorable Conditions</h3>
              <p className="pa-career-triad__text">{activeLens.alignment}</p>
            </div>

            {/* Tension between evidence and environment */}
            <div className="pa-career-triad__item pa-career-triad__item--tension">
              <div className="pa-career-triad__marker" aria-hidden="true" />
              <span className="pa-career-triad__tag" style={{ color: 'var(--pa-muted-light)' }}>
                Tension
              </span>
              <h3 className="pa-career-triad__heading">Points of Friction</h3>
              <p className="pa-career-triad__text">{activeLens.tension}</p>
            </div>

            {/* Develop deeper into the environment */}
            <div className="pa-career-triad__item pa-career-triad__item--develop">
              <div className="pa-career-triad__marker" aria-hidden="true" />
              <span className="pa-career-triad__tag" style={{ color: 'var(--pa-carbon)' }}>
                Develop
              </span>
              <h3 className="pa-career-triad__heading">Growth Opportunities</h3>
              <p className="pa-career-triad__text">{activeLens.develop}</p>
            </div>
          </div>

          {/* Subordinate Role Examples with explicit honest editorial disclosure */}
          <div className="pa-career-spatial-info__roles-field">
            <span className="pa-career-spatial-info__roles-label">Example roles worth exploring</span>
            <p className="pa-career-roles-disclosure">
              These illustrative roles are editorial references to understand environmental contexts, not deterministic backend classifications.
            </p>
            <div className="pa-career-roles-plain-list">
              {activeLens.roles.map((r, i) => (
                <span key={r} className="pa-career-role-plain">
                  {r}{i < activeLens.roles.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Kinetic Typographic Role Catalogue (Carbon) ── */}
      <section className="pa-career-catalogue" data-tone="dark">
        <div className="pa-v7-grid pa-career-catalogue__grid">
          <div className="pa-career-catalogue__header">
            <span className="pa-provenance-tag" style={{ color: 'var(--pa-mineral)' }}>
              Backend Role Catalogue
            </span>
            <h2 className="pa-heading-major pa-career-catalogue__h2">
              17 Curated Professional Profiles
            </h2>
            <p className="pa-career-catalogue__lead">
              Personality Assessor compares your multi-layer psychometric record with 17 curated professional role models using deterministic multi-layer comparison logic.
            </p>
          </div>
        </div>

        {/* Kinetic Typographic Crawler Rows */}
        <div className="pa-career-catalogue__kinetic-field" aria-hidden="true">
          <div ref={catalogueRow1Ref} className="pa-career-catalogue__row">
            {[...ROLE_CATALOGUE_ROW_1, ...ROLE_CATALOGUE_ROW_1].map((role, i) => (
              <span key={`${role}-${i}`} className="pa-catalogue-role-text">
                {role} <span className="pa-catalogue-dot">/</span>
              </span>
            ))}
          </div>

          <div ref={catalogueRow2Ref} className="pa-career-catalogue__row pa-career-catalogue__row--alt">
            {[...ROLE_CATALOGUE_ROW_2, ...ROLE_CATALOGUE_ROW_2].map((role, i) => (
              <span key={`${role}-${i}`} className="pa-catalogue-role-text">
                {role} <span className="pa-catalogue-dot">/</span>
              </span>
            ))}
          </div>
        </div>

        <div className="pa-v7-grid pa-career-catalogue__cta-grid">
          <MagneticTarget>
            <a
              href="/signup"
              className="pa-btn-primary-dark"
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition('/signup');
              }}
            >
              Build your profile to compare careers
            </a>
          </MagneticTarget>
        </div>
      </section>
    </div>
  );
};

export const EditorialCareerIntelligencePage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <CareerIntelligenceContent />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialCareerIntelligencePage;
