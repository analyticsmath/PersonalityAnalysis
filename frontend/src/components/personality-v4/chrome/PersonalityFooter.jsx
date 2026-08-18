import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import ResponsivePicture from '../media/ResponsivePicture';

export const PersonalityFooter = () => {
  return (
    <footer className="pa-footer" role="contentinfo">
      <div className="pa-footer__bg-actor" aria-hidden="true">
        <ResponsivePicture
          asset={MEDIA_ASSETS.a01}
          alt=""
          sizes="38vw"
          objectPosition="50% 38%"
        />
      </div>

      <div className="pa-container">
        <div className="pa-footer__main">
          <div className="pa-footer__mission">
            <Link to="/" className="pa-header__brand">
              Personality Assessor
            </Link>
            <p>{PUBLIC_CONTENT.brand.mission}</p>
          </div>

          <div className="pa-footer__col">
            <div className="pa-footer__col-title">Framework</div>
            <ul className="pa-footer__list">
              <li>
                <Link to="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link to="/career-intelligence">Career Intelligence</Link>
              </li>
              <li>
                <Link to="/methodology">Methodology</Link>
              </li>
              <li>
                <Link to="/trust">Trust & Verification</Link>
              </li>
            </ul>
          </div>

          <div className="pa-footer__col">
            <div className="pa-footer__col-title">Account & Record</div>
            <ul className="pa-footer__list">
              <li>
                <Link to={getSignupAcquisitionUrl()}>Build My Profile</Link>
              </li>
              <li>
                <Link to={getLoginUrl()}>Sign In</Link>
              </li>
              <li>
                <Link to="/progress">Progress Record</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="pa-footer__col">
            <div className="pa-footer__col-title">Standards</div>
            <ul className="pa-footer__list">
              <li>
                <span style={{ color: 'var(--pa-cool-400)' }}>Big Five Dimensions</span>
              </li>
              <li>
                <span style={{ color: 'var(--pa-cool-400)' }}>Holland RIASEC Map</span>
              </li>
              <li>
                <span style={{ color: 'var(--pa-cool-400)' }}>O*NET Work Values</span>
              </li>
              <li>
                <span style={{ color: 'var(--pa-cool-400)' }}>Deterministic Scoring</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pa-footer__wordmark-scene">
          <span className="pa-footer__wordmark-personality">Personality</span>
          <div className="pa-footer__wordmark-bottom">
            <span className="pa-footer__wordmark-assessor">Assessor</span>
            <div className="pa-footer__legal">
              © {new Date().getFullYear()} Personality Assessor. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PersonalityFooter;
