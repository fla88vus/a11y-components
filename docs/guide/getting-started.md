# Getting Started

Welcome to **a11y UI Kit React**! This guide will help you integrate accessible components into your React application.

## What is a11y UI Kit?

A comprehensive library of React components built from the ground up with accessibility (a11y) as the primary focus. Every component follows:

- **WCAG 2.1 Level AA** compliance standards
- **Atomic Design** principles for composability
- **TypeScript** best practices with full type safety
- **Comprehensive testing** with unit, accessibility, and E2E tests

## Philosophy

We believe accessibility should be **built-in, not bolted on**. Every component in this library:

1. Uses semantic HTML elements
2. Supports full keyboard navigation
3. Works with screen readers
4. Provides proper ARIA attributes
5. Maintains color contrast standards
6. Includes visible focus indicators

## Prerequisites

Before you begin, ensure you have:

- **React 18.0.0** or higher
- **Node.js 16+** (for development)
- Basic understanding of React hooks and TypeScript

## Installation

Install the package using your preferred package manager:

::: code-group

```bash [npm]
npm install @flavia-dev/a11y-ui-kit-react
```

```bash [yarn]
yarn add @flavia-dev/a11y-ui-kit-react
```

```bash [pnpm]
pnpm add @flavia-dev/a11y-ui-kit-react
```

:::

## Import Styles

Import the CSS file in your application's entry point:

::: code-group

```tsx [Vite/CRA]
// src/main.tsx or src/index.tsx
import '@flavia-dev/a11y-ui-kit-react/styles.css';
import './index.css'; // Your custom styles
```

```tsx [Next.js App Router]
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

```tsx [Remix]
// app/root.tsx
import type { LinksFunction } from '@remix-run/node';
import styles from '@flavia-dev/a11y-ui-kit-react/styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
];
```

:::

## Your First Component

Let's create a simple button:

```tsx
import { Button } from '@flavia-dev/a11y-ui-kit-react';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      onClick={() => alert('Hello, accessible world!')}
    >
      Click Me
    </Button>
  );
}
```

## Building a Form

Here's a complete accessible form example:

```tsx
import { useState } from 'react';
import { FormField, Input, Button } from '@flavia-dev/a11y-ui-kit-react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log({ name, email });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField 
        label="Your Name" 
        required
        helperText="Enter your full name"
      >
        {(props) => (
          <Input
            {...props}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </FormField>

      <FormField 
        label="Email Address" 
        required
      >
        {(props) => (
          <Input
            {...props}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      </FormField>

      <Button type="submit" variant="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
}
```

## Key Features

### Tree-Shaking

Import only what you need for optimal bundle sizes:

```tsx
// ✅ Good - imports only Button
import { Button } from '@flavia-dev/a11y-ui-kit-react';

// ✅ Also good - explicit imports
import { Button, Input, FormField } from '@flavia-dev/a11y-ui-kit-react';
```

### TypeScript Support

Full type definitions included:

```tsx
import type { ButtonProps, InputProps } from '@flavia-dev/a11y-ui-kit-react';

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'large',
  loading: false
};
```

### Customization

Style components using your preferred method:

```tsx
// CSS Modules
<Button className="myCustomButton">Custom</Button>

// Inline styles
<Button style={{ background: 'linear-gradient(...)' }}>Gradient</Button>

// Tailwind CSS
<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  Gradient
</Button>
```

## Next Steps

Now that you have the basics, explore more:

- **[Core Concepts](/guide/accessibility)** - Learn about accessibility features
- **[All Components](/components/button)** - Browse the component library
- **[Examples](/examples)** - See real-world usage patterns
- **[Styling Guide](/guide/styling)** - Customize component appearance

## Getting Help

If you need assistance:

- 📖 Check the [documentation](/guide/installation)
- 💬 [Open an issue](https://github.com/fla88vus/a11y-components/issues) on GitHub
- 📧 Contact support

## Contributing

We welcome contributions! See our [Contributing Guide](/contributing) to get started.
