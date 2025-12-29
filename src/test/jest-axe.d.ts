/// <reference types="@types/jest-axe" />

import "vitest";

declare module "vitest" {
  interface Assertion<T = any> extends jest.Matchers<void, T> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): any;
  }
}
