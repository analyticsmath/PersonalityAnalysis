import React from 'react';

// Semantically neutral wrapper for route rendering with clean reduced-motion compatibility
const PageTransition = ({ children, className = '' }) => {
  return (
    <div className={`page-content-wrapper ${className}`.trim()}>
      {children}
    </div>
  );
};

export default PageTransition;
