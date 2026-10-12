import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { navigateCinematic } from './routeNavigation';

gsap.registerPlugin(ScrollTrigger);

/** A single clock owns smooth scrolling and scene progress. Native touch scrolling stays native. */
export function mountHumanTrace(root, navigate) {
  const $ = selector => root.querySelector(selector);
  const all = selector => [...root.querySelectorAll(selector)];
  const mm = gsap.matchMedia();
  const listeners = [];
  const on = (node, event, callback, options) => {
    node.addEventListener(event, callback, options);
    listeners.push(() => node.removeEventListener(event, callback, options));
  };
  let lenis;
  let selected = 0;
  const state = { dominant: 'opening', context: 0 };
  window.__VALTUM_FILM_STATUS__ = state;

  mm.add({ desktop: '(min-width: 801px)', mobile: '(max-width: 800px)', touch: '(pointer: coarse)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
    const { desktop, touch, reduce } = context.conditions;
    if (reduce) return;
    let cleanupScroll = () => {};
    if (desktop && !touch) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      cleanupScroll = () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = undefined; };
    }
    const media = $('#hero-actor');
    const world = $('#world-frame');
    const question = $('#stage-question');
    // The title exits completely before the next text is allowed to enter.
    const opening = gsap.timeline({ scrollTrigger: {
      trigger: $('#intro'), start: 'top top', end: 'bottom bottom', scrub: touch ? .25 : .65,
      invalidateOnRefresh: true,
      onUpdate: self => { state.dominant = self.progress < .6 ? 'opening' : 'assessment'; world.inert = self.progress > .42; question.inert = self.progress < .64; },
    }});
    opening.to(world, { yPercent: -14, clipPath: 'inset(0 0 100% 0)', duration: .32, ease: 'power2.inOut' }, .10)
      .to($('.scroll-cue'), { autoAlpha: 0, duration: .15 }, .05)
      .to(media, { left: '0%', top: '0%', width: '100%', height: '100%', duration: .48, ease: 'power2.inOut' }, .18)
      .to(media.querySelector('img'), { scale: 1.55, duration: .65, ease: 'none' }, .15)
      .to($('.image-tint'), { opacity: .52, duration: .25 }, .45)
      .fromTo(question, { autoAlpha: 0, y: 45, clipPath: 'inset(0 0 100% 0)' }, { autoAlpha: 1, y: 0, clipPath: 'inset(0)', duration: .23, ease: 'power2.out' }, .64)
      .to({}, { duration: .20 });

    const panels = all('[data-context]');
    const conditions = gsap.timeline({ scrollTrigger: {
      trigger: $('#conditions'), start: 'top top', end: 'bottom bottom', scrub: touch ? .2 : .7,
      invalidateOnRefresh: true,
      onUpdate: self => {
        selected = self.progress < .33 ? 0 : self.progress < .67 ? 1 : 2;
        state.context = selected;
        all('[data-context-button]').forEach((b, i) => b.setAttribute('aria-current', String(i === selected)));
      },
    }});
    panels.forEach((panel, i) => {
      const at = i * 1.2;
      if (i) conditions.fromTo(panel, { clipPath: 'inset(100% 0 0)' }, { clipPath: 'inset(0)', duration: .5, ease: 'power2.inOut' }, at);
      conditions.fromTo(panel.querySelector('img'), { scale: 1.10, yPercent: -3 }, { scale: 1.02, yPercent: 0, duration: 1.2, ease: 'none' }, at);
      if (i) conditions.fromTo(panel.querySelector('.condition-copy'), { y: 70 }, { y: 0, duration: .6, ease: 'power2.out' }, at);
    });
    if (desktop) {
      const picture = $('.evidence-photo img');
      gsap.fromTo(picture, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: $('.evidence-body'), start: 'top bottom', end: 'bottom top', scrub: .7 }});
      gsap.fromTo($('.career-gallery'), { x: 0 }, { x: () => -Math.min(100, window.innerWidth * .055), ease: 'none', scrollTrigger: { trigger: $('#career'), start: 'top bottom', end: 'bottom top', scrub: .8 }});
      gsap.fromTo($('.finale>img'), { scale: 1.16, yPercent: -4 }, { scale: 1.04, yPercent: 0, ease: 'none', scrollTrigger: { trigger: $('#finale'), start: 'top bottom', end: 'bottom bottom', scrub: .9 }});
    }
    return () => { cleanupScroll(); world.inert = false; question.inert = false; };
  });

  all('[data-context-button]').forEach((button, index) => on(button, 'click', () => {
    const track = $('#conditions');
    const top = track.getBoundingClientRect().top + window.scrollY;
    const position = top + Math.max(0, track.offsetHeight - window.innerHeight) * [0, .49, .9][index];
    if (lenis) lenis.scrollTo(position, { duration: .9 });
    else window.scrollTo({ top: position, behavior: 'smooth' });
  }));
  const range = $('#time-range');
  const split = () => $('#comparison').style.setProperty('--split', range.value + '%');
  on(range, 'input', split); split();

  const menu = $('#film-menu');
  const opener = $('#open-menu');
  const closer = $('#close-menu');
  const main = $('#main');
  let previousOverflow = '';
  const setMenu = open => {
    menu.hidden = !open;
    opener.setAttribute('aria-expanded', String(open));
    main.inert = open;
    if (open) { previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; lenis?.stop(); closer.focus(); }
    else { document.body.style.overflow = previousOverflow; lenis?.start(); opener.focus(); }
  };
  on(opener, 'click', () => setMenu(true));
  on(closer, 'click', () => setMenu(false));
  on(root, 'keydown', e => {
    if (menu.hidden) return;
    if (e.key === 'Escape') setMenu(false);
    if (e.key === 'Tab') {
      const controls = all('#film-menu a,#film-menu button');
      const focused = root.activeElement;
      if (e.shiftKey && focused === controls[0]) { e.preventDefault(); controls.at(-1).focus(); }
      else if (!e.shiftKey && focused === controls.at(-1)) { e.preventDefault(); controls[0].focus(); }
    }
  });
  on(root, 'click', event => {
    const anchor = event.target.closest('a[href]');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = anchor.getAttribute('href');
    if (href.startsWith('#')) {
      const target = $(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'auto' });
      target.focus({ preventScroll: true });
    } else if (href.startsWith('/')) {
      event.preventDefault();
      if (!menu.hidden) setMenu(false);
      navigateCinematic(navigate, href, anchor);
    }
  });
  const refresh = () => ScrollTrigger.refresh();
  all('img').forEach(img => { if (!img.complete) on(img, 'load', refresh, { once: true }); });
  document.fonts.ready.then(() => { if (root.host.isConnected) refresh(); });
  return () => {
    listeners.forEach(remove => remove());
    mm.revert();
    document.body.style.overflow = previousOverflow;
    delete window.__VALTUM_FILM_STATUS__;
  };
}
