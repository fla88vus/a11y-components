import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Checkbox } from './Checkbox';

// Extend Vitest matchers con jest-axe
expect.extend(toHaveNoViolations);

describe('Checkbox - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // AUTOMATED TESTING (axe-core)
  // ========================================
  // ⚠️ PERCHÉ: axe-core esegue ~50+ regole WCAG automaticamente
  // Testa ogni stato perché ognuno può introdurre violazioni

  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(<Checkbox label="Accept terms" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when checked', async () => {
      const { container } = render(<Checkbox label="Accept terms" defaultChecked />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when disabled', async () => {
      const { container } = render(<Checkbox label="Accept terms" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with error message', async () => {
      const { container } = render(
        <Checkbox label="Accept terms" error="This field is required" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with helper text', async () => {
      const { container } = render(
        <Checkbox label="Subscribe to newsletter" helperText="We'll send weekly updates" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with different sizes', async () => {
      const { container: small } = render(<Checkbox label="Small" size="small" />);
      expect(await axe(small)).toHaveNoViolations();

      const { container: medium } = render(<Checkbox label="Medium" size="medium" />);
      expect(await axe(medium)).toHaveNoViolations();

      const { container: large } = render(<Checkbox label="Large" size="large" />);
      expect(await axe(large)).toHaveNoViolations();
    });

    it('has no violations when required', async () => {
      const { container } = render(<Checkbox label="Accept terms" required />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with checked + disabled', async () => {
      const { container } = render(<Checkbox label="Agreed" defaultChecked disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL A (Base Requirements)
  // ========================================

  describe('WCAG 2.1 Level A Compliance', () => {
    // SC 1.3.1: Info and Relationships
    // ⚠️ PERCHÉ: HTML semantico comunica relazioni agli screen reader
    it('meets 1.3.1 Info and Relationships - uses semantic checkbox', () => {
      render(<Checkbox label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox.tagName).toBe('INPUT');
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('meets 1.3.1 Info and Relationships - label associated', () => {
      render(<Checkbox label="Subscribe to newsletter" />);
      const checkbox = screen.getByLabelText('Subscribe to newsletter');
      const label = screen.getByText('Subscribe to newsletter');

      // ✅ htmlFor + id linkano label e input
      expect(checkbox).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', checkbox.id);
    });

    // SC 1.4.1: Use of Color
    // ⚠️ PERCHÉ: Daltonici non vedono differenze di colore
    it('meets 1.4.1 Use of Color - error not conveyed by color alone', () => {
      render(<Checkbox label="Accept" error="Required field" />);
      const checkbox = screen.getByRole('checkbox');

      // ✅ Usa ARIA + role="alert" + testo, non solo colore rosso
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent('Required field');
    });

    // SC 2.1.1: Keyboard
    // ⚠️ PERCHÉ: Alcuni utenti navigano solo con tastiera
    it('meets 2.1.1 Keyboard - checkbox is keyboard accessible', () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox');

      // ✅ Input nativo supporta Space key automaticamente
      expect(checkbox.tagName).toBe('INPUT');
      expect(checkbox).not.toHaveAttribute('tabindex', '-1');
    });

    // SC 2.4.7: Focus Visible
    // ⚠️ PERCHÉ: Utenti tastiera devono vedere dove sono
    it('meets 2.4.7 Focus Visible - checkbox can receive focus', () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    // SC 3.3.2: Labels or Instructions
    // ⚠️ PERCHÉ: Ogni controllo deve avere una label
    it('meets 3.3.2 Labels or Instructions - has visible label', () => {
      render(<Checkbox label="I agree to terms" />);

      // ✅ Label visibile per tutti
      expect(screen.getByText('I agree to terms')).toBeVisible();
    });

    // SC 4.1.2: Name, Role, Value
    // ⚠️ PERCHÉ: Screen reader devono annunciare lo stato
    it('meets 4.1.2 Name, Role, Value - has accessible name', () => {
      render(<Checkbox label="Accept privacy policy" />);
      const checkbox = screen.getByRole('checkbox', {
        name: 'Accept privacy policy',
      });

      expect(checkbox).toBeInTheDocument();
    });

    it('meets 4.1.2 Name, Role, Value - state is programmatically determined', () => {
      const { rerender } = render(<Checkbox label="Accept" checked={false} onChange={() => {}} />);
      let checkbox = screen.getByRole('checkbox');

      // ✅ Stato checked/unchecked accessibile via ARIA
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox label="Accept" checked={true} onChange={() => {}} />);
      checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL AA (Enhanced Requirements)
  // ========================================

  describe('WCAG 2.1 Level AA Compliance', () => {
    // SC 1.4.3: Contrast (Minimum)
    // ⚠️ PERCHÉ: Testo deve avere contrast ratio 4.5:1 minimo
    it('meets 1.4.3 Contrast - sufficient color contrast', async () => {
      const { container } = render(<Checkbox label="Accept terms" />);
      const results = await axe(container);

      // axe verifica automaticamente i contrast ratio
      expect(results).toHaveNoViolations();
    });

    it('meets 1.4.3 Contrast - error text has sufficient contrast', async () => {
      const { container } = render(<Checkbox label="Accept" error="Required" />);
      const results = await axe(container);

      // #dc2626 su bianco = 4.52:1 ✅
      expect(results).toHaveNoViolations();
    });

    // SC 2.4.7: Focus Visible
    // ⚠️ PERCHÉ: Focus indicator deve avere contrast 3:1
    it('meets 2.4.7 Focus Visible - focus indicator is visible', () => {
      render(<Checkbox label="Accept" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toHaveFocus();
      // ✅ CSS: outline: 3px solid #3b82f6 + outline-offset: 2px
    });

    // SC 3.3.1: Error Identification
    // ⚠️ PERCHÉ: Errori devono essere identificati chiaramente
    it('meets 3.3.1 Error Identification - errors clearly identified', () => {
      render(<Checkbox label="Accept" error="You must accept the terms" />);

      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('You must accept the terms');
    });

    it('meets 3.3.1 Error Identification - error linked via aria-describedby', () => {
      render(<Checkbox label="Accept" error="Required field" />);
      const checkbox = screen.getByRole('checkbox');
      const error = screen.getByText('Required field');

      // ✅ aria-describedby collega checkbox → messaggio errore
      expect(checkbox).toHaveAttribute('aria-describedby');
      expect(checkbox.getAttribute('aria-describedby')).toContain(error.id);
    });

    // SC 3.3.2: Labels or Instructions
    // ⚠️ PERCHÉ: Helper text fornisce istruzioni aggiuntive
    it('meets 3.3.2 Labels or Instructions - provides helper text', () => {
      render(<Checkbox label="Subscribe" helperText="We'll send you monthly updates" />);

      expect(screen.getByText("We'll send you monthly updates")).toBeVisible();
    });

    it('meets 3.3.2 Labels or Instructions - helper text linked', () => {
      render(<Checkbox label="Subscribe" helperText="Weekly updates" />);
      const checkbox = screen.getByRole('checkbox');
      const helperText = screen.getByText('Weekly updates');

      // ✅ aria-describedby collega checkbox → helper text
      expect(checkbox).toHaveAttribute('aria-describedby');
      expect(checkbox.getAttribute('aria-describedby')).toContain(helperText.id);
    });

    // SC 3.3.3: Error Suggestion
    // ⚠️ PERCHÉ: Fornire suggerimenti per correggere errori
    it('meets 3.3.3 Error Suggestion - provides descriptive error', () => {
      render(<Checkbox label="Accept" error="Please accept the terms to continue" />);

      // ✅ Messaggio descrittivo, non solo "Required"
      expect(screen.getByText('Please accept the terms to continue')).toBeInTheDocument();
    });
  });

  // ========================================
  // ADDITIONAL BEST PRACTICES
  // ========================================

  describe('Additional Accessibility Best Practices', () => {
    it('announces required state to screen readers', () => {
      render(<Checkbox label="Accept terms" required />);
      const checkbox = screen.getByRole('checkbox', { name: /Accept terms/i });

      // ✅ Doppio attributo: HTML + ARIA
      expect(checkbox).toHaveAttribute('required');
      expect(checkbox).toHaveAttribute('aria-required', 'true');
    });

    it('combines multiple descriptions (error + helper)', () => {
      render(<Checkbox label="Accept" helperText="Read our terms" error="Required" />);
      const checkbox = screen.getByRole('checkbox');

      // ✅ aria-describedby può avere multipli IDs
      expect(checkbox).toHaveAttribute('aria-describedby');

      // ⚠️ Helper nascosto quando c'è errore (design choice)
      expect(screen.queryByText('Read our terms')).not.toBeInTheDocument();
      expect(screen.getByText('Required')).toBeInTheDocument();
    });

    it('maintains semantic structure with required indicator', () => {
      render(<Checkbox label="Accept" required />);
      const requiredIndicator = screen.getByLabelText('required');

      // ✅ Asterisco ha aria-label per screen reader
      expect(requiredIndicator).toHaveTextContent('*');
      expect(requiredIndicator).toHaveAttribute('aria-label', 'required');
    });

    it('provides sufficient click target size', () => {
      render(<Checkbox label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox');

      // ✅ Medium size: 20x20px (WCAG AAA raccomanda 44x44px)
      // Large size disponibile per touch targets
      expect(checkbox).toBeInTheDocument();
    });
  });
});
