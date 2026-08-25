/**
 * Personality Assessor - Home Scene Renderer
 * High-performance deterministic frame executor for DOM-First Cinematic Baseline.
 * Translates normalized master scroll progress (0 -> 1) into direct DOM style transforms,
 * inner-image counter-parallax, and silent VisualActorRegistry.mutateFrame() GPU mirrors.
 * Zero React rerenders on scroll frames.
 */

import {
  calculateHomeFrame,
  localProgress,
  clamp01,
  easeInOutCubic,
  easeOutCubic,
} from '../motion/homeSceneModel';
import { VisualActorRegistry } from '../canvas/VisualActorRegistry';

export class HomeSceneRenderer {
  constructor(rootElement) {
    this.root = rootElement;
    this.cachedTargetRect = null;
    this.initDOM();
  }

  initDOM() {
    if (!this.root) return;

    // Query & cache all critical DOM actors
    this.dom = {
      // S0 & S1: Primary World Entry & Support DOM Actors
      primaryActor: this.root.querySelector('.pa-px-home-primary-actor'),
      primaryCrop: this.root.querySelector('.pa-px-home-primary-actor .visual-actor__crop'),
      primaryInner: this.root.querySelector('.pa-px-home-primary-actor .visual-actor__inner-image'),
      supportActor: this.root.querySelector('.pa-px-home-support-actor'),
      supportInner: this.root.querySelector('.pa-px-home-support-actor .visual-actor__inner-image'),
      evidenceTargetSlot: this.root.querySelector('.home-evidence-target'),

      // Typography & Trajectory Actors
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

      // Workworld 4-Environment Stage
      workworldLayer: this.root.querySelector('.pa-px-workworld-layer'),
      envPrecision: this.root.querySelector('.pa-px-env--precision'),
      envAutonomy: this.root.querySelector('.pa-px-env--autonomy'),
      envCollaboration: this.root.querySelector('.pa-px-env--collaboration'),
      envPressure: this.root.querySelector('.pa-px-env--pressure'),
      wwInnerPrecision: this.root.querySelector('.pa-px-env--precision .visual-actor__inner-image'),
      wwInnerAutonomy: this.root.querySelector('.pa-px-env--autonomy .visual-actor__inner-image'),
      wwInnerCollaboration: this.root.querySelector('.pa-px-env--collaboration .visual-actor__inner-image'),
      wwInnerPressure: this.root.querySelector('.pa-px-env--pressure .visual-actor__inner-image'),

      // Calibration Spatial Mass Field
      calibrationStage: this.root.querySelector('.pa-px-calibration-stage'),
      calibrationMasses: this.root.querySelectorAll('.pa-px-mass-item'),

      // Time Double Exposure
      timeStage: this.root.querySelector('.pa-px-time-stage'),
      timeLaterWrapper: this.root.querySelector('.pa-px-time-later-wrapper'),

      // Provenance Inspection
      provenanceStage: this.root.querySelector('.pa-px-provenance-stage'),

      // Finale Synthesis Stage
      finaleStage: this.root.querySelector('.pa-px-finale-stage'),
    };

    // Precalculate SVG path lengths for clean stroke scrubbing
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

    const clampedP = clamp01(p);
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900;
    const { weights } = calculateHomeFrame(clampedP, { width: vw, height: vh });

    // ── 1. World Entry & DOM 4:5 Evidence Plate Transformation (0.00 -> 0.22) ──
    const plateProgress = localProgress(clampedP, 0.04, 0.16);
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
      const plateWidth = Math.max(320, Math.min(vw * 0.31, 470));
      const plateHeight = plateWidth * 1.25; // 4:5 aspect ratio
      targetRect = {
        x: vw * 0.06,
        y: vh * 0.22,
        width: plateWidth,
        height: plateHeight,
      };
    }

