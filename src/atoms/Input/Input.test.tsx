import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Atom', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies default type="text"', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('accepts different input types', () => {
    render(<Input type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies size variants', () => {
    const { rerender } = render(<Input size="small" />);
    let input = screen.getByRole('textbox');
    expect(input).toHaveClass('small');

    rerender(<Input size="large" />);
    input = screen.getByRole('textbox');
    expect(input).toHaveClass('large');
  });

  it('applies error styling when error prop is true', () => {
    render(<Input error />);
    expect(screen.getByRole('textbox')).toHaveClass('error');
  });

  it('applies fullWidth class', () => {
    render(<Input fullWidth />);
    expect(screen.getByRole('textbox')).toHaveClass('fullWidth');
  });

  it('handles disabled state', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('accepts custom className', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('passes through HTML attributes', () => {
    render(<Input placeholder="Enter text" data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'Hello');
    expect(input).toHaveValue('Hello');
  });

  it('can be used with aria attributes for accessibility', () => {
    render(<Input aria-label="Email" aria-describedby="email-error" aria-invalid="true" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Email');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('works with Label atom', () => {
    render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" />
      </>
    );

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');
    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });
});
