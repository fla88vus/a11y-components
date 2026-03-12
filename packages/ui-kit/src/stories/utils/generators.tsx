/**
 * Story generators for Storybook
 * Utilities to automatically generate common story patterns (sizes, states, showcases)
 */

import type { StoryObj } from '@storybook/react';
import type { ComponentType, ReactElement } from 'react';

/**
 * Creates size variant stories (Small, Medium, Large)
 *
 * @example
 * ```tsx
 * const { Small, Medium, Large } = createSizeStories<ButtonProps>({
 *   children: 'Button',
 * });
 * export { Small, Medium, Large };
 * ```
 *
 * @param baseArgs - Base props to apply to all size variants
 * @param sizes - Array of sizes to generate stories for
 * @returns Object with capitalized size names as keys and Story objects as values
 */
export function createSizeStories<TArgs>(
  baseArgs: Partial<TArgs>,
  sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large']
): Record<string, StoryObj<{ args: TArgs }>> {
  return sizes.reduce(
    (acc, size) => {
      const capitalizedSize = size.charAt(0).toUpperCase() + size.slice(1);
      acc[capitalizedSize] = {
        args: {
          ...baseArgs,
          size,
        } as Partial<TArgs>,
      };
      return acc;
    },
    {} as Record<string, StoryObj<{ args: TArgs }>>
  );
}

/**
 * Creates state variant stories (Disabled, Loading, Error, etc.)
 *
 * @example
 * ```tsx
 * const { Disabled, Loading, FullWidth } = createStateStories<ButtonProps>(
 *   { children: 'Button' },
 *   [
 *     { name: 'Disabled', props: { disabled: true } },
 *     { name: 'Loading', props: { loading: true } },
 *     { name: 'FullWidth', props: { fullWidth: true } },
 *   ]
 * );
 * export { Disabled, Loading, FullWidth };
 * ```
 *
 * @param baseArgs - Base props to apply to all state variants
 * @param states - Array of state configurations with name and props
 * @returns Object with state names as keys and Story objects as values
 */
export function createStateStories<TArgs>(
  baseArgs: Partial<TArgs>,
  states: Array<{ name: string; props: Partial<TArgs> }>
): Record<string, StoryObj<{ args: TArgs }>> {
  return states.reduce(
    (acc, { name, props }) => {
      acc[name] = {
        args: {
          ...baseArgs,
          ...props,
        } as Partial<TArgs>,
      };
      return acc;
    },
    {} as Record<string, StoryObj<{ args: TArgs }>>
  );
}

/**
 * Creates a showcase story that displays multiple component variants in groups
 *
 * @example
 * ```tsx
 * export const AllVariants = createShowcaseStory(Button, [
 *   {
 *     title: 'Variants',
 *     items: [
 *       { variant: 'primary', children: 'Primary' },
 *       { variant: 'secondary', children: 'Secondary' },
 *       { variant: 'danger', children: 'Danger' },
 *     ],
 *   },
 *   {
 *     title: 'Sizes',
 *     items: [
 *       { size: 'small', children: 'Small' },
 *       { size: 'medium', children: 'Medium' },
 *       { size: 'large', children: 'Large' },
 *     ],
 *   },
 * ]);
 * ```
 *
 * @param Component - The component to showcase
 * @param groups - Array of groups, each with a title and array of component props
 * @returns Story object with render function
 */
export function createShowcaseStory<T extends Record<string, any>>(
  Component: ComponentType<T>,
  groups: Array<{ title: string; items: Array<Partial<T>> }>
): StoryObj {
  return {
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {groups.map(({ title, items }) => (
          <div key={title}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {items.map((props, i) => (
                <Component key={i} {...(props as T)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  };
}

/**
 * Creates a composition story that demonstrates how a component works with other components
 *
 * @example
 * ```tsx
 * export const WithLabel = createCompositionStory<InputProps>((args) => (
 *   <div>
 *     <Label htmlFor="input-id">Username</Label>
 *     <Input id="input-id" {...args} />
 *     <HelperText>Enter your username</HelperText>
 *   </div>
 * ));
 * ```
 *
 * @param renderFn - Function that receives args and returns a React element
 * @returns Story object with render function
 */
export function createCompositionStory<T extends Record<string, any>>(
  renderFn: (args: T) => ReactElement
): StoryObj {
  return {
    render: (args) => renderFn(args as T),
  };
}

/**
 * Creates multiple variant stories from a single configuration object
 *
 * @example
 * ```tsx
 * const variantStories = createVariantStories<ButtonProps>(
 *   { children: 'Button' },
 *   {
 *     Primary: { variant: 'primary' },
 *     Secondary: { variant: 'secondary' },
 *     Danger: { variant: 'danger' },
 *   }
 * );
 * export const { Primary, Secondary, Danger } = variantStories;
 * ```
 *
 * @param baseArgs - Base props to apply to all variants
 * @param variants - Object with variant names as keys and props as values
 * @returns Object with variant names as keys and Story objects as values
 */
export function createVariantStories<T extends Record<string, any>>(
  baseArgs: Partial<T>,
  variants: Record<string, Partial<T>>
): Record<string, StoryObj<{ args: T }>> {
  return Object.entries(variants).reduce(
    (acc, [name, props]) => {
      acc[name] = {
        args: {
          ...baseArgs,
          ...props,
        } as T,
      };
      return acc;
    },
    {} as Record<string, StoryObj<{ args: T }>>
  );
}

/**
 * Creates a grid showcase story for components with many variations (e.g., icons, colors)
 *
 * @example
 * ```tsx
 * export const IconGrid = createGridShowcaseStory(Icon, {
 *   columns: 6,
 *   gap: '1rem',
 *   items: [
 *     { name: 'Check', label: 'Check' },
 *     { name: 'X', label: 'Close' },
 *     { name: 'AlertCircle', label: 'Alert' },
 *   ],
 * });
 * ```
 *
 * @param Component - The component to showcase
 * @param config - Configuration with columns, gap, and items
 * @returns Story object with render function
 */
export function createGridShowcaseStory<T extends Record<string, any>>(
  Component: ComponentType<T>,
  config: {
    columns: number;
    gap?: string;
    items: Array<Partial<T> & { label?: string }>;
  }
): StoryObj {
  const { columns, gap = '1rem', items } = config;

  return {
    render: () => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}
      >
        {items.map((item, i) => {
          const { label, ...props } = item;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Component {...(props as T)} />
              {label && <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{label}</span>}
            </div>
          );
        })}
      </div>
    ),
  };
}
