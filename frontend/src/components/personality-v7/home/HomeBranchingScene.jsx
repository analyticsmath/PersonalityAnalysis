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
 * Primary signature mechanic:
 * One retained response branches into multiple evidence contributions across dimensions:
 * Big Five -> RIASEC -> Work Values (crossing media) -> Career Signals.
 */
export const HomeBranchingScene = () => {
  const sceneRef = useRef(null);
  const svgRef = useRef(null);
  const branch1Ref = useRef(null);
  const branch2Ref = useRef(null);
  const branch3Ref = useRef(null);
  const branch4Ref = useRef(null);
  const mediaCropRef = useRef(null);
  const [activeStep, setActiveStep] = useState(4); // default full for static/reduced-motion

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

      // Frame 0–25%: Big Five branch emerges
      tl.fromTo(
        branch1Ref.current,
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0
      );

      // Frame 25–50%: RIASEC branch emerges in different trajectory
      tl.fromTo(
        branch2Ref.current,
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0.25
      );

      // Frame 50–75%: Work Values branch crosses documentary media crop
      tl.fromTo(
        mediaCropRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.2, ease: 'none' },
        0.45
      );

      tl.fromTo(
        branch3Ref.current,
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0.5
      );

      // Frame 75–100%: Career Signal extends
      tl.fromTo(
        branch4Ref.current,
        { strokeDashoffset: 400, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.25, ease: 'none' },
        0.75
      );
    }, scene);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sceneRef}
      id="home-scene-branching"
      className="pa-home-branching-scene"
      aria-label="Evidence branching: Multiple contributions from one source"
    >
      <div className="pa-home-branching-scene__inner">
        {/* Desktop Asymmetric Branching Stage */}
        <div className="pa-home-branching-scene__stage">
          {/* Centered Source Strip */}
          <div className="pa-home-branching-scene__strip-center">
            <EvidenceStrip
              quote="“I clarify responsibilities before committing work.”"
              eyebrow="SOURCE SPECIMEN"
              sourceLabel="SOURCE / ANSWER"
              theme="carbon"
              variant="branched"
            />
          </div>

          {/* SVG Asymmetric Traces */}
          <svg
            ref={svgRef}
            className="pa-home-branching-scene__svg"
            viewBox="0 0 1200 700"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Branch 1: Top-Left to Big Five */}
            <path
              ref={branch1Ref}
              d="M 450 320 Q 280 240 160 140"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="400"
              className="pa-home-branching-scene__trace"
            />

            {/* Branch 2: Top-Right to RIASEC */}
            <path
              ref={branch2Ref}
              d="M 750 320 Q 920 230 1060 140"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="400"
              className="pa-home-branching-scene__trace"
            />

            {/* Branch 3: Bottom-Left to Work Values across media */}
            <path
              ref={branch3Ref}
              d="M 460 380 Q 300 480 180 570"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="400"
              className="pa-home-branching-scene__trace"
            />

            {/* Branch 4: Bottom-Right to Career Signal */}
            <path
              ref={branch4Ref}
              d="M 740 380 Q 900 490 1040 580"
              fill="none"
              stroke="var(--pa-oxblood, #642832)"
              strokeWidth="2.5"
              strokeDasharray="400"
              className="pa-home-branching-scene__trace"
            />
          </svg>

          {/* Endpoint 1: Big Five */}
          <div className="pa-home-branching-scene__node pa-home-branching-scene__node--top-left">
            <span className="pa-home-branching-scene__dim-tag">BIG FIVE</span>
            <strong className="pa-home-branching-scene__node-title">conscientiousness</strong>
            <span className="pa-home-branching-scene__node-sub">positive contribution</span>
          </div>

          {/* Endpoint 2: RIASEC */}
          <div className="pa-home-branching-scene__node pa-home-branching-scene__node--top-right">
            <span className="pa-home-branching-scene__dim-tag">RIASEC</span>
            <strong className="pa-home-branching-scene__node-title">investigative / conventional</strong>
            <span className="pa-home-branching-scene__node-sub">procedural rigor</span>
          </div>

          {/* Endpoint 3: Work Values + Documentary Media Crop */}
          <div
            ref={mediaCropRef}
            className="pa-home-branching-scene__node pa-home-branching-scene__node--bottom-left"
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

          {/* Endpoint 4: Career Signal */}
          <div className="pa-home-branching-scene__node pa-home-branching-scene__node--bottom-right">
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
              eyebrow="RETAINED SOURCE"
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
