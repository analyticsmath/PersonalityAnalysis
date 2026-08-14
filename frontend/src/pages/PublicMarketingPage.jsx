import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, PublicLayout, ResponsiveImage } from '../components/public/PublicChrome';
import { publicMedia } from '../content/personalityMarketingDemo';
import './PublicSite.css';

/* ── 1. How It Works: Continuous Narrative & Scroll-Driven Evolving Canvas ─── */
function HowItWorksRoute() {
  const [activeStep, setActiveStep] = useState(0);
  const actRefs = useRef([]);

  const acts = [
    {
      id: 'context',
      title: 'Professional Context',
      summary: 'Your CV or manual background gives the engine a concrete baseline.',
      detail: 'Instead of starting from zero, the system parses past projects, tools, skill signals, and operational environments.',
    },
    {
      id: 'questions',
      title: 'Adaptive Questions',
      summary: 'Questions adjust based on your previous responses and domain complexity.',
      detail: 'The assessment targets ambiguity, decision trade-offs, and behavioral nuances rather than generic Likert statements.',
    },
    {
      id: 'readings',
      title: 'Four Profile Readings',
      summary: 'Personality, interests, values, and career signals stay independent.',
      detail: 'We never collapse your profile into an oversimplified single score or arbitrary personality archetype.',
    },
    {
      id: 'direction',
      title: 'Career Direction & Roadmap',
      summary: 'Understand why a role fits, where it stretches, and what to build next.',
      detail: 'Fit scores are explained with tangible skill contributions, gap analysis, and iterative development steps.',
    },
  ];

  // Scroll-driven act activation via IntersectionObserver
  useEffect(() => {
    const observers = [];
    actRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        { rootMargin: '-25% 0px -35% 0px', threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (index) => {
    setActiveStep(index);
    actRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="secondary-route how-it-works-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Context becomes interpretation.</h1>
        <p className="secondary-route__lead">
          Personality Assessor links your existing professional context with adaptive questioning to produce a clear,
          inspectable profile without reductive labels.
        </p>
        <div className="secondary-route__cta">
          <Link className="public-cta-button" to="/signup">
            Build my profile <Arrow />
          </Link>
        </div>
      </header>

      {/* Direct stage text jumps (Scrolls to corresponding narrative act) */}
      <nav className="narrative-stage-nav" aria-label="Narrative sections">
        {acts.map((act, index) => (
          <button
            key={act.id}
            type="button"
            className={`narrative-stage-nav__item ${activeStep === index ? 'is-active' : ''}`}
            onClick={() => handleNavClick(index)}
          >
            {act.title}
          </button>
        ))}
      </nav>

      {/* Scrolling Narrative + Automatically Evolving Evidence Canvas */}
      <div className="narrative-canvas-flow">
        <div className="narrative-canvas-story">
          {acts.map((act, index) => (
            <article
              key={act.id}
              ref={(el) => {
                actRefs.current[index] = el;
              }}
              className={`narrative-story-act ${activeStep === index ? 'is-current' : ''}`}
            >
              <h2 className="narrative-act-title">{act.title}</h2>
              <p className="narrative-act-summary">{act.summary}</p>
              <p className="narrative-act-detail">{act.detail}</p>
            </article>
          ))}
        </div>

        <figure className="narrative-canvas-visual">
          <ResponsiveImage
            media={publicMedia.howItWorks[activeStep] || publicMedia.howItWorks[0]}
            alt={acts[activeStep]?.title || 'How it works illustration'}
            sizes="(min-width: 1024px) 48vw, 92vw"
          />
        </figure>
      </div>
    </section>
  );
}

/* ── 2. Career Intelligence: Page-Scale Environment & Hierarchy ───────────── */
function CareerIntelligenceRoute() {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const roles = publicMedia.careers;
  const current = roles[selectedRoleIndex] || roles[0];

  return (
    <section className="secondary-route career-intelligence-route" data-header-scene="dark">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Career fit should explain itself.</h1>
        <p className="secondary-route__lead">
          We treat fit scores as supporting rationale. Every recommendation details the evidence that supports it, where
          the stretch lies, and which concrete capabilities will advance the match.
        </p>
      </header>

      {/* Page-Scale Environment: Selector + Media + Integrated Reasoning Hierarchy */}
      <div className="career-intelligence-environment">
        <nav className="career-intelligence-nav" aria-label="Target career environments">
          {roles.map((role, idx) => (
            <button
              key={role.id}
              type="button"
              className={`career-intelligence-nav-item ${selectedRoleIndex === idx ? 'is-active' : ''}`}
              onClick={() => setSelectedRoleIndex(idx)}
            >
              <span>{role.title}</span>
              <strong>{role.match}% fit</strong>
            </button>
          ))}
        </nav>

        <div className="career-intelligence-stage">
          <figure className="career-intelligence-stage__visual">
            <ResponsiveImage
              media={current.media}
              alt={current.media.alt}
              sizes="(min-width: 1024px) 52vw, 92vw"
            />
          </figure>

          <div className="career-intelligence-reasoning-hierarchy">
            <div className="career-reasoning-section">
              <h2 className="career-reasoning-section__title">Why it relates</h2>
              <p className="career-reasoning-section__body">{current.why}</p>
            </div>

            <div className="career-reasoning-section">
              <h2 className="career-reasoning-section__title">Where the stretch is</h2>
              <p className="career-reasoning-section__body">{current.stretch}</p>
            </div>

            <div className="career-reasoning-section">
              <h2 className="career-reasoning-section__title">What could strengthen the fit</h2>
              <p className="career-reasoning-section__body">{current.strengthen}</p>
            </div>

            <div className="career-supporting-score">
              <span>Calculated Fit Index:</span>
              <strong>{current.match}%</strong>
              <small>(Supporting metric derived from dimensional alignment, not a fixed verdict)</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Progress: Continuous Transformation (Scroll-Driven) ────────────────── */
function ProgressRoute() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef([]);

  const stages = [
    { name: 'Gap Discovery', copy: 'Pinpoint specific competencies or experiential voids between your profile and target roles.' },
    { name: 'Deliberate Action', copy: 'Engage in targeted projects and challenges designed to develop unproven capabilities.' },
    { name: 'Visible Work', copy: 'Generate tangible outputs—codebases, architecture specs, user research, or operational frameworks.' },
    { name: 'Artifact Creation', copy: 'Structure project deliverables into clear, reviewable professional artifacts.' },
    { name: 'New Evidence', copy: 'Integrate verified project milestones back into your Personality Assessor profile.' },
    { name: 'Profile Return', copy: 'Re-evaluate dimensional interpretations with enriched context and updated career alignment.' },
  ];

  // Scroll-driven stage activation via IntersectionObserver
  useEffect(() => {
    const observers = [];
    stageRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStage(index);
          }
        },
        { rootMargin: '-25% 0px -35% 0px', threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="secondary-route progress-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Development changes the evidence.</h1>
        <p className="secondary-route__lead">
          A career roadmap is an active loop, not a static score. As you ship work and overcome constraints, new
          evidence evolves your profile over time.
        </p>
      </header>

      {/* Continuous Loop Transformation (Scroll-Driven, No Numbers) */}
      <div className="progress-transformation-flow">
        <figure className="progress-transformation-visual">
          <ResponsiveImage
            media={publicMedia.progress[activeStage] || publicMedia.progress[0]}
            alt={stages[activeStage]?.name}
            sizes="(min-width: 1024px) 50vw, 92vw"
          />
        </figure>

        <div className="progress-transformation-timeline">
          {stages.map((st, i) => (
            <div
              key={st.name}
              ref={(el) => {
                stageRefs.current[i] = el;
              }}
              className={`progress-transformation-stage ${activeStage === i ? 'is-active' : ''}`}
            >
              <div className="progress-stage-indicator" aria-hidden="true" />
              <div className="progress-stage-content">
                <h2 className="progress-stage-heading">{st.name}</h2>
                <p className="progress-stage-copy">{st.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. Methodology: Framework Atlas (No Eyebrow Tags / No Fake 74%) ──────── */
function MethodologyRoute() {
  return (
    <section className="secondary-route methodology-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Keep the frameworks separate.</h1>
        <p className="secondary-route__lead">
          We maintain rigorous boundaries between personality dimensions, vocational interests, work values, and career
          signals. Each framework answers a specific, independent question.
        </p>
      </header>

      {/* Framework Atlas Layout */}
      <div className="framework-atlas">
        {/* Layer 1: Big Five Continuous Spectrum */}
        <article className="framework-atlas-layer">
          <div className="framework-atlas-layer__head">
            <h2>Big Five Continuous Spectrum</h2>
            <p>
              Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous
              spectrums rather than rigid binary types or arbitrary archetypes.
            </p>
          </div>
          <div className="framework-spectrum-preview">
            <div className="spectrum-track" role="img" aria-label="Illustrative continuous spectrum demonstration">
              <span className="spectrum-anchor">Lower calibration anchor</span>
              <div className="spectrum-axis">
                <div className="spectrum-marker" aria-hidden="true" />
              </div>
              <span className="spectrum-anchor">Higher calibration anchor</span>
            </div>
            <p className="spectrum-caption">
              Illustrative continuous spectrum demonstration. Dimensions express continuous variance without discrete typologies.
            </p>
          </div>
        </article>

        {/* Layer 2: RIASEC Vocational Interests */}
        <article className="framework-atlas-layer">
          <div className="framework-atlas-layer__head">
            <h2>RIASEC Vocational Interests</h2>
            <p>
              Measures Holland-style vocational affinity across Realistic, Investigative, Artistic, Social, Enterprising,
              and Conventional work territories.
            </p>
          </div>
          <div className="framework-riasec-tags">
            <span>Realistic</span>
            <span>Investigative</span>
            <span>Artistic</span>
            <span>Social</span>
            <span>Enterprising</span>
            <span>Conventional</span>
          </div>
        </article>

        {/* Layer 3: Work Values Priority Hierarchy */}
        <article className="framework-atlas-layer">
          <div className="framework-atlas-layer__head">
            <h2>Work Values Priority Hierarchy</h2>
            <p>
              Ranks twelve distinct workplace motivations—including autonomy, mastery, collaboration, and impact—to
              identify work-environment preferences.
            </p>
          </div>
        </article>

        {/* Layer 4: Demonstrated Career Signals */}
        <article className="framework-atlas-layer">
          <div className="framework-atlas-layer__head">
            <h2>Demonstrated Career Signals</h2>
            <p>
              Synthesizes practical problem-solving methods, technical depth, and learning agility from structured adaptive
              responses.
            </p>
          </div>
        </article>

        {/* Layer 5: Deterministic Scoring Engine & AI Boundaries */}
        <article className="framework-atlas-layer framework-atlas-layer--engine">
          <div className="framework-atlas-layer__head">
            <h2>Deterministic Scoring &amp; AI Separation</h2>
            <p>
              All core psychometric scores and career-fit metrics are computed deterministically through versioned deterministic scoring
              rules. AI provides qualitative written explanations; it never alters, fabricates, or overrides numeric
              calculations.
            </p>
          </div>
        </article>
      </div>

      <div className="methodology-boundary-notice">
        <h3>Methodological Scope &amp; Limitations</h3>
        <p>
          Personality Assessor is engineered for professional reflection and career exploration. It is not a clinical
          diagnostic instrument, an HR gatekeeping mechanism, or a guarantee of employment outcomes.
        </p>
      </div>
    </section>
  );
}

/* ── 5. Trust: Sequential Explanatory Chapters (No Decorative Numbers) ────── */
function TrustRoute() {
  return (
    <section className="secondary-route trust-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Know what shaped the result.</h1>
        <p className="secondary-route__lead">
          Our psychometric models, AI role, and data boundaries are explicitly defined and verifiable.
        </p>
      </header>

      {/* Sequential Explanatory Chapters */}
      <div className="trust-chapters">
        <section className="trust-chapter">
          <div className="trust-chapter__content">
            <h2>Structured Scoring Logic</h2>
            <p>
              Assessment scores and career comparisons are computed using deterministic scoring algorithms. AI does not score
              your personality dimensions.
            </p>
          </div>
        </section>

        <section className="trust-chapter">
          <div className="trust-chapter__content">
            <h2>AI Participation &amp; Boundaries</h2>
            <p>
              AI assists in analyzing background context and drafting qualitative narrative summaries. When AI generation is
              delayed or unavailable, structured scores remain fully accessible.
            </p>
          </div>
        </section>

        <section className="trust-chapter">
          <div className="trust-chapter__content">
            <h2>Evidence &amp; Confidence Signals</h2>
            <p>
              We distinguish between strong evidence, mixed signals, and preliminary readings. Confidence is contextual metadata
              about the available evidence and scoring state; it is not a probability that the interpretation is true.
            </p>
          </div>
        </section>

        <section className="trust-chapter">
          <div className="trust-chapter__content">
            <h2>Account Data Governance</h2>
            <p>
              You maintain direct control over your stored assessments, CV context, and profile records with immediate
              export and deletion options.
            </p>
          </div>
        </section>
      </div>

      <div className="trust-action-row">
        <Link className="public-cta-button" to="/privacy">
          Review privacy controls <Arrow />
        </Link>
      </div>
    </section>
  );
}

/* ── 6. Public Privacy: Control-Map Composition ──────────────────────────── */
function PrivacyRoute() {
  const controlMap = [
    {
      scope: 'Data Portability',
      title: 'Export Stored Records',
      description: 'Download a complete JSON export of your profile, assessments, roadmap milestones, and analytics history at any time.',
      action: 'Export JSON',
    },
    {
      scope: 'Context Management',
      title: 'Remove CV & Background Context',
      description: 'Purge uploaded resumes and parsed background context while preserving your baseline account settings.',
      action: 'Purge Context',
    },
    {
      scope: 'Selective Deletion',
      title: 'Delete Individual Assessments',
      description: 'Selectively delete individual historical assessment sessions from your profile without losing your account history.',
      action: 'Select Sessions',
    },
    {
      scope: 'Account Removal',
      title: 'Permanent Account Deletion',
      description: 'Irrevocably erase your entire account, credentials, and all associated analytical records across our databases.',
      action: 'Delete Account',
    },
  ];

  return (
    <section className="secondary-route privacy-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Your data. Your controls.</h1>
        <p className="secondary-route__lead">
          Account controls let you export stored account, assessment and roadmap data; remove profile/CV-related stored
          data; delete an assessment; or permanently delete your account and related records.
        </p>
      </header>

      {/* Control-Map Composition */}
      <div className="privacy-control-map">
        {controlMap.map((ctrl) => (
          <div key={ctrl.title} className="privacy-control-map__item">
            <div className="privacy-control-map__header">
              <span className="privacy-control-scope">{ctrl.scope}</span>
              <h2>{ctrl.title}</h2>
            </div>
            <p className="privacy-control-map__desc">{ctrl.description}</p>
          </div>
        ))}
      </div>

      <div className="privacy-action-row">
        <Link className="public-cta-button" to="/login">
          Sign in to manage your data <Arrow />
        </Link>
      </div>
    </section>
  );
}

const routeMap = {
  'how-it-works': HowItWorksRoute,
  'career-intelligence': CareerIntelligenceRoute,
  progress: ProgressRoute,
  methodology: MethodologyRoute,
  trust: TrustRoute,
  privacy: PrivacyRoute,
};

export default function PublicMarketingPage({ type }) {
  const Component = routeMap[type] || HowItWorksRoute;

  return (
    <PublicLayout page={type}>
      <main id="main-content" className={`marketing-page-container marketing-page--${type}`}>
        <Component />
      </main>
    </PublicLayout>
  );
}
