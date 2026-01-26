# FormField

Complete form field molecule that composes Label, input field, ErrorText, and HelperText with proper accessibility connections.

## Import

```tsx
import { FormField, Input } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

FormField uses a render prop pattern for maximum flexibility:

```tsx
<FormField label="Email Address">
  {(props) => <Input {...props} type="email" />}
</FormField>
```

The render prop receives all necessary accessibility props (`id`, `aria-describedby`, `aria-invalid`, `aria-required`).

## With Helper Text

```tsx
<FormField
  label="Username"
  helperText="Choose a unique username between 3-20 characters"
>
  {(props) => <Input {...props} />}
</FormField>
```

## With Error

Error messages automatically replace helper text:

```tsx
<FormField
  label="Email"
  error="Please enter a valid email address"
  helperText="We'll never share your email"
>
  {(props) => <Input {...props} type="email" error />}
</FormField>
```

## Required Fields

```tsx
<FormField label="Password" required>
  {(props) => <Input {...props} type="password" />}
</FormField>
```

## Hidden Label

For cases like search bars where the label should be visually hidden but available to screen readers:

```tsx
<FormField label="Search" hideLabel>
  {(props) => <Input {...props} type="search" placeholder="Search..." />}
</FormField>
```

## Examples

### Complete Login Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      // Submit form
      console.log({ email, password });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Email Address"
        required
        error={errors.email}
        helperText="Use your work email"
      >
        {(props) => (
          <Input
            {...props}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
          />
        )}
      </FormField>

      <FormField
        label="Password"
        required
        error={errors.password}
      >
        {(props) => (
          <Input
            {...props}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
          />
        )}
      </FormField>

      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Registration Form

```tsx
function RegistrationForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form>
      <FormField
        label="Full Name"
        required
        error={errors.name}
      >
        {(props) => (
          <Input
            {...props}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            error={!!errors.name}
          />
        )}
      </FormField>

      <FormField
        label="Email"
        required
        error={errors.email}
        helperText="We'll send a verification email"
      >
        {(props) => (
          <Input
            {...props}
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            error={!!errors.email}
            autoComplete="email"
          />
        )}
      </FormField>

      <FormField
        label="Password"
        required
        error={errors.password}
        helperText="Minimum 8 characters, include numbers and symbols"
      >
        {(props) => (
          <Input
            {...props}
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            error={!!errors.password}
            autoComplete="new-password"
          />
        )}
      </FormField>

      <FormField
        label="Confirm Password"
        required
        error={errors.confirmPassword}
      >
        {(props) => (
          <Input
            {...props}
            type="password"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            error={!!errors.confirmPassword}
            autoComplete="new-password"
          />
        )}
      </FormField>

      <button type="submit">Create Account</button>
    </form>
  );
}
```

### With Textarea

```tsx
<FormField
  label="Your Message"
  required
  helperText="Maximum 500 characters"
>
  {(props) => (
    <textarea
      {...props}
      rows={6}
      maxLength={500}
      style={{ width: '100%', padding: '8px' }}
    />
  )}
</FormField>
```

### With Custom Field Component

```tsx
import { Select } from './Select';

<FormField
  label="Country"
  required
  helperText="Select your country of residence"
>
  {(props) => (
    <Select {...props}>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </Select>
  )}
</FormField>
```

### Progressive Validation

```tsx
function EmailField() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  function validateEmail(value: string) {
    if (!value) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email';
    }
    return '';
  }

  function handleBlur() {
    setTouched(true);
    setError(validateEmail(email));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    
    // Only validate after first blur
    if (touched) {
      setError(validateEmail(value));
    }
  }

  return (
    <FormField
      label="Email Address"
      required
      error={error}
      helperText="Enter a valid email address"
    >
      {(props) => (
        <Input
          {...props}
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!error}
        />
      )}
    </FormField>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Field label text |
