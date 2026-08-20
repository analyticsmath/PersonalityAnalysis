import React, { useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaPlane from '../motion/MediaPlane';
import { MEDIA_ASSETS_V7 } from '../../../content/personality-v7/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v7/publicContent';
import useCinematicScene from '../motion/useCinematicScene';

gsap.registerPlugin(ScrollTrigger);
const assets = [MEDIA_ASSETS_V7.a03, MEDIA_ASSETS_V7.a04, MEDIA_ASSETS_V7.a05, MEDIA_ASSETS_V7.a06, MEDIA_ASSETS_V7.a02];

export const CareerEnvironmentsChapter = () => {
  const [selected, setSelected] = useState(0);
  const worlds = PUBLIC_CONTENT.home.careerWorlds.worlds;
  const sceneRef = useCinematicScene(({ scope }) => {
    const layers = gsap.utils.toArray('.pa-role-field__image', scope);
    gsap.set(layers, { autoAlpha: 0, xPercent: 12, scale: 1.04, pointerEvents: 'none' });
    gsap.set(layers[0], { autoAlpha: 1, xPercent: 0, scale: 1, pointerEvents: 'auto' });
    const timeline = gsap.timeline({ defaults: { ease: 'none' } });
    layers.slice(1).forEach((layer, index) => timeline.to(layer, { autoAlpha: 1, xPercent: 0, scale: 1, pointerEvents: 'auto', duration: .32 }, index + .7).to(layers[index], { autoAlpha: .25, xPercent: -5, duration: .32 }, index + .88));
    ScrollTrigger.create({ trigger: scope, start: 'top top', end: 'bottom bottom', pin: scope.querySelector('.pa-role-field__stage'), pinSpacing: false, scrub: true, animation: timeline, onEnter: () => { document.documentElement.dataset.publicField = 'dark'; }, onLeaveBack: () => { delete document.documentElement.dataset.publicField; } });
    return () => { delete document.documentElement.dataset.publicField; };
  }, []);
  const selectWorld = useCallback((index) => {
    setSelected(index);
    const layers = sceneRef.current?.querySelectorAll('.pa-role-field__image');
    if (!layers) return;
    gsap.to(layers, { autoAlpha: .18, xPercent: -4, duration: .22, overwrite: true });
    gsap.to(layers[index], { autoAlpha: 1, xPercent: 0, scale: 1, duration: .32, pointerEvents: 'auto', overwrite: true });
  }, [sceneRef]);
  return <section ref={sceneRef} className="pa-role-field" aria-labelledby="role-field-title"><div className="pa-role-field__stage"><div className="pa-role-field__index"><h2 id="role-field-title">Career environments make a profile legible.</h2><p>These are examples of conditions a person may want to investigate, not a live match result.</p>{worlds.map((world, index) => <button key={world.id} className={selected === index ? 'is-selected' : ''} onClick={() => selectWorld(index)} onFocus={() => selectWorld(index)}><strong>{world.name}</strong><span>{world.theme}</span></button>)}</div><div className="pa-role-field__media">{worlds.map((world, index) => <figure className={`pa-role-field__image ${selected === index ? 'is-mobile-selected' : ''}`} key={world.id}><MediaPlane asset={assets[index]} priority={index === 0} alt={`Career environment: ${world.name}`} /><figcaption>{world.statement}</figcaption></figure>)}</div></div></section>;
};
export default CareerEnvironmentsChapter;
