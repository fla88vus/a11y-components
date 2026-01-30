import { describe, it, expect } from 'vitest';
import {
  combineClassNames,
  isInputDisabled,
  buildDescribedBy,
  isRequiredAndEmpty,
} from './Input.utils';

describe('Input Utils - Unit Tests', () => {
  describe('combineClassNames', () => {
    it('combines multiple class names', () => {
      expect(combineClassNames('input', 'primary', 'large')).toBe('input primary large');
    });

    it('filters out falsy values', () => {
      expect(combineClassNames('input', false, 'primary', undefined, null)).toBe('input primary');
    });

    it('handles empty input', () => {
      expect(combineClassNames()).toBe('');
    });

    it('handles all falsy values', () => {
      expect(combineClassNames(false, undefined, null)).toBe('');
    });

    it('handles single class name', () => {
      expect(combineClassNames('input')).toBe('input');
    });

    it('handles conditional classes', () => {
      const hasError = true;
      const isDisabled = false;
      expect(combineClassNames('input', hasError && 'error', isDisabled && 'disabled')).toBe(
        'input error'
      );
    });
  });

  describe('isInputDisabled', () => {
    it('returns true when disabled is true', () => {
      expect(isInputDisabled(true)).toBe(true);
    });

    it('returns false when disabled is false', () => {
      expect(isInputDisabled(false)).toBe(false);
    });

    it('returns false when disabled is undefined', () => {
      expect(isInputDisabled(undefined)).toBe(false);
    });
  });

  describe('buildDescribedBy', () => {
    it('combines error and helper text IDs', () => {
      expect(buildDescribedBy('error-id', 'helper-id')).toBe('error-id helper-id');
    });

    it('returns only error ID when helper is undefined', () => {
      expect(buildDescribedBy('error-id', undefined)).toBe('error-id');
    });

    it('returns only helper ID when error is undefined', () => {
      expect(buildDescribedBy(undefined, 'helper-id')).toBe('helper-id');
    });

    it('returns undefined when both are undefined', () => {
      expect(buildDescribedBy(undefined, undefined)).toBeUndefined();
    });

    it('filters out empty strings', () => {
      expect(buildDescribedBy('', 'helper-id')).toBe('helper-id');
    });
  });

  describe('isRequiredAndEmpty', () => {
    it('returns true when required and value is empty', () => {
      expect(isRequiredAndEmpty('', true)).toBe(true);
    });

    it('returns true when required and value is only whitespace', () => {
      expect(isRequiredAndEmpty('   ', true)).toBe(true);
    });

    it('returns false when required and value has content', () => {
      expect(isRequiredAndEmpty('test', true)).toBe(false);
    });

    it('returns false when not required and value is empty', () => {
      expect(isRequiredAndEmpty('', false)).toBe(false);
    });

    it('returns false when not required and value has content', () => {
      expect(isRequiredAndEmpty('test', false)).toBe(false);
    });

    it('handles value with only spaces correctly', () => {
      expect(isRequiredAndEmpty('  \n  \t  ', true)).toBe(true);
    });
  });
});
