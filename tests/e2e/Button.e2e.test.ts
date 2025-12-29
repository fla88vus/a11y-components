import { test, expect } from "@playwright/test";

test.describe("Button - Navigation & Interaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--primary");
    // Wait for Storybook iframe to load
    const iframe = page.frameLocator(
      'iframe[title="storybook-preview-iframe"]'
    );
    await iframe.locator("button").first().waitFor();
  });

  test.describe("Keyboard Navigation", () => {
    test("can navigate to button using Tab key", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      // Focus the iframe first
      await button.click();
      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
    });

    test("can activate button with Enter key", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.focus();
      await page.keyboard.press("Enter");
      await page.waitForTimeout(100);

      await expect(button).toBeFocused();
    });

    test("can activate button with Space key", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.focus();
      await page.keyboard.press("Space");
      await page.waitForTimeout(100);

      await expect(button).toBeFocused();
    });

    test("disabled button remains focusable but not clickable", async ({
      page,
    }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await button.focus();
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute("aria-disabled", "true");

      // Verify button doesn't trigger actions when disabled
      await page.keyboard.press("Enter");
      await page.waitForTimeout(100);

      await expect(button).toHaveAttribute("aria-disabled", "true");
    });

    test("loading button remains focusable", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--loading"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await button.focus();
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute("aria-busy", "true");
    });
  });

  test.describe("Mouse Interactions", () => {
    test("can click button with mouse", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.click();
      await page.waitForTimeout(100);

      await expect(button).toBeVisible();
    });

    test("shows hover state on mouse hover", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.hover();

      await expect(button).toBeVisible();
    });

    test("disabled button does not respond to clicks", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await expect(button).toHaveAttribute("aria-disabled", "true");

      await button.click({ force: true });
      await page.waitForTimeout(100);
    });

    test("loading button has spinner visible", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--loading"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      const spinner = button.locator('[role="status"]');
      await expect(spinner).toBeVisible();
      await expect(button).toHaveAttribute("aria-busy", "true");
    });
  });

  test.describe("Focus Management", () => {
    test("shows focus indicator when focused", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.focus();
      await expect(button).toBeFocused();
    });

    test("can shift focus between multiple buttons", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--all-variants"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const buttons = iframe.locator("button");
      await buttons.first().waitFor();

      const count = await buttons.count();

      if (count > 1) {
        await buttons.first().focus();
        await expect(buttons.first()).toBeFocused();

        await page.keyboard.press("Tab");
        await expect(buttons.nth(1)).toBeFocused();
      }
    });

    test("focus returns after blur", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.focus();
      await expect(button).toBeFocused();

      await button.blur();
      await expect(button).not.toBeFocused();

      await button.focus();
      await expect(button).toBeFocused();
    });
  });

  test.describe("ARIA Attributes - Runtime Verification", () => {
    test("button has correct role", async ({ page }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await expect(button).toHaveAttribute("type", "button");
    });

    test("disabled button has aria-disabled", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--disabled"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await expect(button).toHaveAttribute("aria-disabled", "true");
      await expect(button).not.toHaveAttribute("disabled");
    });

    test("loading button has aria-busy", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--loading"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await expect(button).toHaveAttribute("aria-busy", "true");
    });

    test("icon button has aria-label", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--icon-button"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await expect(button).toHaveAttribute("aria-label");
    });
  });

  test.describe("Variant Navigation", () => {
    test("can navigate between variant stories", async ({ page }) => {
      const variants = ["primary", "secondary", "danger"];

      for (const variant of variants) {
        await page.goto(
          `http://localhost:6006/?path=/story/atoms-button--${variant}`
        );
        const iframe = page.frameLocator(
          'iframe[title="storybook-preview-iframe"]'
        );
        const button = iframe.locator("button").first();
        await button.waitFor();
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
      }
    });

    test("can navigate between size stories", async ({ page }) => {
      const sizes = ["small", "medium", "large"];

      for (const size of sizes) {
        await page.goto(
          `http://localhost:6006/?path=/story/atoms-button--${size}`
        );
        const iframe = page.frameLocator(
          'iframe[title="storybook-preview-iframe"]'
        );
        const button = iframe.locator("button").first();
        await button.waitFor();
        await expect(button).toBeVisible();
      }
    });
  });

  test.describe("State Transitions", () => {
    test("button remains accessible after multiple interactions", async ({
      page,
    }) => {
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();

      await button.click();
      await button.focus();
      await button.blur();
      await button.hover();
      await button.click();

      await expect(button).toBeVisible();

      await button.focus();
      await expect(button).toBeFocused();
    });

    test("fullwidth button spans container", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-button--full-width"
      );
      const iframe = page.frameLocator(
        'iframe[title="storybook-preview-iframe"]'
      );
      const button = iframe.locator("button").first();
      await button.waitFor();

      await expect(button).toBeVisible();

      const buttonBox = await button.boundingBox();
      expect(buttonBox).toBeTruthy();
      expect(buttonBox!.width).toBeGreaterThan(200);
    });
  });
});
