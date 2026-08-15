// frontend/src/pages/public/PrivacyPage.jsx
// Privacy Public Secondary Route — Data Ownership Map

import React from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../../components/public/imprint/PublicHeader';
import { ImprintSceneProvider } from '../../components/public/imprint/ImprintSceneContext';
import '../../styles/imprint/foundation-imprint.css';
import '../../styles/imprint/public-routes-imprint.css';

export default function PrivacyPage() {
  return (
    <ImprintSceneProvider>
      <div className="public-route-page">
        <PublicHeader forceReleased />

        <header className="public-route-header">
          <h1 className="public-route-title">Data Ownership & Privacy Map</h1>
          <p className="public-route-lead">
            Your professional data belongs exclusively to you. Inspect how your context, assessment runs, and reports are handled, and how to exercise direct control.
          </p>
        </header>

        <main className="privacy-ownership-map">
          {/* Category 1: Account Identity */}
          <div className="privacy-category-block">
            <h2 className="privacy-category-title">01. Account Identity</h2>
            <p className="privacy-category-body">
              Your name, email address, and authentication credentials. Used strictly for secure session authorization and report association.
            </p>
            <div className="privacy-category-actions">
              <span>Control: Edit or delete account in <Link to="/account/privacy">Account Settings</Link></span>
            </div>
          </div>

          {/* Category 2: Professional Context & CV */}
          <div className="privacy-category-block">
            <h2 className="privacy-category-title">02. Uploaded Context &amp; CV</h2>
            <p className="privacy-category-body">
              Uploaded CV files or manual context entries provided during assessment setup to calibrate adaptive questions.
            </p>
            <div className="privacy-category-actions">
              <span>Control: Re-upload, modify, or purge stored context at any time.</span>
            </div>
          </div>

          {/* Category 3: Assessment Sessions & Scores */}
          <div className="privacy-category-block">
            <h2 className="privacy-category-title">03. Assessment Sessions &amp; History</h2>
            <p className="privacy-category-body">
              Questionnaire responses, timestamps, and calibrated deterministic trait scores (Big Five, RIASEC, Work Values).
            </p>
            <div className="privacy-category-actions">
              <span>Control: Inspect, export as JSON, or permanently delete individual assessment records.</span>
            </div>
          </div>

          {/* Category 4: AI Narrative Explanations */}
          <div className="privacy-category-block">
            <h2 className="privacy-category-title">04. Narrative Syntheses</h2>
            <p className="privacy-category-body">
              Context summaries and career alignment narratives generated to explain your structured outputs. Never sold or shared.
            </p>
            <div className="privacy-category-actions">
              <span>Control: Re-generate or clear narrative caches upon assessment updates.</span>
            </div>
          </div>
        </main>
      </div>
    </ImprintSceneProvider>
  );
}
