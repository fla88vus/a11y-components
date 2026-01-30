import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Label } from '../Label';
import { HelperText } from '../HelperText';
import { ErrorText } from '../ErrorText';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'A styled, accessible input atom. Pure HTML input with styling - no label, error, or helper text. Compose with other atoms for full form fields.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'search', 'number'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic standalone usage
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithPlaceholder: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large input',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    placeholder: 'Invalid input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit',
  },
};

// Composition examples
export const WithLabel: Story = {
  render: () => (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" aria-describedby="email-helper" />
      <HelperText id="email-helper">We'll never share your email</HelperText>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div>
      <Label htmlFor="email" required>
        Email
      </Label>
      <Input id="email" type="email" error aria-invalid="true" aria-describedby="email-error" />
      <ErrorText id="email-error">Please enter a valid email address</ErrorText>
    </div>
  ),
};

export const CompleteField: Story = {
  render: () => (
    <div>
      <Label htmlFor="password" required>
        Password
      </Label>
      <Input
        id="password"
        type="password"
        aria-describedby="password-helper password-error"
        aria-invalid="true"
        error
      />
      <HelperText id="password-helper">Must be at least 8 characters</HelperText>
      <ErrorText id="password-error">Password is too short</ErrorText>
    </div>
  ),
};

// Different input types
export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
  },
};

// Labelless (with aria-label for accessibility)
export const LabellessWithAriaLabel: Story = {
  args: {
    type: 'search',
    placeholder: 'Search products...',
    'aria-label': 'Search products',
  },
};
