import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

const CAREER_ENVIRONMENTS = [
  {
    id: 'complex-problems',
    title: 'Complex problems, clear ownership',
    asset: MEDIA_ASSETS_V7.careerComplex,
    description: 'Work rewards structured problem solving when responsibility is clear enough to follow a decision through.',
    alignment: 'High focus when technical boundaries and system ownership are clearly defined.',
    tension: 'Friction arises when accountability is fragmented across competing stakeholders.',
    develop: 'Opportunities to scale architectural judgment and robust error handling.',
    roles: ['Software Engineer', 'Backend Engineer', 'DevOps Engineer', 'Cybersecurity Analyst'],
  },
  {
    id: 'open-questions',
    title: 'Open questions, long focus',
    asset: MEDIA_ASSETS_V7.careerOpen,
    description: 'Work leaves room to investigate, model possibilities and stay with a difficult problem before committing an answer.',
    alignment: 'Strong fit for deep analytical inquiry and hypothesis validation without artificial haste.',
    tension: 'Discomfort when forced into rapid superficial delivery without time to understand underlying dynamics.',
    develop: 'Expanding probabilistic modeling and statistical evidence structuring.',
    roles: ['Data Analyst', 'Machine Learning Engineer', 'Control Systems Engineer'],
  },
  {
    id: 'shared-decisions',
    title: 'Shared decisions, frequent coordination',
    asset: MEDIA_ASSETS_V7.careerShared,
    description: 'Progress depends on communication, prioritisation and decisions that cross team boundaries.',
    alignment: 'Thrives when translating disparate perspectives into coherent strategic consensus.',
    tension: 'Energy drain in highly siloed environments where communication channels are blocked.',
    develop: 'Strengthening stakeholder synthesis and cross-functional momentum governance.',
    roles: ['Product Manager', 'Technical Program Manager', 'Customer Success Manager', 'Business Analyst'],
  },
  {
    id: 'visible-output',
    title: 'Visible output, material feedback',
    asset: MEDIA_ASSETS_V7.evidenceVisible,
    description: 'Work produces something observable that can be tested, refined or handled.',
    alignment: 'High engagement when craft quality and ergonomics can be directly evaluated.',
    tension: 'Frustration with purely theoretical initiatives that produce no tangible artifact.',
    develop: 'Deepening interaction ergonomics and sensory feedback precision.',
    roles: ['Frontend Engineer', 'UX Designer', 'Electrical Engineer', 'Automation Engineer', 'Embedded Engineer'],
  },
  {
    id: 'autonomy-standards',
    title: 'Autonomy, pace, personal standards',
    asset: MEDIA_ASSETS_V7.careerAutonomy,
    description: 'The environment gives substantial responsibility for how work is organised, judged and improved.',
    alignment: 'Excels under high trust, self-directed tempo, and uncompromised quality bars.',
    tension: 'Resistance to micromanagement or arbitrary bureaucratic constraints.',
    develop: 'Calibrating personal perfectionism against real-world iterative milestones.',
    roles: ['Software Engineer', 'Machine Learning Engineer', 'UX Designer', 'Power Systems Engineer'],
  },
];

const ROLE_CATALOGUE = [
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'Data Analyst',
  'Machine Learning Engineer',
  'Product Manager',
  'UX Designer',
  'DevOps Engineer',
  'Technical Program Manager',
  'Customer Success Manager',
  'Cybersecurity Analyst',
  'Electrical Engineer',
  'Power Systems Engineer',
  'Control Systems Engineer',
  'Automation Engineer',
  'Embedded Engineer',
  'Business Analyst',
];

