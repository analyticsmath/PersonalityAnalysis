import React, { useMemo } from 'react';
import Button from '../../ui/Button';
import ManualProfileSummary from '../../manual-profile/ManualProfileSummary';

const toList = (value = '') =>
  String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const StepProfile = ({
  parsedProfile,
  profileMode = 'cv',
  manualProfile = null,
  injection = null,
  onBack,
  onStartAssessment,
  isStartDisabled,
  isStarting,
  errorMessage,
}) => {
  const summary = useMemo(
    () => ({
      field: String(parsedProfile?.field || '').trim() || 'General',
      skills: toList(parsedProfile?.skills),
      interests: toList(parsedProfile?.interests),
    }),
    [parsedProfile]
  );

  return (
    <section className="assessment-setup-state" aria-labelledby="wizard-ready-title">
      <header className="assessment-setup-state__header">
        <h1 id="wizard-ready-title" className="assessment-setup-state__title">
          Review the context we&apos;ll use.
        </h1>
        <p className="assessment-setup-state__subtitle">
          {profileMode === 'manual'
            ? 'Manual profile is saved. Review detected signals and begin the adaptive assessment.'
            : 'CV analysis is complete. Review your detected profile and begin the assessment.'}
        </p>
        <p className="ui-message ui-message--neutral" role="status">
          Context source: {profileMode === 'manual' ? 'Manual entry' : 'CV upload'}
        </p>
      </header>

      {profileMode === 'manual' && (
        <div className="wizard-profile-ready" style={{ marginBottom: '1rem' }}>
          <ManualProfileSummary manualProfile={manualProfile} injection={injection} />
        </div>
      )}

      <div className="wizard-profile-ready">
        <div className="wizard-profile-ready__block">
          <h3>Detected field</h3>
          <p>{summary.field}</p>
        </div>

        <div className="wizard-profile-ready__block">
          <h3>Skills</h3>
          <div className="wizard-profile-ready__chips">
            {summary.skills.length ? (
              summary.skills.map((skill) => (
                <span key={skill} className="wizard-profile-ready__chip">
                  {skill}
                </span>
              ))
            ) : (
              <span className="wizard-profile-ready__empty">No skills detected</span>
            )}
          </div>
        </div>

        <div className="wizard-profile-ready__block">
          <h3>Interests</h3>
          <div className="wizard-profile-ready__chips">
            {summary.interests.length ? (
              summary.interests.map((interest) => (
                <span key={interest} className="wizard-profile-ready__chip">
                  {interest}
                </span>
              ))
            ) : (
              <span className="wizard-profile-ready__empty">No interests detected</span>
            )}
          </div>
        </div>
      </div>

      {isStarting && (
        <p className="ui-message ui-message--neutral">Preparing your personalized questions…</p>
      )}
      {errorMessage && <p className="ui-message ui-message--error">{errorMessage}</p>}

      <footer className="assessment-setup-state__actions">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={isStarting}
        >
          Back
        </Button>
        <Button
          onClick={onStartAssessment}
          disabled={isStartDisabled || isStarting}
          loading={isStarting}
        >
          Begin assessment
        </Button>
      </footer>
    </section>
  );
};

export default StepProfile;
