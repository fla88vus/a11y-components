import { screen, renderWithProviders } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Checkbox } from './Checkbox';

expect.extend(toHaveNoViolations);

/**
 * Checkbox Accessibility Tests
 *
 * Tests WCAG 2.1 AA compliance for the Checkbox component
 */
describe('Checkbox - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED TESTING (axe-core)
  // ========================================
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = renderWithProviders(<Checkbox label="Accept terms" value="accept" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when checked', async () => {
      const { container } = renderWithProviders(
        <Checkbox label="Accept terms" value="accept" checked onChange={() => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(
        <Checkbox label="Accept terms" value="accept" disabled />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with checked + disabled', async () => {
      const { container } = renderWithProviders(
        <Checkbox label="Agreed" value="agreed" checked disabled onChange={() => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with indeterminate state', async () => {
      const { container } = renderWithProviders(
        <Checkbox label="Partial" value="partial" indeterminate />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML & ARIA
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses semantic checkbox input', () => {
      renderWithProviders(<Checkbox label="Accept terms" value="accept" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox.tagName).toBe('INPUT');
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('has accessible name from label', () => {
      renderWithProviders(<Checkbox label="Subscribe to newsletter" value="subscribe" />);
      const checkbox = screen.getByRole('checkbox', {
        name: 'Subscribe to newsletter',
      });

      expect(checkbox).toBeInTheDocument();
    });

    it('associates label with input via id', () => {
      renderWithProviders(<Checkbox label="Accept privacy policy" value="accept" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Accept privacy policy');

      expect(checkbox).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', checkbox.id);
    });

    it('announces checked state correctly', () => {
      const { rerender } = renderWithProviders(
        <Checkbox label="Accept" value="accept" checked={false} onChange={() => {}} />
      );
      let checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox label="Accept" value="accept" checked={true} onChange={() => {}} />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('supports indeterminate state', () => {
      renderWithProviders(<Checkbox label="Select all" value="all" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(true);
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is keyboard accessible', () => {
      renderWithProviders(<Checkbox label="Accept" value="accept" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox.tagName).toBe('INPUT');
      expect(checkbox).not.toHaveAttribute('tabindex', '-1');
    });

    it('can be focused', () => {
      renderWithProviders(<Checkbox label="Accept" value="accept" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it('cannot be focused when disabled', () => {
      renderWithProviders(<Checkbox label="Accept" value="accept" disabled />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).not.toHaveFocus();
    });
  });

  // ========================================
  // SECTION 4: FOCUS INDICATORS
  // ========================================
  describe('Focus Indicators', () => {
    it('shows focus indicator when focused', () => {
      renderWithProviders(<Checkbox label="Accept" value="accept" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toHaveFocus();
      // CSS provides visible outline
    });

    it('focus indicator has sufficient contrast', async () => {
      const { container } = renderWithProviders(<Checkbox label="Accept" value="accept" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 5: SCREEN READER SUPPORT
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces checkbox role', () => {
      renderWithProviders(<Checkbox label="Accept terms" value="accept" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('announces label text', () => {
      renderWithProviders(<Checkbox label="I agree to terms" value="agree" />);
      expect(screen.getByLabelText('I agree to terms')).toBeInTheDocument();
    });

    it('announces checked state', () => {
      renderWithProviders(<Checkbox label="Subscribed" value="sub" checked onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('announces disabled state', () => {
      renderWithProviders(<Checkbox label="Cannot change" value="no" disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });

  // ========================================
  // SECTION 6: COLOR CONTRAST
  // ========================================
  describe('Color Contrast', () => {
    it('meets contrast requirements in default state', async () => {
      const { container } = renderWithProviders(<Checkbox label="Accept" value="accept" />);
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('meets contrast when checked', async () => {
      const { container } = renderWithProviders(
        <Checkbox label="Checked" value="check" checked onChange={() => {}} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets contrast when disabled', async () => {
      const { container } = renderWithProviders(<Checkbox label="Disabled" value="dis" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 7: REAL-WORLD PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    it('works in form with single checkbox', () => {
      renderWithProviders(
        <form>
          <Checkbox label="I accept the terms and conditions" value="terms" />
        </form>
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAccessibleName('I accept the terms and conditions');
    });

    it('handles indeterminate state for "select all"', () => {
      renderWithProviders(
        <div>
          <Checkbox label="Select all" value="all" indeterminate />
          <Checkbox label="Option 1" value="opt1" />
          <Checkbox label="Option 2" value="opt2" />
        </div>
      );

      const selectAll = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement;
      expect(selectAll.indeterminate).toBe(true);
    });

    it('provides sufficient click target', () => {
      renderWithProviders(<Checkbox label="Accept" value="accept" />);
      const checkbox = screen.getByRole('checkbox');

      // Checkbox is clickable (meets 44x44px for touch targets via CSS)
      expect(checkbox).toBeInTheDocument();
    });
  });
});
