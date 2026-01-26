# Label

Accessible label atom for form fields with support for required indicators.

## Import

```tsx
import { Label } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

```tsx
<Label htmlFor="email">Email Address</Label>
<input id="email" type="email" />
```

## Required Fields

Add a visual asterisk (*) for required fields:

```tsx
<Label htmlFor="password" required>
  Password
</Label>
<input id="password" type="password" required />
```

## Examples

### With Input

```tsx
<div>
  <Label htmlFor="username" required>Username</Label>
  <Input id="username" type="text" />
</div>
```

### With Textarea

```tsx
<div>
  <Label htmlFor="message">Your Message</Label>
  <textarea id="message" rows={4} />
</div>
```

### With Select

```tsx
<div>
  <Label htmlFor="country" required>Country</Label>
  <select id="country">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>
</div>
```

### Wrapping Pattern

Labels can also wrap their input:

```tsx
<Label>
  <span>Remember me</span>
  <input type="checkbox" />
</Label>
```

However, using `htmlFor` and `id` is preferred for clarity.

### Custom Styling

```tsx
<Label
  htmlFor="email"
  style={{
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151'
  }}
>
  Email Address
</Label>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `required` | `boolean` | `false` | Show required indicator (asterisk) |
| `children` | `ReactNode` | - | **Required.** Label text |
| `htmlFor` | `string` | - | ID of associated form field |

Plus all standard HTML label attributes (`className`, `style`, `onClick`, etc.).

## Accessibility Features

### Semantic HTML

Uses native `<label>` element for proper form field association.

### Screen Reader Support

- Label text announced when field receives focus
- `htmlFor` creates programmatic association
- Required indicator announced via `aria-label`

### Keyboard Support

Clicking label focuses the associated input field.

### Best Practices

✅ **Do:**
- Always provide labels for form fields
- Use `htmlFor` to connect label to field
- Keep labels concise and descriptive
- Use `required` prop for required fields
- Place labels above or beside fields (not below)

❌ **Don't:**
- Use placeholder text as a replacement for labels
- Make labels overly long or complex
- Forget to connect label to field with `htmlFor`
- Hide labels without providing alternative text

## Manual Composition

The Label atom is used internally by FormField, but can be composed manually:

```tsx
import { Label, Input, ErrorText, HelperText } from '@flavia-dev/a11y-ui-kit-react';

<div>
  <Label htmlFor="email" required>
    Email Address
  </Label>
  
  <Input
    id="email"
    type="email"
    aria-describedby="email-helper"
  />
  
  <HelperText id="email-helper">
    We'll never share your email
  </HelperText>
</div>
```

## Styling

### Custom className

```tsx
<Label htmlFor="email" className="form-label">
  Email
</Label>
```

```css
.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1f2937;
}
```

### Inline Styles

```tsx
<Label
  htmlFor="email"
  style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: 600
  }}
>
  Email
</Label>
```

### Tailwind CSS

```tsx
<Label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
  Email Address
</Label>
```

## Testing

### Unit Test Example

```tsx
import { render, screen } from '@testing-library/react';
import { Label } from '@flavia-dev/a11y-ui-kit-react';

test('renders label text', () => {
  render(<Label htmlFor="test">Test Label</Label>);
  
  expect(screen.getByText('Test Label')).toBeInTheDocument();
});

test('shows required indicator', () => {
  render(<Label htmlFor="test" required>Required Field</Label>);
  
  expect(screen.getByText('*')).toBeInTheDocument();
});

test('connects to input with htmlFor', () => {
  render(
    <>
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" />
    </>
  );
  
  const label = screen.getByText('Email');
  const input = screen.getByLabelText('Email');
  
  expect(label).toHaveAttribute('for', 'email');
  expect(input).toHaveAttribute('id', 'email');
});
```

## Related Components

- [FormField](/components/form-field) - Complete form field composition
- [Input](/components/input) - Text input
- [ErrorText](/components/error-text) - Error messages
- [HelperText](/components/helper-text) - Helper text

## Changelog

See [CHANGELOG.md](/changelog) for version history.
