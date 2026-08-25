/**
 * Personality Assessor - Transition Portal
 * Fixed root portal owning DOM transition actors:
 * - Media Picture Clone (Home -> Career / Progress)
 * - Phrase Typographic Clone (Home -> How)
 * - Canvas2D Pixel Reconstruction Dissolve (Home -> Trust)
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas2DPixelReconstruction } from './PixelReconstructionEngine';

class TransitionPortalController {
  constructor() {
    this.state = {
      active: false,
      family: null,
      sourceActor: null,
      cloneRect: null,
      phraseData: null,
      progress: 0,
      opacity: 1,
    };
    this.subscribers = new Set();
    this.pixelEngine = null;
  }

  startMediaCarry({ sourceEl, assetKey, alt, initialRect }) {
    this.state = {
      active: true,
      family: 'SHARED_MEDIA',
      sourceEl,
      assetKey,
      alt,
      cloneRect: { ...initialRect },
      phraseData: null,
      progress: 0,
      opacity: 1,
    };
    this.notify();
  }

  updateMediaRect(rect, opacity = 1) {
    if (!this.state.active) return;
    this.state.cloneRect = { ...rect };
    this.state.opacity = opacity;
    this.notify();
  }

  startPhraseCarry({ phraseText, initialRect, fontSettings }) {
    this.state = {
      active: true,
      family: 'SHARED_PHRASE',
      phraseData: {
        text: phraseText,
        rect: { ...initialRect },
        fontSettings,
      },
      progress: 0,
      opacity: 1,
    };
    this.notify();
  }

  updatePhraseRect(rect, fontSettings, opacity = 1) {
    if (!this.state.active || !this.state.phraseData) return;
    this.state.phraseData.rect = { ...rect };
    if (fontSettings) this.state.phraseData.fontSettings = fontSettings;
    this.state.opacity = opacity;
    this.notify();
  }

  startPixelDissolve({ sourceKey, destKey, canvasEl }) {
    this.state = {
      active: true,
      family: 'PIXEL_RECONSTRUCTION',
      sourceKey,
      destKey,
      progress: 0,
      opacity: 1,
    };
    if (canvasEl) {
      this.pixelEngine = new Canvas2DPixelReconstruction(canvasEl);
      this.pixelEngine.loadImages(sourceKey, destKey);
    }
    this.notify();
  }

  updatePixelProgress(p) {
    if (!this.state.active) return;
    this.state.progress = p;
    if (this.pixelEngine) {
      this.pixelEngine.render(p);
    }
    this.notify();
  }

  end() {
    this.state = {
      active: false,
      family: null,
      sourceActor: null,
      cloneRect: null,
      phraseData: null,
      progress: 0,
      opacity: 1,
    };
    if (this.pixelEngine) {
      this.pixelEngine.clear();
      this.pixelEngine = null;
    }
    this.notify();
  }

  subscribe(cb) {
    this.subscribers.add(cb);
    return () => this.subscribers.delete(cb);
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this.state));
  }
}

export const transitionPortalController = new TransitionPortalController();

export const TransitionPortal = () => {
  const [state, setState] = useState(transitionPortalController.state);
  const canvasRef = useRef(null);

  useEffect(() => {
    return transitionPortalController.subscribe((nextState) => {
      setState({ ...nextState });
    });
  }, []);

  if (!state.active) return null;

  return (
    <div
      id="public-transition-portal"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* 1. Shared Media Picture Clone */}
      {state.family === 'SHARED_MEDIA' && state.cloneRect && (
        <div
          className="pa-px-transition-media-clone"
          style={{
            position: 'absolute',
            left: `${state.cloneRect.x}px`,
            top: `${state.cloneRect.y}px`,
            width: `${state.cloneRect.width}px`,
            height: `${state.cloneRect.height}px`,
            opacity: state.opacity,
            overflow: 'hidden',
            borderRadius: '2px',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.45)',
            willChange: 'transform, left, top, width, height, opacity',
          }}
        >
          <img
            src={state.assetKey === 'homeWorldEntry' ? '/images/evidence/evidence-home-primary.jpg' : '/images/evidence/evidence-career-precision.jpg'}
            alt={state.alt || ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 50%',
            }}
          />
        </div>
      )}

      {/* 2. Shared Phrase Typographic Clone */}
      {state.family === 'SHARED_PHRASE' && state.phraseData && (
        <div
          className="pa-px-transition-phrase-clone"
          style={{
            position: 'absolute',
            left: `${state.phraseData.rect.x}px`,
            top: `${state.phraseData.rect.y}px`,
            width: `${state.phraseData.rect.width}px`,
            opacity: state.opacity,
            fontSize: 'clamp(1.4rem, 2.4vw, 2.2rem)',
            fontWeight: 500,
            fontVariationSettings: state.phraseData.fontSettings || "'wdth' 90",
            color: 'var(--px-white, #F7F8F8)',
            lineHeight: 1.25,
            willChange: 'transform, left, top, width, opacity',
          }}
        >
          {state.phraseData.text || 'I clarify the constraints first, then choose the smallest reversible step.'}
        </div>
      )}

      {/* 3. Canvas2D Pixel Reconstruction Dissolve */}
      {state.family === 'PIXEL_RECONSTRUCTION' && (
        <canvas
          ref={(el) => {
            canvasRef.current = el;
            if (el && !transitionPortalController.pixelEngine) {
              transitionPortalController.pixelEngine = new Canvas2DPixelReconstruction(el);
              transitionPortalController.pixelEngine.loadImages(state.sourceKey, state.destKey);
            }
          }}
          width={window.innerWidth || 1440}
          height={window.innerHeight || 900}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

export default TransitionPortal;
