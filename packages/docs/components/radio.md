# Radio

Accessible radio button component for mutually exclusive selections with integrated label and helper text.

## Import

```tsx
import { Radio } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

Radio buttons must have the same `name` attribute to form a group where only one option can be selected:

```tsx
<Radio name="payment" value="card" label="Credit Card" />
<Radio name="payment" value="paypal" label="PayPal" />
<Radio name="payment" value="bank" label="Bank Transfer" />
```

## Sizes

Three size options:

```tsx
<Radio name="size-demo" value="small" label="Small radio" size="small" />
<Radio name="size-demo" value="medium" label="Medium radio" size="medium" />
<Radio name="size-demo" value="large" label="Large radio" size="large" />
```

## States

### Checked

```tsx
<Radio name="default" value="option1" label="Selected option" checked />
<Radio name="default" value="option2" label="Unselected option" />
```

### Disabled

```tsx
<Radio name="disabled-demo" value="opt1" label="Disabled unchecked" disabled />
<Radio name="disabled-demo" value="opt2" label="Disabled checked" checked disabled />
```

### Required

```tsx
<Radio name="required-demo" value="yes" label="Required option" required />
```

## With Helper Text

```tsx
<Radio
  name="shipping"
  value="express"
  label="Express Shipping"
  helperText="Delivery in 2-3 business days"
/>
```

## With Error

```tsx
<Radio
  name="payment"
  value="card"
  label="Credit Card"
  error="Payment method is required"
