import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '../../test/test-utils';
import {
  checkableRenderingTests,
  checkableStateTests,
  checkableInteractionTests,
} from '../../test/test-categories/checkable.patterns';
import { Checkbox } from './Checkbox';
import { CheckboxGroupContext } from '../../primitives/CheckboxGroupContext';
import React from 'react';

/**
 * Checkbox Component Tests
 * Pattern: Checkable Control (Atom)
 */
describe('Checkbox - Component Tests', () => {
  describe('Rendering', () => {
    it('renders with correct role', () => {
      renderWithProviders(<Checkbox label="Accept terms" value="accept" />);
      checkableRenderingTests['renders with correct role']('checkbox');
    });

    it('has proper label association', () => {
      renderWithProviders(<Checkbox label="Subscribe to newsletter" value="subscribe" />);
      checkableRenderingTests['has proper label association'](
        'Subscribe to newsletter',
        'checkbox'
      );
    });
  });

  describe('States', () => {
    it('handles checked state', () => {
      renderWithProviders(<Checkbox label="Checked" value="test" checked onChange={() => {}} />);
      checkableStateTests['handles checked state']('checkbox');
    });

    it('handles unchecked state', () => {
      renderWithProviders(<Checkbox label="Unchecked" value="test" />);
      checkableStateTests['handles unchecked state']('checkbox');
    });

    it('handles disabled state', () => {
      renderWithProviders(<Checkbox label="Disabled" value="test" disabled />);
      checkableStateTests['handles disabled state with native attribute']('checkbox');
    });

    it('handles indeterminate state', () => {
      renderWithProviders(<Checkbox label="Partial" value="test" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });
  });

  describe('Interactions', () => {
    it('toggles on click', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<Checkbox label="Toggle" value="test" onChange={handleChange} />);
      await checkableInteractionTests['toggles on click'](handleChange, 'checkbox');
    });

    it('toggles on Space key', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<Checkbox label="Press space" value="test" onChange={handleChange} />);
      await checkableInteractionTests['toggles on Space key'](handleChange, 'checkbox');
    });

    it('prevents interaction when disabled', async () => {
      const handleChange = vi.fn();
      renderWithProviders(
        <Checkbox label="Disabled" value="test" disabled onChange={handleChange} />
      );
      await checkableInteractionTests['prevents interaction when disabled'](
        handleChange,
        'checkbox'
      );
    });
  });

  describe('Checkbox Specific', () => {
    it('works as controlled component', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false);
        return (
          <Checkbox
            label="Controlled"
            value="test"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        );
      };

      renderWithProviders(<TestComponent />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.checked).toBe(false);
      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });

    it('works as uncontrolled component', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Checkbox label="Uncontrolled" value="test" />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      await user.click(checkbox);
      expect(checkbox.checked).toBe(true);
    });

    it('calls onChange with correct event', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      renderWithProviders(<Checkbox label="Test" value="test-value" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).toHaveBeenCalledTimes(1);
      // Verify the event object structure more simply
      const callArg = handleChange.mock.calls[0][0];
      expect(callArg.target.checked).toBe(true);
    });
  });

  describe('Group Context Integration', () => {
    it('integrates with CheckboxGroup context', () => {
      const groupValue = {
        value: ['option1'],
        name: 'test-group',
        disabled: false,
        describedBy: 'group-error',
        onItemChange: vi.fn(),
      };

      renderWithProviders(
        <CheckboxGroupContext.Provider value={groupValue}>
          <Checkbox label="Option 1" value="option1" />
          <Checkbox label="Option 2" value="option2" />
        </CheckboxGroupContext.Provider>
      );

      const checkboxes = screen.getAllByRole('checkbox');

      // First checkbox should be checked (in group value)
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();

      // Both should have the group name
      expect(checkboxes[0]).toHaveAttribute('name', 'test-group');
      expect(checkboxes[1]).toHaveAttribute('name', 'test-group');

      // Both should be described by group error
      expect(checkboxes[0]).toHaveAttribute('aria-describedby', 'group-error');
      expect(checkboxes[1]).toHaveAttribute('aria-describedby', 'group-error');
    });

    it('group disabled overrides individual disabled prop', () => {
      const groupValue = {
        value: [],
        name: 'test-group',
        disabled: true, // Group is disabled
        describedBy: undefined,
        onItemChange: vi.fn(),
      };

      renderWithProviders(
        <CheckboxGroupContext.Provider value={groupValue}>
          <Checkbox label="Should be disabled" value="test" disabled={false} />
        </CheckboxGroupContext.Provider>
      );

      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('calls group onItemChange when toggled', async () => {
      const user = userEvent.setup();
      const onItemChange = vi.fn();

      const groupValue = {
        value: [],
        name: 'test-group',
        disabled: false,
        describedBy: undefined,
        onItemChange,
      };

      renderWithProviders(
        <CheckboxGroupContext.Provider value={groupValue}>
          <Checkbox label="Option 1" value="option1" />
        </CheckboxGroupContext.Provider>
      );

      await user.click(screen.getByRole('checkbox'));

      expect(onItemChange).toHaveBeenCalledWith('option1', true);
    });
  });
});
