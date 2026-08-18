import React, { useState, useRef } from 'react';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';

export const IndependentReadingsField = () => {
  const [activeTab, setActiveTab] = useState('big-five');
  const tabRefs = useRef({});

  const { independentReadings } = PUBLIC_CONTENT.home;
  const activeModel = independentReadings.models.find((m) => m.id === activeTab) || independentReadings.models[0];

  const handleKeyDown = (event, currentId) => {
    const tabs = independentReadings.models.map((m) => m.id);
    const currentIndex = tabs.indexOf(currentId);
    let targetIndex = -1;

    if (event.key === 'ArrowRight') {
      targetIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      targetIndex = 0;
    } else if (event.key === 'End') {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== -1) {
      event.preventDefault();
      const nextId = tabs[targetIndex];
      setActiveTab(nextId);
      tabRefs.current[nextId]?.focus();
    }
  };

  return (
    <section className="pa-readings-section" aria-labelledby="readings-heading">
      <div className="pa-container">
        <header className="pa-readings-header">
          <h2 id="readings-heading">{independentReadings.title}</h2>
          <p>{independentReadings.body}</p>
        </header>

        <div className="pa-readings-theatre-grid">
          <div className="pa-readings-visual-wrap">
            <ResponsivePicture
              asset={MEDIA_ASSETS.a07}
              alt=""
              sizes="(max-width: 900px) 100vw, 45vw"
              objectPosition="50% 45%"
            />
          </div>

          <div className="pa-readings-tabs-wrap">
            <div
              className="pa-readings-tablist"
              role="tablist"
              aria-label="Independent Psychometric Models"
            >
              {independentReadings.models.map((model) => (
                <button
                  key={model.id}
                  ref={(el) => (tabRefs.current[model.id] = el)}
                  id={`tab-${model.id}`}
                  type="button"
                  role="tab"
                  className="pa-readings-tab"
                  aria-selected={activeTab === model.id}
                  aria-controls={`panel-${model.id}`}
                  tabIndex={activeTab === model.id ? 0 : -1}
                  onClick={() => setActiveTab(model.id)}
                  onKeyDown={(e) => handleKeyDown(e, model.id)}
                >
                  {model.name}
                </button>
              ))}
            </div>

            <div
              id={`panel-${activeModel.id}`}
              className="pa-readings-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeModel.id}`}
              tabIndex={0}
            >
              <h3>{activeModel.name}</h3>
              <p className="pa-readings-summary">{activeModel.summary}</p>

              {/* Big Five Lens */}
              {activeModel.id === 'big-five' && (
                <div className="pa-traits-list">
                  {activeModel.traits.map((trait) => (
                    <div key={trait.id} className="pa-trait-row">
                      <div className="pa-trait-info">
                        <span>{trait.name}</span>
                        <span className="pa-tabular">{trait.sample}%</span>
                      </div>
                      <div className="pa-trait-spectrum">
                        <div
                          className="pa-trait-fill"
                          style={{
                            width: `${trait.sample}%`,
                            backgroundColor: trait.color,
                          }}
                        />
                      </div>
                      <div className="pa-trait-ends">
                        <span>{trait.low}</span>
                        <span>{trait.high}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* RIASEC Lens */}
              {activeModel.id === 'riasec' && (
                <div className="pa-riasec-grid">
                  {activeModel.territories.map((item) => (
                    <div key={item.id} className="pa-riasec-card">
                      <div className="pa-riasec-name">{item.name}</div>
                      <div className="pa-riasec-desc">{item.description}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Work Values Lens */}
              {activeModel.id === 'work-values' && (
                <div className="pa-values-list">
                  {activeModel.values.map((v) => (
                    <div key={v.rank} className="pa-values-item">
                      <span className="pa-values-rank">{v.rank}</span>
                      <span className="pa-values-name">{v.name}</span>
                      <span className="pa-values-desc">{v.description}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Behavioral Signals Lens */}
              {activeModel.id === 'behavioral-signals' && (
                <div className="pa-values-list">
                  {activeModel.signals.map((s, idx) => (
                    <div key={idx} className="pa-values-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                      <span className="pa-values-rank" style={{ color: 'var(--pa-data-conscientiousness)' }}>
                        {s.source}
                      </span>
                      <span className="pa-values-name">{s.metric}</span>
                      <span className="pa-values-desc">{s.interpretation}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndependentReadingsField;
