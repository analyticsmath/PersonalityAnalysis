import { Link } from 'react-router-dom';
import { marketingDemo, publicMedia } from '../content/personalityMarketingDemo';
import { PublicLayout, ResponsiveImage } from '../components/public/PublicChrome';
import './PublicHomePage.css';

const portraits = [
  ['Professional context', 'What you have done, what you want next, and the conditions that matter to you.', publicMedia.work[0]],
  ['Assessment response', 'Adaptive questions build a clearer reading without reducing work to a single answer.', publicMedia.work[3]],
  ['Behaviour in context', 'Scenario-based evidence adds another perspective on how you tend to approach work.', publicMedia.work[4]],
  ['Current profile', 'Your portrait holds tendencies, interests, values, signals and evidence confidence separately.', publicMedia.work[5]],
];

function ProfileFragment() {
  return <div className="pa-marketing__fragment" aria-label="Example professional profile fragment">
    <span>Current profile · demonstration</span>
    {marketingDemo.profile.bigFive.slice(0, 3).map(([trait, value]) => <div key={trait}><b>{trait}</b><strong>{value}</strong></div>)}
    <p>Confidence is evidence metadata, not a verdict.</p>
  </div>;
}

export default function PublicHomePage() {
  return <PublicLayout page="home">
    <main id="main-content" className="pa-marketing pa-home">
      <section className="pa-home__hero" aria-labelledby="public-title">
        <ResponsiveImage media={publicMedia.work[1]} alt="A professional working through software on a desk" priority className="pa-home__hero-image" />
        <div className="pa-home__hero-copy"><p>Personality Assessor</p><h1 id="public-title">YOUR WORK<br />HAS A PATTERN.</h1><span>Make it useful.</span></div>
        <div className="pa-home__hero-bottom"><p>Professional context, adaptive assessment and behavioural evidence become a portrait you can return to.</p><Link className="pa-button pa-button--dark" to="/signup">Start assessment</Link></div>
      </section>

      <section className="pa-home__evidence" aria-labelledby="evidence-title">
        <div><p className="pa-kicker">FROM REAL WORK</p><h2 id="evidence-title">EVIDENCE<br />HAS A PLACE.</h2></div>
        <ResponsiveImage media={publicMedia.work[0]} alt="Notes, planning work and a computer" />
        <div className="pa-home__evidence-copy"><p>Work is more than a title. Context, responses and observed choices offer different evidence. The product keeps those sources visible as a professional portrait takes shape.</p><Link to="/how-it-works">See how it works <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="pa-home__portrait" aria-labelledby="portrait-title">
        <header><p className="pa-kicker">A PROFESSIONAL PORTRAIT</p><h2 id="portrait-title">ONE PROFILE.<br />FOUR LENSES.</h2></header>
        <div className="pa-home__portrait-grid">{portraits.map(([title, copy, image], index) => <article key={title} className={`pa-portrait-chapter pa-portrait-chapter--${index + 1}`}><ResponsiveImage media={image} alt="" /><div><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>{index === 3 && <ProfileFragment />}</div></article>)}</div>
      </section>

      <section className="pa-home__career" aria-labelledby="career-title">
        <ResponsiveImage media={publicMedia.careers.software} folder="careers" alt="Developer working at a computer" />
        <div><p className="pa-kicker">CAREER RELATIONSHIP</p><h2 id="career-title">DIRECTION IS<br />A COMPARISON.</h2><p>Explore alignment with curated careers. See the factors that relate, the gaps that deserve attention, and other directions worth examining.</p><Link className="pa-button pa-button--light" to="/career-intelligence">Explore career intelligence</Link></div>
        <aside><span>Software Engineer · demonstration</span><strong>Strong alignment</strong><p>Technical depth and problem solving are close to this curated model.</p></aside>
      </section>

      <section className="pa-home__development" aria-labelledby="development-title">
        <div><p className="pa-kicker">DEVELOPMENT ACTION</p><h2 id="development-title">THE GAP<br />BECOMES A NEXT STEP.</h2></div>
        <ol>{marketingDemo.roadmap.map(([label, copy], index) => <li key={label}><span>0{index + 1}</span><h3>{label}</h3><p>{copy}</p></li>)}</ol>
        <Link to="/progress">See progress over time <span aria-hidden="true">→</span></Link>
      </section>

      <section className="pa-home__progress" aria-labelledby="progress-title">
        <ResponsiveImage media={publicMedia.work[2]} alt="Technical work in progress on a circuit board" />
        <div><p className="pa-kicker">PROGRESS OVER TIME</p><h2 id="progress-title">WHAT CHANGES<br />IS PART OF THE PICTURE.</h2><p>Assessment history, professional updates and roadmap work make development easier to read in context.</p><Link className="pa-button pa-button--dark" to="/progress">Explore progress</Link></div>
      </section>

      <section className="pa-home__trust" aria-labelledby="trust-title"><p className="pa-kicker">CLEAR BOUNDARIES</p><h2 id="trust-title">USEFUL DIRECTION<br />STARTS WITH HONEST LIMITS.</h2><div><p>Personality Assessor is not a clinical assessment, a hiring system or a career prediction machine.</p><Link to="/trust">Trust &amp; transparency <span aria-hidden="true">→</span></Link></div></section>
      <section className="pa-home__closing"><ResponsiveImage media={publicMedia.work[5]} alt="Professional at an operational control desk" /><div><h2>FROM EVIDENCE<br />TO DIRECTION.</h2><Link className="pa-button pa-button--light" to="/signup">Start assessment</Link></div></section>
    </main>
  </PublicLayout>;
}
