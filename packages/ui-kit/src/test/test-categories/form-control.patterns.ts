/**
 * Form Control Test Patterns
 *
 * Test suites specifically for form input controls:
 * - Input (text, email, number, etc.)
 * - Textarea
 * - Select
 *
 * These are INPUT elements that accept user data.
 */

import { screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { expect } from 'vitest';
import type { Mock } from 'vitest';
import type React from 'react';
import {
  expectDisabledState,
  expectInvalidState,
  expectRequiredState,
  expectDescribedBy,
  expectLabelAssociation,
} from '../test-patterns';

// ========================================
// BASIC RENDERING PATTERNS
// ========================================

type FormControlTagName = 'INPUT' | 'TEXTAREA' | 'SELECT';

export const formControlRenderingTests = {
  /**
   * Test that form control renders with correct semantic element
   */
  'renders as native input element'(
    role: 'textbox' | 'combobox' | 'spinbutton' = 'textbox',
    tagName: FormControlTagName = 'INPUT'
  ) {
    const input = screen.getByRole(role);
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe(tagName);
  },

  /**
   * Test ref forwarding for form controls
   */
  'forwards ref to HTMLInputElement'(
    ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
    tagName: FormControlTagName = 'INPUT'
  ) {
    expect(ref.current).toBeInstanceOf(
      tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement
    );
    expect(ref.current?.tagName).toBe(tagName);
  },

  /**
   * Test custom className
   */
  'accepts custom className'(className: string) {
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(className);
  },

  /**
   * Test size variants
   */
  'renders with size variant'(size: 'small' | 'medium' | 'large') {
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(size);
  },

  /**
   * Test fullWidth prop
   */
  'applies fullWidth class'() {
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('fullWidth');
  },

  /**
   * Test error visual state
   */
  'applies error class when error prop is true'() {
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('error');
  },
};

// ========================================
// FORM CONTROL STATE PATTERNS
// ========================================

export const formControlStateTests = {
  /**
   * Test disabled state (uses NATIVE disabled)
   */
  'handles disabled state with native attribute'() {
    const input = screen.getByRole('textbox');
    expectDisabledState(input, false); // false = native disabled
  },

  /**
   * Test required state
   */
  'supports required attribute'() {
    const input = screen.getByRole('textbox');
    expectRequiredState(input);
  },

  /**
   * Test readonly state
   */
  'supports readonly attribute'() {
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  },

  /**
   * Test error state with ARIA
   */
  'marks invalid state with aria-invalid'() {
    const input = screen.getByRole('textbox');
    expectInvalidState(input);
  },

  /**
   * Test placeholder
   */
  'supports placeholder attribute'(placeholder: string) {
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', placeholder);
  },
};

// ========================================
// USER INTERACTION PATTERNS
// ========================================

export const formControlInteractionTests = {
  /**
   * Test user typing
   */
  async 'accepts user input'(onChange: Mock, expectedValue: string = 'test@example.com') {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await user.type(input, expectedValue);
    expect(onChange).toHaveBeenCalled();
    expect(input.value).toBe(expectedValue);
  },

  /**
   * Test clearing input
   */
  async 'allows clearing value'() {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await user.type(input, 'text');
    expect(input.value).toBe('text');

    await user.clear(input);
    expect(input.value).toBe('');
  },

  /**
   * Test disabled prevents input
   */
  async 'prevents input when disabled'() {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toBeDisabled();

    await user.type(input, 'text');
    expect(input.value).toBe(''); // No change
  },

  /**
   * Test readonly prevents input
   */
  async 'prevents editing when readonly'() {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toHaveAttribute('readonly');

    // Try to type (should not change value)
    await user.type(input, 'new');
    expect(input.value).not.toContain('new');
  },

  /**
   * Test focus/blur events
   */
  async 'handles focus and blur events'(onFocus: Mock, onBlur: Mock) {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(onFocus).toHaveBeenCalled();

    await user.tab(); // Focus out
    expect(onBlur).toHaveBeenCalled();
  },
};

// ========================================
// ACCESSIBILITY PATTERNS
// ========================================

export const formControlA11yTests = {
  /**
   * Test keyboard focus
   */
  async 'is focusable with Tab'() {
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole('textbox')).toHaveFocus();
  },

  /**
   * Test label association
   */
  'has proper label association'(labelText: string) {
    expectLabelAssociation(labelText, 'textbox');
  },

  /**
   * Test aria-describedby for errors
   */
  'supports aria-describedby for error messages'(errorId: string) {
    const input = screen.getByRole('textbox');
    expectDescribedBy(input, errorId);

    // Error element should have role="alert"
    const error = document.getElementById(errorId);
    expect(error).toHaveAttribute('role', 'alert');
  },

  /**
   * Test aria-describedby for helpers
   */
  'supports aria-describedby for helper text'(helperId: string) {
    const input = screen.getByRole('textbox');
    expectDescribedBy(input, helperId);

    // Helper should NOT have role="alert" (not urgent)
    const helper = document.getElementById(helperId);
    expect(helper).not.toHaveAttribute('role', 'alert');
  },

  /**
   * Test aria-describedby for both error and helper
   */
  'supports multiple aria-describedby IDs'(errorId: string, helperId: string) {
    const input = screen.getByRole('textbox');
    expectDescribedBy(input, [errorId, helperId]);
  },

  /**
   * Test type attribute for semantic meaning
   */
  'uses appropriate input type'(expectedType: string) {
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', expectedType);
  },
};

// ========================================
// INPUT TYPE SPECIFIC PATTERNS
// ========================================

/**
 * Additional tests for email inputs
 */
export const emailInputTests = {
  'has email input type'() {
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  },

  'validates email format'() {
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.validity.typeMismatch).toBeDefined();
  },
};

/**
 * Additional tests for number inputs
 */
export const numberInputTests = {
  'has number input type'() {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  },

  'supports min and max attributes'(min: number, max: number) {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('min', String(min));
    expect(input).toHaveAttribute('max', String(max));
  },

  'supports step attribute'(step: number) {
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('step', String(step));
  },
};

/**
 * Additional tests for password inputs
 */
export const passwordInputTests = {
  'has password input type'() {
    const input = screen.getByLabelText(/password/i);
    expect(input).toHaveAttribute('type', 'password');
  },

  'masks input value'() {
    const input = screen.getByLabelText(/password/i) as HTMLInputElement;
    expect(input.type).toBe('password');
  },
};
