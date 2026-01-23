import React, { useId } from 'react';
import { type LucideIcon } from 'lucide-react';
import styles from './Icon.module.css';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'ref'> {
  /**
   * Lucide icon component to render
   * @example
   * import { Search } from 'lucide-react';
   * <Icon icon={Search} />
   */
  icon: LucideIcon;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  'aria-label'?: string;
  /**
   * Extended description for complex icons
   * Links to external description via aria-describedby
   * @example
   * <Icon icon={Chart} aria-label="Sales chart" aria-describedby="chart-description" />
   */
  'aria-describedby'?: string;
  /**
   * Tooltip text shown on hover (native SVG <title>)
   * Improves accessibility for screen readers and provides visual tooltip
   * @example
   * <Icon icon={Info} aria-label="Information" title="Click for more details" />
   */
  title?: string;
  /**
   * Live region politeness for dynamic status icons
   * Use 'polite' for non-critical updates, 'assertive' for important changes
   * @example
   * <Icon icon={Loader} aria-label="Loading" aria-live="polite" />
   */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  color?: string;
  decorative?: boolean;
  /**
   * Semantic variant that applies appropriate color and default label
   * Automatically sets sensible defaults for common use cases
   * @example
   * <Icon icon={CheckCircle} variant="success" />
   * <Icon icon={AlertCircle} variant="error" />
   */
  variant?: 'success' | 'error' | 'warning' | 'info';
}

/**
 * Predefined configurations for semantic variants
 */
const VARIANT_CONFIG = {
  success: { color: '#22c55e', defaultLabel: 'Success' },
  error: { color: '#ef4444', defaultLabel: 'Error' },
  warning: { color: '#f59e0b', defaultLabel: 'Warning' },
  info: { color: '#3b82f6', defaultLabel: 'Information' },
} as const;

/**
 * Icon - Accessible wrapper component for Lucide icons
 *
 * WCAG 2.1 AA/AAA compliant component that wraps Lucide icons with:
 * - aria-label support for semantic icons
 * - aria-describedby for extended descriptions
 * - Native SVG <title> for tooltips
 * - aria-live for dynamic status updates
 * - Semantic variants (success/error/warning/info)
 * - Automatic aria-hidden for decorative icons
 * - Standardized sizes
 * - Customizable colors
 *
 * ## When to use
 * - Semantic icons (convey meaning): provide aria-label
 * - Decorative icons (visual only): omit aria-label or decorative={true}
 * - Icons in buttons: button will have aria-label, icon is decorative
 * - Status indicators: use variant prop for automatic styling
 * - Dynamic icons: use aria-live for state changes
 *
 * ## WCAG Compliance
 * - **1.1.1 Non-text Content (Level A)**: aria-label for semantic icons
 * - **1.3.1 Info and Relationships (Level A)**: aria-describedby for complex info
 * - **1.4.1 Use of Color (Level A)**: Don't rely on color alone
 * - **1.4.11 Non-text Contrast (Level AA)**: 3:1 contrast for UI
 * - **4.1.3 Status Messages (Level AA)**: aria-live for dynamic updates
 *
 * @example
 * // Semantic icon (standalone)
 * <Icon icon={AlertCircle} aria-label="Warning" color="red" />
 *
 * @example
 * // With extended description
 * <Icon
 *   icon={BarChart}
 *   aria-label="Sales chart"
 *   aria-describedby="chart-desc"
 * />
 * <p id="chart-desc">Monthly sales from January to December</p>
 *
 * @example
 * // With tooltip
 * <Icon icon={Info} aria-label="Information" title="Click for details" />
 *
 * @example
 * // Dynamic status with live region
 * <Icon
 *   icon={isLoading ? Loader : Check}
 *   aria-label={isLoading ? "Loading" : "Complete"}
 *   aria-live="polite"
 * />
 *
 * @example
 * // Semantic variant
 * <Icon icon={CheckCircle} variant="success" />
 * <Icon icon={XCircle} variant="error" />
 *
 * @example
 * // Decorative icon (in button)
 * <button aria-label="Search">
 *   <Icon icon={Search} decorative />
 * </button>
 *
 * @example
 * // Different sizes
 * <Icon icon={Check} size="small" />
 * <Icon icon={Check} size="large" />
 */
export const Icon: React.FC<IconProps> = ({
  icon: LucideIconComponent,
  size = 'medium',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-live': ariaLive,
  title,
  color,
  decorative,
  variant,
  className,
  ...props
}) => {
  // Generate unique ID for title element
  const titleId = useId();

  // Apply variant configuration
  const variantConfig = variant ? VARIANT_CONFIG[variant] : undefined;
  const finalColor = color || variantConfig?.color || 'currentColor';
  const finalAriaLabel =
    ariaLabel || (variant && !decorative ? variantConfig?.defaultLabel : undefined);

  // Determine if icon is decorative
  const isDecorative = decorative ?? !finalAriaLabel;

  // Build class names
  const iconClasses = [
    styles.icon,
    styles[size],
    variant && styles[`variant-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Build ARIA attributes
  const ariaProps = {
    role: !isDecorative ? 'img' : undefined,
    'aria-label': !isDecorative ? finalAriaLabel : undefined,
    'aria-describedby': !isDecorative && ariaDescribedBy ? ariaDescribedBy : undefined,
    'aria-hidden': isDecorative ? ('true' as const) : undefined,
    'aria-live': !isDecorative && ariaLive ? ariaLive : undefined,
  };

  return (
    <LucideIconComponent
      className={iconClasses}
      color={finalColor}
      {...ariaProps}
      focusable="false" // Icons must not receive focus
      {...props}
    >
      {/* Native SVG title for tooltips - only for semantic icons */}
      {!isDecorative && title && <title id={titleId}>{title}</title>}
    </LucideIconComponent>
  );
};

Icon.displayName = 'Icon';
