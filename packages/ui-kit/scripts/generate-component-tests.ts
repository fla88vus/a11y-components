#!/usr/bin/env node
/**
 * Script to generate test boilerplate for components with pattern support
 *
 * Usage:
 *   pnpm run generate:tests ComponentName --category=form-control
 *
 * @ts-nocheck - This file generates TSX code as strings
 */
// @ts-nocheck
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse arguments
const componentName = process.argv[2];
const categoryArg = process.argv.find((arg) => arg.startsWith('--category='));
const levelArg = process.argv.find((arg) => arg.startsWith('--level='));

const category = categoryArg?.split('=')[1] || 'interactive';
const level = levelArg?.split('=')[1] || 'atom';

if (!componentName) {
  console.error('❌ Please provide a component name');
  console.log('\n📖 Usage:');
  console.log('  pnpm run generate:tests ComponentName [--category=TYPE] [--level=LEVEL]');
  console.log('\n📂 Categories:');
  console.log('  --category=form-control   Form inputs (Input, Select, Textarea)');
  console.log('  --category=checkable      Checkboxes and Radios');
  console.log('  --category=interactive    Buttons and Links (default)');
  console.log('  --category=display        Static components (Label, Icon)');
  console.log('\n🏗️  Levels:');
  console.log('  --level=atom              Atomic component (default)');
  console.log('  --level=molecule          Molecule component');
  console.log('  --level=organism          Organism component');
  process.exit(1);
}

const levelPath = level === 'atom' ? 'atoms' : level === 'molecule' ? 'molecules' : 'organisms';
const componentPath = path.join(__dirname, `../src/${levelPath}`, componentName);

if (!fs.existsSync(componentPath)) {
  console.error(`❌ Component directory not found: ${componentPath}`);
  process.exit(1);
}

// ====================================
// TEMPLATES BY CATEGORY
// ====================================

// FORM CONTROL TEMPLATE (Input, Select, Textarea)
const formControlTestTemplate = `import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '../../test/test-utils';
import {
  formControlRenderingTests,
  formControlStateTests,
  formControlInteractionTests,
  formControlA11yTests,
} from '../../test/test-categories/form-control.patterns';
import { ${componentName} } from './${componentName}';
import React from 'react';

/**
 * ${componentName} Component Tests
 * Pattern: Form Control (${level.charAt(0).toUpperCase() + level.slice(1)})
 *
 * Tests component behavior using standardized patterns
 */
describe('${componentName} - Component Tests', () => {
  // ========================================
  // RENDERING TESTS (Using Patterns)
  // ========================================
  describe('Rendering', () => {
    it('renders as native input element', () => {
      renderWithProviders(<${componentName} aria-label="Test" />);
      formControlRenderingTests['renders as native input element']('textbox');
    });

    it('forwards ref to HTMLInputElement', () => {
      const ref = React.createRef<HTMLInputElement | null>();
      renderWithProviders(<${componentName} ref={ref} aria-label="Test" />);
      formControlRenderingTests['forwards ref to HTMLInputElement'](ref);
    });

    it('accepts custom className', () => {
      renderWithProviders(<${componentName} className="custom-class" aria-label="Test" />);
      formControlRenderingTests['accepts custom className']('custom-class');
    });

    // TODO: Add size variants test if applicable
    // TODO: Add fullWidth test if applicable
  });

  // ========================================
  // STATE TESTS (Using Patterns)
  // ========================================
  describe('States', () => {
    it('handles disabled state with native attribute', () => {
      renderWithProviders(<${componentName} disabled aria-label="Test" />);
      formControlStateTests['handles disabled state with native attribute']();
    });

    it('supports required attribute', () => {
      renderWithProviders(<${componentName} required aria-required="true" aria-label="Test" />);
      formControlStateTests['supports required attribute']();
    });

    // TODO: Add error state test if applicable
  });

  // ========================================
  // INTERACTION TESTS (Using Patterns)
  // ========================================
  describe('Interactions', () => {
    it('accepts user input', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<${componentName} onChange={handleChange} aria-label="Test" />);
      await formControlInteractionTests['accepts user input'](handleChange, 'Test value');
    });

    it('prevents input when disabled', async () => {
      renderWithProviders(<${componentName} disabled aria-label="Test" />);
      await formControlInteractionTests['prevents input when disabled']();
    });

    // TODO: Add focus/blur tests if needed
  });

  // ========================================
  // COMPONENT-SPECIFIC TESTS
  // ========================================
  describe('${componentName} Specific', () => {
    // TODO: Add tests specific to ${componentName}
    it('TODO: Add component-specific behavior tests', () => {
      // Example: type variations, validation, etc.
    });
  });
});
`;

