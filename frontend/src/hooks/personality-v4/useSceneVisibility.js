import { useEffect, useState } from 'react';

/**
 * Hook to pause/resume expensive render loops (like WebGL canvas)
 * when a container is not intersecting the viewport.
 *
 * @param {React.RefObject} ref - DOM element reference
 * @param {Object} options - IntersectionObserver options
 * @returns {boolean} isVisible
 */
export function useSceneVisibility(ref, options = { threshold: 0.05 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element || typeof window === 'undefined' || typeof window.IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new window.IntersectionObserver(([entry]) => {
      setIsVisible(entry?.isIntersecting ?? true);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

export default useSceneVisibility;
