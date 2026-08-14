import React, { useMemo, useState } from 'react';
import { FiArrowLeft, FiCompass, FiSearch } from 'react-icons/fi';
import Button from '../ui/Button';
import CareerRecommendationCard from './CareerRecommendationCard';
import CareerFitBreakdown from './CareerFitBreakdown';
import SkillGapPanel from './SkillGapPanel';
import CareerRoadmapTimeline from './CareerRoadmapTimeline';
import CareerComparisonTable from './CareerComparisonTable';
import { useWhyNotCareerMutation } from '../../hooks/useAssessmentFlow';

const flattenBuckets = (rec) => {
  if (!rec || typeof rec !== 'object') return [];
  return [
    ...(rec.bestFits || []).map((r) => ({ ...r, fitType: r.fitType || 'bestFit' })),
    ...(rec.stretchFits || []).map((r) => ({ ...r, fitType: r.fitType || 'stretchFit' })),
    ...(rec.exploratoryFits || []).map((r) => ({ ...r, fitType: r.fitType || 'exploratoryFit' })),
    ...(rec.lowerFitButPossible || []).map((r) => ({ ...r, fitType: r.fitType || 'lowerFitButPossible' })),
  ];
};

const BUCKET_LABELS = {
  bestFit: 'Best fits',
  bestFits: 'Best fits',
  stretchFit: 'Stretch fits',
  stretchFits: 'Stretch fits',
  exploratoryFit: 'Exploratory fits',
  exploratoryFits: 'Exploratory fits',
  lowerFitButPossible: 'Development paths',
};

