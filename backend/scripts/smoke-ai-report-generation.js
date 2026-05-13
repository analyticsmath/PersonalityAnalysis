#!/usr/bin/env node
require('dotenv').config();

const { config } = require('../config/env');
const { generateResultNarrative } = require('../services/ai-result-narrative.service');

const maskKey = (key) => (key ? `${String(key).slice(0, 6)}...${String(key).slice(-4)}` : 'missing');

(async () => {
  const hasKey = Boolean(config.openaiApiKey || process.env.OPENAI_API_KEY);
  console.log(`[INFO] OPENAI_API_KEY: ${maskKey(config.openaiApiKey || process.env.OPENAI_API_KEY)}`);

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
      process.exit(1);
    }
    console.log('[PASS] Missing key fallback verified');
    process.exit(0);
  }

  if (!out?.summary || !out?.aiStatus) {
    console.error('[FAIL] Missing summary/aiStatus');
    process.exit(1);
  }
  console.log('[PASS] Report generation path returned summary + aiStatus');
})();
