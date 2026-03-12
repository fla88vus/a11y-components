import { FormField } from '../../molecules/FormField/FormField';
import {
  renderWithProviders,
  expectNoA11yViolations,
  getFocusableElements,
} from '../../test/test-utils';
import { Textarea } from './Textarea';

// ========================================
// AXE AUTOMATED A11Y TESTS
// ========================================
describe('Axe Automated Accessibility', () => {
  it('has no violations in default state', async () => {
    const { container } = renderWithProviders(
      <FormField label="Bio">{(fieldProps) => <Textarea {...fieldProps} />}</FormField>
    );
    await expectNoA11yViolations(container);
  });

  it('has no violations with error state', async () => {
    const { container } = renderWithProviders(
      <FormField label="Bio" error="Campo obbligatorio">
        {(fieldProps) => <Textarea {...fieldProps} />}
      </FormField>
    );
    await expectNoA11yViolations(container);
  });

  it('has no violations with helper text', async () => {
    const { container } = renderWithProviders(
      <FormField label="Bio" helperText="Max 200 caratteri">
        {(fieldProps) => <Textarea {...fieldProps} />}
      </FormField>
    );
    await expectNoA11yViolations(container);
  });

  it('has no violations when disabled', async () => {
    const { container } = renderWithProviders(
      <FormField label="Bio">{(fieldProps) => <Textarea {...fieldProps} disabled />}</FormField>
    );
    await expectNoA11yViolations(container);
  });

  it('has no violations with counter', async () => {
    const { container } = renderWithProviders(
      <FormField label="Bio">
        {(fieldProps) => <Textarea {...fieldProps} showCounter maxLength={200} />}
      </FormField>
    );
    await expectNoA11yViolations(container);
  });

  it('has no violations with required state', async () => {
    const { container } = renderWithProviders(
      <FormField label="Bio" required>
        {(fieldProps) => <Textarea {...fieldProps} />}
      </FormField>
    );
    await expectNoA11yViolations(container);
  });
});

// ✅ Usa getFocusableElements per verificare che disabled non sia focusabile
it('disabled textarea is not in focusable elements', () => {
  const { container } = renderWithProviders(<Textarea disabled />);
  const focusable = getFocusableElements(container);
  expect(focusable).toHaveLength(0); // 👈 nessun elemento focusabile
});
