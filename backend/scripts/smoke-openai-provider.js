#!/usr/bin/env node
require('dotenv').config();

const { config } = require('../config/env');
const { runOpenAiResponses } = require('../services/ai/aiProvider.service');

const maskKey = (key) => {
  if (!key) return 'missing';
  return `${String(key).slice(0, 6)}...${String(key).slice(-4)}`;
};

(async () => {
  const provider = config.aiProvider || 'unknown';
  const key = config.aiApiKey;
  if (!key) {
    console.log(`[SKIP] ${provider.toUpperCase()}_API_KEY missing; provider smoke not executed.`);
    process.exit(0);
  }

  console.log(`[INFO] Active AI Provider: ${provider}`);
  console.log(`[INFO] Active AI Model: ${config.aiModel}`);
  console.log(`[INFO] API key detected (${maskKey(key)})`);

  try {
    const { text } = await runOpenAiResponses({
      input: 'Return JSON only: {"ok":true,"source":"ai_provider"}',
      max_output_tokens: 80,
      timeoutMs: 15000,
      maxRetries: 0,
    });
    console.log(`[PASS] ${provider.toUpperCase()} Provider returned response text length: ${String(text || '').length}`);
    console.log(`[INFO] Response payload sample: ${text}`);
  } catch (err) {
    console.error(`[FAIL] ${provider.toUpperCase()} provider smoke failed:`, err?.status || err?.code || err?.message || 'unknown');
    process.exitCode = 1;
  }
})();
