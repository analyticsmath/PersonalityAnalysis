// frontend/src/components/editorial/EditorialFooter.jsx
// Personality Assessor — Designed Oversized Wordmark Footer (Section 15 Reference B)

import React from 'react';
import { Link } from 'react-router-dom';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import '../../styles/editorial/editorial-footer.css';

export default function EditorialFooter() {
  const { wordmarkPrimary, wordmarkSecondary, copyright, links } = EDITORIAL_CONTENT.footer;

  return (
    <footer className="ed-footer" role="contentinfo">
      <div className="ed-footer__inner">
        {/* Top Utility Row */}
        <div className="ed-footer__top-row">
          <div className="ed-footer__brand-statement">
            Personality Assessor — Inspectable Psychometrics
          </div>

          <nav className="ed-footer__nav-links" aria-label="Footer Links">
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="ed-footer__link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Oversized Typographic Wordmark Moment */}
        <div className="ed-footer__wordmark-wrap" aria-hidden="true">
          <span className="ed-footer__wordmark-primary">{wordmarkPrimary}</span>
          <span className="ed-footer__wordmark-secondary">{wordmarkSecondary}</span>
        </div>

        {/* Bottom Legal Bar */}
        <div className="ed-footer__bottom-bar">
          <span>{copyright}</span>
          <div className="ed-footer__legal-links">
            <Link to="/privacy" className="ed-footer__legal-link">Privacy Policy</Link>
            <Link to="/trust" className="ed-footer__legal-link">Trust &amp; Transparency</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
