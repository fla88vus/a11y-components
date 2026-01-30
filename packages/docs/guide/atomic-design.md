# Atomic Design

This library follows the Atomic Design methodology for component organization.

## Structure

### Atoms
Basic building blocks:
- Button, Input, Checkbox, Radio
- Label, ErrorText, HelperText
- Icon

### Molecules
Simple combinations of atoms:
- FormField (combines Label, Input, ErrorText, HelperText)

### Organisms
Complex UI sections (coming soon):
- Form, Modal, Navigation

## Benefits

- **Reusability**: Atoms can be used independently or composed
- **Consistency**: Shared design tokens and patterns
- **Maintainability**: Clear component hierarchy
- **Scalability**: Easy to add new components

## Learn More

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
