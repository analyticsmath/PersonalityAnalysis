/**
 * Personality Assessor - Shared AuthFrame Component
 * Anchors the background environmental media and negative-space form layout
 * across both Login and Signup modes, preventing blank screen flashes.
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
      {/* Full Environmental Ground (Always mounted and anchored) */}
      <div
        className="pa-px-auth-bg-media visual-actor"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: 'var(--px-ink, #121416)',
        }}
      >
        <PublicPicture
          assetKey={assetKey}
          alt={altText}
          priority={true}
        />
      </div>

      {/* Direct Negative Space Form Container */}
      <div
        className="pa-px-auth-negative-space-form"
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 8vh, 80px) var(--px-outer-gutter, 6vw)',
          maxWidth: '38rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthFrame;
