import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Check,
  X,
  AlertCircle,
  AlertTriangle,
  Info,
  Search,
  Home,
  Settings,
  User,
  Mail,
  Bell,
  Calendar,
  Clock,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Heart,
  Star,
  Share2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Menu,
  MoreVertical,
  Filter,
  Save,
  Send,
  File,
  Folder,
  Image,
  Video,
  Music,
  Mic,
  Camera,
  Phone,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  Package,
  TrendingUp,
  BarChart,
  PieChart,
  MapPin,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  Bluetooth,
  Printer,
  Monitor,
  Smartphone,
  Laptop,
  HardDrive,
} from 'lucide-react';
import { Icon } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Icon

Accessible WCAG 2.1 AA/AAA wrapper component for Lucide React icons.

## Features

- **WCAG 2.1 AA/AAA compliant** - Semantic vs decorative management
- **Lucide React integration** - 1000+ open-source icons
- **Accessible** - aria-label for semantic icons, aria-hidden for decorative
- **Not focusable** - \`focusable="false"\` prevents focus traps
- **Responsive** - Standardized sizes (16px-32px)
- **Customizable** - Customizable colors (currentColor default)

## When to use

### Semantic Icons (provide aria-label)
- **Standalone:** Icon without text, conveys meaning
- **Status indicators:** Success/error/warning
- **Navigation icons:** When icon is the primary identifier

### Decorative Icons (omit aria-label or decorative={true})
- **With visible text:** Icon + text label
- **In labeled buttons:** Button has aria-label, icon is visual enhancement
- **Pure decoration:** Doesn't convey additional information

## When NOT to use

- **Icons as only way to convey information** - Always provide alternative text
- **Icons too small** - Minimum 16px for visibility
- **Color only for meaning** - Use different shape + color (e.g. red X vs green Check)

### Implemented WCAG Patterns

- **1.1.1 Non-text Content (Level A)** - \`aria-label\` for semantic icons, \`aria-hidden\` for decorative
- **1.4.1 Use of Color (Level A)** - Not color only (icons have different shapes)
- **1.4.11 Non-text Contrast (Level AA)** - 3:1 contrast for UI (currentColor inherits)
- **4.1.2 Name, Role, Value (Level A)** - \`role="img"\` + accessible name for semantic

### Correct Patterns

**Semantic Icon (standalone):**
${'```'}tsx
<Icon icon={AlertCircle} aria-label="Critical error" color="red" />
// Screen reader: "Critical error, image"
${'```'}

**Decorative Icon (with text):**
${'```'}tsx
<button>
  <Icon icon={Search} decorative />
  <span>Search</span>
</button>
// Screen reader: "Search, button" (icon ignored)
${'```'}

**Icon-only Button:**
${'```'}tsx
<button aria-label="Close window">
  <Icon icon={X} decorative />
</button>
// Screen reader: "Close window, button"
${'```'}

### Screen Reader

Screen reader announces:
- **Semantic:** "[aria-label], image"
- **Decorative:** (silence, completely ignored)

## Variants

