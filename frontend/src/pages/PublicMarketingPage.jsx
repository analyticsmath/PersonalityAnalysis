import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, PublicLayout, ResponsiveImage } from '../components/public/PublicChrome';
import { publicMedia } from '../content/personalityMarketingDemo';
import './PublicSite.css';


/* ── 1. How It Works: Persistent Process Stage ─────────────────────────────── */
function HowItWorksRoute() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    {
      id: 'context',
      tag: '01. Context Ingestion',
      title: 'Professional Context',
      summary: 'Your CV or manual work history gives the assessment a concrete baseline.',
      detail: 'Instead of starting from zero, the engine parses project complexity, tools, domain depth, and operational constraints.',
      media: publicMedia.hero.dominant,
    },
    {
      id: 'questions',
      tag: '02. Adaptive Calibration',
      title: 'Adaptive Questioning',
      summary: 'Questions adapt based on previous responses and domain complexity.',
      detail: 'The engine isolates behavioral nuances, trade-off decisions, and leadership style rather than asking generic Likert questions.',
      media: publicMedia.worlds[0]?.media,
    },
    {
      id: 'readings',
      tag: '03. Independent Dimensions',
      title: 'Four Profile Readings',
      summary: 'Personality, interests, values, and career signals remain separate.',
      detail: 'We never collapse your multidimensional profile into a simplistic archetype or single score.',
      media: publicMedia.hero.process,
    },
    {
      id: 'direction',
      tag: '04. Career Alignment',
      title: 'Career Direction & Rationale',
      summary: 'Inspect why a role relates, where it stretches, and how to build readiness.',
      detail: 'Fit scores are backed by transparent dimensional contributions, capability gaps, and actionable roadmap milestones.',
      media: publicMedia.careers[0]?.media,
    },
  ];

  return (
    <section className="secondary-route hiw-stage-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Context becomes interpretation.</h1>
        <p className="secondary-route__lead">
          Personality Assessor transforms verified professional context through adaptive questioning into calibrated dimensional readings and inspectable career fit.
        </p>
        <div className="secondary-route__cta">
          <Link className="public-cta-button public-cta-button--primary" to="/signup">
            Build my profile <Arrow />
          </Link>
        </div>
      </header>

      {/* Persistent Process Stage: Text Rail + Persistent Visual Canvas */}
      <div className="hiw-persistent-stage" ref={containerRef}>
        <div className="hiw-rail-column">
          {steps.map((step, idx) => (
            <article
              key={step.id}
              className={`hiw-step-block ${activeStep === idx ? 'is-active' : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <span className="hiw-step-tag">{step.tag}</span>
              <h2 className="hiw-step-title">{step.title}</h2>
              <p className="hiw-step-summary">{step.summary}</p>
              <p className="hiw-step-detail">{step.detail}</p>
            </article>
          ))}
        </div>

        <div className="hiw-visual-stage">
          <div className="hiw-visual-stage__frame">
            <figure className="hiw-visual-stage__media">
              {steps[activeStep]?.media && (
                <ResponsiveImage
                  media={steps[activeStep].media}
                  alt={steps[activeStep].title}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                />
              )}
            </figure>
            <div className="hiw-visual-stage__caption">
              <span className="hiw-visual-stage__tag">{steps[activeStep]?.tag}</span>
              <span className="hiw-visual-stage__label">{steps[activeStep]?.title}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 2. Career Intelligence: Career Atlas ──────────────────────────────────── */
function CareerIntelligenceRoute() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const roles = publicMedia.careers || [];
  const activeRole = roles[selectedIdx] || roles[0];

  return (
    <section className="secondary-route career-atlas-route" data-header-scene="dark">
      <div className="career-atlas-route__inner">
        <header className="secondary-route__header">
          <h1 className="secondary-route__title secondary-route__title--dark">
            Career fit should explain itself.
          </h1>
          <p className="secondary-route__lead secondary-route__lead--dark">
            Inspect where a role aligns, where it stretches, and what concrete capabilities will strengthen the relationship.
          </p>
        </header>

        <div className="career-atlas-layout">
          {/* Role Index Left */}
          <nav className="career-atlas-nav" aria-label="Career roles">
            {roles.map((r, i) => (
              <button
                key={r.id}
                type="button"
                className={`career-atlas-nav-item ${selectedIdx === i ? 'is-active' : ''}`}
                onClick={() => setSelectedIdx(i)}
                aria-pressed={selectedIdx === i}
              >
                <span className="career-atlas-nav-title">{r.title}</span>
                <span className="career-atlas-nav-match tabular-nums">{r.match}% Fit</span>
              </button>
            ))}
          </nav>

          {/* Active Career Stage */}
          <div className="career-atlas-detail">
            <figure className="career-atlas-environment-media">
              {activeRole?.media && (
                <ResponsiveImage
                  media={activeRole.media}
                  alt={`Environment for ${activeRole.title}`}
                  sizes="(min-width: 1024px) 50vw, 92vw"
                />
              )}
              <div className="career-atlas-environment-badge">
                <span className="career-atlas-badge-title">{activeRole?.title}</span>
                <span className="career-atlas-badge-score tabular-nums">{activeRole?.match}% Dimensional Fit</span>
              </div>
            </figure>

            <div className="career-atlas-reasoning-flow">
              <div className="career-atlas-block">
                <h3 className="career-atlas-block-title">Why it relates</h3>
                <p className="career-atlas-block-body">{activeRole?.why}</p>
              </div>

              <div className="career-atlas-block">
                <h3 className="career-atlas-block-title">Where the stretch is</h3>
                <p className="career-atlas-block-body">{activeRole?.stretch}</p>
              </div>

              <div className="career-atlas-block">
                <h3 className="career-atlas-block-title">What could strengthen the relationship</h3>
                <p className="career-atlas-block-body">{activeRole?.strengthen}</p>
              </div>

              <div className="career-atlas-methodology-note">
                <span>Methodology Boundary:</span> Recommendations represent dimensional alignment for career exploration, not an absolute hiring endorsement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Progress: Longitudinal Development Journey ─────────────────────────── */
function ProgressRoute() {
  const steps = [
    {
      num: '01',
      name: 'Gap Discovery',
      body: 'Identify specific dimensional stretches or unproven competencies between your current profile and target roles.',
      media: publicMedia.hero.dominant,
    },
    {
      num: '02',
      name: 'Deliberate Action',
      body: 'Engage in targeted challenges and initiatives designed to test and develop required capabilities.',
      media: publicMedia.worlds[0]?.media,
    },
    {
      num: '03',
      name: 'Visible Artifact Creation',
      body: 'Produce tangible deliverables—system architectures, codebases, research analyses, or operational plans.',
      media: publicMedia.hero.process,
    },
    {
      num: '04',
      name: 'New Evidence Ingestion',
      body: 'Incorporate verified project deliverables and expanded work context back into your assessment records.',
      media: publicMedia.hero.evidenceWall,
    },
    {
      num: '05',
      name: 'Profile Re-calibration',
      body: 'Re-calibrate dimensional scores and updated career alignment as your verified work portfolio expands.',
      media: publicMedia.careers[0]?.media,
    },
  ];

  return (
    <section className="secondary-route progress-journey-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Development changes the evidence.</h1>
        <p className="secondary-route__lead">
          A career roadmap is an active loop, not a static score. As you ship work and navigate constraints, new deliverables evolve your calibrated profile over time.
        </p>
      </header>

      <div className="progress-staggered-flow">
        {steps.map((st) => (
          <article key={st.num} className="progress-staggered-node">
            <div className="progress-node-text">
              <span className="progress-node-num">{st.num}</span>
              <h2 className="progress-node-title">{st.name}</h2>
              <p className="progress-node-body">{st.body}</p>
            </div>
            <figure className="progress-node-media">
              {st.media && (
                <ResponsiveImage
                  media={st.media}
                  alt={st.name}
                  sizes="(min-width: 1024px) 36vw, 90vw"
                />
              )}
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── 4. Methodology: Analytical Atlas ──────────────────────────────────────── */
function MethodologyRoute() {
  return (
    <section className="secondary-route methodology-atlas-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Keep the frameworks separate.</h1>
        <p className="secondary-route__lead">
          We maintain strict boundaries between personality dimensions, vocational interests, work values, and career signals. Each framework answers an independent question.
        </p>
      </header>

      <div className="methodology-atlas-grid">
        {/* Framework 1: Big Five */}
        <article className="methodology-atlas-card">
          <div className="methodology-card-head">
            <span className="methodology-card-tag">Framework #01</span>
            <h2 className="methodology-card-title">Big Five Dimensional Spectrum</h2>
          </div>
          <p className="methodology-card-desc">
            Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous spectrums on a 0–100 scale, rejecting arbitrary binary labels or archetypes.
          </p>
          <div className="methodology-spec-row">
            <span>Scale: 0–100 Continuous</span>
            <span>Anchor: Empirical psychometrics</span>
          </div>
        </article>

        {/* Framework 2: RIASEC */}
        <article className="methodology-atlas-card">
          <div className="methodology-card-head">
            <span className="methodology-card-tag">Framework #02</span>
            <h2 className="methodology-card-title">RIASEC Vocational Territories</h2>
          </div>
          <p className="methodology-card-desc">
            Measures alignment across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional work environments to assess affinity with specific day-to-day operational tasks.
          </p>
          <div className="methodology-spec-row">
            <span>6 Territories</span>
            <span>Anchor: Holland vocational theory</span>
          </div>
        </article>

        {/* Framework 3: Work Values */}
        <article className="methodology-atlas-card">
          <div className="methodology-card-head">
            <span className="methodology-card-tag">Framework #03</span>
            <h2 className="methodology-card-title">Work Values Priority Hierarchy</h2>
          </div>
          <p className="methodology-card-desc">
            Ranks twelve core workplace motivations—such as Autonomy, Mastery, Purpose, and Collaboration—to identify cultural and operational preferences that sustain long-term engagement.
          </p>
          <div className="methodology-spec-row">
            <span>12 Core Dimensions</span>
            <span>Anchor: Workplace psychology</span>
          </div>
        </article>

        {/* Framework 4: Career Signals */}
        <article className="methodology-atlas-card">
          <div className="methodology-card-head">
            <span className="methodology-card-tag">Framework #04</span>
            <h2 className="methodology-card-title">Demonstrated Career Signals</h2>
          </div>
          <p className="methodology-card-desc">
            Synthesizes practical problem solving, technical depth, learning agility, and situational leadership derived directly from structured adaptive scenario responses.
          </p>
          <div className="methodology-spec-row">
            <span>Practical Competencies</span>
            <span>Anchor: Behavioral scenario evaluation</span>
          </div>
        </article>
      </div>

      {/* Deterministic Scoring vs AI Narrative Separation */}
      <div className="methodology-boundary-panel">
        <h2 className="methodology-boundary-title">Deterministic Scoring &amp; AI Separation</h2>
        <p className="methodology-boundary-body">
          All core psychometric scores and career-fit metrics are computed deterministically through versioned algorithms. AI provides qualitative written summaries and context reflections; it never modifies, overrides, or fabricates numeric score outputs.
        </p>
      </div>

      <div className="methodology-scope-note">
        <h3>Scope &amp; Limitations</h3>
        <p>
          Personality Assessor is engineered for professional reflection and career exploration. It is not a clinical diagnostic tool, an HR gatekeeping test, or a guarantee of hiring outcomes.
        </p>
      </div>
    </section>
  );
}

/* ── 5. Trust: Provenance Flow ─────────────────────────────────────────────── */
function TrustRoute() {
  const steps = [
    {
      num: '01',
      title: 'Context & Baseline Input',
      desc: 'Resume parsing or manual background inputs create the initial baseline. Adaptive questions emerge from verified domain anchors.',
    },
    {
      num: '02',
      title: 'Deterministic Scoring Logic',
      desc: 'Psychometric scores across Big Five, RIASEC, Work Values, and Career Signals are computed via versioned deterministic algorithms.',
    },
    {
      num: '03',
      title: 'AI Narrative Role & Boundaries',
      desc: 'AI drafts qualitative summaries and context reflections. If AI services are delayed or unavailable, structured scores remain fully accessible.',
    },
    {
      num: '04',
      title: 'Evidence Completeness Signals',
      desc: 'Confidence describes available data completeness and scoring consistency. Missing information is explicitly surfaced rather than hidden.',
    },
    {
      num: '05',
      title: 'Account Data Governance',
      desc: 'You maintain direct control over your stored assessments, CV context, and profile records with immediate export and deletion options.',
    },
  ];

  return (
    <section className="secondary-route trust-provenance-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Know what shaped the result.</h1>
        <p className="secondary-route__lead">
          Our psychometric models, AI role, and data boundaries are explicitly defined, inspectable, and verifiable.
        </p>
      </header>

      <div className="trust-pipeline-flow">
        {steps.map((st) => (
          <div key={st.num} className="trust-pipeline-card">
            <span className="trust-pipeline-num">{st.num}</span>
            <h2 className="trust-pipeline-name">{st.title}</h2>
            <p className="trust-pipeline-body">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="trust-route-actions">
        <Link className="public-cta-button public-cta-button--primary" to="/privacy">
          Review Privacy Controls <Arrow />
        </Link>
      </div>
    </section>
  );
}

/* ── 6. Privacy: Data Control Map ─────────────────────────────────────────── */
function PrivacyRoute() {
  const controls = [
    {
      scope: 'Data Portability',
      title: 'Export Stored Records',
      desc: 'Download a complete JSON export of your profile, assessments, roadmap milestones, and analytics history at any time.',
    },
    {
      scope: 'Context Management',
      title: 'Remove CV & Background Context',
      desc: 'Purge uploaded resumes and parsed background context while preserving your baseline account settings.',
    },
    {
      scope: 'Selective Deletion',
      title: 'Delete Individual Assessments',
      desc: 'Selectively delete individual historical assessment sessions from your profile without losing your account history.',
    },
    {
      scope: 'Account Removal',
      title: 'Permanent Account Deletion',
      desc: 'Irrevocably erase your entire account, credentials, and all associated analytical records across our databases.',
    },
  ];

  return (
    <section className="secondary-route privacy-map-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Your data. Your controls.</h1>
        <p className="secondary-route__lead">
          Account controls let you export stored records, remove CV context, delete individual assessments, or permanently erase your account.
        </p>
      </header>

      <div className="privacy-map-grid">
        {controls.map((ctrl) => (
          <article key={ctrl.title} className="privacy-map-card">
            <span className="privacy-map-scope">{ctrl.scope}</span>
            <h2 className="privacy-map-title">{ctrl.title}</h2>
            <p className="privacy-map-desc">{ctrl.desc}</p>
          </article>
        ))}
      </div>

      <div className="privacy-route-actions">
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
