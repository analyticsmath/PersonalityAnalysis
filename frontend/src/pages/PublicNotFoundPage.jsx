import React from 'react';
import { Link } from 'react-router-dom';
import { PublicPicture } from '../components/public-experience/media/PublicPicture';
import { getSignupAcquisitionUrl } from '../content/public-experience/navigation';

export const PublicNotFoundPage = () => {
  return (
    <div
      className="pa-px-not-found-container"
      style={{
        minHeight: '84vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(var(--px-header-height-desktop) + 48px) var(--px-outer-gutter) 64px',
        backgroundColor: 'var(--pa-paper)',
        color: 'var(--pa-ink)',
      }}
    >
      <div
        style={{
          width: 'clamp(200px, 30vw, 360px)',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          borderRadius: 'var(--px-radius-sm)',
          marginBottom: '24px',
          backgroundColor: 'var(--pa-mineral)',
          boxShadow: '0 12px 32px rgba(23, 25, 24, 0.06)',
        }}
      >
        <PublicPicture
          assetKey="homeProcessDetail"
          alt="Technical drawing inspection"
        />
      </div>

      <h1
        style={{
          fontFamily: 'var(--pa-font-family)',
          fontSize: 'clamp(3.6rem, 7vw, 7.2rem)',
          fontWeight: 'var(--px-weight-bold)',
          lineHeight: '0.9',
          letterSpacing: '-0.04em',
          color: 'var(--pa-ink)',
          margin: '0 0 12px 0',
        }}
      >
        404
      </h1>

      <p
        style={{
          fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)',
          color: 'var(--pa-graphite)',
          maxWidth: '44ch',
          lineHeight: '1.45',
          margin: '0 0 28px 0',
        }}
      >
        The requested route is outside the current evidence record.
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="pa-px-btn-primary">
          Return home
        </Link>
        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-secondary">
          Build profile
        </Link>
      </div>
    </div>
  );
};

export default PublicNotFoundPage;
