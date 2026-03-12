import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import {
  checkableRenderingTests,
  checkableStateTests,
  checkableInteractionTests,
  checkableGroupTests,
  checkableGroupKeyboardTests,
} from '../../test/test-categories/checkable.patterns';
import { Radio } from './Radio';
import { RadioGroup } from '../../molecules/RadioGroup/RadioGroup';
import React from 'react';

/**
 * Radio Component Tests
 * Pattern: Checkable Controls (Atom)
 *
 * Uses checkable.patterns.ts for reusable test suites
 * Radio-specific behaviors: single selection in group, arrow key navigation
 */
describe('Radio - Component Tests', () => {
  // ========================================
  // RENDERING TESTS (Pattern-based)
  // ========================================
  describe('Rendering', () => {
    it('renders with correct role', () => {
      renderWithProviders(<Radio label="Option A" value="a" />);
      checkableRenderingTests['renders with correct role']('radio');
    });

    it('has proper label association', () => {
      renderWithProviders(<Radio label="Subscribe" value="yes" />);
      checkableRenderingTests['has proper label association']('Subscribe', 'radio');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithProviders(<Radio label="Test" value="test" ref={ref} />);

      checkableRenderingTests['forwards ref to HTMLInputElement'](ref);
    });

    it('accepts custom className', () => {
      const { container } = renderWithProviders(
        <Radio label="Test" value="test" className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('spreads additional HTML attributes', () => {
      renderWithProviders(
        <Radio label="Test" value="test" data-testid="custom-radio" title="Custom title" />
      );

      const radio = screen.getByTestId('custom-radio');
      expect(radio).toHaveAttribute('title', 'Custom title');
    });
  });

  // ========================================
  // STATE TESTS (Pattern-based)
  // ========================================
  describe('States', () => {
    it('handles checked state', () => {
      renderWithProviders(<Radio label="Selected" value="sel" defaultChecked />);
      checkableStateTests['handles checked state']('radio');
    });

    it('handles unchecked state', () => {
      renderWithProviders(<Radio label="Not selected" value="not" />);
      checkableStateTests['handles unchecked state']('radio');
    });

    it('handles disabled state with native attribute', () => {
      renderWithProviders(<Radio label="Disabled option" value="dis" disabled />);
      checkableStateTests['handles disabled state with native attribute']('radio');
    });

    it('combines checked and disabled states', () => {
      renderWithProviders(<Radio label="Checked disabled" value="cd" defaultChecked disabled />);
      const radio = screen.getByRole('radio');

      expect(radio).toBeChecked();
      expect(radio).toBeDisabled();
    });
  });

  // ========================================
  // INTERACTION TESTS (Pattern-based)
  // ========================================
  describe('Interactions', () => {
    it('toggles on click', async () => {
      const onChange = vi.fn();
      renderWithProviders(<Radio label="Click me" value="click" onChange={onChange} />);
      await checkableInteractionTests['toggles on click'](onChange as Mock, 'radio');
    });

    it('prevents interaction when disabled', async () => {
      const onChange = vi.fn();
      renderWithProviders(<Radio label="Disabled" value="dis" disabled onChange={onChange} />);
      await checkableInteractionTests['prevents interaction when disabled'](
        onChange as Mock,
        'radio'
      );
    });

    it('toggles on Space key', async () => {
      const onChange = vi.fn();
      renderWithProviders(<Radio label="Keyboard" value="key" onChange={onChange} />);
      await checkableInteractionTests['toggles on Space key'](onChange as Mock, 'radio');
    });
  });

  // ========================================
  // GROUP CONTEXT TESTS (Pattern-based)
  // ========================================
  describe('Group Context Integration', () => {
    it('receives name from RadioGroup', () => {
      renderWithProviders(
        <RadioGroup name="options" legend="Choose option">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
        </RadioGroup>
      );
      checkableGroupTests['all items share same name attribute']('radio', 'options');
    });

    it('receives aria-describedby from RadioGroup error', () => {
      renderWithProviders(
        <RadioGroup name="opts" legend="Options" error="Selection required">
          <Radio label="Option A" value="a" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-describedby');
    });

    it('receives aria-describedby from RadioGroup helperText', () => {
      renderWithProviders(
        <RadioGroup name="opts" legend="Options" helperText="Pick one">
          <Radio label="Option A" value="a" />
        </RadioGroup>
      );
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-describedby');
    });

    it('allows single selection in RadioGroup', async () => {
      renderWithProviders(
        <RadioGroup name="single" legend="Single selection">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      );
      await checkableGroupTests['radio group allows only one selection']('single');
    });
  });

  // ========================================
  // RADIO-SPECIFIC: ARROW KEY NAVIGATION
  // ========================================
  describe('Keyboard Navigation (Radio-specific)', () => {
    it('Tab navigates to first checked or first item', async () => {
      renderWithProviders(
        <RadioGroup name="nav" legend="Navigate">
          <Radio label="First" value="1" />
          <Radio label="Second" value="2" defaultChecked />
          <Radio label="Third" value="3" />
        </RadioGroup>
      );
      await checkableGroupKeyboardTests['Tab navigates to first checked or first item']('radio');
    });

    it('Arrow keys navigate within radio group', async () => {
      renderWithProviders(
        <RadioGroup name="arrows" legend="Arrow navigation">
          <Radio label="First" value="1" defaultChecked />
          <Radio label="Second" value="2" />
          <Radio label="Third" value="3" />
        </RadioGroup>
      );
      await checkableGroupKeyboardTests['Arrow keys navigate within radio group']();
    });
  });
});
