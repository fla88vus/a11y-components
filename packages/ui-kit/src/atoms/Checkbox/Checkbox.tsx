import * as React from 'react';
import { CheckboxGroupContext } from '../../primitives/CheckboxGroupContext';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  value: string;
  label: string;
  checked?: boolean; // for standalone usage
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indeterminate?: boolean;
  id?: string;
}

export const Checkbox = ({
  value,
  label,
  checked: checkedProp,
  disabled: disabledProp,
  onChange,
  indeterminate,
  id: providedId,
}: CheckboxProps) => {
  const group = React.useContext(CheckboxGroupContext);
  const generatedId = React.useId();
  const id = providedId ?? generatedId;

  const checked =
    checkedProp !== undefined ? checkedProp : group ? group.value.includes(value) : false;
  const disabled = disabledProp ?? group?.disabled ?? false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (group) group.onItemChange(value, e.target.checked);
    onChange?.(e);
  };
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        name={group?.name}
        checked={checked}
        disabled={disabled}
        aria-describedby={group?.describedBy}
        onChange={handleChange}
        ref={inputRef}
        className={[styles.checkbox, indeterminate && styles.indeterminate]
          .filter(Boolean)
          .join(' ')}
      />
      {label}
    </label>
  );
};
