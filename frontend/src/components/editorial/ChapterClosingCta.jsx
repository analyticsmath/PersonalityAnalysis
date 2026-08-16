// frontend/src/components/editorial/ChapterClosingCta.jsx
// Personality Assessor — Chapter 8: Closing CTA (Section 14)

import React from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterClosingCta() {
  const { headline, lead, buttonText, secondaryText } = EDITORIAL_CONTENT.closingCta;

  return (
    <section className="ed-chapter-container" aria-labelledby="closing-cta-headline">
      <div className="ed-closing-cta">
        <div className="ed-closing-cta__left">
          <h2 id="closing-cta-headline" className="ed-closing-cta__headline">
            {headline}
          </h2>
          <p className="ed-closing-cta__lead">
            {lead}
          </p>
        </div>

        <div className="ed-closing-cta__actions">
          <Link to="/assessment/start" className="ed-btn ed-btn--primary" style={{ backgroundColor: '#FFFFFF', color: '#0B0B0B' }}>
            {buttonText}
          </Link>
          <Link to="/login" className="ed-btn ed-btn--ghost-inverse">
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}
