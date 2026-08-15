import React from 'react';
import { PublicFooter, PublicLayout } from '../components/public/PublicChrome';
import EvidenceHero from '../components/public/v4/EvidenceHero';
import WorkWorldsTheatre from '../components/public/v4/WorkWorldsTheatre';
import EvidenceQuestionSignal from '../components/public/v4/EvidenceQuestionSignal';
import LivingProfileField from '../components/public/v4/LivingProfileField';
import CareerRelationshipScene from '../components/public/v4/CareerRelationshipScene';
import DevelopmentEvidenceLoop from '../components/public/v4/DevelopmentEvidenceLoop';
import TrustResolution from '../components/public/v4/TrustResolution';
import './PublicHomePage.css';

export default function PublicHomePage() {
  return (
    <PublicLayout page="home" footerMode="integrated">
      <main id="main-content" className="marketing-home-v4">
        {/* Scene 1: Evidence Studio Hero */}
        <EvidenceHero />

        {/* Scene 2: Work Worlds Theatre (6 Worlds, persistent stage) */}
        <WorkWorldsTheatre />

        {/* Scene 3: Evidence → Question → Signal */}
        <EvidenceQuestionSignal />

        {/* Scene 4: Living Profile Field (4 independent lenses) */}
        <LivingProfileField />

        {/* Scene 5: Career Relationship */}
        <CareerRelationshipScene />

        {/* Scene 6: Development / New Evidence Loop */}
        <DevelopmentEvidenceLoop />

        {/* Scene 7: Trust Resolution */}
        <TrustResolution />

        {/* Integrated Terminal Footer */}
        <PublicFooter integrated />
      </main>
    </PublicLayout>
  );
}
