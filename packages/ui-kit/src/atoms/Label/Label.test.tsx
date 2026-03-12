import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import { Label } from './Label';

/**
 * Label Component Tests
 * Pattern: Display Component (Atom)
 *
 * Simple rendering tests - no complex patterns needed
 */
describe('Label - Component Tests', () => {
  it('renders label text', () => {
    renderWithProviders(<Label htmlFor="test">Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('associates with input via htmlFor', () => {
    renderWithProviders(
      <>
        <Label htmlFor="test-input">Test</Label>
        <input id="test-input" />
      </>
    );

    const label = screen.getByText('Test');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('shows required indicator when required', () => {
    renderWithProviders(<Label required>Required Field</Label>);
    expect(screen.getByLabelText('required')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    renderWithProviders(<Label ref={ref}>Test</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('applies custom className', () => {
    renderWithProviders(<Label className="custom">Test</Label>);
    expect(screen.getByText('Test')).toHaveClass('custom');
  });

  it('passes through HTML attributes', () => {
    renderWithProviders(<Label data-testid="custom-label">Test</Label>);
    expect(screen.getByTestId('custom-label')).toBeInTheDocument();
  });
});
