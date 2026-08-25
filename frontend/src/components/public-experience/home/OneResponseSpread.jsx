import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const OneResponseSpread = () => {
  const data = PUBLIC_CONTENT.home.situation;
  const spreadRef = useRef(null);
  const clause1Ref = useRef(null);
  const clause2Ref = useRef(null);
  const mediaRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !spreadRef.current) return;

    const ctx = gsap.context(() => {
      const img = mediaRef.current?.querySelector('img');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spreadRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Spatial clause separation: clause 1 and clause 2 physically separate on scroll
      if (clause1Ref.current && clause2Ref.current) {
        tl.fromTo(
          clause1Ref.current,
          { x: 0 },
          { x: -16, ease: 'none' },
          0
        );
        tl.fromTo(
          clause2Ref.current,
          { x: 0 },
          { x: 24, ease: 'none' },
          0
        );
      }

      // Slower velocity crop shift on process plate
      if (img) {
        tl.fromTo(
          img,
          { yPercent: -8, scale: 1.02 },
          { yPercent: 8, scale: 1.06, ease: 'none' },
          0
        );
      }
    }, spreadRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={spreadRef} className="pa-px-ch-response" aria-label="One Response Context">
      <div className="pa-px-ch-response__inner">
        <div className="pa-px-ch-response__content">
          <div className="pa-px-data pa-px-ch-response__prompt">
            CONTEXTUAL PROMPT &middot; VERBATIM SOURCE
          </div>
          <div className="pa-px-body-sm" style={{ color: 'var(--pa-graphite)', marginBottom: '16px' }}>
            &ldquo;{data.prompt}&rdquo;
          </div>

          <div className="pa-px-ch-response__quote-stage">
            <span ref={clause1Ref} className="pa-px-ch-response__clause pa-px-ch-response__clause--primary">
              &ldquo;I clarify the constraints first,
            </span>
            <span ref={clause2Ref} className="pa-px-ch-response__clause pa-px-ch-response__clause--secondary">
              then choose the smallest reversible step.&rdquo;
            </span>
          </div>

          <div className="pa-px-ch-response__explanation">
            <p className="pa-px-body-lg">
              A single sentence preserves observable pacing, risk posture, and problem structure. Rather than discarding the context into an opaque score, the system retains the source as the design material across all subsequent models.
            </p>
            <div className="pa-px-data pa-px-ch-response__provenance">
              <svg className="pa-px-evidence-path" width="24" height="10" viewBox="0 0 24 10" fill="none" aria-hidden="true">
                <path d="M 0,5 L 18,5 M 14,1 L 18,5 L 14,9" stroke="var(--pa-evidence)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Provenance ID: src-clause-7729 &middot; Verbatim verified</span>
            </div>
          </div>
        </div>

        <div ref={mediaRef} className="pa-px-ch-response__aside-media">
          <div className="pa-px-ch-response__plate">
            <PublicPicture
              assetKey="homeProcessDetail"
              alt="Close analytical inspection of materials and technical drawings"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneResponseSpread;