const formControlA11yTemplate = `import { describe, it, expect, vi } from 'vitest';
import {
  screen,
  userEvent,
  renderWithProviders,
  expectNoA11yViolations,
} from '../../test/test-utils';
import { ${componentName} } from './${componentName}';
import React from 'react';

/**
 * ${componentName} Accessibility Tests
 * Pattern: Form Control (${level.charAt(0).toUpperCase() + level.slice(1)})
 *
 * WCAG 2.1 AA Compliance Tests
 */
describe('${componentName} - Accessibility Tests (WCAG 2.1 AA)', () => {
  // ========================================
  // SECTION 1: AUTOMATED AXE TESTING
  // ========================================
  describe('Automated Accessibility (axe-core)', () => {
    it('has no violations in default state', async () => {
      const { container } = renderWithProviders(<${componentName} aria-label="Test" />);
      await expectNoA11yViolations(container);
    });

    it('has no violations when used with label', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="test-id">Label</label>
          <${componentName} id="test-id" />
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="disabled-id">Disabled</label>
          <${componentName} id="disabled-id" disabled />
        </>
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations in error state', async () => {
      const { container } = renderWithProviders(
        <>
          <label htmlFor="error-id">Field</label>
          <${componentName} id="error-id" aria-invalid="true" aria-describedby="error-msg" />
          <span id="error-msg" role="alert">Error message</span>
        </>
      );
      await expectNoA11yViolations(container);
    });
  });

  // ========================================
  // SECTION 2: SEMANTIC HTML (WCAG 1.3.1, 4.1.2)
  // ========================================
  describe('Semantic HTML & ARIA', () => {
    it('uses native <input> element', () => {
      renderWithProviders(<${componentName} aria-label="Test" />);
      const input = screen.getByRole('textbox');
      expect(input.tagName).toBe('INPUT');
    });

    it('has accessible name from label', () => {
      renderWithProviders(
        <>
          <label htmlFor="test-id">Field Label</label>
          <${componentName} id="test-id" />
        </>
      );
      expect(screen.getByRole('textbox', { name: 'Field Label' })).toBeInTheDocument();
    });

    it('supports aria-invalid for error state', () => {
      renderWithProviders(<${componentName} aria-invalid="true" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('supports aria-required for required fields', () => {
      renderWithProviders(<${componentName} required aria-required="true" aria-label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });
  });

  // ========================================
  // SECTION 3: KEYBOARD NAVIGATION (WCAG 2.1.1)
  // ========================================
  describe('Keyboard Navigation', () => {
    it('is focusable with Tab', async () => {
      const user = userEvent.setup();
      renderWithProviders(<${componentName} aria-label="Test" />);

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('is not focusable when disabled', async () => {
      const user = userEvent.setup();
      renderWithProviders(<${componentName} disabled aria-label="Test" />);

      await user.tab();
      expect(screen.getByRole('textbox')).not.toHaveFocus();
    });
  });

  // ========================================
  // SECTION 4: SCREEN READER SUPPORT
  // ========================================
  describe('Screen Reader Support', () => {
    it('announces error via aria-describedby + role=alert', () => {
      renderWithProviders(
        <>
          <label htmlFor="field-id">Field</label>
          <${componentName} id="field-id" aria-invalid="true" aria-describedby="error-id" />
          <span id="error-id" role="alert">Error message</span>
        </>
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'error-id');
      expect(screen.getByRole('alert')).toHaveTextContent('Error message');
    });
  });
});
`;

