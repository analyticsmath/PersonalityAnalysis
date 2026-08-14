import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/public/PublicChrome';

export default function PublicNotFoundPage() {
  return (
    <PublicLayout page="not-found">
      <main
        id="main-content"
        className="secondary-route"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '80px 20px',
        }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: 600, letterSpacing: '-0.04em', margin: 0 }}>
          404
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', margin: '16px 0 32px', maxWidth: '40ch' }}>
          This page does not exist or has moved. Return to the overview or begin your profile.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link className="ui-button ui-button--primary" to="/">
            Return Home
          </Link>
          <Link className="ui-button ui-button--secondary" to="/signup">
            Build My Profile
          </Link>
        </div>
      </main>
    </PublicLayout>
  );
}
