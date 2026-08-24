/**
 * Mutable non-rerendering scroll state store for high-frequency motion subsystems
 */

export const scrollState = {
  scroll: 0,
  velocity: 0,
  direction: 1,
  progress: 0,
  settled: true,
  lastUpdate: 0,
};

export function updateScrollState(scrollY, velocity, direction, progress) {
  scrollState.scroll = scrollY;
  scrollState.velocity = velocity;
  scrollState.direction = direction;
  scrollState.progress = progress;
  scrollState.settled = Math.abs(velocity) < 0.05;
  scrollState.lastUpdate = Date.now();
}

export default scrollState;