    // Direct DOM interpolation for Primary Actor
    const primaryX = (1 - easedPlateProgress) * 0 + easedPlateProgress * targetRect.x;
    const primaryY = (1 - easedPlateProgress) * 0 + easedPlateProgress * targetRect.y;
    const primaryW = (1 - easedPlateProgress) * vw + easedPlateProgress * targetRect.width;
    const primaryH = (1 - easedPlateProgress) * vh + easedPlateProgress * targetRect.height;
    const primaryOpacity = clampedP < 0.36 ? 1.0 : (1 - localProgress(clampedP, 0.36, 0.46));
    const primaryVisible = primaryOpacity > 0.01;

    if (this.dom.primaryActor) {
      this.dom.primaryActor.style.opacity = primaryOpacity;
      this.dom.primaryActor.style.visibility = primaryVisible ? 'visible' : 'hidden';

      if (primaryVisible) {
        this.dom.primaryActor.style.transform = `translate3d(${primaryX}px, ${primaryY}px, 0)`;
        this.dom.primaryActor.style.width = `${primaryW}px`;
        this.dom.primaryActor.style.height = `${primaryH}px`;

        // Inner-image counter-parallax movement with 1.2x overscan
        if (this.dom.primaryInner) {
          const innerY = -easedPlateProgress * 60 - clampedP * 120;
          this.dom.primaryInner.style.transform = `translate3d(0, ${innerY}px, 0) scale(1.18)`;
        }
      }
    }

    // Mutate GPU VisualActor mirror
    if (primaryVisible) {
      VisualActorRegistry.mutateFrame('home-observation-primary', {
        mode: 'manual',
        rect: { x: primaryX, y: primaryY, width: primaryW, height: primaryH },
        opacity: primaryOpacity,
        uvOffset: { x: 0, y: -0.16 * easedPlateProgress },
      });
    } else {
      VisualActorRegistry.mutateFrame('home-observation-primary', { mode: 'hidden', opacity: 0 });
    }

    // Secondary Support Detail Plate: Enters from right at 1.2x relative velocity
    const supportProgress = localProgress(clampedP, 0.05, 0.16);
    const supportEase = easeOutCubic(supportProgress);
    const supportWidth = Math.min(vw * 0.22, 340);
    const supportHeight = supportWidth * 1.25;
    const supportFinalX = vw - supportWidth - vw * 0.06;
    const supportStartX = vw * 1.15;
    const supportX = (1 - supportEase) * supportStartX + supportEase * supportFinalX;
    const supportOpacity = clampedP < 0.05 ? 0 : (clampedP < 0.28 ? easeOutCubic(localProgress(clampedP, 0.05, 0.12)) : (1 - localProgress(clampedP, 0.28, 0.40)));
    const supportVisible = supportOpacity > 0.01;

    if (this.dom.supportActor) {
      this.dom.supportActor.style.opacity = supportOpacity;
      this.dom.supportActor.style.visibility = supportVisible ? 'visible' : 'hidden';

      if (supportVisible) {
        this.dom.supportActor.style.transform = `translate3d(${supportX}px, ${vh * 0.22}px, 0)`;
        this.dom.supportActor.style.width = `${supportWidth}px`;
        this.dom.supportActor.style.height = `${supportHeight}px`;

        if (this.dom.supportInner) {
          const sInnerX = (1 - supportEase) * 40;
          this.dom.supportInner.style.transform = `translate3d(${sInnerX}px, 0, 0) scale(1.15)`;
        }
      }
    }

    // GPU mirror for secondary support
    if (supportVisible) {
      VisualActorRegistry.mutateFrame('home-observation-secondary', {
        mode: 'manual',
        rect: { x: supportX, y: vh * 0.22, width: supportWidth, height: supportHeight },
        opacity: supportOpacity,
        uvOffset: { x: 0.08 * (1 - supportEase), y: 0 },
      });
    } else {
      VisualActorRegistry.mutateFrame('home-observation-secondary', { mode: 'hidden', opacity: 0 });
    }

