import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  class IntersectionObserverMock {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = window.IntersectionObserver || IntersectionObserverMock;

  class ResizeObserverMock {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = window.ResizeObserver || ResizeObserverMock;

  if (typeof window.requestAnimationFrame !== 'function') {
    window.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  }
  if (typeof window.cancelAnimationFrame !== 'function') {
    window.cancelAnimationFrame = (id) => clearTimeout(id);
  }
}

if (typeof global !== 'undefined') {
  if (typeof global.requestAnimationFrame !== 'function') {
    global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
  }
  if (typeof global.cancelAnimationFrame !== 'function') {
    global.cancelAnimationFrame = (id) => clearTimeout(id);
  }
}
