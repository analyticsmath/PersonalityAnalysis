import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import CursorCoordinator from '../motion/CursorCoordinator';
import { useRouteTransition } from '../motion/RouteTransitionCoordinator';

export const PublicLayout = ({
  children,
  headerTheme = 'light-content',
  withFooter = true,
  className = '',
}) => {
  const location = useLocation();
  const { markRouteReady } = useRouteTransition();

  useLayoutEffect(() => {
    if (typeof markRouteReady === 'function') {
      markRouteReady(location.pathname);
    }
  }, [location.pathname, markRouteReady]);

  return (
    <CursorCoordinator>
      <div className={`pa-v7-shell ${className}`}>
        <a href="#main-content" className="pa-skip-link">
          Skip to main content
        </a>

        <PublicHeader theme={headerTheme} />

        <main id="main-content" tabIndex="-1">
          {children}
        </main>

        {withFooter && <PublicFooter />}
      </div>
    </CursorCoordinator>
  );
};

export default PublicLayout;
