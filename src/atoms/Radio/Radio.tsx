import React, { useId } from "react";
import styles from "./Radio.module.css";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label: string;
  size?: "small" | "medium" | "large";
  error?: string;
  helperText?: string;
  name: string;
  value: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
      name,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || `${name}-${value}-${generatedId}`;
    const errorId = error ? `${id}-error` : undefined;
    const helperTextId = helperText ? `${id}-helper` : undefined;

    const describedBy =
      [errorId, helperTextId].filter(Boolean).join(" ") || undefined;

    const radioClasses = [
      styles.radio,
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
      <div className={styles.radioWrapper}>
        <div className={styles.inputGroup}>
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={value}
            className={radioClasses}
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

Radio.displayName = "Radio";
