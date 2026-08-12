import { Link } from 'react-router-dom';
import { marketingDemo, methodology, publicMedia } from '../content/personalityMarketingDemo';
import { PublicLayout, ResponsiveImage, Trace } from '../components/public/PublicChrome';
import './PublicSite.css';

const pageContent = {
  'how-it-works': { eyebrow: '01 / PRODUCT JOURNEY', title: 'From context to a direction you can inspect.', intro: 'Professional context, adaptive assessment and behavioral evidence each make a different contribution. The product keeps those distinctions visible as your profile takes shape.' },
  'career-intelligence': { eyebrow: '02 / CAREER INTELLIGENCE', title: 'A career match should come with its reasoning.', intro: 'Personality Assessor compares your profile with curated career models across multiple fit factors. The useful part is seeing what aligns, what is missing and why another direction may fit differently.' },
  progress: { eyebrow: '03 / PROGRESS', title: 'Development makes more sense in context.', intro: 'Keep an ordered view of assessment history, changing profile signals, roadmaps and completed work—without treating a personality result as a score to optimise.' },
  methodology: { eyebrow: '04 / METHODOLOGY', title: 'Built to explain what it measures — and what it does not.', intro: 'Personality Assessor combines established assessment dimensions with structured career comparison. It keeps those layers visible instead of hiding them behind one opaque recommendation.' },
  trust: { eyebrow: '05 / TRUST & TRANSPARENCY', title: 'Guidance is more useful when its limits are visible.', intro: 'The product is designed to show its evidence, interpretation boundaries and data controls in the same plain language it uses to discuss career direction.' },
  privacy: { eyebrow: '06 / PRIVACY & DATA CONTROL', title: 'Your information stays yours to control.', intro: 'You can review and manage the information connected to your account. Public pages explain the controls; account-level changes remain securely inside the product.' },
};

function PageHero({ type }) {
  const content = pageContent[type];
  return <section className="marketing-hero"><Trace labels={['CONTEXT', 'EVIDENCE', 'DIRECTION']} /><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p className="marketing-hero__intro">{content.intro}</p>{type === 'career-intelligence' && <ResponsiveImage media={publicMedia.careers.ux} folder="careers" alt={publicMedia.careers.ux.alt} className="marketing-hero__image" priority />}</section>;
}

function ProcessPage() {
  const chapters = [
    ['01', 'Bring your professional context.', 'Add education, field, skills and a professional goal by CV or manually. A CV is optional context—not a verdict.'],
    ['02', 'Respond to an adaptive assessment.', 'Questions adapt as evidence accumulates. The experience is designed to learn from your responses, not to turn one answer into a label.'],
    ['03', 'Add behavioral evidence.', 'Scenario and response patterns add a different kind of evidence to the assessment record.'],
    ['04', 'Read a structured profile.', 'Big Five, RIASEC, work values and career signals remain separate lenses.'],
    ['05', 'Explore direction and development.', 'Compare curated careers, inspect why they differ, and take gaps into a roadmap that can be revisited over time.'],
  ];
  return <div className="process-list">{chapters.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}<aside className="process-demo"><small>{marketingDemo.label}</small><b>Which approach would you be most likely to take when a project changes direction unexpectedly?</b><button type="button">Clarify the changed constraint, then test the revised path.</button><button type="button">Gather input before choosing a next step.</button></aside></div>;
}

function CareerPage() {
  return <><section className="editorial-work"><ResponsiveImage media={publicMedia.careers.software} folder="careers" alt={publicMedia.careers.software.alt} /><div><p className="eyebrow">REAL WORK, NOT ROLE STEREOTYPES</p><h2>Professional work gives career exploration a real-world reference point.</h2><p>Images show work in progress. They do not identify a user, endorse the product, or represent a returned career match.</p></div></section><section className="career-catalog"><p className="eyebrow">17 CURATED CAREER PROFILES</p>{marketingDemo.careers.map((career, index) => <article key={career.name} className={index === 0 ? 'is-active' : ''}><span>0{index + 1}</span><h2>{career.name}</h2><p>{career.fit}</p><div><b>Why this</b><p>{career.why}</p><b>What to develop</b><p>{career.gap}</p></div></article>)}</section><p className="quiet-note">Career alignment is an explainable comparison with curated profiles. It is not a prediction of employability, a hiring recommendation or a guarantee of career success.</p></>;
}

