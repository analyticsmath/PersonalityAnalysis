import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/personality-v7/chrome/PublicLayout';
import MediaPlane from '../components/personality-v7/motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../content/personality-v7/publicContent';
import { getSignupAcquisitionUrl } from '../utils/personality-v4/navigation';

export const PublicNotFoundPage = () => {
  const data = PUBLIC_CONTENT.notFound;

  return (
    <PublicLayout headerTheme="dark" withFooter={true}>
      <div className="pa-v7-404-stage">
        <div className="pa-v7-404-card">
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
            <MediaPlane asset={MEDIA_ASSETS_V7.a01} alt="404 pattern fragment" />
          </div>

          <span className="pa-v7-eyebrow">404 — Unknown Route</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--pa-bone)', margin: 0 }}>
            {data.title}
          </h1>
          <p style={{ color: 'var(--pa-stone)', lineHeight: 1.5, margin: 0 }}>
            {data.message}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/" className="pa-v7-btn pa-v7-btn--primary">
              {data.returnHome}
            </Link>
            <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--secondary">
              {data.buildProfile}
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublicNotFoundPage;
