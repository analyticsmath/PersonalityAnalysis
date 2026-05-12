/**
 * User-data retention policy (product stance, not legal certification).
 * Data is retained until the user deletes it or deletes their account.
 */
const RETENTION_POLICY_VERSION = 'phase8-v1';

const DEFAULT_RETENTION_STANCE = {
  version: RETENTION_POLICY_VERSION,
  summary:
    'We keep your assessment, profile, and analytics data until you delete it from Privacy controls or delete your account.',
  inactivityPurge: 'No automatic purge is applied by default in this deployment.',
};

module.exports = {
  RETENTION_POLICY_VERSION,
  DEFAULT_RETENTION_STANCE,
};
