import React from 'react';
import { Link } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../content/public-experience/navigation';

export const PublicFooter = () => {
  return (
    <footer className="pa-px-footer" role="contentinfo">
      <div className="pa-px-footer__inner">
        <div className="pa-px-footer__brand">
          <h3>Personality Assessor</h3>
          <p>
            An analytical instrument for reading professional behavior across work conditions. Independent psychometrics with deterministic career-fit weighting and verifiable provenance.
          </p>
        </div>

        <nav className="pa-px-footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/career-intelligence">Career</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/progress">Progress</Link>
          <Link to="/trust">Trust & Governance</Link>
          <Link to="/methodology">Methodology</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to={getLoginUrl()}>Sign In</Link>
          <Link to={getSignupAcquisitionUrl()}>Start Assessment</Link>
        </nav>
      </div>

      <div className="pa-px-footer__bottom">
        <span>© {new Date().getFullYear()} Personality Assessor. Non-clinical analytical instrument.</span>
        <span>Sovereign user data rights. No third-party model training on personal responses.</span>
      </div>
    </footer>
  );
};

export default PublicFooter;
