import React from 'react';
import { PUBLIC_CONTENT } from '../../../content/public-experience/publicContent';
import { PublicPicture } from '../media/PublicPicture';

export const OneResponseSpread = () => {
  const data = PUBLIC_CONTENT.home.situation;

  return (
    <section className="pa-px-ch-response" aria-label="One Response Context">
      <div className="pa-px-ch-response__inner">
        <div className="pa-px-ch-response__content">
          <div className="pa-px-ch-response__prompt">
            Contextual Prompt: &ldquo;{data.prompt}&rdquo;
          </div>
          <blockquote className="pa-px-ch-response__quote">
            &ldquo;<span className="pa-px-ch-response__highlight">I clarify the constraints first</span>, then choose the smallest reversible step.&rdquo;
          </blockquote>
          <p className="pa-px-body-lg">
            A single sentence captures observable pacing, risk posture, and problem structure. Rather than discarding the context, the system preserves it as an inspectable source record.
          </p>
        </div>

        <div className="pa-px-ch-response__aside-media">
          <div className="pa-px-ch-response__plate">
            <PublicPicture
              assetKey="homeProcessDetail"
              alt="Close analytical inspection of materials and technical drawings"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneResponseSpread;
