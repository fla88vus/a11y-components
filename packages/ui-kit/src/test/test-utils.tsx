/**
 * Centralized Testing Utilities
 * Provides reusable helpers for component and accessibility testing
 */

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { axe, JestAxeConfigureOptions } from 'jest-axe';
import { expect } from 'vitest';

/**
 * Custom render with common providers
 * Future: Add theme provider, i18n, router context here
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return render(ui, { ...options });
}

/**
 * Run axe accessibility tests and expect no violations
 * Note: toHaveNoViolations is already extended in setup.ts
 */
export async function expectNoA11yViolations(
  container: HTMLElement,
  options?: JestAxeConfigureOptions
): Promise<void> {
  const results = await axe(container, options);
  expect(results).toHaveNoViolations();
}

/**
 * Get the accessible name of an element
 */
export function getAccessibleName(element: HTMLElement): string {
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    return labelElement?.textContent || '';
  }

  return element.textContent || '';
}

/**
 * Check if element has visible focus indicator
 */
export function hasFocusIndicator(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element);

  return Boolean(
    (styles.outline && styles.outline !== 'none') ||
    styles.boxShadow ||
    (styles.border && styles.border !== 'none')
  );
}

/**
 * Check if element is properly disabled
 */
export function isProperlyDisabled(element: HTMLElement): boolean {
  const hasDisabledAttr = element.hasAttribute('disabled');
  const hasAriaDisabled = element.getAttribute('aria-disabled') === 'true';

  return hasDisabledAttr || hasAriaDisabled;
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors));
}

// ========================================
// RE-EXPORTS
// ========================================

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Re-export test patterns (must be after testing-library exports)
export * from './test-patterns';
