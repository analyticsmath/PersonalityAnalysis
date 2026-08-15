import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCompass,
  FiPlay,
  FiShield,
  FiUploadCloud,
} from 'react-icons/fi';

import Button from '../../components/ui/Button';
import ProductShell from '../../components/product/ProductShell';
import { useAuth } from '../../hooks/useAuth';
import {
  useAssessmentHistoryQuery,
  useAssessmentReportQuery,
} from '../../hooks/useAssessment';
import { useActiveFlowSessionQuery } from '../../hooks/useAssessmentFlow';
import { readAssessmentFlowState } from '../../utils/assessmentFlowStorage';
import { normalizeTraits, TRAIT_META, TRAIT_ORDER } from '../../utils/traits';

const formatDate = (value) => {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const toFiniteNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const historyQuery = useAssessmentHistoryQuery(auth.userId, Boolean(auth.userId));
  const activeFlowSessionQuery = useActiveFlowSessionQuery();

  const assessments = useMemo(() => historyQuery.data || [], [historyQuery.data]);
  const latestAssessment = assessments[0] || null;
  const previousAssessment = assessments[1] || null;

  const latestReportQuery = useAssessmentReportQuery(
    latestAssessment?.assessmentId,
    Boolean(latestAssessment?.assessmentId)
  );

  const rawFlowSession = activeFlowSessionQuery.data?.session || null;
  const localFlowState = readAssessmentFlowState(auth.userId);
  const activeSessionId = rawFlowSession?.sessionId || localFlowState?.sessionId || null;
  const activeSessionStage = rawFlowSession?.stage || localFlowState?.stage || 'questionnaire';

  const isSessionActive = Boolean(
    activeSessionId &&
      activeSessionStage !== 'result' &&
      activeSessionStage !== 'completed'
  );

  const latestTraits = normalizeTraits(
    latestReportQuery.data?.traits || latestAssessment?.traits || {}
  );
  const hasTraits = Object.keys(latestTraits).length > 0;

  const previousTraits = previousAssessment ? normalizeTraits(previousAssessment.traits || {}) : null;

  const traitDeltas = useMemo(() => {
    if (!previousTraits || !hasTraits) return null;
    const comparable = [];
    for (const traitKey of TRAIT_ORDER) {
      const curNum = toFiniteNumberOrNull(latestTraits[traitKey]);
      const prevNum = toFiniteNumberOrNull(previousTraits[traitKey]);
      if (curNum !== null && prevNum !== null) {
        const current = Math.round(curNum);
        const prev = Math.round(prevNum);
        const delta = current - prev;
        comparable.push({
          traitKey,
          label: TRAIT_META[traitKey]?.name || traitKey,
          current,
          previous: prev,
          delta,
        });
      }
    }
    return comparable.length >= 3 ? comparable : null;
  }, [latestTraits, previousTraits, hasTraits]);

  const rawCareers =
    latestReportQuery.data?.recommendedCareers ||
    latestReportQuery.data?.career_recommendations ||
    latestAssessment?.recommendedCareers ||
    [];
  const recommendedCareers = Array.isArray(rawCareers) ? rawCareers : [];

  const resumeActiveAssessment = () => {
    if (!activeSessionId) {
      navigate('/assessment/start');
      return;
    }
    if (activeSessionStage === 'behavior') {
      navigate(`/assessment/behavior?session=${activeSessionId}`);
      return;
    }
    navigate(`/assessment/test?session=${activeSessionId}`);
  };

  const userName = auth.user?.name || auth.name || 'User';

  /* ── 1. D0 Maturity: Single Authored Onboarding Workspace (No 01/02/03 Numbered Cards / No Empty Boxes) ── */
  if (assessments.length === 0 && !historyQuery.isLoading) {
    return (
      <ProductShell
        title="Overview"
        actions={
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiPlay /> Start Assessment
          </Button>
        }
      >
        <div className="dashboard-d0-workspace">
          {/* Main Hero Unstarted Narrative Stage */}
          <section className="dashboard-d0-hero" aria-labelledby="d0-heading">
            <header className="dashboard-d0-header">
              <h2 id="d0-heading" className="dashboard-d0-title">
                Welcome, {userName}. Your professional profile starts here.
              </h2>
              <p className="dashboard-d0-lead">
                Calibrated profile readings require verified background context and your first adaptive response session.
              </p>
            </header>

            <div className="dashboard-d0-actions">
              <Button variant="primary" size="md" onClick={() => navigate('/assessment/start')}>
                <FiPlay /> Start Your First Assessment <FiArrowRight />
              </Button>
              <Button variant="secondary" size="md" onClick={() => navigate('/assessment/start')}>
                <FiUploadCloud /> Upload or Review Your Context
              </Button>
            </div>
          </section>

          {/* Quiet Inline Process Nouns (Not Numbered 01/02/03 Cards) */}
          <div className="dashboard-d0-sequence" aria-label="Process Overview">
            <div className="dashboard-d0-step">
              <strong className="dashboard-d0-step__title">Context &amp; Evidence</strong>
              <p className="dashboard-d0-step__desc">Upload verifiable background anchors or input manual experience.</p>
            </div>
            <div className="dashboard-d0-step">
              <strong className="dashboard-d0-step__title">Adaptive Calibration</strong>
              <p className="dashboard-d0-step__desc">Complete 22–26 decision prompts that adapt to your domain.</p>
            </div>
            <div className="dashboard-d0-step">
              <strong className="dashboard-d0-step__title">Four Readings</strong>
              <p className="dashboard-d0-step__desc">Inspect personality, interests, values, and explainable career fit.</p>
            </div>
          </div>

          <footer className="dashboard-d0-footer">
            <Link to="/methodology" className="dashboard-quiet-link">
              Inspect psychometric methodology
            </Link>
            <Link to="/account/privacy" className="dashboard-quiet-link">
              <FiShield style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Privacy &amp; Data Governance
            </Link>
          </footer>
        </div>
      </ProductShell>
    );
  }

  /* ── 2. D1 Maturity: Dominant Current Profile Stage (~64% Desktop) + Adjacent Career Index ── */
  if (assessments.length === 1) {
    return (
      <ProductShell
        title="Overview"
        actions={
          <div style={{ display: 'flex', gap: '10px' }}>
            {isSessionActive && (
              <Button variant="secondary" size="sm" onClick={resumeActiveAssessment}>
                <FiCompass /> Resume Active
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
              <FiPlay /> New Assessment
            </Button>
          </div>
        }
      >
        <div className="dashboard-d1-layout">
          {/* Dominant Calibrated Profile Field (Left / Main) */}
          <section className="dashboard-d1-profile" aria-labelledby="d1-profile-title">
            <header className="dashboard-section-header">
              <div>
                <h2 id="d1-profile-title" className="dashboard-section-title">
                  Current Calibrated Profile
                </h2>
                <p className="dashboard-section-meta">
                  Recorded on {formatDate(latestAssessment.createdAt || latestAssessment.date)}
                </p>
              </div>
              <Link
                to={`/result/${latestAssessment.assessmentId}`}
                className="public-text-action"
                style={{ fontSize: '0.875rem' }}
              >
                Full Report <FiArrowRight />
              </Link>
            </header>

            <div className="dashboard-profile-traits-list">
              {hasTraits ? (
                TRAIT_ORDER.map((traitKey) => {
                  const score = toFiniteNumberOrNull(latestTraits[traitKey]);
                  const meta = TRAIT_META[traitKey] || { name: traitKey };
                  return (
                    <div key={traitKey} className="dashboard-trait-row">
                      <div className="dashboard-trait-row__info">
                        <span className="dashboard-trait-name">{meta.name}</span>
                        {score !== null ? (
                          <span className="dashboard-trait-val tabular-nums">{Math.round(score)}/100</span>
                        ) : (
                          <span className="dashboard-trait-na">Not available</span>
                        )}
                      </div>
                      <div className="dashboard-trait-track">
                        {score !== null && (
                          <div className="dashboard-trait-fill" style={{ width: `${Math.round(score)}%` }} />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: 'var(--pa-text, #4F5358)' }}>Profile dimensions are being calculated.</p>
              )}
            </div>

            <footer className="dashboard-profile-footer">
              <span>Single assessment calibration. Complete subsequent assessments to unlock longitudinal trajectory.</span>
            </footer>
          </section>

          {/* Adjacent Career Relationships Index (Right Rail) */}
          <section className="dashboard-d1-careers" aria-labelledby="d1-careers-title">
            <header className="dashboard-section-header">
              <h3 id="d1-careers-title" className="dashboard-section-title" style={{ fontSize: '1.1rem' }}>
                Top Career Relationships
              </h3>
            </header>

            <div className="dashboard-careers-index">
              {recommendedCareers.slice(0, 4).map((career, i) => {
                const title = career.title || career.careerTitle || career.name || `Role #${i + 1}`;
                const fitScore = toFiniteNumberOrNull(career.match ?? career.fitScore ?? career.score);
                return (
                  <div key={title} className="dashboard-career-row">
                    <span className="dashboard-career-title">{title}</span>
                    {fitScore !== null ? (
                      <span className="dashboard-career-fit tabular-nums">{Math.round(fitScore)}% Fit</span>
                    ) : (
                      <span className="dashboard-career-na">Not enough evidence</span>
                    )}
                  </div>
                );
              })}
            </div>

            <footer className="dashboard-section-footer">
              <Link to="/assessment/career" className="dashboard-quiet-link">
                Explore all aligned careers
              </Link>
            </footer>
          </section>
        </div>
      </ProductShell>
    );
  }

  /* ── 3. D2+ Maturity: Dominant Longitudinal Change Visualization + History Timeline ── */
  return (
    <ProductShell
      title="Overview"
      actions={
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="sm" onClick={() => navigate('/analytics')}>
            <FiBarChart2 /> Full Analytics
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiPlay /> New Assessment
          </Button>
        </div>
      }
    >
      <div className="dashboard-d2-layout">
        {/* Dominant Longitudinal Shift Field */}
        <section className="dashboard-d2-trajectory" aria-labelledby="d2-profile-title">
          <header className="dashboard-section-header">
            <div>
              <h2 id="d2-profile-title" className="dashboard-section-title">
                Longitudinal Trajectory &amp; Shifts
              </h2>
              <p className="dashboard-section-meta">
                Comparing latest assessment ({formatDate(latestAssessment?.createdAt)}) against baseline ({formatDate(previousAssessment?.createdAt)})
              </p>
            </div>
            <Link to="/analytics" className="public-text-action" style={{ fontSize: '0.875rem' }}>
              Trajectory Details <FiArrowRight />
            </Link>
          </header>

          <div className="dashboard-deltas-list">
            {traitDeltas && traitDeltas.length > 0 ? (
              traitDeltas.map((item) => (
                <div key={item.traitKey} className="dashboard-delta-row">
                  <div className="dashboard-delta-head">
                    <span className="dashboard-delta-name">{item.label}</span>
                    <div className="dashboard-delta-numbers">
                      <span className="tabular-nums" style={{ color: 'var(--pa-text, #4F5358)' }}>
                        {item.previous} → {item.current}
                      </span>
                      {/* Neutral delta display: No green/red moral judgments on trait shift */}
                      <span
                        className="tabular-nums dashboard-delta-badge"
                        style={{
                          fontWeight: '600',
                          color: 'var(--pa-ink, #0B0B0B)',
                        }}
                      >
                        {item.delta > 0 ? `+${item.delta}` : item.delta}
                      </span>
                    </div>
                  </div>
                  <div className="dashboard-trait-track">
                    <div className="dashboard-trait-fill" style={{ width: `${item.current}%` }} />
                  </div>
                </div>
              ))
            ) : hasTraits ? (
              TRAIT_ORDER.map((traitKey) => {
                const score = toFiniteNumberOrNull(latestTraits[traitKey]);
                const meta = TRAIT_META[traitKey] || { name: traitKey };
                return (
                  <div key={traitKey} className="dashboard-trait-row">
                    <div className="dashboard-trait-row__info">
                      <span className="dashboard-trait-name">{meta.name}</span>
                      {score !== null ? (
                        <span className="dashboard-trait-val tabular-nums">{Math.round(score)}/100</span>
                      ) : (
                        <span className="dashboard-trait-na">Not available</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: 'var(--pa-text, #4F5358)' }}>Not enough history to compute trait shifts.</p>
            )}
          </div>

          <footer className="dashboard-profile-footer">
            <span>{assessments.length} assessment sessions on record.</span>
          </footer>
        </section>

        {/* Assessment Records Timeline (Right Rail) */}
        <section className="dashboard-d2-history" aria-labelledby="history-summary-title">
          <header className="dashboard-section-header">
            <h3 id="history-summary-title" className="dashboard-section-title" style={{ fontSize: '1.1rem' }}>
              Assessment Records
            </h3>
          </header>

          <div className="dashboard-history-list">
            {assessments.slice(0, 4).map((ass) => (
              <div key={ass.assessmentId} className="dashboard-history-item">
                <div>
                  <strong className="dashboard-history-title">
                    Assessment #{ass.assessmentId?.slice(-4) || '1'}
                  </strong>
                  <span className="dashboard-history-date">
                    {formatDate(ass.createdAt || ass.date)}
                  </span>
                </div>
                <Link
                  to={`/result/${ass.assessmentId}`}
                  className="dashboard-quiet-link"
                >
                  View
                </Link>
              </div>
            ))}
          </div>

          <footer className="dashboard-section-footer">
            <Link to="/analytics" className="dashboard-quiet-link">
              View complete history timeline
            </Link>
          </footer>
        </section>
      </div>
    </ProductShell>
  );
}
