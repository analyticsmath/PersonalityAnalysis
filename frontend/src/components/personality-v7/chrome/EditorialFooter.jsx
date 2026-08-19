import React from 'react';
import { Link } from 'react-router-dom';

export const EditorialFooter = () => {
  return (
    <footer className="pa-v7-editorial-footer" role="contentinfo">
      <div className="pa-v7-footer__grid">
        <div className="pa-v7-footer__brand-col">
          <div className="pa-v7-footer__brand-title">Personality Assessor</div>
          <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: 'var(--pa-stone)', margin: 0, maxWidth: '280px' }}>
            Adaptive psychometric and career intelligence. Evidence-led insights designed for professional clarity.
          </p>
        </div>

        <div>
          <div className="pa-v7-footer__col-title">Frameworks</div>
          <ul className="pa-v7-footer__nav-list">
            <li><Link to="/career-intelligence">Career Environments</Link></li>
            <li><Link to="/how-it-works">Adaptive Method</Link></li>
            <li><Link to="/methodology">Four Lenses</Link></li>
          </ul>
        </div>

        <div>
          <div className="pa-v7-footer__col-title">Integrity</div>
          <ul className="pa-v7-footer__nav-list">
            <li><Link to="/trust">Data Governance</Link></li>
            <li><Link to="/privacy">Privacy Ledger</Link></li>
            <li><Link to="/progress">Longitudinal Record</Link></li>
          </ul>
        </div>

        <div>
          <div className="pa-v7-footer__col-title">Access</div>
          <ul className="pa-v7-footer__nav-list">
            <li><Link to="/login">Account Sign In</Link></li>
            <li><Link to="/signup">Build Profile</Link></li>
            <li><Link to="/account/privacy">Privacy Controls</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ maxWidth: '1540px', margin: '2.5rem auto 0', padding: '0 var(--pa-grid-margin)', borderTop: '1px solid var(--pa-rule-dark)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--pa-stone)' }}>
        <span>© {new Date().getFullYear()} Personality Assessor. All rights reserved.</span>
        <span>Signal Atlas — Ground-Up Editorial System</span>
      </div>
    </footer>
  );
};

export default EditorialFooter;
