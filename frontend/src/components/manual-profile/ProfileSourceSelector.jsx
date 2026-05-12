import React from 'react';

export default function ProfileSourceSelector({ value, onChange, disabled }) {
  return (
    <fieldset className="manual-profile-source" disabled={disabled}>
      <legend className="assessment-step__subtitle">Profile source</legend>
      <div className="manual-profile-source__options">
        <label className="manual-profile-source__option">
          <input
            type="radio"
            name="profileSource"
            value="cv"
            checked={value === 'cv'}
            onChange={() => onChange?.('cv')}
          />
          <span>Upload CV (PDF or DOCX)</span>
        </label>
        <label className="manual-profile-source__option">
          <input
            type="radio"
            name="profileSource"
            value="manual"
            checked={value === 'manual'}
            onChange={() => onChange?.('manual')}
          />
          <span>Enter profile manually</span>
        </label>
      </div>
    </fieldset>
  );
}
