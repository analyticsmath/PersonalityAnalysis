import { useEffect, useState } from 'react';

/**
 * Hook to detect if the user has a fine pointer (desktop mouse/trackpad).
 * Distinguishes touch/coarse devices from desktop pointers.
 */
export function useFinePointer() {
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const onChange = (event) => setIsFinePointer(event.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    } else {
      mediaQuery.addListener(onChange);
      return () => mediaQuery.removeListener(onChange);
    }
  }, []);

  return isFinePointer;
}

export default useFinePointer;
