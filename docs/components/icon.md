# Icon

Accessible icon component using Lucide React icons with semantic variants and proper ARIA support.

## Import

```tsx
import { Icon } from '@flavia-dev/a11y-ui-kit-react';
// Also import the specific icon from lucide-react
import { Search, CheckCircle, AlertCircle, Info } from 'lucide-react';
```

## Basic Usage

```tsx
import { Search } from 'lucide-react';

<Icon icon={Search} aria-label="Search" />
```

## Sizes

Four size options:

```tsx
import { Heart } from 'lucide-react';

<Icon icon={Heart} size="small" aria-label="Like" />
<Icon icon={Heart} size="medium" aria-label="Like" />
<Icon icon={Heart} size="large" aria-label="Like" />
<Icon icon={Heart} size="xlarge" aria-label="Like" />
```

## Semantic Variants

Pre-configured color and label defaults for common use cases:

```tsx
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

<Icon icon={CheckCircle} variant="success" />     {/* Green */}
<Icon icon={AlertCircle} variant="error" />       {/* Red */}
<Icon icon={AlertTriangle} variant="warning" />   {/* Orange */}
<Icon icon={Info} variant="info" />               {/* Blue */}
```

## Decorative Icons

Icons that are purely decorative (next to text) should be marked as decorative:

```tsx
import { Search } from 'lucide-react';

<button>
  <Icon icon={Search} decorative />
  {' '}Search
</button>
```

This automatically adds `aria-hidden="true"` to hide the icon from screen readers.

## Semantic Icons

Icons that convey meaning must have an `aria-label`:

```tsx
import { X } from 'lucide-react';

<button aria-label="Close dialog">
  <Icon icon={X} aria-label="Close" />
</button>
```

## Custom Colors

```tsx
import { Heart } from 'lucide-react';

<Icon icon={Heart} color="#e11d48" aria-label="Favorite" />
<Icon icon={Heart} color="rgb(59, 130, 246)" aria-label="Favorite" />
```

## Examples

### Icon Button

```tsx
import { X } from 'lucide-react';

<button 
  onClick={handleClose}
  aria-label="Close dialog"
  style={{
    background: 'none',
    border: 'none',
    padding: '8px',
    cursor: 'pointer'
  }}
>
  <Icon icon={X} size="large" decorative />
</button>
```

::: tip
When an icon is in a button with `aria-label`, the icon itself should be decorative.
:::

### Status Indicators

```tsx
import { CheckCircle, XCircle, Clock } from 'lucide-react';

function StatusBadge({ status }: { status: 'success' | 'error' | 'pending' }) {
  const config = {
    success: { icon: CheckCircle, variant: 'success' as const, label: 'Success' },
    error: { icon: XCircle, variant: 'error' as const, label: 'Error' },
    pending: { icon: Clock, variant: 'warning' as const, label: 'Pending' },
  };

  const { icon, variant, label } = config[status];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon icon={icon} variant={variant} aria-label={label} />
      <span>{label}</span>
    </div>
  );
}
```

### Loading Spinner

```tsx
import { Loader2 } from 'lucide-react';

function LoadingSpinner() {
  return (
    <Icon
      icon={Loader2}
      aria-label="Loading"
      aria-live="polite"
      style={{ animation: 'spin 1s linear infinite' }}
    />
  );
}

// Add this CSS:
// @keyframes spin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }
```

### Icon with Tooltip

```tsx
import { Info } from 'lucide-react';

<Icon
  icon={Info}
  variant="info"
  aria-label="Additional information"
  title="Click for more details"
/>
```

### Icon List

```tsx
import { Check } from 'lucide-react';

function FeatureList() {
  const features = [
    'WCAG 2.1 AA compliant',
    'Full keyboard support',
    'Screen reader tested',
  ];

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {features.map((feature) => (
        <li key={feature} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <Icon icon={Check} variant="success" decorative />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
```

### Dynamic Status Icon

```tsx
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function AsyncStatus({ status }: { status: 'idle' | 'loading' | 'success' | 'error' }) {
  if (status === 'loading') {
    return <Icon icon={Loader2} aria-label="Loading" aria-live="polite" />;
  }

  if (status === 'success') {
    return (
      <Icon 
        icon={CheckCircle} 
        variant="success" 
        aria-label="Success" 
        aria-live="polite" 
      />
    );
  }

  if (status === 'error') {
    return (
      <Icon 
        icon={XCircle} 
        variant="error" 
        aria-label="Error" 
        aria-live="assertive" 
      />
    );
  }

  return null;
}
```

### Icon Navigation

