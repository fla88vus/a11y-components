import { test, expect } from '@playwright/test';

test.describe('FormField Molecule - E2E Tests', () => {
  test.describe('Basic Rendering', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--default&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('renders label and input', async ({ page }) => {
      const label = page.getByText('Email');
      const input = page.getByLabel('Email');

      await expect(label).toBeVisible();
      await expect(input).toBeVisible();
    });

    test('label is associated with input', async ({ page }) => {
      const label = page.getByText('Email');
      const input = page.getByLabel('Email');

      // Click label should focus input
      await label.click();
      await expect(input).toBeFocused();
    });

    test('can type in input', async ({ page }) => {
      const input = page.getByLabel('Email');

      await input.fill('test@example.com');
      await expect(input).toHaveValue('test@example.com');
    });
  });

  test.describe('Required Field', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--required&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('shows required indicator (*)', async ({ page }) => {
      const requiredIndicator = page.locator('[aria-label="required"]');
      await expect(requiredIndicator).toBeVisible();
    });

    test('input has aria-required attribute', async ({ page }) => {
      const input = page.getByLabel('Email');
      await expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  test.describe('Helper Text', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-helper-text&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('displays helper text', async ({ page }) => {
      const helperText = page.getByText("We'll never share your email with anyone else");
      await expect(helperText).toBeVisible();
    });

    test('input is described by helper text', async ({ page }) => {
      const input = page.getByLabel('Email');
      const ariaDescribedby = await input.getAttribute('aria-describedby');

      expect(ariaDescribedby).toBeTruthy();

      const helperText = page.locator(`#${ariaDescribedby}`);
      await expect(helperText).toBeVisible();
    });
  });

  test.describe('Error State', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-error&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('displays error message', async ({ page }) => {
      const errorText = page.getByText('Please enter a valid email address');
      await expect(errorText).toBeVisible();
    });

    test('error has role="alert"', async ({ page }) => {
      const errorAlert = page.locator('[role="alert"]');
      await expect(errorAlert).toBeVisible();
      await expect(errorAlert).toHaveText(/Please enter a valid email address/);
    });

    test('input has aria-invalid attribute', async ({ page }) => {
      const input = page.getByLabel('Email');
      await expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    test('input is described by error', async ({ page }) => {
      const input = page.getByLabel('Email');
      const ariaDescribedby = await input.getAttribute('aria-describedby');

      expect(ariaDescribedby).toBeTruthy();

      const errorText = page.locator(`#${ariaDescribedby}`);
      await expect(errorText).toHaveText(/Please enter a valid email address/);
    });

    test('input has error styling', async ({ page }) => {
      const input = page.getByLabel('Email');

      // Check border color is red
      const borderColor = await input.evaluate((el) => window.getComputedStyle(el).borderColor);

      expect(borderColor).toBe('rgb(220, 38, 38)'); // Red color
    });

    test('error does not prevent typing', async ({ page }) => {
      const input = page.getByLabel('Email');

      await input.fill('corrected@example.com');
      await expect(input).toHaveValue('corrected@example.com');
    });
  });

  test.describe('Helper Text with Error', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-helper-and-error&viewMode=story'
      );
      await page.getByLabel('Password').waitFor({ state: 'visible' });
    });

    test('shows error and hides helper text', async ({ page }) => {
      const errorText = page.getByText('Password is too short');
      const helperText = page.getByText('Must be at least 8 characters');

      await expect(errorText).toBeVisible();
      await expect(helperText).not.toBeVisible();
    });
  });

  test.describe('Hidden Label', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--hidden-label&viewMode=story'
      );
      await page.getByLabel('Search').waitFor({ state: 'visible' });
    });

    test('label exists but is visually hidden', async ({ page }) => {
      const label = page.getByText('Search');

      // Label should exist in DOM
      await expect(label).toBeAttached();

      // Check if it has visually hidden styles
      const position = await label.evaluate((el) => window.getComputedStyle(el).position);
      expect(position).toBe('absolute');

      const width = await label.evaluate((el) => window.getComputedStyle(el).width);
      expect(width).toBe('1px');
    });

    test('input is still accessible via aria', async ({ page }) => {
      const input = page.getByLabel('Search');
      await expect(input).toBeVisible();

      await input.fill('search term');
      await expect(input).toHaveValue('search term');
    });
  });

  test.describe('Size Variants', () => {
    test('small input is functional', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--small-input&viewMode=story'
      );
      const input = page.getByLabel('Username');

      await input.waitFor({ state: 'visible' });
      await input.fill('testuser');
      await expect(input).toHaveValue('testuser');
    });

    test('large input is functional', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--large-input&viewMode=story'
      );
      const input = page.getByLabel('Title');

      await input.waitFor({ state: 'visible' });
      await input.fill('Large Title');
      await expect(input).toHaveValue('Large Title');
    });

    test('full width input spans container', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--full-width-input&viewMode=story'
      );
      const input = page.getByLabel('Description');

      await input.waitFor({ state: 'visible' });

      const { inputWidth, containerWidth } = await input.evaluate((el) => {
        // Type guard per HTMLElement
        if (!(el instanceof HTMLElement)) {
          return { inputWidth: 0, containerWidth: 0 };
        }

        const parent = el.parentElement?.parentElement;
        const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth : 0;

        return {
          inputWidth: el.offsetWidth,
          containerWidth: parentWidth,
        };
      });

      expect(inputWidth).toBeGreaterThan(containerWidth * 0.9);
    });
  });

  test.describe('Different Field Types', () => {
    test('works with select element', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-select&viewMode=story'
      );

      const select = page.getByLabel('Country');
      await select.waitFor({ state: 'visible' });

      await select.selectOption('us');
      await expect(select).toHaveValue('us');
    });

    test('works with textarea', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-textarea&viewMode=story'
      );

      const textarea = page.getByLabel('Message');
      await textarea.waitFor({ state: 'visible' });

      await textarea.fill('This is a test message');
      await expect(textarea).toHaveValue('This is a test message');
    });
  });

  test.describe('Disabled Field', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--disabled-field&viewMode=story'
      );
      await page.locator('input[disabled]').waitFor({ state: 'visible' });
    });

    test('input is disabled', async ({ page }) => {
      const input = page.locator('input[disabled]');
      await expect(input).toBeDisabled();
    });

    test('cannot type in disabled input', async ({ page }) => {
      const input = page.locator('input[disabled]');

      await input.click({ force: true });
      await page.keyboard.type('test');

      // Value should remain unchanged
      await expect(input).toHaveValue('Cannot edit');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--default&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('can tab to input', async ({ page }) => {
      const input = page.getByLabel('Email');

      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
    });

    test('shows focus indicator', async ({ page }) => {
      const input = page.getByLabel('Email');

      await input.focus();
      await expect(input).toBeFocused();

      // Check focus styles
      const borderColor = await input.evaluate((el) => window.getComputedStyle(el).borderColor);

      expect(borderColor).not.toBe('rgb(107, 114, 128)'); // Not default gray
    });
  });

  test.describe('Form Composition', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--form-example&viewMode=story'
      );
      await page.getByLabel('First Name').waitFor({ state: 'visible' });
    });

    test('renders multiple fields', async ({ page }) => {
      await expect(page.getByLabel('First Name')).toBeVisible();
      await expect(page.getByLabel('Last Name')).toBeVisible();
      await expect(page.getByLabel('Email')).toBeVisible();
      await expect(page.getByLabel('Password')).toBeVisible();
      await expect(page.getByLabel('Country')).toBeVisible();
    });

    test('can fill all fields', async ({ page }) => {
      await page.getByLabel('First Name').fill('John');
      await page.getByLabel('Last Name').fill('Doe');
      await page.getByLabel('Email').fill('john@example.com');
      await page.getByLabel('Password').fill('SecurePass123');
      await page.getByLabel('Country').selectOption('USA');

      await expect(page.getByLabel('First Name')).toHaveValue('John');
      await expect(page.getByLabel('Last Name')).toHaveValue('Doe');
      await expect(page.getByLabel('Email')).toHaveValue('john@example.com');
      await expect(page.getByLabel('Password')).toHaveValue('SecurePass123');
      await expect(page.getByLabel('Country')).toHaveValue('USA');
    });

    test('can navigate between fields with Tab', async ({ page }) => {
      await page.getByLabel('First Name').focus();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Last Name')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Email')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Password')).toBeFocused();
    });
  });

  test.describe('Custom Props', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-custom-props&viewMode=story'
      );
      await page.getByLabel('Email').waitFor({ state: 'visible' });
    });

    test('preserves custom props like placeholder', async ({ page }) => {
      const input = page.getByLabel('Email');

      await expect(input).toHaveAttribute('placeholder', 'email@company.com');
    });

    test('preserves custom props like autoComplete', async ({ page }) => {
      const input = page.getByLabel('Email');

      await expect(input).toHaveAttribute('autocomplete', 'email');
    });
  });

  test.describe('ARIA Associations', () => {
    test('all ARIA IDs are unique in form', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--form-example&viewMode=story'
      );
      await page.getByLabel('First Name').waitFor({ state: 'visible' });

      const inputs = await page.locator('input, select, textarea').all();
      const ids = await Promise.all(inputs.map((input) => input.getAttribute('id')));

      // Check all IDs are unique
      const uniqueIds = new Set(ids.filter((id) => id !== null));
      expect(uniqueIds.size).toBe(ids.filter((id) => id !== null).length);
    });

    test('aria-describedby points to existing elements', async ({ page }) => {
      await page.goto(
        'http://localhost:6006/iframe.html?id=molecules-formfield--with-helper-text&viewMode=story'
      );

      const input = page.getByLabel('Email');
      const describedby = await input.getAttribute('aria-describedby');

      if (describedby) {
        const describedElements = await page.locator(`#${describedby}`).count();
        expect(describedElements).toBeGreaterThan(0);
      }
    });
  });
});
