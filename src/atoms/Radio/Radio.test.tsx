// src/atoms/Radio/Radio.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './Radio';
import React from 'react';

describe('Radio', () => {
  // ===================================
  // BASIC RENDERING
  // ===================================

  it('renders with label', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    expect(screen.getByLabelText('Basic Plan')).toBeInTheDocument();
  });

  it('associates label with input correctly', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');
    const label = screen.getByText('Basic Plan');

    expect(radio).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', radio.id);
  });

  it('renders as radio input type', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).toHaveAttribute('type', 'radio');
  });

  it('has correct name attribute', () => {
    render(<Radio name="subscription" value="monthly" label="Monthly" />);
    const radio = screen.getByLabelText('Monthly');

    expect(radio).toHaveAttribute('name', 'subscription');
  });

  it('has correct value attribute', () => {
    render(<Radio name="plan" value="pro" label="Pro Plan" />);
    const radio = screen.getByLabelText('Pro Plan');

    expect(radio).toHaveAttribute('value', 'pro');
  });

  // ===================================
  // CHECKED STATE
  // ===================================

  it('is unchecked by default', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).not.toBeChecked();
  });

  it('can be checked with defaultChecked prop (uncontrolled)', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" defaultChecked />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).toBeChecked();
  });

  it('respects checked prop (controlled)', () => {
    const { rerender } = render(
      <Radio name="plan" value="basic" label="Basic Plan" checked={false} onChange={() => {}} />
    );
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).not.toBeChecked();

    rerender(
      <Radio name="plan" value="basic" label="Basic Plan" checked={true} onChange={() => {}} />
    );
    expect(radio).toBeChecked();
  });

  // ===================================
  // USER INTERACTION
  // ===================================

  it('can be checked when clicked', async () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).not.toBeChecked();

    await userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it('can be checked when label is clicked', async () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');
    const label = screen.getByText('Basic Plan');

    expect(radio).not.toBeChecked();

    await userEvent.click(label);
    expect(radio).toBeChecked();
  });

  it('can be checked with Space key', async () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');

    radio.focus();
    expect(radio).not.toBeChecked();

    await userEvent.keyboard(' ');
    expect(radio).toBeChecked();
  });

  it('calls onChange handler when clicked', async () => {
    const handleChange = vi.fn();
    render(<Radio name="plan" value="basic" label="Basic Plan" onChange={handleChange} />);
    const radio = screen.getByLabelText('Basic Plan');

    await userEvent.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
          value: 'basic',
        }),
      })
    );
  });

  // ===================================
  // RADIO GROUPS
  // ===================================

  it('radio buttons with same name are mutually exclusive', async () => {
    render(
      <>
        <Radio name="plan" value="basic" label="Basic" />
        <Radio name="plan" value="pro" label="Pro" />
        <Radio name="plan" value="enterprise" label="Enterprise" />
      </>
    );

    const basicRadio = screen.getByLabelText('Basic');
    const proRadio = screen.getByLabelText('Pro');
    const enterpriseRadio = screen.getByLabelText('Enterprise');

    // Check basic
    await userEvent.click(basicRadio);
    expect(basicRadio).toBeChecked();
    expect(proRadio).not.toBeChecked();
    expect(enterpriseRadio).not.toBeChecked();

    // Check pro
    await userEvent.click(proRadio);
    expect(basicRadio).not.toBeChecked();
    expect(proRadio).toBeChecked();
    expect(enterpriseRadio).not.toBeChecked();

    // Check enterprise
    await userEvent.click(enterpriseRadio);
    expect(basicRadio).not.toBeChecked();
    expect(proRadio).not.toBeChecked();
    expect(enterpriseRadio).toBeChecked();
  });

  it('radio buttons with different names are independent', async () => {
    render(
      <>
        <Radio name="plan" value="basic" label="Basic Plan" />
        <Radio name="billing" value="monthly" label="Monthly Billing" />
      </>
    );

    const planRadio = screen.getByLabelText('Basic Plan');
    const billingRadio = screen.getByLabelText('Monthly Billing');

    await userEvent.click(planRadio);
    await userEvent.click(billingRadio);

    // Both should be checked because they have different names
    expect(planRadio).toBeChecked();
    expect(billingRadio).toBeChecked();
  });

  it('once checked, cannot be unchecked by clicking again', async () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" />);
    const radio = screen.getByLabelText('Basic Plan');

    // Check the radio
    await userEvent.click(radio);
    expect(radio).toBeChecked();

    // Click again - should remain checked
    await userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  // ===================================
  // ERROR STATE
  // ===================================

  it('shows error message when error prop is provided', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" error="Please select a plan" />);

    expect(screen.getByText('Please select a plan')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Please select a plan');
  });

  it('error message is linked via aria-describedby', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" error="Required field" />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).toHaveAttribute('aria-describedby');
  });

  // ===================================
  // HELPER TEXT
  // ===================================

  it('shows helper text', () => {
    render(<Radio name="plan" value="basic" label="Basic" helperText="Free forever" />);
    expect(screen.getByText('Free forever')).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    render(
      <Radio
        name="plan"
        value="basic"
        label="Basic Plan"
        helperText="Free option"
        error="Selection required"
      />
    );

    expect(screen.queryByText('Free option')).not.toBeInTheDocument();
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });

  it('links helper text via aria-describedby', () => {
    render(<Radio name="plan" value="basic" label="Basic" helperText="Best for individuals" />);
    const radio = screen.getByLabelText('Basic');
    const helperText = screen.getByText('Best for individuals');

    expect(radio).toHaveAttribute('aria-describedby');
    expect(radio.getAttribute('aria-describedby')).toContain(helperText.id);
  });

  // ===================================
  // REQUIRED STATE
  // ===================================

  it('shows required indicator when required', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" required />);
    const requiredIndicator = screen.getByLabelText('required');
    expect(requiredIndicator).toBeInTheDocument();
    expect(requiredIndicator).toHaveTextContent('*');
  });

  it('has required attribute when required', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" required />);
    const radio = screen.getByRole('radio', { name: /Basic Plan/i });

    expect(radio).toBeRequired();
    expect(radio).toHaveAttribute('required');
  });

  // ===================================
  // DISABLED STATE
  // ===================================

  it('applies disabled state correctly', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" disabled />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).toBeDisabled();
  });

  it('cannot be checked when disabled', async () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" disabled />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).not.toBeChecked();

    await userEvent.click(radio);
    expect(radio).not.toBeChecked();
  });

  it('disabled radio does not call onChange', async () => {
    const handleChange = vi.fn();
    render(<Radio name="plan" value="basic" label="Basic Plan" disabled onChange={handleChange} />);
    const radio = screen.getByLabelText('Basic Plan');

    await userEvent.click(radio);

    expect(handleChange).not.toHaveBeenCalled();
  });

  // ===================================
  // SIZE VARIANTS
  // ===================================

  it('applies correct size classes', () => {
    const { rerender } = render(<Radio name="plan" value="basic" label="Basic" size="small" />);
    let radio = screen.getByRole('radio', { name: /Basic/i });
    expect(radio).toHaveClass('small');

    rerender(<Radio name="plan" value="basic" label="Basic" size="medium" />);
    radio = screen.getByRole('radio', { name: /Basic/i });
    expect(radio).toHaveClass('medium');

    rerender(<Radio name="plan" value="basic" label="Basic" size="large" />);
    radio = screen.getByRole('radio', { name: /Basic/i });
    expect(radio).toHaveClass('large');
  });

  // ===================================
  // REF FORWARDING
  // ===================================

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio name="plan" value="basic" label="Basic Plan" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe('radio');
  });

  // ===================================
  // CUSTOM ID
  // ===================================

  it('uses custom id when provided', () => {
    render(<Radio name="plan" value="basic" label="Basic Plan" id="custom-radio-id" />);
    const radio = screen.getByLabelText('Basic Plan');

    expect(radio).toHaveAttribute('id', 'custom-radio-id');
  });

  it('generates unique id when not provided', () => {
    render(
      <>
        <Radio name="plan" value="basic" label="Basic" />
        <Radio name="plan" value="pro" label="Pro" />
      </>
    );

    const basicRadio = screen.getByLabelText('Basic');
    const proRadio = screen.getByLabelText('Pro');

    expect(basicRadio.id).toBeTruthy();
    expect(proRadio.id).toBeTruthy();
    expect(basicRadio.id).not.toBe(proRadio.id);
  });

  // ===================================
  // ACCESSIBILITY - WCAG 2.1 AA/AAA
  // ===================================

  describe('Accessibility - WCAG 2.1 AA/AAA', () => {
    it('has proper label association (WCAG 1.3.1, 3.3.2)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan - $0/month" />);

      const radio = screen.getByLabelText('Basic Plan - $0/month');
      const label = screen.getByText('Basic Plan - $0/month');

      expect(radio).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', radio.id);
    });

    it('uses semantic radio input (WCAG 1.3.1)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByLabelText('Basic Plan');

      expect(radio.tagName).toBe('INPUT');
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('error state not conveyed by color alone (WCAG 1.4.1)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" error="Required field" />);
      const radio = screen.getByLabelText('Basic Plan');

      // Uses role="alert" and aria-describedby, not just color
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(radio).toHaveAttribute('aria-describedby');
    });

    it('is keyboard accessible (WCAG 2.1.1)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByLabelText('Basic Plan');

      expect(radio.tagName).toBe('INPUT');
      expect(radio).not.toHaveAttribute('tabindex', '-1');
    });

    it('can receive focus (WCAG 2.4.7)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByLabelText('Basic Plan');

      radio.focus();
      expect(radio).toHaveFocus();
    });

    it('has aria-describedby for error (WCAG 3.3.1)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" error="This field is required" />);
      const radio = screen.getByLabelText('Basic Plan');
      const errorMessage = screen.getByText('This field is required');

      expect(radio).toHaveAttribute('aria-describedby');
      expect(radio.getAttribute('aria-describedby')).toContain(errorMessage.id);
    });

    it('has aria-describedby for helper text (WCAG 3.3.2)', () => {
      render(
        <Radio name="plan" value="basic" label="Basic" helperText="Perfect for individuals" />
      );
      const radio = screen.getByLabelText('Basic');
      const helperText = screen.getByText('Perfect for individuals');

      expect(radio).toHaveAttribute('aria-describedby');
      expect(radio.getAttribute('aria-describedby')).toContain(helperText.id);
    });

    it('has accessible name from label (WCAG 4.1.2)', () => {
      render(<Radio name="plan" value="pro" label="Pro Plan - Best Value" />);
      const radio = screen.getByRole('radio', {
        name: 'Pro Plan - Best Value',
      });

      expect(radio).toBeInTheDocument();
    });

    it('announces required state to screen readers (WCAG 3.3.2)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" required />);
      const radio = screen.getByRole('radio', { name: /Basic Plan/i });

      expect(radio).toHaveAttribute('required');
    });

    it('maintains name and value for form submission (WCAG 4.1.2)', () => {
      render(<Radio name="subscription" value="monthly" label="Monthly" />);
      const radio = screen.getByLabelText('Monthly');

      expect(radio).toHaveAttribute('name', 'subscription');
      expect(radio).toHaveAttribute('value', 'monthly');
    });
  });
});
