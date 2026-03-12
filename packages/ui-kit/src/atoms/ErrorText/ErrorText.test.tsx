import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import { ErrorText } from './ErrorText';

/**
 * ErrorText Component Tests
 * Pattern: Display Component (Atom)
 *
 * Tests for error message display with role="alert"
 */
describe('ErrorText - Component Tests', () => {
  it('renders error text', () => {
    renderWithProviders(<ErrorText>This field is required</ErrorText>);
    expect(screen.getByText(/This field is required/)).toBeInTheDocument();
  });

  it('has role="alert" by default', () => {
    renderWithProviders(<ErrorText>Error message</ErrorText>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    renderWithProviders(<ErrorText ref={ref}>Test</ErrorText>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies custom className', () => {
    renderWithProviders(<ErrorText className="custom">Test</ErrorText>);
    expect(screen.getByRole('alert')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    renderWithProviders(
      <ErrorText id="error-1" data-testid="error">
        Test
      </ErrorText>
    );
    const element = screen.getByTestId('error');
    expect(element).toHaveAttribute('id', 'error-1');
  });

  it('can override role', () => {
    renderWithProviders(<ErrorText role="status">Test</ErrorText>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('can be associated with input via aria-describedby', () => {
    renderWithProviders(
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