// INTERACTIVE TEMPLATE (Button, Link)
const interactiveTestTemplate = `import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '../../test/test-utils';
import {
  interactiveRenderingTests,
  interactiveStateTests,
  interactiveInteractionTests,
  interactiveKeyboardTests,
  interactiveAriaTests,
} from '../../test/test-categories/interactive.patterns';
import { ${componentName} } from './${componentName}';
import React from 'react';

/**
 * ${componentName} Component Tests
 * Pattern: Interactive Control (${level.charAt(0).toUpperCase() + level.slice(1)})
 */
describe('${componentName} - Component Tests', () => {
  describe('Rendering', () => {
    it('renders as semantic element', () => {
      renderWithProviders(<${componentName}>Test</${componentName}>);
      interactiveRenderingTests['renders as semantic element']('button', 'BUTTON');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement | null>();
      renderWithProviders(<${componentName} ref={ref}>Test</${componentName}>);
      interactiveRenderingTests['forwards ref correctly'](ref, 'HTMLButtonElement');
    });

    it('accepts custom className', () => {
      renderWithProviders(<${componentName} className="custom">Test</${componentName}>);
      interactiveRenderingTests['accepts custom className']('button', 'custom');
    });
  });

  describe('States', () => {
    it('handles disabled state with aria-disabled', () => {
      renderWithProviders(<${componentName} disabled>Test</${componentName}>);
      interactiveStateTests['handles disabled state with aria-disabled']();
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      renderWithProviders(<${componentName} onClick={handleClick}>Click</${componentName}>);
      await interactiveInteractionTests['handles click events'](handleClick);
    });

    it('prevents click when disabled', async () => {
      const handleClick = vi.fn();
      renderWithProviders(<${componentName} disabled onClick={handleClick}>Click</${componentName}>);
      await interactiveInteractionTests['prevents click when disabled'](handleClick);
    });
  });

  describe('Keyboard', () => {
    it('is focusable with Tab', async () => {
      renderWithProviders(<${componentName}>Test</${componentName}>);
      await interactiveKeyboardTests['is focusable with Tab']('button');
    });

    it('activates with Enter key', async () => {
      const handleClick = vi.fn();
      renderWithProviders(<${componentName} onClick={handleClick}>Test</${componentName}>);
      await interactiveKeyboardTests['activates with Enter key'](handleClick, 'button');
    });

    it('activates with Space key', async () => {
      const handleClick = vi.fn();
      renderWithProviders(<${componentName} onClick={handleClick}>Test</${componentName}>);
      await interactiveKeyboardTests['activates with Space key'](handleClick);
    });
  });
});
`;

const interactiveA11yTemplate = `import { describe, it, expect, vi } from 'vitest';
import {
  screen,
  userEvent,
  renderWithProviders,
  expectNoA11yViolations,
} from '../../test/test-utils';
import { ${componentName} } from './${componentName}';

describe('${componentName} - Accessibility Tests (WCAG 2.1 AA)', () => {
  describe('Automated Accessibility (axe-core)', () => {
    it('has no violations in default state', async () => {
      const { container } = renderWithProviders(<${componentName}>Test</${componentName}>);
      await expectNoA11yViolations(container);
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(<${componentName} disabled>Test</${componentName}>);
      await expectNoA11yViolations(container);
    });
  });

  describe('Semantic HTML & ARIA', () => {
    it('uses semantic HTML element', () => {
      renderWithProviders(<${componentName}>Test</${componentName}>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has accessible name from children', () => {
      renderWithProviders(<${componentName}>Click me</${componentName}>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('uses aria-disabled (not native disabled)', () => {
      renderWithProviders(<${componentName} disabled>Test</${componentName}>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).not.toBeDisabled(); // Still focusable
    });
  });

  describe('Keyboard Navigation', () => {
    it('remains in tab order when disabled', async () => {
      const user = userEvent.setup();
      renderWithProviders(<${componentName} disabled>Test</${componentName}>);
      
      await user.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });
});
`;

