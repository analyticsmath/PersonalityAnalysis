import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { useAuth } from '../../hooks/useAuth';
import {
  useAdaptiveQuestionQuery,
  useSubmitAdaptiveAnswerMutation,
} from '../../hooks/useAssessmentFlow';
import {
  readAssessmentFlowState,
  saveAssessmentFlowState,
} from '../../utils/assessmentFlowStorage';

const MIN_LENGTH = 40;

const BehaviorAssessmentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();

  const sessionId =
    searchParams.get('session') || readAssessmentFlowState(auth.userId)?.sessionId || '';

  const questionQuery = useAdaptiveQuestionQuery(sessionId, Boolean(sessionId));
  const answerMutation = useSubmitAdaptiveAnswerMutation();

  const prompt = questionQuery.data?.behaviorPrompt || null;
  const stage = questionQuery.data?.session?.stage || 'behavior';

  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      navigate('/assessment/start', { replace: true });
      return;
    }

    if (stage === 'questionnaire') {
      navigate(`/assessment/test?session=${sessionId}`, { replace: true });
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
    });
  }, [auth.userId, questionQuery.data, sessionId]);

  const handleSubmit = async () => {
    if (!prompt) {
      return;
    }

    if (text.trim().length < MIN_LENGTH) {
      setErrorMessage(`Please write at least ${MIN_LENGTH} characters.`);
      return;
    }

    setErrorMessage('');

    try {
      const payload = await answerMutation.mutateAsync({
        sessionId,
        payload: {
          promptId: prompt.promptId,
          text: text.trim(),
        },
      });

      if (payload.completedAssessment) {
        saveAssessmentFlowState(auth.userId, {
          sessionId,
          stage: 'result',
        });
        navigate(`/assessment/result?session=${sessionId}`);
        return;
      }

      setText('');
    } catch (error) {
      setErrorMessage(error.message || 'Unable to save behavior response.');
    }
  };

  if (questionQuery.isPending) {
    return (
      <main className="app-page assessment-focused-page">
        <div className="page-shell assessment-focused-shell">
          <div className="assessment-loading-panel">
            <Skeleton height="32px" />
            <Skeleton height="120px" />
          </div>
        </div>
      </main>
    );
  }

  if (!prompt || questionQuery.isError) {
    return (
      <main className="app-page assessment-focused-page">
        <div className="page-shell assessment-focused-shell">
          <div className="assessment-error-panel">
            <h2>Behavior prompt unavailable</h2>
            <p className="ui-message ui-message--error">
              {questionQuery.error?.message || 'No behavior prompt found for this session.'}
            </p>
            <Button onClick={() => navigate('/assessment/start')}>Back to Start</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app-page assessment-focused-page">
      <div className="assessment-focused-shell">
        <header className="assessment-quiet-header">
          <div className="assessment-quiet-header__brand">
            <span className="public-brand__name">Personality Assessor</span>
          </div>
          <span className="assessment-quiet-step-text">
            Prompt {prompt.index + 1} of {prompt.total}
          </span>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            Exit
          </Button>
        </header>

        <section className="assessment-behavior-stage">
          <h1 className="assessment-behavior-heading">Think of a real example.</h1>
          <p className="assessment-behavior-prompt">{prompt.prompt}</p>

          <div className="assessment-behavior-input-wrap">
            <textarea
              className="ui-input assessment-behavior-textarea"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Write a concrete example from your work."
              aria-label="Behavioral example"
            />
            <p className="assessment-behavior-support">
              Include enough context to explain what happened, what you did and what followed.
            </p>
            <p className="assessment-behavior-charcount">
              {text.trim().length} characters written. Minimum {MIN_LENGTH} required.
            </p>
          </div>

          {errorMessage && <p className="ui-message ui-message--error">{errorMessage}</p>}

          <footer className="assessment-question-actions">
            <Button
              variant="ghost"
              onClick={() => navigate('/assessment/start')}
            >
              Exit
            </Button>
            <Button
              onClick={handleSubmit}
              loading={answerMutation.isPending}
              disabled={text.trim().length < MIN_LENGTH || answerMutation.isPending}
            >
              Save &amp; continue
            </Button>
          </footer>
        </section>
      </div>
    </main>
  );
};

export default BehaviorAssessmentPage;
