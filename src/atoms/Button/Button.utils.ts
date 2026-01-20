/**
 * Utility functions for Button component
 */

/**
 * Combines class names, filtering out falsy values
 */
export const combineClassNames = (...classes: (string | false | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Determines if button should be disabled based on props
 */
export const isButtonDisabled = (props: { disabled?: boolean; loading?: boolean }): boolean => {
  return Boolean(props.disabled || props.loading);
};

/**
 * Gets the appropriate aria-label for loading state
 */
export const getLoadingLabel = (customLabel?: string): string => {
  return customLabel || 'Loading...';
};
