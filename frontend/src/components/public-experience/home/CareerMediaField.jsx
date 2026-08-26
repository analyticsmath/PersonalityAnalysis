import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

export const CareerMediaField = () => {
  const roleKeys = Object.keys(careersData);
  const [activeRoleKey, setActiveRoleKey] = useState('machine_learning_engineer');
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { hasFinePointer, prefersReducedMotion, isMobile } = usePublicCapabilities();

  const activeRole = careersData[activeRoleKey] || careersData[roleKeys[0]];
  const activeMedia = CAREER_MEDIA[activeRoleKey] || 'workworldPrecision';
  const activeIdx = roleKeys.indexOf(activeRoleKey);

  const handleMouseMove = (e) => {
    if (!hasFinePointer || prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setPointerOffset({ x, y });
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (idx + 1) % roleKeys.length;
      setActiveRoleKey(roleKeys[nextIdx]);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (idx - 1 + roleKeys.length) % roleKeys.length;
      setActiveRoleKey(roleKeys[prevIdx]);
    } else if (e.key === 'Enter') {
      navigate('/career-intelligence');
    }
  };

  return (
    <section
      className="pa-px-ch-roles pa-px-career-media-field-stage"
      aria-label="17 Canonical Career Occupational Field"
      onMouseMove={handleMouseMove}
    >
      <div className="pa-px-career-media-field__inner">
        <header className="pa-px-career-media-field__header">
          <h2 className="pa-px-career-media-field__title">
            CAREER FIT IS A FIELD, NOT A RANKING.
          </h2>
          <Link to="/career-intelligence" className="pa-px-link-action">
            Open full atlas &rarr;
          </Link>
        </header>

        <div className="pa-px-career-media-field__arena">
          {/* Spatial Typographic Field of 17 Canonical Role Names */}
          <div
            className="pa-px-career-roles-stream"
            role="tablist"
            aria-label="Occupational profiles"
          >
            {roleKeys.map((key, idx) => {
              const role = careersData[key];
              const isSelected = activeRoleKey === key;
              const distance = Math.abs(idx - activeIdx);
              const opacity = isSelected ? 1 : Math.max(0.4, 0.9 - distance * 0.08);

              return (
                <div
                  key={key}
                  className={`pa-px-career-stream-item ${isSelected ? 'pa-px-career-stream-item--active' : ''}`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className="pa-px-career-stream-btn"
                    style={{ opacity }}
                    onClick={() => setActiveRoleKey(key)}
                    onMouseEnter={() => setActiveRoleKey(key)}
                    onFocus={() => setActiveRoleKey(key)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  >
                    <span className="pa-px-career-stream-title">{role.title}</span>
                  </button>

                  {/* Active Role Quick Competency Chips (Visible only for active role) */}
                  {isSelected && (
                    <div className="pa-px-career-active-badges" aria-live="polite">
                      <span className="pa-px-career-growth-pill">
                        Profile growth potential: {role.growthPotential}%
                      </span>
                      <div className="pa-px-career-chips-row">
                        {role.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="pa-px-role-skill-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Emergent Large Media Plane (Occupies 45–60% viewport width) */}
          <div className="pa-px-career-media-plane-col" aria-live="polite">
            <motion.div
              layout={!prefersReducedMotion}
              className="pa-px-career-media-plane-frame"
              data-transition-actor="career-context-media"
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
                transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMedia + activeRoleKey}
                  initial={{ opacity: 0.35, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.35, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="pa-px-career-media-inner"
                >
                  <PublicPicture
                    assetKey={activeMedia}
                    alt={`Working environment for ${activeRole.title}`}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="pa-px-career-media-caption">
              <span className="pa-px-career-media-tag">
                {activeRole.title.toUpperCase()}
              </span>
              <span className="pa-px-career-media-domains">
                {activeRole.subjects.slice(0, 3).join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CareerRoleAtlasTeaser = CareerMediaField;
export default CareerMediaField;
