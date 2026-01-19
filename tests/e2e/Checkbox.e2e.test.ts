import { test, expect } from "@playwright/test";

test.describe("Checkbox - E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Increase timeout and use more forgiving wait conditions
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--default",
      { waitUntil: "domcontentloaded", timeout: 15000 }
    );

    // Wait for checkbox to be visible
    await page
      .locator('input[type="checkbox"]')
      .first()
      .waitFor({ timeout: 10000 });
  });

  test("checkbox can be toggled with click", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();

    await expect(checkbox).not.toBeChecked();

    await checkbox.click();
    await expect(checkbox).toBeChecked();

    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test("checkbox can be toggled with Space key", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();

    await checkbox.focus();
    await expect(checkbox).not.toBeChecked();

    await page.keyboard.press("Space");
    await expect(checkbox).toBeChecked();

    await page.keyboard.press("Space");
    await expect(checkbox).not.toBeChecked();
  });

  test("checkbox can receive keyboard focus", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();

    await checkbox.focus();
    await expect(checkbox).toBeFocused();
  });

  test("label is properly associated with checkbox", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    const label = page.locator("label").first();

    const checkboxId = await checkbox.getAttribute("id");
    const labelFor = await label.getAttribute("for");

    expect(checkboxId).toBe(labelFor);
  });

  test("clicking label toggles checkbox", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    const label = page.locator("label").first();

    await expect(checkbox).not.toBeChecked();

    await label.click();
    await expect(checkbox).toBeChecked();

    await label.click();
    await expect(checkbox).not.toBeChecked();
  });

  test("disabled checkbox - cannot be toggled", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--disabled",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();

    await expect(checkbox).toBeDisabled();
    await expect(checkbox).not.toBeChecked();

    await checkbox.click({ force: true });
    await expect(checkbox).not.toBeChecked();
  });

  test("required checkbox - has aria-required attribute", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--required",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();

    await expect(checkbox).toHaveAttribute("aria-required", "true");
    await expect(checkbox).toHaveAttribute("required");
  });

  test("error state - has aria-invalid attribute", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--with-error",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();

    await expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });

  test("error message has role=alert", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--with-error",
      { waitUntil: "domcontentloaded" }
    );

    await page.locator('input[type="checkbox"]').first().waitFor();
    const alert = page.locator('[role="alert"]');

    await expect(alert).toBeVisible();
    await expect(alert).toContainText("Devi accettare per continuare");
  });

  test("helper text is linked via aria-describedby", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--with-helper-text",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();

    const describedBy = await checkbox.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const helperText = page.locator(`#${describedBy}`);
    await expect(helperText).toBeVisible();
  });

  test("indeterminate state - has aria-checked=mixed", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--indeterminate",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();

    await expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  test("indeterminate checkbox can be toggled", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--indeterminate",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();

    await checkbox.click();
    await expect(checkbox).toBeChecked();

    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
  });

  test("small size renders correctly", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--small",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();
    await expect(checkbox).toBeVisible();
  });

  test("large size renders correctly", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--large",
      { waitUntil: "domcontentloaded" }
    );

    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.waitFor();
    await expect(checkbox).toBeVisible();
  });

  test("required indicator shows asterisk", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-checkbox--required",
      { waitUntil: "domcontentloaded" }
    );

    const label = page.locator("label").first();
    const labelText = await label.textContent();

    expect(labelText).toContain("*");
  });

  test("focus indicator is visible", async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();

    await checkbox.focus();

    const outline = await checkbox.evaluate(
      (el) => window.getComputedStyle(el).outline
    );

    expect(outline).not.toBe("none");
  });
});
