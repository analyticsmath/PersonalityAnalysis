import React from 'react';
import { TrustSourceInspection } from '../../components/public-experience/trust/TrustSourceInspection';

/**
 * Editorial Trust Page - Provenance & Sovereignty
 * Inspect the evidence chain from participant response to user-sovereign data controls.
 */
export const EditorialTrustPage = () => {
  return (
    <div className="pa-px-trust-page-container">
      <TrustSourceInspection />
    </div>
  );
};

export default EditorialTrustPage;
