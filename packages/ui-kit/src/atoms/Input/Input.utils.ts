/**
 * Utility functions for Input component
 */

/**
 * Combines class names, filtering out falsy values
 */
export const combineClassNames = (...classes: (string | false | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Determines if input should be disabled
 */
export const isInputDisabled = (disabled?: boolean): boolean => {
  return Boolean(disabled);
};

/**
 * Builds aria-describedby value from error and helper text IDs
 */
export const buildDescribedBy = (errorId?: string, helperTextId?: string): string | undefined => {
  const ids = [errorId, helperTextId].filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
};

/**
 * Validates if an input value is required but empty
 */
export const isRequiredAndEmpty = (value: string, required: boolean): boolean => {
  return required && value.trim().length === 0;
};
