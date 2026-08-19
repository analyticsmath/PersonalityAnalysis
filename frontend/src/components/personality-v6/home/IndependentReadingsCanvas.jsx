import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { animate } from 'animejs';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import MediaPlane from '../motion/MediaPlane';
import useCinematicScene from '../motion/useCinematicScene';

const BIG_FIVE_MEDIA = [
  { traitKey: 'openness', name: 'Openness', asset: MEDIA_ASSETS_V6.b01, color: 'var(--pa-accent-openness)', desc: 'Exploratory & Abstract vs. Pragmatic & Concrete', score: 78 },
  { traitKey: 'conscientiousness', name: 'Conscientiousness', asset: MEDIA_ASSETS_V6.b02, color: 'var(--pa-accent-conscientiousness)', desc: 'Systematic & Thorough vs. Flexible & Spontaneous', score: 84 },
  { traitKey: 'extraversion', name: 'Extraversion', asset: MEDIA_ASSETS_V6.b03, color: 'var(--pa-accent-extraversion)', desc: 'Expressive & Outward vs. Independent & Contemplative', score: 52 },
  { traitKey: 'agreeableness', name: 'Agreeableness', asset: MEDIA_ASSETS_V6.b04, color: 'var(--pa-accent-agreeableness)', desc: 'Cooperative & Empathetic vs. Competitive & Direct', score: 68 },
  { traitKey: 'stability', name: 'Emotional Stability', asset: MEDIA_ASSETS_V6.b05, color: 'var(--pa-accent-stability)', desc: 'Steady & Grounded vs. Reactive & Sensitive', score: 74 },
];

const RIASEC_MEDIA = [
  { id: 'realistic', name: 'Realistic', asset: MEDIA_ASSETS_V6.b06, desc: 'Hands-on tooling & physical systems' },
  { id: 'investigative', name: 'Investigative', asset: MEDIA_ASSETS_V6.b07, desc: 'Empirical research & technical inquiry' },
  { id: 'artistic', name: 'Artistic', asset: MEDIA_ASSETS_V6.b08, desc: 'Design & conceptual synthesis' },
  { id: 'social', name: 'Social', asset: MEDIA_ASSETS_V6.b09, desc: 'Coaching & collective development' },
  { id: 'enterprising', name: 'Enterprising', asset: MEDIA_ASSETS_V6.b10, desc: 'Strategic direction & resource alignment' },
  { id: 'conventional', name: 'Conventional', asset: MEDIA_ASSETS_V6.b11, desc: 'Precision workflows & systematic governance' },
];

const ONET_VALUES = [
  { rank: '01', name: 'Achievement', desc: 'Tangible outcomes from disciplined effort', focal: '50% 30%' },
  { rank: '02', name: 'Independence', desc: 'Autonomy to direct methodology', focal: '45% 50%' },
  { rank: '03', name: 'Working Conditions', desc: 'Well-structured operational clarity', focal: '55% 40%' },
  { rank: '04', name: 'Recognition', desc: 'Visible professional authority', focal: '50% 60%' },
  { rank: '05', name: 'Relationships', desc: 'High-trust peer collaboration', focal: '40% 55%' },
  { rank: '06', name: 'Support', desc: 'Resource availability and institutional backing', focal: '60% 45%' },
];

const FRAMEWORK_KEYS = ['big-five', 'riasec', 'onet', 'signals'];

