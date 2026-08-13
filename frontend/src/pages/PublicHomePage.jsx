import { Link } from 'react-router-dom';
import { PublicFooter, PublicLayout } from '../components/public/PublicChrome';
import HomeNarrativeV3 from '../components/public/marketing/HomeNarrativeV3';
import './PublicHomePage.css';

function TrustScene() {
  return <section className="trust-scene" data-header-scene="light" aria-labelledby="trust-title"><h2 id="trust-title">Know what shaped the result.</h2><div><p>AI can help interpret professional context, adapt questions and support written explanations. Core assessment scores are calculated through structured scoring logic.</p><p>Results support professional reflection and career exploration. They are not diagnosis, a hiring decision, or guaranteed career success.</p><Link className="public-button public-button--dark" to="/trust">Read the trust principles</Link></div></section>;
}

export default function PublicHomePage() { return <PublicLayout page="home" footerMode="integrated"><main id="main-content" className="marketing-home"><HomeNarrativeV3 /><TrustScene /><PublicFooter integrated /></main></PublicLayout>; }
