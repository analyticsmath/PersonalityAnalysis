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
    summary: 'Captured with situational context intact rather than reduced to an opaque number.',
    rawEvidence: '“I clarify the constraints first, then choose the smallest reversible step.”',
    provenanceMeta: 'Prompt: "How do you make progress under ambiguity?" · Source ID: src-clause-7729',
  },
  {
    id: 'inferred',
    name: 'Inferred',
    tag: 'PSYCHOMETRIC VECTORS',
    headline: 'Continuous Trait Dimensions',
    summary: 'Independent psychometric vectors evaluated on continuous spectra with explicit validity state checks.',
    rawEvidence: 'Conscientiousness: 78 · Emotional Stability: 64 · Investigative: 72 · Conventional: 68',
    provenanceMeta: 'Validity State: valid · Independent dimensional model evaluation',
  },
  {
    id: 'calculated',
    name: 'Calculated',
    tag: 'DETERMINISTIC FORMULA',
    headline: 'Deterministic Career Calibration',
    summary: 'Fixed mathematical career-fit weights assembled without black box adjustments or hidden ML weights.',
    rawEvidence: 'RIASEC (25%) + Skills (25%) + Values (20%) + Traits (15%) + Education (10%) + Goals (5%)',
    provenanceMeta: 'Formula Type: Deterministic Linear Model · Zero hidden adjustments',
  },
  {
    id: 'compared',
    name: 'Compared',
    tag: 'OCCUPATIONAL BENCHMARKS',
    headline: 'Occupational Field Alignment',
    summary: 'Comparison against 17 canonical engineering, design, and analytical benchmark profiles.',
    rawEvidence: 'Aligned Profiles: Software Engineer, Systems Architect, Machine Learning Engineer',
    provenanceMeta: 'Benchmark Corpus: 17 Canonical Profiles · Profile Growth Potential metric',
  },
  {
    id: 'controlled',
    name: 'Controlled',
    tag: 'SOVEREIGN USER RIGHTS',
    headline: 'Permanent Data Sovereignty',
    summary: 'Direct user sovereignty with JSON export, AI transparency notice, and hard deletion of stored records.',
    rawEvidence: 'Sovereign Controls: Full JSON Export · AI Audit Notice · Hard Deletion of Account & Records',
    provenanceMeta: 'Zero third-party AI training · AES-256 encrypted at rest · TLS 1.3 in transit',
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
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (idx + 1) % PROVENANCE_STATES.length;
    } else if (e.key === 'ArrowLeft') {
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

      {/* Flagship Tactile Aperture Inspection Stage (60–75% Dominant Visual Record) */}
      <section className="pa-px-trust-chain pa-px-aperture-chain-stage" aria-label="Evidence Chain of Custody">
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
                onClick={() => setActiveStateId(s.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span className="pa-px-aperture-step-num">0{idx + 1}.</span>
                <span>{s.name}</span>
              </button>
            );
          })}
        </div>

        {/* Large Inspectable Diagnostic Record */}
        <div
          id={`trust-tabpanel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`trust-tab-${current.id}`}
          className="pa-px-aperture-inspector-card"
          data-transition-actor="trust-evidence-record"
          aria-live="polite"
        >
          <div className="pa-px-aperture-inspector__content">
            <div className="pa-px-aperture-inspector__tag">
              {current.tag} (0{activeIdx + 1}/05)
            </div>
            <h2 className="pa-px-aperture-inspector__headline">
              {current.headline}
            </h2>
            <p className="pa-px-aperture-inspector__summary">
              {current.summary}
            </p>

            <div className="pa-px-aperture-evidence-box">
              <div className="pa-px-aperture-evidence-box__lbl">
                RECORD LAYER OUTPUT
              </div>
              <p className="pa-px-aperture-evidence-box__text">
                {current.rawEvidence}
              </p>
              <div className="pa-px-aperture-evidence-box__meta">
                {current.provenanceMeta}
              </div>
            </div>
          </div>

          <div className="pa-px-aperture-inspector__media-frame">
            <PublicPicture
              assetKey="trustDiagnostic"
              alt="Diagnostic measurement instrument calibration"
              priority={true}
            />

            {/* Dynamic Informational Reticle Layer */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="pa-px-aperture-reticle-overlay"
              >
                <span className="pa-px-aperture-reticle__badge">
                  LAYER 0{activeIdx + 1} &middot; {current.name.toUpperCase()}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
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