function ProgressPage() {
  return <section className="progress-story"><div className="progress-axis"><span>FIRST ASSESSMENT</span><i /><span>ROADMAP WORK</span><i /><span>NEXT READING</span></div><div className="progress-panels"><article><p className="eyebrow">PROFILE OVER TIME</p><h2>Signals can change. Their history matters.</h2><svg viewBox="0 0 420 150" aria-label="Illustrative trend line"><path d="M0 110 L110 78 L210 92 L315 46 L420 32" /></svg><small>{marketingDemo.label} · Trend direction is not a target score.</small></article><article><p className="eyebrow">DEVELOPMENT</p><h2>A trait history and a skill roadmap are not the same thing.</h2>{marketingDemo.roadmap.map(([label, copy]) => <div className="timeline-item" key={label}><b>{label}</b><span>{copy}</span></div>)}</article><article><p className="eyebrow">ACTIVITY</p><h2>Reports and milestones keep an ordered record.</h2><ul><li>Assessment report available</li><li>Roadmap milestone completed</li><li>Professional context updated</li></ul></article></div></section>;
}

function MethodologyPage() {
  const groups = [['Big Five / OCEAN', methodology.bigFive, 'A set of personality dimensions used for reflection, not diagnosis.'], ['RIASEC interests', methodology.riasec, 'Categories of vocational interest that may help describe preferred kinds of work.'], ['Work values', methodology.values, 'Work environments and rewards that may matter to you.'], ['Career signals', methodology.signals, 'Structured signals used in curated career comparison.']];
  return <><section className="method-grid">{groups.map(([title, items, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</section><section className="method-plain"><h2>A result and confidence in that result are different things.</h2><p>Confidence reflects the quantity and consistency of available evidence according to the product contract. It is not a claim of certainty.</p><h2>AI can add conversation. It does not replace the scoring engine.</h2><p>Optional provider-dependent narratives and coaching may add context. Core scoring and career comparison remain deterministic, with a fallback when AI is unavailable.</p><h2>Important limitations</h2><p>Personality Assessor is not a clinical diagnostic tool, mental-health assessment, recruitment authority, guarantee of career success, or prediction of employability.</p></section></>;
}

function TrustPage() {
  return <section className="trust-grid">{[['What the system measures', 'Personality dimensions, vocational interests, work values, career signals and professional context are visible as separate layers.'], ['What confidence means', 'Evidence strength is distinct from an interpretation and should be read with it.'], ['How AI is used', 'AI may support narrative or coaching. It does not control the deterministic scoring engine or career matching.'], ['Career-match interpretation', 'Career comparisons use curated profiles and multiple factors. They are exploratory guidance, not predictions.'], ['Non-clinical boundaries', 'The product is not a mental-health or diagnostic tool, and it is not a recruitment authority.'], ['Data controls', 'Export, assessment deletion, profile deletion and account deletion controls are available from your account.']].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>;
}

function PrivacyPage() {
  return <section className="privacy-grid"><div><p className="eyebrow">ACCOUNT CONTROLS</p><h2>Clear choices, inside the product.</h2><p>When signed in, you can export account data, delete an individual assessment, delete profile data or delete your account.</p><Link className="public-button public-button--dark" to="/login">Sign in to manage your data</Link></div><div><p className="eyebrow">PROFESSIONAL CONTEXT</p><h2>Optional, purposeful input.</h2><p>A CV can be an optional source of assessment context. Reports are downloadable product output. This public page does not expose destructive account actions.</p></div><aside><p>Questions about the limits of the product?</p><Link to="/trust">Read trust &amp; transparency</Link></aside></section>;
}

export default function PublicMarketingPage({ type }) {
  return <PublicLayout page={type}><main id="main-content"><PageHero type={type} />{type === 'how-it-works' && <ProcessPage />}{type === 'career-intelligence' && <CareerPage />}{type === 'progress' && <ProgressPage />}{type === 'methodology' && <MethodologyPage />}{type === 'trust' && <TrustPage />}{type === 'privacy' && <PrivacyPage />}</main></PublicLayout>;
}
