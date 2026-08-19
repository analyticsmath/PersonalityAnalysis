import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { animate, stagger } from 'animejs';
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

export const IndependentReadingsCanvas = () => {
  const { independentReadings } = PUBLIC_CONTENT.home;

  const [activeTab, setActiveTab] = useState('big-five'); // 'big-five' | 'riasec' | 'onet' | 'signals'
  const [activeBigFiveIndex, setActiveBigFiveIndex] = useState(0);
  const [activeRiasecIndex, setActiveRiasecIndex] = useState(1); // Default to Investigative
  const [activeOnetIndex, setActiveOnetIndex] = useState(0);

  const bigFiveSlicesRef = useRef([]);
  const riasecGridRef = useRef(null);
  const onetStageRef = useRef(null);

  // GSAP Scene Pinning and Macro Progress
  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.28) {
              setActiveTab('big-five');
              const traitIdx = Math.min(4, Math.floor(p / (0.28 / 5)));
              setActiveBigFiveIndex(traitIdx);
            } else if (p < 0.56) {
              setActiveTab('riasec');
              const riasecIdx = Math.min(5, Math.floor((p - 0.28) / (0.28 / 6)));
              setActiveRiasecIndex(riasecIdx);
            } else if (p < 0.80) {
              setActiveTab('onet');
              const onetIdx = Math.min(5, Math.floor((p - 0.56) / (0.24 / 6)));
              setActiveOnetIndex(onetIdx);
            } else {
              setActiveTab('signals');
            }
          },
        },
      });

      // Subtle atmospheric shift across readings
      tl.to(el, { backgroundColor: '#141512', ease: 'none' }, 0);
    });
  }, []);

  // Anime.js Bounded In-Scene Motion for Big Five Slice Rebalancing
  useEffect(() => {
    if (activeTab !== 'big-five' || !bigFiveSlicesRef.current.length) return;

    bigFiveSlicesRef.current.forEach((sliceEl, idx) => {
      if (!sliceEl) return;
      const isActive = idx === activeBigFiveIndex;
      animate(sliceEl, {
        flex: isActive ? 2.5 : 0.85,
        opacity: isActive ? 1 : 0.45,
        duration: 450,
        ease: 'out(3)',
      });
    });
  }, [activeTab, activeBigFiveIndex]);

  // Anime.js Grid Stagger for RIASEC Atlas
  useEffect(() => {
    if (activeTab !== 'riasec' || !riasecGridRef.current) return;

    const cells = riasecGridRef.current.querySelectorAll('.pa-v6-riasec-cell');
    if (cells.length) {
      animate(cells, {
        scale: (el, i) => (i === activeRiasecIndex ? 1.03 : 0.97),
        opacity: (el, i) => (i === activeRiasecIndex ? 1 : 0.55),
        delay: stagger(40, { from: activeRiasecIndex }),
        duration: 380,
        ease: 'out(3)',
      });
    }
  }, [activeTab, activeRiasecIndex]);

  // Keyboard navigation for RIASEC
  const handleRiasecKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveRiasecIndex((prev) => (prev + 1) % RIASEC_MEDIA.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveRiasecIndex((prev) => (prev - 1 + RIASEC_MEDIA.length) % RIASEC_MEDIA.length);
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
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pa-stone)', fontWeight: 600 }}>
              Independent Readings
            </span>
            <h2 style={{ fontSize: '2rem', color: 'var(--pa-bone)', margin: '0.25rem 0 1rem 0' }}>
              {independentReadings.title}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', lineHeight: 1.45 }}>
              {independentReadings.body}
            </p>
          </div>

          <div role="tablist" aria-label="Reading Frameworks" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              role="tab"
              aria-selected={activeTab === 'big-five'}
              className={`pa-v6-readings-tab ${activeTab === 'big-five' ? 'active' : ''}`}
              onClick={() => setActiveTab('big-five')}
            >
              <span className="pa-v6-readings-tab__title">Big Five Dimensions</span>
              <span className="pa-v6-readings-tab__sub">Dimensional trait spectrums (B01–B05)</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'riasec'}
              className={`pa-v6-readings-tab ${activeTab === 'riasec' ? 'active' : ''}`}
              onClick={() => setActiveTab('riasec')}
            >
              <span className="pa-v6-readings-tab__title">RIASEC Interest Map</span>
              <span className="pa-v6-readings-tab__sub">Six work environments (B06–B11)</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'onet'}
              className={`pa-v6-readings-tab ${activeTab === 'onet' ? 'active' : ''}`}
              onClick={() => setActiveTab('onet')}
            >
              <span className="pa-v6-readings-tab__title">O*NET Work Values</span>
              <span className="pa-v6-readings-tab__sub">Occupational values index on B12</span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === 'signals'}
              className={`pa-v6-readings-tab ${activeTab === 'signals' ? 'active' : ''}`}
              onClick={() => setActiveTab('signals')}
            >
              <span className="pa-v6-readings-tab__title">Behavioural Signals</span>
              <span className="pa-v6-readings-tab__sub">Auditable observational traces</span>
            </button>
          </div>
        </div>

        {/* Right Stage: Active Framework Visual Atlas */}
        <div className="pa-v6-readings-stage">
          {/* 1. Big Five 5-Part Slice Rebalance Field */}
          {activeTab === 'big-five' && (
            <div className="pa-v6-big-five-stage" role="region" aria-label="Big Five Trait Field" style={{ display: 'flex', width: '100%', height: '100%' }}>
              {BIG_FIVE_MEDIA.map((item, idx) => (
                <div
                  key={item.traitKey}
                  ref={(el) => (bigFiveSlicesRef.current[idx] = el)}
                  className={`pa-v6-big-five-slice ${idx === activeBigFiveIndex ? 'active' : ''}`}
                  onClick={() => setActiveBigFiveIndex(idx)}
                  style={{
                    flex: idx === activeBigFiveIndex ? 2.5 : 0.85,
                    borderLeft: idx > 0 ? '1px solid rgba(251, 250, 245, 0.15)' : 'none',
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
          )}

          {/* 2. RIASEC 2x3 Semantic Work-Environment Atlas */}
          {activeTab === 'riasec' && (
            <div
              ref={riasecGridRef}
              className="pa-v6-riasec-stage"
              role="region"
              aria-label="RIASEC Environmental Atlas"
            >
              {RIASEC_MEDIA.map((env, idx) => (
                <div
                  key={env.id}
                  tabIndex="0"
                  className={`pa-v6-riasec-cell ${idx === activeRiasecIndex ? 'active' : ''}`}
                  onClick={() => setActiveRiasecIndex(idx)}
                  onKeyDown={(e) => handleRiasecKeyDown(e, idx)}
                  aria-label={`${env.name}: ${env.desc}`}
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
          )}

          {/* 3. O*NET Vertical Values Index on B12 */}
          {activeTab === 'onet' && (
            <div ref={onetStageRef} className="pa-v6-onet-stage" role="region" aria-label="O*NET Value Hierarchy">
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
          )}

          {/* 4. Behavioural Signals Audit Trail */}
          {activeTab === 'signals' && (
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
                <MediaPlane
                  asset={MEDIA_ASSETS_V6.a07}
                  objectPosition="50% 45%"
                  alt="Observational signal audit plane"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(29, 30, 26, 0.75)', padding: '2rem', borderRadius: '2px', border: '1px solid var(--pa-rule-light)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 600 }}>
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
          )}
        </div>
      </div>
    </section>
  );
};

export default IndependentReadingsCanvas;
