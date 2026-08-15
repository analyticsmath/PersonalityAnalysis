import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
      name: 'Context Ingestion',
      statement: 'Verified background context provides an authentic baseline.',
      media: publicMedia.hero.dominant,
    },
    {
      id: 'questions',
      name: 'Adaptive Inversion',
      statement: 'Questions adapt to your real domain complexity and trade-offs.',
      media: publicMedia.worlds[0]?.media,
    },
    {
      id: 'readings',
      name: 'Four Independent Readings',
      statement: 'Personality, interests, values, and career signals remain uncollapsed.',
      media: publicMedia.hero.process,
    },
    {
      id: 'direction',
      name: 'Explainable Career Fit',
      statement: 'Inspect dimensional alignment, stretch areas, and growth paths.',
      media: publicMedia.careers[0]?.media,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px) and (pointer: fine)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'hiw-persistent-timeline',
            trigger: containerRef.current,
            start: 'top 80px',
            end: '+=280vh',
            pin: true,
            scrub: 0.35,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
              setActiveStep(idx);
            },
          },
        });

        steps.forEach((_, i) => {
          tl.addLabel(`step-${i}`);
          tl.to({}, { duration: 1 });
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, containerRef);

    return () => ctx.revert();
  }, [steps.length]);

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
            <div
              key={step.id}
              className={`hiw-step-row ${activeStep === idx ? 'is-active' : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <h2 className="hiw-step-name">{step.name}</h2>
              <p className="hiw-step-statement">{step.statement}</p>
            </div>
          ))}
        </div>

        <div className="hiw-visual-stage">
          <div className="hiw-visual-stage__frame">
            <figure className="hiw-visual-stage__media">
              {steps[activeStep]?.media && (
                <ResponsiveImage
                  media={steps[activeStep].media}
                  alt={steps[activeStep].name}
                  sizes="(min-width: 1024px) 48vw, 92vw"
                />
              )}
            </figure>
            <div className="hiw-visual-stage__caption">
              <span className="hiw-visual-stage__label">{steps[activeStep]?.name}</span>
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

          {/* Active Career Stage (No Badges / Open Typography) */}
          <div className="career-atlas-detail">
            <figure className="career-atlas-environment-media">
              {activeRole?.media && (
                <ResponsiveImage
                  media={activeRole.media}
                  alt={`Environment for ${activeRole.title}`}
                  sizes="(min-width: 1024px) 50vw, 92vw"
                />
              )}
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
                Recommendations represent dimensional alignment for career exploration, not an absolute hiring endorsement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Progress: Mixed-Scale Visual Journey ───────────────────────────────── */
function ProgressRoute() {
  const steps = [
    {
      id: 'gap',
      name: 'Gap Discovery',
      body: 'Identify specific dimensional stretches or unproven competencies between your current profile and target roles.',
      media: publicMedia.hero.dominant,
      scale: 'large',
    },
    {
      id: 'action',
      name: 'Deliberate Action',
      body: 'Engage in targeted initiatives designed to develop unproven capabilities through real constraints.',
      media: publicMedia.worlds[0]?.media,
      scale: 'detail',
    },
    {
      id: 'artifact',
      name: 'Visible Artifact Creation',
      body: 'Produce tangible deliverables—system architectures, codebases, research syntheses, or operational frameworks.',
      media: publicMedia.hero.process,
      scale: 'fragment',
    },
    {
      id: 'evidence',
      name: 'New Evidence Ingestion',
      body: 'Incorporate verified project deliverables and expanded work context back into your profile record.',
      media: publicMedia.hero.evidenceWall,
      scale: 'wide',
    },
    {
      id: 'recalibration',
      name: 'Profile Return',
      body: 'Re-calibrate dimensional scores and updated career alignment as your verified work portfolio expands.',
      media: publicMedia.careers[0]?.media,
      scale: 'end',
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

      {/* Mixed-Scale Visual Journey (No 01-05 Numbered Cards with Identical Silhouettes) */}
      <div className="progress-mixed-flow">
        {steps.map((st) => (
          <div key={st.id} className={`progress-moment progress-moment--${st.scale}`}>
            <div className="progress-moment-text">
              <h2 className="progress-moment-title">{st.name}</h2>
              <p className="progress-moment-body">{st.body}</p>
            </div>
            <figure className="progress-moment-media">
              {st.media && (
                <ResponsiveImage
                  media={st.media}
                  alt={st.name}
                  sizes="(min-width: 1024px) 44vw, 90vw"
                />
              )}
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 4. Methodology: Analytical Atlas ──────────────────────────────────────── */
function MethodologyRoute() {
  const [activeFramework, setActiveFramework] = useState('bigfive');

  const frameworks = [
    {
      id: 'bigfive',
      name: 'Big Five Spectrum',
      desc: 'Evaluates Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability as continuous spectrums on a 0–100 scale, rejecting arbitrary binary labels or archetypes.',
      scale: '0–100 Continuous Scale',
      basis: 'Empirical Psychometrics',
    },
    {
      id: 'riasec',
      name: 'RIASEC Vocational Territories',
      desc: 'Measures alignment across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional work environments to assess affinity with specific day-to-day operational tasks.',
      scale: '6 Distinct Operational Territories',
      basis: 'Holland Vocational Theory',
    },
    {
      id: 'values',
      name: 'Work Values Hierarchy',
      desc: 'Ranks core workplace motivations—such as Autonomy, Mastery, Purpose, and Collaboration—to identify cultural and operational preferences that sustain long-term engagement.',
      scale: '12 Ordered Motivational Dimensions',
      basis: 'Workplace Psychology',
    },
    {
      id: 'signals',
      name: 'Demonstrated Career Signals',
      desc: 'Synthesizes practical problem solving, technical depth, learning agility, and situational leadership derived directly from structured adaptive scenario responses.',
      scale: 'Synthesized Competency Vectors',
      basis: 'Behavioral Scenario Calibration',
    },
  ];

  const current = frameworks.find((f) => f.id === activeFramework) || frameworks[0];

  return (
    <section className="secondary-route methodology-atlas-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Keep the frameworks separate.</h1>
        <p className="secondary-route__lead">
          We maintain strict boundaries between personality dimensions, vocational interests, work values, and career signals. Each framework answers an independent question.
        </p>
      </header>

      {/* Analytical Reference Atlas (Left Index Rail + Right Native Representation Field) */}
      <div className="methodology-atlas-layout">
        <nav className="methodology-atlas-nav" aria-label="Methodology frameworks">
          {frameworks.map((fw) => (
            <button
              key={fw.id}
              type="button"
              className={`methodology-atlas-nav-btn ${activeFramework === fw.id ? 'is-active' : ''}`}
              onClick={() => setActiveFramework(fw.id)}
            >
              <span className="methodology-atlas-nav-title">{fw.name}</span>
            </button>
          ))}
        </nav>

        <div className="methodology-atlas-field">
          <div className="methodology-atlas-field__head">
            <h2 className="methodology-atlas-field__title">{current.name}</h2>
            <p className="methodology-atlas-field__desc">{current.desc}</p>
          </div>

          <div className="methodology-atlas-specs">
            <div className="methodology-spec-item">
              <span className="methodology-spec-label">Measurement Scale</span>
              <strong className="methodology-spec-value">{current.scale}</strong>
            </div>
            <div className="methodology-spec-item">
              <span className="methodology-spec-label">Theoretical Anchor</span>
              <strong className="methodology-spec-value">{current.basis}</strong>
            </div>
          </div>

          {/* Details Disclosure for In-depth Specifications */}
          <details className="methodology-details-disclosure">
            <summary className="methodology-details-summary">View calibration specifics &amp; formulas</summary>
            <div className="methodology-details-content">
              <p>
                Scores are calibrated deterministically using item-response weights bounded between 0 and 100.
                No qualitative LLM generation modifies numeric calculations.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Separation & Scope Boundary */}
      <div className="methodology-scope-footer">
        <div className="methodology-scope-block">
          <h3>Deterministic Scoring &amp; AI Separation</h3>
          <p>
            All core psychometric scores and career-fit metrics are computed deterministically through versioned algorithms. AI provides qualitative written summaries and context reflections; it never modifies, overrides, or fabricates numeric score outputs.
          </p>
        </div>
        <div className="methodology-scope-block">
          <h3>Scope &amp; Limitations</h3>
          <p>
            Personality Assessor is engineered for professional reflection and career exploration. It is not a clinical diagnostic tool, an HR gatekeeping test, or a guarantee of hiring outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 5. Trust: Inspectable Provenance Architecture ──────────────────────────── */
function TrustRoute() {
  return (
    <section className="secondary-route trust-provenance-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">See what shaped the result.</h1>
        <p className="secondary-route__lead">
          Clear separation between verified background context, deterministic psychometric computation, qualitative AI narrative assistance, and your direct data controls.
        </p>
      </header>

      {/* Single Inspectable Provenance Architecture */}
      <div className="trust-architecture-flow">
        <div className="trust-arch-step">
          <div className="trust-arch-step__head">
            <span className="trust-arch-step__marker" />
            <h2 className="trust-arch-step__title">1. Context Ingestion</h2>
          </div>
          <p className="trust-arch-step__body">
            CV documents and manual work history provide authentic starting anchors without forced zero-baselines.
          </p>
        </div>

        <div className="trust-arch-step">
          <div className="trust-arch-step__head">
            <span className="trust-arch-step__marker" />
            <h2 className="trust-arch-step__title">2. Deterministic Scoring</h2>
          </div>
          <p className="trust-arch-step__body">
            Big Five, RIASEC, Work Values, and Career Signals use versioned deterministic algorithms, never black-box guesses.
          </p>
        </div>

        <div className="trust-arch-step">
          <div className="trust-arch-step__head">
            <span className="trust-arch-step__marker" />
            <h2 className="trust-arch-step__title">3. Narrative Assistance</h2>
          </div>
          <p className="trust-arch-step__body">
            AI generates qualitative summaries and contextual reflections. It is strictly air-gapped from numeric scoring.
          </p>
        </div>

        <div className="trust-arch-step">
          <div className="trust-arch-step__head">
            <span className="trust-arch-step__marker" />
            <h2 className="trust-arch-step__title">4. Direct User Governance</h2>
          </div>
          <p className="trust-arch-step__body">
            You maintain full ownership. Export your complete data ledger, delete individual assessments, or erase your profile.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Privacy: Data-Control Map ──────────────────────────────────────────── */
function PrivacyRoute() {
  const commitments = [
    {
      title: 'Full Export Portability',
      body: 'Download your entire assessment history, scores, and context documents in open JSON and printable formats anytime.',
    },
    {
      title: 'Granular Record Deletion',
      body: 'Selectively remove individual assessments or uploaded resume documents without losing your account identity.',
    },
    {
      title: 'No Advertising or Model Training',
      body: 'Your psychometric data and career history are never sold to third parties or used to train public machine learning models.',
    },
    {
      title: 'Zero Permanent Lock-in',
      body: 'Close and permanently erase your account in one click. All associated scores and vectors are purged from active databases.',
    },
  ];

  return (
    <section className="secondary-route privacy-ledger-route" data-header-scene="light">
      <header className="secondary-route__header">
        <h1 className="secondary-route__title">Your data stays yours.</h1>
        <p className="secondary-route__lead">
          We treat psychometric and career records as sensitive personal data. You maintain direct control over ingestion, storage, export, and deletion.
        </p>
      </header>

      <div className="privacy-ledger-grid">
        {commitments.map((com) => (
          <div key={com.title} className="privacy-ledger-item">
            <h2 className="privacy-ledger-title">{com.title}</h2>
            <p className="privacy-ledger-body">{com.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Secondary Public Route Container ──────────────────────────────────────── */
export default function PublicMarketingPage({ route = 'how-it-works' }) {
  const renderRoute = () => {
    switch (route) {
      case 'how-it-works':
        return <HowItWorksRoute />;
      case 'career-intelligence':
        return <CareerIntelligenceRoute />;
      case 'progress':
        return <ProgressRoute />;
      case 'methodology':
        return <MethodologyRoute />;
      case 'trust':
        return <TrustRoute />;
      case 'privacy':
        return <PrivacyRoute />;
      default:
        return <HowItWorksRoute />;
    }
  };

  return <PublicLayout>{renderRoute()}</PublicLayout>;
}
