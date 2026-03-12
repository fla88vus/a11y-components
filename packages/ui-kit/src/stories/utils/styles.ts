/**
 * Reusable styles for Storybook stories
 * Eliminates repetitive inline styles and ensures consistency
 */

import type { CSSProperties } from 'react';

/**
 * Common layout styles for story render functions
 */
export const storyStyles = {
  /**
   * Vertical container with consistent spacing
   * Use for stacked components or form layouts
   */
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
  } as CSSProperties,

  /**
   * Wide vertical container for larger demos
   */
  containerWide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '600px',
  } as CSSProperties,

  /**
   * Full width container without max-width constraint
   */
  containerFull: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  } as CSSProperties,

  /**
   * Horizontal row with items aligned
   * Use for displaying variants side-by-side
   */
  flexRow: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  } as CSSProperties,

  /**
   * Horizontal row with wrapping
   * Use for many items that may not fit on one line
   */
  flexRowWrap: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  } as CSSProperties,

  /**
   * Creates a grid layout with specified columns
   *
   * @example
   * ```tsx
   * <div style={storyStyles.grid(3)}>
   *   {items.map(item => <Component {...item} />)}
   * </div>
   * ```
   */
  grid: (columns: number = 3, gap: string = '1rem') =>
    ({
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }) as CSSProperties,

  /**
   * Responsive grid that adjusts column count based on item width
   *
   * @param minItemWidth - Minimum width for each grid item (default: 200px)
   */
  gridResponsive: (minItemWidth: string = '200px', gap: string = '1rem') =>
    ({
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
      gap,
    }) as CSSProperties,

  /**
   * Card-like container with border and padding
   * Use for highlighting specific examples
   */
  card: {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    backgroundColor: '#ffffff',
  } as CSSProperties,

  /**
   * Section with title
   * Use for grouping related examples
   */
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  } as CSSProperties,

  /**
   * Section title styles
   */
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#111827',
  } as CSSProperties,

  /**
   * Subsection title (smaller)
   */
  subsectionTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: '#374151',
  } as CSSProperties,

  /**
   * Description text for examples
   */
  description: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.75rem',
  } as CSSProperties,

  /**
   * Code-like text for technical notes
   */
  code: {
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    padding: '0.125rem 0.25rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '0.25rem',
    color: '#1f2937',
  } as CSSProperties,

  /**
   * Success message styles
   */
  success: {
    padding: '0.75rem',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
  } as CSSProperties,

  /**
   * Error message styles
   */
  error: {
    padding: '0.75rem',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
  } as CSSProperties,

  /**
   * Warning message styles
   */
  warning: {
    padding: '0.75rem',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
  } as CSSProperties,

  /**
   * Info message styles
   */
  info: {
    padding: '0.75rem',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
  } as CSSProperties,

  /**
   * Visual separator between sections
   */
  separator: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '2rem 0',
  } as CSSProperties,

  /**
   * Centered content wrapper
   */
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  } as CSSProperties,

  /**
   * Status badge styles
   */
  badge: (variant: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const colors = {
      success: { bg: '#d1fae5', text: '#065f46' },
      error: { bg: '#fee2e2', text: '#991b1b' },
      warning: { bg: '#fef3c7', text: '#92400e' },
      info: { bg: '#dbeafe', text: '#1e40af' },
    };

    return {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: colors[variant].bg,
      color: colors[variant].text,
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 500,
    } as CSSProperties;
  },

  /**
   * Styles for interactive examples with state
   */
  interactive: {
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
  } as CSSProperties,

  /**
   * State display (for showing component state in interactive examples)
   */
  stateDisplay: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    color: '#374151',
  } as CSSProperties,
} as const;

/**
 * Utility function to combine multiple style objects
 *
 * @example
 * ```tsx
 * <div style={combineStyles(storyStyles.container, { marginTop: '2rem' })}>
 *   Content
 * </div>
 * ```
 */
export function combineStyles(...styles: Array<CSSProperties | undefined>): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}

/**
 * Creates a custom spacing object
 *
 * @example
 * ```tsx
 * <div style={spacing({ top: 2, bottom: 1 })}>
 *   Content
 * </div>
 * ```
 */
export function spacing(config: {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  all?: number;
}): CSSProperties {
  const { top, right, bottom, left, all } = config;
  const unit = 'rem';

  return {
    ...(all !== undefined && {
      padding: `${all}${unit}`,
    }),
    ...(top !== undefined && { paddingTop: `${top}${unit}` }),
    ...(right !== undefined && { paddingRight: `${right}${unit}` }),
    ...(bottom !== undefined && { paddingBottom: `${bottom}${unit}` }),
    ...(left !== undefined && { paddingLeft: `${left}${unit}` }),
  };
}
