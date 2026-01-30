import React, { useId, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label: string;
  size?: 'small' | 'medium' | 'large';
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'medium',
      error,
      helperText,
      disabled = false,
      required = false,
      indeterminate = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = error ? `${id}-error` : undefined;
    const helperTextId = helperText ? `${id}-helper` : undefined;

    const describedBy = [errorId, helperTextId].filter(Boolean).join(' ') || undefined;

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, checkboxRef]);

    const checkboxClasses = [
      styles.checkbox,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      indeterminate && styles.indeterminate,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [styles.label, disabled && styles.disabled, required && styles.required]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.checkboxWrapper}>
        <div className={styles.inputGroup}>
          <input
            ref={checkboxRef}
            id={id}
            type="checkbox"
            className={checkboxClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            aria-checked={indeterminate ? 'mixed' : undefined}
            {...props}
          />

          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && (
              <span className={styles.requiredIndicator} aria-label="required">
                {' '}
                *
              </span>
            )}
          </label>
        </div>

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

Checkbox.displayName = 'Checkbox';
