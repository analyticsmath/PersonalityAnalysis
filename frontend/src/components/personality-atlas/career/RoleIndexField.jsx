import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/personality-atlas/publicContent';

const RoleIndexField = () => {
  const roles = PUBLIC_CONTENT.career.roles;
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  return (
    <section
      className="pa-atlas-role-index"
      style={{
        padding: '80px var(--atlas-outer-gutter) 100px',
        backgroundColor: 'var(--atlas-field)',
        color: 'var(--atlas-paper)',
      }}
      aria-label="Role Directory Index"
    >
      <div style={{ maxWidth: '44rem', marginBottom: '48px' }}>
        <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', display: 'block', marginBottom: '8px' }}>
          BENCHMARKED ROLE DIRECTORY (17 CANONICAL DISCIPLINES)
        </span>
        <h2 className="pa-atlas-heading-xl">
          Detailed requirement models across engineering and design.
        </h2>
      </div>

      {/* 2-Column Irregular Editorial Index + Expanded Central Detail Field */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--atlas-column-gap)',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Open Text Role Index */}
        <div
          className="pa-atlas-role-index__list"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          role="listbox"
          aria-label="Available Career Roles"
        >
          {roles.map((role) => {
            const isSelected = selectedRole?.key === role.key;
            return (
              <button
                key={role.key}
                onClick={() => setSelectedRole(role)}
                style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontFamily: 'var(--atlas-font-sans)',
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)',
                  fontWeight: isSelected ? 560 : 420,
                  color: isSelected ? 'var(--atlas-signal)' : 'var(--atlas-paper)',
                  opacity: isSelected ? 1 : 0.65,
                  borderRadius: 'var(--atlas-radius-xs)',
                  backgroundColor: isSelected ? 'rgba(239, 245, 242, 0.08)' : 'transparent',
                  transform: isSelected ? 'translateX(6px)' : 'none',
                  transition: 'all 180ms ease',
                }}
                role="option"
                aria-selected={isSelected}
              >
                {role.title}
              </button>
            );
          })}
        </div>

        {/* Right Column: Selected Role Expanded Reading Area */}
        <div
          className="pa-atlas-role-index__detail"
          style={{
            backgroundColor: 'rgba(239, 245, 242, 0.06)',
            padding: '36px 40px',
            borderRadius: 'var(--atlas-radius-sm)',
            position: 'sticky',
            top: 'calc(var(--atlas-header-height-desktop) + 20px)',
          }}
        >
          <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.78rem' }}>
            ROLE PROFILE EVALUATION
          </span>

          <h3 className="pa-atlas-heading-lg" style={{ margin: '8px 0 20px', color: 'var(--atlas-paper)' }}>
            {selectedRole.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                CORE TECHNICAL SKILLS
              </span>
              <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginTop: '4px' }}>
                {selectedRole.skills?.join(', ')}
              </p>
            </div>

            <div>
              <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                FOUNDATIONAL SUBJECTS
              </span>
              <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginTop: '4px' }}>
                {selectedRole.subjects?.join(', ')}
              </p>
            </div>

            <div>
              <span className="pa-atlas-mono" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                DISCIPLINE INTEREST DOMAINS
              </span>
              <p className="pa-atlas-body" style={{ color: 'var(--atlas-paper)', marginTop: '4px' }}>
                {selectedRole.interests?.join(', ')}
              </p>
            </div>

            <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(239, 245, 242, 0.12)' }}>
              <span className="pa-atlas-mono" style={{ color: 'var(--atlas-signal)', fontSize: '0.75rem' }}>
                GROWTH POTENTIAL INDEX: {selectedRole.growthPotential}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(RoleIndexField);
