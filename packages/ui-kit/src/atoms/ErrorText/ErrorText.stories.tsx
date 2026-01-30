import type { Meta, StoryObj } from '@storybook/react';
import { ErrorText } from './ErrorText';

const meta = {
  title: 'Atoms/ErrorText',
  component: ErrorText,
  parameters: {
    docs: {
      description: {
        component: 'A styled error text atom with role="alert" for displaying validation errors.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required',
  },
};

export const WithInput: Story = {
  args: {
    children: 'This field is required',
  },
  render: (args) => (
    <div>
      <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>
        Email
      </label>
      <input
        id="email"
        type="email"
        aria-describedby="email-error"
        aria-invalid="true"
        style={{
          display: 'block',
          borderColor: '#dc2626',
        }}
      />
      <ErrorText id="email-error">{args.children}</ErrorText>
    </div>
  ),
};

export const ValidationError: Story = {
  args: {
    children: 'Password must be at least 8 characters',
  },
};

export const CustomError: Story = {
  args: {
    children: 'Username is already taken',
  },
};
