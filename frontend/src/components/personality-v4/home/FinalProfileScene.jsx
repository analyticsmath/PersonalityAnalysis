import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import { getSignupAcquisitionUrl } from '../../../utils/personality-v4/navigation';

export const FinalProfileScene = () => {
  const { finalProfile } = PUBLIC_CONTENT.home;

  return (
    <section className="pa-final-scene" aria-labelledby="final-heading">
      <div className="pa-container">
        <div className="pa-final-scene-inner">
          <h2 id="final-heading">{finalProfile.title}</h2>
          <p>{finalProfile.body}</p>
          <Link
            to={getSignupAcquisitionUrl()}
            className="pa-btn pa-btn--primary"
          >
            {finalProfile.cta}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalProfileScene;
