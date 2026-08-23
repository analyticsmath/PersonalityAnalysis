import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const CursorContext = createContext({
  setCursorLabel: () => {},
  clearCursorLabel: () => {},
  setApertureActive: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorCoordinator = ({ children }) => {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState('');
  const [isAperture, setIsAperture] = useState(false);
  const isEnabledRef = useRef(false);
  const activeZoneRef = useRef({ label: '', isAperture: false });

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isCoarse || prefersReduced) {
      isEnabledRef.current = false;
      return;
    }

    isEnabledRef.current = true;
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const xSet = gsap.quickSetter(cursorEl, 'x', 'px');
    const ySet = gsap.quickSetter(cursorEl, 'y', 'px');

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Check if target is inside a form or input
      const target = e.target;
      const isFormElement = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('form')
      );

      const hasActiveZone = Boolean(activeZoneRef.current.label || activeZoneRef.current.isAperture);

      if (hasActiveZone && !isFormElement) {
        cursorEl.style.opacity = '1';
      } else {
        cursorEl.style.opacity = '0';
      }
    };

    const handlePointerLeave = () => {
      if (cursorEl) cursorEl.style.opacity = '0';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    const tickerFn = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.22, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    };

    gsap.ticker.add(tickerFn);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  const setCursorLabel = useCallback((text) => {
    if (!isEnabledRef.current) return;
    setLabel(text);
    activeZoneRef.current.label = text;
    if (cursorRef.current) {
      cursorRef.current.classList.toggle('pa-custom-cursor--active', Boolean(text));
      if (text || activeZoneRef.current.isAperture) {
        cursorRef.current.style.opacity = '1';
      }
    }
  }, []);

  const clearCursorLabel = useCallback(() => {
    if (!isEnabledRef.current) return;
    setLabel('');
    activeZoneRef.current.label = '';
    if (cursorRef.current) {
      cursorRef.current.classList.remove('pa-custom-cursor--active');
      if (!activeZoneRef.current.isAperture) {
        cursorRef.current.style.opacity = '0';
      }
    }
  }, []);

  const setApertureActive = useCallback((active) => {
    if (!isEnabledRef.current) return;
    setIsAperture(active);
    activeZoneRef.current.isAperture = active;
    if (cursorRef.current) {
      cursorRef.current.classList.toggle('pa-custom-cursor--aperture', active);
      if (active || activeZoneRef.current.label) {
        cursorRef.current.style.opacity = '1';
      } else {
        cursorRef.current.style.opacity = '0';
      }
    }
  }, []);

  return (
    <CursorContext.Provider value={{ setCursorLabel, clearCursorLabel, setApertureActive }}>
      {children}
      <div
        ref={cursorRef}
        className="pa-custom-cursor"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <div className="pa-custom-cursor__circle" />
        {label && (
          <span ref={labelRef} className="pa-custom-cursor__label">
            {label}
          </span>
        )}
      </div>
    </CursorContext.Provider>
  );
};

export default CursorCoordinator;
