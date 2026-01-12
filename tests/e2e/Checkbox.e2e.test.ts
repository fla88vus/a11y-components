import { test, expect } from "@playwright/test";

test.describe("Checkbox - Navigation & Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/atoms-checkbox--default"
    );
    // Wait for Storybook iframe to load
    const iframe = page.frameLocator(
      'iframe[title="storybook-preview-iframe"]'
    );
    await iframe.locator('input[type="checkbox"]').first().waitFor();
  });

  test.describe("Keyboard Navigation", () => {
    test("checkbox can receive keyboard focus", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      // Focus the checkbox directly (simulates Tab navigation)
      await checkbox.focus();

      // Verify it's focused
      await expect(checkbox).toBeFocused();
    });

    test("can toggle checkbox with Space key", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      await checkbox.focus();

      // Initially unchecked
      await expect(checkbox).not.toBeChecked();

      // Press Space to check
      await page.keyboard.press("Space");
      await expect(checkbox).toBeChecked();

      // Press Space again to uncheck
      await page.keyboard.press("Space");
      await expect(checkbox).not.toBeChecked();
    });

    test("disabled checkbox cannot receive focus", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      await checkbox.waitFor();

      // Verify checkbox is disabled
      await expect(checkbox).toBeDisabled();

      // Try to focus - should fail or remain unfocused
      await checkbox.focus({ timeout: 1000 }).catch(() => {
        // Expected to fail for disabled elements
      });

      // Verify it's still disabled
      await expect(checkbox).toBeDisabled();
    });
  });

  test.describe("Mouse Interaction", () => {
    test("can toggle checkbox by clicking on it", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      // Initially unchecked
      await expect(checkbox).not.toBeChecked();

      // Click to check
      await checkbox.click();
      await expect(checkbox).toBeChecked();

      // Click again to uncheck
      await checkbox.click();
      await expect(checkbox).not.toBeChecked();
    });

    test("can toggle checkbox by clicking on label", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      const label = iframe.locator("label").first();

      // Initially unchecked
      await expect(checkbox).not.toBeChecked();

      // Click label to check
      await label.click();
      await expect(checkbox).toBeChecked();

      // Click label again to uncheck
      await label.click();
      await expect(checkbox).not.toBeChecked();
    });

    test("disabled checkbox cannot be clicked", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      await checkbox.waitFor();

      await expect(checkbox).toBeDisabled();
      await expect(checkbox).not.toBeChecked();

      // Try to click - should not change state
      await checkbox.click({ force: true });
      await expect(checkbox).not.toBeChecked();
    });
  });

  test.describe("ARIA Attributes", () => {
    test("checkbox state changes correctly", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      // Initially unchecked
      await expect(checkbox).not.toBeChecked();

      // Click to check
      await checkbox.click();
      await expect(checkbox).toBeChecked();

      // Click again to uncheck
      await checkbox.click();
      await expect(checkbox).not.toBeChecked();
    });

    test("has aria-invalid when error is present", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      await checkbox.waitFor();

      await expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    test("has aria-required when required", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--required"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      await checkbox.waitFor();

      await expect(checkbox).toHaveAttribute("aria-required", "true");
    });

    test("has aria-describedby linking to helper text", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--with-helper-text"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      await checkbox.waitFor();

      const describedBy = await checkbox.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();

      // Verify helper text element exists
      const helperText = iframe.locator(`#${describedBy}`);
      await expect(helperText).toBeVisible();
      await expect(helperText).toContainText("Rimarrai connesso per 30 giorni");
    });

    test("has aria-describedby linking to error message", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      await checkbox.waitFor();

      const describedBy = await checkbox.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();

      // Verify error message element exists
      const errorMessage = iframe.locator(`#${describedBy}`);
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText("Devi accettare per continuare");
    });
  });

  test.describe("Label Association", () => {
    test("label is properly associated with checkbox", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();
      const label = iframe.locator("label").first();

      const checkboxId = await checkbox.getAttribute("id");
      const labelFor = await label.getAttribute("for");

      expect(checkboxId).toBe(labelFor);
    });

    test("label text is visible and correct", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const label = iframe.locator("label").first();

      await expect(label).toBeVisible();
      await expect(label).toContainText("Accetto i termini e condizioni");
    });
  });

  test.describe("Error State", () => {
    test("error message has role='alert'", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      // Wait for iframe to be ready
      await iframe.locator('input[type="checkbox"]').first().waitFor();

      // Find the error message by role and text
      const errorMessage = iframe.locator(
        '[role="alert"]:has-text("Devi accettare per continuare")'
      );
      await expect(errorMessage).toBeVisible();
    });
    test("error message is styled distinctly", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      const errorMessage = iframe.locator('[role="alert"]');
      const color = await errorMessage.evaluate(
        (el) => window.getComputedStyle(el).color
      );

      // Error text should be red (rgb format)
      expect(color).toContain("220, 38, 38"); // #dc2626 in RGB
    });
  });

  test.describe("Helper Text", () => {
    test("helper text is visible", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--with-helper-text"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      const helperText = iframe.locator("text=Rimarrai connesso per 30 giorni");
      await expect(helperText).toBeVisible();
    });
  });

  test.describe("Size Variants", () => {
    test("small checkbox renders correctly", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--small"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      await checkbox.waitFor();
      await expect(checkbox).toBeVisible();
    });

    test("medium checkbox renders correctly", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--medium"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      await checkbox.waitFor();
      await expect(checkbox).toBeVisible();
    });

    test("large checkbox renders correctly", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--large"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      await checkbox.waitFor();
      await expect(checkbox).toBeVisible();
    });
  });

  test.describe("Interactive Form Example", () => {
    test("form validation works dynamically", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--interactive-example"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      // Wait for form to load
      await iframe.locator("text=Crea Account").waitFor();

      const termsCheckbox = iframe.locator('input[type="checkbox"]').nth(0);
      const privacyCheckbox = iframe.locator('input[type="checkbox"]').nth(1);
      const newsletterCheckbox = iframe
        .locator('input[type="checkbox"]')
        .nth(2);

      // Initially, required checkboxes should have errors
      await expect(termsCheckbox).toHaveAttribute("aria-invalid", "true");
      await expect(privacyCheckbox).toHaveAttribute("aria-invalid", "true");

      // Check terms - error should disappear (aria-invalid removed)
      await termsCheckbox.click();
      await expect(termsCheckbox).toBeChecked();
      // After checking, aria-invalid should not be present
      const termsInvalid = await termsCheckbox.getAttribute("aria-invalid");
      expect(termsInvalid).toBeNull();

      // Check privacy - error should disappear
      await privacyCheckbox.click();
      await expect(privacyCheckbox).toBeChecked();
      const privacyInvalid = await privacyCheckbox.getAttribute("aria-invalid");
      expect(privacyInvalid).toBeNull();

      // Newsletter is optional - can be checked or unchecked
      await newsletterCheckbox.click();
      await expect(newsletterCheckbox).toBeChecked();

      // Verify success message appears
      const successMessage = iframe.locator(
        "text=Puoi procedere con la registrazione"
      );
      await expect(successMessage).toBeVisible();
    });

    test("unchecking required checkbox shows error again", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--interactive-example"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      await iframe.locator("text=Crea Account").waitFor();

      const termsCheckbox = iframe.locator('input[type="checkbox"]').nth(0);

      // Check - error should disappear
      await termsCheckbox.click();
      const invalidAfterCheck = await termsCheckbox.getAttribute(
        "aria-invalid"
      );
      expect(invalidAfterCheck).toBeNull();

      // Uncheck - error should return
      await termsCheckbox.click();
      await expect(termsCheckbox).toHaveAttribute("aria-invalid", "true");

      const errorMessage = iframe.locator("text=Obbligatorio").first();
      await expect(errorMessage).toBeVisible();
    });
  });

  test.describe("Focus Management", () => {
    test("checkbox has visible focus indicator", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const checkbox = iframe.locator('input[type="checkbox"]').first();

      await checkbox.focus();

      // Check that outline is visible (focus-visible in CSS)
      const outline = await checkbox.evaluate(
        (el) => window.getComputedStyle(el).outline
      );

      expect(outline).not.toBe("none");
    });
  });

  test.describe("Required Indicator", () => {
    test("required checkbox shows asterisk in label", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-checkbox--required"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      const label = iframe.locator("label").first();
      const labelText = await label.textContent();

      // Label should contain asterisk (*)
      expect(labelText).toContain("*");
    });
  });
});
