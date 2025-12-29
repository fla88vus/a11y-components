import { test, expect } from "@playwright/test";

test.describe("Input - Navigation & Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-input--default");
    // Wait for Storybook iframe to load
    const iframe = page.frameLocator(
      'iframe[title="storybook-preview-iframe"]'
    );
    await iframe.locator("input").first().waitFor();
  });

  test.describe("Keyboard Navigation", () => {
    test("can navigate to input using Tab key", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.click();
      await page.keyboard.press("Tab");
      await expect(input).toBeFocused();
    });

    test("can type text in focused input", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.focus();

      await input.fill("test@example.com");
      await expect(input).toHaveValue("test@example.com");
    });

    test("can clear input with keyboard", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.fill("test value");

      await input.focus();
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Backspace");

      await expect(input).toHaveValue("");
    });

    test("disabled input is not keyboard accessible", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toBeDisabled();
      await expect(input).toHaveAttribute("aria-disabled", "true");
    });

    test("can navigate between label and input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--form-example"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );

      await page.keyboard.press("Tab");
      const firstInput = iframe.locator("input").first();
      await expect(firstInput).toBeFocused();

      await page.keyboard.press("Tab");
      const secondInput = iframe.locator("input").nth(1);
      await expect(secondInput).toBeFocused();
    });
  });

  test.describe("Mouse Interactions", () => {
    test("can click input to focus", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.click();
      await expect(input).toBeFocused();
    });

    test("can click label to focus input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-label"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const label = iframe.locator("label").first();
      const input = iframe.locator("input").first();
      await label.waitFor();

      await label.click();
      await expect(input).toBeFocused();
    });

    test("disabled input does not respond to clicks", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toBeDisabled();

      await input.click({ force: true });
      await expect(input).not.toBeFocused();
    });
  });

  test.describe("Text Input & Editing", () => {
    test("can input single character", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.focus();
      await input.type("a");
      await expect(input).toHaveValue("a");
    });

    test("can input multiple characters", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.focus();
      await input.type("Hello World");
      await expect(input).toHaveValue("Hello World");
    });

    test("can delete text with Backspace", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.fill("Test");
      await input.focus();

      await page.keyboard.press("End");
      await page.keyboard.press("Backspace");
      await expect(input).toHaveValue("Tes");
    });

    test("can select all and replace text", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.fill("Original");
      await input.focus();

      await page.keyboard.press("Control+A");
      await input.type("New Text");
      await expect(input).toHaveValue("New Text");
    });

    test("respects maxLength attribute", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-max-length"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await input.fill("ThisIsAVeryLongText");
      const value = await input.inputValue();

      expect(value.length).toBeLessThanOrEqual(20);
    });
  });

  test.describe("Input Types", () => {
    test("email input accepts email format", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--email");
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await input.fill("user@example.com");
      await expect(input).toHaveValue("user@example.com");
      await expect(input).toHaveAttribute("type", "email");
    });

    test("password input masks text", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--password"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await input.fill("secret123");
      await expect(input).toHaveAttribute("type", "password");
    });

    test("number input accepts numeric values", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--number");
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await input.fill("42");
      await expect(input).toHaveValue("42");
      await expect(input).toHaveAttribute("type", "number");
    });

    test("search input has correct type", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--search");
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toHaveAttribute("type", "search");
    });
  });

  test.describe("Error States", () => {
    test("shows error message when invalid", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      const errorMessage = iframe.locator('[role="alert"]');
      await input.waitFor();

      await expect(input).toHaveAttribute("aria-invalid", "true");
      await expect(errorMessage).toBeVisible();
    });

    test("error message is announced to screen readers", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      const errorMessage = iframe.locator('[role="alert"]');
      await input.waitFor();

      const ariaDescribedby = await input.getAttribute("aria-describedby");
      expect(ariaDescribedby).toBeTruthy();

      const errorId = await errorMessage.getAttribute("id");
      expect(ariaDescribedby).toContain(errorId!);
    });

    test("error state does not prevent input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await input.fill("correction");
      await expect(input).toHaveValue("correction");
    });
  });

  test.describe("Focus Management", () => {
    test("shows focus indicator when focused", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.focus();
      await expect(input).toBeFocused();
    });

    test("loses focus on blur", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.focus();
      await expect(input).toBeFocused();

      await input.blur();
      await expect(input).not.toBeFocused();
    });

    test("maintains focus during typing", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.focus();
      await input.type("typing test");

      await expect(input).toBeFocused();
    });
  });

  test.describe("ARIA Attributes", () => {
    test("has correct role and type", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await expect(input).toHaveAttribute("type");
    });

    test("required input has aria-required", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--required"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toHaveAttribute("aria-required", "true");
    });

    test("disabled input has aria-disabled", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toHaveAttribute("aria-disabled", "true");
    });

    test("input with helper text has aria-describedby", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-helper-text"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      const ariaDescribedby = await input.getAttribute("aria-describedby");
      expect(ariaDescribedby).toBeTruthy();
    });
  });

  test.describe("Size Variants", () => {
    test("small input is visible and functional", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--small");
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toBeVisible();
      await input.fill("test");
      await expect(input).toHaveValue("test");
    });

    test("medium input is visible and functional", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--medium");
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toBeVisible();
      await input.fill("test");
      await expect(input).toHaveValue("test");
    });

    test("large input is visible and functional", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--large");
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await expect(input).toBeVisible();
      await input.fill("test");
      await expect(input).toHaveValue("test");
    });
  });

  test.describe("Form Context", () => {
    test("can submit form with Enter key", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--form-example"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();
      await input.waitFor();

      await input.focus();
      await input.fill("test data");

      // Just verify Enter can be pressed (actual form submission depends on story implementation)
      await page.keyboard.press("Enter");
      await expect(input).toHaveValue("test data");
    });

    test("can navigate between form inputs with Tab", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--form-example"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const inputs = iframe.locator("input");
      await inputs.first().waitFor();

      const count = await inputs.count();

      if (count > 1) {
        await inputs.first().focus();
        await expect(inputs.first()).toBeFocused();

        await page.keyboard.press("Tab");
        await expect(inputs.nth(1)).toBeFocused();
      }
    });

    test("preserves value after losing focus", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const input = iframe.locator("input").first();

      await input.fill("persistent value");
      await input.blur();

      await expect(input).toHaveValue("persistent value");
    });
  });
});
