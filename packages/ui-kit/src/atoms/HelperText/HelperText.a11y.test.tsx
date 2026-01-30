import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { HelperText } from './HelperText';

describe('HelperText A11y', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<HelperText id="helper">Helpful information</HelperText>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should work with form fields', async () => {
    const { container } = render(
      <>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" aria-describedby="email-helper" />
        <HelperText id="email-helper">We'll never share your email</HelperText>
      </>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
