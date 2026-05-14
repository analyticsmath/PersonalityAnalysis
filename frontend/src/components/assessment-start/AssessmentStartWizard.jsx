import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { FiCheckCircle } from 'react-icons/fi';
import ProgressStepper from '../ui/ProgressStepper';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
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

const PROGRESS_STEPS = [
  { id: WIZARD_STEPS.profileType, label: 'Profile Type' },
  { id: WIZARD_STEPS.cvAnalysis, label: 'Profile setup' },
  { id: WIZARD_STEPS.startAssessment, label: 'Start' },
];

const JOURNEY_STEPS = [
  { id: 'cv', label: 'CV & profile' },
  { id: 'adaptive', label: 'Adaptive questions' },
  { id: 'ocean', label: 'Personality scoring' },
  { id: 'career', label: 'Career intelligence' },
  { id: 'ai', label: 'AI report' },
];

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

  const prefersReducedMotion = usePrefersReducedMotion();
  const stepShellRef = useRef(null);

  const journeyActiveIndex =
    currentStep === WIZARD_STEPS.profileType ? 0 : currentStep === WIZARD_STEPS.cvAnalysis ? 0 : 1;

  useEffect(() => {
    if (!stepShellRef.current) {
      return () => {};
    }

    if (prefersReducedMotion) {
      gsap.set(stepShellRef.current, { autoAlpha: 1, y: 0, scale: 1 });
      return () => {};
    }

    gsap.fromTo(
      stepShellRef.current,
      { autoAlpha: 0, y: 18, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.36, ease: 'power2.out' }
    );

    return () => {};
  }, [currentStep, prefersReducedMotion]);

  const progressPercent = useMemo(() => {
    const maxIndex = PROGRESS_STEPS.length - 1;
    const activeIndex = PROGRESS_STEPS.findIndex((step) => step.id === currentStep);

    if (activeIndex <= 0) {
      return 0;
    }

    return Math.round((activeIndex / maxIndex) * 100);
  }, [currentStep]);

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
        <section className="assessment-step" aria-labelledby="wizard-profile-setup-title">
          <header className="assessment-step__header">
            <p className="assessment-step__eyebrow">Step 2</p>
            <h2 id="wizard-profile-setup-title" className="assessment-step__title">
              Profile setup
            </h2>
            <p className="assessment-step__subtitle">
              Upload a CV or enter your background manually. Both paths feed the same adaptive assessment engine.
            </p>
          </header>

          <ProfileSourceSelector value={profileMode} onChange={setProfileMode} disabled={step2Analyzing} />

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
              <footer className="assessment-step__actions">
                <Button type="button" variant="ghost" onClick={goToPreviousStep} disabled={step2Analyzing}>
                  Back
                </Button>
              </footer>
              {stepError ? (
                <p className="ui-message ui-message--error" role="alert" aria-live="assertive">
                  {stepError}
                </p>
              ) : null}
              {analysisStatus === 'running' || analysisStatus === 'success' ? (
                <p className="ui-message ui-message--neutral" role="status" aria-live="polite">
                  {analysisStatus === 'success' ? 'Profile saved.' : analysisMessages[analysisIndex]}
                </p>
              ) : null}
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
    <main
      className="app-page phase4-start-page assessment-wizard-page"
      data-avatar-section="start-main"
      data-avatar-label="Assessment Setup"
    >
      <div className="page-shell assessment-wizard-shell">
        <header className="assessment-wizard-intro">
          <p className="page-header__eyebrow">Adaptive assessment</p>
          <h1 className="page-header__title">CV-aware personality &amp; career intelligence</h1>
          <p className="assessment-journey-note">
            Your CV or manual profile context tunes adaptive questions. After you begin, evidence-based scoring produces
            Big Five, RIASEC, work values, and career signals. An optional AI narrative layers on top — it never
            replaces the numeric scores. This product offers guidance, not hiring or clinical decisions. Avoid pasting
            secrets you would not share with an HR screening tool.
          </p>
        </header>
        <ProgressStepper
          steps={JOURNEY_STEPS}
          activeIndex={journeyActiveIndex}
          aria-label="Full assessment journey"
        />
        <section
          className="assessment-wizard-progress"
          aria-label="Assessment wizard progress"
          data-avatar-section="start-progress"
        >
          <div className="assessment-wizard-progress__track" aria-hidden="true">
            <div
              className="assessment-wizard-progress__fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="assessment-wizard-progress__steps">
            {PROGRESS_STEPS.map((step, index) => {
              const isCompleted = step.id < currentStep;
              const isActive = step.id === currentStep;

              return (
                <div
                  key={step.id}
                  className={`assessment-wizard-progress__step ${
                    isCompleted ? 'is-complete' : isActive ? 'is-active' : ''
                  }`}
                >
                  <span className="assessment-wizard-progress__bullet" aria-hidden="true">
                    {isCompleted ? <FiCheckCircle /> : index + 1}
                  </span>
                  <span>{step.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section
          ref={stepShellRef}
          className="ui-card assessment-wizard-card"
          key={currentStep}
          data-avatar-section="start-step"
          data-avatar-target="start-assessment-cta"
        >
          {stepView}
        </section>
      </div>
    </main>
  );
};

export default AssessmentStartWizard;
