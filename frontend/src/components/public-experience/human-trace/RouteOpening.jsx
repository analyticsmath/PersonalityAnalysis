import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './routeOpenings.css';

gsap.registerPlugin(ScrollTrigger);
const media = '/media/public-experience/digital/';
const contexts = ['code-detail', 'wireframe', 'collaborate', 'studio', 'designer'];
const weights = [
  ['Interests', 25], ['Skills', 25], ['Work values', 20],
  ['Personality', 15], ['Education', 10], ['Goals', 5],
];

function EvidencePath() {
  return <svg viewBox="0 0 1100 260" role="img" aria-label="Evidence moves from supplied responses to inference, calculation, comparison and account controls">
    <path className="vt-opening-path" d="M70 130 C220 -10 260 270 420 130 S620 -10 770 130 S940 270 1030 130" />
    {['Supplied', 'Inferred', 'Calculated', 'Compared', 'Controlled'].map((label, index) => <g key={label}>
      <circle cx={70 + index * 240} cy="130" r={index === 0 ? 28 : 15} />
      <text x={70 + index * 240} y="215" textAnchor="middle">{label}</text>
    </g>)}
  </svg>;
}

export default function RouteOpening({ lines, image, alt, description, variant }) {
  const rootRef = useRef(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.to('.vt-opening-media img', { yPercent: 14, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.65 } });
      gsap.to('.vt-opening-title', { y: -65, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.65 } });
      gsap.to('.vt-opening-formula > div', { y: (index) => index % 2 ? -34 : 22, ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.8 } });
    }, root);
    const reveal = () => context.add(() => {
      gsap.from('.vt-opening-line > span', { yPercent: 110, duration: 1.15, stagger: 0.12, ease: 'power4.out' });
      gsap.from('.vt-opening-plane', { y: 70, opacity: 0, duration: 1.3, stagger: 0.08, ease: 'power3.out' });
      const path = root.querySelector('.vt-opening-path');
      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' });
      }
    });
    if (document.documentElement.dataset.cinematicTransition) {
      window.addEventListener('cinematic:reveal', reveal, { once: true });
    } else reveal();
    return () => {
      window.removeEventListener('cinematic:reveal', reveal);
      context.revert();
    };
  }, [variant]);

  return <section ref={rootRef} className={'vt-opening vt-opening--' + variant} data-route-ready="true">
    {variant === 'career' && <div className="vt-opening-contexts" aria-hidden="true">
      {contexts.map((name) => <figure className="vt-opening-media vt-opening-plane" key={name}><img src={media + name + '-1920.webp'} alt="" /></figure>)}
    </div>}
    {variant === 'how' && <>
      <figure className="vt-opening-media vt-opening-plane vt-opening-how-photo"><img src={image} alt={alt} /></figure>
      <div className="vt-opening-response vt-opening-plane"><p>Your words,<br/>kept in context.</p><div><span>Response</span><span>Evidence</span><span>Perspective</span></div></div>
    </>}
    {variant === 'progress' && <div className="vt-opening-diptych" aria-hidden="true">
      <figure className="vt-opening-media"><img src={media + 'code-detail-1920.webp'} alt="" /></figure>
      <figure className="vt-opening-media"><img src={media + 'collaborate-1920.webp'} alt="" /></figure>
    </div>}
    <h1 className="vt-opening-title">{lines.map((line) => <span className="vt-opening-line" key={line}><span>{line}</span></span>)}</h1>
    <p className="vt-opening-description">{description}</p>
    {variant === 'trust' && <div className="vt-opening-evidence vt-opening-plane"><EvidencePath /></div>}
    {variant === 'method' && <div className="vt-opening-formula" aria-label="Fixed career comparison weights">
      {weights.map(([name, value]) => <div key={name} style={{ height: (value * 4) + '%', flexGrow: 1 }} className="vt-opening-plane"><strong>{value}%</strong><span>{name}</span></div>)}
    </div>}
    {variant === 'privacy' && <div className="vt-opening-document vt-opening-plane"><span>Your assessment record</span><p>Read it.<br/>Export it.<br/>Manage it.</p><i aria-hidden="true">↗</i></div>}
  </section>;
}
