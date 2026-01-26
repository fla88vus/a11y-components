import type { Meta, StoryObj } from '@storybook/react';
import { HelperText } from './HelperText';

const meta = {
  title: 'Atoms/HelperText',
  component: HelperText,
  parameters: {
    docs: {
      description: {
        component:
          'A styled helper text atom for providing additional information about form fields.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is helpful information',
  },
};

export const WithInput: Story = {
  args: {
    children: "We'll never share your email with anyone else",
  },
  render: (args) => (
    <div>
      <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem' }}>
        Email
      </label>
      <input id="email" type="email" aria-describedby="email-helper" style={{ display: 'block' }} />
      <HelperText id="email-helper">{args.children}</HelperText>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    children:
      'This is a longer helper text that provides more detailed information about what the user should enter in the field. It can span multiple lines if needed.',
  },
};