- **Sizes:** small (16px), medium (20px), large (24px), xlarge (32px)
- **Colors:** currentColor (default), custom CSS color
- **Mode:** semantic (\`aria-label\`), decorative (\`decorative={true}\`)

## Icon Library

Uses [Lucide React](https://lucide.dev/icons) - 1000+ open-source icons:
- **Import:** \`import { IconName } from 'lucide-react';\`
- **Tree-shakeable:** Only used icons are bundled
- **Consistent:** Uniform design, stroke weight 2

## 🔗 Useful Links

- [Lucide Icons Gallery](https://lucide.dev/icons)
- [WAI-ARIA: Using Images](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6)
- [WCAG 1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Lucide icon component to render',
      table: {
        type: { summary: 'LucideIcon' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: 'Icon size',
      table: {
        type: { summary: "'small' | 'medium' | 'large' | 'xlarge'" },
        defaultValue: { summary: "'medium'" },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for semantic icons. If omitted, icon is decorative.',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'color',
      description: 'Icon color (CSS color value)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'currentColor'" },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'If true, icon is decorative (aria-hidden="true")',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false if aria-label, true otherwise' },
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Check,
    'aria-label': 'Completed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Semantic icon with aria-label. Screen reader announces "Completed, image".',
      },
    },
  },
};

export const Decorative: Story = {
  args: {
    icon: Check,
    decorative: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Decorative icon with aria-hidden="true". Ignored by screen readers.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    icon: Check,
    'aria-label': 'Check',
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size - 16px. Use for inline icons in text.',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    icon: Check,
    'aria-label': 'Check',
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size (default) - 20px. General use.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    icon: Check,
    'aria-label': 'Check',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size - 24px. Use for prominent icons.',
      },
    },
  },
};

export const XLarge: Story = {
  args: {
    icon: Check,
    'aria-label': 'Check',
    size: 'xlarge',
  },
  parameters: {
    docs: {
      description: {
        story: 'XLarge size - 32px. Use for hero icons.',
      },
    },
  },
};

export const AllSizes: Story = {
  args: {
    icon: Check,
  },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={Check} aria-label="Small check" size="small" />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Small (16px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={Check} aria-label="Medium check" size="medium" />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Medium (20px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={Check} aria-label="Large check" size="large" />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Large (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon icon={Check} aria-label="XLarge check" size="xlarge" />
        <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>XLarge (32px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of all available sizes.',
      },
    },
  },
};

export const CustomColor: Story = {
  args: {
    icon: AlertCircle,
    'aria-label': 'Warning',
    color: '#ef4444',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon with custom color (hex, rgb, named colors).',
      },
    },
  },
};

export const CurrentColor: Story = {
  args: {
    icon: Info,
  },
  render: () => (
    <div style={{ color: '#3b82f6', fontSize: '1.5rem' }}>
      <Icon icon={Info} aria-label="Info" color="currentColor" />
      <span style={{ marginLeft: '0.5rem' }}>Inherits color from parent</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'currentColor (default) - icon inherits color from parent element.',
      },
    },
  },
};

export const ColoredIcons: Story = {
  args: {
    icon: Check,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Icon icon={AlertCircle} aria-label="Error" color="#ef4444" size="large" />
      <Icon icon={AlertTriangle} aria-label="Warning" color="#f59e0b" size="large" />
      <Icon icon={Info} aria-label="Information" color="#3b82f6" size="large" />
      <Icon icon={Check} aria-label="Success" color="#10b981" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Colored icons for states: error (red), warning (orange), info (blue), success (green).',
      },
    },
  },
};

export const SemanticStandalone: Story = {
  args: {
    icon: AlertCircle,
  },
  render: () => (
    <div
      style={{
        padding: '1rem',
        border: '2px solid #ef4444',
        borderRadius: '0.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <Icon icon={AlertCircle} aria-label="Critical error" color="#ef4444" size="large" />
      <div>
        <p style={{ fontWeight: 'bold', margin: 0 }}>An error occurred</p>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
          Unable to complete operation
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Standalone semantic icon - conveys critical meaning, has aria-label.',
      },
    },
  },
};

export const IconWithText: Story = {
  args: {
    icon: Search,
  },
  render: () => (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        fontSize: '1rem',
      }}
    >
      <Icon icon={Search} decorative size="small" />
      <span>Search</span>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Decorative icon with text - text provides label, icon is visual enhancement.',
      },
    },
  },
};

export const IconOnlyButton: Story = {
  args: {
    icon: X,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        aria-label="Close"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: 'transparent',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        <Icon icon={X} decorative />
      </button>

      <button
        aria-label="Edit"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: 'transparent',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        <Icon icon={Edit} decorative />
      </button>

      <button
        aria-label="Delete"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
      >
        <Icon icon={Trash2} decorative />
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons - button has aria-label, icon is decorative. Accessible pattern.',
      },
    },
  },
};

export const NavigationMenu: Story = {
  args: {
    icon: Home,
  },
  render: () => (
    <nav
      style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
        borderRadius: '0.5rem',
      }}
    >
      <a
        href="#home"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          color: '#111827',
          textDecoration: 'none',
          borderRadius: '0.375rem',
          backgroundColor: 'white',
        }}
      >
        <Icon icon={Home} decorative />
        <span>Home</span>
      </a>

      <a
        href="#settings"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          color: '#111827',
          textDecoration: 'none',
          borderRadius: '0.375rem',
        }}
      >
        <Icon icon={Settings} decorative />
        <span>Impostazioni</span>
      </a>

      <a
        href="#profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          color: '#111827',
          textDecoration: 'none',
          borderRadius: '0.375rem',
        }}
      >
        <Icon icon={User} decorative />
        <span>Profilo</span>
      </a>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation menu - decorative icons, visible text provides label.',
      },
    },
  },
};

export const StatusIndicators: Story = {
  args: {
    icon: Check,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Icon icon={Check} aria-label="Completed" color="#10b981" size="large" />
        <span>Operation completed successfully</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Icon icon={AlertTriangle} aria-label="Warning" color="#f59e0b" size="large" />
        <span>Warning: verify the entered data</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Icon icon={AlertCircle} aria-label="Error" color="#ef4444" size="large" />
        <span>Error: unable to save changes</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Icon icon={Info} aria-label="Information" color="#3b82f6" size="large" />
        <span>Info: this operation may take some time</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status indicators - semantic icons with aria-label describe the state.',
      },
    },
  },
};

// ===================================
// ICON GALLERY
// ===================================

export const CommonIcons: Story = {
  args: {
    icon: Star,
  },
  render: () => {
    const iconGroups = {
      Azioni: [
        { icon: Check, name: 'Check' },
        { icon: X, name: 'X' },
        { icon: Plus, name: 'Plus' },
        { icon: Minus, name: 'Minus' },
        { icon: Edit, name: 'Edit' },
        { icon: Trash2, name: 'Trash' },
        { icon: Save, name: 'Save' },
        { icon: Send, name: 'Send' },
      ],
      Navigation: [
        { icon: ChevronLeft, name: 'ChevronLeft' },
        { icon: ChevronRight, name: 'ChevronRight' },
        { icon: ChevronUp, name: 'ChevronUp' },
        { icon: ChevronDown, name: 'ChevronDown' },
        { icon: Home, name: 'Home' },
        { icon: Menu, name: 'Menu' },
        { icon: MoreVertical, name: 'More' },
      ],
      'Status & Alerts': [
        { icon: AlertCircle, name: 'Error' },
        { icon: AlertTriangle, name: 'Warning' },
        { icon: Info, name: 'Info' },
        { icon: Bell, name: 'Bell' },
      ],
      Interfaccia: [
        { icon: Search, name: 'Search' },
        { icon: Filter, name: 'Filter' },
        { icon: Settings, name: 'Settings' },
        { icon: User, name: 'User' },
        { icon: Eye, name: 'Eye' },
        { icon: EyeOff, name: 'EyeOff' },
        { icon: Lock, name: 'Lock' },
        { icon: Unlock, name: 'Unlock' },
      ],
      'Files & Media': [
        { icon: File, name: 'File' },
        { icon: Folder, name: 'Folder' },
        { icon: Image, name: 'Image' },
        { icon: Video, name: 'Video' },
        { icon: Music, name: 'Music' },
        { icon: Download, name: 'Download' },
        { icon: Upload, name: 'Upload' },
      ],
      Comunicazione: [
        { icon: Mail, name: 'Mail' },
        { icon: MessageSquare, name: 'Message' },
        { icon: Phone, name: 'Phone' },
        { icon: Mic, name: 'Mic' },
        { icon: Camera, name: 'Camera' },
        { icon: Share2, name: 'Share' },
      ],
      Business: [
        { icon: ShoppingCart, name: 'Cart' },
        { icon: CreditCard, name: 'Card' },
        { icon: Package, name: 'Package' },
        { icon: TrendingUp, name: 'Trending' },
        { icon: BarChart, name: 'Chart' },
        { icon: PieChart, name: 'Pie' },
      ],
      Preferenze: [
        { icon: Heart, name: 'Heart' },
        { icon: Star, name: 'Star' },
        { icon: Calendar, name: 'Calendar' },
        { icon: Clock, name: 'Clock' },
      ],
    };

    return (
      <div style={{ maxWidth: '1200px' }}>
        {Object.entries(iconGroups).map(([category, icons]) => (
          <div key={category} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
              {category}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: '1rem',
              }}
            >
              {icons.map(({ icon: IconComponent, name }) => (
                <div
                  key={name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                  }}
                  title={`import { ${name} } from 'lucide-react'`}
                >
                  <Icon icon={IconComponent} decorative size="large" />
                  <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <p style={{ margin: 0 }}>
            💡 <strong>Tip:</strong> Visita{' '}
            <a
              href="https://lucide.dev/icons"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3b82f6' }}
            >
              lucide.dev/icons
            </a>{' '}
            per la gallery completa di 1000+ icone.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Gallery of the most common Lucide icons. Each icon can be imported from \`lucide-react\`.

**Example import:**
${'```'}tsx
import { Search, Settings, User } from 'lucide-react';
import { Icon } from '@/components/atoms/Icon';

<Icon icon={Search} aria-label="Search" />
${'```'}
        `,
      },
    },
  },
};

// ===================================
// ACCESSIBILITY SHOWCASE
// ===================================

export const AccessibilityShowcase: Story = {
  args: {
    icon: Check,
  },
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h3>Pattern Accessibilità</h3>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
        Esempi di uso corretto per WCAG 2.1 AA compliance
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Pattern 1 */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Icona Semantica Standalone</h4>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
            }}
          >
            <Icon
              icon={AlertCircle}
              aria-label="Critical system error"
              color="#dc2626"
              size="large"
            />
            <div>
              <p style={{ margin: 0, fontWeight: '500' }}>Sistema offline</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                Screen reader: "Critical system error, image"
              </p>
            </div>
          </div>
        </div>

        {/* Pattern 2 */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
            Icon-only Button (Button ha aria-label)
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              aria-label="Aggiungi nuovo elemento"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.75rem',
                height: '2.75rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
              }}
            >
              <Icon icon={Plus} decorative />
            </button>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', alignSelf: 'center' }}>
              Screen reader: "Aggiungi nuovo elemento, bottone"
            </p>
          </div>
        </div>

        {/* Pattern 3 */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
            Icona + Testo Visibile (Icona decorativa)
          </h4>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            <Icon icon={Save} decorative />
            <span>Salva modifiche</span>
          </button>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
            Screen reader: "Salva modifiche, bottone"
          </p>
        </div>

        {/* Pattern 4 */}
        <div>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
            Anti-pattern: Icon-only senza label
          </h4>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.75rem',
              height: '2.75rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            <Icon icon={Trash2} decorative />
          </button>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: '#ef4444' }}>
            Screen reader: "bottone" (manca purpose)
          </p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
            Fix: Add <code>aria-label="Delete"</code> to button
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Showcase dei pattern accessibili corretti e anti-pattern da evitare.

**Key Points:**
- Icone standalone semantiche: fornire \`aria-label\`
- Icon-only buttons: \`aria-label\` sul button, icona \`decorative\`
- Icona + testo: icona \`decorative\`, testo fornisce label
- Icon-only senza label: WCAG violation (4.1.2)
        `,
      },
    },
  },
};

