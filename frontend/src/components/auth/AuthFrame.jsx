import React from 'react';
import { Link } from 'react-router-dom';
import { PublicPicture } from '../public-experience/media/PublicPicture';

export const AuthFrame = ({ mode = 'login', children }) => {
  const isLogin = mode === 'login';
  const assetKey = isLogin ? 'authLogin' : 'authSignup';
  const altText = isLogin
    ? 'Professional analysis environment'
    : 'Workshop baseline environment';

  return (
    <div className="pa-px-auth-root" data-auth-mode={mode}>
      <div className="pa-px-auth-media-col">
        <div className="pa-px-auth-media-frame">
          <PublicPicture assetKey={assetKey} alt={altText} priority={true} />
          <div className="pa-px-auth-media-shade" aria-hidden="true" />
          <div className="pa-px-auth-media-folio" aria-hidden="true">
            <span>PERSONALITY ASSESSOR</span>
            <span>{isLogin ? 'RETURN TO THE RECORD' : 'BEGIN THE RECORD'}</span>
          </div>
          <div className="pa-px-auth-media-thesis">
            <span>{isLogin ? 'CONTINUE' : 'START'}</span>
            <p>{isLogin ? 'Return to the evidence you have already built.' : 'Start with your own responses. Keep the source in view.'}</p>
          </div>
        </div>
      </div>

      <div className="pa-px-auth-form-col">
        <div className="pa-px-auth-form-topline">
          <Link to="/">Personality Assessor</Link>
          <span>{isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthFrame;