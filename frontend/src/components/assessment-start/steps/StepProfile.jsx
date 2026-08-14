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
      </header>

      {profileMode === 'manual' && manualProfile && (
        <div style={{ marginBottom: '1rem' }}>
          <ManualProfileSummary manualProfile={manualProfile} injection={injection} />
        </div>
      )}

      <div className="parsed-context-review">
        <div className="parsed-context-section">
          <h3>Detected Field / Discipline</h3>
          <p style={{ fontSize: '1.05rem', fontWeight: 550, margin: 0, color: 'var(--ink)' }}>
            {summary.field}
          </p>
        </div>

        <div className="parsed-context-section">
          <h3>Skills Evidenced</h3>
          <div className="parsed-context-tags">
            {summary.skills.length ? (
              summary.skills.map((skill) => (
                <span key={skill} className="parsed-context-tag">
                  {skill}
                </span>
              ))
            ) : (
              <span style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>No skills specified</span>
            )}
          </div>
        </div>

        <div className="parsed-context-section">
          <h3>Interests &amp; Priorities</h3>
          <div className="parsed-context-tags">
            {summary.interests.length ? (
              summary.interests.map((interest) => (
                <span key={interest} className="parsed-context-tag">
                  {interest}
                </span>
              ))
            ) : (
              <span style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>No interests specified</span>
            )}
          </div>
        </div>
      </div>

      {isStarting && (
        <p className="ui-message ui-message--info">Preparing your personalized questions…</p>
      )}
      {errorMessage && <p className="ui-message ui-message--error">{errorMessage}</p>}

      <footer className="assessment-question-actions">
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
          loadingLabel="Starting assessment…"
        >
          Begin assessment
        </Button>
      </footer>
    </section>
  );
};

export default StepProfile;