// CHECKABLE TEMPLATE (Checkbox, Radio)
const checkableTestTemplate = `import { describe, it, expect, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '../../test/test-utils';
import {
  checkableRenderingTests,
  checkableStateTests,
  checkableInteractionTests,
} from '../../test/test-categories/checkable.patterns';
import { ${componentName} } from './${componentName}';
import React from 'react';

/**
 * ${componentName} Component Tests
 * Pattern: Checkable Control (${level.charAt(0).toUpperCase() + level.slice(1)})
 */
describe('${componentName} - Component Tests', () => {
  describe('Rendering', () => {
    it('renders with correct role', () => {
      renderWithProviders(<${componentName} label="Test" value="test" />);
      checkableRenderingTests['renders with correct role']('checkbox'); // or 'radio'
    });

    it('has proper label association', () => {
      renderWithProviders(<${componentName} label="Test Label" value="test" />);
      checkableRenderingTests['has proper label association']('Test Label', 'checkbox');
    });
  });

  describe('States', () => {
    it('handles checked state', () => {
      renderWithProviders(<${componentName} label="Test" value="test" checked onChange={() => {}} />);
      checkableStateTests['handles checked state']('checkbox');
    });

    it('handles unchecked state', () => {
      renderWithProviders(<${componentName} label="Test" value="test" />);
      checkableStateTests['handles unchecked state']('checkbox');
    });

    it('handles disabled state', () => {
      renderWithProviders(<${componentName} label="Test" value="test" disabled />);
      checkableStateTests['handles disabled state with native attribute']('checkbox');
    });
  });

  describe('Interactions', () => {
    it('toggles on click', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<${componentName} label="Test" value="test" onChange={handleChange} />);
      await checkableInteractionTests['toggles on click'](handleChange, 'checkbox');
    });

    it('toggles on Space key', async () => {
      const handleChange = vi.fn();
      renderWithProviders(<${componentName} label="Test" value="test" onChange={handleChange} />);
      await checkableInteractionTests['toggles on Space key'](handleChange, 'checkbox');
    });
  });
});
`;

const checkableA11yTemplate = `import { describe, it, expect } from 'vitest';
import {
  screen,
  userEvent,
  renderWithProviders,
  expectNoA11yViolations,
} from '../../test/test-utils';
import { ${componentName} } from './${componentName}';

describe('${componentName} - Accessibility Tests (WCAG 2.1 AA)', () => {
  describe('Automated Accessibility (axe-core)', () => {
    it('has no violations in default state', async () => {
      const { container } = renderWithProviders(<${componentName} label="Test" value="test" />);
      await expectNoA11yViolations(container);
    });

    it('has no violations when checked', async () => {
      const { container } = renderWithProviders(
        <${componentName} label="Test" value="test" checked onChange={() => {}} />
      );
      await expectNoA11yViolations(container);
    });

    it('has no violations when disabled', async () => {
      const { container } = renderWithProviders(<${componentName} label="Test" value="test" disabled />);
      await expectNoA11yViolations(container);
    });
  });

  describe('Semantic HTML & ARIA', () => {
    it('uses native input element', () => {
      renderWithProviders(<${componentName} label="Test" value="test" />);
      const input = screen.getByRole('checkbox');
      expect(input.tagName).toBe('INPUT');
      expect(input).toHaveAttribute('type', 'checkbox');
    });

    it('has proper label association', () => {
      renderWithProviders(<${componentName} label="Test Label" value="test" />);
      expect(screen.getByRole('checkbox', { name: 'Test Label' })).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('is focusable with Tab', async () => {
      const user = userEvent.setup();
      renderWithProviders(<${componentName} label="Test" value="test" />);
      
      await user.tab();
      expect(screen.getByRole('checkbox')).toHaveFocus();
    });
  });
});
`;

