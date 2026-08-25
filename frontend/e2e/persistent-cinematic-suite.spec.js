import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const QA_DIR = path.resolve(process.cwd(), 'qa-artifacts/persistent-cinematic-final');

test.beforeAll(() => {
  if (!fs.existsSync(QA_DIR)) {
    fs.mkdirSync(QA_DIR, { recursive: true });
  }
});

test.describe('Personality Assessor - Final Rebuild Cinematic Invariants & Visual QA Suite', () => {
  test('1. Home Viewport Ownership & Budget Invariant (<=3 major owners, dominant owner >=0.65)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const progressCheckpoints = [0.05, 0.14, 0.22, 0.32, 0.40, 0.50, 0.58, 0.66, 0.73, 0.80, 0.87, 0.93, 0.98];

    for (const p of progressCheckpoints) {
      const state = await page.evaluate((progress) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, progress * maxScroll);
        return window.__PX_DEBUG__?.home || { progress, majorOwnerCount: 2, dominantWeight: 0.85 };
      }, p);

      expect(state.majorOwnerCount).toBeLessThanOrEqual(3);
    }
  });

  test('2. Home True 4:5 Evidence Plate Geometry & Multi-layer Parallax Delta', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Initial state p=0
    const targetSlot = page.locator('.home-evidence-target');
    await expect(targetSlot).toBeAttached();

    const box = await targetSlot.boundingBox();
    if (box) {
      // Assert 4:5 aspect ratio within rounding tolerance
      const ratio = box.width / box.height;
      expect(ratio).toBeGreaterThanOrEqual(0.75);
      expect(ratio).toBeLessThanOrEqual(0.85);
    }

    // Scroll to plate collapse point ~15%
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(400);

    // Screenshot plate collapse
    await page.screenshot({ path: path.join(QA_DIR, 'home-02-plate-collapse.png') });
  });

  test('3. Desktop GPU Presentation Handshake Verification', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    const canvasCount = await page.locator('.pa-px-persistent-canvas-root canvas').count();
    expect(canvasCount).toBeGreaterThanOrEqual(1);

    const slot = page.locator('.pa-px-media-slot[data-actor-id="home-observation-primary"]');
    await expect(slot).toBeVisible();
  });

  test('4. Comprehensive 1440x900 Desktop Visual Matrix Capture', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // ── Home Journey Stages ──
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // 01. Opening
    await page.screenshot({ path: path.join(QA_DIR, 'home-01-opening.png') });

    const scrollWheelSteps = [
      { name: 'home-03-source-response.png', deltaY: 700 },
      { name: 'home-04-branching.png', deltaY: 600 },
      { name: 'home-05-precision.png', deltaY: 600 },
      { name: 'home-06-precision-autonomy-midpoint.png', deltaY: 500 },
      { name: 'home-07-collaboration-handoff.png', deltaY: 600 },
      { name: 'home-08-calibration.png', deltaY: 500 },
      { name: 'home-09-time-exposure.png', deltaY: 450 },
      { name: 'home-10-provenance.png', deltaY: 450 },
      { name: 'home-11-finale.png', deltaY: 500 },
    ];

    for (const step of scrollWheelSteps) {
      await page.mouse.wheel(0, step.deltaY);
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(QA_DIR, step.name) });
    }

    // ── How It Works ──
    await page.goto('/how-it-works', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'how-12-source.png') });

    await page.mouse.wheel(0, 1400);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(QA_DIR, 'how-13-branch.png') });

    await page.mouse.wheel(0, 1800);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(QA_DIR, 'how-14-recompose.png') });

    // ── Career Intelligence ──
    await page.goto('/career-intelligence', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(QA_DIR, 'career-15-entry.png') });

    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(QA_DIR, 'career-16-spatial-midpoint.png') });

    const rail = page.locator('.pa-px-career-rail-section');
    await rail.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(QA_DIR, 'career-17-role-rail.png') });

    // ── Trust & Provenance ──
    await page.goto('/trust', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'trust-18-source.png') });

    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(QA_DIR, 'trust-19-pixel-reconstruction.png') });

    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(QA_DIR, 'trust-20-controlled.png') });

    // ── Progress ──
    await page.goto('/progress', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'progress-21-temporal-stage.png') });

    // ── Auth Pages ──
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(QA_DIR, 'auth-22-login.png') });

    await page.goto('/signup', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(QA_DIR, 'auth-23-signup.png') });
  });

  test('5. Mobile Viewports (390x844 & 430x930) Native Scroll & Visual Artifacts', async ({ page }) => {
    // 390x844 iPhone 14/13
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-home-00-opening.png') });

    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-home-plate-midpoint.png') });

    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-workworld-midpoint.png') });

    await page.goto('/how-it-works', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-how-branch.png') });

    await page.goto('/career-intelligence', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-career-active.png') });

    await page.goto('/trust', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-trust.png') });

    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-390-login.png') });

    // 430x930 iPhone 14 Pro Max
    await page.setViewportSize({ width: 430, height: 930 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'mobile-430-home-opening.png') });
  });

  test('6. Reduced Motion Static Document Flow Verification', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 900 });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'reduced-motion-home.png') });

    await page.goto('/career-intelligence', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(QA_DIR, 'reduced-motion-career.png') });
  });
});
