# Radio

Accessible radio button component for mutually exclusive selections. Designed to work seamlessly with the `Radiogroup` component for proper grouping and accessibility.

## Import

```tsx
import { Radio, Radiogroup } from '@flavia-dev/a11y-ui-kit-react';
```

## Basic Usage

Radio buttons are designed to be used within a `Radiogroup` component, which provides proper fieldset/legend structure and context:

```tsx
<Radiogroup name="payment" legend="Select Payment Method">
  <Radio value="card" label="Credit Card" />
  <Radio value="paypal" label="PayPal" />
  <Radio value="bank" label="Bank Transfer" />
</Radiogroup>
```

### Standalone Usage

For advanced use cases, Radio can be used independently with a custom fieldset:

```tsx
<fieldset>
  <legend>Choose an option</legend>
  <Radio label="Option A" value="a" />
  <Radio label="Option B" value="b" />
  <Radio label="Option C" value="c" />
</fieldset>
```

## States

### Checked

```tsx
<Radiogroup name="options" legend="Select one">
  <Radio value="option1" label="Selected option" defaultChecked />
  <Radio value="option2" label="Unselected option" />
</Radiogroup>
```

### Disabled

Disable individual radios or the entire group:

```tsx
{/* Individual radio disabled */}
<Radiogroup name="options1" legend="Choose">
  <Radio value="opt1" label="Available" />
  <Radio value="opt2" label="Disabled option" disabled />
</Radiogroup>

{/* Entire group disabled */}
<Radiogroup name="options2" legend="Choose" disabled>
  <Radio value="opt1" label="All options" />
  <Radio value="opt2" label="Are disabled" />
</Radiogroup>
```

## With Helper Text and Errors

Use `Radiogroup` props to display helper text and errors:

```tsx
<Radiogroup
  name="shipping"
  legend="Shipping Method"
  helperText="Choose your preferred delivery option"
  error="Please select a shipping method"
>
  <Radio value="standard" label="Standard (5-7 days)" />
  <Radio value="express" label="Express (2-3 days)" />
  <Radio value="overnight" label="Overnight" />
</Radiogroup>
```

## Examples

### Payment Options

```tsx
function PaymentOptions() {
  const [payment, setPayment] = useState('card');

  return (
    <Radiogroup 
      name="payment" 
      legend="Select Payment Method"
      helperText="All payment methods are secure and encrypted"
    >
      <Radio
        value="card"
        label="Credit/Debit Card"
        checked={payment === 'card'}
        onChange={(e) => setPayment(e.target.value)}
      />
      
      <Radio
        value="paypal"
        label="PayPal"
        checked={payment === 'paypal'}
        onChange={(e) => setPayment(e.target.value)}
      />
      
      <Radio
        value="bank"
        label="Bank Transfer"
        checked={payment === 'bank'}
        onChange={(e) => setPayment(e.target.value)}
      />
    </Radiogroup>
  );
}
```

### Controlled Radio Group

