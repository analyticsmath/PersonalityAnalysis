import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/personality-v6/chrome/PublicLayout';
import MediaPlane from '../components/personality-v6/motion/MediaPlane';
import { MEDIA_ASSETS_V6 } from '../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../utils/personality-v4/navigation';

export const PublicNotFoundPage = () => {
  const { notFound } = PUBLIC_CONTENT;

  return (
    <PublicLayout headerTheme="dark">
      <div style={{ position: 'relative', minHeight: '100svh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--pa-obsidian)' }}>
        {/* Background Media Fragment */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} aria-hidden="true">
          <MediaPlane
            asset={MEDIA_ASSETS_V6.a01}
            objectPosition="50% 38%"
            alt=""
          />
        </div>

        {/* Content Bay */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '580px', padding: '2rem' }}>
          <span style={{ fontSize: '0.8125rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pa-stone)', fontWeight: 600 }}>
            404 · Unmapped State
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--pa-bone)', margin: '0.5rem 0 1rem 0', lineHeight: 1.05 }}>
            {notFound.title}
          </h1>
          <p style={{ fontSize: '1.1875rem', color: 'var(--pa-stone)', lineHeight: 1.5, marginBottom: '2.5rem' }}>
            {notFound.message}
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
            <Link to="/" className="pa-v6-btn pa-v6-btn--primary">
              {notFound.returnHome}
            </Link>
            <Link to={getSignupAcquisitionUrl()} className="pa-v6-btn pa-v6-btn--secondary">
              {notFound.buildProfile}
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublicNotFoundPage;
