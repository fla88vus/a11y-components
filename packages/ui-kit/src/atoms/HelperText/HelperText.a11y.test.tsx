import { screen, renderWithProviders } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { HelperText } from './HelperText';

expect.extend(toHaveNoViolations);

/**
 * HelperText Accessibility Tests
 *
 * Tests WCAG 2.1 AA compliance for the HelperText component
 */
describe('HelperText - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED TESTING (axe-core)
  // ========================================
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = renderWithProviders(
        <HelperText id="helper">This is helper text</HelperText>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when associated with input', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-describedby="email-helper" />
          <HelperText id="email-helper">We'll never share your email</HelperText>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with long text', async () => {
      const { container } = renderWithProviders(
        <HelperText id="long">
          This is a very long helper text that provides detailed information about the field
          requirements and expectations for the user to understand what to input.
        </HelperText>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with custom className', async () => {
      const { container } = renderWithProviders(
        <HelperText id="custom" className="custom-class">
          Custom helper text
        </HelperText>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML & ARIA
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses span element', () => {
      renderWithProviders(<HelperText id="test">Helper text</HelperText>);
      const helper = screen.getByText('Helper text');
      expect(helper.tagName).toBe('SPAN');
    });

    it('has accessible id for aria-describedby', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="helper-id" />
          <HelperText id="helper-id">Description</HelperText>
        </>
      );
      const helper = screen.getByText('Description');
      expect(helper).toHaveAttribute('id', 'helper-id');
    });

    it('provides description to associated input', () => {
      renderWithProviders(
        <>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" aria-describedby="username-helper" />
          <HelperText id="username-helper">Must be at least 3 characters</HelperText>
        </>
      );

      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('aria-describedby', 'username-helper');
    });

    it('does not have role attribute', () => {
      renderWithProviders(<HelperText id="no-role">No role needed</HelperText>);
      const helper = screen.getByText('No role needed');
      expect(helper).not.toHaveAttribute('role');
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is not focusable', () => {
      renderWithProviders(<HelperText id="not-focusable">Helper text</HelperText>);
      const helper = screen.getByText('Helper text');
      expect(helper).not.toHaveAttribute('tabindex');
    });

    it('does not interfere with input focus', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="helper" />
          <HelperText id="helper">Description</HelperText>
        </>
      );

      const input = document.getElementById('field') as HTMLInputElement;
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 4: FOCUS INDICATORS
  // ========================================
  describe('Focus Indicators', () => {
    it('does not require focus indicator as non-interactive', () => {
      renderWithProviders(<HelperText id="no-focus">No focus needed</HelperText>);
      const helper = screen.getByText('No focus needed');
      // Helper text is not focusable, so no focus indicator needed
      expect(helper.tagName).toBe('SPAN');
    });

    it('does not affect input focus indicator', () => {
      renderWithProviders(
        <>
          <input id="field" aria-describedby="helper" />
          <HelperText id="helper">Helper</HelperText>
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
    it('is announced when associated input is focused', () => {
      renderWithProviders(
        <>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" aria-describedby="password-helper" />
          <HelperText id="password-helper">Must be at least 8 characters</HelperText>
        </>
      );

      const input = screen.getByLabelText('Password');
      const helper = screen.getByText('Must be at least 8 characters');

      expect(input).toHaveAttribute('aria-describedby', helper.id);
    });

    it('supports multiple descriptions via aria-describedby', () => {
      renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-describedby="helper1 helper2" />
          <HelperText id="helper1">Primary helper text</HelperText>
          <HelperText id="helper2">Additional information</HelperText>
        </>
      );

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('aria-describedby', 'helper1 helper2');
    });

    it('content is readable by screen readers', () => {
      renderWithProviders(
        <HelperText id="readable">This will be announced by screen readers</HelperText>
      );

      const helper = screen.getByText('This will be announced by screen readers');
      expect(helper).toBeInTheDocument();
    });

    it('supports rich text content', () => {
      renderWithProviders(
        <HelperText id="rich">
          <strong>Note:</strong> This field is optional
        </HelperText>
      );

      const helper = document.getElementById('rich');
      expect(helper).toHaveTextContent(/Note.*optional/i);
    });
  });

  // ========================================
  // SECTION 6: COLOR CONTRAST
  // ========================================
  describe('Color Contrast', () => {
    it('meets contrast requirements in default state', async () => {
      const { container } = renderWithProviders(
        <HelperText id="contrast">Helper text with good contrast</HelperText>
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
          <input id="field" aria-describedby="helper" />
          <HelperText id="helper">Description text</HelperText>
        </>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('contrast is sufficient for assistive text', async () => {
      const { container } = renderWithProviders(
        <HelperText id="assistive">Additional helpful information</HelperText>
      );
      // Helper text should have sufficient contrast (typically 4.5:1)
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 7: REAL-WORLD PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    it('works with text input', () => {
      renderWithProviders(
        <>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" aria-describedby="username-helper" />
          <HelperText id="username-helper">3-20 characters, letters and numbers only</HelperText>
        </>
      );

      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('aria-describedby', 'username-helper');
      expect(screen.getByText(/3-20 characters/)).toBeInTheDocument();
    });

    it('works with email input', () => {
      renderWithProviders(
        <>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-describedby="email-helper" />
          <HelperText id="email-helper">We'll send a confirmation to this address</HelperText>
        </>
      );

      expect(screen.getByText(/confirmation/)).toBeInTheDocument();
    });

    it('provides password requirements', () => {
      renderWithProviders(
        <>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" aria-describedby="password-helper" />
          <HelperText id="password-helper">
            Must contain at least 8 characters, one uppercase, one number
          </HelperText>
        </>
      );

      expect(screen.getByText(/8 characters.*uppercase.*number/i)).toBeInTheDocument();
    });

    it('can be used for format examples', () => {
      renderWithProviders(
        <>
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" aria-describedby="phone-helper" />
          <HelperText id="phone-helper">Format: (123) 456-7890</HelperText>
        </>
      );

      expect(screen.getByText(/Format.*123.*456/)).toBeInTheDocument();
    });

    it('supports multiple helper texts for complex fields', () => {
      renderWithProviders(
        <>
          <label htmlFor="code">Verification Code</label>
          <input id="code" type="text" aria-describedby="code-helper1 code-helper2" />
          <HelperText id="code-helper1">Check your email for the code</HelperText>
          <HelperText id="code-helper2">Code expires in 10 minutes</HelperText>
        </>
      );

      expect(screen.getByText(/Check your email/)).toBeInTheDocument();
      expect(screen.getByText(/expires in 10 minutes/)).toBeInTheDocument();
    });

    it('works in form context', () => {
      renderWithProviders(
        <form>
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" name="fullName" aria-describedby="name-helper" />
          <HelperText id="name-helper">Enter your first and last name</HelperText>
        </form>
      );

      const input = screen.getByLabelText('Full Name');
      expect(input).toHaveAttribute('name', 'fullName');
      expect(screen.getByText(/first and last name/)).toBeInTheDocument();
    });
  });
});
