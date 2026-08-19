import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import MediaPlane from '../motion/MediaPlane';
import useCinematicScene from '../motion/useCinematicScene';

export const DevelopmentEchoScene = () => {
  const { developmentEcho } = PUBLIC_CONTENT.home;

  const earlierPlaneRef = useRef(null);
  const currentPlaneRef = useRef(null);
  const deltasRef = useRef(null);

  const containerRef = useCinematicScene(({ mm, el }) => {
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Background transition from cinder (#1D1E1A) to lighter tone
      tl.to(el, { backgroundColor: '#232520', ease: 'none' }, 0);

      // Staggered arrival of measured deltas
      tl.fromTo(
        deltasRef.current?.children || [],
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.12, ease: 'power2.out' },
        0.15
      );

      // Dual media planes crop and scale movement
      tl.fromTo(
        earlierPlaneRef.current,
        { scale: 1 },
        { scale: 1.06, ease: 'power1.inOut' },
        0
      );
      tl.fromTo(
        currentPlaneRef.current,
        { scale: 1.06 },
        { scale: 1, ease: 'power1.inOut' },
        0
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v6-scene-echo"
      data-header-theme="dark"
      data-cinematic-stage="echo"
      aria-label="Development Echo"
    >
      <div className="pa-v6-scene-echo__sticky">
        {/* Left Column: Context and Measured Deltas */}
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pa-stone)', fontWeight: 600 }}>
            Longitudinal Evidence
          </span>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--pa-bone)', margin: '0.25rem 0 1rem 0' }}>
            {developmentEcho.title}
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--pa-stone)', lineHeight: 1.5, marginBottom: '2rem' }}>
            {developmentEcho.body}
          </p>

          <div ref={deltasRef} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {developmentEcho.traitsComparison.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: '2px solid var(--pa-bone)',
                  paddingLeft: '1rem',
                  background: 'rgba(17, 18, 16, 0.45)',
                  padding: '0.75rem 1rem',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--pa-bone)' }}>{item.label}</strong>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)' }}>
                    {item.earlier}% → <strong style={{ color: 'var(--pa-bone)' }}>{item.current}%</strong>
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--pa-muted)', marginTop: '4px' }}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Stage: Dual Comparative Photographic Planes (Not Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '70svh' }}>
          <div ref={earlierPlaneRef} style={{ position: 'relative', height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a05}
              objectPosition="50% 40%"
              alt="Earlier Baseline"
            />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(17, 18, 16, 0.8)', padding: '0.4rem 0.8rem', borderRadius: '2px', fontSize: '0.75rem', color: 'var(--pa-stone)' }}>
              {developmentEcho.earlierLabel} · {developmentEcho.earlierDate}
            </div>
          </div>

          <div ref={currentPlaneRef} style={{ position: 'relative', height: '100%', borderRadius: '2px', overflow: 'hidden' }}>
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a06}
              objectPosition="50% 39%"
              alt="Current State"
            />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(17, 18, 16, 0.8)', padding: '0.4rem 0.8rem', borderRadius: '2px', fontSize: '0.75rem', color: 'var(--pa-bone)', fontWeight: 600 }}>
              {developmentEcho.currentLabel} · {developmentEcho.currentDate}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentEchoScene;