```tsx
function ShippingOptions() {
  const [shipping, setShipping] = useState<'standard' | 'express' | 'overnight'>('standard');

  const shippingOptions = [
    { value: 'standard', label: 'Standard (5-7 days) - Free' },
    { value: 'express', label: 'Express (2-3 days) - $15.00' },
    { value: 'overnight', label: 'Overnight - $35.00' }
  ];

  return (
    <div>
      <Radiogroup 
        name="shipping" 
        legend="Shipping Method"
      >
        {shippingOptions.map(option => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            checked={shipping === option.value}
            onChange={(e) => setShipping(e.target.value as any)}
          />
        ))}
      </Radiogroup>
      
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

  const handleSubmit = () => {
    if (!answer) {
      setError('Please select an option to continue');
      return;
    }
    setError('');
    // Submit form
    console.log('Submitted:', answer);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    setError(''); // Clear error on selection
  };

  return (
    <div>
      <Radiogroup
        name="satisfaction"
        legend="How satisfied are you with our service?"
        error={error}
      >
        <Radio
          value="very-satisfied"
          label="Very Satisfied"
          checked={answer === 'very-satisfied'}
          onChange={handleChange}
        />
        
        <Radio
          value="satisfied"
          label="Satisfied"
          checked={answer === 'satisfied'}
          onChange={handleChange}
        />
        
        <Radio
          value="neutral"
          label="Neutral"
          checked={answer === 'neutral'}
          onChange={handleChange}
        />
        
        <Radio
          value="dissatisfied"
          label="Dissatisfied"
          checked={answer === 'dissatisfied'}
          onChange={handleChange}
        />
      </Radiogroup>
      
      <button onClick={handleSubmit}>Submit Survey</button>
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
       Radiogroup
        name="contact"
        legend="How should we contact you?"
        helperText="We'll only contact you about your order"
      >
        <Radio
          value="email"
          label="Email"
          checked={contact === 'email'}
          onChange={(e) => setContact(e.target.value)}
        />
        
        <Radio
          value="phone"
          label="Phone"
          checked={contact === 'phone'}
          onChange={(e) => setContact(e.target.value)}
        />
        
        <Radio
          value="mail"
          label="Postal Mail"
          checked={contact === 'mail'}
          onChange={(e) => setContact(e.target.value)}
        />
      </Radiogroup>

      {contact === 'email' && (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          style={{ marginTop: '16px', width: '100%' }}
        />
      )}

      {contact === 'phone' && (
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
    Radio Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | **Required.** Radio button label text |
| `id` | `string` | - | Custom ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS class for wrapper div |
| `disabled` | `boolean` | - | Disable this radio (or inherited from Radiogroup) |
| `ref` | `Ref<HTMLInputElement>` | - | Ref forwarding to input element |

Plus all standard HTML radio input attributes (`value`, `checked`, `defaultChecked`, `onChange`, `name`, `aria-*`, etc.).

### Radiogroup Props

See [Radiogroup documentation](/components/radiogroup) for complete API.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | - | **Required.** Group label (fieldset legend) |
| `name` | `string` | - | **Required.** Name for all radios in group |
| `hWCAG 2.1 Level AA Compliant ✅

The Radio component meets all WCAG 2.1 Level AA requirements for accessible form controls.

### Semantic HTML

- ✅ Uses native `<input type="radio">` element
- ✅ Associated `<Label>` component with proper `htmlFor` binding
- ✅ Automatic ID generation using `React.useId()`
- ✅ Works with `Radiogroup` for fieldset/legend structure

### Keyboard Support

Full keyboard navigation support via native HTML semantics:

- **Tab**: Navigate to radio group (first or checked radio gets focus)
- **Arrow Up/Left**: Move to previous radio in group
- **Arrow Down/Right**: Move to next radio in group
- **Space**: Select focused radio
- **Shift + Tab**: Navigate backwards

### Screen Reader Support

- ✅ Radio role and state announced automatically
- ✅ Label text read when focused
- ✅ Group context from fieldset/legend (via Radiogroup)
- ✅ Error messages linked via `aria-describedby`
- ✅ Helper text linked via `aria-describedby`
- ✅ Disabled state announced

### Visual Accessibility

- ✅ **Focus indicator**: Clear 3px outline with offset
- ✅ **Color contrast**: Meets WCAG AA (4.5:1+)
- ✅ **Touch target**: Label increases clickable area
- ✅ **Error state**: Multiple indicators (color + border + text)
- ✅ **Disabled state**: Reduced opacity + cursor change

### Context Integration

The Radio component automatically receives context from `Radiogroup`:
- Group name for proper radio grouping
- `aria-describedby` for helper text and errors
- Disabled state inheritance
- Proper semantic structure

### Best Practices

✅ **Do:**
- Use with `Radiogroup` for proper accessibility structure
- Provide clear, descriptive labels
- Keep groups to 5-7 options maximum
- Preselect a sensible default when appropriate
- Use helper text to provide additional context
- Show clear error messages when validation fails

❌ **Don't:**
- Use for binary yes/no choices (use Checkbox instead)
The Radio component uses CSS Modules for scoped styling and design tokens for consistency.

### Custom className

Add custom classes to the wrapper div:

```tsx
<Radiogroup name="custom" legend="Choose">
  <Radio
    value="option1"
    label="Custom styled option"
    className="my-custom-radio"
  />
</Radiogroup>
```

```css
.my-custom-radio {
  padding: 12px;
  border-radius: 8px;
  background-color: #f9fafb;
}

.my-custom-radio:hover {
  background-color: #f3f4f6;
}
```

### Design Tokens

The component uses CSS custom properties (design tokens):

