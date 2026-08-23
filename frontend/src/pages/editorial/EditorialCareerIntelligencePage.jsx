import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EnvironmentPlane from '../../components/personality-v7/living-record/EnvironmentPlane';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import CalibrationBaseline from '../../components/personality-v7/living-record/CalibrationBaseline';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { useCursor } from '../../components/personality-v7/motion/CursorCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';
import careersData from '../../content/careers.json';
import './EditorialCareerIntelligencePage.css';

const CareerSpatialCanvas = lazy(() =>
  import('../../components/personality-v7/career/CareerSpatialCanvas')
);

gsap.registerPlugin(ScrollTrigger);

export const CAREER_LENSES = [
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

// Canonical 17 roles built directly from careers.json
export const ROLE_ENTRIES = Object.entries(careersData).map(([id, profile]) => ({
  id,
  ...profile,
}));

export const EditorialCareerIntelligencePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedRoleId, setSelectedRoleId] = useState(ROLE_ENTRIES[0]?.id || 'software_engineer');
  const [useWebGL, setUseWebGL] = useState(false);
  const [canMountWebGL, setCanMountWebGL] = useState(false);
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel } = useCursor();

  const handleCanvasReady = React.useCallback(() => setUseWebGL(true), []);
  const handleCanvasUnavailable = React.useCallback(() => setUseWebGL(false), []);

  const atlasRef = useRef(null);
  const activeLens = CAREER_LENSES[activeIdx] || CAREER_LENSES[0];
  const selectedProfile = careersData[selectedRoleId] || ROLE_ENTRIES[0];

  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
    const isFinePointer =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: fine)').matches || !window.matchMedia('(pointer: coarse)').matches);
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDocumentHidden = typeof document !== 'undefined' && document.hidden;

    setCanMountWebGL(isDesktop && isFinePointer && !prefersReduced && !isDocumentHidden);
  }, []);

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <div className="pa-career-atlas-page" data-tone="dark">
          {/* Header Scene */}
          <section className="pa-career-atlas__header-scene">
            <div className="pa-career-atlas__header-content">
              <h1 className="pa-career-atlas__h1">
                Where work happens changes what evidence means.
              </h1>
              <p className="pa-career-atlas__lead">
                Personality signals do not operate in a vacuum. Career fit is calibrated against
                tangible working conditions, technical ownership boundaries, and team interaction models.
              </p>
            </div>

            <div className="pa-career-atlas__strip-anchor">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="SOURCE SPECIMEN"
                sourceLabel="CONDITION COMPARISON"
                theme="mineral"
                variant="compared"
                conditionLabel={activeLens.title}
              />
            </div>
          </section>

          {/* Section 1: Workworld Atlas (Spatial Environment Index & Asymmetric Relationships) */}
          <section ref={atlasRef} className="pa-career-atlas__stage-section">
            {/* Open Environment Index Navigation */}
            <div className="pa-career-atlas__lens-index" role="tablist" aria-label="Work environments">
              {CAREER_LENSES.map((lens, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={lens.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`lens-panel-${lens.id}`}
                    className={`pa-career-atlas__lens-btn ${
                      isActive ? 'pa-career-atlas__lens-btn--active' : ''
                    }`}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <span className="pa-career-atlas__lens-num">{lens.num}</span>
                    <span className="pa-career-atlas__lens-title">{lens.title}</span>
                    {isActive && <span className="pa-career-atlas__lens-tick" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>

            {/* Stage Field: Progressive WebGL or Flat Photographic Plane */}
            <div
              className="pa-career-atlas__field"
              onMouseEnter={() => setCursorLabel(activeLens.title.toUpperCase())}
              onMouseLeave={clearCursorLabel}
            >
              {/* Optional Progressive WebGL Mesh Canvas */}
              {canMountWebGL && (
                <Suspense fallback={null}>
                  <CareerSpatialCanvas
                    activeIndex={activeIdx}
                    items={CAREER_LENSES}
                    isMobile={false}
                    onCanvasReady={handleCanvasReady}
                    onCanvasUnavailable={handleCanvasUnavailable}
                  />
                </Suspense>
              )}

              {/* DOM Photographic Plane (Dominant primary + secondary support crop) */}
              <div
                className={`pa-career-atlas__dom-plane ${
                  useWebGL ? 'pa-career-atlas__dom-plane--webgl-active' : ''
                }`}
              >
                <div className="pa-career-atlas__dom-primary">
                  <EnvironmentPlane
                    asset={activeLens.asset}
                    role="primary"
                    priority={true}
                    caption={`WORKING CONDITION: ${activeLens.title.toUpperCase()}`}
                  />
                </div>
                {activeLens.secondaryAsset && (
                  <div className="pa-career-atlas__dom-secondary">
                    <EnvironmentPlane
                      asset={activeLens.secondaryAsset}
                      role="support"
                      caption={`DETAIL: ${activeLens.subtitle.toUpperCase()}`}
                    />
                  </div>
                )}
              </div>

              {/* Asymmetric Annotations around the Active Work Environment */}
              <div className="pa-career-atlas__asymmetric-relationships" id={`lens-panel-${activeLens.id}`}>
                {/* Alignment: left 6vw, top 28vh */}
                <div className="pa-career-atlas__rel-node pa-career-atlas__rel-node--alignment">
                  <span className="pa-career-atlas__rel-label">ALIGNMENT</span>
                  <p className="pa-career-atlas__rel-text">{activeLens.alignment}</p>
                </div>

                {/* Tension: right 6vw, top 48vh */}
                <div className="pa-career-atlas__rel-node pa-career-atlas__rel-node--tension">
                  <span className="pa-career-atlas__rel-label">TENSION</span>
                  <p className="pa-career-atlas__rel-text">{activeLens.tension}</p>
                </div>

                {/* Develop: left 36vw, bottom 6vh */}
                <div className="pa-career-atlas__rel-node pa-career-atlas__rel-node--develop">
                  <span className="pa-career-atlas__rel-label">DEVELOP</span>
                  <p className="pa-career-atlas__rel-text">{activeLens.develop}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Deterministic Calibration Baseline */}
          <section className="pa-career-atlas__calibration-section">
            <div className="pa-career-atlas__calibration-content">
              <h2 className="pa-career-atlas__h2">
                Multi-layered deterministic fit calibration.
              </h2>
              <p className="pa-career-atlas__calibration-lead">
                Career matching aggregates six weighted dimensions without probabilistic black-box guessing.
                RIASEC and core skills establish functional readiness, while work values and personality calibrate environmental friction.
              </p>
            </div>

            <div className="pa-career-atlas__calibration-stage">
              <CalibrationBaseline theme="carbon" />
            </div>
          </section>

          {/* Section 3: Open Role Atlas (Canonical 17 Roles from careers.json) */}
          <section className="pa-career-atlas__directory-section">
            <div className="pa-career-atlas__directory-header">
              <h2 className="pa-career-atlas__h2">
                Occupational directory & baseline requirements.
              </h2>
            </div>

            <div className="pa-career-atlas__directory-layout">
              {/* Open Role List */}
              <div className="pa-career-atlas__role-list" role="tablist" aria-label="17 Career Profiles">
                {ROLE_ENTRIES.map((role) => {
                  const isSelected = role.id === selectedRoleId;
                  return (
                    <button
                      key={role.id}
                      role="tab"
                      aria-selected={isSelected}
                      className={`pa-career-atlas__role-item ${
                        isSelected ? 'pa-career-atlas__role-item--active' : ''
                      }`}
                      onClick={() => setSelectedRoleId(role.id)}
                    >
                      <span className="pa-career-atlas__role-title">{role.title}</span>
                      <span className="pa-career-atlas__role-code">{role.id.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>

              {/* Open Editorial Detail Field (Rendered from verified careers.json fields) */}
              <div className="pa-career-atlas__role-detail" aria-live="polite">
                <div className="pa-career-atlas__role-headline-wrap">
                  <span className="pa-career-atlas__role-code">
                    ROLE PROFILE: {selectedRoleId.toUpperCase()}
                  </span>
                  <h3 className="pa-career-atlas__role-detail-title">{selectedProfile.title}</h3>
                </div>

                <div className="pa-career-atlas__open-spec-grid">
                  <div className="pa-career-atlas__spec-col">
                    <span className="pa-career-atlas__spec-label">CORE SKILLS</span>
                    <ul className="pa-career-atlas__open-list">
                      {(selectedProfile.skills || []).map((skill, idx) => (
                        <li key={idx} className="pa-career-atlas__open-item">{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pa-career-atlas__spec-col">
                    <span className="pa-career-atlas__spec-label">RELATED SUBJECTS</span>
                    <ul className="pa-career-atlas__open-list">
                      {(selectedProfile.subjects || []).map((subject, idx) => (
                        <li key={idx} className="pa-career-atlas__open-item">{subject}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pa-career-atlas__spec-col">
                    <span className="pa-career-atlas__spec-label">INTERESTS</span>
                    <ul className="pa-career-atlas__open-list">
                      {(selectedProfile.interests || []).map((interest, idx) => (
                        <li key={idx} className="pa-career-atlas__open-item">{interest}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedProfile.aptitude && (
                    <div className="pa-career-atlas__spec-col">
                      <span className="pa-career-atlas__spec-label">APTITUDE PROFILE</span>
                      <ul className="pa-career-atlas__open-list">
                        {Object.entries(selectedProfile.aptitude).map(([key, val]) => (
                          <li key={key} className="pa-career-atlas__open-item">
                            {key.replace('_', ' ')}: {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pa-career-atlas__role-actions">
                  <a
                    href="/signup"
                    className="pa-btn pa-btn--primary"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateWithTransition('/signup');
                    }}
                  >
                    Compare your evidence against this role &rarr;
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialCareerIntelligencePage;
