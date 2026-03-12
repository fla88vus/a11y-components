import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import { default as userEvent } from '@testing-library/user-event';
import {
  formControlRenderingTests,
  formControlStateTests,
  formControlInteractionTests,
  formControlA11yTests,
} from '../../test/test-categories/form-control.patterns';
import { Textarea } from './Textarea';
import React from 'react';

/**
 * Textarea Component Tests
 * Pattern: Form Control (Atom)
 *
 * Tests component behavior, props, and interactions
 * Uses standardized form-control.patterns for consistency
 */
describe('Textarea - Component Tests', () => {
  // ========================================
  // RENDERING TESTS
  // ========================================
  describe('Rendering', () => {
    it('renders as native textarea element', () => {
      renderWithProviders(<Textarea />);
      formControlRenderingTests['renders as native input element']('textbox', 'TEXTAREA');
    });

    it('forwards ref to HTMLTextAreaElement', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      renderWithProviders(<Textarea ref={ref} />);
      formControlRenderingTests['forwards ref to HTMLInputElement'](ref, 'TEXTAREA');
    });

    it('accepts custom className', () => {
      renderWithProviders(<Textarea className="custom-class" />);
      // className va sul wrapper, non sulla textarea
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-class');
    });

    it('renders with size variants', () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        const { unmount } = renderWithProviders(<Textarea size={size} />);
        formControlRenderingTests['renders with size variant'](size);
        unmount();
      });
    });

    it('applies fullWidth class', () => {
      renderWithProviders(<Textarea fullWidth />);
      formControlRenderingTests['applies fullWidth class']();
    });

    it('applies error class when aria-invalid is true', () => {
      renderWithProviders(<Textarea aria-invalid={true} />);
      // Nota: error class si applica tramite aria-invalid, non prop error
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('error');
    });

    it('spreads additional HTML attributes', () => {
      renderWithProviders(<Textarea data-testid="custom-textarea" title="Custom title" />);
      const textarea = screen.getByTestId('custom-textarea');
      expect(textarea).toHaveAttribute('title', 'Custom title');
    });

    it('renders with rows attribute', () => {
      renderWithProviders(<Textarea rows={6} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
    });

    it('renders with cols attribute', () => {
      renderWithProviders(<Textarea cols={40} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('cols', '40');
    });
  });

  // ========================================
  // CHARACTER COUNTER TESTS (Textarea-specific)
  // ========================================
  describe('Character Counter', () => {
    it('does not render counter by default', () => {
      renderWithProviders(<Textarea />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('renders counter when showCounter is true', () => {
      renderWithProviders(<Textarea showCounter />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders counter with maxLength', () => {
      renderWithProviders(<Textarea showCounter maxLength={200} />);
      expect(screen.getByText('0 / 200')).toBeInTheDocument();
    });

    it('updates counter as user types', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Textarea showCounter maxLength={200} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5 / 200')).toBeInTheDocument();
    });

    it('counter has aria-live="polite" for screen readers', () => {
      renderWithProviders(<Textarea showCounter />);
      const counter = screen.getByText('0').closest('span');
      expect(counter).toHaveAttribute('aria-live', 'polite');
    });

    it('counter applies error class when at maxLength', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Textarea showCounter maxLength={5} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'Hello');

      const counter = screen.getByText('5 / 5');
      expect(counter).toHaveClass('counterError');
    });

    it('updates counter in controlled mode', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            showCounter
            maxLength={200}
          />
        );
      };

      renderWithProviders(<TestComponent />);
      const textarea = screen.getByRole('textbox');

      await user.type(textarea, 'Ciao');
      expect(screen.getByText('4 / 200')).toBeInTheDocument();
    });
  });

  // ========================================
  // INTERACTION TESTS
  // ========================================
  describe('Interactions', () => {
    it('accepts user input', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<Textarea onChange={handleChange} />);
      await formControlInteractionTests['accepts user input'](handleChange, 'Hello World');
    });

    it('handles onChange events', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<Textarea onChange={handleChange} />);
      await formControlInteractionTests['accepts user input'](handleChange, 'Test');
    });

    it('handles onFocus and onBlur events', async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      renderWithProviders(<Textarea onFocus={handleFocus} onBlur={handleBlur} />);
      await formControlInteractionTests['handles focus and blur events'](handleFocus, handleBlur);
    });

    it('does not accept input when disabled', async () => {
      renderWithProviders(<Textarea disabled />);
      await formControlInteractionTests['prevents input when disabled']();
    });

    it('allows clearing value', async () => {
      renderWithProviders(<Textarea />);
      await formControlInteractionTests['allows clearing value']();
    });

    it('prevents editing when readonly', async () => {
      renderWithProviders(<Textarea readOnly defaultValue="readonly text" />);
      await formControlInteractionTests['prevents editing when readonly']();
    });
  });

  // ========================================
  // STATE TESTS
  // ========================================
  describe('States', () => {
    it('handles disabled state with native attribute', () => {
      renderWithProviders(<Textarea disabled />);
      formControlStateTests['handles disabled state with native attribute']();
    });

    it('supports required attribute', () => {
      renderWithProviders(<Textarea required aria-required="true" />);
      formControlStateTests['supports required attribute']();
    });

    it('supports readonly attribute', () => {
      renderWithProviders(<Textarea readOnly />);
      formControlStateTests['supports readonly attribute']();
    });

    it('supports placeholder attribute', () => {
      renderWithProviders(<Textarea placeholder="Scrivi qui..." />);
      formControlStateTests['supports placeholder attribute']('Scrivi qui...');
    });

    it('marks invalid state with aria-invalid', () => {
      renderWithProviders(<Textarea aria-invalid={true} />);
      formControlStateTests['marks invalid state with aria-invalid']();
    });
  });

  // ========================================
  // CONTROLLED/UNCONTROLLED
  // ========================================
  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled textarea', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Textarea defaultValue="Valore iniziale" />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('Valore iniziale');

      await user.clear(textarea);
      await user.type(textarea, 'Nuovo valore');
      expect(textarea.value).toBe('Nuovo valore');
    });

    it('works as controlled textarea', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return <Textarea value={value} onChange={(e) => setValue(e.target.value)} />;
      };

      renderWithProviders(<TestComponent />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

      await user.type(textarea, 'Test');
      expect(textarea.value).toBe('Test');
    });

    it('propagates onChange to parent in controlled mode', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      renderWithProviders(<Textarea value="" onChange={handleChange} />);

      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'a');

      // onChange deve essere chiamato — propaga al parent
      expect(handleChange).toHaveBeenCalled();
    });
  });

  // ========================================
  // VALIDATION ATTRIBUTES
  // ========================================
  describe('Validation', () => {
    it('supports minLength attribute', () => {
      renderWithProviders(<Textarea minLength={10} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('minlength', '10');
    });

    it('supports maxLength attribute', () => {
      renderWithProviders(<Textarea maxLength={200} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('maxlength', '200');
    });

    it('does not exceed maxLength when typing', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Textarea maxLength={5} />);

      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      await user.type(textarea, 'Hello World');

      // Il browser limita a maxLength
      expect(textarea.value.length).toBeLessThanOrEqual(5);
    });
  });

  // ========================================
  // FOCUS MANAGEMENT
  // ========================================
  describe('Focus Management', () => {
    it('is focusable with Tab', async () => {
      renderWithProviders(<Textarea />);
      await formControlA11yTests['is focusable with Tab']();
    });

    it('can be programmatically focused', () => {
      const ref = React.createRef<HTMLTextAreaElement>();
      renderWithProviders(<Textarea ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('is not focusable when disabled', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Textarea disabled />);

      await user.tab();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });
  });
});
