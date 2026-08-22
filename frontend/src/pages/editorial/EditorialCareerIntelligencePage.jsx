import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import CalibrationBaseline from '../../components/personality-v7/living-record/CalibrationBaseline';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import careersData from '../../content/careers.json';
import './EditorialCareerIntelligencePage.css';

const CareerSpatialCanvas = lazy(() =>
  import('../../components/personality-v7/career/CareerSpatialCanvas')
);

gsap.registerPlugin(ScrollTrigger);

const CAREER_LENSES = [
  {
    id: 'complex-problems',
    num: '01',
    title: 'Complex problems',
    subtitle: 'Clear ownership / direct mechanical control',
    asset: MEDIA_ASSETS_V7.careerComplexMachine,
    secondaryAsset: MEDIA_ASSETS_V7.careerControl,
    description:
      'Work rewards structured problem solving when responsibility is clear enough to follow a decision through.',
    alignment: 'High engagement when technical boundaries and system ownership are clearly defined.',
    tension: 'Friction arises when accountability is fragmented across competing stakeholders.',
    develop: 'Scaling architectural judgment and robust error handling.',
    roles: ['Software Engineer', 'Backend Engineer', 'DevOps Engineer', 'Cybersecurity Analyst'],
  },
  {
    id: 'open-questions',
    num: '02',
    title: 'Open questions',
    subtitle: 'Long focus / investigative inquiry',
    asset: MEDIA_ASSETS_V7.careerDeepInquiry,
    secondaryAsset: MEDIA_ASSETS_V7.evidenceLabDetail,
    description:
      'Work leaves room to investigate, model possibilities and stay with a difficult problem before committing an answer.',
    alignment: 'Strong fit for deep analytical inquiry and hypothesis validation without artificial haste.',
    tension: 'Discomfort when forced into rapid superficial delivery without time to understand dynamics.',
    develop: 'Expanding probabilistic modeling and statistical evidence structuring.',
    roles: ['Data Analyst', 'Machine Learning Engineer', 'Control Systems Engineer'],
  },
  {
    id: 'shared-decisions',
    num: '03',
    title: 'Shared decisions',
    subtitle: 'Coordination / shared multidisciplinary artifacts',
    asset: MEDIA_ASSETS_V7.careerCoordination,
    secondaryAsset: MEDIA_ASSETS_V7.careerBroadcast,
    description:
      'Progress depends on communication, prioritisation and decisions that cross team boundaries.',
    alignment: 'Thrives when translating disparate perspectives into coherent strategic consensus.',
    tension: 'Energy drain in highly siloed environments where communication channels are blocked.',
    develop: 'Strengthening stakeholder synthesis and cross-functional momentum governance.',
    roles: ['Product Manager', 'Technical Program Manager', 'Customer Success Manager', 'Business Analyst'],
  },
  {
    id: 'visible-output',
    num: '04',
    title: 'Visible output',
    subtitle: 'Material feedback / tangible craft',
    asset: MEDIA_ASSETS_V7.evidenceVisible,
    secondaryAsset: MEDIA_ASSETS_V7.career3dPrinting,
    description: 'Work produces something observable that can be tested, refined or handled.',
    alignment: 'High engagement when craft quality and ergonomics can be directly evaluated.',
    tension: 'Frustration with purely theoretical initiatives that produce no tangible artifact.',
    develop: 'Deepening interaction ergonomics and sensory feedback precision.',
    roles: ['Frontend Engineer', 'UX Designer', 'Electrical Engineer', 'Automation Engineer', 'Embedded Engineer'],
  },
  {
    id: 'autonomy-standards',
    num: '05',
    title: 'Autonomy',
    subtitle: 'Pace, personal standards & high trust',
    asset: MEDIA_ASSETS_V7.careerAutonomy,
    secondaryAsset: MEDIA_ASSETS_V7.careerAnalysis,
    description:
      'The environment gives substantial responsibility for how work is organised, judged and improved.',
    alignment: 'Excels under high trust, self-directed tempo, and uncompromised quality bars.',
    tension: 'Resistance to micromanagement or arbitrary bureaucratic constraints.',
    develop: 'Calibrating personal perfectionism against real-world iterative milestones.',
    roles: ['Software Engineer', 'Machine Learning Engineer', 'UX Designer', 'Power Systems Engineer'],
  },
];

