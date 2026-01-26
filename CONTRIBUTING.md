# Contributing to a11y-ui-kit-react

Thank you for your interest in contributing to a11y-ui-kit-react! This guide will help you get started.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're building tools that make the web accessible to everyone.

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm, yarn, or pnpm
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/a11y-components.git
   cd a11y-components
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Project

```bash
# Start development mode
npm run dev

# Run Storybook for component development
npm run storybook

# Run tests in watch mode
npm run test:watch

# Run all tests
npm test
```

### Project Structure

```
src/
├── atoms/          # Basic building blocks (Button, Input, etc.)
├── molecules/      # Component combinations (FormField, etc.)
├── organisms/      # Complex UI sections (coming soon)
├── templates/      # Page-level templates (coming soon)
├── test/           # Test utilities and setup
└── types/          # TypeScript type definitions
```

### Atomic Design Principles

We follow [Atomic Design](https://atomicdesign.bradfrost.com/) methodology:

- **Atoms**: Basic building blocks that can't be broken down further (Button, Input, Label)
- **Molecules**: Simple combinations of atoms (FormField = Label + Input + ErrorText)
- **Organisms**: Complex UI sections built from molecules and atoms
- **Templates**: Page-level compositions
- **Pages**: Specific instances of templates

## Creating a New Component

### Component Checklist

When creating a new component, ensure you include:

- [ ] TypeScript component file with full prop types
- [ ] CSS Module for styling
- [ ] Unit tests (`*.test.tsx`)
- [ ] Accessibility tests (`*.a11y.test.tsx`)
- [ ] E2E tests (`tests/e2e/YourComponent.e2e.test.ts`)
- [ ] Storybook stories (`*.stories.tsx`)
- [ ] Export from appropriate `index.ts`
- [ ] Documentation in README.md

### File Structure Template

```
src/atoms/YourComponent/
├── YourComponent.tsx              # Component implementation
├── YourComponent.module.css       # Scoped styles
├── YourComponent.test.tsx         # Unit tests
├── YourComponent.a11y.test.tsx    # Accessibility tests
├── YourComponent.stories.tsx      # Storybook stories
├── YourComponent.utils.ts         # Helper functions (if needed)
├── YourComponent.utils.test.ts    # Utils tests (if needed)
└── index.ts                        # Public exports
```

### Component Template

```tsx
import React from 'react';
import styles from './YourComponent.module.css';

export interface YourComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Prop description
   */
  variant?: 'default' | 'alternate';
}

/**
 * YourComponent - Brief description
 *
 * Accessibility features:
 * - Feature 1
 * - Feature 2
 *
 * @example
 * ```tsx
 * <YourComponent variant="default">
 *   Content
 * </YourComponent>
 * ```
 */
export const YourComponent = React.forwardRef<HTMLDivElement, YourComponentProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
    const componentClasses = [
      styles.component,
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={componentClasses} {...props}>
        {children}
      </div>
    );
  }
);

YourComponent.displayName = 'YourComponent';
```

## Testing Requirements

### Unit Tests

Test all component functionality:

```tsx
import { render, screen } from '@testing-library/react';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('renders children correctly', () => {
    render(<YourComponent>Test</YourComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { container } = render(<YourComponent variant="alternate">Test</YourComponent>);
    expect(container.firstChild).toHaveClass('alternate');
  });
});
```

Run unit tests:
```bash
npm run test:unit
```

### Accessibility Tests

Use jest-axe to check for a11y violations:

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { YourComponent } from './YourComponent';

expect.extend(toHaveNoViolations);

describe('YourComponent Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<YourComponent>Test</YourComponent>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

Run accessibility tests:
```bash
npm run test:a11y
```

### E2E Tests

Create end-to-end tests with Playwright:

```typescript
import { test, expect } from '@playwright/test';

test.describe('YourComponent E2E', () => {
  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/your-component');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('button')).toBeFocused();
  });
});
```

Run E2E tests:
```bash
npm run test:e2e
```

## Code Standards

### TypeScript

- All code must be type-safe
- Export all public types
- Use interfaces for component props
- Document complex types with JSDoc comments

### Accessibility

All components **must** follow these principles:

#### 1. Keyboard Navigation
- Support Tab/Shift+Tab navigation
- Implement appropriate key handlers (Enter, Space, Arrow keys)
- Provide visible focus indicators (3:1 contrast minimum)

#### 2. Screen Readers
- Use semantic HTML elements
- Add ARIA labels where needed
- Implement ARIA roles appropriately
- Test with NVDA, JAWS, or VoiceOver

#### 3. Color Contrast
- Text: minimum 4.5:1 ratio (WCAG AA)
- Large text: minimum 3:1 ratio
- UI components: minimum 3:1 ratio
- Focus indicators: minimum 3:1 ratio

#### 4. Touch Targets
- Minimum 44×44 pixels for interactive elements
- Adequate spacing between targets

#### 5. Visual Accessibility
- Support prefers-reduced-motion
- Don't rely on color alone to convey information
- Provide text alternatives for visual content

### Styling

- Use CSS Modules for component styles
- Follow BEM-like naming in CSS classes
- Avoid inline styles unless dynamic
- Keep specificity low

### Code Formatting

We use Prettier and ESLint:

```bash
# Format code
npm run format

# Fix linting issues
npm run lint:fix

# Check types
npm run typecheck
```

Pre-commit hooks will automatically format and lint your code.

## Pull Request Process

### Before Submitting

1. ✅ All tests pass: `npm test && npm run test:e2e`
2. ✅ Type checking passes: `npm run typecheck`
3. ✅ Code is formatted: `npm run format`
4. ✅ No linting errors: `npm run lint`
5. ✅ Update README.md if adding new components
6. ✅ Add entry to CHANGELOG.md under "Unreleased"
7. ✅ Storybook stories work: `npm run storybook`

### PR Guidelines

**Title Format:**
- `feat: Add Select component`
- `fix: Correct Button focus state`
- `docs: Update FormField examples`
- `test: Add Input edge cases`
- `refactor: Simplify Checkbox logic`
- `perf: Optimize Icon rendering`
- `chore: Update dependencies`

**Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Accessibility tests added/updated
- [ ] E2E tests added/updated
- [ ] Manually tested in browser
- [ ] Tested with screen reader

## Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels correct
- [ ] Color contrast verified
- [ ] Screen reader tested

## Screenshots (if applicable)
Add screenshots for visual changes
```

### Review Process

1. Create your pull request
2. Automated tests will run
3. A maintainer will review your code
4. Address any feedback
5. Once approved, your PR will be merged

## Release Process

Maintainers handle releases:

1. Update version in `package.json`
2. Update CHANGELOG.md with version and date
3. Create git tag: `git tag v0.x.0`
4. Push tag: `git push origin v0.x.0`
5. Publish to npm: `npm publish`

## Development Tips

### Debugging Tests

```bash
# Run tests with UI
npm run test:ui

# Run E2E tests with UI
npm run test:e2e:ui

# Debug specific test file
npm run test:unit -- Button.test.tsx
```

### Testing Accessibility Locally

1. Install browser extensions:
   - [axe DevTools](https://www.deque.com/axe/devtools/)
   - [WAVE](https://wave.webaim.org/extension/)

2. Use keyboard only (unplug mouse!)

3. Test with screen readers:
   - Windows: NVDA (free)
   - Mac: VoiceOver (built-in)
   - Windows: JAWS (commercial)

### Component Development Workflow

1. Create component structure
2. Write basic implementation
3. Add Storybook stories
4. Develop iteratively in Storybook
5. Write tests
6. Add accessibility tests
7. Test manually with keyboard/screen reader
8. Create E2E tests
9. Update documentation
10. Submit PR

## Getting Help

- 💬 Open a [GitHub Discussion](https://github.com/fla88vus/a11y-components/discussions)
- 🐛 Report bugs via [GitHub Issues](https://github.com/fla88vus/a11y-components/issues)
- 📧 Email the maintainer
- 📖 Read the [full documentation](./README.md)

## Recognition

Contributors will be acknowledged in:
- CHANGELOG.md
- GitHub contributors page
- Release notes

Thank you for contributing to making the web more accessible! 🎉
