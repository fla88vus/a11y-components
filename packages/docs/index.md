---
layout: home

hero:
  name: a11y UI Kit React
  text: Accessible by Design
  tagline: Production-ready React components following WCAG 2.1 AA standards. Build inclusive web applications with confidence.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Components
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/fla88vus/a11y-components

features:
  - icon: ♿
    title: WCAG 2.1 AA Compliant
    details: Every component tested for accessibility with automated tools and manual verification. Screen reader compatible, keyboard navigable.
  
  - icon: 🎯
    title: TypeScript First
    details: Full type safety with comprehensive TypeScript definitions. IntelliSense support for all props and callbacks.
  
  - icon: 🎨
    title: Fully Customizable
    details: Style with CSS Modules, Tailwind, inline styles, or your preferred solution. No CSS-in-JS runtime overhead.
  
  - icon: 🧪
    title: Thoroughly Tested
    details: Unit tests, accessibility tests with jest-axe, E2E tests with Playwright, and visual regression tests.
  
  - icon: 📦
    title: Tree-Shakeable
    details: Import only what you need. Optimized bundle sizes with ES modules and proper side effects configuration.
  
  - icon: ⚡
    title: Zero Runtime CSS-in-JS
    details: CSS Modules for maximum performance. No JavaScript overhead for styling. Fast load times.
  
  - icon: 🏗️
    title: Atomic Design
    details: Built following atomic design principles. Compose atoms into molecules for flexible, maintainable UIs.
  
  - icon: 🌐
    title: Framework Agnostic
    details: Works seamlessly with Next.js, Remix, Vite, Create React App, and any React framework.
---

## Quick Start

Get up and running in minutes:

::: code-group

```bash [npm]
npm install @flavia-dev/a11y-ui-kit-react
```

```bash [yarn]
yarn add @flavia-dev/a11y-ui-kit-react
```

```bash [pnpm]
pnpm add @flavia-dev/a11y-ui-kit-react
```

:::

```tsx
import { Button, FormField, Input } from '@flavia-dev/a11y-ui-kit-react';
import '@flavia-dev/a11y-ui-kit-react/styles.css';

function App() {
  return (
    <form>
      <FormField label="Email" required helperText="We'll never share your email">
        {(props) => <Input {...props} type="email" />}
      </FormField>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
```

## Why This Library?

Building accessible web applications shouldn't be hard. This library provides **battle-tested, accessible components** that work out of the box while giving you complete flexibility to customize them.

### Built for Real Projects

- ✅ Production-ready with comprehensive testing
- ✅ Designed by developers for developers
- ✅ Minimal dependencies (only Lucide React for icons)
- ✅ Regular updates and maintenance
- ✅ Clear documentation with real-world examples

### Accessibility First

Every component is built with accessibility as the **primary concern**, not an afterthought:

- **Semantic HTML**: Uses native elements for maximum compatibility
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space, Arrows)
- **Screen Readers**: Tested with NVDA, JAWS, and VoiceOver
- **ARIA Labels**: Proper labels, roles, and live regions
- **Focus Management**: Visible focus indicators with 3:1 contrast
- **Color Contrast**: Meets WCAG AA requirements (4.5:1 text, 3:1 UI)
- **Touch Targets**: Minimum 44×44px for mobile accessibility

## Component Library

### Atoms (Building Blocks)

Basic, reusable components that can't be broken down further:

- [Button](/components/button) - Accessible buttons with variants and states
- [Input](/components/input) - Text input with validation styling
- [Checkbox](/components/checkbox) - Checkbox with indeterminate state
- [Radio](/components/radio) - Radio buttons for mutually exclusive options
- [Icon](/components/icon) - Accessible icons with Lucide React
- [Label](/components/label) - Form field labels
- [ErrorText](/components/error-text) - Error message display
- [HelperText](/components/helper-text) - Helper text for fields

### Molecules (Combinations)

Combinations of atoms that work together:

- [FormField](/components/form-field) - Complete form field with label, input, error, and helper text

## Browser Support

- **Chrome/Edge**: Last 2 versions
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions
- **Mobile**: iOS Safari, Chrome Android

## What's Next?

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 24px;">
  <a href="/guide/getting-started" style="text-decoration: none; padding: 20px; background: #f6f6f7; border-radius: 8px; display: block;">
    <h3 style="margin-top: 0;">📖 Read the Guide</h3>
    <p style="margin-bottom: 0; color: #666;">Learn the fundamentals and best practices</p>
  </a>
  
  <a href="/components/button" style="text-decoration: none; padding: 20px; background: #f6f6f7; border-radius: 8px; display: block;">
    <h3 style="margin-top: 0;">🧩 Explore Components</h3>
    <p style="margin-bottom: 0; color: #666;">Browse all available components</p>
  </a>
  
  <a href="/examples/full-examples" style="text-decoration: none; padding: 20px; background: #f6f6f7; border-radius: 8px; display: block;">
    <h3 style="margin-top: 0;">💡 View Examples</h3>
    <p style="margin-bottom: 0; color: #666;">See practical usage patterns</p>
  </a>
  
  <a href="https://github.com/fla88vus/a11y-components" style="text-decoration: none; padding: 20px; background: #f6f6f7; border-radius: 8px; display: block;">
    <h3 style="margin-top: 0;">💻 GitHub</h3>
    <p style="margin-bottom: 0; color: #666;">View source code and contribute</p>
  </a>
</div>
