import { describe, it, expect } from 'vitest';
import { buildRadarTraits, normalizeAssessmentResult } from './assessmentResultNormalize';
import { hasSufficientGraphData } from './graphDataGuards';

const riasecPayload = (raw) => raw?.scores?.riasec?.dimensions || {};
const workValuesPayload = (raw) => raw?.scores?.workValues || {};

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

  it('normalizeAssessmentResult exposes legacy and ai fields', () => {
    const n = normalizeAssessmentResult({
      meta: {},
      career_recommendations_phase4: { version: 'phase4-v1', locked: false },
      ai_status: { status: 'ready', schemaValidated: true, fallbackUsed: false },
    });
    expect(n.careerPhase4?.version).toBe('phase4-v1');
    expect(n.aiStatus?.status).toBe('ready');
  });

  it('rejects repeated placeholder 51 vectors when score meta is insufficient', () => {
    const traits = buildRadarTraits({
      meta: { scoreSource: 'unknown', scoreValidity: 'insufficient_data', evidenceCount: 0 },
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

  it('graph payload variance differs across real profiles', () => {
    const profileA = { meta: { scoreSource: 'deterministic', scoreValidity: 'valid', evidenceCount: 12 }, scores: { bigFive: {
      openness: { score: 75, source: 'deterministic' }, conscientiousness: { score: 82, source: 'deterministic' }, extraversion: { score: 44, source: 'deterministic' }, agreeableness: { score: 51, source: 'deterministic' }, emotionalStability: { score: 67, source: 'deterministic' }
    }, riasec: { dimensions: { realistic: { score: 48 }, investigative: { score: 79 }, artistic: { score: 46 }, social: { score: 39 }, enterprising: { score: 50 }, conventional: { score: 72 } } }, workValues: { learning: { score: 84 }, autonomy: { score: 78 }, support: { score: 44 } } } };
    const profileB = { meta: { scoreSource: 'deterministic', scoreValidity: 'valid', evidenceCount: 13 }, scores: { bigFive: {
      openness: { score: 59, source: 'deterministic' }, conscientiousness: { score: 64, source: 'deterministic' }, extraversion: { score: 80, source: 'deterministic' }, agreeableness: { score: 83, source: 'deterministic' }, emotionalStability: { score: 61, source: 'deterministic' }
    }, riasec: { dimensions: { realistic: { score: 42 }, investigative: { score: 52 }, artistic: { score: 49 }, social: { score: 86 }, enterprising: { score: 71 }, conventional: { score: 55 } } }, workValues: { learning: { score: 66 }, autonomy: { score: 57 }, support: { score: 86 } } } };

    expect(buildRadarTraits(profileA)).not.toEqual(buildRadarTraits(profileB));
    expect(riasecPayload(profileA)).not.toEqual(riasecPayload(profileB));
    expect(workValuesPayload(profileA)).not.toEqual(workValuesPayload(profileB));
  });

  it('accepts real metadata with evidence and rejects insufficient payloads', () => {
    const realMeta = { scoreSource: 'deterministic', scoreValidity: 'valid', evidenceCount: 10 };
    const badMeta = { scoreSource: 'legacy_unverified', scoreValidity: 'insufficient_data', evidenceCount: 0 };
    expect(hasSufficientGraphData({ O: 66, C: 61, E: 57, A: 63, N: 58 }, ['O', 'C', 'E', 'A', 'N'], realMeta)).toBe(true);
    expect(hasSufficientGraphData({ O: 51, C: 51, E: 51, A: 51, N: 51 }, ['O', 'C', 'E', 'A', 'N'], badMeta)).toBe(false);
  });
});
