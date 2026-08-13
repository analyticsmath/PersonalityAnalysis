import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from './publicContent';

gsap.registerPlugin(Flip, ScrollTrigger);

const fields = [['Stage', 'Graduate'], ['Field', 'Software / systems'], ['Skills', 'JavaScript · analysis · problem solving'], ['Interests', 'Learning · product building · technology']];
const contexts = [
  { key: 'student', title: 'Student / research', media: publicMedia.context.student, question: 'When a research path produces a result you did not expect, what do you do next?', choices: ['Trace the evidence and revise the question.', 'Ask for a second perspective before deciding.'] },
  { key: 'software', title: 'Software / systems', media: publicMedia.context.professional, question: 'When a project changes direction, what do you do first?', choices: ['Clarify the changed constraint, then test the revised path.', 'Gather input before choosing the next step.'] },
  { key: 'engineering', title: 'Engineering', media: publicMedia.context.engineer, question: 'When a test reveals a fault, what do you reach for first?', choices: ['Inspect the system until the failure is understood.', 'Compare the result with the operating conditions.'] },
];
const lensNames = { ocean: 'Big Five / OCEAN', riasec: 'RIASEC', values: 'Work values', signals: 'Career signals' };

function DataFields({ compact = false }) { return <dl className={`pv-fields ${compact ? 'is-compact' : ''}`}>{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>; }

function Hero() { return <section className="pv-hero" data-header-tone="light" aria-labelledby="public-title">
  <div className="pv-hero__copy"><h1 id="public-title">Your work leaves clues.</h1><p>Personality Assessor turns real professional context into questions, a profile and career direction you can inspect.</p><div><Link className="pa-button pa-button--primary" to="/signup">Build my profile</Link><Link className="pa-button" to="/how-it-works">See how it works</Link></div></div>
  <div className="pv-hero__collage" aria-label="Professional worlds, from study to technical work">
    <ResponsiveImage className="pv-hero__main" media={publicMedia.context.professional} folder="context" alt="Documents and laptop on a professional work surface" priority sizes="(min-width: 1000px) 53vw, 92vw" />
    <ResponsiveImage className="pv-hero__tall" media={publicMedia.context.student} folder="context" alt="Study materials around a laptop" sizes="(min-width: 1000px) 19vw, 34vw" />
    <ResponsiveImage className="pv-hero__edge" media={publicMedia.work[2]} alt="Hands inspecting a circuit board" sizes="(min-width: 1000px) 18vw, 32vw" />
    <div className="pv-hero__note"><span>Context, not a label</span><b>Field + evidence shape what comes next.</b></div>
  </div>
</section>; }

function WorkWorlds() {
  const root = useRef(null); const rail = useRef(null); const [active, setActive] = useState(1); const { motionReady, reducedMotion } = usePublicMotion();
  useLayoutEffect(() => {
    if (!motionReady || reducedMotion) return undefined;
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (pointer: fine)', () => {
      const track = rail.current; const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      return gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${Math.max(900, travel() * 0.72)}`, scrub: 0.35, pin: root.current.querySelector('.pv-worlds__pin'), invalidateOnRefresh: true, onUpdate: self => setActive(Math.min(publicMedia.work.length - 1, Math.max(0, Math.round(self.progress * (publicMedia.work.length - 1)))))} });
    });
    return () => media.revert();
  }, [motionReady, reducedMotion]);
  const move = (direction) => rail.current?.scrollBy({ left: direction * Math.min(rail.current.clientWidth * .75, 540), behavior: 'smooth' });
  return <section ref={root} className="pv-worlds" aria-labelledby="worlds-title"><div className="pv-worlds__pin"><div className="pv-worlds__head"><h2 id="worlds-title">Work does not look the same everywhere.</h2><p>Begin with the world you are already in. The assessment has more useful places to look from there.</p><span aria-live="polite">{publicMedia.work[active]?.name}</span></div><div className="pv-worlds__viewport"><div className="pv-worlds__rail" ref={rail}>{publicMedia.work.map((item, index) => <figure className={`pv-world ${index === active ? 'is-active' : ''}`} key={item.id}><ResponsiveImage media={item} alt={`${item.name} professional work context`} sizes="(min-width: 1024px) 29vw, 76vw" /><figcaption>{item.name}</figcaption></figure>)}</div></div><div className="pv-worlds__controls"><button type="button" onClick={() => move(-1)} aria-label="Previous work world">Previous</button><button type="button" onClick={() => move(1)} aria-label="Next work world">Next</button></div></div></section>;
}

function ContextTransformation() { const [context, setContext] = useState(contexts[1]); const [answer, setAnswer] = useState(''); const actor = useRef(null); const choose = (next) => { const state = Flip.getState(actor.current); setContext(next); requestAnimationFrame(() => Flip.from(state, { duration: .45, ease: 'power2.inOut', absolute: true })); };
 return <section className="pv-transform" aria-labelledby="transform-title"><div className="pv-transform__intro"><h2 id="transform-title">From a working world to a relevant question.</h2><p>The same context remains visible while it becomes structured information, then a question with a reason for being asked.</p></div><div className="pv-transform__switch" role="group" aria-label="Choose a professional context">{contexts.map(item => <button type="button" className={item.key === context.key ? 'is-active' : ''} aria-pressed={item.key === context.key} onClick={() => choose(item)} key={item.key}>{item.title}</button>)}</div><div className="pv-transform__stage"><div className="pv-transform__photo" ref={actor}><ResponsiveImage media={context.media} folder="context" alt={context.media.alt} sizes="(min-width: 1024px) 46vw, 100vw" /></div><div className="pv-transform__evidence"><DataFields /><p>Captured context becomes a focused starting point, rather than a generic form.</p></div><div className="pv-question"><small>Adapted to {context.title}</small><h3>{context.question}</h3>{context.choices.map(choice => <button type="button" key={choice} className={answer === choice ? 'is-selected' : ''} aria-pressed={answer === choice} onClick={() => setAnswer(choice)}>{choice}</button>)}</div></div></section>; }

function LensVisual({ lens }) { const data = lens === 'ocean' ? marketingDemo.profile.bigFive : lens === 'riasec' ? [['R', 56], ['I', 78], ['A', 70], ['S', 51], ['E', 57], ['C', 62]] : lens === 'values' ? marketingDemo.profile.values : marketingDemo.profile.signals;
 if (lens === 'ocean') return <div className="pv-lens-forms">{data.map(([label, value]) => <div key={label} style={{ '--mass': `${value}%` }}><b>{label}</b><i /><span>{value}</span></div>)}</div>;
 if (lens === 'riasec') return <div className="pv-lens-radial">{data.map(([label, value], i) => <div key={label} style={{ '--i': i, '--mass': `${value / 100}` }}><b>{label}</b><span>{value}</span></div>)}</div>;
 return <div className={`pv-lens-words pv-lens-words--${lens}`}>{data.map(([label, value], i) => <div key={label} style={{ '--i': i, '--mass': value }}><b>{label}</b><span>{value}</span></div>)}</div>;
}

function ProfileLenses() { const [lens, setLens] = useState('ocean'); const field = useRef(null); const choose = next => { if (next === lens) return; const state = Flip.getState(field.current.children); setLens(next); requestAnimationFrame(() => Flip.from(state, { duration: .42, ease: 'power2.inOut', absolute: true })); };
 return <section className="pv-lenses" aria-labelledby="lenses-title"><div><h2 id="lenses-title">One profile, four lenses.</h2><p>Personality, vocational interests, values and career signals are distinct readings of the same evolving record.</p></div><div className="pv-lenses__tabs" role="tablist" aria-label="Profile lenses">{Object.entries(lensNames).map(([key, label]) => <button key={key} role="tab" aria-selected={lens === key} className={lens === key ? 'is-active' : ''} onClick={() => choose(key)}>{label}</button>)}</div><div className="pv-lens-canvas" ref={field}><LensVisual lens={lens} /></div><p className="sr-only">{lensNames[lens]} visualisation. Values are shown as labelled measures rather than as a diagnostic result.</p></section>; }

function CareerWorlds() { const items = [{ name: 'Software engineer', media: publicMedia.careers.software, folder: 'careers', reason: 'Systems thinking, technical depth and deliberate problem solving.' }, { name: 'UX designer', media: publicMedia.careers.ux, folder: 'careers', reason: 'Research curiosity, synthesis and human-centred experimentation.' }, { name: 'Data analyst', media: publicMedia.careers.data, folder: 'careers', reason: 'Structured inquiry, evidence and patterns that need explanation.' }, { name: 'Engineering', media: publicMedia.careers.engineering, folder: 'careers', reason: 'Precision, hands-on reasoning and complex systems.' }, { name: 'Operations', media: publicMedia.careers.operations, folder: 'careers', reason: 'Attention, priorities and sound decisions in active systems.' }]; const [active, setActive] = useState(0); const rail = useRef(null); const item = items[active];
 return <section className="pv-career-worlds" data-header-tone="dark" aria-labelledby="career-title"><div className="pv-career-worlds__intro"><h2 id="career-title">Career direction needs reasons.</h2><p>Explore curated work worlds, then read the relationship between a profile and the work—not a verdict about a person.</p></div><div className="pv-career-gallery" ref={rail}>{items.map((entry, index) => <button key={entry.name} type="button" className={active === index ? 'is-active' : ''} onClick={() => { setActive(index); rail.current?.children[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }}><ResponsiveImage media={entry.media} folder={entry.folder} alt={entry.media.alt} sizes="(min-width: 1024px) 36vw, 84vw" /><span>{entry.name}</span></button>)}</div><div className="pv-career-relationship"><div><span>Current profile</span><DataFields compact /></div><div><span>Relationship to {item.name}</span><h3>{item.reason}</h3></div><div><span>What to develop</span><p>Build a visible piece of work that gives this direction more evidence.</p></div></div></section>; }

function Development() { const strip = [publicMedia.context.maker, publicMedia.work[0], publicMedia.work[3], publicMedia.context.professional]; return <section className="pv-development" aria-labelledby="development-title"><div className="pv-development__heading"><h2 id="development-title">A difference becomes useful work.</h2><p>Development is not a static three-step plan. It is a return: observe what differs, do something deliberate, then bring new evidence back to the profile.</p><Link className="pa-button" to="/progress">See how progress works</Link></div><div className="pv-filmstrip">{strip.map((media, index) => <figure key={media.file}><ResponsiveImage media={media} folder={media.file.includes('context') ? 'context' : 'work'} alt={index === 0 ? 'Electronics workbench in use' : 'Professional work context'} sizes="(min-width: 1024px) 26vw, 68vw" /><figcaption>{['Difference', 'Deliberate work', 'New evidence', 'Return'][index]}</figcaption></figure>)}</div></section>; }

export default function HomeNarrativeV3() { return <><Hero /><WorkWorlds /><ContextTransformation /><ProfileLenses /><CareerWorlds /><Development /></>; }
