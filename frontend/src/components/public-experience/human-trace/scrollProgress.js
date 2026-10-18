const clamp = (value) => Math.max(0, Math.min(1, value));

/**
 * A scroll position is always reachable, independently of wheel gestures,
 * snapping callbacks, refresh order, or animation completion.
 */
export function observeScrollProgress(track, render, { offset = 0, response = 260 } = {}) {
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
    const elapsed = lastTime ? Math.min(1000, time - lastTime) : 16;
    lastTime = time;
    // Lenis already eases input; keep only a small visual catch-up behind it.
    const settle = document.documentElement.dataset.cinemaScroll === 'lenis' ? Math.min(response, 110) : response;
    current += (target - current) * (1 - Math.exp(-elapsed / settle));
    if (Math.abs(target - current) < 0.00005) current = target;
    render(current);
    if (current !== target) frame = window.requestAnimationFrame(tick);
    else lastTime = 0;
  };
  const read = () => {
    target = clamp((window.scrollY - start) / distance);
    if (!frame) frame = window.requestAnimationFrame(tick);
  };
  const measure = () => {
    const topOffset = typeof offset === 'function' ? offset() : offset;
    start = track.getBoundingClientRect().top + window.scrollY - topOffset;
    distance = Math.max(1, track.offsetHeight - window.innerHeight + topOffset);
    read();
  };
  const resize = new window.ResizeObserver(measure);
  resize.observe(track);
  window.addEventListener('scroll', read, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  measure();
  current = target;
  render(current);
  return () => {
    disposed = true;
    window.cancelAnimationFrame(frame);
    resize.disconnect();
    window.removeEventListener('scroll', read);
    window.removeEventListener('resize', measure);
  };
}

export function readingPosition(progress, count) {
  const phase = clamp(progress) * count;
  const index = Math.min(count - 1, Math.floor(phase));
  if (index === count - 1) return index;
  const t = clamp((phase - index - 0.42) / 0.58);
  return Math.min(count - 1, index + t * t * (3 - 2 * t));
}
