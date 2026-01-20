/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Radio Button

Componente Radio accessibile che segue le linee guida WCAG 2.1 AA/AAA e ARIA Authoring Practices.

## Caratteristiche

- **WCAG 2.1 AA/AAA compliant**
- **Accessibile da tastiera** (Space per selezionare)
- **Screen reader friendly** con ARIA attributes
- **Mutual exclusivity** automatica per radio con stesso \`name\`
- **Form integration** con \`name\` e \`value\`
- **Stati di validazione** (error, required, disabled)
- **Helper text** per guidare l'utente
- **3 dimensioni** (small, medium, large)
- **Ref forwarding** per accesso diretto all'input

## Quando usare

- Selezione **mutualmente esclusiva** tra 2-7 opzioni
- Quando l'utente deve vedere tutte le opzioni disponibili
- Per scelte importanti che meritano maggiore visibilità rispetto a un select

## Quando NON usare

- Più di 7 opzioni → usa Select/Dropdown
- Selezione multipla → usa Checkbox
- Toggle on/off singolo → usa Switch o Checkbox
- Scelta binaria semplice → considera Button group

## Pattern ARIA

Usa native \`<input type="radio">\` enhanced con:
- \`name\` per raggruppamento logico
- \`value\` univoco per ogni opzione
- \`aria-describedby\` per errori/helper
- \`aria-invalid\` per validazione
- \`aria-required\` per campi obbligatori

Per navigazione con frecce direzionali, avvolgere i radio in \`<RadioGroup>\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Etichetta visibile del radio button',
    },
    name: {
      control: 'text',
      description: 'Nome del gruppo radio (necessario per mutual exclusivity)',
    },
    value: {
      control: 'text',
      description: 'Valore univoco inviato nel form',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Dimensione del radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabilita il radio button',
    },
    required: {
      control: 'boolean',
      description: 'Marca il campo come obbligatorio',
    },
    error: {
      control: 'text',
      description: 'Messaggio di errore da visualizzare',
    },
    helperText: {
      control: 'text',
      description: 'Testo di aiuto sotto il radio',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Stato checked iniziale (uncontrolled)',
    },
    checked: {
      control: 'boolean',
      description: 'Stato checked (controlled - richiede onChange)',
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'story-default',
    value: 'basic',
    label: 'Basic Plan',
  },
};

export const Checked: Story = {
  name: 'Checked',
  args: {
    name: 'story-checked',
    value: 'basic',
    label: 'Basic Plan',
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radio button selezionato. Una volta selezionato, non può essere deselezionato cliccandolo di nuovo.',
      },
    },
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    name: 'story-disabled',
    value: 'basic',
    label: 'Basic Plan',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button disabilitato. Non può essere selezionato o modificato dall'utente.",
      },
    },
  },
};

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: {
    name: 'story-disabled-checked',
    value: 'basic',
    label: 'Basic Plan',
    disabled: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radio button disabilitato e già selezionato. Utile per mostrare selezioni pre-impostate non modificabili.',
      },
    },
  },
};

export const Required: Story = {
  name: 'Required',
  args: {
    name: 'story-required',
    value: 'basic',
    label: 'Basic Plan',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Radio button obbligatorio, indicato dall'asterisco rosso (*) e dall'attributo `aria-required`.",
      },
    },
  },
};

export const WithError: Story = {
  name: 'With Error',
  args: {
    name: 'story-error',
    value: 'basic',
    label: 'Basic Plan',
    error: 'Please select a subscription plan',
  },
  parameters: {
    docs: {
      description: {
        story:
          "Radio button con messaggio di errore. Usa `aria-invalid` e `role='alert'` per screen reader.",
      },
    },
  },
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    name: 'story-helper',
    value: 'basic',
    label: 'Basic Plan',
    helperText: 'Perfect for individuals and small projects',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button con testo di aiuto contestuale. Collegato via `aria-describedby`.',
      },
    },
  },
};

export const RequiredWithError: Story = {
  name: 'Required + Error',
  args: {
    name: 'story-required-error',
    value: 'basic',
    label: 'Basic Plan',
    required: true,
    error: 'This field is required',
  },
  parameters: {
    docs: {
      description: {
        story: 'Campo obbligatorio con errore di validazione.',
      },
    },
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  args: {
    name: 'size-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio name="size-demo" value="small" label="Small" size="small" />
      <Radio name="size-demo" value="medium" label="Medium" size="medium" />
      <Radio name="size-demo" value="large" label="Large" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Le tre dimensioni disponibili: small (1rem), medium (1.25rem - default), large (1.5rem).',
      },
    },
  },
};

export const SmallSize: Story = {
  name: 'Small',
  args: {
    name: 'story-small',
    value: 'basic',
    label: 'Basic Plan',
    size: 'small',
  },
};

export const MediumSize: Story = {
  name: 'Medium (Default)',
  args: {
    name: 'story-medium',
    value: 'basic',
    label: 'Basic Plan',
    size: 'medium',
  },
};

export const LargeSize: Story = {
  name: 'Large',
  args: {
    name: 'story-large',
    value: 'basic',
    label: 'Basic Plan',
    size: 'large',
  },
};

export const RadioGroupDemo: Story = {
  name: 'Radio Group (Mutual Exclusivity)',
  args: {
    name: 'group-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => {
    const [selected, setSelected] = useState('basic');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Choose a subscription plan</h3>
        <Radio
          name="plan"
          value="basic"
          label="Basic"
          checked={selected === 'basic'}
          onChange={(e) => setSelected(e.target.value)}
          helperText="Free forever"
        />
        <Radio
          name="plan"
          value="pro"
          label="Pro"
          checked={selected === 'pro'}
          onChange={(e) => setSelected(e.target.value)}
          helperText="$19/month - Most popular"
        />
        <Radio
          name="plan"
          value="enterprise"
          label="Enterprise"
          checked={selected === 'enterprise'}
          onChange={(e) => setSelected(e.target.value)}
          helperText="Custom pricing"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          <strong>Selected:</strong> {selected}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons con lo stesso `name` sono **mutualmente esclusivi**: selezionandone uno, gli altri si deselezionano automaticamente. ' +
          'Ogni radio è navigabile con Tab, Space seleziona il radio corrente. Per navigazione con frecce direzionali, usa il componente `RadioGroup`.',
      },
    },
  },
};

export const MultipleGroups: Story = {
  name: 'Multiple Independent Groups',
  args: {
    name: 'multiple-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Plan</h3>
        <Radio name="plan" value="basic" label="Basic" checked />
        <Radio name="plan" value="pro" label="Pro" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Billing</h3>
        <Radio name="billing" value="monthly" label="Monthly" checked />
        <Radio name="billing" value="yearly" label="Yearly" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Radio buttons con `name` diversi sono **indipendenti**: possono essere selezionati contemporaneamente.',
      },
    },
  },
};

export const RadioGroupWithValidation: Story = {
  name: 'Radio Group + Validation',
  args: {
    name: 'validation-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => {
    const [selected, setSelected] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = () => {
      if (!selected) {
        setError('Please select a plan to continue');
      } else {
        setError('');
        alert(`Selected: ${selected}`);
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '400px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
          Choose a plan <span style={{ color: '#d32f2f' }}>*</span>
        </h3>
        <Radio
          name="plan"
          value="basic"
          label="Basic - Free"
          checked={selected === 'basic'}
          onChange={(e) => {
            setSelected(e.target.value);
            setError('');
          }}
          error={error}
          required
        />
        <Radio
          name="plan"
          value="pro"
          label="Pro - $19/month"
          checked={selected === 'pro'}
          onChange={(e) => {
            setSelected(e.target.value);
            setError('');
          }}
          error={error}
          required
        />
        <Radio
          name="plan"
          value="enterprise"
          label="Enterprise - Custom"
          checked={selected === 'enterprise'}
          onChange={(e) => {
            setSelected(e.target.value);
            setError('');
          }}
          error={error}
          required
        />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Continue
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Gruppo di radio con validazione form. Mostra errore se nessuna opzione è selezionata.',
      },
    },
  },
};

export const SubscriptionPlanSelector: Story = {
  name: 'Subscription Plan Selector',
  args: {
    name: 'subscription-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => {
    const [plan, setPlan] = useState('pro');

    const plans = [
      {
        value: 'free',
        name: 'Free',
        price: '$0',
        features: 'Basic features, 1 user, Community support',
      },
      {
        value: 'pro',
        name: 'Pro',
        price: '$19/month',
        features: 'Advanced features, 10 users, Priority support',
      },
      {
        value: 'enterprise',
        name: 'Enterprise',
        price: 'Custom',
        features: 'All features, Unlimited users, Dedicated support',
      },
    ];

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Select your plan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {plans.map((p) => (
            <div
              key={p.value}
              style={{
                padding: '1rem',
                border: `2px solid ${plan === p.value ? '#1976d2' : '#e0e0e0'}`,
                borderRadius: '8px',
                background: plan === p.value ? '#f0f7ff' : 'white',
                cursor: 'pointer',
              }}
              onClick={() => setPlan(p.value)}
            >
              <Radio
                name="subscription"
                value={p.value}
                label={`${p.name} - ${p.price}`}
                helperText={p.features}
                checked={plan === p.value}
                onChange={(e) => setPlan(e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Esempio reale: selettore di piani di abbonamento con card cliccabili.',
      },
    },
  },
};

export const ShippingMethodSelector: Story = {
  name: 'Shipping Method Selector',
  args: {
    name: 'shipping-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => {
    const [method, setMethod] = useState('standard');

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          Shipping Method <span style={{ color: '#d32f2f' }}>*</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Radio
            name="shipping"
            value="standard"
            label="Standard Shipping"
            helperText="5-7 business days • Free"
            checked={method === 'standard'}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
          <Radio
            name="shipping"
            value="express"
            label="Express Shipping"
            helperText="2-3 business days • $9.99"
            checked={method === 'express'}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
          <Radio
            name="shipping"
            value="overnight"
            label="Overnight Shipping"
            helperText="Next business day • $24.99"
            checked={method === 'overnight'}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
          <Radio
            name="shipping"
            value="pickup"
            label="Store Pickup"
            helperText="Ready in 2 hours • Free"
            checked={method === 'pickup'}
            onChange={(e) => setMethod(e.target.value)}
            required
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Esempio reale: selettore metodo di spedizione in un checkout e-commerce.',
      },
    },
  },
};

export const PaymentMethodSelector: Story = {
  name: 'Payment Method Selector',
  args: {
    name: 'payment-demo',
    value: 'demo',
    label: 'Demo',
  },
  render: () => {
    const [payment, setPayment] = useState('');

    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginBottom: '1rem' }}>
          Payment Method <span style={{ color: '#d32f2f' }}>*</span>
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Radio
            name="payment"
            value="card"
            label="💳 Credit/Debit Card"
            helperText="Visa, Mastercard, Amex accepted"
            checked={payment === 'card'}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
          <Radio
            name="payment"
            value="paypal"
            label="🅿️ PayPal"
            helperText="Fast and secure payment"
            checked={payment === 'paypal'}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
          <Radio
            name="payment"
            value="bank"
            label="🏦 Bank Transfer"
            helperText="Processing may take 2-3 days"
            checked={payment === 'bank'}
            onChange={(e) => setPayment(e.target.value)}
            required
          />
          <Radio
            name="payment"
            value="crypto"
            label="₿ Cryptocurrency"
            disabled
            helperText="Coming soon"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Esempio reale: selettore metodo di pagamento con un'opzione disabilitata.",
      },
    },
  },
};
