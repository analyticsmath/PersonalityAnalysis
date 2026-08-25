/**
 * Personality Assessor - Visual Slot Registry
 * Tracks DOM element slots and their layout geometry.
 * Separates physical DOM layout slots from persistent visual actors.
 */

class VisualSlotRegistryClass {
  constructor() {
    this.slots = new Map();
    this.subscribers = new Set();

    // Dev debug API
    if (typeof window !== 'undefined') {
      window.__PX_DEBUG__ = window.__PX_DEBUG__ || {};
      window.__PX_DEBUG__.slots = this.slots;
      window.__PX_DEBUG__.slotRegistry = this;
    }
  }

  /**
   * Register a DOM slot
   * @param {string} slotId - Unique slot ID (e.g. 'home-evidence-target', 'career-entry-slot')
   * @param {Object} data - Slot properties
   */
  register(slotId, data = {}) {
    const slot = {
      slotId,
      actorId: data.actorId || null,
      element: data.element || null,
      rect: {
        x: data.rect?.x || 0,
        y: data.rect?.y || 0,
        width: data.rect?.width || 0,
        height: data.rect?.height || 0,
      },
      route: data.route || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      priority: Boolean(data.priority),
      mounted: true,
      ...data,
    };

    if (slot.element && (!slot.rect.width || !slot.rect.height)) {
      const domRect = slot.element.getBoundingClientRect();
      slot.rect = {
        x: domRect.left,
        y: domRect.top,
        width: domRect.width,
        height: domRect.height,
      };
    }

    this.slots.set(slotId, slot);
    this.notify();
    return slot;
  }

  unregister(slotId) {
    if (this.slots.has(slotId)) {
      const slot = this.slots.get(slotId);
      slot.mounted = false;
      this.slots.delete(slotId);
      this.notify();
    }
  }

  get(slotId) {
    return this.slots.get(slotId) || null;
  }

  getAll() {
    return Array.from(this.slots.values());
  }

  updateRect(slotId) {
    const slot = this.slots.get(slotId);
    if (!slot || !slot.element) return null;

    const domRect = slot.element.getBoundingClientRect();
    slot.rect.x = domRect.left;
    slot.rect.y = domRect.top;
    slot.rect.width = domRect.width;
    slot.rect.height = domRect.height;
    return slot.rect;
  }

  updateAllRects() {
    this.slots.forEach((slot) => {
      if (slot.element && slot.mounted) {
        const domRect = slot.element.getBoundingClientRect();
        slot.rect.x = domRect.left;
        slot.rect.y = domRect.top;
        slot.rect.width = domRect.width;
        slot.rect.height = domRect.height;
      }
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => {
      try {
        cb(this.slots);
      } catch (err) {
        console.error('VisualSlotRegistry notification error:', err);
      }
    });
  }

  clear() {
    this.slots.clear();
    this.notify();
  }
}

export const VisualSlotRegistry = new VisualSlotRegistryClass();
export default VisualSlotRegistry;
