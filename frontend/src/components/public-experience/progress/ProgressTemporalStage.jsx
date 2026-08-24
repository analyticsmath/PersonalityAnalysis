import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

gsap.registerPlugin(ScrollTrigger);

export const ProgressTemporalStage = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.progress;
  const { prefersReducedMotion } = usePublicCapabilities();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const laterLayer = containerRef.current.querySelector('.pa-px-progress-layer--later');
      const findings = containerRef.current.querySelector('.pa-px-progress-findings');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(
        laterLayer,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        { clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 50% 100%)', duration: 1 }
      ).fromTo(findings, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.3);
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div className="pa-px-progress-root">
      <div ref={containerRef} className="pa-px-progress-stage">
        <div className="pa-px-progress-stage__sticky">
          <div className="pa-px-progress-layers">
            <div className="pa-px-progress-layer pa-px-progress-layer--base">
              <PublicPicture assetKey="homeWorldEntry" alt="Initial baseline assessment environment" />
            </div>
            <div className="pa-px-progress-layer pa-px-progress-layer--later">
              <PublicPicture assetKey="workworldAutonomy" alt="Later shifted career context" />
            </div>
          </div>

          <div className="pa-px-progress-header">
            <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
              Longitudinal Calibration
            </span>
            <h1>{data.hero.headline}</h1>
            <p>{data.hero.support}</p>
          </div>

          <div className="pa-px-progress-findings">
            <div className="pa-px-progress-finding">
              <h3>Trait Stability Over Time</h3>
              <p>
                Core problem formulation and conscientious risk containment remain 89% consistent across annual assessment re-evaluations.
              </p>
            </div>
            <div className="pa-px-progress-finding">
              <h3>Contextual Skill Adaptation</h3>
              <p>
                Collaborative decision making and cross-functional delegation increase 34% as organizational scope expands.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pa-px-progress-empty">
        <span className="pa-px-context-data" style={{ color: 'var(--px-soft)' }}>Initial Baseline Required</span>
        <h2>{data.emptyState.headline}</h2>
        <p>{data.emptyState.support}</p>
        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
          {data.emptyState.cta}
        </Link>
      </div>
    </div>
  );
};

export default ProgressTemporalStage;
