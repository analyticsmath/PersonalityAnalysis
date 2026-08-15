import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, ResponsiveImage } from '../PublicChrome';
import { usePublicMotion } from '../PublicMotionRoot';
import { marketingDemo, publicMedia } from '../../../content/personalityMarketingDemo';
import ProductIllustration from '../../ui/ProductIllustration';

gsap.registerPlugin(ScrollTrigger);

const profileLenses = [
  { key: 'personality', label: 'Personality' },
  { key: 'interests', label: 'Vocational Interests' },
  { key: 'values', label: 'Work Values' },
  { key: 'signals', label: 'Career Signals' },
];

/* ── 1. Hero: Opening Evidence Field (2 Actors, Bounded Geometry) ──────────── */
function HeroScene() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const { reducedMotion } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current?.querySelectorAll('.hero-line-reveal'),
        { y: '105%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-actor-plane',
        { y: 24, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="evidence-hero-field" ref={heroRef} data-header-scene="light" aria-labelledby="hero-heading">
      <div className="hero-field-stage">
        {/* Typographic & Action Region (~40% desktop width) */}
        <div className="hero-lead-region">
          <h1 id="hero-heading" className="hero-title" ref={headlineRef}>
            <span className="hero-line-mask">
              <span className="hero-line-reveal">Your work</span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line-reveal">leaves evidence.</span>
            </span>
          </h1>

          <p className="hero-supporting-text">
            Professional context and adaptive responses become independent readings across personality, vocational
            interests, work values and career signals.
          </p>

          <div className="hero-action-group">
            <Link className="public-cta-button public-cta-button--primary" to="/signup">
              Build my profile <Arrow />
            </Link>
            <Link className="public-text-action" to="/how-it-works">
              See how it works
            </Link>
          </div>
        </div>

        {/* Bounded Dual-Axis Media Region (Dominant + Subordinate) */}
        <div className="hero-media-composition" aria-hidden="true">
          {/* Dominant Protagonist (Architect top view ~52-56vw, max 56svh) */}
          <figure className="hero-actor-plane hero-actor-plane--dominant">
            <ResponsiveImage
              media={publicMedia.hero.dominant}
              alt="Architectural workspace top view with active project blueprints and drafting tools"
              priority
              artDirectedMobile
              sizes="(min-width: 1200px) 54vw, (min-width: 768px) 88vw, 92vw"
            />
          </figure>

          {/* Subordinate Human Context (~16-18vw) */}
          <figure className="hero-actor-plane hero-actor-plane--supporting">
            <ResponsiveImage
              media={publicMedia.hero.supporting}
              alt="Professional reviewing technical documentation on a laptop"
              sizes="(min-width: 1200px) 18vw, 36vw"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Work Worlds Theatre: Exactly 6 Worlds (No Decorative Number Tags) ── */
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
        const panels = gsap.utils.toArray('.work-world-theatre-card');
        const count = panels.length;
        if (!count) return;

        const totalScrollDistance = window.innerHeight * 3.8;

        const scrollTween = gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth + 96),
          ease: 'none',
          scrollTrigger: {
            id: 'work-worlds-theatre',
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalScrollDistance}`,
            pin: true,
            scrub: 0.65,
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
      className="work-worlds-theatre-scene"
      ref={containerRef}
      data-header-scene="dark"
      aria-labelledby="work-worlds-title"
    >
      <div className="work-worlds-theatre-header">
        <div className="work-worlds-theatre-lead">
          <h2 id="work-worlds-title" className="work-worlds-theatre-heading">
            Different work. Same signal.
          </h2>
          <p className="work-worlds-theatre-subheading">
            Every professional environment generates evidence in different ways; the product learns from how you respond
            to constraints, uncertainty, making, shaping, structure and collaboration.
          </p>
        </div>

        <div className="work-worlds-theatre-nav" role="toolbar" aria-label="Work worlds navigation">
          <button
            type="button"
            className="work-worlds-nav-btn"
            onClick={() => scrollToWorld(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous work world"
          >
            Previous
          </button>
          <span className="work-worlds-nav-status" aria-live="polite">
            {worlds[activeIndex]?.name} ({activeIndex + 1} of {worlds.length})
          </span>
          <button
            type="button"
            className="work-worlds-nav-btn"
            onClick={() => scrollToWorld(activeIndex + 1)}
            disabled={activeIndex === worlds.length - 1}
            aria-label="Next work world"
          >
            Next
          </button>
        </div>
      </div>

      {/* Desktop Horizontal Pinned Track & Mobile Scroll-Snap Container */}
      <div className="work-worlds-track-wrapper">
        <div className="work-worlds-theatre-track" ref={trackRef}>
          {worlds.map((world, index) => {
            const isDominant = activeIndex === index;
            return (
              <article
                key={world.id}
                className={`work-world-theatre-card ${isDominant ? 'is-active' : ''}`}
                data-world-id={world.id}
                aria-current={isDominant ? 'step' : undefined}
                onClick={() => scrollToWorld(index)}
              >
                <div className="work-world-media-frame">
                  <ResponsiveImage
                    media={world.media}
                    alt={world.media.alt}
                    sizes="(min-width: 1024px) 54vw, 84vw"
                  />
                </div>
                <div className="work-world-copy-region">
                  <h3 className="work-world-name">{world.name}</h3>
                  <p className="work-world-desc">{world.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 3. Quiet Evidence Bridge: Minimal Decompression ───────────────────────── */
function EvidenceBridgeScene() {
  return (
    <section className="evidence-bridge-scene" data-header-scene="light" aria-label="Context decompression">
      <div className="evidence-bridge-inner">
        <span className="evidence-bridge-bullet" aria-hidden="true" />
        <p className="evidence-bridge-text">
          Background context and scenario trade-offs provide concrete calibration points before psychological scoring begins.
        </p>
      </div>
    </section>
  );
}

/* ── 4. Context → Question → Signal: Persistent Visual Actors ──────────────── */
function ContextQuestionSignalScene() {
  const stageRef = useRef(null);
  const [selectedResponse, setSelectedResponse] = useState('clarify');
  const [activeSignal, setActiveSignal] = useState(
    'Iterative discovery and rapid constraint testing under shifting requirements.'
  );
  const { reducedMotion } = usePublicMotion();

  const parsedItems = [
    { label: 'Project Context', text: 'Real-time telemetry migration under streaming constraints' },
    { label: 'Domain Scope', text: 'Distributed reliability engineering & latency boundaries' },
    { label: 'Observed Method', text: 'Systematic root-cause isolation and automated validation' },
  ];

  const responses = [
    {
      id: 'clarify',
      text: 'Clarify what changed, then test a revised path with minimal dependencies.',
      signal: 'Iterative discovery and rapid constraint testing under shifting requirements.',
    },
    {
      id: 'gather',
      text: 'Gather input from cross-functional peers before choosing the next move.',
      signal: 'Consultative validation, alignment, and consensus-driven decision making.',
    },
    {
      id: 'recheck',
      text: 'Recheck the original specifications and assumptions before changing course.',
      signal: 'Foundational verification, deep technical inquiry, and root-cause defense.',
    },
  ];

  const handleSelect = (item) => {
    setSelectedResponse(item.id);
    setActiveSignal(item.signal);
  };

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        ScrollTrigger.create({
          id: 'context-question-pinned',
          trigger: stageRef.current,
          start: 'top top',
          end: '+=2800',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });

      return () => media.revert();
    }, stageRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      className="context-question-signal-scene"
      ref={stageRef}
      data-header-scene="light"
      aria-labelledby="cqs-heading"
    >
      <div className="cqs-stage-inner">
        <header className="cqs-header">
          <h2 id="cqs-heading" className="cqs-title">
            Context changes the question.
          </h2>
          <p className="cqs-subtitle">
            A resume or manual background sets the baseline. Adaptive prompts target real problem-solving tensions rather
            than generic personality statements.
          </p>
        </header>

        {/* Persistent Central Artifact */}
        <div className="cqs-persistent-artifact">
          {/* Top: Parsed Context Baseline */}
          <div className="cqs-context-block">
            <span className="cqs-block-tag">Parsed Professional Baseline</span>
            <div className="cqs-items-row">
              {parsedItems.map((item) => (
                <div key={item.label} className="cqs-item-chip">
                  <strong className="cqs-chip-label">{item.label}</strong>
                  <span className="cqs-chip-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Adaptive Question emerging from anchor */}
          <div className="cqs-question-block">
            <div className="cqs-origin-anchor">
              <span>Anchor:</span> <em>Telemetry Migration · Constraint Testing</em>
            </div>
            <p className="cqs-question-text">
              When an engineering initiative changes direction midway through execution, what do you do first?
            </p>

            {/* Interactive Response Options (Clickable, not scroll-auto-selected) */}
            <div className="cqs-options-group" role="radiogroup" aria-label="Illustrative adaptive question options">
              {responses.map((resp) => {
                const isSelected = selectedResponse === resp.id;
                return (
                  <button
                    key={resp.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`cqs-option-button ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(resp)}
                  >
                    <span className="cqs-option-bullet" aria-hidden="true" />
                    <span className="cqs-option-text">{resp.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom: Resulting Calibrated Signal */}
          <div className="cqs-signal-handoff" role="status">
            <span className="cqs-signal-tag">Demonstrated Signal:</span>
            <p className="cqs-signal-value">{activeSignal}</p>
          </div>
        </div>

        <p className="cqs-disclaimer">
          Illustrative interactive demonstration. Real assessments calibrate questions to your specific verified domain.
        </p>
      </div>
    </section>
  );
}

