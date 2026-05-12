/**
 * Minimal in-memory audit ring for AI calls (no raw CV / full answers / chat text).
 */

const MAX_EVENTS = 500;
const events = [];

const redactId = (value) => {
  if (value == null || value === '') return null;
  const s = String(value);
  if (s.length <= 8) return `${s.slice(0, 2)}…`;
  return `${s.slice(0, 4)}…${s.slice(-4)}`;
};

const logAiAuditEvent = (entry) => {
  const safe = {
    ts: new Date().toISOString(),
    promptId: String(entry.promptId || ''),
    promptVersion: String(entry.promptVersion || ''),
    provider: String(entry.provider || ''),
    model: String(entry.model || ''),
    schemaId: String(entry.schemaId || ''),
    schemaValidated: Boolean(entry.schemaValidated),
    safetyChecked: Boolean(entry.safetyChecked),
    fallbackUsed: Boolean(entry.fallbackUsed),
    latencyMs: Number(entry.latencyMs || 0) || 0,
    tokenUsage: entry.tokenUsage && typeof entry.tokenUsage === 'object' ? entry.tokenUsage : null,
    errorCode: entry.errorCode == null ? null : String(entry.errorCode),
    userId: entry.userId ? redactId(entry.userId) : null,
    sessionId: entry.sessionId ? redactId(entry.sessionId) : null,
    injectionFlags: Array.isArray(entry.injectionFlags) ? entry.injectionFlags.slice(0, 12) : [],
    outputSafetyFlags: Array.isArray(entry.outputSafetyFlags)
      ? entry.outputSafetyFlags.slice(0, 12)
      : [],
  };
  events.push(safe);
  if (events.length > MAX_EVENTS) {
    events.splice(0, events.length - MAX_EVENTS);
  }
  return safe;
};

const getAiAuditEventsForTests = () => [...events];

const clearAiAuditLogForTests = () => {
  events.length = 0;
};

module.exports = {
  logAiAuditEvent,
  getAiAuditEventsForTests,
  clearAiAuditLogForTests,
};
