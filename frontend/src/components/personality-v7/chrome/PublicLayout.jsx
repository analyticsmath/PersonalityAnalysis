import React from 'react';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import CursorCoordinator from '../motion/CursorCoordinator';
import RouteTransitionCoordinator from '../motion/RouteTransitionCoordinator';

export const PublicLayout = ({
  children,
  headerTheme = 'light-content',
  withFooter = true,
  className = '',
}) => {
  return (
    <RouteTransitionCoordinator>
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
    </RouteTransitionCoordinator>
  );
};

export default PublicLayout;
