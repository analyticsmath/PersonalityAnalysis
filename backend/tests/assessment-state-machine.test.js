const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeStage, getAllowedActions } = require('../services/assessment/assessment-state-machine.service');

test('maps legacy stage names to canonical stages', () => {
  assert.equal(normalizeStage('questionnaire'), 'ASSESSMENT_IN_PROGRESS');
  assert.equal(normalizeStage('behavior'), 'BEHAVIOR_PROMPTS');
});

test('returns allowed actions for answering stage', () => {
  assert.ok(getAllowedActions('ASSESSMENT_IN_PROGRESS').includes('SUBMIT_ANSWER'));
});
