import { describe, it, expect } from 'vitest';
import {
  deriveCognitiveFromCareerSignals,
  deriveBehaviorFromCareerSignals,
  getDominantBehaviorLabel,
  isAllDefaultVector,
} from './chartSignalDerivation';

const FULL_SIGNALS = {
  analyticalThinking: { score: 78, evidenceCount: 3, sources: ['answer'] },
  creativity: { score: 62, evidenceCount: 2, sources: ['answer'] },
  leadership: { score: 55, evidenceCount: 2, sources: ['answer'] },
  collaboration: { score: 70, evidenceCount: 2, sources: ['answer'] },
  riskTolerance: { score: 45, evidenceCount: 1, sources: ['answer'] },
  adaptability: { score: 66, evidenceCount: 2, sources: ['answer'] },
  planning: { score: 60, evidenceCount: 2, sources: ['answer'] },
  problemSolving: { score: 71, evidenceCount: 2, sources: ['answer'] },
  technicalDepth: { score: 58, evidenceCount: 1, sources: ['cv'] },
  domainFocus: { score: 52, evidenceCount: 1, sources: ['cv'] },
  learningOrientation: { score: 69, evidenceCount: 2, sources: ['answer', 'cv'] },
  communication: { score: 64, evidenceCount: 2, sources: ['answer'] },
};

describe('chartSignalDerivation — Repair Phase 2', () => {
  describe('deriveCognitiveFromCareerSignals', () => {
    it('returns derived cognitive scores when signals exist', () => {
      const result = deriveCognitiveFromCareerSignals(FULL_SIGNALS);
      expect(result.source).toBe('derived_from_careerSignals');
      expect(result.scores).not.toBeNull();
      expect(result.scores.analytical).toBe(78);
      expect(result.scores.creative).toBe(62);
    });

    it('strategic is average of planning and problemSolving', () => {
      const result = deriveCognitiveFromCareerSignals(FULL_SIGNALS);
      const expected = Math.round((60 + 71) / 2);
      expect(result.scores.strategic).toBe(expected);
    });

    it('returns insufficient state when signals are null/empty', () => {
      const result = deriveCognitiveFromCareerSignals(null);
      expect(result.source).toBe('insufficient');
      expect(result.scores).toBeNull();
    });

    it('returns insufficient state when signals object is empty', () => {
      const result = deriveCognitiveFromCareerSignals({});
      expect(result.source).toBe('insufficient');
      expect(result.scores).toBeNull();
    });

    it('scores are clamped to 0-100', () => {
      const result = deriveCognitiveFromCareerSignals(FULL_SIGNALS);
      Object.values(result.scores).forEach((v) => {
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('deriveBehaviorFromCareerSignals', () => {
    it('returns derived behavior scores when signals exist', () => {
      const result = deriveBehaviorFromCareerSignals(FULL_SIGNALS);
      expect(result.source).toBe('derived_from_careerSignals');
      expect(result.scores).not.toBeNull();
      expect(result.scores.leadership).toBe(55);
      expect(result.scores.team_preference).toBe(70);
      expect(result.scores.risk_tolerance).toBe(45);
    });

    it('returns insufficient state for null signals', () => {
      const result = deriveBehaviorFromCareerSignals(null);
      expect(result.source).toBe('insufficient');
      expect(result.scores).toBeNull();
    });

    it('decision_speed uses adaptability signal', () => {
      const result = deriveBehaviorFromCareerSignals(FULL_SIGNALS);
      expect(result.scores.decision_speed).toBe(66);
    });
  });

  describe('getDominantBehaviorLabel', () => {
    const LABELS = {
      leadership: 'Leadership',
      risk_tolerance: 'Risk Tolerance',
      decision_speed: 'Decision Speed',
      stress_tolerance: 'Stress Tolerance',
      team_preference: 'Team Preference',
    };

    it('returns the label of the highest-score behavior', () => {
      const scores = {
        leadership: 55,
        risk_tolerance: 45,
        decision_speed: 66,
        stress_tolerance: 60,
        team_preference: 70,
      };
      const label = getDominantBehaviorLabel(scores, LABELS);
      expect(label).toBe('Team Preference');
    });

    it('returns null for empty or null scores', () => {
      expect(getDominantBehaviorLabel(null, LABELS)).toBeNull();
      expect(getDominantBehaviorLabel({}, LABELS)).toBeNull();
    });
  });

  describe('isAllDefaultVector', () => {
    it('returns true for all-50 vector', () => {
      const v = { leadership: 50, risk_tolerance: 50, decision_speed: 50 };
      expect(isAllDefaultVector(v)).toBe(true);
    });

    it('returns true for empty vector', () => {
      expect(isAllDefaultVector({})).toBe(true);
    });

    it('returns false for real vector with non-50 values', () => {
      const v = { leadership: 55, risk_tolerance: 45, decision_speed: 66 };
      expect(isAllDefaultVector(v)).toBe(false);
    });
  });
});
