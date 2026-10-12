import { describe, it, expect, vi, afterEach } from 'vitest';
import { navigateCinematic } from './routeNavigation';

afterEach(() => { delete document.startViewTransition; delete document.documentElement.dataset.cinematicTransition; document.body.replaceChildren(); vi.restoreAllMocks(); vi.useRealTimers(); });
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
  it('lets the latest click supersede an older pending snapshot callback', async () => {
    const {link,go}=setup(); vi.useFakeTimers();
    const callbacks=[];
    document.startViewTransition=vi.fn(update=>{callbacks.push(update);return {ready:Promise.resolve(),updateCallbackDone:new Promise(()=>{}),finished:new Promise(()=>{}),skipTransition:vi.fn()};});
    navigateCinematic(go,'/trust',link);
    navigateCinematic(go,'/progress',link);
    await callbacks[0](); await callbacks[1](); await vi.advanceTimersByTimeAsync(500);
    expect(go).toHaveBeenCalledTimes(1); expect(go).toHaveBeenCalledWith('/progress');
  });
  it('uses the visible photograph when a text link is below the cover', () => {
    const {go}=setup(); vi.useFakeTimers();
    document.body.innerHTML='<div class="vt-cover-media"></div><a href="/trust">Trust</a><figure data-transition-media><img alt="Visible chapter"/></figure>';
    const cover=document.querySelector('.vt-cover-media'), photo=document.querySelector('figure'), link=document.querySelector('a');
    cover.getBoundingClientRect=()=>({left:0,right:600,top:-1000,bottom:-500});
    photo.getBoundingClientRect=()=>({left:0,right:600,top:100,bottom:500});
    document.startViewTransition=vi.fn(()=>({ready:Promise.resolve(),updateCallbackDone:new Promise(()=>{}),finished:new Promise(()=>{}),skipTransition:vi.fn()}));
    navigateCinematic(go,'/trust',link);
    expect(photo.style.viewTransitionName).toBe('scene-media'); expect(cover.style.viewTransitionName).toBe('none');
  });

});
