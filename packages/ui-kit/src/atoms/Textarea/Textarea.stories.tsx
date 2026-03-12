import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import type { TextareaProps } from './Textarea';
import { createSizeStories, createStateStories } from '../../stories/utils/generators';
import { FormField } from '../../molecules';

// ============================================
// 1️⃣ META — configurazione del componente
// ============================================
const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Scrivi qui...',
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ============================================
// 2️⃣ STORIA BASE — il caso più semplice
// ============================================
export const Default: Story = {
  args: {
    placeholder: 'Scrivi qui...',
  },
};

// ============================================
// 3️⃣ SIZE STORIES — Small, Medium, Large
// ============================================
const sizeStories = createSizeStories<TextareaProps>({
  placeholder: 'Scrivi qui...',
  rows: 4,
});

export const Small: Story = sizeStories.Small;
export const Medium: Story = sizeStories.Medium;
export const Large: Story = sizeStories.Large;

// ============================================
// 4️⃣ STATE STORIES — Disabled, Error, ecc.
// ============================================
const stateStories = createStateStories<TextareaProps>(
  // baseArgs — props comuni a tutte le storie di stato
  {
    placeholder: 'Scrivi qui...',
    rows: 4,
  },
  // states — ogni stato con nome e props specifiche
  [
    { name: 'Disabled', props: { disabled: true } },
    { name: 'FullWidth', props: { fullWidth: true } },
    { name: 'WithCounter', props: { showCounter: true, maxLength: 200 } },
    { name: 'ErrorState', props: { 'aria-invalid': true } },
  ]
);

export const Disabled: Story = stateStories.Disabled;
export const FullWidth: Story = stateStories.FullWidth;
export const WithCounter: Story = stateStories.WithCounter;
export const ErrorState: Story = stateStories.ErrorState;

// ============================================
// 5️⃣ COMPOSITION STORY — con FormField
// ============================================
export const WithFormField: Story = {
  render: (args) => (
    <FormField label="Bio" helperText="Descrivi te stesso in poche parole" required>
      {(fieldProps: {
        id: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
        required?: boolean;
      }) => (
        <Textarea
          {...args}
          id={fieldProps.id}
          aria-describedby={fieldProps['aria-describedby']}
          aria-invalid={fieldProps['aria-invalid']}
          required={fieldProps.required}
          rows={4}
          showCounter
          maxLength={200}
          placeholder="Scrivi qui..."
        />
      )}
    </FormField>
  ),
};

export const WithFormFieldError: Story = {
  render: (args) => (
    <FormField label="Bio" error="Il campo è obbligatorio" required>
      {(fieldProps: {
        id: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
        required?: boolean;
      }) => (
        <Textarea
          {...args}
          id={fieldProps.id}
          aria-describedby={fieldProps['aria-describedby']}
          aria-invalid={fieldProps['aria-invalid']}
          required={fieldProps.required}
          rows={4}
          placeholder="Scrivi qui..."
        />
      )}
    </FormField>
  ),
};
