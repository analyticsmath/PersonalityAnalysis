/**
 * Mutable non-rerendering scroll state store & central ScrollBus for high-frequency motion subsystems
 * Also manages pre-navigation actor geometry capture for seamless cross-route transitions.
 */

export class ScrollBus {
  constructor() {
    this.scrollY = 0;
    this.previousY = 0;
    this.velocity = 0;
    this.direction = 1;
    this.timestamp = Date.now();
    this.listeners = new Set();
  }

  update(currentY) {
    const now = performance.now();
    const dt = Math.max(1, now - (this._lastPerfTime || now));
    this.previousY = this.scrollY;
    this.scrollY = currentY;
    this.velocity = (this.scrollY - this.previousY) / dt;
    this.direction = this.scrollY >= this.previousY ? 1 : -1;
    this.timestamp = Date.now();
    this._lastPerfTime = now;

    this.listeners.forEach((listener) => {
      try {
        listener(this);
      } catch (err) {
        console.error('ScrollBus listener error:', err);
      }
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const scrollBus = new ScrollBus();

export const scrollState = {
  scroll: 0,
  targetScroll: 0,
  velocity: 0,
  direction: 1,
  progress: 0,
  settled: true,
  lastUpdate: 0,
  activeScenes: {},
  actors: {},
  lastPreNavSnapshot: null,
};

export function updateScrollState(scrollY, velocity, direction, progress) {
  scrollBus.update(scrollY);
  scrollState.scroll = scrollY;
  scrollState.velocity = typeof velocity === 'number' ? velocity : scrollBus.velocity;
  scrollState.direction = direction || scrollBus.direction;
  scrollState.progress = progress;
  scrollState.settled = Math.abs(scrollState.velocity) < 0.05;
  scrollState.lastUpdate = Date.now();
}

export function registerSceneProgress(sceneId, progress, isPinned = false) {
  scrollState.activeScenes[sceneId] = {
    progress,
    isPinned,
    timestamp: Date.now(),
  };
}

export function registerActor(actorId, actorData) {
  scrollState.actors[actorId] = {
    ...actorData,
    updatedAt: Date.now(),
  };
}

export function getActor(actorId) {
  return scrollState.actors[actorId] || null;
}

export function removeActor(actorId) {
  delete scrollState.actors[actorId];
}

/**
 * Capture source actor geometry before navigation occurs
 */
export function capturePreNavSnapshot(sourcePath) {
  if (typeof document === 'undefined') return null;

  try {
    // Find all potential transition actors currently rendered
    const actorElements = document.querySelectorAll('[data-transition-actor]');
    let bestActor = null;
    let maxArea = 0;

    actorElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only consider actors that are visible in the viewport
      if (rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0) {
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const area = rect.width * visibleHeight;
        if (area > maxArea) {
          maxArea = area;
          bestActor = {
            actorKey: el.getAttribute('data-transition-actor'),
            rect: {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            },
            text: el.textContent?.slice(0, 100) || '',
            tag: el.tagName.toLowerCase(),
          };
        }
      }
    });

    if (bestActor) {
      scrollState.lastPreNavSnapshot = {
        sourcePath: sourcePath || (typeof window !== 'undefined' ? window.location.pathname : '/'),
        actor: bestActor,
        timestamp: performance.now(),
      };
      return scrollState.lastPreNavSnapshot;
    }
  } catch (err) {
    console.warn('capturePreNavSnapshot error:', err);
  }
  return null;
}

export function getPreNavSnapshot() {
  return scrollState.lastPreNavSnapshot;
}

export function clearPreNavSnapshot() {
  scrollState.lastPreNavSnapshot = null;
}

// Global listener to capture pre-navigation geometry on click of any navigation element
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    (e) => {
      const anchor = e.target.closest('a[href], button[data-nav-target]');
      if (anchor) {
        capturePreNavSnapshot(window.location.pathname);
      }
    },
    { capture: true, passive: true }
  );
}

export default scrollState;
