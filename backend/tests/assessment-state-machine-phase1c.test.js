const test = require('node:test');
const assert = require('node:assert/strict');
const { toSessionState, normalizeStage } = require('../services/assessment/assessment-state-machine.service');

test('normalized state includes scoreStatus and reportStatus', () => {
    const state = toSessionState({
      session: { stage: 'questionnaire', totalQuestions: 10, answersCount: 4 },
      scoreStatus: { hasValidScores: true, scoreSource: 'deterministic', confidence: 0.9 },
      reportStatus: { status: 'generating', available: false },
    });

    assert.equal(state.stage, 'ASSESSMENT_IN_PROGRESS');
    assert.equal(state.scoreStatus.scoreSource, 'deterministic');
    assert.equal(state.reportStatus.status, 'generating');
});

test('legacy result stage maps to completed', () => {
  assert.equal(normalizeStage('result'), 'COMPLETED');
});
