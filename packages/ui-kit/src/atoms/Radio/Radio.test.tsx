import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders with label and associates label', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByLabelText('Option A')).toBeInTheDocument();
  });

  it('is type radio and supports defaultChecked', () => {
    render(<Radio label="Option A" defaultChecked />);
    const radio = screen.getByLabelText('Option A') as HTMLInputElement;
    expect(radio.type).toBe('radio');
    expect(radio.checked).toBe(true);
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn();
    render(<Radio label="Option A" onChange={onChange} />);
    const radio = screen.getByLabelText('Option A');
    await userEvent.click(radio);
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop true', () => {
    render(<Radio label="Option A" disabled />);
    const radio = screen.getByLabelText('Option A');
    expect(radio).toBeDisabled();
  });
});