| `children` | `(props: FormFieldChildProps) => ReactElement` | - | **Required.** Render prop function |
| `error` | `string` | - | Error message (replaces helper text) |
| `helperText` | `string` | - | Helper text below field |
| `required` | `boolean` | `false` | Mark field as required |
| `hideLabel` | `boolean` | `false` | Visually hide label (kept for screen readers) |
| `className` | `string` | - | Additional CSS class for wrapper |
| `labelRef` | `Ref<HTMLLabelElement>` | - | Ref to label element |
| `errorRef` | `Ref<HTMLSpanElement>` | - | Ref to error text element |
| `helperRef` | `Ref<HTMLSpanElement>` | - | Ref to helper text element |

### FormFieldChildProps

Props passed to the render prop function:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique ID for field (connects to label) |
| `aria-describedby` | `string \| undefined` | IDs of error/helper text |
| `aria-invalid` | `boolean \| undefined` | True when error is present |
| `aria-required` | `boolean \| undefined` | True when required |

## Accessibility Features

### Automatic ARIA Connections

FormField automatically:
- Generates unique IDs for all elements
- Connects label to field via `htmlFor` and `id`
- Links error/helper text via `aria-describedby`
- Sets `aria-invalid` when error is present
- Sets `aria-required` when required

### Screen Reader Support

- Label announced when focusing field
- Error messages announced immediately (role="alert")
- Helper text announced with field context
- Required state announced
- Validation errors announced on change

### Keyboard Support

Inherits from the input field component used.

### Best Practices

✅ **Do:**
- Always provide a label (even if visually hidden)
- Use clear, concise labels
- Provide helpful error messages
- Add helper text for complex fields
- Mark required fields

❌ **Don't:**
- Use placeholder as the only label
- Show errors before user interaction
- Use generic error messages like "Invalid input"
- Forget to clear errors when field is corrected

## Manual Composition

If you need more control, use atoms directly:

```tsx
import { Label, Input, ErrorText, HelperText } from '@flavia-dev/a11y-ui-kit-react';

const fieldId = 'email';
const hasError = true;

<div>
  <Label htmlFor={fieldId} required>
    Email
  </Label>
  
  <Input
    id={fieldId}
    type="email"
    error={hasError}
    aria-invalid={hasError}
    aria-describedby="email-helper email-error"
  />
  
  <HelperText id="email-helper">
    We'll never share your email
  </HelperText>
  
  {hasError && (
    <ErrorText id="email-error">
      Invalid email address
    </ErrorText>
  )}
</div>
```

## Styling

### Custom className

```tsx
<FormField
  label="Custom field"
  className="my-field-wrapper"
>
  {(props) => <Input {...props} />}
</FormField>
```

```css
.my-field-wrapper {
  margin-bottom: 24px;
}

.my-field-wrapper label {
  font-weight: 600;
  color: #2d3748;
}
```

### Inline Styles

```tsx
<FormField
  label="Styled field"
  style={{ marginBottom: '20px' }}
>
  {(props) => <Input {...props} />}
</FormField>
```

## Testing

### Unit Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { FormField, Input } from '@flavia-dev/a11y-ui-kit-react';

test('connects label to input', () => {
  render(
    <FormField label="Email">
      {(props) => <Input {...props} type="email" />}
    </FormField>
  );
  
  const input = screen.getByLabelText('Email');
  expect(input).toBeInTheDocument();
});

test('shows error message', () => {
  render(
    <FormField label="Email" error="Invalid email">
      {(props) => <Input {...props} error />}
    </FormField>
  );
  
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});

test('hides label visually but keeps for screen readers', () => {
  const { container } = render(
    <FormField label="Search" hideLabel>
      {(props) => <Input {...props} />}
    </FormField>
  );
  
  const label = container.querySelector('label');
  expect(label).toHaveClass('visuallyHidden');
});
```

## Related Components

- [Input](/components/input) - Text input field
- [Label](/components/label) - Field labels
- [ErrorText](/components/error-text) - Error messages
- [HelperText](/components/helper-text) - Helper text

## Changelog

See [CHANGELOG.md](/changelog) for version history.
