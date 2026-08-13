import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from './publicContent';

gsap.registerPlugin(ScrollTrigger, Flip);

const evidence = ['Graduate', 'Software / systems', 'Problem solving', 'JavaScript', 'Analysis', 'Learning', 'Product building', 'Technology'];
const contexts = [
  [publicMedia.work[0], 'Professional planning and analysis in progress', 'Student'],
  [publicMedia.work[2], 'Hands inspecting a circuit board', 'Engineering'],
  [publicMedia.work[3], 'Research material arranged for analysis', 'Professional'],
];
const lensRows = {
  ocean: marketingDemo.profile.bigFive,
  riasec: marketingDemo.profile.riasec,
  values: marketingDemo.profile.values,
  signals: marketingDemo.profile.signals,
};
const lensText = { ocean: 'Big Five / OCEAN', riasec: 'RIASEC', values: 'Work values', signals: 'Career signals' };

function EvidencePieces({ compact = false }) { return <div className={`pa-evidence-pieces ${compact ? 'is-compact' : ''}`} aria-label="Demonstration context">{evidence.map((item, index) => <span className={index === 0 || index === 4 ? 'is-signal' : ''} key={item}>{item}</span>)}</div>; }

function Opening() { return <section className="pa2-opening" data-header-tone="light" aria-labelledby="public-title"><div className="pa2-opening__title"><h1 id="public-title"><span>Your experience</span><span>is already evidence.</span></h1></div><ResponsiveImage className="pa2-opening__image" media={publicMedia.work[0]} alt="Professional planning and analysis in progress" priority sizes="(min-width: 1024px) 29vw, 88vw" /><div className="pa2-opening__evidence"><p>Demonstration context</p><EvidencePieces /></div><div className="pa2-opening__support"><p>Add your CV or enter your background. Personality Assessor uses that context to shape the questions it asks, then separates what it learns into personality, interests, work values and career direction you can inspect.</p><div><Link className="pa-button pa-button--primary" to="/signup">Build my profile</Link><Link className="pa-button" to="/how-it-works">See how it works</Link></div></div></section>; }

