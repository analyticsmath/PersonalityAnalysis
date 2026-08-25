/**
 * Personality Assessor - Home Scene Renderer
 * High-performance deterministic frame executor.
 * Translates normalized master scroll progress (0 -> 1) into DOM quickSetters
 * and silent VisualActorRegistry.mutateFrame() updates.
 * Zero React rerenders on scroll frames.
 */

import gsap from 'gsap';
import {
  calculateHomeFrame,
  localProgress,
  sceneWeight,
  HOME_RANGES,
  easeInOutCubic,
  easeOutCubic,
  clamp01,
} from '../motion/homeSceneModel';
import { VisualActorRegistry } from '../canvas/VisualActorRegistry';
import { VisualSlotRegistry } from '../canvas/VisualSlotRegistry';

export class HomeSceneRenderer {
  constructor(rootElement) {
    this.root = rootElement;
    this.setters = {};
    this.cachedTargetRect = null;
    this.initSetters();
  }

  initSetters() {
    if (!this.root) return;

    // Cache DOM query targets
    this.dom = {
      heroText: this.root.querySelector('.pa-px-home-hero-text'),
      titleLine1: this.root.querySelector('.pa-px-title-line--1'),
      titleLine2: this.root.querySelector('.pa-px-title-line--2'),
      heroSupport: this.root.querySelector('.pa-px-home-hero-support'),
      heroActions: this.root.querySelector('.pa-px-home-hero-actions'),
      questionContainer: this.root.querySelector('.pa-px-home-question-container'),
      responseContainer: this.root.querySelector('.pa-px-home-response-container'),
      branchingSvg: this.root.querySelector('.pa-px-branching-svg'),
      trajPaths: this.root.querySelectorAll('.pa-px-traj-path'),
      phraseFragments: {
        clarify: this.root.querySelector('.pa-px-fragment-clarify'),
        constraints: this.root.querySelector('.pa-px-fragment-constraints'),
        first: this.root.querySelector('.pa-px-fragment-first'),
        smallest: this.root.querySelector('.pa-px-fragment-smallest'),
        reversible: this.root.querySelector('.pa-px-fragment-reversible'),
        step: this.root.querySelector('.pa-px-fragment-step'),
      },
      readingsField: this.root.querySelector('.pa-px-readings-field'),
      readingNodes: this.root.querySelectorAll('.pa-px-reading-node'),

      workworldLayer: this.root.querySelector('.pa-px-workworld-layer'),
      envPrecision: this.root.querySelector('.pa-px-env--precision'),
      envAutonomy: this.root.querySelector('.pa-px-env--autonomy'),
      envCollaboration: this.root.querySelector('.pa-px-env--collaboration'),
      envPressure: this.root.querySelector('.pa-px-env--pressure'),

      calibrationStage: this.root.querySelector('.pa-px-calibration-stage'),
      calibrationMasses: this.root.querySelectorAll('.pa-px-mass-item'),

      timeStage: this.root.querySelector('.pa-px-time-stage'),
      timeLaterWrapper: this.root.querySelector('.pa-px-time-later-wrapper'),

      provenanceStage: this.root.querySelector('.pa-px-provenance-stage'),
      finaleStage: this.root.querySelector('.pa-px-finale-stage'),
      evidenceTargetSlot: this.root.querySelector('.home-evidence-target'),
    };

    // Precalculate SVG path lengths for clean strokeDashoffset scrubbing
    if (this.dom.trajPaths) {
      this.dom.trajPaths.forEach((path) => {
        if (path && typeof path.getTotalLength === 'function') {
          const len = path.getTotalLength();
          path.style.strokeDasharray = `${len} ${len}`;
          path.style.strokeDashoffset = `${len}`;
        }
      });
    }
  }

