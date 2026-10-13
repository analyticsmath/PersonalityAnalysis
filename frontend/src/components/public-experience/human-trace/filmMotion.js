import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { mountImageCrawler, mountFilmPointer } from './imageCrawler';
import { navigateCinematic } from './routeNavigation';
import { mountLensSequence } from './lensSequence';

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
  let lensController, disposed = false;
  const scrollTo = position => lenis ? lenis.scrollTo(position,{duration:.8}) : window.scrollTo({top:position,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  const state = { dominant: 'opening', context: 0 };
  window.__VALTUM_FILM_STATUS__ = state;

  mm.add({ desktop: '(min-width: 801px)', mobile: '(max-width: 800px)', tall: '(min-height:740px)', touch: '(pointer: coarse)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
    const { desktop, touch, reduce, tall } = context.conditions;
    if (reduce) return;
    let cleanupScroll = () => {};
    if (desktop && !touch) {
      lenis = new Lenis({ duration: .85, smoothWheel: true, syncTouch: false });
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
      trigger: $('#intro'), start: 'top top', end: 'bottom bottom', scrub: touch ? .15 : .35,
      invalidateOnRefresh: true,
      onUpdate: self => { state.dominant = self.progress < .6 ? 'opening' : 'assessment'; world.inert = self.progress > .42; question.inert = self.progress < .64; },
    }});
    opening.to(world, { yPercent: -14, clipPath: 'inset(0 0 100% 0)', duration: .32, ease: 'power2.inOut' }, .10)
      .to($('.scroll-cue'), { autoAlpha: 0, duration: .15 }, .05)
      .to(media, { left: '0%', top: '0%', width: '100%', height: '100%', duration: .48, ease: 'power2.inOut' }, .18)
      .to(media.querySelector('img'), { scale: 1.18, duration: .65, ease: 'none' }, .15)
      .to($('.image-tint'), { opacity: .52, duration: .25 }, .45)
      .fromTo(question, { autoAlpha: 0, y: 45, clipPath: 'inset(0 0 100% 0)' }, { autoAlpha: 1, y: 0, clipPath: 'inset(0)', duration: .23, ease: 'power2.out' }, .64)
      .to({}, { duration: .20 });

    const panels = all('[data-context]');
    const conditions = gsap.timeline({ scrollTrigger: {
      trigger: $('#conditions'), start: 'top top', end: 'bottom bottom', scrub: touch ? .15 : .3,
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
      if(tall){
      lensController = mountLensSequence(root, scrollTo);
      const time = $('#time');
      time.classList.add('is-driven');
      const revisit = gsap.timeline({scrollTrigger:{trigger:time,start:'top 88px',end:'bottom bottom',scrub:.28,invalidateOnRefresh:true}});
      revisit.to($('.time-copy'),{x:65,autoAlpha:0,duration:.3,ease:'power2.inOut'},.1)
        .to($('.time-portrait'),{clipPath:'inset(8% 5% 8%)',duration:.45,ease:'power2.inOut'},.22)
        .to($('.time-portrait img'),{scale:1.14,xPercent:-2,duration:.7,ease:'none'},0)
        .fromTo($('.time-return'),{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.25,ease:'power2.out'},.64)
        .to({},{duration:.22});
      }
      gsap.fromTo($('.footer-wordmark'), {y:80}, {y:0,ease:'none',scrollTrigger:{trigger:$('.grand-footer'),start:'top 80%',end:'bottom bottom',scrub:.25}});
      gsap.fromTo($('.finale>img'), { scale: 1.16, yPercent: -4 }, { scale: 1.04, yPercent: 0, ease: 'none', scrollTrigger: { trigger: $('#finale'), start: 'top bottom', end: 'bottom bottom', scrub: .9 }});
    }
    return () => { lensController?.dispose(); lensController=undefined; $('#time').classList.remove('is-driven'); cleanupScroll(); world.inert = false; question.inert = false; };
  });

  all('[data-context-button]').forEach((button, index) => on(button, 'click', () => {
    const track = $('#conditions');
    const top = track.getBoundingClientRect().top + window.scrollY;
    const position = top + Math.max(0, track.offsetHeight - window.innerHeight) * [0, .49, .9][index];
    if (lenis) lenis.scrollTo(position, { duration: .9 });
    else window.scrollTo({ top: position, behavior: 'smooth' });
  }));
  all('[data-lens-select]').forEach((button,index)=>on(button,'click',()=>{
    if(lensController) lensController.select(index);
    else all('[data-lens]')[index].scrollIntoView({behavior:'auto',block:'start'});
  }));
  const chrome = $('.chrome');
  const updateChrome = () => chrome.classList.toggle('is-scrolled',window.scrollY>32);
  on(window,'scroll',updateChrome,{passive:true}); updateChrome();

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
  const destroyCrawler = mountImageCrawler(root);
  const destroyPointer = mountFilmPointer(root);
  // All media has authored dimensions. Lazy image loads must not remeasure the page mid-scroll.
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(() => { if (!disposed && root.host.isConnected) refresh(); });
  return () => {
    disposed=true;
    destroyCrawler(); destroyPointer();
    listeners.forEach(remove => remove());
    mm.revert();
    document.body.style.overflow = previousOverflow;
    delete window.__VALTUM_FILM_STATUS__;
  };
}
