import React from 'react';
import Loader from './Loader';

/**
 * @param {{ message?: string, variant?: string }} props
 */
export default function LoadingState({ message = 'Loading…', variant = 'question' }) {
  return (
    <div className="loading-state-panel">
      <Loader label={message} variant={variant} />
    </div>
  );
}
