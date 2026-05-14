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
  const model = config.openaiModel || 'gpt-5.5';

  // ── Sanitizer verification (always runs) ────────────────────────────────
  console.log(`[INFO] Model under test: ${model}`);
  console.log(`[INFO] isReasoningModel(${model}): ${isReasoningModel(model)}`);

  const raw = { model, temperature: 0.15, top_p: 0.9, max_output_tokens: 100, input: [] };
  const sanitized = sanitizeOpenAiParams(model, raw);

  const forbiddenPresent = ['temperature', 'top_p'].filter((k) => k in sanitized);
  if (isReasoningModel(model) && forbiddenPresent.length > 0) {
    console.error(`[FAIL] sanitizeOpenAiParams did not remove: ${forbiddenPresent.join(', ')}`);
    process.exit(1);
  }

  console.log('[PASS] Sanitizer verification passed.');
  console.log('[INFO] Sanitized param keys:', Object.keys(sanitized).join(', '));

  // ── Live call (only when key is present) ────────────────────────────────
  const key = config.openaiApiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    console.log('[SKIP] OPENAI_API_KEY absent — skipping live CV analysis call.');
    process.exit(0);
  }

  console.log(`[INFO] OPENAI_API_KEY detected (${maskKey(key)})`);

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
    });

    const start = Date.now();
    const response = await getOpenAiClient().responses.create(params);
    const latencyMs = Date.now() - start;
    const text = extractOutputText(response);

    console.log(`[PASS] Live CV analysis succeeded. latency=${latencyMs}ms, response_length=${String(text || '').length}`);
    console.log('[INFO] Model used:', model);
    console.log('[INFO] No temperature error encountered.');
    process.exit(0);
  } catch (err) {
    const msg = String(err?.message || err || 'unknown');
    if (/temperature/i.test(msg)) {
      console.error('[FAIL] temperature parameter error from API:', msg);
    } else {
      console.error('[FAIL] CV analysis smoke failed:', err?.status || err?.code || msg);
    }
    process.exit(1);
  }
})();
