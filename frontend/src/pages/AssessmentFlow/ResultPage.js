import React, { useEffect, useMemo, useRef, useState, Suspense, lazy } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import {
  FiArrowLeft,
  FiAward,
  FiCompass,
  FiCpu,
  FiDownload,
  FiMapPin,
  FiMessageCircle,
  FiRefreshCw,
  FiShare2,
  FiSend,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiZap,
} from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import MetricCard from '../../components/ui/MetricCard';
import Loader from '../../components/ui/Loader';
import LoaderOverlay from '../../components/ui/LoaderOverlay';
import TraitRadarChart from '../../components/charts/TraitRadarChart';
import RiasecRadarChart from '../../components/charts/RiasecRadarChart';
import WorkValuesProfileCard from '../../components/charts/WorkValuesProfileCard';
import CareerAlignmentChart from '../../components/charts/CareerAlignmentChart';
import MetricBarChart from '../../components/charts/MetricBarChart';
import InsightHeatmapChart from '../../components/charts/InsightHeatmapChart';
import AiStatusBadges from '../../components/results/AiStatusBadges';
import mapTraitsTo3DData from '../../utils/traitMapper';
import { normalizeAssessmentResult } from '../../utils/assessmentResultNormalize';
import { useAuth } from '../../hooks/useAuth';
import tokens from '../../theme/tokens';
import {
  useAssessmentFlowResultQuery,
  useCareerChatMutation,
  useWhyNotCareerMutation,
  useCareerRecommendationsQuery,
  useRetryAiReportMutation,
} from '../../hooks/useAssessmentFlow';
import { downloadAssessmentFlowPdf } from '../../api/assessmentFlowApi';
import { clearAssessmentFlowState, readAssessmentFlowState } from '../../utils/assessmentFlowStorage';
import { AVATAR_EVENTS, useAvatarEvents } from '../../components/avatar/AvatarEvents';
import ScoringEvidenceCard from '../../components/results/ScoringEvidenceCard';
import CareerSignalsSummary from '../../components/results/CareerSignalsSummary';
import CareerRecommendationCard from '../../components/career/CareerRecommendationCard';
import {
  deriveCognitiveFromCareerSignals,
  deriveBehaviorFromCareerSignals,
  getDominantBehaviorLabel,
  isAllDefaultVector,
} from '../../utils/chartSignalDerivation';

const TraitSphere = lazy(() => import('../../components/3d/TraitSphere'));

gsap.registerPlugin(ScrollTrigger);

const COGNITIVE_LABELS = {
  analytical: 'Analytical',
  creative: 'Creative',
  strategic: 'Strategic',
  systematic: 'Systematic',
  practical: 'Practical',
  abstract: 'Abstract',
};

const BEHAVIOR_LABELS = {
  leadership: 'Leadership',
  risk_tolerance: 'Risk Tolerance',
  decision_speed: 'Decision Speed',
  stress_tolerance: 'Stress Tolerance',
  team_preference: 'Team Preference',
};

const QUICK_CHAT_PROMPTS = [
  'Why is my top career a strong fit?',
  'What should I improve in 30 days?',
  'Which skill gap blocks my growth most?',
];

const toDefaultFollowUps = (topCareer = '') => [
  `What makes ${topCareer || 'my top role'} stronger than my second match?`,
  'Give me one scenario to improve leadership and decision quality.',
  'What should I practice weekly to increase confidence?',
];

const bandClass = (value = '') => {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'high') return 'high';
  if (normalized === 'medium') return 'medium';
  return 'low';
};

const AssessmentFlowResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const prefersReducedMotion = useReducedMotion();

  const sessionId =
    searchParams.get('session') || readAssessmentFlowState(auth.userId)?.sessionId || '';

  const resultQuery = useAssessmentFlowResultQuery(sessionId, Boolean(sessionId));
  const chatMutation = useCareerChatMutation();
  const whyNotMutation = useWhyNotCareerMutation();
  const retryAiMutation = useRetryAiReportMutation(sessionId);
  const { emit } = useAvatarEvents();

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [followUpPrompts, setFollowUpPrompts] = useState(QUICK_CHAT_PROMPTS);
  const [chatError, setChatError] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const [coachAiStatus, setCoachAiStatus] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [aiRetryMessage, setAiRetryMessage] = useState('');
  const [whyNotCareer, setWhyNotCareer] = useState('');
  const [whyNotResult, setWhyNotResult] = useState(null);
  const [whyNotError, setWhyNotError] = useState('');

  const sectionsRef = useRef([]);
  const chatFeedRef = useRef(null);
  const downloadButtonRef = useRef(null);
  const resultsLoadedRef = useRef(false);

  const result = resultQuery.data?.result || null;
  const normalized = useMemo(() => normalizeAssessmentResult(result), [result]);
  const flowAiStatus = normalized.aiStatus || null;
  const scoreMeta = normalized.scoreMeta || result?.meta || null;
  const careerPhase4Embedded = normalized.careerPhase4;
  const careerRecQuery = useCareerRecommendationsQuery(
    sessionId,
    Boolean(sessionId && result && !careerPhase4Embedded)
  );
  const careerIntel = careerPhase4Embedded || careerRecQuery.data || null;
  const normalizedState = resultQuery.data?.state || null;
  const reportStatus = normalizedState?.reportStatus || result?.reportStatus || null;
  const reportStatusCode = String(reportStatus?.status || '').toLowerCase();
  const reportWarning =
    reportStatusCode === 'failed' ||
    reportStatusCode === 'unavailable' ||
    reportStatusCode === 'generating';


  useEffect(() => {
    if (resultQuery.isPending || chatMutation.isPending) {
      emit(AVATAR_EVENTS.AI_LOADING, {
        long: true,
        targetKey: 'results-hero',
      });
    }
  }, [chatMutation.isPending, emit, resultQuery.isPending]);

  useEffect(() => {
    if (Array.isArray(resultQuery.data?.history)) {
      setChatHistory(resultQuery.data.history);
    }
  }, [resultQuery.data?.history]);

  useEffect(() => {
    resultsLoadedRef.current = false;
    setCoachAiStatus(null);
  }, [sessionId]);

  useEffect(() => {
    const node = chatFeedRef.current;
    if (!node) {
      return;
    }

    const top = node.scrollHeight;
    if (typeof node.scrollTo === 'function') {
      node.scrollTo({ top, behavior: 'smooth' });
    } else {
      node.scrollTop = top;
    }
  }, [chatHistory, chatTyping]);

  const traits = normalized.radarTraits;
  const phaseScores = normalized.scores;
  const evidenceList = normalized.evidence;
  const warningList = normalized.warnings;
  const threeDPayload = useMemo(() => mapTraitsTo3DData(traits), [traits]);
  const recommendations = Array.isArray(result?.career_recommendations)
    ? result.career_recommendations
    : [];
  const contrast = result?.career_contrast || {};
  const topCareer = recommendations[0] || null;

  // Cognitive chart: prefer canonical signals.cognitive if valid; then direct scores if not default; else derive from careerSignals.
  const cognitiveResolved = useMemo(() => {
    const canonical = result?.signals?.cognitive;
    if (canonical && canonical.status === 'valid' && canonical.values) {
      return { scores: canonical.values, source: canonical.source || 'canonical' };
    }
    const raw = result?.cognitive_scores;
    const hasReal = raw && typeof raw === 'object' && Object.keys(raw).length > 0 && !isAllDefaultVector(raw);
    if (hasReal) return { scores: raw, source: 'direct' };
    return deriveCognitiveFromCareerSignals(phaseScores?.careerSignals);
  }, [result, phaseScores]);

  // Behavior chart: prefer canonical signals.behavior if valid; then direct vector if not default; else derive from careerSignals.
  const behaviorResolved = useMemo(() => {
    const canonical = result?.signals?.behavior;
    if (canonical && canonical.status === 'valid' && canonical.values) {
      return { scores: canonical.values, source: canonical.source || 'canonical', dominant: canonical.dominant };
    }
    const raw = result?.behavior_vector;
    const hasReal = raw && typeof raw === 'object' && Object.keys(raw).length > 0 && !isAllDefaultVector(raw);
    if (hasReal) return { scores: raw, source: 'direct' };
    return deriveBehaviorFromCareerSignals(phaseScores?.careerSignals);
  }, [result, phaseScores]);

  const dominantBehaviorLabel = useMemo(() => {
    if (behaviorResolved.dominant) {
      const BEHAVIOR_LABEL_MAP = {
        leadership: 'Leadership',
        riskTolerance: 'Risk Tolerance',
        decisionSpeed: 'Decision Speed',
        stressTolerance: 'Stress Tolerance',
        teamPreference: 'Team Preference',
        risk_tolerance: 'Risk Tolerance',
        decision_speed: 'Decision Speed',
        stress_tolerance: 'Stress Tolerance',
        team_preference: 'Team Preference',
      };
      return BEHAVIOR_LABEL_MAP[behaviorResolved.dominant] || behaviorResolved.dominant;
    }
    return getDominantBehaviorLabel(behaviorResolved.scores, BEHAVIOR_LABELS);
  }, [behaviorResolved]);

  // Career Alignment Chart: prefer Phase 4 topRecommendations; fall back to legacy.
  const careerAlignmentData = useMemo(() => {
    const phase4 = careerIntel?.topRecommendations;
    if (Array.isArray(phase4) && phase4.length) {
      return phase4.map((item) => ({
        career: item.title || item.careerId || 'Role',
        score: Math.round(Number(item.fitScore || 0)),
        personality_score: Math.round(Number(item.fitScore || 0)),
        career_score: Math.round(Number(item.fitScore || 0)),
        confidence: Math.round(Number(item.confidence || 0)),
        why_fit: item.whyThisFits || '',
        confidence_band: item.confidence >= 70 ? 'high' : item.confidence >= 45 ? 'medium' : 'low',
      }));
    }
    return recommendations;
  }, [careerIntel, recommendations]);
  const followUps = useMemo(
    () => (followUpPrompts.length ? followUpPrompts : toDefaultFollowUps(topCareer?.career || '')),
    [followUpPrompts, topCareer?.career]
  );

  const heatmapFacetScores = useMemo(() => {
    const direct =
      (result?.facetScores && typeof result.facetScores === 'object' && result.facetScores) ||
      (result?.facet_scores && typeof result.facet_scores === 'object' && result.facet_scores) ||
      {};

    return Object.keys(direct).length > 0 ? direct : {};
  }, [result]);
  const hasHeatmapData = Object.keys(heatmapFacetScores).length > 0;

  useEffect(() => {
    if (!result || resultsLoadedRef.current) {
      return;
    }

    emit(AVATAR_EVENTS.RESULTS_LOADED, {
      targetKey: 'results-hero',
      message: 'Here is your personality profile. Scroll to see your roadmap.',
    });
    resultsLoadedRef.current = true;
  }, [emit, result]);

  useEffect(() => {
    if (!result || prefersReducedMotion) {
      return;
    }

    const sections = sectionsRef.current.filter(Boolean);
    const animations = [];

    sections.forEach((section) => {
      animations.push(
        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      );
    });

    const counters = Array.from(document.querySelectorAll('.phase3-count'));
    counters.forEach((element) => {
      const target = Number(element.getAttribute('data-target') || 0);
      const value = { current: 0 };
      animations.push(
        gsap.to(value, {
          current: target,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: () => {
            element.textContent = `${Math.round(value.current)}%`;
          },
        })
      );
    });

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [result, prefersReducedMotion]);

  // Glow only on hover — handled via CSS. No continuous animation.


  const submitChat = async (incomingMessage) => {
    const text = String(incomingMessage ?? message ?? '').trim();

    if (!text) {
      return;
    }

    setChatError('');
    setMessage('');
    setChatTyping(true);
    emit(AVATAR_EVENTS.CHAT_MESSAGE, {
      targetKey: 'chatbot-panel',
    });

    const optimisticTimestamp = new Date().toISOString();
    setChatHistory((current) => [
      ...current,
      {
        role: 'user',
        message: text,
        createdAt: optimisticTimestamp,
      },
    ]);

    try {
      const payload = await chatMutation.mutateAsync({
        sessionId,
        message: text,
      });
      emit(AVATAR_EVENTS.CHAT_RESPONSE, {
        targetKey: 'chatbot-panel',
      });
      setChatHistory((current) => (Array.isArray(payload.history) ? payload.history : current));
      setCoachAiStatus(payload.aiStatus || null);
      setFollowUpPrompts(
        toDefaultFollowUps(topCareer?.career || 'your best-fit role').map((item, index) =>
          index === 0 ? item : `${item} (${text.slice(0, 36)}...)`
        )
      );
    } catch (error) {
      setChatError(error.message || 'Assistant is unavailable right now.');
      setCoachAiStatus({
        status: 'fallback',
        provider: 'local_fallback',
        promptVersion: 'n/a',
        schemaValidated: false,
        safetyChecked: true,
        fallbackUsed: true,
        errorCode: 'CLIENT_CHAT_ERROR',
        latencyMs: 0,
        model: 'n/a',
      });
      setChatHistory((current) => {
        const withoutOptimistic = current.filter(
          (entry) => !(entry.createdAt === optimisticTimestamp && entry.role === 'user' && entry.message === text)
        );
        return [
          ...withoutOptimistic,
          {
            role: 'assistant',
            message:
              'The career coach is temporarily unavailable. Your scores and Career Intelligence cards above remain your primary reference for fit and gaps.',
            createdAt: new Date().toISOString(),
          },
        ];
      });
    } finally {
      setChatTyping(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRetakeAssessment = () => {
    clearAssessmentFlowState(auth.userId);
    navigate('/assessment/start');
  };

  const handleRetryAiReport = async () => {
    const assessmentId = result?._id || result?.assessmentId;
    if (!assessmentId || retryAiMutation.isPending) return;
    setAiRetryMessage('');
    try {
      await retryAiMutation.mutateAsync({ assessmentId });
      setAiRetryMessage('AI summary is being regenerated. Refreshing results…');
      setTimeout(() => resultQuery.refetch(), 2000);
    } catch (error) {
      setAiRetryMessage(
        'Your scores are ready. The AI summary could not be regenerated — try again shortly.'
      );
    }
  };

  const downloadPdf = async () => {
    if (!sessionId) {
      return;
    }

    setPdfError('');

    try {
      const blob = await downloadAssessmentFlowPdf(sessionId);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `career-intelligence-report-${sessionId}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setPdfError(error.message || 'Unable to download PDF report right now.');
    }
  };

  const shareReport = async () => {
    setShareStatus('');
    const sharePayload = {
      title: 'AI Career Intelligence Report',
      text: `Top Career: ${topCareer?.career || 'Career fit insights available'}`,
      url: window.location.href,
    };

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share(sharePayload);
        setShareStatus('Report share sheet opened.');
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareStatus('Report link copied to clipboard.');
    } catch (error) {
      setShareStatus('Unable to share this report on this device.');
    }
  };

  const submitWhyNot = async () => {
    const career = whyNotCareer.trim();
    if (!career) {
      return;
    }

    setWhyNotError('');
    setWhyNotResult(null);

    try {
      const payload = await whyNotMutation.mutateAsync({
        sessionId,
        career,
      });
      setWhyNotResult(payload.explanation || null);
    } catch (error) {
      setWhyNotError(error.message || 'Unable to generate why-not explanation right now.');
    }
  };

  if (!sessionId) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <Card title="Result not found">
            <p className="ui-message ui-message--error">No assessment session was provided.</p>
            <Button onClick={() => navigate('/assessment/start')}>Start Assessment</Button>
          </Card>
        </div>
      </main>
    );
  }

  if (resultQuery.isPending) {
    return (
      <main className="app-page">
        <LoaderOverlay visible message="Building your personality profile..." />
        <div className="page-shell">
          <Card title="Generating report">
            <Loader label="Building your personality profile..." variant="result" />
            <Skeleton height="36px" />
            <Skeleton height="280px" />
            <Skeleton height="140px" count={2} />
          </Card>
        </div>
      </main>
    );
  }

  if (resultQuery.isError || !result) {
    return (
      <main className="app-page">
        <div className="page-shell">
          <Card title="Result unavailable">
            <p className="ui-message ui-message--error">
              {resultQuery.error?.message || 'Assessment result is not ready yet.'}
            </p>
            <Button onClick={() => navigate('/assessment/start')}>Back to Start</Button>
          </Card>
        </div>
      </main>
    );
  }


  if (reportStatusCode === 'scoring_required') {
    return (
      <main className="app-page">
        <div className="page-shell">
          <Card title="Scoring required">
            <p className="ui-message ui-message--warning">Scoring is required before report generation.</p>
            <Button onClick={() => resultQuery.refetch()}>Retry Failed Action</Button>
          </Card>
        </div>
      </main>
    );
  }

  const confidenceBand = bandClass(result.confidence_band);
  const confidencePercent = Math.max(0, Math.min(100, Math.round(result.confidence_score || 0)));

  return (
    <main className="app-page phase3-result-page" data-avatar-section="results-main">
      <LoaderOverlay visible={resultQuery.isPending} message="Building your personality profile..." />
      <div className="page-shell result-shell phase3-result-shell">
        {(reportWarning || String(flowAiStatus?.status || '').toLowerCase() === 'fallback') ? (
          <section className="phase3-result-section" style={{ marginBottom: 8 }} data-testid="ai-retry-section">
            <Card title="AI Narrative">
              <p className="ui-message ui-message--warning">
                {reportStatusCode === 'generating'
                  ? 'Preparing your AI summary. Your scores and charts are ready below.'
                  : reportStatusCode === 'failed'
                    ? 'The AI narrative could not be generated. Your scores remain available below.'
                    : reportStatusCode === 'unavailable'
                      ? 'The AI narrative is temporarily unavailable. Your results are ready below.'
                      : String(flowAiStatus?.status || '').toLowerCase() === 'fallback'
                        ? 'Your scores are ready. The AI summary used a fallback because the AI response took longer than expected.'
                        : ''}
              </p>
              {aiRetryMessage ? (
                <p className="ui-message ui-message--neutral" aria-live="polite">{aiRetryMessage}</p>
              ) : null}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                {reportStatusCode === 'generating' ? (
                  <Button variant="ghost" onClick={() => resultQuery.refetch()} loading={resultQuery.isFetching}>
                    <FiRefreshCw /> Refresh status
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleRetryAiReport}
                    loading={retryAiMutation.isPending}
                    loadingLabel="Preparing your AI summary…"
                    disabled={retryAiMutation.isPending}
                    data-testid="retry-ai-report-btn"
                  >
                    <FiRefreshCw /> {reportStatusCode === 'failed' ? 'Retry AI Summary' : String(flowAiStatus?.status || '').toLowerCase() === 'fallback' ? 'Regenerate AI Summary' : 'Generate AI Summary'}
                  </Button>
                )}
              </div>
            </Card>
          </section>
        ) : null}
        <header className="result-report-title" aria-label="Report title">
          <h1 className="result-report-title__heading">
            <FiAward aria-hidden="true" /> Personality &amp; Career Intelligence Report
          </h1>
          <p className="result-report-title__sub">
            Deterministic psychometric scoring · AI-enhanced insights · Career matching
          </p>
        </header>

        <section className="result-summary-grid" aria-label="Report at a glance">
          <MetricCard
            label="Personality confidence"
            value={`${confidencePercent}%`}
            hint={`Band: ${String(result.confidence_band || 'low').toUpperCase()}`}
            variant="amber"
          />
          <MetricCard
            label="Career readiness"
            value={
              careerIntel?.locked
                ? 'Insufficient data'
                : careerIntel?.topRecommendations?.[0]?.title ||
                  topCareer?.career ||
                  'Open Career Explorer'
            }
            hint={
              careerIntel?.locked
                ? 'More reliable responses are needed for ranked matching.'
                : careerIntel?.topRecommendations?.[0]
                  ? `${Math.round(Number(careerIntel.topRecommendations[0].fitScore || 0))}% fit score`
                  : topCareer?.career
                    ? `${Number(topCareer.score || 0)}% match from assessment model`
                    : 'Structured roles appear when scores are valid.'
            }
            variant="sky"
          />
          <MetricCard
            label="AI narrative"
            value={
              reportStatusCode === 'generating'
                ? 'Generating'
                : reportStatusCode === 'failed' || reportStatusCode === 'unavailable'
                  ? 'Unavailable'
                  : String(flowAiStatus?.status || '').toLowerCase() === 'fallback'
                    ? 'Fallback summary'
                    : 'Ready'
            }
            hint="Optional AI layer; your scored charts remain the primary reference."
            variant="indigo"
          />
          <MetricCard
            label="Evidence cues"
            value={String(Array.isArray(evidenceList) ? evidenceList.length : 0)}
            hint="Transparency items from the scoring engine."
            variant="green"
          />
        </section>
        <section
          data-scroll-reveal
          className="phase3-result-hero phase3-result-section"
          ref={(node) => { sectionsRef.current[0] = node; }}
          data-avatar-section="result-hero"
          data-avatar-target="results-hero"
        >
          <div>
            <p className="page-header__eyebrow">AI Career Intelligence Report</p>
            <h1 className="page-header__title">{result.personality_type_label || result.personality_type}</h1>
            <p className="page-header__subtitle">
              {result.narrative_summary || result.behavioral_summary || 'Narrative summary unavailable.'}
            </p>
            <p className="ui-message ui-message--neutral" style={{ marginTop: 8, fontSize: 13 }}>
              Guidance only — not medical or psychological diagnosis and not a hiring decision. Numeric scores are
              produced by the psychometric scoring engine.
            </p>
            <AiStatusBadges aiStatus={flowAiStatus} />
            <div className="phase3-archetype-badge">
              <FiAward />
              <span>{result.personality_type_label || result.personality_type}</span>
            </div>
          </div>
          <div className="phase3-result-hero__stats">
            <div className="phase3-result-hero__actions">
              <Button
                variant="ghost"
                onClick={handleBackToDashboard}
                data-avatar-action="back-dashboard"
                data-avatar-target="results-hero"
              >
                <FiArrowLeft /> Back to Dashboard
              </Button>
              <Button
                variant="secondary"
                onClick={handleRetakeAssessment}
                data-avatar-action="retake-assessment"
                data-avatar-target="results-hero"
                data-avatar-hint="Retake if you want to compare a new profile run."
              >
                <FiRefreshCw /> Retake Assessment
              </Button>
            </div>
            <article className="phase3-hero-stat">
              <p>Top Career Match</p>
              <strong className="phase3-count" data-target={Number(topCareer?.score || 0)}>
                0%
              </strong>
              <span>{topCareer?.career || 'Not available'}</span>
            </article>
            <article className="phase3-hero-stat">
              <p>Consistency Score</p>
              <strong className="phase3-count" data-target={Math.round(Number(result.consistency_score || 0) * 100)}>
                0%
              </strong>
              <span>Psychometric stability</span>
            </article>
            <article className="phase3-hero-stat">
              <p>Confidence</p>
              <strong className="phase3-count" data-target={confidencePercent}>
                0%
              </strong>
              <span>{String(result.confidence_band || 'low').toUpperCase()}</span>
            </article>
            <div ref={downloadButtonRef} data-avatar-target="report-download" className="phase3-download-actions">
              <Button
                variant="ghost"
                onClick={downloadPdf}
                data-avatar-action="download-report"
                data-avatar-target="report-download"
                data-avatar-hint="Download your PDF report here."
              >
                <FiDownload /> Download Report
              </Button>
              <Button
                variant="ghost"
                onClick={shareReport}
                data-avatar-action="share-report"
                data-avatar-target="report-download"
                data-avatar-hint="Share this report link."
              >
                <FiShare2 /> Share Report
              </Button>
            </div>
          </div>
        </section>

        <section
          data-scroll-reveal
          className="phase3-result-section"
          ref={(node) => { sectionsRef.current[1] = node; }}
          data-avatar-section="result-confidence"
          data-avatar-target="result-confidence-meter"
        >
          <Card title="Confidence Meter" subtitle="Top-career confidence after consistency adjustment">
            <div className="confidence-meter phase3-confidence-meter" data-avatar-target="result-confidence-meter">
              <div className="confidence-meter__track">
                <div
                  className={`confidence-meter__bar confidence-meter__bar--${confidenceBand}`}
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>
              <p className="ui-message ui-message--neutral">
                Confidence Band: <strong>{String(result.confidence_band || 'low').toUpperCase()}</strong> · Gap{' '}
                <strong>{result.confidence_gap || 0}</strong>
              </p>
            </div>
          </Card>
        </section>

        <section
          data-scroll-reveal
          className="phase3-result-charts phase3-result-section"
          ref={(node) => { sectionsRef.current[2] = node; }}
          data-avatar-section="result-profile"
          data-avatar-target="result-profile-chart"
        >
          <Card title="OCEAN Radar" subtitle="Personality profile">
            <TraitRadarChart key={`radar-${result.meta?.generated_at || 'latest'}`} traits={traits} height={320} scoreMeta={scoreMeta} />
          </Card>

          <Card title="3D Trait Sphere" subtitle="Interactive trait field (loads on demand)">
            <Suspense fallback={<Skeleton height="280px" />}>
              <TraitSphere data={threeDPayload} />
            </Suspense>
          </Card>

          <Card title="RIASEC interests" subtitle="Holland-style career interests (evidence-weighted)">
            <RiasecRadarChart riasec={phaseScores?.riasec} scoreMeta={scoreMeta} height={280} />
          </Card>

          <Card title="Work values" subtitle="Preference indicators — not fixed personality traits">
            <WorkValuesProfileCard workValues={phaseScores?.workValues} scoreMeta={scoreMeta} height={280} />
          </Card>

          <Card title="Career skill signals" subtitle="Structured signals for future occupation matching">
            <CareerSignalsSummary careerSignals={phaseScores?.careerSignals} scoreMeta={scoreMeta} />
          </Card>

          <Card title="Evidence & caveats" subtitle="Why you see these numbers">
            <ScoringEvidenceCard scoreMeta={scoreMeta} evidence={evidenceList} warnings={warningList} />
          </Card>

          <Card title="Career Intelligence" subtitle="Career fit, skill gaps, and next steps.">
            {String(scoreMeta?.scoreValidity || '').toLowerCase() === 'invalid' || careerIntel?.locked ? (
              <div>
                <p className="ui-message ui-message--error" role="status">
                  Career recommendations are locked because assessment score validity is invalid or insufficient for
                  ranked matching.
                </p>
                <Button variant="ghost" onClick={() => navigate(`/assessment/career?session=${sessionId}`)}>
                  <FiCompass /> Open Career Explorer
                </Button>
              </div>
            ) : (careerIntel?.topRecommendations || []).length ? (
              <div style={{ display: 'grid', gap: 16 }}>
                {careerIntel.preliminary ? (
                  <p className="ui-message ui-message--neutral" role="status">
                    Career recommendations are preliminary because the assessment evidence is limited.
                  </p>
                ) : null}
                <p className="ui-message ui-message--neutral">
                  Career recommendations are guidance based on your assessment, CV signals, and stated preferences. They
                  are not final career decisions or hiring judgments.
                </p>
                <div className="career-intel-grid" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  {(careerIntel.topRecommendations || []).slice(0, 3).map((item) => (
                    <CareerRecommendationCard
                      key={item.careerId}
                      title={item.title}
                      fitScore={item.fitScore}
                      confidence={item.confidence}
                      preliminary={Boolean(careerIntel.preliminary)}
                      fitType={item.fitType}
                      whyThisFits={item.whyThisFits}
                      skillGaps={item.skillGaps}
                    />
                  ))}
                </div>
                <Button variant="ghost" onClick={() => navigate(`/assessment/career?session=${sessionId}`)}>
                  <FiCompass /> Full Career Explorer
                </Button>
              </div>
            ) : (
              <div>
                <p className="ui-message ui-message--neutral">
                  Structured career intelligence is not embedded in this result yet. Open Career Explorer to compute
                  guidance from your stored scores when available.
                </p>
                <Button variant="ghost" onClick={() => navigate(`/assessment/career?session=${sessionId}`)}>
                  <FiCompass /> Open Career Explorer
                </Button>
              </div>
            )}
          </Card>
        </section>

        <section data-scroll-reveal className="phase3-result-charts phase3-result-section" ref={(node) => { sectionsRef.current[3] = node; }}>
          <Card
            title="Cognitive Chart"
            subtitle={cognitiveResolved.source === 'derived_from_careerSignals'
              ? 'Derived from career signals (direct cognitive data not yet scored)'
              : 'Adaptive cognitive signals'}
          >
            {cognitiveResolved.source === 'insufficient' ? (
              <p className="empty-state">
                Cognitive signal data is insufficient. Complete more assessment questions to unlock this chart.
              </p>
            ) : (
              <MetricBarChart
                key={`cognitive-${result.meta?.generated_at || 'latest'}`}
                metrics={cognitiveResolved.scores || {}}
                labels={COGNITIVE_LABELS}
                barColor={tokens.accent.cyan}
                height={300}
              />
            )}
          </Card>
          <Card
            title="Behavior Chart"
            subtitle={behaviorResolved.source === 'derived_from_careerSignals'
              ? 'Derived from career signals (direct behavior data not yet scored)'
              : 'Behavioral execution signals'}
          >
            {dominantBehaviorLabel && (
              <p className="ui-message ui-message--neutral" style={{ marginBottom: 8 }}>
                Dominant behavior signal: <strong>{dominantBehaviorLabel}</strong>
              </p>
            )}
            {behaviorResolved.source === 'insufficient' ? (
              <p className="empty-state">
                Behavior signal data is insufficient. Complete the behavior assessment to unlock this chart.
              </p>
            ) : (
              <MetricBarChart
                key={`behavior-${result.meta?.generated_at || 'latest'}`}
                metrics={behaviorResolved.scores || {}}
                labels={BEHAVIOR_LABELS}
                barColor={tokens.accent.amber}
                height={300}
              />
            )}
          </Card>
        </section>

        <section data-scroll-reveal className="phase3-result-section" ref={(node) => { sectionsRef.current[4] = node; }}>
          <Card title="Insight Heatmap" subtitle="Facet-level signal intensity — supporting context, not a separate diagnosis">
            <InsightHeatmapChart facetScores={heatmapFacetScores} />
          </Card>
        </section>

        <section
          data-scroll-reveal
          className="phase3-result-section"
          ref={(node) => { sectionsRef.current[5] = node; }}
          data-avatar-section="result-career-landscape"
        >
          <Card
            title="Career Match Landscape"
            subtitle={
              careerIntel?.topRecommendations?.length
                ? 'Career intelligence — fit scores and confidence'
                : 'Overall, personality, and career fit'
            }
          >
            <CareerAlignmentChart recommendations={careerAlignmentData} />
          </Card>
        </section>

        <section
          data-scroll-reveal
          className="phase3-result-section"
          ref={(node) => { sectionsRef.current[6] = node; }}
          data-avatar-section="result-career-match"
          data-avatar-target="career-matches"
        >
          <Card title="Career Matches" subtitle="Why each role matched and what to build next">
            <div className="phase3-career-grid" data-avatar-target="career-matches">
              {recommendations.map((career, index) => (
                <article className="phase3-career-card" key={`${career.career}-${index}`}>
                  <header>
                    <h4>
                      #{index + 1} {career.career}
                    </h4>
                    <span className={`phase3-confidence-pill is-${bandClass(career.confidence_band)}`}>
                      {String(career.confidence_band || 'low').toUpperCase()} CONF
                    </span>
                  </header>
                  <p className="phase3-career-card__metric">
                    Match: <strong>{career.score}%</strong> · Confidence: <strong>{career.confidence || 0}%</strong>
                  </p>
                  <p>{career.why_fit || career.explanation?.summary}</p>
                  <p>
                    <strong>Why matched:</strong>{' '}
                    {(career.explanation?.top_signals || []).join(', ') || 'Balanced fit across personality and skills.'}
                  </p>
                  <p>
                    <strong>Skills needed:</strong>{' '}
                    {(career.key_skills_to_build || []).slice(0, 5).join(', ') || 'Not specified'}
                  </p>
                </article>
              ))}
            </div>
          </Card>
        </section>

        <section data-scroll-reveal className="phase3-result-section" ref={(node) => { sectionsRef.current[7] = node; }}>
          <Card title="Career Contrast Engine" subtitle="Why #1 is stronger than #2">
            {contrast?.summary ? (
              <div className="phase3-contrast">
                <p className="phase3-contrast__summary">
                  <FiTrendingUp /> {contrast.summary}
                </p>
                <ul>
                  {(contrast.reasons || []).map((reason, index) => (
                    <li key={`${reason}-${index}`}>{reason}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="empty-state">Contrast data will appear when at least two careers are ranked.</p>
            )}
          </Card>
        </section>

        <section data-scroll-reveal className="phase3-result-section" ref={(node) => { sectionsRef.current[8] = node; }}>
          <Card title="Why Not Engine" subtitle="Compare any target career against your profile">
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  value={whyNotCareer}
                  onChange={(event) => setWhyNotCareer(event.target.value)}
                  className="ui-input"
                  placeholder="Example: Data Scientist"
                  aria-label="Career title to compare against your profile"
                  style={{ flex: 1, minWidth: 0 }}
                />
                <Button onClick={submitWhyNot} loading={whyNotMutation.isPending} loadingLabel="Analyzing…">
                  Why Not?
                </Button>
              </div>
              {whyNotResult ? (
                <article className="intel-notification-item">
                  <h4>
                    {whyNotResult.career} · Match {whyNotResult.score}%
                  </h4>
                  <p>{whyNotResult.explanation}</p>
                  {Array.isArray(whyNotResult.gaps) && whyNotResult.gaps.length ? (
                    <p>Primary gaps: {whyNotResult.gaps.join(', ')}</p>
                  ) : null}
                </article>
              ) : null}
              {whyNotError ? <p className="ui-message ui-message--error">{whyNotError}</p> : null}
            </div>
          </Card>
        </section>

        <section
          data-scroll-reveal
          className="phase3-result-section"
          ref={(node) => { sectionsRef.current[9] = node; }}
          data-avatar-section="result-roadmap"
          data-avatar-target="learning-roadmap"
        >
          <Card title="Learning Roadmap" subtitle="Sequenced career growth path">
            <div className="roadmap-timeline" data-avatar-target="learning-roadmap" data-testid="roadmap-timeline">
              {(result.career_roadmap || []).length === 0 ? (
                <p className="empty-state">Complete the assessment to unlock your personalized roadmap.</p>
              ) : (result.career_roadmap || []).map((step, index) => {
                const stageIcons = [<FiTarget key="0" />, <FiZap key="1" />, <FiTrendingUp key="2" />, <FiCompass key="3" />, <FiMapPin key="4" />];
                const stageIcon = stageIcons[index % stageIcons.length];
                const humanStage = String(step.stage || `Phase ${index + 1}`)
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <article key={`${step.stage}-${index}`} className="roadmap-timeline__item" data-testid="roadmap-stage">
                    <div className="roadmap-timeline__icon" aria-hidden="true">{stageIcon}</div>
                    <div className="roadmap-timeline__body">
                      <h4 className="roadmap-timeline__label">{humanStage}</h4>
                      {step.duration ? <p className="roadmap-timeline__duration"><strong>{step.duration}</strong></p> : null}
                      <p className="roadmap-timeline__summary">{step.summary}</p>
                      {Array.isArray(step.actions) && step.actions.length ? (
                        <ul className="roadmap-timeline__actions">
                          {step.actions.slice(0, 4).map((action, ai) => (
                            <li key={`${action}-${ai}`}>{String(action).replace(/_/g, ' ')}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </Card>
        </section>

        <section
          data-scroll-reveal
          className="phase3-result-section"
          ref={(node) => { sectionsRef.current[10] = node; }}
          data-avatar-section="result-chat"
          data-avatar-target="chatbot-panel"
        >
          <Card title="Ask AI Career Coach" subtitle="Get personalized guidance about your profile and career fit">
            <AiStatusBadges aiStatus={coachAiStatus} />
            <div className="phase4-chat-shell" data-avatar-target="chatbot-panel">
              <div className="phase4-chat-suggestions">
                {followUps.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="phase4-chat-suggestion"
                    onClick={() => submitChat(prompt)}
                    disabled={chatMutation.isPending}
                    data-avatar-action="chat-suggestion"
                    data-avatar-target="chatbot-panel"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="phase4-chat-feed" ref={chatFeedRef}>
                {chatHistory.length === 0 ? (
                  <p className="empty-state">Ask: “Why am I suited for this role?”</p>
                ) : (
                  chatHistory.map((entry, index) => (
                    <article
                      key={`${entry.role}-${entry.createdAt}-${index}`}
                      className={`phase4-chat-bubble ${entry.role === 'assistant' ? 'is-ai' : 'is-user'}`}
                    >
                      <header>
                        <span className="phase4-chat-avatar" aria-hidden="true">
                          {entry.role === 'assistant' ? <FiCpu /> : <FiUser />}
                        </span>
                        <h4>{entry.role === 'assistant' ? 'AI Coach' : 'You'}</h4>
                      </header>
                      <p>{entry.message}</p>
                    </article>
                  ))
                )}
                {chatTyping ? (
                  <article className="phase4-chat-bubble is-ai is-typing">
                    <header>
                      <span className="phase4-chat-avatar" aria-hidden="true">
                        <FiCpu />
                      </span>
                      <h4>AI Coach</h4>
                    </header>
                    <p className="phase4-typing-dots" aria-label="Assistant is typing">
                      <span />
                      <span />
                      <span />
                    </p>
                  </article>
                ) : null}
              </div>
              <div className="phase4-chat-input-row">
                <input
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="ui-input"
                  placeholder="Ask about fit, skills, or roadmap"
                  style={{ flex: 1, minWidth: 0 }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      submitChat();
                    }
                  }}
                />
                <Button
                  onClick={() => submitChat()}
                  loading={chatMutation.isPending}
                  loadingLabel="Sending…"
                  data-avatar-action="chat-send"
                  data-avatar-target="chatbot-panel"
                  data-avatar-hint="Send your question and I will explain based on your profile."
                  aria-label="Send message to AI career coach"
                >
                  <FiSend /> Ask AI Coach
                </Button>
              </div>
              {chatError ? <p className="ui-message ui-message--error">{chatError}</p> : null}
              {pdfError ? <p className="ui-message ui-message--error">{pdfError}</p> : null}
              {shareStatus ? <p className="ui-message ui-message--neutral">{shareStatus}</p> : null}
            </div>
          </Card>
        </section>
      </div>

      <button
        type="button"
        className="chatbot-sticky-launcher"
        aria-label="Ask AI Career Coach"
        data-testid="chatbot-sticky-launcher"
        onClick={() => {
          const chatSection = document.querySelector('[data-avatar-target="chatbot-panel"]');
          if (chatSection) chatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      >
        <FiMessageCircle aria-hidden="true" />
        <span className="chatbot-sticky-launcher__label">Ask AI Coach</span>
      </button>
    </main>
  );
};

export default AssessmentFlowResultPage;
