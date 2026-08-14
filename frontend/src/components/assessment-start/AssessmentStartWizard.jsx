import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import StepRole from './steps/StepRole';
import StepCV from './steps/StepCV';
import StepProfile from './steps/StepProfile';
import ProfileSourceSelector from '../manual-profile/ProfileSourceSelector';
import ManualProfileForm from '../manual-profile/ManualProfileForm';
import Button from '../ui/Button';
import {
  ROLE_OPTIONS,
  useAssessmentWizard,
  WIZARD_STEPS,
} from '../../hooks/useAssessmentWizard';
import '../../styles/assessment-product.css';

const AssessmentStartWizard = () => {
  const {
    currentStep,
    userRole,
    setUserRole,
    profileMode,
    setProfileMode,
    cvFile,
    setCvFile,
    cvConsent,
    setCvConsent,
    manualForm,
    setManualForm,
    manualConsent,
    setManualConsent,
    parsedProfile,
    stepError,
    setStepError,
    analysisStatus,
    analysisMessages,
    analysisIndex,
    isBusy,
    isStarting,
    isUploading,
    isManualSaving,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    lastManualProfile,
    lastInjection,
    goToPreviousStep,
    goToNextStep,
  } = useAssessmentWizard();

  const stepShellRef = useRef(null);
  const step2Analyzing = isUploading || isManualSaving;

  const stepView = useMemo(() => {
    if (currentStep === WIZARD_STEPS.profileType) {
      return (
        <StepRole
          roleOptions={ROLE_OPTIONS}
          selectedRole={userRole}
          onSelectRole={(role) => {
            setStepError('');
            setUserRole(role);
          }}
          onNext={goToNextStep}
          isNextDisabled={!isStep1Valid || isBusy}
        />
      );
    }

    if (currentStep === WIZARD_STEPS.cvAnalysis) {
      return (
        <section className="assessment-setup-state" aria-labelledby="wizard-setup-title">
          <header className="assessment-setup-state__header">
            <h1 id="wizard-setup-title" className="assessment-setup-state__title">
              Give the assessment some professional context.
            </h1>
            <p className="assessment-setup-state__subtitle">
              Both paths provide context for the adaptive assessment.
            </p>
          </header>

          <ProfileSourceSelector
            value={profileMode}
            onChange={setProfileMode}
            disabled={step2Analyzing}
          />

          {profileMode === 'cv' ? (
            <StepCV
              cvFile={cvFile}
              onCvFileChange={(file) => {
                setStepError('');
                setCvFile(file);
              }}
              consentAccepted={cvConsent}
              onConsentChange={(v) => {
                setStepError('');
                setCvConsent(v);
              }}
              onBack={goToPreviousStep}
              onAnalyze={goToNextStep}
              isAnalyzeDisabled={!isStep2Valid}
              isAnalyzing={step2Analyzing}
              analysisStatus={analysisStatus}
              analysisMessages={analysisMessages}
              analysisIndex={analysisIndex}
              errorMessage={stepError}
            />
          ) : (
            <div className="manual-profile-step-wrap">
              <ManualProfileForm
                value={manualForm}
                onChange={(next) => {
                  setStepError('');
                  setManualForm(next);
                }}
                consentAccepted={manualConsent}
                onConsentChange={(v) => {
                  setStepError('');
                  setManualConsent(v);
                }}
                onSubmit={goToNextStep}
                isSubmitting={step2Analyzing}
                disabled={step2Analyzing}
              />
              <footer className="assessment-question-actions">
                <Button type="button" variant="ghost" onClick={goToPreviousStep} disabled={step2Analyzing}>
                  Back
                </Button>
              </footer>
              {stepError && (
                <p className="ui-message ui-message--error" role="alert" aria-live="assertive">
                  {stepError}
                </p>
              )}
              {(analysisStatus === 'running' || analysisStatus === 'success') && (
                <p className="ui-message ui-message--neutral" role="status" aria-live="polite">
                  {analysisStatus === 'success' ? 'Profile saved.' : analysisMessages[analysisIndex]}
                </p>
              )}
            </div>
          )}
        </section>
      );
    }

    return (
      <StepProfile
        parsedProfile={parsedProfile}
        profileMode={profileMode}
        manualProfile={lastManualProfile}
        injection={lastInjection}
        onBack={goToPreviousStep}
        onStartAssessment={goToNextStep}
        isStartDisabled={!isStep3Valid}
        isStarting={isStarting}
        errorMessage={stepError}
      />
    );
  }, [
    analysisIndex,
    analysisMessages,
    analysisStatus,
    currentStep,
    cvConsent,
    cvFile,
    goToNextStep,
    goToPreviousStep,
    isBusy,
    isStarting,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    lastInjection,
    lastManualProfile,
    manualConsent,
    manualForm,
    parsedProfile,
    profileMode,
    setCvConsent,
    setCvFile,
    setManualConsent,
    setManualForm,
    setProfileMode,
    setStepError,
    setUserRole,
    step2Analyzing,
    stepError,
    userRole,
  ]);

  return (
    <main className="assessment-focused-page">
      <div className="assessment-focused-shell">
        <header className="assessment-quiet-header">
          <Link to="/" className="assessment-quiet-header__brand">
            Personality Assessor
          </Link>
          <span className="assessment-quiet-step-text">
            Step {currentStep} of 3
          </span>
          <Link to="/dashboard" className="public-text-action" style={{ fontSize: '0.875rem' }}>
            Exit
          </Link>
        </header>

        <div ref={stepShellRef} className="assessment-setup-content" key={currentStep} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0 60px' }}>
          {stepView}
        </div>
      </div>
    </main>
  );
};

export default AssessmentStartWizard;
