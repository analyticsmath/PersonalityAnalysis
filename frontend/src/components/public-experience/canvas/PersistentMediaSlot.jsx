/**
 * Personality Assessor - Persistent Media Slot
 * DOM Anchor component for persistent visual actors in the GPU canvas.
 * Renders high-fidelity semantic PublicPicture fallback while managing slot geometry in VisualSlotRegistry
 * and participating in the strict GPU presentation handshake.
 */

import React, { useRef, useEffect, useState } from 'react';
import { VisualActorRegistry } from './VisualActorRegistry';
import { VisualSlotRegistry } from './VisualSlotRegistry';
import { PublicPicture } from '../media/PublicPicture';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

export const PersistentMediaSlot = ({
  actorId,
  slotId,
  assetKey,
  alt = '',
  role = 'presentation',
  priority = false,
  className = '',
  style = {},
  transitionRole = 'static',
  mode = 'tracking',
  focal = null,
  crop = null,
  children,
}) => {
  const containerRef = useRef(null);
  const effectiveSlotId = slotId || actorId || `slot-${assetKey}`;
  const effectiveActorId = actorId || effectiveSlotId;

  const { hasWebGL, prefersReducedMotion } = usePublicCapabilities();
  const [gpuPresented, setGpuPresented] = useState(false);

  const manifestData = MEDIA_MANIFEST_PX[assetKey];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const domRect = el.getBoundingClientRect();

    // 1. Register slot with VisualSlotRegistry
    VisualSlotRegistry.register(effectiveSlotId, {
      actorId: effectiveActorId,
      element: el,
      rect: {
        x: domRect.left,
        y: domRect.top,
        width: domRect.width,
        height: domRect.height,
      },
      priority,
    });

    // 2. Register actor with VisualActorRegistry
    VisualActorRegistry.register(effectiveActorId, {
      assetKey,
      element: el,
      boundSlotId: effectiveSlotId,
      mode,
      transitionRole,
      focal: focal || (manifestData?.focalPoint ? { x: 0.5, y: 0.5 } : { x: 0.5, y: 0.5 }),
      crop: crop || { top: 0, right: 0, bottom: 0, left: 0 },
      rect: {
        x: domRect.left,
        y: domRect.top,
        width: domRect.width,
        height: domRect.height,
      },
    });

    // 3. ResizeObserver for layout changes
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (!containerRef.current) return;
        const rect = VisualSlotRegistry.updateRect(effectiveSlotId);
        const currentActor = VisualActorRegistry.get(effectiveActorId);
        if (currentActor && currentActor.mode === 'tracking' && rect) {
          VisualActorRegistry.mutateFrame(effectiveActorId, { rect });
        }
      });
      resizeObserver.observe(el);
    }

    // 4. Subscribe to actor lifecycle for GPU Presentation Handshake
    const unsubscribe = VisualActorRegistry.subscribe((actors) => {
      const actor = actors.get(effectiveActorId);
      if (actor?.gpuPresented) {
        setGpuPresented(true);
      } else if (!actor?.gpuPresented && gpuPresented) {
        setGpuPresented(false);
      }
    });

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      unsubscribe();
      VisualSlotRegistry.unregister(effectiveSlotId);
      // For shared actors, unregister only if not transitioning
      const actor = VisualActorRegistry.get(effectiveActorId);
      if (actor && actor.transitionRole !== 'shared') {
        VisualActorRegistry.unregister(effectiveActorId);
      }
    };
  }, [effectiveActorId, effectiveSlotId, assetKey, transitionRole, mode, priority]);

  if (!manifestData) {
    return (
      <div ref={containerRef} className={`pa-px-media-slot ${className}`} style={style}>
        {children}
      </div>
    );
  }

  const effectiveAlt = alt || manifestData.alt || '';
  const isGpuActive = hasWebGL && !prefersReducedMotion && gpuPresented;

  return (
    <div
      ref={containerRef}
      className={`pa-px-media-slot ${className}`}
      data-actor-id={effectiveActorId}
      data-slot-id={effectiveSlotId}
      data-asset-key={assetKey}
      data-gpu-presented={isGpuActive ? 'true' : 'false'}
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
        className="pa-px-media-slot__fallback"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: isGpuActive ? 0 : 1,
          transition: 'opacity 120ms ease-out',
          pointerEvents: isGpuActive ? 'none' : 'auto',
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
