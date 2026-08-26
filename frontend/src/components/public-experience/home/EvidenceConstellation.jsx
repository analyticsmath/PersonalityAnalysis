import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const CONSTELLATION_NODES = [
  {
    id: 'big-five',
    title: 'BIG FIVE',
    code: 'C 78',
    sourcePhrase: 'clarify the constraints first',
    shortSentence: 'Measures deliberate pacing, risk containment, and steady execution under ambiguity.',
    weightPct: 15,
    weightLabel: 'Traits 15%',
    geometryClass: 'pa-px-node--bigfive',
  },
  {
    id: 'riasec',
    title: 'RIASEC',
    code: 'I 72 · C 68',
    sourcePhrase: 'smallest reversible step',
    shortSentence: 'Investigative and conventional problem decomposition over speculation.',
    weightPct: 25,
    weightLabel: 'RIASEC 25%',
    geometryClass: 'pa-px-node--riasec',
  },
  {
    id: 'work-values',
    title: 'WORK VALUES',
    code: 'Independence 84',
    sourcePhrase: 'clarify constraints first',
    shortSentence: 'High motivation in autonomous environments with clear quality standards.',
    weightPct: 20,
    weightLabel: 'Values 20%',
    geometryClass: 'pa-px-node--values',
  },
  {
    id: 'signals',
    title: 'CAREER SIGNAL',
    code: 'Iterative scoping',
    sourcePhrase: 'smallest reversible step',
    shortSentence: 'Observable preference for small reversible experiments over large commitments.',
    weightPct: 25,
    weightLabel: 'Skills 25%',
    geometryClass: 'pa-px-node--signals',
  },
];

const SECONDARY_WEIGHTS = [
  { id: 'education', label: 'Education 10%', pct: 10 },
  { id: 'goals', label: 'Goals 5%', pct: 5 },
];

export const EvidenceConstellation = () => {
  const [activeId, setActiveId] = useState('big-five');
  const [viewMode, setViewMode] = useState('constellation'); // 'constellation' | 'mass'
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (idx + 1) % CONSTELLATION_NODES.length;
      setActiveId(CONSTELLATION_NODES[nextIdx].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (idx - 1 + CONSTELLATION_NODES.length) % CONSTELLATION_NODES.length;
      setActiveId(CONSTELLATION_NODES[prevIdx].id);
    }
  };

  const activeNode = CONSTELLATION_NODES.find((n) => n.id === activeId) || CONSTELLATION_NODES[0];

  return (
    <section
      className="pa-px-ch-deck pa-px-constellation-stage"
      aria-label="Evidence Constellation and Calibration"
    >
      <div className="pa-px-constellation-stage__inner">
        {/* Minimal Overhead Heading */}
        <header className="pa-px-constellation-stage__header">
          <h2 className="pa-px-constellation-stage__title">
            THE EVIDENCE BRANCHES. THE SOURCE STAYS.
          </h2>

          <div className="pa-px-constellation-mode-toggle" role="group" aria-label="View mode">
            <button
              type="button"
              className={`pa-px-mode-btn ${viewMode === 'constellation' ? 'pa-px-mode-btn--active' : ''}`}
              onClick={() => setViewMode('constellation')}
            >
              Constellation
            </button>
            <button
              type="button"
              className={`pa-px-mode-btn ${viewMode === 'mass' ? 'pa-px-mode-btn--active' : ''}`}
              onClick={() => setViewMode('mass')}
            >
              25/25/20/15/10/5 Mass
            </button>
          </div>
        </header>

        {/* Spatial Constellation Field */}
        {viewMode === 'constellation' ? (
          <div className="pa-px-constellation-field" role="region" aria-label="Spatial Evidence Constellation">
            {/* Background Environmental Anchor Plane */}
            <div className="pa-px-constellation-field__media-anchor" aria-hidden="true">
              <PublicPicture
                assetKey="homeSituationDetail"
                alt="Contextual process environment"
              />
            </div>

            {/* Central Source Protagonist Slip */}
            <div className="pa-px-constellation-center-source">
              <span className="pa-px-constellation-source-tag">SOURCE ANCHOR</span>
              <blockquote className="pa-px-constellation-source-text">
                &ldquo;I clarify the constraints first, then choose the smallest reversible step.&rdquo;
              </blockquote>
            </div>

            {/* Orbiting Framework Objects */}
            <div className="pa-px-constellation-orbit">
              {CONSTELLATION_NODES.map((node, idx) => {
                const isSelected = activeId === node.id;

                return (
                  <motion.article
                    key={node.id}
                    layout={!prefersReducedMotion}
                    className={`pa-px-constellation-node ${node.geometryClass} ${isSelected ? 'pa-px-constellation-node--active' : ''}`}
                    onClick={() => setActiveId(node.id)}
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    tabIndex={0}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    aria-expanded={isSelected}
                    aria-label={`${node.title} evidence reading`}
                  >
                    <div className="pa-px-constellation-node__header">
                      <span className="pa-px-constellation-node__title">{node.title}</span>
                      <span className="pa-px-constellation-node__code">{node.code}</span>
                    </div>

                    <div className="pa-px-constellation-node__phrase">
                      &ldquo;{node.sourcePhrase}&rdquo;
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="pa-px-constellation-node__expansion"
                        >
                          <p className="pa-px-constellation-node__sentence">
                            {node.shortSentence}
                          </p>
                          <div className="pa-px-constellation-node__weight-marker">
                            Weight factor: {node.weightLabel}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </div>
        ) : (
          /* Deterministic Career-Fit Weighted Mass View */
          <motion.div
            layout={!prefersReducedMotion}
            className="pa-px-mass-recomposition-view"
            role="region"
            aria-label="Proportional Deterministic Weight Mass"
          >
            <div className="pa-px-mass-recomposition__strip">
              <div className="pa-px-mass-block pa-px-mass-block--25" style={{ flex: '25' }}>
                <span className="pa-px-mass-block__pct">25%</span>
                <span className="pa-px-mass-block__lbl">RIASEC</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--25" style={{ flex: '25' }}>
                <span className="pa-px-mass-block__pct">25%</span>
                <span className="pa-px-mass-block__lbl">Skills</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--20" style={{ flex: '20' }}>
                <span className="pa-px-mass-block__pct">20%</span>
                <span className="pa-px-mass-block__lbl">Values</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--15" style={{ flex: '15' }}>
                <span className="pa-px-mass-block__pct">15%</span>
                <span className="pa-px-mass-block__lbl">Traits</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--10" style={{ flex: '10' }}>
                <span className="pa-px-mass-block__pct">10%</span>
                <span className="pa-px-mass-block__lbl">Education</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--5" style={{ flex: '5' }}>
                <span className="pa-px-mass-block__pct">5%</span>
                <span className="pa-px-mass-block__lbl">Goals</span>
              </div>
            </div>

            <div className="pa-px-mass-recomposition__legend">
              <span>Deterministic Calibration Formula</span>
              <span>Zero Black-Box Adjustments</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const EvidenceDeck = EvidenceConstellation;
export default EvidenceConstellation;
