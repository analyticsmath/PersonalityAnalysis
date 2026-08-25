/**
 * Personality Assessor - Media Planes Layer
 * Subscribes to VisualActorRegistry to render all active 2D orthographic media planes in the persistent WebGL canvas.
 */

import React, { useSyncExternalStore } from 'react';
import { VisualActorRegistry } from './VisualActorRegistry';
import { MediaPlane } from './MediaPlane';

export const MediaPlanesLayer = () => {
  const actorIds = useSyncExternalStore(
    (onStoreChange) => VisualActorRegistry.subscribe(onStoreChange),
    () => VisualActorRegistry.getActorIds()
  );

  return (
    <group name="media-planes-layer">
      {actorIds.map((id) => (
        <MediaPlane key={id} actorId={id} />
      ))}
    </group>
  );
};

export default MediaPlanesLayer;
