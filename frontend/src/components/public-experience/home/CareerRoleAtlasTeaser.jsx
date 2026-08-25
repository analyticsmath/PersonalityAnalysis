import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import careersData from '../../../content/careers.json';
import { PublicPicture } from '../media/PublicPicture';
import { usePublicCapabilities } from '../motion/usePublicCapabilities';

const MEDIA_MAP = {
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

export const CareerRoleAtlasTeaser = () => {
  const roleKeys = Object.keys(careersData);
  const [activeRoleKey, setActiveRoleKey] = useState(roleKeys[0]);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });
  const activeRole = careersData[activeRoleKey];
  const activeMedia = MEDIA_MAP[activeRoleKey] || 'workworldPrecision';
  const { hasFinePointer } = usePublicCapabilities();

  const handleMouseMove = (e) => {
    if (!hasFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setPointerOffset({ x, y });
  };

  return (
    <section
      className="pa-px-ch-roles pa-px-spatial-career-teaser"
      aria-label="17 Canonical Occupational Profiles"
      onMouseMove={handleMouseMove}
    >
      <div className="pa-px-spatial-career-teaser__inner">
        <header className="pa-px-spatial-career-teaser__header">
          <div>
            <h2 className="pa-px-heading-xl">{PUBLIC_CONTENT.career.hero.headline}</h2>
            <p className="pa-px-lead">
              Career fit is an authored spatial field. Select any verified discipline to inspect its working context and multi-factor requirements.
            </p>
          </div>
          <Link to="/career-intelligence" className="pa-px-btn-secondary" style={{ alignSelf: 'flex-start' }}>
            Open Complete 17-Role Atlas &rarr;
          </Link>
        </header>

        <div className="pa-px-spatial-career-teaser__arena">
          {/* Spatial Typographic Role Exploration Field */}
          <div className="pa-px-spatial-roles-field" role="tablist" aria-label="Occupational Profiles">
            {roleKeys.slice(0, 10).map((key) => {
              const role = careersData[key];
              const isSelected = activeRoleKey === key;

              return (
                <div
                  key={key}
                  className={`pa-px-spatial-role-node ${isSelected ? 'pa-px-spatial-role-node--active' : ''}`}
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className="pa-px-spatial-role-btn"
                    onClick={() => setActiveRoleKey(key)}
                    onMouseEnter={() => setActiveRoleKey(key)}
                    onFocus={() => setActiveRoleKey(key)}
                  >
                    <span className="pa-px-spatial-role-btn__title">{role.title}</span>
                    <span className="pa-px-data pa-px-spatial-role-btn__potential">
                      Profile growth potential: {role.growthPotential}%
                    </span>
                  </button>

                  {isSelected && (
                    <div className="pa-px-spatial-role-inline-competencies" aria-live="polite">
                      <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
                        KEY COMPETENCIES:
                      </span>
                      <div className="pa-px-spatial-role-chips">
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

          {/* Emergent Contextual Media Preview (Inertial Crop Parallax) */}
          <div className="pa-px-spatial-roles-media-wrap" aria-live="polite">
            <div
              className="pa-px-spatial-roles-media-frame"
              style={{
                transform: `translate3d(${pointerOffset.x}px, ${pointerOffset.y}px, 0)`,
                transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
              }}
            >
              <PublicPicture
                key={activeMedia}
                assetKey={activeMedia}
                alt={`Working context for ${activeRole.title}`}
              />
            </div>
            <div className="pa-px-spatial-roles-media-caption">
              <span className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
                ENVIRONMENTAL CONTEXT: {activeRole.title.toUpperCase()}
              </span>
              <p className="pa-px-body-sm" style={{ color: 'var(--pa-graphite)', marginTop: '4px' }}>
                Foundational domains: {activeRole.subjects.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CareerRolePath = CareerRoleAtlasTeaser;
export default CareerRoleAtlasTeaser;
