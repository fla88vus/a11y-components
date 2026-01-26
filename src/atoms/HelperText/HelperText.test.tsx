import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelperText } from './HelperText';

describe('HelperText', () => {
  it('renders helper text', () => {
    render(<HelperText>This is helpful information</HelperText>);
    expect(screen.getByText('This is helpful information')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<HelperText ref={ref}>Test</HelperText>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('applies custom className', () => {
    render(<HelperText className="custom">Test</HelperText>);
    expect(screen.getByText('Test')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    render(
      <HelperText id="helper-1" data-testid="helper">
        Test
      </HelperText>
    );
    const element = screen.getByTestId('helper');
    expect(element).toHaveAttribute('id', 'helper-1');
  });

  it('can be associated with input via aria-describedby', () => {
    render(
      <>
        <input aria-describedby="helper-text" />
        <HelperText id="helper-text">Helper info</HelperText>
      </>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'helper-text');
  });
});
