import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: 'A styled, accessible label atom that can be used with any form field.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email-input',
  },
  render: (args) => (
    <>
      <Label {...args} />
      <input id="email-input" type="email" style={{ display: 'block', marginTop: '0.5rem' }} />
    </>
  ),
};

export const Required: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password-input',
    required: true,
  },
  render: (args) => (
    <>
      <Label {...args} />
      <input
        id="password-input"
        type="password"
        style={{ display: 'block', marginTop: '0.5rem' }}
      />
    </>
  ),
};

export const WithDisabledInput: Story = {
  args: {
    children: 'Disabled Field',
    htmlFor: 'disabled-input',
  },
  render: (args) => (
    <>
      <Label {...args} />
      <input id="disabled-input" disabled style={{ display: 'block', marginTop: '0.5rem' }} />
    </>
  ),
};

export const Standalone: Story = {
  args: {
    children: 'Just a label',
  },
  render: (args) => <Label {...args} />,
};
