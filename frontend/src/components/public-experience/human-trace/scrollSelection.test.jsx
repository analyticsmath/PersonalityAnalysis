import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useScrollSequence } from './useScrollSequence';

const clock = vi.hoisted(() => ({ scroll: vi.fn(), timelines: [] }));
vi.mock('./CinematicPublicShell', () => ({ useCinemaScroll: () => clock.scroll }));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));
vi.mock('gsap', () => ({ default: {
  registerPlugin: vi.fn(),
  matchMedia: () => {
    let cleanup;
    return { add: (_query, setup) => { cleanup = setup(); }, revert: () => cleanup?.() };
  },
  to: (proxy, options) => ({
    progress: value => { proxy.progress = value; options.onUpdate(); },
    kill: vi.fn(),
    scrollTrigger: { start: 100, end: 1100, update: vi.fn(), getTween: () => null, refresh: vi.fn(), kill: vi.fn() },
  }),
  timeline: options => {
    const timeline = { kill: vi.fn(), to: () => timeline, fromTo: () => timeline, finish: () => options.onComplete() };
    clock.timelines.push(timeline);
    return timeline;
  },
} }));

const fixture = () => {
  const track = document.createElement('section');
  track.innerHTML = `<div data-sequence-index-window><div data-sequence-index><button>A</button><button>B</button><button>C</button></div></div><div><div data-sequence-belt>${[0,1,2].map(i => `<figure data-sequence-panel><div data-transition-media><img alt="Environment ${i}" /></div><figcaption>Canonical occupation ${i}</figcaption></figure>`).join('')}</div></div>`;
  document.body.append(track);
  return track;
};

beforeEach(() => { clock.scroll.mockClear(); clock.timelines.length = 0; });
describe('direct occupational selection ownership', () => {
  it('keeps one inert visual transition when choices change, then releases to scrolling', () => {
    const track = fixture();
    const select = vi.fn();
    const ref = { current: track };
    const { result, unmount } = renderHook(() => useScrollSequence(ref, 3, select, 'career'));
    try {
      act(() => result.current.controller.current.select(2));
      expect(select).toHaveBeenLastCalledWith(2);
      expect(clock.scroll).toHaveBeenLastCalledWith(expect.any(Number), { immediate: true });
      expect(track.querySelectorAll('.vt-selection-overlay')).toHaveLength(1);
      expect(track.querySelector('.vt-selection-overlay').getAttribute('aria-hidden')).toBe('true');
      expect(track.querySelector('.vt-selection-overlay').inert).toBe(true);
      expect(track.querySelector('.vt-selection-overlay [data-transition-media]')).toBeNull();
      expect(track.querySelector('[data-sequence-belt]').style.opacity).toBe('0');
      act(() => result.current.controller.current.select(1));
      expect(clock.timelines[0].kill).toHaveBeenCalled();
      expect(track.querySelectorAll('.vt-selection-overlay')).toHaveLength(1);
      expect(select).toHaveBeenLastCalledWith(1);
      act(() => track.dispatchEvent(new window.WheelEvent('wheel')));
      expect(clock.timelines[1].kill).toHaveBeenCalled();
      expect(track.querySelector('.vt-selection-overlay')).toBeNull();
      expect(track.querySelector('[data-sequence-belt]').style.opacity).toBe('');
    } finally { unmount(); track.remove(); }
  });
  it('removes an unfinished transition on route teardown', () => {
    const track = fixture();
    const select = vi.fn();
    const ref = { current: track };
    const { result, unmount } = renderHook(() => useScrollSequence(ref, 3, select, 'career'));
    act(() => result.current.controller.current.select(2));
    unmount();
    expect(clock.timelines[0].kill).toHaveBeenCalled();
    expect(track.querySelector('.vt-selection-overlay')).toBeNull();
    expect(track.classList.contains('is-scroll-driven')).toBe(false);
    expect(track.querySelector('[data-sequence-belt]').style.transform).toBe('');
    track.remove();
  });
});
