# Practical Usage Examples

Real-world patterns and recipes for implementing @flavia-dev/a11y-ui-kit-react in your applications.

## Table of Contents

- [User Authentication](#user-authentication)
- [Data Collection Forms](#data-collection-forms)
- [Field Validation Patterns](#field-validation-patterns)
- [Conditional Logic](#conditional-logic)
- [Custom Styling](#custom-styling)
- [Framework Integration](#framework-integration)
- [Accessibility Best Practices](#accessibility-best-practices)

---

## User Authentication

### Sign-In Form

```tsx
import { useState } from 'react';
import { FormField, Input, Button, Checkbox } from '@flavia-dev/a11y-ui-kit-react';

export function SignInForm() {
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '', 
    rememberMe: false 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    
    if (!credentials.username || !credentials.password) {
      setError('Both fields are required');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Sign in form">
      <h1>Sign In</h1>
      
      {error && (
        <div 
          role="alert" 
          style={{ 
            padding: '12px', 
            background: '#fee', 
            border: '1px solid #fcc',
            borderRadius: '4px',
            marginBottom: '16px',
            color: '#c00'
          }}
        >
          {error}
        </div>
      )}

      <FormField label="Username or Email" required>
        {(props) => (
          <Input
            {...props}
            value={credentials.username}
            onChange={(e) => setCredentials({ 
              ...credentials, 
              username: e.target.value 
            })}
            autoComplete="username"
          />
        )}
      </FormField>

      <FormField label="Password" required>
        {(props) => (
          <Input
            {...props}
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ 
              ...credentials, 
              password: e.target.value 
            })}
            autoComplete="current-password"
          />
        )}
      </FormField>

      <Checkbox
        label="Keep me signed in"
        checked={credentials.rememberMe}
        onChange={(e) => setCredentials({ 
          ...credentials, 
          rememberMe: e.target.checked 
        })}
      />

      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        loading={loading}
        style={{ marginTop: '20px' }}
      >
        Sign In
      </Button>
    </form>
  );
}
```

### Registration Form

```tsx
import { useState } from 'react';
import { FormField, Input, Button } from '@flavia-dev/a11y-ui-kit-react';

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegistrationForm() {
  const [data, setData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<RegistrationData>>({});
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof RegistrationData, value: string) {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  }

  function validateForm(): boolean {
    const newErrors: Partial<RegistrationData> = {};

    if (data.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          password: data.password
        })
      });
      
      alert('Account created successfully!');
    } catch (err) {
      alert('Failed to create account');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>

      <FormField
        label="Full Name"
        required
        error={errors.fullName}
      >
        {(props) => (
          <Input
            {...props}
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            error={!!errors.fullName}
            autoComplete="name"
          />
        )}
      </FormField>

      <FormField
        label="Email Address"
        required
        error={errors.email}
        helperText="We'll never share your email"
      >
        {(props) => (
          <Input
            {...props}
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={!!errors.email}
            autoComplete="email"
          />
        )}
      </FormField>

      <FormField
        label="Password"
        required
        error={errors.password}
        helperText="At least 8 characters"
      >
        {(props) => (
          <Input
            {...props}
            type="password"
            value={data.password}
            onChange={(e) => updateField('password', e.target.value)}
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
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            error={!!errors.confirmPassword}
            autoComplete="new-password"
          />
        )}
      </FormField>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={submitting}
        style={{ marginTop: '24px' }}
      >
        Create Account
      </Button>
    </form>
  );
}
```

---

## Data Collection Forms

### Contact Form

```tsx
import { useState } from 'react';
import { FormField, Input, Button, Radio } from '@flavia-dev/a11y-ui-kit-react';

type ContactPreference = 'email' | 'phone' | 'either';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    contactPreference: 'email' as ContactPreference
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setSubmitted(true);
    } catch {
      alert('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status">
        <h2>Thank You!</h2>
        <p>We've received your message and will respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Contact Us</h1>

      <FormField label="Your Name" required>
        {(props) => (
          <Input
            {...props}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
      </FormField>

      <FormField label="Email Address" required>
        {(props) => (
          <Input
            {...props}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        )}
      </FormField>

      <FormField label="Phone Number" helperText="Optional">
        {(props) => (
          <Input
            {...props}
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        )}
      </FormField>

      <fieldset style={{ border: 'none', padding: 0, marginBottom: '20px' }}>
        <legend style={{ fontWeight: 600, marginBottom: '8px' }}>
          Preferred Contact Method
        </legend>
        
        <Radio
          name="contact-preference"
          value="email"
          label="Email"
          checked={formData.contactPreference === 'email'}
          onChange={(e) => setFormData({ 
            ...formData, 
            contactPreference: e.target.value as ContactPreference 
          })}
        />
        
        <Radio
          name="contact-preference"
          value="phone"
          label="Phone"
          checked={formData.contactPreference === 'phone'}
          onChange={(e) => setFormData({ 
            ...formData, 
            contactPreference: e.target.value as ContactPreference 
          })}
        />
        
        <Radio
          name="contact-preference"
          value="either"
          label="Either"
          checked={formData.contactPreference === 'either'}
          onChange={(e) => setFormData({ 
            ...formData, 
            contactPreference: e.target.value as ContactPreference 
          })}
        />
      </fieldset>

      <FormField label="Message" required>
        {(props) => (
          <textarea
            {...props}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            style={{ 
              width: '100%', 
              padding: '8px', 
              fontFamily: 'inherit',
              fontSize: 'inherit',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
        )}
      </FormField>

      <Button type="submit" variant="primary" loading={submitting} fullWidth>
        Send Message
      </Button>
    </form>
  );
}
```

### Dynamic List Manager

```tsx
import { useState } from 'react';
import { FormField, Input, Button } from '@flavia-dev/a11y-ui-kit-react';

interface ListItem {
  id: string;
  value: string;
}

export function EmailListManager() {
  const [items, setItems] = useState<ListItem[]>([
    { id: crypto.randomUUID(), value: '' }
  ]);

  function addItem() {
    setItems([...items, { id: crypto.randomUUID(), value: '' }]);
  }

  function removeItem(id: string) {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  }

  function updateItem(id: string, value: string) {
    setItems(items.map(item => 
      item.id === id ? { ...item, value } : item
    ));
  }

  return (
    <div>
      <h2>Email Recipients</h2>
      
      {items.map((item, index) => (
        <div 
          key={item.id}
          style={{ 
            display: 'flex', 
            gap: '12px', 
            marginBottom: '16px',
            alignItems: 'flex-end'
          }}
        >
          <div style={{ flex: 1 }}>
            <FormField
              label={`Email ${index + 1}`}
              hideLabel={index > 0}
            >
              {(props) => (
                <Input
                  {...props}
                  type="email"
                  value={item.value}
                  onChange={(e) => updateItem(item.id, e.target.value)}
                  placeholder="name@example.com"
                />
              )}
            </FormField>
          </div>

          {items.length > 1 && (
            <Button
              variant="danger"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove email ${index + 1}`}
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button variant="secondary" onClick={addItem}>
        + Add Another Email
      </Button>
    </div>
  );
}
```

---

## Field Validation Patterns

### Custom Validation Hook

```tsx
import { useState, useCallback } from 'react';

interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export function useFieldValidation<T = string>(
  initialValue: T,
  rules: ValidationRule<T>[]
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState(false);

  const validate = useCallback((val: T) => {
    for (const rule of rules) {
      if (!rule.validate(val)) {
        setError(rule.message);
        return false;
      }
    }
    setError('');
    return true;
  }, [rules]);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
    if (touched) {
      validate(newValue);
    }
  }, [touched, validate]);

  const handleBlur = useCallback(() => {
    setTouched(true);
    validate(value);
  }, [value, validate]);

  return {
    value,
    error: touched ? error : '',
    touched,
    setValue: handleChange,
    onBlur: handleBlur,
    isValid: !error,
  };
}

// Usage
export function ValidatedEmailInput() {
  const email = useFieldValidation('', [
    {
      validate: (val) => val.length > 0,
      message: 'Email is required'
    },
    {
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      message: 'Please enter a valid email'
    }
  ]);

  return (
    <FormField label="Email" required error={email.error}>
      {(props) => (
        <Input
          {...props}
          type="email"
          value={email.value}
          onChange={(e) => email.setValue(e.target.value)}
          onBlur={email.onBlur}
          error={!!email.error}
        />
      )}
    </FormField>
  );
}
```

---

## Conditional Logic

### Show/Hide Fields Based on Selection

```tsx
import { useState } from 'react';
import { FormField, Input, Radio, Checkbox } from '@flavia-dev/a11y-ui-kit-react';

type ShippingMethod = 'standard' | 'express' | 'overnight';

export function ShippingForm() {
  const [method, setMethod] = useState<ShippingMethod>('standard');
  const [requireSignature, setRequireSignature] = useState(false);
  const [instructions, setInstructions] = useState('');

  const showSignatureOption = method === 'overnight';
  const showInstructions = method !== 'overnight' && !requireSignature;

  return (
    <div>
      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend style={{ fontWeight: 600, marginBottom: '12px' }}>
          Shipping Method
        </legend>
        
        <Radio
          name="shipping"
          value="standard"
          label="Standard (5-7 days) - Free"
          checked={method === 'standard'}
          onChange={(e) => setMethod(e.target.value as ShippingMethod)}
        />
        
        <Radio
          name="shipping"
          value="express"
          label="Express (2-3 days) - $15"
          checked={method === 'express'}
          onChange={(e) => setMethod(e.target.value as ShippingMethod)}
        />
        
        <Radio
          name="shipping"
          value="overnight"
          label="Overnight - $35"
          checked={method === 'overnight'}
          onChange={(e) => setMethod(e.target.value as ShippingMethod)}
        />
      </fieldset>

      {showSignatureOption && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#f9fafb' }}>
          <Checkbox
            label="Require signature (+$5)"
            checked={requireSignature}
            onChange={(e) => setRequireSignature(e.target.checked)}
          />
        </div>
      )}

      {showInstructions && (
        <FormField
          label="Delivery Instructions"
          helperText="Optional special instructions"
        >
          {(props) => (
            <textarea
              {...props}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={3}
              placeholder="Leave at front door"
              style={{ width: '100%', padding: '8px' }}
            />
          )}
        </FormField>
      )}
    </div>
  );
}
```

---

## Custom Styling

### Tailwind CSS

```tsx
import { Button, FormField, Input } from '@flavia-dev/a11y-ui-kit-react';

export function TailwindExample() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <FormField label="Email">
        {(props) => (
          <Input 
            {...props}
            className="border-2 border-purple-300 focus:border-purple-600 rounded-lg"
          />
        )}
      </FormField>

      <Button 
        variant="primary"
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl"
      >
        Submit
      </Button>
    </div>
  );
}
```

### Inline Styles

```tsx
import { Button, FormField, Input } from '@flavia-dev/a11y-ui-kit-react';

