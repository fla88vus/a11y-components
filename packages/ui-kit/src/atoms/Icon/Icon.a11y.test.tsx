import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Check, AlertCircle, Info, Search, X, Home, Settings, User, Mail } from 'lucide-react';
import { Icon } from './Icon';

// Estendi expect con jest-axe matchers
expect.extend(toHaveNoViolations);

describe('Icon - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // AUTOMATED TESTING (axe-core)
  // ⚠️ PERCHÉ: axe-core esegue ~50+ regole WCAG automaticamente
  // ========================================
  describe('Automated Accessibility Testing', () => {
    it('has no accessibility violations - semantic icon', async () => {
      const { container } = render(<Icon icon={Check} aria-label="Operazione completata" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations - decorative icon', async () => {
      const { container } = render(<Icon icon={Check} decorative />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations - icon in button', async () => {
      const { container } = render(
        <button aria-label="Chiudi finestra">
          <Icon icon={X} decorative />
        </button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations - all sizes', async () => {
      const sizes = ['small', 'medium', 'large', 'xlarge'] as const;

      for (const size of sizes) {
        const { container } = render(<Icon icon={Check} aria-label="Check" size={size} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });

    it('has no violations - custom colors', async () => {
      const { container } = render(
        <div>
          <Icon icon={AlertCircle} aria-label="Error" color="red" />
          <Icon icon={Check} aria-label="Success" color="green" />
          <Icon icon={Search} aria-label="Search" color="#3b82f6" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations - multiple icons', async () => {
      const { container } = render(
        <div>
          <Icon icon={Home} aria-label="Home" />
          <Icon icon={Settings} aria-label="Settings" />
          <Icon icon={User} aria-label="User profile" />
          <Icon icon={Mail} aria-label="Messages" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL A (Minimum)
  // ⚠️ WHY: Level A is the minimum requirement for compliance
  // ========================================
  describe('WCAG 2.1 Level A', () => {
    // SC 1.1.1: Non-text Content (Level A)
    // ⚠️ WHY: All non-text content must have a text alternative
    it('meets 1.1.1 Non-text Content - semantic icon has text alternative', () => {
      render(<Icon icon={AlertCircle} aria-label="Warning: critical error" />);

      const icon = screen.getByRole('img', { name: 'Warning: critical error' });

      // ✅ Has accessible name via aria-label
      expect(icon).toHaveAccessibleName('Warning: critical error');
      // ✅ Not hidden from screen readers
      expect(icon).not.toHaveAttribute('aria-hidden');
    });

    it('meets 1.1.1 Non-text Content - decorative icon is hidden', () => {
      const { container } = render(<Icon icon={Check} decorative />);
      const svg = container.querySelector('svg');

      // ✅ Decorative icon hidden from screen readers
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      // ✅ No role or aria-label (not needed)
      expect(svg).not.toHaveAttribute('role');
      expect(svg).not.toHaveAttribute('aria-label');
    });

    it('meets 1.1.1 Non-text Content - icon in labeled button', () => {
      render(
        <button aria-label="Close dialog">
          <Icon icon={X} decorative />
        </button>
      );

      const button = screen.getByRole('button', { name: 'Close dialog' });

      // ✅ Button has accessible name
      expect(button).toHaveAccessibleName('Close dialog');

      // ✅ Icon is decorative (button already has label)
      const svg = button.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    // SC 4.1.2: Name, Role, Value (Level A)
    // ⚠️ WHY: UI components must expose name, role, and value to AT
    it('meets 4.1.2 Name, Role, Value - semantic icon has role and name', () => {
      render(<Icon icon={Check} aria-label="Successfully completed" />);

      const icon = screen.getByRole('img');

      // ✅ Has appropriate role
      expect(icon).toHaveAttribute('role', 'img');

      // ✅ Has accessible name
      expect(icon).toHaveAccessibleName('Successfully completed');
    });
  });

  // ========================================
  // WCAG 2.1 LEVEL AA (Required)
  // ⚠️ WHY: Level AA is the standard requirement for legal compliance
  // ========================================
  describe('WCAG 2.1 Level AA', () => {
    // SC 1.4.1: Use of Color (Level A but critical for icons)
    // ⚠️ WHY: Information must not be conveyed by color alone
    it('meets 1.4.1 Use of Color - semantic meaning not by color alone', () => {
      render(
        <div>
          <Icon icon={AlertCircle} aria-label="Error" color="red" />
          <Icon icon={Check} aria-label="Success" color="green" />
        </div>
      );

      // ✅ Each icon has aria-label that conveys meaning
      // Not just red/green color
      expect(screen.getByRole('img', { name: 'Error' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Success' })).toBeInTheDocument();
    });

    // SC 1.4.11: Non-text Contrast (Level AA)
    // ⚠️ WHY: UI components must have 3:1 contrast
    it('meets 1.4.11 Non-text Contrast - NOTE: Manual verification required', () => {
      // ⚠️ NOTE: Contrast ratio must be verified with dedicated tools
      // - Icons inherit color from context (currentColor)
      // - Verify that the used color has 3:1 contrast with background

      render(<Icon icon={Check} aria-label="Check" color="currentColor" />);

      // This test serves as a reminder for manual verification
      expect(screen.getByRole('img')).toBeInTheDocument();

      // TODO: Add automated contrast check if possible
    });

    // SC 2.4.4: Link Purpose (In Context) (Level A)
    // Applicable if icon is used in a link
    it('meets 2.4.4 Link Purpose - icon in link has context', () => {
      render(
        <a href="/home" aria-label="Go to homepage">
          <Icon icon={Home} decorative />
        </a>
      );

      const link = screen.getByRole('link', { name: 'Go to homepage' });

      // ✅ Link has clear purpose via aria-label
      expect(link).toHaveAccessibleName('Go to homepage');

      // ✅ Icon is decorative (link already has label)
      const svg = link.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ========================================
  // ARIA AUTHORING PRACTICES (APG)
  // ⚠️ WHY: WAI-ARIA APG defines best practice patterns
  // ========================================
  describe('ARIA Authoring Practices', () => {
    it('uses appropriate role for semantic icons', () => {
      render(<Icon icon={AlertCircle} aria-label="Alert" />);
      const icon = screen.getByRole('img');

      // ✅ role="img" is appropriate for semantic SVG icons
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('does not use role for decorative icons', () => {
      const { container } = render(<Icon icon={Check} decorative />);
      const svg = container.querySelector('svg');

      // ✅ Decorative icons should not have a role
      expect(svg).not.toHaveAttribute('role');
      // ✅ Must have aria-hidden
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('is not focusable', () => {
      render(<Icon icon={Check} aria-label="Check" />);
      const icon = screen.getByRole('img');

      // ✅ Icons should not be focusable
      expect(icon).toHaveAttribute('focusable', 'false');
    });
  });

  // ========================================
  // SCREEN READER EXPERIENCE
  // ⚠️ WHY: Tests simulate what screen reader users hear
  // ========================================
  describe('Screen Reader Experience', () => {
    it('semantic icon is announced correctly', () => {
      render(<Icon icon={AlertCircle} aria-label="Warning: form error" />);

      // ✅ Screen reader announces: "Warning: form error, image"
      const icon = screen.getByRole('img', { name: 'Warning: form error' });
      expect(icon).toHaveAccessibleName('Warning: form error');
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('decorative icon is ignored by screen reader', () => {
      const { container } = render(
        <button>
          <Icon icon={Search} decorative />
          <span>Search</span>
        </button>
      );

      // ✅ Screen reader announces only: "Search, button"
      // Icon is ignored because aria-hidden="true"
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('icon in labeled button does not duplicate announcement', () => {
      render(
        <button aria-label="Save changes">
          <Icon icon={Check} decorative />
        </button>
      );

      // ✅ Screen reader announces: "Save changes, button"
      // Not: "Check, Save changes, button" (duplication avoided)
      const button = screen.getByRole('button', { name: 'Save changes' });
      expect(button).toHaveAccessibleName('Save changes');

      const svg = button.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ========================================
  // REAL-WORLD PATTERNS
  // ========================================
  describe('Real-world Accessibility Patterns', () => {
    it('status icon with descriptive label', () => {
      render(
        <div>
          <Icon icon={Check} aria-label="Payment completed" color="green" size="large" />
          <p>Your order has been confirmed</p>
        </div>
      );

      const icon = screen.getByRole('img', { name: 'Payment completed' });
      expect(icon).toBeInTheDocument();
    });

    it('navigation menu with icon labels', () => {
      render(
        <nav aria-label="Main menu">
          <a href="/home">
            <Icon icon={Home} decorative />
            <span>Home</span>
          </a>
          <a href="/settings">
            <Icon icon={Settings} decorative />
            <span>Settings</span>
          </a>
          <a href="/profile">
            <Icon icon={User} decorative />
            <span>Profile</span>
          </a>
        </nav>
      );

      // ✅ All links have visible text
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();

      // ✅ All icons are decorative
      const nav = screen.getByRole('navigation', { name: 'Main menu' });
      const svgs = nav.querySelectorAll('svg');
      svgs.forEach((svg) => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('icon-only button with proper label', () => {
      render(
        <button aria-label="Delete item">
          <Icon icon={X} decorative size="small" />
        </button>
      );

      const button = screen.getByRole('button', { name: 'Delete item' });
      expect(button).toBeInTheDocument();

      const svg = button.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ========================================
  // KEYBOARD NAVIGATION
  // ⚠️ WHY: Icons must not interfere with keyboard navigation
  // ========================================
  describe('Keyboard Navigation', () => {
    it('icon does not interfere with keyboard navigation', () => {
      render(
        <div>
          <button>
            <Icon icon={Check} decorative />
            <span>First</span>
          </button>
          <button>
            <Icon icon={X} decorative />
            <span>Second</span>
          </button>
        </div>
      );

      const buttons = screen.getAllByRole('button');

      // ✅ Focus goes directly to buttons, not icons
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();

      // ✅ Tab moves to next button, skips icon
      // (Icon has focusable="false")
    });

    it('standalone semantic icon is not keyboard focusable', () => {
      render(<Icon icon={AlertCircle} aria-label="Warning" />);
      const icon = screen.getByRole('img');

      // ✅ Icons are not tab stops
      expect(icon).toHaveAttribute('focusable', 'false');

      // Attempt to focus
      (icon as HTMLElement).focus();
      expect(icon).not.toHaveFocus();
    });
  });

  // ========================================
  // PRIORITY 1: Extended Descriptions (aria-describedby)
  // WCAG 1.3.1: Info and Relationships (Level A)
  // ⚠️ WHY: Complex information requires extended descriptions
  // ========================================
  describe('Extended Descriptions - Priority 1', () => {
    it('has no violations with aria-describedby', async () => {
      const { container } = render(
        <div>
          <Icon icon={Check} aria-label="Sales chart" aria-describedby="chart-desc" />
          <p id="chart-desc">
            Monthly sales from January to December 2025. Upward trend with peak in December.
          </p>
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets 1.3.1 Info and Relationships - extended description linked', () => {
      render(
        <div>
          <Icon icon={AlertCircle} aria-label="Critical error" aria-describedby="error-details" />
          <div id="error-details">
            Server not responding. Check connection and try again in 5 minutes.
          </div>
        </div>
      );

      const icon = screen.getByRole('img', { name: 'Critical error' });

      // ✅ Relationship between icon and description established via aria-describedby
      expect(icon).toHaveAttribute('aria-describedby', 'error-details');
      expect(screen.getByText(/Server not responding/)).toBeInTheDocument();
    });

    it('aria-describedby not applied to decorative icons', () => {
      const { container } = render(
        <Icon icon={Check} decorative aria-describedby="some-description" />
      );

      const svg = container.querySelector('svg');

      // ✅ Decorative icons must not have aria-describedby
      expect(svg).not.toHaveAttribute('aria-describedby');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ========================================
  // PRIORITY 2: SVG Title for Tooltips
  // WCAG 1.1.1 + User Experience Enhancement
  // ⚠️ WHY: Native SVG <title> improves screen reader compatibility
  // ========================================
  describe('SVG Title Element - Priority 2', () => {
    it('has no violations with title element', async () => {
      const { container } = render(
        <Icon icon={Info} aria-label="Information" title="Click for more details" />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('title improves screen reader experience', () => {
      const { container } = render(
        <Icon icon={AlertCircle} aria-label="Warning" title="This action requires confirmation" />
      );

      const title = container.querySelector('title');

      // ✅ Title present and accessible
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('This action requires confirmation');

      // ✅ Title has unique ID (for future aria-labelledby)
      expect(title?.id).toBeTruthy();
    });

    it('title not rendered for decorative icons', () => {
      const { container } = render(<Icon icon={Check} decorative title="This should not appear" />);

      const title = container.querySelector('title');

      // ✅ Decorative icons must not have title
      expect(title).not.toBeInTheDocument();
    });

    it('meets 1.1.1 with combined aria-label and title', () => {
      const { container } = render(
        <Icon icon={Check} aria-label="Download file" title="Download document.pdf (2.5 MB)" />
      );

      const icon = screen.getByRole('img', { name: 'Download file' });
      const title = container.querySelector('title');

      // ✅ Both present for maximum compatibility
      expect(icon).toHaveAccessibleName('Download file');
      expect(title).toHaveTextContent('Download document.pdf (2.5 MB)');
    });
  });

  // ========================================
  // PRIORITY 2: Live Regions for Dynamic Icons
  // WCAG 4.1.3: Status Messages (Level AA)
  // ⚠️ WHY: State changes must be announced automatically
  // ========================================
  describe('Live Regions - Priority 2', () => {
    it('has no violations with aria-live', async () => {
      const { container } = render(
        <Icon icon={Check} aria-label="Loading in progress" aria-live="polite" />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets 4.1.3 Status Messages - polite announcement', () => {
      render(<Icon icon={Check} aria-label="Operation in progress" aria-live="polite" />);

      const icon = screen.getByRole('img', { name: 'Operation in progress' });

      // ✅ aria-live="polite" announces when screen reader is idle
      expect(icon).toHaveAttribute('aria-live', 'polite');
    });

    it('meets 4.1.3 Status Messages - assertive announcement', () => {
      render(<Icon icon={AlertCircle} aria-label="Critical error" aria-live="assertive" />);

      const icon = screen.getByRole('img', { name: 'Critical error' });

      // ✅ aria-live="assertive" interrupts for urgent announcements
      expect(icon).toHaveAttribute('aria-live', 'assertive');
    });

    it('dynamic state change is announced via live region', () => {
      const { rerender } = render(
        <Icon icon={Check} aria-label="Saving in progress" aria-live="polite" />
      );

      let icon = screen.getByRole('img', { name: 'Saving in progress' });
      expect(icon).toHaveAttribute('aria-live', 'polite');

      // ✅ State change announced automatically
      rerender(<Icon icon={Check} aria-label="Save completed" aria-live="polite" />);

      icon = screen.getByRole('img', { name: 'Save completed' });
      expect(icon).toHaveAttribute('aria-live', 'polite');
      // Screen reader announces: "Save completed"
    });

    it('aria-live not applied to decorative icons', () => {
      const { container } = render(<Icon icon={Check} decorative aria-live="polite" />);

      const svg = container.querySelector('svg');

      // ✅ Decorative icons must not have aria-live
      expect(svg).not.toHaveAttribute('aria-live');
    });
  });

  // ========================================
  // PRIORITY 2: Semantic Variants
  // WCAG 1.4.1: Use of Color (Level A)
  // ⚠️ WHY: Variants must work even without seeing colors
  // ========================================
  describe('Semantic Variants - Priority 2', () => {
    it('has no violations with success variant', async () => {
      const { container } = render(<Icon icon={Check} variant="success" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with error variant', async () => {
      const { container } = render(<Icon icon={X} variant="error" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with warning variant', async () => {
      const { container } = render(<Icon icon={AlertCircle} variant="warning" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with info variant', async () => {
      const { container } = render(<Icon icon={Info} variant="info" />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('meets 1.4.1 Use of Color - variant provides text label', () => {
      render(<Icon icon={Check} variant="success" />);

      // ✅ Variant provides textual label, not just color
      const icon = screen.getByRole('img', { name: 'Success' });
      expect(icon).toHaveAccessibleName('Success');

      // ✅ Does not rely solely on green color to communicate success
    });

    it('variant label can be overridden for specificity', () => {
      render(<Icon icon={Check} variant="success" aria-label="Document saved successfully" />);

      // ✅ Custom label more specific than "Success"
      const icon = screen.getByRole('img', { name: 'Document saved successfully' });
      expect(icon).toBeInTheDocument();
    });

    it('variant remains accessible in high contrast mode', () => {
      // Simulate high contrast mode
      render(
        <div style={{ forcedColorAdjust: 'none' }}>
          <Icon icon={AlertCircle} variant="error" />
        </div>
      );

      const icon = screen.getByRole('img', { name: 'Error' });

      // ✅ Textual label remains even if colors are overridden
      expect(icon).toHaveAccessibleName('Error');
    });
  });

  // ========================================
  // REAL-WORLD ENHANCED PATTERNS
  // ========================================
  describe('Real-world Enhanced Patterns', () => {
    it('loading indicator with live updates', async () => {
      const { container, rerender } = render(
        <div role="status" aria-live="polite">
          <Icon icon={Check} aria-label="Loading file" aria-live="polite" />
          <span>Loading in progress...</span>
        </div>
      );

      let results = await axe(container);
      expect(results).toHaveNoViolations();

      // Simulate completion
      rerender(
        <div role="status" aria-live="polite">
          <Icon icon={Check} variant="success" aria-live="polite" />
          <span>Loading completed</span>
        </div>
      );

      results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('complex data visualization with description', async () => {
      const { container } = render(
        <figure>
          <Icon
            icon={Check}
            aria-label="Annual sales chart"
            aria-describedby="chart-summary"
            title="Click to view interactive details"
            size="xlarge"
          />
          <figcaption id="chart-summary">
            2025 Sales: €500K total, +15% compared to 2024. Maximum peak in Q4 with €180K.
          </figcaption>
        </figure>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      const icon = screen.getByRole('img', { name: 'Annual sales chart' });
      expect(icon).toHaveAttribute('aria-describedby', 'chart-summary');
    });

    it('form validation with semantic variants', async () => {
      const { container } = render(
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" aria-invalid="true" aria-describedby="email-error" />
          <div id="email-error" role="alert">
            <Icon icon={AlertCircle} variant="error" decorative />
            <span>Enter a valid email address</span>
          </div>
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();

      // ✅ Decorative icon because the text provides the message
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
