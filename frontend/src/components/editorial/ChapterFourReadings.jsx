// frontend/src/components/editorial/ChapterFourReadings.jsx
// Personality Assessor — Chapter 3: Four Readings (Reference B Module 2)

import React, { useState } from 'react';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterFourReadings() {
  const { chapterTag, headline, lead, items } = EDITORIAL_CONTENT.readings;
  const { readings } = EDITORIAL_MEDIA_ASSETS.chapters;

  const [activeReadingIndex, setActiveReadingIndex] = useState(0);
  const activeReading = items[activeReadingIndex];
  const activeMedia = readings[activeReading.id] || readings.personality;

  return (
    <section className="ed-chapter-container" aria-labelledby="readings-headline">
      <div className="ed-chapter-module">
        <div className="ed-readings-chapter">
          {/* Left Column: Image-First Editorial Card with Floating Live Snapshot */}
          <div className="ed-readings__visual-wrap">
            <img
              src={activeMedia.src}
              alt={activeMedia.title}
              className="ed-readings__image"
              loading="lazy"
            />

            {/* Overlaid Compact Product Snapshot */}
            <div className="ed-readings__snapshot-overlay" role="region" aria-label="Reading telemetry preview">
              <div className="ed-readings__snapshot-header">
                <span className="ed-readings__snapshot-title">{activeReading.tag}</span>
                <span className="ed-tag ed-tag--accent" style={{ margin: 0 }}>Active Layer</span>
              </div>

              <div className="ed-readings__snapshot-dim-list">
                {activeReading.dimensions.slice(0, 3).map((dim) => (
                  <div key={dim.name} className="ed-readings__snapshot-dim-row">
                    <span className="ed-readings__snapshot-dim-name">{dim.name}</span>
                    <span className="ed-readings__snapshot-dim-desc">{dim.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Statement & Direct Selectors */}
          <div className="ed-readings__content">
            <span className="ed-tag">{chapterTag}</span>
            <h2 id="readings-headline" className="ed-h2">
              {headline}
            </h2>
            <p className="ed-lead">
              {lead}
            </p>

            <div className="ed-readings__nav-list" role="tablist">
              {items.map((reading, idx) => {
                const isActive = activeReadingIndex === idx;
                return (
                  <div
                    key={reading.id}
                    className={`ed-readings__nav-btn ${
                      isActive ? 'ed-readings__nav-btn--active' : ''
                    }`}
                    onClick={() => setActiveReadingIndex(idx)}
                    onMouseEnter={() => setActiveReadingIndex(idx)}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveReadingIndex(idx);
                      }
                    }}
                  >
                    <span className="ed-readings__nav-title">{reading.title}</span>
                    <span className="ed-readings__nav-tag">{reading.tag}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
