import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';
import { ResponsiveImage } from '../PublicChrome';
import { marketingDemo, motion, workRail } from './publicContent';

gsap.registerPlugin(ScrollTrigger);

const profileFields = [['Field', 'Software / systems'], ['Skills', 'Problem solving · JavaScript · Analysis'], ['Interests', 'Learning · Product building · Technology']];
const lenses = {
  ocean: ['Big Five / OCEAN', 'Five continuous personality dimensions: Openness, Conscientiousness, Extraversion, Agreeableness and Neuroticism.'],
  riasec: ['RIASEC', 'Six vocational interest dimensions: Realistic, Investigative, Artistic, Social, Enterprising and Conventional.'],
  values: ['Work values', 'What matters in the conditions and rewards of work, including growth, independence, security and other value dimensions.'],
  signals: ['Career signals', 'Professional evidence such as problem solving, learning orientation, technical depth and leadership.'],
};

function ProfilePlane({ state, lens, selectedAnswer, onAnswer }) {
  return <div className={`pa-profile-plane pa-profile-plane--${state}`}>
    {state === 'context' && <><p>Demonstration profile</p><dl>{profileFields.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></>}
    {state === 'question' && <><p className="pa-plane__context">Software / systems · problem solving · analysis</p><h3>When a project changes direction, what do you do first?</h3><div className="pa-question-options">{['Clarify the changed constraint, then test the revised path.', 'Gather input before choosing the next step.'].map((answer) => <button key={answer} className={selectedAnswer === answer ? 'is-selected' : ''} type="button" aria-pressed={selectedAnswer === answer} onClick={() => onAnswer?.(answer)}>{answer}</button>)}</div></>}
    {state === 'lens' && <LensView lens={lens} />}
    {state === 'career' && <><p>Software Engineer</p><strong>Strong alignment</strong><dl><div><dt>Why it relates</dt><dd>Technical depth, problem solving and learning orientation are close to this curated model.</dd></div><div><dt>Development difference</dt><dd>Build more evidence of production delivery.</dd></div></dl><small>This is a product demonstration. Career alignment is guidance for exploration, not a hiring recommendation or employment guarantee.</small></>}
    {state === 'development' && <ol>{marketingDemo.roadmap.map(([title, detail]) => <li key={title}><b>{title}</b><span>{detail}</span></li>)}</ol>}
  </div>;
}

function LensView({ lens }) {
  if (lens === 'riasec') return <><svg className="pa-lens-radar" viewBox="0 0 220 180" aria-hidden="true"><polygon points="110,18 184,58 184,126 110,164 36,126 36,58" fill="none" stroke="currentColor" opacity=".35" /><polygon points="110,38 166,67 151,118 110,145 60,116 58,72" fill="rgba(200,74,45,.18)" stroke="currentColor" /><path d="M110 18v146M36 58l148 68M184 58L36 126" stroke="currentColor" opacity=".25" /></svg><p className="sr-only">RIASEC demonstration profile: Investigative and Artistic interests are prominent.</p></>;
  if (lens === 'values') return <ol className="pa-lens-rows">{marketingDemo.profile.values.concat([['Security', 64], ['Relationships', 57], ['Lifestyle', 53], ['Prestige', 48], ['Extrinsic', 44]]).map(([label, value]) => <li key={label}><span>{label}</span><b>{value}</b></li>)}</ol>;
  const rows = lens === 'signals' ? marketingDemo.profile.signals : marketingDemo.profile.bigFive;
  return <ul className="pa-lens-bars">{rows.map(([label, value]) => <li key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}</strong></li>)}</ul>;
}

const scenes = [
  ['work', 'Start with the work you’ve already done', 'A CV or manual profile gives the assessment context: your field, experience, subjects, skills and interests.'],
  ['context', 'Turn background into assessment context', 'The system identifies useful professional signals before the assessment begins. You stay able to review the detected context before moving on.'],
  ['question', 'The questions change with the context', 'A student, a recent graduate and an experienced professional should not receive an identical assessment. Your profile helps determine what the system asks next.'],
  ['lens', 'More than one way to read a profile', 'Personality, vocational interests, work values and career signals stay distinct so you can see where each reading comes from.'],
  ['career', 'A career match should show its reasoning', 'Compare your current profile with curated career models. See where the relationship is strong, where it differs and what could move you closer.'],
  ['development', 'A gap is useful when it becomes a next step', 'Turn a difference into deliberate work, then return later with new evidence and see what changed.'],
];

function StateCopy({ state, title, body, lens, setLens }) {
  return <div className="pa-journey__copy"><h2>{title}</h2><p>{body}</p>{state === 'lens' && <div className="pa-lens-controls" role="group" aria-label="Profile lenses">{Object.entries(lenses).map(([id, [label]]) => <button type="button" aria-pressed={lens === id} className={lens === id ? 'is-active' : ''} onClick={() => setLens(id)} key={id}>{label}</button>)}</div>}{state === 'lens' && <p className="pa-lens-description">{lenses[lens][1]}</p>}{state === 'career' && <Link to="/career-intelligence">Explore career intelligence</Link>}{state === 'development' && <Link to="/progress">See how progress works</Link>}</div>;
}

