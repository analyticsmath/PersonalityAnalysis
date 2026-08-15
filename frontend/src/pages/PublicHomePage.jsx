// frontend/src/pages/PublicHomePage.jsx
// Personality Assessor — Evidence Imprint Homepage

import React from 'react';
import { ImprintSceneProvider } from '../components/public/imprint/ImprintSceneContext';
import PublicHeader from '../components/public/imprint/PublicHeader';
import EvidenceHero from '../components/public/imprint/EvidenceHero';
import WorkWorldsExperience from '../components/public/imprint/WorkWorldsExperience';
import EvidenceQuestionTransform from '../components/public/imprint/EvidenceQuestionTransform';
import ProfileInstrumentField from '../components/public/imprint/ProfileInstrumentField';
import CareerRelationshipField from '../components/public/imprint/CareerRelationshipField';
import DevelopmentReturnLoop from '../components/public/imprint/DevelopmentReturnLoop';
import TrustCutaway from '../components/public/imprint/TrustCutaway';
import '../styles/imprint/foundation-imprint.css';

export default function PublicHomePage() {
  return (
    <ImprintSceneProvider>
      <div className="imprint-home-root">
        {/* Header with Scene-Aware Tone Negotiation */}
        <PublicHeader />

        <main id="main-content">
          {/* Act 1: Evidence Hero */}
          <EvidenceHero />

          {/* Act 2: Work Worlds Experience */}
          <WorkWorldsExperience />

          {/* Act 3: Context → Question Signature Transformation */}
          <EvidenceQuestionTransform />

          {/* Act 4: Profile Instrument Field */}
          <ProfileInstrumentField />

          {/* Act 5: Career Relationship Field */}
          <CareerRelationshipField />

          {/* Act 6: Development Return Loop */}
          <DevelopmentReturnLoop />

          {/* Act 7: Trust Cutaway & Integrated Terminal Footer */}
          <TrustCutaway />
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
