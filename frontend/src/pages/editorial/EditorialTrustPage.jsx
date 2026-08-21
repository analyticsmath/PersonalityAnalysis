import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import MagneticTarget from '../../components/personality-v7/motion/MagneticTarget';
import { useCursor } from '../../components/personality-v7/motion/CursorCoordinator';
import { useRouteTransition } from '../../components/personality-v7/motion/RouteTransitionCoordinator';
import { MEDIA_ASSETS_V7 } from '../../content/personality-v7/mediaManifest';

const PROVENANCE_TIERS = [
  {
    id: 'supplied',
    num: '01',
    label: 'You Supplied',
    title: 'User Supplied Input',
    statement: 'Direct responses to contextual assessment scenarios, background details, and CV text when provided.',
    details: 'Raw inputs are stored directly tied to your account and never shared with third parties for advertising or tracking.',
  },
  {
    id: 'calculated',
    num: '02',
    label: 'System Calculated',
    title: 'Algorithmic Decomposition',
    statement: 'Big Five continuous trait coordinates, RIASEC vocational interest vectors, and work values ratings.',
    details: 'Calculated deterministically using documented psychometric scaling algorithms without black-box alterations.',
  },
  {
    id: 'compared',
    num: '03',
    label: 'System Compared',
    title: 'Multi-Layer Career Matching',
    statement: 'Alignment and tension ratings across 17 curated professional role benchmarks.',
    details: 'Deterministic weighted comparison across traits, interests, and environmental values.',
  },
  {
    id: 'assisted',
    num: '04',
    label: 'AI Assisted',
    title: 'Narrative Synthesis',
    statement: 'Contextual coaching commentary, reflective prompts, and narrative summaries.',
    details: 'AI assistance is supplementary. All primary scores, radar charts, and role matches exist independently.',
  },
  {
    id: 'controlled',
    num: '05',
    label: 'You Control',
    title: 'Account Agency & Data Rights',
    statement: 'Export all stored evidence, delete individual assessment stages, or delete your entire account.',
    details: 'Full self-service data management directly accessible via your account settings.',
  },
];

