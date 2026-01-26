# TypeScript

Full TypeScript support with exported types for all components.

## Component Props

```tsx
import type { ButtonProps, InputProps, FormFieldProps } from '@flavia-dev/a11y-ui-kit-react';

const myButtonProps: ButtonProps = {
  variant: 'primary',
  disabled: false,
  onClick: () => console.log('clicked')
};
```

## Generic Types

FormField supports generic typing for field values:

```tsx
import { FormField, Input } from '@flavia-dev/a11y-ui-kit-react';

<FormField<string>
  label="Name"
  required
>
  {(fieldProps) => <Input {...fieldProps} />}
</FormField>
```

## Type Safety

All props are strictly typed:
- Required vs optional props
- Union types for variants
- Proper event handler signatures

## tsconfig.json

Recommended settings:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```
