import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import careersData from '../../../content/careers.json';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const CAREER_MEDIA = {
  software_engineer: 'workworldPrecision',
  frontend_engineer: 'careerCreativeHuman',
  backend_engineer: 'workworldPrecision',
  data_analyst: 'homeSituationDetail',
  machine_learning_engineer: 'careerDeepInquiry',
  product_manager: 'careerCoordination',
  ux_designer: 'careerCreativeHuman',
  devops_engineer: 'workworldPressure',
  technical_program_manager: 'careerCoordination',
  customer_success_manager: 'workworldCollaboration',
  cybersecurity_analyst: 'trustDiagnostic',
  electrical_engineer: 'careerSynthesis',
  power_systems_engineer: 'workworldPressureHuman',
  control_systems_engineer: 'careerSynthesis',
  automation_engineer: 'workworldAutonomy',
  embedded_engineer: 'careerDeepInquiry',
  business_analyst: 'careerCoordination',
};

export const CareerAtlasExperience = () => {
  const roleKeys = Object.keys(careersData);
  const [selectedKey, setSelectedKey] = useState(roleKeys[0]);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const activeRole = careersData[selectedKey] || careersData[roleKeys[0]];
  const activeMedia = CAREER_MEDIA[selectedKey] || 'workworldPrecision';
  const { hasFinePointer, prefersReducedMotion, isMobile } = usePublicCapabilities();
  const selectedIdx = roleKeys.indexOf(selectedKey);

  const handleMouseMove = (e) => {
    if (!hasFinePointer || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setPointerPos({ x, y });
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (idx + 1) % roleKeys.length;
      setSelectedKey(roleKeys[nextIdx]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (idx - 1 + roleKeys.length) % roleKeys.length;
      setSelectedKey(roleKeys[prevIdx]);
    }
  };

  return (
    <div
      className="pa-px-career-page pa-px-spatial-career-atlas"
      data-route="career-intelligence"
      onMouseMove={handleMouseMove}
    >
      <header className="pa-px-career-hero">
        <h1 className="pa-px-career-hero__headline">
          CAREER FIT IS A FIELD, NOT A RANKING.
        </h1>
        <p className="pa-px-career-hero__support">
          Career fit changes when work conditions change. Explore 17 canonical occupational profiles.
        </p>
      </header>

      <section className="pa-px-career-field-arena" aria-label="17 Canonical Occupational Profiles Field">
        {/* Spatial Typographic Stream */}
        <div className="pa-px-career-roles-canvas" role="tablist" aria-label="17 Occupational Profiles">
          <span className="sr-only">17 Occupational Profiles</span>
          {roleKeys.map((key, idx) => {
            const role = careersData[key];
            const isSelected = selectedKey === key;
            const distance = Math.abs(idx - selectedIdx);
            const opacity = isSelected ? 1 : Math.max(0.45, 0.9 - distance * 0.06);

            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`pa-px-career-role-item ${isSelected ? 'pa-px-career-role-item--active' : ''}`}
                style={{ opacity }}
                onClick={() => setSelectedKey(key)}
                onMouseEnter={() => setSelectedKey(key)}
                onFocus={() => setSelectedKey(key)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span className="pa-px-career-role-item__title">{role.title}</span>
              </button>
            );
          })}
        </div>

        {/* Anchored Emergent Media Plane & Active Role Details */}
        <div className="pa-px-career-inspector-stage" aria-live="polite">
          <div
            className="pa-px-career-inspector-media"
            data-transition-actor="career-context-media"
            style={{
              transform: prefersReducedMotion ? 'none' : `translate3d(${pointerPos.x}px, ${pointerPos.y}px, 0)`,
              transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMedia + selectedKey}
                initial={{ opacity: 0.4, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="pa-px-career-inspector-media-inner"
              >
                <PublicPicture
                  assetKey={activeMedia}
                  alt={`Working environment for ${activeRole.title}`}
                  priority={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pa-px-career-inspector-content">
            <div className="pa-px-career-inspector-header">
              <span className="pa-px-career-inspector-growth">
                Profile growth potential: {activeRole.growthPotential}%
              </span>
              <h2 className="pa-px-career-inspector-title">
                {activeRole.title}
              </h2>
            </div>

            <div className="pa-px-career-inspector-section">
              <div className="pa-px-career-inspector-label">
                CORE COMPETENCIES REQUIRED
              </div>
              <div className="pa-px-career-skills-chips">
                {activeRole.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="pa-px-role-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pa-px-career-inspector-section">
              <div className="pa-px-career-inspector-label">
                FOUNDATIONAL DOMAINS
              </div>
              <p className="pa-px-career-inspector-text">
                {activeRole.subjects.join(' · ')}
              </p>
            </div>

            <div className="pa-px-career-aptitude-strip">
              <span>Logical: {activeRole.aptitude.logical_reasoning}</span>
              <span>Numerical: {activeRole.aptitude.numerical_reasoning}</span>
              <span>Verbal: {activeRole.aptitude.verbal_reasoning}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const CareerSpatialExperience = CareerAtlasExperience;
export default CareerAtlasExperience;
