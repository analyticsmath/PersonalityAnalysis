import React from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/personality-v4/chrome/PublicLayout';
import ResponsivePicture from '../components/personality-v4/media/ResponsivePicture';
import { MEDIA_ASSETS } from '../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../utils/personality-v4/navigation';

export const PublicNotFoundPage = () => {
  const { notFound } = PUBLIC_CONTENT;

  return (
    <PublicLayout headerTheme="dark">
      <div className="pa-404-container">
        <div className="pa-404-bg" aria-hidden="true">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a01}
            alt=""
            sizes="100vw"
            objectPosition="50% 38%"
          />
        </div>

        <div className="pa-404-content">
          <h1>{notFound.title}</h1>
          <p>{notFound.message}</p>

          <div className="pa-404-actions">
            <Link to="/" className="pa-btn pa-btn--primary">
              {notFound.returnHome}
            </Link>
            <Link to={getSignupAcquisitionUrl()} className="pa-btn pa-btn--inverse">
              {notFound.buildProfile}
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublicNotFoundPage;
