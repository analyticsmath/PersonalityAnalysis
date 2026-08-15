// frontend/src/pages/public/TrustPage.jsx
// Trust & Transparency Public Secondary Route

import React from 'react';
import PublicHeader from '../../components/public/imprint/PublicHeader';
import { ImprintSceneProvider } from '../../components/public/imprint/ImprintSceneContext';
import TrustCutaway from '../../components/public/imprint/TrustCutaway';
import '../../styles/imprint/foundation-imprint.css';
import '../../styles/imprint/public-routes-imprint.css';

export default function TrustPage() {
  return (
    <ImprintSceneProvider>
      <div className="public-route-page">
        <PublicHeader forceReleased />

        <header className="public-route-header">
          <h1 className="public-route-title">Trust &amp; Provenance</h1>
          <p className="public-route-lead">
            Inspect the complete data flow, scoring boundaries, AI assistance touchpoints, and the strict controls you retain over your professional profile.
          </p>
        </header>

        <main>
          <TrustCutaway />
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
