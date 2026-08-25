/**
 * Personality Assessor - Visual Actor Registry
 * High-performance dual-channel store for persistent visual actors in the GPU canvas.
 * Channel 1: mutateFrame() -> zero React notifications, instant per-frame transform/UV/opacity updates.
 * Channel 2: updateLifecycle() -> notifies subscribers for slot mounting, texture ready, GPU handshake.
 */

class VisualActorRegistryClass {
  constructor() {
    this.actors = new Map();
    this.cachedActorIds = [];
    this.subscribers = new Set();

    // Dev debug API
    if (typeof window !== 'undefined') {
      window.__PX_DEBUG__ = window.__PX_DEBUG__ || {};
      window.__PX_DEBUG__.actors = this.actors;
      window.__PX_DEBUG__.actorRegistry = this;
    }
  }

  /**
   * Register a visual actor
   * @param {string} id - Unique actor ID
   * @param {Object} data - Initial actor properties
   */
  register(id, data = {}) {
    const existing = this.actors.get(id) || {};
    const actor = {
      id,
      assetKey: data.assetKey || '',
      texture: null,
      mode: data.mode || 'tracking', // 'tracking' | 'manual' | 'hidden'
      boundSlotId: data.boundSlotId || null,
      element: data.element || null,
      route: data.route || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      transitionRole: data.transitionRole || 'static', // 'static' | 'shared'
      rect: {
        x: data.rect?.x || 0,
        y: data.rect?.y || 0,
        width: data.rect?.width || 0,
        height: data.rect?.height || 0,
      },
      opacity: typeof data.opacity === 'number' ? data.opacity : 1.0,
      z: typeof data.z === 'number' ? data.z : 0,
      scale: typeof data.scale === 'number' ? data.scale : 1.0,
      crop: data.crop || { top: 0, right: 0, bottom: 0, left: 0 },
      focal: data.focal || { x: 0.5, y: 0.5 },
      uvOffset: { x: data.uvOffset?.x || 0, y: data.uvOffset?.y || 0 },
      uvScale: { x: data.uvScale?.x || 1.0, y: data.uvScale?.y || 1.0 },
      velocityDeform: 0,
      routeAffinity: data.routeAffinity || 'any',
      textureReady: Boolean(data.textureReady),
      gpuPresented: Boolean(data.gpuPresented),
      ...existing,
      ...data,
    };

    this.actors.set(id, actor);
    this.cachedActorIds = Array.from(this.actors.keys());
    this.notifyLifecycle();
    return actor;
  }

  unregister(id) {
    if (this.actors.has(id)) {
      this.actors.delete(id);
      this.cachedActorIds = Array.from(this.actors.keys());
      this.notifyLifecycle();
    }
  }

  getActorIds() {
    return this.cachedActorIds;
  }

  get(id) {
    return this.actors.get(id) || null;
  }

  getAll() {
    return Array.from(this.actors.values());
  }

  getActorsForRoute(route) {
    return Array.from(this.actors.values()).filter(
      (a) => a.route === route || a.transitionRole === 'shared' || a.routeAffinity === 'any'
    );
  }

  /**
   * Channel 1: High-frequency frame mutation (Silent, no React rerenders)
   * Used by scroll scrubbing, UV parallax, velocity deformation, manual rect interpolation.
   */
  mutateFrame(id, patch = {}) {
    const actor = this.actors.get(id);
    if (!actor) return;

    if (patch.rect) {
      if (typeof patch.rect.x === 'number') actor.rect.x = patch.rect.x;
      if (typeof patch.rect.y === 'number') actor.rect.y = patch.rect.y;
      if (typeof patch.rect.width === 'number') actor.rect.width = patch.rect.width;
      if (typeof patch.rect.height === 'number') actor.rect.height = patch.rect.height;
    }
    if (typeof patch.opacity === 'number') actor.opacity = patch.opacity;
    if (typeof patch.scale === 'number') actor.scale = patch.scale;
    if (typeof patch.z === 'number') actor.z = patch.z;
    if (typeof patch.mode === 'string') actor.mode = patch.mode;
    if (typeof patch.velocityDeform === 'number') actor.velocityDeform = patch.velocityDeform;

    if (patch.uvOffset) {
      if (typeof patch.uvOffset.x === 'number') actor.uvOffset.x = patch.uvOffset.x;
      if (typeof patch.uvOffset.y === 'number') actor.uvOffset.y = patch.uvOffset.y;
    }
    if (patch.uvScale) {
      if (typeof patch.uvScale.x === 'number') actor.uvScale.x = patch.uvScale.x;
      if (typeof patch.uvScale.y === 'number') actor.uvScale.y = patch.uvScale.y;
    }
    if (patch.crop) {
      Object.assign(actor.crop, patch.crop);
    }
  }

  /**
   * Channel 2: Semantic lifecycle mutation (Notifies subscribers)
   * Used for slot mounted, unmounted, texture loaded, GPU presented, route transition handoff.
   */
  updateLifecycle(id, patch = {}) {
    const actor = this.actors.get(id);
    if (!actor) return;

    Object.assign(actor, patch);
    this.notifyLifecycle();
  }

  // Alias for backward compatibility
  update(id, patch = {}) {
    this.mutateFrame(id, patch);
    if (patch.textureReady !== undefined || patch.gpuPresented !== undefined || patch.mode !== undefined) {
      this.updateLifecycle(id, patch);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notifyLifecycle() {
    this.subscribers.forEach((cb) => {
      try {
        cb(this.actors);
      } catch (err) {
        console.error('VisualActorRegistry lifecycle notification error:', err);
      }
    });
  }

  clear() {
    this.actors.clear();
    this.cachedActorIds = [];
    this.notifyLifecycle();
  }
}

export const VisualActorRegistry = new VisualActorRegistryClass();
export const MediaActorRegistry = VisualActorRegistry;
export default VisualActorRegistry;
