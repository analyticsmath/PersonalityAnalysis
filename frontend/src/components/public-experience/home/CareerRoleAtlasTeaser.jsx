import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import careersData from '../../../content/careers.json';
import { PublicPicture } from '../media/PublicPicture';

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
  const activeRole = careersData[activeRoleKey];
  const activeMedia = MEDIA_MAP[activeRoleKey] || 'workworldPrecision';

  return (
    <section className="pa-px-ch-roles" aria-label="Career Role Atlas Teaser">
      <div className="pa-px-ch-roles__inner">
        <div className="pa-px-ch-roles__header">
          <div>
            <h2 className="pa-px-heading-xl">{PUBLIC_CONTENT.career.hero.headline}</h2>
            <p className="pa-px-lead">
              17 canonical occupational profiles grounded in multi-dimensional evidence.
            </p>
          </div>
          <Link to="/career-intelligence" className="pa-px-btn-secondary">
            Explore 17 Occupational Profiles
          </Link>
        </div>

        <div className="pa-px-ch-roles__grid">
          <div className="pa-px-roles-tag-cloud" role="tablist" aria-label="Occupational profiles">
            {roleKeys.map((key) => {
              const role = careersData[key];
              const isSelected = activeRoleKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`pa-px-role-tag ${isSelected ? 'pa-px-role-tag--active' : ''}`}
                  onClick={() => setActiveRoleKey(key)}
                  onMouseEnter={() => setActiveRoleKey(key)}
                >
                  {role.title}
                </button>
              );
            })}
          </div>

          <div className="pa-px-role-preview-card" aria-live="polite">
            <div className="pa-px-role-preview-media">
              <PublicPicture
                assetKey={activeMedia}
                alt={`Working context for ${activeRole.title}`}
              />
            </div>
            <div className="pa-px-role-preview-info">
              <h3 className="pa-px-heading-md" style={{ marginBottom: '8px' }}>
                {activeRole.title}
              </h3>
              <p className="pa-px-body-sm" style={{ marginBottom: '12px' }}>
                Key Competencies: {activeRole.skills.slice(0, 4).join(', ')}
              </p>
              <div className="pa-px-data">
                Growth Potential Index: {activeRole.growthPotential}% | Multi-Factor Alignment
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const CareerRolePath = CareerRoleAtlasTeaser;
export default CareerRoleAtlasTeaser;
