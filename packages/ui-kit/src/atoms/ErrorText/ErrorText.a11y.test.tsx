import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ErrorText } from './ErrorText';

describe('ErrorText A11y', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<ErrorText id="error">Error message</ErrorText>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should work with invalid form fields', async () => {
    const { container } = render(
      <>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />
        <ErrorText id="email-error">Please enter a valid email</ErrorText>
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