const CareerExplorerPanel = ({ payload = null, sessionId = '' }) => {
  const [selectedId, setSelectedId] = useState('');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [customRoleQuery, setCustomRoleQuery] = useState('');

  let whyNotMutation;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    whyNotMutation = useWhyNotCareerMutation();
  } catch {
    whyNotMutation = {
      isPending: false,
      isError: false,
      error: null,
      data: null,
      mutateAsync: async () => {},
    };
  }

  const locked = Boolean(payload?.locked);
  const preliminary = Boolean(payload?.preliminary);
  const rec = payload?.recommendations || {};
  const flat = useMemo(() => flattenBuckets(rec), [rec]);
  const top = useMemo(() => {
    if (Array.isArray(payload?.topRecommendations) && payload.topRecommendations.length > 0) {
      return payload.topRecommendations;
    }
    return flat;
  }, [payload, flat]);

  const selected =
    top.find((r) => r.careerId === selectedId) || top[0] || flat[0] || null;
  const roadmap =
    (payload?.roadmaps || []).find((r) => r.careerId === (selected?.careerId || ''))?.timeline ||
    selected?.roadmap?.timeline ||
    [];

  const handleSelectRole = (careerId) => {
    setSelectedId(careerId);
    setMobileDetailOpen(true);
  };

  const handleCustomRoleSubmit = async (e) => {
    e.preventDefault();
    const query = customRoleQuery.trim();
    if (!query || !sessionId) return;

    try {
      await whyNotMutation.mutateAsync({
        sessionId,
        career: query,
      });
    } catch {
      // Handled by mutation state
    }
  };

  if (!payload) {
    return (
      <div className="dashboard-widget">
        <p className="empty-state">No career intelligence payload was loaded.</p>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="dashboard-widget">
        <h2 className="dashboard-widget__title">Career Guidance Unavailable</h2>
        <p className="ui-message ui-message--error" role="status">
          Career recommendations are unavailable because score validity is insufficient or invalid. Complete the
          assessment with reliable answers to unlock structured guidance.
        </p>
      </div>
    );
  }

  const customRoleAnalysis = whyNotMutation.data?.analysis || whyNotMutation.data?.data || null;

  return (
    <div className="career-master-detail-stage" data-testid="career-explorer-panel" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '24px', alignItems: 'start' }}>
      {/* ── Left / List View ────────────────────────────────────────────── */}
      <div className={`career-master-list ${mobileDetailOpen ? 'is-hidden-mobile' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--ink)' }}>Target Roles</h2>
          <span style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>{top.length} aligned paths</span>
        </div>

        <div className="career-master-items" role="tablist" aria-label="Available careers" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {top.map((item) => {
            const isSelected = item.careerId === selected?.careerId;
            const fitScore = item.fitScore ?? item.match ?? item.score ?? null;
            const categoryLabel = BUCKET_LABELS[item.fitType] || item.environmentType || item.fitType || 'Calibrated match';
            return (
              <button
                key={item.careerId || item.title}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`dashboard-widget ${isSelected ? 'is-active' : ''}`}
                onClick={() => handleSelectRole(item.careerId)}
                style={{
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '14px 16px',
                  background: isSelected ? '#ECEFEF' : 'var(--paper)',
                  borderColor: isSelected ? 'var(--ink)' : 'var(--mist)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.96875rem', color: 'var(--ink)' }}>{item.title}</strong>
                  {fitScore !== null && (
                    <span className="career-fit-badge">{Math.round(Number(fitScore))}%</span>
                  )}
                </div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--secondary)' }}>
                  {categoryLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Custom Role Inquiry ── */}
        <section className="dashboard-widget" style={{ marginTop: '16px', padding: '16px' }} aria-labelledby="custom-role-heading">
          <h3 id="custom-role-heading" style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: '8px' }}>
            Explore Another Role
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--secondary)', marginBottom: '12px' }}>
            Check dimensional fit for an unlisted career title.
          </p>
          <form onSubmit={handleCustomRoleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="text"
              className="ui-input"
              value={customRoleQuery}
              onChange={(e) => setCustomRoleQuery(e.target.value)}
              placeholder="e.g. Quantitative Trader"
              disabled={whyNotMutation.isPending}
            />
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              disabled={!customRoleQuery.trim() || whyNotMutation.isPending}
              loading={whyNotMutation.isPending}
              loadingLabel="Analyzing role…"
            >
              <FiSearch /> Analyze Role Fit
            </Button>
          </form>

          {whyNotMutation.isError && (
            <p className="ui-message ui-message--error" style={{ marginTop: '8px', fontSize: '0.8125rem' }}>
              {whyNotMutation.error?.message || 'Failed to analyze custom role.'}
            </p>
          )}

          {customRoleAnalysis && (
            <div className="ui-message ui-message--info" style={{ marginTop: '12px', fontSize: '0.8125rem' }}>
              <strong>{customRoleAnalysis.title || customRoleQuery}:</strong>
              <p style={{ margin: '4px 0 0' }}>{customRoleAnalysis.why || customRoleAnalysis.reason || customRoleAnalysis.summary}</p>
              {customRoleAnalysis.stretch && (
                <p style={{ margin: '4px 0 0' }}><strong>Stretch:</strong> {customRoleAnalysis.stretch}</p>
              )}
            </div>
          )}
        </section>
      </div>

      {/* ── Right / Detail Workspace ────────────────────────────────────── */}
      <div className={`career-detail-workspace ${mobileDetailOpen ? 'is-active-mobile' : ''}`}>
        {selected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {mobileDetailOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="career-mobile-back-btn"
                onClick={() => setMobileDetailOpen(false)}
                style={{ alignSelf: 'flex-start' }}
              >
                <FiArrowLeft /> Back to role list
              </Button>
            )}

            <CareerRecommendationCard item={selected} preliminary={preliminary} />

            <div className="dashboard-grid">
              <div className="col-span-6">
                <CareerFitBreakdown fitBreakdown={selected.fitBreakdown || selected.dimensionAlignments} />
              </div>
              <div className="col-span-6">
                <SkillGapPanel skillGaps={selected.skillGaps || selected.skills} />
              </div>
            </div>

            {roadmap.length > 0 && (
              <CareerRoadmapTimeline timeline={roadmap} />
            )}

            <CareerComparisonTable items={top} selectedId={selected.careerId} />
          </div>
        ) : (
          <div className="dashboard-widget">
            <p className="empty-state">Select a career from the list to inspect dimensional breakdown and roadmap.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerExplorerPanel;
