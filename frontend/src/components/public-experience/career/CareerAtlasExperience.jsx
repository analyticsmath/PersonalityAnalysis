import React, { useState } from 'react';
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
  const data = PUBLIC_CONTENT.career;
  const roleKeys = Object.keys(careersData);
  const [selectedKey, setSelectedKey] = useState(roleKeys[0]);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const activeRole = careersData[selectedKey];
  const activeMedia = CAREER_MEDIA[selectedKey] || 'workworldPrecision';
  const { hasFinePointer } = usePublicCapabilities();

  const handleMouseMove = (e) => {
    if (!hasFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setPointerPos({ x, y });
  };

  return (
    <div
      className="pa-px-career-page pa-px-spatial-career-atlas"
      data-route="career-intelligence"
      onMouseMove={handleMouseMove}
    >
      <header className="pa-px-career-hero">
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '8px' }}>
          OCCUPATIONAL SPATIAL ATLAS &middot; 17 OCCUPATIONAL PROFILES
        </div>
        <h1 className="pa-px-career-hero__headline">{data.hero.headline}</h1>
        <p className="pa-px-career-hero__support">{data.hero.support}</p>
        <div className="pa-px-data" style={{ marginTop: '8px', color: 'var(--pa-context)' }}>
          17 Occupational Profiles
        </div>
      </header>

      <section className="pa-px-career-field-arena" aria-label="17 Canonical Occupational Profiles Field">
        {/* Typographic Exploration Arena */}
        <div className="pa-px-career-roles-canvas" role="tablist" aria-label="17 Occupational Profiles">
          {roleKeys.map((key) => {
            const role = careersData[key];
            const isSelected = selectedKey === key;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`pa-px-career-role-item ${isSelected ? 'pa-px-career-role-item--active' : ''}`}
                onClick={() => setSelectedKey(key)}
                onMouseEnter={() => setSelectedKey(key)}
                onFocus={() => setSelectedKey(key)}
              >
                <span className="pa-px-career-role-item__title">{role.title}</span>
                <span className="pa-px-data pa-px-career-role-item__meta">
                  Profile growth potential: {role.growthPotential}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Anchored Detail & Pop-out Emergent Media Plane */}
        <div className="pa-px-career-inspector-stage" aria-live="polite">
          <div
            className="pa-px-career-inspector-media"
            style={{
              transform: `translate3d(${pointerPos.x}px, ${pointerPos.y}px, 0)`,
              transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1)',
            }}
          >
            <PublicPicture
              key={activeMedia}
              assetKey={activeMedia}
              alt={`Working environment for ${activeRole.title}`}
              priority={true}
            />
          </div>

          <div className="pa-px-career-inspector-content">
            <div className="pa-px-data" style={{ color: 'var(--pa-evidence)' }}>
              DISCIPLINE PROVENANCE: {activeRole.title.toUpperCase()}
            </div>
            <h2 className="pa-px-heading-subsection" style={{ marginTop: '4px', marginBottom: '12px' }}>
              {activeRole.title}
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <div className="pa-px-data" style={{ color: 'var(--pa-graphite)', marginBottom: '6px' }}>
                CORE COMPETENCIES REQUIRED
              </div>
              <div className="pa-px-career-skills-chips">
                {activeRole.skills.map((skill) => (
                  <span key={skill} className="pa-px-role-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div className="pa-px-data" style={{ color: 'var(--pa-context)', marginBottom: '4px' }}>
                FOUNDATIONAL PREPARATION DOMAINS
              </div>
              <p className="pa-px-body-sm">
                {activeRole.subjects.join(', ')}
              </p>
            </div>

            <div className="pa-px-data pa-px-career-aptitude-strip">
              <span>Logical Aptitude: {activeRole.aptitude.logical_reasoning}</span>
              <span>Numerical Aptitude: {activeRole.aptitude.numerical_reasoning}</span>
              <span>Verbal Aptitude: {activeRole.aptitude.verbal_reasoning}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const CareerSpatialExperience = CareerAtlasExperience;
export default CareerAtlasExperience;
