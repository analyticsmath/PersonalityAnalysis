import React from 'react';
import { useLocation } from 'react-router-dom';
import AtlasHeader from './AtlasHeader';
import AtlasFooter from './AtlasFooter';

function getRouteKey(pathname = '') {
  const clean = pathname.split('?')[0].split('#')[0].replace(/^\//, '');
  if (!clean) return 'home';
  if (clean === 'career-intelligence') return 'career';
  if (clean === 'how-it-works') return 'how';
  return clean;
}

const AtlasLayout = ({ children, hideFooter = false }) => {
  const location = useLocation();
  const routeKey = getRouteKey(location.pathname);

  return (
    <div className="pa-atlas-root" data-route={routeKey}>
      <a href="#main-content" className="pa-atlas-skip-link">
        Skip to main content
      </a>

      <AtlasHeader />

      <main id="main-content" tabIndex="-1">
        {children}
      </main>

      {!hideFooter && <AtlasFooter />}
    </div>
  );
};

export default AtlasLayout;
