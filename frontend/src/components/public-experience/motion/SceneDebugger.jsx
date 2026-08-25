import React, { useState, useEffect, useRef } from 'react';
import { scrollState } from './scrollState';

export const SceneDebugger = () => {
  // Only compile and execute in DEV environment
  if (!import.meta.env.DEV) {
    return null;
  }

  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('debug') === 'motion';
  });

  const [metrics, setMetrics] = useState({
    scrollY: 0,
    velocity: 0,
    progress: 0,
    activeScenes: [],
    mediaReadiness: 'unknown',
    viewportHeight: 0,
    fps: 60,
  });

  const frameRef = useRef();
  const lastTimeRef = useRef(performance.now());
  const frameCountRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!visible) return;

    let isMounted = true;

    const updateLoop = () => {
      if (!isMounted) return;

      const now = performance.now();
      frameCountRef.current++;
      let currentFps = metrics.fps;
      if (now - lastTimeRef.current >= 500) {
        currentFps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      // Collect active scene states & pinned sections
      const activeScenes = [];
      const pinnedElements = document.querySelectorAll('[data-scene-id], .pa-px-entry-section, .pa-px-situation-section, .pa-px-readings-section, .pa-px-journey-section, .pa-px-how-section, .pa-px-career-hero-section, .pa-px-trust-section, .pa-px-progress-section');
      
      const vh = window.innerHeight;
      pinnedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < vh) {
          const id = el.getAttribute('data-scene-id') || el.className.split(' ')[0];
          const opacity = window.getComputedStyle(el).opacity;
          const clipPath = window.getComputedStyle(el).clipPath;
          activeScenes.push({
            id,
            top: Math.round(rect.top),
            bottom: Math.round(rect.bottom),
            height: Math.round(rect.height),
            opacity,
            clipPath: clipPath === 'none' ? 'none' : clipPath.slice(0, 30) + '...',
          });
        }
      });

      // Check media readiness
      const images = Array.from(document.querySelectorAll('main img'));
      const loadedCount = images.filter((img) => img.complete && img.naturalHeight !== 0).length;
      const mediaStatus = images.length === 0 ? 'no media' : `${loadedCount}/${images.length} decoded`;

      setMetrics({
        scrollY: Math.round(scrollState.scroll || window.scrollY),
        velocity: (scrollState.velocity || 0).toFixed(2),
        progress: (scrollState.progress || 0).toFixed(3),
        activeScenes,
        mediaReadiness: mediaStatus,
        viewportHeight: vh,
        fps: currentFps,
      });

      frameRef.current = requestAnimationFrame(updateLoop);
    };

    frameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      isMounted = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [visible]);

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        style={{
          position: 'fixed',
          bottom: '12px',
          right: '12px',
          zIndex: 999999,
          background: 'rgba(18, 20, 22, 0.85)',
          color: '#F7F8F8',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '11px',
          fontFamily: 'monospace',
          cursor: 'pointer',
          opacity: 0.6,
        }}
        title="Toggle Motion Debugger (Ctrl+Shift+D)"
      >
        🐛 Motion HUD
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        width: '320px',
        maxHeight: '80vh',
        overflowY: 'auto',
        zIndex: 999999,
        background: 'rgba(12, 14, 16, 0.94)',
        color: '#F7F8F8',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        borderRadius: '6px',
        padding: '12px',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: '11px',
        lineHeight: 1.4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        pointerEvents: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '6px', marginBottom: '8px' }}>
        <strong>🎬 Motion & Scroll HUD</strong>
        <button
          type="button"
          onClick={() => setVisible(false)}
          style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '12px' }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '8px' }}>
        <div><strong>Scroll Y:</strong> {metrics.scrollY}px</div>
        <div><strong>Velocity:</strong> {metrics.velocity}</div>
        <div><strong>Progress:</strong> {metrics.progress}</div>
        <div><strong>FPS:</strong> {metrics.fps}</div>
        <div style={{ gridColumn: 'span 2' }}><strong>Media:</strong> {metrics.mediaReadiness}</div>
      </div>

      <div style={{ borderTop: '1px solid #334155', paddingTop: '6px' }}>
        <strong>Active Viewport Scenes:</strong>
        {metrics.activeScenes.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>None active</div>
        ) : (
          metrics.activeScenes.map((s, i) => (
            <div key={i} style={{ marginTop: '4px', padding: '4px', background: '#1E293B', borderRadius: '3px' }}>
              <div style={{ color: '#7dd3fc', fontWeight: 'bold' }}>{s.id}</div>
              <div>Bounds: [{s.top}px → {s.bottom}px] (H: {s.height}px)</div>
              <div>Opacity: {s.opacity} | Clip: {s.clipPath}</div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '8px', fontSize: '9px', color: '#888', textAlign: 'center' }}>
        Shortcut: Ctrl+Shift+D to toggle
      </div>
    </div>
  );
};

export default SceneDebugger;
