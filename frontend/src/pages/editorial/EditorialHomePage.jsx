// frontend/src/pages/editorial/EditorialHomePage.jsx
// Personality Assessor — Reference-Locked Full Frontend Rebuild Homepage

import React from 'react';
import EditorialHero from '../../components/editorial/EditorialHero';
import ChapterAdaptiveAssessment from '../../components/editorial/ChapterAdaptiveAssessment';
import ChapterFourReadings from '../../components/editorial/ChapterFourReadings';
import ChapterCareerWorlds from '../../components/editorial/ChapterCareerWorlds';
import ChapterProgressEvidence from '../../components/editorial/ChapterProgressEvidence';
import ChapterResultStory from '../../components/editorial/ChapterResultStory';
import ChapterTrustPrivacy from '../../components/editorial/ChapterTrustPrivacy';
import ChapterClosingCta from '../../components/editorial/ChapterClosingCta';
import EditorialFooter from '../../components/editorial/EditorialFooter';
import '../../styles/editorial/editorial-foundation.css';

export default function EditorialHomePage() {
  return (
    <div className="ed-page-root">
      <a href="#main-content" className="ed-skip-link">
        Skip to main content
      </a>

      {/* Chapter 1: Reference A Hero Composition */}
      <EditorialHero />

      {/* Main Content Chapters (Reference B Art Direction Grammar) */}
      <main id="main-content" className="ed-main-content">
        {/* Chapter 2: Adaptive Assessment */}
        <ChapterAdaptiveAssessment />

        {/* Chapter 3: Four Readings */}
        <ChapterFourReadings />

        {/* Chapter 4: Black Interactive Career Worlds */}
        <ChapterCareerWorlds />

        {/* Chapter 5: Progress & New Evidence */}
        <ChapterProgressEvidence />

        {/* Chapter 6: Real Result / Illustrative Case Story */}
        <ChapterResultStory />

        {/* Chapter 7: Trust & Privacy Strip */}
        <ChapterTrustPrivacy />

        {/* Chapter 8: Closing CTA */}
        <ChapterClosingCta />
      </main>

      {/* Chapter 9: Designed Oversized Wordmark Footer */}
      <EditorialFooter />
    </div>
  );
}
