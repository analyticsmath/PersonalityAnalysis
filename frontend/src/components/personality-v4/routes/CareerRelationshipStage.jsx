import React, { useState } from 'react';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';

export const CareerRelationshipStage = () => {
  const { careerWorlds } = PUBLIC_CONTENT.home;
  const [selectedWorldId, setSelectedWorldId] = useState(careerWorlds.worlds[0].id);

  const activeWorld =
    careerWorlds.worlds.find((w) => w.id === selectedWorldId) || careerWorlds.worlds[0];

  return (
    <>
      <section className="pa-route-hero pa-route-hero--dark">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{PUBLIC_CONTENT.careerIntelligence.title}</h1>
            <p>{PUBLIC_CONTENT.careerIntelligence.lead}</p>
          </div>
        </div>
      </section>

      <section className="pa-career-intel-section" aria-label="Career Intelligence Worlds Explorer">
        <div className="pa-container">
          <div className="pa-career-intel-grid">
            <div className="pa-career-intel-index" role="tablist" aria-label="Work World Categories">
              {careerWorlds.worlds.map((world) => (
                <button
                  key={world.id}
                  type="button"
                  role="tab"
                  className={`pa-career-intel-btn ${
                    selectedWorldId === world.id ? 'pa-career-intel-btn--active' : ''
                  }`}
                  aria-selected={selectedWorldId === world.id}
                  onClick={() => setSelectedWorldId(world.id)}
                >
                  <span className="pa-career-intel-btn-name">{world.name}</span>
                  <span className="pa-career-intel-btn-theme">{world.theme}</span>
                </button>
              ))}
            </div>

            <div className="pa-career-intel-media">
              <ResponsivePicture
                key={activeWorld.id}
                asset={MEDIA_ASSETS[activeWorld.imageKey]}
                alt={MEDIA_ASSETS[activeWorld.imageKey]?.alt || ''}
                sizes="(max-width: 1024px) 100vw, 40vw"
                objectPosition="50% 40%"
                imgClassName="pa-animate-fade-in"
              />
            </div>

            <div className="pa-career-intel-territories">
              <div className="pa-intel-territory">
                <h4>Why It May Fit</h4>
                <p>{activeWorld.whyItFits}</p>
              </div>

              <div className="pa-intel-territory">
                <h4>Where It May Stretch</h4>
                <p>{activeWorld.whereItStretches}</p>
              </div>

              <div className="pa-intel-territory">
                <h4>What to Strengthen</h4>
                <p>{activeWorld.whatToStrengthen}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerRelationshipStage;
