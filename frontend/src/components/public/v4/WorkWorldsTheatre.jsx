import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { publicMedia } from '../../../content/personalityMarketingDemo';

const worldsData = [
  {
    id: 'build',
    name: 'Build',
    statement: 'Constraints reveal how you construct systems.',
    detail: 'Engineering and architecture environments expose trade-offs between speed, durability and scalability.',
    media: publicMedia.worlds[0]?.media,
  },
  {
    id: 'investigate',
    name: 'Investigate',
    statement: 'Uncertainty reveals how you search for proof.',
    detail: 'Research and empirical inquiry expose how you test hypotheses and resolve ambiguous findings.',
    media: publicMedia.worlds[1]?.media,
  },
  {
    id: 'make',
    name: 'Make',
    statement: 'Iteration reveals how you refine.',
    detail: 'Tangible craft and hands-on fabrication expose how feedback directly reshapes your execution.',
    media: publicMedia.worlds[2]?.media,
  },
  {
    id: 'shape',
    name: 'Shape',
    statement: 'Ambiguity reveals what you notice.',
    detail: 'Design and user-centered exploration expose what patterns you prioritize before a solution is proven.',
    media: publicMedia.worlds[3]?.media,
  },
  {
    id: 'structure',
    name: 'Structure',
    statement: 'Complexity reveals how you organize.',
    detail: 'Systems design and operational planning expose how you decompose intricate multi-stakeholder dependencies.',
    media: publicMedia.worlds[4]?.media,
  },
  {
    id: 'collaborate',
    name: 'Collaborate',
    statement: 'Shared pressure reveals how you align.',
    detail: 'High-stakes team environments expose situational leadership, constructive disagreement and consensus building.',
    media: publicMedia.worlds[5]?.media,
  },
];

export default function WorkWorldsTheatre() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeWorldIndex, setActiveWorldIndex] = useState(0);
  const { reducedMotion } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'work-worlds-stage',
            trigger: containerRef.current,
            start: 'top top',
            end: '+=480vh',
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const idx = Math.min(worldsData.length - 1, Math.floor(progress * worldsData.length));
              setActiveWorldIndex(idx);
            },
          },
        });

        timelineRef.current = tl;

        // Build semantic timeline with enter, settled, and transition labels
        worldsData.forEach((world, i) => {
          const enterLabel = `${world.id}-enter`;
          const settledLabel = `${world.id}-settled`;

          tl.addLabel(enterLabel);

          // Transition to active world slot
          tl.to(
            stageRef.current?.querySelector(`.world-slot-${i}`),
            {
              opacity: 1,
              scale: 1,
              x: '0%',
              zIndex: 10,
              duration: 0.85,
              ease: 'power2.out',
            },
            enterLabel
          );

          // Settle and dwell
          tl.addLabel(settledLabel);
          tl.to({}, { duration: 1.1 }); // Dwell plateau

          if (i < worldsData.length - 1) {
            // Recede previous slot
            tl.to(
              stageRef.current?.querySelector(`.world-slot-${i}`),
              {
                opacity: 0.15,
                scale: 0.94,
                x: '-18%',
                zIndex: 1,
                duration: 0.75,
                ease: 'power2.inOut',
              }
            );
          }
        });

        tl.addLabel('release');

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const activeWorld = worldsData[activeWorldIndex] || worldsData[0];

  const handleSelectWorld = (index) => {
    setActiveWorldIndex(index);
    if (timelineRef.current?.scrollTrigger) {
      const targetLabel = `${worldsData[index].id}-settled`;
      const scrollPos = timelineRef.current.scrollTrigger.labelToScroll(targetLabel);
      if (scrollPos !== undefined) {
        window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="scene-work-worlds"
      className="work-worlds-theatre-v4"
      ref={containerRef}
      data-header-scene="light"
      aria-labelledby="work-worlds-title"
    >
      <div className="work-worlds-theatre-v4__inner">
        {/* Scene Header */}
        <header className="work-worlds-theatre-v4__header">
          <div className="work-worlds-theatre-v4__heading-wrap">
            <h2 id="work-worlds-title" className="work-worlds-theatre-v4__title">
              Work changes the evidence.
            </h2>
            <p className="work-worlds-theatre-v4__support">
              Different environments reveal different ways of solving, making, structuring and collaborating.
            </p>
          </div>

          {/* Direct World Selector Pills */}
          <nav className="work-worlds-theatre-v4__nav" aria-label="Work Worlds switcher">
            {worldsData.map((world, idx) => (
              <button
                key={world.id}
                type="button"
                className={`world-nav-pill ${activeWorldIndex === idx ? 'is-active' : ''}`}
                onClick={() => handleSelectWorld(idx)}
                aria-pressed={activeWorldIndex === idx}
              >
                {world.name}
              </button>
            ))}
          </nav>
        </header>

        {/* Persistent Desktop Stage & Mobile Flow */}
        <div className="work-worlds-theatre-v4__stage" ref={stageRef}>
          {/* Spatial World Media Stage (Slots rather than 6 separate flex cards) */}
          <div className="work-worlds-theatre-v4__media-canvas" aria-live="polite">
            {worldsData.map((world, idx) => {
              const isCurrent = activeWorldIndex === idx;
              const isPrev = activeWorldIndex > idx;
              const isNext = activeWorldIndex < idx;

              const slotClass = [
                'world-stage-slot',
                `world-slot-${idx}`,
                isCurrent ? 'is-current' : '',
                isPrev ? 'is-prev' : '',
                isNext ? 'is-next' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div key={world.id} className={slotClass}>
                  <figure className="world-stage-slot__media">
                    {world.media && (
                      <ResponsiveImage
                        media={world.media}
                        alt={`Work environment: ${world.name}`}
                        sizes="(min-width: 1024px) 46vw, 92vw"
                      />
                    )}
                  </figure>
                </div>
              );
            })}
          </div>

          {/* Dwell Narrative Panel */}
          <div className="work-worlds-theatre-v4__narrative">
            <div className="world-narrative-card">
              <span className="world-narrative-card__tag">World: {activeWorld.name}</span>
              <h3 className="world-narrative-card__statement">{activeWorld.statement}</h3>
              <p className="world-narrative-card__detail">{activeWorld.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
