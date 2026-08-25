import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import careersData from '../../../content/careers.json';
import { PublicPicture } from '../media/PublicPicture';

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
  const activeRole = careersData[selectedKey];
  const activeMedia = CAREER_MEDIA[selectedKey] || 'workworldPrecision';

  return (
    <div className="pa-px-career-page" data-route="career-intelligence">
      <header className="pa-px-career-hero">
        <div className="pa-px-career-hero__text">
          <h1 className="pa-px-career-hero__headline">{data.hero.headline}</h1>
          <p className="pa-px-career-hero__support">{data.hero.support}</p>
        </div>
        <div className="pa-px-career-hero__media">
          <div className="pa-px-career-hero__frame">
            <PublicPicture
              assetKey="workworldPrecision"
              alt="Precision engineering context"
              priority={true}
            />
          </div>
        </div>
      </header>

      <section className="pa-px-career-atlas" aria-label="17 Occupational Profiles Atlas">
        <div className="pa-px-career-atlas__header">
          <div>
            <h2>17 Occupational Profiles</h2>
            <p className="pa-px-body">
              Explore multi-dimensional alignment across verified technical and professional disciplines.
            </p>
          </div>
          <div className="pa-px-data">
            Selected Profile: {activeRole.title}
          </div>
        </div>

        <div className="pa-px-career-atlas__body">
          <div className="pa-px-career-roles-list" role="tablist" aria-label="17 Occupational Profiles">
            {roleKeys.map((key) => {
              const role = careersData[key];
              const isSelected = selectedKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`pa-px-role-list-item ${isSelected ? 'pa-px-role-list-item--active' : ''}`}
                  onClick={() => setSelectedKey(key)}
                  onMouseEnter={() => setSelectedKey(key)}
                >
                  <span>{role.title}</span>
                  <span className="pa-px-data">{role.growthPotential}% Fit Potential</span>
                </button>
              );
            })}
          </div>

          <div className="pa-px-career-role-detail-card" aria-live="polite">
            <div className="pa-px-role-detail__media">
              <PublicPicture
                assetKey={activeMedia}
                alt={`Working environment for ${activeRole.title}`}
              />
            </div>
            <h3 className="pa-px-role-detail__title">{activeRole.title}</h3>

            <div>
              <div className="pa-px-data" style={{ marginBottom: '6px', color: 'var(--pa-evidence)' }}>
                CORE COMPETENCIES
              </div>
              <div className="pa-px-role-detail__skills">
                {activeRole.skills.map((skill) => (
                  <span key={skill} className="pa-px-role-skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="pa-px-data" style={{ marginBottom: '6px', color: 'var(--pa-context)' }}>
                FOUNDATIONAL DOMAINS
              </div>
              <p className="pa-px-body-sm">
                {activeRole.subjects.join(', ')}
              </p>
            </div>

            <div className="pa-px-data" style={{ borderTop: '1px solid var(--pa-mineral)', paddingTop: '12px' }}>
              Aptitude Vectors: Logical ({activeRole.aptitude.logical_reasoning}) | Numerical ({activeRole.aptitude.numerical_reasoning}) | Verbal ({activeRole.aptitude.verbal_reasoning})
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const CareerSpatialExperience = CareerAtlasExperience;
export default CareerAtlasExperience;
