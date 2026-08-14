import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from './publicContent';

gsap.registerPlugin(Flip, ScrollTrigger);

const profileLenses = [
  { key: 'personality', label: 'Personality' },
  { key: 'interests', label: 'Interests' },
  { key: 'values', label: 'Work values' },
  { key: 'signals', label: 'Career signals' },
];

function HeroScene() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const mediaRef = useRef(null);
  const fragmentRef = useRef(null);
  const supportingRef = useRef(null);
  const carryProxyRef = useRef(null);
  const { reducedMotion } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const context = gsap.context(() => {
      // 1. Initial Reveal Timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl
        .fromTo(
          headlineRef.current?.querySelectorAll('.hero-line-reveal'),
          { y: '108%' },
          { y: '0%', duration: 0.72, stagger: 0.12 }
        )
        .fromTo(
          mediaRef.current?.querySelectorAll('.evidence-hero-fragment-frame'),
          { y: 20, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.35'
        );

      // 2. Desktop Cross-Scene Hero -> Work Worlds Carry Transition
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const carryProxy = carryProxyRef.current;
        const heroFragment = fragmentRef.current;
        const firstWorldPanel = document.querySelector('.work-world-panel[data-world-id="build"] .work-world-panel__media-wrap');

        if (carryProxy && heroFragment) {
          // ScrollTrigger scrubbed transition across Hero -> Work Worlds boundary
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              // Fade quiet region and text slightly as hero completes
              if (supportingRef.current) {
                supportingRef.current.style.opacity = String(1 - p * 0.7);
                supportingRef.current.style.transform = `translateY(${-p * 32}px)`;
              }
              if (headlineRef.current) {
                headlineRef.current.style.opacity = String(1 - p * 0.4);
                headlineRef.current.style.transform = `translateY(${-p * 48}px)`;
              }

              // True Visual Actor Carry: activate proxy when scrolling beyond 60% of Hero
              if (p > 0.45 && firstWorldPanel) {
                const fragRect = heroFragment.getBoundingClientRect();
                const targetRect = firstWorldPanel.getBoundingClientRect();

                // Compute relative normalized carry progress (0 to 1 between 0.45 and 1.0)
                const carryT = Math.min(1, Math.max(0, (p - 0.45) / 0.55));
                carryProxy.style.opacity = String(Math.sin(carryT * Math.PI) * 0.95 + (carryT >= 0.9 ? 0 : 0.05));
                carryProxy.style.display = 'block';

                const curX = fragRect.left + (targetRect.left - fragRect.left) * carryT;
                const curY = fragRect.top + (targetRect.top - fragRect.top) * carryT;
                const curW = fragRect.width + (targetRect.width - fragRect.width) * carryT;
                const curH = fragRect.height + (targetRect.height - fragRect.height) * carryT;

                carryProxy.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
                carryProxy.style.width = `${curW}px`;
                carryProxy.style.height = `${curH}px`;
              } else {
                carryProxy.style.display = 'none';
                carryProxy.style.opacity = '0';
              }
            },
          });
        }
      });
    }, heroRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="evidence-hero-scene" ref={heroRef} data-header-scene="light" aria-labelledby="hero-heading">
      {/* Dynamic Shared Carry Proxy (Cross-scene visual actor) */}
      <div
        ref={carryProxyRef}
        className="evidence-hero-carry-proxy"
        aria-hidden="true"
        style={{ display: 'none', position: 'fixed', top: 0, left: 0, zIndex: 90, pointerEvents: 'none' }}
      >
        <ResponsiveImage
          media={publicMedia.hero.supporting}
          alt=""
          sizes="28vw"
        />
      </div>

      {/* ONE Spatial Field: Large Evidence Environment (60-72%) with Direct Overlapping Typography */}
      <div className="evidence-hero-spatial-stage">
        {/* Dominant Evidence Visual Layer */}
        <div className="evidence-hero-environment" ref={mediaRef}>
          <figure className="evidence-hero-dominant-frame">
            <ResponsiveImage
              media={publicMedia.hero.dominant}
              alt="Architectural design studio wall with blueprints, drawings, and active planning artifacts"
              priority
              sizes="(min-width: 1200px) 72vw, 96vw"
            />
          </figure>

          {/* Supporting evidence fragments overlapping the main environment */}
          <figure
            className="evidence-hero-fragment-frame evidence-hero-fragment-frame--one"
            ref={fragmentRef}
          >
            <ResponsiveImage
              media={publicMedia.hero.supporting}
              alt="Hands arranging evidence artifacts and conceptual notes"
              sizes="(min-width: 1200px) 24vw, 44vw"
            />
            <figcaption className="evidence-fragment-caption">Artifact arrangement</figcaption>
          </figure>

          <figure className="evidence-hero-fragment-frame evidence-hero-fragment-frame--two">
            <ResponsiveImage
              media={publicMedia.hero.process}
              alt="Architectural model-making and process detail"
              sizes="(min-width: 1200px) 20vw, 38vw"
            />
            <figcaption className="evidence-fragment-caption">Process iteration</figcaption>
          </figure>
        </div>

        {/* Spatial Typographic Overlay Layer: H1 Invades Quiet Image Territory */}
        <div className="evidence-hero-overlay-layer">
          <h1 id="hero-heading" className="evidence-hero-scene__title" ref={headlineRef}>
            <span className="hero-line-mask">
              <span className="hero-line-reveal">Your work</span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line-reveal">leaves evidence.</span>
            </span>
          </h1>

          {/* Quieter Lower/Edge Region for Supporting Copy & Actions */}
          <div className="evidence-hero-quiet-region" ref={supportingRef}>
            <p className="evidence-hero-scene__supporting">
              Personality Assessor brings professional context and adaptive responses together into a profile you can
              inspect—personality, interests, work values, career signals, and the evidence behind them.
            </p>

            <div className="evidence-hero-scene__actions">
              <Link className="public-cta-button" to="/signup">
                Build my profile <Arrow />
              </Link>
              <Link className="public-text-action" to="/how-it-works">
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkWorldsScene() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion, scrollTo } = usePublicMotion();
  const worlds = publicMedia.worlds;

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const panels = gsap.utils.toArray('.work-world-panel');
        const count = panels.length;
        if (!count) return;

        const totalScrollDistance = window.innerHeight * 4.4;

        const scrollTween = gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
            id: 'work-worlds-trigger',
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScrollDistance}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const current = Math.min(count - 1, Math.floor(self.progress * count));
              setActiveIndex(current);
            },
          },
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        };
      });

      return () => media.revert();
    }, containerRef);

    return () => context.revert();
  }, [reducedMotion, worlds.length]);

  const scrollToWorld = (targetIndex) => {
    const clamped = Math.max(0, Math.min(worlds.length - 1, targetIndex));
    setActiveIndex(clamped);

    const trigger = ScrollTrigger.getById('work-worlds-trigger');
    if (trigger && typeof scrollTo === 'function') {
      const targetProgress = clamped / (worlds.length - 1);
      const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
      scrollTo(targetScroll);
    }
  };

  return (
    <section
      className="work-worlds-scene"
      ref={containerRef}
      data-header-scene="dark"
      aria-labelledby="work-worlds-title"
    >
      <div className="work-worlds-scene__header">
        <h2 id="work-worlds-title" className="work-worlds-scene__heading">
          Work Worlds
        </h2>
        <div className="work-worlds-scene__nav" role="toolbar" aria-label="Work worlds navigation">
          <button
            type="button"
            className="work-worlds-scene__nav-button"
            onClick={() => scrollToWorld(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous work world"
          >
            Previous
          </button>
          <span className="work-worlds-scene__nav-indicator" aria-live="polite">
            {activeIndex + 1} / {worlds.length} · {worlds[activeIndex]?.name}
          </span>
          <button
            type="button"
            className="work-worlds-scene__nav-button"
            onClick={() => scrollToWorld(activeIndex + 1)}
            disabled={activeIndex === worlds.length - 1}
            aria-label="Next work world"
          >
            Next
          </button>
        </div>
      </div>

      <div className="work-worlds-scene__track-wrapper">
        <div className="work-worlds-scene__track" ref={trackRef}>
          {worlds.map((world, index) => {
            const isDominant = activeIndex === index;
            return (
              <article
                key={world.id}
                className={`work-world-panel ${isDominant ? 'is-dominant' : ''}`}
                data-world-id={world.id}
                aria-current={isDominant ? 'step' : undefined}
              >
                <div className="work-world-panel__media-wrap">
                  <ResponsiveImage
                    media={world.media}
                    alt={world.media.alt}
                    sizes="(min-width: 1024px) 58vw, 90vw"
                  />
                </div>
                <div className="work-world-panel__content">
                  <h3 className="work-world-panel__name">{world.name}</h3>
                  <p className="work-world-panel__copy">{world.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContextScene() {
  const contextRef = useRef(null);
  const anchorEntityRef = useRef(null);
  const { reducedMotion } = usePublicMotion();

  const entities = [
    { type: 'Project', title: 'Real-time Analytics Migration', detail: 'Decomposed latency constraints into streaming stages.' },
    { type: 'Experience', title: 'Systems Infrastructure Lead', detail: 'Led platform reliability under continuous load.' },
    { type: 'Skill', title: 'Distributed Systems & Observability', detail: 'Formalized operational metrics and failure isolation.' },
    { type: 'Education', title: 'Computer Systems & HCI', detail: 'Structured analysis of computational complexity.' },
    { type: 'Interest', title: 'Toolsmithing & Precision Craft', detail: 'Building internal tools to expose invisible friction.' },
  ];

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        // Context -> Question Transition: peripheral annotations fade while anchor carries forward
        gsap.to('.context-annotation-node:not(.context-annotation-node--anchor)', {
          scrollTrigger: {
            trigger: contextRef.current,
            start: 'bottom 80%',
            end: 'bottom 20%',
            scrub: 0.5,
          },
          opacity: 0.2,
          y: -20,
        });
      });
    }, contextRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="context-scene" ref={contextRef} data-header-scene="light" aria-labelledby="context-heading">
      <div className="context-scene__inner">
        <header className="context-scene__header">
          <h2 id="context-heading" className="context-scene__title">
            Context changes the question.
          </h2>
          <p className="context-scene__copy">
            A CV or a profile you enter yourself gives the assessment a place to begin. Projects, skills, education,
            experience and interests shape what it asks next.
          </p>
        </header>

        {/* Card-Free Open Spatial Evidence Field */}
        <div className="context-open-field">
          <div className="context-document-stage">
            {/* Primary Document Artifact (Unboxed clean document sheet) */}
            <div className="context-document-sheet">
              <span className="context-document-label">Parsed Professional Record</span>
              <p className="context-document-body">
                Parsed baseline context seeds domain calibrations, operational scope, and situational trade-offs.
              </p>
            </div>

            {/* Open-space spatial annotations positioned around document */}
            <div className="context-annotation-field">
              {entities.map((item) => {
                const isAnchor = item.type === 'Project';
                return (
                  <div
                    key={item.type}
                    ref={isAnchor ? anchorEntityRef : null}
                    className={`context-annotation-node ${isAnchor ? 'context-annotation-node--anchor' : ''}`}
                    data-anchor={isAnchor ? 'project-context' : undefined}
                  >
                    <span className="context-node-type">{item.type}</span>
                    <strong className="context-node-title">{item.title}</strong>
                    <p className="context-node-detail">{item.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdaptiveQuestionDemoScene() {
  const [selectedResponse, setSelectedResponse] = useState('clarify');
  const [userSelected, setUserSelected] = useState(false);
  const questionSceneRef = useRef(null);
  const markerRef = useRef(null);
  const { reducedMotion } = usePublicMotion();

  const responses = [
    {
      id: 'clarify',
      text: 'Clarify what changed, then test a revised path.',
      feedback: 'Reflects iterative discovery and rapid constraint testing under uncertainty.',
    },
    {
      id: 'gather',
      text: 'Gather input before choosing the next move.',
      feedback: 'Reflects cross-functional alignment and consultative validation.',
    },
    {
      id: 'recheck',
      text: 'Recheck the original assumptions before changing course.',
      feedback: 'Reflects foundational verification and root-cause inquiry.',
    },
  ];

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        // Auto demonstration on scroll if user hasn't manually clicked
        ScrollTrigger.create({
          trigger: questionSceneRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            if (!userSelected) setSelectedResponse('clarify');
          },
        });

        // Question -> Profile continuity: selected interpretation compresses into opening Profile marker
        gsap.to(markerRef.current, {
          scrollTrigger: {
            trigger: questionSceneRef.current,
            start: 'bottom 60%',
            end: 'bottom 10%',
            scrub: 0.5,
          },
          opacity: 0.85,
          y: 20,
        });
      });
    }, questionSceneRef);
    return () => ctx.revert();
  }, [reducedMotion, userSelected]);

  const handleSelect = (id) => {
    setUserSelected(true);
    setSelectedResponse(id);
  };

  const currentFeedback = responses.find((r) => r.id === selectedResponse)?.feedback;

  return (
    <section
      className="adaptive-question-scene"
      ref={questionSceneRef}
      data-header-scene="light"
      aria-labelledby="adaptive-question-title"
    >
      <div className="adaptive-question-scene__inner">
        {/* Context -> Question Shared Element Continuity Line (No rounded badge) */}
        <div className="adaptive-question-evidence-line" aria-label="Active evidence context">
          <span className="evidence-line-label">Active evidence context:</span>
          <span className="evidence-line-content">Real-time Analytics Migration · Decomposed latency constraints into streaming stages.</span>
        </div>

        <header className="adaptive-question-scene__header">
          <h2 id="adaptive-question-title" className="adaptive-question-scene__title">
            Adaptive questioning in action.
          </h2>
          <p className="adaptive-question-scene__copy">
            Questions adapt to the tension points in your professional approach. Select an option to see how the system
            interprets different strategic responses.
          </p>
        </header>

        {/* The Question Text itself owns the scene — no giant enclosing card */}
        <div className="adaptive-question-workspace">
          <p className="adaptive-question-prompt-text">
            When a project changes direction after you&apos;ve already started, what do you usually do first?
          </p>

          <div className="adaptive-question-options" role="radiogroup" aria-label="Demonstration response options">
            {responses.map((item) => {
              const isSelected = selectedResponse === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`adaptive-option-button ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(item.id)}
                >
                  <span className="adaptive-option-indicator" aria-hidden="true" />
                  <span className="adaptive-option-text">{item.text}</span>
                </button>
              );
            })}
          </div>

          {selectedResponse && (
            <div ref={markerRef} className="adaptive-question-interpretation" role="status" aria-live="polite">
              <span className="adaptive-interpretation-label">Observed Strategy Signal</span>
              <p className="adaptive-interpretation-text">{currentFeedback}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProfileScene() {
  const [activeLens, setActiveLens] = useState('personality');
  const profileContainerRef = useRef(null);
  const lensStageRef = useRef(null);
  const { reducedMotion } = usePublicMotion();
  const demo = marketingDemo.profile;

  // Scroll-driven progression over viewport on desktop
  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const lensKeys = ['personality', 'interests', 'values', 'signals'];
        ScrollTrigger.create({
          trigger: profileContainerRef.current,
          start: 'top 40%',
          end: 'bottom 80%',
          scrub: true,
          onUpdate: (self) => {
            const stepIndex = Math.min(lensKeys.length - 1, Math.floor(self.progress * lensKeys.length));
            const nextKey = lensKeys[stepIndex];
            setActiveLens((prev) => {
              if (prev !== nextKey) return nextKey;
              return prev;
            });
          },
        });
      });
    }, profileContainerRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSelectLens = (key) => {
    if (key === activeLens) return;
    const state = Flip.getState(lensStageRef.current?.querySelectorAll('.profile-lens-item') || []);
    setActiveLens(key);
    window.requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.42,
        ease: 'power2.out',
        stagger: 0.04,
      });
    });
  };

  return (
    <section
      className="profile-scene"
      ref={profileContainerRef}
      data-header-scene="light"
      aria-labelledby="profile-heading"
    >
      <div className="profile-scene__inner">
        {/* Question -> Profile Evidence Continuity Marker */}
        <div className="profile-evidence-intake" aria-label="Calibrated Strategy Intake">
          <span className="profile-intake-label">Integrated Strategy Signal:</span>
          <span className="profile-intake-text">Iterative discovery &amp; rapid constraint testing under uncertainty</span>
        </div>

        <header className="profile-scene__header">
          <h2 id="profile-heading" className="profile-scene__title">
            One profile. Four distinct readings.
          </h2>
          <p className="profile-scene__copy">
            Personality, vocational interests, work values and career signals stay separate so one score never has to
            explain everything.
          </p>
        </header>

        <div className="profile-scene__controls" role="tablist" aria-label="Profile dimension lenses">
          {profileLenses.map((lens) => (
            <button
              key={lens.key}
              type="button"
              role="tab"
              aria-selected={activeLens === lens.key}
              className={`profile-lens-tab ${activeLens === lens.key ? 'is-active' : ''}`}
              onClick={() => handleSelectLens(lens.key)}
            >
              {lens.label}
            </button>
          ))}
        </div>

        <div className="profile-scene__reading-stage" ref={lensStageRef}>
          {activeLens === 'personality' && (
            <div className="profile-dimension-field profile-dimension-field--personality">
              <div className="profile-dimension-header">
                <span className="profile-dimension-framework">Big Five Continuous Dimensions</span>
                <span className="profile-dimension-note">Directly labelled measures</span>
              </div>
              <div className="profile-measures-list">
                {demo.bigFive.map(([label, score, reading]) => (
                  <article key={label} className="profile-measure-row profile-lens-item">
                    <div className="profile-measure-row__head">
                      <span className="profile-measure-label">{label}</span>
                      <span className="profile-measure-value">{score}%</span>
                    </div>
                    <div className="profile-measure-bar">
                      <div className="profile-measure-bar__fill" style={{ width: `${score}%` }} />
                    </div>
                    <p className="profile-measure-reading">{reading}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeLens === 'interests' && (
            <div className="profile-dimension-field profile-dimension-field--interests">
              <div className="profile-dimension-header">
                <span className="profile-dimension-framework">RIASEC Vocational Interests</span>
                <span className="profile-dimension-note">Ranked relational interest field</span>
              </div>
              <div className="profile-interests-grid">
                {demo.riasec.map(([label, score, description]) => (
                  <article key={label} className="profile-interest-card profile-lens-item">
                    <div className="profile-interest-card__head">
                      <span className="profile-interest-name">{label}</span>
                      <span className="profile-interest-score">{score}%</span>
                    </div>
                    <div className="profile-interest-bar">
                      <div className="profile-interest-bar__fill" style={{ width: `${score}%` }} />
                    </div>
                    <p className="profile-interest-desc">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeLens === 'values' && (
            <div className="profile-dimension-field profile-dimension-field--values">
              <div className="profile-dimension-header">
                <span className="profile-dimension-framework">Work Values Hierarchy</span>
                <span className="profile-dimension-note">12 values ranked by relative importance</span>
              </div>
              <div className="profile-values-ranked-list">
                {demo.values.map(([label, score, reading], index) => (
                  <article key={label} className="profile-value-row profile-lens-item">
                    <span className="profile-value-rank">#{index + 1}</span>
                    <div className="profile-value-content">
                      <div className="profile-value-content__head">
                        <strong>{label}</strong>
                        <span>{score}%</span>
                      </div>
                      <p>{reading}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeLens === 'signals' && (
            <div className="profile-dimension-field profile-dimension-field--signals">
              <div className="profile-dimension-header">
                <span className="profile-dimension-framework">Career Signals</span>
                <span className="profile-dimension-note">Evidence-oriented professional capabilities</span>
              </div>
              <div className="profile-signals-list">
                {demo.signals.map(([label, score, reading]) => (
                  <article key={label} className="profile-signal-row profile-lens-item">
                    <div className="profile-signal-row__head">
                      <span className="profile-signal-label">{label}</span>
                      <span className="profile-signal-value">{score}%</span>
                    </div>
                    <p className="profile-signal-reading">{reading}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="profile-scene__illustrative-note">
          Illustrative example demonstrating profile dimension structure. Not population statistics or personal diagnosis.
        </p>
      </div>
    </section>
  );
}

function EvidenceConfidenceScene() {
  return (
    <section className="evidence-confidence-scene" data-header-scene="light" aria-labelledby="evidence-confidence-title">
      <div className="evidence-confidence-scene__inner">
        <header className="evidence-confidence-scene__header">
          <h2 id="evidence-confidence-title" className="evidence-confidence-scene__title">
            See what shaped the interpretation.
          </h2>
          <p className="evidence-confidence-scene__copy">
            Strong evidence, mixed evidence and missing evidence should look different. Confidence is context—not a truth
            score.
          </p>
        </header>

        {/* ONE Open Inspection Field with Three Spatial ZONES (No Three Cards) */}
        <div className="evidence-inspection-field">
          <div className="evidence-spatial-zone evidence-spatial-zone--supporting">
            <div className="evidence-zone-header">
              <span className="evidence-zone-mark evidence-zone-mark--strong" aria-hidden="true" />
              <h3 className="evidence-zone-name">Supporting evidence</h3>
            </div>
            <p className="evidence-zone-status">Strong Signal</p>
            <p className="evidence-zone-detail">
              Multiple consistent responses across system architecture, constraint analysis, and project decomposition.
            </p>
          </div>

          <div className="evidence-spatial-zone evidence-spatial-zone--interpretation">
            <div className="evidence-zone-header">
              <span className="evidence-zone-mark evidence-zone-mark--context" aria-hidden="true" />
              <h3 className="evidence-zone-name">Interpretation</h3>
            </div>
            <p className="evidence-zone-status">Mixed context</p>
            <p className="evidence-zone-detail">
              Balanced signals between independent execution and formal consensus-driven coordination.
            </p>
          </div>

          <div className="evidence-spatial-zone evidence-spatial-zone--limited">
            <div className="evidence-zone-header">
              <span className="evidence-zone-mark evidence-zone-mark--limited" aria-hidden="true" />
              <h3 className="evidence-zone-name">Limited / missing context</h3>
            </div>
            <p className="evidence-zone-status">Limited context</p>
            <p className="evidence-zone-detail">
              Limited data on high-pressure real-time commercial crisis management.
            </p>
          </div>
        </div>

        {/* Plain nearby sentence without badges or fake metrics */}
        <p className="evidence-confidence-disclaimer">
          Illustrative example of how evidence states can be presented.
        </p>
      </div>
    </section>
  );
}

function CareerScene() {
  const careers = publicMedia.careers;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeRole = careers[selectedIndex] || careers[0];

  return (
    <section className="career-scene" data-header-scene="light" aria-labelledby="career-heading">
      <div className="career-scene__inner">
        <header className="career-scene__header">
          <h2 id="career-heading" className="career-scene__title">
            Direction needs reasons.
          </h2>
          <p className="career-scene__copy">
            A fit score becomes useful when you can see what supports it, where the stretch is, and what you could build
            next.
          </p>
        </header>

        <div className="career-scene__stage">
          <div className="career-scene__list" role="tablist" aria-label="Career roles">
            {careers.map((career, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={career.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`career-role-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <span className="career-role-item__title">{career.title}</span>
                  <span className="career-role-item__match">{career.match}% fit</span>
                </button>
              );
            })}
          </div>

          <article className="career-scene__detail">
            <figure className="career-scene__media">
              <ResponsiveImage
                media={activeRole.media}
                alt={activeRole.media.alt}
                sizes="(min-width: 1024px) 46vw, 90vw"
              />
            </figure>

            <div className="career-scene__reasons">
              <div className="career-reason-block">
                <span className="career-reason-label">Why it relates</span>
                <p>{activeRole.why}</p>
              </div>

              <div className="career-reason-block">
                <span className="career-reason-label">Where it stretches</span>
                <p>{activeRole.stretch}</p>
              </div>

              <div className="career-reason-block">
                <span className="career-reason-label">What could strengthen the fit</span>
                <p>{activeRole.strengthen}</p>
              </div>

              <div className="career-supporting-score">
                <span>Calculated Fit Index:</span>
                <strong>{activeRole.match}%</strong>
                <small>(Supporting metric, not a fixed verdict)</small>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function DevelopmentLoopScene() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const devSceneRef = useRef(null);
  const { reducedMotion } = usePublicMotion();

  const loopSteps = [
    {
      name: 'Notice a gap',
      detail: 'Identify the gap between your current evidence and target environment requirements.',
    },
    {
      name: 'Do deliberate work',
      detail: 'Undertake real projects that exercise unproven skill dimensions under realistic constraints.',
    },
    {
      name: 'Make the work visible',
      detail: 'Produce tangible artifacts—documentation, code repositories, prototypes, and case reviews.',
    },
    {
      name: 'Bring evidence back',
      detail: 'Update your profile context with completed work to evolve future interpretation.',
    },
  ];

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        ScrollTrigger.create({
          trigger: devSceneRef.current,
          start: 'top 50%',
          end: 'bottom 70%',
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.min(loopSteps.length - 1, Math.floor(self.progress * loopSteps.length));
            setActiveStepIndex(idx);
          },
        });
      });
    }, devSceneRef);
    return () => ctx.revert();
  }, [reducedMotion, loopSteps.length]);

  return (
    <section
      className="development-loop-scene"
      ref={devSceneRef}
      data-header-scene="light"
      aria-labelledby="development-heading"
    >
      <div className="development-loop-scene__inner">
        <header className="development-loop-scene__header">
          <h2 id="development-heading" className="development-loop-scene__title">
            Your next move becomes new evidence.
          </h2>
          <p className="development-loop-scene__copy">
            A roadmap is not a verdict. Do deliberate work, make the result visible, and future interpretation can begin
            with more context.
          </p>
        </header>

        {/* Single Transforming Stage (No Numbered Cards) */}
        <div className="development-transforming-stage">
          <div className="development-flow-track" role="tablist" aria-label="Development phases">
            {loopSteps.map((item, idx) => {
              const isCurrent = activeStepIndex === idx;
              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`development-flow-step ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  <span className="development-step-bullet" aria-hidden="true" />
                  <div className="development-step-body">
                    <h3 className="development-step-name">{item.name}</h3>
                    <p className="development-step-detail">{item.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dedicated Illustration Canvas Slot (Graceful fallback if illustration omitted) */}
          <div className="development-illustration-slot">
            <div className="development-canvas-content">
              <span className="development-canvas-stage-tag">{loopSteps[activeStepIndex]?.name}</span>
              <p className="development-canvas-stage-lead">
                {loopSteps[activeStepIndex]?.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustScene() {
  return (
    <section className="trust-reading-scene" data-header-scene="light" aria-labelledby="trust-scene-title">
      <div className="trust-reading-scene__inner">
        <h2 id="trust-scene-title" className="trust-reading-scene__title">
          Know what the system knows—and what it doesn&apos;t.
        </h2>
        <div className="trust-reading-scene__body">
          <p>
            Core scores and career-fit calculations come from structured logic. AI can help interpret professional
            context and support written explanations, but it doesn&apos;t replace those numbers. Results support
            reflection and career exploration—not diagnosis, hiring decisions or guaranteed outcomes.
          </p>
          <div className="trust-reading-scene__link-wrap">
            <Link className="public-text-action" to="/trust">
              Read our methodology and trust principles <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeNarrativeV3() {
  return (
    <div className="homepage-evidence-field">
      <HeroScene />
      <WorkWorldsScene />
      <ContextScene />
      <AdaptiveQuestionDemoScene />
      <ProfileScene />
      <EvidenceConfidenceScene />
      <CareerScene />
      <DevelopmentLoopScene />
      <TrustScene />
    </div>
  );
}
