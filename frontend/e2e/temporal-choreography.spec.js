import { test, expect } from '@playwright/test';

test.describe('Temporal Choreography & Motion System Reconstruction (Playwright)', () => {
  test.beforeEach(async ({ page }) => {
    // Set a standard desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  const assertViewportActorHealth = async (page, routeName) => {
    // Ensure main content is mounted
    await page.locator('main#main-content').waitFor({ state: 'attached', timeout: 10000 });

    const isHealthy = await page.evaluate(() => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Candidate visual actors across public routes
      const candidateElements = Array.from(
        document.querySelectorAll(
          '.pa-px-entry-section, .pa-px-entry-stage, .pa-px-entry__primary-media, .pa-px-entry__headline, .pa-px-situation-section, .pa-px-situation-stage, .pa-px-situation__prompt, .pa-px-clause, .pa-px-readings-section, .pa-px-readings-stage, .pa-px-readings__source-anchor, .pa-px-reading-node, .pa-px-journey-section, .pa-px-journey-stage, .pa-px-journey-env, .pa-px-calibration-section, .pa-px-calibration-stage, .pa-px-calibration-mass, .pa-px-time-section, .pa-px-time-stage, .pa-px-time__base-media, .pa-px-trace-section, .pa-px-trace-stage, .pa-px-trace__interpreted-layer, .pa-px-finale-section, .pa-px-finale-stage, .pa-px-finale__title, .pa-px-how-section, .pa-px-how-stage-sticky, .pa-px-how-header-block, .pa-px-how-source-actor, .pa-px-how-vector-stage, .pa-px-how-stage-narrative, .pa-px-career-hero-section, .pa-px-career-hero-content, .pa-px-career-rail-section, .pa-px-trust-section, .pa-px-trust-stage-sticky, .pa-px-trust-record-actor, .pa-px-trust-header, .pa-px-footer, .pa-px-footer__brand, .pa-px-footer__inner'
        )
      );

      for (const el of candidateElements) {
        const rect = el.getBoundingClientRect();
        // Check if element intersects viewport with non-zero dimensions
        if (
          rect.bottom > 0 &&
          rect.top < vh &&
          rect.right > 0 &&
          rect.left < vw &&
          rect.width > 5 &&
          rect.height > 5
        ) {
          const style = window.getComputedStyle(el);
          const rawOpacity = style.opacity;
          const opacity = rawOpacity && !isNaN(parseFloat(rawOpacity)) ? parseFloat(rawOpacity) : 1.0;
          const visibility = style.visibility;
          const display = style.display;

          if (opacity > 0.15 && visibility !== 'hidden' && display !== 'none') {
            return true;
          }
        }
      }
      return false;
    });

    expect(isHealthy, `[${routeName}] No primary visual actor is visible in the active viewport (detected black/blank state)`).toBe(true);
  };

  test('Home Route: PageDown, ArrowDown, Fast Wheel, and Reverse Stress', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.pa-px-entry-section');

    // Initial state check
    await assertViewportActorHealth(page, 'Home - Initial Rest');

    // 1. Repeated PageDown Stress
    for (let i = 1; i <= 5; i++) {
      await page.keyboard.press('PageDown');
      await page.waitForTimeout(150);
      await assertViewportActorHealth(page, `Home - PageDown ${i}`);
    }

    // 2. Repeated ArrowDown Stress
    for (let i = 1; i <= 8; i++) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(50);
    }
    await assertViewportActorHealth(page, 'Home - ArrowDown Sequences');

    // 3. Fast Wheel Scrub
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(150);
    await assertViewportActorHealth(page, 'Home - Fast Wheel Forward');

    // 4. Reverse Wheel
    await page.mouse.wheel(0, -1200);
    await page.waitForTimeout(150);
    await assertViewportActorHealth(page, 'Home - Reverse Wheel');

    // 5. Rapid Reverse to Top
    await page.mouse.wheel(0, -5000);
    await page.waitForTimeout(200);
    await assertViewportActorHealth(page, 'Home - Rapid Reverse Top');
  });

  test('How It Works Route: PageDown and Scrub Stress', async ({ page }) => {
    await page.goto('/how-it-works');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.pa-px-how-section');

    await assertViewportActorHealth(page, 'How - Initial Rest');

    for (let i = 1; i <= 4; i++) {
      await page.keyboard.press('PageDown');
      await page.waitForTimeout(150);
      await assertViewportActorHealth(page, `How - PageDown ${i}`);
    }

    await page.mouse.wheel(0, -3000);
    await page.waitForTimeout(150);
    await assertViewportActorHealth(page, 'How - Rapid Reverse');
  });

  test('Route Transition & Shared Actor Carry: Home -> Career, How, Trust', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('.pa-px-entry-section');

    // 1. Home -> Career (Shared Media Carry)
    await page.click('a[href="/career-intelligence"]');
    await page.waitForURL('**/career-intelligence');
    await page.waitForSelector('.pa-px-career-hero-section');
    await assertViewportActorHealth(page, 'Career Intelligence - Destination Mounted');

    // 2. Career -> How It Works
    await page.click('a[href="/how-it-works"]');
    await page.waitForURL('**/how-it-works');
    await page.waitForSelector('.pa-px-how-section');
    await assertViewportActorHealth(page, 'How It Works - Destination Mounted');

    // 3. How -> Trust & X-Ray
    await page.click('a[href="/trust"]');
    await page.waitForURL('**/trust');
    await page.waitForSelector('.pa-px-trust-section');
    await assertViewportActorHealth(page, 'Trust - Destination Mounted');
  });

  test('Auth Navigation: Login <-> Signup Stable Coordinate Frame', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('domcontentloaded');

    const loginForm = page.locator('.pa-px-auth-negative-space-form');
    await expect(loginForm).toBeVisible();

    await page.click('a[href*="/signup"]');
    await page.waitForURL('**/signup*');

    const signupForm = page.locator('.pa-px-auth-negative-space-form');
    await expect(signupForm).toBeVisible();
  });
});
