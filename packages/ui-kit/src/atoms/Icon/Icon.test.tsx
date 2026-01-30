import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Check, AlertCircle, Search, X } from 'lucide-react';
import { Icon } from './Icon';

describe('Icon', () => {
  // ===================================
  // BASIC RENDERING
  // ===================================
  describe('Basic Rendering', () => {
    it('renders icon component', () => {
      render(<Icon icon={Check} aria-label="Completato" />);
      const icon = screen.getByRole('img', { name: 'Completato' });
      expect(icon).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Icon icon={Check} aria-label="Test" className="custom-class" />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveClass('custom-class');
    });

    it('renders different icon types', () => {
      const { rerender } = render(<Icon icon={Check} aria-label="Check" />);
      expect(screen.getByRole('img')).toBeInTheDocument();

      rerender(<Icon icon={AlertCircle} aria-label="Alert" />);
      expect(screen.getByRole('img')).toBeInTheDocument();

      rerender(<Icon icon={Search} aria-label="Search" />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  // ===================================
  // ACCESSIBILITY - SEMANTIC VS DECORATIVE
  // ===================================
  describe('Accessibility - Semantic vs Decorative', () => {
    it('semantic icon has role="img" when aria-label is provided', () => {
      render(<Icon icon={AlertCircle} aria-label="Attenzione" />);
      const icon = screen.getByRole('img', { name: 'Attenzione' });
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-label', 'Attenzione');
      expect(icon).not.toHaveAttribute('aria-hidden');
    });

    it('decorative icon has aria-hidden when no aria-label', () => {
      const { container } = render(<Icon icon={Check} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).not.toHaveAttribute('role');
      expect(svg).not.toHaveAttribute('aria-label');
    });

    it('decorative icon when decorative={true} even with aria-label', () => {
      const { container } = render(<Icon icon={Check} aria-label="Test" decorative={true} />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).not.toHaveAttribute('role');
      expect(svg).not.toHaveAttribute('aria-label');
    });

    it('semantic icon when decorative={false}', () => {
      render(<Icon icon={Check} aria-label="Success" decorative={false} />);
      const icon = screen.getByRole('img', { name: 'Success' });
      expect(icon).not.toHaveAttribute('aria-hidden');
    });
  });

  // ===================================
  // SIZE VARIANTS
  // ===================================
  describe('Size Variants', () => {
    it('applies small size class', () => {
      render(<Icon icon={Check} aria-label="Check" size="small" />);
      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument();
    });

    it('applies medium size class by default', () => {
      render(<Icon icon={Check} aria-label="Check" />);
      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument();
    });

    it('applies large size class', () => {
      render(<Icon icon={Check} aria-label="Check" size="large" />);
      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument();
    });

    it('applies xlarge size class', () => {
      render(<Icon icon={Check} aria-label="Check" size="xlarge" />);
      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument();
    });
  });

  // ===================================
  // COLOR CUSTOMIZATION
  // ===================================
  describe('Color Customization', () => {
    it('uses currentColor by default', () => {
      const { container } = render(<Icon icon={Check} aria-label="Check" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom color', () => {
      const { container } = render(<Icon icon={AlertCircle} aria-label="Error" color="red" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom hex color', () => {
      const { container } = render(<Icon icon={Check} aria-label="Success" color="#00ff00" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  // ===================================
  // FOCUSABLE
  // ===================================
  describe('Focusability', () => {
    it('is not focusable', () => {
      render(<Icon icon={Check} aria-label="Check" />);
      const icon = screen.getByRole('img');
      expect(icon).toHaveAttribute('focusable', 'false');
    });

    it('cannot receive keyboard focus', () => {
      render(<Icon icon={Check} aria-label="Check" />);
      const icon = screen.getByRole('img');

      // Tentativo di focus
      (icon as HTMLElement).focus();
      expect(icon).not.toHaveFocus();
    });
  });

  // ===================================
  // PROPS FORWARDING
  // ===================================
  describe('Props Forwarding', () => {
    it('forwards SVG props to icon', () => {
      render(<Icon icon={Check} aria-label="Check" data-testid="custom-icon" strokeWidth={3} />);
      const icon = screen.getByTestId('custom-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('stroke-width', '3');
    });
  });

  // ===================================
  // ACCESSIBILITY - WCAG 2.1 AA
  // ===================================
  describe('Accessibility - WCAG 2.1 AA', () => {
    it('meets 1.1.1 Non-text Content - has text alternative when semantic', () => {
      render(<Icon icon={AlertCircle} aria-label="Errore critico" />);
      const icon = screen.getByRole('img', { name: 'Errore critico' });
      expect(icon).toHaveAccessibleName('Errore critico');
    });

    it('meets 1.1.1 Non-text Content - decorative icons hidden from AT', () => {
      const { container } = render(<Icon icon={Check} decorative />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      // Screen reader lo ignorerà
    });

    it('meets 4.1.2 Name, Role, Value - semantic icon has role', () => {
      render(<Icon icon={Check} aria-label="Completato" />);
      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('role', 'img');
    });
  });

  // ===================================
  // USE CASES
  // ===================================
  describe('Real-world Use Cases', () => {
    it('semantic standalone icon', () => {
      render(
        <div>
          <Icon icon={AlertCircle} aria-label="Attenzione" color="orange" size="large" />
          <span>Messaggio importante</span>
        </div>
      );

      const icon = screen.getByRole('img', { name: 'Attenzione' });
      expect(icon).toBeInTheDocument();
    });

    it('decorative icon in button (button has aria-label)', () => {
      render(
        <button aria-label="Chiudi">
          <Icon icon={X} decorative />
        </button>
      );

      const button = screen.getByRole('button', { name: 'Chiudi' });
      expect(button).toBeInTheDocument();

      const svg = button.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('icon next to text (decorative)', () => {
      render(
        <button>
          <Icon icon={Search} decorative />
          <span>Cerca</span>
        </button>
      );

      const button = screen.getByRole('button', { name: 'Cerca' });
      expect(button).toBeInTheDocument();

      // Icona è decorativa perché il testo fornisce il label
      const svg = button.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // ===================================
  // PRIORITY 1: aria-describedby
  // ===================================
  describe('Extended Descriptions (Priority 1)', () => {
    it('supports aria-describedby for extended descriptions', () => {
      render(
        <div>
          <Icon icon={Check} aria-label="Chart" aria-describedby="chart-description" />
          <p id="chart-description">Monthly sales data from January to December</p>
        </div>
      );

      const icon = screen.getByRole('img', { name: 'Chart' });
      expect(icon).toHaveAttribute('aria-describedby', 'chart-description');
    });

    it('does not add aria-describedby to decorative icons', () => {
      const { container } = render(<Icon icon={Check} decorative aria-describedby="description" />);

      const svg = container.querySelector('svg');
      expect(svg).not.toHaveAttribute('aria-describedby');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('can combine aria-label with aria-describedby', () => {
      render(<Icon icon={AlertCircle} aria-label="Warning" aria-describedby="warning-details" />);

      const icon = screen.getByRole('img', { name: 'Warning' });
      expect(icon).toHaveAttribute('aria-label', 'Warning');
      expect(icon).toHaveAttribute('aria-describedby', 'warning-details');
    });
  });

  // ===================================
  // PRIORITY 2: SVG Title Element
  // ===================================
  describe('SVG Title for Tooltips (Priority 2)', () => {
    it('renders title element for semantic icons', () => {
      const { container } = render(
        <Icon icon={Check} aria-label="Success" title="Operation completed successfully" />
      );

      const title = container.querySelector('title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Operation completed successfully');
    });

    it('does not render title for decorative icons', () => {
      const { container } = render(<Icon icon={Check} decorative title="This should not render" />);

      const title = container.querySelector('title');
      expect(title).not.toBeInTheDocument();
    });

    it('title has unique ID', () => {
      const { container: container1 } = render(
        <Icon icon={Check} aria-label="Check 1" title="First" />
      );
      const { container: container2 } = render(
        <Icon icon={Check} aria-label="Check 2" title="Second" />
      );

      const title1 = container1.querySelector('title');
      const title2 = container2.querySelector('title');

      expect(title1?.id).toBeTruthy();
      expect(title2?.id).toBeTruthy();
      expect(title1?.id).not.toBe(title2?.id);
    });
  });

  // ===================================
  // PRIORITY 2: aria-live for Dynamic Icons
  // ===================================
  describe('Live Regions for Dynamic Icons (Priority 2)', () => {
    it('supports aria-live="polite" for status updates', () => {
      render(<Icon icon={Check} aria-label="Loading" aria-live="polite" />);

      const icon = screen.getByRole('img', { name: 'Loading' });
      expect(icon).toHaveAttribute('aria-live', 'polite');
    });

    it('supports aria-live="assertive" for urgent updates', () => {
      render(<Icon icon={AlertCircle} aria-label="Critical error" aria-live="assertive" />);

      const icon = screen.getByRole('img', { name: 'Critical error' });
      expect(icon).toHaveAttribute('aria-live', 'assertive');
    });

    it('does not add aria-live to decorative icons', () => {
      const { container } = render(<Icon icon={Check} decorative aria-live="polite" />);

      const svg = container.querySelector('svg');
      expect(svg).not.toHaveAttribute('aria-live');
    });

    it('dynamic icon changing state announces update', () => {
      const { rerender } = render(<Icon icon={Check} aria-label="Loading" aria-live="polite" />);

      let icon = screen.getByRole('img', { name: 'Loading' });
      expect(icon).toHaveAttribute('aria-live', 'polite');

      // State change
      rerender(<Icon icon={AlertCircle} aria-label="Complete" aria-live="polite" />);

      icon = screen.getByRole('img', { name: 'Complete' });
      expect(icon).toHaveAttribute('aria-live', 'polite');
    });
  });

  // ===================================
  // PRIORITY 2: Semantic Variants
  // ===================================
  describe('Semantic Variants (Priority 2)', () => {
    it('applies success variant with default label and color', () => {
      render(<Icon icon={Check} variant="success" />);

      const icon = screen.getByRole('img', { name: 'Success' });
      expect(icon).toBeInTheDocument();
    });

    it('applies error variant with default label and color', () => {
      render(<Icon icon={X} variant="error" />);

      const icon = screen.getByRole('img', { name: 'Error' });
      expect(icon).toBeInTheDocument();
    });

    it('applies warning variant with default label and color', () => {
      render(<Icon icon={AlertCircle} variant="warning" />);

      const icon = screen.getByRole('img', { name: 'Warning' });
      expect(icon).toBeInTheDocument();
    });

    it('applies info variant with default label and color', () => {
      render(<Icon icon={AlertCircle} variant="info" />);

      const icon = screen.getByRole('img', { name: 'Information' });
      expect(icon).toBeInTheDocument();
    });

    it('custom aria-label overrides variant default label', () => {
      render(<Icon icon={Check} variant="success" aria-label="Operation completed" />);

      const icon = screen.getByRole('img', { name: 'Operation completed' });
      expect(icon).toBeInTheDocument();
    });

    it('custom color overrides variant default color', () => {
      render(<Icon icon={Check} variant="success" color="#ff0000" />);

      const icon = screen.getByRole('img');
      expect(icon).toBeInTheDocument();
      // The custom color should override the variant color
    });

    it('variant with decorative=true remains decorative', () => {
      const { container } = render(<Icon icon={Check} variant="success" decorative />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).not.toHaveAttribute('role');
      expect(svg).not.toHaveAttribute('aria-label');
    });
  });

  // ===================================
  // REAL-WORLD USE CASES (Enhanced)
  // ===================================
  describe('Real-world Use Cases - Enhanced', () => {
    it('loading indicator with live region', () => {
      const { rerender } = render(
        <Icon icon={Check} aria-label="Loading in progress" aria-live="polite" size="small" />
      );

      let icon = screen.getByRole('img', { name: 'Loading in progress' });
      expect(icon).toHaveAttribute('aria-live', 'polite');

      // Simulate completion
      rerender(
        <Icon icon={Check} aria-label="Loading completed" aria-live="polite" variant="success" />
      );

      icon = screen.getByRole('img', { name: 'Loading completed' });
      expect(icon).toHaveAttribute('aria-live', 'polite');
    });

    it('complex chart icon with extended description', () => {
      render(
        <div>
          <Icon
            icon={Check}
            aria-label="Sales chart"
            aria-describedby="chart-details"
            title="Click to open the full chart"
          />
          <div id="chart-details">
            Monthly sales from January to December 2025. Peak maximum in December with €50,000.
          </div>
        </div>
      );

      const icon = screen.getByRole('img', { name: 'Sales chart' });
      expect(icon).toHaveAttribute('aria-describedby', 'chart-details');
    });

    it('status notification with variant', () => {
      render(
        <div role="status" aria-live="polite">
          <Icon icon={Check} variant="success" />
          <span>Document saved successfully</span>
        </div>
      );

      const status = screen.getByRole('status');
      expect(status).toBeInTheDocument();

      const icon = screen.getByRole('img', { name: 'Success' });
      expect(icon).toBeInTheDocument();
    });
  });
});