```css
/* Available tokens used by Radio */
--a11y-space-2          /* Gap between radio and label */
--a11y-font-family-sans /* Font family */
--a11y-color-border-default
--a11y-color-border-focus
--a11y-color-bg-primary
--a11y-color-focus-ring
--a11y-color-primary-600
--a11y-color-text-primary
--a11y-focus-ring-width
--a11y-focus-ring-offset
--a11y-transition-input
```

### Customizing via Tokens

Override tokens in your theme:
 onSubmit={handleSubmit}>
  <Radiogroup name="size" legend="Choose your size">
    <Radio value="small" label="Small" defaultChecked />
    <Radio value="medium" label="Medium" />
    <Radio value="large" label="Large" />
  </Radiogroup>
  
  <button type="submit">Continue</button>
</form>
```

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  preference: string;
};

function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="preference"
        control={control}
        rules={{ required: 'Please select an option' }}
        render={({ field, fieldState }) => (
          <Radiogroup 
            name="preference" 
            legend="Select your preference"
            error={fieldState.error?.message}
          >
            <Radio 
              value="a" 
              label="Option A"
              checked={field.value === 'a'}
              onChange={field.onChange}
            />
            <Radio 
              value="b" 
              label="Option B"
              checked={field.value === 'b'}
              onChange={field.onChange}
            />
          </Radiogroup>
        )}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}, Radiogroup } from '@flavia-dev/a11y-ui-kit-react';

test('selects radio on click', () => {
  const handleChange = jest.fn();
  
  render(
    <Radiogroup name="test" legend="Choose">
      <Radio value="a" label="Option A" onChange={handleChange} />
      <Radio value="b" label="Option B" />
    </Radiogroup>
  );
  
  const radioA = screen.getByLabelText('Option A');
  fireEvent.click(radioA);
  
  expect(handleChange).toHaveBeenCalled();
  expect(radioA).toBeChecked();
});

test('shows error message', () => {
  render(
    <Radiogroup 
      name="test" 
      legend="Choose" 
      error="Selection required"
    >
      <Radio value="a" label="Option A" />
    </Radiogroup>
  );
  
  expect(screen.getByText('Selection required')).toBeInTheDocument();
});

test('disables all radios when group is disabled', () => {
  render(
    <Radiogroup name="test" legend="Choose" disabled>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </Radiogroup>
  )Component Architecture

The Radio component follows atomic design principles:

- **Radio** (Atom): Individual radio input with label
- **Radiogroup** (Molecule): Grouped radios with fieldset structure
- Uses **Label** (Atom) for text display
- Uses **GroupContext** (Primitive) for state sharing
- Integrates with **ErrorText** and **HelperText** via Radiogroup

### Implementation Details

```tsx
// Simplified structure
<div className={styles.radio}>  {/* Wrapper with styling */}
  <input 
    type="radio"
    id={generatedOrProvidedId}  {/* Auto-generated unique ID */}
    name={group?.name}           {/* From context */}
    aria-describedby={group?.describedBy}  {/* Error/helper text */}
    disabled={disabled ?? group?.disabled}
    ref={ref}                    {/* Forwarded ref */}
  />
  <Label htmlFor={id}>          {/* Explicit association */}
    {label}
  </Label>
</div>
```

### Ref Forwarding

The component forwards refs to the input element:

```tsx
const radioRef = useRef<HTMLInputElement>(null);

<Radio ref={radioRef} value="option" label="Option" />

// Access input directly
radioRef.current?.focus();
```

## Related Components

- [Radiogroup](/components/radiogroup) - Wrapper for radio groups ⭐ **Recommended**
- [Checkbox](/components/checkbox) - For multiple selections
- [CheckboxGroup](/components/checkbox-group) - Multiple checkbox grouping
- [FormField](/components/form-field) - Complete form field composition
- [Label](/components/label) - Standalone labels
- [ErrorText](/components/error-text) - Error messages
- [HelperText](/components/helper-text) - Helper text

## Changelog

See [CHANGELOG.md](/changelog) for version history.

## Resources

- [WCAG 2.1 Guidelines for Radio Buttons](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [MDN: &lt;input type="radio"&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
- [ARIA: radio role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radio_role)
```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Radio, Radiogroup } from '@flavia-dev/a11y-ui-kit-react';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = render(
    <Radiogroup name="test" legend="Select option">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" />
    </Radiogroup>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations
      
      <button type="submit">Add to Cart</buttondset>
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
