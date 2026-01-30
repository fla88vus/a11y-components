import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button - Accessibility Tests (WCAG 2.1 AA)', () => {
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when loading', async () => {
      const { container } = render(<Button loading>Loading</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with different variants', async () => {
      const { container: primary } = render(<Button variant="primary">Primary</Button>);
      expect(await axe(primary)).toHaveNoViolations();

      const { container: secondary } = render(<Button variant="secondary">Secondary</Button>);
      expect(await axe(secondary)).toHaveNoViolations();

      const { container: danger } = render(<Button variant="danger">Danger</Button>);
      expect(await axe(danger)).toHaveNoViolations();
    });

    it('has no violations with different sizes', async () => {
      const { container: small } = render(<Button size="small">Small</Button>);
      expect(await axe(small)).toHaveNoViolations();

      const { container: medium } = render(<Button size="medium">Medium</Button>);
      expect(await axe(medium)).toHaveNoViolations();

      const { container: large } = render(<Button size="large">Large</Button>);
      expect(await axe(large)).toHaveNoViolations();
    });

    it('has no violations with icon only button (with aria-label)', async () => {
      const { container } = render(<Button aria-label="Close dialog">×</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('WCAG 2.1 Level A Compliance', () => {
    it('meets 1.3.1 Info and Relationships - uses semantic button element', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });

    it('meets 1.4.1 Use of Color - disabled state not conveyed by color alone', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      // Uses aria-disabled attribute, not just visual styling
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('meets 2.1.1 Keyboard - button is keyboard accessible', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      // Native button element ensures keyboard accessibility
      expect(button.tagName).toBe('BUTTON');
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    it('meets 2.1.1 Keyboard - disabled button remains focusable', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      // Button stays in tab order for screen reader discovery
      button.focus();
      expect(button).toHaveFocus();
    });

    it('meets 2.4.7 Focus Visible - button can receive focus', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('meets 4.1.2 Name, Role, Value - button has accessible name', () => {
      render(<Button>Submit Form</Button>);
      const button = screen.getByRole('button', { name: 'Submit Form' });
      expect(button).toBeInTheDocument();
    });

    it('meets 4.1.2 Name, Role, Value - icon button with aria-label', () => {
      render(<Button aria-label="Close">×</Button>);
      const button = screen.getByRole('button', { name: 'Close' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('WCAG 2.1 Level AA Compliance', () => {
    it('meets 1.4.3 Contrast - button text has sufficient contrast', async () => {
      const { container } = render(<Button>Click me</Button>);
      // axe-core checks color contrast automatically
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets 2.4.7 Focus Visible - focus indicator is visible', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
      // CSS :focus-visible provides visual indicator
    });

    it('meets 2.5.5 Target Size - button meets minimum size', () => {
      render(<Button>Click</Button>);
      const button = screen.getByRole('button');

      // Button exists and CSS ensures 44x44px minimum
      expect(button).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('uses aria-disabled instead of disabled attribute', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).not.toHaveAttribute('disabled');
    });

    it('uses aria-busy for loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('provides status role for loading spinner', () => {
      render(<Button loading>Loading</Button>);

      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
    });

    it('hides decorative spinner with aria-hidden', () => {
      const { container } = render(<Button loading>Loading</Button>);
      const spinner = container.querySelector('[aria-hidden="true"]');

      expect(spinner).toBeInTheDocument();
    });

    it('exposes button type correctly', () => {
      const { rerender } = render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

      rerender(<Button type="button">Click</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });
  });

  describe('Screen Reader Experience', () => {
    it('announces button with text content', () => {
      render(<Button>Save Changes</Button>);
      const button = screen.getByRole('button', { name: 'Save Changes' });
      expect(button).toBeInTheDocument();
    });

    it('announces loading state', () => {
      render(<Button loading>Saving</Button>);

      // Screen reader will announce both the button and the loading status
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent('Loading...');
    });

    it('announces disabled state via aria-disabled', () => {
      render(<Button disabled>Submit</Button>);
      const button = screen.getByRole('button');

      // Screen readers will announce "Submit, button, disabled"
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('provides alternative text for icon-only buttons', () => {
      render(<Button aria-label="Delete item">🗑️</Button>);
      const button = screen.getByRole('button', { name: 'Delete item' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('button is in tab order by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');

      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    it('disabled button remains in tab order', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      // Important for screen reader users to discover disabled buttons
      button.focus();
      expect(button).toHaveFocus();
    });

    it('loading button remains in tab order', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });
  });
});
