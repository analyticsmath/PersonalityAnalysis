import React from 'react';

/**
 * Compact badges for AI provenance / validation (tooltips keep UI quiet).
 * @param {{ aiStatus?: Record<string, unknown> | null, className?: string }} props
 */
export default function AiStatusBadges({ aiStatus = null, className = '' }) {
  if (!aiStatus || typeof aiStatus !== 'object') {
    return null;
  }

  const schemaOk = Boolean(aiStatus.schemaValidated);
  const fallback = Boolean(aiStatus.fallbackUsed);
  const safety = Boolean(aiStatus.safetyChecked);
  const status = String(aiStatus.status || '').toLowerCase();

  const items = [
    { key: 'ai', label: 'AI-generated', show: status === 'ready' || status === 'fallback' },
    { key: 'schema', label: 'Schema validated', show: schemaOk },
    { key: 'fb', label: 'Fallback used', show: fallback },
    { key: 'prelim', label: 'Preliminary', show: status === 'skipped' },
    { key: 'safe', label: 'Safety checked', show: safety },
  ].filter((i) => i.show);

  if (!items.length) {
    return null;
  }

  return (
    <div className={`ai-status-badges ${className}`.trim()} style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map((i) => (
        <span
          key={i.key}
          title={`Prompt: ${String(aiStatus.promptVersion || 'n/a')} · Provider: ${String(aiStatus.provider || 'n/a')} · Latency: ${String(
            aiStatus.latencyMs != null ? `${aiStatus.latencyMs}ms` : 'n/a'
          )} · Model: ${String(aiStatus.model || 'n/a')}`}
          style={{
            fontSize: 11,
            lineHeight: 1.2,
            padding: '2px 8px',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.12)',
            opacity: 0.9,
          }}
        >
          {i.label}
        </span>
      ))}
    </div>
  );
}
