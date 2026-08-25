/**
 * Personality Assessor - Home Typography Layer
 * Semantic typography and trajectory actors for Home:
 * World Title -> Contextual Question -> Source Sentence -> 4 Asymmetric Readings.
 * Zero banned metadata (no "Observed Condition", no "Source Response Anchor", no repetitive eyebrows).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

export const HomeTypographyLayer = ({ data, containerRef }) => {
  return (
    <div className="pa-px-home-typography-root" aria-hidden="false">
      {/* ── S0: World Entry Hero Content ── */}
      <div className="pa-px-home-hero-text">
        <h1 className="pa-px-home-hero-title">
          <span className="pa-px-title-line pa-px-title-line--1">UNDER DIFFERENT</span>
          <span className="pa-px-title-line pa-px-title-line--2">CONDITIONS</span>
        </h1>
        <p className="pa-px-home-hero-support">
          A professional pattern means more when the work around it stays attached.
        </p>
        <div className="pa-px-home-hero-actions">
          <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
            Build my profile
          </Link>
          <Link to="/how-it-works" className="pa-px-btn-secondary">
            See how it works
          </Link>
        </div>
      </div>

      {/* ── S1: Contextual Inquiry Question (Emerges in negative space of 4:5 plate) ── */}
      <div className="pa-px-home-question-container" aria-live="polite">
        <p className="pa-px-inquiry-prompt">
          How do you make progress when the goal is clear but the implementation is not?
        </p>
      </div>

      {/* ── S2: Traceable Source Response Sentence ── */}
      <div className="pa-px-home-response-container">
        <p className="pa-px-source-sentence" aria-label="Source Response">
          <span className="pa-px-phrase-fragment pa-px-fragment-clarify">I clarify</span>{' '}
          <span className="pa-px-phrase-fragment pa-px-fragment-constraints">the constraints</span>{' '}
          <span className="pa-px-phrase-fragment pa-px-fragment-first">first, then choose</span>{' '}
          <span className="pa-px-phrase-fragment pa-px-fragment-smallest">the smallest</span>{' '}
          <span className="pa-px-phrase-fragment pa-px-fragment-reversible">reversible</span>{' '}
          <span className="pa-px-phrase-fragment pa-px-fragment-step">step.</span>
        </p>
      </div>

      {/* ── S2 & S3: SVG Trajectory Paths ── */}
      <svg className="pa-px-branching-svg" viewBox="0 0 1440 900" aria-hidden="true">
        <path
          className="pa-px-traj-path pa-px-traj--1"
          d="M 460,450 C 360,320 220,260 160,210"
          stroke="rgba(247, 248, 248, 0.45)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="pa-px-traj-path pa-px-traj--2"
          d="M 460,450 C 620,330 880,270 1120,210"
          stroke="rgba(247, 248, 248, 0.45)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="pa-px-traj-path pa-px-traj--3"
          d="M 460,450 C 390,610 240,710 180,750"
          stroke="rgba(247, 248, 248, 0.45)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          className="pa-px-traj-path pa-px-traj--4"
          d="M 460,450 C 660,590 960,690 1160,750"
          stroke="rgba(247, 248, 248, 0.45)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* ── S3: 4 Asymmetric Readings in Negative Space ── */}
      <div className="pa-px-readings-field">
        <div className="pa-px-reading-node pa-px-reading-node--1">
          <strong className="pa-px-reading-title">Big Five Dimensions</strong>
          <p className="pa-px-reading-desc">Conscientiousness and emotional stability under ambiguity</p>
        </div>
        <div className="pa-px-reading-node pa-px-reading-node--2">
          <strong className="pa-px-reading-title">RIASEC Interests</strong>
          <p className="pa-px-reading-desc">Investigative and conventional problem navigation</p>
        </div>
        <div className="pa-px-reading-node pa-px-reading-node--3">
          <strong className="pa-px-reading-title">O*NET Work Values</strong>
          <p className="pa-px-reading-desc">Working conditions, independence, and achievement priority</p>
        </div>
        <div className="pa-px-reading-node pa-px-reading-node--4">
          <strong className="pa-px-reading-title">Behavioral Signals</strong>
          <p className="pa-px-reading-desc">Iterative execution and defensive risk management</p>
        </div>
      </div>
    </div>
  );
};

export default HomeTypographyLayer;
