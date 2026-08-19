import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

export const FourLensesAtlasChapter = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const [activeLens, setActiveLens] = useState(0);
  const [activeRiasecCell, setActiveRiasecCell] = useState(1); // Default to Investigative

  const models = PUBLIC_CONTENT.home.independentReadings.models;

  const handleTabClick = (index) => {
    setActiveLens(index);
    if (!containerRef.current || typeof window === 'undefined') return;
    const start = containerRef.current.offsetTop || 0;
    const height = containerRef.current.offsetHeight || 0;
    const targetScroll = start + (index / 4) * (height - (window.innerHeight || 800));
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      } catch {
        // JSDOM or unsupported smooth scroll fallback
      }
    }
  };

  useCinematicScene(({ isDesktop }) => {
    if (!isDesktop || !containerRef.current || !stickyRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        let nextIndex = 0;
        if (progress > 0.75) nextIndex = 3;
        else if (progress > 0.5) nextIndex = 2;
        else if (progress > 0.25) nextIndex = 1;
        else nextIndex = 0;

        setActiveLens(nextIndex);
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v7-chapter-lenses"
      aria-label="Chapter 03 — Four Lenses Atlas"
    >
      <div ref={stickyRef} className="pa-v7-chapter-lenses__sticky">
        {/* Left Rail (Columns 1–4) */}
        <div className="pa-v7-lenses__left-rail">
          <span className="pa-v7-eyebrow">Visual Instrument</span>
          <h2 className="pa-v7-lenses__h2">
            {PUBLIC_CONTENT.home.independentReadings.title}
          </h2>
          <p className="pa-v7-lenses__desc">
            {PUBLIC_CONTENT.home.independentReadings.body}
          </p>

          <div className="pa-v7-lenses__index-list" role="tablist" aria-label="Four independent lenses">
            {models.map((model, idx) => (
              <button
                key={model.id}
                role="tab"
                id={`lens-tab-${idx}`}
                aria-selected={activeLens === idx}
                aria-controls={`lens-panel-${idx}`}
                className={`pa-v7-lenses__index-btn ${activeLens === idx ? 'active' : ''}`}
                onClick={() => handleTabClick(idx)}
              >
                <span className="pa-v7-lenses__index-title">
                  <span>0{idx + 1}</span>
                  <span>{model.name}</span>
                </span>
                <span className="pa-v7-lenses__index-sub">{model.subtitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Field (Columns 5–12): Active Spatial System */}
        <div className="pa-v7-lenses__right-field">
          {/* Lens 01: Big Five — 5 Weighted Vertical Bands */}
          <div
            id="lens-panel-0"
            role="tabpanel"
            aria-labelledby="lens-tab-0"
            className="pa-v7-lens-bigfive"
            style={{
              opacity: activeLens === 0 ? 1 : 0,
              pointerEvents: activeLens === 0 ? 'auto' : 'none',
              transition: 'opacity 0.4s ease',
            }}
          >
            {[
              { asset: MEDIA_ASSETS_V7.b01, name: 'Openness', score: '78th percentile' },
              { asset: MEDIA_ASSETS_V7.b02, name: 'Conscientiousness', score: '84th percentile' },
              { asset: MEDIA_ASSETS_V7.b03, name: 'Extraversion', score: '52nd percentile' },
              { asset: MEDIA_ASSETS_V7.b04, name: 'Agreeableness', score: '68th percentile' },
              { asset: MEDIA_ASSETS_V7.b05, name: 'Stability', score: '74th percentile' },
            ].map((band, bIdx) => (
              <div key={band.name} className="pa-v7-bigfive-band">
                <MediaPlane asset={band.asset} priority={bIdx === 0} alt={`Big Five trait ${band.name}`} />
                <div className="pa-v7-bigfive-band__caption">
                  <span className="pa-v7-bigfive-band__name">{band.name}</span>
                  <span className="pa-v7-bigfive-band__score">{band.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Lens 02: RIASEC — 2x3 Work Environment Atlas */}
          <div
            id="lens-panel-1"
            role="tabpanel"
            aria-labelledby="lens-tab-1"
            className="pa-v7-lens-riasec"
            style={{
              opacity: activeLens === 1 ? 1 : 0,
              pointerEvents: activeLens === 1 ? 'auto' : 'none',
              transition: 'opacity 0.4s ease',
            }}
          >
            {[
              { asset: MEDIA_ASSETS_V7.b06, name: 'Realistic', code: 'R' },
              { asset: MEDIA_ASSETS_V7.b07, name: 'Investigative', code: 'I' },
              { asset: MEDIA_ASSETS_V7.b08, name: 'Artistic', code: 'A' },
              { asset: MEDIA_ASSETS_V7.b09, name: 'Social', code: 'S' },
              { asset: MEDIA_ASSETS_V7.b10, name: 'Enterprising', code: 'E' },
              { asset: MEDIA_ASSETS_V7.b11, name: 'Conventional', code: 'C' },
            ].map((cell, cIdx) => (
              <div
                key={cell.name}
                className={`pa-v7-riasec-cell ${activeRiasecCell === cIdx ? 'active' : ''}`}
                onClick={() => setActiveRiasecCell(cIdx)}
              >
                <MediaPlane asset={cell.asset} alt={`RIASEC territory ${cell.name}`} />
                <div className="pa-v7-riasec-cell__meta">
                  <strong>{cell.code}</strong> — {cell.name}
                </div>
              </div>
            ))}
          </div>

          {/* Lens 03: O*NET Values — B12 + Translucent Paper Strip */}
          <div
            id="lens-panel-2"
            role="tabpanel"
            aria-labelledby="lens-tab-2"
            className="pa-v7-lens-onet"
            style={{
              opacity: activeLens === 2 ? 1 : 0,
              pointerEvents: activeLens === 2 ? 'auto' : 'none',
              transition: 'opacity 0.4s ease',
            }}
          >
            <div className="pa-v7-onet-image-frame">
              <MediaPlane asset={MEDIA_ASSETS_V7.b12} alt="O*NET workflow values evidence field" />
            </div>
            <div className="pa-v7-onet-strip">
              <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)', marginBottom: '0.25rem' }}>
                Occupational Values Hierarchy
              </span>
              {models[2].values.map((v) => (
                <div key={v.rank} className="pa-v7-onet-item">
                  <span className="pa-v7-onet-rank">{v.rank}</span>
                  <div>
                    <div className="pa-v7-onet-name">{v.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--pa-stone)' }}>{v.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lens 04: Behavioural Signals — A07 + Ledger Lines */}
          <div
            id="lens-panel-3"
            role="tabpanel"
            aria-labelledby="lens-tab-3"
            className="pa-v7-lens-signals"
            style={{
              opacity: activeLens === 3 ? 1 : 0,
              pointerEvents: activeLens === 3 ? 'auto' : 'none',
              transition: 'opacity 0.4s ease',
            }}
          >
            <div className="pa-v7-signals-image-frame">
              <MediaPlane asset={MEDIA_ASSETS_V7.a07} alt="Observational evidence collage" />
            </div>
            <div className="pa-v7-signals-ledger">
              <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)', marginBottom: '0.25rem' }}>
                Inspectable Observation Trace
              </span>
              {models[3].signals.map((sig, sIdx) => (
                <div key={sIdx} className="pa-v7-signals-item">
                  <span className="pa-v7-signals-source">{sig.source}</span>
                  <div className="pa-v7-signals-metric">{sig.metric}</div>
                  <p className="pa-v7-signals-desc">{sig.interpretation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourLensesAtlasChapter;
