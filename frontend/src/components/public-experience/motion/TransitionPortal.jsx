/**
 * Personality Assessor - Transition Portal
 * Fixed root portal owning DOM transition actors:
 * - Media Picture Clone (Home -> Career / Progress)
 * - Phrase Typographic Clone (Home -> How)
 * - Canvas2D Pixel Reconstruction Dissolve (Home -> Trust)
 */

import React, { useRef, useState, useEffect } from 'react';
import { Canvas2DPixelReconstruction } from './PixelReconstructionEngine';
import { MEDIA_MANIFEST_PX } from '../../../content/public-experience/mediaManifest';

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
      {state.family === 'SHARED_MEDIA' && state.cloneRect && (() => {
        const mediaAsset = MEDIA_MANIFEST_PX[state.assetKey] || MEDIA_MANIFEST_PX.homeWorldEntry;
        const imgSrc = mediaAsset?.sourceWebp || mediaAsset?.fallbackJpg || '/media/public-experience/homeWorldEntry-720.webp';
        return (
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
              borderRadius: '3px',
              boxShadow: '0 16px 36px rgba(23, 25, 24, 0.12)',
              willChange: 'transform, left, top, width, height, opacity',
            }}
          >
            <img
              src={imgSrc}
              alt=""
              aria-hidden="true"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 50%',
              }}
            />
          </div>
        );
      })()}

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
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
            fontWeight: 500,
            fontVariationSettings: state.phraseData.fontSettings || "'wdth' 90",
            color: 'var(--pa-ink, #171918)',
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
