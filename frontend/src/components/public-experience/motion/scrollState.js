/**
 * Mutable non-rerendering scroll state store & central ScrollBus for high-frequency motion subsystems
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

export default scrollState;

