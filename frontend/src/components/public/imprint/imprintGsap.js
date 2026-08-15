// frontend/src/components/public/imprint/imprintGsap.js
// GSAP 3.15 + ScrollTrigger macro scroll narrative helper

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Executes a GSAP matchMedia context specifically for desktop fine-pointer macro storytelling.
 */
export function createDesktopScrollTimeline({
  trigger,
  start = 'top top',
  end = '+=240vh',
  pin = true,
  scrub = 0.5,
  onUpdate,
}) {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (pointer: fine)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end,
        pin,
        scrub,
        anticipatePin: 1,
        onUpdate,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });

  return mm;
}
