import React from 'react';
import Button from '../ui/Button';

const FIELD_IDS = {
  currentStatus: 'mp-current-status',
  educationLevel: 'mp-education-level',
  fieldOfStudy: 'mp-field',
  skillsText: 'mp-skills',
  projectsText: 'mp-projects',
  experienceText: 'mp-exp',
  certificationsText: 'mp-cert',
  careerGoalsText: 'mp-goals',
  preferredDomainsText: 'mp-domains',
  workStyleText: 'mp-workstyle',
  profileSummary: 'mp-summary',
};

export default function ManualProfileForm({
  value,
  onChange,
  consentAccepted,
  onConsentChange,
  onSubmit,
  isSubmitting,
  disabled,
}) {
  const set = (key, v) => onChange?.({ ...value, [key]: v });

  return (
    <form
      className="manual-profile-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="manual-profile-form__grid">
        <label htmlFor={FIELD_IDS.currentStatus}>
          Current status <span aria-hidden="true">*</span>
        </label>
        <input
          id={FIELD_IDS.currentStatus}
          value={value.currentStatus}
          onChange={(e) => set('currentStatus', e.target.value)}
          disabled={disabled}
          required
        />

        <label htmlFor={FIELD_IDS.educationLevel}>
          Education level <span aria-hidden="true">*</span>
        </label>
        <input
          id={FIELD_IDS.educationLevel}
          value={value.educationLevel}
          onChange={(e) => set('educationLevel', e.target.value)}
          disabled={disabled}
          required
        />

        <label htmlFor={FIELD_IDS.fieldOfStudy}>
          Field of study / focus <span aria-hidden="true">*</span>
        </label>
        <input
          id={FIELD_IDS.fieldOfStudy}
          value={value.fieldOfStudy}
          onChange={(e) => set('fieldOfStudy', e.target.value)}
          disabled={disabled}
          required
        />

        <label htmlFor={FIELD_IDS.skillsText}>
          Skills <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={FIELD_IDS.skillsText}
          rows={3}
          value={value.skillsText}
          onChange={(e) => set('skillsText', e.target.value)}
          disabled={disabled}
          required
        />

        <label htmlFor={FIELD_IDS.projectsText}>Projects</label>
        <textarea
          id={FIELD_IDS.projectsText}
          rows={3}
          value={value.projectsText}
          onChange={(e) => set('projectsText', e.target.value)}
          disabled={disabled}
        />

        <label htmlFor={FIELD_IDS.experienceText}>Experience</label>
        <textarea
          id={FIELD_IDS.experienceText}
          rows={4}
          value={value.experienceText}
          onChange={(e) => set('experienceText', e.target.value)}
          disabled={disabled}
        />

        <label htmlFor={FIELD_IDS.certificationsText}>Certifications</label>
        <textarea
          id={FIELD_IDS.certificationsText}
          rows={2}
          value={value.certificationsText}
          onChange={(e) => set('certificationsText', e.target.value)}
          disabled={disabled}
        />

        <label htmlFor={FIELD_IDS.careerGoalsText}>Career goals</label>
        <textarea
          id={FIELD_IDS.careerGoalsText}
          rows={3}
          value={value.careerGoalsText}
          onChange={(e) => set('careerGoalsText', e.target.value)}
          disabled={disabled}
        />

        <label htmlFor={FIELD_IDS.preferredDomainsText}>Preferred domains / industries</label>
        <textarea
          id={FIELD_IDS.preferredDomainsText}
          rows={2}
          value={value.preferredDomainsText}
          onChange={(e) => set('preferredDomainsText', e.target.value)}
          disabled={disabled}
        />

        <label htmlFor={FIELD_IDS.workStyleText}>Work style</label>
        <textarea
          id={FIELD_IDS.workStyleText}
          rows={2}
          value={value.workStyleText}
          onChange={(e) => set('workStyleText', e.target.value)}
          disabled={disabled}
        />

        <label htmlFor={FIELD_IDS.profileSummary}>
          Profile summary <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={FIELD_IDS.profileSummary}
          rows={5}
          value={value.profileSummary}
          onChange={(e) => set('profileSummary', e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <label className="manual-profile-form__consent">
        <input
          type="checkbox"
          checked={Boolean(consentAccepted)}
          onChange={(e) => onConsentChange?.(e.target.checked)}
          disabled={disabled}
        />
        <span>
          I agree to use my profile details to personalize my assessment and career insights.
        </span>
      </label>

      <div className="manual-profile-form__actions">
        <Button type="submit" variant="primary" disabled={disabled || isSubmitting || !consentAccepted}>
          {isSubmitting ? 'Saving…' : 'Save manual profile'}
        </Button>
      </div>
    </form>
  );
}
