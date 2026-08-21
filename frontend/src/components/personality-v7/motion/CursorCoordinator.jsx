import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
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
  const isEnabledRef = useRef(false);

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
      if (cursorEl.style.opacity === '0' || cursorEl.style.opacity === '') {
        cursorEl.style.opacity = '1';
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

  const setCursorLabel = (text) => {
    if (!isEnabledRef.current) return;
    setLabel(text);
    if (cursorRef.current) {
      cursorRef.current.classList.toggle('pa-cursor--active', Boolean(text));
    }
  };

  const clearCursorLabel = () => {
    if (!isEnabledRef.current) return;
    setLabel('');
    if (cursorRef.current) {
      cursorRef.current.classList.remove('pa-cursor--active');
    }
  };

  const setApertureActive = (active) => {
    if (!isEnabledRef.current || !cursorRef.current) return;
    cursorRef.current.classList.toggle('pa-cursor--aperture', active);
  };

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
