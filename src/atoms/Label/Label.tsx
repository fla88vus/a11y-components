import React from 'react';
import styles from './Label.module.css';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Mark the field as required (adds visual indicator)
   */
  required?: boolean;

  /**
   * Children (label text)
   */
  children: React.ReactNode;
}

/**
 * Accessible Label atom - a styled <label> element
 *
 * This is a pure atom that can be used with any form field.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email" required>Email Address</Label>
 * <input id="email" type="email" />
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, children, className, ...props }, ref) => {
    const classes = [styles.label, className].filter(Boolean).join(' ');

    return (
      <label ref={ref} className={classes} {...props}>
        {children}
        {required && (
          <span className={styles.required} aria-label="required">
            {' '}
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';
