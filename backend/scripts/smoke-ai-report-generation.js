#!/usr/bin/env node
require('dotenv').config();

const { config } = require('../config/env');
const { generateResultNarrative } = require('../services/ai-result-narrative.service');

const maskKey = (key) => (key ? `${String(key).slice(0, 6)}...${String(key).slice(-4)}` : 'missing');

(async () => {
  const provider = config.aiProvider || 'unknown';
  const hasKey = Boolean(config.aiApiKey);
  console.log(`[INFO] Active Provider: ${provider}`);
  console.log(`[INFO] Provider Key: ${maskKey(config.aiApiKey)}`);

  const out = await generateResultNarrative({
    aiProfile: { domain: 'software engineering', subdomains: ['backend', 'ai'], skills: ['node.js', 'testing'] },
    traitVector: { openness: 72, conscientiousness: 78, extraversion: 45, agreeableness: 61, neuroticism: 29 },
    careers: [{ title: 'Backend Engineer' }, { title: 'ML Platform Engineer' }],
    skills: ['systems thinking', 'api design'],
    phase3Scores: { bigFive: { openness: 72 } },
    phase3ScoreMeta: { scoreValidity: 'valid' },
    phase3EvidencePreview: [{ dimension: 'openness', evidenceCount: 6 }],
  });

  console.log('[INFO] aiStatus:', JSON.stringify(out.aiStatus || {}, null, 2));
  if (!hasKey) {
    if (out?.aiStatus?.fallbackUsed !== true) {
      console.error('[FAIL] Expected fallbackUsed=true when key missing');
      process.exitCode = 1;
      return;
    }
    console.log('[PASS] Missing key fallback verified');
    return;
  }

  if (!out?.summary || !out?.aiStatus) {
    console.error('[FAIL] Missing summary/aiStatus');
    process.exitCode = 1;
    return;
  }
  console.log('[PASS] Live report narrative path returned summary + aiStatus');
  console.log('[INFO] AI Status Provider:', out.aiStatus.provider);
  console.log('[INFO] AI Status Model:', out.aiStatus.model);
  console.log('[INFO] Fallback Used:', out.aiStatus.fallbackUsed);
})();
