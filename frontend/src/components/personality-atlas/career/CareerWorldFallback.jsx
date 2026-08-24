import React from 'react';
import AtlasResponsiveImage from '../media/AtlasResponsiveImage';
import { MEDIA_ASSETS_ATLAS } from '../../../content/personality-atlas/mediaManifest';

const CareerWorldFallback = ({ activeWorld, className = '' }) => {
  const asset = MEDIA_ASSETS_ATLAS[activeWorld?.mediaKey] || MEDIA_ASSETS_ATLAS.careerComplexMachine;

  return (
    <div
      className={`pa-career-atlas__dom-fallback ${className}`.trim()}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Primary Dominant DOM Plane */}
      <div
        className="pa-career-atlas__dom-primary"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <AtlasResponsiveImage
          asset={asset}
          loading="eager"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Secondary Depth Shadow */}
      <div
        className="pa-career-atlas__dom-secondary"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(79, 109, 120, 0.45)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default React.memo(CareerWorldFallback);
