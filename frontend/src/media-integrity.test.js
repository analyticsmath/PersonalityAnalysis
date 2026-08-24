// frontend/src/media-integrity.test.js
// Production Media Integrity Verification

import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { MEDIA_MANIFEST_PX } from './content/public-experience/mediaManifest';

describe('Public Experience Media Integrity Verification', () => {
  const publicDir = resolve(process.cwd(), 'public');
  const assetKeys = Object.keys(MEDIA_MANIFEST_PX);

  it('declares all approved photographic assets in mediaManifest', () => {
    expect(assetKeys.length).toBeGreaterThanOrEqual(10);
    assetKeys.forEach((key) => {
      const asset = MEDIA_MANIFEST_PX[key];
      expect(asset.id).toBeDefined();
      expect(asset.key).toBeDefined();
      expect(asset.alt).toBeDefined();
      expect(asset.sourcePlatform).toBe('Unsplash Plus');
    });
  });

  it('ensures source image and fallbacks physically exist on disk with positive byte sizes', () => {
    assetKeys.forEach((key) => {
      const asset = MEDIA_MANIFEST_PX[key];

      if (asset.sourceWebp) {
        const srcPath = resolve(publicDir, asset.sourceWebp.replace(/^\//, ''));
        expect(existsSync(srcPath), `Source file missing: ${asset.sourceWebp}`).toBe(true);
        expect(statSync(srcPath).size).toBeGreaterThan(1000);
      }

      if (asset.fallbackJpg) {
        const fallbackPath = resolve(publicDir, asset.fallbackJpg.replace(/^\//, ''));
        expect(existsSync(fallbackPath), `Fallback file missing: ${asset.fallbackJpg}`).toBe(true);
        expect(statSync(fallbackPath).size).toBeGreaterThan(1000);
      }
    });
  });
});
