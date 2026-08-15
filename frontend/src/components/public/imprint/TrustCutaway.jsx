// frontend/src/components/public/imprint/TrustCutaway.jsx
// Trust Cutaway & Integrated Terminal Footer

import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/imprint/trust-imprint.css';

export default function TrustCutaway() {
  return (
    <section className="trust-cutaway-section" aria-label="Trust & System Cutaway">
      <div className="trust-container">
        {/* ── Section Header ── */}
        <header className="trust-header">
          <h2 className="trust-title">See what shaped the result.</h2>
          <p className="trust-support">
            Inspect the evidence, scoring boundary, narrative assistance and the controls you keep.
          </p>
        </header>

        {/* ── Structural System Cutaway Model ── */}
        <div className="trust-cutaway-diagram">
          <div className="cutaway-node">
            <span className="cutaway-node-label">01. Evidence Ingestion</span>
            <div className="cutaway-node-body">
              <h3 className="cutaway-node-title">Professional Context &amp; Responses</h3>
              <p className="cutaway-node-desc">
                Verified CV artifacts, project histories, and adaptive assessment responses provide the empirical baseline.
              </p>
            </div>
          </div>

          <div className="cutaway-node cutaway-node--scoring">
            <span className="cutaway-node-label">02. Deterministic Scoring</span>
            <div className="cutaway-node-body">
              <h3 className="cutaway-node-title">Versioned Scoring Logic</h3>
              <p className="cutaway-node-desc">
                Structured Big Five, RIASEC, Work Values, and Career Signals are computed deterministically from captured evidence.
              </p>
            </div>
          </div>

          <div className="cutaway-node">
            <span className="cutaway-node-label">03. Narrative Assistance</span>
            <div className="cutaway-node-body">
              <h3 className="cutaway-node-title">Explainable Interpretation</h3>
              <p className="cutaway-node-desc">
                AI may assist with context interpretation and narrative synthesis; generated explanations never override stored structured scores.
              </p>
            </div>
          </div>

          <div className="cutaway-node">
            <span className="cutaway-node-label">04. Data Governance</span>
            <div className="cutaway-node-body">
              <h3 className="cutaway-node-title">User Ownership &amp; Controls</h3>
              <p className="cutaway-node-desc">
                Export your structured profile data or delete individual assessment runs, uploaded context, or account records at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Integrated Terminal Footer ── */}
      <footer className="imprint-terminal-footer">
        <div className="trust-container">
          <div className="footer-resolution-stage">
            <h2 className="footer-resolution-title">Build a profile you can return to.</h2>
            <p className="footer-resolution-support">
              Your work changes. Your evidence can change with it.
            </p>
            <div className="footer-resolution-actions">
              <Link className="imprint-btn imprint-btn--primary" to="/signup">
                Build my profile
              </Link>
              <Link className="imprint-btn imprint-btn--text" to="/login">
                Sign in
              </Link>
            </div>
          </div>

          <div className="footer-nav-row">
            <span>&copy; 2026 Personality Assessor. All rights reserved.</span>
            <nav className="footer-links" aria-label="Secondary navigation">
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/career-intelligence">Career Intelligence</Link>
              <Link to="/progress">Progress</Link>
              <Link to="/methodology">Methodology</Link>
              <Link to="/trust">Trust</Link>
              <Link to="/privacy">Privacy</Link>
            </nav>
          </div>
        </div>
      </footer>
    </section>
  );
}
