// frontend/src/components/editorial/ChapterAdaptiveAssessment.jsx
// Personality Assessor — Chapter 2: Adaptive Assessment (Reference B Module 1)

import React, { useState } from 'react';
import { EDITORIAL_CONTENT } from '../../content/editorial/editorialContent';
import { EDITORIAL_MEDIA_ASSETS } from '../../content/editorial/editorialMedia';
import '../../styles/editorial/editorial-chapters.css';

export default function ChapterAdaptiveAssessment() {
  const { chapterTag, headline, lead, sampleQuestion, features } = EDITORIAL_CONTENT.adaptive;
  const { adaptive } = EDITORIAL_MEDIA_ASSETS.chapters;

  const [activeAccordion, setActiveAccordion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <section id="adaptive-chapter" className="ed-chapter-container" aria-labelledby="adaptive-headline">
      <div className="ed-chapter-module">
        <div className="ed-adaptive-chapter">
          {/* Left Column: Headline & Direct Explainer */}
          <div className="ed-adaptive__info">
            <span className="ed-tag">{chapterTag}</span>
            <h2 id="adaptive-headline" className="ed-h2">
              {headline}
            </h2>
            <p className="ed-lead">
              {lead}
            </p>

            <div className="ed-adaptive__accordion" role="tablist">
              {features.map((feature, idx) => (
                <div
                  key={feature.title}
                  className={`ed-adaptive__accordion-item ${
                    activeAccordion === idx ? 'ed-adaptive__accordion-item--active' : ''
                  }`}
                  onClick={() => setActiveAccordion(idx)}
                  role="tab"
                  tabIndex={0}
                  aria-selected={activeAccordion === idx}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveAccordion(idx);
                    }
                  }}
                >
                  <div className="ed-adaptive__accordion-title">{feature.title}</div>
                  <p className="ed-adaptive__accordion-desc">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contextual Photography with Live Question UI Overlay */}
          <div className="ed-adaptive__visual">
            <img
              src={adaptive.src}
              srcSet={adaptive.srcSet}
              sizes="(max-width: 991px) 100vw, 55vw"
              alt={adaptive.title}
              className="ed-adaptive__image"
              loading="lazy"
            />

            {/* Floating Live Question UI Overlay (~25% of surface) */}
            <div className="ed-adaptive__question-overlay" role="region" aria-label="Interactive question preview">
              <div className="ed-adaptive__q-meta">
                <span className="ed-adaptive__q-tag">{sampleQuestion.domain}</span>
                <span className="ed-adaptive__q-badge">Adaptive Sequence</span>
              </div>

              <p className="ed-adaptive__q-prompt">
                {sampleQuestion.context}
              </p>

              <div className="ed-adaptive__q-options" role="radiogroup" aria-label="Sample trade-off responses">
                {sampleQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <div
                      key={opt.id}
                      className={`ed-adaptive__q-option ${
                        isSelected ? 'ed-adaptive__q-option--selected' : ''
                      }`}
                      onClick={() => setSelectedOption(opt.id)}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedOption(opt.id);
                        }
                      }}
                    >
                      <span>{opt.label}</span>
                      <span className="ed-adaptive__q-option-dot" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
