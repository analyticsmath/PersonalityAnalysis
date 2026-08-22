import React, { useState } from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider, { useScrollContext } from '../../components/personality-v7/motion/SmoothScrollProvider';
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

const MethodologyInner = () => {
  const [activeSection, setActiveSection] = useState(METHOD_SECTIONS[0].id);
  const { scrollTo } = useScrollContext();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    scrollTo(`#${id}`, { offset: -80 });
  };

  return (
    <article className="pa-method-room" aria-label="Methodology Calibration Room" id="main-content">
      {/* Header */}
      <header className="pa-method-room__header">
        <div className="pa-method-room__header-inner">
          <span className="pa-method-room__meta-tag">CALIBRATION ROOM</span>
          <h1 className="pa-method-room__h1">Methodology & Framework Decoupling</h1>
          <p className="pa-method-room__lead">
            Every calculation, framework relationship, and career weighting layer is inspectable and decoupled.
          </p>
        </div>
      </header>

      {/* Model Specimen Evidence Strip */}
      <section className="pa-method-room__strip-stage" aria-label="Model specimen schema">
        <div className="pa-method-room__strip-inner">
          <EvidenceStrip
            quote="“I clarify responsibilities before committing work.”"
            eyebrow="PRODUCT EVIDENCE SCHEMA"
            sourceLabel="DECOUPLED EVIDENCE MAPPING"
            theme="carbon"
            variant="inspect"
            isInspecting={true}
            provenanceData={{
              source: 'answer',
              sourceId: 'technical-depth-intermediate',
              dimension: 'bigFive',
              key: 'conscientiousness',
              direction: 'positive',
              scoringSource: 'deterministic',
            }}
          />
        </div>
      </section>

      {/* Main Grid: Sticky Index + Technical Specifications */}
      <div className="pa-method-room__layout">
        <nav className="pa-method-room__nav" aria-label="Methodology sections">
          <div className="pa-method-room__nav-sticky">
            <span className="pa-method-room__nav-title">FRAMEWORK INDEX</span>
            <ul className="pa-method-room__nav-list">
              {METHOD_SECTIONS.map((sec) => {
                const isActive = sec.id === activeSection;
                return (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className={`pa-method-room__nav-link ${
                        isActive ? 'pa-method-room__nav-link--active' : ''
                      }`}
                      onClick={(e) => handleNavClick(e, sec.id)}
                    >
                      {sec.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <div className="pa-method-room__content">
          {METHOD_SECTIONS.map((sec) => (
            <section key={sec.id} id={sec.id} className="pa-method-room__section">
              <span className="pa-method-room__sec-num">{sec.title}</span>
              <h2 className="pa-method-room__sec-h2">{sec.heading}</h2>
              <p className="pa-method-room__sec-body">{sec.body}</p>

              {sec.id === 'weights' && (
                <div className="pa-method-room__baseline-wrap">
                  <CalibrationBaseline theme="mineral" />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export const EditorialMethodologyPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="dark-content" withFooter={true}>
        <MethodologyInner />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialMethodologyPage;
