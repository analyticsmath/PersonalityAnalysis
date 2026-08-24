import React, { useState } from 'react';
import careersData from '../../../content/careers.json';

export const CareerRolePath = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const roles = Array.isArray(careersData.careers)
    ? careersData.careers
    : Object.entries(careersData).map(([id, c]) => ({ id, ...c }));

  return (
    <section className="pa-px-career-roles-section" aria-label="17 Canonical Career Profiles">
      <div className="pa-px-career-roles-section__header">
        <span className="pa-px-context-data" style={{ color: 'var(--px-soft)', display: 'block', marginBottom: '8px' }}>
          Canonical Occupational Registry
        </span>
        <h2>17 VERIFIED CAREER ROLES</h2>
        <p style={{ fontSize: 'var(--px-body)', opacity: 0.85, lineHeight: 1.55 }}>
          Explore how deterministic multi-factor psychometrics calibrate alignment across engineering, scientific inquiry, systems architecture, and design execution.
        </p>
      </div>

      <div className="pa-px-career-roles-grid">
        {roles.map((role) => (
          <div
            key={role.id}
            tabIndex={0}
            role="button"
            className="pa-px-career-role-item"
            onClick={() => setSelectedRole(selectedRole?.id === role.id ? null : role)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedRole(selectedRole?.id === role.id ? null : role);
              }
            }}
          >
            <div className="pa-px-career-role-item__family">{role.category || 'Engineering & Analysis'}</div>
            <div className="pa-px-career-role-item__title">{role.title}</div>
            <p className="pa-px-career-role-item__match">{role.description || `Growth potential: ${role.growthPotential}% | Target aptitude alignment.`}</p>
            {selectedRole?.id === role.id && role.skills && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(247, 248, 248, 0.12)', fontSize: 'var(--px-caption)' }}>
                <strong>Key Skills:</strong> {role.skills.slice(0, 4).join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerRolePath;
