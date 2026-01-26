import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';

describe('FormField A11y', () => {
  it('should not have violations with basic setup', async () => {
    const { container } = render(
      <FormField label="Email">{(props) => <Input type="email" {...props} />}</FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with required field', async () => {
    const { container } = render(
      <FormField label="Email" required>
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with helper text', async () => {
    const { container } = render(
      <FormField label="Email" helperText="We'll never share your email">
        {(props) => <Input type="email" {...props} />}
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with error', async () => {
    const { container } = render(
      <FormField label="Email" error="Invalid email address">
        {(props) => <Input type="email" error {...props} />}
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with hidden label', async () => {
    const { container } = render(
      <FormField label="Search" hideLabel>
        {(props) => <Input type="search" {...props} />}
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with select element', async () => {
    const { container } = render(
      <FormField label="Country">
        {(props) => (
          <select {...props}>
            <option>USA</option>
            <option>UK</option>
          </select>
        )}
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have violations with textarea', async () => {
    const { container } = render(
      <FormField label="Message" helperText="Max 500 characters">
        {(props) => <textarea {...props} />}
      </FormField>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
