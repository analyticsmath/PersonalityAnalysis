import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../content/public-experience/publicContent';
import { getSignupAcquisitionUrl } from '../content/public-experience/navigation';

export const PublicNotFoundPage = () => {
  const data = PUBLIC_CONTENT.notFound;

  return (
    <div
      className="pa-px-not-found-container"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px',
      }}
    >
      <h1 className="pa-px-heading-xl" style={{ marginBottom: '16px' }}>
        {data.title}
      </h1>
      <p className="pa-px-body-lg" style={{ maxWidth: '32rem', marginBottom: '32px', opacity: 0.85 }}>
        {data.message}
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="pa-px-btn-primary">
          {data.returnHome}
        </Link>
        <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-secondary">
          {data.buildProfile}
        </Link>
      </div>
    </div>
  );
};

export default PublicNotFoundPage;