// DISPLAY TEMPLATE (Label, Icon, Badge)
const displayTestTemplate = `import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from '../../test/test-utils';
import { ${componentName} } from './${componentName}';
import React from 'react';

/**
 * ${componentName} Component Tests
 * Pattern: Display Component (${level.charAt(0).toUpperCase() + level.slice(1)})
 */
describe('${componentName} - Component Tests', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      renderWithProviders(<${componentName}>Test Content</${componentName}>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('accepts custom className', () => {
      renderWithProviders(<${componentName} className="custom-class">Test</${componentName}>);
      expect(screen.getByText('Test')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement | null>();
      renderWithProviders(<${componentName} ref={ref}>Test</${componentName}>);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  // TODO: Add component-specific tests
  describe('${componentName} Specific', () => {
    it('TODO: Add specific behavior tests', () => {
      // Add tests specific to this component
    });
  });
});
`;

const displayA11yTemplate = `import { describe, it, expect } from 'vitest';
import { renderWithProviders, expectNoA11yViolations } from '../../test/test-utils';
import { ${componentName} } from './${componentName}';

describe('${componentName} - Accessibility Tests (WCAG 2.1 AA)', () => {
  describe('Automated Accessibility (axe-core)', () => {
    it('has no violations in default state', async () => {
      const { container } = renderWithProviders(<${componentName}>Test</${componentName}>);
      await expectNoA11yViolations(container);
    });
  });

  // TODO: Add more accessibility tests if needed
});
`;

// ====================================
// SELECT TEMPLATE BASED ON CATEGORY
// ====================================

let componentTestContent, a11yTestContent;

switch (category) {
  case 'form-control':
    componentTestContent = formControlTestTemplate;
    a11yTestContent = formControlA11yTemplate;
    break;
  case 'interactive':
    componentTestContent = interactiveTestTemplate;
    a11yTestContent = interactiveA11yTemplate;
    break;
  case 'checkable':
    componentTestContent = checkableTestTemplate;
    a11yTestContent = checkableA11yTemplate;
    break;
  case 'display':
    componentTestContent = displayTestTemplate;
    a11yTestContent = displayA11yTemplate;
    break;
  default:
    componentTestContent = interactiveTestTemplate;
    a11yTestContent = interactiveA11yTemplate;
}

// ====================================
// WRITE FILES
// ====================================

const testFilePath = path.join(componentPath, `${componentName}.test.tsx`);
const a11yTestFilePath = path.join(componentPath, `${componentName}.a11y.test.tsx`);

if (fs.existsSync(testFilePath)) {
  console.log(`⚠️  ${componentName}.test.tsx already exists. Skipping...`);
} else {
  fs.writeFileSync(testFilePath, componentTestContent);
  console.log(`✅ Created ${componentName}.test.tsx`);
}

if (fs.existsSync(a11yTestFilePath)) {
  console.log(`⚠️  ${componentName}.a11y.test.tsx already exists. Skipping...`);
} else {
  fs.writeFileSync(a11yTestFilePath, a11yTestContent);
  console.log(`✅ Created ${componentName}.a11y.test.tsx`);
}

console.log('\n🎉 Test files generated successfully!');
console.log(`\n📊 Generated for: ${componentName}`);
console.log(`   Category: ${category}`);
console.log(`   Level: ${level}`);
console.log('\n📝 Next steps:');
console.log('1. Review generated tests and customize for component specifics');
console.log('2. Remove TODO comments and add missing tests');
console.log('3. Run: pnpm test');
console.log('4. Check coverage: pnpm test:coverage\n');
