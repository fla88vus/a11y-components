# Button

Accessible button component with multiple variants, sizes, and states.

## Import

```tsx
import { Button } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

```tsx
<Button variant="primary">Click me</Button>
```

## Variants

### Primary

Default variant for primary actions like form submissions or confirmations.

```tsx
<Button variant="primary">Save Changes</Button>
<Button variant="primary">Submit Form</Button>
<Button variant="primary">Continue</Button>
```

### Secondary

For secondary or less prominent actions.

```tsx
<Button variant="secondary">Cancel</Button>
<Button variant="secondary">Go Back</Button>
<Button variant="secondary">Learn More</Button>
```

### Danger

For destructive actions that require user attention.

```tsx
<Button variant="danger">Delete Account</Button>
<Button variant="danger">Remove Item</Button>
<Button variant="danger">Clear All</Button>
```

## Sizes

Three size options to fit different contexts:

```tsx
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>
```

## States

### Loading

Shows a loading spinner and automatically disables the button:

```tsx
<Button loading>Saving...</Button>
<Button loading variant="primary">Processing Payment</Button>
```

### Disabled

Prevents user interaction:

```tsx
<Button disabled>Unavailable</Button>
<Button disabled variant="primary">Coming Soon</Button>
```

### Full Width

Button takes the full width of its container:

```tsx
<Button fullWidth variant="primary">
  Continue to Payment
</Button>
```

## Examples

### Form Submit Button

```tsx
function MyForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    
    await submitForm();
    
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" variant="primary" loading={submitting}>
        Submit
      </Button>
    </form>
  );
}
```

### Icon Button

For buttons with only an icon, always provide an `aria-label`:

```tsx
<Button aria-label="Close dialog">×</Button>
<Button aria-label="Open menu">☰</Button>
```

### Button Group

```tsx
<div style={{ display: 'flex', gap: '8px' }}>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</div>
```

### Async Action with Feedback

```tsx
function SaveButton() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    
    await saveData();
    
    setSaving(false);
    setSaved(true);
    
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <Button onClick={handleSave} loading={saving} disabled={saved}>
        {saved ? 'Saved!' : 'Save'}
      </Button>
      {saved && (
        <span role="status" style={{ marginLeft: '8px', color: 'green' }}>
          ✓ Changes saved
        </span>
      )}
    </>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner and disable button |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `fullWidth` | `boolean` | `false` | Button takes full container width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute |
| `onClick` | `(event: React.MouseEvent) => void` | - | Click event handler |
| `children` | `React.ReactNode` | - | Button content (required) |

Plus all standard HTML button attributes (`className`, `style`, `aria-*`, etc.).

## Accessibility Features

### Semantic HTML

Uses native `<button>` element for maximum compatibility with assistive technologies.

### Keyboard Navigation

- **Tab**: Navigate to the button
- **Enter/Space**: Activate the button
- **Shift + Tab**: Navigate backwards

### Screen Reader Support

- Announces button text to screen readers
- Loading state announced as "busy"
- Disabled state properly conveyed
- Custom `aria-label` supported for icon buttons

### Visual Accessibility

- **Focus indicator**: 3px outline with 3:1 contrast ratio
- **Color contrast**: All variants meet WCAG AA (4.5:1 minimum)
- **Touch target**: Minimum 44×44 pixels
- **Reduced motion**: Respects `prefers-reduced-motion` setting

### Best Practices

✅ **Do:**
- Use descriptive button text
- Provide `aria-label` for icon-only buttons
- Use appropriate variants (danger for destructive actions)
- Show loading state during async operations

❌ **Don't:**
- Use `<div>` or `<span>` as buttons
- Forget `aria-label` on icon buttons
- Rely only on color to convey meaning
- Create buttons smaller than 44×44 pixels

## Styling

### Custom className

```tsx
<Button className="my-custom-button">
  Styled Button
</Button>
```

```css
.my-custom-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Inline Styles

```tsx
<Button 
  style={{ 
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    borderRadius: '8px'
  }}
>
  Gradient Button
</Button>
```

### Tailwind CSS

```tsx
<Button className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
  Tailwind Button
</Button>
```

## Testing

### Unit Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@flavia-dev/a11y-ui-kit-react';

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('is disabled when loading', () => {
  render(<Button loading>Loading</Button>);
  
  expect(screen.getByRole('button')).toBeDisabled();
});
```

## Related Components

- [FormField](/components/form-field) - Use buttons in forms
- [Icon](/components/icon) - Add icons to buttons

## Changelog

See [CHANGELOG.md](/changelog) for version history.
