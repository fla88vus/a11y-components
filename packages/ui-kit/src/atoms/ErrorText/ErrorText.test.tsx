import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorText } from './ErrorText';

describe('ErrorText', () => {
  it('renders error text', () => {
    render(<ErrorText>This field is required</ErrorText>);
    expect(screen.getByText(/This field is required/)).toBeInTheDocument();
  });

  it('has role="alert" by default', () => {
    render(<ErrorText>Error message</ErrorText>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<ErrorText ref={ref}>Test</ErrorText>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies custom className', () => {
    render(<ErrorText className="custom">Test</ErrorText>);
    expect(screen.getByRole('alert')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    render(
      <ErrorText id="error-1" data-testid="error">
        Test
      </ErrorText>
    );
    const element = screen.getByTestId('error');
    expect(element).toHaveAttribute('id', 'error-1');
  });

  it('can override role', () => {
    render(<ErrorText role="status">Test</ErrorText>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('can be associated with input via aria-describedby', () => {
    render(
      <>
        <input aria-describedby="error-text" aria-invalid="true" />
        <ErrorText id="error-text">Invalid input</ErrorText>
      </>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'error-text');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
