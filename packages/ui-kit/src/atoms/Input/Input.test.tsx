import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '../../test/test-utils';
import {
  formControlRenderingTests,
  formControlStateTests,
  formControlInteractionTests,
  formControlA11yTests,
} from '../../test/test-categories/form-control.patterns';
import { Input } from './Input';
import React from 'react';

/**
 * Input Component Tests
 * Pattern: Form Control (Atom)
 *
 * Tests component behavior, props, and interactions
 * Uses standardized form-control.patterns for consistency
 */
describe('Input - Component Tests', () => {
  // ========================================
  // RENDERING TESTS (Using Patterns)
  // ========================================
  describe('Rendering', () => {
    it('renders as native input element', () => {
      renderWithProviders(<Input />);
      formControlRenderingTests['renders as native input element']('textbox');
    });

    it('forwards ref to HTMLInputElement', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithProviders(<Input ref={ref} />);
      formControlRenderingTests['forwards ref to HTMLInputElement'](ref);
    });

    it('accepts custom className', () => {
      renderWithProviders(<Input className="custom-class" />);
      formControlRenderingTests['accepts custom className']('custom-class');
    });

    it('renders with size variants', () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        const { unmount } = renderWithProviders(<Input size={size} />);
        formControlRenderingTests['renders with size variant'](size);
        unmount();
      });
    });

    it('applies fullWidth class', () => {
      renderWithProviders(<Input fullWidth />);
      formControlRenderingTests['applies fullWidth class']();
    });

    it('applies error class when error prop is true', () => {
      renderWithProviders(<Input error />);
      formControlRenderingTests['applies error class when error prop is true']();
    });

    it('spreads additional HTML attributes', () => {
      renderWithProviders(<Input data-testid="custom-input" title="Custom title" />);

      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('title', 'Custom title');
    });
  });

  // ========================================
  // INPUT TYPE TESTS (Input-specific)
  // ========================================
  describe('Input Types', () => {
    it('defaults to type="text"', () => {
      renderWithProviders(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('accepts type="email"', () => {
      renderWithProviders(<Input type="email" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('accepts type="password"', () => {
      renderWithProviders(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('accepts type="tel"', () => {
      renderWithProviders(<Input type="tel" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    });

    it('accepts type="url"', () => {
      renderWithProviders(<Input type="url" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url');
    });

    it('accepts type="search"', () => {
      renderWithProviders(<Input type="search" />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('accepts type="number" (spinbutton role)', () => {
      renderWithProviders(<Input type="number" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });
  });

  // ========================================
  // INTERACTION TESTS (Using Patterns)
  // ========================================
  describe('Interactions', () => {
    it('accepts user input', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<Input onChange={handleChange} />);
      await formControlInteractionTests['accepts user input'](handleChange, 'Hello World');
    });

    it('handles onChange events', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<Input onChange={handleChange} />);
      await formControlInteractionTests['accepts user input'](handleChange, 'Test');
    });

    it('handles onFocus and onBlur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      renderWithProviders(<Input onFocus={handleFocus} onBlur={handleBlur} />);
      await formControlInteractionTests['handles focus and blur events'](handleFocus, handleBlur);
    });

    it('does not accept input when disabled', async () => {
      renderWithProviders(<Input disabled />);
      await formControlInteractionTests['prevents input when disabled']();
    });

    it('allows clearing value', async () => {
      renderWithProviders(<Input />); // No defaultValue
      await formControlInteractionTests['allows clearing value']();
    });
  });

  // ========================================
  // STATE TESTS (Using Patterns)
  // ========================================
  describe('States', () => {
    it('handles disabled state with native attribute', () => {
      renderWithProviders(<Input disabled />);
      formControlStateTests['handles disabled state with native attribute']();
    });

    it('applies error class when error prop is true', () => {
      renderWithProviders(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('error');
    });

    it('supports required attribute', () => {
      renderWithProviders(<Input required aria-required="true" />);
      formControlStateTests['supports required attribute']();
    });

    it('supports readonly attribute', () => {
      renderWithProviders(<Input readOnly />);
      formControlStateTests['supports readonly attribute']();
    });

    it('supports placeholder attribute', () => {
      renderWithProviders(<Input placeholder="Enter text..." />);
      formControlStateTests['supports placeholder attribute']('Enter text...');
    });
  });

  // ========================================
  // CONTROLLED/UNCONTROLLED (Component-specific)
  // ========================================
  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled input', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Input defaultValue="Initial" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Initial');

      await user.clear(input);
      await user.type(input, 'New Value');
      expect(input.value).toBe('New Value');
    });

    it('works as controlled input', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
      };

      renderWithProviders(<TestComponent />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      await user.type(input, 'Test');
      expect(input.value).toBe('Test');
    });
  });

  // ========================================
  // VALIDATION ATTRIBUTES (Component-specific)
  // ========================================
  describe('Validation', () => {
    it('supports minLength attribute', () => {
      renderWithProviders(<Input minLength={3} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('minlength', '3');
    });

    it('supports maxLength attribute', () => {
      renderWithProviders(<Input maxLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '10');
    });

    it('supports pattern attribute', () => {
      renderWithProviders(<Input pattern="[0-9]{3}" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[0-9]{3}');
    });

    it('supports min and max for number inputs', () => {
      renderWithProviders(<Input type="number" min={0} max={100} />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('supports step for number inputs', () => {
      renderWithProviders(<Input type="number" step={0.5} />);
      expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '0.5');
    });
  });

  // ========================================
  // PLACEHOLDER & VALUE (Component-specific)
  // ========================================
  describe('Placeholder and Value', () => {
    it('displays placeholder text', () => {
      renderWithProviders(<Input placeholder="Enter text..." />);
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });

    it('displays initial value', () => {
      renderWithProviders(<Input value="Initial Value" onChange={() => {}} />);
      expect(screen.getByRole('textbox')).toHaveValue('Initial Value');
    });

    it('can update value in controlled mode', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('Initial');
        return (
          <div>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={() => setValue('Updated')}>Update</button>
          </div>
        );
      };

      renderWithProviders(<TestComponent />);
      const input = screen.getByRole('textbox') as HTMLInputElement;

      expect(input.value).toBe('Initial');

      await user.click(screen.getByRole('button'));
      expect(input.value).toBe('Updated');
    });
  });

  // ========================================
  // FOCUS MANAGEMENT (Using Patterns)
  // ========================================
  describe('Focus Management', () => {
    it('is focusable with Tab', async () => {
      renderWithProviders(<Input />);
      await formControlA11yTests['is focusable with Tab']();
    });

    it('can be programmatically focused', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithProviders(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('is not focusable when disabled', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Input disabled />);

      await user.tab();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });
  });
});
