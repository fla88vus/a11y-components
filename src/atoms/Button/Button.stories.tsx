import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
      description: "Button visual style",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state (uses aria-disabled)",
    },
    loading: {
      control: "boolean",
      description: "Loading state with spinner",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width button",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Primary variant stories
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

// Size variants
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "large",
  },
};

// State variants
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading Button",
    loading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

// Combined states
export const PrimarySmall: Story = {
  args: {
    children: "Small Primary",
    variant: "primary",
    size: "small",
  },
};

export const DangerLarge: Story = {
  args: {
    children: "Large Danger",
    variant: "danger",
    size: "large",
  },
};

export const LoadingDisabled: Story = {
  args: {
    children: "Loading Disabled",
    loading: true,
    disabled: true,
  },
};

// Icon button example
export const IconButton: Story = {
  args: {
    children: "×",
    variant: "secondary",
    size: "small",
    "aria-label": "Close dialog",
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  ),
};
