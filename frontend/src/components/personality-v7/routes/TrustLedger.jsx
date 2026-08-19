import React from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';

export const TrustLedger = () => {
  const data = PUBLIC_CONTENT.trust;

  return (
    <div className="pa-v7-document-stage">
      {/* Header on Paper */}
      <div className="pa-v7-document-header">
        <span className="pa-v7-eyebrow" style={{ color: 'var(--pa-stone)' }}>
          Data Governance & Method Transparency
        </span>
        <h1 className="pa-v7-route-title" style={{ color: 'var(--pa-ink)' }}>
          {data.title}
        </h1>
        <p className="pa-v7-route-lead" style={{ color: 'var(--pa-ink)', opacity: 0.85 }}>
          {data.lead}
        </p>
      </div>

      <div className="pa-v7-document-body">
        {/* Opening Plane (A08) */}
        <div style={{ height: '40svh', minHeight: '280px', borderRadius: '2px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 12px 32px rgba(24, 26, 22, 0.1)' }}>
          <MediaPlane
            asset={MEDIA_ASSETS_V7.a08}
            priority={true}
            objectPosition="50% 48%"
            alt="Data governance trust boundary"
          />
        </div>

        {/* Vertically Connected Evidence Chain */}
        <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
          {data.chain.map((item) => (
            <div key={item.stage} style={{ borderLeft: '2px solid var(--pa-ink)', paddingLeft: '1.5rem', position: 'relative' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pa-stone)' }}>
                Stage {item.stage} — {item.type}
              </span>
              <h2 style={{ fontSize: '1.375rem', color: 'var(--pa-ink)', margin: '0.35rem 0' }}>
                {item.title}
              </h2>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.55, color: 'var(--pa-ink)', opacity: 0.85, margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* User Governance & Direct Privacy Controls Link */}
        <div style={{ maxWidth: '820px', backgroundColor: 'rgba(24, 26, 22, 0.04)', padding: '2rem', borderRadius: '2px', border: '1px solid var(--pa-rule-paper)' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--pa-ink)', marginBottom: '0.5rem' }}>
            {data.controls.deleteTitle} &amp; {data.controls.exportTitle}
          </h3>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: 'var(--pa-ink)', opacity: 0.8, marginBottom: '1.25rem' }}>
            You maintain complete authority over your data. Manage, export, or delete your assessment records at any time.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to={data.controls.privacyControlsLink} className="pa-v7-btn pa-v7-btn--ink">
              Manage Privacy Controls
            </Link>
            <Link to={data.controls.privacyLink} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--pa-ink)', textDecoration: 'underline' }}>
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustLedger;
