import { describe, it, expect, beforeEach } from 'vitest';
import { scrollState, registerActor, getActor, removeActor, updateScrollState, registerSceneProgress } from './components/public-experience/motion/scrollState';

describe('Personality Assessor Temporal Choreography & Timing Engine', () => {
  beforeEach(() => {
    scrollState.scroll = 0;
    scrollState.velocity = 0;
    scrollState.direction = 1;
    scrollState.progress = 0;
    scrollState.activeScenes = {};
    scrollState.actors = {};
  });

  describe('1. Normalized Timing Phases & Progress Bounds', () => {
    const getPhaseForProgress = (p) => {
      if (p <= 0.10) return 'REST';
      if (p <= 0.25) return 'ANTICIPATE';
      if (p <= 0.65) return 'TRANSFORM';
      if (p <= 0.82) return 'TRANSFER';
      if (p <= 0.92) return 'SETTLE';
      return 'HANDOFF';
    };

    it('maps 0.00 to REST phase', () => {
      expect(getPhaseForProgress(0.00)).toBe('REST');
      expect(getPhaseForProgress(0.08)).toBe('REST');
    });

    it('maps 0.15 to ANTICIPATE phase', () => {
      expect(getPhaseForProgress(0.15)).toBe('ANTICIPATE');
      expect(getPhaseForProgress(0.24)).toBe('ANTICIPATE');
    });

    it('maps 0.50 to TRANSFORM / CLIMAX phase', () => {
      expect(getPhaseForProgress(0.35)).toBe('TRANSFORM');
      expect(getPhaseForProgress(0.50)).toBe('TRANSFORM');
      expect(getPhaseForProgress(0.60)).toBe('TRANSFORM');
    });

    it('maps 0.75 to TRANSFER OWNERSHIP phase', () => {
      expect(getPhaseForProgress(0.70)).toBe('TRANSFER');
      expect(getPhaseForProgress(0.80)).toBe('TRANSFER');
    });

    it('maps 0.88 to SETTLE phase', () => {
      expect(getPhaseForProgress(0.88)).toBe('SETTLE');
    });

    it('maps 0.96 to HANDOFF / RESIDUE phase', () => {
      expect(getPhaseForProgress(0.96)).toBe('HANDOFF');
      expect(getPhaseForProgress(1.00)).toBe('HANDOFF');
    });
  });

  describe('2. Workworld Multi-Plane Active Window Mapping', () => {
    const getActiveEnvironments = (progress) => {
      // 4 environments across progress [0.00, 1.00]
      const total = 4;
      const index = Math.min(Math.floor(progress * total), total - 1);
      const nextIndex = Math.min(index + 1, total - 1);
      const isOverlapping = progress > 0.08 && progress < 0.95;
      return {
        dominant: index,
        incoming: nextIndex,
        isOverlapping,
      };
    };

    it('returns Env 0 as dominant at start with anticipated Env 1', () => {
      const state = getActiveEnvironments(0.12);
      expect(state.dominant).toBe(0);
      expect(state.incoming).toBe(1);
      expect(state.isOverlapping).toBe(true);
    });

    it('transitions smoothly across middle and final stages', () => {
      const mid = getActiveEnvironments(0.55);
      expect(mid.dominant).toBe(2);
      expect(mid.incoming).toBe(3);

      const end = getActiveEnvironments(0.98);
      expect(end.dominant).toBe(3);
    });
  });

  describe('3. DotLottie Guarded Frame Scrub Controller', () => {
    const computeLottieFrame = (progress, totalFrames = 120) => {
      const p = Math.max(0, Math.min(1, progress));
      return Math.min(Math.floor(p * (totalFrames - 1)), totalFrames - 1);
    };

    it('maps progress 0.00 to frame 0 and progress 1.00 to frame 119', () => {
      expect(computeLottieFrame(0.00)).toBe(0);
      expect(computeLottieFrame(0.50)).toBe(59);
      expect(computeLottieFrame(1.00)).toBe(119);
    });

    it('clamps negative or overshoot progress safely', () => {
      expect(computeLottieFrame(-0.5)).toBe(0);
      expect(computeLottieFrame(1.5)).toBe(119);
    });
  });

  describe('4. Persistent Route Transition Actor Registry', () => {
    it('registers, retrieves, and cleans up actors across route boundaries', () => {
      const mockElement = { getBoundingClientRect: () => ({ top: 100, left: 50, width: 400, height: 300 }) };
      registerActor('workworld-active-media', {
        element: mockElement,
        assetKey: 'workworldPrecision',
      });

      const actor = getActor('workworld-active-media');
      expect(actor).toBeTruthy();
      expect(actor.assetKey).toBe('workworldPrecision');

      removeActor('workworld-active-media');
      expect(getActor('workworld-active-media')).toBeNull();
    });
  });

  describe('5. Calibration Proportional Mass Scaling Ratios', () => {
    const scales = {
      riasec: 1.00,
      skills: 1.00,
      values: 0.84,
      personality: 0.68,
      education: 0.52,
      goals: 0.38,
    };

    it('preserves calibrated visual hierarchy ratios', () => {
      expect(scales.riasec).toBe(1.00);
      expect(scales.values).toBe(0.84);
      expect(scales.personality).toBe(0.68);
      expect(scales.education).toBe(0.52);
      expect(scales.goals).toBe(0.38);
      expect(scales.goals).toBeLessThan(scales.education);
      expect(scales.education).toBeLessThan(scales.personality);
      expect(scales.personality).toBeLessThan(scales.values);
      expect(scales.values).toBeLessThan(scales.riasec);
    });
  });

  describe('6. High-Frequency Scroll State Store', () => {
    it('updates scroll, velocity, direction, progress and registers scenes', () => {
      updateScrollState(1200, 1.45, 1, 0.35);
      expect(scrollState.scroll).toBe(1200);
      expect(scrollState.velocity).toBe(1.45);
      expect(scrollState.progress).toBe(0.35);
      expect(scrollState.settled).toBe(false);

      registerSceneProgress('home-world-entry', 0.85, true);
      expect(scrollState.activeScenes['home-world-entry'].progress).toBe(0.85);
      expect(scrollState.activeScenes['home-world-entry'].isPinned).toBe(true);
    });
  });
});
