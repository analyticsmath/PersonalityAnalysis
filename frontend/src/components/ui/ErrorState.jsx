import React from 'react';
import Button from './Button';

/**
 * @param {{ title?: string, message: string, onRetry?: () => void, retryLabel?: string, children?: React.ReactNode }} props
 */
export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  children,
}) {
  return (
    <div className="error-state-panel" role="alert">
      <h2 className="error-state-panel__title">{title}</h2>
      <p className="error-state-panel__message ui-message ui-message--error">{message}</p>
      {children}
      {onRetry ? (
        <div className="error-state-panel__action">
          <Button type="button" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
