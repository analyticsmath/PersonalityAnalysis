import { describe, it, expect } from 'vitest';
import { buildRadarTraits, normalizeAssessmentResult } from './assessmentResultNormalize';

describe('assessmentResultNormalize', () => {
  it('maps Phase 3 bigFive to radar traits', () => {
    const traits = buildRadarTraits({
      scores: {
        bigFive: {
          openness: { score: 60, source: 'deterministic' },
          conscientiousness: { score: 61, source: 'deterministic' },
          extraversion: { score: 62, source: 'deterministic' },
          agreeableness: { score: 63, source: 'deterministic' },
          emotionalStability: { score: 70, source: 'deterministic' },
        },
      },
    });
    expect(traits.N).toBe(70);
    expect(traits.O).toBe(60);
  });

  it('legacy trait_scores inverts N into stability for radar', () => {
    const traits = buildRadarTraits({ trait_scores: { O: 50, C: 50, E: 50, A: 50, N: 30 } });
    expect(traits.N).toBe(70);
  });

  it('normalizeAssessmentResult exposes careerPhase4 from legacy summary field', () => {
    const n = normalizeAssessmentResult({
      meta: {},
      career_recommendations_phase4: { version: 'phase4-v1', locked: false },
    });
    expect(n.careerPhase4?.version).toBe('phase4-v1');
  });

  it('normalizeAssessmentResult handles null', () => {
    const n = normalizeAssessmentResult(null);
    expect(n.radarTraits.O).toBe(0);
  });
});
