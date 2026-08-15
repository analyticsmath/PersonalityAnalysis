// frontend/src/pages/public/CareerIntelligencePage.jsx
// Career Intelligence Public Secondary Route

import React from 'react';
import PublicHeader from '../../components/public/imprint/PublicHeader';
import { ImprintSceneProvider } from '../../components/public/imprint/ImprintSceneContext';
import CareerRelationshipField from '../../components/public/imprint/CareerRelationshipField';
import '../../styles/imprint/foundation-imprint.css';
import '../../styles/imprint/public-routes-imprint.css';

export default function CareerIntelligencePage() {
  return (
    <ImprintSceneProvider>
      <div className="public-route-page" style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF' }}>
        <PublicHeader forceReleased />

        <header className="public-route-header">
          <h1 className="public-route-title" style={{ color: '#FFFFFF' }}>
            Career Intelligence &amp; Relationship Field
          </h1>
          <p className="public-route-lead" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Inspect multi-dimensional role fit, growth trajectories, and capability stretches without opaque score cards.
          </p>
        </header>

        <main>
          <CareerRelationshipField />
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
