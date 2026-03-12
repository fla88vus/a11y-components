/**
 * Checkable Control Test Patterns
 *
 * Test patterns for checkable form controls:
 * - Checkbox
 * - Radio
 * - Switch
 *
 * These use checked state and group behavior
 */

import { screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { expect } from 'vitest';
import type { Mock } from 'vitest';

// ========================================
// BASIC RENDERING PATTERNS
// ========================================

export const checkableRenderingTests = {
  /**
   * Test that checkable renders with correct role
   */
  'renders with correct role'(role: 'checkbox' | 'radio') {
    const element = screen.getByRole(role);
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('INPUT');
    expect(element).toHaveAttribute('type', role);
  },

  /**
   * Test ref forwarding
   */
  'forwards ref to HTMLInputElement'(ref: React.RefObject<HTMLInputElement | null>) {
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  },

  /**
   * Test label association
   */
  'has proper label association'(labelText: string, role: 'checkbox' | 'radio') {
    const element = screen.getByRole(role, { name: labelText });
    expect(element).toBeInTheDocument();

    // Should be wrapped or associated with label
    const label = screen.getByText(labelText);
    const inputId = element.getAttribute('id');
    const labelFor = label.getAttribute('for');

    expect(inputId).toBeTruthy();
    expect(labelFor).toBe(inputId);
  },
};

// ========================================
// STATE PATTERNS
// ========================================

export const checkableStateTests = {
  /**
   * Test checked state
   */
  'handles checked state'(role: 'checkbox' | 'radio') {
    const element = screen.getByRole(role);
    expect(element).toBeChecked();
  },

  /**
   * Test unchecked state
   */
  'handles unchecked state'(role: 'checkbox' | 'radio') {
    const element = screen.getByRole(role);
    expect(element).not.toBeChecked();
  },

  /**
   * Test disabled state (native disabled)
   */
  'handles disabled state with native attribute'(role: 'checkbox' | 'radio') {
    const element = screen.getByRole(role);
    expect(element).toBeDisabled();
    expect(element).toHaveAttribute('disabled');
  },

  /**
   * Test indeterminate state (checkbox only)
   */
  'handles indeterminate state'() {
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  },
};

// ========================================
// INTERACTION PATTERNS
// ========================================

export const checkableInteractionTests = {
  /**
   * Test toggle on click
   */
  async 'toggles on click'(onChange: Mock, role: 'checkbox' | 'radio') {
    const user = userEvent.setup();
    const element = screen.getByRole(role);

    await user.click(element);
    expect(onChange).toHaveBeenCalled();
    expect(element).toBeChecked();
  },

  /**
   * Test toggle on Space key
   */
  async 'toggles on Space key'(onChange: Mock, role: 'checkbox' | 'radio') {
    const user = userEvent.setup();
    const element = screen.getByRole(role);

    element.focus();
    await user.keyboard(' ');

    expect(onChange).toHaveBeenCalled();
  },

  /**
   * Test disabled prevents interaction
   */
  async 'prevents interaction when disabled'(onChange: Mock, role: 'checkbox' | 'radio') {
    const user = userEvent.setup();
    const element = screen.getByRole(role);

    expect(element).toBeDisabled();

    await user.click(element);
    expect(onChange).not.toHaveBeenCalled();
  },
};

// ========================================
// GROUP PATTERNS
// ========================================

export const checkableGroupTests = {
  /**
   * Test group has proper role
   */
  'group has correct role'(groupRole: 'radiogroup' | 'group') {
    const group = screen.getByRole(groupRole);
    expect(group).toBeInTheDocument();
  },

  /**
   * Test group has accessible name
   */
  'group has accessible name'(groupRole: 'radiogroup' | 'group', groupName: string) {
    const group = screen.getByRole(groupRole, { name: groupName });
    expect(group).toBeInTheDocument();
  },

  /**
   * Test all items share same name attribute
   */
  'all items share same name attribute'(role: 'radio' | 'checkbox', expectedName: string) {
    const items = screen.getAllByRole(role);

    items.forEach((item) => {
      expect(item).toHaveAttribute('name', expectedName);
    });
  },

  /**
   * Test all items share aria-describedby
   */
  'all items share aria-describedby'(role: 'radio' | 'checkbox', describedById: string) {
    const items = screen.getAllByRole(role);

    items.forEach((item) => {
      expect(item).toHaveAttribute('aria-describedby', expect.stringContaining(describedById));
    });
  },

  /**
   * Test radio group allows only one selection
   */
  async 'radio group allows only one selection'(groupName: string) {
    const user = userEvent.setup();
    const radios = screen.getAllByRole('radio').filter((r) => r.getAttribute('name') === groupName);

    // Click first radio
    await user.click(radios[0]);
    expect(radios[0]).toBeChecked();

    // Click second radio - first should be unchecked
    await user.click(radios[1]);
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
  },

  /**
   * Test checkbox group allows multiple selections
   */
  async 'checkbox group allows multiple selections'() {
    const user = userEvent.setup();
    const checkboxes = screen.getAllByRole('checkbox');

    // Check multiple
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  },
};

// ========================================
// KEYBOARD NAVIGATION PATTERNS (GROUP)
// ========================================

export const checkableGroupKeyboardTests = {
  /**
   * Test Tab navigates to group
   */
  async 'Tab navigates to first checked or first item'(role: 'radio' | 'checkbox') {
    const user = userEvent.setup();
    await user.tab();

    const items = screen.getAllByRole(role);
    const focusedItem = items.find((item) => item === document.activeElement);

    expect(focusedItem).toBeTruthy();
  },

  /**
   * Test Arrow keys navigate within radio group
   */
  async 'Arrow keys navigate within radio group'() {
    const user = userEvent.setup();
    const radios = screen.getAllByRole('radio');

    // Focus first radio
    radios[0].focus();
    expect(radios[0]).toHaveFocus();

    // Arrow Down moves to next
    await user.keyboard('{ArrowDown}');
    expect(radios[1]).toHaveFocus();
    expect(radios[1]).toBeChecked(); // Radio groups auto-select on focus

    // Arrow Up moves back
    await user.keyboard('{ArrowUp}');
    expect(radios[0]).toHaveFocus();
  },
};
