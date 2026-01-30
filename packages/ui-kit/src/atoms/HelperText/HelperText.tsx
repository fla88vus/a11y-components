import React from 'react';
import styles from './HelperText.module.css';

export interface HelperTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Helper text content
   */
  children: React.ReactNode;
}

/**
 * Accessible HelperText atom - styled text for providing additional field information
 *
 * This is a pure atom that can be associated with any form field via aria-describedby.
 *
 * @example
 * ```tsx
 * <input id="email" aria-describedby="email-helper" />
 * <HelperText id="email-helper">We'll never share your email</HelperText>
 * ```
 */
export const HelperText = React.forwardRef<HTMLSpanElement, HelperTextProps>(
  ({ children, className, ...props }, ref) => {
    const classes = [styles.helperText, className].filter(Boolean).join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

HelperText.displayName = 'HelperText';
