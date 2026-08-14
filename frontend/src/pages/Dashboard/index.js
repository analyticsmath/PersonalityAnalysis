import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCompass,
  FiFileText,
  FiPlay,
  FiRefreshCw,
  FiShield,
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import ProductShell from '../../components/product/ProductShell';
import ProductIllustration from '../../components/ui/ProductIllustration';
import EmptyProductState from '../../components/ui/EmptyProductState';
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
      const curRaw = latestTraits[traitKey];
      const prevRaw = previousTraits[traitKey];
      const hasCur = curRaw !== null && curRaw !== undefined && curRaw !== '' && Number.isFinite(Number(curRaw));
      const hasPrev = prevRaw !== null && prevRaw !== undefined && prevRaw !== '' && Number.isFinite(Number(prevRaw));
      if (hasCur && hasPrev) {
        const current = Math.round(Number(curRaw));
        const prev = Math.round(Number(prevRaw));
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

  return (
    <ProductShell
      title="Profile Overview"
      actions={
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary" size="sm" onClick={() => navigate('/analytics')}>
            <FiBarChart2 /> Analytics
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={isSessionActive ? resumeActiveAssessment : () => navigate('/assessment/start')}
          >
            {isSessionActive ? (
              <>
                <FiCompass /> Resume Assessment
              </>
            ) : (
              <>
                <FiPlay /> Start Assessment
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="dashboard-grid">
        {/* ── ROW A: Welcome (8 cols) + Assessment Status (4 cols) ── */}
        <div className="col-span-8">
          <section className="dashboard-widget dashboard-widget--hero" aria-labelledby="welcome-title">
            <div className="dashboard-widget__head">
              <div>
                <h2 id="welcome-title" className="dashboard-widget__title">
                  {auth.isAuthenticated ? `Welcome back, ${userName}` : 'Your Profile Overview'}
                </h2>
                <p className="dashboard-widget__subtitle">
                  {latestAssessment
                    ? `Latest profile recorded on ${formatDate(latestAssessment.completedAt || latestAssessment.createdAt)}.`
                    : 'Your profile starts with professional context and adaptive questioning.'}
                </p>
              </div>
              <ProductIllustration slotKey="profile-start" decorative className="dashboard-hero-illustration" />
            </div>

            <div className="dashboard-widget__body">
              <p style={{ color: 'var(--ink)', fontSize: '0.96875rem', lineHeight: '1.6', margin: 0 }}>
                {latestReportQuery.data?.summary ||
                  latestReportQuery.data?.profile_summary ||
                  (latestAssessment
                    ? 'Continuous five-factor personality dimensions and vocational interests calibrated from your adaptive responses.'
                    : 'Upload your CV or enter your background manually to generate calibrated personality readings and career alignment.')}
              </p>
            </div>

            <div className="dashboard-widget__footer">
              {latestAssessment ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/result/${latestAssessment.assessmentId}`)}
                >
                  Inspect Full Profile <FiArrowRight />
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
                  Begin First Assessment <FiArrowRight />
                </Button>
              )}
            </div>
          </section>
        </div>

        <div className="col-span-4">
          <section className="dashboard-widget" aria-labelledby="assessment-status-title">
            <div className="dashboard-widget__head">
              <h2 id="assessment-status-title" className="dashboard-widget__title">
                Assessment Status
              </h2>
            </div>
            <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--canvas)' }}>
                <span style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>Completed sessions</span>
                <strong style={{ fontSize: '1.15rem' }}>{assessments.length}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--canvas)' }}>
                <span style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>Active session</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 550, color: isSessionActive ? 'var(--info)' : 'var(--secondary)' }}>
                  {isSessionActive ? 'In Progress' : 'None'}
                </span>
              </div>
              {isSessionActive && (
                <div style={{ marginTop: '6px' }}>
                  <Button variant="primary" size="sm" block onClick={resumeActiveAssessment}>
                    Continue Session <FiArrowRight />
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── ROW B: Profile Snapshot (7 cols) + Next Action / Roadmap (5 cols) ── */}
        <div className="col-span-7">
          <section className="dashboard-widget" aria-labelledby="snapshot-title">
            <div className="dashboard-widget__head">
              <div>
                <h2 id="snapshot-title" className="dashboard-widget__title">
                  Profile Snapshot
                </h2>
                <p className="dashboard-widget__subtitle">Big Five Continuous Dimensions</p>
              </div>
              {latestAssessment && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/result/${latestAssessment.assessmentId}`)}
                >
                  View Details
                </Button>
              )}
            </div>

            <div className="dashboard-widget__body">
              {hasTraits ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {TRAIT_ORDER.map((traitKey) => {
                    const raw = latestTraits[traitKey];
                    const hasValue = raw !== null && raw !== undefined && raw !== '' && Number.isFinite(Number(raw));
                    const score = hasValue ? Math.round(Number(raw)) : null;
                    const meta = TRAIT_META[traitKey] || { name: traitKey };
                    return (
                      <div key={traitKey} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                          <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{meta.name}</span>
                          <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>
                            {hasValue ? `${score}%` : 'Not available'}
                          </span>
                        </div>
                        <div className="profile-dimension-bar">
                          <div
                            className="profile-dimension-bar__fill"
                            style={{ width: hasValue ? `${score}%` : '0%' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyProductState
                  illustrationKey="analytics-empty"
                  title="No profile readings yet"
                  description="Complete your first assessment to unlock calibrated five-factor personality measures."
                  action={
                    <Button variant="secondary" size="sm" onClick={() => navigate('/assessment/start')}>
                      Start Assessment
                    </Button>
                  }
                  compact
                />
              )}
            </div>
          </section>
        </div>

        <div className="col-span-5">
          <section className="dashboard-widget" aria-labelledby="action-roadmap-title">
            <div className="dashboard-widget__head">
              <h2 id="action-roadmap-title" className="dashboard-widget__title">
                Next Action
              </h2>
            </div>
            <div className="dashboard-widget__body">
              {isSessionActive ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--ink)', margin: 0 }}>
                    You have an unfinished assessment in progress. Complete your responses to synthesize updated profile readings.
                  </p>
                  <Button variant="primary" onClick={resumeActiveAssessment}>
                    Resume Assessment <FiArrowRight />
                  </Button>
                </div>
              ) : latestAssessment ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--ink)', margin: 0 }}>
                    Review your career alignment and investigate potential stretch capabilities in the Career Explorer.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      navigate(
                        activeSessionId
                          ? `/assessment/career?session=${activeSessionId}`
                          : `/result/${latestAssessment.assessmentId}`
                      )
                    }
                  >
                    Explore Careers <FiCompass />
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--secondary)', margin: 0 }}>
                    Provide professional context through CV or manual entry to begin your assessment journey.
                  </p>
                  <Button variant="primary" onClick={() => navigate('/assessment/start')}>
                    Begin Setup <FiPlay />
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── ROW C: Career Direction (5 cols) + Change Over Time (7 cols) ── */}
        <div className="col-span-5">
          <section className="dashboard-widget" aria-labelledby="careers-title">
            <div className="dashboard-widget__head">
              <h2 id="careers-title" className="dashboard-widget__title">
                Career Alignment
              </h2>
              {recommendedCareers.length > 0 && (
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
                  All Roles
                </Button>
              )}
            </div>
            <div className="dashboard-widget__body">
              {recommendedCareers.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {recommendedCareers.slice(0, 3).map((item, idx) => {
                    const title = item.title || item.name || (typeof item === 'string' ? item : `Role ${idx + 1}`);
                    const score = item.match ?? item.score ?? item.fitScore ?? null;
                    return (
                      <article
                        key={title}
                        style={{
                          background: 'var(--canvas)',
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.9375rem', color: 'var(--ink)' }}>{title}</strong>
                          {score !== null ? (
                            <span className="career-fit-badge">{Math.round(Number(score))}% fit</span>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Fit unavailable</span>
                          )}
                        </div>
                        {item.why || item.description ? (
                          <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', margin: 0, lineHeight: 1.4 }}>
                            {item.why || item.description}
                          </p>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <EmptyProductState
                  title="No career recommendations"
                  description="Complete an assessment session to generate evidence-based career alignment."
                  compact
                />
              )}
            </div>
          </section>
        </div>

        <div className="col-span-7">
          <section className="dashboard-widget" aria-labelledby="trend-title">
            <div className="dashboard-widget__head">
              <div>
                <h2 id="trend-title" className="dashboard-widget__title">
                  Change Over Time
                </h2>
                <p className="dashboard-widget__subtitle">
                  {traitDeltas ? 'Comparison between last two sessions' : 'Longitudinal profile tracking'}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/analytics')}>
                Analytics <FiArrowRight />
              </Button>
            </div>
            <div className="dashboard-widget__body">
              {traitDeltas ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {traitDeltas.map((item) => (
                    <div
                      key={item.traitKey}
                      style={{
                        background: 'var(--canvas)',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 500 }}>{item.label}</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{item.current}%</span>
                        <small
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: item.delta > 0 ? 'var(--success)' : item.delta < 0 ? 'var(--error)' : 'var(--secondary)',
                          }}
                        >
                          {item.delta > 0 ? `+${item.delta}%` : `${item.delta}%`}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyProductState
                  illustrationKey="analytics-empty"
                  title="Not enough history yet"
                  description="Complete another eligible assessment to compare change over time."
                  compact
                />
              )}
            </div>
          </section>
        </div>

        {/* ── ROW D: Recent Assessments (8 cols) + Governance Utilities (4 cols) ── */}
        <div className="col-span-8">
          <section className="dashboard-widget" aria-labelledby="history-title">
            <div className="dashboard-widget__head">
              <h2 id="history-title" className="dashboard-widget__title">
                Assessment Records
              </h2>
              <span style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>
                {assessments.length} total sessions
              </span>
            </div>
            <div className="dashboard-widget__body">
              {assessments.length > 0 ? (
                <div className="analytics-history-list">
                  {assessments.slice(0, 4).map((item, idx) => (
                    <div key={item.assessmentId || idx} className="analytics-history-row">
                      <div className="analytics-history-row__info">
                        <strong>Assessment #{assessments.length - idx}</strong>
                        <span>{formatDate(item.completedAt || item.createdAt)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/result/${item.assessmentId}`)}
                      >
                        View Report <FiArrowRight />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyProductState
                  title="No historical records"
                  description="Completed assessment sessions will be securely recorded here."
                  compact
                />
              )}
            </div>
          </section>
        </div>

        <div className="col-span-4">
          <section className="dashboard-widget" aria-labelledby="governance-title">
            <div className="dashboard-widget__head">
              <h2 id="governance-title" className="dashboard-widget__title">
                Data &amp; Controls
              </h2>
            </div>
            <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/account/privacy" className="analytics-history-row" style={{ textDecoration: 'none' }}>
                <div className="analytics-history-row__info">
                  <strong>Privacy Controls</strong>
                  <span>Export or delete your data</span>
                </div>
                <FiShield style={{ color: 'var(--secondary)' }} />
              </Link>
              <Link to="/methodology" className="analytics-history-row" style={{ textDecoration: 'none' }}>
                <div className="analytics-history-row__info">
                  <strong>Methodology</strong>
                  <span>Scoring principles and framework atlas</span>
                </div>
                <FiFileText style={{ color: 'var(--secondary)' }} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </ProductShell>
  );
}
