const test = require('node:test');
const assert = require('node:assert/strict');

const orchestratorPath = require.resolve('../services/ai/aiOrchestrator.service');
const providerPath = require.resolve('../services/ai/aiProvider.service');

const fresh = () => {
  delete require.cache[orchestratorPath];
  return require('../services/ai/aiOrchestrator.service');
};

test('missing key returns NO_API_KEY fallback', async () => {
  const envBackup = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  const config = require('../config/env').config;
  const old = config.openaiApiKey;
  config.openaiApiKey = '';

  const { runOrchestratedAiCall } = fresh();
  const out = await runOrchestratedAiCall({ promptId: 'p', promptVersion: '1', schemaId: 's', buildInput: 'x' });
  assert.equal(out.ok, false);
  assert.equal(out.errorCode, 'NO_API_KEY');

  config.openaiApiKey = old;
  process.env.OPENAI_API_KEY = envBackup;
});

test('invalid key style provider error maps to fallback with code', async () => {
  const config = require('../config/env').config;
  const old = config.openaiApiKey;
  config.openaiApiKey = 'sk-invalid';

  const provider = require(providerPath);
  const original = provider.runOpenAiResponses;
  provider.runOpenAiResponses = async () => { throw Object.assign(new Error('Unauthorized'), { status: 401 }); };

  const { runOrchestratedAiCall } = fresh();
  const out = await runOrchestratedAiCall({ promptId: 'p', promptVersion: '1', schemaId: 's', buildInput: 'x' });
  assert.equal(out.ok, false);
  assert.equal(String(out.errorCode), '401');

  provider.runOpenAiResponses = original;
  config.openaiApiKey = old;
});

test('timeout maps to fallback and returns promptly', async () => {
  const config = require('../config/env').config;
  const old = config.openaiApiKey;
  config.openaiApiKey = 'sk-test';

  const provider = require(providerPath);
  const original = provider.runOpenAiResponses;
  provider.runOpenAiResponses = async () => {
    await new Promise((r) => setTimeout(r, 50));
    throw Object.assign(new Error('AI provider timeout'), { status: 504 });
  };

  const t0 = Date.now();
  const { runOrchestratedAiCall } = fresh();
  const out = await runOrchestratedAiCall({ promptId: 'p', promptVersion: '1', schemaId: 's', buildInput: 'x', timeoutMs: 20, maxRetries: 0 });
  const elapsed = Date.now() - t0;
  assert.equal(out.ok, false);
  assert.equal(String(out.errorCode), '504');
  assert.ok(elapsed < 3000);

  provider.runOpenAiResponses = original;
  config.openaiApiKey = old;
});
