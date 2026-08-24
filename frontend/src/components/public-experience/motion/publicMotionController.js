/**
 * Personality Assessor - Public Motion Controller
 * Stable imperative API for controlling Lenis smooth scroll, ScrollTrigger, and motion lifecycle.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollState } from './scrollState';

class PublicMotionControllerClass {
  constructor() {
    this.lenis = null;
  }

  setLenis(lenisInstance) {
    this.lenis = lenisInstance;
  }

  getLenis() {
    return this.lenis;
  }

  getScrollState() {
    return scrollState;
  }

  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        immediate: options.immediate || false,
        duration: options.duration || 1.2,
        easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        ...options,
      });
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' });
      }
    }
  }

  refresh() {
    if (typeof ScrollTrigger.refresh === 'function') {
      ScrollTrigger.refresh();
    }
  }

  stop() {
    this.lenis?.stop();
  }

  start() {
    this.lenis?.start();
  }
}

export const publicMotionController = new PublicMotionControllerClass();
export default publicMotionController;
