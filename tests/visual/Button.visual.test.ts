import { test, expect } from "@playwright/test";

test.describe("Button Visual Regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006");
  });

  test("Primary button matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--primary");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-primary.png");
  });

  test("Secondary button matches snapshot", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/atoms-button--secondary"
    );
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-secondary.png");
  });

  test("Danger button matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--danger");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-danger.png");
  });

  test("Small button matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--small");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-small.png");
  });

  test("Medium button matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--medium");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-medium.png");
  });

  test("Large button matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--large");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-large.png");
  });

  test("Disabled button matches snapshot", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/atoms-button--disabled"
    );
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-disabled.png");
  });

  test("Loading button matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--loading");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-loading.png", {
      maxDiffPixels: 100,
    });
  });

  test("Full width button matches snapshot", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/atoms-button--full-width"
    );
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveScreenshot("button-fullwidth.png");
  });

  test("Button focus state matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--primary");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await button.focus();
    await expect(button).toHaveScreenshot("button-focused.png");
  });

  test("Button hover state matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--primary");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await button.hover();
    await expect(button).toHaveScreenshot("button-hover.png");
  });

  test("Button active state matches snapshot", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--primary");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await button.hover();
    await page.mouse.down();
    await expect(button).toHaveScreenshot("button-active.png");
    await page.mouse.up();
  });
});

test.describe("Button Accessibility with Playwright", () => {
  test("Button has correct ARIA attributes", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/atoms-button--disabled"
    );
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveAttribute("aria-disabled", "true");
  });

  test("Loading button has aria-busy", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--loading");
    await page.waitForSelector("button");

    const button = page.locator("button").first();
    await expect(button).toHaveAttribute("aria-busy", "true");
  });

  test("Button is keyboard accessible", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/atoms-button--primary");
    await page.waitForSelector("button");

    await page.keyboard.press("Tab");
    const button = page.locator("button").first();
    await expect(button).toBeFocused();

    await page.keyboard.press("Enter");
  });

  test("Disabled button remains focusable", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/atoms-button--disabled"
    );
    await page.waitForSelector("button");

    await page.keyboard.press("Tab");
    const button = page.locator("button").first();
    await expect(button).toBeFocused();
  });
});