```tsx
import { Home, User, Settings, LogOut } from 'lucide-react';

function Navigation() {
  return (
    <nav>
      <a href="/home">
        <Icon icon={Home} decorative />
        {' '}Home
      </a>
      <a href="/profile">
        <Icon icon={User} decorative />
        {' '}Profile
      </a>
      <a href="/settings">
        <Icon icon={Settings} decorative />
        {' '}Settings
      </a>
      <button onClick={handleLogout}>
        <Icon icon={LogOut} decorative />
        {' '}Logout
      </button>
    </nav>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `LucideIcon` | - | **Required.** Lucide icon component to render |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Icon size |
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | - | Semantic variant with pre-set colors |
| `color` | `string` | - | Custom color (CSS color value) |
| `decorative` | `boolean` | `false` | Icon is purely decorative (adds aria-hidden) |
| `aria-label` | `string` | - | Accessibility label (required for semantic icons) |
| `aria-describedby` | `string` | - | ID of element with extended description |
| `aria-live` | `'off' \| 'polite' \| 'assertive'` | - | Live region for dynamic icons |
| `title` | `string` | - | Native SVG title (tooltip) |

Plus all standard SVG attributes (`className`, `style`, `onClick`, etc.).

## Accessibility Features

### Semantic vs Decorative

**Decorative icons** (visual only):
- Next to text that already conveys the meaning
- Set `decorative={true}` or omit `aria-label`
- Automatically hidden from screen readers

**Semantic icons** (convey meaning):
- Standalone icons that communicate information
- Must have `aria-label`
- Announced to screen readers

### Screen Reader Support

- Decorative icons: `aria-hidden="true"`
- Semantic icons: Announced with `aria-label`
- Extended descriptions via `aria-describedby`
- Native tooltips via `<title>` element
- Dynamic updates via `aria-live`

### Keyboard Support

Icons themselves are not interactive. Use inside interactive elements:

```tsx
// ✅ Good - Button is interactive
<button aria-label="Delete">
  <Icon icon={Trash} decorative />
</button>

// ❌ Bad - Icon alone is not interactive
<Icon icon={Trash} onClick={handleDelete} />
```

### Best Practices

✅ **Do:**
- Use `decorative` for icons next to text
- Provide `aria-label` for standalone icons
- Use semantic variants for consistency
- Test with screen readers
- Use `aria-live` for dynamic status icons

❌ **Don't:**
- Make icons interactive without a wrapping button
- Forget `aria-label` on semantic icons
- Rely only on color to convey meaning
- Use icons without clear purpose
- Make icons too small (< 16px)

## Styling

### Custom Size

```tsx
<Icon
  icon={Search}
  aria-label="Search"
  style={{ width: '32px', height: '32px' }}
/>
```

### Custom Color

```tsx
<Icon
  icon={Heart}
  aria-label="Favorite"
  color="#ec4899"
/>
```

### With Animation

```tsx
<Icon
  icon={Loader2}
  aria-label="Loading"
  className="animate-spin"
/>
```

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

### Tailwind CSS

```tsx
<Icon
  icon={CheckCircle}
  variant="success"
  className="w-8 h-8"
/>
```

## Available Icons

Icon component works with all [Lucide React icons](https://lucide.dev/icons/). Some commonly used ones:

**Navigation:**
- `Home`, `Menu`, `Search`, `Settings`, `User`

**Actions:**
- `Edit`, `Trash`, `Download`, `Upload`, `Copy`, `Share`

**Status:**
- `Check`, `CheckCircle`, `X`, `XCircle`, `AlertCircle`, `AlertTriangle`, `Info`

**Media:**
- `Play`, `Pause`, `Volume`, `Image`, `File`

**Communication:**
- `Mail`, `Phone`, `MessageCircle`, `Send`

**Arrows:**
- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `ChevronDown`

Browse all icons at [lucide.dev](https://lucide.dev/)

## Testing

### Unit Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { Icon } from '@flavia-dev/a11y-ui-kit-react';
import { Search } from 'lucide-react';

test('renders icon with aria-label', () => {
  render(<Icon icon={Search} aria-label="Search" />);
  
  const icon = screen.getByLabelText('Search');
  expect(icon).toBeInTheDocument();
});

test('hides decorative icon from screen readers', () => {
  const { container } = render(<Icon icon={Search} decorative />);
  
  const svg = container.querySelector('svg');
  expect(svg).toHaveAttribute('aria-hidden', 'true');
});

test('applies variant color', () => {
  const { container } = render(<Icon icon={Search} variant="success" />);
  
  const svg = container.querySelector('svg');
  expect(svg).toHaveStyle({ color: '#22c55e' });
});
```

## Related Components

- [Button](/components/button) - Use icons in buttons
- [Label](/components/label) - Icons in labels

## Changelog

See [CHANGELOG.md](/changelog) for version history.
