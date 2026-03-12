/**
 * Reusable Test Patterns
 *
 * Generic test helpers that work across all component types.
 * For category-specific patterns, see test-categories/
 */

import { screen, within } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { expect } from 'vitest';
import type { Mock } from 'vitest';

// ========================================
// KEYBOARD NAVIGATION PATTERNS
// ========================================

/**
 * Test that element is focusable via Tab key
 * @param role - ARIA role of the element to test
 */
export async function testTabFocus(role: string, options?: { name?: string }) {
  const user = userEvent.setup();
  await user.tab();

  const element = options?.name
    ? screen.getByRole(role, { name: options.name })
    : screen.getByRole(role);

  expect(element).toHaveFocus();
}

/**
 * Test that element activates with Enter key
 */
export async function testEnterActivation(
  role: string,
  callback: Mock,
  options?: { name?: string }
) {
  const user = userEvent.setup();
  const element = options?.name
    ? screen.getByRole(role, { name: options.name })
    : screen.getByRole(role);

  element.focus();
  await user.keyboard('{Enter}');
  expect(callback).toHaveBeenCalled();
}

/**
 * Test that element activates with Space key
 */
export async function testSpaceActivation(
  role: string,
  callback: Mock,
  options?: { name?: string }
) {
  const user = userEvent.setup();
  const element = options?.name
    ? screen.getByRole(role, { name: options.name })
    : screen.getByRole(role);

  element.focus();
  await user.keyboard(' ');
  expect(callback).toHaveBeenCalled();
}
// ========================================
// ARIA ATTRIBUTE PATTERNS
// ========================================

/**
 * Verify element has correct aria-disabled state
 * @param useAriaDisabled - If true, expects aria-disabled; if false, expects native disabled
 */
export function expectDisabledState(element: HTMLElement, useAriaDisabled: boolean = false) {
  if (useAriaDisabled) {
    // Pattern: Interactive controls (Button)
    expect(element).toHaveAttribute('aria-disabled', 'true');
    expect(element).not.toBeDisabled(); // Still focusable
  } else {
    // Pattern: Form inputs (Input, Checkbox, Radio)
    expect(element).toBeDisabled();
    expect(element).toHaveAttribute('disabled');
  }
}

/**
 * Verify element has correct aria-invalid state
 */
export function expectInvalidState(element: HTMLElement) {
  expect(element).toHaveAttribute('aria-invalid', 'true');
}

/**
 * Verify element has aria-required
 */
export function expectRequiredState(element: HTMLElement) {
  expect(element).toHaveAttribute('aria-required', 'true');
  expect(element).toHaveAttribute('required'); // Native for browser validation
}

/**
 * Verify element has correct aria-describedby linkage
 */
export function expectDescribedBy(element: HTMLElement, expectedIds: string | string[]) {
  const describedBy = element.getAttribute('aria-describedby');
  expect(describedBy).toBeTruthy();

  const ids = Array.isArray(expectedIds) ? expectedIds : [expectedIds];
  ids.forEach((id) => {
    expect(describedBy).toContain(id);
    expect(document.getElementById(id)).toBeInTheDocument();
  });
}

/**
 * Verify loading state pattern (Button)
 */
export function expectLoadingState(buttonElement: HTMLElement) {
  expect(buttonElement).toHaveAttribute('aria-busy', 'true');
  expect(buttonElement).toHaveAttribute('aria-disabled', 'true');

  // Should have status announcement
  const status = screen.getByRole('status');
  expect(status).toBeInTheDocument();
  expect(status).toHaveAttribute('aria-live', 'polite');
}

// ========================================
// ERROR PATTERN
// ========================================

/**
 * Verify complete error state pattern
 * Tests: aria-invalid + aria-describedby + role="alert"
 */
export function expectErrorPattern(fieldRole: string, errorId: string) {
  const field = screen.getByRole(fieldRole);

  // Field marked as invalid
  expect(field).toHaveAttribute('aria-invalid', 'true');

  // Field links to error message
  expectDescribedBy(field, errorId);

  // Error message has alert role
  const errorElement = document.getElementById(errorId);
  expect(errorElement).toHaveAttribute('role', 'alert');
}

// ========================================
// HELPER TEXT PATTERN
// ========================================

/**
 * Verify helper text pattern (non-urgent)
 */
export function expectHelperTextPattern(fieldRole: string, helperId: string) {
  const field = screen.getByRole(fieldRole);

  // Field links to helper
  expectDescribedBy(field, helperId);

  // Helper exists but NO role="alert" (not urgent)
  const helper = document.getElementById(helperId);
  expect(helper).toBeInTheDocument();
  expect(helper).not.toHaveAttribute('role', 'alert');
}

