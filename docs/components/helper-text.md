# HelperText

Accessible helper text component for providing additional information about form fields.

## Import

```tsx
import { HelperText } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

```tsx
<HelperText id="email-helper">
  We'll never share your email with anyone else
</HelperText>
```

## With Input

Link helper text to input using `aria-describedby`:

```tsx
<input
  id="email"
  type="email"
  aria-describedby="email-helper"
/>
<HelperText id="email-helper">
  Use your work email address
</HelperText>
```

## Examples

### Password Requirements

```tsx
<div>
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    aria-describedby="password-helper"
  />
  <HelperText id="password-helper">
    Must be at least 8 characters with numbers and special characters
  </HelperText>
</div>
```

### Character Counter

```tsx
function MessageField() {
  const [message, setMessage] = useState('');
  const maxLength = 500;

  return (
    <div>
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={maxLength}
        aria-describedby="message-helper"
      />
      <HelperText id="message-helper">
        {message.length}/{maxLength} characters
      </HelperText>
    </div>
  );
}
```

### Multiple Helper Texts

```tsx
<div>
  <input
    id="username"
    aria-describedby="username-helper-1 username-helper-2"
  />
  <HelperText id="username-helper-1">
    Username must be 3-20 characters
  </HelperText>
  <HelperText id="username-helper-2">
    Only letters, numbers, and underscores allowed
  </HelperText>
</div>
```

### With FormField

FormField automatically handles helper text display:

```tsx
<FormField
  label="Email"
  helperText="We'll send you a verification email"
>
  {(props) => <Input {...props} type="email" />}
</FormField>
```

### Conditional Helper Text

```tsx
function UsernameField() {
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  async function checkAvailability(value: string) {
    if (value.length < 3) return;
    
    setIsChecking(true);
    // API call to check username
    const available = await checkUsername(value);
    setIsAvailable(available);
    setIsChecking(false);
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => checkAvailability(username)}
        aria-describedby="username-helper"
      />
      <HelperText id="username-helper">
        {isChecking && 'Checking availability...'}
        {isAvailable === true && '✓ Username is available'}
        {isAvailable === false && '✗ Username is taken'}
        {isAvailable === null && 'Choose a unique username'}
      </HelperText>
    </div>
  );
}
```

### Format Hints

```tsx
<div>
  <label htmlFor="phone">Phone Number</label>
  <input
    id="phone"
    type="tel"
    placeholder="(555) 123-4567"
    aria-describedby="phone-helper"
  />
  <HelperText id="phone-helper">
    Format: (555) 123-4567
  </HelperText>
</div>
```

### Dynamic Helper Text

```tsx
function PasswordStrength() {
  const [password, setPassword] = useState('');

  function getStrength(pwd: string) {
    if (pwd.length < 6) return { text: 'Weak', color: '#dc2626' };
    if (pwd.length < 10) return { text: 'Medium', color: '#f59e0b' };
    return { text: 'Strong', color: '#22c55e' };
  }

  const strength = getStrength(password);

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-describedby="pwd-helper"
      />
      {password && (
        <HelperText id="pwd-helper" style={{ color: strength.color }}>
          Password strength: {strength.text}
        </HelperText>
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | **Required.** Helper text content |
| `id` | `string` | - | Unique ID (for `aria-describedby` linking) |

Plus all standard HTML span attributes (`className`, `style`, etc.).

## Accessibility Features

### Screen Reader Support

- Announced when field receives focus
- Linked to field via `aria-describedby`
- Provides additional context for the field

### Visual Styling

- Subtle, muted color (typically gray)
- Smaller font size than main text
- Positioned near the related field

### Best Practices

✅ **Do:**
- Provide helpful, concise information
- Use plain language, avoid jargon
- Show format examples when needed
- Place helper text near the field
- Keep it brief (1-2 short sentences)
- Update dynamically when relevant

❌ **Don't:**
- Use helper text as a replacement for labels
- Make helper text too long or complex
- Include critical error information (use ErrorText)
- Forget to link with `aria-describedby`
- Use technical terminology

## Helper Text Guidelines

### Good Helper Text

```tsx
// ✅ Specific format example
<HelperText>Format: MM/DD/YYYY</HelperText>

// ✅ Helpful context
<HelperText>We'll never share your phone number</HelperText>

// ✅ Clear limitations
<HelperText>Maximum 500 characters</HelperText>

// ✅ Actionable guidance
<HelperText>Use 8+ characters with a mix of letters and numbers</HelperText>
```

### Poor Helper Text

```tsx
// ❌ Too vague
<HelperText>Enter valid data</HelperText>

// ❌ Too long
<HelperText>
  Please enter your full legal name as it appears on your government-issued
  identification document, including all middle names and suffixes if applicable,
  ensuring proper capitalization and spacing.
</HelperText>

// ❌ Technical jargon
<HelperText>Regex pattern: ^[a-zA-Z0-9]+$</HelperText>
```

## Styling

### Custom className

```tsx
<HelperText className="field-help">
  Additional information
</HelperText>
```

```css
.field-help {
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
  display: block;
}
```

### Inline Styles

```tsx
<HelperText
  style={{
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px'
  }}
>
  Helper text
</HelperText>
```

### Tailwind CSS

```tsx
<HelperText className="text-sm text-gray-600 mt-1">
  Additional information
</HelperText>
```

## Manual Composition

HelperText is used internally by FormField:

```tsx
import { Label, Input, HelperText, ErrorText } from '@flavia-dev/a11y-ui-kit-react';

const hasError = false;

<div>
  <Label htmlFor="email">Email</Label>
  
  <Input
    id="email"
    type="email"
    aria-describedby={hasError ? 'email-error' : 'email-helper'}
  />
  
  {hasError ? (
    <ErrorText id="email-error">Invalid email</ErrorText>
  ) : (
    <HelperText id="email-helper">
      We'll send you a verification link
    </HelperText>
  )}
</div>
```

## Testing

### Unit Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { HelperText } from '@flavia-dev/a11y-ui-kit-react';

test('renders helper text', () => {
  render(<HelperText>Helper message</HelperText>);
  
  expect(screen.getByText('Helper message')).toBeInTheDocument();
});

test('can be linked to input', () => {
  render(
    <>
      <input aria-describedby="helper-1" />
      <HelperText id="helper-1">Helper info</HelperText>
    </>
  );
  
  const helper = screen.getByText('Helper info');
  expect(helper).toHaveAttribute('id', 'helper-1');
});

test('accepts custom className', () => {
  const { container } = render(
    <HelperText className="custom-helper">Text</HelperText>
  );
  
  expect(container.firstChild).toHaveClass('custom-helper');
});
```

## Related Components

- [FormField](/components/form-field) - Complete form field with automatic helper text handling
- [ErrorText](/components/error-text) - Error messages
- [Label](/components/label) - Field labels
- [Input](/components/input) - Text input

## Changelog

See [CHANGELOG.md](/changelog) for version history.
