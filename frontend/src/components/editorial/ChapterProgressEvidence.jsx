// frontend/src/components/editorial/ChapterProgressEvidence.jsx
// Personality Assessor — Chapter 5: Progress & New Evidence (Reference B Module 3)

import React from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterProgressEvidence() {
  const { chapterTag, headline, lead, bullets } = EDITORIAL_CONTENT.progress;
  const { progress } = EDITORIAL_MEDIA_ASSETS.chapters;

  return (
    <section className="ed-chapter-container" aria-labelledby="progress-headline">
      <div className="ed-chapter-module">
        <div className="ed-progress-chapter">
          {/* Left Column: Large Editorial Image (~55-60% width) with Floating Longitudinal Overlay */}
          <div className="ed-progress__visual-wrap">
            <img
              src={progress.src}
              srcSet={progress.srcSet}
              sizes="(max-width: 991px) 100vw, 55vw"
              alt={progress.title}
              className="ed-progress__image"
              loading="lazy"
            />

            {/* Floating Longitudinal Telemetry Card */}
            <div className="ed-progress__snapshot-overlay" role="region" aria-label="Progress tracking snapshot">
              <div className="ed-progress__snapshot-row">
                <span className="ed-progress__snapshot-label">Latest Assessment</span>
                <span className="ed-progress__snapshot-val">May 2026</span>
              </div>
              <div className="ed-progress__snapshot-row">
                <span className="ed-progress__snapshot-label">Evidence Milestones</span>
                <span className="ed-progress__snapshot-val">4 Project Artifacts</span>
              </div>
              <div className="ed-progress__snapshot-row">
                <span className="ed-progress__snapshot-label">Calibrated Trait Shift</span>
                <span className="ed-progress__snapshot-val">+ Strategic Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Headline, Concise Bullets, and Action Link */}
          <div className="ed-progress__content">
            <span className="ed-tag">{chapterTag}</span>
            <h2 id="progress-headline" className="ed-h2">
              {headline}
            </h2>
            <p className="ed-lead">
              {lead}
            </p>

            <ul className="ed-progress__bullets">
              {bullets.map((bullet) => (
                <li key={bullet} className="ed-progress__bullet-item">
                  <span className="ed-progress__bullet-dot" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '16px' }}>
              <Link to="/progress" className="ed-btn ed-btn--primary">
                Explore progress tracking →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
