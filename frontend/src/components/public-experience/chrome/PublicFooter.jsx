import React from 'react';
import { Link } from 'react-router-dom';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../content/public-experience/navigation';

export const PublicFooter = () => {
  return (
    <footer className="pa-px-footer">
      <div className="pa-px-footer__inner">
        <div className="pa-px-footer__brand">
          <h3>Personality Assessor</h3>
          <p>
            A continuous cinematic field study of professional behavior under different conditions. Independent psychometrics with deterministic calibration.
          </p>
        </div>

        <div className="pa-px-footer__col">
          <div className="pa-px-footer__col-title">Navigation</div>
          <div className="pa-px-footer__links">
            <Link to="/">Home</Link>
            <Link to="/career-intelligence">Career Intelligence</Link>
            <Link to="/how-it-works">How It Works</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/trust">Trust & Provenance</Link>
          </div>
        </div>

        <div className="pa-px-footer__col">
          <div className="pa-px-footer__col-title">Documentation</div>
          <div className="pa-px-footer__links">
            <Link to="/methodology">Methodology</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to={getLoginUrl()}>Sign In</Link>
            <Link to={getSignupAcquisitionUrl()}>Start Assessment</Link>
          </div>
        </div>
      </div>

      <div className="pa-px-footer__bottom">
        <span>© {new Date().getFullYear()} Personality Assessor. Non-clinical professional instrument.</span>
        <span>No black-box scores. Sovereign data rights.</span>
      </div>
    </footer>
  );
};

export default PublicFooter;
