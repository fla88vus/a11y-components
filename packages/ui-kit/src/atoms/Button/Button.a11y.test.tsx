import { describe, it, expect, vi } from 'vitest';
import {
  screen,
  userEvent,
  renderWithProviders,
  expectNoA11yViolations,
} from '../../test/test-utils';
import { Button } from './Button';

/**
 * Button Accessibility Tests
 * Pattern: Interactive Controls (Atom)
 *
 * WCAG 2.1 AA Compliance Tests
 */
describe('Button - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED AXE TESTING
  // Tests ~50+ WCAG rules automatically
  // ========================================
  describe('Automated Accessibility (axe-core)', () => {
    it('has no violations in default state', async () => {
      const { container } = renderWithProviders(<Button>Click me</Button>);
      await expectNoA11yViolations(container);
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(<Button disabled>Disabled</Button>);
      await expectNoA11yViolations(container);
    });

    it('has no violations when loading', async () => {
      const { container } = renderWithProviders(<Button loading>Loading</Button>);
      await expectNoA11yViolations(container);
    });

    it('has no violations with all variants', async () => {
      const variants: Array<'primary' | 'secondary' | 'danger'> = [
        'primary',
        'secondary',
        'danger',
      ];

      for (const variant of variants) {
        const { container, unmount } = renderWithProviders(
          <Button variant={variant}>{variant}</Button>
        );
        await expectNoA11yViolations(container);
        unmount();
      }
    });

    it('has no violations with all sizes', async () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

      for (const size of sizes) {
        const { container, unmount } = renderWithProviders(<Button size={size}>{size}</Button>);
        await expectNoA11yViolations(container);
        unmount();
      }
    });

    it('has no violations with icon-only button (with aria-label)', async () => {
      const { container } = renderWithProviders(<Button aria-label="Close">×</Button>);
      await expectNoA11yViolations(container);
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML (WCAG 1.3.1, 4.1.2)
  // Verify correct HTML structure and ARIA
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses native <button> element', () => {
      renderWithProviders(<Button>Test</Button>);
      const button = screen.getByRole('button');

      expect(button.tagName).toBe('BUTTON');
    });

    it('has correct button role', () => {
      renderWithProviders(<Button>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has accessible name from children', () => {
      renderWithProviders(<Button>Save changes</Button>);
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
    });

    it('supports aria-label for icon-only buttons', () => {
      renderWithProviders(<Button aria-label="Close dialog">×</Button>);

      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });

    it('has aria-disabled when disabled', () => {
      renderWithProviders(<Button disabled>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('has aria-busy when loading', () => {
      renderWithProviders(<Button loading>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('has both aria-disabled and aria-busy when loading', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('does not use native disabled attribute (maintains tab order)', () => {
      renderWithProviders(<Button disabled>Test</Button>);
      const button = screen.getByRole('button');

      // Uses aria-disabled instead of disabled
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION (WCAG 2.1.1)
  // All functionality via keyboard
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is focusable with Tab', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Button>Test</Button>);

      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });

    it('activates with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithProviders(<Button onClick={handleClick}>Test</Button>);

      await user.tab();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('activates with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithProviders(<Button onClick={handleClick}>Test</Button>);

      await user.tab();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });

    it('does not activate when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      renderWithProviders(
        <Button disabled onClick={handleClick}>
          Test
        </Button>
      );

      await user.tab();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('remains in tab order when disabled (WCAG best practice)', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <>
          <button>Before</button>
          <Button disabled>Disabled</Button>
          <button>After</button>
        </>
      );

      await user.tab(); // First button
      expect(screen.getByText('Before')).toHaveFocus();

      await user.tab(); // Disabled button (should be focusable)
      expect(screen.getByRole('button', { name: 'Disabled' })).toHaveFocus(); // ✅ FIX

      await user.tab(); // After button
      expect(screen.getByText('After')).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 4: FOCUS INDICATORS (WCAG 2.4.7)
  // Visible focus for keyboard users
  // ========================================
  describe('Focus Indicators', () => {
    it('is keyboard-focusable', () => {
      renderWithProviders(<Button>Test</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('maintains focus visibility when disabled', () => {
      renderWithProviders(<Button disabled>Test</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('maintains focus when transitioning to loading state', () => {
      const { rerender } = renderWithProviders(<Button>Submit</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();

      rerender(<Button loading>Submit</Button>);
      expect(button).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 5: SCREEN READER ANNOUNCEMENTS
  // Proper status and state communication
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces loading state with role="status"', () => {
      renderWithProviders(<Button loading>Submit</Button>);

      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();
      expect(status).toHaveAttribute('aria-live', 'polite');
    });

    it('provides loading text for screen readers', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('hides spinner icon from screen readers', () => {
      renderWithProviders(<Button loading>Submit</Button>);

      const spinner = document.querySelector('[aria-hidden="true"]');
      expect(spinner).toBeInTheDocument();
    });

    it('hides button text visually during loading but keeps for SR', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      const buttonText = screen.getByText('Submit');

      // Text is aria-hidden when loading
      expect(buttonText).toHaveAttribute('aria-hidden', 'true');
    });

    it('announces disabled state via aria-disabled', () => {
      renderWithProviders(<Button disabled>Disabled</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // ========================================
  // SECTION 6: COLOR & CONTRAST (WCAG 1.4.3, 1.4.11)
  // Information not conveyed by color alone
  // ========================================
  describe('Color & Contrast', () => {
    it('does not rely on color alone for disabled state', () => {
      renderWithProviders(<Button disabled>Test</Button>);
      const button = screen.getByRole('button');

      // Multiple indicators: ARIA + cursor + opacity
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveClass('disabled');
    });

    it('does not rely on color alone for loading state', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      const button = screen.getByRole('button');

      // Multiple indicators: ARIA + spinner + text
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('variant differences are not color-only', () => {
      // Each variant has semantic purpose communicated through context
      renderWithProviders(<Button variant="danger">Delete</Button>);

      // The text "Delete" provides context beyond color
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });
  });

  // ========================================
  // SECTION 7: REAL-WORLD ACCESSIBILITY PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    it('works in form context', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      renderWithProviders(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );

      const button = screen.getByRole('button');
      button.click();

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('supports modal/dialog patterns with aria-label', () => {
      renderWithProviders(
        <div role="dialog" aria-labelledby="dialog-title">
          <h2 id="dialog-title">Confirm Action</h2>
          <Button aria-label="Close dialog">×</Button>
        </div>
      );

      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    });

    it('works in navigation patterns', () => {
      renderWithProviders(
        <nav aria-label="Main navigation">
          <Button>Home</Button>
          <Button>About</Button>
        </nav>
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAccessibleName('Main navigation');
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('supports confirmation workflows', async () => {
      const user = userEvent.setup();
      const handleConfirm = vi.fn();

      renderWithProviders(
        <div role="alertdialog" aria-labelledby="confirm-title">
          <h2 id="confirm-title">Are you sure?</h2>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      );

      await user.click(screen.getByRole('button', { name: 'Confirm' }));
      expect(handleConfirm).toHaveBeenCalled();
    });
  });
});
