import React, { useId } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * Checkbox label (required for accessibility)
   */
  label: string;

  /**
   * Checkbox size
   * @default "medium"
   */
  size?: "small" | "medium" | "large";

  /**
   * Error message (when present, checkbox is marked as invalid)
   */
  error?: string;

  /**
   * Helper text (additional description)
   */
  helperText?: string;
}

/**
 * Accessible Checkbox component following WCAG 2.1 AA standards
 *
 * Features:
 * - Native <input type="checkbox"> element for semantic HTML
 * - Proper label association via htmlFor
 * - Space key toggles checked state (native behavior)
 * - Error states with aria-invalid and aria-describedby
 * - Helper text support
 * - Visible focus indicator
 * - Required indicator
 *
 * @example
 * ```tsx
 * <Checkbox label="I agree to terms" required />
 *
 * <Checkbox
 *   label="Subscribe to newsletter"
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 *   error="This field is required"
 * />
 * ```
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = "medium",
      error,
      helperText,
      disabled = false,
      required = false,
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
    const describedBy =
      [errorId, helperTextId].filter(Boolean).join(" ") || undefined;

    const checkboxClasses = [
      styles.checkbox,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const labelClasses = [
      styles.label,
      disabled && styles.disabled,
      required && styles.required,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.checkboxWrapper}>
        <div className={styles.inputGroup}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={checkboxClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
            {...props}
          />

          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && (
              <span className={styles.requiredIndicator} aria-label="required">
                {" "}
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

Checkbox.displayName = "Checkbox";
