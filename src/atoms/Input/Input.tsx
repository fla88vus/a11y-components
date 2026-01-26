import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual size variant
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Visual error state (adds red border)
   * Note: This only affects styling. For accessibility, use aria-invalid on the element.
   * @default false
   */
  error?: boolean;

  /**
   * Full width input
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Accessible Input atom - a styled <input> element
 *
 * This is a pure atom - just a styled HTML input with no label, error text, or helper text.
 * Use it standalone or compose it with Label, ErrorText, and HelperText atoms.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Input type="email" placeholder="Email" />
 * ```
 *
 * @example
 * With error state:
 * ```tsx
 * <Input type="email" error aria-invalid="true" />
 * ```
 *
 * @example
 * Full composition (use FormField molecule instead):
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" aria-describedby="email-error" />
 * <ErrorText id="email-error">Invalid email</ErrorText>
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      error = false,
      fullWidth = false,
      className,
      disabled = false,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.input,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <input ref={ref} type={type} className={classes} disabled={disabled} {...props} />;
  }
);

Input.displayName = 'Input';