// ========================================
// PRIORITY 1 & 2: Enhanced Features Stories
// ========================================

/**
 * Extended Description with aria-describedby (Priority 1)
 * For complex icons that need detailed descriptions
 */
export const WithExtendedDescription: StoryObj<Story> = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <h3>Extended Description (aria-describedby)</h3>

      <div
        style={{
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
        }}
      >
        <BarChart
          style={{ width: '48px', height: '48px', color: '#3b82f6' }}
          aria-label="Sales chart"
          aria-describedby="chart-description"
        />
        <p
          id="chart-description"
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          Monthly sales data from January to December 2025. Revenue peaked in December at €50,000
          with an overall upward trend. Q4 showed 25% growth compared to Q3.
        </p>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
        }}
      >
        <strong>Accessibility:</strong> The icon uses <code>aria-describedby</code> to link to
        detailed information. Screen readers announce: &quot;Sales chart, image&quot; then read the
        full description when focused.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Priority 1 Feature** - Extended descriptions for complex icons.

Use \`aria-describedby\` when:
- Icon represents complex data (charts, graphs, diagrams)
- Additional context improves understanding
- Simple \`aria-label\` is insufficient

**WCAG:** 1.3.1 Info and Relationships (Level A)
        `,
      },
    },
  },
};

/**
 * SVG Title for Tooltips (Priority 2)
 * Native SVG title improves screen reader compatibility and provides visual tooltip
 */