  renderFrame(p) {
    if (!this.root || !this.dom) return;

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    const { weights } = calculateHomeFrame(p, { width: vw, height: vh });

    // ── 1. World Entry & 4:5 Plate Transformation (0.00 -> 0.22) ──
    const plateProgress = localProgress(p, 0.04, 0.16);
    const easedPlateProgress = easeInOutCubic(plateProgress);

    // Target 4:5 plate slot geometry
    let targetRect = this.cachedTargetRect;
    if (!targetRect && this.dom.evidenceTargetSlot) {
      const domRect = this.dom.evidenceTargetSlot.getBoundingClientRect();
      if (domRect.width > 0) {
        targetRect = {
          x: domRect.left,
          y: domRect.top,
          width: domRect.width,
          height: domRect.height,
        };
        this.cachedTargetRect = targetRect;
      }
    }

    if (!targetRect) {
      const plateWidth = Math.max(320, Math.min(vw * 0.32, 470));
      const plateHeight = plateWidth * 1.25; // 4:5 aspect ratio
      targetRect = {
        x: vw * 0.08,
        y: vh * 0.22,
        width: plateWidth,
        height: plateHeight,
      };
    }

    // Interpolate primary actor between full screen and 4:5 plate target
    const primaryRect = {
      x: (1 - easedPlateProgress) * 0 + easedPlateProgress * targetRect.x,
      y: (1 - easedPlateProgress) * 0 + easedPlateProgress * targetRect.y,
      width: (1 - easedPlateProgress) * vw + easedPlateProgress * targetRect.width,
      height: (1 - easedPlateProgress) * vh + easedPlateProgress * targetRect.height,
    };

    // Primary actor UV counter-travel overscan
    const primaryUvY = -0.16 * easedPlateProgress;

    // Mutate primary and secondary media actors
    if (p < 0.46) {
      VisualActorRegistry.mutateFrame('home-observation-primary', {
        mode: 'manual',
        rect: primaryRect,
        opacity: p < 0.38 ? 1.0 : (1 - localProgress(p, 0.38, 0.46)),
        uvOffset: { x: 0, y: primaryUvY },
      });
    } else {
      VisualActorRegistry.mutateFrame('home-observation-primary', {
        mode: 'hidden',
        opacity: 0,
      });
    }

    // Secondary support detail plate: enters at 1.2x velocity
    const supportProgress = localProgress(p, 0.05, 0.16);
    const supportX = vw * 1.1 - easeOutCubic(supportProgress) * (vw * 0.65);
    const supportOpacity = sceneWeight(p, 0.05, 0.09, 0.28, 0.38);

    if (supportOpacity > 0.01) {
      VisualActorRegistry.mutateFrame('home-observation-secondary', {
        mode: 'manual',
        rect: {
          x: supportX,
          y: vh * 0.26,
          width: Math.min(vw * 0.24, 340),
          height: Math.min(vw * 0.32, 450),
        },
        opacity: supportOpacity,
        uvOffset: { x: 0.08 * (1 - supportProgress), y: 0 },
      });
    } else {
      VisualActorRegistry.mutateFrame('home-observation-secondary', {
        mode: 'hidden',
        opacity: 0,
      });
    }

    // Hero Text Parallax & exit
    if (this.dom.heroText) {
      const heroOpacity = weights.world;
      this.dom.heroText.style.opacity = heroOpacity;
      this.dom.heroText.style.visibility = heroOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.heroText.style.pointerEvents = heroOpacity > 0.4 ? 'auto' : 'none';

      if (heroOpacity > 0.01) {
        const titleY = -p * 240;
        if (this.dom.titleLine1) this.dom.titleLine1.style.transform = `translate3d(0, ${titleY * 0.8}px, 0)`;
        if (this.dom.titleLine2) this.dom.titleLine2.style.transform = `translate3d(0, ${titleY * 0.95}px, 0)`;
        if (this.dom.heroSupport) this.dom.heroSupport.style.transform = `translate3d(0, ${titleY * 1.1}px, 0)`;
        if (this.dom.heroActions) this.dom.heroActions.style.transform = `translate3d(0, ${titleY * 1.2}px, 0)`;
      }
    }

    // ── 2. Contextual Question (0.06 -> 0.22) ──
    if (this.dom.questionContainer) {
      const qOpacity = weights.observe;
      this.dom.questionContainer.style.opacity = qOpacity;
      this.dom.questionContainer.style.visibility = qOpacity > 0.01 ? 'visible' : 'hidden';

      if (qOpacity > 0.01) {
        const qLocal = localProgress(p, 0.06, 0.14);
        const qY = (1 - easeOutCubic(qLocal)) * 60;
        this.dom.questionContainer.style.transform = `translate3d(0, ${qY}px, 0)`;
      }
    }

    // ── 3. Source Response & Semantic Word Branching (0.15 -> 0.44) ──
    if (this.dom.responseContainer) {
      const respOpacity = Math.max(weights.source, weights.branch * 0.85);
      this.dom.responseContainer.style.opacity = respOpacity;
      this.dom.responseContainer.style.visibility = respOpacity > 0.01 ? 'visible' : 'hidden';

      if (respOpacity > 0.01) {
        const branchProgress = localProgress(p, 0.25, 0.38);
        const bEase = easeInOutCubic(branchProgress);

        const frags = this.dom.phraseFragments;
        if (frags.clarify) frags.clarify.style.transform = `translate3d(${-bEase * vw * 0.15}px, ${-bEase * vh * 0.06}px, 0) scale(${1 + bEase * 0.06})`;
        if (frags.constraints) {
          frags.constraints.style.transform = `translate3d(${bEase * vw * 0.16}px, ${-bEase * vh * 0.12}px, 0)`;
          frags.constraints.style.fontVariationSettings = `'wdth' ${100 - bEase * 28}`;
        }
        if (frags.smallest) {
          frags.smallest.style.transform = `translate3d(${-bEase * vw * 0.09}px, ${bEase * vh * 0.10}px, 0) scale(${1 - bEase * 0.12})`;
          frags.smallest.style.fontVariationSettings = `'wdth' ${100 - bEase * 35}`;
        }
        if (frags.reversible) frags.reversible.style.transform = `translate3d(${bEase * vw * 0.18}px, ${bEase * vh * 0.06}px, 0)`;
        if (frags.step) {
          frags.step.style.transform = `translate3d(0, ${bEase * vh * 0.14}px, 0)`;
          frags.step.style.fontVariationSettings = `'wdth' ${100 - bEase * 10}`;
        }
      }
    }

    // SVG Branching Paths
    if (this.dom.branchingSvg && this.dom.trajPaths) {
      const svgOpacity = weights.branch;
      this.dom.branchingSvg.style.opacity = svgOpacity * 0.6;
      this.dom.branchingSvg.style.visibility = svgOpacity > 0.01 ? 'visible' : 'hidden';

      if (svgOpacity > 0.01) {
        const pathProg = localProgress(p, 0.26, 0.36);
        this.dom.trajPaths.forEach((path) => {
          if (path && typeof path.getTotalLength === 'function') {
            const len = path.getTotalLength();
            path.style.strokeDashoffset = `${len * (1 - easeOutCubic(pathProg))}`;
          }
        });
      }
    }

    // 4 Asymmetric Readings
    if (this.dom.readingsField && this.dom.readingNodes) {
      const readingsOpacity = weights.branch;
      this.dom.readingsField.style.opacity = readingsOpacity;
      this.dom.readingsField.style.visibility = readingsOpacity > 0.01 ? 'visible' : 'hidden';

      if (readingsOpacity > 0.01) {
        this.dom.readingNodes.forEach((node, idx) => {
          const nodeProg = localProgress(p, 0.28 + idx * 0.02, 0.36 + idx * 0.02);
          const nodeY = (1 - easeOutCubic(nodeProg)) * 40;
          node.style.transform = `translate3d(0, ${nodeY}px, 0) scale(${0.9 + easeOutCubic(nodeProg) * 0.1})`;
        });
      }
    }

    // ── 4. Workworld 4-Environment Centerpiece Stage (0.37 -> 0.76) ──
    const wwWeights = weights.workworld;
    const workworldVisible = (
      wwWeights.precision > 0.01 ||
      wwWeights.autonomy > 0.01 ||
      wwWeights.collaboration > 0.01 ||
      wwWeights.pressure > 0.01
    );

    if (this.dom.workworldLayer) {
      this.dom.workworldLayer.style.visibility = workworldVisible ? 'visible' : 'hidden';
    }

    // Environment 1: Precision (0.38 -> 0.57)
    if (this.dom.envPrecision) {
      this.dom.envPrecision.style.opacity = wwWeights.precision;
      this.dom.envPrecision.style.visibility = wwWeights.precision > 0.01 ? 'visible' : 'hidden';
      if (wwWeights.precision > 0.01) {
        const precExit = localProgress(p, 0.49, 0.57);
        const precX = -easeInOutCubic(precExit) * (vw * 0.35);
        this.dom.envPrecision.style.transform = `translate3d(${precX}px, 0, 0)`;

        VisualActorRegistry.mutateFrame('home-workworld-precision', {
          mode: 'manual',
          rect: {
            x: precX,
            y: 0,
            width: vw * (1 - precExit * 0.2),
            height: vh,
          },
          opacity: wwWeights.precision,
          uvOffset: { x: 0, y: -0.12 * localProgress(p, 0.38, 0.57) },
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-precision', { mode: 'hidden', opacity: 0 });
      }
    }

    // Environment 2: Autonomy (0.48 -> 0.66)
    if (this.dom.envAutonomy) {
      this.dom.envAutonomy.style.opacity = wwWeights.autonomy;
      this.dom.envAutonomy.style.visibility = wwWeights.autonomy > 0.01 ? 'visible' : 'hidden';
      if (wwWeights.autonomy > 0.01) {
        const autoEntry = localProgress(p, 0.48, 0.54);
        const autoExit = localProgress(p, 0.59, 0.66);
        const autoX = (1 - easeOutCubic(autoEntry)) * (vw * 0.6) + easeInOutCubic(autoExit) * (vw * 0.3);
        this.dom.envAutonomy.style.transform = `translate3d(${autoX}px, 0, 0)`;

        VisualActorRegistry.mutateFrame('home-workworld-autonomy', {
          mode: 'manual',
          rect: {
            x: autoX,
            y: 0,
            width: vw * 0.85,
            height: vh,
          },
          opacity: wwWeights.autonomy,
          uvOffset: { x: 0, y: 0.15 * localProgress(p, 0.48, 0.66) },
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-autonomy', { mode: 'hidden', opacity: 0 });
      }
    }

    // Environment 3: Collaboration (0.58 -> 0.74)
    if (this.dom.envCollaboration) {
      this.dom.envCollaboration.style.opacity = wwWeights.collaboration;
      this.dom.envCollaboration.style.visibility = wwWeights.collaboration > 0.01 ? 'visible' : 'hidden';
      if (wwWeights.collaboration > 0.01) {
        const collabEntry = localProgress(p, 0.58, 0.64);
        const collabExit = localProgress(p, 0.68, 0.74);
        const collabX = -(1 - easeOutCubic(collabEntry)) * (vw * 0.5) - easeInOutCubic(collabExit) * (vw * 0.25);
        this.dom.envCollaboration.style.transform = `translate3d(${collabX}px, 0, 0)`;

        VisualActorRegistry.mutateFrame('home-workworld-collaboration', {
          mode: 'manual',
          rect: {
            x: collabX,
            y: 0,
            width: vw * 0.9,
            height: vh,
          },
          opacity: wwWeights.collaboration,
          uvOffset: { x: 0.12 * localProgress(p, 0.58, 0.74), y: 0 },
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-collaboration', { mode: 'hidden', opacity: 0 });
      }
    }

    // Environment 4: Operational Pressure (0.66 -> 0.78)
    if (this.dom.envPressure) {
      this.dom.envPressure.style.opacity = wwWeights.pressure;
      this.dom.envPressure.style.visibility = wwWeights.pressure > 0.01 ? 'visible' : 'hidden';
      if (wwWeights.pressure > 0.01) {
        const pressProg = localProgress(p, 0.66, 0.74);
        const pressScale = 1.12 - easeOutCubic(pressProg) * 0.12;
        this.dom.envPressure.style.transform = `scale(${pressScale})`;

        VisualActorRegistry.mutateFrame('home-workworld-pressure', {
          mode: 'manual',
          rect: {
            x: 0,
            y: 0,
            width: vw,
            height: vh,
          },
          scale: pressScale,
          opacity: wwWeights.pressure,
          velocityDeform: 0.008 * (1 - pressProg),
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-pressure', { mode: 'hidden', opacity: 0 });
      }
    }

    // ── 5. Calibration Spatial Mass Field (0.68 -> 0.84) ──
    if (this.dom.calibrationStage) {
      const calOpacity = weights.calibration;
      this.dom.calibrationStage.style.opacity = calOpacity;
      this.dom.calibrationStage.style.visibility = calOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.calibrationStage.style.pointerEvents = calOpacity > 0.4 ? 'auto' : 'none';

      if (calOpacity > 0.01 && this.dom.calibrationMasses) {
        const calProg = localProgress(p, 0.69, 0.77);
        this.dom.calibrationMasses.forEach((mass, idx) => {
          const depthSpeed = 1 + (idx % 3) * 0.3;
          const massY = (1 - easeOutCubic(calProg)) * (50 * depthSpeed);
          mass.style.transform = `translate3d(0, ${massY}px, 0)`;
        });
      }
    }

    // ── 6. Time Exposure Temporal Double Exposure (0.76 -> 0.90) ──
    if (this.dom.timeStage) {
      const timeOpacity = weights.time;
      this.dom.timeStage.style.opacity = timeOpacity;
      this.dom.timeStage.style.visibility = timeOpacity > 0.01 ? 'visible' : 'hidden';

      if (timeOpacity > 0.01 && this.dom.timeLaterWrapper) {
        const timeProg = localProgress(p, 0.78, 0.86);
        const clipPercent = 100 - easeInOutCubic(timeProg) * 65;
        this.dom.timeLaterWrapper.style.clipPath = `polygon(${clipPercent}% 0, 100% 0, 100% 100%, ${Math.max(0, clipPercent - 8)}% 100%)`;
      }
    }

    // ── 7. Provenance Inspection Stage (0.83 -> 0.965) ──
    if (this.dom.provenanceStage) {
      const provOpacity = weights.provenance;
      this.dom.provenanceStage.style.opacity = provOpacity;
      this.dom.provenanceStage.style.visibility = provOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.provenanceStage.style.pointerEvents = provOpacity > 0.4 ? 'auto' : 'none';
    }

    // ── 8. Finale Journey Synthesis (0.91 -> 1.00) ──
    if (this.dom.finaleStage) {
      const finOpacity = weights.finale;
      this.dom.finaleStage.style.opacity = finOpacity;
      this.dom.finaleStage.style.visibility = finOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.finaleStage.style.pointerEvents = finOpacity > 0.4 ? 'auto' : 'none';

      if (finOpacity > 0.01) {
        const finProg = localProgress(p, 0.92, 0.98);
        const finScale = 0.94 + easeOutCubic(finProg) * 0.06;
        this.dom.finaleStage.style.transform = `scale(${finScale})`;
      }
    }
  }
}

export default HomeSceneRenderer;
