import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import ResponseFragment from '../fragments/ResponseFragment';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

gsap.registerPlugin(ScrollTrigger);

const BranchingChapter = () => {
  const containerRef = useRef(null);
  const pathSvgRef = useRef(null);
  const branchesRef = useRef([]);

  const content = PUBLIC_CONTENT.home.chapter2;

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        // Sequence branch activations
        branchesRef.current.forEach((branch, idx) => {
          if (branch) {
            tl.fromTo(
              branch,
              { opacity: 0.2, y: 20 },
              { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
              0.15 + idx * 0.2
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-atlas-scene-wrapper pa-atlas-branching"
      style={{ minHeight: '200svh', position: 'relative' }}
      aria-label="One Source Many Readings"
    >
      <div className="pa-atlas-stage-sticky">
        {/* Background Subtle Analytical Media Detail */}
        <div
          style={{
            position: 'absolute',
            bottom: '4vh',
            left: '4vw',
            width: '28vw',
            height: '34vh',
            borderRadius: 'var(--atlas-radius-sm)',
            overflow: 'hidden',
            opacity: 0.35,
            zIndex: 1,
          }}
        >
          <AtlasResponsiveImage
            asset={MEDIA_ASSETS_ATLAS.homeAnalysis}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Spatial Editorial Composition Grid */}
        <div
          className="pa-atlas-grid"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'calc(var(--atlas-header-height-desktop) + 24px)',
            paddingBottom: '48px',
          }}
        >
          {/* Header Field */}
          <div style={{ maxWidth: '54rem' }}>
            <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', display: 'block', marginBottom: '8px' }}>
              SOURCE DECOMPOSITION
            </span>
            <h2 className="pa-atlas-heading-xl" style={{ color: 'var(--atlas-paper)' }}>
              {content.headline}
            </h2>
          </div>

          {/* Central Origin Source Phrase */}
          <div
            style={{
              padding: '24px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ResponseFragment
              variant="response"
              text={content.sourceClause}
              sourceId="0x8F4A"
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                textAlign: 'center',
                color: 'var(--atlas-paper)',
                maxWidth: '44rem',
              }}
            />
          </div>

          {/* Asymmetric 4-Branch Spatial Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--atlas-column-gap)',
              width: '100%',
            }}
          >
            {content.models.map((model, idx) => (
              <div
                key={model.id}
                ref={(el) => (branchesRef.current[idx] = el)}
                className="pa-atlas-branch-node"
                style={{
                  padding: '20px 24px',
                  backgroundColor: 'rgba(22, 61, 53, 0.75)',
                  borderRadius: 'var(--atlas-radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.76rem' }}>
                  {model.name.toUpperCase()}
                </span>
                <h3 className="pa-atlas-heading-md" style={{ color: 'var(--atlas-paper)', fontSize: '1.25rem' }}>
                  {model.reading}
                </h3>
                <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', opacity: 0.82, fontSize: '0.94rem' }}>
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BranchingChapter);
