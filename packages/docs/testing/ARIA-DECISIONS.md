# ARIA Implementation Decisions

This document standardizes all ARIA-related architectural decisions for the a11y-components library.

**Last Updated**: February 5, 2026  
**Version**: 1.0.0

---

## 🎯 Core Principles

1. **Semantic HTML First**: Use native elements before ARIA
2. **Progressive Enhancement**: ARIA enhances, not replaces semantics
3. **Consistency by Category**: Same patterns for same component types
4. **Testability**: All ARIA decisions must be testable

---

## 📋 Disabled State Patterns

### Pattern 1: Interactive Controls (Buttons, Links)

**Components**: Button, Link, IconButton

**Decision**: Use `aria-disabled="true"` instead of native `disabled`

**Rationale**:
- ✅ Keeps element in tab order (better for form navigation)
- ✅ Screen readers can still read the element and explain why it's disabled
- ✅ Prevents accidental form submission while maintaining context
- ✅ Users can understand the full UI state

**Implementation**:
```tsx
// Button.tsx
<button 
  aria-disabled={isDisabled}
  onClick={isDisabled ? undefined : onClick}
  onKeyDown={handleKeyDown} // Prevent Enter/Space when disabled
>