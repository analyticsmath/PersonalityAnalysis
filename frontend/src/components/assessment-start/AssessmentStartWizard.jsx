import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { FiCheckCircle } from 'react-icons/fi';
import ProgressStepper from '../ui/ProgressStepper';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import StepRole from './steps/StepRole';
import StepCV from './steps/StepCV';
import StepProfile from './steps/StepProfile';
import {
  ROLE_OPTIONS,
  useAssessmentWizard,
  WIZARD_STEPS,
} from '../../hooks/useAssessmentWizard';

const PROGRESS_STEPS = [
  { id: WIZARD_STEPS.profileType, label: 'Profile Type' },
  { id: WIZARD_STEPS.cvAnalysis, label: 'Analyze CV' },
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
    cvFile,
    setCvFile,
    parsedProfile,
    stepError,
    setStepError,
    analysisStatus,
    analysisMessages,
    analysisIndex,
    isBusy,
    isStarting,
    isUploading,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
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
        <StepCV
          cvFile={cvFile}
          onCvFileChange={(file) => {
            setStepError('');
            setCvFile(file);
          }}
          onBack={goToPreviousStep}
          onAnalyze={goToNextStep}
          isAnalyzeDisabled={!isStep2Valid}
          isAnalyzing={isUploading}
          analysisStatus={analysisStatus}
          analysisMessages={analysisMessages}
          analysisIndex={analysisIndex}
          errorMessage={stepError}
        />
      );
    }

    return (
      <StepProfile
        parsedProfile={parsedProfile}
        onBack={goToPreviousStep}
        onStartAssessment={goToNextStep}
        isStartDisabled={!isStep3Valid}
        isStarting={isStarting}
        errorMessage={stepError}
      />
    );
  }, [
    currentStep,
    cvFile,
    analysisIndex,
    analysisMessages,
    analysisStatus,
    goToNextStep,
    goToPreviousStep,
    isBusy,
    isStarting,
    isUploading,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    parsedProfile,
    setCvFile,
    setStepError,
    setUserRole,
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
            Your CV and profile context tune adaptive questions. After you begin, deterministic scoring produces Big Five,
            RIASEC, work values, and career signals. An optional AI narrative layers on top — it never replaces the
            numeric engine. CV text is used only for this session&apos;s personalization; avoid pasting highly sensitive
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
