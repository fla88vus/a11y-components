import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../../atoms/Input';
import { FormField } from './FormField';

describe('FormField with Render Props', () => {
  it('renders label and input', () => {
    render(<FormField label="Email">{(props) => <Input type="email" {...props} />}</FormField>);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor/id', () => {
    render(<FormField label="Email">{(props) => <Input type="email" {...props} />}</FormField>);

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', input.id);
  });

  it('passes id to field via render prop', () => {
    render(
      <FormField label="Email">
        {(props) => <Input type="email" data-testid="input" {...props} />}
      </FormField>
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('id');
    expect(input.id).toBeTruthy();
  });

  it('shows required indicator when required', () => {
    render(
      <FormField label="Email" required>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('passes aria-required to field when required', () => {
    render(
      <FormField label="Email" required>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('shows helper text when provided', () => {
    render(
      <FormField label="Email" helperText="We'll never share your email">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it('associates helper text with input via aria-describedby', () => {
    render(
      <FormField label="Email" helperText="Helper text">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const input = screen.getByRole('textbox');
    const ariaDescribedby = input.getAttribute('aria-describedby');

    expect(ariaDescribedby).toBeTruthy();
    expect(screen.getByText('Helper text')).toHaveAttribute('id', ariaDescribedby);
  });

  it('shows error text when error is provided', () => {
    render(
      <FormField label="Email" error="Invalid email">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
  });

  it('hides helper text when error is present', () => {
    render(
      <FormField label="Email" helperText="Helper text" error="Error message">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    expect(screen.getByText(/Error message/)).toBeInTheDocument();
  });

  it('passes aria-invalid when error is present', () => {
    render(
      <FormField label="Email" error="Invalid email">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('associates error text with input via aria-describedby', () => {
    render(
      <FormField label="Email" error="Invalid email">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const input = screen.getByRole('textbox');
    const ariaDescribedby = input.getAttribute('aria-describedby');

    expect(ariaDescribedby).toBeTruthy();
    expect(screen.getByText(/Invalid email/)).toHaveAttribute('id', ariaDescribedby);
  });

  it('forwards labelRef', () => {
    const labelRef = React.createRef<HTMLLabelElement>();

    render(
      <FormField label="Email" labelRef={labelRef}>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(labelRef.current).toBeInstanceOf(HTMLLabelElement);
    expect(labelRef.current?.textContent).toContain('Email');
  });

  it('forwards errorRef', () => {
    const errorRef = React.createRef<HTMLSpanElement>();

    render(
      <FormField label="Email" error="Error" errorRef={errorRef}>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(errorRef.current).toBeInstanceOf(HTMLSpanElement);
    expect(errorRef.current?.textContent).toContain('Error');
  });

  it('forwards helperRef', () => {
    const helperRef = React.createRef<HTMLSpanElement>();

    render(
      <FormField label="Email" helperText="Helper" helperRef={helperRef}>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(helperRef.current).toBeInstanceOf(HTMLSpanElement);
    expect(helperRef.current?.textContent).toBe('Helper');
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(
      <FormField label="Email" className="custom-class">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('hides label visually but keeps it for screen readers', () => {
    render(
      <FormField label="Email" hideLabel>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const label = screen.getByText('Email');
    expect(label).toHaveClass('visuallyHidden');
  });

  it('works with select element', () => {
    render(
      <FormField label="Country">
        {(props) => (
          <select {...props}>
            <option>USA</option>
            <option>UK</option>
          </select>
        )}
      </FormField>
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('works with textarea', () => {
    render(<FormField label="Message">{(props) => <textarea {...props} />}</FormField>);

    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('allows custom props in addition to field props', () => {
    render(
      <FormField label="Email">
        {(props) => (
          <Input type="email" placeholder="custom placeholder" data-custom="value" {...props} />
        )}
      </FormField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'custom placeholder');
    expect(input).toHaveAttribute('data-custom', 'value');
  });

  it('fieldProps can be spread before or after custom props', () => {
    render(
      <FormField label="Email">
        {(props) => (
          <Input
            {...props} // Props first
            type="email"
            placeholder="custom"
          />
        )}
      </FormField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'custom');
    expect(input).toHaveAttribute('id'); // From props
  });
});
