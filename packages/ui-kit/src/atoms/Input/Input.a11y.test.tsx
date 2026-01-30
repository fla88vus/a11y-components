import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Input } from './Input';

describe('Input A11y', () => {
  it('should not have violations when used with label', async () => {
    const { container } = render(
      <>
        <label htmlFor="test-input">Test Label</label>
        <Input id="test-input" />
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with aria-label', async () => {
    const { container } = render(<Input aria-label="Search" type="search" />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations in error state', async () => {
    const { container } = render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" error aria-invalid="true" aria-describedby="email-error" />
        <span id="email-error" role="alert">
          Invalid email
        </span>
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations when disabled', async () => {
    const { container } = render(
      <>
        <label htmlFor="disabled-input">Disabled</label>
        <Input id="disabled-input" disabled />
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
