import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';

export const CareerRelationshipStage = () => {
  const { careerWorlds } = PUBLIC_CONTENT.home;
  const worlds = careerWorlds.worlds;

  const [activeWorldId, setActiveWorldId] = useState(worlds[0].id);

  const activeIndex = worlds.findIndex((w) => w.id === activeWorldId);
  const activeWorld = worlds[activeIndex >= 0 ? activeIndex : 0];
  const activeAsset = MEDIA_ASSETS_V6[activeWorld.imageKey] || MEDIA_ASSETS_V6.a03;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (activeIndex + 1) % worlds.length;
      setActiveWorldId(worlds[nextIdx].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (activeIndex - 1 + worlds.length) % worlds.length;
      setActiveWorldId(worlds[prevIdx].id);
    }
  };

  return (
    <div className="pa-v6-career-intelligence-page" style={{ backgroundColor: 'var(--pa-obsidian)', color: 'var(--pa-bone)', minHeight: '100svh' }}>
      {/* Intro Header */}
      <section style={{ padding: '7rem 4rem 3rem 4rem', borderBottom: '1px solid var(--pa-rule-light)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--pa-stone)', fontWeight: 600 }}>
            Career Intelligence
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, color: 'var(--pa-bone)', margin: '0.5rem 0 1rem 0' }}>
            Career Fit is a Dynamic Relationship
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--pa-stone)', lineHeight: 1.5, maxWidth: '680px' }}>
            Explore how dimensional traits interact with structured occupational environments.
          </p>

          {/* Atomic Tablist Navigator with Keyboard Arrow Navigation */}
          <div
            role="tablist"
            aria-label="Career Worlds Navigator"
            onKeyDown={handleKeyDown}
            style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem', flexWrap: 'wrap' }}
          >
            {worlds.map((w) => (
              <button
                key={w.id}
                role="tab"
                aria-selected={w.id === activeWorldId}
                className={`pa-v6-career-tab ${w.id === activeWorldId ? 'active' : ''}`}
                onClick={() => setActiveWorldId(w.id)}
              >
                <span>{w.index.split(' / ')[0]}</span> · {w.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Single-State World Stage */}
      <section style={{ padding: '4rem 4rem 6rem 4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Dominant Visual Field for Selected World (Stacked Persistent Planes) */}
          <div style={{ position: 'relative', height: '620px', borderRadius: '2px', overflow: 'hidden' }}>
            {worlds.map((w, idx) => {
              const asset = MEDIA_ASSETS_V6[w.imageKey] || MEDIA_ASSETS_V6.a03;
              const isCurrent = w.id === activeWorldId;
              return (
                <div
                  key={w.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: isCurrent ? 1 : 0,
                    zIndex: isCurrent ? 2 : 1,
                    transition: 'opacity 0.35s ease',
                  }}
                >
                  <MediaPlane
                    asset={asset}
                    objectPosition={asset.focalPoint?.desktop || 'center center'}
                    alt={w.name}
                    priority={idx === 0}
                  />
                </div>
              );
            })}
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 5, background: 'rgba(17, 18, 16, 0.85)', padding: '0.5rem 1rem', borderRadius: '2px', color: 'var(--pa-bone)', fontSize: '0.8125rem' }}>
              World {activeWorld.index} · {activeWorld.theme}
            </div>
          </div>


          {/* Structural Detail Bay for Selected World */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pa-stone)', fontWeight: 600 }}>
                Occupational Environment
              </span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--pa-bone)', margin: '0.25rem 0 1rem 0' }}>
                {activeWorld.name}
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--pa-stone)', lineHeight: 1.55 }}>
                {activeWorld.statement}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1.25rem' }}>
              <strong style={{ display: 'block', fontSize: '0.875rem', color: 'var(--pa-bone)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Core Environmental Requirements
              </strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9375rem', color: 'var(--pa-stone)' }}>
                {activeWorld.requirements.map((req, i) => (
                  <li key={i} style={{ borderLeft: '2px solid var(--pa-bone)', paddingLeft: '0.75rem' }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1.25rem' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--pa-bone)', marginBottom: '4px' }}>
                  Why It Fits
                </strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', margin: 0, lineHeight: 1.45 }}>
                  {activeWorld.whyItFits}
                </p>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--pa-bone)', marginBottom: '4px' }}>
                  Where It Stretches
                </strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', margin: 0, lineHeight: 1.45 }}>
                  {activeWorld.whereItStretches}
                </p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--pa-rule-light)', paddingTop: '1.25rem' }}>
              <strong style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--pa-bone)', marginBottom: '4px' }}>
                Development Priority
              </strong>
              <p style={{ fontSize: '0.875rem', color: 'var(--pa-stone)', margin: 0, lineHeight: 1.45 }}>
                {activeWorld.whatToStrengthen}
              </p>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <Link to={getSignupAcquisitionUrl('/assessment/start')} className="pa-v6-btn pa-v6-btn--primary">
                Build my profile →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerRelationshipStage;
