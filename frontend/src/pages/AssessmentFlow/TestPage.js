import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import Loader from '../../components/ui/Loader';
import LoaderOverlay from '../../components/ui/LoaderOverlay';
import QuestionRenderer from '../../components/assessment/QuestionRenderer';
import AccessibleStatus from '../../components/a11y/AccessibleStatus';
import { useAuth } from '../../hooks/useAuth';
import {
  useAdaptiveQuestionQuery,
  usePreviousAdaptiveQuestionMutation,
} from '../../hooks/useAssessmentFlow';
import useAssessmentSessionMachine from '../../hooks/useAssessmentSessionMachine';
import { clearQuestionDraft, readAssessmentFlowState, readQuestionDraft, saveAssessmentFlowState, saveQuestionDraft } from '../../utils/assessmentFlowStorage';
import { AVATAR_EVENTS, useAvatarEvents } from '../../components/avatar/AvatarEvents';
import '../../styles/assessment-product.css';

/** Same gate as the adaptive question polling effect (exported for tests). */
export function shouldScheduleAdaptiveQuestionPoll({
  questionQueryWaiting,
  question,
  sessionId,
}) {
  return Boolean(questionQueryWaiting && !question && Boolean(sessionId));
}

const AdaptiveAssessmentTestPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const auth = useAuth();

  const localState = useMemo(() => readAssessmentFlowState(auth.userId) || {}, [auth.userId]);
  const sessionFromQuery = searchParams.get('session') || '';
  const sessionFromStorage = localState?.sessionId || '';
  const sessionId = sessionFromQuery || sessionFromStorage;

  const questionQuery = useAdaptiveQuestionQuery(sessionId, Boolean(sessionId));
  const refetchQuestion = questionQuery.refetch;
  const assessmentMachine = useAssessmentSessionMachine();
  const previousMutation = usePreviousAdaptiveQuestionMutation();
  const { emit } = useAvatarEvents();

  const [likertValue, setLikertValue] = useState(0);
  const [scaleValue, setScaleValue] = useState(0);
  const [optionId, setOptionId] = useState('');
  const [textValue, setTextValue] = useState('');
  const [exampleValue, setExampleValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [questionStartAt, setQuestionStartAt] = useState(Date.now());
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  const [recoveryState, setRecoveryState] = useState('idle');
  const recoveryBannerTimerRef = useRef(0);

  const handleRecoverSession = useCallback(async () => {
    setRecoveryState('recovering');
    try {
      await assessmentMachine.recoverSession();
      setRecoveryState('recovered');
      window.clearTimeout(recoveryBannerTimerRef.current);
      recoveryBannerTimerRef.current = window.setTimeout(() => setRecoveryState('idle'), 5000);
    } catch (error) {
      setRecoveryState('failed');
    }
  }, [assessmentMachine]);

  const progressBarRef = useRef(null);
  const questionContainerRef = useRef(null);
  const questionRef = useRef(null);
  const draftTimerRef = useRef(0);

  const stage = String(assessmentMachine.stage || questionQuery.data?.session?.stage || 'questionnaire').toLowerCase();
  const question = questionQuery.data?.question || null;
  const waitingForNextQuestion = shouldScheduleAdaptiveQuestionPoll({
    questionQueryWaiting: Boolean(questionQuery.data?.waitingForNextQuestion),
    question,
    sessionId,
  });

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  useEffect(() => {
    if (!sessionId) {
      navigate('/assessment/start', { replace: true });
      return;
    }

    if (stage === 'behavior') {
      navigate(`/assessment/behavior?session=${sessionId}`, { replace: true });
      return;
    }

    if (stage === 'result') {
      navigate(`/assessment/result?session=${sessionId}`, { replace: true });
    }
  }, [stage, sessionId, navigate]);

  useEffect(() => {
    if (!sessionId || !questionQuery.data?.session?.stage) {
      return;
    }

    saveAssessmentFlowState(auth.userId, {
      sessionId,
      stage: questionQuery.data.session.stage,
      userRole: questionQuery.data?.session?.userRole || localState.userRole,
      userProfile: questionQuery.data?.session?.userProfile || localState.userProfile,
      inputMode: localState.inputMode || 'cv',
    });
  }, [auth.userId, localState.inputMode, localState.userProfile, localState.userRole, questionQuery.data, sessionId]);

  useEffect(() => {
    if (!waitingForNextQuestion) {
      return () => {};
    }

    const timer = window.setInterval(() => {
      refetchQuestion();
    }, 1800);

    return () => {
      window.clearInterval(timer);
    };
  }, [refetchQuestion, waitingForNextQuestion]);

  useEffect(() => {
    setLikertValue(0);
    setScaleValue(0);
    setOptionId('');
    setTextValue('');
    setExampleValue('');
    setFeedback('');
    setQuestionStartAt(Date.now());

    const activeQuestionId = String(question?.questionId || question?.id || '').trim();
    if (sessionId && activeQuestionId) {
      const draft = readQuestionDraft({
        userId: auth.userId,
        sessionId,
        questionId: activeQuestionId,
      });

      if (draft) {
        setLikertValue(Number(draft.likertValue || 0));
        setScaleValue(Number(draft.scaleValue || 0));
        setOptionId(String(draft.optionId || ''));
        setTextValue(String(draft.textValue || ''));
        setExampleValue(String(draft.exampleValue || ''));
      }
    }

    if (!questionContainerRef.current || prefersReducedMotion) {
      return;
    }

    gsap.fromTo(
      questionContainerRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' }
    );
  }, [auth.userId, question?.questionId, question?.id, question?.sequence, question?.scaleMin, prefersReducedMotion, sessionId]);

  const persistProgressSnapshot = useCallback(
    ({ showMessage = false } = {}) => {
      const activeQuestion = questionRef.current;
      const activeQuestionId = String(activeQuestion?.questionId || activeQuestion?.id || '').trim();
      if (!sessionId || !activeQuestionId) {
        return false;
      }

      const hasDraftContent = Boolean(
        (activeQuestion?.type === 'likert' && Number(likertValue || 0) > 0) ||
          (activeQuestion?.type === 'scale' && Number(scaleValue || 0) > 0) ||
          (['mcq', 'scenario'].includes(activeQuestion?.type) && String(optionId || '').trim()) ||
          (['text', 'scenario'].includes(activeQuestion?.type) && String(textValue || '').trim()) ||
          (activeQuestion?.expectsExample && String(exampleValue || '').trim())
      );

      saveAssessmentFlowState(auth.userId, {
        sessionId,
        stage: 'questionnaire',
      });

      if (hasDraftContent) {
        saveQuestionDraft({
          userId: auth.userId,
          sessionId,
          questionId: activeQuestionId,
          payload: {
            type: String(activeQuestion?.type || ''),
            likertValue: Number(likertValue || 0),
            scaleValue: Number(scaleValue || 0),
            optionId: String(optionId || ''),
            textValue: String(textValue || ''),
            exampleValue: String(exampleValue || ''),
          },
        });
      } else {
        clearQuestionDraft({
          userId: auth.userId,
          sessionId,
          questionId: activeQuestionId,
        });
      }

      if (showMessage) {
        setStatusNote('Progress saved. You can continue anytime.');
      }

      return true;
    },
    [auth.userId, exampleValue, likertValue, optionId, scaleValue, sessionId, textValue]
  );

  const handleSaveProgress = useCallback(() => {
    setIsSavingProgress(true);
    const saved = persistProgressSnapshot({ showMessage: true });
    if (!saved) {
      setStatusNote('No active question to save yet.');
    }

    window.setTimeout(() => {
      setIsSavingProgress(false);
    }, 260);
  }, [persistProgressSnapshot]);

  const handleSaveAndExit = useCallback(() => {
    persistProgressSnapshot({ showMessage: false });
    navigate('/dashboard');
  }, [navigate, persistProgressSnapshot]);

  const progress = useMemo(() => {
    if (!question) return 0;
    return Math.round(((question.index + 1) / Math.max(question.total, 1)) * 100);
  }, [question]);

  useEffect(() => {
    if (!progressBarRef.current) return;
    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: 'power2.out',
    });
  }, [progress, prefersReducedMotion]);

  const canSubmit = useMemo(() => {
    if (!question) return false;

    if (question.type === 'likert') {
      return likertValue >= 1 && likertValue <= 5;
    }

    if (question.type === 'scale') {
      const min = Number(question.scaleMin || 1);
      const max = Number(question.scaleMax || 10);
      return scaleValue >= min && scaleValue <= max;
    }

    if (question.type === 'mcq') {
      return Boolean(optionId);
    }

    if (question.type === 'text') {
      if (textValue.trim().length < 4) return false;
      if (question.expectsExample && exampleValue.trim().length < 4) return false;
      return true;
    }

    if (question.type === 'scenario') {
      return Boolean(optionId || textValue.trim().length >= 4);
    }

    return false;
  }, [question, likertValue, scaleValue, optionId, textValue, exampleValue]);

  const elapsedTimeMs = useCallback(() => Math.max(300, Date.now() - questionStartAt), [questionStartAt]);

  const buildPayload = useCallback(() => {
    const activeQuestion = questionRef.current;
    if (!activeQuestion) return null;

    const normalizedQuestionId = String(activeQuestion.id || activeQuestion.questionId || '').trim();
    const sequence = Number(activeQuestion.sequence || activeQuestion.index + 1 || 1);
    const selectedOption = (activeQuestion.options || []).find(
      (item) => String(item.id || '') === String(optionId)
    );

    const basePayload = {
      sessionId,
      questionId: normalizedQuestionId,
      questionSequence: sequence,
      currentQuestion: {
        id: normalizedQuestionId,
        questionId: normalizedQuestionId,
        sequence,
      },
      prompt: String(activeQuestion.text || '').trim(),
      type: String(activeQuestion.type || '').toLowerCase(),
      trait: activeQuestion.trait || activeQuestion.traitTarget || activeQuestion.traitFocus || '',
      category: activeQuestion.category || '',
      plannerCategory: activeQuestion.plannerCategory || activeQuestion.category || '',
      stage: activeQuestion.stage || '',
      answerTimeMs: elapsedTimeMs(),
    };

    if (activeQuestion.type === 'likert') {
      return {
        ...basePayload,
        value: likertValue,
        answer: {
          value: likertValue,
          normalizedScore: likertValue,
        },
      };
    }

    if (activeQuestion.type === 'scale') {
      return {
        ...basePayload,
        value: scaleValue,
        answer: {
          value: scaleValue,
        },
      };
    }

    if (activeQuestion.type === 'mcq') {
      return {
        ...basePayload,
        optionId,
        optionLabel: selectedOption?.label || '',
        answer: {
          optionId,
          optionLabel: selectedOption?.label || '',
          normalizedScore: Number(selectedOption?.weight || 3),
        },
      };
    }

    if (activeQuestion.type === 'text') {
      return {
        ...basePayload,
        text: textValue.trim(),
        example: exampleValue.trim(),
        answer: {
          text: textValue.trim(),
          example: exampleValue.trim(),
        },
      };
    }

    if (activeQuestion.type === 'scenario') {
      return {
        ...basePayload,
        optionId,
        optionLabel: selectedOption?.label || '',
        text: textValue.trim(),
        example: exampleValue.trim(),
        answer: {
          optionId,
          optionLabel: selectedOption?.label || '',
          text: textValue.trim(),
          example: exampleValue.trim(),
          normalizedScore: Number(selectedOption?.weight || 3),
        },
      };
    }

    return null;
  }, [elapsedTimeMs, exampleValue, likertValue, optionId, scaleValue, sessionId, textValue]);

  const submitAnswer = useCallback(async () => {
    if (!questionRef.current) return;

    if (!canSubmit) {
      setFeedback('Complete the required response fields before continuing.');
      return;
    }

    setFeedback('');
    setStatusNote('');

    try {
      const submissionPayload = buildPayload();
      if (!submissionPayload) return;

      clearQuestionDraft({
        userId: auth.userId,
        sessionId,
        questionId: submissionPayload.questionId,
      });

      const payload = await assessmentMachine.submitAnswer({
        sessionId,
        payload: submissionPayload,
      });

      if (payload.completedAssessment) {
        saveAssessmentFlowState(auth.userId, {
          sessionId,
          stage: 'result',
        });
        navigate(`/assessment/result?session=${sessionId}`);
        return;
      }

      if (payload.completedQuestionnaire) {
        if (payload.session?.stage === 'behavior') {
          navigate(`/assessment/behavior?session=${sessionId}`);
          return;
        }
        navigate(`/assessment/result?session=${sessionId}`);
        return;
      }

      if (payload.refiningProfile && payload.refiningMessage) {
        setStatusNote(payload.refiningMessage);
        return;
      }

      if (payload.waitingForNextQuestion) {
        setStatusNote('Preparing your next questions…');
        refetchQuestion();
        return;
      }
    } catch (error) {
      setFeedback(error.message || 'Unable to save answer. Please retry.');
    }
  }, [assessmentMachine, auth.userId, buildPayload, canSubmit, navigate, refetchQuestion, sessionId]);

  const goToPrevious = useCallback(async () => {
    if (!sessionId || previousMutation.isPending) return;

    setFeedback('');
    setStatusNote('');

    try {
      await previousMutation.mutateAsync(sessionId);
    } catch (error) {
      setFeedback(error.message || 'Unable to load previous question.');
    }
  }, [previousMutation, sessionId]);

  const isResultGenerationPending =
    assessmentMachine.isMutating &&
    Boolean(question) &&
    Number(question.sequence || question.index + 1 || 1) >= Number(question.total || 1);

  const showRecoveryBanner = recoveryState === 'recovered';
  const showRecoveryFailure = recoveryState === 'failed';

  useEffect(() => {
    if (!sessionId || !question) return () => {};

    window.clearTimeout(draftTimerRef.current);
    draftTimerRef.current = window.setTimeout(() => {
      persistProgressSnapshot({ showMessage: false });
    }, 650);

    return () => {
      window.clearTimeout(draftTimerRef.current);
    };
  }, [exampleValue, likertValue, optionId, persistProgressSnapshot, question, scaleValue, sessionId, textValue]);

  if (questionQuery.isPending) {
    return (
      <main className="app-page assessment-focused-page">
        <div className="page-shell assessment-focused-shell">
          <div className="assessment-loading-panel">
            <Loader label="Preparing your questions…" variant="question" />
            <Skeleton height="24px" />
            <Skeleton height="78px" />
          </div>
        </div>
      </main>
    );
  }

  if (waitingForNextQuestion) {
    return (
      <main className="app-page assessment-focused-page">
        <div className="page-shell assessment-focused-shell">
          <div className="assessment-loading-panel">
            <Loader label="Preparing your next questions…" variant="question" />
            <p className="ui-message ui-message--neutral">
              We are personalizing the next set of questions based on your answers so far.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!question || questionQuery.isError) {
    return (
      <main className="app-page assessment-focused-page">
        <div className="page-shell assessment-focused-shell">
          <div className="assessment-error-panel">
            <h2>Unable to load question</h2>
            <p className="ui-message ui-message--error">
              {questionQuery.error?.message || 'Question session is unavailable.'}
            </p>
            <Button onClick={() => navigate('/assessment/start')}>Back to Start</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page assessment-focused-page">
      <LoaderOverlay
        visible={isResultGenerationPending}
        message="Putting the evidence together..."
      />

      <div className="assessment-focused-shell">
        {/* Top Quiet Chrome */}
        <header className="assessment-quiet-header">
          <div className="assessment-quiet-header__brand">
            <span className="public-brand__name">Personality Assessor</span>
          </div>

          <div className="assessment-quiet-header__progress" aria-label="Question progress">
            <div className="assessment-quiet-track" aria-hidden="true">
              <div className="assessment-quiet-fill" ref={progressBarRef} />
            </div>
            <span className="assessment-quiet-step-text">
              Question {question.sequence || question.index + 1} of {question.total}
            </span>
          </div>

          <div className="assessment-quiet-header__actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRecoverSession}
              disabled={assessmentMachine.isMutating || recoveryState === 'recovering'}
              data-testid="assessment-recover-session"
              aria-label="Recover session"
            >
              Recover
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveProgress}
              loading={isSavingProgress}
              disabled={questionQuery.isPending}
            >
              Save progress
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSaveAndExit}>
              Save &amp; exit
            </Button>
          </div>
        </header>

        {/* Center: Question and Response Area */}
        <section className="assessment-question-stage" ref={questionContainerRef}>
          {question.uiHint && (
            <p className="assessment-question-hint">{question.uiHint}</p>
          )}

          <h1 className="assessment-question-text">{question.text}</h1>

          <div className="assessment-response-container">
            <QuestionRenderer
              question={question}
              likertValue={likertValue}
              onLikertChange={setLikertValue}
              optionId={optionId}
              onOptionChange={setOptionId}
              scaleValue={scaleValue}
              onScaleChange={setScaleValue}
              textValue={textValue}
              onTextChange={setTextValue}
              exampleValue={exampleValue}
              onExampleChange={setExampleValue}
            />
          </div>

          {recoveryState !== 'idle' && (
            <div
              className={`recovery-banner ${showRecoveryFailure ? 'recovery-banner--error' : ''}`.trim()}
              role="region"
              aria-label="Session recovery"
              aria-live="polite"
            >
              {recoveryState === 'recovering' && (
                <p className="ui-message ui-message--info">Recovering your assessment progress...</p>
              )}
              {showRecoveryBanner && (
                <p className="ui-message ui-message--success">Your assessment progress was recovered.</p>
              )}
              {showRecoveryFailure && (
                <p className="ui-message ui-message--error">We could not recover your assessment safely.</p>
              )}
              {showRecoveryFailure && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRecoverSession}
                  disabled={assessmentMachine.isMutating || recoveryState === 'recovering'}
                >
                  Retry recovery
                </Button>
              )}
            </div>
          )}

          {statusNote && (
            <AccessibleStatus politeness="polite">
              <p className="ui-message ui-message--neutral">{statusNote}</p>
            </AccessibleStatus>
          )}
          {feedback && (
            <AccessibleStatus politeness="assertive">
              <p className="ui-message ui-message--error">{feedback}</p>
            </AccessibleStatus>
          )}

          {/* Bottom Controls */}
          <footer className="assessment-question-actions">
            <Button
              variant="ghost"
              onClick={goToPrevious}
              loading={previousMutation.isPending}
              disabled={
                previousMutation.isPending ||
                assessmentMachine.isMutating ||
                Number(question.sequence || 1) <= 1
              }
            >
              <FiArrowLeft /> Back
            </Button>

            <Button
              onClick={submitAnswer}
              loading={assessmentMachine.isMutating}
              loadingLabel="Saving…"
              disabled={!canSubmit || !assessmentMachine.canSubmitAnswer || assessmentMachine.isMutating}
            >
              Next <FiArrowRight />
            </Button>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default AdaptiveAssessmentTestPage;
