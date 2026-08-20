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
      <div className="pa-v7-auth-media-pane">
        <MediaPlane
          asset={asset}
          objectPosition={objectPosition}
          alt=""
          priority={true}
        />
        <div className="pa-v7-auth-media-pane__brand">
          <Link
            to="/"
            style={{
              color: 'var(--pa-ink)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            ← Personality Assessor
          </Link>
        </div>

        {/* Quiet Lower-Left Sentence */}
        <div className="pa-v7-auth-media-pane__caption">
          <span>{caption || title}</span>
        </div>
      </div>

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
