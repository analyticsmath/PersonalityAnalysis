import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const PROVENANCE_STATES = [
  {
    id: 'supplied',
    name: 'Supplied',
    tag: 'RAW INPUT & CONTEXT',
    headline: 'Original Participant Response',
    summary: 'Captured with situational context intact rather than collapsed into an opaque number.',
    rawEvidence: '“I clarify the constraints first, then choose the smallest reversible step.”',
    provenanceMeta: 'Prompt: "How do you make progress under ambiguity?" · Illustrative baseline',
    isIllustrative: true,
  },
  {
    id: 'inferred',
    name: 'Inferred',
    tag: 'PSYCHOMETRIC VECTORS',
    headline: 'Continuous Trait Dimensions',
    summary: 'Independent psychometric vectors evaluated on continuous spectra with explicit validity state checks.',
    rawEvidence: 'Conscientiousness: 78 · Emotional Stability: 64 · Investigative: 72 · Conventional: 68',
    provenanceMeta: 'Validity State: valid · Independent multi-model evaluation',
  },
  {
    id: 'calculated',
    name: 'Calculated',
    tag: 'DETERMINISTIC FORMULA',
    headline: 'Deterministic Career Calibration',
    summary: 'Fixed mathematical career-fit weights assembled without black box adjustments or hidden ML weights.',
    rawEvidence: 'RIASEC Interests (25%) + Technical Skills (25%) + Work Values (20%) + Personality Traits (15%) + Education (10%) + Goals (5%)',
    provenanceMeta: 'Formula Type: Deterministic Linear Model · Zero black-box parameters',
  },
  {
    id: 'compared',
    name: 'Compared',
    tag: 'OCCUPATIONAL BENCHMARKS',
    headline: 'Occupational Field Alignment',
    summary: 'Benchmarking against 17 canonical engineering, design, and analytical profiles in careers corpus.',
    rawEvidence: 'Aligned Profiles: Software Engineer, Systems Architect, Machine Learning Engineer',
    provenanceMeta: 'Benchmark Corpus: 17 Canonical Profiles · Profile Growth Potential metric',
  },
  {
    id: 'controlled',
    name: 'Controlled',
    tag: 'SOVEREIGN USER RIGHTS',
    headline: 'Permanent Data Sovereignty',
    summary: 'Direct user sovereignty with JSON export, AI transparency notice, and hard deletion of stored records.',
    rawEvidence: 'Sovereign Controls: Full JSON Export · AI Processing Notice · Hard Deletion of Account & Records',
    provenanceMeta: 'Zero third-party model training · Sovereign ownership · Direct controls in Settings',
  },
];

export const TrustSourceInspection = () => {
  const data = PUBLIC_CONTENT.trust;
  const [activeStateId, setActiveStateId] = useState('supplied');
  const tabRefs = useRef([]);
  const { prefersReducedMotion } = usePublicCapabilities();

  const activeIdx = PROVENANCE_STATES.findIndex((s) => s.id === activeStateId);
  const current = PROVENANCE_STATES[activeIdx] || PROVENANCE_STATES[0];

  const handleKeyDown = (e, idx) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (idx + 1) % PROVENANCE_STATES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (idx - 1 + PROVENANCE_STATES.length) % PROVENANCE_STATES.length;
    }

    if (nextIdx !== idx) {
      setActiveStateId(PROVENANCE_STATES[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <div className="pa-px-trust-page" data-route="trust">
      <header className="pa-px-trust-hero">
        <h1 className="pa-px-trust-hero__headline">SHOW ME WHERE THAT CAME FROM.</h1>
        <p className="pa-px-trust-hero__support">
          Inspect what you supplied, what the system inferred, and what was calculated.
        </p>
      </header>

      {/* Flagship Tactile Multi-Layer Aperture Stage (Dominant Visual Record, No Generic White Card) */}
      <section className="pa-px-trust-chain pa-px-aperture-chain-stage" aria-label="Evidence Chain of Custody">
        {/* Optical Aperture Layer Controls (Roving Tabindex) */}
        <div className="pa-px-aperture-selector" role="tablist" aria-label="Provenance layers">
          {PROVENANCE_STATES.map((s, idx) => {
            const isSelected = activeStateId === s.id;
            return (
              <button
                key={s.id}
                ref={(el) => (tabRefs.current[idx] = el)}
                type="button"
                role="tab"
                id={`trust-tab-${s.id}`}
                aria-controls={`trust-tabpanel-${s.id}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`pa-px-aperture-step-btn ${isSelected ? 'pa-px-aperture-step-btn--active' : ''}`}
                onClick={() => {
                  setActiveStateId(s.id);
                  tabRefs.current[idx]?.focus();
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span className="pa-px-aperture-step-num">0{idx + 1}.</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Multi-Layer Diagnostic Record Field (60–75% Viewport Presence) */}
        <div
          id={`trust-tabpanel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`trust-tab-${current.id}`}
          className="pa-px-aperture-record-viewport"
          data-transition-actor="trust-evidence-record"
          aria-live="polite"
        >
          <div className="pa-px-aperture-dominant-media">
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Diagnostic measurement instrument calibration"
              priority={true}
            />

            {/* In-Frame Aperture Reticle Layer */}
            <div className="pa-px-aperture-reticle-badge">
              <span>LAYER 0{activeIdx + 1} &middot; {current.name.toUpperCase()}</span>
            </div>
          </div>

          {/* Genuine Dynamic Information Aperture Sheet */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="pa-px-aperture-data-sheet"
            >
              <div className="pa-px-aperture-data-header">
                <span className="pa-px-aperture-data-tag">{current.tag}</span>
                {current.isIllustrative && (
                  <span className="pa-px-illustrative-pill">Illustrative example</span>
                )}
              </div>

              <h2 className="pa-px-aperture-data-title">{current.headline}</h2>
              <p className="pa-px-aperture-data-summary">{current.summary}</p>

              <div className="pa-px-aperture-raw-block">
                <div className="pa-px-aperture-raw-lbl">LAYER RECORD OUTPUT</div>
                <p className="pa-px-aperture-raw-text">{current.rawEvidence}</p>
                <div className="pa-px-aperture-raw-meta">{current.provenanceMeta}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Quiet Sovereign Rights Ledger */}
      <section className="pa-px-trust-rights pa-px-sovereign-ledger" aria-label="Sovereign Data Rights and Ledger">
        <header className="pa-px-sovereign-ledger__header">
          <h2 className="pa-px-sovereign-ledger__title">Sovereign Data Rights & Governance</h2>
          <p className="pa-px-sovereign-ledger__lead">
            You maintain permanent legal and technical ownership over your assessment record.
          </p>
        </header>

        <div className="pa-px-sovereign-ledger__list" role="list">
          {data.rightsActions.map((action, idx) => (
            <article key={action.id} className="pa-px-sovereign-ledger__row" role="listitem">
              <div className="pa-px-sovereign-ledger__num">
                0{idx + 1}
              </div>
              <div className="pa-px-sovereign-ledger__body">
                <h3 className="pa-px-sovereign-ledger__action-title">{action.label}</h3>
                <p className="pa-px-sovereign-ledger__desc">{action.description}</p>
              </div>
              <div className="pa-px-sovereign-ledger__action">
                <Link to={action.link} className="pa-px-link-action">
                  Access in Settings &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export const TrustInspectionStage = TrustSourceInspection;
export default TrustSourceInspection;
