import React, { useState } from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';
import EvidenceStrip from '../../components/personality-v7/living-record/EvidenceStrip';
import CalibrationBaseline from '../../components/personality-v7/living-record/CalibrationBaseline';
import './EditorialMethodologyPage.css';

const METHOD_SECTIONS = [
  {
    id: 'big-five',
    title: '01 / Big Five Personality',
    heading: 'Continuous Dimensional Traits',
    body: 'Personality is evaluated along continuous dimensional spectrums (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) rather than reductive categorical type codes.',
  },
  {
    id: 'riasec',
    title: '02 / RIASEC Vocational Interests',
    heading: 'Holland Interest Typology',
    body: 'Vocational interest patterns are modeled across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional interest profiles to identify activities that provide natural engagement.',
  },
  {
    id: 'work-values',
    title: '03 / Work Values Architecture',
    heading: 'Work Environment Needs',
    body: 'Work values capture environmental and cultural prerequisites (Achievement, Independence, Recognition, Relationships, Support, Working Conditions), kept distinct from personality traits.',
  },
  {
    id: 'career-signals',
    title: '04 / Career Situational Signals',
    heading: 'Behavioral Execution Signals',
    body: 'Captures situational responses regarding project initiative, technical ambiguity handling, and cross-functional coordination.',
  },
  {
    id: 'validity',
    title: '05 / Scoring Validity & Confidence',
    heading: 'Deterministic Coverage Verification',
    body: 'Each score family produces an explicit validity rating (valid, partial, or insufficient_data) along with evidence counts and numerical confidence metrics.',
  },
  {
    id: 'weights',
    title: '06 / Career Fit Calibration',
    heading: 'Deterministic Weighting Matrix',
    body: 'Career fit comparison applies deterministic weighting across six layers: RIASEC (25%), Skills (25%), Work Values (20%), Personality (15%), Education (10%), and Goals (5%).',
  },
  {
    id: 'ai-role',
    title: '07 / Subordinate AI Layer',
    heading: 'Reflective Synthesis Only',
    body: 'Where enabled, generative AI provides narrative summaries and coaching reflections. AI is never permitted to modify deterministic scoring or career fit calculations.',
  },
  {
    id: 'governance',
    title: '08 / Limits & Non-Clinical Scope',
    heading: 'Professional Exploration Boundary',
    body: 'Personality Assessor is an inspectable career exploration system, not a clinical diagnostic tool. It does not provide medical evaluations or psychometric accreditation guarantees.',
  },
];

export const EditorialMethodologyPage = () => {
  const [activeSection, setActiveSection] = useState(METHOD_SECTIONS[0].id);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <article className="pa-method-room" aria-label="Methodology Calibration Room">
          {/* Header */}
          <header className="pa-method-room__header">
            <div className="pa-method-room__header-inner">
              <span className="pa-method-room__eyebrow">METHODOLOGY & CALIBRATION</span>
              <h1 className="pa-method-room__h1">Calibration Room</h1>
              <p className="pa-method-room__lead">
                Every calculation, framework relationship, and career weighting layer is inspectable and decoupled.
              </p>
            </div>
          </header>

          {/* Expanded Calibration Prototype Strip */}
          <section className="pa-method-room__strip-stage" aria-label="Model specimen schema">
            <div className="pa-method-room__strip-inner">
              <EvidenceStrip
                quote="“I clarify responsibilities before committing work.”"
                eyebrow="PRODUCT EVIDENCE SCHEMA"
                sourceLabel="MAPPED TO BIG FIVE + RIASEC + VALUES + SIGNALS"
                theme="carbon"
                variant="inspect"
                isInspecting={true}
                provenanceData={{
                  source: 'answer',
                  sourceId: 'initiative-pattern-intermediate',
                  dimension: 'bigFive',
                  key: 'conscientiousness',
                  direction: 'positive',
                  scoringSource: 'deterministic',
                }}
              />
            </div>
          </section>

          {/* Main Content Layout */}
          <div className="pa-method-room__body">
            <div className="pa-method-room__grid">
              {/* Sticky Table of Contents */}
              <aside className="pa-method-room__toc" aria-label="Methodology sections">
                <nav className="pa-method-room__toc-nav">
                  <span className="pa-method-room__toc-heading">FRAMEWORK SPECIFICATIONS</span>
                  <ol className="pa-method-room__toc-list">
                    {METHOD_SECTIONS.map((sec) => {
                      const isActive = activeSection === sec.id;
                      return (
                        <li key={sec.id}>
                          <a
                            href={`#${sec.id}`}
                            className={`pa-method-room__toc-link ${isActive ? 'is-active' : ''}`}
                            onClick={(e) => scrollToSection(e, sec.id)}
                          >
                            {sec.title}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </aside>

              {/* Technical Specifications */}
              <main className="pa-method-room__sections">
                {METHOD_SECTIONS.map((sec) => (
                  <section key={sec.id} id={sec.id} className="pa-method-room__sec">
                    <span className="pa-method-room__sec-num">{sec.title}</span>
                    <h2 className="pa-method-room__sec-h2">{sec.heading}</h2>
                    <p className="pa-method-room__sec-body">{sec.body}</p>

                    {sec.id === 'weights' && (
                      <div className="pa-method-room__baseline-box">
                        <CalibrationBaseline theme="mineral" />
                      </div>
                    )}
                  </section>
                ))}
              </main>
            </div>
          </div>
        </article>
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialMethodologyPage;
