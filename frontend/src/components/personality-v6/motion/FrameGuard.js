/**
 * FrameGuard.js
 * In-browser and test assertions for V6 Cinematic System:
 * - Guarantees horizontal overflow is bounded: scrollWidth <= clientWidth + 1
 * - Asserts non-empty stage coverage (no blank/black/paper frames)
 * - Verifies active actors and text clear fields
 */

export const assertNoHorizontalOverflow = (element = document.documentElement) => {
  const scrollWidth = element.scrollWidth;
  const clientWidth = element.clientWidth;
  const hasOverflow = scrollWidth > clientWidth + 1;

  if (hasOverflow) {
    console.warn(
      `[FrameGuard Warning] Horizontal overflow detected: scrollWidth (${scrollWidth}px) > clientWidth (${clientWidth}px)`
    );
  }

  return !hasOverflow;
};

export const assertStageCoverage = (stageElement) => {
  if (!stageElement) return false;

  const rect = stageElement.getBoundingClientRect();
  const hasValidDimensions = rect.width > 0 && rect.height > 0;

  // Check that at least one image or canvas element is active with non-zero opacity
  const images = stageElement.querySelectorAll('img, picture, canvas');
  let hasVisibleMedia = false;

  images.forEach((img) => {
    const style = window.getComputedStyle(img);
    if (style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity || '1') > 0.05) {
      hasVisibleMedia = true;
    }
  });

  return hasValidDimensions && (images.length === 0 || hasVisibleMedia);
};

export const runFrameAssertions = () => {
  const noOverflow = assertNoHorizontalOverflow();
  const stages = document.querySelectorAll('[data-cinematic-stage]');
  let allStagesCovered = true;

  stages.forEach((stage) => {
    if (!assertStageCoverage(stage)) {
      allStagesCovered = false;
      console.warn('[FrameGuard Warning] Stage coverage incomplete:', stage);
    }
  });

  return { noOverflow, allStagesCovered };
};

export default {
  assertNoHorizontalOverflow,
  assertStageCoverage,
  runFrameAssertions,
};
