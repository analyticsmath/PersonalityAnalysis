import React from 'react';
import SceneHeader from './SceneHeader';
import MobileBottomNav from './MobileBottomNav';

export const PublicLayout = ({ headerTheme = 'dark', children }) => {
  return (
    <div className="pa-v6-shell">
      <SceneHeader headerTheme={headerTheme} />
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default PublicLayout;
