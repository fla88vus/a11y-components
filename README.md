# accessible-react-components

Production-ready accessible React components following **WCAG 2.1 AA standards**.

[![npm version](https://img.shields.io/npm/v/accessible-react-components.svg)](https://www.npmjs.com/package/accessible-react-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ **WCAG 2.1 AA compliant** - Fully accessible components
- ✅ **TypeScript** - Full type safety
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **CSS Modules** - Scoped styling
- ✅ **Framework agnostic** - Works with any React project
- ✅ **Tested** - Comprehensive test coverage

## Installation

```bash
npm install @flavia-dev/a11y-ui-kit-react
```

## Usage

```tsx
import { Button } from '@flavia-dev/a11y-ui-kit-react';
import '@flavia-dev/a11y-ui-kit-react/styles.css';

function App() {
  return (
    <Button 
      variant="primary" 
      onClick={() => console.log('Clicked!')}
    >
      Click me
    </Button>
  );
}
```

## Components

### Button

Accessible button component with multiple variants and states.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state with spinner |
| `fullWidth` | `boolean` | `false` | Full width button |

#### Examples

```tsx
// Primary button
<Button variant="primary">Primary</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Loading state
<Button loading>Loading...</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// Full width
<Button fullWidth>Full Width</Button>

// With icon (aria-label required for accessibility)
<Button aria-label="Close dialog">×</Button>
```

## Accessibility Features

- ✅ **Keyboard navigation** - Full keyboard support (Enter/Space)
- ✅ **Focus indicators** - Visible focus states
- ✅ **Screen reader support** - Proper ARIA attributes
- ✅ **Semantic HTML** - Native button elements
- ✅ **Color contrast** - WCAG AA compliant colors
- ✅ **Touch targets** - Minimum 44x44px target size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build library
npm run build

# Type check
npm run typecheck
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT © Flavia
