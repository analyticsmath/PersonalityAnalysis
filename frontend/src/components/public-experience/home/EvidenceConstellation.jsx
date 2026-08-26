import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const CONSTELLATION_NODES = [
  {
    id: 'big-five',
    title: 'BIG FIVE',
    code: 'C 78 · ES 64',
    sourcePhrase: 'clarify constraints first',
    shortSentence: 'Continuous dimensional spectra measuring deliberate execution and emotional stability under ambiguity.',
    weightPct: 15,
    weightLabel: 'Personality Traits (15%)',
    spatialOffset: { x: '-28%', y: '-18%' },
  },
  {
    id: 'riasec',
    title: 'RIASEC',
    code: 'I 72 · C 68',
    sourcePhrase: 'smallest reversible step',
    shortSentence: 'Vocational interest mapping favoring investigative decomposition and systematic verification.',
    weightPct: 25,
    weightLabel: 'RIASEC Interests (25%)',
    spatialOffset: { x: '28%', y: '-22%' },
  },
  {
    id: 'work-values',
    title: 'WORK VALUES',
    code: 'Independence 84',
    sourcePhrase: 'clarify constraints first',
    shortSentence: 'High intrinsic motivation in high-autonomy working conditions with transparent quality benchmarks.',
    weightPct: 20,
    weightLabel: 'Work Values (20%)',
    spatialOffset: { x: '-24%', y: '26%' },
  },
  {
    id: 'signals',
    title: 'BEHAVIORAL SIGNALS',
    code: 'Iterative scoping',
    sourcePhrase: 'smallest reversible step',
    shortSentence: 'Observable behavioral strategy: decomposing ambiguous tasks into small reversible experiments.',
    weightPct: 25,
    weightLabel: 'Technical & Professional Skills (25%)',
    spatialOffset: { x: '26%', y: '28%' },
  },
];

export const EvidenceConstellation = () => {
  const [activeId, setActiveId] = useState('big-five');
  const [viewMode, setViewMode] = useState('constellation'); // 'constellation' | 'mass'
  const nodeRefs = useRef([]);
  const { prefersReducedMotion, isMobile } = usePublicCapabilities();

  const activeIdx = CONSTELLATION_NODES.findIndex((n) => n.id === activeId);

  const handleKeyDown = (e, idx) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (idx + 1) % CONSTELLATION_NODES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (idx - 1 + CONSTELLATION_NODES.length) % CONSTELLATION_NODES.length;
    }

    if (nextIdx !== idx) {
      setActiveId(CONSTELLATION_NODES[nextIdx].id);
      nodeRefs.current[nextIdx]?.focus();
    }
  };

  const activeNode = CONSTELLATION_NODES[activeIdx] || CONSTELLATION_NODES[0];

  return (
    <section
      className="pa-px-ch-deck pa-px-constellation-stage"
      aria-label="Evidence Constellation and Calibration"
    >
      <div className="pa-px-constellation-stage__inner">
        {/* Overhead Heading & View Mode Toggle */}
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

        {/* Spatial Organic Constellation Field (Non-Grid) */}
        {viewMode === 'constellation' ? (
          <div
            className="pa-px-spatial-constellation-arena"
            role="region"
            aria-label="Spatial Non-Grid Evidence Constellation"
          >
            {/* Ambient Background Environmental Photograph */}
            <div className="pa-px-constellation-media-underlay" aria-hidden="true">
              <PublicPicture
                assetKey="homeSituationDetail"
                alt="Contextual workbench environment"
              />
            </div>

            {/* Central Gravitational Source Anchor */}
            <div className="pa-px-constellation-central-core">
              <div className="pa-px-constellation-core-tag">
                <span>SOURCE ANCHOR</span>
                <span className="pa-px-illustrative-pill">Illustrative example</span>
              </div>
              <blockquote className="pa-px-constellation-core-quote">
                &ldquo;I clarify the constraints first, then choose the smallest reversible step.&rdquo;
              </blockquote>
            </div>

            {/* Orbiting Spatial Framework Nodes (Organic Staggered Positions) */}
            <div
              className="pa-px-spatial-orbit-plane"
              role="tablist"
              aria-label="Framework evidence readings"
            >
              {CONSTELLATION_NODES.map((node, idx) => {
                const isSelected = activeId === node.id;

                return (
                  <motion.div
                    key={node.id}
                    layout={!prefersReducedMotion}
                    ref={(el) => (nodeRefs.current[idx] = el)}
                    role="tab"
                    id={`constellation-tab-${node.id}`}
                    aria-controls={`constellation-panel-${node.id}`}
                    aria-selected={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    className={`pa-px-spatial-node pa-px-spatial-node--${node.id} ${isSelected ? 'pa-px-spatial-node--active' : ''}`}
                    onClick={() => {
                      setActiveId(node.id);
                      nodeRefs.current[idx]?.focus();
                    }}
                    onMouseEnter={() => setActiveId(node.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  >
                    <div className="pa-px-spatial-node__header">
                      <span className="pa-px-spatial-node__tag">{node.title}</span>
                      <span className="pa-px-spatial-node__code">{node.code}</span>
                    </div>

                    <div className="pa-px-spatial-node__phrase">
                      &ldquo;{node.sourcePhrase}&rdquo;
                    </div>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          id={`constellation-panel-${node.id}`}
                          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="pa-px-spatial-node__expansion"
                        >
                          <p className="pa-px-spatial-node__desc">
                            {node.shortSentence}
                          </p>
                          <div className="pa-px-spatial-node__weight">
                            Calibration factor: {node.weightLabel}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
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
                <span className="pa-px-mass-block__lbl">RIASEC Interests</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--25" style={{ flex: '25' }}>
                <span className="pa-px-mass-block__pct">25%</span>
                <span className="pa-px-mass-block__lbl">Technical & Professional Skills</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--20" style={{ flex: '20' }}>
                <span className="pa-px-mass-block__pct">20%</span>
                <span className="pa-px-mass-block__lbl">Work Values</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--15" style={{ flex: '15' }}>
                <span className="pa-px-mass-block__pct">15%</span>
                <span className="pa-px-mass-block__lbl">Personality Traits</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--10" style={{ flex: '10' }}>
                <span className="pa-px-mass-block__pct">10%</span>
                <span className="pa-px-mass-block__lbl">Educational Background</span>
              </div>
              <div className="pa-px-mass-block pa-px-mass-block--5" style={{ flex: '5' }}>
                <span className="pa-px-mass-block__pct">5%</span>
                <span className="pa-px-mass-block__lbl">Career Goals</span>
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
