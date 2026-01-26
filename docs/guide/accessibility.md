# Accessibility

All components follow WCAG 2.1 AA standards and are tested with automated and manual accessibility tools.

## Key Features

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order
- Focus indicators meet contrast requirements

### Screen Reader Support
- Semantic HTML elements
- Proper ARIA labels and roles
- Live region announcements for dynamic content

### Color Contrast
- All text meets WCAG AA contrast ratios (4.5:1)
- Focus indicators have 3:1 contrast

### Error Handling
- Clear error messages
- Associated with form fields via `aria-describedby`
- Visual and programmatic error states

## Testing

We use multiple tools to ensure accessibility:
- **jest-axe**: Automated accessibility testing
- **Playwright**: End-to-end keyboard and screen reader testing
- **Manual testing**: With NVDA, JAWS, and VoiceOver

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
