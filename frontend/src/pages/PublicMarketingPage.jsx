import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, PublicLayout, ResponsiveImage } from '../components/public/PublicChrome';
import { publicMedia } from '../content/personalityMarketingDemo';
import './PublicSite.css';

/* ── 1. How It Works: Living Artifact Sequence ─────────────────────────────── */
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

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    const observers = [];
    actRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        { rootMargin: '-20% 0px -40% 0px', threshold: 0.2 }
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
          <Link className="public-cta-button public-cta-button--primary" to="/signup">
            Build my profile <Arrow />
          </Link>
        </div>
      </header>

      {/* Stage Navigation */}
      <nav className="hiw-stage-nav" aria-label="Narrative sections">
        {acts.map((act, index) => (
          <button
            key={act.id}
            type="button"
            className={`hiw-stage-nav-item ${activeStep === index ? 'is-active' : ''}`}
            onClick={() => handleNavClick(index)}
          >
            {act.title}
          </button>
        ))}
      </nav>

      {/* Living Artifact Flow */}
      <div className="hiw-artifact-flow">
        <div className="hiw-story-column">
          {acts.map((act, index) => (
            <article
              key={act.id}
              ref={(el) => {
                actRefs.current[index] = el;
              }}
              className={`hiw-story-act ${activeStep === index ? 'is-current' : ''}`}
            >
              <h2 className="hiw-act-title">{act.title}</h2>
              <p className="hiw-act-summary">{act.summary}</p>
              <p className="hiw-act-detail">{act.detail}</p>
            </article>
          ))}
        </div>

        <figure className="hiw-visual-column">
          <ResponsiveImage
            media={publicMedia.howItWorks[activeStep] || publicMedia.howItWorks[0]}
            alt={acts[activeStep]?.title || 'How it works illustration'}
            sizes="(min-width: 1024px) 46vw, 92vw"
          />
        </figure>
      </div>
    </section>
  );
}

/* ── 2. Career Intelligence: Career Atlas ──────────────────────────────────── */
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

      {/* Career Atlas Grid */}
      <div className="career-atlas-environment">
        <nav className="career-atlas-role-list" aria-label="Target career environments">
          {roles.map((role, idx) => (
            <button
              key={role.id}
              type="button"
              className={`career-atlas-role-btn ${selectedRoleIndex === idx ? 'is-active' : ''}`}
              onClick={() => setSelectedRoleIndex(idx)}
            >
              <span className="career-atlas-role-title">{role.title}</span>
              <span className="career-atlas-role-badge">Inspect fit</span>
            </button>
          ))}
        </nav>

        <div className="career-atlas-stage">
          <figure className="career-atlas-media">
            <ResponsiveImage
              media={current.media}
              alt={current.media.alt}
              sizes="(min-width: 1024px) 50vw, 92vw"
            />
          </figure>

          <div className="career-atlas-reasoning">
            <div className="career-atlas-section">
              <h2 className="career-atlas-section-title">Why it relates</h2>
              <p className="career-atlas-section-body">{current.why}</p>
            </div>

            <div className="career-atlas-section">
              <h2 className="career-atlas-section-title">Where the stretch is</h2>
              <p className="career-atlas-section-body">{current.stretch}</p>
            </div>

            <div className="career-atlas-section">
              <h2 className="career-atlas-section-title">What could strengthen the fit</h2>
              <p className="career-atlas-section-body">{current.strengthen}</p>
            </div>

            <div className="career-atlas-boundary-note">
              <span>Methodology Boundary:</span> Recommendations represent dimensional alignment for career exploration,
              not an absolute guarantee of hiring success.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Progress: Longitudinal Visual Journey ──────────────────────────────── */
