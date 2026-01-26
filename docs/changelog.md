# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-26

### Added
- **FormField molecule**: Complete form field component with integrated label, error, and helper text
- **Radio atom**: Radio button component with full accessibility support
- **Icon atom**: Icon component powered by Lucide React with semantic variants
- **Label atom**: Reusable label component for form fields
- **ErrorText atom**: Accessible error message component
- **HelperText atom**: Helper text component for additional field context
- End-to-end tests using Playwright for all components
- Visual regression testing for UI consistency
- Comprehensive accessibility test coverage with jest-axe
- FormField render prop pattern for flexible field composition

### Changed
- Improved keyboard navigation patterns across all components
- Enhanced screen reader support with better ARIA labels
- Updated Button component with better loading state announcements
- Refined Input component error state styling

### Fixed
- Color contrast issues in focus indicators
- Tab order in complex form layouts
- Screen reader announcements for dynamic content

### Technical
- Full TypeScript type exports for all components
- CSS Modules for scoped component styling
- Tree-shaking support for optimal bundle sizes
- ESM and CommonJS build outputs

## [0.1.0] - 2025-12-15

### Added
- **Button atom**: Accessible button with three variants (primary, secondary, danger)
- **Input atom**: Text input field with validation states
- **Checkbox atom**: Checkbox with indeterminate state support
- Initial project setup with Vite
- Vitest for unit testing
- jest-axe for accessibility validation
- Storybook for component documentation
- TypeScript configuration
- ESLint and Prettier setup
