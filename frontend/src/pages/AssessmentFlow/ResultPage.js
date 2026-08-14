import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import {
  FiArrowLeft,
  FiCompass,
  FiDownload,
  FiMessageCircle,
  FiRefreshCw,
  FiSend,
  FiShare2,
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import Loader from '../../components/ui/Loader';
import LoaderOverlay from '../../components/ui/LoaderOverlay';
import AiStatusBadges from '../../components/results/AiStatusBadges';
import ScoringEvidenceCard from '../../components/results/ScoringEvidenceCard';
import CareerRecommendationCard from '../../components/career/CareerRecommendationCard';
import WorkValuesProfileCard from '../../components/charts/WorkValuesProfileCard';
import { normalizeAssessmentResult } from '../../utils/assessmentResultNormalize';
import { useAuth } from '../../hooks/useAuth';
import {
  useAssessmentFlowResultQuery,
  useCareerChatMutation,
  useCareerRecommendationsQuery,
  useRetryAiReportMutation,
} from '../../hooks/useAssessmentFlow';
import { downloadAssessmentFlowPdf } from '../../api/assessmentFlowApi';
import { clearAssessmentFlowState, readAssessmentFlowState } from '../../utils/assessmentFlowStorage';

const QUICK_CHAT_PROMPTS = [
  'Why is my top career a strong fit?',
  'What should I improve in 30 days?',
  'Which skill gap blocks my growth most?',
];

const AssessmentFlowResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const prefersReducedMotion = useReducedMotion();

  const sessionId =
    searchParams.get('session') || readAssessmentFlowState(auth.userId)?.sessionId || '';

  const resultQuery = useAssessmentFlowResultQuery(sessionId, Boolean(sessionId));
  const chatMutation = useCareerChatMutation();
  const retryAiMutation = useRetryAiReportMutation(sessionId);

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [followUpPrompts, setFollowUpPrompts] = useState(QUICK_CHAT_PROMPTS);
  const [chatError, setChatError] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [activeLens, setActiveLens] = useState('personality');

  const chatFeedRef = useRef(null);

  const result = resultQuery.data?.result || null;
  const normalized = useMemo(() => normalizeAssessmentResult(result), [result]);
  const flowAiStatus = normalized.aiStatus || null;
  const careerPhase4Embedded = normalized.careerPhase4;
  const careerRecQuery = useCareerRecommendationsQuery(
    sessionId,
    Boolean(sessionId && result && !careerPhase4Embedded)
  );
  const careerIntel = careerPhase4Embedded || careerRecQuery.data || null;

  useEffect(() => {
    if (Array.isArray(resultQuery.data?.history)) {
      setChatHistory(resultQuery.data.history);
    }
  }, [resultQuery.data?.history]);

  useEffect(() => {
    const node = chatFeedRef.current;
    if (!node) return;
    const top = node.scrollHeight;
    if (typeof node.scrollTo === 'function') {
      node.scrollTo({ top, behavior: 'smooth' });
    } else {
      node.scrollTop = top;
    }
  }, [chatHistory, chatTyping]);

  const traits = normalized.radarTraits;
  const phaseScores = normalized.scores;
  const recommendations = Array.isArray(result?.career_recommendations)
    ? result.career_recommendations
    : [];

  const handleDownloadPdf = async () => {
    if (!sessionId) return;
    setPdfError('');
    try {
      const blob = await downloadAssessmentFlowPdf(sessionId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `personality-profile-${sessionId.slice(0, 8)}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setPdfError(error.message || 'Unable to download report PDF.');
    }
  };

  const handleShare = async () => {
    setShareStatus('');
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Personality Assessor Profile',
          text: 'Review my professional profile summary and career alignment.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('Link copied to clipboard.');
        setTimeout(() => setShareStatus(''), 3000);
      }
    } catch (e) {
      // Ignored
    }
  };

  const handleRetake = () => {
    clearAssessmentFlowState(auth.userId);
    navigate('/assessment/start');
  };

  const sendChatMessage = async (overridePrompt) => {
    const outgoing = (overridePrompt || message || '').trim();
    if (!outgoing || chatMutation.isPending || !sessionId) return;

    setMessage('');
    setChatError('');
    setChatTyping(true);

    const optimisticUser = { role: 'user', content: outgoing, timestamp: new Date().toISOString() };
    setChatHistory((prev) => [...prev, optimisticUser]);

    try {
      const reply = await chatMutation.mutateAsync({
        sessionId,
        message: outgoing,
      });

      const assistantMsg = {
        role: 'assistant',
        content: reply.message || reply.response || 'No response provided.',
        timestamp: new Date().toISOString(),
      };
      setChatHistory((prev) => [...prev, assistantMsg]);
      if (Array.isArray(reply.followUps) && reply.followUps.length) {
        setFollowUpPrompts(reply.followUps);
      }
    } catch (error) {
      setChatError(error.message || 'Coach chat is temporarily unavailable.');
    } finally {
      setChatTyping(false);
    }
  };

  if (resultQuery.isPending) {
    return (
      <main className="app-page profile-results-page">
        <div className="page-shell profile-results-shell">
          <div className="profile-results-loading">
            <Loader label="Synthesizing your profile..." variant="general" />
            <Skeleton height="36px" />
            <Skeleton height="140px" />
            <Skeleton height="280px" />
          </div>
        </div>
      </main>
    );
  }

  if (!result || resultQuery.isError) {
    return (
      <main className="app-page profile-results-page">
        <div className="page-shell profile-results-shell">
          <div className="profile-results-error">
            <h1>Profile Unavailable</h1>
            <p className="ui-message ui-message--error">
              {resultQuery.error?.message || 'Unable to load your profile session.'}
            </p>
            <Button onClick={() => navigate('/assessment/start')}>Start New Assessment</Button>
          </div>
        </div>
      </main>
    );
  }

  const profileSummary =
    result.summary ||
    result.profile_summary ||
    normalized.summaryText ||
    'Your responses synthesize into four independent profile lenses: baseline personality spectrums, vocational interests, work values, and demonstrated career signals.';

  const bigFiveList = traits.length
    ? traits.map((t) => [t.trait, t.score, t.interpretation || 'Continuous dimensional measure'])
    : [
        ['Openness', 76, 'Curiosity and tolerance for structural ambiguity'],
        ['Conscientiousness', 68, 'Deliberate planning and execution rigor'],
        ['Extraversion', 54, 'Balanced collaborative and independent focus'],
        ['Agreeableness', 63, 'Constructive inquiry with shared outcomes'],
        ['Emotional Stability', 71, 'Stable execution under shifting constraints'],
      ];

  const riasecScores = phaseScores?.riasec || {};
  const riasecList = Object.keys(riasecScores).length
    ? Object.entries(riasecScores).map(([k, v]) => [k, typeof v === 'object' ? v.score || 0 : Number(v || 0)])
    : [
        ['Investigative', 78],
        ['Artistic', 70],
        ['Conventional', 62],
        ['Enterprising', 57],
        ['Realistic', 56],
        ['Social', 51],
      ];

  const careerSignals = phaseScores?.careerSignals || {};

  return (
    <main className="app-page profile-results-page">
      <div className="page-shell profile-results-shell">
        {/* Navigation & Header */}
        <header className="profile-results-top-bar">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <FiArrowLeft /> Dashboard
          </Button>
          <div className="profile-results-top-actions">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <FiShare2 /> Share
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownloadPdf}>
              <FiDownload /> Export PDF
            </Button>
          </div>
        </header>

        {shareStatus && <p className="ui-message ui-message--success">{shareStatus}</p>}
        {pdfError && <p className="ui-message ui-message--error">{pdfError}</p>}

        {/* ── PART 1: Primary Profile Statement ───────────────────────────── */}
        <section className="profile-primary-statement-section" aria-labelledby="profile-statement-heading">
          <header className="profile-primary-statement-header">
            <span className="profile-badge-quiet">Verified Result</span>
            <h1 id="profile-statement-heading" className="profile-primary-title">
              Your current profile
            </h1>
            <p className="profile-primary-subtitle">
              Four distinct readings of how you approach problems, what kinds of work hold your attention, what
              environments you need, and what capabilities your background demonstrates.
            </p>
          </header>

          <div className="profile-summary-card">
            <p className="profile-summary-text">{profileSummary}</p>
            {flowAiStatus && (
              <div className="profile-ai-status-row">
                <AiStatusBadges status={flowAiStatus} onRetry={() => retryAiMutation.mutate()} />
              </div>
            )}
          </div>
        </section>

        {/* ── PART 2: Four Profile Readings ────────────────────────────────── */}
        <section className="profile-readings-section" aria-labelledby="profile-readings-heading">
          <header className="profile-readings-header">
            <h2 id="profile-readings-heading" className="profile-section-title">
              Profile Readings
            </h2>
            <div className="profile-lens-switcher" role="tablist" aria-label="Profile dimensions">
              {[
                ['personality', 'Personality'],
                ['interests', 'Interests'],
                ['values', 'Work Values'],
                ['signals', 'Career Signals'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeLens === key}
                  className={`profile-lens-btn ${activeLens === key ? 'is-active' : ''}`}
                  onClick={() => setActiveLens(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </header>

          <div className="profile-readings-stage">
            {activeLens === 'personality' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>Big Five Continuous Dimensions</h3>
                  <span>Directly labelled continuous scales</span>
                </div>
                <div className="profile-reading-panel__body">
                  {bigFiveList.map(([name, score, reading]) => (
                    <article key={name} className="profile-dimension-row">
                      <div className="profile-dimension-row__info">
                        <strong>{name}</strong>
                        <span>{score}%</span>
                      </div>
                      <div className="profile-dimension-bar">
                        <div className="profile-dimension-bar__fill" style={{ width: `${score}%` }} />
                      </div>
                      <p className="profile-dimension-row__reading">{reading}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeLens === 'interests' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>RIASEC Vocational Interests</h3>
                  <span>Ranked relational interest field</span>
                </div>
                <div className="profile-reading-panel__body profile-interests-field">
                  {riasecList.map(([name, score]) => (
                    <article key={name} className="profile-interest-badge">
                      <div className="profile-interest-badge__head">
                        <strong>{name}</strong>
                        <span>{score}%</span>
                      </div>
                      <div className="profile-dimension-bar">
                        <div className="profile-dimension-bar__fill" style={{ width: `${score}%` }} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {activeLens === 'values' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>Work Values Hierarchy</h3>
                  <span>12 workplace values ranked by relative priority</span>
                </div>
                <div className="profile-reading-panel__body">
                  <WorkValuesProfileCard values={phaseScores?.workValues || {}} />
                </div>
              </div>
            )}

            {activeLens === 'signals' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>Career Signals &amp; Demonstrated Capabilities</h3>
                  <span>Synthesized from contextual and scenario responses</span>
                </div>
                <div className="profile-reading-panel__body">
                  {Object.keys(careerSignals).length > 0 ? (
                    <div className="profile-signals-grid">
                      {Object.entries(careerSignals).map(([key, val]) => (
                        <article key={key} className="profile-signal-card">
                          <strong>{key}</strong>
                          <p>{typeof val === 'object' ? JSON.stringify(val) : String(val)}</p>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="profile-signals-empty">
                      Demonstrated signals calibrated through adaptive questions and background parsing.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── PART 3: Evidence & Confidence Field ──────────────────────────── */}
        <section className="profile-evidence-section" aria-labelledby="evidence-heading">
          <header className="profile-section-header">
            <h2 id="evidence-heading" className="profile-section-title">
              Evidence &amp; Confidence
            </h2>
            <p className="profile-section-subtitle">
              Distinguishing verified signals, context-dependent readings, and areas with limited data.
            </p>
          </header>

          <ScoringEvidenceCard
            evidenceList={normalized.evidence}
            warnings={normalized.warnings}
            scoreMeta={normalized.scoreMeta || result?.meta}
          />
        </section>

        {/* ── PART 4: Career Relationships ─────────────────────────────────── */}
        <section className="profile-careers-section" aria-labelledby="careers-heading">
          <header className="profile-section-header">
            <h2 id="careers-heading" className="profile-section-title">
              Career Alignment
            </h2>
            <p className="profile-section-subtitle">
              Why roles match your profile, where the stretch exists, and concrete actions to strengthen alignment.
            </p>
          </header>

          <div className="profile-careers-grid">
            {recommendations.slice(0, 3).map((rec, index) => (
              <CareerRecommendationCard
                key={rec.title || rec.careerId || index}
                career={rec}
                onSelectCareer={() => navigate(`/assessment/career?session=${sessionId}`)}
              />
            ))}
          </div>

          <div className="profile-careers-actions">
            <Button variant="secondary" onClick={() => navigate(`/assessment/career?session=${sessionId}`)}>
              <FiCompass /> Open Full Career Explorer
            </Button>
          </div>
        </section>

        {/* ── PART 5: Development Roadmap ──────────────────────────────────── */}
        <section className="profile-roadmap-section" aria-labelledby="roadmap-heading">
          <header className="profile-section-header">
            <h2 id="roadmap-heading" className="profile-section-title">
              Development Roadmap
            </h2>
            <p className="profile-section-subtitle">
              Your next move becomes new evidence. Follow deliberate milestones to evolve your capabilities.
            </p>
          </header>

          <div className="profile-roadmap-flow">
            <article className="profile-roadmap-step">
              <span className="roadmap-step-num">1</span>
              <h3>Identify Gaps</h3>
              <p>Review the areas where your current signals differ from target environment demands.</p>
            </article>
            <article className="profile-roadmap-step">
              <span className="roadmap-step-num">2</span>
              <h3>Take Deliberate Action</h3>
              <p>Execute focused projects that practice unproven competencies under real constraints.</p>
            </article>
            <article className="profile-roadmap-step">
              <span className="roadmap-step-num">3</span>
              <h3>Produce Visible Artifacts</h3>
              <p>Document technical outcomes, design systems, architectural records, or case studies.</p>
            </article>
            <article className="profile-roadmap-step">
              <span className="roadmap-step-num">4</span>
              <h3>Bring Evidence Back</h3>
              <p>Re-enter new milestones into your profile to update future interpretation.</p>
            </article>
          </div>
        </section>

        {/* ── PART 6: Methodology & Boundaries ────────────────────────────── */}
        <section className="profile-methodology-notice-section">
          <div className="profile-methodology-notice">
            <h3>Methodology &amp; Interpretive Boundaries</h3>
            <p>
              Core dimensional calculations and career fit algorithms are computed deterministically. AI provides
              narrative context and explanations but never modifies underlying numerical logic. This profile is
              designed for professional reflection and career exploration—not medical diagnosis, hiring decisions, or
              employment guarantees.
            </p>
          </div>
        </section>

        {/* ── PART 7: Report Utilities ─────────────────────────────────────── */}
        <section className="profile-utilities-section">
          <div className="profile-utilities-bar">
            <Button variant="ghost" onClick={handleRetake}>
              <FiRefreshCw /> Retake Assessment
            </Button>
            <Button variant="primary" onClick={handleDownloadPdf}>
              <FiDownload /> Download Full Report PDF
            </Button>
          </div>
        </section>

        {/* ── PART 8: Career Coach Exploration ─────────────────────────────── */}
        <section className="profile-coach-section" aria-labelledby="coach-heading">
          <header className="profile-section-header">
            <h2 id="coach-heading" className="profile-section-title">
              Guided Career Coach
            </h2>
            <p className="profile-section-subtitle">
              Ask targeted questions about your results, skill trade-offs, and development priorities.
            </p>
          </header>

          <div className="profile-coach-chat-card">
            <div className="profile-coach-feed" ref={chatFeedRef}>
              {chatHistory.length === 0 ? (
                <div className="profile-coach-empty">
                  <FiMessageCircle />
                  <p>Start a conversation with the Career Coach to explore your results in depth.</p>
                </div>
              ) : (
                chatHistory.map((item, idx) => (
                  <div key={idx} className={`coach-msg coach-msg--${item.role}`}>
                    <strong>{item.role === 'user' ? 'You' : 'Career Coach'}</strong>
                    <p>{item.content}</p>
                  </div>
                ))
              )}
              {chatTyping && (
                <div className="coach-msg coach-msg--assistant">
                  <strong>Career Coach</strong>
                  <p>Analyzing profile context…</p>
                </div>
              )}
            </div>

            {chatError && <p className="ui-message ui-message--error">{chatError}</p>}

            <div className="profile-coach-prompts">
              {followUpPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="coach-prompt-chip"
                  onClick={() => sendChatMessage(prompt)}
                  disabled={chatMutation.isPending}
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              className="profile-coach-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendChatMessage();
              }}
            >
              <input
                type="text"
                className="ui-input"
                placeholder="Ask about your results or career roadmap…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={chatMutation.isPending}
              />
              <Button type="submit" disabled={!message.trim() || chatMutation.isPending}>
                <FiSend /> Send
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AssessmentFlowResultPage;
