import gsap from 'gsap';

export const wrapDistance = (distance, width) => width > 0 ? ((distance % width) + width) % width : 0;
export const dampVelocity = (velocity, seconds) => velocity * Math.exp(-5 * seconds);

/** A local conveyor: vertical scrolling is never captured or cancelled. */
export function mountImageCrawler(root) {
  const viewport = root.querySelector('#image-crawler');
  const belt = viewport.querySelector('.crawler-belt');
  const group = belt.firstElementChild;
  const control = root.querySelector('#crawler-pause');
  const media = window.matchMedia('(min-width:801px) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  const listeners = [];
  const on = (node, type, callback) => { node.addEventListener(type, callback); listeners.push(() => node.removeEventListener(type, callback)); };
  let paused = false, hovering = false, focused = false, visible = false, dragging = false;
  let distance = 0, width = 0, velocity = 0, lastX = 0, lastTime = 0, travel = 0, suppressUntil = 0;
  const enabled = () => media.matches;
  const paint = () => { distance = wrapDistance(distance, width); belt.style.transform = `translate3d(${-distance}px,0,0)`; };
  const measure = () => {
    width = group.getBoundingClientRect().width;
    viewport.classList.toggle('is-looping', enabled());
    control.hidden = !enabled();
    if (enabled()) paint(); else { belt.style.transform = ''; viewport.classList.remove('is-dragging'); dragging = false; }
  };
  const observer = new window.ResizeObserver(measure); observer.observe(group);
  const visibility = new window.IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { rootMargin: '150px' }); visibility.observe(viewport);
  const tick = (_time, delta) => {
    if (!enabled() || !visible || document.hidden || paused || hovering || focused || dragging || !width) return;
    const dt = Math.min(delta / 1000, .05);
    distance += (32 + velocity) * dt; velocity = dampVelocity(velocity, dt); paint();
  };
  gsap.ticker.add(tick);
  on(control, 'click', () => { paused = !paused; velocity = 0; control.setAttribute('aria-pressed', String(paused)); control.innerHTML = paused ? 'Play gallery <span aria-hidden="true">▷</span>' : 'Pause gallery <span aria-hidden="true">Ⅱ</span>'; });
  on(viewport, 'pointerenter', () => { hovering = true; });
  on(viewport, 'pointerleave', () => { hovering = false; });
  on(viewport, 'focusin', event => {
    focused = true;
    const link = event.target.closest('.career-image');
    if (enabled() && !dragging && link && group.contains(link)) { distance = wrapDistance(link.offsetLeft - (viewport.clientWidth - link.offsetWidth) / 2, width); paint(); }
  });
  on(viewport, 'focusout', event => { if (!viewport.contains(event.relatedTarget)) focused = false; });
  on(viewport, 'pointerdown', event => {
    if (!enabled() || event.button !== 0 || event.pointerType !== 'mouse') return;
    dragging = true; velocity = 0; travel = 0; lastX = event.clientX; lastTime = window.performance.now();

  });
  on(viewport, 'pointermove', event => {
    if (!dragging) return;
    const now = window.performance.now(), dx = event.clientX - lastX;
    travel += Math.abs(dx); distance -= dx; velocity = Math.max(-900, Math.min(900, -dx / Math.max(.008, (now-lastTime)/1000)));
    lastX = event.clientX; lastTime = now;
    if (travel > 6) { viewport.classList.add('is-dragging'); if (!viewport.hasPointerCapture(event.pointerId)) viewport.setPointerCapture(event.pointerId); }
    paint();
  });
  const endDrag = event => {
    if (!dragging) return;
    dragging = false; viewport.classList.remove('is-dragging');
    if (travel > 6) suppressUntil = window.performance.now() + 400;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  };
  on(viewport, 'pointerup', endDrag); on(viewport, 'pointercancel', endDrag);
  const suppressClick = event => { if (window.performance.now() < suppressUntil) { event.preventDefault(); event.stopPropagation(); } };
  viewport.addEventListener('click', suppressClick, true);
  on(viewport, 'dragstart', event => event.preventDefault());
  media.addEventListener('change', measure); measure();
  return () => { gsap.ticker.remove(tick); observer.disconnect(); visibility.disconnect(); media.removeEventListener('change', measure); viewport.removeEventListener('click', suppressClick, true); listeners.forEach(remove=>remove()); };
}

export function mountFilmPointer(root) {
  const pointer = root.querySelector('.film-pointer');
  const media = window.matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)');
  const xTo = gsap.quickTo(pointer, 'x', { duration:.18, ease:'power3.out' });
  const yTo = gsap.quickTo(pointer, 'y', { duration:.18, ease:'power3.out' });
  const move = event => {
    const target = event.target.closest('[data-pointer]');
    pointer.style.opacity = target && media.matches ? '1' : '0';
    if (!target || !media.matches) return;
    pointer.textContent = target.dataset.pointer; xTo(event.clientX); yTo(event.clientY);
  };
  const leave = () => { pointer.style.opacity = '0'; };
  root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave);
  window.addEventListener('scroll',leave,{passive:true});
  return () => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); window.removeEventListener('scroll',leave); xTo.tween.kill(); yTo.tween.kill(); };
}
