#!/usr/bin/env node
const DEFAULT_PLACEHOLDER_VALUES = new Set([50, 51, 60]);
const isRealScoreMeta = (meta) => {
  if (!meta || typeof meta !== 'object') return false;
  const source = String(meta.scoreSource || '').toLowerCase();
  const validity = String(meta.scoreValidity || '').toLowerCase();
  const evidenceCount = Number(meta.evidenceCount || meta.totalEvidenceCount || 0);
  if (['mock', 'unknown'].includes(source)) return false;
  if (['insufficient_data', 'invalid'].includes(validity)) return false;
  if (source === 'legacy_unverified' && evidenceCount <= 0) return false;
  return true;
};
const hasSufficientGraphData = (record, keys, meta) => {
  if (!isRealScoreMeta(meta)) return false;
  const nums = keys.map((k) => Number(record?.[k]));
  if (nums.some((v) => !Number.isFinite(v))) return false;
  const allSame = nums.every((v) => v === nums[0]);
  const allPlaceholder = nums.every((v) => DEFAULT_PLACEHOLDER_VALUES.has(Math.round(v)));
  return !(allSame || allPlaceholder);
};

const bad = { O: 51, C: 51, E: 51, A: 51, N: 51 };
const good = { O: 70, C: 62, E: 45, A: 58, N: 40 };
const badMeta = { scoreSource: 'legacy_unverified', scoreValidity: 'insufficient_data', evidenceCount: 0 };
const goodMeta = { scoreSource: 'deterministic', scoreValidity: 'valid', evidenceCount: 12 };

if (hasSufficientGraphData(bad, ['O', 'C', 'E', 'A', 'N'], badMeta)) throw new Error('placeholder should fail');
if (!hasSufficientGraphData(good, ['O', 'C', 'E', 'A', 'N'], goodMeta)) throw new Error('valid should pass');
console.log('[PASS] graph audit smoke passed');