/* ── 5. Living Multidimensional Profile: 4 Independent Lenses ─────────────── */
function LivingProfileScene() {
  const [activeLens, setActiveLens] = useState('personality');
  const demo = marketingDemo.profile;

  return (
    <section className="living-profile-scene" data-header-scene="light" aria-labelledby="profile-heading">
      <div className="living-profile-inner">
        <header className="living-profile-header">
          <h2 id="profile-heading" className="living-profile-title">
            One profile. Four distinct readings.
          </h2>
          <p className="living-profile-subtitle">
            Personality, vocational interests, work values and career signals stay independent so one score never has to
            explain everything.
          </p>
        </header>

        {/* Accessible Segmented Controls */}
        <div className="living-profile-tabs" role="tablist" aria-label="Profile lens selector">
          {profileLenses.map((lens) => (
            <button
              key={lens.key}
              type="button"
              role="tab"
              aria-selected={activeLens === lens.key}
              className={`living-lens-button ${activeLens === lens.key ? 'is-active' : ''}`}
              onClick={() => setActiveLens(lens.key)}
            >
              {lens.label}
            </button>
          ))}
        </div>

        {/* 4 Discrete Representation Fields */}
        <div className="living-profile-display-stage">
          {/* 1. Big Five: Horizontal Lollipop Measures (0–100) */}
          {activeLens === 'personality' && (
            <div className="profile-lens-panel" role="tabpanel" aria-label="Big Five continuous dimensions">
              <div className="lens-panel-head">
                <span className="lens-panel-title">Big Five Continuous Dimensions</span>
                <span className="lens-panel-meta">0–100 Continuous Calibration</span>
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

          {/* 2. RIASEC: Relational Grid + Exact Values */}
          {activeLens === 'interests' && (
            <div className="profile-lens-panel" role="tabpanel" aria-label="RIASEC vocational territories">
              <div className="lens-panel-head">
                <span className="lens-panel-title">RIASEC Vocational Territories</span>
                <span className="lens-panel-meta">Holland Relational Pattern</span>
              </div>
              <div className="riasec-grid-flow">
                {demo.riasec.map(([theme, score, desc]) => (
                  <article key={theme} className="riasec-card-plane">
                    <div className="riasec-card-top">
                      <span className="riasec-theme-name">{theme}</span>
                      <strong className="riasec-theme-score tabular-nums">{score}%</strong>
                    </div>
                    <div className="riasec-theme-track">
                      <div className="riasec-theme-fill" style={{ width: `${score}%` }} />
                    </div>
                    <p className="riasec-theme-desc">{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* 3. Work Values: Ordered Horizontal Hierarchy */}
          {activeLens === 'values' && (
            <div className="profile-lens-panel" role="tabpanel" aria-label="Work values priority ranking">
              <div className="lens-panel-head">
                <span className="lens-panel-title">Work Values Priority Hierarchy</span>
                <span className="lens-panel-meta">12 Motivational Dimensions Ranked</span>
              </div>
              <div className="values-ranked-list">
                {demo.values.map(([valName, score, reading], idx) => (
                  <div key={valName} className={`value-ranking-row ${idx < 3 ? 'is-top-tier' : ''}`}>
                    <span className="value-ranking-rank">#{idx + 1}</span>
                    <div className="value-ranking-content">
                      <div className="value-ranking-head">
                        <strong className="value-ranking-name">{valName}</strong>
                        <span className="value-ranking-val tabular-nums">{score}%</span>
                      </div>
                      <p className="value-ranking-reading">{reading}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Career Signals: Evidence-Linked Measures */}
          {activeLens === 'signals' && (
            <div className="profile-lens-panel" role="tabpanel" aria-label="Demonstrated career signals">
              <div className="lens-panel-head">
                <span className="lens-panel-title">Demonstrated Career Signals</span>
                <span className="lens-panel-meta">Operational Competencies</span>
              </div>
              <div className="signals-grid-flow">
                {demo.signals.map(([signalName, score, reading]) => (
                  <article key={signalName} className="signal-card-plane">
                    <div className="signal-card-head">
                      <span className="signal-card-title">{signalName}</span>
                      <strong className="signal-card-score tabular-nums">{score}%</strong>
                    </div>
                    <p className="signal-card-reading">{reading}</p>
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

/* ── 6. Evidence & Confidence: Open Analytical Field ───────────────────────── */
function EvidenceConfidenceScene() {
  return (
    <section className="evidence-inspection-scene" data-header-scene="light" aria-labelledby="evidence-heading">
      <div className="evidence-inspection-inner">
        <header className="evidence-inspection-header">
          <h2 id="evidence-heading" className="evidence-inspection-title">
            See what shaped the interpretation.
          </h2>
          <p className="evidence-inspection-subtitle">
            Strong evidence, mixed context and missing information should look visibly different. Confidence describes
            data completeness—not personal certainty or a truth claim.
          </p>
        </header>

        {/* Open Spatial Inspection Structure (No 3 colored cards) */}
        <div className="evidence-inspection-field">
          <div className="evidence-field-zone evidence-field-zone--strong">
            <span className="evidence-zone-meta">Available Support</span>
            <h3 className="evidence-zone-title">Multiple Consistent Observations</h3>
            <p className="evidence-zone-desc">
              Strong evidence across system architecture, constraint analysis, and project decomposition verified through
              repeated scenario trade-offs.
            </p>
          </div>

          <div className="evidence-field-zone evidence-field-zone--mixed">
            <span className="evidence-zone-meta">Interpreted Balance</span>
            <h3 className="evidence-zone-title">Divergent Context Signals</h3>
            <p className="evidence-zone-desc">
              Balanced signals between deep independent technical execution and formal consultative consensus.
            </p>
          </div>

          <div className="evidence-field-zone evidence-field-zone--sparse">
            <span className="evidence-zone-meta">Missing Context</span>
            <h3 className="evidence-zone-title">Limited Operational Data</h3>
            <p className="evidence-zone-desc">
              No historical data on high-pressure real-time commercial crisis triage. The profile surfaces this gap
              rather than assuming average values.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7. Career Relationships: Master-Detail Return to Media ────────────────── */
function CareerRelationshipsScene() {
  const careers = publicMedia.careers;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = careers[selectedIndex] || careers[0];

  return (
    <section className="career-relationships-scene" data-header-scene="light" aria-labelledby="career-heading">
      <div className="career-relationships-inner">
        <header className="career-relationships-header">
          <h2 id="career-heading" className="career-relationships-title">
            Direction needs reasons.
          </h2>
          <p className="career-relationships-subtitle">
            A fit score becomes useful when you can see why it aligns, where the stretch lies, and which capabilities
            would advance the match.
          </p>
        </header>

        {/* Master-Detail Editorial Architecture */}
        <div className="career-master-detail-composition">
          {/* Left: Role Navigation Index */}
          <nav className="career-role-index" role="tablist" aria-label="Career roles selector">
            {careers.map((career, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={career.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`career-role-row-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <span className="career-role-title">{career.title}</span>
                  <span className="career-role-hint">Inspect match</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Environment Photo + Deep Reasoning Hierarchy */}
          <article className="career-detail-stage">
            <figure className="career-detail-media">
              <ResponsiveImage
                media={current.media}
                alt={current.media.alt}
                sizes="(min-width: 1024px) 46vw, 92vw"
              />
            </figure>

            <div className="career-reasoning-tree">
              <div className="career-reasoning-item">
                <h3 className="career-reasoning-title">Why it relates</h3>
                <p className="career-reasoning-body">{current.why}</p>
              </div>

              <div className="career-reasoning-item">
                <h3 className="career-reasoning-title">Where the stretch is</h3>
                <p className="career-reasoning-body">{current.stretch}</p>
              </div>

              <div className="career-reasoning-item">
                <h3 className="career-reasoning-title">What could strengthen the fit</h3>
                <p className="career-reasoning-body">{current.strengthen}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ── 8. Development Loop: Continuous Developmental Cycle ───────────────────── */
function DevelopmentLoopScene() {
  const [activeStep, setActiveStep] = useState(0);

  const loopPhases = [
    { name: 'Gap Discovery', desc: 'Identify specific capabilities between your profile and target environments.' },
    { name: 'Deliberate Action', desc: 'Engage in targeted challenges that exercise unproven dimensions under constraints.' },
    { name: 'Visible Work', desc: 'Produce tangible deliverables—documentation, repositories, prototypes, and benchmarks.' },
    { name: 'Artifact Creation', desc: 'Structure project deliverables into clear, reviewable professional artifacts.' },
    { name: 'New Evidence', desc: 'Integrate verified project milestones back into your Personality Assessor profile.' },
    { name: 'Profile Return', desc: 'Re-evaluate dimensional interpretations with enriched context and updated alignment.' },
  ];

  return (
    <section className="development-loop-scene" data-header-scene="light" aria-labelledby="dev-heading">
      <div className="development-loop-inner">
        <header className="development-loop-header">
          <h2 id="dev-heading" className="development-loop-title">
            Your next move becomes new evidence.
          </h2>
          <p className="development-loop-subtitle">
            A career roadmap is an active developmental loop, not a static verdict. Deliver work, produce tangible artifacts,
            and future assessments evolve with more context.
          </p>
        </header>

        {/* Continuous Loop Architecture */}
        <div className="development-loop-grid">
          <div className="development-phase-list" role="tablist" aria-label="Development cycle phases">
            {loopPhases.map((phase, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={phase.name}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`development-phase-button ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(i)}
                >
                  <span className="dev-phase-bullet" aria-hidden="true" />
                  <div className="dev-phase-text">
                    <strong className="dev-phase-name">{phase.name}</strong>
                    <p className="dev-phase-desc">{phase.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="development-art-frame">
            <ProductIllustration slotKey="development" className="development-illustration" decorative />
            <div className="development-art-caption">
              <span className="dev-caption-name">{loopPhases[activeStep]?.name}</span>
              <p className="dev-caption-desc">{loopPhases[activeStep]?.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 9. Trust & Boundaries: Factual Summary ────────────────────────────────── */
function TrustBoundariesScene() {
  return (
    <section className="trust-boundaries-scene" data-header-scene="light" aria-labelledby="trust-heading">
      <div className="trust-boundaries-inner">
        <h2 id="trust-heading" className="trust-boundaries-title">
          Know what the system knows—and what it doesn&apos;t.
        </h2>
        <div className="trust-boundaries-content">
          <p>
            Core scores and career-fit calculations come from structured deterministic psychometric logic. AI assists in
            interpreting background context and drafting qualitative narrative summaries; it never overrides numerical
            calculations.
          </p>
          <div className="trust-boundaries-action">
            <Link className="public-text-action" to="/trust">
              Read our methodology and trust principles <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Public Home Narrative Root ───────────────────────────────────────── */
export default function HomeNarrativeV3() {
  return (
    <div className="public-evidence-narrative-container">
      <HeroScene />
      <WorkWorldsScene />
      <EvidenceBridgeScene />
      <ContextQuestionSignalScene />
      <LivingProfileScene />
      <EvidenceConfidenceScene />
      <CareerRelationshipsScene />
      <DevelopmentLoopScene />
      <TrustBoundariesScene />
    </div>
  );
}
