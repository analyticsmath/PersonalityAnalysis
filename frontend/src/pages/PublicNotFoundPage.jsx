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
    <PublicLayout headerTheme="light" withFooter={true}>
      <div className="pa-v7-404-stage pa-public-404">
        <div className="pa-v7-404-card">
          <MediaPlane asset={MEDIA_ASSETS_V7.a01} alt="Abstract profile evidence crop" />
          <div>
          <h1>
            {data.title}
          </h1>
          <p>
            {data.message}
          </p>
          <div className="pa-public-404__actions">
            <Link to="/" className="pa-v7-btn pa-v7-btn--primary">
              {data.returnHome}
            </Link>
            <Link to={getSignupAcquisitionUrl()} className="pa-v7-btn pa-v7-btn--secondary">
              {data.buildProfile}
            </Link>
          </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublicNotFoundPage;
