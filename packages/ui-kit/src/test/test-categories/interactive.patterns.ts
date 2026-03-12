/**
 * Interactive Component Test Patterns
 *
 * Test patterns for interactive components:
 * - Button
 * - Link
 * - IconButton
 * - Toggle
 *
 * These are clickable components that use aria-disabled pattern
 */

import { screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { expect } from 'vitest';
import type { Mock } from 'vitest';

// ========================================
// BASIC RENDERING PATTERNS
// ========================================

export const interactiveRenderingTests = {
  /**
   * Test that interactive component renders with correct element
   */
  'renders as semantic element'(role: 'button' | 'link', tagName: string = 'BUTTON') {
    const element = screen.getByRole(role);
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe(tagName);
  },

  /**
   * Test ref forwarding for interactive components
   */
  'forwards ref correctly'(
    ref: React.RefObject<HTMLButtonElement | HTMLAnchorElement | null>,
    expectedType: 'HTMLButtonElement' | 'HTMLAnchorElement'
  ) {
    expect(ref.current).toBeInstanceOf(window[expectedType]);
  },

  /**
   * Test custom className
   */
  'accepts custom className'(role: 'button' | 'link', className: string) {
    const element = screen.getByRole(role);
    expect(element).toHaveClass(className);
  },

  /**
   * Test variant rendering
   */
  'renders with variant class'(role: 'button' | 'link', variant: string) {
    const element = screen.getByRole(role);
    expect(element).toHaveClass(variant);
  },

  /**
   * Test size rendering
   */
  'renders with size class'(role: 'button' | 'link', size: string) {
    const element = screen.getByRole(role);
    expect(element).toHaveClass(size);
  },
};

// ========================================
// STATE PATTERNS (aria-disabled)
// ========================================

export const interactiveStateTests = {
  /**
   * Test disabled state (uses aria-disabled, NOT native disabled)
   */
  'handles disabled state with aria-disabled'() {
    const element = screen.getByRole('button');

    // Uses aria-disabled to keep in tab order
    expect(element).toHaveAttribute('aria-disabled', 'true');
    expect(element).not.toBeDisabled(); // Still focusable!
    expect(element).toHaveClass('disabled');
  },

  /**
   * Test loading state
   */
  'handles loading state'() {
    const element = screen.getByRole('button');

    expect(element).toHaveAttribute('aria-busy', 'true');
    expect(element).toHaveAttribute('aria-disabled', 'true');

    // Loading status announced
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
  },
};

// ========================================
// INTERACTION PATTERNS
// ========================================

export const interactiveInteractionTests = {
  /**
   * Test click handling
   */
  async 'handles click events'(onClick: Mock) {
    const user = userEvent.setup();
    const element = screen.getByRole('button');

    await user.click(element);
    expect(onClick).toHaveBeenCalledTimes(1);
  },

  /**
   * Test disabled prevents click
   */
  async 'prevents click when disabled'(onClick: Mock) {
    const user = userEvent.setup();
    const element = screen.getByRole('button');

    expect(element).toHaveAttribute('aria-disabled', 'true');

    await user.click(element);
    expect(onClick).not.toHaveBeenCalled();
  },

  /**
   * Test loading prevents click
   */
  async 'prevents click when loading'(onClick: Mock) {
    const user = userEvent.setup();
    const element = screen.getByRole('button');

    expect(element).toHaveAttribute('aria-busy', 'true');

    await user.click(element);
    expect(onClick).not.toHaveBeenCalled();
  },
};

// ========================================
// KEYBOARD PATTERNS
// ========================================

export const interactiveKeyboardTests = {
  /**
   * Test Tab focus
   */
  async 'is focusable with Tab'(role: 'button' | 'link' = 'button') {
    const user = userEvent.setup();
    await user.tab();
    expect(screen.getByRole(role)).toHaveFocus();
  },

  /**
   * Test Enter activation
   */
  async 'activates with Enter key'(onClick: Mock, role: 'button' | 'link' = 'button') {
    const user = userEvent.setup();
    const element = screen.getByRole(role);

    element.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  },

  /**
   * Test Space activation (buttons only)
   */
  async 'activates with Space key'(onClick: Mock) {
    const user = userEvent.setup();
    const element = screen.getByRole('button');

    element.focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalled();
  },

  /**
   * Test disabled stays in tab order
   */
  async 'remains in tab order when disabled'() {
    const user = userEvent.setup();
    await user.tab();

    const element = screen.getByRole('button');
    expect(element).toHaveFocus();
    expect(element).toHaveAttribute('aria-disabled', 'true');
  },
};

// ========================================
// ARIA PATTERNS
// ========================================

export const interactiveAriaTests = {
  /**
   * Test accessible name from children
   */
  'has accessible name from children'(text: string, role: 'button' | 'link' = 'button') {
    expect(screen.getByRole(role, { name: text })).toBeInTheDocument();
  },

  /**
   * Test aria-label for icon-only
   */
  'supports aria-label for icon-only'(label: string, role: 'button' | 'link' = 'button') {
    const element = screen.getByRole(role, { name: label });
    expect(element).toHaveAttribute('aria-label', label);
  },

  /**
   * Test decorative icon is hidden
   */
  'hides decorative icons from screen readers'(iconSelector: string) {
    const icon = document.querySelector(iconSelector);
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  },
};
