import * as React from 'react';
import { CheckboxGroupContext } from '../../primitives/CheckboxGroupContext';
import { HelperText } from '../../atoms/HelperText';
import { ErrorText } from '../../atoms/ErrorText/ErrorText';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import styles from './CheckboxGroup.module.css';

export interface CheckboxGroupProps {
  legend: string;
  name: string;
  value: string[];
  onChange: (values: string[]) => void;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export const CheckboxGroup = ({
  legend,
  name,
  value,
  onChange,
  helperText,
  error,
  disabled,
  showSelectAll = false,
  selectAllLabel = 'Select All',
  children,
  className,
}: CheckboxGroupProps) => {
  const groupId = React.useId();
  const helperId = helperText ? `${groupId}-helper` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  const isCheckboxElement = (
    child: React.ReactNode
  ): child is React.ReactElement<{ value: string }> =>
    React.isValidElement<{ value: string }>(child) && child.type === Checkbox;

  const allValues = React.Children.toArray(children)
    .filter(isCheckboxElement)
    .map((child) => String(child.props.value));

  const isAllChecked = allValues.length > 0 && value.length === allValues.length;
  const isIndeterminate = value.length > 0 && value.length < allValues.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? allValues : []);
  };

  const handleItemChange = (itemValue: string, checked: boolean) => {
    let nextValues: string[];
    if (checked) {
      nextValues = [...value, itemValue];
    } else {
      nextValues = value.filter((v) => v !== itemValue);
    }
    onChange(nextValues);
  };

  return (
    <fieldset
      className={[styles.group, className].filter(Boolean).join(' ')}
      disabled={disabled}
      aria-invalid={!!error}
      aria-describedby={describedBy}
    >
      <legend className={styles.legend}>{legend}</legend>

      <CheckboxGroupContext.Provider
        value={{ value, onItemChange: handleItemChange, disabled, name, describedBy }}
      >
        <div className={styles.checkboxList}>
          {showSelectAll && (
            <Checkbox
              // aggiungere classe css per selectAll
              value="__selectAll"
              label={selectAllLabel}
              checked={isAllChecked}
              indeterminate={isIndeterminate}
              onChange={handleSelectAll}
            />
          )}
          <div className={styles.options}>{children}</div>
        </div>
      </CheckboxGroupContext.Provider>

      {helperText && <HelperText id={helperId}>{helperText}</HelperText>}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </fieldset>
  );
};
