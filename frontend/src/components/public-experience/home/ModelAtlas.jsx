import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const ModelAtlas = () => {
  const data = PUBLIC_CONTENT.home.models;
  const [activeModel, setActiveModel] = useState(data.list[0]);

  return (
    <section className="pa-px-ch-models" aria-label="Multi-Model Psychometric Atlas">
      <div className="pa-px-ch-models__inner">
        <div className="pa-px-models-list">
          <h2 className="pa-px-heading-xl" style={{ marginBottom: '24px' }}>
            {data.headline}
          </h2>
          <p className="pa-px-body-lg" style={{ marginBottom: '24px' }}>
            No single psychometric framework captures the whole person. Personality Assessor maps evidence across six independent models.
          </p>

          <nav aria-label="Psychometric models">
            {data.list.map((model) => (
              <button
                key={model.id}
                type="button"
                className={`pa-px-model-btn ${activeModel.id === model.id ? 'pa-px-model-btn--active' : ''}`}
                onClick={() => setActiveModel(model)}
                onMouseEnter={() => setActiveModel(model)}
                onFocus={() => setActiveModel(model)}
              >
                {model.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="pa-px-model-display" aria-live="polite">
          <span className="pa-px-model-display__tag">{activeModel.role}</span>
          <h3 className="pa-px-model-display__title">{activeModel.name}</h3>
          <p className="pa-px-model-display__desc">{activeModel.description}</p>
          <div className="pa-px-data">
            <svg className="pa-px-evidence-path" width="16" height="16" viewBox="0 0 16 16" style={{ verticalAlign: 'middle', marginRight: '6px' }} aria-hidden="true">
              <circle cx="8" cy="8" r="4" fill="var(--pa-evidence)" />
            </svg>
            Evidence Trace: Active multi-model layer
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelAtlas;