export function CustomStyledForm() {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '32px',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '16px'
    }}>
      <FormField label="Username">
        {(props) => (
          <Input
            {...props}
            style={{
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '16px'
            }}
          />
        )}
      </FormField>

      <Button
        variant="primary"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          padding: '14px'
        }}
      >
        Submit
      </Button>
    </div>
  );
}
```

---

## Framework Integration

### Next.js App Router

```tsx
// app/layout.tsx
import '@flavia-dev/a11y-ui-kit-react/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/contact/page.tsx
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return <ContactForm />;
}
```

### Remix

```tsx
// app/root.tsx
import type { LinksFunction } from '@remix-run/node';
import styles from '@flavia-dev/a11y-ui-kit-react/styles.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
];
```

### Vite

```tsx
// src/main.tsx
import '@flavia-dev/a11y-ui-kit-react/styles.css';
import './index.css';
```

---

## Accessibility Best Practices

### Error Announcements

```tsx
import { useState, useEffect, useRef } from 'react';
import { FormField, Input } from '@flavia-dev/a11y-ui-kit-react';

export function AccessibleErrors() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  return (
    <div>
      {error && (
        <div
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          style={{
            padding: '12px',
            background: '#fee',
            border: '2px solid #c00',
            marginBottom: '16px'
          }}
        >
          {error}
        </div>
      )}

      <FormField label="Email" error={error}>
        {(props) => (
          <Input
            {...props}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
          />
        )}
      </FormField>
    </div>
  );
}
```

### Loading States

```tsx
import { useState } from 'react';
import { Button } from '@flavia-dev/a11y-ui-kit-react';

export function LoadingButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  async function handleClick() {
    setLoading(true);
    setStatus('Saving...');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('Saved!');
    setLoading(false);
  }

  return (
    <>
      <Button onClick={handleClick} loading={loading}>
        Save
      </Button>
      
      {status && (
        <div role="status" aria-live="polite" style={{ marginTop: '8px' }}>
          {status}
        </div>
      )}
    </>
  );
}
```

---

For more examples, check out our [Storybook documentation](https://your-storybook-url.com).
