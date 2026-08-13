import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from './publicContent';

gsap.registerPlugin(Flip, ScrollTrigger);
const worldNames = ['Collaborative software', 'Software development', 'Product design', 'Architecture', 'Engineering', 'Data interpretation', 'Operations', 'Learning', 'Manufacturing', 'Technical environments'];
const careerNames = ['Software engineer', 'UX / product design', 'Data analysis', 'Product management', 'Engineering', 'Research', 'Operations', 'Creative studio'];
const profileTabs = [['big-five', 'Big Five'], ['riasec', 'RIASEC'], ['values', 'Work values'], ['signals', 'Career signals']];

function Hero() {
  const [h1, h2, h3, h4] = publicMedia.hero;
  return <section className="cinema-hero" data-header-scene="dark" aria-labelledby="public-title">
    <ResponsiveImage className="cinema-hero__background" media={h1} alt="Professional working at a computer in an office environment" priority sizes="100vw" />
    <div className="cinema-hero__shade" aria-hidden="true" />
    <div className="cinema-hero__copy"><h1 id="public-title">Your work leaves clues.</h1><p>Start with the work you already do. Personality Assessor uses professional context to shape adaptive questions, then turns the result into personality, interests, work values and career direction you can inspect.</p><div className="cinema-hero__actions"><Link className="public-button public-button--light" to="/signup">Build my profile <Arrow /></Link><Link className="public-button public-button--text" to="/how-it-works">See how it works <Arrow /></Link></div></div>
    <div className="cinema-hero__media" aria-label="Professional environments"><ResponsiveImage className="cinema-hero__frame cinema-hero__frame--one" media={h2} /><ResponsiveImage className="cinema-hero__frame cinema-hero__frame--two" media={h3} /><ResponsiveImage className="cinema-hero__frame cinema-hero__frame--three" media={h4} /></div>
  </section>;
}

function WorkWorlds() {
  const stage = useRef(null); const activeRef = useRef(0); const [active, setActive] = useState(0); const { reducedMotion } = usePublicMotion();
  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => ScrollTrigger.create({
        trigger: stage.current, start: 'top top', end: () => `+=${Math.round(window.innerHeight * (publicMedia.worlds.length * 0.64))}`,
        pin: stage.current, scrub: 0.68, invalidateOnRefresh: true,
        onUpdate: (self) => { const next = Math.round(self.progress * (publicMedia.worlds.length - 1)); if (next !== activeRef.current) { activeRef.current = next; setActive(next); } },
      }));
      return () => media.revert();
    }, stage);
    return () => context.revert();
  }, [reducedMotion]);
  const select = (next) => { const index = Math.max(0, Math.min(publicMedia.worlds.length - 1, next)); activeRef.current = index; setActive(index); };
  return <section className="world-stage" ref={stage} data-header-scene="dark" aria-labelledby="worlds-title"><div className="world-stage__copy"><h2 id="worlds-title">Work changes what matters.</h2><p>Different environments reveal different kinds of evidence.</p><p className="world-stage__active" aria-live="polite">{worldNames[active]}</p></div><div className="world-stage__gallery">{publicMedia.worlds.map((item, index) => { const offset = index - active; return <figure key={item.file} className="world-stage__item" style={{ '--offset': offset, '--distance': Math.abs(offset) }} aria-hidden={Math.abs(offset) > 2}><ResponsiveImage media={item} sizes="(min-width: 1024px) 52vw, 84vw" /><figcaption>{worldNames[index]}</figcaption></figure>; })}</div><div className="world-stage__controls"><button type="button" onClick={() => select(active - 1)} disabled={active === 0}>Previous</button><button type="button" onClick={() => select(active + 1)} disabled={active === publicMedia.worlds.length - 1}>Next</button></div></section>;
}

function EvidenceArtifact({ kind, children }) { return <article className={`evidence-artifact evidence-artifact--${kind}`}>{children}</article>; }
function ContextScene() {
  const [answered, setAnswered] = useState(''); const actor = useRef(null);
  const choose = (answer) => { const state = Flip.getState(actor.current); setAnswered(answer); window.requestAnimationFrame(() => Flip.from(state, { duration: 0.52, ease: 'power2.inOut', absolute: true })); };
  return <section className={`context-scene ${answered ? 'has-answer' : ''}`} data-header-scene="light" aria-labelledby="context-title"><div className="context-scene__heading"><h2 id="context-title">The question changes with the context.</h2></div><div className="context-scene__stage" ref={actor}><ResponsiveImage className="context-scene__image" media={publicMedia.worlds[1]} sizes="(min-width: 1024px) 60vw, 100vw" /><div className="context-scene__artifacts"><EvidenceArtifact kind="cv"><strong>Samira Khan</strong><span>Junior software / systems</span><span>JavaScript · analysis · problem solving</span></EvidenceArtifact><EvidenceArtifact kind="project"><strong>Transit desk</strong><span>Built a small tool to surface changing constraints.</span></EvidenceArtifact><EvidenceArtifact kind="education"><strong>Systems studio</strong><span>Data structures · human-computer interaction</span></EvidenceArtifact><EvidenceArtifact kind="role"><strong>Role history</strong><span>Research assistant → product builder</span></EvidenceArtifact></div><div className="context-scene__question"><h3>When a project changes direction, what do you do first?</h3><div>{['Clarify the changed constraint, then test the revised path.', 'Gather input before choosing the next step.'].map((answer) => <button key={answer} type="button" onClick={() => choose(answer)} aria-pressed={answered === answer} className={answered === answer ? 'is-selected' : ''}>{answer}</button>)}</div></div></div></section>;
}

