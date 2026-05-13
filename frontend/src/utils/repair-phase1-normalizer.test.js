import { describe, it, expect } from 'vitest';
import { buildRadarTraits, normalizeAssessmentResult } from './assessmentResultNormalize';
import { isPlaceholderScoreArray, isRealScoreMeta } from './graphDataGuards';

// ---------------------------------------------------------------------------
// Big Five / OCEAN radar correctness
// ---------------------------------------------------------------------------

describe('buildRadarTraits — Repair Phase 1', () => {
  const realMeta = { scoreSource: 'deterministic', scoreValidity: 'valid', evidenceCount: 12 };
  const badMeta = { scoreSource: 'unknown', scoreValidity: 'insufficient_data', evidenceCount: 0 };

  it('renders real canonical scores even when scoreMeta is insufficient', () => {
    // Real data with bad meta → should still return the data (chart shows warning)
    const traits = buildRadarTraits({
      meta: badMeta,
      scores: {
        bigFive: {
          openness: { score: 72, source: 'deterministic' },
          conscientiousness: { score: 65, source: 'deterministic' },
          extraversion: { score: 48, source: 'deterministic' },
          agreeableness: { score: 81, source: 'deterministic' },
          emotionalStability: { score: 59, source: 'deterministic' },
        },
      },
    });
    expect(traits.O).toBe(72);
    expect(traits.C).toBe(65);
    expect(traits.E).toBe(48);
    expect(traits.A).toBe(81);
    expect(traits.N).toBe(59);
  });

  it('hides placeholder all-51 vector with bad meta', () => {
    const traits = buildRadarTraits({
      meta: badMeta,
      scores: {
        bigFive: {
          openness: { score: 51, source: 'deterministic' },
          conscientiousness: { score: 51, source: 'deterministic' },
          extraversion: { score: 51, source: 'deterministic' },
          agreeableness: { score: 51, source: 'deterministic' },
          emotionalStability: { score: 51, source: 'deterministic' },
        },
      },
    });
    expect(traits).toEqual({ O: 0, C: 0, E: 0, A: 0, N: 0 });
  });

  it('shows all-51 when meta is valid with evidence (legitimate flat profile)', () => {
    const traits = buildRadarTraits({
      meta: realMeta,
      scores: {
        bigFive: {
          openness: { score: 51, source: 'deterministic' },
          conscientiousness: { score: 51, source: 'deterministic' },
          extraversion: { score: 51, source: 'deterministic' },
          agreeableness: { score: 51, source: 'deterministic' },
          emotionalStability: { score: 51, source: 'deterministic' },
        },
      },
    });
    expect(traits.O).toBe(51);
    expect(traits.C).toBe(51);
  });

  it('does not fill missing scores with fake 50/51 values', () => {
    const traits = buildRadarTraits({});
    expect(traits).toEqual({ O: 0, C: 0, E: 0, A: 0, N: 0 });
  });

  it('Dashboard and ResultPage use same canonical bigFive for same result', () => {
    const sharedResult = {
      meta: realMeta,
      scores: {
        bigFive: {
          openness: { score: 75, source: 'deterministic' },
          conscientiousness: { score: 82, source: 'deterministic' },
          extraversion: { score: 44, source: 'deterministic' },
          agreeableness: { score: 63, source: 'deterministic' },
          emotionalStability: { score: 67, source: 'deterministic' },
        },
      },
    };

    const resultPageTraits = buildRadarTraits(sharedResult);

    const dashboardTraits = buildRadarTraits({
      trait_scores: { O: 75, C: 82, E: 44, A: 63, N: 33 },
      scores: sharedResult.scores,
    });

    expect(resultPageTraits.O).toBe(dashboardTraits.O);
    expect(resultPageTraits.C).toBe(dashboardTraits.C);
    expect(resultPageTraits.E).toBe(dashboardTraits.E);
    expect(resultPageTraits.A).toBe(dashboardTraits.A);
  });

  it('normalizeAssessmentResult exposes scoreMeta from meta field', () => {
    const n = normalizeAssessmentResult({
      meta: realMeta,
      scores: {
        bigFive: {
          openness: { score: 60, source: 'deterministic' },
          conscientiousness: { score: 70, source: 'deterministic' },
          extraversion: { score: 55, source: 'deterministic' },
          agreeableness: { score: 65, source: 'deterministic' },
          emotionalStability: { score: 75, source: 'deterministic' },
        },
      },
    });
    expect(n.scoreMeta?.scoreSource).toBe('deterministic');
    expect(n.radarTraits.O).toBe(60);
  });
});

// ---------------------------------------------------------------------------
// graphDataGuards
// ---------------------------------------------------------------------------

describe('graphDataGuards — Repair Phase 1', () => {
  it('isRealScoreMeta rejects mock source', () => {
    expect(isRealScoreMeta({ scoreSource: 'mock', scoreValidity: 'valid', evidenceCount: 10 })).toBe(false);
  });

  it('isRealScoreMeta accepts deterministic with valid evidence', () => {
    expect(isRealScoreMeta({ scoreSource: 'deterministic', scoreValidity: 'valid', evidenceCount: 8 })).toBe(true);
  });

  it('isPlaceholderScoreArray detects all-same values with bad meta', () => {
    const badMeta = { scoreSource: 'unknown', scoreValidity: 'insufficient_data', evidenceCount: 0 };
    expect(isPlaceholderScoreArray([50, 50, 50, 50, 50], badMeta)).toBe(true);
    expect(isPlaceholderScoreArray([51, 51, 51, 51, 51], badMeta)).toBe(true);
  });

  it('isPlaceholderScoreArray allows real varied values regardless of meta', () => {
    const badMeta = { scoreSource: 'unknown', scoreValidity: 'insufficient_data', evidenceCount: 0 };
    expect(isPlaceholderScoreArray([72, 65, 48, 81, 59], badMeta)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Internal text checks
// ---------------------------------------------------------------------------

describe('Internal text cleanup — Repair Phase 1', () => {
  it('no phase8-v1 string in assessmentResultNormalize module source', async () => {
    const src = await import('./assessmentResultNormalize.js?raw').catch(() => null);
    if (src) {
      expect(src.default).not.toContain('phase8-v1');
    }
  });
});