    // Hero Text Parallax (Visible immediately at p=0.00)
    if (this.dom.heroText) {
      const heroOpacity = weights.world;
      this.dom.heroText.style.opacity = heroOpacity;
      this.dom.heroText.style.visibility = heroOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.heroText.style.pointerEvents = heroOpacity > 0.4 ? 'auto' : 'none';

      if (heroOpacity > 0.01) {
        const titleY = -clampedP * 240;
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
        const qLocal = localProgress(clampedP, 0.06, 0.14);
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
        const branchProgress = localProgress(clampedP, 0.22, 0.36);
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
        const pathProg = localProgress(clampedP, 0.24, 0.35);
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
          const nodeProg = localProgress(clampedP, 0.26 + idx * 0.02, 0.34 + idx * 0.02);
          const nodeY = (1 - easeOutCubic(nodeProg)) * 40;
          node.style.transform = `translate3d(0, ${nodeY}px, 0) scale(${0.9 + easeOutCubic(nodeProg) * 0.1})`;
        });
      }
    }

    // ── 4. Workworld 4-Environment Centerpiece Stage (0.34 -> 0.72) ──
    const wwWeights = weights.workworld;
    const workworldVisible = wwWeights.macro > 0.01;

    if (this.dom.workworldLayer) {
      this.dom.workworldLayer.style.visibility = workworldVisible ? 'visible' : 'hidden';
    }

    // Environment 1: Precision
    if (this.dom.envPrecision) {
      const pWeight = wwWeights.precision;
      this.dom.envPrecision.style.opacity = pWeight;
      this.dom.envPrecision.style.visibility = pWeight > 0.01 ? 'visible' : 'hidden';

      if (pWeight > 0.01) {
        const precExit = localProgress(clampedP, 0.42, 0.54);
        const precX = -easeInOutCubic(precExit) * (vw * 0.35);
        const precScale = 1.0 - precExit * 0.08;
        this.dom.envPrecision.style.transform = `translate3d(${precX}px, 0, 0) scale(${precScale})`;

        if (this.dom.wwInnerPrecision) {
          const innerX = easeInOutCubic(precExit) * 60;
          this.dom.wwInnerPrecision.style.transform = `translate3d(${innerX}px, 0, 0) scale(1.15)`;
        }

        VisualActorRegistry.mutateFrame('home-workworld-precision', {
          mode: 'manual',
          rect: { x: precX, y: 0, width: vw * (1 - precExit * 0.2), height: vh },
          opacity: pWeight,
          uvOffset: { x: 0, y: -0.12 * localProgress(clampedP, 0.34, 0.54) },
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-precision', { mode: 'hidden', opacity: 0 });
      }
    }

    // Environment 2: Autonomy
    if (this.dom.envAutonomy) {
      const aWeight = wwWeights.autonomy;
      this.dom.envAutonomy.style.opacity = aWeight;
      this.dom.envAutonomy.style.visibility = aWeight > 0.01 ? 'visible' : 'hidden';

      if (aWeight > 0.01) {
        const autoEntry = localProgress(clampedP, 0.42, 0.50);
        const autoExit = localProgress(clampedP, 0.54, 0.62);
        const autoX = (1 - easeOutCubic(autoEntry)) * (vw * 0.65) - easeInOutCubic(autoExit) * (vw * 0.30);
        this.dom.envAutonomy.style.transform = `translate3d(${autoX}px, 0, 0)`;

        if (this.dom.wwInnerAutonomy) {
          const innerY = -0.15 * localProgress(clampedP, 0.42, 0.62) * 60;
          this.dom.wwInnerAutonomy.style.transform = `translate3d(0, ${innerY}px, 0) scale(1.18)`;
        }

        VisualActorRegistry.mutateFrame('home-workworld-autonomy', {
          mode: 'manual',
          rect: { x: autoX, y: 0, width: vw * 0.85, height: vh },
          opacity: aWeight,
          uvOffset: { x: 0, y: 0.15 * localProgress(clampedP, 0.42, 0.62) },
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-autonomy', { mode: 'hidden', opacity: 0 });
      }
    }

    // Environment 3: Collaboration
    if (this.dom.envCollaboration) {
      const cWeight = wwWeights.collaboration;
      this.dom.envCollaboration.style.opacity = cWeight;
      this.dom.envCollaboration.style.visibility = cWeight > 0.01 ? 'visible' : 'hidden';

      if (cWeight > 0.01) {
        const collabEntry = localProgress(clampedP, 0.52, 0.60);
        const collabExit = localProgress(clampedP, 0.62, 0.70);
        const collabX = -(1 - easeOutCubic(collabEntry)) * (vw * 0.55) - easeInOutCubic(collabExit) * (vw * 0.25);
        this.dom.envCollaboration.style.transform = `translate3d(${collabX}px, 0, 0)`;

        if (this.dom.wwInnerCollaboration) {
          const innerX = localProgress(clampedP, 0.52, 0.70) * 40;
          this.dom.wwInnerCollaboration.style.transform = `translate3d(${innerX}px, 0, 0) scale(1.15)`;
        }

        VisualActorRegistry.mutateFrame('home-workworld-collaboration', {
          mode: 'manual',
          rect: { x: collabX, y: 0, width: vw * 0.9, height: vh },
          opacity: cWeight,
          uvOffset: { x: 0.12 * localProgress(clampedP, 0.52, 0.70), y: 0 },
        });
      } else {
        VisualActorRegistry.mutateFrame('home-workworld-collaboration', { mode: 'hidden', opacity: 0 });
      }
    }

    // Environment 4: Operational Pressure
    if (this.dom.envPressure) {
      const prWeight = wwWeights.pressure;
      this.dom.envPressure.style.opacity = prWeight;
      this.dom.envPressure.style.visibility = prWeight > 0.01 ? 'visible' : 'hidden';

      if (prWeight > 0.01) {
        const pressProg = localProgress(clampedP, 0.60, 0.72);
        const pressScale = 1.12 - easeOutCubic(pressProg) * 0.12;
        this.dom.envPressure.style.transform = `scale(${pressScale})`;

        if (this.dom.wwInnerPressure) {
          this.dom.wwInnerPressure.style.transform = `scale(${1.05 + (1 - pressProg) * 0.1})`;
        }

        VisualActorRegistry.mutateFrame('home-workworld-pressure', {
          mode: 'manual',
          rect: { x: 0, y: 0, width: vw, height: vh },
          scale: pressScale,
          opacity: prWeight,
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
        const calProg = localProgress(clampedP, 0.68, 0.78);
        this.dom.calibrationMasses.forEach((mass, idx) => {
          const depthSpeed = 1 + (idx % 3) * 0.35;
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
        const timeProg = localProgress(clampedP, 0.77, 0.86);
        const clipPercent = 100 - easeInOutCubic(timeProg) * 65;
        this.dom.timeLaterWrapper.style.clipPath = `polygon(${clipPercent}% 0, 100% 0, 100% 100%, ${Math.max(0, clipPercent - 8)}% 100%)`;
      }
    }

    // ── 7. Provenance Inspection Stage (0.83 -> 0.96) ──
    if (this.dom.provenanceStage) {
      const provOpacity = weights.provenance;
      this.dom.provenanceStage.style.opacity = provOpacity;
      this.dom.provenanceStage.style.visibility = provOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.provenanceStage.style.pointerEvents = provOpacity > 0.4 ? 'auto' : 'none';
    }

    // ── 8. Finale Journey Synthesis (0.90 -> 1.00) ──
    if (this.dom.finaleStage) {
      const finOpacity = weights.finale;
      this.dom.finaleStage.style.opacity = finOpacity;
      this.dom.finaleStage.style.visibility = finOpacity > 0.01 ? 'visible' : 'hidden';
      this.dom.finaleStage.style.pointerEvents = finOpacity > 0.4 ? 'auto' : 'none';

      if (finOpacity > 0.01) {
        const finProg = localProgress(clampedP, 0.90, 1.00);
        const finScale = 0.94 + easeOutCubic(finProg) * 0.06;
        this.dom.finaleStage.style.transform = `scale(${finScale})`;
      }
    }
  }
}

export default HomeSceneRenderer;