export default function PortraitJourney() {
  const root = useRef(null); const reducedMotion = usePrefersReducedMotion(); const [lens, setLens] = useState('ocean'); const [selectedAnswer, setSelectedAnswer] = useState('');
  useLayoutEffect(() => {
    if (reducedMotion || window.innerWidth < 1024 || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const context = gsap.context(() => {
      const q = gsap.utils.selector(root); const stage = q('.pa-journey__stage')[0]; const rail = q('.pa-work-rail')[0]; const panels = q('.pa-journey__desktop-state'); const plane = q('.pa-journey__plane')[0]; const planeStates = q('.pa-journey__plane .pa-profile-plane');
      gsap.set(panels, { autoAlpha: 0, x: 54 }); gsap.set(panels[0], { autoAlpha: 1, x: 0 }); gsap.set(planeStates, { autoAlpha: 0, x: 32 }); gsap.set(planeStates[0], { autoAlpha: 1, x: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=480%', pin: stage, scrub: 0.78, anticipatePin: 1, invalidateOnRefresh: true } });
      tl.to(rail, { xPercent: -63, ease: 'none', duration: 0.2 }, 0)
        .to(panels[0], { autoAlpha: 0, x: -54, duration: 0.09 }, 0.13).to(panels[1], { autoAlpha: 1, x: 0, duration: 0.09 }, 0.12)
        .to(plane, { xPercent: 8, yPercent: -3, duration: 0.12, ease: 'power2.inOut' }, 0.18)
        .to(panels[1], { autoAlpha: 0, x: -54, duration: 0.09 }, 0.32).to(panels[2], { autoAlpha: 1, x: 0, duration: 0.09 }, 0.30).to(planeStates[0], { autoAlpha: 0, x: -32, duration: 0.08 }, 0.31).to(planeStates[1], { autoAlpha: 1, x: 0, duration: 0.08 }, 0.30)
        .to(panels[2], { autoAlpha: 0, x: -54, duration: 0.09 }, 0.51).to(panels[3], { autoAlpha: 1, x: 0, duration: 0.09 }, 0.49).to(planeStates[1], { autoAlpha: 0, x: -32, duration: 0.08 }, 0.50).to(planeStates[2], { autoAlpha: 1, x: 0, duration: 0.08 }, 0.49)
        .to(plane, { xPercent: -8, yPercent: 3, duration: 0.12, ease: 'power2.inOut' }, 0.56)
        .to(panels[3], { autoAlpha: 0, x: -54, duration: 0.09 }, 0.71).to(panels[4], { autoAlpha: 1, x: 0, duration: 0.09 }, 0.69).to(planeStates[2], { autoAlpha: 0, x: -32, duration: 0.08 }, 0.70).to(planeStates[3], { autoAlpha: 1, x: 0, duration: 0.08 }, 0.69)
        .to(panels[4], { autoAlpha: 0, x: -54, duration: 0.07 }, 0.88).to(panels[5], { autoAlpha: 1, x: 0, duration: 0.07 }, 0.87).to(planeStates[3], { autoAlpha: 0, x: -32, duration: 0.07 }, 0.88).to(planeStates[4], { autoAlpha: 1, x: 0, duration: 0.07 }, 0.87);
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return <section className="pa-journey-stage" ref={root} aria-label="The professional portrait journey">
    <div className="pa-journey__stage">
      <div className="pa-work-rail" aria-label="Examples of professional context">{workRail.map(([media, alt, caption]) => <figure key={caption}><ResponsiveImage media={media} alt={alt} /><figcaption>{caption}</figcaption></figure>)}</div>
      <div className="pa-journey__plane">{['context', 'question', 'lens', 'career', 'development'].map((state) => <ProfilePlane key={state} state={state} lens={lens} selectedAnswer={selectedAnswer} onAnswer={setSelectedAnswer} />)}</div>
      <div className="pa-journey__desktop-copy">{scenes.map(([state, title, body]) => <div className="pa-journey__desktop-state" key={state}><StateCopy state={state} title={title} body={body} lens={lens} setLens={setLens} /></div>)}</div>
    </div>
    <div className="pa-journey__mobile">{scenes.map(([state, title, body]) => <article key={state}><StateCopy state={state} title={title} body={body} lens={lens} setLens={setLens} />{state !== 'work' && <ProfilePlane state={state} lens={lens} selectedAnswer={selectedAnswer} onAnswer={setSelectedAnswer} />}{state === 'work' && <><div className="pa-mobile-rail-controls"><button type="button" onClick={(event) => event.currentTarget.parentElement.querySelector('.pa-mobile-rail')?.scrollBy({ left: -260, behavior: 'smooth' })}>Previous</button><button type="button" onClick={(event) => event.currentTarget.parentElement.querySelector('.pa-mobile-rail')?.scrollBy({ left: 260, behavior: 'smooth' })}>Next</button></div><div className="pa-mobile-rail">{workRail.map(([media, alt, caption]) => <figure key={caption}><ResponsiveImage media={media} alt={alt} /><figcaption>{caption}</figcaption></figure>)}</div></>}</article>)}</div>
  </section>;
}
