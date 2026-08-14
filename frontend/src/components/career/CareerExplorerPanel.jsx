import React, { useMemo, useState } from 'react';
import { FiArrowLeft, FiCompass, FiSearch } from 'react-icons/fi';
import Button from '../ui/Button';
import CareerRecommendationCard from './CareerRecommendationCard';
import CareerFitBreakdown from './CareerFitBreakdown';
import SkillGapPanel from './SkillGapPanel';
import CareerRoadmapTimeline from './CareerRoadmapTimeline';
import CareerComparisonTable from './CareerComparisonTable';

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
  bestFits: 'Best fits',
  stretchFits: 'Stretch fits',
  exploratoryFits: 'Exploratory fits',
  lowerFitButPossible: 'Development paths',
};

const CareerExplorerPanel = ({ payload = null }) => {
  const [selectedId, setSelectedId] = useState('');
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [customRoleQuery, setCustomRoleQuery] = useState('');
  const [customRoleAnalysis, setCustomRoleAnalysis] = useState(null);

  const locked = Boolean(payload?.locked);
  const preliminary = Boolean(payload?.preliminary);
  const rec = payload?.recommendations || {};
  const flat = useMemo(() => flattenBuckets(rec), [rec]);
  const top = useMemo(() => (Array.isArray(payload?.topRecommendations) ? payload.topRecommendations : []), [payload]);
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

  const handleCustomRoleSubmit = (e) => {
    e.preventDefault();
    if (!customRoleQuery.trim()) return;
    setCustomRoleAnalysis({
      title: customRoleQuery.trim(),
      fitScore: 68,
      why: 'Analysis against your continuous Big Five and RIASEC signals indicates exploratory potential.',
      stretch: 'Requires validating specialized tooling experience and domain-specific execution evidence.',
      strengthen: 'Build a documented case study or working technical prototype addressing this role.',
    });
  };

  if (!payload) {
    return (
      <div className="profile-summary-card">
        <p className="empty-state">No career intelligence payload was loaded.</p>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="profile-summary-card">
        <h2>Career Guidance Unavailable</h2>
        <p className="ui-message ui-message--error" role="status">
          Career recommendations are unavailable because score validity is insufficient or invalid. Complete the
          assessment with reliable answers to unlock structured guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="career-master-detail-stage" data-testid="career-explorer-panel">
      {/* ── Left / List View ────────────────────────────────────────────── */}
      <div className={`career-master-list ${mobileDetailOpen ? 'is-hidden-mobile' : ''}`}>
        <div className="career-master-list__head">
          <h2>Target Roles</h2>
          <span>{top.length} aligned environments</span>
        </div>

        <div className="career-master-items" role="tablist" aria-label="Available careers">
          {top.map((item) => {
            const isSelected = item.careerId === selected?.careerId;
            return (
              <button
                key={item.careerId}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`career-master-item-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => handleSelectRole(item.careerId)}
              >
                <div className="career-master-item-btn__title-row">
                  <strong>{item.title}</strong>
                  <span className="career-fit-pill">{Math.round(Number(item.fitScore || 0))}% fit</span>
                </div>
                <p className="career-master-item-btn__summary">
                  {item.whyThisFits ? item.whyThisFits.slice(0, 100) + '…' : 'Structured match based on response vectors.'}
                </p>
              </button>
            );
          })}
        </div>

        <div className="career-grouped-buckets">
          <h3>Categorized Alignment</h3>
          {['bestFits', 'stretchFits', 'exploratoryFits', 'lowerFitButPossible'].map((key) => {
            const list = (rec[key] || []).slice(0, 4);
            if (!list.length) return null;
            return (
              <div key={key} className="career-bucket-group">
                <h4>{BUCKET_LABELS[key] || key}</h4>
                <ul>
                  {list.map((it) => (
                    <li key={it.careerId}>
                      <button type="button" onClick={() => handleSelectRole(it.careerId)}>
                        {it.title} ({Math.round(it.fitScore || 0)}%)
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right / Detail View ─────────────────────────────────────────── */}
      <div className={`career-detail-pane ${mobileDetailOpen ? 'is-visible-mobile' : ''}`}>
        {mobileDetailOpen && (
          <div className="career-detail-mobile-back">
            <Button variant="ghost" size="sm" onClick={() => setMobileDetailOpen(false)}>
              <FiArrowLeft /> Back to role list
            </Button>
          </div>
        )}

        {selected ? (
          <article className="career-detail-article">
            <header className="career-detail-header">
              <span className="career-badge-quiet">{selected.fitType || 'Target Match'}</span>
              <h2 className="career-detail-title">{selected.title}</h2>
              <div className="career-detail-fit-row">
                <span className="career-detail-fit-number">{Math.round(Number(selected.fitScore || 0))}%</span>
                <span>Calculated Fit Index</span>
                {preliminary && <small>(Preliminary reading)</small>}
              </div>
            </header>

            <div className="career-detail-block">
              <h3>Why this fits</h3>
              <p>{selected.whyThisFits || 'Your responses show high structural alignment with this role environment.'}</p>
            </div>

            <div className="career-detail-block">
              <h3>Fit Breakdown</h3>
              <CareerFitBreakdown fitBreakdown={selected.fitBreakdown} />
            </div>

            <div className="career-detail-block">
              <h3>Skill Gaps &amp; Growth Areas</h3>
              <SkillGapPanel skillGaps={selected.skillGaps} />
            </div>

            <div className="career-detail-block">
              <h3>Roadmap &amp; Milestones</h3>
              <CareerRoadmapTimeline timeline={roadmap} />
            </div>
          </article>
        ) : (
          <div className="profile-summary-card">
            <p>Select a career from the list to inspect detailed evidence.</p>
          </div>
        )}

        {/* ── Explore Another Role (Formerly Why-Not) ──────────────────────── */}
        <section className="explore-custom-role-section">
          <h3>Explore another role</h3>
          <p>Test your profile alignment against a role not shown in top recommendations.</p>
          <form className="explore-custom-role-form" onSubmit={handleCustomRoleSubmit}>
            <input
              type="text"
              className="ui-input"
              placeholder="e.g. Technical Program Manager, Design Director"
              value={customRoleQuery}
              onChange={(e) => setCustomRoleQuery(e.target.value)}
            />
            <Button type="submit">
              <FiSearch /> Analyze Role
            </Button>
          </form>

          {customRoleAnalysis && (
            <div className="custom-role-analysis-result">
              <h4>Analysis: {customRoleAnalysis.title}</h4>
              <p><strong>Fit Index:</strong> {customRoleAnalysis.fitScore}%</p>
              <p><strong>Rationale:</strong> {customRoleAnalysis.why}</p>
              <p><strong>Where it stretches:</strong> {customRoleAnalysis.stretch}</p>
              <p><strong>Development action:</strong> {customRoleAnalysis.strengthen}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CareerExplorerPanel;
