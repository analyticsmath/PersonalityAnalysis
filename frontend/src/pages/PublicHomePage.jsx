import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { marketingDemo, publicMedia } from '../content/personalityMarketingDemo';
import { PublicFooter, PublicHeader } from '../components/public/PublicChrome';
import './PublicHomePage.css';

gsap.registerPlugin(ScrollTrigger);

const work = publicMedia.work.map((item) => ({ ...item, src: `/media/personality/work/${item.file}.jpg` }));

const portraitSystems = [
  ['01', 'BIG FIVE', 'temperament patterns'],
  ['02', 'RIASEC', 'work environments'],
  ['03', 'WORK VALUES', 'what sustains effort'],
  ['04', 'CAREER SIGNALS', 'comparison, not prediction'],
];

function Trace({ className = '', labels = [] }) {
  return <div className={`evidence-trace ${className}`} aria-hidden="true"><span className="evidence-trace__rule" />{labels.map((label) => <small key={label}>{label}</small>)}<i /></div>;
}

function EvidenceAct() {
  return <section className="public-evidence" id="how-it-works" aria-labelledby="evidence-title">
    <Trace className="evidence-trace--evidence" labels={['CONTEXT', 'RESPONSE', 'EVIDENCE']} />
    <div className="public-section-kicker"><span>02</span> EVIDENCE</div>
    <div className="public-evidence__lead"><h2 id="evidence-title">Work leaves more than<br /><em>one kind of evidence.</em></h2><p>Your background, the context you choose to bring, your assessment responses and your behavioral choices each reveal something different. Personality Assessor keeps those signals distinct before bringing them together.</p></div>
    <div className="evidence-field">
      <article className="evidence-context"><span>PROFESSIONAL CONTEXT</span><div><small>{marketingDemo.label}</small><b>EDUCATION</b><i>Human-centred design</i><b>FIELD</b><i>Digital products</i><b>GOAL</b><i>Explore career direction</i></div></article>
      <article className="evidence-response"><span>ADAPTIVE RESPONSE</span><p>Which approach would you be most likely to take when a project changes direction unexpectedly?</p><small>{marketingDemo.label}</small></article>
      <article className="evidence-behavior"><span>BEHAVIORAL EVIDENCE</span><p>Describe the trade-off you would examine before proposing a next step.</p><i>{marketingDemo.label}</i></article>
      <div className="evidence-field__stamp">EVIDENCE<br />ACCUMULATES</div>
    </div>
  </section>;
}

function AssessmentAct() {
  return <section className="public-assessment" aria-labelledby="assessment-title">
    <div className="public-section-kicker"><span>03</span> ADAPTIVE ASSESSMENT</div>
    <div className="public-assessment__layout"><div><h2 id="assessment-title">A question changes<br /><em>what can be asked next.</em></h2><p>Assessment responses are considered alongside the professional context you choose to share. This demonstration shows the interaction pattern, not a result.</p></div><div className="assessment-question"><span>{marketingDemo.label}</span><strong>When a project changes direction, which approach would you be most likely to take?</strong><button type="button" className="is-selected">Clarify the changed constraint, then test the revised path.</button><button type="button">Gather input before choosing the next step.</button><p>Questions adapt as evidence accumulates.</p></div></div>
  </section>;
}

function ProfessionalPortrait() {
  return <section className="public-structure" id="methodology" aria-labelledby="portrait-title">
    <div className="public-section-kicker"><span>04</span> PROFESSIONAL PORTRAIT</div>
    <div className="public-structure__lead"><h2 id="portrait-title">Four lenses. One clearer<br /><em>professional picture.</em></h2><p>Personality, vocational interests, work values and career signals describe different parts of the same working life. They stay visible in their own right rather than being collapsed into one single score.</p></div>
    <div className="portrait-v4 portrait-v5" role="img" aria-label="Product demonstration Professional Portrait with distinct Big Five, RIASEC, Work Values and Career Signals information bands.">
      <Trace className="evidence-trace--portrait" labels={['PROFILE SYSTEMS']} />
      <div className="portrait-v4__title">PROFESSIONAL<br />PORTRAIT</div>
      {portraitSystems.map(([index, name, note], item) => <div className={`portrait-v4__band portrait-v4__band--${item + 1}`} key={name}><span>{index}</span><strong>{name}</strong><small>{note}</small><i /><b style={{ width: `${[76, 78, 82, 80][item]}%` }} /></div>)}
    </div>
    <div className="confidence-note"><span>{marketingDemo.label}</span><div><b>MEASURED RESULT</b><i /> <b>STRENGTH OF AVAILABLE EVIDENCE</b></div><p>Your score and the strength of the evidence behind it are not the same thing.</p></div>
  </section>;
}

