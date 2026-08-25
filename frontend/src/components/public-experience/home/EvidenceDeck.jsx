import React, { useState } from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';

export const EvidenceDeck = () => {
  const data = PUBLIC_CONTENT.home.readings;
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section className="pa-px-ch-deck" aria-label="Evidence Deck">
      <div className="pa-px-ch-deck__header">
        <h2>{data.headline}</h2>
        <p className="pa-px-lead">
          The same source response provides distinct evidence across four independent analytical frameworks.
        </p>
      </div>

      <div className="pa-px-ch-deck__cards">
        {data.destinations.map((dest) => (
          <div
            key={dest.id}
            className={`pa-px-deck-card ${activeCard === dest.id ? 'pa-px-deck-card--active' : ''}`}
            onMouseEnter={() => setActiveCard(dest.id)}
            onMouseLeave={() => setActiveCard(null)}
            tabIndex={0}
            onFocus={() => setActiveCard(dest.id)}
            onBlur={() => setActiveCard(null)}
          >
            <div>
              <span className="pa-px-deck-card__tag">{dest.name}</span>
              <h3 className="pa-px-deck-card__title">{dest.summary}</h3>
              <p className="pa-px-deck-card__desc">{dest.detail}</p>
            </div>
            <div className="pa-px-deck-card__axis">
              Axis: {dest.axis}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EvidenceDeck;
