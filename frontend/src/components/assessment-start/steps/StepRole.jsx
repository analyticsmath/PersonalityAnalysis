import React from 'react';
import { FiBriefcase, FiCheck, FiUser, FiUsers } from 'react-icons/fi';
import Button from '../../ui/Button';

const ICON_BY_ROLE = {
  student: FiUser,
  graduate: FiUsers,
  professional: FiBriefcase,
};

const StepRole = ({
  roleOptions = [],
  selectedRole = '',
  onSelectRole,
  onNext,
  isNextDisabled,
}) => {
  return (
    <section className="assessment-setup-state" aria-labelledby="wizard-role-title">
      <header className="assessment-setup-state__header">
        <h1 id="wizard-role-title" className="assessment-setup-state__title">
          Who are you approaching this as?
        </h1>
        <p className="assessment-setup-state__subtitle">
          Select your current professional frame to calibrate initial assessment questions.
        </p>
      </header>

      <div className="role-options-grid" role="radiogroup" aria-label="Select perspective">
        {roleOptions.map((role) => {
          const RoleIcon = ICON_BY_ROLE[role.value] || FiUser;
          const isActive = selectedRole === role.value;

          return (
            <button
              key={role.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`role-option-card ${isActive ? 'is-active is-selected' : ''}`}
              onClick={() => onSelectRole?.(role.value)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="adaptive-option-card__icon" aria-hidden="true">
                  <RoleIcon />
                </span>
                {isActive && (
                  <span style={{ color: 'var(--ink)' }} aria-hidden="true">
                    <FiCheck />
                  </span>
                )}
              </div>
              <strong className="role-option-card__title">{role.label}</strong>
              <p className="role-option-card__desc">{role.description}</p>
            </button>
          );
        })}
      </div>

      <footer className="assessment-question-actions">
        <div />
        <Button onClick={onNext} disabled={isNextDisabled}>
          Next
        </Button>
      </footer>
    </section>
  );
};

export default StepRole;
