import React, { useState, forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

// ✅ Solo showCounter è custom — tutto il resto viene da HTML
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCounter?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      showCounter = false,
      fullWidth = false,
      size = 'medium',
      maxLength,
      onChange,
      value,
      defaultValue,
      className,
      disabled,
      ...rest // 👈 id, aria-describedby, aria-invalid, aria-required, rows, placeholder...
    },
    ref
  ) => {
    // ✅ Stato interno per il caso UNCONTROLLED
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
      typeof defaultValue === 'string' ? defaultValue : ''
    );

    const currentValue = isControlled ? (value as string) : internalValue;
    const characterCount = currentValue.length;
    const isOverLimit = maxLength ? characterCount >= maxLength : false;

    // ✅ Gestisce entrambi i casi e propaga l'evento al parent
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e); // 👈 propaga sempre al parent
    };

    // ✅ Composizione classi CSS
    const textareaClasses = [
      styles.textarea,
      styles[size],
      fullWidth && styles.fullWidth,
      rest['aria-invalid'] && styles.error, // 👈 arriva da FormField via ...rest
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <textarea
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          maxLength={maxLength}
          disabled={disabled}
          className={textareaClasses}
          {...rest}
        />
        {showCounter && (
          <span
            aria-live="polite"
            className={`${styles.counter} ${isOverLimit ? styles.counterError : ''}`}
          >
            {characterCount}
            {maxLength && ` / ${maxLength}`}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
