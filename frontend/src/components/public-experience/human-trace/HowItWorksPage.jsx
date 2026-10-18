import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { CinemaLink, useCinemaScroll } from './CinematicPublicShell';
import './howRefinement.css';

gsap.registerPlugin(ScrollTrigger);
const MEDIA = '/media/public-experience/digital/';
const LENSES = [
  { name: 'Personality', model: 'Big Five', title: 'How you tend to work.', question: 'What patterns appear in the way you think, act and relate to others?', description: 'Five continuous dimensions describe tendencies. They do not put you into a fixed personality type.', facets: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Emotional Stability'], phrase: 'work through an idea' },
  { name: 'Interests', model: 'RIASEC', title: 'What draws you in.', question: 'Which kinds of activities and working environments attract you?', description: 'Six areas of occupational interest describe what you are drawn to. Enjoyment and demonstrated skill are different signals.', facets: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'], phrase: 'untangling difficult problems' },
  { name: 'Work values', model: 'Work Values', title: 'What matters around you.', question: 'Which conditions help make work meaningful and sustainable for you?', description: 'Workplace priorities describe the conditions you value. A single mention of teamwork cannot establish your complete set of priorities.', facets: ['Achievement', 'Independence', 'Working Conditions', 'Recognition', 'Relationships', 'Support'], phrase: 'with other people' },
];
const EXAMPLE = 'I enjoy untangling difficult problems, especially when I can work through an idea with other people.';

function useProcessMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion:no-preference)', () => {
      let clearReveal = () => {};
      const context = gsap.context(() => {
        const reveal = () => context.add(() => {
          gsap.from('.vt-process__title-line>span', { yPercent: 108, duration: 1.35, stagger: 0.14, ease: 'power3.out' });
          gsap.from('.vt-process__lead, .vt-process__hero-media', { y: 24, opacity: 0, duration: 1.4, stagger: 0.14, ease: 'power2.out', delay: 0.18 });
        });
        // Run after context creation, or after the route curtain has opened.
        const frame = window.requestAnimationFrame(() => {
          if (document.documentElement.dataset.cinematicTransition) window.addEventListener('cinematic:reveal', reveal, { once: true });
          else reveal();
        });
        clearReveal = () => { window.cancelAnimationFrame(frame); window.removeEventListener('cinematic:reveal', reveal); };
        gsap.utils.toArray('[data-process-reveal]').forEach((element) => {
          gsap.from(element, { opacity: 0, y: 32, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 91%', toggleActions: 'play none none none' } });
        });
        gsap.fromTo('.vt-process__statement .vt-process__word', { opacity: 0.24 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.vt-process__statement', start: 'top 87%', end: 'top 40%', scrub: 1.1 } });
        gsap.utils.toArray('.vt-process__weight-fill').forEach((line) => {
          gsap.from(line, { scaleX: 0, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: line.parentElement, start: 'top 90%', end: 'top 60%', scrub: 1.1 } });
        });
      }, root);
      return () => { clearReveal(); context.revert(); };
    });
    mm.add('(min-width:901px) and (prefers-reduced-motion:no-preference)', () => {
      const context = gsap.context(() => {
        gsap.fromTo('.vt-process__hero-photo', { scale: 1.06, yPercent: -3 }, { scale: 1, yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.vt-process__hero-media', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
        gsap.from('.vt-process__outcome-photo', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.vt-process__outcome', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      }, root);
      return () => context.revert();
    });
    return () => mm.revert();
  }, [rootRef]);
}

function PerspectiveExplorer() {
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const tabsRef = useRef([]);
  const lens = LENSES[active];
  const [before, after] = EXAMPLE.split(lens.phrase);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return undefined;
    const tween = gsap.fromTo(panelRef.current, { opacity: 0.35, y: 12 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' });
    return () => tween.kill();
  }, [active]);
  const onKey = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    setActive(next);
    tabsRef.current[next]?.focus();
  };
  return <div className="vt-process__explorer">
    <div className="vt-process__source" data-transition-family="human-trace" data-transition-key="source-response">
      <p className="vt-process__source-label">An illustrative response</p>
      <p className="vt-process__prompt">What kind of work do you find engaging?</p>
      <blockquote>“{before}<mark>{lens.phrase}</mark>{after}”</blockquote>
      <p className="vt-process__source-note">The same words. A different question to explore.</p>
    </div>
    <div className="vt-process__perspectives">
      <div role="tablist" aria-label="Explore three assessment perspectives" className="vt-process__tabs">
        {LENSES.map((item, index) => <button key={item.name} type="button" role="tab" id={`perspective-tab-${index}`} aria-selected={active === index} aria-controls="perspective-panel" tabIndex={active === index ? 0 : -1} ref={(node) => { tabsRef.current[index] = node; }} onClick={() => setActive(index)} onKeyDown={(event) => onKey(event, index)}>{item.name}<span aria-hidden="true">↗</span></button>)}
      </div>
      <div ref={panelRef} id="perspective-panel" role="tabpanel" aria-labelledby={`perspective-tab-${active}`} tabIndex={0}>
        <p className="vt-process__model">{lens.model}</p>
        <h3>{lens.title}</h3>
        <p className="vt-process__question">{lens.question}</p>
        <div className="vt-process__facets">{lens.facets.map((facet) => <span key={facet}>{facet}</span>)}</div>
        <p className="vt-process__model-description">{lens.description}</p>
      </div>
    </div>
    <p className="vt-process__example-limit">This example explains the perspectives. It does not assign a score. Each dimension requires sufficient independent evidence.</p>
  </div>;
}

export default function HowItWorksPage() {
  const rootRef = useRef(null);
  const scrollTo = useCinemaScroll();
  const weights = PUBLIC_CONTENT.home.calibration.weights;
  useProcessMotion(rootRef);
  return <div ref={rootRef} className="vt-route vt-route--how vt-process">
    <section className="vt-process__hero" data-route-ready="true">
      <h1><span className="vt-process__title-line"><span>Your words.</span></span><span className="vt-process__title-line"><span>A wider <em>perspective.</em></span></span></h1>
      <div className="vt-process__lead"><p>From the experiences you share to a professional profile you can understand, inspect and build on.</p><button type="button" onClick={() => { const target = document.getElementById('how-perspectives'); if (target) scrollTo(target.getBoundingClientRect().top + window.scrollY - (document.querySelector('.vt-header')?.offsetHeight || 84)); }}>Follow the process <span aria-hidden="true">↓</span></button></div>
      <figure className="vt-process__hero-media"><img className="vt-process__hero-photo" src={`${MEDIA}collaborate-1920.webp`} srcSet={`${MEDIA}collaborate-960.webp 960w, ${MEDIA}collaborate-1920.webp 1920w`} sizes="(max-width:600px) 100vw, 90vw" alt="People sharing a working table with notebooks and laptops" fetchPriority="high" width="1920" height="1280" /><figcaption>Every perspective<br/>starts with a person.</figcaption><span className="vt-process__media-line" aria-hidden="true" /></figure>
    </section>
    <section id="how-perspectives" className="vt-process__understand">
      <h2 className="vt-process__statement">{'One answer opens questions. It doesn’t close the case.'.split(' ').map((word, index) => <span className="vt-process__word" key={index}>{word} </span>)}</h2>
      <div className="vt-process__section-intro" data-process-reveal><p>Your responses stay connected to their questions and context. Personality, interests and work values each ask something different of that evidence.</p><p>Choose a perspective below to see the distinction.</p></div>
      <PerspectiveExplorer />
    </section>
    <section className="vt-process__calculation">
      <div className="vt-process__calculation-intro"><h2 data-process-reveal>Different signals.<br/>An explicit<br/><em>contribution.</em></h2><p>Career comparisons bring six factors together using fixed, published weights. The contribution of each factor stays visible.</p><CinemaLink to="/methodology" className="vt-process__method-link">Inspect the methodology <span aria-hidden="true">↗</span></CinemaLink></div>
      <div className="vt-process__weights" aria-label="Fixed career comparison weights">{weights.map((weight) => <div className="vt-process__weight" key={weight.id}><div><h3>{weight.label}</h3><strong>{weight.percentage}<span>%</span></strong></div><p>{weight.role}</p><div className="vt-process__weight-track" aria-hidden="true"><span className="vt-process__weight-fill" style={{ width: `${weight.percentage * 4}%` }} /></div></div>)}<p className="vt-process__weight-note">These are contribution weights, not an example person’s results.</p></div>
    </section>
    <section className="vt-process__record">
      <div className="vt-process__record-heading" data-process-reveal><h2>The picture comes together.<br/>The evidence stays with it.</h2><p>Your professional profile connects the interpretation to what supports it. It leaves room for context, questions and change.</p></div>
      <div className="vt-process__record-lines">{[
        ['What you shared', 'Your responses, background and the context they came from.'],
        ['What it suggests', 'Separate views of personality, interests and workplace priorities.'],
        ['What supports it', 'The evidence, contribution weights and limits behind a comparison.'],
      ].map(([title, description]) => <div key={title} data-process-reveal><h3>{title}</h3><p>{description}</p></div>)}</div>
    </section>
    <section className="vt-process__outcome"><img className="vt-process__outcome-photo" src={`${MEDIA}studio-1920.webp`} alt="A shared creative workspace with room to explore ideas" loading="lazy" /><div className="vt-process__outcome-copy" data-process-reveal><h2>A clearer picture.<br/>An open future.</h2><p>Explore where your working patterns meet different roles and environments.</p><CinemaLink to="/career-intelligence">Explore career intelligence <span aria-hidden="true">↗</span></CinemaLink><CinemaLink to="/signup?next=%2Fassessment%2Fstart" className="vt-process__build">Build my profile <span aria-hidden="true">↗</span></CinemaLink></div></section>
  </div>;
}
