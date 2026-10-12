import { describe, it, expect, vi, afterEach } from 'vitest';
import { navigateCinematic } from './routeNavigation';

afterEach(() => { delete document.startViewTransition; document.body.replaceChildren(); vi.restoreAllMocks(); vi.useRealTimers(); });
function setup() {
  window.history.replaceState({}, '', '/');
  vi.stubGlobal('matchMedia', vi.fn(() => ({matches:false})));
  document.body.innerHTML = '<a href="/trust" data-transition-media><img alt="Selected environment"></a>';
  const link = document.querySelector('a');
  const go = vi.fn(() => { document.body.innerHTML='<main><div class="vt-cover-media"></div><h1>Nothing useful without trust.</h1></main>'; });
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  return { link, go };
}
describe('Public route navigation', () => {
  it('navigates and focuses the destination without native snapshots', () => {
    const { link, go } = setup(); navigateCinematic(go, '/trust', link);
    expect(go).toHaveBeenCalledWith('/trust');
    expect(document.activeElement).toBe(document.querySelector('h1'));
    expect(window.scrollTo).toHaveBeenCalledWith({top:0,behavior:'instant'});
  });
  it('preserves selected media and applies navigation once', async () => {
    const { link, go } = setup(); vi.useFakeTimers();
    document.startViewTransition = vi.fn(update => {
      expect(link.style.viewTransitionName).toBe('scene-media'); update();
      return {ready:Promise.resolve(),updateCallbackDone:Promise.resolve(),finished:Promise.resolve(),skipTransition:vi.fn()};
    });
    navigateCinematic(go, '/trust', link); await vi.runAllTimersAsync();
    expect(go).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.vt-cover-media').style.viewTransitionName).toBe('scene-media');
  });
  it('recovers when an animation callback does not run', async () => {
    const { link, go } = setup(); vi.useFakeTimers();
    document.startViewTransition = vi.fn(() => ({ready:Promise.resolve(),updateCallbackDone:Promise.resolve(),finished:Promise.resolve(),skipTransition:vi.fn()}));
    navigateCinematic(go, '/trust', link); await vi.advanceTimersByTimeAsync(450);
    expect(go).toHaveBeenCalledWith('/trust');
  });
  it('respects reduced motion', () => {
    const { link, go } = setup(); vi.stubGlobal('matchMedia', vi.fn(() => ({matches:true})));
    document.startViewTransition = vi.fn(); navigateCinematic(go, '/trust', link);
    expect(document.startViewTransition).not.toHaveBeenCalled(); expect(go).toHaveBeenCalledTimes(1);
  });
  it('avoids remounting the same route', () => {
    const { link, go } = setup(); navigateCinematic(go, '/', link); expect(go).not.toHaveBeenCalled();
  });
});
