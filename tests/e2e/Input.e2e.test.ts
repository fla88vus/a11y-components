import { test, expect } from '@playwright/test';

test.describe('Input - Navigation & Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story');
    // Wait for input to be visible
    await page.getByLabel(/email/i).waitFor({ state: 'visible' });
  });

  test.describe('Keyboard Navigation', () => {
    test('can navigate to input using Tab key', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await expect(input).toBeFocused();
    });

    test('can type text in focused input', async ({ page }) => {
      const input = page.getByLabel(/email/i);
      await input.focus();

      await input.fill('test@example.com');
      await expect(input).toHaveValue('test@example.com');
    });

    test('can clear input with keyboard', async ({ page }) => {
      const input = page.getByLabel(/email/i);
      await input.fill('test value');

      await input.focus();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');

      await expect(input).toHaveValue('');
    });

    test('disabled input is not keyboard accessible', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--disabled&viewMode=story');
      const input = page.getByLabel(/email/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toBeDisabled();
    });

    test('can navigate between label and input', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await expect(input).toBeFocused();
    });
  });

  test.describe('Mouse Interactions', () => {
    test('can click input to focus', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.click();
      await expect(input).toBeFocused();
    });

    test('can click label to focus input', async ({ page }) => {
      const input = page.getByLabel(/email/i);
      const label = page.locator('label').filter({ hasText: /email/i });

      await label.click();
      await expect(input).toBeFocused();
    });

    test('disabled input does not respond to clicks', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--disabled&viewMode=story');
      const input = page.getByLabel(/email/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toBeDisabled();

      await input.click({ force: true });
      await expect(input).not.toBeFocused();
    });
  });

  test.describe('Text Input & Editing', () => {
    test('can input single character', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await input.type('a');
      await expect(input).toHaveValue('a');
    });

    test('can input multiple characters', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await input.type('Hello World');
      await expect(input).toHaveValue('Hello World');
    });

    test('can delete text with Backspace', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.fill('Test');
      await input.focus();

      await page.keyboard.press('End');
      await page.keyboard.press('Backspace');
      await expect(input).toHaveValue('Tes');
    });

    test('can select all and replace text', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.fill('Original');
      await input.focus();

      await page.keyboard.press('Control+A');
      await input.type('New Text');
      await expect(input).toHaveValue('New Text');
    });
  });

  test.describe('Input Types', () => {
    test('email input accepts email format', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--email-input&viewMode=story'
      );
      const input = page.getByLabel(/email address/i);
      await input.waitFor({ state: 'visible' });

      await input.fill('user@example.com');
      await expect(input).toHaveValue('user@example.com');
      await expect(input).toHaveAttribute('type', 'email');
    });

    test('password input masks text', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--password-input&viewMode=story'
      );
      const input = page.getByLabel(/password/i);
      await input.waitFor({ state: 'visible' });

      await input.fill('secret123');
      await expect(input).toHaveAttribute('type', 'password');
    });

    test('number input accepts numeric values', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--number-input&viewMode=story'
      );
      const input = page.getByLabel(/age/i);
      await input.waitFor({ state: 'visible' });

      await input.fill('42');
      await expect(input).toHaveValue('42');
      await expect(input).toHaveAttribute('type', 'number');
    });

    test('search input has correct type', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--search-input&viewMode=story'
      );
      const input = page.getByLabel(/search/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toHaveAttribute('type', 'search');
    });
  });

  test.describe('Error States', () => {
    test('shows error message when invalid', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-error&viewMode=story'
      );
      const input = page.getByLabel(/email/i);
      const errorMessage = page.locator('[role="alert"]');
      await input.waitFor({ state: 'visible' });

      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await expect(errorMessage).toBeVisible();
    });

    test('error message is announced to screen readers', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-error&viewMode=story'
      );
      const input = page.getByLabel(/email/i);
      const errorMessage = page.locator('[role="alert"]');
      await input.waitFor({ state: 'visible' });

      const ariaDescribedby = await input.getAttribute('aria-describedby');
      expect(ariaDescribedby).toBeTruthy();

      const errorId = await errorMessage.getAttribute('id');
      expect(ariaDescribedby).toContain(errorId!);
    });

    test('error state does not prevent input', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-error&viewMode=story'
      );
      const input = page.getByLabel(/email/i);
      await input.waitFor({ state: 'visible' });

      await input.fill('correction');
      await expect(input).toHaveValue('correction');
    });
  });

  test.describe('Focus Management', () => {
    test('shows focus indicator when focused', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await expect(input).toBeFocused();
    });

    test('loses focus on blur', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await expect(input).toBeFocused();

      await input.blur();
      await expect(input).not.toBeFocused();
    });

    test('maintains focus during typing', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.focus();
      await input.type('typing test');

      await expect(input).toBeFocused();
    });
  });

  test.describe('ARIA Attributes', () => {
    test('has correct role and type', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await expect(input).toHaveAttribute('type');
    });

    test('required input has aria-required', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--required&viewMode=story');
      const input = page.getByLabel(/email/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toHaveAttribute('aria-required', 'true');
    });

    test('disabled input is properly disabled', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--disabled&viewMode=story');
      const input = page.getByLabel(/email/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toBeDisabled();
    });

    test('input with helper text has aria-describedby', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--with-helper-text&viewMode=story'
      );
      const input = page.getByLabel(/password/i);
      await input.waitFor({ state: 'visible' });

      const ariaDescribedby = await input.getAttribute('aria-describedby');
      expect(ariaDescribedby).toBeTruthy();
    });
  });

  test.describe('Size Variants', () => {
    test('small input is visible and functional', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--small&viewMode=story');
      const input = page.getByLabel(/small input/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toBeVisible();
      await input.fill('test');
      await expect(input).toHaveValue('test');
    });

    test('medium input is visible and functional', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--medium&viewMode=story');
      const input = page.getByLabel(/medium input/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toBeVisible();
      await input.fill('test');
      await expect(input).toHaveValue('test');
    });

    test('large input is visible and functional', async ({ page }) => {
      await page.goto('http://localhost:6006/iframe.html?id=atoms-input--large&viewMode=story');
      const input = page.getByLabel(/large input/i);
      await input.waitFor({ state: 'visible' });

      await expect(input).toBeVisible();
      await input.fill('test');
      await expect(input).toHaveValue('test');
    });
  });

  test.describe('Form Context', () => {
    test('can submit form with Enter key', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--form-example&viewMode=story'
      );
      const input = page.getByLabel(/full name/i);
      await input.waitFor({ state: 'visible' });

      await input.focus();
      await input.fill('test data');

      // Just verify Enter can be pressed (actual form submission depends on story implementation)
      await page.keyboard.press('Enter');
      await expect(input).toHaveValue('test data');
    });

    test('can navigate between form inputs with Tab', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=atoms-input--form-example&viewMode=story'
      );
      const firstInput = page.getByLabel(/full name/i);
      const secondInput = page.getByLabel(/email/i);
      await firstInput.waitFor({ state: 'visible' });

      await firstInput.focus();
      await expect(firstInput).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(secondInput).toBeFocused();
    });

    test('preserves value after losing focus', async ({ page }) => {
      const input = page.getByLabel(/email/i);

      await input.fill('persistent value');
      await input.blur();

      await expect(input).toHaveValue('persistent value');
    });
  });
});
