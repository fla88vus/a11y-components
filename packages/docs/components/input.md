# Input

Text input field component with validation states and flexible sizing.

## Import

```tsx
import { Input } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

```tsx
<Input type="text" placeholder="Enter your name" />
```

## Sizes

Three size options to fit different UI contexts:

```tsx
<Input size="small" placeholder="Small input" />
<Input size="medium" placeholder="Medium input" />
<Input size="large" placeholder="Large input" />
```

## Input Types

Supports all native HTML input types:

```tsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Age" />
<Input type="tel" placeholder="Phone number" />
<Input type="url" placeholder="https://example.com" />
<Input type="search" placeholder="Search..." />
<Input type="date" />
```

## States

### Error State

Adds visual error styling (red border):

```tsx
<Input error aria-invalid="true" />
<Input type="email" error aria-invalid="true" placeholder="Invalid email" />
```

::: tip
Always pair `error` prop with `aria-invalid="true"` for proper accessibility.
:::

### Disabled State

```tsx
<Input disabled placeholder="Cannot edit" />
<Input type="email" disabled value="locked@example.com" />
```

### Full Width

Input takes the full width of its container:

```tsx
<Input fullWidth placeholder="Full width input" />
```

## Examples

### Controlled Input

```tsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  );
}
```

### Email Input with Validation

```tsx
function EmailInput() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  function validateEmail(value: string) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsValid(isValidEmail);
  }

  return (
    <Input
      type="email"
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
      }}
      error={!isValid && email.length > 0}
      aria-invalid={!isValid && email.length > 0}
      placeholder="your.email@example.com"
    />
  );
}
```

### Password Input with Toggle

```tsx
function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        fullWidth
      />
      <button
        onClick={() => setShowPassword(!showPassword)}
        style={{ position: 'absolute', right: '8px', top: '8px' }}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
    </div>
  );
}
```

### Search Input

```tsx
<Input
  type="search"
  placeholder="Search..."
  aria-label="Search"
/>
```

### With FormField (Recommended)

For complete form fields with labels, errors, and helper text, use [FormField](/components/form-field):

```tsx
<FormField
  label="Email Address"
  required
  error={emailError}
  helperText="We'll never share your email"
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
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size |
| `error` | `boolean` | `false` | Show error styling (red border) |
| `fullWidth` | `boolean` | `false` | Input takes full container width |
| `type` | `string` | `'text'` | HTML input type |
| `disabled` | `boolean` | `false` | Disable input |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Controlled value |
| `onChange` | `(e: ChangeEvent) => void` | - | Change handler |

Plus all standard HTML input attributes (`className`, `style`, `aria-*`, `onBlur`, etc.).

## Accessibility Features

### Semantic HTML

Uses native `<input>` element for maximum compatibility.

### Keyboard Support

- **Tab**: Navigate to input
- **Shift + Tab**: Navigate backwards
- Standard input keyboard behaviors (typing, selection, etc.)

### Screen Reader Support

- Announces input type (email, password, etc.)
- Error state announced with `aria-invalid`
- Works with `aria-label` or associated `<label>`
- Supports `aria-describedby` for error/helper text

### Visual Accessibility

- **Focus indicator**: Visible outline on focus
- **Error state**: Red border for validation errors
- **Color contrast**: Meets WCAG AA standards
- **Placeholder**: Sufficient contrast for readability

### Best Practices

✅ **Do:**
- Use appropriate input types (email, tel, url, etc.)
- Provide labels (via FormField or Label component)
- Add `aria-invalid` when showing error state
- Use `aria-describedby` to link error/helper text
- Set `autoComplete` for better UX

❌ **Don't:**
- Use placeholder as the only label
- Forget to handle error states accessibly
- Use generic `type="text"` for specialized inputs
- Create inputs without associated labels

## Styling

### Custom className

```tsx
<Input className="my-input" placeholder="Custom styled" />
```

```css
.my-input {
  border-radius: 12px;
  border: 2px solid #667eea;
  padding: 12px 16px;
}

.my-input:focus {
  border-color: #764ba2;
  box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.1);
}
```

### Inline Styles

```tsx
<Input
  placeholder="Inline styled"
  style={{
    borderRadius: '8px',
    fontSize: '16px',
    padding: '12px'
  }}
/>
```

### Tailwind CSS

```tsx
<Input
  className="border-2 border-purple-300 focus:border-purple-600 rounded-lg px-4 py-2"
  placeholder="Tailwind styled"
/>
```

## Form Composition

The Input component is an **atom** - a pure, styled input element. For complete form fields, compose it with other atoms:

### Manual Composition

```tsx
import { Label, Input, ErrorText, HelperText } from '@flavia-dev/a11y-ui-kit-react';

<div>
  <Label htmlFor="email" required>Email</Label>
  <Input
    id="email"
    type="email"
    error={hasError}
    aria-invalid={hasError}
    aria-describedby="email-helper email-error"
  />
  <HelperText id="email-helper">
    Use your work email
  </HelperText>
  {hasError && (
    <ErrorText id="email-error">
      Invalid email address
    </ErrorText>
  )}
</div>
```

### Using FormField (Recommended)

```tsx
<FormField
  label="Email"
  required
  error={errorMessage}
  helperText="Use your work email"
>
  {(props) => <Input {...props} type="email" />}
</FormField>
```

## Testing

### Unit Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@flavia-dev/a11y-ui-kit-react';

test('calls onChange when typing', () => {
  const handleChange = jest.fn();
  render(<Input onChange={handleChange} />);
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Hello' } });
  
  expect(handleChange).toHaveBeenCalled();
});

test('applies error class when error prop is true', () => {
  const { container } = render(<Input error />);
  const input = container.querySelector('input');
  
  expect(input).toHaveClass('error');
});
```

## Related Components

- [FormField](/components/form-field) - Complete form field composition
- [Label](/components/label) - Accessible labels
- [ErrorText](/components/error-text) - Error messages
- [HelperText](/components/helper-text) - Helper text

## Changelog

See [CHANGELOG.md](/changelog) for version history.
