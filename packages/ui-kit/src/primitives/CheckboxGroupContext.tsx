import * as React from 'react';

export interface CheckboxGroupContextValue {
  value: string[];
  onItemChange: (value: string, checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  describedBy?: string;
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null);

export const useCheckboxGroupContext = () => {
  const ctx = React.useContext(CheckboxGroupContext);
  if (!ctx) throw new Error('Checkbox must be used inside a CheckboxGroup');
  return ctx;
};
