const { normalizeStage, getAllowedActions } = require('../services/assessment/assessment-state-machine.service');

describe('assessment state machine canonical mapping', () => {
  test('maps legacy stage names to canonical stages', () => {
    expect(normalizeStage('questionnaire')).toBe('ASSESSMENT_IN_PROGRESS');
    expect(normalizeStage('behavior')).toBe('BEHAVIOR_PROMPTS');
  });

  test('returns allowed actions for answering stage', () => {
    expect(getAllowedActions('ASSESSMENT_IN_PROGRESS')).toContain('SUBMIT_ANSWER');
  });
});
