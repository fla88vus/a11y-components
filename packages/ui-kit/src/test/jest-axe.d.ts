/// <reference types="@types/jest-axe" />

import 'vitest';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends jest.Matchers<void, T> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toHaveNoViolations(): any;
  }
}
