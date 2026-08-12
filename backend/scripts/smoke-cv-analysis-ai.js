#!/usr/bin/env node
/**
 * Smoke test: CV analysis does not pass temperature to GPT-5/o-series models.
 *
 * Without OPENAI_API_KEY: verifies sanitizer removes temperature (no live call).
 * With    OPENAI_API_KEY: also runs a tiny live CV analysis call and confirms
 *                         no 400 temperature error is returned.
 */
require('dotenv').config();

const { config } = require('../config/env');
const { sanitizeOpenAiParams, isReasoningModel } = require('../services/ai/openAiParameterPolicy.service');

const maskKey = (key) => {
  if (!key) return 'missing';
  return `${String(key).slice(0, 6)}...${String(key).slice(-4)}`;
};

const MOCK_CV = `
John Smith — Software Engineer
5 years professional experience. Proficient in JavaScript, TypeScript, React, Node.js.
BSc Computer Science, University of Manchester (2018, First Class).
Projects: e-commerce platform, REST API microservices, CI/CD pipelines.
Tools: Git, Docker, AWS, PostgreSQL, Redis.
Interests: open-source, AI/ML applications, system design.
`;

(async () => {
  const provider = config.aiProvider || 'unknown';
  const model = config.aiCvModel || config.aiModel;

  // ── Sanitizer verification (always runs) ────────────────────────────────
  console.log(`[INFO] Provider under test: ${provider}`);
  console.log(`[INFO] Model under test: ${model}`);
  console.log(`[INFO] isReasoningModel(${model}, ${provider}): ${isReasoningModel(model, provider)}`);

  const raw = { model, temperature: 0.15, top_p: 0.9, max_output_tokens: 100, input: [] };
  const sanitized = sanitizeOpenAiParams(model, raw, provider);

  const forbiddenPresent = ['temperature', 'top_p'].filter((k) => k in sanitized);
  if (isReasoningModel(model, provider) && forbiddenPresent.length > 0) {
    console.error(`[FAIL] sanitizeOpenAiParams did not remove: ${forbiddenPresent.join(', ')}`);
    process.exitCode = 1;
    return;
  }

  console.log('[PASS] Sanitizer verification passed.');
  console.log('[INFO] Sanitized param keys:', Object.keys(sanitized).join(', '));

  // ── Live call (only when key is present) ────────────────────────────────
  const key = config.aiApiKey;
  if (!key) {
    console.log(`[SKIP] ${provider.toUpperCase()}_API_KEY absent — skipping live CV analysis call.`);
    return;
  }

  console.log(`[INFO] ${provider.toUpperCase()}_API_KEY detected (${maskKey(key)})`);

  try {
    const { getOpenAiClient } = require('../services/assessment/openaiClient');
    const { extractOutputText } = require('../services/assessment/aiJson');

    const params = sanitizeOpenAiParams(model, {
      model,
      temperature: 0.15,
      max_output_tokens: 200,
      input: [
        {
          role: 'system',
          content: 'Extract candidate name from CV text. Return JSON only: {"name":""}',
        },
        {
          role: 'user',
          content: MOCK_CV,
        },
      ],
    }, provider);

    const start = Date.now();
    const response = await getOpenAiClient().responses.create(params);
    const latencyMs = Date.now() - start;
    const text = extractOutputText(response);

    console.log(`[PASS] Live CV analysis succeeded. latency=${latencyMs}ms, response_length=${String(text || '').length}`);
    console.log('[INFO] Model used:', model);
    console.log('[INFO] Live response content:', text);
  } catch (err) {
    const msg = String(err?.message || err || 'unknown');
    if (/temperature/i.test(msg)) {
      console.error('[FAIL] temperature parameter error from API:', msg);
    } else {
      console.error('[FAIL] CV analysis smoke failed:', err?.status || err?.code || msg);
    }
    process.exitCode = 1;
  }
})();
