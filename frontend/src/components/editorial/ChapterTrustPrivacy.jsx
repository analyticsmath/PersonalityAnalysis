// frontend/src/components/editorial/ChapterTrustPrivacy.jsx
// Personality Assessor — Chapter 7: Trust & Privacy Strip (Section 13)

import React from 'react';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterTrustPrivacy() {
  const { chapterTag, headline, items } = EDITORIAL_CONTENT.trust;

  return (
    <section className="ed-chapter-container" aria-labelledby="trust-headline">
      <div className="ed-trust-strip">
        <div style={{ marginBottom: '28px' }}>
          <span className="ed-tag">{chapterTag}</span>
          <h2 id="trust-headline" className="ed-h3">
            {headline}
          </h2>
        </div>

        <div className="ed-trust-grid">
          {items.map((item) => (
            <div key={item.title} className="ed-trust-item">
              <div className="ed-trust-item__title">
                <span style={{ color: 'var(--ed-ink)' }}>✓</span>
                <span>{item.title}</span>
              </div>
              <p className="ed-trust-item__desc">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
