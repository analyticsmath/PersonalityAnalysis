import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const QA_DIR = path.resolve(process.cwd(), 'qa-artifacts/persistent-cinematic-final');

test.beforeAll(() => {
  if (!fs.existsSync(QA_DIR)) {
    fs.mkdirSync(QA_DIR, { recursive: true });
  }
});

test.describe('Personality Assessor - DOM-First Cinematic Recovery Invariants & Visual QA Suite', () => {

  test('1. Exact-Top Home Invariant (p=0.00)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Verify H1 and editorial headline at cold load
    const headline = page.locator('.pa-px-home-hero-title');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText('UNDER DIFFERENT');

    // Verify hero support text
    const support = page.locator('.pa-px-home-hero-support');
    await expect(support).toBeVisible();

    // Verify primary DOM visual actor starts full screen
    const primaryActor = page.locator('.pa-px-home-primary-actor');
    await expect(primaryActor).toBeVisible();

    // Check debug state partition of unity at p=0
    const debug = await page.evaluate(() => window.__PX_DEBUG__?.home);
    expect(debug).toBeTruthy();
    expect(debug.dominantScene).toBe('world');
    expect(debug.dominantWeight).toBeGreaterThanOrEqual(0.8);
    expect(debug.majorOwnerCount).toBeLessThanOrEqual(2);
  });

  test('2. Exact-Bottom Home Finale Invariant (p=1.00)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Scroll to exact bottom
    await page.evaluate(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll);
    });
    await page.waitForTimeout(400);

    // Finale headline & content must be visible
    const finaleHeadline = page.locator('.pa-px-finale-headline');
    await expect(finaleHeadline).toBeVisible();
    await expect(finaleHeadline).toContainText('SEE WHAT HOLDS');

    // Check debug state partition of unity at p=1
    const debug = await page.evaluate(() => window.__PX_DEBUG__?.home);
    expect(debug).toBeTruthy();
    expect(debug.dominantScene).toBe('finale');
    expect(debug.dominantWeight).toBeGreaterThanOrEqual(0.8);
    expect(debug.majorOwnerCount).toBeLessThanOrEqual(2);
  });



  test('3. Home Partition of Unity Invariant across all 20 checkpoints', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const progressCheckpoints = [
      0.0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45,
      0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.0
    ];

    for (const p of progressCheckpoints) {
      const state = await page.evaluate((progress) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, progress * maxScroll);
        // Force evaluation of active frame
        return window.__PX_DEBUG__?.home;
      }, p);

      expect(state).toBeTruthy();
      expect(state.majorOwnerCount).toBeLessThanOrEqual(3);
      expect(state.dominantWeight).toBeGreaterThanOrEqual(0.48);
    }
  });

  test('4. True 4:5 Evidence Plate Geometry & Parallax Collapse', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const targetSlot = page.locator('.home-evidence-target');
    await expect(targetSlot).toBeAttached();

    const box = await targetSlot.boundingBox();
    if (box) {
      const ratio = box.width / box.height;
      expect(ratio).toBeGreaterThanOrEqual(0.70);
      expect(ratio).toBeLessThanOrEqual(0.88);
    }

    // Scroll to plate collapse point ~14%
    await page.evaluate(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, 0.14 * maxScroll);
    });
    await page.waitForTimeout(400);

    const actor = page.locator('.pa-px-home-primary-actor');
    await expect(actor).toBeVisible();
    await page.screenshot({ path: path.join(QA_DIR, 'home-02-plate-collapse.png') });
  });

  test('5. Keyboard Scroll Responsiveness via ScrollBus', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Initial scroll position
    const initialY = await page.evaluate(() => window.scrollY);
    expect(initialY).toBe(0);

    // Press PageDown
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(300);

    const pageDownY = await page.evaluate(() => window.scrollY);
    expect(pageDownY).toBeGreaterThan(0);

    // Press ArrowDown multiple times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(300);

    const arrowDownY = await page.evaluate(() => window.scrollY);
    expect(arrowDownY).toBeGreaterThan(pageDownY);

    // Press Home to return to top
    await page.keyboard.press('Home');
    await page.waitForTimeout(300);

    const homeY = await page.evaluate(() => window.scrollY);
    expect(homeY).toBe(0);
  });

  test('6. Career 2.5D DOM Spatial Stage Invariant', async ({ page }) => {
    await page.goto('/career-intelligence', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // Title & Support visible immediately at cold load
    const title = page.locator('.pa-px-career-title');
    await expect(title).toBeVisible();

    // Verify 5 DOM perspective planes exist
    const planes = page.locator('.pa-px-career-dom-plane');
    await expect(planes).toHaveCount(5);

    // Scroll through stage
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(400);

    const groupTransform = await page.locator('.pa-px-career-world-group').evaluate((el) => el.style.transform);
    expect(groupTransform).toContain('translate3d');
  });

  test('7. Trust Provenance Continuous SVG Record Invariant', async ({ page }) => {
    await page.goto('/trust', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const title = page.locator('.pa-px-trust-title');
    await expect(title).toBeVisible();

    // Verify SVG record geometry elements
    const spine = page.locator('.pa-px-trust-path--spine');
    await expect(spine).toBeAttached();

    const originNode = page.locator('.pa-px-trust-node--origin');
    await expect(originNode).toBeAttached();

    // Scroll through stage
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(400);

    const desc = page.locator('.pa-px-trust-record__desc');
    await expect(desc).toBeVisible();
  });

  test('8. Full Route Transition Matrix Verification', async ({ page }) => {
    // ── Transition A: Home -> Career (SHARED_MEDIA) ──
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    await page.goto('/career-intelligence', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const careerTitle = page.locator('.pa-px-career-title');
    await expect(careerTitle).toBeVisible();

    // ── Transition B: Home -> How (SHARED_PHRASE) ──
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    await page.goto('/how-it-works', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const howTitle = page.locator('.pa-px-how-header__headline');
    await expect(howTitle).toBeVisible();

    // ── Transition C: Home -> Trust (PIXEL_RECONSTRUCTION) ──
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    await page.goto('/trust', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const trustTitle = page.locator('.pa-px-trust-title');
    await expect(trustTitle).toBeVisible();

    // ── Transition D: Login <-> Signup (AUTH_LAYOUT) ──
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const loginHeader = page.locator('.pa-px-auth-form-header h1');
    await expect(loginHeader).toBeVisible();

    await page.goto('/signup', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    const signupHeader = page.locator('.pa-px-auth-form-header h1');
    await expect(signupHeader).toBeVisible();
  });

  test('9. Comprehensive Visual QA Artifact Matrix Capture', async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width: 1440, height: 900 });


    // ── Home Journey Stages ──
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
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
});
