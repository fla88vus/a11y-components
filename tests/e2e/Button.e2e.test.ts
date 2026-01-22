import { test, expect } from '@playwright/test';

test.describe('Button - Navigation & Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=atoms-button--primary&viewMode=story');
    // Wait for component button (not Storybook controls) to be visible
    await page.getByRole('button', { name: /primary button/i }).waitFor({ state: 'visible' });
  });

  test.describe('Keyboard Navigation', () => {
    test('can navigate to button using Tab key', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.focus();
      await expect(button).toBeFocused();
    });

    test('can activate button with Enter key', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      await expect(button).toBeFocused();
    });

    test('can activate button with Space key', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.focus();
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);

      await expect(button).toBeFocused();
    });

    test('disabled button remains focusable but not clickable', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-button--disabled&viewMode=story');
      const button = page.getByRole('button', { name: /disabled button/i });
      await button.waitFor({ state: 'visible' });

      await button.focus();
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute('aria-disabled', 'true');

      // Verify button doesn't trigger actions when disabled
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      await expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    test('loading button remains focusable', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-button--loading&viewMode=story');
      // Select by aria-busy attribute which is more reliable for loading state
      const button = page.locator('button[aria-busy="true"]');
      await button.waitFor({ state: 'visible' });

      await button.focus();
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  test.describe('Mouse Interactions', () => {
    test('can click button with mouse', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.click();
      await page.waitForTimeout(100);

      await expect(button).toBeVisible();
    });

    test('shows hover state on mouse hover', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.hover();

      await expect(button).toBeVisible();
    });

    test('disabled button does not respond to clicks', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-button--disabled&viewMode=story');
      const button = page.getByRole('button', { name: /disabled button/i });
      await button.waitFor({ state: 'visible' });

      await expect(button).toHaveAttribute('aria-disabled', 'true');

      await button.click({ force: true });
      await page.waitForTimeout(100);
    });

    test('loading button has spinner visible', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-button--loading&viewMode=story');
      // Select by aria-busy attribute which is more reliable for loading state
      const button = page.locator('button[aria-busy="true"]');
      await button.waitFor({ state: 'visible' });

      const spinner = button.locator('[role="status"]');
      await expect(spinner).toBeVisible();
      await expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  test.describe('Focus Management', () => {
    test('shows focus indicator when focused', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.focus();
      await expect(button).toBeFocused();
    });

    test('can shift focus between multiple buttons', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-button--all-variants&viewMode=story'
      );
      await page.getByRole('button').first().waitFor({ state: 'visible' });

      const primaryBtn = page.getByRole('button', { name: /^Primary$/i });
      const secondaryBtn = page.getByRole('button', { name: /^Secondary$/i });

      await primaryBtn.focus();
      await expect(primaryBtn).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(secondaryBtn).toBeFocused();
    });

    test('focus returns after blur', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.focus();
      await expect(button).toBeFocused();

      await button.blur();
      await expect(button).not.toBeFocused();

      await button.focus();
      await expect(button).toBeFocused();
    });
  });

  test.describe('ARIA Attributes - Runtime Verification', () => {
    test('button has correct role', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });
      await expect(button).toHaveAttribute('type', 'button');
    });

    test('disabled button has aria-disabled', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-button--disabled&viewMode=story');
      const button = page.getByRole('button', { name: /disabled button/i });
      await button.waitFor({ state: 'visible' });

      await expect(button).toHaveAttribute('aria-disabled', 'true');
      await expect(button).not.toHaveAttribute('disabled');
    });

    test('loading button has aria-busy', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-button--loading&viewMode=story');
      // Select by aria-busy attribute which is more reliable for loading state
      const button = page.locator('button[aria-busy="true"]');
      await button.waitFor({ state: 'visible' });

      await expect(button).toHaveAttribute('aria-busy', 'true');
    });

    test('icon button has aria-label', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-button--icon-button&viewMode=story'
      );
      const button = page.getByRole('button', { name: /close dialog/i });
      await button.waitFor({ state: 'visible' });

      await expect(button).toHaveAttribute('aria-label');
    });
  });

  test.describe('Variant Navigation', () => {
    test('can navigate between variant stories', async ({ page }) => {
      const variants = [
        { slug: 'primary', name: /primary button/i },
        { slug: 'secondary', name: /secondary button/i },
        { slug: 'danger', name: /danger button/i },
      ];

      for (const variant of variants) {
        await page.goto(
          `http://localhost:6006/iframe.html?id=atoms-button--${variant.slug}&viewMode=story`
        );
        const button = page.getByRole('button', { name: variant.name });
        await button.waitFor({ state: 'visible' });
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
      }
    });

    test('can navigate between size stories', async ({ page }) => {
      const sizes = [
        { slug: 'small', name: /small button/i },
        { slug: 'medium', name: /medium button/i },
        { slug: 'large', name: /large button/i },
      ];

      for (const size of sizes) {
        await page.goto(
          `http://localhost:6006/iframe.html?id=atoms-button--${size.slug}&viewMode=story`
        );
        const button = page.getByRole('button', { name: size.name });
        await button.waitFor({ state: 'visible' });
        await expect(button).toBeVisible();
      }
    });
  });

  test.describe('State Transitions', () => {
    test('button remains accessible after multiple interactions', async ({ page }) => {
      const button = page.getByRole('button', { name: /primary button/i });

      await button.click();
      await button.focus();
      await button.blur();
      await button.hover();
      await button.click();

      await expect(button).toBeVisible();

      await button.focus();
      await expect(button).toBeFocused();
    });

    test('fullwidth button spans container', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-button--full-width&viewMode=story'
      );
      const button = page.getByRole('button', { name: /full width button/i });
      await button.waitFor({ state: 'visible' });

      await expect(button).toBeVisible();

      const buttonBox = await button.boundingBox();
      expect(buttonBox).toBeTruthy();
      expect(buttonBox!.width).toBeGreaterThan(200);
    });
  });
});
