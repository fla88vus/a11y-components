import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Input label (required for accessibility)",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search", "number"],
      description: "Input type",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Input size",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    helperText: {
      control: "text",
      description: "Helper text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required field",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width input",
    },
    hideLabel: {
      control: "boolean",
      description: "Hide label visually (still accessible)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic variants
export const Default: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
};

export const WithValue: Story = {
  args: {
    label: "Username",
    defaultValue: "john.doe",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    helperText: "Must be at least 8 characters",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    error: "Please enter a valid email address",
    defaultValue: "invalid-email",
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    type: "email",
    required: true,
    helperText: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Email",
    disabled: true,
    defaultValue: "disabled@example.com",
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: "Small Input",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium Input",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    size: "large",
  },
};

// Layout variants
export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    fullWidth: true,
    placeholder: "This input spans the full width",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Search",
    hideLabel: true,
    placeholder: "Search...",
    type: "search",
  },
};

// Type variants
export const EmailInput: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const PasswordInput: Story = {
  args: {
    label: "Password",
    type: "password",
    helperText: "8-20 characters, including letters and numbers",
  },
};

export const TelInput: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "+1 (555) 000-0000",
  },
};

export const URLInput: Story = {
  args: {
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
  },
};

export const SearchInput: Story = {
  args: {
    label: "Search",
    type: "search",
    placeholder: "Search...",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
  },
};

// Combined states
export const RequiredWithError: Story = {
  args: {
    label: "Email",
    type: "email",
    required: true,
    error: "This field is required",
  },
};

export const SmallWithError: Story = {
  args: {
    label: "Username",
    size: "small",
    error: "Username already taken",
    defaultValue: "admin",
  },
};

export const LargeRequired: Story = {
  args: {
    label: "Full Name",
    size: "large",
    required: true,
    helperText: "Enter your first and last name",
  },
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <Input label="Full Name" required placeholder="John Doe" />
      <Input
        label="Email"
        type="email"
        required
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        type="password"
        required
        helperText="At least 8 characters"
      />
      <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
      <Input label="Website" type="url" placeholder="https://example.com" />
    </div>
  ),
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <Input label="Small" size="small" defaultValue="Small input" />
      <Input label="Medium" size="medium" defaultValue="Medium input" />
      <Input label="Large" size="large" defaultValue="Large input" />
    </div>
  ),
};

// State combinations
export const StateShowcase: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <Input label="Default" placeholder="Enter text..." />
      <Input label="With Value" defaultValue="Some text" />
      <Input label="Required" required />
      <Input label="With Helper" helperText="This is helper text" />
      <Input label="With Error" error="Something went wrong" />
      <Input label="Disabled" disabled defaultValue="Cannot edit" />
      <Input label="Full Width" fullWidth placeholder="Full width" />
    </div>
  ),
};