const ALL_ROLES = [
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'DevOps Engineer',
  'Data Analyst',
  'Machine Learning Engineer',
  'Product Manager',
  'Technical Program Manager',
  'UX Designer',
  'Cybersecurity Analyst',
  'Cloud Architect',
  'Embedded Systems Engineer',
  'Electrical Engineer',
  'Control Systems Engineer',
  'Power Systems Engineer',
  'Automation Engineer',
  'Customer Success Manager',
];

export const EditorialCareerIntelligencePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedRole, setSelectedRole] = useState(ALL_ROLES[0]);
  const [useWebGL, setUseWebGL] = useState(false);
  const { navigateWithTransition } = useRouteTransition();

  const atlasRef = useRef(null);
  const activeLens = CAREER_LENSES[activeIdx] || CAREER_LENSES[0];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.innerWidth > 1024;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (!prefersReduced && isDesktop && isFinePointer) {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) setUseWebGL(true);
      } catch {
        setUseWebGL(false);
      }
    }
  }, []);

  const handleCtaClick = (e, to) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  const roleDetails = (careersData && careersData[selectedRole]) || {
    title: selectedRole,
    description: 'Curated technical and analytical profile definition from the career matching model.',
    skills: ['Problem Structuring', 'Domain Depth', 'Technical Planning'],
    facets: { riasec: 'Investigative / Conventional', workValue: 'Autonomy' },
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        {/* ── Section 1: Workworld Atlas ── */}
        <section
          ref={atlasRef}
          className="pa-career-atlas"
          aria-label="Workworld Atlas: Exploring professional environments"
        >
          {/* WebGL Progressive Enhancement Canvas (if active) */}
          {useWebGL ? (
            <Suspense fallback={null}>
              <div className="pa-career-atlas__webgl" aria-hidden="true">
                <CareerSpatialCanvas
                  activeLensId={activeLens.id}
                  onSelectLens={(id) => {
                    const found = CAREER_LENSES.findIndex((l) => l.id === id);
                    if (found >= 0) setActiveIdx(found);
                  }}
                />
              </div>
            </Suspense>
          ) : (
            /* DOM Fallback Atlas Environment */
            <div className="pa-career-atlas__dom-media">
              <div className="pa-career-atlas__primary-env">
                <EnvironmentPlane
                  asset={activeLens.asset}
                  role="primary"
                  priority={true}
                  caption={`ENVIRONMENT: ${activeLens.title.toUpperCase()}`}
                />
              </div>
              <div className="pa-career-atlas__support-env">
                <EnvironmentPlane
                  asset={activeLens.secondaryAsset}
                  role="support"
                  caption="SUPPORT CONTEXT"
                />
              </div>
            </div>
          )}

          {/* Interactive Atlas Overlay */}
          <div className="pa-career-atlas__overlay">
            <div className="pa-career-atlas__header">
              <span className="pa-career-atlas__eyebrow">WORKWORLD ATLAS</span>
              <h1 className="pa-career-atlas__title">{activeLens.title}</h1>
              <p className="pa-career-atlas__subtitle">{activeLens.subtitle}</p>
            </div>

            {/* Edge Navigation Index */}
            <nav className="pa-career-atlas__nav" aria-label="Workworld environments index">
              {CAREER_LENSES.map((lens, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    className={`pa-career-atlas__nav-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveIdx(idx)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="pa-career-atlas__nav-num">{lens.num}</span>
                    <span className="pa-career-atlas__nav-label">{lens.title}</span>
                  </button>
                );
              })}
            </nav>

            {/* Living Record Protagonist */}
            <div className="pa-career-atlas__strip-wrap">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="RETAINED SOURCE"
                conditionLabel={`CURRENT ENVIRONMENT: ${activeLens.title.toUpperCase()}`}
                sourceLabel="SAME RECORD / DIFFERENT SITUATIONAL DEMANDS"
                theme="carbon"
                variant="compared"
              />
            </div>

            {/* Asymmetric Relationship Triad (in negative space) */}
            <div className="pa-career-atlas__triad">
              <div className="pa-career-atlas__triad-item pa-career-atlas__triad-item--align">
                <span className="pa-career-atlas__triad-label">ALIGNMENT</span>
                <p className="pa-career-atlas__triad-text">{activeLens.alignment}</p>
              </div>
              <div className="pa-career-atlas__triad-item pa-career-atlas__triad-item--tension">
                <span className="pa-career-atlas__triad-label">TENSION</span>
                <p className="pa-career-atlas__triad-text">{activeLens.tension}</p>
              </div>
              <div className="pa-career-atlas__triad-item pa-career-atlas__triad-item--develop">
                <span className="pa-career-atlas__triad-label">DEVELOP</span>
                <p className="pa-career-atlas__triad-text">{activeLens.develop}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Factual Deterministic Calibration Baseline ── */}
        <section
          className="pa-career-calibration"
          aria-label="Deterministic Career Calibration Layers"
        >
          <div className="pa-career-calibration__inner">
            <div className="pa-career-calibration__header">
              <span className="pa-career-calibration__eyebrow">DETERMINISTIC PROFILE WEIGHTING</span>
              <h2 className="pa-career-calibration__h2">Career fit uses six deterministic layers.</h2>
              <p className="pa-career-calibration__lead">
                Work-condition environments are editorial lenses for exploration. Actual career comparison evaluates the weighted deterministic model below.
              </p>
            </div>

            <div className="pa-career-calibration__baseline-wrap">
              <CalibrationBaseline theme="mineral" />
            </div>
          </div>
        </section>

        {/* ── Section 3: 17-Role Atlas Index ── */}
        <section
          className="pa-career-roles"
          aria-label="Supported 17-Role Directory"
        >
          <div className="pa-career-roles__inner">
            <div className="pa-career-roles__header">
              <span className="pa-career-roles__eyebrow">CAREER DIRECTORY</span>
              <h2 className="pa-career-roles__h2">17 Curated Professional Roles</h2>
              <p className="pa-career-roles__lead">
                Explore curated profile definitions without artificial ranking.
              </p>
            </div>

            <div className="pa-career-roles__grid">
              {/* Left Role List */}
              <div className="pa-career-roles__list" role="list" aria-label="Role directory list">
                {ALL_ROLES.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      className={`pa-career-roles__item ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedRole(role)}
                      role="listitem"
                      aria-current={isSelected ? 'true' : undefined}
                    >
                      <span className="pa-career-roles__item-dot" />
                      <span className="pa-career-roles__item-name">{role}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Profile Facets Inspection */}
              <div className="pa-career-roles__detail-panel" aria-live="polite">
                <div className="pa-career-roles__detail-header">
                  <span className="pa-career-roles__detail-tag">CURATED ROLE SPECIFICATION</span>
                  <h3 className="pa-career-roles__detail-title">{selectedRole}</h3>
                  <p className="pa-career-roles__detail-desc">
                    {roleDetails.description || 'Structured professional role profile.'}
                  </p>
                </div>

                <div className="pa-career-roles__facets">
                  <div className="pa-career-roles__facet">
                    <span className="pa-career-roles__facet-label">RELEVANT SKILLS</span>
                    <div className="pa-career-roles__pills">
                      {(roleDetails.skills || ['Technical Problem Solving', 'Systems Planning']).map(
                        (sk) => (
                          <span key={sk} className="pa-career-roles__pill">
                            {sk}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="pa-career-roles__detail-footer">
                  <a
                    href="/signup"
                    className="pa-btn pa-btn--primary"
                    onClick={(e) => handleCtaClick(e, '/signup')}
                  >
                    Build your profile to match →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialCareerIntelligencePage;
