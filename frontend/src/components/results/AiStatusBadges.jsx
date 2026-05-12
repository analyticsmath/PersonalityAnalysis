import React, { useMemo } from 'react';

function buildDetailTooltip(aiStatus) {
  const parts = [
    `Prompt: ${String(aiStatus.promptVersion || 'n/a')}`,
    `Provider: ${String(aiStatus.provider || 'n/a')}`,
    `Latency: ${aiStatus.latencyMs != null ? `${aiStatus.latencyMs}ms` : 'n/a'}`,
    `Model: ${String(aiStatus.model || 'n/a')}`,
    aiStatus.schemaValidated ? 'Schema validated' : 'Schema not validated',
  ];
  if (aiStatus.errorCode) {
    parts.push(`Code: ${aiStatus.errorCode}`);
  }
  return parts.join(' · ');
}

/**
 * Compact badges for AI provenance; friendly labels, technical detail in tooltips.
 * @param {{ aiStatus?: Record<string, unknown> | null, className?: string }} props
 */
export default function AiStatusBadges({ aiStatus = null, className = '' }) {
  const items = useMemo(() => {
    if (!aiStatus || typeof aiStatus !== 'object') {
      return [];
    }

    const fallback = Boolean(aiStatus.fallbackUsed);
    const safety = Boolean(aiStatus.safetyChecked);
    const status = String(aiStatus.status || '').toLowerCase();
    const err = String(aiStatus.errorCode || '').toUpperCase();
    const safetyLimited = /SAFETY|MODERAT|BLOCK|LIMIT/i.test(err);

    const detail = buildDetailTooltip(aiStatus);
    const list = [];

    if (fallback || status === 'fallback') {
      list.push({
        key: 'fb',
        label: 'Fallback summary',
        title: `${detail} · Deterministic sections remain authoritative.`,
      });
    } else if (status === 'skipped') {
      list.push({
        key: 'prelim',
        label: 'Preliminary insight',
        title: `${detail} · Narrative may be abbreviated until more evidence is collected.`,
      });
    } else if (status === 'ready' || status === 'generating') {
      list.push({
        key: 'ai',
        label: status === 'generating' ? 'AI generating' : 'AI-assisted',
        title: detail,
      });
    }

    if (safetyLimited) {
      list.push({
        key: 'slim',
        label: 'Safety limited',
        title: 'Output was constrained by automated safety checks.',
      });
    } else if (safety) {
      list.push({
        key: 'safe',
        label: 'AI checked',
        title: `${detail} · Automated review completed.`,
      });
    }

    return list;
  }, [aiStatus]);

  if (!items.length) {
    return null;
  }

  return (
    <ul className={`ai-status-badges ${className}`.trim()} role="list" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((i) => (
        <li key={i.key} style={{ margin: 0 }}>
          <span
            className="ds-badge ds-badge--neutral"
            title={i.title}
            style={{ fontSize: 11, lineHeight: 1.2, padding: '4px 10px', borderRadius: 999, textTransform: 'none', letterSpacing: 0 }}
          >
            {i.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
