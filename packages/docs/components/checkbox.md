# Checkbox

Accessible checkbox component with integrated label, helper text, and error handling.

## Import

```tsx
import { Checkbox } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

```tsx
<Checkbox label="I agree to the terms and conditions" />
```

## Sizes

Three size options:

```tsx
<Checkbox label="Small checkbox" size="small" />
<Checkbox label="Medium checkbox" size="medium" />
<Checkbox label="Large checkbox" size="large" />
```

## States

### Checked

```tsx
<Checkbox label="Checked by default" checked />
```

### Indeterminate

For "select all" scenarios where some items are selected:

```tsx
function SelectAll() {
  const [checkedItems, setCheckedItems] = useState([true, false]);
  const allChecked = checkedItems.every(Boolean);
  const someChecked = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(e) => {
          const newValue = e.target.checked;
          setCheckedItems([newValue, newValue]);
        }}
      />
      <Checkbox
        label="Item 1"
        checked={checkedItems[0]}
        onChange={(e) => {
          setCheckedItems([e.target.checked, checkedItems[1]]);
        }}
      />
      <Checkbox
        label="Item 2"
        checked={checkedItems[1]}
        onChange={(e) => {
          setCheckedItems([checkedItems[0], e.target.checked]);
        }}
      />
    </>
  );
}
```

### Disabled

```tsx
<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" checked disabled />
```

### Required

```tsx
<Checkbox label="Accept terms" required />
```

## With Helper Text

```tsx
<Checkbox
  label="Subscribe to newsletter"
  helperText="We'll send you updates once a month"
/>
```

## With Error

```tsx
<Checkbox
  label="I agree to the terms"
  error="You must accept the terms to continue"
  required
/>
```

## Examples

### Controlled Checkbox

```tsx
function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Checkbox
        label="Remember me"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p>Status: {checked ? 'Checked' : 'Unchecked'}</p>
    </div>
  );
}
```

### Checkbox Group

```tsx
function CheckboxGroup() {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: false
  });

  return (
    <fieldset>
      <legend>Notification Preferences</legend>
      
      <Checkbox
        label="Email notifications"
        checked={preferences.email}
        onChange={(e) => setPreferences({ 
          ...preferences, 
          email: e.target.checked 
        })}
      />
      
      <Checkbox
        label="SMS notifications"
        checked={preferences.sms}
        helperText="Standard messaging rates apply"
        onChange={(e) => setPreferences({ 
          ...preferences, 
          sms: e.target.checked 
        })}
      />
      
      <Checkbox
        label="Push notifications"
        checked={preferences.push}
        onChange={(e) => setPreferences({ 
          ...preferences, 
          push: e.target.checked 
        })}
      />
    </fieldset>
  );
}
```

### Required Checkbox with Validation

```tsx
function TermsCheckbox() {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!accepted) {
      setError('You must accept the terms to continue');
      return;
    }
    setError('');
    // Proceed with form submission
  }

  return (
    <>
      <Checkbox
        label="I have read and agree to the Terms of Service"
        checked={accepted}
        onChange={(e) => {
          setAccepted(e.target.checked);
          if (e.target.checked) setError('');
        }}
        error={error}
        required
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

### Select All Pattern

```tsx
function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  function handleSelectAll(checked: boolean) {
    setItems(items.map(item => ({ ...item, checked })));
  }

  function handleItemCheck(id: number, checked: boolean) {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked } : item
    ));
  }

  return (
    <>
      <Checkbox
        label="Select all items"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={(e) => handleSelectAll(e.target.checked)}
      />
      <hr />
      {items.map(item => (
        <Checkbox
          key={item.id}
          label={item.name}
          checked={item.checked}
          onChange={(e) => handleItemCheck(item.id, e.target.checked)}
        />
      ))}
    </>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Checkbox label text |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Checkbox size |
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text below checkbox |
| `indeterminate` | `boolean` | `false` | Show indeterminate state |
| `checked` | `boolean` | - | Controlled checked state |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `required` | `boolean` | `false` | Mark as required |
| `onChange` | `(e: ChangeEvent) => void` | - | Change handler |

Plus all standard HTML input checkbox attributes (`id`, `name`, `className`, `aria-*`, etc.).

## Accessibility Features

### Semantic HTML

- Uses native `<input type="checkbox">` element
- Associated `<label>` element for clickable area
- Proper `id` and `htmlFor` associations

### Keyboard Support

- **Tab**: Navigate to checkbox
- **Space**: Toggle checkbox
- **Shift + Tab**: Navigate backwards

### Screen Reader Support

- Checkbox state announced (checked/unchecked/indeterminate)
- Label text announced
- Error messages announced via `aria-describedby`
- Helper text linked via `aria-describedby`
- Required state announced

### Visual Accessibility

- **Touch target**: Minimum 44×44 pixels (entire label clickable)
- **Focus indicator**: Visible outline on keyboard focus
- **Color contrast**: Meets WCAG AA standards
- **Error state**: Visual + semantic indication
- **Indeterminate state**: Clear visual indicator

### Best Practices

✅ **Do:**
- Provide clear, descriptive labels
- Group related checkboxes in `<fieldset>` with `<legend>`
- Use helper text for additional context
- Show error messages near the checkbox
- Use indeterminate for "select all" scenarios

❌ **Don't:**
- Use checkbox for mutually exclusive options (use Radio instead)
- Rely only on color to indicate state
- Make labels too long or complex
- Forget to handle validation errors

## Styling

### Custom className

```tsx
<Checkbox
  label="Custom styled"
  className="my-checkbox"
/>
```

```css
.my-checkbox input[type="checkbox"] {
  width: 24px;
  height: 24px;
}

.my-checkbox label {
  font-weight: 600;
  color: #4a5568;
}
```

### Inline Styles

```tsx
<Checkbox
  label="Inline styled"
  style={{ marginBottom: '20px' }}
/>
```

### Tailwind CSS

```tsx
<Checkbox
  label="Newsletter subscription"
  className="mb-4"
  helperText="Get weekly updates"
/>
```

## Form Integration

### With HTML Form

```tsx
<form>
  <Checkbox
    name="terms"
    label="I accept the terms"
    required
  />
  <button type="submit">Submit</button>
</form>
```

### With React Hook Form

```tsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox
        label="Subscribe"
        {...register('subscribe')}
      />
    </form>
  );
}
```

## Testing

### Unit Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '@flavia-dev/a11y-ui-kit-react';

test('toggles on click', () => {
  const handleChange = jest.fn();
  render(<Checkbox label="Test" onChange={handleChange} />);
  
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  
  expect(handleChange).toHaveBeenCalled();
});

test('shows error message', () => {
  render(<Checkbox label="Test" error="Required field" />);
  
  expect(screen.getByText('Required field')).toBeInTheDocument();
});

test('applies indeterminate state', () => {
  render(<Checkbox label="Test" indeterminate />);
  
  const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
  expect(checkbox.indeterminate).toBe(true);
});
```

## Related Components

- [Radio](/components/radio) - For mutually exclusive options
- [FormField](/components/form-field) - Form field composition
- [Label](/components/label) - Standalone labels

## Changelog

See [CHANGELOG.md](/changelog) for version history.
