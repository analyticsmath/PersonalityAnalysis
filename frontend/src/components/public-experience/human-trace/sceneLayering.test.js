import { afterEach, describe, expect, it } from 'vitest';
import { filmCSS, filmMarkup } from './filmContent';

afterEach(() => { document.body.replaceChildren(); document.head.querySelectorAll('[data-scene-test]').forEach(el => el.remove()); });
describe('Working-condition scene ownership', () => {
  it('contains every headline within its own ordered photographic plane', () => {
    const style = document.createElement('style');
    style.dataset.sceneTest = '';
    style.textContent = filmCSS;
    document.head.append(style);
    document.body.innerHTML = filmMarkup;
    const scenes = [...document.querySelectorAll('[data-context]')];
    expect(scenes).toHaveLength(3);
    const levels = scenes.map(scene => {
      const computed = window.getComputedStyle(scene);
      expect(computed.isolation).toBe('isolate');
      return Number(computed.zIndex);
    });
    expect(levels[1]).toBeGreaterThan(levels[0]);
    expect(levels[2]).toBeGreaterThan(levels[1]);
  });
});
