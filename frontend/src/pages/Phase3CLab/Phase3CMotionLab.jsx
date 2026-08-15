import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ContextScene, WorldMedia } from './Phase3CStaticFixtures';
import {
  careerRows,
  contextLabels,
  nextWorldIndex,
  stableWorldLabelFor,
  WORK_WORLD_STABLE_LABELS,
  WORK_WORLD_TIMELINE_LABELS,
  workWorlds,
} from './labData';

if (typeof window === 'undefined' || typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export const getWorkWorldControlTarget = (index) => stableWorldLabelFor(index);

function getTimelineLabelAtTime(timeline, labels) {
  const currentTime = timeline.time();
  return labels.reduce((current, label) => (timeline.labels[label] <= currentTime ? label : current), labels[0]);
}

function getStableWorldIndexAtTime(timeline) {
  const currentTime = timeline.time();
  return WORK_WORLD_STABLE_LABELS.reduce(
    (currentIndex, label, index) => (timeline.labels[label] <= currentTime ? index : currentIndex),
    0
  );
}

function useLabScrollEngine(requestedEngine, reducedMotion, onVelocity) {
  const [effectiveEngine, setEffectiveEngine] = useState('native');

  useLayoutEffect(() => {
    const finePointer = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: fine)').matches;
    const engine = reducedMotion || !finePointer ? 'native' : requestedEngine;
    setEffectiveEngine(engine);
    if (engine === 'native') return undefined;

    if (engine === 'ScrollSmoother') {
      const wrapper = document.getElementById('phase3c-smooth-wrapper');
      const content = document.getElementById('phase3c-smooth-content');
      if (!wrapper || !content) {
        setEffectiveEngine('native');
        return undefined;
      }
      let smoother;
      try {
        smoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 0.55,
          smoothTouch: 0,
          effects: false,
        });
      } catch {
        setEffectiveEngine('native');
      }
      return () => smoother?.kill();
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      prevent: (node) => Boolean(node.closest('[data-lenis-prevent]')),
    });
    const onScroll = (event) => {
      ScrollTrigger.update();
      onVelocity(Number(event.velocity || 0));
    };
    const tick = (time) => lenis.raf(time * 1000);
    const onAnchor = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      const target = anchor && document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -16 });
    };

    lenis.on('scroll', onScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('click', onAnchor);
    return () => {
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(tick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
    };
  }, [onVelocity, reducedMotion, requestedEngine]);

  return effectiveEngine;
}

function useMobileDirectMotion() {
  const query = '(max-width: 767px), (pointer: coarse)';
  const [direct, setDirect] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const mediaQuery = window.matchMedia(query);
    const update = () => setDirect(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);
  return direct;
}

function MotionDebugReadout({ engine, velocity, activeSceneLabel, reducedMotion }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    let animationFrame = 0;
    const update = () => {
      setScrollPosition(Math.round(window.scrollY || document.documentElement.scrollTop || 0));
      animationFrame = 0;
    };
    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);
  return (
    <output className="phase3c-motion-debug" aria-live="polite">
      <span>engine <strong>{engine}</strong></span>
      <span>y <strong>{scrollPosition}</strong></span>
      <span>velocity <strong>{velocity.toFixed(2)}</strong></span>
      <span>scene <strong>{activeSceneLabel}</strong></span>
      <span>reduced <strong>{reducedMotion ? 'on' : 'off'}</strong></span>
    </output>
  );
}

