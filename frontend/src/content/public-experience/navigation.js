/**
 * Safe Navigation & Query Parameter Normalization for Personality Assessor
 * Public Experience Namespace
 */

export const DEFAULT_ACQUISITION_TARGET = '/assessment/start';
export const DEFAULT_AUTH_TARGET = '/dashboard';

/**
 * Validates and sanitizes a requested 'next' redirect path.
 * Strictly prevents open redirect vulnerabilities.
 *
 * @param {string|null|undefined} next - The candidate path
 * @param {string} fallback - Default safe fallback
 * @returns {string} Sanitized relative path
 */
export function getSafeNextUrl(next, fallback = DEFAULT_AUTH_TARGET) {
  if (!next || typeof next !== 'string') return fallback;

  const trimmed = next.trim();

  // Must start with exactly one slash, no protocol, no double slash, no backslash
  if (
    trimmed.startsWith('/') &&
    !trimmed.startsWith('//') &&
    !trimmed.includes('\\') &&
    !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
  ) {
    return trimmed;
  }

  return fallback;
}

/**
 * Helper to build safe acquisition signup links with preserved next path.
 *
 * @param {string} [nextPath=DEFAULT_ACQUISITION_TARGET]
 * @returns {string} E.g. "/signup?next=%2Fassessment%2Fstart"
 */
export function getSignupAcquisitionUrl(nextPath = DEFAULT_ACQUISITION_TARGET) {
  const safeNext = getSafeNextUrl(nextPath, DEFAULT_ACQUISITION_TARGET);
  return `/signup?next=${encodeURIComponent(safeNext)}`;
}

/**
 * Helper to build safe login links with preserved next path.
 *
 * @param {string} [nextPath]
 * @returns {string} E.g. "/login?next=%2Fassessment%2Fstart"
 */
export function getLoginUrl(nextPath) {
  if (!nextPath || nextPath === DEFAULT_AUTH_TARGET) return '/login';
  const safeNext = getSafeNextUrl(nextPath, DEFAULT_AUTH_TARGET);
  return `/login?next=${encodeURIComponent(safeNext)}`;
}
