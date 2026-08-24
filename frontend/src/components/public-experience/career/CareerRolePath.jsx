import React, { useState, useRef, useEffect } from 'react';
import careersData from '../../../content/careers.json';
import { registerActor } from '../motion/scrollState';

export const CareerRolePath = () => {
  const roles = Array.isArray(careersData.careers)
    ? careersData.careers
    : Object.entries(careersData).map(([id, c]) => ({ id, ...c }));

  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const railRef = useRef(null);
  const touchStartRef = useRef(0);
  const isDraggingRef = useRef(false);

  const activeRole = roles[activeRoleIdx] || roles[0];

  useEffect(() => {
    if (activeRole) {
      registerActor('career-active-role', {
        title: activeRole.title,
        category: activeRole.category,
      });
    }
  }, [activeRole]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveRoleIdx((prev) => (prev + 1) % roles.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveRoleIdx((prev) => (prev - 1 + roles.length) % roles.length);
    }
  };

  // Touch swipe & pointer drag with inertia
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches[0]) return;
    const diff = e.changedTouches[0].clientX - touchStartRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setActiveRoleIdx((prev) => (prev + 1) % roles.length);
      } else {
        setActiveRoleIdx((prev) => (prev - 1 + roles.length) % roles.length);
      }
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    touchStartRef.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const diff = e.clientX - touchStartRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setActiveRoleIdx((prev) => (prev + 1) % roles.length);
      } else {
        setActiveRoleIdx((prev) => (prev - 1 + roles.length) % roles.length);
      }
    }
  };

  return (
    <section className="pa-px-career-rail-section" aria-label="17 Occupational Profiles" data-scene-id="career-role-rail">
      <div className="pa-px-career-rail-header">
        <h2>17 Occupational Profiles</h2>
        <p className="pa-px-career-rail-lead">
          Explore deterministic psychometric alignment across technical execution, architectural systems, and analytical inquiry.
        </p>
      </div>

      <div
        ref={railRef}
        className="pa-px-career-rail-container"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        aria-label="Interactive Occupational Rail (Swipe, drag, or use arrow keys to navigate)"
      >
        {/* Horizontal / Diagonal Typographic Rail */}
        <nav className="pa-px-career-rail__list" aria-label="Career roles list">
          {roles.map((role, idx) => (
            <button
              key={role.id || idx}
              type="button"
              className={`pa-px-career-rail__item ${idx === activeRoleIdx ? 'pa-px-career-rail__item--active' : ''}`}
              onClick={() => setActiveRoleIdx(idx)}
              onFocus={() => setActiveRoleIdx(idx)}
              style={{
                fontVariationSettings: idx === activeRoleIdx ? "'wdth' 96, 'opsz' 48" : "'wdth' 80, 'opsz' 36",
              }}
            >
              <span className="pa-px-career-rail__item-category">
                {role.category || 'Engineering & Analysis'}
              </span>
              <span className="pa-px-career-rail__item-title">{role.title}</span>
            </button>
          ))}
        </nav>

        {/* Focused Role Detail in Negative Space (No Box Container) */}
        <div className="pa-px-career-rail__detail-pane" aria-live="polite">
          <div className="pa-px-career-rail__detail-category">
            {activeRole.category || 'Engineering & Analysis'}
          </div>
          <h3 className="pa-px-career-rail__detail-title">{activeRole.title}</h3>
          <p className="pa-px-career-rail__detail-desc">
            {activeRole.description || 'Continuous dimensional alignment and cognitive strategy calibrated across multiple psychometric constraints.'}
          </p>

          {activeRole.skills && (
            <div className="pa-px-career-rail__skills">
              <span className="pa-px-career-rail__skills-label">Core Capabilities:</span>
              <span className="pa-px-career-rail__skills-list">
                {activeRole.skills.slice(0, 5).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerRolePath;
