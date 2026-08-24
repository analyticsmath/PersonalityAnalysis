import React from 'react';

/**
 * Personality Assessor — ResponseFragment Protagonist
 * Polymorphic semantic object representing human evidence across representations:
 * - 'response' (full quote with desktop min-width: 22rem guard)
 * - 'clause' (extracted signal fragment)
 * - 'annotation' (contextual note)
 * - 'provenance' (source/verification token)
 * - 'echo' (temporal historical trace)
 */
const ResponseFragment = ({
  text,
  children,
  variant = 'response',
  sourceId = '0x8F4A',
  date,
  signalMark = true,
  className = '',
  style = {},
  'data-response-id': responseId = 'response-source-primary',
  ...props
}) => {
  const content = text || children;

  return (
    <div
      className={`pa-atlas-fragment pa-atlas-fragment--${variant} ${className}`.trim()}
      data-response-id={responseId}
      data-variant={variant}
      style={style}
      {...props}
    >
      {signalMark && variant !== 'provenance' && (
        <span
          className="pa-atlas-fragment__signal-mark"
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--atlas-signal)',
            borderRadius: '1px',
            marginRight: '8px',
            verticalAlign: 'middle',
          }}
        />
      )}

      <span className="pa-atlas-fragment__content">{content}</span>

      {(sourceId || date) && variant === 'response' && (
        <div
          className="pa-atlas-fragment__meta pa-atlas-mono"
          style={{
            marginTop: '8px',
            fontSize: '0.72rem',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {sourceId && <span>REF: {sourceId}</span>}
          {date && <span>RECORDED: {date}</span>}
        </div>
      )}
    </div>
  );
};

export default React.memo(ResponseFragment);
