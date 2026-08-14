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
  const { reducedMotion } = usePublicMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const context = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        mediaRef.current,
        { autoAlpha: 0, scale: 0.97 },
        { autoAlpha: 1, scale: 1, duration: 0.72 }
      )
        .fromTo(
          headlineRef.current?.querySelectorAll('.hero-line-reveal'),
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12 },
          '-=0.45'
        );
    }, heroRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section className="evidence-hero-scene" ref={heroRef} data-header-scene="light" aria-labelledby="hero-heading">
      <div className="evidence-hero-scene__inner">
        <div className="evidence-hero-scene__content">
          <h1 id="hero-heading" className="evidence-hero-scene__title" ref={headlineRef}>
            <span className="hero-line-reveal">Your work</span>
            <span className="hero-line-reveal">leaves evidence.</span>
          </h1>

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

        <div className="evidence-hero-scene__composition" ref={mediaRef}>
          <figure className="evidence-hero-scene__dominant-frame">
            <ResponsiveImage
              media={publicMedia.hero.dominant}
              alt="Designer's desk with architectural tools and notebook"
              priority
              sizes="(min-width: 1200px) 54vw, 92vw"
            />
          </figure>

          <figure className="evidence-hero-scene__fragment-frame evidence-hero-scene__fragment-frame--one">
            <ResponsiveImage
              media={publicMedia.hero.supporting}
              alt="Hands arranging mood-board swatches and conceptual notes"
              sizes="(min-width: 1200px) 24vw, 44vw"
            />
            <figcaption className="evidence-fragment-caption">Artifact arrangement</figcaption>
          </figure>

          <figure className="evidence-hero-scene__fragment-frame evidence-hero-scene__fragment-frame--two">
            <ResponsiveImage
              media={publicMedia.hero.process}
              alt="Architectural model-making process detail"
              sizes="(min-width: 1200px) 20vw, 38vw"
            />
            <figcaption className="evidence-fragment-caption">Process iteration</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function WorkWorldsScene() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = usePublicMotion();
  const worlds = publicMedia.worlds;

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (pointer: fine)', () => {
        const panels = gsap.utils.toArray('.work-world-panel');
        const count = panels.length;
        if (!count) return;

        const totalScrollDistance = window.innerHeight * 4.6;

        const scrollTween = gsap.to(trackRef.current, {
          x: () => -(trackRef.current.scrollWidth - window.innerWidth + 80),
          ease: 'none',
          scrollTrigger: {
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

    const trigger = ScrollTrigger.getById('work-worlds-trigger') || ScrollTrigger.getAll().find((st) => st.trigger === containerRef.current);
    if (trigger) {
      const targetProgress = clamped / (worlds.length - 1);
      const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
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
  const entities = [
    { type: 'Project', title: 'Real-time Analytics Migration', detail: 'Decomposed latency constraints into streaming stages.' },
    { type: 'Experience', title: 'Systems Infrastructure Lead', detail: 'Led platform reliability under continuous load.' },
    { type: 'Skill', title: 'Distributed Systems & Observability', detail: 'Formalized operational metrics and failure isolation.' },
    { type: 'Education', title: 'Computer Systems & HCI', detail: 'Structured analysis of computational complexity.' },
    { type: 'Interest', title: 'Toolsmithing & Precision Craft', detail: 'Building internal tools to expose invisible friction.' },
  ];

  return (
    <section className="context-scene" data-header-scene="light" aria-labelledby="context-heading">
      <div className="context-scene__inner">
        <header className="context-scene__header">
          <h2 id="context-heading" className="context-scene__title">
            Context changes the question.
          </h2>
          <p className="context-scene__copy">
            A CV or a profile you enter yourself gives the assessment a place to begin. Projects, skills, education,
            experience and interests can shape what it asks next.
          </p>
        </header>

        <div className="context-scene__evidence-field">
          <div className="context-scene__primary-document">
            <header className="context-document-header">
              <span className="context-document-label">Professional Baseline</span>
              <span className="context-document-status">Context Parsed</span>
            </header>
            <div className="context-document-body">
              <p className="context-document-intro">
                Initial background context sets up domain calibration, prior scope, and problem-solving scenarios.
              </p>
              <div className="context-entities-list">
                {entities.map((item) => (
                  <article key={item.type} className="context-entity-row">
                    <span className="context-entity-type">{item.type}</span>
                    <div className="context-entity-body">
                      <strong>{item.title}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdaptiveQuestionDemoScene() {
  const [selectedResponse, setSelectedResponse] = useState(null);

  const responses = [
    {
      id: 'clarify',
      text: 'Clarify what changed, then test a revised path.',
      feedback: 'Emphasizes iterative discovery and rapid constraint testing.',
    },
    {
      id: 'gather',
      text: 'Gather input before choosing the next move.',
      feedback: 'Emphasizes cross-functional alignment and consultative validation.',
    },
    {
      id: 'recheck',
      text: 'Recheck the original assumptions before changing course.',
      feedback: 'Emphasizes foundational verification and root-cause inquiry.',
    },
  ];

  return (
    <section className="adaptive-question-scene" data-header-scene="light" aria-labelledby="adaptive-question-title">
      <div className="adaptive-question-scene__inner">
        <header className="adaptive-question-scene__header">
          <h2 id="adaptive-question-title" className="adaptive-question-scene__title">
            Adaptive questioning in action.
          </h2>
          <p className="adaptive-question-scene__copy">
            Questions adapt to the tension points in your professional approach. Select an option to see how the system
            interprets different strategic responses.
          </p>
        </header>

        <div className="adaptive-question-card">
          <div className="adaptive-question-prompt">
            <span className="adaptive-question-label">Question Scenario</span>
            <p className="adaptive-question-text">
              When a project changes direction after you&apos;ve already started, what do you usually do first?
            </p>
          </div>

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
                  onClick={() => setSelectedResponse(item.id)}
                >
                  <span className="adaptive-option-indicator" aria-hidden="true" />
                  <span className="adaptive-option-text">{item.text}</span>
                </button>
              );
            })}
          </div>

          {selectedResponse && (
            <div className="adaptive-question-feedback" role="status" aria-live="polite">
              <p className="adaptive-question-feedback-text">
                {responses.find((r) => r.id === selectedResponse)?.feedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProfileScene() {
  const [activeLens, setActiveLens] = useState('personality');
  const lensContainerRef = useRef(null);
  const demo = marketingDemo.profile;

  const handleSelectLens = (key) => {
    if (key === activeLens) return;
    const state = Flip.getState(lensContainerRef.current?.querySelectorAll('.profile-lens-item') || []);
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
    <section className="profile-scene" data-header-scene="light" aria-labelledby="profile-heading">
      <div className="profile-scene__inner">
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

        <div className="profile-scene__reading-stage" ref={lensContainerRef}>
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
  const evidenceItems = [
    {
      category: 'Supporting Evidence',
      status: 'Strong Signal',
      details: 'Multiple consistent responses across system architecture, constraint analysis, and project decomposition.',
    },
    {
      category: 'Mixed Evidence',
      status: 'Context Dependent',
      details: 'Balanced signals between independent execution and formal consensus-driven coordination.',
    },
    {
      category: 'Missing / Limited Evidence',
      status: 'Preliminary',
      details: 'Limited data on high-pressure real-time commercial crisis management.',
    },
  ];

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

        <div className="evidence-confidence-cards">
          {evidenceItems.map((item) => (
            <article key={item.category} className="evidence-confidence-card">
              <span className="evidence-confidence-card__category">{item.category}</span>
              <h3 className="evidence-confidence-card__status">{item.status}</h3>
              <p className="evidence-confidence-card__details">{item.details}</p>
            </article>
          ))}
        </div>

        <div className="evidence-confidence-meta">
          <div className="evidence-meta-block">
            <strong>Evidence Points Evaluated:</strong> 24 structured responses + 5 context entities
          </div>
          <div className="evidence-meta-block">
            <strong>Validity Status:</strong> Valid psychometric baseline
          </div>
        </div>
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
  const loopSteps = [
    { step: '1', name: 'Notice what differs', detail: 'Identify the gap between your current evidence and target environment requirements.' },
    { step: '2', name: 'Do deliberate work', detail: 'Undertake real projects that exercise unproven skill dimensions under realistic constraints.' },
    { step: '3', name: 'Make the result visible', detail: 'Produce tangible artifacts—documentation, code repositories, prototypes, case reviews.' },
    { step: '4', name: 'Bring new evidence back', detail: 'Update your profile context with completed work to evolve future interpretation.' },
  ];

  return (
    <section className="development-loop-scene" data-header-scene="light" aria-labelledby="development-heading">
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

        <div className="development-loop-transformation">
          {loopSteps.map((item) => (
            <article key={item.step} className="development-step-card">
              <span className="development-step-number">{item.step}</span>
              <h3 className="development-step-name">{item.name}</h3>
              <p className="development-step-detail">{item.detail}</p>
            </article>
          ))}
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
