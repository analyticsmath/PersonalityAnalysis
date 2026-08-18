import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';

export const InspectableTrustScene = () => {
  const { trustScene } = PUBLIC_CONTENT.home;

  return (
    <section className="pa-trust-section" aria-labelledby="trust-scene-heading">
      <div className="pa-container">
        <div className="pa-trust-theatre">
          <div className="pa-trust-media-wrap">
            <ResponsivePicture
              asset={MEDIA_ASSETS.a08}
              alt={MEDIA_ASSETS.a08.alt}
              sizes="(max-width: 900px) 100vw, 48vw"
              objectPosition="50% 48%"
            />
          </div>

          <div className="pa-trust-content">
            <h2 id="trust-scene-heading">{trustScene.title}</h2>

            <div className="pa-trust-chain">
              {trustScene.stages.map((stage) => (
                <div key={stage.id} className="pa-trust-node">
                  <h4>{stage.name}</h4>
                  <p>{stage.detail}</p>
                </div>
              ))}
            </div>

            <div className="pa-trust-links">
              {trustScene.links.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectableTrustScene;
