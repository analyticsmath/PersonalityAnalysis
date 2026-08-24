import React, { useState } from 'react';
import { PublicMotionRoot } from '../motion/PublicMotionRoot';
import { PublicHeader } from './PublicHeader';
import { PublicIndex } from './PublicIndex';
import { PublicFooter } from './PublicFooter';

export const PublicExperienceRoot = ({ children, withFooter = true }) => {
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  return (
    <PublicMotionRoot>
      <div className="pa-public-experience">
        {/* Accessible Skip Link */}
        <a href="#main-content" className="pa-px-skip-link">
          Skip to main content
        </a>

        {/* Global Public Header */}
        <PublicHeader onOpenIndex={() => setIsIndexOpen(true)} />

        {/* Fullscreen Curved Asymmetric Index Overlay */}
        <PublicIndex isOpen={isIndexOpen} onClose={() => setIsIndexOpen(false)} />

        {/* Semantic Single Main Element */}
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        {withFooter && <PublicFooter />}
      </div>
    </PublicMotionRoot>
  );
};

export default PublicExperienceRoot;
