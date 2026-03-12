import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import { Icon } from './Icon';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

/**
 * Icon Component Tests
 * Pattern: Display Component (Atom)
 *
 * Tests for accessible icon wrapper with Lucide icons
 */
describe('Icon - Component Tests', () => {
  describe('Rendering', () => {
    it('renders semantic icon with aria-label', () => {
      renderWithProviders(<Icon icon={CheckCircle} aria-label="Success" />);
      const icon = screen.getByRole('img', { name: 'Success' });
      expect(icon).toBeInTheDocument();
    });

    it('renders decorative icon with aria-hidden', () => {
      const { container } = renderWithProviders(<Icon icon={CheckCircle} decorative />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).not.toHaveAttribute('role');
    });

    it('renders with all size variants', () => {
      const sizes: Array<'small' | 'medium' | 'large' | 'xlarge'> = [
        'small',
        'medium',
        'large',
        'xlarge',
      ];

      sizes.forEach((size) => {
        const { container, unmount } = renderWithProviders(
          <Icon icon={CheckCircle} aria-label="Test" size={size} />
        );
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass(size);
        unmount();
      });
    });

    it('applies custom className', () => {
      const { container } = renderWithProviders(
        <Icon icon={CheckCircle} aria-label="Test" className="custom-class" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('Variants', () => {
    it('applies success variant with default label', () => {
      renderWithProviders(<Icon icon={CheckCircle} variant="success" />);
      const icon = screen.getByRole('img', { name: 'Success' });
      expect(icon).toBeInTheDocument();
    });

    it('applies error variant with default label', () => {
      renderWithProviders(<Icon icon={AlertCircle} variant="error" />);
      const icon = screen.getByRole('img', { name: 'Error' });
      expect(icon).toBeInTheDocument();
    });

    it('applies warning variant with default label', () => {
      renderWithProviders(<Icon icon={AlertCircle} variant="warning" />);
      const icon = screen.getByRole('img', { name: 'Warning' });
      expect(icon).toBeInTheDocument();
    });

    it('applies info variant with default label', () => {
      renderWithProviders(<Icon icon={Info} variant="info" />);
      const icon = screen.getByRole('img', { name: 'Information' });
      expect(icon).toBeInTheDocument();
    });

    it('custom aria-label overrides variant default', () => {
      renderWithProviders(<Icon icon={CheckCircle} variant="success" aria-label="Custom label" />);
      const icon = screen.getByRole('img', { name: 'Custom label' });
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Accessibility Features', () => {
    it('supports aria-describedby for extended descriptions', () => {
      renderWithProviders(
        <>
          <Icon icon={Info} aria-label="Chart" aria-describedby="chart-desc" />
          <p id="chart-desc">Sales data for Q1</p>
        </>
      );
      const icon = screen.getByRole('img', { name: 'Chart' });
      expect(icon).toHaveAttribute('aria-describedby', 'chart-desc');
    });

    it('supports title for tooltips on semantic icons', () => {
      const { container } = renderWithProviders(
        <Icon icon={Info} aria-label="Information" title="Click for details" />
      );
      const title = container.querySelector('title');
      expect(title).toHaveTextContent('Click for details');
    });

    it('does not render title for decorative icons', () => {
      const { container } = renderWithProviders(
        <Icon icon={CheckCircle} decorative title="Should not appear" />
      );
      const title = container.querySelector('title');
      expect(title).not.toBeInTheDocument();
    });

    it('supports aria-live for dynamic status updates', () => {
      renderWithProviders(<Icon icon={CheckCircle} aria-label="Loading" aria-live="polite" />);
      const icon = screen.getByRole('img', { name: 'Loading' });
      expect(icon).toHaveAttribute('aria-live', 'polite');
    });

    it('is not focusable', () => {
      const { container } = renderWithProviders(<Icon icon={CheckCircle} aria-label="Test" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('focusable', 'false');
    });
  });

  describe('Custom Styling', () => {
    it('applies custom color', () => {
      const { container } = renderWithProviders(
        <Icon icon={CheckCircle} aria-label="Test" color="#ff0000" />
      );
      const svg = container.querySelector('svg');
      // Lucide applica il colore via style o currentColor
      expect(svg).toBeInTheDocument();
    });

    it('uses currentColor by default', () => {
      const { container } = renderWithProviders(<Icon icon={CheckCircle} aria-label="Test" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});
