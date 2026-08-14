import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiCompass, FiDownload, FiRefreshCw, FiShare2 } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import Skeleton from '../../components/ui/Skeleton';
import {
  useAssessmentComparisonQuery,
  useAssessmentHistoryQuery,
  useAssessmentReportQuery,
  useGenerateAiReportMutation,
} from '../../hooks/useAssessment';
import { useAuth } from '../../hooks/useAuth';
import { normalizeTraits } from '../../utils/traits';

const formatDate = (value) => {
  if (!value) return 'Not available';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(value));
};

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentId } = useParams();

  const auth = useAuth();
  const reportQuery = useAssessmentReportQuery(assessmentId, Boolean(assessmentId));
  const historyQuery = useAssessmentHistoryQuery(auth.userId, Boolean(auth.userId));
  const aiReportMutation = useGenerateAiReportMutation();

  const [activeLens, setActiveLens] = useState('personality');
  const [shareStatus, setShareStatus] = useState('');

  const routeResult = location.state?.result || null;
  const report = reportQuery.data || routeResult;
  const traits = normalizeTraits(report?.traits || {});

  const historyAssessments = useMemo(
    () => historyQuery.data || [],
    [historyQuery.data]
  );

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

  if (reportQuery.isPending && !routeResult) {
    return (
      <main className="app-page profile-results-page">
        <div className="page-shell profile-results-shell">
          <div className="profile-results-loading">
            <Skeleton height="36px" />
            <Skeleton height="140px" />
            <Skeleton height="280px" />
          </div>
        </div>
      </main>
    );
  }

  if (!report && reportQuery.isError) {
    return (
      <main className="app-page profile-results-page">
        <div className="page-shell profile-results-shell">
          <div className="profile-results-error">
            <h1>Assessment Record Unavailable</h1>
            <p className="ui-message ui-message--error">
              {reportQuery.error?.message || 'Unable to load this assessment record.'}
            </p>
            <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </div>
        </div>
      </main>
    );
  }

  const rawCareers = report?.recommendedCareers || report?.career_recommendations || [];
  const careers = Array.isArray(rawCareers) ? rawCareers : [];

  return (
    <main className="app-page profile-results-page">
      <div className="page-shell profile-results-shell">
        <header className="profile-results-top-bar">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <FiArrowLeft /> Dashboard
          </Button>
          <div className="profile-results-top-actions">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <FiShare2 /> Share
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.print()}>
              <FiDownload /> Print / Export
            </Button>
          </div>
        </header>

        {shareStatus && <p className="ui-message ui-message--success">{shareStatus}</p>}

        {/* ── PART 1: Primary Profile Statement ───────────────────────────── */}
        <section className="profile-primary-statement-section">
          <header className="profile-primary-statement-header">
            <span className="profile-badge-quiet">Assessment Record</span>
            <h1 className="profile-primary-title">Your current profile</h1>
            <p className="profile-primary-subtitle">
              Four distinct readings of how you approach problems, what kinds of work hold your attention, what
              environments you need, and what capabilities your background demonstrates.
            </p>
            <p className="profile-timestamp-label">Recorded on {formatDate(report?.completedAt || report?.createdAt)}</p>
          </header>

          <div className="profile-summary-card">
            <p className="profile-summary-text">
              {report?.summary ||
                report?.profile_summary ||
                'Your responses synthesize into four independent profile lenses: baseline personality spectrums, vocational interests, work values, and demonstrated career signals.'}
            </p>
          </div>
        </section>

        {/* ── PART 2: Four Profile Readings ────────────────────────────────── */}
        <section className="profile-readings-section">
          <header className="profile-readings-header">
            <h2 className="profile-section-title">Profile Readings</h2>
            <div className="profile-lens-switcher" role="tablist">
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
                  {Object.entries(traits).map(([traitKey, traitValue]) => {
                    const score = typeof traitValue === 'object' ? traitValue.score || 0 : Number(traitValue || 0);
                    return (
                      <article key={traitKey} className="profile-dimension-row">
                        <div className="profile-dimension-row__info">
                          <strong>{traitKey}</strong>
                          <span>{Math.round(score)}%</span>
                        </div>
                        <div className="profile-dimension-bar">
                          <div className="profile-dimension-bar__fill" style={{ width: `${score}%` }} />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {activeLens === 'interests' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>RIASEC Vocational Interests</h3>
                  <span>Ranked relational interest field</span>
                </div>
                <div className="profile-reading-panel__body">
                  <p className="profile-signals-empty">
                    Vocational interest distribution mapped across Holland work environments.
                  </p>
                </div>
              </div>
            )}

            {activeLens === 'values' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>Work Values Hierarchy</h3>
                  <span>Workplace motivators and priorities</span>
                </div>
                <div className="profile-reading-panel__body">
                  <p className="profile-signals-empty">
                    Workplace values calibrated against organizational settings.
                  </p>
                </div>
              </div>
            )}

            {activeLens === 'signals' && (
              <div className="profile-reading-panel">
                <div className="profile-reading-panel__head">
                  <h3>Career Signals &amp; Demonstrated Capabilities</h3>
                  <span>Synthesized problem-solving signals</span>
                </div>
                <div className="profile-reading-panel__body">
                  <p className="profile-signals-empty">
                    Demonstrated capabilities extracted from adaptive scenario responses.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── PART 4: Career Relationships ─────────────────────────────────── */}
        {careers.length > 0 && (
          <section className="profile-careers-section">
            <header className="profile-section-header">
              <h2 className="profile-section-title">Career Alignment</h2>
              <p className="profile-section-subtitle">
                Target career environments that align with your demonstrated signals.
              </p>
            </header>

            <div className="profile-careers-grid">
              {careers.slice(0, 3).map((item, idx) => {
                const title = item.title || item.name || (typeof item === 'string' ? item : `Role ${idx + 1}`);
                const matchScore = Math.round(Number(item.match || item.score || item.fitScore || 75));
                return (
                  <article key={title} className="career-recommendation-card">
                    <header className="career-recommendation-card__header">
                      <h3>{title}</h3>
                      <span className="career-fit-badge">{matchScore}% fit</span>
                    </header>
                    <p className="career-recommendation-card__body">
                      {item.why || item.description || 'Strong alignment with problem-solving approach and domain skills.'}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ── PART 6: Methodology & Boundaries ────────────────────────────── */}
        <section className="profile-methodology-notice-section">
          <div className="profile-methodology-notice">
            <h3>Methodology &amp; Boundaries</h3>
            <p>
              Scoring is calculated deterministically through structured psychometric algorithms. Results support
              reflection and career exploration—not diagnosis or hiring verdicts.
            </p>
          </div>
        </section>

        {/* ── PART 7: Report Utilities ─────────────────────────────────────── */}
        <section className="profile-utilities-section">
          <div className="profile-utilities-bar">
            <Button variant="ghost" onClick={() => navigate('/assessment/start')}>
              <FiRefreshCw /> Retake Assessment
            </Button>
            <Button variant="primary" onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ResultPage;
