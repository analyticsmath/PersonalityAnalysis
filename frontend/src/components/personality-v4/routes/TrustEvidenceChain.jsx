import React from 'react';
import { Link } from 'react-router-dom';
import { MEDIA_ASSETS } from '../../../content/personality-v4/mediaManifest';
import { PUBLIC_CONTENT } from '../../../content/personality-v4/publicContent';
import ResponsivePicture from '../media/ResponsivePicture';

export const TrustEvidenceChain = () => {
  const { trust } = PUBLIC_CONTENT;

  return (
    <>
      <section className="pa-route-hero">
        <div className="pa-container">
          <div className="pa-route-hero__inner">
            <h1>{trust.title}</h1>
            <p>{trust.lead}</p>
          </div>
        </div>
      </section>

      <section className="pa-trust-page-section" aria-label="Evidence and Data Processing Chain">
        <div className="pa-container">
          <div className="pa-trust-page-hero-media">
            <ResponsivePicture
              asset={MEDIA_ASSETS.a08}
              alt={MEDIA_ASSETS.a08.alt}
              sizes="100vw"
              objectPosition="50% 48%"
            />
          </div>

          <div className="pa-trust-chain-full">
            {trust.chain.map((node) => (
              <div key={node.stage} className="pa-trust-chain-item">
                <div className="pa-trust-chain-type">{node.type}</div>
                <h3>{node.stage} — {node.title}</h3>
                <p>{node.description}</p>
              </div>
            ))}
          </div>

          <div className="pa-trust-actions-box">
            <div className="pa-trust-action-card">
              <h4>{trust.controls.exportTitle}</h4>
              <p>{trust.controls.exportDesc}</p>
              <Link to={trust.controls.privacyControlsLink} className="pa-btn pa-btn--secondary">
                Manage Data Exports →
              </Link>
            </div>

            <div className="pa-trust-action-card">
              <h4>{trust.controls.deleteTitle}</h4>
              <p>{trust.controls.deleteDesc}</p>
              <Link to={trust.controls.privacyControlsLink} className="pa-btn pa-btn--secondary">
                Privacy Controls →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustEvidenceChain;
