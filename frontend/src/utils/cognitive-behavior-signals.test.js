import { describe, it, expect } from 'vitest';
import {
  isAllDefaultVector,
  deriveCognitiveFromCareerSignals,
  deriveBehaviorFromCareerSignals,
} from './chartSignalDerivation';

describe('isAllDefaultVector — legacy pattern detection', () => {
  it('returns true for all-50 vector (classic neutral)', () => {
    expect(isAllDefaultVector({ leadership: 50, risk_tolerance: 50, decision_speed: 50, stress_tolerance: 50, team_preference: 50 })).toBe(true);
  });

  it('returns true for all-0 vector', () => {
    expect(isAllDefaultVector({ analytical: 0, creative: 0, strategic: 0 })).toBe(true);
  });

  it('returns true for 45-47 cognitive narrow band (old cognitive-style.service fallback)', () => {
    const legacy = { analytical: 45, creative: 46, strategic: 47, systematic: 46, practical: 45, abstract: 46 };
    expect(isAllDefaultVector(legacy)).toBe(true);
  });

  it('returns true for any narrow band 43-53 with spread ≤ 6', () => {
    expect(isAllDefaultVector({ a: 48, b: 50, c: 52, d: 49, e: 48, f: 51 })).toBe(true);
  });

  it('returns false for real varied cognitive signal', () => {
    const real = { analytical: 72, creative: 38, strategic: 65, systematic: 78, practical: 61, abstract: 45 };
    expect(isAllDefaultVector(real)).toBe(false);
  });

  it('returns true for 1-3 behavior scale error (old 1-5 Likert stored raw)', () => {
    const legacyBeh = { leadership: 3, risk_tolerance: 1, decision_speed: 3, stress_tolerance: 54, team_preference: 1 };
    expect(isAllDefaultVector(legacyBeh)).toBe(true);
  });

  it('returns false for real 0-100 behavior vector', () => {
    const real = { leadership: 72, risk_tolerance: 45, decision_speed: 68, stress_tolerance: 60, team_preference: 55 };
    expect(isAllDefaultVector(real)).toBe(false);
  });

  it('returns true for null or missing input', () => {
    expect(isAllDefaultVector(null)).toBe(true);
    expect(isAllDefaultVector(undefined)).toBe(true);
    expect(isAllDefaultVector({})).toBe(true);
  });
});

describe('deriveCognitiveFromCareerSignals — evidence guard', () => {
  it('returns insufficient when all evidenceCount are zero', () => {
    const zeroEvidence = {
      analyticalThinking: { score: 72, evidenceCount: 0, sources: [] },
      creativity: { score: 55, evidenceCount: 0, sources: [] },
      planning: { score: 60, evidenceCount: 0, sources: [] },
      problemSolving: { score: 65, evidenceCount: 0, sources: [] },
    };
    const result = deriveCognitiveFromCareerSignals(zeroEvidence);
    expect(result.source).toBe('insufficient');
    expect(result.scores).toBeNull();
  });

  it('returns derived scores when at least one key has evidence', () => {
    const withEvidence = {
      analyticalThinking: { score: 78, evidenceCount: 2, sources: ['answer'] },
      creativity: { score: 62, evidenceCount: 1, sources: ['answer'] },
      planning: { score: 60, evidenceCount: 2, sources: ['answer'] },
      problemSolving: { score: 71, evidenceCount: 2, sources: ['answer'] },
      technicalDepth: { score: 58, evidenceCount: 1, sources: ['cv'] },
      domainFocus: { score: 52, evidenceCount: 1, sources: ['cv'] },
      learningOrientation: { score: 69, evidenceCount: 2, sources: ['answer'] },
    };
    const result = deriveCognitiveFromCareerSignals(withEvidence);
    expect(result.source).toBe('derived_from_careerSignals');
    expect(result.scores).not.toBeNull();
    expect(result.scores.analytical).toBe(78);
    expect(result.scores.creative).toBe(62);
  });

  it('all output scores are clamped 0-100', () => {
    const signals = {
      analyticalThinking: { score: 110, evidenceCount: 1, sources: ['answer'] },
      creativity: { score: -5, evidenceCount: 1, sources: ['answer'] },
      planning: { score: 60, evidenceCount: 2, sources: ['answer'] },
      problemSolving: { score: 70, evidenceCount: 2, sources: ['answer'] },
      technicalDepth: { score: 55, evidenceCount: 1, sources: ['cv'] },
      domainFocus: { score: 50, evidenceCount: 1, sources: ['cv'] },
      learningOrientation: { score: 65, evidenceCount: 2, sources: ['answer'] },
    };
    const result = deriveCognitiveFromCareerSignals(signals);
    expect(result.source).toBe('derived_from_careerSignals');
    Object.values(result.scores).forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
  });
});

describe('deriveBehaviorFromCareerSignals — evidence guard', () => {
  it('returns insufficient when all behavior evidenceCount are zero', () => {
    const zeroEvidence = {
      leadership: { score: 55, evidenceCount: 0, sources: [] },
      riskTolerance: { score: 45, evidenceCount: 0, sources: [] },
      adaptability: { score: 66, evidenceCount: 0, sources: [] },
      collaboration: { score: 70, evidenceCount: 0, sources: [] },
    };
    const result = deriveBehaviorFromCareerSignals(zeroEvidence);
    expect(result.source).toBe('insufficient');
    expect(result.scores).toBeNull();
  });

  it('returns derived scores when behavior signals have evidence', () => {
    const withEvidence = {
      leadership: { score: 55, evidenceCount: 2, sources: ['answer'] },
      riskTolerance: { score: 45, evidenceCount: 1, sources: ['answer'] },
      adaptability: { score: 66, evidenceCount: 2, sources: ['answer'] },
      collaboration: { score: 70, evidenceCount: 2, sources: ['answer'] },
    };
    const result = deriveBehaviorFromCareerSignals(withEvidence);
    expect(result.source).toBe('derived_from_careerSignals');
    expect(result.scores).not.toBeNull();
    expect(result.scores.leadership).toBe(55);
    expect(result.scores.team_preference).toBe(70);
    expect(result.scores.risk_tolerance).toBe(45);
    expect(result.scores.decision_speed).toBe(66);
  });

  it('all output scores are clamped 0-100', () => {
    const signals = {
      leadership: { score: 55, evidenceCount: 2, sources: ['answer'] },
      riskTolerance: { score: 45, evidenceCount: 1, sources: ['answer'] },
      adaptability: { score: 66, evidenceCount: 2, sources: ['answer'] },
      collaboration: { score: 70, evidenceCount: 2, sources: ['answer'] },
    };
    const result = deriveBehaviorFromCareerSignals(signals);
    Object.values(result.scores).forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(100);
    });
  });
});
