const test = require('node:test');
const assert = require('node:assert/strict');
const {
  isReasoningModel,
  sanitizeOpenAiParams,
} = require('../services/ai/openAiParameterPolicy.service');

// ---------------------------------------------------------------------------
// isReasoningModel
// ---------------------------------------------------------------------------

test('isReasoningModel — gpt-5 variants', () => {
  assert.equal(isReasoningModel('gpt-5'), true);
  assert.equal(isReasoningModel('gpt-5.5'), true);
  assert.equal(isReasoningModel('gpt-5.5-2026-04-23'), true);
  assert.equal(isReasoningModel('gpt-5.4-mini'), true);
  assert.equal(isReasoningModel('gpt-5-mini'), true);
  assert.equal(isReasoningModel('GPT-5'), true);
  assert.equal(isReasoningModel('GPT-5.5'), true);
});

test('isReasoningModel — o-series variants', () => {
  assert.equal(isReasoningModel('o1'), true);
  assert.equal(isReasoningModel('o1-preview'), true);
  assert.equal(isReasoningModel('o3'), true);
  assert.equal(isReasoningModel('o3-mini'), true);
  assert.equal(isReasoningModel('o4'), true);
  assert.equal(isReasoningModel('o4-mini'), true);
  assert.equal(isReasoningModel('O4-MINI'), true);
});

test('isReasoningModel — legacy models return false', () => {
  assert.equal(isReasoningModel('gpt-4o'), false);
  assert.equal(isReasoningModel('gpt-4-turbo'), false);
  assert.equal(isReasoningModel('gpt-3.5-turbo'), false);
  assert.equal(isReasoningModel(''), false);
  assert.equal(isReasoningModel(null), false);
  assert.equal(isReasoningModel(undefined), false);
});

// ---------------------------------------------------------------------------
// sanitizeOpenAiParams — reasoning models
// ---------------------------------------------------------------------------

test('sanitizeOpenAiParams removes temperature for gpt-5.5', () => {
  const result = sanitizeOpenAiParams('gpt-5.5', { model: 'gpt-5.5', temperature: 0.3, max_output_tokens: 1000, input: [] });
  assert.equal('temperature' in result, false, 'temperature must be absent');
  assert.equal(result.max_output_tokens, 1000, 'max_output_tokens must be preserved');
  assert.equal(result.model, 'gpt-5.5', 'model must be preserved');
});

test('sanitizeOpenAiParams removes temperature for gpt-5.5-2026-04-23', () => {
  const result = sanitizeOpenAiParams('gpt-5.5-2026-04-23', { temperature: 0.15, max_output_tokens: 800, input: [] });
  assert.equal('temperature' in result, false);
});

test('sanitizeOpenAiParams removes temperature for gpt-5.4-mini', () => {
  const result = sanitizeOpenAiParams('gpt-5.4-mini', { temperature: 0.2, max_output_tokens: 600 });
  assert.equal('temperature' in result, false);
});

test('sanitizeOpenAiParams removes temperature for o4-mini', () => {
  const result = sanitizeOpenAiParams('o4-mini', { temperature: 0.7, top_p: 0.9, max_output_tokens: 500 });
  assert.equal('temperature' in result, false);
  assert.equal('top_p' in result, false);
});

test('sanitizeOpenAiParams removes all forbidden params for reasoning models', () => {
  const forbidden = ['temperature', 'top_p', 'presence_penalty', 'frequency_penalty', 'logprobs', 'top_logprobs', 'n'];
  const params = Object.fromEntries([...forbidden.map((k) => [k, 1]), ['model', 'gpt-5'], ['max_output_tokens', 100]]);
  const result = sanitizeOpenAiParams('gpt-5', params);
  for (const key of forbidden) {
    assert.equal(key in result, false, `${key} must be absent for reasoning model`);
  }
  assert.equal(result.model, 'gpt-5');
  assert.equal(result.max_output_tokens, 100);
});

test('sanitizeOpenAiParams does not mutate the original params object', () => {
  const original = { model: 'gpt-5.5', temperature: 0.3, max_output_tokens: 400 };
  sanitizeOpenAiParams('gpt-5.5', original);
  assert.equal(original.temperature, 0.3, 'original must not be mutated');
});

// ---------------------------------------------------------------------------
// sanitizeOpenAiParams — legacy models keep allowed params
// ---------------------------------------------------------------------------

test('sanitizeOpenAiParams keeps temperature for legacy gpt-4o', () => {
  const params = { model: 'gpt-4o', temperature: 0.7, top_p: 0.9, max_output_tokens: 1000 };
  const result = sanitizeOpenAiParams('gpt-4o', params);
  assert.equal(result.temperature, 0.7, 'temperature must be preserved for legacy models');
  assert.equal(result.top_p, 0.9, 'top_p must be preserved for legacy models');
});

// ---------------------------------------------------------------------------
// CV analysis path does not include temperature when using gpt-5.5
// ---------------------------------------------------------------------------

test('CV analysis path: sanitized params have no temperature for gpt-5.5', () => {
  const model = 'gpt-5.5';
  const cvParams = {
    model,
    temperature: 0.15,
    max_output_tokens: 2000,
    input: [{ role: 'user', content: 'test CV text' }],
  };
  const sanitized = sanitizeOpenAiParams(model, cvParams);
  assert.equal('temperature' in sanitized, false, 'CV analysis must not send temperature to gpt-5.5');
  assert.equal(sanitized.max_output_tokens, 2000);
});

// ---------------------------------------------------------------------------
// AI CV intelligence path
// ---------------------------------------------------------------------------

test('AI CV intelligence path: sanitized params have no temperature for gpt-5.5', () => {
  const model = 'gpt-5.5';
  const intelligenceParams = {
    model,
    temperature: 0.15,
    max_output_tokens: 1200,
    input: [{ role: 'user', content: 'CV intelligence prompt' }],
  };
  const sanitized = sanitizeOpenAiParams(model, intelligenceParams);
  assert.equal('temperature' in sanitized, false);
  assert.equal(sanitized.max_output_tokens, 1200);
});

// ---------------------------------------------------------------------------
// Report generation path
// ---------------------------------------------------------------------------

test('Report/provider path: sanitized params have no temperature for gpt-5.5', () => {
  const model = 'gpt-5.5';
  const reportParams = { model, temperature: 0.3, max_output_tokens: 1800, input: [] };
  const sanitized = sanitizeOpenAiParams(model, reportParams);
  assert.equal('temperature' in sanitized, false);
});

// ---------------------------------------------------------------------------
// Career coach path
// ---------------------------------------------------------------------------

test('Career coach path: sanitized params have no temperature for gpt-5.5', () => {
  const model = 'gpt-5.5';
  const coachParams = { model, temperature: 0.2, max_output_tokens: 1600, input: [] };
  const sanitized = sanitizeOpenAiParams(model, coachParams);
  assert.equal('temperature' in sanitized, false);
});
