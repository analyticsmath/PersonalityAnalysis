import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const ModelAtlas = () => {
  const data = PUBLIC_CONTENT.home.models;
  const [activeModelId, setActiveModelId] = useState(data.list[0].id);
  const activeModel = data.list.find((m) => m.id === activeModelId) || data.list[0];

  return (
    <section className="pa-px-ch-models pa-px-spatial-models-atlas" aria-label="Multi-Model Psychometric Atlas">
      <div className="pa-px-spatial-models__inner">
        <header className="pa-px-spatial-models__header">
          <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
            DE-CENTRALIZED INTERPRETATION &middot; 6 FRAMEWORKS
          </div>
          <h2 className="pa-px-heading-xl">{data.headline}</h2>
          <p className="pa-px-lead">
            No single psychometric model owns the full truth. The same source response is interpreted concurrently across six independent analytical dimensions.
          </p>
        </header>

        <div className="pa-px-spatial-models__arena">
          {/* Central Shared Evidence Protagonist Hub */}
          <div className="pa-px-spatial-models__center-hub">
            <div className="pa-px-data pa-px-spatial-models__center-kicker">
              SHARED EVIDENCE ANCHOR
            </div>
            <blockquote className="pa-px-spatial-models__center-quote">
              &ldquo;I clarify the constraints first, then choose the smallest reversible step.&rdquo;
            </blockquote>

            {/* Dynamic Connecting SVG Evidence Path */}
            <svg className="pa-px-spatial-models__dynamic-path" viewBox="0 0 200 60" fill="none" aria-hidden="true">
              <path
                d="M 100,0 C 100,30 50,40 10,55"
                stroke="var(--pa-evidence)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle cx="10" cy="55" r="3.5" fill="var(--pa-evidence)" />
            </svg>
          </div>

          {/* Spatial Typographic Model Field */}
          <div className="pa-px-spatial-models__typographic-field" role="tablist" aria-label="Psychometric Frameworks">
            {data.list.map((model) => {
              const isSelected = activeModelId === model.id;

              return (
                <div
                  key={model.id}
                  className={`pa-px-spatial-model-entry ${isSelected ? 'pa-px-spatial-model-entry--active' : ''}`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className="pa-px-spatial-model-trigger"
                    onClick={() => setActiveModelId(model.id)}
                    onMouseEnter={() => setActiveModelId(model.id)}
                    onFocus={() => setActiveModelId(model.id)}
                  >
                    <span className="pa-px-spatial-model-trigger__name">{model.name}</span>
                    <span className="pa-px-data pa-px-spatial-model-trigger__role">{model.role}</span>
                  </button>

                  {isSelected && (
                    <div className="pa-px-spatial-model-annotation" aria-live="polite">
                      <p className="pa-px-body">{model.description}</p>
                      <div className="pa-px-data pa-px-spatial-model-annotation__meta">
                        <span>Framework Status: Independent Vector</span>
                        <span>Trace: Provenance Verified</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelAtlas;
