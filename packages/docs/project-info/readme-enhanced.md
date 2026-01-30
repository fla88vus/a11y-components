# a11y-ui-kit-react

Production-ready accessible React components following **WCAG 2.1 AA standards**.

[![npm version](https://img.shields.io/npm/v/@flavia-dev/a11y-ui-kit-react.svg)](https://www.npmjs.com/package/@flavia-dev/a11y-ui-kit-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## Why This Library?

Building accessible web applications shouldn't be hard. This library provides **battle-tested, accessible components** that work out of the box while giving you complete flexibility to customize them.

**Key Benefits:**
- ✅ **WCAG 2.1 AA compliant** - Tested with automated and manual accessibility checks
- ✅ **TypeScript first** - Full type safety and IntelliSense support
- ✅ **Tree-shakeable** - Import only what you need, keep bundles small
- ✅ **Zero runtime CSS-in-JS** - CSS Modules for optimal performance
- ✅ **Framework agnostic** - Works with Next.js, Vite, CRA, Remix
- ✅ **Comprehensively tested** - Unit, accessibility, E2E, and visual regression tests

## Installation

```bash
npm install @flavia-dev/a11y-ui-kit-react
# or
yarn add @flavia-dev/a11y-ui-kit-react
# or
pnpm add @flavia-dev/a11y-ui-kit-react
```

## Quick Start

```tsx
import { Button, FormField, Input } from '@flavia-dev/a11y-ui-kit-react';
import '@flavia-dev/a11y-ui-kit-react/styles.css';

function LoginForm() {
  return (
    <form>
      <FormField 
        label="Email" 
        required 
        helperText="We'll never share your email"
      >
        {(props) => (
          <Input 
            {...props}
            type="email" 
            placeholder="you@example.com"
          />
        )}
      </FormField>
      
      <Button type="submit" variant="primary" fullWidth>
        Sign In
      </Button>
    </form>
  );
}
```

## 📚 Documentation

- **[Getting Started](./docs/guide/getting-started.md)** - Installation and basic usage
- **[Component Examples](./docs/EXAMPLES.md)** - Real-world usage patterns
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute
- **[Changelog](./CHANGELOG.md)** - Version history

## Components

### Atoms (Building Blocks)

#### Button

Accessible button with multiple variants, sizes, and states.

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button loading>Saving...</Button>
```

**Props:** `variant`, `size`, `loading`, `disabled`, `fullWidth`

---

#### Input

Text input field with validation states.

```tsx
<Input type="email" placeholder="Enter email" />
<Input error aria-invalid="true" />
<Input fullWidth size="large" />
```

**Props:** `size`, `error`, `fullWidth`

---

#### Checkbox

Checkbox with label and helper text.

```tsx
<Checkbox label="I agree to the terms" />
<Checkbox 
  label="Select all" 
  indeterminate={someSelected && !allSelected}
/>
```

**Props:** `label`, `size`, `error`, `helperText`, `indeterminate`

---

#### Radio

Radio button for mutually exclusive selections.

```tsx
<Radio name="payment" value="card" label="Credit Card" />
<Radio name="payment" value="paypal" label="PayPal" />
```

**Props:** `label`, `name`, `value`, `size`, `error`, `helperText`

---

#### Icon

Accessible icon component using Lucide React.

```tsx
import { Search, CheckCircle } from 'lucide-react';

<Icon icon={Search} decorative /> Search
<Icon icon={CheckCircle} aria-label="Success" variant="success" />
```

**Props:** `icon`, `size`, `variant`, `decorative`, `aria-label`

---

#### Label, ErrorText, HelperText

Building blocks for custom form compositions.

```tsx
<Label htmlFor="email" required>Email</Label>
<Input id="email" aria-describedby="email-helper email-error" />
<HelperText id="email-helper">Use your work email</HelperText>
<ErrorText id="email-error">Invalid email</ErrorText>
```

---

### Molecules (Component Combinations)

#### FormField

Complete form field with integrated label, input, error, and helper text.

```tsx
<FormField 
  label="Username" 
  required
  error="Username is taken"
  helperText="Choose a unique username"
>
  {(props) => <Input {...props} />}
</FormField>
```

**Props:** `label`, `children` (render prop), `error`, `helperText`, `required`, `hideLabel`

---

## Accessibility Features

### Keyboard Navigation

All components support full keyboard navigation:

- **Tab** / **Shift + Tab**: Navigate between elements
- **Enter** / **Space**: Activate buttons and toggle checkboxes/radios
- **Arrow keys**: Navigate radio groups

### Screen Reader Support

- Proper semantic HTML elements
- ARIA labels and descriptions
- Live regions for dynamic content
- Error announcements

### Visual Accessibility

- **Focus indicators**: 3px outline with 3:1 contrast ratio
- **Color contrast**: All text meets WCAG AA (4.5:1 minimum)
- **Touch targets**: Minimum 44×44 pixels
- **Reduced motion**: Respects `prefers-reduced-motion`

### Testing

Every component is tested for accessibility:
- Automated tests with jest-axe
- Manual keyboard testing
- Screen reader verification (NVDA, JAWS, VoiceOver)
- E2E tests with Playwright

---

## Framework Integration

### Next.js

```tsx
// app/layout.tsx
import '@flavia-dev/a11y-ui-kit-react/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Vite / Create React App

```tsx
// main.tsx or index.tsx
import '@flavia-dev/a11y-ui-kit-react/styles.css';
```

### Remix

```tsx
// app/root.tsx
import type { LinksFunction } from '@remix-run/node';
import styles from '@flavia-dev/a11y-ui-kit-react/styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
];
```

---

## Customization

### Using Default Styles

```tsx
import '@flavia-dev/a11y-ui-kit-react/styles.css';
```

### Custom Styling

Override styles using CSS classes or inline styles:

```tsx
// With className
<Button className="my-custom-button">Custom</Button>

// With inline styles
<Button style={{ background: 'linear-gradient(...)' }}>Gradient</Button>

// With Tailwind CSS
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Tailwind Button
</Button>
```

---

## Browser Support

- **Chrome/Edge**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Mobile**: iOS Safari, Chrome Android

---

## Examples

### Registration Form

```tsx
import { useState } from 'react';
import { FormField, Input, Button } from '@flavia-dev/a11y-ui-kit-react';

function RegistrationForm() {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    // Validation and submission logic
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Full Name" required error={errors.name}>
        {(props) => (
          <Input
            {...props}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        )}
      </FormField>

      <FormField label="Email" required error={errors.email}>
        {(props) => (
          <Input
            {...props}
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        )}
      </FormField>

      <FormField 
        label="Password" 
        required 
        error={errors.password}
        helperText="At least 8 characters"
      >
        {(props) => (
          <Input
            {...props}
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        )}
      </FormField>

      <Button type="submit" variant="primary" fullWidth>
        Create Account
      </Button>
    </form>
  );
}
```

More examples in [docs/EXAMPLES.md](./docs/EXAMPLES.md)

---

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Run Storybook
npm run storybook

# Build library
npm run build

# Type check
npm run typecheck

# Run documentation site
npm run docs:dev
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## License

MIT © 2026 Flavia - See [LICENSE](./LICENSE) for details.

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and release notes.

---

## Support

- 📖 [Documentation](./docs/guide/getting-started.md)
- 🐛 [Report a bug](https://github.com/fla88vus/a11y-components/issues)
- 💬 [GitHub Discussions](https://github.com/fla88vus/a11y-components/discussions)
- 📧 Email support

---

**Built with ♿ accessibility in mind**
