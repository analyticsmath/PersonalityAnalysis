import React from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import EditorialFooter from '../chrome/EditorialFooter';

export const InspectabilityEntryChapter = () => {
  const trustData = PUBLIC_CONTENT.home.trustScene;
  const ctaData = PUBLIC_CONTENT.home.finalProfile;

  return (
    <section className="pa-v7-chapter-inspectability" aria-label="Chapter 06 — Inspectability and Entry">
      <div className="pa-v7-inspectability__container">
        {/* Broad Landscape Handoff Plate (A08) */}
        <div className="pa-v7-inspectability__handoff-plate">
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a08}
            objectPosition="50% 48%"
            alt="Method handoff fingertip boundary"
          />
        </div>

        <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
          Transparent Architecture
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.02, color: 'var(--pa-ink)', marginBottom: '3rem' }}>
          {trustData.title}
        </h2>

        {/* Four Numbered Verbs Along One Continuous Path */}
        <div className="pa-v7-inspectability__verbs-path">
          {trustData.stages.map((stage) => (
            <div key={stage.id} className="pa-v7-inspectability__verb-item">
              <span className="pa-v7-inspectability__verb-num">{stage.num}</span>
              <h3 className="pa-v7-inspectability__verb-title">{stage.name}</h3>
              <p className="pa-v7-inspectability__verb-desc">{stage.detail}</p>
            </div>
          ))}
        </div>

        {/* Secondary Links */}
        <div className="pa-v7-inspectability__secondary-links">
          {trustData.links.map((link, idx) => (
            <Link key={idx} to={link.to}>
              {link.label} →
            </Link>
          ))}
        </div>
      </div>

      {/* Final Acquisition Dark Field with Cropped Return of A01 */}
      <div className="pa-v7-final-cta-field">
        <div className="pa-v7-final-cta__grid">
          <div className="pa-v7-final-cta__copy">
            <h2 className="pa-v7-final-cta__h2">
              {ctaData.title}
            </h2>
            <p className="pa-v7-final-cta__lead">
              {ctaData.body}
            </p>
            <div>
              <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--primary" style={{ minHeight: '52px', fontSize: '0.9375rem', padding: '0 2rem' }}>
                {ctaData.cta}
              </Link>
            </div>
          </div>

          <div className="pa-v7-final-cta__media-crop">
            <MediaPlane
              asset={MEDIA_ASSETS_V7.a01}
              objectPosition="50% 38%"
              alt="Final profile return crop"
            />
          </div>
        </div>
      </div>

      {/* Integrated Editorial Footer */}
      <EditorialFooter />
    </section>
  );
};

export default InspectabilityEntryChapter;
