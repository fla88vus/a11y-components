import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Ignora file non necessari
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'coverage/**',
      '*.config.ts',
      '*.config.js',
    ],
  },
  
  // Configurazione base
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Configurazione per tutti i file
  {
    files: ['src/**/*.{ts,tsx}'],
    
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
      },
    },
    
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    
    settings: {
      react: {
        version: 'detect',
      },
    },
    
    rules: {
      // React base rules
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Non necessario con React 17+
      'react/prop-types': 'off', // Usiamo TypeScript per la validazione
      'react/no-unescaped-entities': 'off', // Permette virgolette e apostrofi nel testo JSX
      
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // JSX Accessibility rules
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/no-autofocus': 'warn', // Warning invece di error per flessibilità
      
      // TypeScript rules
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
    },
  },
  
  // Disabilita regole in conflitto con Prettier (deve essere l'ultimo)
  prettier
);