export const WithTitle: StoryObj<Story> = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
      <h3>SVG Title for Tooltips</h3>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Icon
            icon={Download}
            aria-label="Download file"
            title="Download document.pdf (2.5 MB)"
            size="large"
            color="#10b981"
          />
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Hover for tooltip
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Icon
            icon={Info}
            aria-label="Information"
            title="Click for more details about this feature"
            size="large"
            color="#3b82f6"
          />
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Hover for tooltip
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Icon
            icon={AlertCircle}
            aria-label="Warning"
            title="This action requires administrator privileges"
            size="large"
            color="#f59e0b"
          />
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
            Hover for tooltip
          </p>
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
        }}
      >
        <strong>Accessibility:</strong> The <code>title</code> prop adds a native SVG{' '}
        <code>&lt;title&gt;</code> element that improves screen reader compatibility and provides a
        visual tooltip on hover.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Priority 2 Feature** - Native SVG tooltips with improved accessibility.

The \`title\` prop:
- Adds \`<title>\` element inside SVG
- Provides visual tooltip on hover
- Improves screen reader compatibility
- Works alongside \`aria-label\`

**Use case:** Actionable icons that benefit from additional context on hover.
        `,
      },
    },
  },
};

/**
 * Live Regions for Dynamic Icons (Priority 2)
 * Use aria-live for status updates and loading indicators
 */
