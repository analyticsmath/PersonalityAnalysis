// frontend/src/pages/public/ProgressPage.jsx
// Progress Public Secondary Route — Return Loop

import React from 'react';
import PublicHeader from '../../components/public/imprint/PublicHeader';
import { ImprintSceneProvider } from '../../components/public/imprint/ImprintSceneContext';
import DevelopmentReturnLoop from '../../components/public/imprint/DevelopmentReturnLoop';
import '../../styles/imprint/foundation-imprint.css';
import '../../styles/imprint/public-routes-imprint.css';

export default function ProgressPage() {
  return (
    <ImprintSceneProvider>
      <div className="public-route-page">
        <PublicHeader forceReleased />

        <header className="public-route-header">
          <h1 className="public-route-title">The Development Return Loop</h1>
          <p className="public-route-lead">
            Your work changes over time. Personality Assessor continually integrates new artifacts and verified accomplishments back into your living profile.
          </p>
        </header>

        <main>
          <DevelopmentReturnLoop />
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
