import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS_V6 } from '../../../content/personality-v6/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl, getLoginUrl } from '../../../utils/personality-v4/navigation';
import MediaPlane from '../motion/MediaPlane';

export const FinalProfileScene = () => {
  const { finalProfile } = PUBLIC_CONTENT.home;

  return (
    <section className="pa-v6-scene-final" aria-label="Closing Callback & Navigation">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Callback Stage with A01 detail crop */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <span style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--pa-stone)', fontWeight: 600 }}>
              Build Your Profile
            </span>
            <h2 style={{ fontSize: 'var(--pa-display-headline)', lineHeight: 'var(--pa-display-lh)', letterSpacing: 'var(--pa-display-tracking)', color: 'var(--pa-bone)', margin: '0.5rem 0 1.5rem 0' }}>
              {finalProfile.title}
            </h2>
            <p style={{ fontSize: '1.1875rem', color: 'var(--pa-stone)', lineHeight: 1.5, maxWidth: '520px', marginBottom: '2rem' }}>
              {finalProfile.body}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Link
                to={getSignupAcquisitionUrl('/assessment/start')}
                className="pa-v6-btn pa-v6-btn--primary"
                style={{ fontSize: '1rem', padding: '1rem 2.25rem' }}
              >
                {finalProfile.cta} →
              </Link>
              <Link
                to={getLoginUrl('/dashboard')}
                style={{ fontSize: '0.9375rem', color: 'var(--pa-stone)', fontWeight: 500 }}
              >
                Sign In
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', height: '440px', borderRadius: '2px', overflow: 'hidden' }}>
            <MediaPlane
              asset={MEDIA_ASSETS_V6.a01}
              objectPosition="50% 60%"
              alt="Closing reflective detail"
            />
          </div>
        </div>

        {/* Structured Footer Grid */}
        <footer className="pa-v6-footer-grid" role="contentinfo">
          <div>
            <strong style={{ display: 'block', fontSize: '0.875rem', letterSpacing: '0.12em', color: 'var(--pa-bone)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              PERSONALITY ASSESSOR
            </strong>
            <p style={{ fontSize: '0.875rem', color: 'var(--pa-muted)', maxWidth: '340px', lineHeight: 1.5 }}>
              Adaptive personality and career intelligence built upon validated psychometric science.
            </p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--pa-muted)', marginTop: '2rem' }}>
              © {new Date().getFullYear()} Personality Assessor. All rights reserved.
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 700, marginBottom: '1rem' }}>
              Frameworks
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--pa-stone)' }}>
              <li><Link to="/methodology">Big Five Dimensions</Link></li>
              <li><Link to="/methodology">RIASEC Interest Map</Link></li>
              <li><Link to="/methodology">O*NET Work Values</Link></li>
              <li><Link to="/career-intelligence">Career Worlds</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 700, marginBottom: '1rem' }}>
              Product
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--pa-stone)' }}>
              <li><Link to="/how-it-works">How it works</Link></li>
              <li><Link to="/progress">Progress Record</Link></li>
              <li><Link to="/trust">Trust & Governance</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--pa-stone)', fontWeight: 700, marginBottom: '1rem' }}>
              Access
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--pa-stone)' }}>
              <li><Link to={getSignupAcquisitionUrl('/assessment/start')}>Build my profile</Link></li>
              <li><Link to={getLoginUrl('/dashboard')}>Sign In</Link></li>
              <li><Link to="/account/privacy">Account Privacy</Link></li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FinalProfileScene;
