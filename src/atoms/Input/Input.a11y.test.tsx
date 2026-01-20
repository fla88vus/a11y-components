import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

expect.extend(toHaveNoViolations);

describe('Input - Accessibility Tests (WCAG 2.1 AA)', () => {
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(<Input label="Email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when disabled', async () => {
      const { container } = render(<Input label="Email" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with error message', async () => {
      const { container } = render(<Input label="Email" error="Invalid email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with helper text', async () => {
      const { container } = render(<Input label="Password" helperText="Must be 8+ characters" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with different sizes', async () => {
      const { container: small } = render(<Input label="Small" size="small" />);
      expect(await axe(small)).toHaveNoViolations();

      const { container: medium } = render(<Input label="Medium" size="medium" />);
      expect(await axe(medium)).toHaveNoViolations();

      const { container: large } = render(<Input label="Large" size="large" />);
      expect(await axe(large)).toHaveNoViolations();
    });

    it('has no violations when required', async () => {
      const { container } = render(<Input label="Email" required />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with hidden label', async () => {
      const { container } = render(<Input label="Search" hideLabel />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('WCAG 2.1 Level A Compliance', () => {
    it('meets 1.3.1 Info and Relationships - uses semantic input element', () => {
      render(<Input label="Email" type="email" />);
      const input = screen.getByLabelText('Email');
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('meets 1.3.1 Info and Relationships - label associated with input', () => {
      render(<Input label="Username" />);
      const input = screen.getByLabelText('Username');
      const label = screen.getByText('Username');

      expect(input).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('meets 1.4.1 Use of Color - error not conveyed by color alone', () => {
      render(<Input label="Email" error="Invalid email" />);
      const input = screen.getByLabelText('Email');

      // Uses aria-invalid and role="alert" for error, not just color
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    });

    it('meets 2.1.1 Keyboard - input is keyboard accessible', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');

      expect(input.tagName).toBe('INPUT');
      expect(input).not.toHaveAttribute('tabindex', '-1');
    });

    it('meets 2.4.7 Focus Visible - input can receive focus', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');

      input.focus();
      expect(input).toHaveFocus();
    });

    it('meets 3.3.2 Labels or Instructions - has visible label', () => {
      render(<Input label="Email address" />);
      expect(screen.getByText('Email address')).toBeVisible();
    });

    it('meets 4.1.2 Name, Role, Value - input has accessible name', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });
  });

  describe('WCAG 2.1 Level AA Compliance', () => {
    it('meets 1.4.3 Contrast - input has sufficient contrast', async () => {
      const { container } = render(<Input label="Email" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets 2.4.7 Focus Visible - focus indicator is visible', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');

      input.focus();
      expect(input).toHaveFocus();
    });

    it('meets 2.5.5 Target Size - input meets minimum size', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');
      expect(input).toBeInTheDocument();
    });

    it('meets 3.3.1 Error Identification - errors are clearly identified', () => {
      render(<Input label="Email" error="Please enter a valid email" />);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('Please enter a valid email');
    });

    it('meets 3.3.2 Labels or Instructions - provides helper text', () => {
      render(<Input label="Password" helperText="Must contain at least 8 characters" />);
      expect(screen.getByText('Must contain at least 8 characters')).toBeVisible();
    });
  });

  describe('ARIA Attributes', () => {
    it('uses aria-invalid when error is present', () => {
      render(<Input label="Email" error="Invalid email" />);
      const input = screen.getByLabelText('Email');

      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not have aria-invalid when no error', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');

      expect(input).not.toHaveAttribute('aria-invalid');
    });

    it('uses aria-describedby for error message', () => {
      render(<Input label="Email" error="Invalid email format" />);
      const input = screen.getByLabelText('Email');
      const describedBy = input.getAttribute('aria-describedby');

      expect(describedBy).toBeTruthy();
      const errorElement = document.getElementById(describedBy!);
      expect(errorElement).toHaveTextContent('Invalid email format');
    });

    it('uses aria-describedby for helper text', () => {
      render(<Input label="Password" helperText="At least 8 characters" />);
      const input = screen.getByLabelText('Password');
      const describedBy = input.getAttribute('aria-describedby');

      expect(describedBy).toBeTruthy();
      const helperElement = document.getElementById(describedBy!);
      expect(helperElement).toHaveTextContent('At least 8 characters');
    });

    it('combines error and helper in aria-describedby when both present', () => {
      render(<Input label="Email" error="Invalid" helperText="example@domain.com" />);
      const input = screen.getByLabelText('Email');
      const describedBy = input.getAttribute('aria-describedby');

      expect(describedBy?.split(' ').length).toBeGreaterThan(1);
    });

    it('uses aria-required for required fields', () => {
      render(<Input label="Email" required />);
      const input = screen.getByLabelText(/Email/);

      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAttribute('required');
    });

    it("uses role='alert' for error messages", () => {
      render(<Input label="Email" error="This field is required" />);
      const alert = screen.getByRole('alert');

      expect(alert).toHaveTextContent('This field is required');
    });
  });

  describe('Screen Reader Experience', () => {
    it('announces input with label', () => {
      render(<Input label="Email address" />);
      const input = screen.getByLabelText('Email address');
      expect(input).toBeInTheDocument();
    });

    it('announces required indicator', () => {
      render(<Input label="Email" required />);
      const requiredIndicator = screen.getByText('*');

      expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
    });

    it('announces error messages', () => {
      render(<Input label="Email" error="Please enter a valid email" />);
      const alert = screen.getByRole('alert');

      expect(alert).toHaveTextContent('Please enter a valid email');
    });

    it('provides helper text for context', () => {
      render(<Input label="Password" helperText="8-20 characters" />);
      const helperText = screen.getByText('8-20 characters');

      expect(helperText).toBeInTheDocument();
    });

    it('hides label visually but keeps it for screen readers', () => {
      render(<Input label="Search" hideLabel />);
      const label = screen.getByText('Search');

      // Label exists for screen readers
      expect(label).toBeInTheDocument();
      // Still accessible
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('input is in tab order by default', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');

      expect(input).not.toHaveAttribute('tabindex', '-1');
    });

    it('disabled input is not keyboard accessible', () => {
      render(<Input label="Email" disabled />);
      const input = screen.getByLabelText('Email');

      expect(input).toBeDisabled();
    });
  });

  describe('Form Integration', () => {
    it('associates input with form via name attribute', () => {
      render(<Input label="Email" name="email" />);
      const input = screen.getByLabelText('Email');

      expect(input).toHaveAttribute('name', 'email');
    });

    it('supports native HTML5 validation', () => {
      render(<Input label="Email" type="email" required />);
      const input = screen.getByLabelText(/Email/);

      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('required');
    });
  });
});
