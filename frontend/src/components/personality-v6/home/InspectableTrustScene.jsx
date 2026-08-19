import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import MediaPlane from '../motion/MediaPlane';
import useCinematicScene from '../motion/useCinematicScene';

export const InspectableTrustScene = () => {
  const { trustScene } = PUBLIC_CONTENT.home;
  const stagesRef = useRef(null);

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

      tl.fromTo(
        stagesRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' },
        0.1
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v6-scene-trust"
      data-header-theme="dark"
      data-cinematic-stage="trust"
      aria-label="Trust and Governance"
    >
      <div className="pa-v6-scene-trust__sticky">
        <div style={{ position: 'relative', width: '100%', maxWidth: '1320px', height: '80svh', borderRadius: '2px', overflow: 'hidden' }}>
          {/* A08 Broad Environmental Field */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a08}
              objectPosition="50% 48%"
              alt="Trust & Governance verification plane"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,18,16,0.92) 0%, rgba(17,18,16,0.75) 50%, rgba(17,18,16,0.85) 100%)' }} />
          </div>

          {/* Content Layer with 4-stage processing route */}
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3.5rem 4rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--pa-stone)', fontWeight: 600 }}>
                Governance & Verification
              </span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--pa-bone)', margin: '0.25rem 0 0 0' }}>
                {trustScene.title}
              </h2>
            </div>

            <div ref={stagesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              {trustScene.stages.map((st, idx) => (
                <div
                  key={st.id}
                  style={{
                    borderLeft: '2px solid var(--pa-bone)',
                    paddingLeft: '1rem',
                    background: 'rgba(29, 30, 26, 0.65)',
                    padding: '1.25rem 1rem',
                    borderRadius: '2px',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', color: 'var(--pa-stone)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    0{idx + 1}
                  </div>
                  <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--pa-bone)', marginBottom: '6px' }}>
                    {st.name}
                  </strong>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--pa-stone)', margin: 0, lineHeight: 1.45 }}>
                    {st.detail}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/trust" className="pa-v6-btn pa-v6-btn--secondary" style={{ fontSize: '0.8125rem', minHeight: '42px', padding: '0 1.25rem' }}>
                Inspect trust & privacy controls →
              </Link>
              <Link to="/methodology" className="pa-v6-btn pa-v6-btn--secondary" style={{ fontSize: '0.8125rem', minHeight: '42px', padding: '0 1.25rem' }}>
                Read the methodology →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectableTrustScene;
