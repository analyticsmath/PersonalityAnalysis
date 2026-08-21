import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useHeaderTone — Section-aware deterministic header tone coordinator.
 * Resolves header light/dark state directly on the header DOM element without React tree re-renders.
 */
export const useHeaderTone = (defaultTone = 'light-content') => {
  useEffect(() => {
    const headerEl = document.querySelector('header.pa-header');
    if (!headerEl) return;

    // Set initial default
    headerEl.setAttribute('data-tone', defaultTone);

    const sections = document.querySelectorAll('[data-tone]');
    if (!sections.length) return;

    const triggers = [];

    sections.forEach((section) => {
      const sectionTone = section.getAttribute('data-tone');
      // When entering a 'dark' section, header needs 'dark-content' (light text).
      // When entering a 'light' section, header needs 'light-content' (dark text).
      const targetTone = sectionTone === 'dark' ? 'dark-content' : 'light-content';

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top+=64px',
        end: 'bottom top+=64px',
        onEnter: () => {
          headerEl.setAttribute('data-tone', targetTone);
        },
        onEnterBack: () => {
          headerEl.setAttribute('data-tone', targetTone);
        },
      });

      triggers.push(trigger);
    });

    // Refresh triggers to ensure immediate accuracy on mount
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [defaultTone]);
};

export default useHeaderTone;