function MotionWorlds({ reducedMotion, onSceneChange }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeWorld = workWorlds[activeIndex];

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return undefined;

    const context = gsap.context(() => {
      const focus = stage.querySelector('.phase3c-motion-worlds__focus');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=5600',
          pin: stage,
          pinSpacing: true,
          scrub: 0.72,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timelineRef.current = timeline;

      timeline.addLabel('W0-build').to({}, { duration: 1 });
      for (let index = 1; index < workWorlds.length; index += 1) {
        const transitionLabel = WORK_WORLD_TIMELINE_LABELS[(index * 2) - 1];
        const stableLabel = WORK_WORLD_STABLE_LABELS[index];
        timeline
          .addLabel(transitionLabel)
          .to(focus, { xPercent: index % 2 ? -1.2 : 1.2, scale: 0.985, duration: 0.85, ease: 'none' })
          .addLabel(stableLabel)
          .to(focus, { xPercent: 0, scale: 1, duration: 1, ease: 'none' });
      }
      timeline.addLabel('W11-release').to({}, { duration: 0.5 });
      timeline.eventCallback('onUpdate', () => {
        const label = getTimelineLabelAtTime(timeline, WORK_WORLD_TIMELINE_LABELS);
        onSceneChange(label);
        const nextIndex = getStableWorldIndexAtTime(timeline);
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      });
      ScrollTrigger.refresh();
    }, root);

    return () => {
      timelineRef.current = null;
      context.revert();
    };
  }, [onSceneChange, reducedMotion]);

  const goToWorld = (index) => {
    const label = getWorkWorldControlTarget(index);
    const timeline = timelineRef.current;
    const destination = timeline?.scrollTrigger?.labelToScroll(label);
    if (Number.isFinite(destination)) {
      window.scrollTo({ top: destination, behavior: 'smooth' });
    }
    setActiveIndex(index);
    onSceneChange(label);
  };

  return (
    <section className="phase3c-motion-worlds" ref={rootRef} aria-labelledby="phase3c-motion-worlds-title" data-motion-mode={reducedMotion ? 'direct' : 'pinned'}>
      <div className="phase3c-motion-worlds__stage" ref={stageRef}>
        <div className="phase3c-motion-worlds__heading"><p>Motion spike 01</p><h3 id="phase3c-motion-worlds-title">Work Worlds timeline</h3></div>
        <div className="phase3c-motion-worlds__focus">
          <WorldMedia world={activeWorld} />
          <div>
            <p>Semantic dwell state</p>
            <h4>{activeWorld.name}</h4>
            <p>{activeWorld.copy}</p>
            <div className="phase3c-world-controls">
              <button type="button" onClick={() => goToWorld(nextWorldIndex(activeIndex, -1))}>Previous</button>
              <span data-testid="phase3c-work-world-label">{getWorkWorldControlTarget(activeIndex)}</span>
              <button type="button" onClick={() => goToWorld(nextWorldIndex(activeIndex, 1))}>Next</button>
            </div>
          </div>
        </div>
        {reducedMotion ? <p className="phase3c-reduced-note">Reduced motion uses direct controls in normal document flow; no pinned whitespace is created.</p> : null}
      </div>
    </section>
  );
}

function MotionContextTheatre({ reducedMotion, onSceneChange }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const [state, setState] = useState('C0');
  const [selectedResponse, setSelectedResponse] = useState('');

  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return undefined;
    const context = gsap.context(() => {
      const artifact = stage.querySelector('.phase3c-context-artifact');
      const question = stage.querySelector('.phase3c-context-question');
      const signal = stage.querySelector('.phase3c-context-signal');
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top top', end: '+=4400', pin: stage, pinSpacing: true, scrub: 0.65, anticipatePin: 1 },
      });
      contextLabels.forEach((label, index) => {
        timeline.addLabel(label);
        if (index > 0) timeline.to(artifact, { scale: 1 - (index * 0.018), xPercent: index * -1.5, duration: 0.45, ease: 'none' });
        if (label === 'C3') timeline.to(question, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'none' }, '<');
        if (label === 'C6') timeline.to(signal, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'none' }, '<');
        timeline.to({}, { duration: 0.65 });
      });
      timeline.eventCallback('onUpdate', () => {
        const label = getTimelineLabelAtTime(timeline, contextLabels);
        setState((current) => (current === label ? current : label));
        onSceneChange(label);
      });
      ScrollTrigger.refresh();
    }, root);
    return () => context.revert();
  }, [onSceneChange, reducedMotion]);

  const selectResponse = (response) => {
    setSelectedResponse(response);
    setState('C5');
    onSceneChange('C5');
  };
  return (
    <section className="phase3c-motion-context" ref={rootRef} aria-labelledby="phase3c-motion-context-title" data-motion-mode={reducedMotion ? 'direct' : 'pinned'}>
      <div className="phase3c-motion-context__stage" ref={stageRef}>
        <div className="phase3c-motion-worlds__heading"><p>Motion spike 02</p><h3 id="phase3c-motion-context-title">Context Theatre</h3></div>
        <ContextScene state={state} onStateChange={setState} selectedResponse={selectedResponse} onSelectResponse={selectResponse} />
        {reducedMotion ? <p className="phase3c-reduced-note">Reduced motion keeps the persistent scene and direct focusable chapters without a pin.</p> : null}
      </div>
    </section>
  );
}

