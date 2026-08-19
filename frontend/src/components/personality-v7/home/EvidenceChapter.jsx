import React from 'react';

export const EVIDENCE_ROWS = [
  { label: 'Context', value: 'Cross-functional delivery' },
  { label: 'Observed pattern', value: 'Clarifies before committing' },
  { label: 'Role anchor', value: 'System ownership' },
  { label: 'Trade-off', value: 'Speed ↔ certainty' },
];

const OPTIONS = [
  { id: 'map-constraints', label: 'Map the constraints' },
  { id: 'ask-context', label: 'Ask for missing context' },
  { id: 'prototype-direction', label: 'Prototype a direction' },
];

export const OpeningQuestionFieldset = () => (
  <fieldset>
    <legend>When the brief is unclear, what do you do first?</legend>
    <div className="pa-opening__options">
      {OPTIONS.map((option) => (
        <label key={option.id} className="pa-opening__option" htmlFor={`pa-opening-${option.id}`}>
          <input id={`pa-opening-${option.id}`} type="radio" name="pa-opening-question" value={option.id} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

// Kept as a focused contract surface for existing unit tests; it is not mounted on the homepage.
export const EvidenceChapter = () => (
  <section className="pa-v7-chapter-evidence" aria-label="Example adaptive question">
    <form className="pa-opening__question pa-opening__question--standalone">
      <OpeningQuestionFieldset />
    </form>
  </section>
);

export default EvidenceChapter;
