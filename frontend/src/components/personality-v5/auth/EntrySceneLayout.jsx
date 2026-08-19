import React from 'react';
import { Link } from 'react-router-dom';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';

/**
 * EntrySceneLayout — V5 Composed Authentication Surface
 *
 * Full-width photographic backdrop (A09 login, A10 signup) with an
 * interlocked off-white form bay entering from the lower-right.
 */
export const EntrySceneLayout = ({
  asset,
  title,
  subtitle,
  children,
  objectPosition = '50% 40%',
}) => {
  return (
    <div className="pa-auth-v4 pa-auth-entry-scene" style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'var(--pa-black)', color: 'var(--pa-ink)' }}>
      {/* Background Photographic Ground */}
      <div
        className="pa-auth-photo-ground"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.85,
        }}
      >
        <ResponsivePicture
          asset={asset}
          alt=""
          sizes="100vw"
          objectPosition={objectPosition}
          priority={true}
        />
      </div>

      {/* Shared Header Navigation */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '24px var(--pa-gutter-desktop)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          color: 'var(--pa-white)',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--pa-font-serif)',
            fontSize: '20px',
            letterSpacing: '-0.02em',
            color: 'var(--pa-white)',
            textDecoration: 'none',
          }}
        >
          Personality Assessor
        </Link>
        <Link
          to="/"
          style={{
            fontSize: '14px',
            color: 'var(--pa-fog)',
            textDecoration: 'none',
          }}
        >
          ← Back to overview
        </Link>
      </header>

      {/* Interlocked Form Bay */}
      <main
        style={{
          position: 'relative',
          zIndex: 5,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '100px var(--pa-gutter-desktop) 48px',
        }}
      >
        <div
          className="pa-auth-form-bay"
          style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: 'var(--pa-paper)',
            padding: 'clamp(32px, 4vw, 48px)',
            borderRadius: 'var(--pa-radius-btn)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.45)',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--pa-font-serif)',
              fontSize: '32px',
              lineHeight: '1.15',
              marginBottom: '8px',
              color: 'var(--pa-ink)',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '15px',
                color: 'var(--pa-cool-600)',
                marginBottom: '28px',
                lineHeight: '1.5',
              }}
            >
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </main>
    </div>
  );
};

export default EntrySceneLayout;
