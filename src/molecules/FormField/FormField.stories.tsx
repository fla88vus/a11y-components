import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../../atoms/Input';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component:
          'A form field molecule that composes Label, Input, HelperText, and ErrorText atoms with proper ARIA associations. Uses render props pattern for maximum type safety and flexibility.',
      },
    },
  },
  tags: ['autodocs'],
  // Disabilita args controls perché usiamo render props
  argTypes: {
    children: {
      control: false,
      description: 'Render prop function that receives field props',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    children: (props) => <Input type="email" {...props} />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    children: (props) => <Input type="email" {...props} />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    helperText: "We'll never share your email with anyone else",
    children: (props) => <Input type="email" {...props} />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    required: true,
    children: (props) => <Input type="email" error {...props} />,
  },
};

export const WithHelperAndError: Story = {
  args: {
    label: 'Password',
    helperText: 'Must be at least 8 characters',
    error: 'Password is too short',
    required: true,
    children: (props) => <Input type="password" error {...props} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'When both helper text and error are provided, only the error is shown.',
      },
    },
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Search',
    hideLabel: true,
    children: (props) => <Input type="search" placeholder="Search products..." {...props} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Label is visually hidden but still accessible to screen readers.',
      },
    },
  },
};

export const SmallInput: Story = {
  args: {
    label: 'Username',
    children: (props) => <Input size="small" {...props} />,
  },
};

export const LargeInput: Story = {
  args: {
    label: 'Title',
    children: (props) => <Input size="large" {...props} />,
  },
};

export const FullWidthInput: Story = {
  args: {
    label: 'Description',
    children: (props) => <Input fullWidth {...props} />,
  },
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    helperText: 'Select your country',
    children: (props) => (
      <select
        {...props}
        style={{
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: '1px solid #6b7280',
          fontSize: '1rem',
        }}
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>
    ),
  },
};

export const WithTextarea: Story = {
  args: {
    label: 'Message',
    helperText: 'Maximum 500 characters',
    children: (props) => (
      <textarea
        {...props}
        rows={4}
        style={{
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: '1px solid #6b7280',
          fontFamily: 'inherit',
          fontSize: '1rem',
          width: '100%',
        }}
      />
    ),
  },
};

export const DisabledField: Story = {
  args: {
    label: 'Disabled Field',
    helperText: 'This field is disabled',
    children: (props) => <Input disabled value="Cannot edit" {...props} />,
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    helperText: 'Must contain at least 8 characters, 1 uppercase, 1 number',
    required: true,
    children: (props) => <Input type="password" {...props} />,
  },
};

export const EmailValidation: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    required: true,
    children: (props) => <Input type="email" error {...props} />,
  },
};

export const WithCustomProps: Story = {
  args: {
    label: 'Email',
    helperText: 'Enter your work email',
    children: (props) => (
      <Input type="email" placeholder="email@company.com" autoComplete="email" {...props} />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'You can add custom props like placeholder and autoComplete. Spread {...props} after your custom props to ensure ARIA attributes are applied.',
      },
    },
  },
};

// Multiple fields in a form - usa render per composizione complessa
export const FormExample: Story = {
  args: {
    // Args fittizi per soddisfare TypeScript
    label: 'Form Example',
    children: (props) => <Input {...props} />,
  },
  render: () => (
    <form style={{ maxWidth: '400px' }}>
      <FormField label="First Name" required>
        {(props) => <Input type="text" {...props} />}
      </FormField>

      <FormField label="Last Name" required>
        {(props) => <Input type="text" {...props} />}
      </FormField>

      <FormField label="Email" helperText="We'll never share your email" required>
        {(props) => <Input type="email" {...props} />}
      </FormField>

      <FormField label="Password" helperText="Must be at least 8 characters" required>
        {(props) => <Input type="password" {...props} />}
      </FormField>

      <FormField label="Country">
        {(props) => (
          <select
            {...props}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #6b7280',
            }}
          >
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
          </select>
        )}
      </FormField>

      <button
        type="submit"
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  ),
};
