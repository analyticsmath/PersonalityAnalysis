/**
 * Mutable non-rerendering scroll state store for high-frequency motion subsystems & debuggers
 */

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
  scrollState.scroll = scrollY;
  scrollState.velocity = velocity;
  scrollState.direction = direction;
  scrollState.progress = progress;
  scrollState.settled = Math.abs(velocity) < 0.05;
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
