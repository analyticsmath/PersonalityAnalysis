import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';

/**
 * Scene 07 — Final Profile Callback (V5)
 *
 * Photographic callback to A01 preceding the monumental footer.
 */
export const FinalProfileScene = () => {
  const { finalProfile, closingCta } = PUBLIC_CONTENT.home;
  const config = finalProfile || closingCta || {};

  return (
    <section className="pa-final-profile-v5" aria-label="Begin Assessment">
      <div className="pa-container">
        {/* A01 Callback Fragment */}
        <div className="pa-final-callback-plane">
          <ResponsivePicture
            asset={MEDIA_ASSETS.a01}
            alt={MEDIA_ASSETS.a01.alt}
            sizes="(max-width: 1024px) 100vw, 32vw"
            objectPosition="50% 34%"
          />
        </div>

        {/* Closing Action Bay */}
        <div className="pa-final-cta-box">
          <h2>{config.title || 'Build a profile you can question.'}</h2>
          <p style={{ color: 'var(--pa-fog)', fontSize: '18px', marginBottom: '32px', lineHeight: '1.5' }}>
            {config.body || config.lead || 'Start with the work you already know. Add evidence as your career changes.'}
          </p>
          <Link
            to={getSignupAcquisitionUrl('/assessment/start')}
            className="pa-btn pa-btn--inverse"
            style={{ padding: '0 36px', height: '52px' }}
          >
            {config.cta || config.buttonLabel || 'Build my profile'} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalProfileScene;
