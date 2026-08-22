import React, { useState, useEffect, useRef } from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider from '../../components/personality-v7/motion/SmoothScrollProvider';

const FRAMEWORK_SECTIONS = [
  {
    id: 'big-five',
    title: 'Big Five',
    copy: 'Personality is represented through continuous dimensions (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) rather than a rigid four-letter type. Dimensions serve as one layer of evidence, not as a permanent label.',
  },
  {
    id: 'riasec',
    title: 'RIASEC',
    copy: 'Vocational interests are modeled across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional interest profiles to discover patterns in what tasks naturally hold interest.',
  },
  {
    id: 'work-values',
    title: 'Work Values',
    copy: 'Work values identify conditions and outcomes that matter in a professional environment (Achievement, Independence, Recognition, Relationships, Support, Working Conditions), kept conceptually separate from personality and interests.',
  },
  {
    id: 'career-context',
    title: 'Career Context',
    copy: 'Responses and professional situation notes provide supporting evidence about how someone approaches work under specific real-world conditions.',
  },
  {
    id: 'comparison',
    title: 'Comparison Logic',
    copy: 'The application compares user evidence against curated role models using deterministic multi-layer comparison logic across distinct evidence layers, avoiding black-box opaque score generation.',
  },
  {
    id: 'cv',
    title: 'CV Context',
    copy: 'When a user chooses to provide a CV, professional history is extracted to inform context. CV analysis does not constitute formal credential verification.',
  },
  {
    id: 'ai',
    title: 'AI Assistance',
    copy: 'Where configured, AI provides narrative explanations, coaching prompts, or reflective summaries. The core scoring and multi-layer psychometric models operate independently of AI availability.',
  },
  {
    id: 'limits',
    title: 'Limits & Governance',
    copy: 'Personality Assessor is an inspectable career exploration tool, not a medical or clinical assessment system. It does not claim formal psychometric accreditation, guaranteed career fit, or unsupported percentage precision.',
  },
];

export const MethodologyContent = () => {
  const [activeSectionId, setActiveSectionId] = useState(FRAMEWORK_SECTIONS[0].id);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    if (typeof window === 'undefined' || !window.IntersectionObserver) return;

    observerRef.current = new window.IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    });

    FRAMEWORK_SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="pa-methodology-page" aria-label="Methodology Reading Room">
      {/* Header */}
      <header className="pa-methodology-header" data-tone="light">
        <div className="pa-v7-grid">
          <div className="pa-methodology-header__content">
            <h1 className="pa-display-hero pa-methodology-header__h1">
              See how each reading is constructed.
            </h1>
            <p className="pa-methodology-header__lead">
              Personality Assessor keeps multi-layer psychometric frameworks inspectable and decoupled so users can verify how interpretations are assembled.
            </p>
          </div>
        </div>
      </header>

      {/* Main Tri-Column Reading Room Layout */}
      <div className="pa-methodology-body" data-tone="light">
        <div className="pa-v7-grid pa-methodology-body__grid">
          {/* Left Column: Curved Vertical Index */}
          <aside className="pa-methodology-aside-nav" aria-label="Methodology sections index">
            <nav className="pa-methodology-index-list">
              {FRAMEWORK_SECTIONS.map((sec, idx) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`pa-methodology-index-item ${isActive ? 'pa-methodology-index-item--active' : ''}`}
                  >
                    <span className="pa-methodology-index-num">0{idx + 1}</span>
                    <span className="pa-methodology-index-label">{sec.title}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Center 7–8 Columns: Editorial Reading Stream */}
          <main className="pa-methodology-stream">
            {FRAMEWORK_SECTIONS.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="pa-methodology-section"
              >
                <h2 className="pa-heading-major pa-methodology-section__title">
                  {sec.title}
                </h2>
                <p className="pa-methodology-section__copy">
                  {sec.copy}
                </p>
              </section>
            ))}
          </main>

          {/* Right Column: Evolving Framework Diagram (Direct in Page Field) */}
          <aside className="pa-methodology-diagram" aria-hidden="true">
            <div className="pa-methodology-diagram__nodes">
              {FRAMEWORK_SECTIONS.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`pa-diagram-node ${isActive ? 'pa-diagram-node--active' : ''}`}
                  >
                    <div className="pa-diagram-node__dot" />
                    <span className="pa-diagram-node__name">{sec.title}</span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export const EditorialMethodologyPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        <MethodologyContent />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialMethodologyPage;
