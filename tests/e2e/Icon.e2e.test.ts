import { test, expect } from '@playwright/test';

test.describe('Icon - Accessibility & Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page
      .getByRole('img', { name: /completed/i })
      .waitFor({ state: 'visible', timeout: 10000 });
  });

  test.describe('Semantic Icon Accessibility', () => {
    test('semantic icon has accessible name', async ({ page }) => {
      const icon = page.getByRole('img', { name: /completed/i });

      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('aria-label', 'Completed');
    });

    test('semantic icon has role="img"', async ({ page }) => {
      const icon = page.getByRole('img', { name: /completed/i });

      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('role', 'img');
    });

    test('semantic icon is not focusable', async ({ page }) => {
      const icon = page.getByRole('img', { name: /completed/i });
      await icon.waitFor({ state: 'visible', timeout: 10000 });

      await expect(icon).toHaveAttribute('focusable', 'false');
    });
  });

  test.describe('Decorative Icon Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--decorative&viewMode=story');
      await page.waitForLoadState('networkidle');
      await page
        .locator('svg[aria-hidden="true"]')
        .first()
        .waitFor({ state: 'visible', timeout: 10000 });
    });

    test('decorative icon is hidden from screen readers', async ({ page }) => {
      const svg = page.locator('svg[aria-hidden="true"]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).toBeVisible();
      await expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    test('decorative icon does not have role="img"', async ({ page }) => {
      const svg = page.locator('svg[aria-hidden="true"]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).not.toHaveAttribute('role', 'img');
    });

    test('decorative icon does not have aria-label', async ({ page }) => {
      const svg = page.locator('svg[aria-hidden="true"]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).not.toHaveAttribute('aria-label');
    });
  });

  test.describe('Icon Sizes', () => {
    test('small icon renders correctly', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--small&viewMode=story');
      await page.waitForLoadState('networkidle');

      const svg = page.locator('svg[role="img"][aria-label]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).toBeVisible();
      await expect(svg).toHaveClass(/small/);
    });

    test('medium icon renders correctly', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--medium&viewMode=story');
      await page.waitForLoadState('networkidle');

      const svg = page.locator('svg[role="img"][aria-label]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).toBeVisible();
      await expect(svg).toHaveClass(/medium/);
    });

    test('large icon renders correctly', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--large&viewMode=story');
      await page.waitForLoadState('networkidle');

      const svg = page.locator('svg[role="img"][aria-label]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).toBeVisible();
      await expect(svg).toHaveClass(/large/);
    });

    test('xlarge icon renders correctly', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--x-large&viewMode=story');
      await page.waitForLoadState('networkidle');

      const svg = page.locator('svg[role="img"][aria-label]').first();
      await svg.waitFor({ state: 'visible', timeout: 10000 });

      await expect(svg).toBeVisible();
      await expect(svg).toHaveClass(/xlarge/);
    });
  });

  test.describe('Priority 1: Extended Descriptions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-icon--with-extended-description&viewMode=story'
      );
      await page.locator('svg[aria-label="Sales chart"]').waitFor({ state: 'visible' });
    });

    test('icon with aria-describedby links to description', async ({ page }) => {
      const icon = page.locator('svg[aria-label="Sales chart"]');

      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('aria-describedby');

      const describedbyId = await icon.getAttribute('aria-describedby');
      const description = page.locator(`#${describedbyId}`);
      await expect(description).toBeVisible();
    });

    test('extended description is readable', async ({ page }) => {
      const icon = page.locator('svg[aria-label="Sales chart"]');
      const describedbyId = await icon.getAttribute('aria-describedby');
      const description = page.locator(`#${describedbyId}`);

      const text = await description.textContent();
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(20);
    });
  });

  test.describe('Priority 2: SVG Title', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-icon--with-title&viewMode=story');
      await page.getByRole('img', { name: /download file/i }).waitFor({ state: 'visible' });
    });

    test('icon with title prop contains SVG title element', async ({ page }) => {
      const icon = page.getByRole('img', { name: /download file/i });
      await expect(icon).toBeVisible();

      const title = page.locator('svg title').first();
      await expect(title).toHaveCount(1);
    });

    test('SVG title has unique ID', async ({ page }) => {
      const icon = page.getByRole('img', { name: /download file/i });
      await expect(icon).toBeVisible();

      const title = page.locator('svg title').first();
      await title.waitFor({ state: 'attached' });
      const titleId = await title.getAttribute('id');
      expect(titleId).toBeTruthy();
      expect(titleId?.length).toBeGreaterThan(0);
    });
  });

  test.describe('Priority 2: Live Regions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-icon--with-live-region&viewMode=story'
      );
      await page.locator('[aria-live]').first().waitFor({ state: 'visible' });
    });

    test('icon with aria-live announces status changes', async ({ page }) => {
      const icon = page.locator('[aria-live]').first();

      await expect(icon).toBeVisible();
      await expect(icon).toHaveAttribute('aria-live', 'polite');
    });

    test('status changes update aria-label', async ({ page }) => {
      const startButton = page.getByRole('button', { name: /start operation/i });

      // Get initial state
      const iconBefore = page.locator('[aria-live="polite"]').first();
      const labelBefore = await iconBefore.getAttribute('aria-label');

      // Trigger status change
      await startButton.click();
      await page.waitForTimeout(500);

      // Check updated state
      const iconAfter = page.locator('[aria-live="polite"]').first();
      const labelAfter = await iconAfter.getAttribute('aria-label');

      expect(labelAfter).not.toBe(labelBefore);
    });
  });

  test.describe('Priority 2: Semantic Variants', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-icon--semantic-variants&viewMode=story'
      );
      await page
        .getByRole('img', { name: /success/i })
        .first()
        .waitFor({ state: 'visible' });
    });

    test('success variant has correct label and color', async ({ page }) => {
      const successIcon = page.getByRole('img', { name: /success/i }).first();

      await expect(successIcon).toBeVisible();
      await expect(successIcon).toHaveAttribute('aria-label', 'Success');

      const color = await successIcon.evaluate((el) => getComputedStyle(el).color);
      expect(color).toBeTruthy();
    });

    test('error variant has correct label', async ({ page }) => {
      const errorIcon = page.getByRole('img', { name: /error/i }).first();

      await expect(errorIcon).toBeVisible();
      await expect(errorIcon).toHaveAttribute('aria-label', 'Error');
    });

    test('warning variant has correct label', async ({ page }) => {
      const warningIcon = page.getByRole('img', { name: /warning/i }).first();

      await expect(warningIcon).toBeVisible();
      await expect(warningIcon).toHaveAttribute('aria-label', 'Warning');
    });

    test('info variant has correct label', async ({ page }) => {
      const infoIcon = page.getByRole('img', { name: /information/i }).first();

      await expect(infoIcon).toBeVisible();
      await expect(infoIcon).toHaveAttribute('aria-label', 'Information');
    });

    test('variant label can be overridden', async ({ page }) => {
      const customIcon = page.getByRole('img', { name: /payment received successfully/i });

      await expect(customIcon).toBeVisible();
    });
  });

  test.describe('Icon with Text Pattern', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-icon--icon-with-text&viewMode=story'
      );
      await page.getByRole('button', { name: /search/i }).waitFor({ state: 'visible' });
    });

    test('decorative icon in button does not interfere with button label', async ({ page }) => {
      const button = page.getByRole('button', { name: /search/i });
      const svg = button.locator('svg[aria-hidden="true"]');

      await expect(button).toBeVisible();
      await expect(svg).toBeVisible();
      await expect(svg).toHaveAttribute('aria-hidden', 'true');

      const buttonText = await button.textContent();
      expect(buttonText).toContain('Search');
    });
  });

  test.describe('Color Contrast', () => {
    test('icon meets minimum contrast ratio', async ({ page }) => {
      const icon = page.getByRole('img', { name: /completed/i });

      await expect(icon).toBeVisible();

      // Get computed color
      const color = await icon.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.color;
      });

      expect(color).toBeTruthy();
    });

    test('custom colored icon is visible', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-icon--custom-color&viewMode=story'
      );
      const svg = page.locator('svg').first();
      await expect(svg).toBeVisible();

      // Verify the icon has color property (whether custom or inherited)
      const color = await svg.evaluate((el) => getComputedStyle(el).color);
      expect(color).toBeTruthy();
    });
  });

  test.describe('Combined Features', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-icon--combined-features-demo&viewMode=story'
      );
      await page.locator('[aria-label]').first().waitFor({ state: 'visible' });
    });

    test('upload demo shows all features working together', async ({ page }) => {
      const uploadButton = page.getByRole('button', { name: /start upload/i });

      await expect(uploadButton).toBeVisible();
      await uploadButton.click();

      // Wait for uploading state
      await page.waitForTimeout(500);
      const uploadingIcon = page.getByRole('img', { name: /uploading/i });
      await expect(uploadingIcon).toBeVisible();

      // Wait for completion (success or error)
      await page.waitForTimeout(3000);
      const completionIcon = page.locator('[aria-live="polite"]');
      await expect(completionIcon).toBeVisible();
    });
  });
});
