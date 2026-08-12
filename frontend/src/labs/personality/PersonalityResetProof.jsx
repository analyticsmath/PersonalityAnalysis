import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import ProfessionalPortraitGlyph from './ProfessionalPortraitGlyph';
import { proofDemo } from './personalityResetProofData';
import './personality-reset-proof.css';
import './personality-reset-proof-positioning.css';

gsap.registerPlugin(ScrollTrigger);

const slices = Array.from({ length: 7 }, (_, index) => index);

function ProofHeader() {
  return <header className="proof-header"><Link to="/">Personality<br />Assessor</Link><Link to="/signup">Start assessment →</Link></header>;
}

function EvidenceFragments() {
  return <section className="proof-evidence" aria-label="Demonstration evidence">
    <div className="proof-evidence__fragment proof-evidence__context"><h2>Professional context</h2><dl>{proofDemo.context.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></div>
    <div className="proof-evidence__fragment proof-evidence__response"><h2>Adaptive response</h2><p>A project changes direction unexpectedly. Which approach are you most likely to take?</p><button type="button" className="is-selected">Clarify the changed constraint, then test the revised path.</button><button type="button">Gather input before choosing the next step.</button></div>
    <div className="proof-evidence__fragment proof-evidence__behavior"><h2>Behavioral evidence</h2><p>A team is divided over a next step. What trade-off would you examine before proposing an approach?</p><div><span>Scope</span><span>User impact</span><span>Delivery risk</span></div></div>
  </section>;
}

function CareerStage({ career, onCareer }) {
  const active = proofDemo.careers[career];
  return <section className="proof-career" aria-labelledby="proof-career-title">
    <div className="proof-career__image" style={{ '--career-image': `url(/media/personality/careers/${active.image}-1200.webp)` }} role="img" aria-label={active.alt} />
    <h2 id="proof-career-title">{active.name}</h2>
    <div className="proof-career__mobile-glyph"><ProfessionalPortraitGlyph portrait={proofDemo.portrait} target={active.alignment} compact /></div>
    <div className="proof-career__switch" role="group" aria-label="Choose demonstration career world">{Object.values(proofDemo.careers).map((item) => <button key={item.id} type="button" className={career === item.id ? 'is-selected' : ''} aria-pressed={career === item.id} onClick={() => onCareer(item.id)}>{item.name}</button>)}</div>
    <p className="proof-career__note">Alignment is a comparison, not a prediction.</p>
  </section>;
}

export default function PersonalityResetProof() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [career, setCareer] = useState('ux');
  const { pathname } = useLocation();
  const isRemoteReview = pathname.startsWith('/__review/');

  useLayoutEffect(() => {
    if (reduced || !root.current) return undefined;
    const context = gsap.context(() => {
      const mediaPlanes = gsap.utils.toArray('.proof-hero__slice');
      const fragments = gsap.utils.toArray('.proof-evidence__fragment');
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: '.proof-corridor', start: 'top top', end: window.innerWidth < 1100 ? '+=340%' : '+=390%', scrub: 0.8, pin: true, anticipatePin: 1 } });
        timeline
          .to('.proof-hero__headline', { autoAlpha: 0.38, duration: 0.35 }, 0.32)
          .to(mediaPlanes, { xPercent: (index) => [-34, -18, -7, 9, 20, 32, 43][index], yPercent: (index) => [11, -8, 6, -10, 13, -6, 9][index], scale: (index) => [1.12, .94, 1.08, .9, 1.1, .96, 1.06][index], duration: 1, stagger: .02, ease: 'none' }, 0.48)
          .fromTo(fragments, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .42, stagger: .11, ease: 'power2.out' }, 1.05)
          .to(mediaPlanes, { xPercent: (index) => [-10, -5, 0, 4, 7, 10, 13][index], yPercent: (index) => [7, -5, 3, -4, 5, -3, 4][index], scale: .46, autoAlpha: .24, duration: .78, ease: 'power2.inOut' }, 1.85)
          .to(fragments, { x: (index) => [-180, 0, 180][index], y: (index) => [75, -95, 82][index], scale: .54, autoAlpha: .2, duration: .72, ease: 'power2.inOut' }, 1.9)
          .fromTo('.proof-portrait-stage', { autoAlpha: 0, scale: .78 }, { autoAlpha: 1, scale: 1, duration: .7, ease: 'power2.out' }, 2.15)
          .to('.proof-glyph__formation', { autoAlpha: 0, duration: .38 }, 2.63)
          .to('.proof-glyph__structured', { autoAlpha: 1, duration: .38 }, 2.63)
          .to('.proof-career-stage', { autoAlpha: 1, duration: .55 }, 3.42)
          .to('.proof-hero, .proof-evidence', { autoAlpha: 0, duration: .38 }, 3.42)
          .to('.proof-portrait-stage', { scale: .88, duration: .6, ease: 'power1.inOut' }, 3.5);
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, [reduced]);

  const activeCareer = proofDemo.careers[career];
  return <main className={`personality-reset-proof ${reduced ? 'is-reduced' : ''}`} ref={root}>
    <a className="proof-skip" href="#proof-content">Skip proof sequence</a>{isRemoteReview && <span className="proof-review-marker">Design review</span>}<ProofHeader />
    <section className="proof-corridor" aria-labelledby="proof-title"><div className="proof-stage">
      <div className="proof-hero"><h1 id="proof-title" className="proof-hero__headline"><span>How you work</span><span>is more than</span><span>a job title.</span></h1><div className="proof-hero__media" aria-label="Professional work in progress">{slices.map((slice) => <div className="proof-hero__slice" key={slice} style={{ '--slice': slice }} aria-hidden="true" />)}</div><Link className="proof-hero__cta" to="/signup">Start assessment →</Link></div>
      <EvidenceFragments />
      <div className="proof-career-stage"><CareerStage career={career} onCareer={setCareer} /></div>
      <section className="proof-portrait-stage" aria-label="Professional portrait"><p>23 dimensions.<br />One professional portrait.</p><div className="proof-glyph__formation"><ProfessionalPortraitGlyph portrait={proofDemo.portrait} formation /></div><div className="proof-glyph__structured"><ProfessionalPortraitGlyph portrait={proofDemo.portrait} target={activeCareer.alignment} /></div></section>
    </div></section>
    <section id="proof-content" className="proof-static-summary"><h2>Professional context, responses and behavioral evidence become a readable profile.</h2><p>{proofDemo.label}. Career relationships are shown as visual comparison only—not an employability prediction or a score.</p></section>
  </main>;
}
