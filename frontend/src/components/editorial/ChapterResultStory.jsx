// frontend/src/components/editorial/ChapterResultStory.jsx
// Personality Assessor — Chapter 6: Result / Illustrative Case Story (Reference B Testimonial)

import React from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterResultStory() {
  const { chapterTag, headline, quote, author, role, disclaimer } = EDITORIAL_CONTENT.story;
  const { story } = EDITORIAL_MEDIA_ASSETS.chapters;

  return (
    <section className="ed-chapter-container" aria-labelledby="story-headline">
      <div className="ed-chapter-module">
        <div className="ed-story-chapter">
          {/* Left Column: Illustrative Narrative Case */}
          <div className="ed-story__quote-wrap">
            <span className="ed-tag">{chapterTag}</span>
            <h2 id="story-headline" className="ed-h3" style={{ color: 'var(--ed-text-muted)' }}>
              {headline}
            </h2>
            <blockquote className="ed-story__quote">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div className="ed-story__author-meta">
              <span className="ed-story__author-name">{author}</span>
              <span className="ed-story__author-role">{role}</span>
              <span style={{ fontSize: '11px', color: 'var(--ed-text-light)', marginTop: '4px' }}>
                {disclaimer}
              </span>
            </div>
          </div>

          {/* Right Column: Image Card with Overlaid Insight Badge */}
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
