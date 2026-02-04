import * as React from 'react';
import { CheckboxGroupContext } from '../../primitives/CheckboxGroupContext';

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

  const checked = group ? group.value.includes(value) : checkedProp;
  const disabled = group?.disabled || disabledProp;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (group) group.onItemChange(value, e.target.checked);
    onChange?.(e);
  };

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
        ref={(el) => {
          if (el && indeterminate) el.indeterminate = indeterminate;
        }}
      />
      {label}
    </label>
  );
};
