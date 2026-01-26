import React from 'react';
import styles from './ErrorText.module.css';

export interface ErrorTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Error message content
   */
  children: React.ReactNode;
}

/**
 * Accessible ErrorText atom - styled error message with role="alert"
 *
 * This is a pure atom for displaying error messages.
 * Uses role="alert" for immediate screen reader announcement.
 *
 * @example
 * ```tsx
 * <input id="email" aria-describedby="email-error" aria-invalid="true" />
 * <ErrorText id="email-error">Invalid email address</ErrorText>
 * ```
 */
export const ErrorText = React.forwardRef<HTMLSpanElement, ErrorTextProps>(
  ({ children, className, role = 'alert', ...props }, ref) => {
    const classes = [styles.errorText, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} role={role} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

ErrorText.displayName = 'ErrorText';
