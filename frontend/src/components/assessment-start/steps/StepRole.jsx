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
          What perspective are you bringing?
        </h1>
        <p className="assessment-setup-state__subtitle">
          Select your current professional frame to calibrate initial assessment questions.
        </p>
      </header>

      <div className="wizard-role-grid" role="radiogroup" aria-label="Select perspective">
        {roleOptions.map((role) => {
          const RoleIcon = ICON_BY_ROLE[role.value] || FiUser;
          const isActive = selectedRole === role.value;

          return (
            <button
              key={role.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`wizard-role-card ${isActive ? 'is-active' : ''}`}
              onClick={() => onSelectRole?.(role.value)}
            >
              <span className="wizard-role-card__icon" aria-hidden="true">
                <RoleIcon />
              </span>
              <div className="wizard-role-card__copy">
                <strong>{role.label}</strong>
                <span>{role.description}</span>
              </div>
              {isActive && (
                <span className="wizard-role-card__check" aria-hidden="true">
                  <FiCheck />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <footer className="assessment-setup-state__actions">
        <div />
        <Button onClick={onNext} disabled={isNextDisabled}>
          Next
        </Button>
      </footer>
    </section>
  );
};

export default StepRole;
