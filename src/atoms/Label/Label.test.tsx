import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders label text', () => {
    render(<Label htmlFor="test">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="test-input">Test</Label>
        <input id="test-input" />
      </>
    );

    const label = screen.getByText('Test');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('shows required indicator when required', () => {
    render(<Label required>Required Field</Label>);
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Test</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('applies custom className', () => {
    render(<Label className="custom">Test</Label>);
    expect(screen.getByText('Test')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    render(<Label data-testid="custom-label">Test</Label>);
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });
});
