import React from 'react';
import { Link } from 'react-router-dom';
import ResponsivePicture from '../media/ResponsivePicture';

export const AuthLayout = ({
  mediaAsset,
  pageType = 'login',
  heading,
  subtitle,
  children,
}) => {
  return (
    <div className="pa-auth-v4">
      <a href="#auth-form-container" className="pa-skip-link">
        Skip to form
      </a>

      <div className="pa-auth-page" data-page={pageType}>
        <div className="pa-auth-media-plane">
          <Link to="/" className="pa-auth-brand-overlay" aria-label="Personality Assessor Home">
            <span>Personality Assessor</span>
          </Link>

          <div className="pa-auth-media-actor" aria-hidden="true">
            <ResponsivePicture
              asset={mediaAsset}
              alt=""
              priority={true}
              sizes="(max-width: 900px) 100vw, 64vw"
              objectPosition={pageType === 'login' ? '50% 39%' : '51% 45%'}
            />
          </div>
        </div>

        <div className="pa-auth-form-plane">
          <div className="pa-auth-form-top-nav">
            <Link to="/" className="pa-auth-back-link">
              ← Back to overview
            </Link>
          </div>

          <div id="auth-form-container" className="pa-auth-form-container" tabIndex={-1}>
            <h1>{heading}</h1>
            <p className="pa-auth-form-subtitle">{subtitle}</p>

            {children}
          </div>

          <div style={{ marginTop: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
