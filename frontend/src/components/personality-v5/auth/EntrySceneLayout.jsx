import React from 'react';
import { Link } from 'react-router-dom';
import ResponsivePicture from '../../personality-v4/media/ResponsivePicture';

/**
 * EntrySceneLayout — V5 Architecturally Integrated Authentication Surface
 *
 * Replaces floating modal card with an asymmetric geometric architectural split:
 * - Desktop: 55vw full-height photographic stage (A09/A10) + 45vw seamless paper ground form bay.
 * - Mobile: 36svh photographic crown flowing directly into the paper form bay.
 * - No generic photo-background-plus-panel floating artifact.
 */
export const EntrySceneLayout = ({
  asset,
  title,
  subtitle,
  children,
  objectPosition = '50% 38%',
}) => {
  return (
    <div
      className="pa-auth-v4 pa-auth-entry-scene"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'var(--pa-paper)',
        color: 'var(--pa-ink)',
        overflowX: 'clip',
      }}
    >
      {/* 55vw Photographic Stage (Desktop) */}
      <div
        className="pa-auth-photo-stage"
        style={{
          flex: '1.2',
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: 'var(--pa-black)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(24px, 4vh, 48px) var(--pa-gutter-desktop)',
        }}
      >
        {/* Full Stage Picture Actor */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.92,
          }}
        >
          <ResponsivePicture
            asset={asset}
            alt=""
            sizes="(max-width: 900px) 100vw, 58vw"
            objectPosition={objectPosition}
            priority={true}
          />
        </div>

        {/* Photographic Brand Header */}
        <div style={{ position: 'relative', zIndex: 5 }}>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--pa-font-serif)',
              fontSize: '22px',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: 'var(--pa-white)',
              textDecoration: 'none',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            Personality Assessor
          </Link>
        </div>

        {/* Ambient Photographic Caption */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            maxWidth: '38ch',
            color: 'var(--pa-white)',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: 'var(--pa-track-status)',
              color: 'var(--pa-fog)',
              marginBottom: '6px',
            }}
          >
            Empirical Architecture
          </div>
          <p
            style={{
              fontFamily: 'var(--pa-font-serif)',
              fontSize: 'clamp(18px, 1.8vw, 24px)',
              lineHeight: '1.3',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            “Context changes the question. The answer becomes one signal—not a verdict.”
          </p>
        </div>
      </div>

      {/* 45vw Seamless Paper Ground Form Bay */}
      <div
        className="pa-auth-form-stage"
        style={{
          flex: '1',
          minWidth: 'min(100%, 480px)',
          minHeight: '100vh',
          backgroundColor: 'var(--pa-paper)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 6vh, 80px) clamp(24px, 5vw, 64px)',
          borderLeft: '1px solid var(--pa-line-light)',
          position: 'relative',
          zIndex: 6,
        }}
      >
        <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '28px' }}>
            <Link
              to="/"
              style={{
                fontSize: '14px',
                color: 'var(--pa-quiet)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              ← Back to overview
            </Link>
          </div>

          <h1
            style={{
              fontFamily: 'var(--pa-font-serif)',
              fontSize: 'clamp(28px, 3.2vw, 38px)',
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
      </div>
    </div>
  );
};

export default EntrySceneLayout;
