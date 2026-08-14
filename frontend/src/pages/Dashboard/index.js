import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiCompass,
  FiFileText,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiUser,
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import { useAuth } from '../../hooks/useAuth';
import {
  useAssessmentHistoryQuery,
  useAssessmentReportQuery,
  useTraitTrendsQuery,
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

const DashboardPage = () => {
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
  const previousTraits = previousAssessment ? normalizeTraits(previousAssessment.traits || {}) : null;

  const traitDeltas = useMemo(() => {
    if (!previousTraits) return null;
    return TRAIT_ORDER.map((traitKey) => {
      const current = latestTraits[traitKey] || 0;
      const prev = previousTraits[traitKey] || 0;
      const delta = current - prev;
      return {
        traitKey,
        label: TRAIT_META[traitKey]?.name || traitKey,
        current,
        previous: prev,
        delta,
      };
    });
  }, [latestTraits, previousTraits]);

  const recommendedCareers =
    latestReportQuery.data?.recommendedCareers ||
    latestReportQuery.data?.career_recommendations ||
    latestAssessment?.recommendedCareers ||
    [];

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

  return (
    <main className="app-page dashboard-page">
      <div className="page-shell dashboard-shell">
        {/* Top User Greeting */}
        <header className="dashboard-header-bar">
          <div>
            <span className="profile-badge-quiet">Evidence Field</span>
            <h1 className="dashboard-title">
              {auth.user?.name ? `${auth.user.name}'s Profile` : 'Your Profile Overview'}
            </h1>
            <p className="dashboard-subtitle">
              Manage your verified assessments, inspect continuous profile lenses, and track deliberate development.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <Button variant="secondary" onClick={() => navigate('/analytics')}>
              <FiBarChart2 /> Longitudinal Analytics
            </Button>
            <Button variant="primary" onClick={() => navigate('/assessment/start')}>
              <FiPlay /> Start Assessment
            </Button>
          </div>
        </header>

        {/* ── 1. In-Progress Assessment Banner ────────────────────────────── */}
        {isSessionActive && (
          <section className="dashboard-in-progress-banner" role="region" aria-label="Active Assessment Session">
            <div className="in-progress-banner-content">
              <span className="in-progress-badge">In Progress</span>
              <h2>You have an active assessment session</h2>
              <p>Continue your responses from where you left off.</p>
            </div>
            <Button variant="primary" onClick={resumeActiveAssessment}>
              Resume Assessment <FiArrowRight />
            </Button>
          </section>
        )}

        {/* ── 2. Latest Profile Overview ──────────────────────────────────── */}
        {latestAssessment ? (
          <section className="dashboard-latest-profile-section">
            <header className="dashboard-section-head">
              <h2>Latest Profile Snapshot</h2>
              <span className="dashboard-record-date">Completed on {formatDate(latestAssessment.completedAt || latestAssessment.createdAt)}</span>
            </header>

            <div className="dashboard-profile-lenses-card">
              <div className="dashboard-profile-summary-text">
                <p>
                  {latestReportQuery.data?.summary ||
                    latestReportQuery.data?.profile_summary ||
                    'Continuous five-factor personality measures calibrated from your adaptive responses.'}
                </p>
              </div>

              <div className="dashboard-dimensions-display">
                <h3>Big Five Continuous Dimensions</h3>
                <div className="dashboard-dimensions-grid">
                  {TRAIT_ORDER.map((traitKey) => {
                    const score = latestTraits[traitKey] || 0;
                    const meta = TRAIT_META[traitKey] || { name: traitKey, description: '' };
                    return (
                      <article key={traitKey} className="dashboard-dimension-item">
                        <div className="dashboard-dimension-item__head">
                          <strong>{meta.name}</strong>
                          <span>{score}%</span>
                        </div>
                        <div className="profile-dimension-bar">
                          <div className="profile-dimension-bar__fill" style={{ width: `${score}%` }} />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="dashboard-profile-card-footer">
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/result/${latestAssessment.assessmentId}`)}
                >
                  View Full Report <FiArrowRight />
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <section className="dashboard-empty-state-card">
            <h2>No assessments completed yet</h2>
            <p>Begin with your CV or professional background to build your first verified profile.</p>
            <Button variant="primary" onClick={() => navigate('/assessment/start')}>
              Begin First Assessment
            </Button>
          </section>
        )}

        {/* ── 3. Career Direction ─────────────────────────────────────────── */}
        {recommendedCareers.length > 0 && (
          <section className="dashboard-careers-section">
            <header className="dashboard-section-head">
              <h2>Aligned Career Environments</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  navigate(
                    activeSessionId
                      ? `/assessment/career?session=${activeSessionId}`
                      : `/result/${latestAssessment?.assessmentId}`
                  )
                }
              >
                <FiCompass /> Explore All Roles
              </Button>
            </header>

            <div className="dashboard-careers-grid">
              {recommendedCareers.slice(0, 3).map((item, idx) => {
                const title = item.title || item.name || (typeof item === 'string' ? item : `Role ${idx + 1}`);
                const matchScore = Math.round(Number(item.match || item.score || item.fitScore || 75));
                return (
                  <article key={title} className="dashboard-career-card">
                    <div className="dashboard-career-card__head">
                      <h3>{title}</h3>
                      <span className="career-fit-pill">{matchScore}% fit</span>
                    </div>
                    <p>{item.why || item.description || 'Strong dimensional alignment with your problem-solving approaches.'}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ── 4. Meaningful Change (If 2+ assessments exist) ─────────────── */}
        {traitDeltas && (
          <section className="dashboard-change-section">
            <header className="dashboard-section-head">
              <h2>Profile Evolution vs Previous Session</h2>
              <span className="dashboard-record-date">Comparing last two assessments</span>
            </header>

            <div className="dashboard-deltas-grid">
              {traitDeltas.map((item) => (
                <article key={item.traitKey} className="dashboard-delta-card">
                  <span className="dashboard-delta-card__label">{item.label}</span>
                  <div className="dashboard-delta-card__values">
                    <span>{item.previous}% → {item.current}%</span>
                    <strong className={item.delta > 0 ? 'delta-pos' : item.delta < 0 ? 'delta-neg' : 'delta-zero'}>
                      {item.delta > 0 ? `+${item.delta}%` : `${item.delta}%`}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── 5. Assessment Records History ────────────────────────────────── */}
        <section className="dashboard-history-section">
          <header className="dashboard-section-head">
            <h2>Assessment Records</h2>
            <span>{assessments.length} total sessions</span>
          </header>

          {assessments.length > 0 ? (
            <div className="dashboard-history-list">
              {assessments.map((item, idx) => (
                <article key={item.assessmentId || idx} className="dashboard-history-row">
                  <div className="dashboard-history-row__info">
                    <strong>Assessment #{assessments.length - idx}</strong>
                    <span>{formatDate(item.completedAt || item.createdAt)}</span>
                  </div>
                  <div className="dashboard-history-row__actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/result/${item.assessmentId}`)}
                    >
                      View Report <FiArrowRight />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="empty-state">No historical assessments recorded.</p>
          )}
        </section>

        {/* ── 6. Account & Privacy Quick Links ─────────────────────────────── */}
        <footer className="dashboard-footer-links">
          <Link to="/account/privacy" className="dashboard-footer-link">
            <FiShield /> Manage Account &amp; Privacy Controls
          </Link>
          <Link to="/methodology" className="dashboard-footer-link">
            <FiFileText /> Methodology &amp; Scoring Principles
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default DashboardPage;
