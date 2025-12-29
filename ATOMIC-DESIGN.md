# 🏗️ Atomic Design Structure

This library follows **Brad Frost's Atomic Design** methodology for building scalable, maintainable component systems.

## 📐 Architecture Layers

```
src/
├── atoms/              # Level 1: Base indivisible components
├── molecules/          # Level 2: Combinations of atoms
├── organisms/          # Level 3: Complex feature components
└── templates/          # Level 4: Page layouts
```

---

## ⚛️ ATOMS (Level 1)

**Definition:** The smallest, indivisible UI components. Cannot be broken down further.

**Characteristics:**
- ✅ Single responsibility
- ✅ No dependencies on other components
- ✅ Highly reusable
- ✅ WCAG 2.1 AA compliant

**Current atoms:**
- `Button` - Interactive button with variants
- `Input` - Text input field with validation

**Planned atoms:**
- [ ] `Checkbox` - Checkbox input
- [ ] `Radio` - Radio button
- [ ] `Label` - Form label
- [ ] `Icon` - SVG icon component
- [ ] `Badge` - Status badge
- [ ] `Spinner` - Loading spinner
- [ ] `Text` - Typography component
- [ ] `Switch` - Toggle switch

---

## 🧬 MOLECULES (Level 2)

**Definition:** Simple combinations of atoms working together as a unit.

**Characteristics:**
- ✅ Composed of 2-5 atoms
- ✅ Single, clear purpose
- ✅ Reusable across different contexts

**Planned molecules:**
- [ ] `FormField` - Label + Input + ErrorText + HelperText
- [ ] `SearchBar` - Input + Icon + Button
- [ ] `RadioGroup` - Label + Radio[] + Legend
- [ ] `CheckboxGroup` - Label + Checkbox[] + Legend
- [ ] `Tooltip` - Trigger + Popover content
- [ ] `Alert` - Icon + Text + CloseButton

**Example:**
```tsx
// FormField molecule = Label atom + Input atom + Text atom
<FormField
  label="Email"
  type="email"
  error="Invalid email"
  helperText="We'll never share this"
/>
```

---

## 🦠 ORGANISMS (Level 3)

**Definition:** Complex, context-specific components made of molecules and atoms.

**Characteristics:**
- ✅ Feature-complete sections
- ✅ Business logic integration
- ✅ May manage internal state

**Planned organisms:**
- [ ] `Form` - Complete form with validation
- [ ] `Modal` - Dialog with header, body, footer
- [ ] `Navbar` - Navigation bar with menu items
- [ ] `Card` - Content card with header/footer
- [ ] `Table` - Data table with sorting/filtering
- [ ] `Tabs` - Tabbed interface
- [ ] `Accordion` - Collapsible sections
- [ ] `Dropdown` - Select menu with options

**Example:**
```tsx
// Form organism = multiple FormField molecules + Button atoms
<Form onSubmit={handleSubmit}>
  <FormField label="Name" required />
  <FormField label="Email" type="email" required />
  <Button type="submit">Submit</Button>
</Form>
```

---

## 📄 TEMPLATES (Level 4)

**Definition:** Page-level layouts composed of organisms, molecules, and atoms.

**Characteristics:**
- ✅ Define page structure
- ✅ Responsive layouts
- ✅ Reusable across pages

**Planned templates:**
- [ ] `AuthLayout` - Login/register page layout
- [ ] `DashboardLayout` - Admin dashboard structure
- [ ] `FormLayout` - Multi-step form layout
- [ ] `ErrorLayout` - Error page layout

---

## 🎯 Development Workflow

### 1. **Start with Atoms**
Build the smallest, most reusable pieces first.

```tsx
// src/atoms/Button/Button.tsx
export const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);
```

### 2. **Compose Molecules**
Combine atoms into functional units.

```tsx
// src/molecules/SearchBar/SearchBar.tsx
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export const SearchBar = () => (
  <div>
    <Icon name="search" />
    <Input placeholder="Search..." />
    <Button>Search</Button>
  </div>
);
```

### 3. **Build Organisms**
Create feature-complete sections.

```tsx
// src/organisms/Navbar/Navbar.tsx
import { SearchBar } from '../../molecules/SearchBar';
import { Button } from '../../atoms/Button';

export const Navbar = () => (
  <nav>
    <Logo />
    <SearchBar />
    <Button>Login</Button>
  </nav>
);
```

### 4. **Assemble Templates**
Define page layouts.

```tsx
// src/templates/DashboardLayout/DashboardLayout.tsx
import { Navbar } from '../../organisms/Navbar';

export const DashboardLayout = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);
```

---

## 📦 Import Structure

```tsx
// Import specific atoms
import { Button, Input } from '@flavia-dev/a11y-ui-kit-react';

// Import from specific layer (future)
import { FormField } from '@flavia-dev/a11y-ui-kit-react/molecules';
import { Modal } from '@flavia-dev/a11y-ui-kit-react/organisms';

// Import styles
import '@flavia-dev/a11y-ui-kit-react/styles.css';
```

---

## 🧪 Testing Strategy

Each layer has specific testing needs:

### **Atoms Testing**
- ✅ Unit tests for logic
- ✅ Component tests for rendering
- ✅ Accessibility tests (WCAG)
- ✅ Visual regression tests

### **Molecules Testing**
- ✅ Integration tests
- ✅ Interaction tests
- ✅ Accessibility tests

### **Organisms Testing**
- ✅ Feature tests
- ✅ User flow tests
- ✅ State management tests

---

## 📚 References

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 🚀 Next Steps

1. ✅ Complete core atoms (Checkbox, Radio, Icon)
2. 🔄 Build essential molecules (FormField, SearchBar)
3. ⏳ Create key organisms (Modal, Form, Table)
4. ⏳ Define common templates
