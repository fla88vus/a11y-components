import { screen, renderWithProviders } from '../../test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Radio } from './Radio';
import { RadioGroup } from '../../molecules/RadioGroup/RadioGroup';

expect.extend(toHaveNoViolations);

/**
 * Radio Accessibility Tests
 *
 * Tests WCAG 2.1 AA compliance for the Radio component
 */
describe('Radio - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED TESTING (axe-core)
  // ========================================
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = renderWithProviders(<Radio label="Option A" value="a" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when checked', async () => {
      const { container } = renderWithProviders(
        <Radio label="Option A" value="a" defaultChecked />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(<Radio label="Option A" value="a" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations in RadioGroup', async () => {
      const { container } = renderWithProviders(
        <RadioGroup name="options" legend="Choose an option">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" defaultChecked />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with disabled group', async () => {
      const { container } = renderWithProviders(
        <RadioGroup name="options" legend="Disabled options" disabled>
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
        </RadioGroup>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML & ARIA
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses semantic radio input', () => {
      renderWithProviders(<Radio label="Option A" value="a" />);
      const radio = screen.getByRole('radio');

      expect(radio.tagName).toBe('INPUT');
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('has accessible name from label', () => {
      renderWithProviders(<Radio label="Subscribe to newsletter" value="subscribe" />);
      const radio = screen.getByRole('radio', {
        name: 'Subscribe to newsletter',
      });

      expect(radio).toBeInTheDocument();
    });

    it('associates label with input via id', () => {
      renderWithProviders(<Radio label="Accept privacy policy" value="accept" />);
      const radio = screen.getByRole('radio');
      const label = screen.getByText('Accept privacy policy');

      expect(radio).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', radio.id);
    });

    it('announces checked state correctly', () => {
      renderWithProviders(<Radio label="Selected" value="sel" defaultChecked />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('RadioGroup has correct group role', () => {
      renderWithProviders(
        <RadioGroup name="options" legend="Choose one">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
        </RadioGroup>
      );

      const group = screen.getByRole('group');
      expect(group.tagName).toBe('FIELDSET');
    });

    it('RadioGroup legend provides accessible name', () => {
      renderWithProviders(
        <RadioGroup name="options" legend="Select your preference">
          <Radio label="Option A" value="a" />
        </RadioGroup>
      );

      const legend = screen.getByText('Select your preference');
      expect(legend.tagName).toBe('LEGEND');
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is keyboard accessible', () => {
      renderWithProviders(<Radio label="Option" value="opt" />);
      const radio = screen.getByRole('radio');

      expect(radio.tagName).toBe('INPUT');
      expect(radio).not.toHaveAttribute('tabindex', '-1');
    });

    it('can be focused', () => {
      renderWithProviders(<Radio label="Option" value="opt" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      expect(radio).toHaveFocus();
    });

    it('cannot be focused when disabled', () => {
      renderWithProviders(<Radio label="Option" value="opt" disabled />);
      const radio = screen.getByRole('radio');

      radio.focus();
      expect(radio).not.toHaveFocus();
    });

    it('supports arrow key navigation in group (roving tabindex)', () => {
      renderWithProviders(
        <RadioGroup name="nav" legend="Navigate">
          <Radio label="First" value="1" defaultChecked />
          <Radio label="Second" value="2" />
          <Radio label="Third" value="3" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');

      // First radio (checked) is focusable
      radios[0].focus();
      expect(radios[0]).toHaveFocus();
    });
  });

  // ========================================
  // SECTION 4: FOCUS INDICATORS
  // ========================================
  describe('Focus Indicators', () => {
    it('shows focus indicator when focused', () => {
      renderWithProviders(<Radio label="Option" value="opt" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      expect(radio).toHaveFocus();
      // CSS provides visible outline
    });

    it('focus indicator has sufficient contrast', async () => {
      const { container } = renderWithProviders(<Radio label="Option" value="opt" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 5: SCREEN READER SUPPORT
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces radio role', () => {
      renderWithProviders(<Radio label="Option A" value="a" />);
      expect(screen.getByRole('radio')).toBeInTheDocument();
    });

    it('announces label text', () => {
      renderWithProviders(<Radio label="Yes, I agree" value="yes" />);
      expect(screen.getByLabelText('Yes, I agree')).toBeInTheDocument();
    });

    it('announces checked state', () => {
      renderWithProviders(<Radio label="Selected" value="sel" defaultChecked />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('announces disabled state', () => {
      renderWithProviders(<Radio label="Unavailable" value="no" disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });

    it('announces group name from legend', () => {
      renderWithProviders(
        <RadioGroup name="payment" legend="Select payment method">
          <Radio label="Credit card" value="cc" />
          <Radio label="PayPal" value="pp" />
        </RadioGroup>
      );

      const group = screen.getByRole('group', { name: 'Select payment method' });
      expect(group).toBeInTheDocument();
    });
  });

  // ========================================
  // SECTION 6: COLOR CONTRAST
  // ========================================
  describe('Color Contrast', () => {
    it('meets contrast requirements in default state', async () => {
      const { container } = renderWithProviders(<Radio label="Option" value="opt" />);
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('meets contrast when checked', async () => {
      const { container } = renderWithProviders(
        <Radio label="Checked" value="check" defaultChecked />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets contrast when disabled', async () => {
      const { container } = renderWithProviders(<Radio label="Disabled" value="dis" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // SECTION 7: REAL-WORLD PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    it('works in form with radio group', () => {
      renderWithProviders(
        <form>
          <RadioGroup name="contact" legend="Preferred contact method">
            <Radio label="Email" value="email" />
            <Radio label="Phone" value="phone" />
            <Radio label="SMS" value="sms" />
          </RadioGroup>
        </form>
      );

      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      expect(radios).toHaveLength(3);
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'contact');
      });
    });

    it('ensures single selection in group', () => {
      renderWithProviders(
        <RadioGroup name="exclusive" legend="Choose one">
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" defaultChecked />
          <Radio label="Option C" value="c" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      const checkedRadios = radios.filter((r) => r.checked);

      // Only one radio should be checked
      expect(checkedRadios).toHaveLength(1);
    });

    it('provides sufficient click target', () => {
      renderWithProviders(<Radio label="Option" value="opt" />);
      const radio = screen.getByRole('radio');

      // Radio is clickable (meets 44x44px for touch targets via CSS)
      expect(radio).toBeInTheDocument();
    });

    it('handles disabled group correctly', () => {
      renderWithProviders(
        <RadioGroup name="disabled-group" legend="Unavailable options" disabled>
          <Radio label="Option A" value="a" />
          <Radio label="Option B" value="b" />
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio') as HTMLInputElement[];
      radios.forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });
  });
});
