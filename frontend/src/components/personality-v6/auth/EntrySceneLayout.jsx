import React from 'react';
import { Link } from 'react-router-dom';
import MediaPlane from '../motion/MediaPlane';

/**
 * EntrySceneLayout (V6 55/45 Architecture)
 * - 55% Viewport Left: Full bleed media field (A09 for login, A10 for signup) with contextual line and back affordance.
 * - 45% Viewport Right: Architectural paper ground flush to viewport edge, shared vertical seam, zero drop shadow / card box silhouette.
 * - Mobile: 38dvh media lead above full-width paper form.
 */
export const EntrySceneLayout = ({
  asset,
  title,
  subtitle,
  objectPosition = '50% 39%',
  children,
}) => {
  return (
    <div className="pa-v6-auth-stage">
      {/* 55vw Visual Side */}
      <div className="pa-v6-auth-media-pane">
        <MediaPlane
          asset={asset}
          objectPosition={objectPosition}
          alt=""
          priority={true}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,18,16,0.85) 0%, rgba(17,18,16,0.2) 60%, rgba(17,18,16,0.5) 100%)' }} />

        {/* Brand Link */}
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
            }}
          >
            ← PERSONALITY ASSESSOR
          </Link>
        </div>

        {/* Contextual Line */}
        <div className="pa-v6-auth-media-pane__caption">
          <span>{title}</span>
        </div>
      </div>

      {/* 45vw Architectural Paper Ground Form Volume */}
      <div className="pa-v6-auth-form-pane">
        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--pa-obsidian)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            {title}
          </h1>
          <p className="lead" style={{ color: 'var(--pa-muted)', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: '2rem' }}>
            {subtitle}
          </p>

          {children}
        </div>
      </div>
    </div>
  );
};

export default EntrySceneLayout;