export const EditorialCareerIntelligencePage = () => {
  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  const activeEnv = CAREER_ENVIRONMENTS[activeEnvIndex];

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        {/* ── Section 1: Opening Hero (Carbon) ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-carbon)',
            color: 'var(--pa-mineral)',
            paddingTop: 'calc(var(--pa-header-height) + 40px)',
            paddingBottom: 'clamp(60px, 8vh, 100px)',
          }}
          aria-label="Career Intelligence Overview"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / 8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h1 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-l)', lineHeight: 'var(--pa-display-l-lh)' }}>
                Career fit depends on the conditions around the work.
              </h1>
              <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: 'var(--pa-body-l)', color: 'var(--pa-pewter)', lineHeight: 1.5, maxWidth: '640px' }}>
                Personality Assessor compares your record with curated role profiles. Explore the conditions that can create alignment, tension and room to develop.
              </p>
              <p style={{ fontFamily: 'var(--pa-font-functional)', fontSize: '0.875rem', color: 'var(--pa-pewter)', opacity: 0.8 }}>
                Career intelligence is evidence for exploration, not a verdict.
              </p>
            </div>

            <div style={{ gridColumn: '9 / 13', height: '360px', overflow: 'hidden', borderRadius: 'var(--pa-radius-control)' }}>
              <picture>
                <source type="image/avif" srcSet={MEDIA_ASSETS_V7.careerComplex.avifSrcSet} sizes="(min-width: 901px) 33vw, 100vw" />
                <source type="image/webp" srcSet={MEDIA_ASSETS_V7.careerComplex.webpSrcSet} sizes="(min-width: 901px) 33vw, 100vw" />
                <img
                  src={MEDIA_ASSETS_V7.careerComplex.source}
                  alt={MEDIA_ASSETS_V7.careerComplex.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </section>

        {/* ── Section 2: Career Environment Explorer (Mineral) ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-mineral)',
            color: 'var(--pa-carbon)',
            padding: 'clamp(80px, 10vh, 120px) 0',
          }}
          aria-label="Career Environment Explorer"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / -1', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.1 }}>
                Five Work-Environment Lenses
              </h2>
              <p style={{ color: 'var(--pa-muted-light)', marginTop: '0.5rem', fontSize: '1.0625rem' }}>
                Select an environment to inspect the conditions that shape day-to-day engagement.
              </p>
            </div>

            {/* Selectable Condition Lenses */}
            <div style={{ gridColumn: '1 / 5', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {CAREER_ENVIRONMENTS.map((env, idx) => {
                const isSelected = activeEnvIndex === idx;
                return (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => setActiveEnvIndex(idx)}
                    style={{
                      textAlign: 'left',
                      padding: '1.25rem 1.5rem',
                      background: isSelected ? 'var(--pa-carbon)' : '#ECEFEA',
                      color: isSelected ? 'var(--pa-mineral)' : 'var(--pa-carbon)',
                      border: 'none',
                      borderRadius: 'var(--pa-radius-control)',
                      cursor: 'pointer',
                      transition: 'background 0.18s ease, color 0.18s ease',
                      fontFamily: 'var(--pa-font-functional)',
                      fontSize: '1rem',
                      fontWeight: isSelected ? 500 : 450,
                      lineHeight: 1.35,
                    }}
                    aria-pressed={isSelected}
                  >
                    {env.title}
                  </button>
                );
              })}
            </div>

            {/* Active Environment Detail & Inspection */}
            <div style={{ gridColumn: '6 / 13', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ width: '100%', height: '340px', overflow: 'hidden', borderRadius: 'var(--pa-radius-control)' }}>
                <picture>
                  <source type="image/avif" srcSet={activeEnv.asset.avifSrcSet} sizes="(min-width: 901px) 55vw, 100vw" />
                  <source type="image/webp" srcSet={activeEnv.asset.webpSrcSet} sizes="(min-width: 901px) 55vw, 100vw" />
                  <img
                    key={activeEnv.id}
                    src={activeEnv.asset.source}
                    alt={activeEnv.asset.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: '1.375rem', lineHeight: 1.4, color: 'var(--pa-carbon)', margin: 0 }}>
                  {activeEnv.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  <div style={{ padding: '1.25rem', background: '#ECEFEA', borderRadius: 'var(--pa-radius-control)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-oxblood)' }}>
                      Alignment
                    </span>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.45, marginTop: '0.35rem', marginBottom: 0 }}>
                      {activeEnv.alignment}
                    </p>
                  </div>

                  <div style={{ padding: '1.25rem', background: '#ECEFEA', borderRadius: 'var(--pa-radius-control)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-muted-light)' }}>
                      Tension
                    </span>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.45, marginTop: '0.35rem', marginBottom: 0 }}>
                      {activeEnv.tension}
                    </p>
                  </div>

                  <div style={{ padding: '1.25rem', background: '#ECEFEA', borderRadius: 'var(--pa-radius-control)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-carbon)' }}>
                      Develop
                    </span>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.45, marginTop: '0.35rem', marginBottom: 0 }}>
                      {activeEnv.develop}
                    </p>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--pa-muted-light)' }}>
                    Curated Role Examples
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {activeEnv.roles.map((role) => (
                      <span
                        key={role}
                        style={{
                          padding: '6px 12px',
                          background: 'var(--pa-carbon)',
                          color: 'var(--pa-mineral)',
                          fontSize: '0.875rem',
                          borderRadius: 'var(--pa-radius-control)',
                          fontFamily: 'var(--pa-font-functional)',
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Current Role Catalogue (Carbon) ── */}
        <section
          style={{
            backgroundColor: 'var(--pa-carbon)',
            color: 'var(--pa-mineral)',
            padding: 'clamp(80px, 10vh, 120px) 0',
          }}
          aria-label="Current Role Catalogue"
        >
          <div className="pa-v7-grid">
            <div style={{ gridColumn: '1 / -1', maxWidth: '800px', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--pa-font-editorial)', fontSize: 'var(--pa-display-m)', lineHeight: 1.1 }}>
                The current role catalogue
              </h2>
              <p style={{ color: 'var(--pa-pewter)', marginTop: '0.75rem', fontSize: '1.0625rem', lineHeight: 1.5 }}>
                Personality Assessor compares your evidence against 17 curated professional role profiles using deterministic multi-layer comparison logic.
              </p>
            </div>

            <div
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: '2rem',
                rowGap: '1.25rem',
                padding: '2rem 0',
              }}
            >
              {ROLE_CATALOGUE.map((role) => (
                <span
                  key={role}
                  style={{
                    fontFamily: 'var(--pa-font-editorial)',
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    color: 'var(--pa-mineral)',
                    opacity: 0.9,
                  }}
                >
                  {role}
                </span>
              ))}
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '2.5rem' }}>
              <Link to="/signup" className="pa-btn-primary-dark">
                Build a profile to compare careers
              </Link>
            </div>
          </div>
        </section>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialCareerIntelligencePage;
