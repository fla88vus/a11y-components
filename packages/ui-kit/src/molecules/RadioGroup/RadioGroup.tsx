import * as React from 'react';
import { GroupProvider } from '../../primitives/GroupContext';
import styles from './Radiogroup.module.css';
import { HelperText } from '../../atoms/HelperText';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';

export interface RadioGroupProps {
  legend: string;
  name: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Radiogroup = ({
  legend,
  name,
  helperText,
  error,
  disabled,
  children,
  className,
}: RadioGroupProps) => {
  const groupId = React.useId();
  const helperId = helperText ? `${groupId}-helper` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;

  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset className={[styles.group, className].filter(Boolean).join(' ')} disabled={disabled}>
      <legend className={styles.legend}>{legend}</legend>

      <GroupProvider
        value={{
          name,
          describedBy,
          disabled,
        }}
      >
        <div>{children}</div>
      </GroupProvider>

      {helperText && <HelperText id={helperId}>{helperText}</HelperText>}

      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </fieldset>
  );
};
