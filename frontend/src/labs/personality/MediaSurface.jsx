import React from 'react';

/**
 * PROTOTYPE_MEDIA_ONLY — a deliberately abstract stand-in until final art direction.
 * It stays DOM-based so the same object can move between cinematic roles cheaply.
 */
export default function MediaSurface({ className = '', compact = false, label = 'PROTOTYPE MEDIA ONLY' }) {
  return (
    <div className={`pa-media-surface ${compact ? 'pa-media-surface--compact' : ''} ${className}`} aria-hidden="true">
      <span className="pa-media-surface__label">{label}</span>
      <span className="pa-media-surface__disc" />
      <span className="pa-media-surface__plane pa-media-surface__plane--one" />
      <span className="pa-media-surface__plane pa-media-surface__plane--two" />
      <span className="pa-media-surface__rail pa-media-surface__rail--one" />
      <span className="pa-media-surface__rail pa-media-surface__rail--two" />
      <span className="pa-media-surface__focus" />
    </div>
  );
}
