import React, { useEffect, useState } from 'react';
import SceneHeader from './SceneHeader';
import MobileBottomNav from './MobileBottomNav';

export const PublicLayout = ({ headerTheme = 'dark', children }) => {
  const [activeTheme, setActiveTheme] = useState(headerTheme);

  useEffect(() => {
    setActiveTheme(headerTheme);
  }, [headerTheme]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    const sections = document.querySelectorAll('[data-header-theme]');
    if (!sections.length) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-header-theme');
            if (theme === 'light' || theme === 'dark') {
              setActiveTheme(theme);
            }
          }
        });
      },
      {
        rootMargin: '-5% 0px -80% 0px',
        threshold: 0,
      }
    );


    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, [children]);

  return (
    <div className="pa-v6-shell">
      <SceneHeader headerTheme={activeTheme} />
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default PublicLayout;