function ContextAssembly() { const railRef = useRef(null); return <section className="pa2-context" aria-labelledby="context-title"><div className="pa2-context__canvas"><div className="pa2-context__copy"><h2 id="context-title">Different work should lead to different questions.</h2><p>A student, a recent graduate and an experienced professional should not begin from the same assumptions. Field, skills, subjects and interests help shape what comes next.</p></div><div className="pa2-context__stream" ref={railRef}>{contexts.map(([media, alt, label]) => <figure key={label}><ResponsiveImage media={media} alt={alt} /><figcaption>{label}</figcaption></figure>)}</div><div className="pa2-context__controls"><button type="button" onClick={() => railRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>Previous</button><button type="button" onClick={() => railRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>Next</button></div><div className="pa2-context__resolved"><EvidencePieces compact /><p>Context is the starting point, not the result.</p></div></div></section>; }

function QuestionDemo() { const [answer, setAnswer] = useState(''); const choices = ['Clarify the changed constraint, then test the revised path.', 'Gather input before choosing the next step.']; return <section className="pa2-question" aria-labelledby="question-title"><div><EvidencePieces compact /><h2 id="question-title">The questions change with the context.</h2><p>A student, a recent graduate and an experienced professional should not receive an identical assessment. Your profile helps determine what the system asks next.</p></div><div className="pa2-question__field"><p>When a project changes direction, what do you do first?</p>{choices.map((choice) => <button type="button" key={choice} aria-pressed={answer === choice} className={answer === choice ? 'is-selected' : ''} onClick={() => setAnswer(choice)}>{choice}</button>)}</div></section>; }

function LensField() { const [lens, setLens] = useState('ocean'); const fieldRef = useRef(null); const list = lensRows[lens]; const chooseLens = (next) => { const state = Flip.getState(fieldRef.current?.children || []); setLens(next); window.requestAnimationFrame(() => Flip.from(state, { duration: .28, ease: 'power2.inOut', absolute: true })); }; return <section className="pa2-lenses" aria-labelledby="lenses-title"><div><h2 id="lenses-title">One profile. Four different readings.</h2><p>Personality, vocational interests, work values and career signals stay separate so one score never has to explain everything.</p></div><div className="pa2-lenses__controls" role="group" aria-label="Profile lenses">{Object.keys(lensRows).map((key) => <button type="button" key={key} aria-pressed={lens === key} className={lens === key ? 'is-active' : ''} onClick={() => chooseLens(key)}>{lensText[key]}</button>)}</div><div className="pa2-lenses__field" ref={fieldRef} aria-live="polite">{list.map(([label, value]) => <div key={label}><span>{label}</span><i><b style={{ left: `${value}%` }} /></i><strong>{value}</strong></div>)}</div><p className="sr-only">{lensText[lens]} demonstration values are shown in the preceding range rows.</p></section>; }

function CareerRelationship() { const [career, setCareer] = useState(marketingDemo.careers[0]); return <section className="pa2-career" data-header-tone="dark" aria-labelledby="career-title"><div className="pa2-career__intro"><h2 id="career-title">A career match should show its reasoning.</h2><p>Compare your current profile with curated career models. See where the relationship is strong, where it differs and what could move you closer.</p></div><div className="pa2-career__selectors" role="group" aria-label="Demonstration careers">{marketingDemo.careers.map((item) => <button type="button" key={item.name} aria-pressed={career.name === item.name} className={career.name === item.name ? 'is-active' : ''} onClick={() => setCareer(item)}>{item.name}</button>)}</div><div className="pa2-career__relationship"><div><span>Current profile</span><EvidencePieces compact /></div><div><span>Career model</span><h3>{career.name}</h3><b>{career.fit}</b></div></div><div className="pa2-career__reasoning"><article><h3>Why it relates</h3><p>{career.why}</p></article><article><h3>Development difference</h3><p>{career.gap}</p></article></div><p className="pa2-career__disclosure">This is a product demonstration. Career alignment is guidance for exploration, not a hiring recommendation or employment guarantee.</p></section>; }

function Development() { return <section className="pa2-development" aria-labelledby="development-title"><div><h2 id="development-title">A gap is useful when it becomes a next step.</h2><p>A development difference can become deliberate work, then return as new evidence in a later assessment.</p></div><ol>{marketingDemo.roadmap.map(([title, body]) => <li key={title}><b>{title}</b><span>{body}</span></li>)}</ol><Link to="/progress">See how progress works</Link></section>; }

export default function HomeNarrative() {
  const root = useRef(null); const { motionReady, reducedMotion } = usePublicMotion();
  useLayoutEffect(() => {
    if (!motionReady || reducedMotion) return undefined;
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 1024px) and (pointer: fine)', tablet: '(min-width: 768px) and (max-width: 1023px)', mobile: '(max-width: 767px)', reduceMotion: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
        if (!conditions.desktop || conditions.reduceMotion) return undefined;
        const opening = root.current.querySelector('.pa2-opening');
        const assembly = root.current.querySelector('.pa2-context');
        const contextTimeline = gsap.timeline({ scrollTrigger: { trigger: assembly, start: 'top top', end: '+=280%', pin: assembly.querySelector('.pa2-context__canvas'), scrub: 0.62, anticipatePin: 1, invalidateOnRefresh: true } });
        contextTimeline.to('.pa2-context__stream', { xPercent: -22, ease: 'none', duration: .34 }, 0).to('.pa2-context__stream', { scale: .78, autoAlpha: .3, duration: .3, ease: 'power2.inOut' }, .34).fromTo('.pa2-context__resolved', { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: .3, ease: 'power2.inOut' }, .53);
        gsap.to(opening.querySelector('.pa2-opening__title'), { yPercent: -12, autoAlpha: .2, ease: 'none', scrollTrigger: { trigger: opening, start: '55% top', end: 'bottom top', scrub: true } });
        gsap.from('.pa2-opening__evidence span', { autoAlpha: 0, y: 12, duration: .55, stagger: .045, ease: 'power3.out' });
        return () => contextTimeline.kill();
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, [motionReady, reducedMotion]);
  return <div ref={root}><Opening /><ContextAssembly /><QuestionDemo /><LensField /><CareerRelationship /><Development /></div>;
}
