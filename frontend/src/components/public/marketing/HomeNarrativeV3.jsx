import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from './publicContent';

gsap.registerPlugin(Flip, ScrollTrigger);

const rawLines = [
  'BSc Computer Science — final semester',
  'Built web applications with JavaScript and React',
  'Worked through debugging, analysis and project delivery',
  'Interested in learning, product building and technology',
];
const structuredRows = [
  ['Stage', 'Graduate'], ['Field', 'Software / systems'], ['Skills', 'JavaScript · Problem solving · Analysis'], ['Interests', 'Learning · Product building · Technology'],
];
const lensRows = { ocean: marketingDemo.profile.bigFive, riasec: marketingDemo.profile.riasec, values: marketingDemo.profile.values, signals: marketingDemo.profile.signals };
const lensText = { ocean: 'Big Five / OCEAN', riasec: 'RIASEC', values: 'Work values', signals: 'Career signals' };

function ContextTrace({ compact = false }) {
  return <div className={`pv-context-trace ${compact ? 'is-compact' : ''}`} aria-label="Product demonstration context">
    <div className="pv-context-trace__raw">{rawLines.map((line) => <p key={line}>{line}</p>)}</div>
    <dl className="pv-context-trace__structured">{structuredRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
  </div>;
}

function HeroV3() {
  return <section className="pv-hero" data-header-tone="light" aria-labelledby="public-title">
    <h1 id="public-title">Your work leaves clues.</h1>
    <div className="pv-hero__field">
      <ResponsiveImage className="pv-hero__image" media={publicMedia.context.professional} folder="context" alt={publicMedia.context.professional.alt} priority sizes="(min-width: 1280px) 68vw, 100vw" />
      <dl className="pv-hero__output">{structuredRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <div className="pv-hero__support"><p>Add your CV or enter your background, then answer questions shaped around your field. Personality Assessor connects professional context with Big Five, RIASEC, work values and career signals so you can inspect personality and career direction without reducing yourself to one label.</p><div><Link className="pa-button pa-button--primary" to="/signup">Build my profile</Link><Link className="pa-button" to="/how-it-works">See how it works</Link></div></div>
  </section>;
}

function ContextQuestionStage() {
  const [answer, setAnswer] = useState('');
  const choices = ['Clarify the changed constraint, then test the revised path.', 'Gather input before choosing the next step.'];
  return <section className="pv-context-stage" aria-labelledby="context-title"><div className="pv-context-stage__pin">
    <div className="pv-context-stage__copy"><h2 id="context-title">The questions should change when the context changes.</h2><p>A student, recent graduate and working professional should not begin from the same assumptions. Field, skills, subjects and interests help shape what the assessment asks next.</p></div>
    <div className="pv-context-stage__media"><ResponsiveImage media={publicMedia.context.professional} folder="context" alt={publicMedia.context.professional.alt} sizes="(min-width: 1024px) 44vw, 100vw" /><ResponsiveImage media={publicMedia.context.engineer} folder="context" alt={publicMedia.context.engineer.alt} sizes="(min-width: 1024px) 44vw, 100vw" /></div>
    <ContextTrace />
    <div className="pv-question"><p>When a project changes direction, what do you do first?</p>{choices.map((choice) => <button key={choice} type="button" className={answer === choice ? 'is-selected' : ''} aria-pressed={answer === choice} onClick={() => setAnswer(choice)}>{choice}</button>)}</div>
  </div></section>;
}

function ProfileLenses() {
  const [lens, setLens] = useState('ocean');
  const fieldRef = useRef(null);
  const chooseLens = (next) => {
    if (next === lens) return;
    const state = Flip.getState(fieldRef.current?.children || []);
    setLens(next);
    window.requestAnimationFrame(() => Flip.from(state, { duration: 0.32, ease: 'power2.inOut', absolute: true }));
  };
  return <section className="pv-lenses" aria-labelledby="lenses-title"><div className="pv-lenses__intro"><h2 id="lenses-title">One profile, four lenses.</h2><p>Big Five, RIASEC, work values and career signals stay separate so one score never has to explain everything.</p></div><div className="pv-lenses__controls" role="group" aria-label="Profile lenses">{Object.keys(lensRows).map((key) => <button key={key} type="button" className={lens === key ? 'is-active' : ''} aria-pressed={lens === key} onClick={() => chooseLens(key)}>{lensText[key]}</button>)}</div><div className="pv-lenses__rows" ref={fieldRef} aria-live="polite">{lensRows[lens].map(([label, value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}</strong></div>)}</div><p className="sr-only">{lensText[lens]} demonstration values are shown in the preceding rows.</p></section>;
}

function CareerRelationship() {
  const [career, setCareer] = useState(marketingDemo.careers[0]);
  const relations = [['Problem solving', 'Visible in current evidence', career.why], ['Development focus', 'More evidence to build', career.gap], ['Career relationship', career.fit, 'Guidance for exploration, not a hiring recommendation.']];
  return <section className="pv-career" data-header-tone="dark" aria-labelledby="career-title"><div className="pv-career__intro"><h2 id="career-title">Career direction needs reasons.</h2><p>Compare the current profile with curated career models, then inspect where the relationship is strong, what differs and what could be developed next.</p></div><div className="pv-career__selectors" role="group" aria-label="Demonstration careers">{marketingDemo.careers.map((item) => <button key={item.name} type="button" className={item.name === career.name ? 'is-active' : ''} aria-pressed={item.name === career.name} onClick={() => setCareer(item)}>{item.name}</button>)}</div><div className="pv-career__surface"><div><span>Current profile</span><ContextTrace compact /></div><div><span>Career model</span><h3>{career.name}</h3><p>{career.fit}</p></div><div><span>Relationship</span><p>Compare across several dimensions, with reasons kept visible.</p></div></div><div className="pv-career__relations">{relations.map(([label, current, relation]) => <article key={label}><h3>{label}</h3><p><b>{current}</b>{relation}</p></article>)}</div></section>;
}

function DevelopmentScene() {
  return <section className="pv-development" aria-labelledby="development-title"><div><h2 id="development-title">A difference is useful when it changes what you do next.</h2><p>Development gaps can become deliberate work, then return as new evidence in a later assessment.</p></div><div className="pv-development__actions">{marketingDemo.roadmap.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}<ResponsiveImage media={publicMedia.context.maker} folder="context" alt={publicMedia.context.maker.alt} sizes="(min-width: 1024px) 28vw, 80vw" /></div><Link to="/progress">See how progress works</Link></section>;
}

export default function HomeNarrativeV3() {
  const root = useRef(null);
  const { motionReady, reducedMotion } = usePublicMotion();
  useLayoutEffect(() => {
    if (!motionReady || reducedMotion) return undefined;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const hero = root.current.querySelector('.pv-hero');
        const stage = root.current.querySelector('.pv-context-stage');
        const pin = stage.querySelector('.pv-context-stage__pin');
        const timeline = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: () => `+=${window.innerHeight * 1.8}`, pin, pinSpacing: true, scrub: 0.35, anticipatePin: 1, invalidateOnRefresh: true } });
        timeline.to(stage.querySelector('.pv-context-stage__copy'), { autoAlpha: 0.55, y: -28, duration: 0.22 }, 0.16).to(stage.querySelector('.pv-context-trace__raw'), { autoAlpha: 0, y: -24, duration: 0.22 }, 0.18).fromTo(stage.querySelector('.pv-context-trace__structured'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.26 }, 0.26).to(stage.querySelector('.pv-context-stage__media picture:first-child'), { xPercent: -12, autoAlpha: 0, duration: 0.16 }, 0.30).fromTo(stage.querySelector('.pv-context-stage__media picture:last-child'), { xPercent: 12, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.16 }, 0.30).to(stage.querySelector('.pv-context-trace__structured'), { autoAlpha: 0, y: -18, duration: 0.18 }, 0.50).to(stage.querySelector('.pv-context-stage__copy'), { autoAlpha: 0, duration: 0.14 }, 0.52).fromTo(stage.querySelector('.pv-question'), { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.24 }, 0.58);
        gsap.to(hero.querySelector('h1'), { y: '-6vh', autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: hero, start: '58% top', end: 'bottom top', scrub: 0.35 } });
        gsap.to(hero.querySelector('.pv-hero__support'), { autoAlpha: 0, y: -16, ease: 'none', scrollTrigger: { trigger: hero, start: '58% top', end: 'bottom top', scrub: 0.25 } });
        return () => timeline.kill();
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, [motionReady, reducedMotion]);
  return <div ref={root}><HeroV3 /><ContextQuestionStage /><ProfileLenses /><CareerRelationship /><DevelopmentScene /></div>;
}
