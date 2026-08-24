/**
 * Personality Assessor - Media Actor Registry
 * Central high-performance mutable store for persistent GPU media actors and DOM slots.
 * Avoids React rerenders on scroll/resize by managing refs and cached subscribers directly.
 */

class MediaActorRegistryClass {
  constructor() {
    this.actors = new Map();
    this.cachedActorIds = [];
    this.subscribers = new Set();
    this.isDirty = false;
  }

  /**
   * Register a media actor slot from DOM
   * @param {string} id - Unique actor ID (e.g. 'home-world-entry-primary')
   * @param {Object} data - Initial actor properties
   */
  register(id, data = {}) {
    const existing = this.actors.get(id) || {};
    const actor = {
      id,
      assetKey: data.assetKey || '',
      element: data.element || null,
      mode: data.mode || 'tracking', // 'tracking' | 'manual' | 'hidden'
      route: data.route || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      transitionRole: data.transitionRole || 'static', // 'static' | 'shared'
      rect: {
        x: data.rect?.x || 0,
        y: data.rect?.y || 0,
        width: data.rect?.width || 0,
        height: data.rect?.height || 0,
      },
      opacity: typeof data.opacity === 'number' ? data.opacity : 1.0,
      crop: data.crop || { top: 0, right: 0, bottom: 0, left: 0 },
      z: typeof data.z === 'number' ? data.z : 0,
      scale: typeof data.scale === 'number' ? data.scale : 1.0,
      uvParallax: { x: 0, y: 0 },
      velocityDeform: 0,
      textureReady: Boolean(data.textureReady),
      ...existing,
      ...data,
    };

    this.actors.set(id, actor);
    this.cachedActorIds = Array.from(this.actors.keys());
    this.notify();
    return actor;
  }

  unregister(id) {
    if (this.actors.has(id)) {
      this.actors.delete(id);
      this.cachedActorIds = Array.from(this.actors.keys());
      this.notify();
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
      (a) => a.route === route || a.transitionRole === 'shared'
    );
  }

  update(id, updates = {}) {
    const actor = this.actors.get(id);
    if (!actor) return;

    Object.assign(actor, updates);
    this.isDirty = true;
  }

  updateBoundsFromElement(id) {
    const actor = this.actors.get(id);
    if (!actor || !actor.element || actor.mode === 'manual') return;

    const domRect = actor.element.getBoundingClientRect();
    actor.rect = {
      x: domRect.left,
      y: domRect.top,
      width: domRect.width,
      height: domRect.height,
    };
    this.isDirty = true;
  }

  updateAllTrackingBounds() {
    this.actors.forEach((actor) => {
      if (actor.mode === 'tracking' && actor.element) {
        const domRect = actor.element.getBoundingClientRect();
        actor.rect.x = domRect.left;
        actor.rect.y = domRect.top;
        actor.rect.width = domRect.width;
        actor.rect.height = domRect.height;
      }
    });
    this.isDirty = true;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => {
      try {
        cb(this.actors);
      } catch (err) {
        console.error('MediaActorRegistry notification error:', err);
      }
    });
  }

  clear() {
    this.actors.clear();
    this.cachedActorIds = [];
    this.notify();
  }
}

export const MediaActorRegistry = new MediaActorRegistryClass();
export default MediaActorRegistry;
