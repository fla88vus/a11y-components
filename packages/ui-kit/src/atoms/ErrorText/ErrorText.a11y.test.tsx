import { screen, renderWithProviders } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { ErrorText } from './ErrorText';

expect.extend(toHaveNoViolations);

/**
 * ErrorText Accessibility Tests
 *
 * Tests WCAG 2.1 AA compliance for the ErrorText component
 */
describe('ErrorText - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED TESTING (axe-core)
  // ========================================
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = renderWithProviders(
        <ErrorText id="error">This is an error message</ErrorText>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when associated with invalid input', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />
          <ErrorText id="email-error">Please enter a valid email address</ErrorText>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with long error message', async () => {
      const { container } = renderWithProviders(
        <ErrorText id="long-error">
          This is a very long error message that provides detailed information about what went wrong
          and how to fix it for the user to understand the issue.
        </ErrorText>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with custom className', async () => {
      const { container } = renderWithProviders(
        <ErrorText id="custom" className="custom-error">
          Custom error text
        </ErrorText>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML & ARIA
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses span element with role alert', () => {
      renderWithProviders(<ErrorText id="test">Error message</ErrorText>);
      const error = screen.getByText('Error message');
      expect(error.tagName).toBe('SPAN');
      expect(error).toHaveAttribute('role', 'alert');
    });

    it('has accessible id for aria-describedby', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="error-id" aria-invalid="true" />
          <ErrorText id="error-id">Invalid input</ErrorText>
        </>
      );
      const error = screen.getByText('Invalid input');
      expect(error).toHaveAttribute('id', 'error-id');
    });

    it('provides error description to associated input', () => {
      renderWithProviders(
        <>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" aria-describedby="username-error" aria-invalid="true" />
          <ErrorText id="username-error">Username is required</ErrorText>
        </>
      );

      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('aria-describedby', 'username-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('role alert announces immediately to screen readers', () => {
      renderWithProviders(<ErrorText id="alert">Important error</ErrorText>);
      const error = screen.getByRole('alert');
      expect(error).toHaveTextContent('Important error');
    });

    it('allows custom role override', () => {
      renderWithProviders(
        <ErrorText id="custom-role" role="status">
          Status message
        </ErrorText>
      );
      const error = screen.getByText('Status message');
      expect(error).toHaveAttribute('role', 'status');
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is not focusable', () => {
      renderWithProviders(<ErrorText id="not-focusable">Error text</ErrorText>);
      const error = screen.getByText('Error text');
      expect(error).not.toHaveAttribute('tabindex');
    });

    it('does not interfere with input focus', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="error" aria-invalid="true" />
          <ErrorText id="error">Error message</ErrorText>
        </>
      );

      const input = document.getElementById('field') as HTMLInputElement;
      input.focus();
      expect(input).toHaveFocus();
    });

    it('error remains visible when input is focused', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="error" aria-invalid="true" />
          <ErrorText id="error">Validation error</ErrorText>
        </>
      );

      const input = document.getElementById('field') as HTMLInputElement;
      input.focus();
      expect(screen.getByText('Validation error')).toBeInTheDocument();
    });
  });

  // ========================================
  // SECTION 4: FOCUS INDICATORS
  // ========================================
  describe('Focus Indicators', () => {
    it('does not require focus indicator as non-interactive', () => {
      renderWithProviders(<ErrorText id="no-focus">No focus needed</ErrorText>);
      const error = screen.getByText('No focus needed');
      // Error text is not focusable, so no focus indicator needed
      expect(error.tagName).toBe('SPAN');
    });

    it('does not affect input focus indicator', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="error" aria-invalid="true" />
          <ErrorText id="error">Error</ErrorText>
        </>
      );

      const input = document.getElementById('field') as HTMLInputElement;
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 5: SCREEN READER SUPPORT
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces immediately via role alert', () => {
      renderWithProviders(<ErrorText id="immediate">Critical error occurred</ErrorText>);
      const error = screen.getByRole('alert');
      expect(error).toHaveTextContent('Critical error occurred');
    });

    it('is announced when associated input is focused', () => {
      renderWithProviders(
        <>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            aria-describedby="password-error"
            aria-invalid="true"
          />
          <ErrorText id="password-error">Password must be at least 8 characters</ErrorText>
        </>
      );

      const input = screen.getByLabelText('Password');
      const error = screen.getByText('Password must be at least 8 characters');

      expect(input).toHaveAttribute('aria-describedby', error.id);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports multiple error messages via aria-describedby', () => {
      renderWithProviders(
        <>
          <label htmlFor="field">Field</label>
          <input id="field" type="text" aria-describedby="error1 error2" aria-invalid="true" />
          <ErrorText id="error1">Field is required</ErrorText>
          <ErrorText id="error2">Field must be unique</ErrorText>
        </>
      );

      const input = screen.getByLabelText('Field');
      expect(input).toHaveAttribute('aria-describedby', 'error1 error2');
    });

    it('content is readable by screen readers', () => {
      renderWithProviders(
        <ErrorText id="readable">This error will be announced by screen readers</ErrorText>
      );

      const error = screen.getByRole('alert');
      expect(error).toBeInTheDocument();
    });

    it('supports rich text content', () => {
      renderWithProviders(
        <ErrorText id="rich">
          <strong>Error:</strong> Invalid format
        </ErrorText>
      );

      const error = screen.getByRole('alert');
      expect(error).toHaveTextContent(/Error.*Invalid format/i);
    });
  });

  // ========================================
  // SECTION 6: COLOR CONTRAST
  // ========================================
  describe('Color Contrast', () => {
    it('meets contrast requirements in default state', async () => {
      const { container } = renderWithProviders(
        <ErrorText id="contrast">Error text with good contrast</ErrorText>
      );
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('maintains contrast when associated with input', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="field">Field</label>
          <input id="field" aria-describedby="error" aria-invalid="true" />
          <ErrorText id="error">Error message</ErrorText>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('error color has sufficient contrast', async () => {
      const { container } = renderWithProviders(
        <ErrorText id="error-contrast">Critical validation error</ErrorText>
      );
      // Error text should have sufficient contrast (typically 4.5:1)
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 7: REAL-WORLD PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    it('works with required field validation', () => {
      renderWithProviders(
        <>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            aria-describedby="username-error"
            aria-invalid="true"
          />
          <ErrorText id="username-error">Username is required</ErrorText>
        </>
      );

      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('aria-describedby', 'username-error');
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });

    it('works with email validation', () => {
      renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />
          <ErrorText id="email-error">Please enter a valid email address</ErrorText>
        </>
      );

      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });

    it('provides specific password validation errors', () => {
      renderWithProviders(
        <>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            aria-describedby="password-error"
            aria-invalid="true"
          />
          <ErrorText id="password-error">
            Password must contain at least 8 characters and one number
          </ErrorText>
        </>
      );

      expect(screen.getByText(/8 characters.*number/i)).toBeInTheDocument();
    });

    it('handles pattern mismatch errors', () => {
      renderWithProviders(
        <>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            aria-describedby="phone-error"
            aria-invalid="true"
          />
          <ErrorText id="phone-error">Format must be: 123-456-7890</ErrorText>
        </>
      );

      expect(screen.getByText(/Format must be/)).toBeInTheDocument();
    });

    it('supports multiple errors for complex validation', () => {
      renderWithProviders(
        <>
          <label htmlFor="code">Verification Code</label>
          <input
            id="code"
            type="text"
            aria-describedby="code-error1 code-error2"
            aria-invalid="true"
          />
          <ErrorText id="code-error1">Code is required</ErrorText>
          <ErrorText id="code-error2">Code must be 6 digits</ErrorText>
        </>
      );

      expect(screen.getByText('Code is required')).toBeInTheDocument();
      expect(screen.getByText('Code must be 6 digits')).toBeInTheDocument();
    });

    it('works in form context with validation', () => {
      renderWithProviders(
        <form>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="fullName"
            required
            aria-describedby="name-error"
            aria-invalid="true"
          />
          <ErrorText id="name-error">Please enter your full name</ErrorText>
        </form>
      );

      const input = screen.getByLabelText('Full Name');
      expect(input).toHaveAttribute('name', 'fullName');
      expect(input).toBeRequired();
      expect(screen.getByText('Please enter your full name')).toBeInTheDocument();
    });

    it('combines with helper text for comprehensive feedback', () => {
      renderWithProviders(
        <>
          <label htmlFor="field">Field</label>
          <input
            id="field"
            type="text"
            aria-describedby="field-helper field-error"
            aria-invalid="true"
          />
          <span id="field-helper">Enter at least 5 characters</span>
          <ErrorText id="field-error">Field is too short</ErrorText>
        </>
      );

      expect(screen.getByText('Enter at least 5 characters')).toBeInTheDocument();
      expect(screen.getByText('Field is too short')).toBeInTheDocument();
    });
  });
});