export const IndependentReadingsCanvas = () => {
  const { independentReadings } = PUBLIC_CONTENT.home;

  const [activeTab, setActiveTab] = useState('big-five');
  const [activeBigFiveIndex, setActiveBigFiveIndex] = useState(0);
  const [activeRiasecIndex, setActiveRiasecIndex] = useState(1);
  const [activeOnetIndex, setActiveOnetIndex] = useState(0);

  const bigFiveSlicesRef = useRef([]);
  const riasecGridRef = useRef(null);

  // References for permanently stacked framework panels
  const panelBigFiveRef = useRef(null);
  const panelRiasecRef = useRef(null);
  const panelOnetRef = useRef(null);
  const panelSignalsRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // GSAP Macro Scroll Timeline — Owns layer opacities with full overlap and zero black frames
  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px) and (pointer: fine)', () => {
      // Initialize permanent layer opacities
      gsap.set(panelBigFiveRef.current, { opacity: 1, zIndex: 1 });
      gsap.set(panelRiasecRef.current, { opacity: 0, zIndex: 2 });
      gsap.set(panelOnetRef.current, { opacity: 0, zIndex: 3 });
      gsap.set(panelSignalsRef.current, { opacity: 0, zIndex: 4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.28) {
              setActiveTab('big-five');
            } else if (p < 0.56) {
              setActiveTab('riasec');
            } else if (p < 0.80) {
              setActiveTab('onet');
            } else {
              setActiveTab('signals');
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      // Phase 1 -> 2: RIASEC fades in over Big Five (Big Five stays solid underneath)
      tl.to(
        panelRiasecRef.current,
        { opacity: 1, ease: 'power1.inOut' },
        0.26
      );

      // Phase 2 -> 3: O*NET fades in over RIASEC
      tl.to(
        panelOnetRef.current,
        { opacity: 1, ease: 'power1.inOut' },
        0.54
      );

      // Phase 3 -> 4: Behavioural Signals fades in over O*NET
      tl.to(
        panelSignalsRef.current,
        { opacity: 1, ease: 'power1.inOut' },
        0.78
      );
    });

    mm.add('(max-width: 900px), (pointer: coarse)', () => {
      if (panelBigFiveRef.current) gsap.set(panelBigFiveRef.current, { opacity: 1 });
      if (panelRiasecRef.current) gsap.set(panelRiasecRef.current, { opacity: 1 });
      if (panelOnetRef.current) gsap.set(panelOnetRef.current, { opacity: 1 });
      if (panelSignalsRef.current) gsap.set(panelSignalsRef.current, { opacity: 1 });
    });
  }, []);

  // Anime.js Micro-motion strictly for internal Big Five slice indicator adjustment
  useEffect(() => {
    if (activeTab !== 'big-five') return;
    bigFiveSlicesRef.current.forEach((sliceEl, idx) => {
      if (!sliceEl) return;
      const isActive = idx === activeBigFiveIndex;
      animate(sliceEl, {
        flex: isActive ? 2.2 : 0.9,
        duration: 400,
        ease: 'out(3)',
      });
    });
  }, [activeTab, activeBigFiveIndex]);

  // Tab click handler that synchronizes state without fighting scroll timeline
  const handleTabClick = useCallback((key) => {
    setActiveTab(key);
    // Directly adjust panels when outside active scroll scrub
    const panels = [
      { key: 'big-five', ref: panelBigFiveRef, z: 1 },
      { key: 'riasec', ref: panelRiasecRef, z: 2 },
      { key: 'onet', ref: panelOnetRef, z: 3 },
      { key: 'signals', ref: panelSignalsRef, z: 4 },
    ];
    const targetIdx = FRAMEWORK_KEYS.indexOf(key);
    panels.forEach((p, idx) => {
      if (p.ref.current) {
        if (idx <= targetIdx) {
          gsap.to(p.ref.current, { opacity: 1, duration: 0.35, overwrite: 'auto' });
        } else {
          gsap.to(p.ref.current, { opacity: 0, duration: 0.35, overwrite: 'auto' });
        }
      }
    });
  }, []);

  // Keyboard navigation for framework tabs
  const handleTabKeyDown = (e, currentKey) => {
    const currentIndex = FRAMEWORK_KEYS.indexOf(currentKey);
    let nextIndex = currentIndex;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % FRAMEWORK_KEYS.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + FRAMEWORK_KEYS.length) % FRAMEWORK_KEYS.length;
    }
    if (nextIndex !== currentIndex) {
      handleTabClick(FRAMEWORK_KEYS[nextIndex]);
    }
  };

  return (
    <section
      ref={containerRef}
      className="pa-v6-scene-readings"
      data-header-theme="dark"
      data-cinematic-stage="readings"
      aria-label="Independent Readings Canvas"
    >
      <div className="pa-v6-scene-readings__sticky">
        {/* Left Column: Clear Navigation Strip without clipped horizontal scrollbars */}
        <div className="pa-v6-readings-nav">
          <div>
            <span className="pa-v6-eyebrow">
              Independent Readings
            </span>
            <h2 style={{ fontSize: '2rem', color: 'var(--pa-bone)', margin: '0.25rem 0 1rem 0' }}>
              {independentReadings.title}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', lineHeight: 1.45 }}>
              {independentReadings.body}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Reading Frameworks"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <button
              role="tab"
              id="tab-big-five"
              aria-controls="panel-big-five"
              aria-selected={activeTab === 'big-five'}
              className={`pa-v6-readings-tab ${activeTab === 'big-five' ? 'active' : ''}`}
              onClick={() => handleTabClick('big-five')}
              onKeyDown={(e) => handleTabKeyDown(e, 'big-five')}
            >
              <span className="pa-v6-readings-tab__title">Big Five Dimensions</span>
              <span className="pa-v6-readings-tab__sub">Dimensional trait spectrums (B01–B05)</span>
            </button>

            <button
              role="tab"
              id="tab-riasec"
              aria-controls="panel-riasec"
              aria-selected={activeTab === 'riasec'}
              className={`pa-v6-readings-tab ${activeTab === 'riasec' ? 'active' : ''}`}
              onClick={() => handleTabClick('riasec')}
              onKeyDown={(e) => handleTabKeyDown(e, 'riasec')}
            >
              <span className="pa-v6-readings-tab__title">RIASEC Interest Map</span>
              <span className="pa-v6-readings-tab__sub">Six work environments (B06–B11)</span>
            </button>

            <button
              role="tab"
              id="tab-onet"
              aria-controls="panel-onet"
              aria-selected={activeTab === 'onet'}
              className={`pa-v6-readings-tab ${activeTab === 'onet' ? 'active' : ''}`}
              onClick={() => handleTabClick('onet')}
              onKeyDown={(e) => handleTabKeyDown(e, 'onet')}
            >
              <span className="pa-v6-readings-tab__title">O*NET Work Values</span>
              <span className="pa-v6-readings-tab__sub">Occupational values index on B12</span>
            </button>

            <button
              role="tab"
              id="tab-signals"
              aria-controls="panel-signals"
              aria-selected={activeTab === 'signals'}
              className={`pa-v6-readings-tab ${activeTab === 'signals' ? 'active' : ''}`}
              onClick={() => handleTabClick('signals')}
              onKeyDown={(e) => handleTabKeyDown(e, 'signals')}
            >
              <span className="pa-v6-readings-tab__title">Behavioural Signals</span>
              <span className="pa-v6-readings-tab__sub">Auditable observational traces</span>
            </button>
          </div>
        </div>

        {/* Right Stage: 4 Permanently Stacked Framework Visual Compositions */}
        <div className="pa-v6-readings-stage" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* 1. Big Five 5-Part Slice Rebalance Field (B01–B05) */}
          <div
            ref={panelBigFiveRef}
            id="panel-big-five"
            role="tabpanel"
            aria-labelledby="tab-big-five"
            className="pa-v6-readings-panel pa-v6-readings-panel--big-five"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              opacity: 1,
              display: 'flex',
            }}
          >
            {BIG_FIVE_MEDIA.map((item, idx) => (
              <div
                key={item.traitKey}
                ref={(el) => (bigFiveSlicesRef.current[idx] = el)}
                className={`pa-v6-big-five-slice ${idx === activeBigFiveIndex ? 'active' : ''}`}
                onClick={() => setActiveBigFiveIndex(idx)}
                style={{
                  flex: idx === activeBigFiveIndex ? 2.2 : 0.9,
                  borderLeft: idx > 0 ? '1px solid rgba(251, 250, 245, 0.15)' : 'none',
                  position: 'relative',
                  height: '100%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'filter 0.3s ease',
                }}
              >
                <MediaPlane
                  asset={item.asset}
                  objectPosition="center center"
                  alt={item.name}
                />
                <div className="pa-v6-big-five-slice__info">
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: item.color, fontWeight: 700 }}>
                    {item.name} · {item.score}%
                  </div>
                  {idx === activeBigFiveIndex && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--pa-bone)', marginTop: '4px' }}>
                      {item.desc}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 2. RIASEC 2x3 Semantic Work-Environment Atlas (B06–B11) */}
          <div
            ref={panelRiasecRef}
            id="panel-riasec"
            role="tabpanel"
            aria-labelledby="tab-riasec"
            className="pa-v6-readings-panel pa-v6-readings-panel--riasec"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 2,
              opacity: 0,
              background: 'var(--pa-obsidian)',
            }}
          >
            <div
              ref={riasecGridRef}
              className="pa-v6-riasec-stage"
              role="region"
              aria-label="RIASEC Environmental Atlas"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '8px', width: '100%', height: '100%' }}
            >
              {RIASEC_MEDIA.map((env, idx) => (
                <div
                  key={env.id}
                  tabIndex="0"
                  className={`pa-v6-riasec-cell ${idx === activeRiasecIndex ? 'active' : ''}`}
                  onClick={() => setActiveRiasecIndex(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveRiasecIndex(idx);
                    }
                  }}
                  aria-label={`${env.name}: ${env.desc}`}
                  style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px', cursor: 'pointer' }}
                >
                  <MediaPlane
                    asset={env.asset}
                    objectPosition="center center"
                    alt={env.name}
                  />
                  <div className="pa-v6-riasec-cell__meta">
                    <strong style={{ display: 'block', fontSize: '0.875rem' }}>{env.name}</strong>
                    <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>{env.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. O*NET Vertical Values Index on B12 */}
          <div
            ref={panelOnetRef}
            id="panel-onet"
            role="tabpanel"
            aria-labelledby="tab-onet"
            className="pa-v6-readings-panel pa-v6-readings-panel--onet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 3,
              opacity: 0,
              background: 'var(--pa-obsidian)',
            }}
          >
            <div className="pa-v6-onet-stage" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', width: '100%', height: '100%', alignItems: 'center' }}>
              <div className="pa-v6-onet-index-list">
                {ONET_VALUES.map((val, idx) => (
                  <div
                    key={val.rank}
                    className={`pa-v6-onet-item ${idx === activeOnetIndex ? 'active' : ''}`}
                    onClick={() => setActiveOnetIndex(idx)}
                    role="button"
                    tabIndex="0"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                      <span>{val.rank} · {val.name}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--pa-stone)', marginTop: '2px' }}>
                      {val.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
                <MediaPlane
                  asset={MEDIA_ASSETS_V6.b12}
                  objectPosition={ONET_VALUES[activeOnetIndex].focal}
                  alt="O*NET Workflow Evidence"
                />
              </div>
            </div>
          </div>

          {/* 4. Behavioural Signals Audit Trail on A07 */}
          <div
            ref={panelSignalsRef}
            id="panel-signals"
            role="tabpanel"
            aria-labelledby="tab-signals"
            className="pa-v6-readings-panel pa-v6-readings-panel--signals"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 4,
              opacity: 0,
              background: 'var(--pa-obsidian)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
                <MediaPlane
                  asset={MEDIA_ASSETS_V6.a07}
                  objectPosition="50% 45%"
                  alt="Observational signal audit plane"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(29, 30, 26, 0.85)', backdropFilter: 'blur(12px)', padding: '2rem', borderRadius: '2px', border: '1px solid var(--pa-rule-light)' }}>
                <span className="pa-v6-eyebrow">
                  Deterministic Trace Audit
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--pa-bone)', margin: 0 }}>
                  Observed Pattern Logs
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <div style={{ borderLeft: '2px solid var(--pa-bone)', paddingLeft: '0.75rem' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--pa-stone)', textTransform: 'uppercase' }}>Signal 01 · Latency</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--pa-bone)' }}>Calculated deliberation on structural constraints</div>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--pa-bone)', paddingLeft: '0.75rem' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--pa-stone)', textTransform: 'uppercase' }}>Signal 02 · Calibration</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--pa-bone)' }}>Consistent preference for multi-variable problem spaces</div>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--pa-bone)', paddingLeft: '0.75rem' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--pa-stone)', textTransform: 'uppercase' }}>Signal 03 · Alignment</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--pa-bone)' }}>Prefers verified fallback protocols over speculative bets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndependentReadingsCanvas;

