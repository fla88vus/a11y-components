# ErrorText

Accessible error message component with automatic screen reader announcements.

## Import

```tsx
import { ErrorText } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

```tsx
<ErrorText id="email-error">
  Please enter a valid email address
</ErrorText>
```

## With Input

Link error text to input using `aria-describedby`:

```tsx
<input
  id="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
/>
<ErrorText id="email-error">
  Invalid email format
</ErrorText>
```

## Examples

### Form Field Error

```tsx
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function validateEmail() {
    if (!email) {
      setError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  }

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validateEmail}
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <ErrorText id="email-error">{error}</ErrorText>
      )}
    </div>
  );
}
```

### Multiple Errors

```tsx
<div>
  <input
    id="password"
    type="password"
    aria-invalid="true"
    aria-describedby="pwd-error-1 pwd-error-2"
  />
  <ErrorText id="pwd-error-1">
    Password must be at least 8 characters
  </ErrorText>
  <ErrorText id="pwd-error-2">
    Password must include a number
  </ErrorText>
</div>
```

### With FormField

FormField automatically handles error display:

```tsx
<FormField
  label="Username"
  error="Username is already taken"
>
  {(props) => <Input {...props} error />}
</FormField>
```

### Form-Level Error

```tsx
function LoginForm() {
  const [loginError, setLoginError] = useState('');

  return (
    <form>
      {loginError && (
        <ErrorText role="alert">
          {loginError}
        </ErrorText>
      )}
      
      {/* form fields */}
    </form>
  );
}
```

### Conditional Error

```tsx
function PasswordField() {
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const error = touched && password.length < 8
    ? 'Password must be at least 8 characters'
    : '';

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={!!error}
        aria-describedby={error ? 'pwd-error' : undefined}
      />
      {error && (
        <ErrorText id="pwd-error">{error}</ErrorText>
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Error message text |
| `id` | `string` | - | Unique ID (for `aria-describedby` linking) |
| `role` | `string` | `'alert'` | ARIA role (default announces to screen readers) |

Plus all standard HTML span attributes (`className`, `style`, etc.).

## Accessibility Features

### Screen Reader Announcements

- Uses `role="alert"` by default for immediate announcement
- Error messages announced when they appear
- Linked to fields via `aria-describedby`

### Visual Styling

- Red color for error indication
- Icon or symbol for visual clarity
- Sufficient color contrast (WCAG AA)

### Best Practices

✅ **Do:**
- Provide clear, specific error messages
- Show errors near the relevant field
- Link errors to fields with `aria-describedby`
- Set `aria-invalid="true"` on the field
- Clear errors when field is corrected
- Use friendly, helpful language

❌ **Don't:**
- Use generic messages like "Error" or "Invalid"
- Show errors before user interaction
- Rely only on color to indicate errors
- Use technical jargon in error messages
- Hide error context from screen readers

## Error Message Guidelines

### Good Error Messages

```tsx
// ✅ Specific and helpful
<ErrorText>Email must include an @ symbol</ErrorText>

// ✅ Actionable
<ErrorText>Password must be at least 8 characters long</ErrorText>

// ✅ Clear and friendly
<ErrorText>This username is already taken. Try adding a number.</ErrorText>
```

### Poor Error Messages

```tsx
// ❌ Too vague
<ErrorText>Invalid input</ErrorText>

// ❌ Technical jargon
<ErrorText>Regex validation failed on field</ErrorText>

// ❌ Unhelpful
<ErrorText>Error</ErrorText>
```

## Styling

### Custom className

```tsx
<ErrorText className="field-error">
  Invalid email format
</ErrorText>
```

```css
.field-error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.field-error::before {
  content: "⚠️";
}
```

### Inline Styles

```tsx
<ErrorText
  style={{
    color: '#dc2626',
    fontSize: '14px',
    marginTop: '4px'
  }}
>
  Error message
</ErrorText>
```

### Tailwind CSS

```tsx
<ErrorText className="text-red-600 text-sm mt-1">
  Invalid email address
</ErrorText>
```

## Manual Composition

ErrorText is used internally by FormField:

```tsx
import { Label, Input, ErrorText, HelperText } from '@flavia-dev/a11y-ui-kit-react';

const hasError = true;

<div>
  <Label htmlFor="email" required>Email</Label>
  
  <Input
    id="email"
    type="email"
    error={hasError}
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : 'email-helper'}
  />
  
  {hasError ? (
    <ErrorText id="email-error">
      Please enter a valid email address
    </ErrorText>
  ) : (
    <HelperText id="email-helper">
      We'll never share your email
    </HelperText>
  )}
</div>
```

## Testing

### Unit Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { ErrorText } from '@flavia-dev/a11y-ui-kit-react';

test('renders error message', () => {
  render(<ErrorText>Error message</ErrorText>);
  
  expect(screen.getByText('Error message')).toBeInTheDocument();
});

test('has alert role for screen readers', () => {
  render(<ErrorText>Error</ErrorText>);
  
  expect(screen.getByRole('alert')).toBeInTheDocument();
});

test('can be linked to input', () => {
  render(
    <>
      <input aria-describedby="error-1" />
      <ErrorText id="error-1">Invalid</ErrorText>
    </>
  );
  
  const error = screen.getByText('Invalid');
  expect(error).toHaveAttribute('id', 'error-1');
});
```

## Related Components

- [FormField](/components/form-field) - Complete form field with automatic error handling
- [HelperText](/components/helper-text) - Helper text for additional info
- [Label](/components/label) - Field labels
- [Input](/components/input) - Text input

## Changelog

See [CHANGELOG.md](/changelog) for version history.
