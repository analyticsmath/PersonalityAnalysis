import { normalizeTraits } from './traits';
import { isPlaceholderScoreArray } from './graphDataGuards';

const ZERO_TRAITS = { O: 0, C: 0, E: 0, A: 0, N: 0 };
const TRAIT_KEYS = ['O', 'C', 'E', 'A', 'N'];

/**
 * Normalize flow `result` payloads (Phase 3 + legacy).
 *
 * Returns real trait values when data exists — even if scoreMeta indicates
 * insufficient evidence. The caller (TraitRadarChart) renders the scoreMeta
 * warning. Only actual placeholder arrays (all-50/51/60) with bad meta are
 * zeroed, because those convey no real information.
 */
export function buildRadarTraits(raw) {
  if (!raw || typeof raw !== 'object') {
    return ZERO_TRAITS;
  }

  const traitScores = raw.trait_scores || raw.traits || {};
  const meta = raw.meta && typeof raw.meta === 'object' ? raw.meta : null;
  const p3 = raw.scores?.bigFive;
  const hasP3 =
    p3 &&
    typeof p3 === 'object' &&
    p3.openness &&
    String(p3.openness.source || '') === 'deterministic';

  if (hasP3) {
    const deterministicTraits = {
      O: Math.max(0, Math.min(100, Number(p3.openness.score || 0))),
      C: Math.max(0, Math.min(100, Number(p3.conscientiousness?.score || 0))),
      E: Math.max(0, Math.min(100, Number(p3.extraversion?.score || 0))),
      A: Math.max(0, Math.min(100, Number(p3.agreeableness?.score || 0))),
      N: Math.max(0, Math.min(100, Number(p3.emotionalStability?.score || 0))),
    };
    const vals = TRAIT_KEYS.map((k) => deterministicTraits[k]);
    if (isPlaceholderScoreArray(vals, meta)) return ZERO_TRAITS;
    return deterministicTraits;
  }

  const base = normalizeTraits(traitScores);

  // If normalizeTraits produced all zeros there is no data — do not invert N
  const baseVals = TRAIT_KEYS.map((k) => Number(base[k] || 0));
  if (baseVals.every((v) => v === 0)) return ZERO_TRAITS;

  const normalized = {
    ...base,
    N: Math.max(0, Math.min(100, 100 - Number(base.N || 0))),
  };

  const vals = TRAIT_KEYS.map((k) => normalized[k]);
  if (isPlaceholderScoreArray(vals, meta)) return ZERO_TRAITS;
  return normalized;
}

export function normalizeAssessmentResult(raw) {
  if (!raw || typeof raw !== 'object') {
    return {
      radarTraits: { O: 0, C: 0, E: 0, A: 0, N: 0 },
      scoreMeta: null,
      scores: {},
      evidence: [],
      warnings: [],
      careerPhase4: null,
      aiStatus: null,
      aiReport: null,
    };
  }

  return {
    radarTraits: buildRadarTraits(raw),
    scoreMeta: raw.meta && typeof raw.meta === 'object' ? raw.meta : null,
    scores: raw.scores && typeof raw.scores === 'object' ? raw.scores : {},
    evidence: Array.isArray(raw.evidence) ? raw.evidence : [],
    warnings: Array.isArray(raw.warnings) ? raw.warnings : [],
    careerPhase4:
      raw.career_recommendations_phase4 && typeof raw.career_recommendations_phase4 === 'object'
        ? raw.career_recommendations_phase4
        : null,
    aiStatus: raw.ai_status || raw.ai_report?.aiStatus || null,
    aiReport: raw.ai_report && typeof raw.ai_report === 'object' ? raw.ai_report : null,
  };
}