function CareerMotionSpike() {
  const [selected, setSelected] = useState(careerRows[0]);
  const detailRef = useRef(null);
  useEffect(() => {
    detailRef.current?.focus();
  }, [selected]);
  return (
    <section className="phase3c-career-motion" aria-labelledby="phase3c-career-motion-title">
      <div className="phase3c-motion-worlds__heading"><p>Motion spike 03</p><h3 id="phase3c-career-motion-title">Career master-detail</h3></div>
      <div className="phase3c-career-motion__layout">
        <div className="phase3c-career-motion__list" aria-label="Career list">
          {careerRows.map((career) => (
            <motion.button
              type="button"
              layout
              key={career[0]}
              className={selected[0] === career[0] ? 'is-selected' : ''}
              onClick={() => setSelected(career)}
              aria-pressed={selected[0] === career[0]}
            >
              <span>{career[0]}</span><strong>{career[1]}%</strong>
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            className="phase3c-career-motion__detail"
            key={selected[0]}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24 }}
            tabIndex="-1"
            ref={detailRef}
          >
            <motion.img layoutId="phase3c-career-media" src={selected[2]} alt="" />
            <p>Illustrative career relationship</p>
            <h4>{selected[0]}</h4>
            <strong>{selected[1]}%</strong>
            <p>Focused detail state retains keyboard focus while the selection remains interruptible.</p>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function Phase3CTransitionSpecimen() {
  useLayoutEffect(() => {
    document.title = 'Phase 3C Route Handoff Lab | Personality Assessor';
    const existing = document.head.querySelector('meta[name="robots"]');
    const robots = existing || document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex,nofollow';
    if (!existing) document.head.append(robots);
  }, []);
  return (
    <main className="phase3c-transition-page">
      <Link to="/__phase3c-lab" viewTransition className="phase3c-text-action">Return to lab</Link>
      <section>
        <img src={careerRows[0][2]} alt="" style={{ viewTransitionName: 'phase3c-route-media' }} />
        <div><p>View Transition spike</p><h1 style={{ viewTransitionName: 'phase3c-route-title' }}>Systems Architect</h1><p>This route remains usable when the browser does not support View Transition.</p></div>
      </section>
    </main>
  );
}

export default function Phase3CMotionLab({ reducedMotionOverride }) {
  const motionPreference = useReducedMotion();
  const mobileDirectMotion = useMobileDirectMotion();
  const reducedMotion = reducedMotionOverride ?? (motionPreference || mobileDirectMotion);
  const [requestedEngine, setRequestedEngine] = useState('native');
  const [velocity, setVelocity] = useState(0);
  const [activeSceneLabel, setActiveSceneLabel] = useState('W0-build');
  const onVelocity = useCallback((nextVelocity) => setVelocity(nextVelocity), []);
  const effectiveEngine = useLabScrollEngine(requestedEngine, reducedMotion, onVelocity);

  return (
    <section className="phase3c-motion-lab" id="motion" aria-labelledby="phase3c-motion-title">
      <div className="phase3c-section__heading phase3c-section__heading--dark">
        <p className="phase3c-section__index">08</p>
        <div><h2 id="phase3c-motion-title">Motion lab</h2><p>Static geometry first; motion only explains continuity between states.</p></div>
      </div>
      <div className="phase3c-motion-toolbar">
        <span>Scroll engine</span>
        <div role="group" aria-label="Scroll engine selector">
          {['native', 'ScrollSmoother', 'lenis'].map((engine) => (
            <button type="button" key={engine} aria-pressed={requestedEngine === engine} onClick={() => setRequestedEngine(engine)}>{engine}</button>
          ))}
        </div>
        <Link to="/__phase3c-lab/transition" viewTransition className="phase3c-text-action">Route handoff specimen</Link>
      </div>
      <MotionDebugReadout engine={effectiveEngine} velocity={velocity} activeSceneLabel={activeSceneLabel} reducedMotion={reducedMotion} />
      <MotionWorlds reducedMotion={reducedMotion} onSceneChange={setActiveSceneLabel} />
      <MotionContextTheatre reducedMotion={reducedMotion} onSceneChange={setActiveSceneLabel} />
      <CareerMotionSpike />
      <div className="phase3c-nested-scroll-sample" data-lenis-prevent tabIndex="0" aria-label="Nested scroll sample">
        <p>Nested scroll sample — Lenis prevent region</p>
        <p>Its native scroll container remains direct when the Lenis spike is selected.</p>
        <p>Deliberately compact: it validates a nested surface without creating a second scroll narrative.</p>
      </div>
    </section>
  );
}
