import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { screen, userEvent, renderWithProviders, fireEvent } from '../../test/test-utils';
import {
  interactiveRenderingTests,
  interactiveStateTests,
  interactiveInteractionTests,
  interactiveKeyboardTests,
  interactiveAriaTests,
} from '../../test/test-categories/interactive.patterns';
import { Button } from './Button';
import React from 'react';

/**
 * Button Component Tests
 * Pattern: Interactive Controls (Atom)
 *
 * Uses interactive.patterns.ts for reusable test suites
 * Button-specific behaviors: loading state, type attribute, ref forwarding
 */
describe('Button - Component Tests', () => {
  // ========================================
  // RENDERING TESTS (Pattern-based)
  // ========================================
  describe('Rendering', () => {
    it('renders as semantic button element', () => {
      renderWithProviders(<Button>Click me</Button>);
      interactiveRenderingTests['renders as semantic element']('button', 'BUTTON');
    });

    it('has accessible name from children', () => {
      renderWithProviders(<Button>Submit Form</Button>);
      interactiveAriaTests['has accessible name from children']('Submit Form', 'button');
    });

    it('renders with all variant options', () => {
      const variants: Array<'primary' | 'secondary' | 'danger'> = [
        'primary',
        'secondary',
        'danger',
      ];

      variants.forEach((variant) => {
        const { container, unmount } = renderWithProviders(<Button variant={variant}>Test</Button>);
        expect(container.querySelector(`.${variant}`)).toBeInTheDocument();
        unmount();
      });
    });

    it('renders with all size options', () => {
      const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        const { container, unmount } = renderWithProviders(<Button size={size}>Test</Button>);
        expect(container.querySelector(`.${size}`)).toBeInTheDocument();
        unmount();
      });
    });

    it('applies fullWidth class when fullWidth prop is true', () => {
      const { container } = renderWithProviders(<Button fullWidth>Test</Button>);
      expect(container.querySelector('.fullWidth')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      renderWithProviders(<Button className="custom-class">Test</Button>);
      interactiveRenderingTests['accepts custom className']('button', 'custom-class');
    });

    it('spreads additional HTML attributes', () => {
      renderWithProviders(
        <Button data-testid="custom-button" title="Custom title">
          Test
        </Button>
      );

      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('title', 'Custom title');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      renderWithProviders(<Button ref={ref}>Test</Button>);

      interactiveRenderingTests['forwards ref correctly'](ref, 'HTMLButtonElement');
    });
  });

  // ========================================
  // STATE TESTS (Pattern-based)
  // ========================================
  describe('States', () => {
    it('handles disabled state with aria-disabled', () => {
      renderWithProviders(<Button disabled>Test</Button>);
      interactiveStateTests['handles disabled state with aria-disabled']();
    });

    it('handles loading state', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      interactiveStateTests['handles loading state']();
    });

    it('combines disabled and loading states', () => {
      renderWithProviders(
        <Button disabled loading>
          Test
        </Button>
      );
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('shows loading spinner and text', () => {
      renderWithProviders(<Button loading>Submit</Button>);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('hides button content when loading (visually)', () => {
      renderWithProviders(<Button loading>Submit</Button>);
      const buttonText = screen.getByText('Submit');

      expect(buttonText).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ========================================
  // INTERACTION TESTS (Pattern-based)
  // ========================================
  describe('Interactions', () => {
    it('handles click events', async () => {
      const onClick = vi.fn();
      renderWithProviders(<Button onClick={onClick}>Click</Button>);
      await interactiveInteractionTests['handles click events'](onClick as Mock);
    });

    it('prevents click when disabled', async () => {
      const onClick = vi.fn();
      renderWithProviders(
        <Button disabled onClick={onClick}>
          Click
        </Button>
      );
      await interactiveInteractionTests['prevents click when disabled'](onClick as Mock);
    });

    it('prevents click when loading', async () => {
      const onClick = vi.fn();
      renderWithProviders(
        <Button loading onClick={onClick}>
          Submit
        </Button>
      );
      await interactiveInteractionTests['prevents click when loading'](onClick as Mock);
    });
  });

  // ========================================
  // KEYBOARD TESTS (Pattern-based)
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is focusable with Tab', async () => {
      renderWithProviders(<Button>Test</Button>);
      await interactiveKeyboardTests['is focusable with Tab']('button');
    });

    it('activates with Enter key', async () => {
      const onClick = vi.fn();
      renderWithProviders(<Button onClick={onClick}>Submit</Button>);
      await interactiveKeyboardTests['activates with Enter key'](onClick as Mock, 'button');
    });

    it('activates with Space key', async () => {
      const onClick = vi.fn();
      renderWithProviders(<Button onClick={onClick}>Submit</Button>);
      await interactiveKeyboardTests['activates with Space key'](onClick as Mock);
    });

    it('remains in tab order when disabled', async () => {
      renderWithProviders(<Button disabled>Test</Button>);
      await interactiveKeyboardTests['remains in tab order when disabled']();
    });

    it('prevents keyboard activation when disabled', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      renderWithProviders(
        <Button disabled onClick={onClick}>
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // ========================================
  // FOCUS TESTS
  // ========================================
  describe('Focus Management', () => {
    it('maintains focus order in a sequence', async () => {
      const user = userEvent.setup();
      renderWithProviders(
        <>
          <button>Before</button>
          <Button>Middle</Button>
          <button>After</button>
        </>
      );

      await user.tab();
      expect(screen.getByText('Before')).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'Middle' })).toHaveFocus();

      await user.tab();
      expect(screen.getByText('After')).toHaveFocus();
    });
  });

  // ========================================
  // BUTTON-SPECIFIC: TYPE ATTRIBUTE
  // ========================================
  describe('Button Types', () => {
    it('defaults to type="button"', () => {
      renderWithProviders(<Button>Test</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('accepts type="submit"', () => {
      renderWithProviders(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('accepts type="reset"', () => {
      renderWithProviders(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });

    it('prevents form submission when type="button"', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      renderWithProviders(
        <form onSubmit={handleSubmit}>
          <Button type="button">Don't Submit</Button>
        </form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('triggers form submission when type="submit"', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      renderWithProviders(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit Form</Button>
        </form>
      );

      fireEvent.click(screen.getByRole('button'));
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