function ProgressRoute() {
  const stages = [
    { name: 'Gap Discovery', copy: 'Pinpoint specific competencies or experiential voids between your profile and target roles.' },
    { name: 'Deliberate Action', copy: 'Engage in targeted projects and challenges designed to develop unproven capabilities.' },
    { name: 'Visible Work', copy: 'Generate tangible outputs—codebases, architecture specs, user research, or operational frameworks.' },
    { name: 'Artifact Creation', copy: 'Structure project deliverables into clear, reviewable professional artifacts.' },
    { name: 'New Evidence', copy: 'Integrate verified project milestones back into your Personality Assessor profile.' },
    { name: 'Profile Return', copy: 'Re-evaluate dimensional interpretations with enriched context and updated career alignment.' },
  ];

  return (
    <section className="secondary-route progress-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Development changes the evidence.</h1>
        <p className="secondary-route__lead">
          A career roadmap is an active loop, not a static score. As you ship work and overcome constraints, new
          evidence evolves your profile over time.
        </p>
      </header>

      {/* Visual Journey Filmstrip */}
      <div className="progress-journey-filmstrip">
        {stages.map((st, i) => (
          <article key={st.name} className="progress-journey-node">
            <figure className="progress-journey-media">
              <ResponsiveImage
                media={publicMedia.progress[i] || publicMedia.progress[0]}
                alt={st.name}
                sizes="(min-width: 1024px) 30vw, 84vw"
              />
            </figure>
            <div className="progress-journey-body">
              <h2 className="progress-journey-name">{st.name}</h2>
              <p className="progress-journey-copy">{st.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── 4. Methodology: Research Atlas ────────────────────────────────────────── */
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

      <div className="methodology-framework-atlas">
        {/* Big Five Spectrum */}
        <article className="methodology-layer-card">
          <div className="methodology-layer-head">
            <h2>Big Five Continuous Spectrum</h2>
            <p>
              Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous
              spectrums rather than rigid binary types or arbitrary archetypes.
            </p>
          </div>
          <div className="methodology-spectrum-field" role="img" aria-label="Continuous dimensional spectrum illustration">
            <span className="spectrum-bound-label">Lower calibration anchor</span>
            <div className="spectrum-track-bar">
              <div className="spectrum-pin" aria-hidden="true" />
            </div>
            <span className="spectrum-bound-label">Higher calibration anchor</span>
          </div>
        </article>

        {/* RIASEC Territories */}
        <article className="methodology-layer-card">
          <div className="methodology-layer-head">
            <h2>RIASEC Vocational Territories</h2>
            <p>
              Measures Holland-style vocational affinity across Realistic, Investigative, Artistic, Social, Enterprising,
              and Conventional work territories.
            </p>
          </div>
          <div className="methodology-tags-cluster">
            <span>Realistic</span>
            <span>Investigative</span>
            <span>Artistic</span>
            <span>Social</span>
            <span>Enterprising</span>
            <span>Conventional</span>
          </div>
        </article>

        {/* Work Values */}
        <article className="methodology-layer-card">
          <div className="methodology-layer-head">
            <h2>Work Values Priority Hierarchy</h2>
            <p>
              Ranks twelve distinct workplace motivations—including autonomy, mastery, collaboration, and impact—to
              identify work-environment preferences.
            </p>
          </div>
        </article>

        {/* Career Signals */}
        <article className="methodology-layer-card">
          <div className="methodology-layer-head">
            <h2>Demonstrated Career Signals</h2>
            <p>
              Synthesizes practical problem-solving methods, technical depth, and learning agility from structured adaptive
              responses.
            </p>
          </div>
        </article>

        {/* Deterministic Scoring vs AI Narrative */}
        <article className="methodology-layer-card methodology-layer-card--engine">
          <div className="methodology-layer-head">
            <h2>Deterministic Scoring &amp; AI Separation</h2>
            <p>
              All core psychometric scores and career-fit metrics are computed deterministically through versioned deterministic scoring
              rules. AI provides qualitative written explanations; it never alters, fabricates, or overrides numeric
              calculations.
            </p>
          </div>
        </article>
      </div>

      <div className="methodology-scope-box">
        <h3>Methodological Scope &amp; Limitations</h3>
        <p>
          Personality Assessor is engineered for professional reflection and career exploration. It is not a clinical
          diagnostic instrument, an HR gatekeeping mechanism, or a guarantee of employment outcomes.
        </p>
      </div>
    </section>
  );
}

/* ── 5. Trust: Provenance Ledger ───────────────────────────────────────────── */
function TrustRoute() {
  const ledgerSteps = [
    {
      title: 'Context & Response Input',
      desc: 'Resume parsing or manual background inputs create the initial baseline. Adaptive questions emerge from verified domain anchors.',
    },
    {
      title: 'Deterministic Scoring Logic',
      desc: 'Psychometric scores across Big Five, RIASEC, Work Values, and Career Signals are computed via versioned deterministic algorithms.',
    },
    {
      title: 'AI Narrative Role & Boundaries',
      desc: 'AI drafts qualitative summaries and context reflections. If AI services are delayed or unavailable, structured scores remain fully accessible.',
    },
    {
      title: 'Evidence Completeness Signals',
      desc: 'Confidence describes available data completeness and scoring consistency. Missing information is explicitly surfaced rather than hidden.',
    },
    {
      title: 'Account Data Governance',
      desc: 'You maintain direct control over your stored assessments, CV context, and profile records with immediate export and deletion options.',
    },
  ];

  return (
    <section className="secondary-route trust-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Know what shaped the result.</h1>
        <p className="secondary-route__lead">
          Our psychometric models, AI role, and data boundaries are explicitly defined and verifiable.
        </p>
      </header>

      <div className="trust-provenance-ledger">
        {ledgerSteps.map((step, idx) => (
          <div key={step.title} className="trust-ledger-row">
            <div className="trust-ledger-marker">{idx + 1}</div>
            <div className="trust-ledger-content">
              <h2>{step.title}</h2>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="trust-action-footer">
        <Link className="public-cta-button public-cta-button--primary" to="/privacy">
          Review privacy controls <Arrow />
        </Link>
      </div>
    </section>
  );
}

/* ── 6. Public Privacy: Data Control Map ───────────────────────────────────── */
function PrivacyRoute() {
  const controlMap = [
    {
      scope: 'Data Portability',
      title: 'Export Stored Records',
      description: 'Download a complete JSON export of your profile, assessments, roadmap milestones, and analytics history at any time.',
    },
    {
      scope: 'Context Management',
      title: 'Remove CV & Background Context',
      description: 'Purge uploaded resumes and parsed background context while preserving your baseline account settings.',
    },
    {
      scope: 'Selective Deletion',
      title: 'Delete Individual Assessments',
      description: 'Selectively delete individual historical assessment sessions from your profile without losing your account history.',
    },
    {
      scope: 'Account Removal',
      title: 'Permanent Account Deletion',
      description: 'Irrevocably erase your entire account, credentials, and all associated analytical records across our databases.',
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

      <div className="privacy-control-grid">
        {controlMap.map((ctrl) => (
          <article key={ctrl.title} className="privacy-control-card">
            <span className="privacy-card-scope">{ctrl.scope}</span>
            <h2 className="privacy-card-title">{ctrl.title}</h2>
            <p className="privacy-card-desc">{ctrl.description}</p>
          </article>
        ))}
      </div>

      <div className="privacy-action-footer">
        <Link className="public-cta-button public-cta-button--primary" to="/login">
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
