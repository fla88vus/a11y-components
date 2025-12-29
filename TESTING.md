
# 🧪 Testing Guide

Comprehensive testing strategy for the a11y-components library.

## 📋 Test Types

This library implements 4 types of tests following industry best practices:

```
┌─────────────────────────────────────────┐
│  1. Unit Tests         (Logic)          │
│  2. Component Tests    (Rendering)      │
│  3. Accessibility Tests (WCAG)          │
│  4. Visual Regression  (Screenshots)    │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start

```bash
# Run all tests
npm test

# Run specific test types
npm run test:unit          # Unit tests only
npm run test:component     # Component tests only
npm run test:a11y          # Accessibility tests only
npm run test:visual        # Visual regression tests

# Development
npm run test:ui            # Open Vitest UI
npm run test:visual:ui     # Open Playwright UI
npm run test:coverage      # Generate coverage report

# Storybook
npm run storybook          # Start Storybook dev server
npm run build-storybook    # Build Storybook static site
```

---

## 1️⃣ Unit Tests

**Purpose:** Test pure logic functions in isolation.

**Tool:** Vitest

**Location:** `*.utils.test.ts`

**Example:**
```typescript
// src/atoms/Button/Button.utils.test.ts
describe("Button Utils - Unit Tests", () => {
  it("combines class names correctly", () => {
    expect(combineClassNames("btn", "primary")).toBe("btn primary");
  });
});
```

**Run:**
```bash
npm run test:unit
```

---

## 2️⃣ Component Tests

**Purpose:** Test component rendering and interactions.

**Tool:** Vitest + React Testing Library

**Location:** `*.test.tsx`

**Example:**
```typescript
// src/atoms/Button/Button.test.tsx
describe("Button - Component Tests", () => {
  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Run:**
```bash
npm run test:component
```

---

## 3️⃣ Accessibility Tests (WCAG 2.1 AA)

**Purpose:** Ensure WCAG 2.1 Level AA compliance.

**Tool:** axe-core + jest-axe

**Location:** `*.a11y.test.tsx`

**Example:**
```typescript
// src/atoms/Button/Button.a11y.test.tsx
describe("Button - Accessibility Tests", () => {
  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("meets WCAG 2.4.7 - Focus Visible", () => {
    render(<Button>Focus me</Button>);
    const button = screen.getByRole("button");
    button.focus();
    expect(button).toHaveFocus();
  });
});
```

**Run:**
```bash
npm run test:a11y
```

**WCAG Criteria Tested:**
- ✅ 1.3.1 Info and Relationships
- ✅ 1.4.1 Use of Color
- ✅ 1.4.3 Contrast (Minimum)
- ✅ 2.1.1 Keyboard
- ✅ 2.4.7 Focus Visible
- ✅ 2.5.5 Target Size
- ✅ 4.1.2 Name, Role, Value

---

## 4️⃣ Visual Regression Tests

**Purpose:** Detect unintended visual changes via screenshot comparison.

**Tool:** Playwright

**Location:** `tests/visual/*.visual.test.ts`

**Example:**
```typescript
// tests/visual/Button.visual.test.ts
test('Primary button matches snapshot', async ({ page }) => {
  await page.goto('http://localhost:6006/iframe.html?id=atoms-button--primary');
  const button = page.locator('button').first();
  await expect(button).toHaveScreenshot('button-primary.png');
});
```

**Run:**
```bash
# Start Storybook first (in separate terminal)
npm run storybook

# Then run visual tests
npm run test:visual

# Update snapshots after intentional changes
npm run test:visual:update

# Interactive mode
npm run test:visual:ui
```

**Cross-browser testing:**
- ✅ Chrome (Chromium)
- ✅ Firefox
- ✅ Safari (WebKit)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

---

## 📊 Coverage

Generate code coverage report:

```bash
npm run test:coverage
```

**Target coverage:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

---

## 🎨 Storybook

Interactive component documentation and testing playground.

**Start:**
```bash
npm run storybook
```

Opens at: http://localhost:6006

**Features:**
- 📖 Component documentation
- 🎨 Interactive props playground
- ♿ Accessibility addon (real-time axe-core checks)
- 📱 Responsive viewport testing
- 🎭 All component variants

---

## 🏗️ Test File Structure

```
src/
├── atoms/
│   └── Button/
│       ├── Button.tsx                  # Component
│       ├── Button.module.css           # Styles
│       ├── Button.test.tsx             # Component tests
│       ├── Button.a11y.test.tsx        # Accessibility tests
│       ├── Button.utils.ts             # Logic utilities
│       ├── Button.utils.test.ts        # Unit tests
│       ├── Button.stories.tsx          # Storybook stories
│       └── index.ts

tests/
└── visual/
    └── Button.visual.test.ts           # Visual regression

.storybook/
├── main.ts                             # Storybook config
└── preview.ts                          # Global settings
```

---

## ✅ Test Checklist (per component)

When creating a new component, ensure:

- [ ] **Unit tests** - Logic functions tested
- [ ] **Component tests** - Rendering + interactions
- [ ] **Accessibility tests** - WCAG 2.1 AA compliance
- [ ] **Visual tests** - All variants + states
- [ ] **Storybook stories** - All props documented
- [ ] **Coverage** - Meets minimum thresholds

---

## 🔧 CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run component tests
        run: npm run test:component
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run visual tests
        run: npm run test:visual
      
      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [Playwright](https://playwright.dev/)
- [Storybook](https://storybook.js.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 🐛 Troubleshooting

### Vitest issues

```bash
# Clear cache
npx vitest --clearCache

# Run in watch mode
npm test
```

### Playwright issues

```bash
# Reinstall browsers
npx playwright install --force

# Debug mode
npx playwright test --debug

# Show browser
npx playwright test --headed
```

### Storybook issues

```bash
# Clear cache
rm -rf node_modules/.cache

# Rebuild
npm run build-storybook
```

---

## 💡 Best Practices

1. **Write tests first** (TDD) - Define expected behavior
2. **Test user behavior** - Not implementation details
3. **Keep tests isolated** - No shared state
4. **Use descriptive names** - Clear test intent
5. **Follow AAA pattern** - Arrange, Act, Assert
6. **Mock external dependencies** - Keep tests fast
7. **Update snapshots intentionally** - Review visual changes

---

## 🎯 Next Steps

1. ✅ Run all tests: `npm test`
2. ✅ View Storybook: `npm run storybook`
3. ✅ Check coverage: `npm run test:coverage`
4. ✅ Run visual tests: `npm run test:visual`
5. ✅ Review accessibility: Check Storybook a11y addon
