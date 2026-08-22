import React from 'react';
import './ProvenanceTrace.css';

/**
 * ProvenanceTrace
 * Visual and accessible interactive provenance path connecting reading to source.
 */
export const ProvenanceTrace = ({
  stages = [
    { key: 'supplied', label: 'SUPPLIED', desc: 'Raw answer response' },
    { key: 'inferred', label: 'INFERRED', desc: 'Mapped evidence record' },
    { key: 'calculated', label: 'CALCULATED', desc: 'Deterministic score' },
    { key: 'compared', label: 'COMPARED', desc: 'Profile fit layer' },
    { key: 'assisted', label: 'ASSISTED', desc: 'Optional narrative coaching' },
    { key: 'controlled', label: 'CONTROLLED', desc: 'User export & erasure rights' },
  ],
  activeStage = 'supplied',
  onSelectStage = () => {},
  className = '',
}) => {
  return (
    <nav className={`pa-provenance-trace ${className}`} aria-label="Provenance sequence">
      <div className="pa-provenance-trace__spine" aria-hidden="true" />
      <ol className="pa-provenance-trace__list">
        {stages.map((stage, idx) => {
          const isActive = stage.key === activeStage;
          return (
            <li key={stage.key} className="pa-provenance-trace__item">
              <button
                type="button"
                className={`pa-provenance-trace__btn ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectStage(stage.key)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="pa-provenance-trace__node" aria-hidden="true" />
                <div className="pa-provenance-trace__meta">
                  <span className="pa-provenance-trace__label">{stage.label}</span>
                  <span className="pa-provenance-trace__desc">{stage.desc}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProvenanceTrace;
