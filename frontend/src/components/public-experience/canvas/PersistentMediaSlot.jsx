/**
 * Personality Assessor - Persistent Media Slot
 * DOM Anchor component for persistent GPU media planes.
 * Renders high-fidelity semantic PublicPicture fallback while tracking geometry in MediaActorRegistry.
 */

import React, { useRef, useEffect, useState } from 'react';
import { MediaActorRegistry } from './MediaActorRegistry';
import { PublicPicture } from '../media/PublicPicture';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const PersistentMediaSlot = ({
  actorId,
  assetKey,
  alt = '',
  role = 'presentation',
  priority = false,
  className = '',
  style = {},
  transitionRole = 'static',
  children,
}) => {
  const containerRef = useRef(null);
  const { hasWebGL, prefersReducedMotion } = usePublicCapabilities();
  const [gpuReady, setGpuReady] = useState(false);

  const manifestData = MEDIA_MANIFEST_PX[assetKey];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const domRect = el.getBoundingClientRect();

    // Register with MediaActorRegistry
    MediaActorRegistry.register(actorId, {
      assetKey,
      element: el,
      mode: 'tracking',
      transitionRole,
      rect: {
        x: domRect.left,
        y: domRect.top,
        width: domRect.width,
        height: domRect.height,
      },
    });

    // ResizeObserver to update bounds on layout changes
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        MediaActorRegistry.updateBoundsFromElement(actorId);
      });
      resizeObserver.observe(el);
    }

    // Subscribe to texture readiness
    const unsubscribe = MediaActorRegistry.subscribe((actors) => {
      const actor = actors.get(actorId);
      if (actor?.textureReady) {
        setGpuReady(true);
      }
    });

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      unsubscribe();
      MediaActorRegistry.unregister(actorId);
    };
  }, [actorId, assetKey, transitionRole]);

  if (!manifestData) {
    return (
      <div ref={containerRef} className={`pa-px-media-slot ${className}`} style={style}>
        {children}
      </div>
    );
  }

  const effectiveAlt = alt || manifestData.alt || '';

  return (
    <div
      ref={containerRef}
      className={`pa-px-media-slot ${className}`}
      data-actor-id={actorId}
      data-asset-key={assetKey}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Semantic Fallback / LCP Picture */}
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: hasWebGL && !prefersReducedMotion && gpuReady ? 0 : 1,
          transition: 'opacity 120ms ease-out',
        }}
      >
        <PublicPicture
          assetKey={assetKey}
          alt={effectiveAlt}
          role={role}
          priority={priority}
        />
      </div>
      {children}
    </div>
  );
};

export default PersistentMediaSlot;