function CareerSignature() {
  return <section className="public-direction" id="direction" aria-labelledby="direction-title">
    <Trace className="evidence-trace--direction" labels={['EVIDENCE', 'ALIGNMENT', 'DIRECTION']} />
    <div className="public-section-kicker"><span>05</span> CAREER INTELLIGENCE</div>
    <h2 id="direction-title">A career match should come<br /><em>with its reasoning.</em></h2><p className="career-chapter-copy">Personality Assessor compares your profile with curated career models across multiple fit factors. See what aligns, what is missing and why another direction may fit differently.</p>
    <div className="career-signature"><div className="career-signature__list">{marketingDemo.careers.map((career) => <span key={career.name}>{career.name.toUpperCase()}</span>)}</div><article><small>{marketingDemo.label} / SOFTWARE ENGINEER</small><h3>Software Engineer</h3><div><b>Why this</b><p>{marketingDemo.careers[0].why}</p></div><div><b>What to develop</b><p>{marketingDemo.careers[0].gap}</p></div><Link to="/career-intelligence">Explore career intelligence</Link></article></div>
  </section>;
}

function RoadmapAndTime() {
  return <><section className="public-roadmap" id="progress" aria-labelledby="roadmap-title"><div className="public-section-kicker"><span>06</span> GAP → DEVELOPMENT</div><div className="public-roadmap__lead"><h2 id="roadmap-title">A difference becomes<br /><em>the next milestone.</em></h2><p>Gap markers travel directly into deliberate practice. There is no judgement in the transition—only a next piece of work.</p></div><div className="roadmap-path"><Trace className="evidence-trace--roadmap" labels={['GAP', 'FIELD NOTE', 'APPLIED PROJECT']} /><span>RESEARCH PRACTICE</span><i /><span>FIELD NOTE</span><i /><span>APPLIED PROJECT</span></div></section>
  <section className="public-time" aria-labelledby="time-title"><div className="public-section-kicker"><span>07</span> TIME / ANALYTICS PREVIEW</div><h2 id="time-title">Progress keeps<br /><em>its context.</em></h2><div className="time-field"><Trace className="evidence-trace--time" labels={['HISTORY', 'TRAIT TRENDS', 'ROADMAP', 'READINESS']} /><article><span>ASSESSMENT HISTORY</span><div className="bars"><i /><i /><i /><i /></div></article><article><span>TRAIT TRENDS</span><svg viewBox="0 0 220 78" aria-hidden="true"><path d="M0 57 L42 44 L79 50 L121 26 L164 35 L220 12" /></svg></article><article><span>ROADMAP PROGRESS</span><b>Evidence<br />carries forward.</b></article></div></section></>;
}

