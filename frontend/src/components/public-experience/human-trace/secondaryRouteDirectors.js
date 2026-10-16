import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const mix = (a, b, value) => a + (b - a) * clamp(value);

const COVER_GRAMMAR = {
  '/how-it-works': { x: -3.5, y: -1.8, fromScale: 1.04, toScale: 1.14, mediaX: -1.4, mediaY: -1.2, copyY: -3.8, shade: 0.1 },
  '/career-intelligence': { x: -4.8, y: 0, fromScale: 1.05, toScale: 1.13, mediaX: -2.2, mediaY: 0, copyY: -4.8, shade: 0.06 },
  '/progress': { x: 2.2, y: -1, fromScale: 1.11, toScale: 1.025, mediaX: 1.1, mediaY: -1.4, copyY: -3.2, shade: -0.04 },
  '/trust': { x: -2.2, y: -2.2, fromScale: 1.04, toScale: 1.12, mediaX: -1.3, mediaY: -1.8, copyY: -4.2, shade: 0.11 },
  '/methodology': { x: -1.3, y: -0.8, fromScale: 1.035, toScale: 1.07, mediaX: -0.8, mediaY: -0.7, copyY: -2.2, shade: 0.03 },
  '/privacy': { x: 1.1, y: -0.6, fromScale: 1.025, toScale: 1.055, mediaX: 0.7, mediaY: -0.5, copyY: -1.8, shade: 0.02 },
};

function clear(element, properties) {
  if (!element) return;
  properties.forEach((property) => element.style.removeProperty(property));
}

function mountCover(root, pathname) {
  const route = root.querySelector?.('.vt-route');
  const cover = route?.querySelector('.vt-cover');
  const media = cover?.querySelector('.vt-cover-media');
  const image = cover?.querySelector('.vt-cover-photo');
  const shade = cover?.querySelector('.vt-cover-shade');
  const copy = cover?.querySelector('.vt-cover-copy');
  const grammar = COVER_GRAMMAR[pathname];
  if (!cover || !media || !image || !copy || !grammar) return () => {};

  const mm = gsap.matchMedia();
  mm.add('(min-width:901px) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
    const render = (value) => {
      const progress = clamp(value);
      const release = smooth(progress);
      image.style.transform = `translate3d(${mix(0, grammar.x, release)}%, ${mix(0, grammar.y, release)}%, 0) scale(${mix(grammar.fromScale, grammar.toScale, release)})`;
      media.style.transform = `translate3d(${mix(0, grammar.mediaX, release)}vw, ${mix(0, grammar.mediaY, release)}vh, 0)`;
      copy.style.transform = `translate3d(0, ${mix(0, grammar.copyY, release)}vh, 0)`;
      if (shade) shade.style.opacity = String(clamp(1 + grammar.shade * release));
    };

    render(0);
    const trigger = ScrollTrigger.create({
      trigger: cover,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.78,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });

    return () => {
      trigger.kill();
      clear(image, ['transform']);
      clear(media, ['transform']);
      clear(copy, ['transform']);
      clear(shade, ['opacity']);
    };
  });

  return () => mm.revert();
}

export function mountSecondaryRouteDirector(root = document, pathname = window.location.pathname) {
  return mountCover(root, pathname);
}

export default mountSecondaryRouteDirector;
