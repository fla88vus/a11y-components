# Styling

## CSS Modules

Each component uses CSS Modules for scoped styling:

```tsx
import styles from './Button.module.css';
```

## Customization

### CSS Variables
Override default theme variables:

```css
:root {
  --a11y-primary-color: #0066cc;
  --a11y-focus-color: #0052a3;
  --a11y-error-color: #d32f2f;
}
```

### Custom Classes
Add your own classes alongside component classes:

```tsx
<Button className="my-custom-button" variant="primary">
  Click me
</Button>
```

## Best Practices

- Don't override accessibility-critical styles (focus indicators, contrast)
- Test custom styles with keyboard navigation
- Maintain WCAG AA contrast ratios
