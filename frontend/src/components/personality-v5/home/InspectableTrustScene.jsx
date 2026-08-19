import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';

/**
 * Scene 06 — Inspectable Trust (V5)
 *
 * Environmental handoff with A08:
 * - 4-stage transparent processing pipeline.
 * - Explicit contrast and thin measured boundaries.
 * - Links to /methodology and /trust.
 */
export const InspectableTrustScene = () => {
  const { trustScene } = PUBLIC_CONTENT.home;
  const stages = trustScene?.stages || [];

  return (
    <section
      className="pa-trust-v5"
      data-header-theme="dark"
      aria-label="Trust & Governance"
    >
      <div className="pa-container">
        {/* Broad Environmental Photographic Plane */}
        <div className="pa-trust-handoff-plane">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a08}
            alt={MEDIA_ASSETS.a08.alt}
            sizes="100vw"
            objectPosition="50% 48%"
          />
        </div>

        {/* 4-Stage Transparent Processing Chain */}
        <div className="pa-trust-stages-row">
          {stages.map((node, idx) => (
            <div key={node.id || idx} className="pa-trust-stage-col">
              <h4>Stage 0{idx + 1}</h4>
              <h3>{node.name}</h3>
              <p>{node.detail}</p>
            </div>
          ))}
        </div>

        {/* Action Link to Full Trust Chain */}
        <div style={{ marginTop: '40px', textAlign: 'right' }}>
          <Link to="/trust" className="pa-btn pa-btn--inverse-outline">
            Inspect Full Data Pipeline →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InspectableTrustScene;
