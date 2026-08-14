import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from './publicContent';
import ProductIllustration from '../../ui/ProductIllustration';

gsap.registerPlugin(ScrollTrigger);

const profileLenses = [
  { key: 'personality', label: 'Personality' },
  { key: 'interests', label: 'Vocational Interests' },
  { key: 'values', label: 'Work Values' },
  { key: 'signals', label: 'Career Signals' },
];

/* ── 1. Hero: Evidence Constellation ───────────────────────────────────────── */
function HeroScene() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const mediaRef = useRef(null);
  const devFragmentRef = useRef(null);
  const supportingRef = useRef(null);
  const carryActorRef = useRef(null);
  const { reducedMotion } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl
        .fromTo(
          headlineRef.current?.querySelectorAll('.hero-line-reveal'),
          { y: '110%' },
          { y: '0%', duration: 0.75, stagger: 0.12 }
        )
        .fromTo(
          mediaRef.current?.querySelectorAll('.hero-spatial-plane'),
          { y: 30, opacity: 0.3 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          '-=0.4'
        );

      // 2. Desktop Hero -> Work Worlds Shared Actor Carry
      const media = gsap.matchMedia();
      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const carryActor = carryActorRef.current;
        const devFragment = devFragmentRef.current;
        const buildWorldPanel = document.querySelector('.work-world-panel[data-world-id="build"] .work-world-panel__media-wrap');

        if (carryActor && devFragment && buildWorldPanel) {
          ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
            onUpdate: (self) => {
              const p = self.progress;

              // Quiet hero regions as user scrolls
              if (supportingRef.current) {
                supportingRef.current.style.opacity = String(Math.max(0, 1 - p * 1.5));
                supportingRef.current.style.transform = `translateY(${-p * 40}px)`;
              }
              if (headlineRef.current) {
                headlineRef.current.style.opacity = String(Math.max(0, 1 - p * 1.2));
                headlineRef.current.style.transform = `translateY(${-p * 50}px)`;
              }

              // Carry developer actor toward Work Worlds Build panel
              if (p > 0.4) {
                const fragRect = devFragment.getBoundingClientRect();
                const targetRect = buildWorldPanel.getBoundingClientRect();
                const t = Math.min(1, (p - 0.4) / 0.6);

                carryActor.style.display = 'block';
                carryActor.style.opacity = String(Math.min(1, Math.sin(t * Math.PI * 0.9) * 1.2));

                const curX = fragRect.left + (targetRect.left - fragRect.left) * t;
                const curY = fragRect.top + (targetRect.top - fragRect.top) * t;
                const curW = fragRect.width + (targetRect.width - fragRect.width) * t;
                const curH = fragRect.height + (targetRect.height - fragRect.height) * t;

                carryActor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
                carryActor.style.width = `${curW}px`;
                carryActor.style.height = `${curH}px`;
              } else {
                carryActor.style.display = 'none';
                carryActor.style.opacity = '0';
              }
            },
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="evidence-hero-constellation" ref={heroRef} data-header-scene="light" aria-labelledby="hero-heading">
      {/* Shared Actor Carry Proxy */}
      <div
        ref={carryActorRef}
        className="hero-carry-actor-proxy"
        aria-hidden="true"
        style={{ display: 'none', position: 'fixed', top: 0, left: 0, zIndex: 95, pointerEvents: 'none' }}
      >
        <ResponsiveImage media={publicMedia.hero.developer} alt="" sizes="30vw" />
      </div>

      <div className="hero-constellation-stage">
        {/* Spatial Media Constellation Layer */}
        <div className="hero-constellation-media" ref={mediaRef}>
          {/* Dominant Plane: HERO-A (Architect Workspace Top View, ~58% mass, 16:10) */}
          <figure className="hero-spatial-plane hero-spatial-plane--dominant">
            <ResponsiveImage
              media={publicMedia.hero.dominant}
              alt="Architectural workspace top view with active project blueprints and planning tools"
              priority
              artDirectedMobile
              sizes="(min-width: 1200px) 58vw, 92vw"
            />
          </figure>

          {/* Tall Supporting Plane: HERO-B (Evidence Wall, 2:3 ratio) */}
          <figure className="hero-spatial-plane hero-spatial-plane--wall">
            <ResponsiveImage
              media={publicMedia.hero.evidenceWall}
              alt="Blueprints and drawings pinned to architectural evidence wall"
              sizes="(min-width: 1200px) 22vw, 44vw"
            />
            <figcaption className="hero-plane-label">Evidence Wall</figcaption>
          </figure>

          {/* Developer Fragment Plane (Carried Actor to Build) */}
          <figure className="hero-spatial-plane hero-spatial-plane--developer" ref={devFragmentRef}>
            <ResponsiveImage
              media={publicMedia.hero.developer}
              alt="Software engineer analyzing systems architecture on workstation"
              sizes="(min-width: 1200px) 20vw, 40vw"
            />
            <figcaption className="hero-plane-label">Systems &amp; Code</figcaption>
          </figure>

          {/* Scientist Fragment Plane (Research detail, 4:5) */}
          <figure className="hero-spatial-plane hero-spatial-plane--scientist">
            <ResponsiveImage
              media={publicMedia.hero.scientist}
              alt="Researcher conducting laboratory analysis"
              sizes="(min-width: 1200px) 18vw, 36vw"
            />
            <figcaption className="hero-plane-label">Inquiry</figcaption>
          </figure>

          {/* Student / Graduate Fragment Plane (Square) */}
          <figure className="hero-spatial-plane hero-spatial-plane--student">
            <ResponsiveImage
              media={publicMedia.hero.student}
              alt="Professional reviewing career documentation on laptop"
              sizes="(min-width: 1200px) 16vw, 32vw"
            />
            <figcaption className="hero-plane-label">Context</figcaption>
          </figure>
        </div>

        {/* Spatial Typographic & Action Overlay */}
        <div className="hero-constellation-overlay">
          <div className="hero-constellation-lead">
            <h1 id="hero-heading" className="hero-constellation-title" ref={headlineRef}>
              <span className="hero-line-mask">
                <span className="hero-line-reveal">Your work</span>
              </span>
              <span className="hero-line-mask">
                <span className="hero-line-reveal">leaves evidence.</span>
              </span>
            </h1>

            <div className="hero-constellation-prose" ref={supportingRef}>
              <p className="hero-constellation-desc">
                Personality Assessor brings professional context and adaptive responses together into a profile you can
                inspect—personality, interests, work values, career signals, and the evidence behind them.
              </p>

              <div className="hero-constellation-actions">
                <Link className="public-cta-button public-cta-button--signal" to="/signup">
                  Build my profile <Arrow />
                </Link>
                <Link className="public-text-action" to="/how-it-works">
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Hero Bounded Media Rail (Touch-native peek rail) */}
        <div className="hero-mobile-media-rail" role="region" aria-label="Professional context previews">
          <div className="hero-mobile-rail-card hero-mobile-rail-card--primary">
            <ResponsiveImage media={publicMedia.hero.dominant} alt="Architectural design project" artDirectedMobile />
          </div>
          <div className="hero-mobile-rail-card">
            <ResponsiveImage media={publicMedia.hero.developer} alt="Developer writing software" />
          </div>
          <div className="hero-mobile-rail-card">
            <ResponsiveImage media={publicMedia.hero.scientist} alt="Scientist in laboratory" />
          </div>
          <div className="hero-mobile-rail-card">
            <ResponsiveImage media={publicMedia.hero.student} alt="Professional reviewing documents" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Pinned State Theatre 1: Work Worlds ────────────────────────────────── */
function WorkWorldsScene() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion, scrollTo } = usePublicMotion();
  const worlds = publicMedia.worlds;

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const panels = gsap.utils.toArray('.work-world-panel');
        const count = panels.length;
        if (!count) return;

        const totalScrollDistance = window.innerHeight * 4.2;

        const scrollTween = gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth + 120),
          ease: 'none',
          scrollTrigger: {
            id: 'work-worlds-theatre',
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScrollDistance}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
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

    return () => ctx.revert();
  }, [reducedMotion, worlds.length]);

  const scrollToWorld = (targetIndex) => {
    const clamped = Math.max(0, Math.min(worlds.length - 1, targetIndex));
    setActiveIndex(clamped);

    const trigger = ScrollTrigger.getById('work-worlds-theatre');
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
        <div>
          <h2 id="work-worlds-title" className="work-worlds-scene__heading">
            Work Worlds
          </h2>
          <p className="work-worlds-scene__subheading">
            Six distinct operating territories where decisions and trade-offs emerge.
          </p>
        </div>

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
            {activeIndex + 1} of {worlds.length} · {worlds[activeIndex]?.name}
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

      {/* Desktop Horizontal Authored Progression Track */}
      <div className="work-worlds-scene__track-wrapper">
        <div className="work-worlds-scene__track" ref={trackRef}>
          {worlds.map((world, index) => {
            const isDominant = activeIndex === index;
            const isPrev = activeIndex > index;
            const isNext = activeIndex < index;
            return (
              <article
                key={world.id}
                className={`work-world-panel ${isDominant ? 'is-dominant' : ''} ${isPrev ? 'is-sliver-prev' : ''} ${isNext ? 'is-preview-next' : ''}`}
                data-world-id={world.id}
                aria-current={isDominant ? 'step' : undefined}
                onClick={() => scrollToWorld(index)}
              >
                <div className="work-world-panel__media-wrap">
                  <ResponsiveImage
                    media={world.media}
                    alt={world.media.alt}
                    sizes="(min-width: 1024px) 56vw, 88vw"
                  />
                </div>
                <div className="work-world-panel__content">
                  <span className="work-world-panel__tag">World 0{index + 1}</span>
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

/* ── 3. Pinned State Theatre 2: Context → Question → Evidence ──────────────── */
function ContextQuestionEvidenceTheatre() {
  const theatreRef = useRef(null);
  const [theatreState, setTheatreState] = useState('context'); // 'context' | 'parsed' | 'question' | 'response' | 'compress'
  const [selectedResponse, setSelectedResponse] = useState('clarify');
  const [userInteracted, setUserInteracted] = useState(false);
  const { reducedMotion } = usePublicMotion();

  const parsedEvidence = [
    { type: 'Project', title: 'Real-time Analytics Migration', detail: 'Decomposed latency constraints into streaming stages.' },
    { type: 'Experience', title: 'Systems Infrastructure Lead', detail: 'Led platform reliability under continuous load.' },
    { type: 'Skill', title: 'Distributed Systems & Observability', detail: 'Formalized operational metrics and failure isolation.' },
    { type: 'Education', title: 'Computer Systems & HCI', detail: 'Structured analysis of computational complexity.' },
    { type: 'Interest', title: 'Toolsmithing & Precision Craft', detail: 'Building internal tools to expose invisible friction.' },
  ];

  const responses = [
    {
      id: 'clarify',
      text: 'Clarify what changed, then test a revised path.',
      signal: 'Iterative discovery and rapid constraint testing under uncertainty.',
    },
    {
      id: 'gather',
      text: 'Gather input before choosing the next move.',
      signal: 'Cross-functional alignment and consultative validation.',
    },
    {
      id: 'recheck',
      text: 'Recheck the original assumptions before changing course.',
      signal: 'Foundational verification and root-cause inquiry.',
    },
  ];

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const totalDistance = window.innerHeight * 3.6;

        ScrollTrigger.create({
          id: 'context-question-theatre',
          trigger: theatreRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            // State timeline:
            // 0.00 - 0.20: State A (CV baseline)
            // 0.20 - 0.45: State B (Parsed evidence annotations emerge)
            // 0.45 - 0.70: State C & D (Adaptive question emerges from anchor evidence)
            // 0.70 - 0.90: State E (Response selected, signal emerges)
            // 0.90 - 1.00: State F (Compacting into intake marker for Living Profile)
            if (p < 0.22) {
              setTheatreState('context');
            } else if (p < 0.48) {
              setTheatreState('parsed');
            } else if (p < 0.72) {
              setTheatreState('question');
            } else if (p < 0.90) {
              setTheatreState('response');
              if (!userInteracted) setSelectedResponse('clarify');
            } else {
              setTheatreState('compress');
            }
          },
        });
      });

      return () => media.revert();
    }, theatreRef);

    return () => ctx.revert();
  }, [reducedMotion, userInteracted]);

  const handleSelect = (id) => {
    setUserInteracted(true);
    setSelectedResponse(id);
  };

  const activeFeedback = responses.find((r) => r.id === selectedResponse)?.signal;

  return (
    <section
      className="context-question-theatre"
      ref={theatreRef}
      data-header-scene="light"
      aria-labelledby="theatre-heading"
    >
      <div className="theatre-stage-inner">
        <header className="theatre-stage-header">
          <span className="theatre-stage-tag">Adaptive Stage</span>
          <h2 id="theatre-heading" className="theatre-stage-title">
            {theatreState === 'context' && 'Context gives the engine a baseline.'}
            {theatreState === 'parsed' && 'Evidence parsed into operational signals.'}
            {(theatreState === 'question' || theatreState === 'response') && 'Context changes the question.'}
            {theatreState === 'compress' && 'Evidence synthesized into living profile.'}
          </h2>
          <p className="theatre-stage-lead">
            {theatreState === 'context' || theatreState === 'parsed'
              ? 'A CV or manual profile provides operational scope, project complexity, and engineering context.'
              : 'Adaptive prompts target genuine problem-solving tensions rather than generic Likert statements.'}
          </p>
        </header>

        {/* Central Authored Theatre Plane */}
        <div className={`theatre-stage-arena theatre-stage-arena--${theatreState}`}>
          {/* State A & B: Document Artifact + Open Spatial Annotations */}
          <div className="theatre-document-sheet">
            <div className="theatre-doc-header">
              <span className="theatre-doc-badge">Parsed Context Baseline</span>
              <span className="theatre-doc-status">5 Evidence Entities</span>
            </div>
            <p className="theatre-doc-summary">
              Verified background parameters seed domain calibrations and operational trade-offs.
            </p>

            <div className="theatre-annotation-grid">
              {parsedEvidence.map((item, idx) => {
                const isAnchor = item.type === 'Project';
                return (
                  <div
                    key={item.type}
                    className={`theatre-annotation-pill ${isAnchor ? 'is-anchor' : ''} ${
                      theatreState !== 'context' && theatreState !== 'parsed' && !isAnchor ? 'is-quiet' : ''
                    }`}
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <span className="theatre-pill-type">{item.type}</span>
                    <strong className="theatre-pill-title">{item.title}</strong>
                    <span className="theatre-pill-detail">{item.detail}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* State C, D, E: Adaptive Question Overlay Stage */}
          <div className="theatre-question-plane">
            <div className="theatre-anchor-tag">
              <span>Originating Evidence:</span>
              <strong>Real-time Analytics Migration · Decomposed latency constraints</strong>
            </div>

            <p className="theatre-question-prompt">
              When a project changes direction after you&apos;ve already started, what do you usually do first?
            </p>

            <div className="theatre-question-options" role="radiogroup" aria-label="Adaptive question options">
              {responses.map((resp) => {
                const isSelected = selectedResponse === resp.id;
                return (
                  <button
                    key={resp.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`theatre-option-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(resp.id)}
                  >
                    <span className="theatre-option-marker" aria-hidden="true" />
                    <span className="theatre-option-text">{resp.text}</span>
                  </button>
                );
              })}
            </div>

            {selectedResponse && (
              <div className="theatre-observed-signal" role="status">
                <span className="theatre-signal-label">Observed Strategy Signal:</span>
                <p className="theatre-signal-text">{activeFeedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Pinned State Theatre 3: Living Profile ──────────────────────────────── */
function LivingProfileScene() {
  const profileRef = useRef(null);
  const [activeLens, setActiveLens] = useState('personality');
  const { reducedMotion } = usePublicMotion();
  const demo = marketingDemo.profile;

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const lensKeys = ['personality', 'interests', 'values', 'signals'];
        const totalDistance = window.innerHeight * 3.4;

        ScrollTrigger.create({
          id: 'living-profile-theatre',
          trigger: profileRef.current,
          start: 'top top',
          end: `+=${totalDistance}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const stepIndex = Math.min(lensKeys.length - 1, Math.floor(self.progress * lensKeys.length));
            const nextKey = lensKeys[stepIndex];
            setActiveLens((prev) => (prev !== nextKey ? nextKey : prev));
          },
        });
      });

      return () => media.revert();
    }, profileRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      className="living-profile-theatre"
      ref={profileRef}
      data-header-scene="light"
      aria-labelledby="living-profile-heading"
    >
      <div className="living-profile-inner">
        {/* Incoming Protagonist Evidence Intake Marker */}
        <div className="profile-incoming-signal-banner">
          <span className="incoming-signal-bullet" aria-hidden="true" />
          <span className="incoming-signal-title">Calibrated Strategy Intake:</span>
          <span className="incoming-signal-body">Iterative discovery &amp; rapid constraint testing</span>
        </div>

        <header className="living-profile-header">
          <h2 id="living-profile-heading" className="living-profile-title">
            One profile. Four distinct readings.
          </h2>
          <p className="living-profile-desc">
            Personality, vocational interests, work values and career signals stay independent so one score never has to
            explain everything.
          </p>
        </header>

        {/* Accessible Lens Switcher Controls */}
        <div className="living-profile-controls" role="tablist" aria-label="Living profile lenses">
          {profileLenses.map((lens) => (
            <button
              key={lens.key}
              type="button"
              role="tab"
              aria-selected={activeLens === lens.key}
              className={`living-lens-tab ${activeLens === lens.key ? 'is-active' : ''}`}
              onClick={() => setActiveLens(lens.key)}
            >
              {lens.label}
            </button>
          ))}
        </div>

        {/* 4 Visually Different Representations */}
        <div className="living-profile-stage">
          {/* Representation 1: Personality Continuous Lollipop Bars (0-100 scale, neutral) */}
          {activeLens === 'personality' && (
            <div className="profile-repr-personality" role="tabpanel" aria-label="Big Five continuous spectrums">
              <div className="repr-meta-head">
                <span className="repr-meta-name">Big Five Continuous Dimensions</span>
                <span className="repr-meta-scale">0–100 Continuous Calibration</span>
              </div>
              <div className="lollipop-measures-list">
                {demo.bigFive.map(([name, score, reading]) => (
                  <div key={name} className="lollipop-row">
                    <div className="lollipop-label-group">
                      <span className="lollipop-name">{name}</span>
                      <strong className="lollipop-value tabular-nums">{score}%</strong>
                    </div>
                    <div className="lollipop-track">
                      <div className="lollipop-bar-fill" style={{ width: `${score}%` }} />
                      <div className="lollipop-dot" style={{ left: `${score}%` }} />
                    </div>
                    <p className="lollipop-reading">{reading}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Representation 2: RIASEC Relational / Radial Pattern & Ranked Grid */}
          {activeLens === 'interests' && (
            <div className="profile-repr-riasec" role="tabpanel" aria-label="RIASEC vocational interests">
              <div className="repr-meta-head">
                <span className="repr-meta-name">RIASEC Vocational Territories</span>
                <span className="repr-meta-scale">Relational Spatial Pattern</span>
              </div>
              <div className="riasec-relational-grid">
                {demo.riasec.map(([theme, score, desc]) => (
                  <article key={theme} className="riasec-interest-plane">
                    <div className="riasec-plane-head">
                      <span className="riasec-plane-theme">{theme}</span>
                      <strong className="riasec-plane-score tabular-nums">{score}%</strong>
                    </div>
                    <div className="riasec-plane-bar">
                      <div className="riasec-plane-fill" style={{ width: `${score}%` }} />
                    </div>
                    <p className="riasec-plane-desc">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Representation 3: Work Values Ranked Hierarchy (All 12 values) */}
          {activeLens === 'values' && (
            <div className="profile-repr-values" role="tabpanel" aria-label="Work values priority hierarchy">
              <div className="repr-meta-head">
                <span className="repr-meta-name">Work Values Priority Hierarchy</span>
                <span className="repr-meta-scale">Ranked Top-to-Bottom</span>
              </div>
              <div className="values-ranked-flow">
                {demo.values.map(([valName, score, reading], idx) => (
                  <div key={valName} className={`value-rank-row ${idx < 3 ? 'is-top-tier' : ''}`}>
                    <span className="value-rank-num">#{idx + 1}</span>
                    <div className="value-rank-body">
                      <div className="value-rank-head">
                        <strong className="value-rank-name">{valName}</strong>
                        <span className="value-rank-pct tabular-nums">{score}%</span>
                      </div>
                      <p className="value-rank-reading">{reading}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Representation 4: Career Signals Capability & Evidence Field */}
          {activeLens === 'signals' && (
            <div className="profile-repr-signals" role="tabpanel" aria-label="Demonstrated career signals">
              <div className="repr-meta-head">
                <span className="repr-meta-name">Demonstrated Career Signals</span>
                <span className="repr-meta-scale">Operational Competencies</span>
              </div>
              <div className="signals-evidence-field">
                {demo.signals.map(([signalName, score, reading]) => (
                  <article key={signalName} className="signal-evidence-plane">
                    <div className="signal-plane-top">
                      <span className="signal-plane-title">{signalName}</span>
                      <strong className="signal-plane-score tabular-nums">{score}%</strong>
                    </div>
                    <p className="signal-plane-reading">{reading}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="living-profile-disclaimer">
          Illustrative example demonstrating profile dimension structure. Not population statistics or personal diagnosis.
        </p>
      </div>
    </section>
  );
}

/* ── 5. Evidence & Confidence: Open Field (No 3-card row) ──────────────────── */
function EvidenceConfidenceScene() {
  return (
    <section className="evidence-confidence-field-scene" data-header-scene="light" aria-labelledby="evidence-field-title">
      <div className="evidence-field-inner">
        <header className="evidence-field-header">
          <h2 id="evidence-field-title" className="evidence-field-title">
            See what shaped the interpretation.
          </h2>
          <p className="evidence-field-lead">
            Strong evidence, mixed evidence and missing evidence should look different. Confidence is context—not a truth
            score.
          </p>
        </header>

        {/* Open Spatial Inspection Field (Unequal densities, no 3-card box) */}
        <div className="evidence-open-inspection-field">
          <div className="evidence-zone evidence-zone--supporting">
            <div className="evidence-zone__top">
              <span className="evidence-zone__symbol evidence-zone__symbol--strong" aria-hidden="true" />
              <h3 className="evidence-zone__heading">Supporting evidence</h3>
            </div>
            <strong className="evidence-zone__status">Strong Signal</strong>
            <p className="evidence-zone__body">
              Multiple consistent responses across system architecture, constraint analysis, and project decomposition.
            </p>
          </div>

          <div className="evidence-zone evidence-zone--interpretation">
            <div className="evidence-zone__top">
              <span className="evidence-zone__symbol evidence-zone__symbol--mixed" aria-hidden="true" />
              <h3 className="evidence-zone__heading">Interpretation</h3>
            </div>
            <strong className="evidence-zone__status">Mixed context</strong>
            <p className="evidence-zone__body">
              Balanced signals between independent execution and formal consensus-driven coordination.
            </p>
          </div>

          <div className="evidence-zone evidence-zone--limited">
            <div className="evidence-zone__top">
              <span className="evidence-zone__symbol evidence-zone__symbol--limited" aria-hidden="true" />
              <h3 className="evidence-zone__heading">Limited / missing context</h3>
            </div>
            <strong className="evidence-zone__status">Limited context</strong>
            <p className="evidence-zone__body">
              Limited data on high-pressure real-time commercial crisis management.
            </p>
          </div>
        </div>

        <p className="evidence-field-note">
          Illustrative example of how evidence states can be presented.
        </p>
      </div>
    </section>
  );
}

/* ── 6. Career Relationships: Master-Detail Return to Media ───────────────── */
function CareerRelationshipsScene() {
  const careers = publicMedia.careers;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeRole = careers[selectedIndex] || careers[0];

  return (
    <section className="career-relationships-scene" data-header-scene="light" aria-labelledby="career-rel-title">
      <div className="career-relationships-inner">
        <header className="career-relationships-header">
          <h2 id="career-rel-title" className="career-relationships-title">
            Direction needs reasons.
          </h2>
          <p className="career-relationships-lead">
            A fit score becomes useful when you can see what supports it, where the stretch is, and what you could build
            next.
          </p>
        </header>

        {/* Asymmetric Master-Detail Composition */}
        <div className="career-relationships-master-detail">
          <nav className="career-role-nav" role="tablist" aria-label="Career roles selector">
            {careers.map((career, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={career.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`career-role-selector-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <span className="career-role-name">{career.title}</span>
                  <strong className="career-role-fit tabular-nums">{career.match}% fit</strong>
                </button>
              );
            })}
          </nav>

          <article className="career-role-environment-stage">
            <figure className="career-environment-photo">
              <ResponsiveImage
                media={activeRole.media}
                alt={activeRole.media.alt}
                sizes="(min-width: 1024px) 50vw, 92vw"
              />
            </figure>

            <div className="career-embedded-reasoning">
              <div className="career-reasoning-item">
                <span className="career-reasoning-label">Why it relates</span>
                <p className="career-reasoning-text">{activeRole.why}</p>
              </div>

              <div className="career-reasoning-item">
                <span className="career-reasoning-label">Where the stretch is</span>
                <p className="career-reasoning-text">{activeRole.stretch}</p>
              </div>

              <div className="career-reasoning-item">
                <span className="career-reasoning-label">What could strengthen the fit</span>
                <p className="career-reasoning-text">{activeRole.strengthen}</p>
              </div>

              <div className="career-fit-context-box">
                <span>Calculated Fit Index:</span>
                <strong className="tabular-nums">{activeRole.match}%</strong>
                <small>(Supporting metric, not a fixed verdict)</small>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ── 7. Development: Editorial Character Illustration + Transformation Loop ─ */
function DevelopmentTransformationScene() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      name: 'Notice a gap',
      detail: 'Pinpoint specific competencies between your profile and target environments.',
    },
    {
      name: 'Do deliberate work',
      detail: 'Engage in targeted projects that exercise unproven skill dimensions under constraints.',
    },
    {
      name: 'Make the work visible',
      detail: 'Produce tangible deliverables—documentation, code repositories, prototypes, and benchmarks.',
    },
    {
      name: 'Bring evidence back',
      detail: 'Integrate verified project milestones back into your Personality Assessor profile.',
    },
  ];

  return (
    <section className="development-transformation-scene" data-header-scene="light" aria-labelledby="dev-trans-title">
      <div className="development-transformation-inner">
        <header className="development-transformation-header">
          <h2 id="dev-trans-title" className="development-transformation-title">
            Your next move becomes new evidence.
          </h2>
          <p className="development-transformation-lead">
            A career roadmap is an active developmental loop, not a static verdict. Deliver work, produce tangible artifacts,
            and future interpretation evolves with more context.
          </p>
        </header>

        {/* Editorial Illustration + Step Transition */}
        <div className="development-transformation-grid">
          <div className="development-loop-steps" role="tablist" aria-label="Development phases">
            {steps.map((st, i) => {
              const isCurrent = activeStep === i;
              return (
                <button
                  key={st.name}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`development-loop-step-btn ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="dev-step-indicator" aria-hidden="true" />
                  <div className="dev-step-content">
                    <h3 className="dev-step-name">{st.name}</h3>
                    <p className="dev-step-detail">{st.detail}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="development-editorial-canvas">
            <ProductIllustration
              slotKey="development"
              className="development-character-art"
              decorative
            />
            <div className="development-canvas-caption">
              <span className="canvas-caption-tag">{steps[activeStep]?.name}</span>
              <p className="canvas-caption-text">{steps[activeStep]?.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 8. Trust & Methodology Overview ───────────────────────────────────────── */
function TrustOverviewScene() {
  return (
    <section className="trust-overview-scene" data-header-scene="light" aria-labelledby="trust-overview-heading">
      <div className="trust-overview-inner">
        <h2 id="trust-overview-heading" className="trust-overview-title">
          Know what the system knows—and what it doesn&apos;t.
        </h2>
        <div className="trust-overview-body">
          <p>
            Core scores and career-fit calculations come from structured deterministic psychometric logic. AI assists in
            interpreting background context and drafting qualitative narrative summaries; it never overrides numerical
            calculations.
          </p>
          <div className="trust-overview-actions">
            <Link className="public-text-action" to="/trust">
              Read our methodology and trust principles <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Public Home Narrative Container ─────────────────────────────────── */
export default function HomeNarrativeV3() {
  return (
    <div className="public-evidence-narrative-container">
      <HeroScene />
      <WorkWorldsScene />
      <ContextQuestionEvidenceTheatre />
      <LivingProfileScene />
      <EvidenceConfidenceScene />
      <CareerRelationshipsScene />
      <DevelopmentTransformationScene />
      <TrustOverviewScene />
    </div>
  );
}
