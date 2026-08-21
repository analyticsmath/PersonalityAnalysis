import React from 'react';

export const DECISION_CHOICES = [
  { id: 'c1', text: 'Clarify responsibilities before committing work.' },
  { id: 'c2', text: 'Start a small test and learn from it.' },
  { id: 'c3', text: 'Bring the teams together and align priorities.' },
  { id: 'c4', text: 'Choose a direction and adjust as evidence arrives.' },
];

export const HomeDecisionChapter = ({ selectedChoice, onSelectChoice }) => {
  return (
    <section className="pa-home-decision" aria-label="Contextual Decision">
      <div className="pa-v7-grid">
        <div className="pa-home-decision__grid">
          <div className="pa-home-decision__prompt">
            <h2 className="pa-home-decision__h2">Context comes first.</h2>
            <p className="pa-home-decision__question">
              A project has a fixed deadline, unclear ownership and two teams waiting on a decision. What would you do first?
            </p>
            <p className="pa-home-decision__note">
              This public example is illustrative. It is not submitted to your account.
            </p>
            {selectedChoice && (
              <p className="pa-home-decision__note" style={{ color: 'var(--pa-carbon)', fontWeight: 500 }}>
                A response becomes one piece of evidence. The complete assessment uses many signals across multiple stages.
              </p>
            )}
          </div>

          <fieldset className="pa-home-decision__choices">
            <legend className="pa-home-decision__legend">
              Choose your primary action in this scenario
            </legend>
            {DECISION_CHOICES.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              return (
                <label
                  key={choice.id}
                  htmlFor={`decision-radio-${choice.id}`}
                  className={`pa-choice-item ${isSelected ? 'pa-choice-item--selected' : ''}`}
                >
                  <input
                    type="radio"
                    id={`decision-radio-${choice.id}`}
                    name="contextual-decision-choice"
                    value={choice.id}
                    checked={isSelected}
                    onChange={() => onSelectChoice(choice)}
                  />
                  <span className="pa-choice-item__label">{choice.text}</span>
                </label>
              );
            })}
          </fieldset>
        </div>
      </div>
    </section>
  );
};

export default HomeDecisionChapter;
