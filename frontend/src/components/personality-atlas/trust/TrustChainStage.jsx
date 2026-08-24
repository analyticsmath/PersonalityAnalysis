import React, { useState } from 'react';
import ResponseFragment from '../fragments/ResponseFragment';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const TrustChainStage = () => {
  const content = PUBLIC_CONTENT.trust;
  const states = content.chainStates;
  const [activeStateIndex, setActiveStateIndex] = useState(0);

  const currentState = states[activeStateIndex] || states[0];

  return (
    <section
      className="pa-atlas-trust-chain"
      style={{
        padding: 'calc(var(--atlas-header-height-desktop) + 40px) var(--atlas-outer-gutter) 80px',
        backgroundColor: 'var(--atlas-paper)',
        color: 'var(--atlas-ink)',
        position: 'relative',
      }}
      aria-label="Chain of Custody"
    >
      <div style={{ maxWidth: '48rem', marginBottom: '48px' }}>
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-field)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>
          EVIDENCE PROVENANCE
        </span>
        <h1 className="pa-atlas-heading-xl" style={{ color: 'var(--atlas-ink)', marginBottom: '16px' }}>
          {content.hero.headline}
        </h1>
        <p className="pa-atlas-body-lg" style={{ color: 'var(--atlas-ink)', opacity: 0.85 }}>
          {content.hero.lead}
        </p>
      </div>

      {/* Main Interactive Provenance Chain Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: 'var(--atlas-column-gap)',
          alignItems: 'start',
          marginBottom: '64px',
        }}
      >
        {/* Left Column: Active Provenance Node & Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Central Response Fragment with contextual dynamic status */}
          <div
            style={{
              backgroundColor: 'var(--atlas-fog)',
              padding: '28px 32px',
              borderRadius: 'var(--atlas-radius-sm)',
            }}
          >
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-field)', fontSize: '0.74rem' }}>
              PROVENANCE STATUS: {currentState.title.toUpperCase()}
            </span>
            <div style={{ margin: '14px 0' }}>
              <ResponseFragment
                variant="response"
                text="“I clarify responsibilities before committing work.”"
                sourceId="0x8F4A"
                date="2026-08"
                style={{ color: 'var(--atlas-ink)' }}
              />
            </div>
            <p className="pa-atlas-body" style={{ color: 'var(--atlas-ink)', opacity: 0.88, fontSize: '0.96rem' }}>
              {currentState.description}
            </p>
          </div>

          {/* Diagnostic Instrument Media Detail */}
          <div
            style={{
              height: '240px',
              borderRadius: 'var(--atlas-radius-sm)',
              overflow: 'hidden',
              opacity: 0.85,
            }}
          >
            <AtlasResponsiveImage
              asset={MEDIA_ASSETS_ATLAS.trustDiagnostic}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Right Column: Chain State Selectors */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          role="tablist"
          aria-label="Provenance Chain Stages"
        >
          <span className="pa-atlas-mono" style={{ color: 'var(--atlas-muted)', fontSize: '0.74rem', marginBottom: '8px' }}>
            INTERACTIVE CHAIN NODES:
          </span>

          {states.map((st, idx) => {
            const isSelected = idx === activeStateIndex;
            return (
              <button
                key={st.id}
                onClick={() => setActiveStateIndex(idx)}
                style={{
                  textAlign: 'left',
                  padding: '16px 20px',
                  backgroundColor: isSelected ? 'var(--atlas-field)' : 'var(--atlas-fog)',
                  color: isSelected ? 'var(--atlas-paper)' : 'var(--atlas-ink)',
                  borderRadius: 'var(--atlas-radius-xs)',
                  transition: 'all 180ms ease',
                  transform: isSelected ? 'translateX(6px)' : 'none',
                }}
                role="tab"
                aria-selected={isSelected}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--atlas-font-sans)', fontWeight: 540, fontSize: '1.05rem' }}>
                    {st.title}
                  </span>
                  <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', opacity: isSelected ? 0.9 : 0.6 }}>
                    NODE 0{idx + 1}
                  </span>
                </div>
                <span style={{ display: 'block', fontSize: '0.85rem', opacity: isSelected ? 0.85 : 0.7, marginTop: '4px' }}>
                  {st.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(TrustChainStage);
