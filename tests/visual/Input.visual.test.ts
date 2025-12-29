import { test, expect } from "@playwright/test";

test.describe("Input - Visual Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:6006");
  });

  test.describe("Basic States", () => {
    test("renders default input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-default.png");
    });

    test("renders input with value", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-value"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-with-value.png");
    });

    test("renders input with placeholder", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-placeholder"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-with-placeholder.png");
    });

    test("renders input with helper text", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-helper-text"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-with-helper-text.png");
    });
  });

  test.describe("Error States", () => {
    test("renders input with error", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-error.png");
    });

    test("renders input with error and error message", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error-message"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-error-message.png");
    });
  });

  test.describe("Size Variants", () => {
    test("renders small input", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--small");
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-small.png");
    });

    test("renders medium input", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--medium");
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-medium.png");
    });

    test("renders large input", async ({ page }) => {
      await page.goto("http://localhost:6006/?path=/story/atoms-input--large");
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-large.png");
    });
  });

  test.describe("Type Variants", () => {
    test("renders email input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--type-email"
      );
      await page.waitForSelector('input[type="email"]');
      await expect(page).toHaveScreenshot("input-type-email.png");
    });

    test("renders password input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--type-password"
      );
      await page.waitForSelector('input[type="password"]');
      await expect(page).toHaveScreenshot("input-type-password.png");
    });

    test("renders number input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--type-number"
      );
      await page.waitForSelector('input[type="number"]');
      await expect(page).toHaveScreenshot("input-type-number.png");
    });

    test("renders search input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--type-search"
      );
      await page.waitForSelector('input[type="search"]');
      await expect(page).toHaveScreenshot("input-type-search.png");
    });
  });

  test.describe("State Combinations", () => {
    test("renders required input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--required"
      );
      await page.waitForSelector("input[required]");
      await expect(page).toHaveScreenshot("input-required.png");
    });

    test("renders disabled input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--disabled"
      );
      await page.waitForSelector('input[aria-disabled="true"]');
      await expect(page).toHaveScreenshot("input-disabled.png");
    });

    test("renders readonly input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--readonly"
      );
      await page.waitForSelector("input[readonly]");
      await expect(page).toHaveScreenshot("input-readonly.png");
    });

    test("renders fullwidth input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--fullwidth"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-fullwidth.png");
    });
  });

  test.describe("Interaction States", () => {
    test("renders focused input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      const input = await page.waitForSelector("input");
      await input.focus();
      await expect(page).toHaveScreenshot("input-focused.png");
    });

    test("renders input with text entry", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      const input = await page.waitForSelector("input");
      await input.fill("User typed text");
      await expect(page).toHaveScreenshot("input-text-entry.png");
    });

    test("renders focused error input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error"
      );
      const input = await page.waitForSelector("input");
      await input.focus();
      await expect(page).toHaveScreenshot("input-error-focused.png");
    });
  });

  test.describe("Form Context", () => {
    test("renders input in form context", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--in-form"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-in-form.png");
    });
  });

  test.describe("Accessibility Verification", () => {
    test("label is visually associated with input", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      await page.waitForSelector("label");
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-label-association.png");
    });

    test("required indicator is visible", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--required"
      );
      await page.waitForSelector("input[required]");
      await expect(page).toHaveScreenshot("input-required-indicator.png");
    });

    test("error message is visually distinct", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-error-message"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-error-distinct.png");
    });

    test("helper text is visible and readable", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--with-helper-text"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-helper-readable.png");
    });

    test("focus indicator meets WCAG requirements", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      const input = await page.waitForSelector("input");
      await input.focus();
      await expect(page).toHaveScreenshot("input-focus-indicator.png");
    });

    test("disabled state is visually distinguishable", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--disabled"
      );
      await page.waitForSelector('input[aria-disabled="true"]');
      await expect(page).toHaveScreenshot("input-disabled-visual.png");
    });
  });

  test.describe("Cross-browser Viewport Testing", () => {
    test("renders correctly on mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-mobile.png");
    });

    test("renders correctly on tablet viewport", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-tablet.png");
    });

    test("renders correctly on desktop viewport", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--default"
      );
      await page.waitForSelector("input");
      await expect(page).toHaveScreenshot("input-desktop.png");
    });

    test("fullwidth input adapts to viewport", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--fullwidth"
      );
      await page.waitForSelector("input");

      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page).toHaveScreenshot("input-fullwidth-mobile.png");

      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page).toHaveScreenshot("input-fullwidth-desktop.png");
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("tab navigation highlights input correctly", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--in-form"
      );
      await page.keyboard.press("Tab");
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot("input-tab-navigation.png");
    });

    test("shift+tab navigation works correctly", async ({ page }) => {
      await page.goto(
        "http://localhost:6006/?path=/story/atoms-input--in-form"
      );
      const inputs = await page.locator("input").all();
      if (inputs.length > 1) {
        await inputs[1].focus();
        await page.keyboard.press("Shift+Tab");
        await page.waitForTimeout(100);
        await expect(page).toHaveScreenshot("input-shift-tab-navigation.png");
      }
    });
  });
});

test("Disabled input matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--disabled&viewMode=story"
  );
  await page.waitForSelector("input");

  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-disabled.png");
});

test("Small input matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--small&viewMode=story"
  );
  await page.waitForSelector("input");

  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-small.png");
});

test("Medium input matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--medium&viewMode=story"
  );
  await page.waitForSelector("input");

  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-medium.png");
});

test("Large input matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--large&viewMode=story"
  );
  await page.waitForSelector("input");

  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-large.png");
});

test("Full width input matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--full-width&viewMode=story"
  );
  await page.waitForSelector("input");

  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-fullwidth.png");
});

test("Input focus state matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story"
  );
  await page.waitForSelector("input");

  const input = page.locator("input").first();
  await input.focus();
  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-focused.png");
});

test("Input hover state matches snapshot", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story"
  );
  await page.waitForSelector("input");

  const input = page.locator("input").first();
  await input.hover();
  const inputWrapper = page.locator(".inputWrapper").first();
  await expect(inputWrapper).toHaveScreenshot("input-hover.png");
});

test.describe("Input Accessibility with Playwright", () => {
  test("Input has correct ARIA attributes", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-input--with-error&viewMode=story"
    );

    const input = page.locator("input").first();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("aria-describedby");
  });

  test("Required input has aria-required", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-input--required&viewMode=story"
    );

    const input = page.locator("input").first();
    await expect(input).toHaveAttribute("aria-required", "true");
  });

  test("Input is keyboard accessible", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story"
    );

    await page.keyboard.press("Tab");
    const input = page.locator("input").first();
    await expect(input).toBeFocused();

    await page.keyboard.type("test@example.com");
    await expect(input).toHaveValue("test@example.com");
  });

  test("Label is associated with input", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/iframe.html?id=atoms-input--default&viewMode=story"
    );

    const input = page.locator("input").first();
    const inputId = await input.getAttribute("id");

    const label = page.locator("label").first();
    const labelFor = await label.getAttribute("for");

    expect(inputId).toBe(labelFor);
  });
});
