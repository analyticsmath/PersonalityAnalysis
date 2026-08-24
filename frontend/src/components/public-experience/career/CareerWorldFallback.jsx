import React from 'react';
import { PublicPicture } from '../media/PublicPicture';

export const CareerWorldFallback = ({ mediaKey = 'workworldPrecision' }) => {
  return (
    <div className="pa-px-career-fallback">
      <PublicPicture assetKey={mediaKey} alt="Career Workworld Environment" />
    </div>
  );
};

export default CareerWorldFallback;
