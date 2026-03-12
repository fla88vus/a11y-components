import { describe, it, expect, vi } from 'vitest';
import {
  screen,
  userEvent,
  renderWithProviders,
  expectNoA11yViolations,
} from '../../test/test-utils';
import { Input } from './Input';
import React from 'react';

/**
 * Input Accessibility Tests
 * Pattern: Form Control (Atom)
 *
 * WCAG 2.1 AA Compliance Tests
 */
describe('Input - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED AXE TESTING
  // Tests ~50+ WCAG rules automatically
  // ========================================
  describe('Automated Accessibility (axe-core)', () => {
    it('has no violations in default state', async () => {
      const { container } = renderWithProviders(<Input aria-label="Text input" />);
      await expectNoA11yViolations(container);
    });

    it('has no violations when used with label', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="test-input">Test Label</label>
          <Input id="test-input" />
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations with aria-label (labelless)', async () => {
      const { container } = renderWithProviders(<Input aria-label="Search" type="search" />);
      await expectNoA11yViolations(container);
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="disabled-input">Disabled</label>
          <Input id="disabled-input" disabled />
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations in error state', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" error aria-invalid="true" aria-describedby="email-error" />
          <span id="email-error" role="alert">
            Invalid email
          </span>
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations when required', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="required-input">
            Required Field <span aria-label="required">*</span>
          </label>
          <Input id="required-input" required aria-required="true" />
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations with helper text', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" aria-describedby="email-helper" />
          <span id="email-helper">We'll never share your email</span>
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations with all sizes', async () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

      for (const size of sizes) {
        const { container, unmount } = renderWithProviders(
          <Input aria-label={`${size} input`} size={size} />
        );
        await expectNoA11yViolations(container);
        unmount();
      }
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML (WCAG 1.3.1, 4.1.2)
  // Verify correct HTML structure and ARIA
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses native <input> element', () => {
      renderWithProviders(<Input aria-label="Test" />);
      const input = screen.getByRole('textbox');

      expect(input.tagName).toBe('INPUT');
    });

    it('has correct role for text input', () => {
      renderWithProviders(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('has correct role for search input', () => {
      renderWithProviders(<Input type="search" />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('has correct role for number input', () => {
      renderWithProviders(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('has accessible name from label', () => {
      renderWithProviders(
        <>
          <label htmlFor="test-input">Username</label>
          <Input id="test-input" />
        </>
      );

      expect(screen.getByRole('textbox', { name: 'Username' })).toBeInTheDocument();
    });

    it('supports aria-label for labelless inputs', () => {
      renderWithProviders(<Input aria-label="Search products" type="search" />);

      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('aria-label', 'Search products');
    });

    it('has aria-invalid when in error state', () => {
      renderWithProviders(<Input aria-invalid="true" aria-label="Email" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('has aria-required when required', () => {
      renderWithProviders(<Input required aria-required="true" aria-label="Password" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('has native disabled attribute (not aria-disabled)', () => {
      renderWithProviders(<Input disabled aria-label="Disabled input" />);

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute('disabled');
      expect(input).not.toHaveAttribute('aria-disabled');
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION (WCAG 2.1.1)
  // All functionality via keyboard
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is focusable with Tab', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Input aria-label="Test" />);

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('accepts text input via keyboard', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Input aria-label="Test" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.tab();
      await user.keyboard('Hello');

      expect(input.value).toBe('Hello');
    });

    it('is not focusable when disabled', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Input disabled aria-label="Disabled" />);

      await user.tab();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });

    it('maintains focus when typing', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Input aria-label="Test" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('Test');

      expect(input).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 4: FOCUS INDICATORS (WCAG 2.4.7)
  // Visible focus for keyboard users
  // ========================================
  describe('Focus Indicators', () => {
    it('is keyboard-focusable', () => {
      renderWithProviders(<Input aria-label="Test" />);
      const input = screen.getByLabelText('Test');

      input.focus();
      expect(input).toHaveFocus();
    });

    it('maintains focus when transitioning to error state', () => {
      const { rerender } = renderWithProviders(<Input aria-label="Email" />);
      const input = screen.getByRole('textbox');

      input.focus();
      expect(input).toHaveFocus();

      rerender(<Input aria-label="Email" error aria-invalid="true" />);
      expect(input).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 5: SCREEN READER SUPPORT
  // Proper state communication
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces error via aria-describedby + role=alert', () => {
      renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <Input id="email" aria-invalid="true" aria-describedby="email-error" />
          <span id="email-error" role="alert">
            Invalid email address
          </span>
        </>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');

      const errorElement = document.getElementById('email-error');
      expect(errorElement).toHaveAttribute('role', 'alert');
    });

    it('announces helper text via aria-describedby (no alert)', () => {
      renderWithProviders(
        <>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" aria-describedby="password-helper" />
          <span id="password-helper">Must be at least 8 characters</span>
        </>
      );

      const input = screen.getByLabelText('Password');
      expect(input).toHaveAttribute('aria-describedby', 'password-helper');

      const helper = document.getElementById('password-helper');
      expect(helper).not.toHaveAttribute('role', 'alert');
    });

    it('supports multiple aria-describedby IDs', () => {
      renderWithProviders(
        <>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            aria-invalid="true"
            aria-describedby="password-helper password-error"
          />
          <span id="password-helper">Must be at least 8 characters</span>
          <span id="password-error" role="alert">
            Password is too short
          </span>
        </>
      );

      const input = screen.getByLabelText('Password');
      const describedBy = input.getAttribute('aria-describedby');

      expect(describedBy).toContain('password-helper');
      expect(describedBy).toContain('password-error');
    });

    it('announces disabled state', () => {
      renderWithProviders(
        <>
          <label htmlFor="disabled">Disabled Field</label>
          <Input id="disabled" disabled />
        </>
      );

      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('announces required state', () => {
      renderWithProviders(
        <>
          <label htmlFor="required-field">
            Required Field <span aria-label="required">*</span>
          </label>
          <Input id="required-field" required aria-required="true" />
        </>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  // ========================================
  // SECTION 6: LABEL ASSOCIATION (WCAG 3.3.2)
  // Labels provide context
  // ========================================
  describe('Label Association', () => {
    it('has proper label association via htmlFor/id', () => {
      renderWithProviders(
        <>
          <label htmlFor="username">Username</label>
          <Input id="username" />
        </>
      );

      const input = screen.getByRole('textbox');
      const label = screen.getByText('Username');

      expect(input).toHaveAttribute('id', 'username');
      expect(label).toHaveAttribute('for', 'username');
    });

    it('works without visual label using aria-label', () => {
      renderWithProviders(<Input type="search" aria-label="Search products" />);

      expect(screen.getByRole('searchbox', { name: 'Search products' })).toBeInTheDocument();
    });

    it('prefers aria-label over label element when both present', () => {
      renderWithProviders(
        <>
          <label htmlFor="override">Label Text</label>
          <Input id="override" aria-label="Overridden Label" />
        </>
      );

      // aria-label takes precedence
      expect(screen.getByRole('textbox', { name: 'Overridden Label' })).toBeInTheDocument();
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
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" />
          <button type="submit">Submit</button>
        </form>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleName('Email');
    });

    it('supports validation pattern', () => {
      renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" required aria-required="true" />
        </>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.validity.valueMissing).toBe(true); // Required but empty
    });

    it('supports error recovery pattern', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        const [error, setError] = React.useState('');

        return (
          <>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              aria-invalid={error ? 'true' : undefined}
              aria-describedby={error ? 'email-error' : undefined}
              onChange={(e) => {
                if (e.target.value && !e.target.value.includes('@')) {
                  setError('Invalid email');
                } else {
                  setError('');
                }
              }}
            />
            {error && (
              <span id="email-error" role="alert">
                {error}
              </span>
            )}
          </>
        );
      };

      renderWithProviders(<TestComponent />);
      const input = screen.getByRole('textbox');

      // Type invalid email
      await user.type(input, 'invalid');
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');

      // Fix it
      await user.clear(input);
      await user.type(input, 'valid@example.com');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
