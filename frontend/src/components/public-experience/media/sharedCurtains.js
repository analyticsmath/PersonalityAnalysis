import { Curtains } from 'curtainsjs';

let sharedCurtainsInstance = null;
let activePlanesCount = 0;

export function getSharedCurtains(containerElement) {
  if (typeof window === 'undefined') return null;

  if (!sharedCurtainsInstance) {
    try {
      // Create a fixed full-viewport background canvas container if not present
      let glCanvasHolder = document.getElementById('pa-px-shared-curtains-holder');
      if (!glCanvasHolder) {
        glCanvasHolder = document.createElement('div');
        glCanvasHolder.id = 'pa-px-shared-curtains-holder';
        glCanvasHolder.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0;';
        document.body.appendChild(glCanvasHolder);
      }

      sharedCurtainsInstance = new Curtains({
        container: glCanvasHolder,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
        autoRender: true,
        watchScroll: false, // Scroll is driven by Lenis + GSAP
      });
    } catch {
      sharedCurtainsInstance = null;
    }
  }

  activePlanesCount += 1;
  return sharedCurtainsInstance;
}

export function releaseSharedCurtains() {
  activePlanesCount = Math.max(0, activePlanesCount - 1);
  if (activePlanesCount === 0 && sharedCurtainsInstance) {
    try {
      sharedCurtainsInstance.dispose();
      const holder = document.getElementById('pa-px-shared-curtains-holder');
      if (holder) holder.remove();
    } catch {
      // ignore
    }
    sharedCurtainsInstance = null;
  }
}
