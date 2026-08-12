import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import MediaSurface from './MediaSurface';
import ProfessionalPortrait from './ProfessionalPortrait';
import './personality-labs.css';

gsap.registerPlugin(ScrollTrigger);

const evidence = [
  ['CV CONTEXT', 'pa-fragment--one'],
  ['BACKGROUND', 'pa-fragment--two'],
  ['ADAPTIVE RESPONSES', 'pa-fragment--three'],
  ['BEHAVIORAL EVIDENCE', 'pa-fragment--four'],
];

function TransitionStudies() {
  return (
    <section className="pa-studies" aria-labelledby="motion-studies-title">
      <div className="pa-section-intro">
        <p className="pa-eyebrow">DEV-ONLY COMPARISON</p>
        <h2 id="motion-studies-title">Three transition primitives.</h2>
        <p>Small isolated studies for deciding the motion grammar before it reaches a production route.</p>
      </div>
      <div className="pa-studies__grid">
        <article className="pa-study pa-study--push">
          <span>01 / SCALE — PUSH</span><div className="pa-study__window"><MediaSurface compact /></div>
          <p>Contained surface exceeds the frame and reveals the orange index behind it.</p>
        </article>
        <article className="pa-study pa-study--mask">
          <span>02 / MASK — SEGMENT</span><div className="pa-study__shutters"><i /><i /><i /><i /><i /></div>
          <p>One composition briefly resolves as a controlled shutter, not a permanent visual motif.</p>
        </article>
        <article className="pa-study pa-study--transfer">
          <span>03 / SHARED OBJECT — TRANSFER</span><div className="pa-study__transfer"><MediaSurface compact /><b>→</b><div className="pa-study__target">EVIDENCE<br />01</div></div>
          <p>The same object changes from editorial focal point into an accountable unit of evidence.</p>
        </article>
      </div>
    </section>
  );
}

export default function CinematicLab() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !root.current) return undefined;
    const context = gsap.context(() => {
      const stage = root.current.querySelector('.pa-cinematic-stage');
      const fragments = gsap.utils.toArray('.pa-fragment');
      const labels = gsap.utils.toArray('.pa-fragment__label');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top top', end: '+=330%', scrub: 0.8, pin: true, anticipatePin: 1 },
      });

      tl.to('.pa-whole-media', { scale: 1.18, xPercent: -7, yPercent: -4, duration: 1.05, ease: 'power2.inOut' })
        .to('.pa-opening-copy', { autoAlpha: 0, y: -18, duration: 0.36 }, 0.75)
        .fromTo(fragments, { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, stagger: 0.13, duration: 0.7, ease: 'power3.out' }, 0.72)
        .fromTo(labels, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.45 }, 1.06)
        .to('.pa-whole-media', { autoAlpha: 0, scale: 1.36, duration: 0.55, ease: 'power2.in' }, 1.18)
        .to('.pa-evidence-caption', { autoAlpha: 1, y: 0, duration: 0.5 }, 1.25)
        .to(fragments, { x: 0, y: 0, rotation: 0, scale: 0.6, autoAlpha: 0.14, duration: 1.05, stagger: 0.07, ease: 'power3.inOut' }, 1.75)
        .to('.pa-fragment__label', { autoAlpha: 0, duration: 0.35 }, 2.12)
        .to('.pa-portrait-wrap', { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, 2.26)
        .to('.pa-structure-caption', { autoAlpha: 1, y: 0, duration: 0.42 }, 2.42)
        .to('.pa-direction-copy', { autoAlpha: 1, x: 0, duration: 0.58, ease: 'power3.out' }, 3.35)
        .to('.pa-portrait-wrap', { xPercent: -28, scale: 0.76, duration: 0.72, ease: 'power2.inOut' }, 3.36)
        .to('.pa-direction-line', { scaleX: 1, duration: 0.55, ease: 'power2.out' }, 3.62);
    }, root);
    return () => context.revert();
  }, [reduced]);

  return (
    <main className={`pa-lab pa-cinematic-lab ${reduced ? 'is-reduced' : ''}`} ref={root}>
      <a className="pa-skip-link" href="#cinematic-content">Skip cinematic sequence</a>
      <header className="pa-lab-topbar"><span>PERSONALITY ASSESSOR</span><span>DESIGN MOTION LAB / 02A</span></header>
      <section className="pa-cinematic-stage" aria-labelledby="cinematic-title">
        <div className="pa-stage-grain" aria-hidden="true" />
        <div className="pa-opening-copy">
          <p className="pa-eyebrow">SIGNAL → STRUCTURE → DIRECTION</p>
          <h1 id="cinematic-title">A professional identity<br /><i>is not one answer.</i></h1>
          <p>It takes shape through the evidence you bring, the choices you make, and the patterns that emerge.</p>
        </div>
        <div className="pa-whole-media"><MediaSurface label="PROTOTYPE_MEDIA_ONLY" /></div>
        <p className="pa-evidence-caption">One composed whole becomes a field of evidence.</p>
        <div className="pa-fragments" aria-label="Evidence sources">
          {evidence.map(([label, modifier]) => <div className={`pa-fragment ${modifier}`} key={label}><MediaSurface compact /><span className="pa-fragment__label">{label}</span></div>)}
        </div>
        <div className="pa-portrait-wrap"><ProfessionalPortrait /></div>
        <p className="pa-structure-caption">Quiet enough to read. Specific enough to support a decision.</p>
        <div className="pa-direction-copy">
          <p className="pa-eyebrow">DIRECTION</p><h2>Structure becomes<br /><i>direction.</i></h2>
          <p>A recommendation matters more when you can see why it aligns.</p><span className="pa-direction-line" />
        </div>
        <span className="pa-stage-index" aria-hidden="true">01—04</span>
      </section>
      <section id="cinematic-content" className="pa-lab-release">
        <p>END OF PINNED SEQUENCE / NATIVE PAGE FLOW RESUMES</p>
      </section>
      <TransitionStudies />
    </main>
  );
}
