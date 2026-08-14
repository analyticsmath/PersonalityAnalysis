import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, PublicLayout, ResponsiveImage } from '../components/public/PublicChrome';
import { publicMedia } from '../content/personalityMarketingDemo';
import './PublicSite.css';

function HowItWorksRoute() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: '1. Professional Context',
      summary: 'Your CV or manual background gives the engine a concrete baseline.',
      detail: 'Instead of starting from zero, the system parses past projects, tools, skill signals, and operational environments.',
    },
    {
      title: '2. Adaptive Questions',
      summary: 'Questions adjust based on your previous responses and domain complexity.',
      detail: 'The assessment targets ambiguity, decision trade-offs, and behavioral nuances rather than generic Likert statements.',
    },
    {
      title: '3. Four Distinct Readings',
      summary: 'Personality, interests, values, and career signals stay independent.',
      detail: 'We never collapse your profile into an oversimplified single score or arbitrary personality archetype.',
    },
    {
      title: '4. Career Direction & Roadmap',
      summary: 'Understand why a role fits, where it stretches, and what to build next.',
      detail: 'Fit scores are explained with tangible skill contributions, gap analysis, and iterative development steps.',
    },
  ];

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

      <div className="how-it-works-flow">
        <div className="how-it-works-steps" role="tablist" aria-label="How it works stages">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              role="tab"
              aria-selected={activeStep === index}
              className={`how-it-works-step-card ${activeStep === index ? 'is-active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <h2 className="how-it-works-step-title">{step.title}</h2>
              <p className="how-it-works-step-summary">{step.summary}</p>
              <p className="how-it-works-step-detail">{step.detail}</p>
            </button>
          ))}
        </div>

        <figure className="how-it-works-visual">
          <ResponsiveImage
            media={publicMedia.howItWorks[activeStep] || publicMedia.howItWorks[0]}
            alt={steps[activeStep]?.title || 'How it works illustration'}
            sizes="(min-width: 1024px) 46vw, 92vw"
          />
        </figure>
      </div>
    </section>
  );
}

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

      <div className="career-intelligence-explorer">
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

        <article className="career-intelligence-card">
          <figure className="career-intelligence-card__media">
            <ResponsiveImage
              media={current.media}
              alt={current.media.alt}
              sizes="(min-width: 1024px) 50vw, 90vw"
            />
          </figure>

          <div className="career-intelligence-card__body">
            <div className="career-intelligence-block">
              <span className="career-intel-tag">Fit Reasoning</span>
              <p>{current.why}</p>
            </div>
            <div className="career-intelligence-block">
              <span className="career-intel-tag">Where it Stretches</span>
              <p>{current.stretch}</p>
            </div>
            <div className="career-intelligence-block">
              <span className="career-intel-tag">Development Action</span>
              <p>{current.strengthen}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProgressRoute() {
  const [activeStage, setActiveStage] = useState(0);
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

      <div className="progress-loop-display">
        <figure className="progress-loop-media">
          <ResponsiveImage
            media={publicMedia.progress[activeStage] || publicMedia.progress[0]}
            alt={stages[activeStage]?.name}
            sizes="(min-width: 1024px) 50vw, 92vw"
          />
        </figure>

        <div className="progress-loop-steps">
          {stages.map((st, i) => (
            <button
              key={st.name}
              type="button"
              className={`progress-step-item ${activeStage === i ? 'is-active' : ''}`}
              onClick={() => setActiveStage(i)}
            >
              <span className="progress-step-num">{i + 1}</span>
              <div className="progress-step-info">
                <h3>{st.name}</h3>
                <p>{st.copy}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodologyRoute() {
  const frameworks = [
    {
      name: 'Big Five Dimensions',
      desc: 'Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous spectrums rather than rigid binary types.',
    },
    {
      name: 'RIASEC Vocational Interests',
      desc: 'Measures Holland-style vocational affinity across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional work territories.',
    },
    {
      name: 'Work Values Hierarchy',
      desc: 'Ranks twelve distinct workplace motivations—such as autonomy, mastery, collaboration, and impact—to ensure environmental fit.',
    },
    {
      name: 'Career Signals & Capabilities',
      desc: 'Synthesizes practical problem-solving methods, technical depth, and learning agility from structured adaptive responses.',
    },
    {
      name: 'Deterministic Scoring Logic',
      desc: 'All core psychometric scores and career-fit metrics are computed deterministically through verified scoring rules, completely separate from AI generation.',
    },
    {
      name: 'AI Interpretive Boundary',
      desc: 'AI provides qualitative written narratives and contextual explanations. It never alters, fabricates, or replaces the underlying numeric calculations.',
    },
  ];

  return (
    <section className="secondary-route methodology-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Keep the frameworks separate.</h1>
        <p className="secondary-route__lead">
          We maintain rigorous boundaries between personality dimensions, vocational interests, work values, and career
          signals. Each framework answers a specific, independent question.
        </p>
      </header>

      <div className="methodology-grid">
        {frameworks.map((fw) => (
          <article key={fw.name} className="methodology-card">
            <h2 className="methodology-card__title">{fw.name}</h2>
            <p className="methodology-card__desc">{fw.desc}</p>
          </article>
        ))}
      </div>

      <div className="methodology-boundary-notice">
        <h3>Methodological Scope & Limitations</h3>
        <p>
          Personality Assessor is engineered for professional reflection and career exploration. It is not a clinical
          diagnostic instrument, an HR gatekeeping mechanism, or a guarantee of employment outcomes.
        </p>
      </div>
    </section>
  );
}

function TrustRoute() {
  const principles = [
    {
      title: 'Structured Core Scoring',
      body: 'Assessment scores and career comparisons are computed using deterministic scoring algorithms. AI does not score your personality.',
    },
    {
      title: 'Transparent AI Role',
      body: 'AI assists in analyzing context and drafting natural language summaries. When AI generation is delayed or unavailable, structured scores remain fully accessible.',
    },
    {
      title: 'Honest Confidence Signals',
      body: 'We distinguish between strong evidence, mixed signals, and preliminary readings. Confidence reflects data completeness, not absolute truth.',
    },
    {
      title: 'Account Data Governance',
      body: 'You maintain direct control over your stored assessments, CV context, and profile records with immediate export and deletion options.',
    },
  ];

  return (
    <section className="secondary-route trust-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Know what shaped the result.</h1>
        <p className="secondary-route__lead">
          We believe in total transparency regarding how your data is evaluated, where AI is applied, and what
          limitations exist in our psychometric models.
        </p>
      </header>

      <div className="trust-principles-list">
        {principles.map((item) => (
          <article key={item.title} className="trust-principle-card">
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <div className="trust-action-row">
        <Link className="public-cta-button" to="/privacy">
          Review privacy controls <Arrow />
        </Link>
      </div>
    </section>
  );
}

function PrivacyRoute() {
  const controls = [
    {
      label: 'Export Stored Data',
      desc: 'Download a complete JSON export of your profile, assessments, roadmap milestones, and analytics history at any time.',
    },
    {
      label: 'Remove Context & CV Data',
      desc: 'Purge uploaded resumes and parsed background context while preserving your baseline account settings.',
    },
    {
      label: 'Delete Single Assessments',
      desc: 'Selectively delete individual historical assessment sessions from your profile without losing your account history.',
    },
    {
      label: 'Permanent Account Deletion',
      desc: 'Irrevocably erase your entire account, credentials, and all associated analytical records across our databases.',
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

      <div className="privacy-controls-grid">
        {controls.map((item) => (
          <article key={item.label} className="privacy-control-card">
            <h2>{item.label}</h2>
            <p>{item.desc}</p>
          </article>
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
