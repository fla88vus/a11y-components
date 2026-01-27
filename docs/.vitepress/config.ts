import { defineConfig } from 'vitepress';

export default defineConfig({
  ignoreDeadLinks: true,
  title: 'a11y UI Kit React',
  description: 'Production-ready accessible React components following WCAG 2.1 AA standards',

  base: '/a11y-components/',

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/button' },
      { text: 'Examples', link: '/examples/full-examples' },
      {
        text: 'Project Info',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Deployment', link: '/project-info/deployment' },
          { text: 'Setup Instructions', link: '/project-info/setup-instructions' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Accessibility', link: '/guide/accessibility' },
            { text: 'Atomic Design', link: '/guide/atomic-design' },
            { text: 'Styling', link: '/guide/styling' },
            { text: 'TypeScript', link: '/guide/typescript' },
          ],
        },
      ],

      '/components/': [
        {
          text: 'Atoms',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Icon', link: '/components/icon' },
            { text: 'Label', link: '/components/label' },
            { text: 'ErrorText', link: '/components/error-text' },
            { text: 'HelperText', link: '/components/helper-text' },
          ],
        },
        {
          text: 'Molecules',
          items: [{ text: 'FormField', link: '/components/form-field' }],
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/fla88vus/a11y-components' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Flavia',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/fla88vus/a11y-components/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'a11y UI Kit React' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Accessible React components following WCAG 2.1 AA standards',
      },
    ],
  ],
});
