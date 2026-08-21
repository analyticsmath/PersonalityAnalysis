import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/career-intelligence', label: 'Career intelligence' },
  { to: '/progress', label: 'Progress' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/trust', label: 'Trust' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/login', label: 'Sign in' },
  { to: '/signup', label: 'Build profile' },
];

export const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pa-footer" role="contentinfo">
      <div className="pa-v7-grid">
        <div style={{ gridColumn: '1 / -1' }} className="pa-footer__inner">
          <div className="pa-footer__headline">
            <span className="pa-footer__brand">Personality Assessor</span>
            <p className="pa-footer__statement">
              Evidence can change. Your record should be able to change with it.
            </p>
          </div>

          <nav className="pa-footer__links-field" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="pa-footer__link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="pa-footer__bottom">
            <span>&copy; {currentYear} Personality Assessor. All rights reserved.</span>
            <span>Inspectable professional evidence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
