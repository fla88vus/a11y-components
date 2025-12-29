import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

// Extend Vitest expect with jest-dom and jest-axe matchers
expect.extend(matchers);
expect.extend(toHaveNoViolations);
