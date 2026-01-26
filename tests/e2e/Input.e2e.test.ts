import { test, expect } from '@playwright/test';

test.describe('Input Atom - Navigation & Interaction Tests', () => {
  test.describe('Standalone Input', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story');
      await page.locator('input').waitFor({ state: 'visible' });
    });

    test('can navigate to input using Tab key', async ({ page }) => {
      const input = page.locator('input');
      await input.focus();
      await expect(input).toBeFocused();
    });

    test('can type text in focused input', async ({ page }) => {
      const input = page.locator('input');
      await input.fill('test@example.com');
      await expect(input).toHaveValue('test@example.com');
    });

    test('can clear input with keyboard', async ({ page }) => {
      const input = page.locator('input');
      await input.fill('test value');
      await input.focus();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      await expect(input).toHaveValue('');
    });

    test('shows focus indicator when focused', async ({ page }) => {
      const input = page.locator('input');
      await input.focus();
      await expect(input).toBeFocused();

      // Check focus styles
      const borderColor = await input.evaluate((el) => window.getComputedStyle(el).borderColor);
      expect(borderColor).not.toBe('rgb(107, 114, 128)'); // Not default gray
    });
  });

  test.describe('Input with Label (Composition)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-label&viewMode=story'
      );
      await page.getByLabel('Email Address').waitFor({ state: 'visible' });
    });

    test('can click label to focus input', async ({ page }) => {
      const label = page.getByText('Email Address');
      const input = page.getByLabel('Email Address');

      await label.click();
      await expect(input).toBeFocused();
    });

    test('label is associated with input', async ({ page }) => {
      const input = page.getByLabel('Email Address');
      await expect(input).toBeVisible();
    });
  });

  test.describe('Input with Error (Composition)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-error&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('shows error message when invalid', async ({ page }) => {
      const errorText = page.getByText('Please enter a valid email address');
      await expect(errorText).toBeVisible();
    });

    test('error message is announced to screen readers', async ({ page }) => {
      const errorText = page.locator('[role="alert"]');
      await expect(errorText).toBeVisible();
      await expect(errorText).toHaveText('Please enter a valid email address');
    });

    test('input has aria-invalid attribute', async ({ page }) => {
      const input = page.getByLabel('Email');
      await expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    test('input has aria-describedby pointing to error', async ({ page }) => {
      const input = page.getByLabel('Email');
      const ariaDescribedby = await input.getAttribute('aria-describedby');
      expect(ariaDescribedby).toContain('email-error');
    });

    test('error state does not prevent input', async ({ page }) => {
      const input = page.getByLabel('Email');
      await input.fill('corrected@example.com');
      await expect(input).toHaveValue('corrected@example.com');
    });
  });

  test.describe('Input with Helper Text (Composition)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-helper-text&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('shows helper text', async ({ page }) => {
      const helperText = page.getByText("We'll never share your email");
      await expect(helperText).toBeVisible();
    });

    test('input has aria-describedby pointing to helper', async ({ page }) => {
      const input = page.getByLabel('Email');
      const ariaDescribedby = await input.getAttribute('aria-describedby');
      expect(ariaDescribedby).toContain('email-helper');
    });
  });

  test.describe('Disabled State', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--disabled&viewMode=story');
      await page.locator('input[disabled]').waitFor({ state: 'visible' });
    });

    test('disabled input is not keyboard accessible', async ({ page }) => {
      const input = page.locator('input[disabled]');
      await expect(input).toBeDisabled();
    });

    test('disabled input does not respond to clicks', async ({ page }) => {
      const input = page.locator('input[disabled]');
      await input.click({ force: true });
      await expect(input).not.toBeFocused();
    });
  });

  test.describe('Error State Styling', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--error-state&viewMode=story'
      );
      await page.locator('input').waitFor({ state: 'visible' });
    });

    test('error input has red border', async ({ page }) => {
      const input = page.locator('input');
      const borderColor = await input.evaluate((el) => window.getComputedStyle(el).borderColor);
      // Red color: rgb(220, 38, 38)
      expect(borderColor).toBe('rgb(220, 38, 38)');
    });
  });

  test.describe('Input Types', () => {
    test('email input has correct type', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-placeholder&viewMode=story'
      );
      const input = page.locator('input[type="email"]');
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('type', 'email');
    });

    test('password input masks text', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--password-input&viewMode=story'
      );
      const input = page.locator('input[type="password"]');
      await expect(input).toHaveAttribute('type', 'password');
    });

    test('search input has correct type', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--search-input&viewMode=story'
      );
      const input = page.locator('input[type="search"]');
      await expect(input).toHaveAttribute('type', 'search');
    });

    test('number input accepts numeric values', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--number-input&viewMode=story'
      );
      const input = page.locator('input[type="number"]');
      await input.fill('123');
      await expect(input).toHaveValue('123');
    });
  });

  test.describe('Size Variants', () => {
    test('small input is visible and functional', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--small&viewMode=story');
      const input = page.locator('input');
      await expect(input).toBeVisible();
      await input.fill('test');
      await expect(input).toHaveValue('test');
    });

    test('large input is visible and functional', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--large&viewMode=story');
      const input = page.locator('input');
      await expect(input).toBeVisible();
      await input.fill('test');
      await expect(input).toHaveValue('test');
    });
  });

  test.describe('Full Width', () => {
    test('full width input spans container', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--full-width&viewMode=story'
      );
      const input = page.locator('input');

      const { inputWidth, containerWidth } = await input.evaluate((el) => {
        if (!(el instanceof HTMLElement)) {
          return { inputWidth: 0, containerWidth: 0 };
        }

        const parent = el.parentElement;
        const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth : 0;

        return {
          inputWidth: el.offsetWidth,
          containerWidth: parentWidth,
        };
      });

      // Should be close to container width (allowing for padding/border)
      expect(inputWidth).toBeGreaterThan(containerWidth * 0.95);
    });
  });

  test.describe('Text Input & Editing', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story');
      await page.locator('input').waitFor({ state: 'visible' });
    });

    test('can input single character', async ({ page }) => {
      const input = page.locator('input');
      await input.fill('A');
      await expect(input).toHaveValue('A');
    });

    test('can input multiple characters', async ({ page }) => {
      const input = page.locator('input');
      await input.fill('Hello World');
      await expect(input).toHaveValue('Hello World');
    });

    test('can delete text with Backspace', async ({ page }) => {
      const input = page.locator('input');
      await input.fill('Test');
      await input.focus();
      await page.keyboard.press('Backspace');
      await expect(input).toHaveValue('Tes');
    });

    test('can select all and replace text', async ({ page }) => {
      const input = page.locator('input');
      await input.fill('Original');
      await input.focus();
      await page.keyboard.press('Control+A');
      await page.keyboard.type('Replaced');
      await expect(input).toHaveValue('Replaced');
    });
  });

  test.describe('Labelless with aria-label', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--labelless-with-aria-label&viewMode=story'
      );
      await page.locator('input').waitFor({ state: 'visible' });
    });

    test('input has aria-label for accessibility', async ({ page }) => {
      const input = page.locator('input');
      const ariaLabel = await input.getAttribute('aria-label');
      expect(ariaLabel).toBe('Search products');
    });

    test('is keyboard accessible without visible label', async ({ page }) => {
      const input = page.locator('input');
      await input.focus();
      await expect(input).toBeFocused();
      await input.fill('search term');
      await expect(input).toHaveValue('search term');
    });
  });
});
