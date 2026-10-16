import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clamp = (value) => Math.max(0, Math.min(1, value));
const smooth = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const range = (value, start, end) => smooth((value - start) / Math.max(0.0001, end - start));
const mix = (a, b, value) => a + (b - a) * clamp(value);

const STATES = [
  ['capture', 0],
  ['isolate', 0.22],
  ['branch', 0.45],
  ['weight', 0.69],
  ['recompose', 0.91],
];

function nearestState(progress) {
  let winner = STATES[0];
  STATES.forEach((state) => {
    if (Math.abs(progress - state[1]) < Math.abs(progress - winner[1])) winner = state;
  });
  return winner[0];
}

function clear(element, properties) {
  if (!element) return;
  properties.forEach((property) => element.style.removeProperty(property));
}

export function mountHowTraceDirector(root = document) {
  const route = root.querySelector?.('.vt-route--how');
  const sequence = route?.querySelector('.vt-how-sequence');
  const stage = route?.querySelector('[data-how-stage]');
  const source = stage?.querySelector('.vt-how-source-card');
  const contextImage = stage?.querySelector('.vt-how-context img');
  const clauses = stage?.querySelector('.vt-how-clause-stage');
  const branch = stage?.querySelector('.vt-how-branch-stage');
  const weight = stage?.querySelector('.vt-how-weight-stage');
  const weightBars = [...(weight?.querySelectorAll('i') || [])];
  const record = stage?.querySelector('.vt-how-record-stage');

  if (!sequence || !stage || !source || !clauses || !branch || !weight || !record) return () => {};

  const mm = gsap.matchMedia();
  mm.add('(min-width:901px) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
    stage.dataset.howDirected = 'true';

    const render = (value) => {
      const p = clamp(value);
      stage.dataset.howState = nearestState(p);
      stage.style.setProperty('--how-progress', String(p));

      const isolate = range(p, 0.08, 0.28);
      const branchMove = range(p, 0.28, 0.49);
      const weightMove = range(p, 0.49, 0.72);
      const resolve = range(p, 0.72, 0.96);

      const sourceX = mix(0, -6.5, branchMove) + mix(0, -3.5, weightMove);
      const sourceY = mix(0, -32, isolate) + mix(0, -4, branchMove);
      const sourceScale = mix(1, 0.78, isolate) * mix(1, 0.84, branchMove) * mix(1, 0.86, weightMove);
      const sourceOpacity = mix(1, 0.68, isolate) * mix(1, 0.56, branchMove) * mix(1, 0.7, weightMove) * mix(1, 0.32, resolve);
      source.style.transform = `translate3d(${sourceX}vw, ${sourceY}vh, 0) scale(${sourceScale})`;
      source.style.opacity = String(sourceOpacity);

      if (contextImage) {
        const camera = range(p, 0, 0.72);
        const pullback = range(p, 0.72, 1);
        contextImage.style.transform = `translate3d(${mix(0, -3.5, camera)}%, ${mix(0, -2, camera)}%, 0) scale(${mix(1.05, 1.14, camera) * mix(1, 0.95, pullback)})`;
        contextImage.style.filter = `saturate(${mix(1, 0.68, camera)}) contrast(${mix(1, 1.08, camera)})`;
      }

      const clauseIn = range(p, 0.12, 0.25);
      const clauseOut = range(p, 0.31, 0.43);
      const clauseOpacity = clauseIn * (1 - clauseOut);
      clauses.style.opacity = String(clauseOpacity);
      clauses.style.transform = `translate3d(${mix(5, 0, clauseIn)}vw, ${mix(5, 0, clauseIn) - mix(0, 3, clauseOut)}vh, 0) scale(${mix(0.94, 1, clauseIn)})`;
      clauses.style.visibility = clauseOpacity > 0.01 ? 'visible' : 'hidden';

      const branchIn = range(p, 0.32, 0.46);
      const branchOut = range(p, 0.54, 0.64);
      const branchOpacity = branchIn * (1 - branchOut);
      branch.style.opacity = String(branchOpacity);
      branch.style.transform = `translate3d(${mix(4, 0, branchIn) - mix(0, 4, branchOut)}vw, 0, 0) scale(${mix(0.87, 1, branchIn)})`;
      branch.style.visibility = branchOpacity > 0.01 ? 'visible' : 'hidden';

      const weightIn = range(p, 0.54, 0.69);
      const weightOut = range(p, 0.75, 0.84);
      const weightOpacity = weightIn * (1 - weightOut);
      weight.style.opacity = String(weightOpacity);
      weight.style.transform = `translate3d(0, ${mix(7, 0, weightIn) - mix(0, 3, weightOut)}vh, 0)`;
      weight.style.visibility = weightOpacity > 0.01 ? 'visible' : 'hidden';
      weightBars.forEach((bar, index) => {
        const reveal = range(weightIn, index * 0.055, 0.56 + index * 0.055);
        bar.style.transform = `scaleY(${mix(0.08, 1, reveal)})`;
        bar.style.transformOrigin = 'bottom';
      });

      const recordIn = range(p, 0.76, 0.91);
      record.style.opacity = String(recordIn);
      record.style.visibility = recordIn > 0.01 ? 'visible' : 'hidden';
      record.style.transform = `translate3d(${mix(6, 0, recordIn)}vw, ${mix(9, 0, recordIn)}vh, 0) scale(${mix(0.92, 1, recordIn)})`;
    };

    render(0);
    const trigger = ScrollTrigger.create({
      trigger: sequence,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.22,
      fastScrollEnd: 1800,
      invalidateOnRefresh: true,
      onUpdate: (self) => render(self.progress),
      onRefresh: (self) => render(self.progress),
    });

    return () => {
      trigger.kill();
      delete stage.dataset.howDirected;
      stage.style.removeProperty('--how-progress');
      clear(source, ['transform', 'opacity']);
      clear(contextImage, ['transform', 'filter']);
      [clauses, branch, weight, record].forEach((actor) => clear(actor, ['opacity', 'transform', 'visibility']));
      weightBars.forEach((bar) => clear(bar, ['transform', 'transform-origin']));
    };
  });

  return () => mm.revert();
}

export default mountHowTraceDirector;