/>
```

## Examples

### Radio Group with Fieldset

Always wrap radio groups in a `<fieldset>` with a `<legend>` for accessibility:

```tsx
function PaymentOptions() {
  const [payment, setPayment] = useState('');

  return (
    <fieldset style={{ border: 'none', padding: 0 }}>
      <legend style={{ fontWeight: 600, marginBottom: '12px' }}>
        Select Payment Method
      </legend>
      
      <Radio
        name="payment"
        value="card"
        label="Credit/Debit Card"
        helperText="Visa, Mastercard, Amex"
        checked={payment === 'card'}
        onChange={(e) => setPayment(e.target.value)}
      />
      
      <Radio
        name="payment"
        value="paypal"
        label="PayPal"
        helperText="Pay securely with PayPal"
        checked={payment === 'paypal'}
        onChange={(e) => setPayment(e.target.value)}
      />
      
      <Radio
        name="payment"
        value="bank"
        label="Bank Transfer"
        helperText="Direct bank transfer"
        checked={payment === 'bank'}
        onChange={(e) => setPayment(e.target.value)}
      />
    </fieldset>
  );
}
```

### Controlled Radio Group

```tsx
function ShippingOptions() {
  const [shipping, setShipping] = useState<'standard' | 'express' | 'overnight'>('standard');

  return (
    <div>
      <h3>Shipping Method</h3>
      
      <Radio
        name="shipping"
        value="standard"
        label="Standard Shipping (5-7 days)"
        helperText="Free"
        checked={shipping === 'standard'}
        onChange={(e) => setShipping(e.target.value as any)}
      />
      
      <Radio
        name="shipping"
        value="express"
        label="Express Shipping (2-3 days)"
        helperText="$15.00"
        checked={shipping === 'express'}
        onChange={(e) => setShipping(e.target.value as any)}
      />
      
      <Radio
        name="shipping"
        value="overnight"
        label="Overnight Delivery"
        helperText="$35.00"
        checked={shipping === 'overnight'}
        onChange={(e) => setShipping(e.target.value as any)}
      />
      
      <p>Selected: {shipping}</p>
    </div>
  );
}
```

### With Validation

```tsx
function SurveyQuestion() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!answer) {
      setError('Please select an option');
      return;
    }
    setError('');
    // Submit form
  }

  return (
    <div>
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend>How satisfied are you with our service?</legend>
        
        <Radio
          name="satisfaction"
          value="very-satisfied"
          label="Very Satisfied"
          checked={answer === 'very-satisfied'}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
          error={error}
        />
        
        <Radio
          name="satisfaction"
          value="satisfied"
          label="Satisfied"
          checked={answer === 'satisfied'}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
        />
        
        <Radio
          name="satisfaction"
          value="neutral"
          label="Neutral"
          checked={answer === 'neutral'}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
        />
        
        <Radio
          name="satisfaction"
          value="dissatisfied"
          label="Dissatisfied"
          checked={answer === 'dissatisfied'}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
        />
      </fieldset>
      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

### Conditional Content

```tsx
function ContactPreference() {
  const [contact, setContact] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div>
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend>How should we contact you?</legend>
        
        <Radio
          name="contact"
          value="email"
          label="Email"
          checked={contact === 'email'}
          onChange={(e) => setContact(e.target.value)}
        />
        
        <Radio
          name="contact"
          value="phone"
          label="Phone"
          checked={contact === 'phone'}
          onChange={(e) => setContact(e.target.value)}
        />
        
        <Radio
          name="contact"
          value="mail"
          label="Postal Mail"
          checked={contact === 'mail'}
          onChange={(e) => setContact(e.target.value)}
        />
      </fieldset>

      {contact === 'email' && (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
        />
      )}

      {contact === 'phone' && (
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
        />
      )}
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Radio button label text |
| `name` | `string` | - | **Required.** Radio group name (same for all options) |
| `value` | `string` | - | **Required.** Radio button value |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Radio button size |
| `error` | `string` | - | Error message to display |
| `helperText` | `string` | - | Helper text below radio |
| `checked` | `boolean` | - | Controlled checked state |
| `disabled` | `boolean` | `false` | Disable radio button |
| `required` | `boolean` | `false` | Mark as required |
| `onChange` | `(e: ChangeEvent) => void` | - | Change handler |

Plus all standard HTML radio input attributes (`id`, `className`, `aria-*`, etc.).

## Accessibility Features

### Semantic HTML

- Uses native `<input type="radio">` element
- Associated `<label>` element for clickable area
- Proper `id` and `htmlFor` associations

### Keyboard Support

- **Tab**: Navigate to radio group
- **Arrow Up/Down**: Navigate between options
- **Arrow Left/Right**: Navigate between options
- **Space**: Select focused option
- **Shift + Tab**: Navigate backwards

### Screen Reader Support

- Radio state announced (selected/not selected)
- Group announced when entering radio group
- Label text announced
- Error messages announced via `aria-describedby`
- Helper text linked via `aria-describedby`
- Required state announced

### Visual Accessibility

- **Touch target**: Minimum 44×44 pixels (entire label clickable)
- **Focus indicator**: Visible outline on keyboard focus
- **Color contrast**: Meets WCAG AA standards
- **Error state**: Visual + semantic indication
- **Group context**: Fieldset and legend for context

### Best Practices

✅ **Do:**
- Always wrap radio groups in `<fieldset>` with `<legend>`
- Use descriptive, concise labels
- Keep radio groups to 5-7 options max
- Provide helper text for clarity
- Use the same `name` for all options in a group
- Preselect a default option when appropriate

❌ **Don't:**
- Use radio for binary yes/no choices (use Checkbox)
- Allow no option to be selected (preselect default or add "None")
- Use too many radio buttons (consider Select/Dropdown)
- Rely only on color to show selection

## Styling

### Custom className

```tsx
<Radio
  name="custom"
  value="option"
  label="Custom styled"
  className="my-radio"
/>
```

```css
.my-radio input[type="radio"] {
  width: 24px;
  height: 24px;
}

.my-radio label {
  font-weight: 600;
  color: #2d3748;
}
```

### Inline Styles

```tsx
<Radio
  name="inline"
  value="option"
  label="Inline styled"
  style={{ marginBottom: '16px' }}
/>
```

### Tailwind CSS

```tsx
<Radio
  name="tailwind"
  value="option"
  label="Tailwind styled"
  className="mb-4"
/>
```

## Form Integration

### With HTML Form

```tsx
<form>
  <fieldset>
    <legend>Choose size</legend>
    <Radio name="size" value="small" label="Small" required />
    <Radio name="size" value="medium" label="Medium" required />
    <Radio name="size" value="large" label="Large" required />
  </fieldset>
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
      <Radio
        label="Option A"
        value="a"
        {...register('option', { required: true })}
      />
      <Radio
        label="Option B"
        value="b"
        {...register('option', { required: true })}
      />
    </form>
  );
}
```

## Testing

### Unit Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '@flavia-dev/a11y-ui-kit-react';

test('selects radio on click', () => {
  const handleChange = jest.fn();
  render(
    <>
      <Radio name="test" value="a" label="Option A" onChange={handleChange} />
      <Radio name="test" value="b" label="Option B" />
    </>
  );
  
  const radioA = screen.getByLabelText('Option A');
  fireEvent.click(radioA);
  
  expect(handleChange).toHaveBeenCalled();
});

test('shows error message', () => {
  render(
    <Radio name="test" value="a" label="Option" error="Required" />
  );
  
  expect(screen.getByText('Required')).toBeInTheDocument();
});
```

## Related Components

- [Checkbox](/components/checkbox) - For multiple selections
- [FormField](/components/form-field) - Form field composition
- [Label](/components/label) - Standalone labels

## Changelog

See [CHANGELOG.md](/changelog) for version history.
