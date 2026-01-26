# Quick Start

## Basic Usage

Import and use components:

```tsx
import { Button, Input, FormField } from '@flavia-dev/a11y-ui-kit-react';
import '@flavia-dev/a11y-ui-kit-react/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      
      <FormField
        label="Email"
        helperText="We'll never share your email"
        required
      >
        {(fieldProps) => (
          <Input
            {...fieldProps}
            type="email"
            placeholder="you@example.com"
          />
        )}
      </FormField>
    </div>
  );
}
```

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { ButtonProps, InputProps } from '@flavia-dev/a11y-ui-kit-react';
```

## Next Steps

- Browse [Components](/components/button) for full API documentation
- Learn about [Accessibility](/guide/accessibility) features
- Check out [Examples](/examples/full-examples)
