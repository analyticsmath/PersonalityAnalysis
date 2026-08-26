import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

gsap.registerPlugin(ScrollTrigger);

export const SourceSplitJourney = () => {
  const data = PUBLIC_CONTENT.home.situation;
  const sectionRef = useRef(null);
  const clause1Ref = useRef(null);
  const clause2Ref = useRef(null);
  const pathsRef = useRef(null);
  const mediaRef = useRef(null);
  const destinationsRef = useRef(null);
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const img = mediaRef.current?.querySelector('img');
      const paths = pathsRef.current?.querySelectorAll('path') || [];
      const destNodes = destinationsRef.current?.querySelectorAll('.pa-px-split-dest') || [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Spatial clause separation
      if (clause1Ref.current && clause2Ref.current) {
        tl.to(clause1Ref.current, { x: -28, y: -8, ease: 'none' }, 0);
        tl.to(clause2Ref.current, { x: 36, y: 12, ease: 'none' }, 0);
      }

      // 2. SVG connecting paths emerge from phrase coordinates
      if (paths.length) {
        tl.fromTo(
          paths,
          { strokeDashoffset: 120, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
          0.15
        );
      }

      // 3. Destination markers resolve
      if (destNodes.length) {
        tl.fromTo(
          destNodes,
          { opacity: 0, y: 12, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.06, ease: 'power2.out' },
          0.3
        );
      }

      // 4. Process plate counter-parallax
      if (mediaRef.current) {
        tl.to(mediaRef.current, { y: -32, ease: 'none' }, 0);
      }
      if (img) {
        tl.to(img, { yPercent: 12, scale: 1.04, ease: 'none' }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="pa-px-ch-response pa-px-source-split-stage"
      aria-label="One Answer Splits Into Evidence"
    >
      <div className="pa-px-source-split-stage__inner">
        {/* Massive Source Sentence Arena (55–70% viewport width) */}
        <div className="pa-px-source-split-stage__text-col">
          <div className="pa-px-source-split__prompt-line">
            How do you make progress when the goal is clear but implementation is not?
          </div>

          <div className="pa-px-source-split__quote-field">
            <div className="pa-px-source-split__clauses">
              <span
                ref={clause1Ref}
                className="pa-px-source-split__clause pa-px-source-split__clause--lead"
              >
                &ldquo;I clarify the constraints first,
              </span>
              <span
                ref={clause2Ref}
                className="pa-px-source-split__clause pa-px-source-split__clause--follow"
              >
                then choose the smallest reversible step.&rdquo;
              </span>
            </div>

            {/* Emergent Evidence Branching Vectors */}
            <div ref={pathsRef} className="pa-px-source-split__paths-layer" aria-hidden="true">
              <svg className="pa-px-split-svg" viewBox="0 0 540 80" fill="none">
                <path
                  d="M 120,10 C 120,45 60,50 40,75"
                  stroke="var(--pa-evidence)"
                  strokeWidth="1.5"
                  strokeDasharray="120"
                />
                <path
                  d="M 180,10 C 180,45 190,50 180,75"
                  stroke="var(--pa-evidence)"
                  strokeWidth="1.5"
                  strokeDasharray="120"
                />
                <path
                  d="M 320,10 C 320,45 320,50 330,75"
                  stroke="var(--pa-evidence)"
                  strokeWidth="1.5"
                  strokeDasharray="120"
                />
                <path
                  d="M 420,10 C 420,45 470,50 480,75"
                  stroke="var(--pa-evidence)"
                  strokeWidth="1.5"
                  strokeDasharray="120"
                />
              </svg>
            </div>

            {/* Destination Framework Tags */}
            <div ref={destinationsRef} className="pa-px-source-split__destinations">
              <div className="pa-px-split-dest">
                <span className="pa-px-split-dest__dot" />
                <span className="pa-px-split-dest__label">TRAIT</span>
              </div>
              <div className="pa-px-split-dest">
                <span className="pa-px-split-dest__dot" />
                <span className="pa-px-split-dest__label">INTEREST</span>
              </div>
              <div className="pa-px-split-dest">
                <span className="pa-px-split-dest__dot" />
                <span className="pa-px-split-dest__label">VALUE</span>
              </div>
              <div className="pa-px-split-dest">
                <span className="pa-px-split-dest__dot" />
                <span className="pa-px-split-dest__label">SIGNAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Process Photographic Plane (35–45% viewport width) */}
        <div ref={mediaRef} className="pa-px-source-split-stage__media-col">
          <div className="pa-px-source-split__media-frame">
            <PublicPicture
              assetKey="homeProcessDetail"
              alt="Close analytical inspection of process material"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const OneResponseSpread = SourceSplitJourney;
export default SourceSplitJourney;