export const TrustContent = () => {
  const { navigateWithTransition } = useRouteTransition();
  const { setCursorLabel, clearCursorLabel, setApertureActive } = useCursor();
  const [activeTierIdx, setActiveTierIdx] = useState(0);
  const [apertureOpen, setApertureOpen] = useState(false);

  const activeTier = PROVENANCE_TIERS[activeTierIdx];
  const asset = MEDIA_ASSETS_V7.trustInspection;

  const handlePointerEnterInspection = () => {
    setCursorLabel('TRACE');
    setApertureActive(true);
  };

  const handlePointerLeaveInspection = () => {
    clearCursorLabel();
    setApertureActive(false);
  };

  return (
    <div className="pa-trust-page">
      {/* ── Section 1: Hero & Provenance Overview ── */}
      <section className="pa-trust-hero" data-tone="light">
        <div className="pa-v7-grid pa-trust-hero__grid">
          <div className="pa-trust-hero__copy">
            <span className="pa-provenance-tag">Inspection & Provenance Architecture</span>
            <h1 className="pa-display-hero pa-trust-hero__h1">
              Know what you supplied, what the system calculated, and what it added.
            </h1>
            <p className="pa-trust-hero__lead">
              Trust requires transparency. Personality Assessor separates user inputs from algorithmic calculations, role comparisons, and AI commentary so every conclusion remains verifiable.
            </p>
          </div>

          <div className="pa-trust-hero__media-wrap">
            <picture>
              <source type="image/avif" srcSet={asset.avifSrcSet} sizes="(min-width: 901px) 40vw, 100vw" />
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes="(min-width: 901px) 40vw, 100vw" />
              <img
                src={asset.source}
                alt={asset.alt}
                width={asset.intrinsicDimensions.width}
                height={asset.intrinsicDimensions.height}
                className="pa-trust-hero__img"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </section>

      {/* ── Section 2: Five Provenance Layers Around One Evidence Record ── */}
      <section className="pa-trust-tiers-section" data-tone="dark">
        <div className="pa-v7-grid pa-trust-tiers-section__grid">
          <div className="pa-trust-tiers-section__header">
            <span className="pa-provenance-tag" style={{ color: 'var(--pa-mineral)' }}>
              Provenance Tiers
            </span>
            <h2 className="pa-heading-major pa-trust-tiers-section__h2">
              Five Verifiable Layers
            </h2>
            <p className="pa-trust-tiers-section__lead">
              Select any tier to trace how information originates, transforms, and remains under your agency.
            </p>
          </div>

          {/* Tier Selection Tabs */}
          <div className="pa-trust-tiers-tabs">
            {PROVENANCE_TIERS.map((tier, idx) => {
              const isSelected = activeTierIdx === idx;
              return (
                <MagneticTarget key={tier.id} maxDisplacement={6}>
                  <button
                    type="button"
                    onClick={() => setActiveTierIdx(idx)}
                    onMouseEnter={() => setCursorLabel('TRACE')}
                    onMouseLeave={() => clearCursorLabel()}
                    className={`pa-trust-tab-btn ${isSelected ? 'pa-trust-tab-btn--active' : ''}`}
                    aria-pressed={isSelected}
                  >
                    <span className="pa-trust-tab-btn__num">{tier.num}</span>
                    <span className="pa-trust-tab-btn__label">{tier.label}</span>
                  </button>
                </MagneticTarget>
              );
            })}
          </div>

          {/* Active Tier Display & Connected Physical SVG Trajectory */}
          <div className="pa-trust-tier-display">
            <svg className="pa-trust-tier-svg" viewBox="0 0 800 200" aria-hidden="true">
              <path
                d="M 50 100 Q 200 40 400 100 T 750 100"
                fill="none"
                stroke="#642832"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            <div className="pa-trust-tier-display__card">
              <span className="pa-provenance-tag" style={{ color: 'var(--pa-oxblood)' }}>
                {activeTier.num} • {activeTier.title}
              </span>
              <h3 className="pa-trust-tier-display__title">{activeTier.label}</h3>
              <p className="pa-trust-tier-display__statement">{activeTier.statement}</p>
              <p className="pa-trust-tier-display__details">{activeTier.details}</p>

              {activeTier.id === 'controlled' && (
                <div className="pa-trust-tier-display__action">
                  <Link
                    to="/account/privacy"
                    className="pa-link-text"
                    style={{ color: 'var(--pa-mineral)', textDecoration: 'underline' }}
                  >
                    Inspect your account privacy controls &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Interactive Aperture Mask Inspection ── */}
      <section className="pa-trust-inspection-aperture-section" data-tone="light">
        <div className="pa-v7-grid pa-trust-inspection-aperture-section__grid">
          <div className="pa-trust-aperture-header">
            <span className="pa-provenance-tag">Interactive Provenance Mask</span>
            <h2 className="pa-heading-major">Trace Any Record Reading</h2>
            <p className="pa-trust-aperture-lead">
              Hover with fine pointer or toggle the button to inspect the underlying calculation and comparison metadata.
            </p>
          </div>

          <div
            className={`pa-inspection-surface ${apertureOpen ? 'pa-inspection-surface--revealed' : ''}`}
            onMouseEnter={handlePointerEnterInspection}
            onMouseLeave={handlePointerLeaveInspection}
            tabIndex="0"
            role="region"
            aria-label="Inspectable reading with provenance layers"
          >
            <div className="pa-inspection-surface__foreground">
              <span className="pa-provenance-tag">Visible Reading</span>
              <p className="pa-evidence-quote pa-inspection-surface__quote">
                “Prefers structured problem solving and clear accountability.”
              </p>
            </div>

            <div className="pa-inspection-surface__revealed-grid">
              <div className="pa-provenance-tier">
                <span className="pa-provenance-tier__tag">01 • You Supplied</span>
                <p className="pa-provenance-tier__value">Response to deadline scenario in Phase 1.</p>
              </div>
              <div className="pa-provenance-tier">
                <span className="pa-provenance-tier__tag">02 • Calculated</span>
                <p className="pa-provenance-tier__value">High Conscientiousness coordinate (0.82).</p>
              </div>
              <div className="pa-provenance-tier">
                <span className="pa-provenance-tier__tag">03 • Compared</span>
                <p className="pa-provenance-tier__value">High alignment with Backend & DevOps profiles.</p>
              </div>
              <div className="pa-provenance-tier">
                <span className="pa-provenance-tier__tag">04 • AI Assisted</span>
                <p className="pa-provenance-tier__value">Optional narrative coaching tips.</p>
              </div>
            </div>
          </div>

          <div className="pa-trust-aperture-actions">
            <button
              type="button"
              className="pa-btn-primary-light"
              onClick={() => setApertureOpen((prev) => !prev)}
              aria-pressed={apertureOpen}
            >
              {apertureOpen ? 'Hide provenance metadata' : 'Inspect provenance metadata'}
            </button>

            <MagneticTarget>
              <a
                href="/privacy"
                className="pa-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigateWithTransition('/privacy');
                }}
              >
                Read our privacy document &rarr;
              </a>
            </MagneticTarget>
          </div>
        </div>
      </section>
    </div>
  );
};

export const EditorialTrustPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        <TrustContent />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialTrustPage;
