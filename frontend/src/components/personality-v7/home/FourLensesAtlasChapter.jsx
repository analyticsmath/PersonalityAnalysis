import React, { useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);

const readings = [
  { id: 'big-five', name: 'Big Five', detail: 'Five separate dimensions, considered without a composite verdict.' },
  { id: 'riasec', name: 'RIASEC', detail: 'Interest environments are related without being ranked.' },
  { id: 'work-values', name: 'Work values', detail: 'Conditions can be compared without assigning a universal order.' },
  { id: 'signals', name: 'Behavioural signals', detail: 'Response traces remain available as context for a reading.' },
];

const BigFive = () => <div className="pa-reading pa-reading--bigfive"><MediaPlane asset={MEDIA_ASSETS_V7.b01} alt="" className="pa-reading__atmosphere" /><div className="pa-reading__instrument"><h3>Separate axes, not a verdict.</h3>{[['Openness', 'Pragmatic and concrete', 'Exploratory and abstract'], ['Conscientiousness', 'Flexible and spontaneous', 'Systematic and thorough'], ['Extraversion', 'Independent and contemplative', 'Expressive and outward'], ['Agreeableness', 'Competitive and direct', 'Cooperative and empathetic'], ['Emotional stability', 'Reactive and sensitive', 'Steady and grounded']].map(([name, left, right]) => <div className="pa-spectrum" key={name}><strong>{name}</strong><span>{left}</span><i /><span>{right}</span></div>)}</div></div>;

const Riasec = () => <div className="pa-reading pa-reading--riasec"><svg className="pa-riasec-diagram" viewBox="0 0 480 420" role="img" aria-label="RIASEC relationship diagram with six independent interest environments"><polygon points="240,48 385,132 385,292 240,372 95,292 95,132" fill="none" stroke="currentColor" strokeWidth="1" /><polygon points="240,115 327,165 327,264 240,315 153,264 153,165" fill="none" stroke="currentColor" strokeWidth="1" opacity=".38" />{[[240,48,'Realistic'],[385,132,'Investigative'],[385,292,'Artistic'],[240,372,'Social'],[95,292,'Enterprising'],[95,132,'Conventional']].map(([x,y,label]) => <g key={label}><circle cx={x} cy={y} r="5" /><text x={x} y={y < 210 ? y - 16 : y + 28} textAnchor="middle">{label}</text></g>)}</svg><p>Six named environments make up a framework for discussing vocational interests. The diagram does not show a visitor’s scores.</p></div>;

const WorkValues = () => <div className="pa-reading pa-reading--values"><MediaPlane asset={MEDIA_ASSETS_V7.b12} alt="" className="pa-reading__values-image" /><div className="pa-values-list"><h3>Work values can be compared separately.</h3>{[['Achievement','100%'],['Independence','82%'],['Working conditions','70%'],['Recognition','56%'],['Relationships','43%']].map(([label,width]) => <div key={label}><span>{label}</span><i style={{ width }} /></div>)}</div></div>;

const Signals = () => <div className="pa-reading pa-reading--signals"><MediaPlane asset={MEDIA_ASSETS_V7.a07} alt="Collage representing working evidence and response traces" /><div className="pa-signal-note pa-signal-note--one">Professional context provided</div><div className="pa-signal-note pa-signal-note--two">Responses chosen during inquiry</div><div className="pa-signal-note pa-signal-note--three">Scenario and trade-off trace</div><p className="pa-signal-caption">Evidence is context for interpretation, not a claim about who someone is outside the record they choose to provide.</p></div>;

export const FourLensesAtlasChapter = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRef = useCinematicScene(({ scope }) => {
    const layers = gsap.utils.toArray('.pa-readings-stage__layer', scope);
    gsap.set(layers, { autoAlpha: 0, pointerEvents: 'none' });
    gsap.set(layers[0], { autoAlpha: 1, pointerEvents: 'auto' });
    const timeline = gsap.timeline({ defaults: { ease: 'none' } });
    layers.slice(1).forEach((layer, index) => timeline.to(layer, { autoAlpha: 1, pointerEvents: 'auto', duration: .28 }, index + .72).to(layers[index], { autoAlpha: 0, pointerEvents: 'none', duration: .28 }, index + .98));
    ScrollTrigger.create({ trigger: scope, start: 'top top', end: 'bottom bottom', pin: scope.querySelector('.pa-readings-stage'), pinSpacing: false, scrub: true, animation: timeline });
  }, []);
  const chooseReading = useCallback((index) => { setActiveIndex(index); const layers = sceneRef.current?.querySelectorAll('.pa-readings-stage__layer'); if (!layers) return; gsap.to(layers, { autoAlpha: 0, duration: .22, overwrite: true, pointerEvents: 'none' }); gsap.to(layers[index], { autoAlpha: 1, duration: .28, pointerEvents: 'auto', overwrite: true }); }, [sceneRef]);
  return <section ref={sceneRef} className="pa-readings-scene" aria-labelledby="readings-title"><div className="pa-readings-stage"><header className="pa-readings-intro"><h2 id="readings-title">Four readings. One professional context.</h2><p>Each framework keeps a different question in view.</p><div className="pa-readings-tabs" role="tablist" aria-label="Choose a reading">{readings.map((reading, index) => <button key={reading.id} role="tab" aria-selected={activeIndex === index} aria-controls={`reading-${reading.id}`} id={`reading-tab-${reading.id}`} onClick={() => chooseReading(index)}>{reading.name}</button>)}</div><p className="pa-readings-status" aria-live="polite">{readings[activeIndex].detail}</p></header><div className="pa-readings-table">{[BigFive, Riasec, WorkValues, Signals].map((Reading, index) => <div className="pa-readings-stage__layer" role="tabpanel" id={`reading-${readings[index].id}`} aria-labelledby={`reading-tab-${readings[index].id}`} key={readings[index].id}><Reading /></div>)}</div></div></section>;
};

export default FourLensesAtlasChapter;
