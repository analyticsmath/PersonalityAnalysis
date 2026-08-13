import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/public/PublicChrome';
import HeroScene from '../components/public/marketing/HeroScene';
import PortraitJourney from '../components/public/marketing/PortraitJourney';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import './PublicHomePage.css';

function TrustChapter() {
  const reducedMotion = usePrefersReducedMotion();
  return <section className={`pa-home-trust ${reducedMotion ? 'is-reduced' : ''}`} aria-labelledby="trust-title">
    <div><h2 id="trust-title">Know what the system is doing</h2><p>AI can help interpret professional context, adapt questions and support written explanations. Core assessment scores are calculated through structured scoring logic.</p></div>
    <div><blockquote>A useful result should make its evidence and limits easier to understand.</blockquote><p>Personality Assessor is built for professional reflection and career exploration. It does not diagnose mental health, make hiring decisions or guarantee career success.</p><p className="pa-inline-links"><Link to="/methodology">Read the methodology</Link><Link to="/trust">Trust &amp; transparency</Link></p></div>
  </section>;
}

function ClosingScene() {
  return <section className="pa-closing" data-header-tone="dark" aria-labelledby="closing-title"><div className="pa-closing__plane" aria-hidden="true"><i /><i /><i /><i /></div><div><h2 id="closing-title">Build a profile you can return to</h2><p>Start with what you already know. Add context, complete the assessment and keep the record as your work changes.</p><p><Link className="pa-button pa-button--accent" to="/signup">Build my profile</Link><Link className="pa-button pa-button--light" to="/login">Sign in</Link></p></div></section>;
}

export default function PublicHomePage() {
  return <PublicLayout page="home"><main id="main-content" className="pa-marketing pa-home"><HeroScene /><PortraitJourney /><TrustChapter /><ClosingScene /></main></PublicLayout>;
}