function ProfileVisual({ tab }) {
  if (tab === 'big-five') return <div className="profile-apertures">{marketingDemo.profile.bigFive.map(([label, value]) => <div key={label} style={{ '--measure': `${value}%` }}><span>{label}</span><i /><b>{value}</b></div>)}</div>;
  if (tab === 'riasec') return <div className="profile-territories">{marketingDemo.profile.riasec.map(([label, value], index) => <div key={label} style={{ '--index': index, '--measure': value / 100 }}><b>{label}</b><span>{value}</span></div>)}</div>;
  const entries = tab === 'values' ? marketingDemo.profile.values : marketingDemo.profile.signals;
  return <div className={`profile-words profile-words--${tab}`}>{entries.map(([label, value], index) => <div key={label} style={{ '--index': index, '--measure': value / 100 }}><b>{label}</b><span>{value}</span></div>)}</div>;
}
function ProfileScene() {
  const [tab, setTab] = useState('big-five'); const visual = useRef(null);
  const choose = (next) => { if (next === tab) return; const state = Flip.getState(visual.current.children); setTab(next); window.requestAnimationFrame(() => Flip.from(state, { duration: 0.5, ease: 'power2.inOut', absolute: true })); };
  return <section className="profile-scene" data-header-scene="light" aria-labelledby="profile-title"><div className="profile-scene__heading"><h2 id="profile-title">One profile. Four ways to read it.</h2><p>Personality, vocational interests, work values and career signals stay distinct so one score never has to explain everything.</p></div><div className="profile-scene__controls" role="tablist" aria-label="Profile readings">{profileTabs.map(([key, label]) => <button key={key} type="button" role="tab" aria-selected={tab === key} aria-pressed={tab === key} onClick={() => choose(key)}>{label}</button>)}</div><div className="profile-scene__visual" ref={visual}><ProfileVisual tab={tab} /></div><p className="visually-hidden">The selected profile reading is presented with its labelled demo values. It is not a diagnosis.</p></section>;
}

function CareerScene() {
  const [active, setActive] = useState(0); const image = publicMedia.careers[active];
  return <section className="career-scene" data-header-scene="dark" aria-labelledby="career-title"><div className="career-scene__media"><ResponsiveImage key={image.file} media={image} sizes="(min-width: 1024px) 68vw, 100vw" /></div><div className="career-scene__content"><h2 id="career-title">Direction needs reasons.</h2><p>Explore how a profile relates to different kinds of work, what differs, and what could be developed next.</p><div className="career-scene__reasons"><p><b>Why it relates</b>Systems thinking, inquiry and deliberate problem solving can be useful here.</p><p><b>What differs</b>Every professional environment asks for a different mix of context and evidence.</p><p><b>What to develop</b>Make a visible piece of work that adds relevant evidence.</p></div><div className="career-scene__choices" role="tablist" aria-label="Career environments">{careerNames.map((name, index) => <button key={name} type="button" aria-selected={index === active} aria-pressed={index === active} onClick={() => setActive(index)}>{name}</button>)}</div></div></section>;
}

function ProgressScene() {
  const statements = ['Notice what differs.', 'Do deliberate work.', 'Make the result visible.', 'Bring new evidence back.']; const [active, setActive] = useState(0);
  return <section className="progress-scene" data-header-scene="light" aria-labelledby="progress-title"><div className="progress-scene__heading"><h2 id="progress-title">Your next move becomes new evidence.</h2></div><div className="progress-scene__story"><div className="progress-scene__media"><ResponsiveImage media={publicMedia.progress[active]} sizes="(min-width: 1024px) 58vw, 100vw" /></div><div className="progress-scene__states">{publicMedia.progress.map((item, index) => <button key={item.file} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={active === index ? 'is-active' : ''}><span>{statements[Math.min(index, statements.length - 1)]}</span><small>{['Before', 'Prototype', 'Practice', 'Review', 'Collaboration', 'Return'][index]}</small></button>)}</div></div></section>;
}

export default function HomeNarrativeV3() { return <><Hero /><WorkWorlds /><ContextScene /><ProfileScene /><CareerScene /><ProgressScene /></>; }
