import React from 'react';
import ResponsiveEvidenceImage from './ResponsiveEvidenceImage';
import './EnvironmentPlane.css';

/**
 * EnvironmentPlane
 * Renders an environmental context photograph in the Living Record world.
 */
export const EnvironmentPlane = ({
  asset = null,
  role = 'primary', // 'primary' | 'support' | 'memory' | 'residue'
  priority = false,
  focalPoint = null,
  aspectRatio = null,
  caption = null,
  className = '',
  style = {},
}) => {
  if (!asset) return null;

  return (
    <figure
      className={`pa-environment-plane pa-environment-plane--${role} ${className}`}
      style={style}
    >
      <ResponsiveEvidenceImage
        asset={asset}
        priority={priority}
        focalPoint={focalPoint}
        aspectRatio={aspectRatio}
        className="pa-environment-plane__media"
      />
      {caption && (
        <figcaption className="pa-environment-plane__caption">
          <span className="pa-environment-plane__caption-text">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
};

export default EnvironmentPlane;
