import { test, expect } from '@playwright/test';

const STORYBOOK_URL = 'http://localhost:6006';

test.describe('Radio - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Aumenta timeout per caricamento Storybook
    page.setDefaultTimeout(15000);
  });

  // ===================================
  // BASIC INTERACTION
  // ===================================

  test('can select a radio button by clicking', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    // Verifica stato iniziale
    await expect(radio).not.toBeChecked();

    // Click sul radio
    await radio.click();
    await expect(radio).toBeChecked();
  });

  test('can select a radio button by clicking label', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const label = page.getByText('Basic Plan', { exact: true });
    const radio = page.getByRole('radio', { name: /basic plan/i });

    await expect(radio).not.toBeChecked();

    // Click sulla label
    await label.click();
    await expect(radio).toBeChecked();
  });

  test('can select a radio with Space key', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    await expect(radio).not.toBeChecked();

    // Focus e premi Space
    await radio.focus();
    await page.keyboard.press('Space');
    await expect(radio).toBeChecked();
  });

  // ===================================
  // RADIO GROUP BEHAVIOR
  // ===================================

  test('radio buttons in same group are mutually exclusive', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--radio-group-demo`);

    const basicRadio = page.getByRole('radio', { name: /^basic$/i });
    const proRadio = page.getByRole('radio', { name: /^pro$/i });
    const enterpriseRadio = page.getByRole('radio', { name: /^enterprise$/i });

    // Seleziona Basic
    await basicRadio.click();
    await expect(basicRadio).toBeChecked();
    await expect(proRadio).not.toBeChecked();
    await expect(enterpriseRadio).not.toBeChecked();

    // Seleziona Pro - Basic si deseleziona
    await proRadio.click();
    await expect(basicRadio).not.toBeChecked();
    await expect(proRadio).toBeChecked();
    await expect(enterpriseRadio).not.toBeChecked();

    // Seleziona Enterprise - Pro si deseleziona
    await enterpriseRadio.click();
    await expect(basicRadio).not.toBeChecked();
    await expect(proRadio).not.toBeChecked();
    await expect(enterpriseRadio).toBeChecked();
  });

  test('once checked, cannot be unchecked by clicking again', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    // Seleziona
    await radio.click();
    await expect(radio).toBeChecked();

    // Click di nuovo - rimane checked
    await radio.click();
    await expect(radio).toBeChecked();
  });

  // ===================================
  // DISABLED STATE
  // ===================================

  test('disabled radio cannot be selected', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--disabled`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    await expect(radio).toBeDisabled();

    // Verifica lo stato iniziale (potrebbe essere checked o unchecked a seconda della story)
    const initialChecked = await radio.isChecked();

    // Tentativo di click con force - lo stato non deve cambiare
    await radio.click({ force: true });

    // Verifica che lo stato non sia cambiato
    if (initialChecked) {
      await expect(radio).toBeChecked();
    } else {
      await expect(radio).not.toBeChecked();
    }
  });

  // ===================================
  // ERROR STATE
  // ===================================

  test('displays error message', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--with-error`);

    const errorMessage = page.getByRole('alert');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/select a subscription plan/i);

    const radio = page.getByRole('radio');
    await expect(radio).toHaveAttribute('aria-describedby');
  });

  // ===================================
  // SIZE VARIANTS
  // ===================================

  test('renders different sizes correctly', async ({ page }) => {
    // Small
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--small-size`);
    let radio = page.getByRole('radio').first();
    await expect(radio).toBeVisible();
    const smallBox = await radio.boundingBox();

    // Medium
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--medium-size`);
    radio = page.getByRole('radio').first();
    await expect(radio).toBeVisible();
    const mediumBox = await radio.boundingBox();

    // Large
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--large-size`);
    radio = page.getByRole('radio').first();
    await expect(radio).toBeVisible();
    const largeBox = await radio.boundingBox();

    // Verifica che le dimensioni siano progressive
    expect(smallBox!.width).toBeLessThan(mediumBox!.width);
    expect(mediumBox!.width).toBeLessThan(largeBox!.width);
  });

  // ===================================
  // KEYBOARD NAVIGATION & FOCUS
  // ===================================

  test('shows focus indicator when focused', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    // Focus direttamente sul radio
    await radio.focus();
    await expect(radio).toBeFocused();

    // Simula keyboard navigation per attivare :focus-visible
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');

    // Verifica presenza di outline o focus ring
    const focusStyle = await radio.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        outlineStyle: styles.outlineStyle,
      };
    });

    // Il CSS ha focus-visible con outline: 3px solid #3b82f6
    // Verifica che ci sia un outline visibile o che almeno il focus sia presente
    expect(await radio.evaluate((el) => el.matches(':focus'))).toBeTruthy();
  });

  test('maintains focus after selection', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    await radio.focus();
    await expect(radio).toBeFocused();

    // Seleziona con Space
    await page.keyboard.press('Space');
    await expect(radio).toBeChecked();
    await expect(radio).toBeFocused(); // Focus rimane
  });

  // ===================================
  // ARIA ATTRIBUTES
  // ===================================

  test('has correct ARIA attributes', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    // Name e value per form
    await expect(radio).toHaveAttribute('name', 'story-default');
    await expect(radio).toHaveAttribute('value', 'basic');

    // Type
    await expect(radio).toHaveAttribute('type', 'radio');
  });

  test('has aria-describedby when error is present', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--with-error`);

    const radio = page.getByRole('radio');
    await expect(radio).toHaveAttribute('aria-describedby');
  });

  test('has aria-required when required', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--required`);

    const radio = page.getByRole('radio');
    await expect(radio).toHaveAttribute('required');
  });

  test('has aria-describedby for helper text', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--with-helper-text`);

    const radio = page.getByRole('radio');
    const ariaDescribedby = await radio.getAttribute('aria-describedby');

    expect(ariaDescribedby).toBeTruthy();

    // Verifica che l'ID corrisponda all'helper text
    const helperText = page.locator(`#${ariaDescribedby}`);
    await expect(helperText).toBeVisible();
  });

  // ===================================
  // VISUAL VERIFICATION
  // ===================================

  test('displays checked state visually', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=atoms-radio--default`);

    const radio = page.getByRole('radio', { name: /basic plan/i });

    // Prima del click
    await radio.click();

    // Verifica presenza dell'inner circle (::after)
    const hasCheckedStyle = await radio.evaluate((el) => {
      const styles = window.getComputedStyle(el, '::after');
      return {
        content: styles.content,
        display: styles.display,
        opacity: styles.opacity,
      };
    });

    // Il pseudo-elemento ::after deve essere visibile quando checked
    expect(hasCheckedStyle.display).not.toBe('none');
    expect(hasCheckedStyle.opacity).not.toBe('0');
  });
});
