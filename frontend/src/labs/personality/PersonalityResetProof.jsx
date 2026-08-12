import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import ProfessionalPortraitField from './ProfessionalPortraitField';
import { proofDemo } from './personalityResetProofData';
import './personality-reset-proof.css';

gsap.registerPlugin(ScrollTrigger, Flip);

const slices = Array.from({ length: 7 }, (_, index) => index);

function ProofHeader() {
  return <header className="proof-header"><Link to="/">Personality<br />Assessor</Link><span>Visual reset — proof 01</span><Link to="/signup">Start assessment</Link></header>;
}

function EvidenceFragments() {
  return <div className="proof-evidence" aria-label="Demonstration evidence">
    <article className="proof-evidence__fragment proof-evidence__context">
      <h2>Professional context</h2><small>{proofDemo.label}</small>
      <dl>{proofDemo.context.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl>
    </article>
    <article className="proof-evidence__fragment proof-evidence__response">
      <h2>Adaptive response</h2><small>{proofDemo.label}</small>
      <p>A project changes direction unexpectedly. Which approach are you most likely to take?</p>
      <button type="button">Clarify the changed constraint, then test the revised path.</button>
      <button type="button">Gather input before choosing the next step.</button>
    </article>
    <article className="proof-evidence__fragment proof-evidence__behavior">
      <h2>Behavioral evidence</h2><small>{proofDemo.label}</small>
      <p>A team is divided over a next step. What trade-off would you examine before proposing an approach?</p>
      <div>Scope · user impact · delivery risk</div>
    </article>
  </div>;
}

function CareerStage({ career, onCareer }) {
  const active = proofDemo.careers[career];
  return <section className="proof-career" aria-labelledby="proof-career-title">
    <div className="proof-career__image" style={{ '--career-image': `url(${`/media/personality/careers/${active.image}-1200.webp`})` }} role="img" aria-label={active.alt} />
    <div className="proof-career__shade" aria-hidden="true" />
    <div className="proof-career__copy"><p>Career comparison</p><h2 id="proof-career-title">The profile remains.<br />The relationship changes.</h2><span>{proofDemo.label}</span></div>
    <div className="proof-career__switch" role="group" aria-label="Choose demonstration career world">
      {Object.values(proofDemo.careers).map((item) => <button key={item.id} type="button" className={career === item.id ? 'is-selected' : ''} aria-pressed={career === item.id} onClick={() => onCareer(item.id)}>{item.name}</button>)}
    </div>
    <div className="proof-career__portrait"><ProfessionalPortraitField career={career} compact /></div>
    <p className="proof-career__note">{active.copy}</p>
  </section>;
}

export default function PersonalityResetProof() {
  const root = useRef(null);
  const material = useRef(null);
  const materialOrigin = useRef(null);
  const materialTarget = useRef(null);
  const moved = useRef(false);
  const reduced = usePrefersReducedMotion();
  const [career, setCareer] = useState('ux');

  useLayoutEffect(() => {
    if (reduced || !root.current) return undefined;
    const moveMaterial = (toPortrait) => {
      if (!material.current || moved.current === toPortrait) return;
      const state = Flip.getState(material.current);
      (toPortrait ? materialTarget.current : materialOrigin.current)?.appendChild(material.current);
      moved.current = toPortrait;
      Flip.from(state, { duration: 0.38, ease: 'power2.inOut', absolute: true });
    };
    const context = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const sliceNodes = gsap.utils.toArray('.proof-hero__slice');
        const fragmentNodes = gsap.utils.toArray('.proof-evidence__fragment');
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.proof-corridor', start: 'top top', end: window.innerWidth < 1100 ? '+=250%' : '+=360%', scrub: 0.8, pin: true, anticipatePin: 1,
            onUpdate: (self) => moveMaterial(self.progress >= 0.48),
            onLeaveBack: () => moveMaterial(false),
          },
        });
        timeline
          .to('.proof-hero__headline', { autoAlpha: 0.16, yPercent: -8, duration: 0.52 }, 0)
          .to(sliceNodes, { xPercent: (index) => (index - 3) * 19, yPercent: (index) => (index % 2 ? 8 : -6), duration: 1.05, stagger: 0.04, ease: 'none' }, 0.32)
          .fromTo(fragmentNodes, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.1 }, 0.78)
          .to(sliceNodes, { autoAlpha: (index) => (index === 1 || index === 3 || index === 5 ? 0.54 : 0.08), scale: 0.7, duration: 0.72, ease: 'power1.inOut' }, 1.36)
          .to(fragmentNodes, { scale: 0.72, x: (index) => [310, 0, -310][index], y: (index) => [100, -130, 110][index], duration: 0.78, ease: 'power2.inOut' }, 1.46)
          .fromTo('.proof-portrait-stage', { autoAlpha: 0, scale: 0.93, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.62, ease: 'power2.out' }, 1.84)
          .to('.proof-evidence', { autoAlpha: 0.2, duration: 0.45 }, 2.16)
          .to('.proof-portrait-stage', { xPercent: -22, scale: 0.78, duration: 0.75, ease: 'power2.inOut' }, 2.78)
          .fromTo('.proof-career-stage', { autoAlpha: 0, xPercent: 12 }, { autoAlpha: 1, xPercent: 0, duration: 0.65, ease: 'power2.out' }, 2.92);
      });
      return () => mm.revert();
    }, root);
    return () => context.revert();
  }, [reduced]);

  return <main className={`personality-reset-proof ${reduced ? 'is-reduced' : ''}`} ref={root}>
    <a className="proof-skip" href="#proof-content">Skip proof sequence</a>
    <ProofHeader />
    <section className="proof-corridor" aria-labelledby="proof-title">
      <div className="proof-stage">
        <div className="proof-hero">
          <h1 id="proof-title" className="proof-hero__headline"><span>How you work</span><span>is more than</span><span>a job title.</span></h1>
          <div className="proof-hero__media" aria-label="Professional work in progress">
            {slices.map((slice) => <div className="proof-hero__slice" key={slice} style={{ '--slice': slice }} aria-hidden="true" />)}
          </div>
          <Link className="proof-hero__cta" to="/signup">Start assessment</Link>
        </div>
        <div className="proof-evidence-anchor" ref={materialOrigin}><span ref={material}>Evidence, organised.</span></div>
        <EvidenceFragments />
        <div className="proof-portrait-stage"><div className="proof-portrait-stage__material" ref={materialTarget} /><ProfessionalPortraitField /></div>
        <div className="proof-career-stage"><CareerStage career={career} onCareer={setCareer} /></div>
      </div>
    </section>
    <section id="proof-content" className="proof-static-summary"><h2>Professional context, responses and behavioral evidence become a readable profile.</h2><p>{proofDemo.label}. Career relationships are shown as visual comparison only—not an employability prediction or a score.</p></section>
  </main>;
}
