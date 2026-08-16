// frontend/src/components/editorial/ChapterResultStory.jsx
// Personality Assessor — Chapter 6: Result / Illustrative Product Scenario (Reference B Story)

import React from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterResultStory() {
  const { chapterTag, headline, context, insight, badge, disclaimer } = EDITORIAL_CONTENT.story;
  const { story } = EDITORIAL_MEDIA_ASSETS.chapters;

  return (
    <section className="ed-chapter-container" aria-labelledby="story-headline">
      <div className="ed-chapter-module">
        <div className="ed-story-chapter">
          {/* Left Column: Unmistakable Illustrative Product Scenario */}
          <div className="ed-story__quote-wrap">
            <span className="ed-tag">{chapterTag}</span>
            <h2 id="story-headline" className="ed-h2" style={{ marginBottom: '18px' }}>
              {headline}
            </h2>
            
            <p className="ed-lead" style={{ marginBottom: '16px', color: 'var(--ed-text)' }}>
              {context}
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--ed-text-secondary)', marginBottom: '24px' }}>
              {insight}
            </p>

            <div className="ed-story__author-meta">
              <span className="ed-story__scenario-badge">{badge}</span>
              <span style={{ fontSize: '12px', color: 'var(--ed-text-muted)', marginTop: '6px' }}>
                {disclaimer}
              </span>
            </div>
          </div>

          {/* Right Column: Large Image Card with Overlaid Insight Badge */}
          <div className="ed-story__visual-wrap">
            <img
              src={story.src}
              srcSet={story.srcSet}
              sizes="(max-width: 991px) 100vw, 50vw"
              alt={story.title}
              className="ed-story__image"
              loading="lazy"
            />

            <div className="ed-story__insight-badge" aria-hidden="true">
              ✦ Multidimensional Alignment
            </div>

            <Link
              to="/assessment/start"
              className="ed-btn ed-btn--primary ed-btn--circular"
              style={{ position: 'absolute', bottom: '24px', right: '24px', zIndex: 10 }}
              aria-label="Start assessment"
            >
              ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
