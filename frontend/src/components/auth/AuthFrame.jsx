/**
 * Personality Assessor - Shared AuthFrame Component
 * Light-theme negative-space layout: 35-45% photographic region breaking grid,
 * deliberate light form field with solid white/mineral inputs.
 */

import React from 'react';
import { PublicPicture } from '../public-experience/media/PublicPicture';

export const AuthFrame = ({ mode = 'login', children }) => {
  const isLogin = mode === 'login';
  const assetKey = isLogin ? 'authLogin' : 'authSignup';
  const altText = isLogin
    ? 'Professional analysis environment'
    : 'Workshop baseline environment';

  return (
    <div className="pa-px-auth-root" data-auth-mode={mode}>
      {/* 35-45% Environmental Photographic Column */}
      <div className="pa-px-auth-media-col">
        <div className="pa-px-auth-media-frame">
          <PublicPicture
            assetKey={assetKey}
            alt={altText}
            priority={true}
          />
        </div>
      </div>

      {/* Light Negative Space Form Container */}
      <div className="pa-px-auth-form-col">
        {children}
      </div>
    </div>
  );
};

export default AuthFrame;
