import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicPicture } from '../media/PublicPicture';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const PROVENANCE_LAYERS = {
  supplied: {
    tag: 'SUPPLIED RAW INPUT',
    title: 'Participant Input',
    content: '“I clarify the constraints first, then choose the smallest reversible step.”',
    detail: 'Captured with verbatim situational context intact.',
  },
  inferred: {
    tag: 'INFERRED DIMENSIONS',
    title: 'Psychometric Vectors',
    content: 'Conscientiousness: 78 · Emotional Stability: 64 · Investigative: 72',
    detail: 'Continuous dimensional spectra with explicit validity checking.',
  },
  calculated: {
    tag: 'CALCULATED WEIGHTS',
    title: 'Deterministic Math',
    content: '25% RIASEC + 25% Skills + 20% Values + 15% Traits + 10% Ed + 5% Goals',
    detail: 'Fixed mathematical formula with zero black-box parameters.',
  },
  compared: {
    tag: 'OCCUPATIONAL BENCHMARKS',
    title: 'Career Benchmark Alignment',
    content: 'Machine Learning Engineer · Systems Architect · Data Analyst',
    detail: '17 canonical engineering, design, and analytical profiles.',
  },
  controlled: {
    tag: 'SOVEREIGN USER RIGHTS',
    title: 'Direct Data Sovereignty',
    content: 'Full JSON Export · AI Processing Notice · Hard Deletion Controls',
    detail: 'Permanent user ownership without third-party model training.',
  },
};

export const RecordTimeTrustFinale = () => {
  const [scrubValue, setScrubValue] = useState(0); // 0 (baseline) to 1 (later)
  const [activeTrustKey, setActiveTrustKey] = useState('calculated');
  const { prefersReducedMotion } = usePublicCapabilities();

  const isLater = scrubValue > 0.5;
  const currentLayer = PROVENANCE_LAYERS[activeTrustKey] || PROVENANCE_LAYERS.calculated;

  return (
    <div className="pa-px-time-trust-finale-movement">
      {/* ── PART A: Time Exposure — What Changed. What Held. ── */}
      <section className="pa-px-ch-progress-teaser pa-px-time-exposure-scene" aria-label="Longitudinal Time Exposure">
        <div className="pa-px-time-exposure-scene__inner">
          <header className="pa-px-time-exposure-scene__header">
            <h2 className="pa-px-time-exposure-scene__title">
              WHAT CHANGED. WHAT HELD.
            </h2>
            <p className="pa-px-time-exposure-scene__midpoint-sentence">
              The context changed. The underlying method held.
            </p>
          </header>

          <div className="pa-px-time-exposure-scene__arena">
            {/* Photographic Overlap Comparison Frame */}
            <div className="pa-px-time-exposure__media-frame" aria-live="polite">
              <div
                className="pa-px-time-exposure__media-layer"
                style={{
                  opacity: 1 - scrubValue,
                  transform: prefersReducedMotion ? 'none' : `scale(${1 - scrubValue * 0.03})`,
                  transition: 'opacity 180ms ease',
                }}
              >
                <PublicPicture
                  assetKey="homeSituationDetail"
                  alt="Baseline working context"
                />
              </div>

              <div
                className="pa-px-time-exposure__media-layer"
                style={{
                  opacity: scrubValue,
                  transform: prefersReducedMotion ? 'none' : `scale(${0.97 + scrubValue * 0.03})`,
                  transition: 'opacity 180ms ease',
                }}
              >
                <PublicPicture
                  assetKey="workworldAutonomy"
                  alt="Later shifted responsibility context"
                />
              </div>

              {/* Anchored Stable Evidence Tag */}
              <div className="pa-px-time-exposure__stable-badge">
                <span className="pa-px-time-exposure__stable-dot" />
                <span>Anchored: &ldquo;clarify constraints first&rdquo;</span>
              </div>
            </div>

            {/* Scrub Controller */}
            <div className="pa-px-time-exposure__controls">
              <div className="pa-px-time-exposure__labels">
                <button
                  type="button"
                  className={`pa-px-time-tag-btn ${!isLater ? 'pa-px-time-tag-btn--active' : ''}`}
                  onClick={() => setScrubValue(0)}
                >
                  BASELINE
                </button>
                <button
                  type="button"
                  className={`pa-px-time-tag-btn ${isLater ? 'pa-px-time-tag-btn--active' : ''}`}
                  onClick={() => setScrubValue(1)}
                >
                  LATER
                </button>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={scrubValue}
                onChange={(e) => setScrubValue(parseFloat(e.target.value))}
                className="pa-px-temporal-scrub-input"
                aria-label="Longitudinal time exposure scrub"
              />

              <div className="pa-px-time-exposure__state-readout">
                {isLater
                  ? 'Later responsibility context: Strategic scaling & team delegation'
                  : 'Baseline inquiry context: Direct analytical problem solving'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PART B: Trust Inspection — Show Me Where That Came From. ── */}
      <section className="pa-px-ch-trust-teaser pa-px-trust-inspection-scene" aria-label="Trust and Provenance Inspection">
        <div className="pa-px-trust-inspection-scene__inner">
          <header className="pa-px-trust-inspection-scene__header">
            <h2 className="pa-px-trust-inspection-scene__title">
              SHOW ME WHERE THAT CAME FROM.
            </h2>

            {/* 5 Provenance State Controls */}
            <div className="pa-px-trust-provenance-pills" role="tablist" aria-label="Provenance layers">
              {['supplied', 'inferred', 'calculated', 'compared', 'controlled'].map((key) => {
                const isSelected = activeTrustKey === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`pa-px-trust-pill-btn ${isSelected ? 'pa-px-trust-pill-btn--active' : ''}`}
                    onClick={() => setActiveTrustKey(key)}
                  >
                    {key.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </header>

          {/* Diagnostic Record Dominates 60–75% Viewport */}
          <div className="pa-px-trust-aperture-arena" aria-live="polite">
            <div className="pa-px-trust-aperture-media">
              <PublicPicture
                assetKey="trustDiagnostic"
                alt="Inspection diagnostic record layer"
              />

              {/* Dynamic Informational Layer Overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTrustKey}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="pa-px-trust-layer-overlay"
                >
                  <div className="pa-px-trust-layer-tag">{currentLayer.tag}</div>
                  <div className="pa-px-trust-layer-content">{currentLayer.content}</div>
                  <div className="pa-px-trust-layer-detail">{currentLayer.detail}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── PART C: Finale — Build A Profile That Keeps Its Evidence. ── */}
      <section className="pa-px-ch-finale pa-px-finale-scene" aria-label="Build Profile Finale">
        <div className="pa-px-finale-scene__inner">
          <div className="pa-px-finale-scene__media-plane">
            <PublicPicture
              assetKey="homeHeroContext"
              alt="Professional profile creation workspace"
            />
          </div>

          <div className="pa-px-finale-scene__content">
            <h2 className="pa-px-finale-scene__headline">
              BUILD A PROFILE THAT KEEPS ITS EVIDENCE.
            </h2>
            <div className="pa-px-finale-scene__actions">
              <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
                Build my profile
              </Link>
              <Link to="/how-it-works" className="pa-px-link-action">
                See how it works &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const ProgressTeaser = RecordTimeTrustFinale;
export const SourceLedgerTeaser = RecordTimeTrustFinale;
export const HomeFinale = RecordTimeTrustFinale;
export default RecordTimeTrustFinale;
