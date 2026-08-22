import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import EvidenceStrip from '../living-record/EvidenceStrip';
import MobileEvidenceSpine from '../living-record/MobileEvidenceSpine';
import ResponsiveEvidenceImage from '../living-record/ResponsiveEvidenceImage';
import './HomeBranchingScene.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * HomeBranchingScene (Scene 3)
 * Signature mechanic: One retained human response branches into genuinely unequal
 * multidimensional readings across the field:
 * Big Five (top-left) -> RIASEC (mid-right) -> Work Values (bottom-left crossing media) -> Career Signals (lower-right).
 */
export const HomeBranchingScene = () => {
  const sceneRef = useRef(null);
  const svgRef = useRef(null);
  const branch1Ref = useRef(null);
  const branch2Ref = useRef(null);
  const branch3Ref = useRef(null);
  const branch4Ref = useRef(null);
  const mediaCropRef = useRef(null);
  const [activeStep, setActiveStep] = useState(4);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTest = typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent);
    if (prefersReduced || isTest) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: 'top top',
          end: '+=160%',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Frame 0–25%: Big Five branch emerges (shorter, upper left trajectory)
      tl.fromTo(
        branch1Ref.current,
        { strokeDashoffset: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0
      );

      // Frame 25–50%: RIASEC branch emerges (longer upper-right sweep)
      tl.fromTo(
        branch2Ref.current,
        { strokeDashoffset: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0.25
      );

      // Frame 50–75%: Work Values branch crosses documentary media crop
      tl.fromTo(
        mediaCropRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.2, ease: 'none' },
        0.45
      );

      tl.fromTo(
        branch3Ref.current,
        { strokeDashoffset: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0.5
      );

      // Frame 75–100%: Career Signal extends down into lower-right field
      tl.fromTo(
        branch4Ref.current,
        { strokeDashoffset: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0.75
      );
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home-scene-branching"
      ref={sceneRef}
      className="pa-home-branching-scene"
      aria-label="Multi-dimensional evidence branching"
    >
      <div className="pa-home-branching-scene__inner">
        <div className="pa-home-branching-scene__stage">
          {/* Asymmetrically Anchored Protagonist */}
          <div className="pa-home-branching-scene__strip-center">
            <EvidenceStrip
              quote="“I clarify responsibilities before committing work.”"
              eyebrow="RETAINED SOURCE SPECIMEN"
              sourceLabel="SOURCE / ANSWER"
              theme="mineral"
              variant="branched"
              accumulatedMarks={true}
            />
          </div>

          {/* Asymmetric SVG Trace Connections (Unequal trajectories) */}
          <svg
            ref={svgRef}
            className="pa-home-branching-scene__svg"
            viewBox="0 0 1200 750"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Branch 1: Top-Left to Big Five */}
            <path
              ref={branch1Ref}
              d="M 380 320 C 260 260, 180 180, 100 120"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="500"
              className="pa-home-branching-scene__trace"
            />

            {/* Branch 2: Mid-Right to RIASEC (Different curvature and length) */}
            <path
              ref={branch2Ref}
              d="M 760 330 C 860 280, 940 260, 1020 200"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="500"
              className="pa-home-branching-scene__trace"
            />

            {/* Branch 3: Lower-Left to Work Values (Intersects documentary crop) */}
            <path
              ref={branch3Ref}
              d="M 360 410 C 240 470, 160 520, 90 590"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="500"
              className="pa-home-branching-scene__trace"
            />

            {/* Branch 4: Deep Lower-Right to Career Signal */}
            <path
              ref={branch4Ref}
              d="M 740 420 C 840 510, 920 580, 1040 640"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="500"
              className="pa-home-branching-scene__trace"
            />
          </svg>

          {/* Unequal Endpoint 1: Big Five (~7vw, ~12vh) */}
          <div className="pa-home-branching-scene__node pa-home-branching-scene__node--bigfive">
            <span className="pa-home-branching-scene__dim-tag">BIG FIVE</span>
            <strong className="pa-home-branching-scene__node-title">conscientiousness</strong>
            <span className="pa-home-branching-scene__node-sub">positive contribution</span>
          </div>

          {/* Unequal Endpoint 2: RIASEC (~61vw, ~22vh) */}
          <div className="pa-home-branching-scene__node pa-home-branching-scene__node--riasec">
            <span className="pa-home-branching-scene__dim-tag">RIASEC</span>
            <strong className="pa-home-branching-scene__node-title">investigative / conventional</strong>
            <span className="pa-home-branching-scene__node-sub">procedural rigor</span>
          </div>

          {/* Unequal Endpoint 3: Work Values + Documentary Media Crop (~6vw, ~58vh) */}
          <div
            ref={mediaCropRef}
            className="pa-home-branching-scene__node pa-home-branching-scene__node--values"
          >
            <div className="pa-home-branching-scene__media-crop">
              <ResponsiveEvidenceImage
                asset={MEDIA_ASSETS_V7.careerDeepInquiry}
                aspectRatio="4 / 3"
                sizes="320px"
              />
            </div>
            <div className="pa-home-branching-scene__node-text">
              <span className="pa-home-branching-scene__dim-tag">WORK VALUES</span>
              <strong className="pa-home-branching-scene__node-title">independence / learning</strong>
              <span className="pa-home-branching-scene__node-sub">high autonomy context</span>
            </div>
          </div>

          {/* Unequal Endpoint 4: Career Signal (~64vw, ~68vh) */}
          <div className="pa-home-branching-scene__node pa-home-branching-scene__node--career">
            <span className="pa-home-branching-scene__dim-tag">CAREER SIGNAL</span>
            <strong className="pa-home-branching-scene__node-title">ownership / planning</strong>
            <span className="pa-home-branching-scene__node-sub">ambiguous problem framing</span>
          </div>
        </div>

        {/* Mobile Vertical Spine Mode */}
        <div className="pa-home-branching-scene__mobile-mode">
          <div className="pa-home-branching-scene__mobile-strip">
            <EvidenceStrip
              quote="“I clarify responsibilities before committing work.”"
              eyebrow="RETAINED SOURCE SPECIMEN"
              sourceLabel="SOURCE / ANSWER"
              theme="carbon"
              variant="source"
            />
          </div>
          <MobileEvidenceSpine />
        </div>
      </div>
    </section>
  );
};

export default HomeBranchingScene;
