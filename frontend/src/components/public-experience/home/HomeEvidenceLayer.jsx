/**
 * Personality Assessor - Home Evidence Layer
 * DOM-First Canonical Visual Actors:
 * - Primary World Entry Actor (starts full-screen, transforms to 4:5 plate)
 * - Support Detail Plate Actor
 * - Invisible Evidence Target geometry marker
 * - 4 Workworld Spatial Environments (Precision, Autonomy, Collaboration, Operational Pressure)
 */

import React from 'react';
import { PublicPicture } from '../media/PublicPicture';

export const HomeEvidenceLayer = () => {
  return (
    <div className="pa-px-home-evidence-root" aria-hidden="false">
      {/* ── 1. Canonical DOM Visual Actors (Always visible without WebGL) ── */}

      {/* Primary World Entry Actor (Starts full-screen at p=0, collapses to 4:5 plate) */}
      <div
        data-visual-actor="home-observation-primary"
        className="pa-px-home-primary-actor visual-actor"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 2,
          willChange: 'transform, opacity, clip-path',
        }}
      >
        <div
          className="visual-actor__crop"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="visual-actor__inner-image"
            style={{
              position: 'absolute',
              inset: '-10% -10%',
              width: '120%',
              height: '120%',
              willChange: 'transform',
            }}
          >
            <PublicPicture
              assetKey="homeWorldEntry"
              alt="Contextual architectural design studio environment"
              priority={true}
            />
          </div>
        </div>
      </div>

      {/* Secondary Support Detail Plate Actor */}
      <div
        data-visual-actor="home-observation-secondary"
        className="pa-px-home-support-actor visual-actor"
        style={{
          position: 'absolute',
          top: '22%',
          right: 'var(--px-outer-gutter, 6vw)',
          width: 'clamp(220px, 22vw, 340px)',
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          zIndex: 3,
          opacity: 0,
          visibility: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        <div
          className="visual-actor__crop"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="visual-actor__inner-image"
            style={{
              position: 'absolute',
              inset: '-10% -10%',
              width: '120%',
              height: '120%',
              willChange: 'transform',
            }}
          >
            <PublicPicture
              assetKey="homeSituationDetail"
              alt="Close analytical inspection of engineering materials"
              priority={true}
            />
          </div>
        </div>
      </div>

      {/* Invisible Geometry Target Reference Marker (Never holds media) */}
      <div
        className="home-evidence-target pa-px-evidence-target-slot"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '22%',
          left: 'var(--px-outer-gutter, 6vw)',
          width: 'clamp(320px, 31vw, 470px)',
          aspectRatio: '4 / 5',
          pointerEvents: 'none',
          visibility: 'hidden',
          zIndex: 0,
        }}
      />

      {/* ── 2. Workworld 4-Environment Centerpiece Layer ── */}
      <div className="pa-px-workworld-layer" aria-label="Workworld Environments">
        {/* Environment 1: Precision */}
        <div className="pa-px-workworld-env pa-px-env--precision" data-world="precision">
          <div className="pa-px-workworld-media-slot visual-actor" data-visual-actor="home-workworld-precision">
            <div className="visual-actor__crop">
              <div className="visual-actor__inner-image">
                <PublicPicture
                  assetKey="workworldPrecision"
                  alt="Precision lathe operation in engineering workshop"
                />
              </div>
            </div>
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Precision</h2>
            <p className="pa-px-env-support">When detail is unforgiving.</p>
          </div>
        </div>

        {/* Environment 2: Autonomy */}
        <div className="pa-px-workworld-env pa-px-env--autonomy" data-world="autonomy">
          <div className="pa-px-workworld-media-slot visual-actor" data-visual-actor="home-workworld-autonomy">
            <div className="visual-actor__crop">
              <div className="visual-actor__inner-image">
                <PublicPicture
                  assetKey="workworldAutonomy"
                  alt="Autonomous focused work in studio"
                />
              </div>
            </div>
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Autonomy</h2>
            <p className="pa-px-env-support">When self-direction sets the standard.</p>
          </div>
        </div>

        {/* Environment 3: Collaboration */}
        <div className="pa-px-workworld-env pa-px-env--collaboration" data-world="collaboration">
          <div className="pa-px-workworld-media-slot visual-actor" data-visual-actor="home-workworld-collaboration">
            <div className="visual-actor__crop">
              <div className="visual-actor__inner-image">
                <PublicPicture
                  assetKey="workworldCollaboration"
                  alt="Collaborative design alignment across shared artifacts"
                />
              </div>
            </div>
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Collaboration</h2>
            <p className="pa-px-env-support">When the work depends on alignment.</p>
          </div>
        </div>

        {/* Environment 4: Operational Pressure */}
        <div className="pa-px-workworld-env pa-px-env--pressure" data-world="pressure">
          <div className="pa-px-workworld-media-slot visual-actor" data-visual-actor="home-workworld-pressure">
            <div className="visual-actor__crop">
              <div className="visual-actor__inner-image">
                <PublicPicture
                  assetKey="workworldPressure"
                  alt="Real-time operational control room coordination"
                />
              </div>
            </div>
          </div>
          <div className="pa-px-workworld-copy">
            <h2 className="pa-px-env-title">Operational pressure</h2>
            <p className="pa-px-env-support">When timing becomes part of the decision.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEvidenceLayer;

