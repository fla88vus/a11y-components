import React, { useId } from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label (required for accessibility)
   */
  label: string;

  /**
   * Input type
   * @default "text"
   */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number';

  /**
   * Input size
   * @default "medium"
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Error message (when present, input is marked as invalid)
   */
  error?: string;

  /**
   * Helper text (additional description)
   */
  helperText?: string;

  /**
   * Full width input
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Hide label visually but keep it for screen readers
   * @default false
   */
  hideLabel?: boolean;
}

/**
 * Accessible Input component following WCAG 2.1 AA standards
 *
 * Features:
 * - Native <input> element for semantic HTML
 * - Proper label association via htmlFor
 * - Error states with aria-invalid and aria-describedby
 * - Helper text support
 * - Visible focus indicator
 * - Required indicator
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   required
 *   error="Invalid email address"
 *   helperText="We'll never share your email"
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      size = 'medium',
      error,
      helperText,
      fullWidth = false,
      hideLabel = false,
      required = false,
      disabled = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = error ? `${id}-error` : undefined;
    const helperTextId = helperText ? `${id}-helper` : undefined;

    // Build aria-describedby
    const describedBy = [errorId, helperTextId].filter(Boolean).join(' ') || undefined;

    const inputClasses = [
      styles.input,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      hideLabel && styles.visuallyHidden,
      required && styles.required,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && (
            <span className={styles.requiredIndicator} aria-label="required">
              {' '}
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={id}
          type={type}
          className={inputClasses}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          {...props}
        />

        {helperText && !error && (
          <span id={helperTextId} className={styles.helperText}>
            {helperText}
          </span>
        )}

        {error && (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
