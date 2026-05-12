/**
 * Shared types and helpers for personal analytics (Phase 7).
 * No fabricated history — consumers must respect insufficient-data rules.
 */

const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));

const BIG_FIVE_KEYS = [
  { dimension: 'openness', label: 'Openness' },
  { dimension: 'conscientiousness', label: 'Conscientiousness' },
  { dimension: 'extraversion', label: 'Extraversion' },
  { dimension: 'agreeableness', label: 'Agreeableness' },
  { dimension: 'emotionalStability', label: 'Emotional stability' },
];

const RIASEC_KEYS = ['R', 'I', 'A', 'S', 'E', 'C'];

const toDateKey = (d) => {
  if (!d) return '';
  const dt = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(dt.getTime())) return '';
  return dt.toISOString().slice(0, 10);
};

const scoreValidityRank = (v) => {
  const s = String(v || '').toLowerCase();
  if (s === 'valid') return 3;
  if (s === 'partial') return 2;
  if (s === 'insufficient_data') return 1;
  return 0;
};

const isTrendEligibleValidity = (v) => {
  const s = String(v || '').toLowerCase();
  return s === 'valid' || s === 'partial';
};

module.exports = {
  clamp,
  BIG_FIVE_KEYS,
  RIASEC_KEYS,
  toDateKey,
  scoreValidityRank,
  isTrendEligibleValidity,
};
