import React from 'react';
import { Link } from 'react-router-dom';

const AtlasFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pa-atlas-footer" role="contentinfo">
      <div className="pa-atlas-footer__inner">
        <div className="pa-atlas-footer__brand-col">
          <h3>Personality Assessor</h3>
          <p>
            Context Atlas architecture. Adaptive personality and career intelligence keeping evidence attached to the conditions where it occurred.
          </p>
        </div>

        <div className="pa-atlas-footer__links-col">
          <span className="pa-atlas-footer__col-title">Exploration</span>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/career-intelligence">Career Intelligence</Link>
          <Link to="/progress">Progress Record</Link>
          <Link to="/assessment/start">Build my profile</Link>
        </div>

        <div className="pa-atlas-footer__links-col">
          <span className="pa-atlas-footer__col-title">Governance & Research</span>
          <Link to="/trust">Chain of custody</Link>
          <Link to="/methodology">Research methodology</Link>
          <Link to="/privacy">Privacy terms</Link>
          <Link to="/login">Sign in</Link>
        </div>
      </div>

      <div className="pa-atlas-footer__bottom">
        <span>© {currentYear} Valtum Studio / Personality Assessor. All rights reserved.</span>
        <span>Deterministic psychometric scoring decoupled from qualitative synthesis.</span>
      </div>
    </footer>
  );
};

export default React.memo(AtlasFooter);
