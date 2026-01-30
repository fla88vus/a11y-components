import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Label } from './Label';

describe('Label A11y', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <>
        <Label htmlFor="test">Test Label</Label>
        <input id="test" />
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should work with required indicator', async () => {
    const { container } = render(
      <>
        <Label htmlFor="test" required>
          Required Field
        </Label>
        <input id="test" required />
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