export default function PublicHomePage() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const preload = () => work.slice(2).forEach(({ src }) => { const image = new window.Image(); image.src = src; });
    const idle = window.requestIdleCallback?.(preload, { timeout: 1200 }) || window.setTimeout(preload, 350);
    return () => window.cancelIdleCallback?.(idle) || window.clearTimeout(idle);
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced || !root.current) return undefined;
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1100px)', () => {
        const shots = gsap.utils.toArray('.work-shot');
        gsap.set(shots.slice(1), { autoAlpha: 0 });
        const director = gsap.timeline({ scrollTrigger: { trigger: '.work-reel', start: 'top top', end: '+=215%', scrub: 0.75, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
        director.to(shots[0], { scale: 1.12, xPercent: -5, duration: .75, ease: 'power2.inOut' }, 0)
          .to('.work-reel__copy', { autoAlpha: .22, y: -20, duration: .4 }, .48)
          .to(shots[0], { autoAlpha: 0, scale: 1.2, duration: .34 }, .8)
          .fromTo(shots[1], { autoAlpha: 0, yPercent: 18, scale: .92 }, { autoAlpha: 1, yPercent: 0, scale: 1.05, duration: .48, ease: 'power2.out' }, .78)
          .to(shots[1], { scale: 1.18, duration: .5 }, 1.16)
          .to(shots[1], { autoAlpha: 0, yPercent: -10, duration: .25 }, 1.45)
          .fromTo(shots[2], { autoAlpha: 0, scale: .72, xPercent: 18 }, { autoAlpha: 1, scale: 1.18, xPercent: 0, duration: .45, ease: 'power3.out' }, 1.42)
          .to(shots[2], { autoAlpha: 0, scale: 1.42, duration: .34 }, 1.86)
          .fromTo(shots[3], { autoAlpha: 0, yPercent: 12, scale: 1.05 }, { autoAlpha: 1, yPercent: 0, duration: .42 }, 1.82)
          .to(shots[3], { yPercent: -4, duration: .45 }, 2.22)
          .to(shots[3], { autoAlpha: 0, duration: .26 }, 2.65)
          .fromTo(shots[4], { autoAlpha: 0, xPercent: -16, scale: 1.16 }, { autoAlpha: 1, xPercent: 0, scale: 1.04, duration: .4 }, 2.62)
          .to(shots[4], { autoAlpha: 0, xPercent: 10, duration: .25 }, 3.02)
          .fromTo(shots[5], { autoAlpha: 0, xPercent: 20, scale: 1.1 }, { autoAlpha: 1, xPercent: 0, scale: 1, duration: .38 }, 2.98)
          .to('.work-reel__trace', { scaleX: 1, duration: .45 }, 3.24)
          .to(shots[5], { scale: .28, xPercent: 120, yPercent: 48, autoAlpha: .18, duration: .55, ease: 'power2.inOut' }, 3.38)
          .to('.work-reel__evidence', { autoAlpha: 1, y: 0, duration: .35 }, 3.55);
      });
      mm.add('(min-width: 768px) and (max-width: 1099px)', () => gsap.timeline({ scrollTrigger: { trigger: '.work-reel', start: 'top top', end: '+=145%', scrub: .65, pin: true } }).to('.work-shot--1', { scale: 1.1, autoAlpha: 0, duration: .45 }).fromTo('.work-shot--2', { autoAlpha: 0, yPercent: 14 }, { autoAlpha: 1, yPercent: 0, duration: .45 }, .35).to('.work-shot--2', { autoAlpha: 0, duration: .28 }, .9).fromTo('.work-shot--3', { autoAlpha: 0, scale: .85 }, { autoAlpha: 1, scale: 1.08, duration: .45 }, 1.05).to('.work-reel__evidence', { autoAlpha: 1, duration: .25 }, 1.4));
      mm.add('(max-width: 767px)', () => gsap.timeline({ scrollTrigger: { trigger: '.work-reel', start: 'top top', end: '+=110%', scrub: .6, pin: true } }).to('.work-shot--1', { autoAlpha: 0, scale: 1.08, duration: .45 }).fromTo('.work-shot--2', { autoAlpha: 0, yPercent: 12 }, { autoAlpha: 1, yPercent: 0, duration: .45 }, .35).to('.work-shot--2', { autoAlpha: 0, duration: .3 }, .95).fromTo('.work-shot--3', { autoAlpha: 0, scale: .88 }, { autoAlpha: 1, scale: 1.02, duration: .45 }, 1.05).to('.work-reel__evidence', { autoAlpha: 1, duration: .25 }, 1.32));
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, [reduced]);

  return <main className={`public-home ${reduced ? 'is-reduced' : ''}`} ref={root}>
    <a className="public-skip" href="#public-content">Skip to homepage content</a>
    <PublicHeader />
    <section className="work-reel" aria-labelledby="public-title"><p className="work-reel__notation">FROM WORK TO DIRECTION</p><Trace className="work-reel__trace" labels={['CONTEXT', 'RESPONSE', 'EVIDENCE']} /><div className="work-reel__stage">{work.map((item, index) => <figure className={`work-shot work-shot--${index + 1}`} key={item.id}><picture><source type="image/webp" srcSet={`/media/personality/work/${item.file}-480.webp 480w, /media/personality/work/${item.file}-768.webp 768w, /media/personality/work/${item.file}-1200.webp 1200w, /media/personality/work/${item.file}-1600.webp 1600w`} sizes="(min-width: 1100px) 70vw, 90vw" /><img src={item.src} alt="" aria-hidden="true" width={item.width} height={item.height} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} decoding={index === 0 ? 'sync' : 'async'} style={{ objectPosition: item.position }} /></picture><figcaption>{item.name}</figcaption></figure>)}</div><div className="work-reel__copy"><p>WAYS OF WORKING</p><h1 id="public-title"><span>How you work</span><span>is more than</span><span><em>a job title.</em></span></h1><small>PROFESSIONAL CONTEXT · ADAPTIVE EVIDENCE</small></div><p className="work-reel__description">Personality Assessor brings together professional context, adaptive assessment responses and behavioral evidence to build an explainable career profile — then helps you explore where it aligns, where it does not, and what to work on next.</p><div className="work-reel__evidence">WORK → <b>EVIDENCE</b><small>evidence becomes a professional profile</small></div></section>
    <div id="public-content"><EvidenceAct /><AssessmentAct /><ProfessionalPortrait /><CareerSignature /><RoadmapAndTime /><section className="public-trust" aria-labelledby="trust-title"><div className="public-section-kicker"><span>08</span> TRUST / BOUNDARIES</div><h2 id="trust-title">Clear about what<br /><em>the system can support.</em></h2><ul><li>Deterministic scoring core</li><li>Evidence confidence, separately visible</li><li>AI enhancement with stated boundaries</li><li>Non-clinical scope, export and deletion controls</li></ul><p><Link to="/trust">Trust</Link><Link to="/privacy">Privacy</Link></p></section><section className="public-ending" aria-labelledby="ending-title"><Trace className="evidence-trace--ending" labels={['COMPLEXITY', 'CLARITY']} /><div><p>RESOLUTION</p><h2 id="ending-title">Understand the pattern.<br /><em>Question the direction.<br />Build what comes next.</em></h2><div><Link to="/signup">Start assessment</Link><Link to="/login">Sign in</Link></div></div></section></div>
    <PublicFooter />
  </main>;
}
