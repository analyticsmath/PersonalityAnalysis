import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';

export const PrivacyDocument = () => {
  const { privacy } = PUBLIC_CONTENT;

  return (
    <>
      <section className="pa-route-hero">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{privacy.title}</h1>
            <p>{privacy.lead}</p>
            <div style={{ fontSize: '13px', color: 'var(--pa-cool-600)', marginTop: '12px' }}>
              Effective Date: {privacy.lastUpdated}
            </div>
          </div>
        </div>
      </section>

      <div className="pa-container">
        <div className="pa-privacy-layout">
          <aside className="pa-privacy-toc" aria-label="Table of Contents">
            <span className="pa-privacy-toc-title">Contents</span>
            {privacy.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </aside>

          <article className="pa-privacy-document">
            {privacy.sections.map((section) => (
              <section key={section.id} id={section.id} className="pa-privacy-section">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
};

export default PrivacyDocument;
