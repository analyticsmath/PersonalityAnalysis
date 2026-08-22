// frontend/src/media-integrity.test.js
// Production Media Integrity Verification

import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { MEDIA_ASSETS_V7 } from './content/personality-v7/mediaManifest';

describe('Production Media Integrity Verification', () => {
  const publicDir = resolve(process.cwd(), 'public');

  const assetKeys = [
    'homeContext',
    'homeSharedContext',
    'homeAnalysis',
    'careerComplexMachine',
    'careerDeepInquiry',
    'careerCoordination',
    'evidenceVisible',
    'careerAutonomy',
    'careerControl',
    'careerBroadcast',
    'careerAnalysis',
    'career3dPrinting',
    'careerTeamDevice',
    'evidenceLabDetail',
    'howProcess',
    'progressStudio',
    'trustInspection',
    'trustDiagnostic',
    'signupFirstRecord',
    'signupAgency',
  ];

  it('declares all 20 unwatermarked photographic evidence assets in mediaManifest', () => {
    expect(assetKeys.length).toBe(20);
    assetKeys.forEach((key) => {
      expect(MEDIA_ASSETS_V7).toHaveProperty(key);
      const asset = MEDIA_ASSETS_V7[key];
      expect(asset.id).toBeDefined();
      expect(asset.key).toBeDefined();
      expect(asset.alt).toBeDefined();
      expect(asset.intrinsicDimensions.width).toBeGreaterThan(0);
      expect(asset.intrinsicDimensions.height).toBeGreaterThan(0);
    });
  });

  it('ensures source image and fallbacks physically exist on disk with positive byte sizes', () => {
    assetKeys.forEach((key) => {
      const asset = MEDIA_ASSETS_V7[key];

      // Primary source (.webp or .avif)
      const srcPath = resolve(publicDir, asset.source.replace(/^\//, ''));
      expect(existsSync(srcPath), `Source file missing: ${asset.source}`).toBe(true);
      expect(statSync(srcPath).size).toBeGreaterThan(1000);

      // Fallback (.jpg)
      if (asset.fallback) {
        const fallbackPath = resolve(publicDir, asset.fallback.replace(/^\//, ''));
        expect(existsSync(fallbackPath), `Fallback file missing: ${asset.fallback}`).toBe(true);
        expect(statSync(fallbackPath).size).toBeGreaterThan(1000);
      }

      // Mobile derivative
      if (asset.mobileWebp) {
        const mobWebpPath = resolve(publicDir, asset.mobileWebp.replace(/^\//, ''));
        expect(existsSync(mobWebpPath), `Mobile WebP missing: ${asset.mobileWebp}`).toBe(true);
        expect(statSync(mobWebpPath).size).toBeGreaterThan(1000);
      }

      if (asset.mobileAvif) {
        const mobAvifPath = resolve(publicDir, asset.mobileAvif.replace(/^\//, ''));
        expect(existsSync(mobAvifPath), `Mobile AVIF missing: ${asset.mobileAvif}`).toBe(true);
        expect(statSync(mobAvifPath).size).toBeGreaterThan(1000);
      }
    });
  });
});
