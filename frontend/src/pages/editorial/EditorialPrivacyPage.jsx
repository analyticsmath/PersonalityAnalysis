import React from 'react';
import PublicLayout from '../../components/personality-v7/chrome/PublicLayout';
import SmoothScrollProvider, { useScrollContext } from '../../components/personality-v7/motion/SmoothScrollProvider';
import { PUBLIC_CONTENT } from '../../content/personality-v7/publicContent';

export const PrivacyContent = () => {
  const data = PUBLIC_CONTENT.privacy;
  const { scrollTo } = useScrollContext();

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    scrollTo(`#${id}`, { offset: -80 });
  };

  return (
    <article className="pa-privacy-page" aria-label="Privacy Policy and Account Rights">
      <header className="pa-privacy-header" data-tone="light">
        <div className="pa-v7-grid">
          <div className="pa-privacy-header__content">
            <h1 className="pa-display-hero pa-privacy-header__h1">Privacy</h1>
            <p className="pa-privacy-header__lead">
              Read how Personality Assessor handles assessment data and the controls available to your account.
            </p>
          </div>
        </div>
      </header>

      <div className="pa-privacy-body" data-tone="light">
        <div className="pa-v7-grid pa-privacy-body__grid">
          {/* Sticky Contents Panel with Lenis-powered Anchors */}
          <aside className="pa-privacy-aside" aria-label="Privacy sections index">
            <nav className="pa-privacy-index-nav">
              <span className="pa-privacy-index-title">Sections</span>
              <ul className="pa-privacy-index-list">
                {data.sections.map((section, idx) => (
                  <li key={section.id} className="pa-privacy-index-item">
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => handleAnchorClick(e, section.id)}
                      className="pa-privacy-index-link"
                    >
                      <span className="pa-privacy-index-num">0{idx + 1}</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Legal Document Body */}
          <div className="pa-privacy-stream">
            {data.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="pa-privacy-section"
              >
                <h2 className="pa-heading-sub pa-privacy-section__title">
                  {section.title}
                </h2>
                <div className="pa-privacy-section__content">
                  <p>{section.content}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export const EditorialPrivacyPage = () => {
  return (
    <SmoothScrollProvider>
      <PublicLayout headerTheme="light-content" withFooter={true}>
        <PrivacyContent />
      </PublicLayout>
    </SmoothScrollProvider>
  );
};

export default EditorialPrivacyPage;
