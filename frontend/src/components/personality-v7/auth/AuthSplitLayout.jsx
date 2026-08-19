import React from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';

/**
 * AuthSplitLayout (V7 Signal Atlas 58/42 Architecture)
 * - 58% Viewport Left: Full photographic field (A09 for login, A10 for signup) visible from first paint.
 *   Contains brand/back affordance and one quiet sentence in lower-left.
 * - 42% Viewport Right: Flush paper form ground starting at stable 15-18vh. No floating shadow cards.
 * - Mobile: 40dvh media lead above seamless paper form. No mobile bottom dock.
 */
export const AuthSplitLayout = ({
  asset,
  title,
  subtitle,
  caption,
  objectPosition = '50% 39%',
  children,
}) => {
  return (
    <div className="pa-v7-auth-stage pa-auth-v4">
      {/* 58vw Photographic Field */}
      <div className="pa-v7-auth-media-pane">
        <MediaPlane
          asset={asset}
          objectPosition={objectPosition}
          alt=""
          priority={true}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,14,12,0.85) 0%, rgba(12,14,12,0.2) 60%, rgba(12,14,12,0.4) 100%)' }} />

        {/* Brand / Back Affordance */}
        <div style={{ position: 'absolute', top: '2rem', left: '2.5rem', zIndex: 3 }}>
          <Link
            to="/"
            style={{
              color: 'var(--pa-bone)',
              fontSize: '0.8125rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            ← PERSONALITY ASSESSOR
          </Link>
        </div>

        {/* Quiet Lower-Left Sentence */}
        <div className="pa-v7-auth-media-pane__caption">
          <span>{caption || title}</span>
        </div>
      </div>

      {/* 42vw Flush Paper Ground Form Volume */}
      <div className="pa-v7-auth-form-pane">
        <div className="pa-v7-auth-form-pane__inner">
          <h1>{title}</h1>
          <p className="lead">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
