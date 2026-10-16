const clamp = (value) => Math.max(0, Math.min(1, value));

/**
 * A scroll position is always reachable, independently of wheel gestures,
 * snapping callbacks, refresh order, or animation completion.
 */
export function observeScrollProgress(track, render, { offset = 0, response = 160 } = {}) {
  let frame = 0;
  let current = 0;
  let target = 0;
  let start = 0;
  let distance = 1;
  let lastTime = 0;
  let disposed = false;
  const tick = (time) => {
    frame = 0;
    if (disposed) return;
    const elapsed = lastTime ? Math.min(64, time - lastTime) : 16;
    lastTime = time;
    current += (target - current) * (1 - Math.exp(-elapsed / response));
    if (Math.abs(target - current) < 0.00005) current = target;
    render(current);
    if (current !== target) frame = requestAnimationFrame(tick);
    else lastTime = 0;
  };
  const read = () => {
    target = clamp((window.scrollY - start) / distance);
    if (!frame) frame = requestAnimationFrame(tick);
  };
  const measure = () => {
    const topOffset = typeof offset === 'function' ? offset() : offset;
    start = track.getBoundingClientRect().top + window.scrollY - topOffset;
    distance = Math.max(1, track.offsetHeight - window.innerHeight + topOffset);
    read();
  };
  const resize = new ResizeObserver(measure);
  resize.observe(track);
  window.addEventListener('scroll', read, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  measure();
  current = target;
  render(current);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resize.disconnect();
    window.removeEventListener('scroll', read);
    window.removeEventListener('resize', measure);
  };
}

export function readingPosition(progress, count) {
  const phase = clamp(progress) * (count - 1);
  const index = Math.floor(phase);
  const t = clamp((phase - index - 0.48) / 0.48);
  return Math.min(count - 1, index + t * t * (3 - 2 * t));
}
