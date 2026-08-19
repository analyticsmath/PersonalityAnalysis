import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

export const ProfileChangeChapter = () => {
  const containerRef = useRef(null);
  const data = PUBLIC_CONTENT.home.developmentEcho;

  useCinematicScene(({ isDesktop }) => {
    if (!isDesktop || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll('.pa-v7-change__plate'),
      { y: 30, opacity: 0.8 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="pa-v7-chapter-change"
      aria-label="Chapter 05 — A Profile Can Change"
    >
      <div className="pa-v7-change__container">
        {/* Header Rail */}
        <div className="pa-v7-change__header-rail">
          <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
            Longitudinal Record
          </span>
          <h2 className="pa-v7-change__h2">
            {data.title}
          </h2>
          <p className="pa-v7-change__lead">
            {data.body}
          </p>
        </div>

        {/* Offset Paper-Mounted Plates System */}
        <div className="pa-v7-change__plates-system">
          {/* Earlier State Plate (Upper Left) */}
          <div className="pa-v7-change__plate pa-v7-change__plate--earlier">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a05}
              objectPosition="50% 40%"
              alt="Earlier baseline assessment state"
            />
            <div className="pa-v7-change__plate-meta">
              <span>{data.earlierLabel} ({data.earlierDate})</span>
            </div>
          </div>

          {/* Central Measurement Line & 4 Deltas */}
          <div className="pa-v7-change__measurement-line">
            {data.traitsComparison.map((item, idx) => (
              <div key={idx} className="pa-v7-change__delta-item">
                <span className="pa-v7-change__delta-label">{item.label}</span>
                <div className="pa-v7-change__delta-values">
                  <span>{item.earlier}% → <strong>{item.current}%</strong></span>
                </div>
                <span className="pa-v7-change__delta-note">{item.status}</span>
              </div>
            ))}
          </div>

          {/* Current State Plate (Lower Right) */}
          <div className="pa-v7-change__plate pa-v7-change__plate--current">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a06}
              objectPosition="50% 39%"
              alt="Current reassessed assessment state"
            />
            <div className="pa-v7-change__plate-meta">
              <span>{data.currentLabel} ({data.currentDate})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileChangeChapter;
