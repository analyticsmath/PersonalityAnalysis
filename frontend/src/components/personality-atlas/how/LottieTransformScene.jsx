import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

/**
 * Personality Assessor — LottieTransformScene
 * Drives the authored 180-frame context-atlas-transform.lottie animation
 * mapped directly to ScrollTrigger progress, with complete SVG fallback.
 */
const LottieTransformScene = ({ progress = 0 }) => {
  const [dotLottie, setDotLottie] = useState(null);
  const [hasError, setHasError] = useState(false);

  const dotLottieRefCallback = (instance) => {
    setDotLottie(instance);
  };

  useEffect(() => {
    if (dotLottie && !hasError) {
      try {
        const totalFrames = 180;
        const currentFrame = Math.min(totalFrames - 1, Math.max(0, Math.floor(progress * totalFrames)));
        dotLottie.setFrame(currentFrame);
      } catch (err) {
        console.warn('dotLottie frame scrub error:', err);
      }
    }
  }, [dotLottie, progress, hasError]);

  if (hasError) {
    // Authored SVG Fallback Stage
    const stageIdx = Math.min(4, Math.floor(progress * 5));
    const stageColors = ['#CDD86A', '#95A87F', '#4F6D78', '#CDD86A', '#EFF5F2'];
    return (
      <div
        className="pa-atlas-lottie-fallback"
        style={{
          width: '100%',
          maxWidth: '480px',
          aspectRatio: '1/1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(22, 61, 53, 0.4)',
          borderRadius: 'var(--atlas-radius-sm)',
        }}
      >
        <svg viewBox="0 0 100 100" width="80%" height="80%">
          <circle
            cx="50"
            cy="50"
            r={20 + stageIdx * 4}
            fill="none"
            stroke={stageColors[stageIdx]}
            strokeWidth="2"
          />
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="#EFF5F2"
            fontFamily="var(--atlas-font-mono)"
            fontSize="7"
          >
            STAGE {stageIdx + 1}/5
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className="pa-atlas-lottie-container"
      style={{
        width: '100%',
        maxWidth: '540px',
        aspectRatio: '1/1',
        position: 'relative',
      }}
    >
      <DotLottieReact
        src="/motion/context-atlas-transform.json"
        dotLottieRefCallback={dotLottieRefCallback}
        loop={false}
        autoplay={false}
        onError={() => setHasError(true)}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default React.memo(LottieTransformScene);
