#!/usr/bin/env node
require('dotenv').config();

const { config } = require('../config/env');
const { runOpenAiResponses } = require('../services/ai/aiProvider.service');

const maskKey = (key) => {
  if (!key) return 'missing';
  return `${String(key).slice(0, 6)}...${String(key).slice(-4)}`;
};

(async () => {
  const key = config.openaiApiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    console.log('[SKIP] OPENAI_API_KEY missing; provider smoke not executed.');
    process.exit(0);
  }

  console.log(`[INFO] OPENAI_API_KEY detected (${maskKey(key)})`);

  try {
    const { text } = await runOpenAiResponses({
      input: 'Return JSON only: {"ok":true,"source":"openai"}',
      max_output_tokens: 80,
      timeoutMs: 15000,
      maxRetries: 0,
    });
    console.log('[PASS] Provider returned response text length:', String(text || '').length);
    process.exit(0);
  } catch (err) {
    console.error('[FAIL] OpenAI provider smoke failed:', err?.status || err?.code || err?.message || 'unknown');
    process.exit(1);
  }
})();
