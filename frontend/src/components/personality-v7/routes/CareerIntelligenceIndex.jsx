import React, { useState } from 'react';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';

export const CareerIntelligenceIndex = () => {
  const data = PUBLIC_CONTENT.careerIntelligence;
  const worlds = PUBLIC_CONTENT.home.careerWorlds.worlds;
  const [activeWorldId, setActiveWorldId] = useState(worlds[0].id);

  const activeWorld = worlds.find((w) => w.id === activeWorldId) || worlds[0];

  const assetMap = {
    'systems-investigative': MEDIA_ASSETS_V7.a03,
    'product-expressive': MEDIA_ASSETS_V7.a04,
    'facilitation-relational': MEDIA_ASSETS_V7.a05,
    'strategic-directional': MEDIA_ASSETS_V7.a06,
    'operational-precision': MEDIA_ASSETS_V7.a02,
  };

  return (
    <div className="pa-v7-career-index-stage">
      {/* Route Header */}
      <div className="pa-v7-route-header" style={{ padding: '0 0 2rem 0' }}>
        <span className="pa-v7-eyebrow">The Environment Index</span>
        <h1 className="pa-v7-route-title" style={{ color: 'var(--pa-bone)' }}>
          {data.title}
        </h1>
        <p className="pa-v7-route-lead">
          {data.lead}
        </p>
      </div>

      {/* Interactive Environment Index Layout */}
      <div className="pa-v7-career-index__layout">
        {/* Navigation Index List */}
        <div className="pa-v7-career-index__nav" role="tablist" aria-label="Curated career environments">
          {worlds.map((w) => (
            <button
              key={w.id}
              role="tab"
              id={`world-tab-${w.id}`}
              aria-selected={activeWorldId === w.id}
              aria-controls={`world-panel-${w.id}`}
              className={`pa-v7-career-index__btn ${activeWorldId === w.id ? 'active' : ''}`}
              onClick={() => setActiveWorldId(w.id)}
            >
              <span className="pa-v7-career-index__btn-theme">{w.index} — {w.theme}</span>
              <span className="pa-v7-career-index__btn-title">{w.name}</span>
            </button>
          ))}
        </div>

        {/* Large Media & Evidence Display */}
        <div
          id={`world-panel-${activeWorld.id}`}
          role="tabpanel"
          aria-labelledby={`world-tab-${activeWorld.id}`}
          className="pa-v7-career-index__detail-card"
        >
          <div className="pa-v7-career-index__detail-media">
            <MediaPlane
              asset={assetMap[activeWorld.id]}
              priority={true}
              alt={`Environment: ${activeWorld.name}`}
            />
          </div>

          <div className="pa-v7-career-index__detail-body">
            <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
              Environment Blueprint
            </span>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--pa-bone)', lineHeight: 1.2 }}>
              {activeWorld.name}
            </h2>
            <p style={{ color: 'var(--pa-stone)', lineHeight: 1.5, margin: 0 }}>
              {activeWorld.statement}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', borderTop: '1px solid var(--pa-rule-dark)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
              <div>
                <span className="pa-v7-eyebrow" style={{ fontSize: '0.6875rem' }}>Fitting Condition</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)', margin: 0 }}>{activeWorld.whyItFits}</p>
              </div>
              <div>
                <span className="pa-v7-eyebrow" style={{ fontSize: '0.6875rem' }}>Stretch Tension</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)', margin: 0 }}>{activeWorld.whereItStretches}</p>
              </div>
              <div>
                <span className="pa-v7-eyebrow" style={{ fontSize: '0.6875rem' }}>Growth Priority</span>
                <p style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)', margin: 0 }}>{activeWorld.whatToStrengthen}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerIntelligenceIndex;
