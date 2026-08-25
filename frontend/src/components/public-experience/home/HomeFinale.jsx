import React from 'react';
import { Link } from 'react-router-dom';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { getSignupAcquisitionUrl } from '../../../content/public-experience/navigation';

export const HomeFinale = () => {
  const data = PUBLIC_CONTENT.home.finale;

  return (
    <section className="pa-px-ch-finale" aria-label="Home Finale">
      <div className="pa-px-ch-finale__inner">
        <div className="pa-px-data" style={{ color: 'var(--pa-evidence)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Permanent Evidence Record
        </div>
        <h2 className="pa-px-ch-finale__headline">
          {data.headline}
        </h2>
        <p className="pa-px-ch-finale__support">
          {data.support}
        </p>
        <div className="pa-px-ch-finale__actions">
          <Link to={getSignupAcquisitionUrl()} className="pa-px-btn-primary">
            {data.ctaPrimary}
          </Link>
          <Link to="/how-it-works" className="pa-px-btn-secondary">
            {data.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Finale = HomeFinale;
export default HomeFinale;