export const WithLiveRegion: StoryObj<Story> = {
  args: {},
  render: function WithLiveRegionRender() {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleStart = () => {
      setStatus('loading');
      setTimeout(() => {
        setStatus(Math.random() > 0.3 ? 'success' : 'error');
        setTimeout(() => setStatus('idle'), 3000);
      }, 2000);
    };

    const statusConfig = {
      idle: { icon: Clock, label: 'Ready', color: '#6b7280' },
      loading: { icon: Clock, label: 'Processing...', color: '#3b82f6' },
      success: { icon: Check, label: 'Complete', color: '#10b981' },
      error: { icon: X, label: 'Failed', color: '#ef4444' },
    };

    const config = statusConfig[status];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
        <h3>Live Regions for Dynamic Status</h3>

        <div
          style={{
            padding: '1.5rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            textAlign: 'center',
          }}
        >
          <Icon
            icon={config.icon}
            aria-label={config.label}
            aria-live="polite"
            size="xlarge"
            color={config.color}
          />
          <p style={{ marginTop: '1rem', fontSize: '1.125rem', fontWeight: '500' }}>
            {config.label}
          </p>
        </div>

        <button
          onClick={handleStart}
          disabled={status !== 'idle'}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: status === 'idle' ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: status === 'idle' ? 'pointer' : 'not-allowed',
          }}
        >
          {status === 'idle' ? 'Start Operation' : 'Processing...'}
        </button>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          <strong>Accessibility:</strong> The icon uses <code>aria-live=&quot;polite&quot;</code> to
          announce status changes to screen readers automatically without interrupting the
          user&apos;s current task.
          <br />
          <br />
          <strong>WCAG:</strong> 4.1.3 Status Messages (Level AA)
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Priority 2 Feature** - Dynamic status announcements via live regions.

