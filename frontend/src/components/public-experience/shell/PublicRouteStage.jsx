/**
 * Personality Assessor - Public Route Stage
 * Clean route stage rendering public route content over a persistent dark Ink substrate.
 * Works seamlessly with TransitionPortal for cross-route visual actor carry without blank flashes.
 */

import React from 'react';
import { useLocation } from 'react-router-dom';

export const PublicRouteStage = ({ children }) => {
  const location = useLocation();

  return (
    <div
      className="pa-px-route-stage"
      data-route-path={location.pathname}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--px-ink, #121416)',
        color: 'var(--px-white, #F7F8F8)',
      }}
    >
      <div
        key={location.pathname}
        className="pa-px-route-layer pa-px-route-layer--incoming"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PublicRouteStage;

