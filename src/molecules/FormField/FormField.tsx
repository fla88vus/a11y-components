import React, { useId } from 'react';

import styles from './FormField.module.css';
import { HelperText } from '../../atoms/HelperText/HelperText';
import { Label } from '../../atoms/Label/Label';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';

/**
 * Props che vengono passate al field child tramite render prop
 */
export interface FormFieldChildProps {
  /**
   * Unique ID for the field (for label association)
   */
  id: string;

  /**
   * Space-separated IDs of elements describing this field
   */
  'aria-describedby'?: string;

  /**
   * Indicates field has validation error
   */
  'aria-invalid'?: boolean;

  /**
   * Indicates field is required
   */
  'aria-required'?: boolean;
}

export interface FormFieldProps {
  /**
   * Label text (required for accessibility)
   */
  label: string;

  /**
   * Render prop function that receives field props
   *
   * @example
   * ```tsx
   * <FormField label="Email">
   *   {(props) => <Input type="email" {...props} />}
   * </FormField>
   * ```
   */
  children: (fieldProps: FormFieldChildProps) => React.ReactElement;

  /**
   * Error message - when present, shows error text instead of helper text
   */
  error?: string;

  /**
   * Helper text - additional description (hidden when error is present)
   */
  helperText?: string;

  /**
   * Mark field as required
   * @default false
   */
  required?: boolean;

  /**
   * Hide label visually but keep it for screen readers
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Ref to the label element
   */
  labelRef?: React.Ref<HTMLLabelElement>;

  /**
   * Ref to the error text element
   */
  errorRef?: React.Ref<HTMLSpanElement>;

  /**
   * Ref to the helper text element
   */
  helperRef?: React.Ref<HTMLSpanElement>;

  /**
   * Additional className for the wrapper
   */
  className?: string;
}

/**
 * FormField molecule - Composes Label, Input/Field, HelperText, and ErrorText atoms
 *
 * Uses render props pattern for maximum type safety and flexibility.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <FormField label="Email" required>
 *   {(props) => <Input type="email" {...props} />}
 * </FormField>
 * ```
 *
 * @example
 * With error:
 * ```tsx
 * <FormField
 *   label="Email"
 *   error="Invalid email address"
 *   required
 * >
 *   {(props) => <Input type="email" error {...props} />}
 * </FormField>
 * ```
 *
 * @example
 * With helper text:
 * ```tsx
 * <FormField
 *   label="Password"
 *   helperText="Must be at least 8 characters"
 * >
 *   {(props) => <Input type="password" {...props} />}
 * </FormField>
 * ```
 *
 * @example
 * With custom field (select):
 * ```tsx
 * <FormField label="Country">
 *   {(props) => (
 *     <select {...props}>
 *       <option>USA</option>
 *       <option>UK</option>
 *     </select>
 *   )}
 * </FormField>
 * ```
 *
 * @example
 * With additional custom props:
 * ```tsx
 * <FormField label="Email">
 *   {(props) => (
 *     <Input
 *       type="email"
 *       autoComplete="email"
 *       placeholder="email@example.com"
 *       {...props}
 *     />
 *   )}
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
  helperText,
  required = false,
  hideLabel = false,
  labelRef,
  errorRef,
  helperRef,
  className,
}) => {
  // Generate unique IDs for accessibility
  const generatedId = useId();
  const fieldId = generatedId;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helperId = helperText && !error ? `${fieldId}-helper` : undefined;

  // Build aria-describedby
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  // Props to pass to the field via render prop
  const fieldProps: FormFieldChildProps = {
    id: fieldId,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
  };

  const wrapperClasses = [styles.formField, className].filter(Boolean).join(' ');

  const labelClasses = [hideLabel && styles.visuallyHidden].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <Label ref={labelRef} htmlFor={fieldId} required={required} className={labelClasses}>
        {label}
      </Label>

      {/* Call render prop with fieldProps */}
      {children(fieldProps)}

      {helperText && !error && (
        <HelperText ref={helperRef} id={helperId}>
          {helperText}
        </HelperText>
      )}

      {error && (
        <ErrorText ref={errorRef} id={errorId}>
          {error}
        </ErrorText>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';
