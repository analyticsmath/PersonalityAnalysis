export const DEFAULT_PLACEHOLDER_VALUES = new Set([50, 51, 60]);

export const isRealScoreMeta = (meta) => {
  if (!meta || typeof meta !== 'object') return false;
  const source = String(meta.scoreSource || '').toLowerCase();
  const validity = String(meta.scoreValidity || '').toLowerCase();
  const evidenceCount = Number(meta.evidenceCount || meta.totalEvidenceCount || 0);
  if (['mock', 'unknown'].includes(source)) return false;
  if (['insufficient_data', 'invalid'].includes(validity)) return false;
  if (source === 'legacy_unverified' && evidenceCount <= 0) return false;
  return true;
};

export const isPlaceholderScoreArray = (values = [], meta = null) => {
  const nums = values.map((v) => Number(v)).filter((v) => Number.isFinite(v));
  if (!nums.length) return true;
  const allSame = nums.every((v) => v === nums[0]);
  const allPlaceholder = nums.every((v) => DEFAULT_PLACEHOLDER_VALUES.has(Math.round(v)));
  if ((allSame || allPlaceholder) && !isRealScoreMeta(meta)) return true;
  return false;
};

export const hasSufficientGraphData = (record = {}, requiredKeys = [], meta = null) => {
  if (!isRealScoreMeta(meta)) return false;
  const values = requiredKeys.map((key) => Number(record?.[key]));
  if (values.some((v) => !Number.isFinite(v))) return false;
  return !isPlaceholderScoreArray(values, meta);
};
