import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import { HelperText } from './HelperText';

/**
 * HelperText Component Tests
 * Pattern: Display Component (Atom)
 *
 * Simple rendering tests for helper text display
 */
describe('HelperText - Component Tests', () => {
  it('renders helper text', () => {
    renderWithProviders(<HelperText>This is helpful information</HelperText>);
    expect(screen.getByText('This is helpful information')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    renderWithProviders(<HelperText ref={ref}>Test</HelperText>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies custom className', () => {
    renderWithProviders(<HelperText className="custom">Test</HelperText>);
    expect(screen.getByText('Test')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    renderWithProviders(
      <HelperText id="helper-1" data-testid="helper">
        Test
      </HelperText>
    );
    const element = screen.getByTestId('helper');
    expect(element).toHaveAttribute('id', 'helper-1');
  });

  it('can be associated with input via aria-describedby', () => {
    renderWithProviders(
      <>
        <input aria-describedby="helper-text" />
        <HelperText id="helper-text">Helper info</HelperText>
      </>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'helper-text');
  });
});
