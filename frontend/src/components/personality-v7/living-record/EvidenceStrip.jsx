import React from 'react';
import './EvidenceStrip.css';

/**
 * EvidenceStrip
 * The persistent visual protagonist of The Living Record.
 *
 * Variants:
 * - 'source': Raw illustrative human response with retained source notch
 * - 'branched': Strip with visible evidence branch registration points
 * - 'compared': Context comparison state with condition relationship labels
 * - 'dated': Longitudinal assessment record with date badge
 * - 'inspect': Interactive inspection state with traceable provenance fields
 * - 'new-record': Blank / setup record used during registration
 * - 'transition': Minimal continuous handoff object across routes
 */
export const EvidenceStrip = ({
  quote = '“I clarify responsibilities before committing work.”',
  sourceType = 'answer',
  sourceLabel = 'SOURCE RETAINED',
  eyebrow = 'ILLUSTRATIVE RESPONSE',
  variant = 'source', // 'source' | 'branched' | 'compared' | 'dated' | 'inspect' | 'new-record' | 'transition'
  theme = 'mineral', // 'mineral' | 'carbon'
  dateLabel = null,
  conditionLabel = null,
  accumulatedMarks = false,
  provenanceData = null,
  isInspecting = false,
  onToggleInspect = null,
  className = '',
  style = {},
  notchPosition = 'left', // 'left' | 'top'
  id = undefined,
}) => {
  return (
    <div
      id={id}
      className={`pa-evidence-strip pa-evidence-strip--${variant} pa-evidence-strip--theme-${theme} ${
        accumulatedMarks ? 'pa-evidence-strip--accumulated' : ''
      } ${className}`}
      style={style}
      role="region"
      aria-label={`Living record specimen: ${eyebrow || 'Response'}`}
    >
      {/* Oxblood Registration Notch / Edge */}
      <div
        className={`pa-evidence-strip__notch pa-evidence-strip__notch--${notchPosition}`}
        aria-hidden="true"
      />

      <div className="pa-evidence-strip__body">
        <div className="pa-evidence-strip__header">
          {eyebrow && <span className="pa-evidence-strip__eyebrow">{eyebrow}</span>}
          {dateLabel && <span className="pa-evidence-strip__date-badge">{dateLabel}</span>}
          {conditionLabel && (
            <span className="pa-evidence-strip__condition-badge">{conditionLabel}</span>
          )}
        </div>

        {variant !== 'new-record' ? (
          <blockquote className="pa-evidence-strip__quote">
            <span className="pa-evidence-strip__quote-text">{quote}</span>
          </blockquote>
        ) : (
          <div className="pa-evidence-strip__new-record-placeholder">
            <span className="pa-evidence-strip__new-title">Establishing first record</span>
            <span className="pa-evidence-strip__new-sub">
              Your retained responses will generate evidence without erasing earlier context.
            </span>
          </div>
        )}

        <div className="pa-evidence-strip__footer">
          <span className="pa-evidence-strip__source-label">
            {sourceLabel || (sourceType ? `SOURCE: ${sourceType.toUpperCase()}` : 'SOURCE RETAINED')}
          </span>

          {accumulatedMarks && (
            <div className="pa-evidence-strip__marks-summary" aria-label="Accumulated evidence traces">
              <span className="pa-evidence-strip__mark-tag">BIG FIVE</span>
              <span className="pa-evidence-strip__mark-tag">RIASEC</span>
              <span className="pa-evidence-strip__mark-tag">VALUES</span>
              <span className="pa-evidence-strip__mark-tag">SIGNALS</span>
            </div>
          )}

          {variant === 'inspect' && onToggleInspect && (
            <button
              type="button"
              className="pa-evidence-strip__inspect-toggle"
              onClick={onToggleInspect}
              aria-expanded={isInspecting}
            >
              {isInspecting ? 'CLOSE TRACE' : 'TRACE SOURCE'}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Provenance Data Layer (Trust / Inspection Mode) */}
      {variant === 'inspect' && provenanceData && isInspecting && (
        <div className="pa-evidence-strip__provenance-drawer" aria-live="polite">
          <div className="pa-evidence-strip__provenance-grid">
            <div className="pa-evidence-strip__prov-item">
              <span className="pa-evidence-strip__prov-key">SOURCE</span>
              <span className="pa-evidence-strip__prov-val">{provenanceData.source || 'answer'}</span>
            </div>
            <div className="pa-evidence-strip__prov-item">
              <span className="pa-evidence-strip__prov-key">SOURCE ID</span>
              <span className="pa-evidence-strip__prov-val">
                {provenanceData.sourceId || 'initiative-pattern-intermediate'}
              </span>
            </div>
            <div className="pa-evidence-strip__prov-item">
              <span className="pa-evidence-strip__prov-key">DIMENSION</span>
              <span className="pa-evidence-strip__prov-val">{provenanceData.dimension || 'bigFive'}</span>
            </div>
            <div className="pa-evidence-strip__prov-item">
              <span className="pa-evidence-strip__prov-key">KEY</span>
              <span className="pa-evidence-strip__prov-val">
                {provenanceData.key || 'conscientiousness'}
              </span>
            </div>
            <div className="pa-evidence-strip__prov-item">
              <span className="pa-evidence-strip__prov-key">DIRECTION</span>
              <span className="pa-evidence-strip__prov-val">
                {provenanceData.direction || 'positive'}
              </span>
            </div>
            <div className="pa-evidence-strip__prov-item">
              <span className="pa-evidence-strip__prov-key">SCORING SOURCE</span>
              <span className="pa-evidence-strip__prov-val">
                {provenanceData.scoringSource || 'deterministic'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceStrip;