Use \`aria-live\` for:
- **Loading indicators** - "polite" for non-urgent updates
- **Status changes** - "polite" for background operations
- **Errors** - "assertive" for critical failures

**Options:**
- \`aria-live="polite"\` - Announces when screen reader is idle
- \`aria-live="assertive"\` - Interrupts for urgent announcements
        `,
      },
    },
  },
};

/**
 * Semantic Variants (Priority 2)
 * Pre-configured variants for common use cases
 */
export const SemanticVariants: StoryObj<Story> = {
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px' }}>
      <h3>Semantic Variants</h3>
      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        Pre-configured variants with appropriate colors and default labels
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {/* Success */}
        <div
          style={{
            padding: '1.5rem',
            border: '2px solid #d1fae5',
            backgroundColor: '#f0fdf4',
            borderRadius: '0.5rem',
          }}
        >
          <Icon icon={Check} variant="success" size="large" />
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Success</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            Default label: &quot;Success&quot;
            <br />
            Color: Green (#22c55e)
            <br />
            Use for: Completed actions, validation
          </p>
          <code
            style={{
              display: 'block',
              marginTop: '0.75rem',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
            }}
          >
            {`<Icon icon={Check} variant="success" />`}
          </code>
        </div>

        {/* Error */}
        <div
          style={{
            padding: '1.5rem',
            border: '2px solid #fecaca',
            backgroundColor: '#fef2f2',
            borderRadius: '0.5rem',
          }}
        >
          <Icon icon={X} variant="error" size="large" />
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Error</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            Default label: &quot;Error&quot;
            <br />
            Color: Red (#ef4444)
            <br />
            Use for: Failed actions, validation errors
          </p>
          <code
            style={{
              display: 'block',
              marginTop: '0.75rem',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
            }}
          >
            {`<Icon icon={X} variant="error" />`}
          </code>
        </div>

        {/* Warning */}
        <div
          style={{
            padding: '1.5rem',
            border: '2px solid #fed7aa',
            backgroundColor: '#fffbeb',
            borderRadius: '0.5rem',
          }}
        >
          <Icon icon={AlertTriangle} variant="warning" size="large" />
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Warning</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            Default label: &quot;Warning&quot;
            <br />
            Color: Amber (#d97706)
            <br />
            Use for: Caution messages, important notices
          </p>
          <code
            style={{
              display: 'block',
              marginTop: '0.75rem',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
            }}
          >
            {`<Icon icon={AlertTriangle} variant="warning" />`}
          </code>
        </div>

        {/* Info */}
        <div
          style={{
            padding: '1.5rem',
            border: '2px solid #bfdbfe',
            backgroundColor: '#eff6ff',
            borderRadius: '0.5rem',
          }}
        >
          <Icon icon={Info} variant="info" size="large" />
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Info</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
            Default label: &quot;Information&quot;
            <br />
            Color: Blue (#3b82f6)
            <br />
            Use for: Helpful hints, informational messages
          </p>
          <code
            style={{
              display: 'block',
              marginTop: '0.75rem',
              padding: '0.5rem',
              backgroundColor: 'white',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
            }}
          >
            {`<Icon icon={Info} variant="info" />`}
          </code>
        </div>
      </div>

      {/* Override examples */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
        }}
      >
        <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Custom Overrides</h4>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>
            <Icon icon={Check} variant="success" aria-label="Payment received successfully" />
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Custom label
            </p>
          </div>
          <div>
            <Icon icon={Check} variant="success" color="#9333ea" />
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Custom color
            </p>
          </div>
          <div>
            <Icon icon={Check} variant="success" decorative />
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Decorative override
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
        }}
      >
        <strong>Accessibility Benefits:</strong>
        <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
          <li>Automatic default labels (no manual aria-label needed)</li>
          <li>Consistent color coding (not relying on color alone)</li>
          <li>WCAG 1.4.1 compliance (Use of Color Level A)</li>
          <li>WCAG 1.4.11 compliance (Non-text Contrast 3:1)</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Priority 2 Feature** - Semantic variants with pre-configured styling.

Each variant includes:
- Appropriate color with WCAG AA contrast
- Default accessible label
- Semantic meaning
- Can be overridden with custom props

**WCAG Compliance:**
- **1.4.1 Use of Color (A)** - Different shapes convey meaning, not just color
- **1.4.11 Non-text Contrast (AA)** - 3:1 minimum contrast ratio
        `,
      },
    },
  },
};

/**
 * Combined Features Demo
 * Show all Priority 1 & 2 features working together
 */
export const CombinedFeaturesDemo: StoryObj<Story> = {
  args: {},
  render: function CombinedFeaturesDemoRender() {
    const [uploadStatus, setUploadStatus] = React.useState<
      'idle' | 'uploading' | 'success' | 'error'
    >('idle');

    const handleUpload = () => {
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus(Math.random() > 0.2 ? 'success' : 'error');
      }, 2500);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '700px' }}>
        {/* Upload area */}
        <div
          style={{
            padding: '2rem',
            border: '2px dashed #cbd5e1',
            borderRadius: '0.5rem',
            textAlign: 'center',
          }}
        >
          {uploadStatus === 'idle' && (
            <>
              <Icon
                icon={Upload}
                aria-label="Upload files"
                title="Click to select files or drag and drop"
                size="xlarge"
                color="#64748b"
              />
              <p style={{ marginTop: '1rem', fontWeight: '500' }}>Upload Documents</p>
              <button
                onClick={handleUpload}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                Start Upload
              </button>
            </>
          )}

          {uploadStatus === 'uploading' && (
            <>
              <Icon
                icon={Upload}
                aria-label="Uploading files, please wait"
                aria-live="polite"
                size="xlarge"
                color="#3b82f6"
              />
              <p style={{ marginTop: '1rem', fontWeight: '500' }}>Uploading...</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Please wait</p>
            </>
          )}

          {uploadStatus === 'success' && (
            <div role="status" aria-live="polite">
              <Icon
                icon={Check}
                variant="success"
                aria-label="Upload completed successfully"
                aria-describedby="upload-success-details"
                title="3 files uploaded successfully"
                size="xlarge"
              />
              <p style={{ marginTop: '1rem', fontWeight: '500', color: '#10b981' }}>
                Upload Complete!
              </p>
              <p id="upload-success-details" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                3 files uploaded successfully (2.4 MB total)
              </p>
              <button
                onClick={() => setUploadStatus('idle')}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                Upload More
              </button>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div role="alert">
              <Icon
                icon={AlertCircle}
                variant="error"
                aria-label="Upload failed"
                aria-describedby="upload-error-details"
                title="Click for troubleshooting steps"
                size="xlarge"
              />
              <p style={{ marginTop: '1rem', fontWeight: '500', color: '#ef4444' }}>
                Upload Failed
              </p>
              <p id="upload-error-details" style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Connection timeout. Please check your internet connection and try again.
              </p>
              <button
                onClick={() => setUploadStatus('idle')}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Features breakdown */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: '1rem' }}>Features in Action:</h4>
          <ul style={{ marginBottom: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
            <li>
              <strong>title</strong> - Tooltip on hover for context
            </li>
            <li>
              <strong>aria-describedby</strong> - Extended description for success/error
            </li>
            <li>
              <strong>aria-live</strong> - Status announcements during upload
            </li>
            <li>
              <strong>variant</strong> - Semantic colors for success/error
            </li>
            <li>
              <strong>role=&quot;status&quot;/&quot;alert&quot;</strong> - Appropriate ARIA roles
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Real-world Example** - File upload with comprehensive accessibility features.

This demo combines:
- **title** for hover tooltips
- **aria-describedby** for detailed status messages
- **aria-live** for dynamic status announcements
- **variant** for semantic success/error states
- **role="status"/"alert"** for appropriate semantics

Try the upload to see all features working together!
        `,
      },
    },
  },
};
