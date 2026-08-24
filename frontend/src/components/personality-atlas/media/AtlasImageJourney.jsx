import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from './AtlasResponsiveImage';
import AtlasCurtainsPlane from './AtlasCurtainsPlane';
import ResponseFragment from '../fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';

gsap.registerPlugin(ScrollTrigger);

/**
 * Personality Assessor — AtlasImageJourney
 * White-Desert-standard authored image journey (not a carousel).
 * Coordinates crop, spatial drift, occlusion, clip-path ownership,
 * semantic fragment carry, and accessible environment rail.
 */
const AtlasImageJourney = ({ environments = [], onEnvironmentChange, className = '' }) => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const [activeEnvIndex, setActiveEnvIndex] = useState(0);
  const activeIdxRef = useRef(0);
  const velocityRef = useRef(0);

  const handleSelectEnvironment = useCallback((index) => {
    setActiveEnvIndex(index);
    activeIdxRef.current = index;
    if (onEnvironmentChange) onEnvironmentChange(index);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = scrollTop + rect.top + (totalHeight * (index / (environments.length - 1 || 1)));

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [environments.length, onEnvironmentChange]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const total = environments.length;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            velocityRef.current = self.getVelocity();
            const rawProgress = self.progress;
            const segment = Math.min(total - 1, Math.floor(rawProgress * total));
            if (segment !== activeIdxRef.current) {
              activeIdxRef.current = segment;
              setActiveEnvIndex(segment);
              if (onEnvironmentChange) onEnvironmentChange(segment);
            }
          },
        });

        // Choreograph image drift and scale
        environments.forEach((_, idx) => {
          const imgEl = stageRef.current.querySelector(`[data-journey-index="${idx}"]`);
          if (imgEl) {
            gsap.fromTo(
              imgEl,
              { scale: 1.0, xPercent: 0 },
              {
                scale: 1.04,
                xPercent: -3,
                ease: 'none',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: `${(idx / total) * 100}% top`,
                  end: `${((idx + 1) / total) * 100}% bottom`,
                  scrub: 0.4,
                },
              }
            );
          }
        });
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile portrait scroll updates
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
          onUpdate: (self) => {
            const segment = Math.min(environments.length - 1, Math.floor(self.progress * environments.length));
            if (segment !== activeIdxRef.current) {
              activeIdxRef.current = segment;
              setActiveEnvIndex(segment);
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [environments, onEnvironmentChange]);

  const activeEnv = environments[activeEnvIndex] || environments[0];

  return (
    <div
      ref={containerRef}
      className={`pa-atlas-journey pa-atlas-scene-wrapper ${className}`.trim()}
      style={{ minHeight: '380svh' }}
    >
      <div ref={stageRef} className="pa-atlas-stage-sticky">
        {/* Dominant Image Field */}
        <div
          className="pa-atlas-journey__media-stage"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {environments.map((env, idx) => {
            const asset = MEDIA_ASSETS_ATLAS[env.mediaKey] || MEDIA_ASSETS_ATLAS.careerComplexMachine;
            const isCurrent = idx === activeEnvIndex;

            return (
              <div
                key={env.id}
                data-journey-index={idx}
                className="pa-atlas-journey__plane"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: isCurrent ? 1 : 0,
                  pointerEvents: isCurrent ? 'auto' : 'none',
                  transition: 'opacity 520ms cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: isCurrent ? 2 : 1,
                }}
              >
                <AtlasCurtainsPlane scrollVelocityRef={velocityRef}>
                  <AtlasResponsiveImage
                    asset={asset}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    style={{ width: '100%', height: '100%' }}
                  />
                </AtlasCurtainsPlane>
              </div>
            );
          })}

          {/* Ambient Ground Tint Overlay (Solid, not gradient) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(22, 61, 53, 0.42)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        </div>

        {/* Coordinated Editorial Content Overlay */}
        <div
          className="pa-atlas-journey__content-grid pa-atlas-grid"
          style={{
            position: 'relative',
            zIndex: 4,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'calc(var(--atlas-header-height-desktop) + 24px)',
            paddingBottom: '48px',
          }}
        >
          {/* Top Row: Environment Rail */}
          <div
            className="pa-atlas-journey__nav-rail"
            style={{
              display: 'flex',
              gap: 'clamp(16px, 2vw, 32px)',
              flexWrap: 'wrap',
            }}
          >
            {environments.map((env, idx) => {
              const isSelected = idx === activeEnvIndex;
              return (
                <button
                  key={env.id}
                  onClick={() => handleSelectEnvironment(idx)}
                  className="pa-atlas-journey__nav-btn"
                  style={{
                    fontFamily: 'var(--atlas-font-sans)',
                    fontSize: '1rem',
                    fontWeight: isSelected ? 540 : 450,
                    color: isSelected ? 'var(--atlas-signal)' : 'var(--atlas-paper)',
                    opacity: isSelected ? 1 : 0.65,
                    padding: '6px 0',
                    borderBottom: isSelected ? '2px solid var(--atlas-signal)' : '2px solid transparent',
                    transition: 'all 200ms ease',
                  }}
                  aria-pressed={isSelected}
                >
                  {env.name}
                </button>
              );
            })}
          </div>

          {/* Bottom Area: Statement & Response Fragment */}
          <div
            className="pa-atlas-journey__info-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
              gap: 'var(--atlas-column-gap)',
              alignItems: 'flex-end',
            }}
          >
            <div className="pa-atlas-journey__statement-col">
              <span
                className="pa-atlas-mono"
                style={{
                  color: 'var(--atlas-signal)',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                CONTEXT APPLIED: {activeEnv.name.toUpperCase()}
              </span>
              <h2
                className="pa-atlas-heading-lg"
                style={{
                  color: 'var(--atlas-paper)',
                  marginBottom: '16px',
                }}
              >
                {activeEnv.statement}
              </h2>
              <p
                className="pa-atlas-body-lg"
                style={{
                  color: 'var(--atlas-paper)',
                  opacity: 0.88,
                  maxWidth: '38rem',
                }}
              >
                {activeEnv.reading}
              </p>
            </div>

            <div
              className="pa-atlas-journey__fragment-col"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <ResponseFragment
                variant="response"
                text="“I clarify responsibilities before committing work.”"
                sourceId="0x8F4A"
                date="2026-08"
                style={{
                  backgroundColor: 'rgba(22, 61, 53, 0.82)',
                  padding: '24px 28px',
                  borderRadius: 'var(--atlas-radius-sm)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AtlasImageJourney);
