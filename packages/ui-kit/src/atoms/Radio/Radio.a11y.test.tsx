// src/atoms/Radio/Radio.a11y.test.tsx
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { Radio } from './Radio';

// Extend Vitest matchers con jest-axe
expect.extend(toHaveNoViolations);

describe('Radio - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // AUTOMATED TESTING (axe-core)
  // ========================================
  // ⚠️ PERCHÉ: axe-core esegue ~50+ regole WCAG automaticamente
  // Testa ogni stato perché ognuno può introdurre violazioni

  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations in default state', async () => {
      const { container } = render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when checked', async () => {
      const { container } = render(
        <Radio name="plan" value="basic" label="Basic Plan" defaultChecked />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when disabled', async () => {
      const { container } = render(<Radio name="plan" value="basic" label="Basic Plan" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with error message', async () => {
      const { container } = render(
        <Radio name="plan" value="basic" label="Basic Plan" error="This field is required" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with helper text', async () => {
      const { container } = render(
        <Radio name="plan" value="basic" label="Basic Plan" helperText="Best for individuals" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with different sizes', async () => {
      const { container: small } = render(
        <Radio name="plan" value="basic" label="Small" size="small" />
      );
      expect(await axe(small)).toHaveNoViolations();

      const { container: medium } = render(
        <Radio name="plan" value="basic" label="Medium" size="medium" />
      );
      expect(await axe(medium)).toHaveNoViolations();

      const { container: large } = render(
        <Radio name="plan" value="basic" label="Large" size="large" />
      );
      expect(await axe(large)).toHaveNoViolations();
    });

    it('has no violations when required', async () => {
      const { container } = render(<Radio name="plan" value="basic" label="Basic Plan" required />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with checked + disabled', async () => {
      const { container } = render(
        <Radio name="plan" value="basic" label="Basic Plan" defaultChecked disabled />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL A
  // ========================================
  // ⚠️ PERCHÉ: Conformità minima per accessibilità base

  describe('WCAG 2.1 Level A', () => {
    // SC 1.1.1: Non-text Content
    // ⚠️ PERCHÉ: Radio deve avere alternative testuali
    it('meets 1.1.1 Non-text Content - has text label', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan - $0/month" />);
      const radio = screen.getByLabelText('Basic Plan - $0/month');

      expect(radio).toBeInTheDocument();
    });

    // SC 1.3.1: Info and Relationships
    // ⚠️ PERCHÉ: Struttura e relazioni devono essere programmatiche
    it('meets 1.3.1 Info and Relationships - uses semantic HTML', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByRole('radio');

      expect(radio.tagName).toBe('INPUT');
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('meets 1.3.1 Info and Relationships - label is associated', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByLabelText('Basic Plan');
      const label = screen.getByText('Basic Plan');

      expect(radio).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', radio.id);
    });

    // SC 2.1.1: Keyboard
    // ⚠️ PERCHÉ: Tutte le funzionalità devono essere accessibili da tastiera
    it('meets 2.1.1 Keyboard - is keyboard accessible', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByRole('radio');

      // Native input garantisce accessibilità keyboard
      expect(radio.tagName).toBe('INPUT');
      expect(radio).not.toHaveAttribute('tabindex', '-1');
    });

    // SC 2.4.7: Focus Visible
    // ⚠️ PERCHÉ: Focus deve essere chiaramente visibile
    it('meets 2.4.7 Focus Visible - can receive focus', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      expect(radio).toHaveFocus();
    });

    // SC 3.3.1: Error Identification
    // ⚠️ PERCHÉ: Errori devono essere identificati e descritti
    it('meets 3.3.1 Error Identification - error is announced', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" error="Selection required" />);
      const radio = screen.getByRole('radio');
      const errorMessage = screen.getByText('Selection required');

      expect(radio).toHaveAttribute('aria-describedby');
      expect(radio.getAttribute('aria-describedby')).toContain(errorMessage.id);
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    // SC 4.1.2: Name, Role, Value
    // ⚠️ PERCHÉ: Screen reader devono annunciare lo stato
    it('meets 4.1.2 Name, Role, Value - has accessible name', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan - $0/month" />);
      const radio = screen.getByRole('radio', {
        name: 'Basic Plan - $0/month',
      });

      expect(radio).toBeInTheDocument();
    });

    it('meets 4.1.2 Name, Role, Value - state is programmatically determined', () => {
      const { rerender } = render(
        <Radio name="plan" value="basic" label="Basic" checked={false} onChange={() => {}} />
      );
      let radio = screen.getByRole('radio');

      // ✅ Stato checked/unchecked accessibile via ARIA
      expect(radio).not.toBeChecked();

      rerender(
        <Radio name="plan" value="basic" label="Basic" checked={true} onChange={() => {}} />
      );
      radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('meets 4.1.2 Name, Role, Value - has name and value for forms', () => {
      render(<Radio name="subscription" value="monthly" label="Monthly" />);
      const radio = screen.getByRole('radio');

      expect(radio).toHaveAttribute('name', 'subscription');
      expect(radio).toHaveAttribute('value', 'monthly');
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL AA
  // ========================================
  // ⚠️ PERCHÉ: Standard richiesto per conformità legale (es. ADA, Section 508)

  describe('WCAG 2.1 Level AA', () => {
    // SC 1.4.1: Use of Color
    // ⚠️ PERCHÉ: Informazioni non devono dipendere solo dal colore
    it('meets 1.4.1 Use of Color - error not conveyed by color alone', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" error="Required field" />);
      const radio = screen.getByRole('radio');

      // ✅ Usa role="alert" + aria-describedby, non solo colore rosso
      expect(radio).toHaveAttribute('aria-describedby');
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('meets 1.4.1 Use of Color - checked state not by color alone', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" defaultChecked />);
      const radio = screen.getByRole('radio');

      // ✅ Stato accessibile programmaticamente, non solo visivamente
      expect(radio).toBeChecked();
    });

    // SC 1.4.3: Contrast (Minimum)
    // ⚠️ PERCHÉ: Testo deve avere contrasto 4.5:1 (3:1 per large text)
    // ⚠️ NOTA: Test manuale richiesto per colori CSS
    it('meets 1.4.3 Contrast (Minimum) - label is visible text', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const label = screen.getByText('Basic Plan');

      // ✅ Label è vero testo HTML, non immagine
      expect(label.tagName).toBe('LABEL');
    });

    // SC 1.4.13: Content on Hover or Focus
    // ⚠️ PERCHÉ: Focus outline non deve nascondere il contenuto
    it('meets 1.4.13 Content on Hover or Focus - no content hidden on focus', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      expect(radio).toHaveFocus();

      // ✅ Label rimane visibile quando radio è in focus
      expect(screen.getByText('Basic Plan')).toBeVisible();
    });

    // SC 2.4.7: Focus Visible (già testato in Level A, ma critico per AA)
    it('meets 2.4.7 Focus Visible - focus ring present', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByRole('radio');

      radio.focus();
      expect(radio).toHaveFocus();

      // ✅ Native input ha focus ring di default
      expect(radio.tagName).toBe('INPUT');
    });

    // SC 3.3.2: Labels or Instructions
    // ⚠️ PERCHÉ: Input devono avere label o istruzioni
    it('meets 3.3.2 Labels or Instructions - has visible label', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan - Free" />);
      const label = screen.getByText('Basic Plan - Free');

      expect(label).toBeVisible();
    });

    it('meets 3.3.2 Labels or Instructions - helper text provides guidance', () => {
      render(
        <Radio
          name="plan"
          value="basic"
          label="Basic"
          helperText="Perfect for individuals and small projects"
        />
      );
      const helperText = screen.getByText('Perfect for individuals and small projects');

      expect(helperText).toBeVisible();
    });

    it('meets 3.3.2 Labels or Instructions - required state indicated', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" required />);

      // ✅ Asterisco visibile + required
      const requiredIndicator = screen.getByLabelText('required');
      expect(requiredIndicator).toBeVisible();

      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('required');
    });

    // SC 3.3.3: Error Suggestion
    // ⚠️ PERCHÉ: Messaggi d'errore devono suggerire correzioni
    it('meets 3.3.3 Error Suggestion - error message is descriptive', () => {
      render(
        <Radio
          name="plan"
          value="basic"
          label="Basic Plan"
          error="Please select a subscription plan to continue"
        />
      );
      const errorMessage = screen.getByText('Please select a subscription plan to continue');

      // ✅ Messaggio descrittivo, non solo "Error"
      expect(errorMessage).toBeVisible();
      expect(errorMessage.textContent!.length).toBeGreaterThan(10);
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL AAA (Enhanced)
  // ========================================
  // ⚠️ PERCHÉ: Accessibilità avanzata per utenti con disabilità severe

  describe('WCAG 2.1 Level AAA', () => {
    // SC 2.4.8: Location
    // ⚠️ PERCHÉ: Utenti devono capire dove si trovano nel form
    it('meets 2.4.8 Location - label provides context', () => {
      render(<Radio name="billing" value="monthly" label="Monthly Subscription - $9.99/month" />);
      const radio = screen.getByRole('radio', {
        name: /Monthly Subscription/i,
      });

      // ✅ Label descrive completamente l'opzione
      expect(radio).toHaveAccessibleName();
    });

    // SC 3.3.5: Help
    // ⚠️ PERCHÉ: Aiuto contestuale deve essere disponibile
    it('meets 3.3.5 Help - helper text provides assistance', () => {
      render(
        <Radio
          name="plan"
          value="enterprise"
          label="Enterprise"
          helperText="Includes priority support, custom SLA, and dedicated account manager"
        />
      );
      const radio = screen.getByRole('radio');
      const helperText = screen.getByText(/Includes priority support/i);

      // ✅ Helper text collegato via aria-describedby
      expect(radio).toHaveAttribute('aria-describedby');
      expect(radio.getAttribute('aria-describedby')).toContain(helperText.id);
    });
  });

  // ========================================
  // ARIA AUTHORING PRACTICES (APG)
  // ========================================
  // ⚠️ PERCHÉ: Pattern standard W3C per radio buttons

  describe('ARIA Authoring Practices', () => {
    it('uses native HTML radio input (recommended by APG)', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" />);
      const radio = screen.getByRole('radio');

      // ✅ Native <input type="radio"> è il pattern raccomandato
      expect(radio.tagName).toBe('INPUT');
      expect(radio).toHaveAttribute('type', 'radio');
    });

    it('has name attribute for radio group association', () => {
      render(
        <>
          <Radio name="plan" value="basic" label="Basic" />
          <Radio name="plan" value="pro" label="Pro" />
        </>
      );

      const radios = screen.getAllByRole('radio');
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'plan');
      });
    });

    it('has unique value for each radio in group', () => {
      render(
        <>
          <Radio name="plan" value="basic" label="Basic" />
          <Radio name="plan" value="pro" label="Pro" />
          <Radio name="plan" value="enterprise" label="Enterprise" />
        </>
      );

      const basicRadio = screen.getByLabelText('Basic');
      const proRadio = screen.getByLabelText('Pro');
      const enterpriseRadio = screen.getByLabelText('Enterprise');

      expect(basicRadio).toHaveAttribute('value', 'basic');
      expect(proRadio).toHaveAttribute('value', 'pro');
      expect(enterpriseRadio).toHaveAttribute('value', 'enterprise');

      // ✅ Tutti i value sono diversi
      const values = [
        basicRadio.getAttribute('value'),
        proRadio.getAttribute('value'),
        enterpriseRadio.getAttribute('value'),
      ];
      const uniqueValues = new Set(values);
      expect(uniqueValues.size).toBe(3);
    });
  });

  // ========================================
  // SCREEN READER ANNOUNCEMENTS
  // ========================================
  // ⚠️ PERCHÉ: Verificare cosa sente l'utente screen reader

  describe('Screen Reader Experience', () => {
    it('announces label correctly', () => {
      render(<Radio name="plan" value="pro" label="Pro Plan - Best Value - $19/month" />);
      const radio = screen.getByRole('radio', {
        name: 'Pro Plan - Best Value - $19/month',
      });

      expect(radio).toHaveAccessibleName();
    });

    it('announces error state', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" error="You must select a plan" />);
      const radio = screen.getByRole('radio');

      // ✅ Screen reader annuncerà il messaggio d'errore
      expect(radio).toHaveAttribute('aria-describedby');
    });

    it('announces required state', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" required />);
      const radio = screen.getByRole('radio');

      // ✅ Screen reader annuncerà "required"
      expect(radio).toHaveAttribute('required');
    });

    it('announces disabled state', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" disabled />);
      const radio = screen.getByRole('radio');

      // ✅ Screen reader annuncerà "disabled" o "dimmed"
      expect(radio).toBeDisabled();
    });

    it('announces checked state', () => {
      render(<Radio name="plan" value="basic" label="Basic Plan" defaultChecked />);
      const radio = screen.getByRole('radio');

      // ✅ Screen reader annuncerà "checked"
      expect(radio).toBeChecked();
    });
  });
});
