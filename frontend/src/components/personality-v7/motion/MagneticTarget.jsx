import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const MagneticTarget = ({
  children,
  className = '',
  maxDisplacement = 12,
  returnDuration = 0.55,
  as: Component = 'div',
  ...props
}) => {
  const targetRef = useRef(null);
  const isCoarseRef = useRef(false);

  useEffect(() => {
    isCoarseRef.current =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleMouseMove = (e) => {
    if (isCoarseRef.current || !targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    const clampedX = Math.max(Math.min(deltaX, maxDisplacement), -maxDisplacement);
    const clampedY = Math.max(Math.min(deltaY, maxDisplacement), -maxDisplacement);

    gsap.to(targetRef.current, {
      x: clampedX,
      y: clampedY,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (isCoarseRef.current || !targetRef.current) return;

    gsap.to(targetRef.current, {
      x: 0,
      y: 0,
      duration: returnDuration,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  return (
    <Component
      ref={targetRef}
      className={`pa-magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MagneticTarget;
