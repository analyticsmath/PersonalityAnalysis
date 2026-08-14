import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiCompass,
  FiFileText,
  FiPlay,
  FiShield,
  FiUploadCloud,
} from 'react-icons/fi';
import Button from '../../components/ui/Button';
import ProductShell from '../../components/product/ProductShell';
import ProductIllustration from '../../components/ui/ProductIllustration';
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

  /* ── 1. Honest Zero-Data Overview (0 Completed Assessments) ── */
  if (assessments.length === 0 && !historyQuery.isLoading) {
    return (
      <ProductShell
        title="Dashboard"
        actions={
          <Button variant="primary" size="sm" onClick={() => navigate('/assessment/start')}>
            <FiPlay /> Start Assessment
          </Button>
        }
      >
        <div className="dashboard-grid">
          {/* Main Hero Zero-Data Container (8 cols) */}
          <div className="col-span-8">
            <section className="dashboard-widget dashboard-widget--hero" aria-labelledby="zero-data-title">
              <div className="dashboard-widget__head">
                <div>
                  <span className="theatre-stage-tag" style={{ color: 'var(--secondary)' }}>
                    0 Completed Assessments
                  </span>
                  <h2 id="zero-data-title" className="dashboard-widget__title" style={{ fontSize: '1.6rem', marginTop: '6px' }}>
                    Welcome, {userName}. Your professional profile starts here.
                  </h2>
                  <p className="dashboard-widget__subtitle">
                    Calibrated profile readings require verified background context and your first adaptive response session.
                  </p>
                </div>
                <ProductIllustration slotKey="welcome" decorative className="dashboard-hero-illustration" />
              </div>

              <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: 'var(--ink)', fontSize: '0.96875rem', lineHeight: '1.6', margin: 0 }}>
                  Personality Assessor builds four distinct readings: continuous Big Five dimensions, vocational interest
                  territories (RIASEC), ranked work values, and career signals.
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <Button variant="primary" size="md" onClick={() => navigate('/assessment/start')}>
                    <FiPlay /> Start Your First Assessment <FiArrowRight />
                  </Button>
                  <Button variant="secondary" size="md" onClick={() => navigate('/assessment/start')}>
                    <FiUploadCloud /> Upload or Review Your CV
                  </Button>
                </div>
              </div>

              <div className="dashboard-widget__footer" style={{ justifyContent: 'flex-start', gap: '24px' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>
                  Deterministic psychometric calibration
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>
                  Strict data privacy &amp; zero training on personal records
                </span>
              </div>
            </section>
          </div>

          {/* Side Overview & Governance (4 cols) */}
          <div className="col-span-4">
            <section className="dashboard-widget" aria-labelledby="zero-guide-title">
              <div className="dashboard-widget__head">
                <h2 id="zero-guide-title" className="dashboard-widget__title">
                  What to Expect
                </h2>
              </div>
              <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span className="dev-step-indicator" style={{ background: 'var(--signal-strong)', marginTop: '5px' }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>1. Context Intake</strong>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', margin: '2px 0 0' }}>
                      Share your CV or professional background parameters.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span className="dev-step-indicator" style={{ background: 'var(--mist)', marginTop: '5px' }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>2. Adaptive Questions</strong>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', margin: '2px 0 0' }}>
                      Respond to scenario-based trade-offs calibrated to your domain.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span className="dev-step-indicator" style={{ background: 'var(--mist)', marginTop: '5px' }} />
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>3. Multidimensional Profile</strong>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', margin: '2px 0 0' }}>
                      Inspect four independent psychometric and career readings.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-widget" style={{ marginTop: '16px' }} aria-labelledby="zero-privacy-title">
              <div className="dashboard-widget__head">
                <h2 id="zero-privacy-title" className="dashboard-widget__title">
                  Data Governance
                </h2>
              </div>
              <div className="dashboard-widget__body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link to="/account/privacy" className="analytics-history-row" style={{ textDecoration: 'none' }}>
                  <div className="analytics-history-row__info">
                    <strong>Privacy &amp; Data Rights</strong>
                    <span>Manage export and deletion</span>
                  </div>
                  <FiShield style={{ color: 'var(--secondary)' }} />
                </Link>
                <Link to="/methodology" className="analytics-history-row" style={{ textDecoration: 'none' }}>
                  <div className="analytics-history-row__info">
                    <strong>Methodology Atlas</strong>
                    <span>Scoring principles and framework details</span>
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

  /* ── 2. Populated Macro-Layout Dashboard (>= 1 Assessment) ── */
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
                  Welcome back, {userName}
                </h2>
                <p className="dashboard-widget__subtitle">
                  Latest profile recorded on {formatDate(latestAssessment.completedAt || latestAssessment.createdAt)}.
                </p>
              </div>
              <ProductIllustration slotKey="profile-analysis" decorative className="dashboard-hero-illustration" />
            </div>

            <div className="dashboard-widget__body">
              <p style={{ color: 'var(--ink)', fontSize: '0.96875rem', lineHeight: '1.6', margin: 0 }}>
                {latestReportQuery.data?.summary ||
                  latestReportQuery.data?.profile_summary ||
                  'Continuous five-factor personality dimensions and vocational interests calibrated from your verified responses.'}
              </p>
            </div>

            <div className="dashboard-widget__footer">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/result/${latestAssessment.assessmentId}`)}
              >
                Inspect Full Profile <FiArrowRight />
              </Button>
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
                <p className="dashboard-widget__subtitle">Big Five Continuous Dimensions (0–100)</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/result/${latestAssessment.assessmentId}`)}
              >
                View Details
              </Button>
            </div>

            <div className="dashboard-widget__body">
              {hasTraits ? (
                <div className="lollipop-measures-list">
                  {TRAIT_ORDER.map((traitKey) => {
                    const raw = latestTraits[traitKey];
                    const hasValue = raw !== null && raw !== undefined && raw !== '' && Number.isFinite(Number(raw));
                    const score = hasValue ? Math.round(Number(raw)) : null;
                    const meta = TRAIT_META[traitKey] || { name: traitKey };
                    return (
                      <div key={traitKey} className="lollipop-row">
                        <div className="lollipop-label-group">
                          <span className="lollipop-name">{meta.name}</span>
                          <strong className="lollipop-value tabular-nums">
                            {hasValue ? `${score}%` : 'Not available'}
                          </strong>
                        </div>
                        <div className="lollipop-track">
                          {hasValue && (
                            <>
                              <div className="lollipop-bar-fill" style={{ width: `${score}%` }} />
                              <div className="lollipop-dot" style={{ left: `${score}%` }} />
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ color: 'var(--secondary)', fontSize: '0.875rem' }}>
                  Trait readings pending completion of full assessment battery.
                </p>
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
              ) : (
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
                    const hasScore =
                      score !== null &&
                      score !== undefined &&
                      score !== '' &&
                      Number.isFinite(Number(score));
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
                          {hasScore ? (
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
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>
                  Career recommendations will appear after assessment completion.
                </p>
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
                <p style={{ fontSize: '0.875rem', color: 'var(--secondary)', margin: 0 }}>
                  Complete an additional assessment to observe longitudinal trait changes.
                </p>
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
