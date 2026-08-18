import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';
import useReducedMotion from '../../../hooks/personality-v4/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const CareerWorldsTheatre = () => {
  const envelopeRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { careerWorlds } = PUBLIC_CONTENT.home;
  const activeWorld = careerWorlds.worlds[activeIndex] || careerWorlds.worlds[0];

  const prevIndex = (activeIndex - 1 + careerWorlds.worlds.length) % careerWorlds.worlds.length;
  const nextIndex = (activeIndex + 1) % careerWorlds.worlds.length;

  const prevWorld = careerWorlds.worlds[prevIndex];
  const nextWorld = careerWorlds.worlds[nextIndex];

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 5-world sequential timeline mapping scroll progress across 320svh
      ScrollTrigger.create({
        trigger: envelopeRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.65,
        onUpdate: (self) => {
          const count = careerWorlds.worlds.length;
          const index = Math.min(Math.floor(self.progress * count), count - 1);
          setActiveIndex(index);
        },
      });
    }, envelopeRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, careerWorlds.worlds.length]);

  return (
    <section ref={envelopeRef} className="pa-career-envelope" aria-label="Career Worlds Theatre">
      <div className="pa-career-stage">
        <div className="pa-career-top">
          <div>
            <h2>{careerWorlds.title}</h2>
            <p style={{ color: 'var(--pa-cool-400)', marginTop: '4px' }}>
              {careerWorlds.support}
            </p>
          </div>
          <div className="pa-career-index pa-tabular">{activeWorld.index}</div>
        </div>

        <div className="pa-career-theatre-view">
          <div className="pa-career-peek-left" aria-hidden="true">
            <ResponsivePicture
              asset={MEDIA_ASSETS[prevWorld.imageKey]}
              alt=""
              sizes="12vw"
              objectPosition="50% 40%"
            />
          </div>

          <div className="pa-career-active-frame">
            <ResponsivePicture
              key={activeWorld.id}
              asset={MEDIA_ASSETS[activeWorld.imageKey]}
              alt={MEDIA_ASSETS[activeWorld.imageKey]?.alt || ''}
              sizes="(max-width: 900px) 100vw, 42vw"
              objectPosition="50% 40%"
              imgClassName="pa-animate-fade-in"
            />
          </div>

          <div className="pa-career-peek-right" aria-hidden="true">
            <ResponsivePicture
              asset={MEDIA_ASSETS[nextWorld.imageKey]}
              alt=""
              sizes="12vw"
              objectPosition="50% 40%"
            />
          </div>
        </div>

        <div className="pa-career-bottom-details">
          <div>
            <div className="pa-career-world-theme">{activeWorld.theme}</div>
            <h3 className="pa-career-world-title">{activeWorld.name}</h3>
            <p className="pa-career-world-stmt">{activeWorld.statement}</p>
          </div>

          <div className="pa-career-reqs-wrap">
            <p>Environmental Conditions</p>
            <ul className="pa-career-reqs-list">
              {activeWorld.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerWorldsTheatre;
