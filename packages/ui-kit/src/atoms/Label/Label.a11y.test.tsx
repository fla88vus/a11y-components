import { screen, renderWithProviders, userEvent } from '../../test/test-utils';
import { toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

expect.extend(toHaveNoViolations);

/**
 * Label Accessibility Tests
 *
 * Tests WCAG 2.1 AA compliance for the Label component
 */
describe('Label - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ... SECTION 1 e 2 rimangono uguali ...

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION
  // ========================================
  describe('Keyboard Navigation', () => {
    it('clicking label focuses associated input', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <>
          <Label htmlFor="focus-test">Click to Focus</Label>
          <input id="focus-test" type="text" />
        </>
      );

      const label = screen.getByText('Click to Focus');
      const input = document.getElementById('focus-test') as HTMLInputElement;

      await user.click(label);
      expect(input).toHaveFocus();
    });

    it('label is not focusable itself', () => {
      renderWithProviders(
        <>
          <Label htmlFor="tab-test">Label</Label>
          <input id="tab-test" type="text" />
        </>
      );

      const label = screen.getByText('Label');
      expect(label).not.toHaveAttribute('tabindex');
    });
  });

  // ... SECTION 4 rimane uguale ...

  // ========================================
  // SECTION 5: SCREEN READER SUPPORT
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces label text for associated input', () => {
      renderWithProviders(
        <>
          <Label htmlFor="sr-test">Full Name</Label>
          <input id="sr-test" type="text" />
        </>
      );

      const input = screen.getByLabelText('Full Name');
      expect(input).toBeInTheDocument();
    });

    it('announces required state from input element', () => {
      renderWithProviders(
        <>
          <Label htmlFor="required-sr" required>
            Required Field
          </Label>
          <input id="required-sr" type="text" required />
        </>
      );

      const input = document.getElementById('required-sr') as HTMLInputElement;
      expect(input).toBeRequired();

      // Verify label association
      const label = screen.getByText(/Required Field/);
      expect(label).toHaveAttribute('for', 'required-sr');
    });

    it('label text is readable by screen readers', () => {
      renderWithProviders(
        <>
          <Label htmlFor="readable">Accessible Label</Label>
          <input id="readable" type="text" />
        </>
      );

      const label = screen.getByText('Accessible Label');
      // Screen readers will announce this when input is focused
      expect(label).toHaveAttribute('for', 'readable');
    });

    it('supports nested elements in label', () => {
      renderWithProviders(
        <>
          <Label htmlFor="nested">
            <span>First Name</span> <em>(required)</em>
          </Label>
          <input id="nested" type="text" />
        </>
      );

      // Use textbox role to find the input, then check its label

      const label = document.querySelector('label[for="nested"]');
      expect(label).toHaveTextContent(/First Name.*required/i);
    });
  });

  // ... SECTION 6 rimane uguale ...

  // ========================================
  // SECTION 7: REAL-WORLD PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    // ... primi 3 test rimangono uguali ...

    it('supports complex label content', () => {
      renderWithProviders(
        <>
          <Label htmlFor="complex">
            <strong>Important:</strong> Enter your full legal name
          </Label>
          <input id="complex" type="text" />
        </>
      );

      const input = screen.getByLabelText(/Important.*full legal name/i);
      expect(input).toBeInTheDocument();
    });

    it('maintains association when label is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <>
          <Label htmlFor="click-test">Click Me</Label>
          <input id="click-test" type="text" />
        </>
      );

      const label = screen.getByText('Click Me');
      const input = document.getElementById('click-test') as HTMLInputElement;

      expect(input).not.toHaveFocus();
      await user.click(label);
      expect(input).toHaveFocus();
    });
  });
});