// ========================================
// GROUP PATTERN (RadioGroup, CheckboxGroup)
// ========================================

/**
 * Verify group accessibility pattern
 */
export function expectGroupPattern(
  groupRole: 'radiogroup' | 'group',
  groupLabel: string,
  itemCount: number
) {
  const group = screen.getByRole(groupRole);

  // Group has accessible name
  expect(group).toHaveAccessibleName(groupLabel);

  // Group has correct number of items
  const items =
    groupRole === 'radiogroup'
      ? within(group).getAllByRole('radio')
      : within(group).getAllByRole('checkbox');
  expect(items).toHaveLength(itemCount);
}

/**
 * Verify all items in group share same name attribute
 */
export function expectGroupItemsShareName(itemRole: 'radio' | 'checkbox', expectedName: string) {
  const items = screen.getAllByRole(itemRole);
  items.forEach((item) => {
    expect(item).toHaveAttribute('name', expectedName);
  });
}

/**
 * Verify all items in group share aria-describedby
 */
export function expectGroupItemsShareDescribedBy(
  itemRole: 'radio' | 'checkbox',
  describedById: string
) {
  const items = screen.getAllByRole(itemRole);
  items.forEach((item) => {
    expectDescribedBy(item, describedById);
  });
}

// ========================================
// ICON PATTERN
// ========================================

/**
 * Verify decorative icon pattern
 */
export function expectDecorativeIcon(iconElement: HTMLElement | null) {
  expect(iconElement).toHaveAttribute('aria-hidden', 'true');
}

/**
 * Verify meaningful icon pattern
 */
export function expectMeaningfulIcon(iconElement: HTMLElement, label: string) {
  expect(iconElement).toHaveAttribute('role', 'img');
  expect(iconElement).toHaveAttribute('aria-label', label);
}

// ========================================
// FOCUS INDICATOR PATTERN
// ========================================

/**
 * Verify element has visible focus indicator
 * Note: This is approximate - visual regression is better
 */
export function expectFocusIndicator(element: HTMLElement) {
  element.focus();
  expect(element).toHaveFocus();

  const styles = window.getComputedStyle(element);

  // Should have some focus indicator
  const hasFocusStyle =
    (styles.outline && styles.outline !== 'none' && styles.outline !== '0px') ||
    (styles.boxShadow && styles.boxShadow !== 'none') ||
    styles.outlineWidth !== '0px';

  expect(hasFocusStyle).toBe(true);
}

// ========================================
// REF FORWARDING PATTERN
// ========================================

/**
 * Verify ref is forwarded correctly
 */
export function expectRefForwarded(ref: React.RefObject<any>, expectedElementType: string) {
  expect(ref.current).toBeInstanceOf(
    // @ts-ignore - window[string] access
    window[`HTML${expectedElementType}Element`]
  );
}

// ========================================
// CLASS NAME PATTERN
// ========================================

/**
 * Verify custom className is applied
 */
export function expectCustomClassName(element: HTMLElement, className: string) {
  expect(element).toHaveClass(className);
}

/**
 * Verify size variant classes
 */
export function expectSizeVariant(element: HTMLElement, size: 'small' | 'medium' | 'large') {
  expect(element).toHaveClass(size);
}

/**
 * Verify visual error class
 */
export function expectErrorClass(element: HTMLElement) {
  expect(element).toHaveClass('error');
}

// ========================================
// LABEL ASSOCIATION PATTERN
// ========================================

/**
 * Verify label is properly associated with field
 */
export function expectLabelAssociation(labelText: string, fieldRole: string) {
  const field = screen.getByRole(fieldRole);
  const label = screen.getByText(labelText);

  // Get IDs
  const fieldId = field.getAttribute('id');
  const labelFor = label.getAttribute('for');

  // They should match
  expect(fieldId).toBe(labelFor);
  expect(fieldId).toBeTruthy();
}

/**
 * Verify hidden label (sr-only pattern)
 */
export function expectHiddenLabel(labelText: string) {
  const label = screen.getByText(labelText);
  expect(label).toBeInTheDocument();

  // Should have sr-only or similar class
  const styles = window.getComputedStyle(label);
  const isVisuallyHidden =
    styles.position === 'absolute' ||
    styles.clip === 'rect(0px, 0px, 0px, 0px)' ||
    styles.width === '1px' ||
    styles.height === '1px';

  expect(isVisuallyHidden).toBe(true);
}
