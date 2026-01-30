// src/atoms/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Accessible button component following WCAG 2.1 AA standards
 *
 * Features:
 * - Native <button> element for semantic HTML
 * - Full keyboard support (Tab, Enter, Space)
 * - Screen reader announcements for loading state
 * - Visible focus indicator
 * - Color contrast compliant
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * <Button loading disabled>
 *   Submitting...
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      children,
      disabled = false,
      loading = false,
      fullWidth = false,
      className,
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Handle click with disabled check (prevents action but keeps focusable)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    // Handle keyboard events to prevent action when disabled
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
      }
    };

    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      loading && styles.loading,
      fullWidth && styles.fullWidth,
      isDisabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {loading && (
          <span role="status" aria-live="polite" className={styles.loadingContainer}>
            <span className={styles.spinner} aria-hidden="true" />
            <span className={styles.srOnly}>Loading...</span>
          </span>
        )}
        <span aria-hidden={loading || undefined}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
