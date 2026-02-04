import React from 'react';
import { useGroupContext } from '../../primitives/GroupContext';
import { Label } from '../Label';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'size'
> {
  label: string;
  disabled?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, id: providedId, className, disabled, ...props }, ref) => {
    const group = useGroupContext();
    const generatedId = React.useId();
    const id = providedId ?? generatedId;

    return (
      <div className={[styles.radio, className].filter(Boolean).join(' ')}>
        <input
          ref={ref}
          id={id}
          type="radio"
          name={group?.name}
          aria-describedby={group?.describedBy}
          disabled={disabled ?? group?.disabled}
          {...props}
        />
        <Label htmlFor={id}>{label}</Label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';
