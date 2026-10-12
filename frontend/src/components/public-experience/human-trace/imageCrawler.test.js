import { describe, it, expect } from 'vitest';
import { wrapDistance, dampVelocity } from './imageCrawler';
describe('continuous image conveyor', () => {
  it('wraps both directions and large drags onto the identical cycle', () => {
    expect(wrapDistance(1201, 1200)).toBe(1);
    expect(wrapDistance(-1, 1200)).toBe(1199);
    expect(wrapDistance(7200003, 1200)).toBe(3);
    expect(wrapDistance(-7200003, 1200)).toBe(1197);
    expect(wrapDistance(999, 0)).toBe(0);
  });
  it('damps momentum independently of rendering frame rate', () => {
    let fine = 600, coarse = 600;
    for (let i=0;i<120;i++) fine = dampVelocity(fine, 1/120);
    for (let i=0;i<30;i++) coarse = dampVelocity(coarse, 1/30);
    expect(fine).toBeCloseTo(coarse, 8);
    expect(fine).toBeLessThan(5);
    expect(dampVelocity(-600, 1)).toBeCloseTo(-fine, 8);
  });
});
