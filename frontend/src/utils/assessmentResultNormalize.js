import { normalizeTraits } from './traits';

/**
 * Normalize flow `result` payloads (Phase 3 + legacy).
 * @param {Record<string, unknown>} raw
 */
export function buildRadarTraits(raw) {
  if (!raw || typeof raw !== 'object') {
    return { O: 0, C: 0, E: 0, A: 0, N: 0 };
  }

  const traitScores = raw.trait_scores || raw.traits || {};
  const p3 = raw.scores?.bigFive;
  const hasP3 =
    p3 &&
    typeof p3 === 'object' &&
    p3.openness &&
    String(p3.openness.source || '') === 'deterministic';

  if (hasP3) {
    return {
      O: Math.max(0, Math.min(100, Number(p3.openness.score || 0))),
      C: Math.max(0, Math.min(100, Number(p3.conscientiousness.score || 0))),
      E: Math.max(0, Math.min(100, Number(p3.extraversion.score || 0))),
      A: Math.max(0, Math.min(100, Number(p3.agreeableness.score || 0))),
      N: Math.max(0, Math.min(100, Number(p3.emotionalStability.score || 0))),
    };
  }

  const base = normalizeTraits(traitScores);
  return {
    ...base,
    N: Math.max(0, Math.min(100, 100 - Number(base.N || 0))),
  };
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
